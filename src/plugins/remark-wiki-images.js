/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Text} Text
 * @typedef {import('mdast').Image} Image
 */

import { visit } from 'unist-util-visit';

/**
 * Remark plugin to convert wiki-style image syntax to standard markdown
 * Converts ![[Path|Caption]] to ![Caption](Path) so Astro can process images normally
 */
export function remarkWikiImages() {
  /**
   * @param {Root} tree
   */
  return function (tree) {
    visit(tree, 'text', function (node, index, parent) {
      if (!node.value || typeof node.value !== 'string') return;
      
      // Regex to match ![[Path|Caption]] syntax
      const wikiImageRegex = /!\[\[([^|]+)\|([^\]]+)\]\]/g;
      const matches = Array.from(node.value.matchAll(wikiImageRegex));
      
      if (matches.length === 0) return;
      
      // Split the text and create new nodes
      const newNodes = [];
      let lastIndex = 0;
      
      matches.forEach(match => {
        const [fullMatch, path, caption] = match;
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
        
        // Create standard markdown image syntax ![Caption](Path)
        /** @type {Image} */
        const imageNode = {
          type: 'image',
          url: path.trim(),
          alt: caption.trim(),
          title: null
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