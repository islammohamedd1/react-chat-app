// import React from 'react';
// import { withStyles } from '@material-ui/core/styles'
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import Snackbar from '@material-ui/core/Snackbar';
// import {SnackbarContent} from '@material-ui/core';
// import "./login.css";

// import * as Data from "../../db.json"

// const styles = theme => ({
//   error: {
//     backgroundColor: theme.palette.error.dark,
//   }
// });

// class Login extends React.Component {
//     constructorthis.(props) {
//         super(props);
//         this.state = {
//             username: "",
//             error: false,
//         }

//         this.handleInput = this.handleInput.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleKeyPress = this.handleKeyPress.bind(this);
//         this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
//     }

//     handleInput(e) {
//         this.setState({
//             username: e.target.value
//         });
//     }

//     handleSubmit(e) {
//         let result;
//         result = Data.users.filter((user) => user.username === this.state.username);
//         if (result.length !== 0) {
//             this.setState({ error: false });
//             this.props.login(this.state.username);
//         } else {
//             this.setState({ error: true });
//         }
//     }

//     handleKeyPress(e) {
//         if (e.key === 'Enter') {
//             this.handleSubmit();
//         }
//     }

//     handleSnackbarClose() {
//         this.setState({error: false});
//     }

//     render() {
//         const { classes } = this.props;
//         return (
//             <div className="login-container">
//                 <h3>Please enter your username</h3>
//                 <TextField
//                     placeholder="Username"
//                     value={this.state.username}
//                     onChange={this.handleInput}
//                     onKeyPress={this.handleKeyPress}
//                 />
//                 <br />
//                 <Button variant={"contained"} onClick={this.handleSubmit}>Login</Button>
//                 <Snackbar
//                     anchorOrigin={{vertical: 'bottom',horizontal: 'left'}}
//                     open={this.state.error}
//                     onClose={this.handleSnackbarClose}
//                 >
//                     <SnackbarContent className={classes.error} message={"Wrong password entered"} />
//                 </Snackbar>
//             </div>
//         )
//     }
// }

// export default withStyles(styles)(Login);






















import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import red from '@material-ui/core/colors/red';

import * as firebase from 'firebase';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  signin: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: red['A700'],
    color: red[50],
    '&:hover': {
        backgroundColor: red['A700'],
        color: red[50],
    }
  },
});

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }

    this.signIn = this.signIn.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  signIn = () => {
    var _this = this; // to use it inside the then, catch functions
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
      var token = result.credential.accessToken;
      
      _this.props.setUser()

    }).catch(function(error) {
      _this.handleError(error);
    });
  }

  handleError = error => {
    if (error.code === 'auth/popup-blocked') {
      alert("Please enable popups in your browser to continue!");
    } else {
      alert(error.message);
    }
  }

  renderContent = classes => {
    var user = this.state.user;
    


    if (this.state.user) {
      return (
        <div>
          <Typography align="center" component="h1" variant="h5">
            Welcome {user.displayName}
          </Typography>
        </div>
      )
      
    } else {
      return (
        <div align="center">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Button className={classes.signin} onClick={this.signIn}>Google</Button>
        </div>
      )
    }
  }
  
  render() {
    const { classes } = this.props;
  
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          {this.renderContent(classes)}
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Login);