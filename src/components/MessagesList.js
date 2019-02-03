import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatIcon from '@material-ui/icons/Chat';

import * as firebase from 'firebase';

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

  constructor(props) {
    super(props);
    this.state = {
      chats: [],
    }

    this.setChats();
  }

  setChats = () => {
    let user = firebase.auth().currentUser;
    let db = firebase.firestore();
    const _this = this;

    db.doc(`users/${user.uid}`).get().then(userSnapshot => {
      const chatsCount = userSnapshot.data().chats;
      if (chatsCount > this.state.chats.length) {
        db.collection('chats')
          .where('users', 'array-contains', user.uid)
          .get()
          .then(chatsSnapshot => {
            chatsSnapshot.docs.forEach(doc => {
              let currentChat = doc.data();
              let chats = _this.state.chats;
              let participantID = currentChat.users[0] !== user.uid ? currentChat.users[0] : currentChat.users[1];

              db.doc(`users/${participantID}`).get().then(participantSnapshot => {
                currentChat.participant = participantSnapshot.data();
                chats.push(currentChat);
                _this.setState({ chats });
              })
            })
          })
          .catch(error => console.error(error));
      }
    }).catch(error => console.error(error));
  }
  
  render() {
    const { classes } = this.props;
    // console.log(this.props);
    return (
        
        <MenuList>

            {this.state.chats.map((chat, i) => (
                <MenuItem key={chat.participant.uid} className={classes.menuItem} onClick={() => this.props.setCurrentChat(chat.id)}>
                    <ListItemIcon className={classes.icon}>
                        <ChatIcon />
                    </ListItemIcon>
                    <ListItemText classes={{ primary: classes.primary }} inset primary={chat.participant.displayName} />
                </MenuItem>
            ))}

            
        </MenuList>
    );
  }
}
export default withStyles(styles)(MessagesList);