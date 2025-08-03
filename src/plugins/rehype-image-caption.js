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
 */
export function rehypeImageCaption() {
  /**
   * @param {Root} tree
   */
  return function (tree) {
    // Convert img elements to figure>img+figcaption structure
    visit(tree, 'element', function (node, index, parent) {
      // Only process img elements that have alt text
      if (
        node.tagName === 'img' &&
        node.properties &&
        node.properties.alt &&
        typeof node.properties.alt === 'string' &&
        node.properties.alt.trim() !== ''
      ) {
        // Create the figure element
        /** @type {Element} */
        const figure = {
          type: 'element',
          tagName: 'figure',
          properties: {
            className: ['image-with-caption']
          },
          children: [
            // Clone the img element, keeping alt for accessibility
            {
              ...node,
              properties: {
                ...node.properties
              }
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
      }
    });
  };
}