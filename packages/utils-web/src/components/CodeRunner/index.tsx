import styles from './index.module.css';
import { useEffect, useRef, useState } from 'react';
import { Console, Decode } from 'console-feed';
import { Message } from 'console-feed/lib/definitions/Component';
import { createContextEval } from '@site/src/utils/evalCode';
import Editor, { useMonaco } from '@monaco-editor/react';
import utilsTypes from '!!raw-loader!@kqfe/utils/dist/index.d.ts';

const CodeRunner = ({ code }: { code?: string }) => {
  const editorRef = useRef(null);
  const [logs, setLogs] = useState<Message[]>([]);
  const [codeStr, setCodeStr] = useState(code);
  const contextEvalRef = useRef(createContextEval());
  const monaco = useMonaco();

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  const runCode = () => {
    setLogs([]);
    contextEvalRef.current.run(codeStr, {
      onMessage: (log) => {
        setLogs((logs) => [...logs, Decode(log)] as Message[]);
      },
    });
  };

  useEffect(() => contextEvalRef.current.remove, []);

  useEffect(() => {
    // do conditional chaining
    monaco?.languages.typescript.typescriptDefaults.addExtraLib(utilsTypes);
    // or make sure that it exists by other ways
    if (monaco) {
      console.log(monaco?.languages.typescript.typescriptDefaults);
    }
  }, [monaco]);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div onClick={runCode}>运行代码</div>
        <div>复制代码</div>
      </div>
      <Editor
        className={styles.editor}
        defaultLanguage='typescript'
        defaultValue={codeStr}
        onChange={setCodeStr}
        loading={<div className={styles.loading}>加载中</div>}
        options={{ inDiffEditor: false, automaticLayout: true }}
        theme='vs-dark'
        onMount={handleEditorDidMount}
      />
      <div className={styles.log}>
        {!!logs.length && <Console logs={logs} variant='dark' />}
      </div>
    </div>
  );
};

export default CodeRunner;
