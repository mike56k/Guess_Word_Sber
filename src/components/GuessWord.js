import React, { Component } from "react";
import "./GuessWord.css";
import { randomWord } from "./Words.js";

import part1 from "./images/0.jpg";
import part2 from "./images/1.jpg";
import part3 from "./images/2.jpg";
import part4 from "./images/3.jpg";
import part5 from "./images/4.jpg";
import part6 from "./images/5.jpg";
import part7 from "./images/6.jpg";

class GuessWord extends Component {
  static defaultProps = {
    maxMistake: 6,
    images: [part1, part2, part3, part4, part5, part6, part7],
  };

  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      guessed: new Set([]),
      answer: randomWord(),
    };
  }

  guessedWord() {
    return this.state.answer
      .split("")
      .map((lett) => (this.state.guessed.has(lett) ? lett : " _ "));
  }

  createButtons() {
    return "абвгдеёжзийклмнопрстуфхцчшщъыьэюя".split("").map((letter) => (
      <button
        class="btn_letter"
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }
  handleGuess = (e) => {
    let letter = e.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1),
    }));
  };

  resetButton = () => {
    this.setState({
      mistake: 0,
      guessed: new Set([]),
      answer: randomWord(),
    });
  };

  render() {
    const gameOver = this.state.mistake >= this.props.maxMistake;
    const isWin = this.guessedWord().join("") === this.state.answer;
    let gameStat = this.createButtons();

    if (isWin) {
      gameStat = "Поздравляем! Вы победили!";
    }

    if (gameOver) {
      gameStat = "К сожалению, вы проиграли.";
    }

    return (
      <div className="guess container">
        <h1 className="main_name">Угадай слово</h1>
        <div className="wrong_guess">
          Неправильных попыток: {this.state.mistake} из {this.props.maxMistake}
        </div>
        <div className="text-center">
          <img src={this.props.images[this.state.mistake]} alt="" />
        </div>
        <div className="text-center text_quest">
          <h2>Угадайте животное:</h2>
          <p>{!gameOver ? this.guessedWord() : this.state.answer}</p>
          <p>{gameStat}</p>
          <button className="btn_reset" onClick={this.resetButton}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default GuessWord;
