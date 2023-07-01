import React from "react";

class Input extends React.Component {
  state = {
    text: "",
  };

  handleChange = (event) => {
    this.setState({ text: event.target.value });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default line break behavior
      this.sendMessage();
    }
  };

  handleClick = () => {
    this.sendMessage();
  };

  sendMessage = () => {
    const { text } = this.state;
    if (text.trim() !== "") {
      this.props.onSendMessage(text.trim());
      this.setState({ text: "" });
    }
  };

  render() {
    const { text } = this.state;

    return (
      <div className="Input">
        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <button onClick={this.handleClick}>Send</button>
      </div>
    );
  }
}

export default Input;
