import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withStyles } from '@material-ui/core/styles';
import NavTabs from './NavTabs';
import { Divider } from '@material-ui/core';
import * as firebase from 'firebase';

const drawerWidth = Number(process.env.REACT_APP_DRAWER_WIDTH);

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    width: "100%",
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
    },
    width: "100%",
    // maxWidth: drawerWidth,
    overflow: "none",
  },
  content: {
    // flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  title: {
    // padding: theme.spacing.unit * 2,
    // fontWeight: 'bold'
    // float: 'left',
  },
  logout: {
    width: 25,
    cursor: 'pointer',
    position: 'absolute',
    right: 10,
    top: 10,
  }
});

class SideNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileOpen: window.innerWidth < 600 ? true : false,
    }
  }

  handleDrawerToggle = () => {
    if (window.innerWidth < 600) {
      this.setState({mobileOpen: !this.state.mobileOpen})
    }
  }

  logout = () => {
    firebase.auth().signOut();
  }

    render() {
      const { classes, theme } = this.props;
      const drawer = (
        <div>
          <AppBar position="static" color="primary">
              <Toolbar>
                  <Typography variant="h6" color="inherit">Chat - APP</Typography>
                  <div className={classes.logout}>
                    <ExitToAppIcon className={classes.logout} onClick={this.logout} />
                  </div>
              </Toolbar>
          </AppBar>
          <Divider />
          <NavTabs
            chats={this.props.chats}
            friends={this.props.friends}
            openChat={this.props.openChat}
            setCurrentChat={this.props.setCurrentChat}
            setFriendChat={this.props.setFriendChat}
            isFriend={this.props.isFriend}
            addFriend={this.props.addFriend}
            currentChat={this.props.currentChat}
            toggleDrawer={this.handleDrawerToggle}
          />          
        </div>
      );
  
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography color="inherit"  className={classes.title} variant='h6'>{this.props.participant.displayName}</Typography>
              
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer}>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                container={this.props.container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          
        </div>
      );
    }
}

export default withStyles(styles, {withTheme: true})(SideNav);