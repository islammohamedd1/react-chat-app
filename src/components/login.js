import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import * as firebase from 'firebase';
import { Grid, AppBar } from '@material-ui/core';
import SignIn from './SignIn';
import SignUp from './SignUp';

const styles = theme => ({
  main: {
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing.unit * 9,
    minHeight: '80vh',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  headline: {
    color: "#fff",
    marginBottom: theme.spacing.unit * 3,
    fontWeight: 'bold',
  },
  subheading: {
    marginBottom: theme.spacing.unit * 5,
  },
  appBar: {
    padding: theme.spacing.unit,
    paddingLeft: "5%"
  },
  title: {
    padding: theme.spacing.unit,
    color: '#fff',
    fontWeight: "bold",
  },
  btn: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  a: {
    textDecoration: 'none',
  },
});

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      action: 'up',
    }

    this.formRef = React.createRef();

    this.signIn = this.signIn.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  signIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(result => {
    }).catch(error => this.handleError(error));
    
  }

  handleError = error => {
    if (error.code === 'auth/popup-blocked') {
      alert("Please enable popups in your browser to continue!");
    } else {
      alert(error.message);
    }
  }

  handleSignInAction = () => {
    this.setState({action: 'in'});
    
  }

  handleSignUpAction = () => {
    this.setState({action: 'up'});
  }

  renderForm = () => {
    if (this.state.action === "in") {
      return (
        <SignIn setUser={this.props.setUser} />
      )
    } else {
      return (
        <SignUp readyToRender={this.props.readyToRender} notReadyToRender={this.props.notReadyToRender} setUser={this.props.setUser} />
      )
    }
  }

  renderContent = classes => {
      return (
        <div>
          <Grid container spacing={16}>
            <Grid item sm={6}>
              <Typography variant="h2" className={classes.headline}>Welcome to the most awesome chat app</Typography>
              <Typography variant="h6" className={classes.subheading}>Enjoy chatting with your friends in a private, awesome and free chat app.</Typography>
              <a href="#form" className={classes.a}>
                <Button variant="contained" color={this.state.action === 'in' ? 'primary' : 'default'} className={classes.btn} onClick={this.handleSignInAction}>Sign in</Button>
              </a>
              <a href="#form" className={classes.a}>
                <Button variant="contained" color={this.state.action === 'up' ? 'primary' : 'default'} className={classes.btn} onClick={this.handleSignUpAction}>Sign up</Button>
              </a>
            </Grid>
            <Grid item sm={6} id="form">
              {this.renderForm()}
            </Grid>
          </Grid>
        </div>
      )
  }
  
  render() {
    const { classes } = this.props;
  
    return (
      <main className={classes.main}>
        <AppBar className={classes.appBar} color="default">
          <Typography variant="h4" className={classes.title}>Chat App</Typography>
        </AppBar>
        <CssBaseline />
        <Paper className={classes.paper}>
          {this.renderContent(classes)}
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Login);