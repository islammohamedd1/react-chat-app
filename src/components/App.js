import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import Login from "./login/login";
import Home from './Home/Home';

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            username: null,
        }

        this.login = this.login.bind(this);
    }

    login(username) {
        this.setState({
            loggedIn: true,
            username: username
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
                <Home username={this.state.username} />
            )
        }
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                {this.renderPage()}
            </MuiThemeProvider>
            )
    }
}

export default App;