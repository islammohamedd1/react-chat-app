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
import { Grid, AppBar, Divider, TextField } from '@material-ui/core';
import { blue, purple } from '@material-ui/core/colors';

const styles = theme => ({
    container: {
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.75)",
    }
})

class Loading extends React.Component {

    constructor(props) {
      super(props);
    }

    

    render() {
      const { classes } = this.props;
    
      return (
        <div className={classes.container}>
            <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      );
    }
  }
  
  export default withStyles(styles)(Loading);