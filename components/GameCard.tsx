import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface GameCardProps {
  title: string
  description: string
  thumbnailUrl: string
  onClick: () => void
}

export function GameCard({ title, description, thumbnailUrl, onClick }: GameCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col" onClick={onClick}>
      <div className="relative w-full h-40">
        <Image
          src={thumbnailUrl || "/placeholder.svg"}
          alt={title}
          fill
          style={{ objectFit: "contain" }}
          className="rounded-t-lg"
        />
      </div>
      <CardContent className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow">{description}</p>
      </CardContent>
    </Card>
  )
}

