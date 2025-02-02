import { GameObjects } from "phaser";
import Direction from "../types/Direction";

export default class Player extends GameObjects.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    this.scene.add.existing(this);
    this.rowIndex = 0;
    this.columnIndex = 0;
  }

  previousDirection?: Direction;
  rowIndex: number;
  columnIndex: number;
  setCellPosition(rowIndex: number, columnIndex: number, x: number, y: number) {
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
    this.setPosition(x, y);
  }
}
