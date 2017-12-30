import React, { Component } from "react";

class UserList extends Component {
  render() {
    return (
      <div className="UserList">
        {this.props.users.map((user, i) => (
          <div
            className="user"
            key={i}
            onClick={() => this.props.startLogin(user.name)}
          >
            <img src={user.image} className="userImage" />
            <div className="userName">{user.display_name}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default UserList;
