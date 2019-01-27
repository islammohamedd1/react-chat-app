import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import {SnackbarContent} from '@material-ui/core';
import "./login.css";

import * as Data from "../../db.json"

const styles = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  }
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            error: false,
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    }

    handleInput(e) {
        this.setState({
            username: e.target.value
        });
    }

    handleSubmit(e) {
        // e.preventDefault();
        let result;
        result = Data.users.filter((user) => user.username === this.state.username);
        if (result.length !== 0) {
            this.setState({ error: false });
            this.props.login(this.state.username);
        } else {
            this.setState({ error: true });
        }
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleSubmit();
        }
    }

    handleSnackbarClose() {
        this.setState({error: false});
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="login-container">
                <h3>Please enter your username</h3>
                <TextField
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleInput}
                    onKeyPress={this.handleKeyPress}
                />
                <br />
                <Button variant={"contained"} onClick={this.handleSubmit}>Login</Button>
                <Snackbar
                    anchorOrigin={{vertical: 'bottom',horizontal: 'left'}}
                    open={this.state.error}
                    onClose={this.handleSnackbarClose}
                >
                    <SnackbarContent className={classes.error} message={"Wrong password entered"} />
                </Snackbar>
            </div>
        )
    }
}

export default withStyles(styles)(Login);