import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatIcon from '@material-ui/icons/Chat';

import * as firebase from 'firebase';
import { ListItemAvatar, Avatar, List, ListItem } from '@material-ui/core';

const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
});

class MessagesList extends React.Component {

  handleClick = chatId => {
    this.props.toggleDrawer();
    this.props.setCurrentChat(chatId)
  }

  renderChatList = (chats, classes) => {
    return (
      <List>
            {
              Object.keys(chats).map((k, i) => {
                if (chats[k].messages.length != 0) {
                  return (
                    <ListItem key={chats[k].participant.uid} className={classes.menuItem} onClick={() => this.handleClick(chats[k].id)}>
                    <ListItemAvatar>
                      <Avatar alt={chats[k].participant.displayName} src={`https://firebasestorage.googleapis.com/v0/b/react-chat-app-1a980.appspot.com/o/avatars%2F${chats[k].participant.uid}?alt=media&token=52ec6fdb-85ed-419a-879f-e0c4a06035cd`} />
                    </ListItemAvatar>
                      <ListItemText classes={{ primary: classes.primary }} inset primary={chats[k].participant.displayName} />
                  </ListItem>
                  )
                }
              })}
        </List>
    )
  }
  
  render() {
    const { classes } = this.props;
    const chats = this.props.chats;
    return this.renderChatList(chats, classes);
  }
}
export default withStyles(styles)(MessagesList);