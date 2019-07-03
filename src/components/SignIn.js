import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import red from '@material-ui/core/colors/red';

import * as firebase from 'firebase';
import { TextField } from '@material-ui/core';
import Loading from './Loading';


const styles = theme => ({
    paper: {
        padding: theme.spacing.unit * 2,
        background: theme.palette.primary.dark,
        textAlign: "center",
    },
    header: {
        margin: theme.spacing.unit,
        fontWeight: 'bold',
        color: "#fff",
        textAlign: "left",
    },
    form: {
        marginTop: theme.spacing.unit,
        color: "#fff"
    },
    textField: {
        width: '100%',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },


    label: {
        color: "#e3e0ff",
    },

    focused: {
        color: "#fff",
        '&:after': {
            borderBottomColor: "#fff",
          },
    },

    labelFocused: {
        color: "#fff",
    },

    input: {
        color: "#fff"
    },

    notchedOutline: {
        color: "#fff"
    },

    btn: {
        marginTop: theme.spacing.unit * 2,
    },
    hidden: {
        display: "none",
    },

    error: {
        color: red[500],
    }

});


class SingIn extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        email: "",
        password: "",
        error: null,
        loading: false,
      }
    }
  
    signIn = () => {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider).then(result => {
      }).catch(error => this.handleError(error));
      
    }


    handleFormSubmit = event => {
        this.setState({loading: true});
        event.preventDefault();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(async () => {
            try {
                const result = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
                console.log(result);
            }
            catch (error) {
                this.handleError(error);
            }
        })
        
    }

    renderLoading = () => {
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
    }
  
    handleError = error => {
      if (error.code === 'auth/popup-blocked') {
        this.setState({error: "Please enable popups in your browser to continue!"});
      } else if (error.code === "auth/user-not-found") {
        this.setState({error: "Invalid email or password entered"});
      } else {
          console.log(error.code);
        this.setState({error: error.message});
      }
    }
    
    handleChange = event => {
        if (event.target.name=== "email") {
            this.setState({ email: event.target.value });
        } else if (event.target.name=== "password") {
            this.setState({ password: event.target.value });
        }
    }

    render() {
      const { classes } = this.props;
    
      return (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Typography variant="h4" className={classes.header}>Sign In</Typography>
                <Typography variant="caption" className={this.state.error ? classes.error: classes.hidden}>{this.state.error}</Typography>
                <form className={classes.form} onSubmit={this.handleFormSubmit}>
                    <TextField
                        type="email"
                        name="email"
                        label="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        className={classes.textField}

                        InputLabelProps={{
                            classes: {
                              root: classes.label,
                              focused: classes.labelFocused,
                            },
                          }}
                        InputProps={{
                            classes: {
                                root: classes.input,
                                focused: classes.focused,
                            },
                        }}

                        />
                    <TextField
                        type="password"
                        name="password"
                        label="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        className={classes.textField}

                        InputLabelProps={{
                            classes: {
                              root: classes.label,
                              focused: classes.labelFocused,
                            },
                          }}

                        InputProps={{
                            classes: {
                                root: classes.input,
                                focused: classes.focused,
                            },
                        }}
                        />

                    <Button className={classes.btn} variant="contained" type="submit">Sign In</Button>
                </form>
            </Paper>
            {this.renderLoading()}
        </main>
      );
    }
  }
  
  export default withStyles(styles)(SingIn);