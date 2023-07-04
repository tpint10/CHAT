import React from "react";

class Messages extends React.Component {
  renderMessage(message, index) {
    const { member, text } = message;
    const { currentMember } = this.props;
    const messageFromMe = member && member.id === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";
    const style = member ? { backgroundColor: member.color } : {};

    if (!member) {
      return null;
    }

    return (
      <li key={index} className={className}>
        <div className="avatar" style={style} />
        <div className="Message-content">
          <div className="username">{member.username}</div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }

  render() {
    const { messages } = this.props;
    return (
      <ul className="Messages-list">
        {messages.map((message, index) => this.renderMessage(message, index))}
      </ul>
    );
  }
}

export default Messages;
