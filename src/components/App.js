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
        this.setUser();
    }

    setUser() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    user: firebase.auth().currentUser,
                });
            } else {
                this.setState({ user: 'no' });
            }
        });
    }

    renderPage() {
        if (this.state.user !== 'no' && this.state.user !== null) {
            return (
                <Home />
            )
        }
        else if (this.state.user !== null) {
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