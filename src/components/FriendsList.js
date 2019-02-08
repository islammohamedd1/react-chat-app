import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';

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

class FriendList extends React.Component {
    handleClick = friendId => {
        this.props.toggleDrawer();
        this.props.setFriendChat(friendId);
    }
  
    render() {
        const { classes } = this.props;
        return (
            
            <MenuList>
                {this.props.friends.map((friend, i) => (
                    <MenuItem key={i} className={classes.menuItem} onClick={() => this.handleClick(friend.uid)}>
                        <ListItemIcon className={classes.icon}>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary={friend.displayName} />
                    </MenuItem>
                ))}

                
            </MenuList>
        );
    }
}
export default withStyles(styles)(FriendList);