import React from 'react';
import Login from "./login/login";
import Home from './Home/Home';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            user: null,
        }

        this.login = this.login.bind(this);
    }

    login(username) {
        this.setState({
            loggedIn: true,
            user: username
        })
    }

    renderPage() {
        if (this.state.loggedIn === false) {
            return (
                <Login
                    login={this.login}
                />
            )
        }
        else {
            return (
                <Home />
            )
        }
    }
    render() {
        return (this.renderPage())
    }
}

export default App;