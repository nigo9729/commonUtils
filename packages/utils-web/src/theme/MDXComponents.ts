// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import CodeRunner from '@site/src/components/CodeRunner';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "<Highlight>" tag to our Highlight component
  // `Highlight` will receive all props that were passed to `<Highlight>` in MDX
  CodeRunner,
};
