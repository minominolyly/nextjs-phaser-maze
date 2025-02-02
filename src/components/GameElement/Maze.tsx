"use client";
import AppConfig from "@/configurations/app.config";
import MazeGameConfig from "@/games/Maze/configurations/maze.game.config";
import MazeGame from "@/games/Maze/MazeGame";
import { AUTO } from "phaser";
import { useEffect, useRef, useState } from "react";

export default function Maze() {
  const [game, setGame] = useState<MazeGame | null>(null);
  const gameDivRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!gameDivRef.current) {
      return;
    }
    if (game === null) {
      const newGame = new MazeGame({
        type: AUTO,
        width: 1280,
        height: 720,
        url: `${AppConfig.BASE_URL}`,
        parent: gameDivRef.current,
        scale: {
          mode: Phaser.Scale.ScaleModes.FIT,
          autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY,
          parent: gameDivRef.current,
          zoom: Phaser.Scale.Zoom.MAX_ZOOM,
        },
        backgroundColor: MazeGameConfig.BACKGROUND_COLOR,
        preserveDrawingBuffer: true,
      });
      setGame(newGame);
    }

    return () => {
      if (game) {
        game.destroy(true);
        setGame(null);
      }
    };
  }, [game]);

  return (
    <div className="game-container" style={{ width: "100%", height: "auto" }}>
      <div ref={gameDivRef} className="game tic-tac-toe" />
    </div>
  );
}
