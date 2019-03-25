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
    this.runGame = this.runGame.bind(this);
    this.stopRunning = this.stopRunning.bind(this);
  }

  state = {
    cells: [],
    interval: 100,
    isRunning: false
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

  runGame() {
    this.setState({ isRunning: true });
    this.runIteration();
  }

  stopRunning() {
    this.setState({ isRunning: false });
    if (this.timeOutHandler) {
      window.clearTimeout(this.timeOutHandler);
      this.timeOutHandler = null;
    }
  }

  runIteration() {
    console.log("blah");

    let newBoard = this.makeEmptyBoard();

    // adding iteration logic here

    this.board = newBoard;
    this.setState({ cells: this.makeCells() });

    this.timeOutHandler = window.setTimeout(() => {
      this.runIteration();
    }, this.state.interval);
  }

  handleIntervalChange(props) {
    return this.setState({ interval: props });
  }

  render() {
    const { cells } = this.state;

    class Cell extends React.Component {
      render() {
        const { x, y } = this.props;
        return (
          <div
            className="Cell"
            style={{
              left: `${cellSize * x + 1}px`,
              top: `${cellSize * y + 1}px`,
              width: `${cellSize - 1}px`,
              height: `${cellSize - 1}px`
            }}
          />
        );
      }
    }

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
        >
          {cells.map(cell => (
            <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
          ))}
        </div>
        <div>
          Update every
          <input
            value={this.state.interval}
            onChange={e => this.handleIntervalChange(e.target.value)}
          />
          mesc
          {this.state.isRunning ? (
            <button className="button" onClick={this.stopRunning}>
              STOP
            </button>
          ) : (
            <button className="button" onClick={this.runGame}>
              RUN
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Game;
