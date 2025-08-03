import { visit } from 'unist-util-visit';

/**
 * Remark plugin to convert ==text== syntax to <mark> tags
 */
export function remarkHighlight() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      const value = node.value;
      const highlightRegex = /==(.*?)==/g;
      
      if (!highlightRegex.test(value)) {
        return;
      }

      const newChildren = [];
      let lastIndex = 0;
      let match;

      // Reset regex lastIndex
      highlightRegex.lastIndex = 0;

      while ((match = highlightRegex.exec(value)) !== null) {
        const [fullMatch, highlightedText] = match;
        const startIndex = match.index;

        // Add text before the highlight
        if (startIndex > lastIndex) {
          newChildren.push({
            type: 'text',
            value: value.slice(lastIndex, startIndex),
          });
        }

        // Add the highlight element
        newChildren.push({
          type: 'html',
          value: `<mark>${highlightedText}</mark>`,
        });

        lastIndex = startIndex + fullMatch.length;
      }

      // Add remaining text after the last highlight
      if (lastIndex < value.length) {
        newChildren.push({
          type: 'text',
          value: value.slice(lastIndex),
        });
      }

      // Replace the current node with the new children
      if (newChildren.length > 0) {
        parent.children.splice(index, 1, ...newChildren);
      }
    });
  };
}