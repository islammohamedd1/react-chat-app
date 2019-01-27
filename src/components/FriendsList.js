import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';


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

            {this.props.friends.map(friend => (
                <MenuItem key={friend[0]} className={classes.menuItem}>
                    <ListItemIcon className={classes.icon}>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText classes={{ primary: classes.primary }} inset primary={friend[0]} />
                </MenuItem>
            ))}

            
        </MenuList>
    );
  }
}
export default withStyles(styles)(MessagesList);