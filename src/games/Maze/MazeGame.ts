"use client";
import { Game } from "phaser";
import SceneKey from "./constants/SceneKey";
import Preload from "./scenes/Preload";
import Maze from "./scenes/Maze";
import LaunchScreen from "./scenes/LaunchScreen";

export default class MazeGame extends Game {
  constructor(gameConfig: Phaser.Types.Core.GameConfig) {
    super({
      ...gameConfig,
    });
    this.scene.add(SceneKey.PRELOAD, Preload);
    this.scene.add(SceneKey.LAUNCH_SCREEN, LaunchScreen);
    this.scene.add(SceneKey.MAZE, Maze);

    this.scene.start(SceneKey.PRELOAD, {
      nextSceneKey: SceneKey.LAUNCH_SCREEN,
      nextSceneData: {
        nextSceneKey: SceneKey.MAZE,
      },
    });
  }
}
