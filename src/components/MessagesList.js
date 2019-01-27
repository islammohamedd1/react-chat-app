import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatIcon from '@material-ui/icons/Chat';


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
  
  render() {
    const { classes } = this.props;
    // console.log(this.props);
    return (
        
        <MenuList>

            {this.props.chats.map((chat, i) => (
                <MenuItem key={chat.participants[0]} className={classes.menuItem} onClick={() => this.props.setCurrentChat(chat.id)}>
                    <ListItemIcon className={classes.icon}>
                        <ChatIcon />
                    </ListItemIcon>
                    <ListItemText classes={{ primary: classes.primary }} inset primary={chat.participants[0]} />
                </MenuItem>
            ))}

            
        </MenuList>
    );
  }
}
export default withStyles(styles)(MessagesList);