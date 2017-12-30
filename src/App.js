import React, { Component } from "react";
import UserList from "./UserList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "selectUser"
    };
  }

  render() {
    return (
      <div className="GreeterWindow">
        {this.state.stage == "selectUser" && <UserList users={lightdm.users} />}
        <div class="BottomButtons">
          {lightdm.can_suspend && <div className="button">Suspend</div>}
          {lightdm.can_hibernate && <div className="button">Hibernate</div>}
          {lightdm.can_restart && <div className="button">Restart</div>}
          {lightdm.can_shutdown && <div className="button">Shutdown</div>}
        </div>
      </div>
    );
  }
}

export default App;
