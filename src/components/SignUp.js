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
        marginBottom: theme.spacing.unit * 2,
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
    },
    fullWidth: {
        width: "100%",
        display: "block",
    },
    fileButton: {
        position: "relative",
        width: "100%",
        textAlign: "left",
    },
    fileInput: {
        position: "absolute",
        opacity: 0,
    }
});


class SignUp extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        displayName: "",
        avatar: null,
        email: "",
        password: "",
        error: null,
        loading: false,
      }
    }

    handleFormSubmit = async (event) => {
        event.preventDefault();
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        try {
            this.setState({loading: true});
            const db = firebase.firestore()
            this.props.notReadyToRender();
            const result = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
            
            await result.user.updateProfile({displayName: this.state.displayName});
            
            const userRef = db.doc(`users/${result.user.uid}`);
            const searchRef = db.doc(`searches/${result.user.uid}`);
            
            const batch = db.batch();

            batch.set(userRef, {displayName: this.state.displayName}, {merge: true});
            batch.set(searchRef, {displayName: this.state.displayName}, {merge: true});

            await batch.commit();

            const avatarRef = firebase.storage().ref(`avatars/${result.user.uid}`)
            await avatarRef.put(this.state.avatar);
            await avatarRef.updateMetadata({
                cacheControl: 'public,max-age=300',
                contentType: 'image/jpeg'
            });

            this.props.readyToRender();
        }
        catch (error_2) {
            this.setState({loading: false});
            this.handleError(error_2);
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
        if (event.target.name === "email") {
            this.setState({ email: event.target.value });
        } else if (event.target.name === "password") {
            this.setState({ password: event.target.value });
        } else if (event.target.name === "name") {
            this.setState({ displayName: event.target.value });
        } else if (event.target.name === "avatar") {
            let avatar = event.target.files[0];
            this.setState({avatar});
            console.log(avatar.type);
            if (avatar.type !== "image/jpeg" && avatar.type !== "image/png") {
                this.setState({ error: "Please add an image" });
            } else {
                this.setState({error: ""});
            }
        }
    }

    renderLoading = () => {
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
    }

    render() {
      const { classes } = this.props;
    
      return (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Typography variant="h4" className={classes.header}>Sign Up</Typography>
                <Typography variant="caption" className={this.state.error ? classes.error: classes.hidden}>{this.state.error}</Typography>
                <form className={classes.form} onSubmit={this.handleFormSubmit}>
                <Button variant="contained" fullWidth className={classes.fileButton} color="secondary">
                    <Typography variant="body1" className={classes.fullWidth}>{this.state.avatar ? this.state.avatar.name : "Select your profile picture"}</Typography>
                    <input
                        type="file"
                        name="avatar"
                        value={this.avatar}
                        onChange={this.handleChange}
                        className={classes.fileInput}

                        />
                </Button>
                <TextField
                    type="text"
                    name="name"
                    label="Name"
                    value={this.state.displayName}
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

                    <Button className={classes.btn} variant="contained" type="submit">Sign Up</Button>
                </form>
            </Paper>

            {this.renderLoading()}
        </main>
      );
    }
  }
  
  export default withStyles(styles)(SignUp);