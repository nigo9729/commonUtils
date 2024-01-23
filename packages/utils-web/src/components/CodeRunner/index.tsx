import Editor from '@monaco-editor/react';
import styles from './index.module.css';
import { useRef, useState } from 'react';
import { Console, Hook, Decode } from 'console-feed';
import { Message } from 'console-feed/lib/definitions/Component';
import { createContextEval } from '@site/src/utils/evalCode';
import { DataAPI } from 'vue-console-feed';

const CodeRunner = () => {
  const editorRef = useRef(null);
  const [log, setLog] = useState<Message[]>([]);
  const [codeStr, setCodeStr] = useState('console.log(1)');

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  const runCode = () => {
    const evalContext = createContextEval();
    const consoleMock = new DataAPI(false, 0);
    Hook(consoleMock as any, (log1) => {
      setLog((prev) => [...prev, Decode(log1)] as Message[]);
    });
    evalContext.run(codeStr, {
      console: consoleMock,
    });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div onClick={runCode}>运行代码（ctrl+s）</div>
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
      <div className={styles.log}>
        <Console logs={log} variant='dark' />
      </div>
    </div>
  );
};

export default CodeRunner;
