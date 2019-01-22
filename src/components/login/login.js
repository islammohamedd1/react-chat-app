import React from 'react';
import "./login.css";

import * as Data from "../../db.json"
console.log(Data.users[0]);

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            error: false,
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        this.setState({
            username: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let result;
        result = Data.users.filter((user) => user.username === this.state.username);
        if (result.length !== 0) {
            this.setState({ error: false });
            this.props.login(this.state.username);
        } else {
            this.setState({ error: true });
        }
    }

    renderError() {
        if (this.state.error === true) {
            return (
                <div className="Error">Invalid username entered</div>
            )
        }
    }

    render() {
        return (
            <div className="login-container">
                {this.renderError()}
                <h3>Please enter your username</h3>
                <input value={this.state.username} onChange={this.handleInput} placeholder="Username"/>
                <button type="submit" onClick={this.handleSubmit}>Log in</button>
            </div>
        )
    }
}

export default Login;