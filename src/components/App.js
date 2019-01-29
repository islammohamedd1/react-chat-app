import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import Login from "./login";
import Home from './Home';

import * as firebase from 'firebase';

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
            user: null,
        }

        this.setUser = this.setUser.bind(this);
    }

    setUser() {
        this.setState({
            user: firebase.auth().currentUser,
        })
        console.log(this.state.user);
    }

    renderPage() {
        if (this.state.user) {
            return (
                <Home />
            )
        }
        else {
            return (
                <Login setUser={this.setUser} />
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