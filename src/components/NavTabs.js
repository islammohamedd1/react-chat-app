import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MessagesList from './MessagesList';
import FriendsList from './FriendsList';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 2 }}>
      {children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    height: '100%',
  },
  tab: {
      minWidth: 'auto',
      width: '50%',
  },
  tabsContainer:  {
      height: '100%',
  }
});

class NavTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            className={classes.tabsContainer}
          >
            <Tab icon={<InboxIcon />} className={classes.tab} />
            <Tab icon={<PersonIcon />} className={classes.tab} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
          className={classes.tabsContainer}
        >
          <TabContainer dir={theme.direction} className={classes.tabsContainer}>
            <MessagesList
                className={classes.tabsContainer}
                chats={this.props.chats}
                openChat={this.props.openChat}
                setCurrentChat={this.props.setCurrentChat}
            />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <FriendsList friends={this.props.friends} />
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NavTabs);