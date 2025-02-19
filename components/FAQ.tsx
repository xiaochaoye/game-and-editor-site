import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4">常见问题</h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>我该如何玩这个游戏？</AccordionTrigger>
          <AccordionContent>只需导航到游戏页面，游戏就会在嵌入式播放器中自动加载。</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>我可以保存我在 Markdown 编辑器中的工作吗？</AccordionTrigger>
          <AccordionContent>
            目前，编辑器没有内置保存功能。我们建议将您的作品复制到本地文件以妥善保存。
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>该网站是否适合移动设备？</AccordionTrigger>
          <AccordionContent>
            是的，我们的网站设计为响应式，可在各种尺寸的设备上运行良好。不过markdown编辑可能不太方便
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

