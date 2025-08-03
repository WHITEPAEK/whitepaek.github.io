/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Text} Text
 * @typedef {import('mdast').Image} Image
 */

import { visit } from 'unist-util-visit';

/**
 * Remark plugin to convert wiki-style image syntax to standard markdown
 * Converts ![[Path|Caption|Size]] to ![Caption](Path) with size data attributes
 * Supports: ![[path]], ![[path|caption]], ![[path|size]], ![[path|caption|size]]
 */
export function remarkWikiImages() {
  /**
   * Parse size parameter (400 or 400x300 format)
   * @param {string} sizeStr - Size string to parse
   * @returns {{width?: number, height?: number}} Size object
   */
  function parseSize(sizeStr) {
    if (!sizeStr || typeof sizeStr !== 'string') return {};
    
    const trimmed = sizeStr.trim();
    if (!trimmed) return {};
    
    // Check for WxH format (e.g., "400x300")
    const dimensionMatch = trimmed.match(/^(\d+)x(\d+)$/);
    if (dimensionMatch) {
      return {
        width: parseInt(dimensionMatch[1], 10),
        height: parseInt(dimensionMatch[2], 10)
      };
    }
    
    // Check for single number format (e.g., "400")
    const singleMatch = trimmed.match(/^(\d+)$/);
    if (singleMatch) {
      const size = parseInt(singleMatch[1], 10);
      return { width: size, height: size };
    }
    
    return {};
  }

  /**
   * @param {Root} tree
   */
  return function (tree) {
    visit(tree, 'text', function (node, index, parent) {
      if (!node.value || typeof node.value !== 'string') return;
      
      // Regex to match ![[Path|Caption|Size]] syntax with all optional parts
      // Matches: ![[path]], ![[path|caption]], ![[path|size]], ![[path|caption|size]]
      const wikiImageRegex = /!\[\[([^|\]]+)(?:\|([^|\]]+))?(?:\|([^|\]]+))?\]\]/g;
      const matches = Array.from(node.value.matchAll(wikiImageRegex));
      
      if (matches.length === 0) return;
      
      // Split the text and create new nodes
      const newNodes = [];
      let lastIndex = 0;
      
      matches.forEach(match => {
        const [fullMatch, path, param2, param3] = match;
        const matchStart = match.index || 0;
        
        // Add text before the match
        if (matchStart > lastIndex) {
          const beforeText = node.value.slice(lastIndex, matchStart);
          if (beforeText) {
            newNodes.push({
              type: 'text',
              value: beforeText
            });
          }
        }
        
        // Parse parameters: determine if we have caption, size, or both
        let caption = '';
        let size = {};
        
        if (param2 && param3) {
          // Two parameters: caption and size
          caption = param2.trim();
          size = parseSize(param3);
        } else if (param2) {
          // One parameter: could be caption or size
          const sizeCheck = parseSize(param2);
          if (Object.keys(sizeCheck).length > 0) {
            // It's a size parameter
            size = sizeCheck;
            caption = '';
          } else {
            // It's a caption parameter
            caption = param2.trim();
          }
        }
        
        // Create standard markdown image syntax ![Caption](Path)
        /** @type {Image} */
        const imageNode = {
          type: 'image',
          url: path.trim(),
          alt: caption,
          title: null,
          data: {
            hProperties: {
              ...(size.width && { 'data-width': size.width }),
              ...(size.height && { 'data-height': size.height })
            }
          }
        };
        
        newNodes.push(imageNode);
        lastIndex = matchStart + fullMatch.length;
      });
      
      // Add remaining text after the last match
      if (lastIndex < node.value.length) {
        const afterText = node.value.slice(lastIndex);
        if (afterText) {
          newNodes.push({
            type: 'text',
            value: afterText
          });
        }
      }
      
      // Replace the text node with the new nodes
      if (parent && typeof index === 'number' && newNodes.length > 0) {
        parent.children.splice(index, 1, ...newNodes);
      }
    });
  };
}