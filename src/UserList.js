import React, { Component } from "react";

class UserList extends Component {
  render() {
    console.log(this.props.users);
    return (
      <div className="UserList">
        {this.props.users.map((user, i) => (
          <div className="user" key={i}>
            <img src={user.image} />
            {user.display_name}
          </div>
        ))}
      </div>
    );
  }
}

export default UserList;
