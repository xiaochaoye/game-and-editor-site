"use client"

import { useState } from "react"
import { GameCard } from "@/components/GameCard"

const games = [
  {
    id: "8-ball-billiards-classic",
    title: "8 Ball Billiards Classic",
    description: "Play the classic game of 8 ball pool against the computer or a friend.",
    thumbnailUrl: "https://imgs.crazygames.com/8-ball-billiards-classic_16x9/20231108025958/8-ball-billiards-classic_16x9-cover?&height=160&width=240",
    url: "https://www.crazygames.com/embed/8-ball-billiards-classic",
  },
  {
    id: "worldguessr",
    title: "WorldGuessr",
    description: "Test your geography knowledge by guessing locations around the world.",
    thumbnailUrl: "https://imgs.crazygames.com/worldguessr_16x9/20241018082520/worldguessr_16x9-cover?height=160&width=240",
    url: "https://www.crazygames.com/embed/worldguessr",
  },
  // 可以在这里添加更多游戏
]

export default function GamePage() {
  const [currentGame, setCurrentGame] = useState(games[0])

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/3 space-y-4 overflow-y-auto max-h-[calc(100vh-8rem)]">
        <h2 className="text-2xl font-bold mb-4">游戏列表</h2>
        {games.map((game) => (
          <GameCard
            key={game.id}
            title={game.title}
            description={game.description}
            thumbnailUrl={game.thumbnailUrl}
            onClick={() => setCurrentGame(game)}
          />
        ))}
      </div>
      <div className="w-full md:w-2/3">
        <h1 className="text-3xl font-bold mb-4">{currentGame.title}</h1>
        <div className="w-full aspect-video">
          <iframe
            src={currentGame.url}
            style={{ width: "100%", height: "100%" }}
            frameBorder="0"
            allow="gamepad *;"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

