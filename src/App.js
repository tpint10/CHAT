import React, { Component } from "react";
import Messages from "./Messages";
import Input from "./Input";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      member: {
        username: "tpint10",
        color: "red",
        id: "I3Ne5VmJJo6dOHIt",
      },
    };
    this.drone = new window.Scaledrone("I3Ne5VmJJo6dOHIt", {
      data: this.state.member,
      secretKey: "QakkNmAaRB4Ah4NutOL8ZV3UZdTv2HEP",
    });
  }

  componentDidMount() {
    const { member } = this.state;

    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const updatedMember = { ...member };
      updatedMember.id = this.drone.clientId;
      this.setState({ member: updatedMember });
    });

    const room = this.drone.subscribe("observable-tpint10");

    room.on("data", (data, member) => {
      const { messages } = this.state;
      const updatedMessages = [...messages, { member, text: data }];
      this.setState({ messages: updatedMessages });
    });
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-tpint10",
      message,
    });
  };

  render() {
    const { messages, member } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <h1>My Chat App</h1>
        </div>
        <Messages messages={messages} currentMember={member} />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }
}

export default App;
