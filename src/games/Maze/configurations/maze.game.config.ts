// NOTE: 5以上の奇数であること
const ROW_COUNT: number = 21;
// NOTE: 5以上の奇数であること
const COLUMN_COUNT: number = 23;
const CANVAS_WIDTH: number = 1280;
const CANVAS_HEIGHT: number = 720;
const FOREGROUND_COLOR: string = "#d7c0a3";
const BACKGROUND_COLOR: string = "#191510";
const MAZE_CELL_SIZE: number = 32;
const MAZE_WIDTH: number = COLUMN_COUNT * MAZE_CELL_SIZE;
const MAZE_HEIGHT: number = ROW_COUNT * MAZE_CELL_SIZE;
const MAZE_OFFSET_X: number = (CANVAS_WIDTH / 2) - (MAZE_WIDTH / 2);
const MAZE_OFFSET_Y: number = (CANVAS_HEIGHT / 2) - (MAZE_HEIGHT / 2);

const MazeGameConfig = {
  ROW_COUNT,
  COLUMN_COUNT,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  FOREGROUND_COLOR,
  BACKGROUND_COLOR,
  MAZE_OFFSET_X,
  MAZE_OFFSET_Y,
};

export default MazeGameConfig;
