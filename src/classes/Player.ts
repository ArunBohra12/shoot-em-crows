import { getCanvasAndContext } from "../canvas";
import { Size, Position } from "../types/gameTypes";

interface PlayerInterface {
  size: Size;
  position: Position;
  speed: number;
}

class Player implements PlayerInterface {
  private context: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;

  public position: Position;
  public size: Size = {
    height: 90,
    width: 60,
  };

  public speed = 0;

  constructor(public canvasSelector: string) {
    const { canvas, context } = getCanvasAndContext(canvasSelector);

    this.context = context;
    this.canvas = canvas;

    // Calculate the position at the center in x-axis
    this.position = {
      x: canvas.width / 2 - this.size.width / 2,
      y: canvas.height - 150,
    };
  }

  stop(): void {
    this.speed = 0;
  }

  /**
   * If the side is left, set the speed to -5, otherwise if the side is right, set the speed to 5.
   * @param {string} side - string - this is the side that the player is moving to.
   */
  move(side: string): void {
    const speedChange = 5;
    const maxX = this.canvas.width - 100;

    if (side === "left" && this.position.x >= 100) {
      this.speed = -speedChange;
      return;
    }

    if (side === "right" && this.position.x <= maxX) {
      this.speed = speedChange;
      return;
    }

    this.speed = 0;
  }

  // Draw the player
  draw(): void {
    this.context.fillStyle = "#f00";

    this.position.x += this.speed;
    this.context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
  }
}

export default Player;
