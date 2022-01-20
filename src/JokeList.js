import React, { Component } from "react";
import Joke from "./Joke";
import axios from "axios";
import "./JokeList.css";
import { v4 as uuidv4 } from "uuid";

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      jokes: JSON.parse(window.localStorage.jokes || "[]"),
    };
    this.getJoke = this.getJoke.bind(this);
    this.updateUpVote = this.updateUpVote.bind(this);
    this.updateDownVote = this.updateDownVote.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.seenJokes = new Set(this.state.jokes.map((ele) => ele.joke));
  }

  updateUpVote(id) {
    let newJokes = [];
    for (let joke of this.state.jokes) {
      if (joke.id === id) {
        newJokes.push({ ...joke, upVotes: joke.upVotes + 1 });
      } else {
        newJokes.push(joke);
      }
    }
    this.setState(
      (state) => ({
        jokes: newJokes,
      }),
      () => {
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
      }
    );
  }

  updateDownVote(id) {
    let newJokes = [];
    for (let joke of this.state.jokes) {
      if (joke.id === id) {
        newJokes.push({ ...joke, downVotes: joke.downVotes + 1 });
      } else {
        newJokes.push(joke);
      }
    }
    this.setState(
      (state) => ({
        jokes: newJokes,
      }),
      () => {
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
      }
    );
  }

  async getJoke() {
    try {
      let count = 0;
      let newJokes = [];

      do {
        const data = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        });

        if (!this.seenJokes.has(data.data)) {
          let jokeData = { ...data.data, upVotes: 0, downVotes: 0 };
          newJokes.push(jokeData);
          count++;
        }
      } while (count < this.props.numJokesToGet);

      this.setState(
        (state) => ({
          loading: false,
          jokes: [...state.jokes, ...newJokes],
        }),
        () => {
          window.localStorage.setItem(
            "jokes",
            JSON.stringify(this.state.jokes)
          );
        }
      );
    } catch (e) {
      alert(e);
    }
  }
  handleClick() {
    this.setState(
      {
        loading: true,
      },
      this.getJoke
    );
  }
  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getJoke();
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="JokeList-spinner">
          <i className="far fa-8x fa-laugh fa-spin" />
          <h1 className="JokeList-title">Loading...</h1>
        </div>
      );
    }
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad </span>Jokes
          </h1>
          <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
          <button onClick={this.handleClick} className="JokeList-getmore">
            Get New Joke
          </button>
        </div>
        <div className="JokeList-jokes">
          {this.state.jokes.map((ele) => (
            <Joke
              info={ele}
              updateUpVote={this.updateUpVote}
              updateDownVote={this.updateDownVote}
              key={uuidv4()}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
