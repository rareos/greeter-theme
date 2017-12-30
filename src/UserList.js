import React, { Component } from "react";

class UserList extends Component {
  render() {
    console.log(this.props.users);
    return (
      <div className="UserList">
        {this.props.users.map((user, i) => (
          <div
            className="user"
            key={i}
            onClick={() => this.props.startLogin(user.name)}
          >
            <img src={user.image} class="userImage" />
            <div class="userName">{user.display_name}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default UserList;
