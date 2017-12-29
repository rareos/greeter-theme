import React, { Component } from "react";
import UserList from "./UserList";

class App extends Component {
  render() {
    return (
      <div className="GreeterWindow">
        <UserList users={lightdm.users} />
      </div>
    );
  }
}

export default App;
