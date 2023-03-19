import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

const NodeEditor = ({
                      onSave
                    }: {
  onSave: (note: { title: string; content: string }) => void;
}) => {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="card-title">
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            className="input-primary input input-lg w-full font-bold"
          />
        </div>
        <CodeMirror
          value={code}
          width="500px"
          height="30vh"
          minWidth="100%"
          minHeight="30vh"
          extensions={[
            markdown({
              base: markdownLanguage, codeLanguages: languages
            })
          ]}
          onChange={value => setCode(value)}
          className="border border-gray-300"
        />

        <div className="card-actions justify-end">
          <button
            onClick={() => {
              onSave({
                title,
                content: code
              });
              setCode("");
              setTitle("");
            }}
            disabled={title.trim().length === 0 || code.trim().length === 0}
            className="btn-primary btn"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodeEditor;
