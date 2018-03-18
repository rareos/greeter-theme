import React, { Component } from "react";
import UserList from "./UserList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: lightdm.users.length > 1 ? "selectUser" : "authUser",
      username: lightdm.users.length > 1 ? null : lightdm.users[0].name,
      password: "",
      invalidPasswordError: false,
      session: lightdm.sessions[0].key
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
        this.setState({ invalidPasswordError: true, password: "" });
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
        {this.state.stage == "authUser" && (
          <div className="LoginBox">
            <div className="userName">
              {
                lightdm.users.filter(
                  user => user.name === this.state.username
                )[0].display_name
              }
            </div>
            <form
              onSubmit={e => {
                e.preventDefault();
                lightdm.authenticate(this.state.username);
              }}
            >
              <input
                type="password"
                placeholder="Password"
                className="PasswordInput"
                ref={input => {
                  this.passwordInput = input;
                  if (input) {
                    input.focus();
                  }
                }}
                value={this.state.password}
                onChange={val => this.setState({ password: val.target.value })}
                style={
                  this.state.invalidPasswordError
                    ? { border: "2px solid #F44336" }
                    : {}
                }
              />
              <button className="SubmitButton">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  viewBox="0 0 26 26"
                  enableBackground="new 0 0 26 26"
                  width="18px"
                  height="18px"
                >
                  <path
                    d="M16.7,22.7l9-9c0.2-0.2,0.3-0.5,0.3-0.7c0-0.3-0.1-0.5-0.3-0.7l-9-9C16.5,3.1,16.3,3,16,3s-0.5,0.1-0.7,0.3l-1.4,1.4  c-0.4,0.4-0.4,1,0,1.4l4,4c0.3,0.3,0.1,0.9-0.4,0.9H1c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1h16.6c0.4,0,0.7,0.5,0.4,0.9l-4,4  c-0.4,0.4-0.4,1,0,1.4l1.4,1.4c0.2,0.2,0.4,0.3,0.7,0.3C16.3,23,16.5,22.9,16.7,22.7z"
                    fill="#d9d9d9"
                  />
                </svg>
              </button>
            </form>
            {lightdm.users.length > 1 && (
              <div
                className="BackButton"
                onClick={() =>
                  this.setState({
                    stage: "selectUser",
                    username: null,
                    password: "",
                    invalidPasswordError: false
                  })
                }
              >
                Switch User
              </div>
            )}
          </div>
        )}
        {this.state.notification && (
          <div className="notification">{this.state.notification}</div>
        )}
        <div className="BottomButtons">
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
