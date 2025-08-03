/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Text} Text
 */

import { visit } from 'unist-util-visit';

/**
 * Rehype plugin to wrap images with figure elements and add captions
 * Converts img elements to figure>img+figcaption structure
 * where the caption text comes from the img alt attribute
 * Also handles size attributes from wiki syntax
 */
export function rehypeImageCaption() {
  /**
   * @param {Root} tree
   */
  return function (tree) {
    // Convert img elements to figure>img+figcaption structure
    visit(tree, 'element', function (node, index, parent) {
      // Process all img elements
      if (node.tagName === 'img' && node.properties) {
        // Handle size attributes from wiki syntax
        const imageProperties = { ...node.properties };
        
        // Convert data-width and data-height to width and height attributes
        if (node.properties['data-width']) {
          imageProperties.width = node.properties['data-width'];
          delete imageProperties['data-width'];
        }
        
        if (node.properties['data-height']) {
          imageProperties.height = node.properties['data-height'];
          delete imageProperties['data-height'];
        }
        
        // Check if we need to create a figure (only if alt text exists)
        const hasCaption = node.properties.alt && 
                          typeof node.properties.alt === 'string' && 
                          node.properties.alt.trim() !== '';
        
        if (hasCaption) {
          // Create the figure element with caption
          /** @type {Element} */
          const figure = {
            type: 'element',
            tagName: 'figure',
            properties: {
              className: ['image-with-caption']
            },
            children: [
              // Clone the img element with processed properties
              {
                ...node,
                properties: imageProperties
              },
              // Create figcaption element with the alt text
              {
                type: 'element',
                tagName: 'figcaption',
                properties: {
                  className: ['image-caption']
                },
                children: [
                  {
                    type: 'text',
                    value: node.properties.alt
                  }
                ]
              }
            ]
          };

          // Replace the img with the figure in the parent
          if (parent && typeof index === 'number') {
            parent.children[index] = figure;
          }
        } else {
          // Just update the image properties (no caption needed)
          if (parent && typeof index === 'number') {
            parent.children[index] = {
              ...node,
              properties: imageProperties
            };
          }
        }
      }
    });
  };
}