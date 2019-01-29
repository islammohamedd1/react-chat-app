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

    constructor(props) {
        super(props);   
        this.state = {
            friends: Array(),
        }

        this.getFriends();
    }

    getFriends = () => {
        
        let user = firebase.auth().currentUser;
        let db = firebase.firestore();
        let _this = this;

        db.doc(`users/${user.uid}`).get().then(userSnapshot => {
            const friendsCount = userSnapshot.data().friends;
            console.log(friendsCount);
            if (friendsCount > this.state.friends.length) {
                db.collection('friends')
            .where('users', 'array-contains', user.uid)
            .get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    const data = doc.data();
                    let friend = data.users[0] !== user.uid ? data.users[0] : data.users[1];
                    db.doc(`users/${friend}`)
                        .get()
                        .then(friendSnapshot => {
                            const friendData = friendSnapshot.data();
                            let friends = _this.state.friends;
                            friends.push(friendData);
                            this.setState({ friends });
                        })
                })
            }).catch(error => console.error(error));
            }
        });
    }
  
    render() {
        const { classes } = this.props;
        // console.log(this.props);
        return (
            
            <MenuList>

                {this.state.friends.map((friend, i) => (
                    <MenuItem key={i} className={classes.menuItem}>
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