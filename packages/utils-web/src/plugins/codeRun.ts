import { visit } from 'unist-util-visit';

const plugin = () => {
  const transformer = async (ast) => {
    visit(ast, 'code', (node) => {
      if (node.meta === 'run' && node.lang === 'typescript') {
        const newNode = {
          type: 'mdxJsxFlowElement',
          name: 'CodeRunner',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'code',
              value: node.value,
            },
          ],
        };
        const currentIndex = ast.children.findIndex((item) => item === node);
        ast.children.splice(currentIndex, 1, newNode);
      }
    });
  };
  return transformer;
};

export default plugin;
