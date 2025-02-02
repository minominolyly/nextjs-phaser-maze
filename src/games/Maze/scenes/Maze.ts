/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import numberUtility from "@/utilities/numberUtility";
import { Scene } from "phaser";
import SceneKey from "../constants/SceneKey";
import dateUtility from "@/utilities/dateUtility";
import MazeCell from "../models/MazeCell";
import MazeGameConfig from "../configurations/maze.game.config";
import AppConfig from "@/configurations/app.config";
import Player from "../models/Player";
import Direction from "../types/Direction";
import Button from "../components/Button";
import MessageBox from "../components/MessageBox";
import arrayUtility from "@/utilities/arrayUtility";
import ComponentColor from "../constants/ComponentColor";

const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: "Potte One",
  fontSize: "32px",
  color: MazeGameConfig.FOREGROUND_COLOR,
};

export default class Maze extends Scene {
  private localTimer: Phaser.Time.TimerEvent | null;
  private timerText: Phaser.GameObjects.Text | null;
  private timerMs: number;
  private moveCounter: number;
  private moveCounterText: Phaser.GameObjects.Text | null;
  private startButton: Button | null;
  private messageBox: MessageBox | null;
  private closeMessageBoxButton: Button | null;
  private saveResultMessageBoxButton: Button | null;
  private group: Phaser.GameObjects.Group | null;
  private dialogBox: MessageBox | null;
  private okMessageBoxButton: Button | null;
  private cancelMessageBoxButton: Button | null;
  private upButton: Button | null;
  private leftButton: Button | null;
  private downButton: Button | null;
  private rightButton: Button | null;
  private autoPlayButton: Button | null;
  private autoPlayTimer: Phaser.Time.TimerEvent | null;
  private player: Player | null;
  private keyInputW: Phaser.Input.Keyboard.Key | null;
  private keyInputA: Phaser.Input.Keyboard.Key | null;
  private keyInputS: Phaser.Input.Keyboard.Key | null;
  private keyInputD: Phaser.Input.Keyboard.Key | null;
  private keyInputUp: Phaser.Input.Keyboard.Key | null;
  private keyInputLeft: Phaser.Input.Keyboard.Key | null;
  private keyInputDown: Phaser.Input.Keyboard.Key | null;
  private keyInputRight: Phaser.Input.Keyboard.Key | null;

  constructor() {
    super({
      key: SceneKey.MAZE,
      active: false,
    });
    this.localTimer = null;
    this.timerText = null;
    this.timerMs = 0;
    this.moveCounter = 0;
    this.moveCounterText = null;
    this.startButton = null;
    this.messageBox = null;
    this.closeMessageBoxButton = null;
    this.saveResultMessageBoxButton = null;
    this.group = null;
    this.dialogBox = null;
    this.okMessageBoxButton = null;
    this.cancelMessageBoxButton = null;
    this.upButton = null;
    this.leftButton = null;
    this.downButton = null;
    this.rightButton = null;
    this.autoPlayButton = null;
    this.autoPlayTimer = null;
    this.player = null;

    this.keyInputW = null;
    this.keyInputA = null;
    this.keyInputS = null;
    this.keyInputD = null;
    this.keyInputUp = null;
    this.keyInputLeft = null;
    this.keyInputDown = null;
    this.keyInputRight = null;
  }

  init(_data: any): void {}

  preload(): void {
    this.load.spritesheet(
      "maze",
      `${AppConfig.BASE_URL}/images/maze.png`,
      {
        frameWidth: 32,
        frameHeight: 32,
        margin: 0,
      }
    );
  }

  create(_data: any): void {
    this.cameras.main.setBackgroundColor(MazeGameConfig.BACKGROUND_COLOR);
    this.createStartButton("Start!");
  }

  update(_time: number, _delta: number): void {
    // if (this.keyInputUp && this.keyInputUp.isDown) {
    //   if (!this.group || !this.player) {
    //     return;
    //   }
    //   this.movePlayer(this.player.rowIndex - 1, this.player.columnIndex, "up");
    //   return;
    // }
    // if (this.keyInputLeft && this.keyInputLeft.isDown) {
    //   if (!this.group || !this.player) {
    //     return;
    //   }
    //   this.movePlayer(
    //     this.player.rowIndex,
    //     this.player.columnIndex - 1,
    //     "left"
    //   );
    //   return;
    // }
    // if (this.keyInputDown && this.keyInputDown.isDown) {
    //   if (!this.group || !this.player) {
    //     return;
    //   }
    //   this.movePlayer(
    //     this.player.rowIndex + 1,
    //     this.player.columnIndex,
    //     "down"
    //   );
    //   return;
    // }
    // if (this.keyInputRight && this.keyInputRight.isDown) {
    //   if (!this.group || !this.player) {
    //     return;
    //   }
    //   this.movePlayer(
    //     this.player.rowIndex,
    //     this.player.columnIndex + 1,
    //     "right"
    //   );
    //   return;
    // }
    // if (this.keyInputW && this.keyInputW.isDown) {
    //   if (!this.group || !this.player) {
    //     return;
    //   }
    //   this.movePlayer(this.player.rowIndex - 1, this.player.columnIndex, "up");
    //   return;
    // }
    // if (this.keyInputA && this.keyInputA.isDown) {
    //   if (!this.group || !this.player) {
    //     return;
    //   }
    //   this.movePlayer(
    //     this.player.rowIndex,
    //     this.player.columnIndex - 1,
    //     "left"
    //   );
    //   return;
    // }
    // if (this.keyInputS && this.keyInputS.isDown) {
    //   if (!this.group || !this.player) {
    //     return;
    //   }
    //   this.movePlayer(
    //     this.player.rowIndex + 1,
    //     this.player.columnIndex,
    //     "down"
    //   );
    //   return;
    // }
    // if (this.keyInputD && this.keyInputD.isDown) {
    //   if (!this.group || !this.player) {
    //     return;
    //   }
    //   this.movePlayer(
    //     this.player.rowIndex,
    //     this.player.columnIndex + 1,
    //     "right"
    //   );
    //   return;
    // }
  }

  resetMoveCounter(): void {
    this.moveCounter = 0;
    if (this.moveCounterText) {
      this.moveCounterText.destroy();
    }

    this.moveCounterText = this.add.text(
      20,
      120,
      `Move Counter\n${this.moveCounter}`,
      textStyle
    );
  }

  addMoveCounter(): void {
    this.moveCounter++;
    if (this.moveCounterText) {
      this.moveCounterText.text = `Move Counter\n${this.moveCounter}`;
    }
  }

  startTimer(): void {
    this.timerMs = 0;

    if (this.timerText) {
      this.timerText.destroy();
    }

    this.timerText = this.add.text(
      20,
      20,
      `Time\n${numberUtility.millisecondsToTime(this.timerMs)}`,
      textStyle
    );

    const timerEventConfig: Phaser.Types.Time.TimerEventConfig = {
      delay: 100,
      loop: true,
      startAt: 0,
      timeScale: 1,
      callback: () => {
        if (!this.localTimer || !this.timerText) {
          return;
        }
        this.timerMs += this.localTimer.getElapsed();
        this.timerText.text = `Time\n${numberUtility.millisecondsToTime(
          this.timerMs
        )}`;
      },
    };

    if (this.localTimer) {
      this.localTimer.reset(timerEventConfig);
    } else {
      this.localTimer = this.time.addEvent(timerEventConfig);
    }
  }

  stopTimer(): void {
    if (!this.localTimer) {
      return;
    }
    this.localTimer.paused = true;
  }

  createMaze(): void {
    if (this.group) {
      this.group.destroy(true, false);
    }
    this.group = this.add.group();

    let startCells: MazeCell[] = [];
    for (let y = 0; y < MazeGameConfig.ROW_COUNT; y++) {
      for (let x = 0; x < MazeGameConfig.COLUMN_COUNT; x++) {
        const frameWidth = 32;
        const frameHeight = 32;

        const cellX =
          x * frameWidth + frameWidth / 2 + MazeGameConfig.MAZE_OFFSET_X;

        const cellY =
          y * frameHeight + frameHeight / 2 + MazeGameConfig.MAZE_OFFSET_Y;

        const cell = this.group.create(cellX, cellY, "maze", 0) as MazeCell;

        cell.rowIndex = y;
        cell.columnIndex = x;

        if (
          x == 0 ||
          y == 0 ||
          x == MazeGameConfig.COLUMN_COUNT - 1 ||
          y == MazeGameConfig.ROW_COUNT - 1
        ) {
          cell.isWall = true;
          cell.setTexture("maze", 1);
        }
        if (x % 2 == 0 && y % 2 == 0) {
          startCells.push(cell);
        }
      }
    }

    const setMazeCellWall = (rowIndex: number, columnIndex: number): void => {
      const cell = this.getMazeCell(rowIndex, columnIndex);
      if (cell) {
        cell.isWall = true;
        cell.setTexture("maze", 1);
        if (columnIndex % 2 == 0 && rowIndex % 2 == 0) {
          currentWallCells.push({ x: columnIndex, y: rowIndex });
        }
      }
    };

    const extendMazeWall = (rowIndex: number, columnIndex: number): void => {
      if (!this.group) {
        return;
      }
      let currentX = columnIndex;
      let currentY = rowIndex;
      const directions: Direction[] = [];

      const upCell = this.getMazeCell(rowIndex - 1, columnIndex);
      const up2Cell = this.getMazeCell(rowIndex - 2, columnIndex);
      if (
        upCell &&
        !upCell.isWall &&
        !isCurrentWallCell(rowIndex - 2, columnIndex)
      ) {
        directions.push("up");
      }

      const rightCell = this.getMazeCell(rowIndex, columnIndex + 1);
      const right2Cell = this.getMazeCell(rowIndex, columnIndex + 2);
      if (
        rightCell &&
        !rightCell.isWall &&
        !isCurrentWallCell(rowIndex, columnIndex + 2)
      ) {
        directions.push("right");
      }

      const downCell = this.getMazeCell(rowIndex + 1, columnIndex);
      const down2Cell = this.getMazeCell(rowIndex + 2, columnIndex);
      if (
        downCell &&
        !downCell.isWall &&
        !isCurrentWallCell(rowIndex + 2, columnIndex)
      ) {
        directions.push("down");
      }

      const leftCell = this.getMazeCell(rowIndex, columnIndex - 1);
      const left2Cell = this.getMazeCell(rowIndex, columnIndex - 2);
      if (
        leftCell &&
        !leftCell.isWall &&
        !isCurrentWallCell(rowIndex, columnIndex - 2)
      ) {
        directions.push("left");
      }

      // ランダムに伸ばす(2マス)
      if (directions.length > 0) {
        setMazeCellWall(currentY, currentX);

        let isPath = false;
        const directionIndex = Math.floor(Math.random() * directions.length);
        switch (directions[directionIndex]) {
          case "up":
            isPath = up2Cell ? !up2Cell.isWall : false;
            setMazeCellWall(--currentY, currentX);
            setMazeCellWall(--currentY, currentX);
            break;
          case "right":
            isPath = right2Cell ? !right2Cell.isWall : false;
            setMazeCellWall(currentY, ++currentX);
            setMazeCellWall(currentY, ++currentX);
            break;
          case "down":
            isPath = down2Cell ? !down2Cell.isWall : false;
            setMazeCellWall(++currentY, currentX);
            setMazeCellWall(++currentY, currentX);
            break;
          case "left":
            isPath = left2Cell ? !left2Cell.isWall : false;
            setMazeCellWall(currentY, --currentX);
            setMazeCellWall(currentY, --currentX);
            break;
        }

        if (isPath) {
          // 既存の壁に接続できていない場合は拡張続行
          extendMazeWall(currentY, currentX);
        }
      } else {
        const beforeCell = currentWallCells.pop();
        if (beforeCell) {
          extendMazeWall(beforeCell.y, beforeCell.x);
        }
      }
    };

    const isCurrentWallCell = (
      rowIndex: number,
      columnIndex: number
    ): boolean => {
      return (
        currentWallCells.find(
          (val) => val.x === columnIndex && val.y === rowIndex
        ) !== undefined
      );
    };

    const startCell = this.getMazeCell(MazeGameConfig.ROW_COUNT - 2, 1);
    if (startCell) {
      startCell.isStart = true;
      startCell.setTexture("maze", 2);
    }

    const goalCell = this.getMazeCell(1, MazeGameConfig.COLUMN_COUNT - 2);
    if (goalCell) {
      goalCell.isGoal = true;
      goalCell.setTexture("maze", 3);
    }

    let currentWallCells: { x: number; y: number }[] = [];
    while (startCells.length > 0) {
      // ランダムに開始セルを取得し、開始候補から削除
      const index = Math.floor(Math.random() * startCells.length);
      const cell = startCells[index];
      startCells = startCells.filter((_, i) => i !== index);
      const columnIndex = cell.columnIndex;
      const rowIndex = cell.rowIndex;

      const startCell = this.getMazeCell(rowIndex, columnIndex);
      if (startCell && !startCell.isWall) {
        currentWallCells = [];
        extendMazeWall(rowIndex, columnIndex);
      }
    }
  }

  createPlayer() {
    if (!this.group) {
      return;
    }
    if (this.player) {
      this.player.destroy(true);
    }
    const startCell = this.getMazeCell(MazeGameConfig.ROW_COUNT - 2, 1);
    if (!startCell) {
      return;
    }
    this.player = new Player(this, startCell.x, startCell.y, "maze", 4);
    this.player.rowIndex = startCell.rowIndex;
    this.player.columnIndex = startCell.columnIndex;
  }

  getMazeCell(rowIndex: number, columnIndex: number): MazeCell | null {
    if (!this.group) {
      return null;
    }
    const children = this.group.getChildren();
    for (let i = 0; i < children.length; i++) {
      const element = children[i] as MazeCell;
      if (
        element.columnIndex === columnIndex &&
        element.rowIndex === rowIndex
      ) {
        return element;
      }
    }
    return null;
  }

  createStartButton(text: string): void {
    if (this.startButton) {
      this.startButton.destroy(true);
    }
    this.startButton = new Button({
      scene: this,
      fontSize: "32px",
      height: 98,
      width: 180,
      text: text,
      x: 1140,
      y: 98,
      onClick: () => {
        this.createDialogBox(
          `Start the game?`,
          () => {
            this.createMaze();
            this.createPlayer();
            this.createDirectionalPad();
            this.initKeyInput();
            this.createStartButton("Re:start!");
            this.createAutoPlayButton();
            if (this.autoPlayTimer) {
              this.autoPlayTimer.destroy();
            }
            this.startTimer();
            this.resetMoveCounter();
          },
          () => {}
        );
      },
    });
  }

  createAutoPlayButton(): void {
    if (this.autoPlayButton) {
      this.autoPlayButton.destroy(true);
    }
    this.autoPlayButton = new Button({
      scene: this,
      fontSize: "32px",
      height: 98,
      width: 180,
      text: "Auto Play",
      x: 1140,
      y: 212,
      ...ComponentColor.Button.red,
      onClick: () => {
        this.createDialogBox(
          `Start this game with Auto Player?`,
          () => {
            this.createPlayer();
            this.destroyDirectionalPad();
            this.destroyKeyInput();
            this.startTimer();
            this.resetMoveCounter();
            this.startAutoPlay();
            if (this.autoPlayButton) {
              this.autoPlayButton.destroy(true);
            }
          },
          () => {}
        );
      },
    });
  }

  startAutoPlay(): void {
    const timerEventConfig: Phaser.Types.Time.TimerEventConfig = {
      delay: 200,
      loop: true,
      startAt: 0,
      timeScale: 1,
      callback: () => {
        if (!this.autoPlayTimer) {
          return;
        }

        const player = this.player;
        if (!this.group || !player) {
          return;
        }

        const move = (
          rowIndex: number,
          columnIndex: number,
          direction: Direction
        ) => {
          if (!this.canMovePlayer(rowIndex, columnIndex)) {
            return false;
          }
          this.movePlayer(rowIndex, columnIndex, direction, true);
          return true;
        };

        const moveToDirection = (direction: Direction) => {
          const rowIndex = player.rowIndex;
          const columnIndex = player.columnIndex;

          let isMoved = false;
          switch (direction) {
            case "up":
              isMoved = move(rowIndex - 1, columnIndex, direction);
              break;
            case "left":
              isMoved = move(rowIndex, columnIndex - 1, direction);
              break;
            case "down":
              isMoved = move(rowIndex + 1, columnIndex, direction);
              break;
            case "right":
              isMoved = move(rowIndex, columnIndex + 1, direction);
              break;
          }
          return isMoved;
        };

        if (player.previousDirection) {
          switch (player.previousDirection) {
            case "up":
              if (!moveToDirection("left")) {
                if (!moveToDirection("up")) {
                  if (!moveToDirection("right")) {
                    moveToDirection("down");
                  }
                }
              }
              break;
            case "left":
              if (!moveToDirection("down")) {
                if (!moveToDirection("left")) {
                  if (!moveToDirection("up")) {
                    moveToDirection("right");
                  }
                }
              }
              break;
            case "down":
              if (!moveToDirection("right")) {
                if (!moveToDirection("down")) {
                  if (!moveToDirection("left")) {
                    moveToDirection("up");
                  }
                }
              }
              break;
            case "right":
              if (!moveToDirection("up")) {
                if (!moveToDirection("right")) {
                  if (!moveToDirection("down")) {
                    moveToDirection("left");
                  }
                }
              }
              break;
          }
        } else {
          const directions: Direction[] = ["up", "left", "down", "right"];

          const shuffled = arrayUtility.shuffle(directions);

          for (const direction of shuffled) {
            if (moveToDirection(direction)) {
              break;
            }
          }
        }

        if (
          this.autoPlayTimer &&
          this.player &&
          this.checkGoal(this.player.rowIndex, this.player.columnIndex)
        ) {
          this.autoPlayTimer.paused = true;
        }
      },
      callbackScope: this,
    };

    if (this.autoPlayTimer) {
      this.autoPlayTimer.reset(timerEventConfig);
    } else {
      this.autoPlayTimer = this.time.addEvent(timerEventConfig);
    }
  }

  destroyDirectionalPad(): void {
    if (this.upButton) {
      this.upButton.destroy(true);
      this.upButton = null;
    }
    if (this.leftButton) {
      this.leftButton.destroy(true);
      this.leftButton = null;
    }
    if (this.downButton) {
      this.downButton.destroy(true);
      this.downButton = null;
    }
    if (this.rightButton) {
      this.rightButton.destroy(true);
      this.rightButton = null;
    }
  }

  canMovePlayer(rowIndex: number, columnIndex: number): boolean {
    if (!this.group || !this.player) {
      return false;
    }
    const cell = this.getMazeCell(rowIndex, columnIndex);
    if (!cell) {
      return false;
    }

    if (cell.isWall) {
      return false;
    }

    return true;
  }

  movePlayer(
    rowIndex: number,
    columnIndex: number,
    direction: Direction,
    auto?: boolean
  ): void {
    if (!this.group || !this.player) {
      return;
    }
    const cell = this.getMazeCell(rowIndex, columnIndex);
    if (!cell) {
      return;
    }

    if (!this.canMovePlayer(rowIndex, columnIndex)) {
      return;
    }

    this.addMoveCounter();

    const playerTween = this.tweens.add({
      targets: this.player,
      x: cell.x,
      y: cell.y,
      duration: 200,
      ease: Phaser.Math.Easing.Linear(0),
    });

    this.player.setCellPosition(rowIndex, columnIndex, cell.x, cell.y);
    this.player.previousDirection = direction;

    if (cell.isGoal) {
      this.stopTimer();
      if (this.autoPlayButton) {
        this.autoPlayButton.destroy(true);
      }

      this.destroyDirectionalPad();
      this.destroyKeyInput();

      if (auto) {
        this.createMessageBox(
          `Auto Player is Goaled\nTime: ${numberUtility.millisecondsToTime(
            this.timerMs
          )}\nMove Counter: ${this.moveCounter}`
        );
      } else {
        this.createMessageBox(
          `Goal!🎉\nTime: ${numberUtility.millisecondsToTime(
            this.timerMs
          )}\nMove Counter: ${this.moveCounter}`
        );
      }
    }
  }

  checkGoal(rowIndex: number, columnIndex: number): boolean {
    if (!this.group || !this.player) {
      return false;
    }
    const cell = this.getMazeCell(rowIndex, columnIndex);
    if (!cell) {
      return false;
    }

    if (!this.canMovePlayer(rowIndex, columnIndex)) {
      return false;
    }

    return cell.isGoal;
  }

  createDirectionalPad(): void {
    this.destroyDirectionalPad();
    const buttonSize = 80;
    const positionOffsetX = 18;
    const positionOffsetY = 32;

    const buttonOffset = 0;

    this.upButton = new Button({
      scene: this,
      fontSize: "32px",
      text: "↑",
      height: buttonSize,
      width: buttonSize,
      x: buttonSize / 2 + buttonSize + buttonOffset + positionOffsetX,
      y:
        MazeGameConfig.CANVAS_HEIGHT +
        buttonSize / 2 -
        buttonSize * 3 -
        buttonOffset * 2 -
        positionOffsetY,
      ...ComponentColor.Button.blue,
      onClick: () => {
        this.movePlayerUp();
      },
    });
    this.leftButton = new Button({
      scene: this,
      fontSize: "32px",
      text: "←",
      height: buttonSize,
      width: buttonSize,
      x: buttonSize / 2 + positionOffsetX,
      y:
        MazeGameConfig.CANVAS_HEIGHT +
        buttonSize / 2 -
        buttonSize * 2 -
        buttonOffset -
        positionOffsetY,
      ...ComponentColor.Button.blue,
      onClick: () => {
        this.movePlayerLeft();
      },
    });
    this.downButton = new Button({
      scene: this,
      fontSize: "32px",
      text: "↓",
      height: buttonSize,
      width: buttonSize,
      x: buttonSize / 2 + buttonSize + buttonOffset + positionOffsetX,
      y:
        MazeGameConfig.CANVAS_HEIGHT +
        buttonSize / 2 -
        buttonSize -
        positionOffsetY,
      ...ComponentColor.Button.blue,
      onClick: () => {
        this.movePlayerDown();
      },
    });
    this.rightButton = new Button({
      scene: this,
      fontSize: "32px",
      text: "→",
      height: buttonSize,
      width: buttonSize,
      x: buttonSize / 2 + buttonSize * 2 + buttonOffset * 2 + positionOffsetX,
      y:
        MazeGameConfig.CANVAS_HEIGHT +
        buttonSize / 2 -
        buttonSize * 2 -
        buttonOffset -
        positionOffsetY,
      ...ComponentColor.Button.blue,
      onClick: () => {
        this.movePlayerRight();
      },
    });
  }

  createMessageBox(text: string): void {
    if (this.messageBox) {
      this.messageBox.destroy(true);
    }
    if (this.closeMessageBoxButton) {
      this.closeMessageBoxButton.destroy(true);
    }

    this.messageBox = new MessageBox({
      scene: this,
      foreColor: MazeGameConfig.FOREGROUND_COLOR,
      fontSize: "32px",
      fontFamily: "Potte One",
      text: text,
      backColor: 0x191510,
      backAlpha: 0.9,
      borderColor: 0x191510,
      height: 480,
      width: 854,
      x: 640,
      y: 360,
    });

    this.saveResultMessageBoxButton = new Button({
      scene: this,
      fontSize: "36px",
      text: "Save Image",
      height: 90,
      width: 240,
      x: 480,
      y: 540,
      ...ComponentColor.Button.blue,
      onClick: () => {
        const canvas =
          document.querySelector<HTMLCanvasElement>(".maze canvas");
        if (canvas) {
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = `${dateUtility.getFileDateString(
            new Date()
          )}--maze-result.png`;
          link.click();
        }
      },
    });

    this.closeMessageBoxButton = new Button({
      scene: this,
      fontSize: "36px",
      text: "Close",
      height: 90,
      width: 240,
      x: 800,
      y: 540,
      onClick: () => {
        if (this.messageBox) {
          this.messageBox.destroy(true);
        }
        if (this.closeMessageBoxButton) {
          this.closeMessageBoxButton.destroy(true);
        }
        if (this.saveResultMessageBoxButton) {
          this.saveResultMessageBoxButton.destroy(true);
        }
      },
    });
  }

  createDialogBox(
    text: string,
    okHandleClick?: () => void,
    cancelHandleClick?: () => void
  ): void {
    if (this.dialogBox) {
      this.dialogBox.destroy(true);
    }
    if (this.okMessageBoxButton) {
      this.okMessageBoxButton.destroy(true);
    }
    if (this.cancelMessageBoxButton) {
      this.cancelMessageBoxButton.destroy(true);
    }

    this.dialogBox = new MessageBox({
      scene: this,
      foreColor: MazeGameConfig.FOREGROUND_COLOR,
      fontSize: "32px",
      fontFamily: "Potte One",
      text: text,
      backColor: 0x191510,
      backAlpha: 0.9,
      borderColor: 0x191510,
      height: 480,
      width: 854,
      x: 640,
      y: 360,
    });
    this.okMessageBoxButton = new Button({
      scene: this,
      fontSize: "48px",
      text: "OK",
      height: 90,
      width: 180,
      x: 540,
      y: 540,
      ...ComponentColor.Button.blue,
      onClick: () => {
        if (this.dialogBox) {
          this.dialogBox.destroy(true);
        }
        if (this.okMessageBoxButton) {
          this.okMessageBoxButton.destroy(true);
        }
        if (this.cancelMessageBoxButton) {
          this.cancelMessageBoxButton.destroy(true);
        }
        if (okHandleClick) {
          okHandleClick();
        }
      },
    });
    this.cancelMessageBoxButton = new Button({
      scene: this,
      fontSize: "48px",
      text: "Cancel",
      height: 90,
      width: 180,
      x: 740,
      y: 540,
      ...ComponentColor.Button.yellow,
      onClick: () => {
        if (this.dialogBox) {
          this.dialogBox.destroy(true);
        }
        if (this.okMessageBoxButton) {
          this.okMessageBoxButton.destroy(true);
        }
        if (this.cancelMessageBoxButton) {
          this.cancelMessageBoxButton.destroy(true);
        }
        if (cancelHandleClick) {
          cancelHandleClick();
        }
      },
    });
  }

  movePlayerUp() {
    if (!this.group || !this.player) {
      return;
    }
    this.movePlayer(this.player.rowIndex - 1, this.player.columnIndex, "up");
  }

  movePlayerLeft() {
    if (!this.group || !this.player) {
      return;
    }
    this.movePlayer(this.player.rowIndex, this.player.columnIndex - 1, "left");
  }

  movePlayerDown() {
    if (!this.group || !this.player) {
      return;
    }
    this.movePlayer(this.player.rowIndex + 1, this.player.columnIndex, "down");
  }

  movePlayerRight() {
    if (!this.group || !this.player) {
      return;
    }
    this.movePlayer(this.player.rowIndex, this.player.columnIndex + 1, "right");
  }

  initKeyInput() {
    const setKeyInput = (
      keyInput: Phaser.Input.Keyboard.Key | null,
      keyCode: number
    ) => {
      if (keyInput) {
        keyInput.destroy();
      }
      if (!this.input.keyboard) {
        return null;
      }
      return this.input.keyboard.addKey(keyCode);
    };

    this.keyInputW = setKeyInput(
      this.keyInputW,
      Phaser.Input.Keyboard.KeyCodes.W
    );
    if (this.keyInputW) {
      this.keyInputW.on("down", () => {
        this.movePlayerUp();
      });
    }

    this.keyInputA = setKeyInput(
      this.keyInputA,
      Phaser.Input.Keyboard.KeyCodes.A
    );
    if (this.keyInputA) {
      this.keyInputA.on("down", () => {
        this.movePlayerLeft();
      });
    }

    this.keyInputS = setKeyInput(
      this.keyInputS,
      Phaser.Input.Keyboard.KeyCodes.S
    );
    if (this.keyInputS) {
      this.keyInputS.on("down", () => {
        this.movePlayerDown();
      });
    }

    this.keyInputD = setKeyInput(
      this.keyInputD,
      Phaser.Input.Keyboard.KeyCodes.D
    );
    if (this.keyInputD) {
      this.keyInputD.on("down", () => {
        this.movePlayerRight();
      });
    }

    this.keyInputUp = setKeyInput(
      this.keyInputUp,
      Phaser.Input.Keyboard.KeyCodes.UP
    );
    if (this.keyInputUp) {
      this.keyInputUp.on("down", () => {
        this.movePlayerUp();
      });
    }

    this.keyInputLeft = setKeyInput(
      this.keyInputLeft,
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    if (this.keyInputLeft) {
      this.keyInputLeft.on("down", () => {
        this.movePlayerLeft();
      });
    }

    this.keyInputDown = setKeyInput(
      this.keyInputDown,
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
    if (this.keyInputDown) {
      this.keyInputDown.on("down", () => {
        this.movePlayerDown();
      });
    }

    this.keyInputRight = setKeyInput(
      this.keyInputRight,
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    if (this.keyInputRight) {
      this.keyInputRight.on("down", () => {
        this.movePlayerRight();
      });
    }
  }

  destroyKeyInput() {
    const func = (keyInput: Phaser.Input.Keyboard.Key | null) => {
      if (keyInput) {
        keyInput.destroy();
        keyInput = null;
      }
    };

    func(this.keyInputW);
    func(this.keyInputA);
    func(this.keyInputS);
    func(this.keyInputD);
    func(this.keyInputUp);
    func(this.keyInputLeft);
    func(this.keyInputDown);
    func(this.keyInputRight);
  }
}
