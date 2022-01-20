import React, { Component } from "react";
import "./Joke.css";

class Joke extends Component {
  constructor(props) {
    super(props);
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }

  getEmoji() {
    if (this.props.info.upVotes - this.props.info.downVotes >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (this.props.info.upVotes - this.props.info.downVotes >= 12) {
      return "em em-laughing";
    } else if (this.props.info.upVotes - this.props.info.downVotes >= 9) {
      return "em em-smiley";
    } else if (this.props.info.upVotes - this.props.info.downVotes >= 6) {
      return "em em-slightly_smiling_face";
    } else if (this.props.info.upVotes - this.props.info.downVotes >= 3) {
      return "em em-neutral_face";
    } else if (this.props.info.upVotes - this.props.info.downVotes >= 0) {
      return "em em-confused";
    } else {
      return "em em-angry";
    }
  }

  handleUpVote() {
    this.props.updateUpVote(this.props.info.id);
  }
  handleDownVote() {
    this.props.updateDownVote(this.props.info.id);
  }
  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i className="fas fa-arrow-up up" onClick={this.handleUpVote}>
            <span className="Joke-votes ">{this.props.info.upVotes}</span>
          </i>
          <i className="fas fa-arrow-down down" onClick={this.handleDownVote}>
            <span className="Joke-votes ">{this.props.info.downVotes}</span>
          </i>
        </div>

        <div className="Joke-text">{this.props.info.joke}</div>
        <div className="Joke-emoji">
          <i
            className={this.getEmoji()}
            aria-role="presentation"
            aria-label="ROLLING ON THE FLOOR LAUGHING"
          ></i>
        </div>
      </div>
    );
  }
}

export default Joke;
