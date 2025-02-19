"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    editormd: any
  }
}

export function MarkdownEditor() {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadEditorMd = async () => {
      await import("editor.md/editormd.min.js")
      if (editorRef.current && window.editormd) {
        window.editormd("editor", {
          width: "100%",
          height: 640,
          path: "/editor.md/lib/",
          theme: "dark",
          previewTheme: "dark",
          editorTheme: "pastel-on-dark",
          markdown: "# Welcome to GameEditor Markdown",
          codeFold: true,
          saveHTMLToTextarea: true,
          searchReplace: true,
          watch: true,
          htmlDecode: "style,script,iframe",
          toolbar: true,
          previewCodeHighlight: true,
          emoji: true,
          taskList: true,
          tocm: true,
          tex: true,
          flowChart: true,
          sequenceDiagram: true,
        })
      }
    }

    loadEditorMd()
  }, [])

  return <div id="editor" ref={editorRef}></div>
}

