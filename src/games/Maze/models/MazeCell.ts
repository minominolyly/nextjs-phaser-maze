"use client";
import { GameObjects } from "phaser";

export default class MazeCell extends GameObjects.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    this.isWall = false;
    this.isStart = false;
    this.isGoal = false;
    this.rowIndex = 0;
    this.columnIndex = 0;
  }

  isWall: boolean;
  isStart: boolean;
  isGoal: boolean;
  rowIndex: number;
  columnIndex: number;
}
