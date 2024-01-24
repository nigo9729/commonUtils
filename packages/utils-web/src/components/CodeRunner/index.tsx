import Editor from '@monaco-editor/react';
import styles from './index.module.css';
import { useEffect, useRef, useState } from 'react';
import { Console, Decode } from 'console-feed';
import { Message } from 'console-feed/lib/definitions/Component';
import { createContextEval } from '@site/src/utils/evalCode';

const CodeRunner = ({ code }: { code?: string }) => {
  const editorRef = useRef(null);
  const [logs, setLogs] = useState<Message[]>([]);
  const [codeStr, setCodeStr] = useState(code);
  const contextEvalRef = useRef(createContextEval());

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
        options={{ inDiffEditor: false, automaticLayout: true }}
        theme='vs-dark'
        onMount={handleEditorDidMount}
      />
      {!!logs.length && (
        <div className={styles.log}>
          <Console logs={logs} variant='dark' />
        </div>
      )}
    </div>
  );
};

export default CodeRunner;
