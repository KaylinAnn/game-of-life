import React, { Component } from "react";
import "./Game.css";
const cellSize = 20;
const width = 800;
const height = 600;

export class Game extends Component {
  constructor() {
    super();
    this.rows = height / cellSize;
    this.colms = width / cellSize;
    this.board = this.makeEmptyBoard();
  }

  state = {
    cells: []
  };

  makeEmptyBoard() {
    let board = [];
    for (let y = 0; y < this.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.colms; x++) {
        board[y][x] = false;
      }
    }
    return board;
  }

  makeCells() {
    let cells = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.colms; x++) {
        if (this.board[y][x]) {
          cells.push({ x, y });
        }
      }
    }
    return cells;
  }

  getElementOffSet() {
    const rect = this.boardRef.getBoundingClientRect();
    const doc = document.documentElement;
    return {
      x: rect.left + window.pageXOffset - doc.clientLeft,
      y: rect.top + window.pageYOffset - doc.clientTop
    };
  }

  handleClick = e => {
    const elemOffSet = this.getElementOffSet();
    const offSetX = e.clientX - elemOffSet.x;
    const offSetY = e.clientY - elemOffSet.y;

    const x = Math.floor(offSetX / cellSize);
    const y = Math.floor(offSetY / cellSize);

    if (x >= 0 && x <= this.colms && y >= 0 && y <= this.rows) {
      this.board[y][x] = !this.board[y][x];
    }

    this.setState({ cells: this.makeCells() });
  };

  render() {
    return (
      <div>
        <div
          className="Board"
          style={{
            width: width,
            height: height,
            backgroundSize: `${cellSize}px ${cellSize}px`
          }}
          onClick={this.handleClick}
          ref={e => {
            this.boardRef = e;
          }}
        />
      </div>
    );
  }
}

export default Game;
