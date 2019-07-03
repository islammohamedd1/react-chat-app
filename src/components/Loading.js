import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

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

    render() {
      const { classes } = this.props;
    
      return (
        <div className={classes.container}>
            <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      );
    }
  }
  
  export default withStyles(styles)(Loading);