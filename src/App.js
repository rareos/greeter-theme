import React, { Component } from "react";
import UserList from "./UserList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "selectUser"
    };
  }

  componentWillMount() {
    window.show_message = (text, type) => {
      this.setState({ notification: text });
      setTimeout(() => this.setState({ notification: "" }), 3000);
    };

    window.show_prompt = (text, type) => {
      if (type === "text") {
        window.show_message(text, type);
      } else {
        lightdm.respond(this.state.password);
      }
    };

    window.authentication_complete = () => {
      if (window.lightdm.is_authenticated) {
        window.lightdm.start_session_sync(this.state.session);
      } else {
        // Password was invalid. Do something about it
      }
    };

    window.autologin_timer_expired = () => {
      window.show_message("Autologin expired.", "text");
    };
  }

  startAuth(username) {
    this.setState({ stage: "authUser", username: username });
  }

  render() {
    return (
      <div className="GreeterWindow">
        {this.state.stage == "selectUser" && (
          <UserList
            users={lightdm.users}
            startLogin={this.startAuth.bind(this)}
          />
        )}
        {this.state.stage == "authUser" && <div />}
        {this.state.notification && (
          <div class="notification">{this.state.notification}</div>
        )}
        <div class="BottomButtons">
          {lightdm.can_suspend && (
            <div className="button" onClick={lightdm.suspend}>
              Suspend
            </div>
          )}
          {lightdm.can_hibernate && (
            <div className="button" onClick={lightdm.hibernate}>
              Hibernate
            </div>
          )}
          {lightdm.can_restart && (
            <div className="button" onClick={lightdm.restart}>
              Restart
            </div>
          )}
          {lightdm.can_shutdown && (
            <div className="button" onClick={lightdm.shutdown}>
              Shutdown
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
