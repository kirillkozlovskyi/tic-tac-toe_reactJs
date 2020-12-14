import React from "react";
import {Board} from "./board";
import {calculateWinner} from '../services/common'

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNeat: true
        }
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : '0';
        this.setState({
            history: history.concat([{squares}]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const steps = this.state.history.map((step, move) => {
            const desk = move ? `Go to move #'${ move }` : 'Go to game start';
            return(
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desk}</button>
                </li>
            );
        })

        let status;
        if (winner) {
            status = 'Winner is ' + winner;
        } else {
            status = `Next Player ${this.state.xIsNext ? 'X' : '0'}`
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div> {status}</div>
                    <div>
                        <ol>{steps}</ol>
                    </div>
                </div>
            </div>
        );
    }
}