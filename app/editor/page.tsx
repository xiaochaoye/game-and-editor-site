"use client"

import { useState, useRef, useEffect, Fragment, useCallback } from "react"
import dynamic from "next/dynamic"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import { Button } from "@/components/ui/button"
import * as commands from "@uiw/react-md-editor/commands-cn"
import { getCodeString } from "rehype-rewrite"
import mermaid from "mermaid"
import katex from "katex"
import "katex/dist/katex.css"

const MDEditor = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.default), { ssr: false })

mermaid.initialize({
  startOnLoad: true,
  theme: "default",
  securityLevel: "loose",
})

const randomid = () => Number.parseInt(String(Math.random() * 1e15), 10).toString(36)

const Code = ({ inline, children = [], className, ...props }) => {
  const demoid = useRef(`dome${randomid()}`)
  const [container, setContainer] = useState(null)
  const isMermaid = className && /^language-mermaid/.test(className.toLocaleLowerCase())
  const isKaTeX = className && /^language-katex/.test(className.toLocaleLowerCase())
  const code = children ? getCodeString(props.node.children) : children[0] || ""

  useEffect(() => {
    if (container && isMermaid && code) {
      mermaid
        .render(demoid.current, code)
        .then(({ svg, bindFunctions }) => {
          container.innerHTML = svg
          if (bindFunctions) {
            bindFunctions(container)
          }
        })
        .catch((error) => {
          console.log("error:", error)
        })
    }
  }, [container, isMermaid, code])

  const refElement = useCallback((node) => {
    if (node !== null) {
      setContainer(node)
    }
  }, [])

  if (isMermaid) {
    return (
      <Fragment>
        <code id={demoid.current} style={{ display: "none" }} />
        <code className={className} ref={refElement} data-name="mermaid" />
      </Fragment>
    )
  }

  if (isKaTeX) {
    const html = katex.renderToString(code, {
      throwOnError: false,
    })
    return <code style={{ fontSize: "150%" }} dangerouslySetInnerHTML={{ __html: html }} />
  }

  if (typeof children === "string" && /^\$\$(.*)\$\$/.test(children)) {
    const html = katex.renderToString(children.replace(/^\$\$(.*)\$\$/, "$1"), {
      throwOnError: false,
    })
    return <code dangerouslySetInnerHTML={{ __html: html }} style={{ background: "transparent" }} />
  }

  return <code className={className}>{children}</code>
}

export default function EditorPage() {
  const [value, setValue] = useState(`# 欢迎使用 Markdown 编辑器

在这里开始输入你的 markdown 内容！

## KaTeX 示例

这是行内公式：$c = \\pm\\sqrt{a^2 + b^2}$

这是块级公式：

\`\`\`katex
c = \\pm\\sqrt{a^2 + b^2}
\`\`\`

## Mermaid 示例

\`\`\`mermaid
graph TD
A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
\`\`\`

\`\`\`mermaid
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
\`\`\`
`)

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([value], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "markdown-content.md"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between w-full max-w-7xl mb-4">
        <h1 className="text-3xl font-bold">Markdown 编辑器</h1>
        <Button onClick={handleDownload} variant="outline" className="bg-gray-700 text-white hover:bg-gray-600">
          下载
        </Button>
      </div>
      <div className="w-full max-w-7xl">
        <MDEditor
          value={value}
          onChange={(val) => setValue(val || "")}
          height={650}
          visibleDragbar={false}
          preview="live"
          commands={[
            commands.bold,
            commands.italic,
            commands.strikethrough,
            commands.hr,
            commands.title,
            commands.divider,
            commands.link,
            commands.quote,
            commands.code,
            commands.codeBlock,
            commands.image,
            commands.divider,
            commands.unorderedList,
            commands.orderedList,
            commands.checkedList,
            commands.divider,
            commands.table,
            commands.comment,
            commands.divider,
            commands.fullscreen,
            commands.divider,
            commands.help,
          ]}
          previewOptions={{
            components: {
              code: Code,
            },
          }}
        />
      </div>
    </div>
  )
}

