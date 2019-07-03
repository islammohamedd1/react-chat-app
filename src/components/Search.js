import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import * as firebase from 'firebase';
import { List, ListItem, ListItemAvatar, Avatar } from '@material-ui/core';

const styles = {
    add: {
        cursor: 'pointer',
    }
}

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            results: [],
            found: false,
            isFriend: false,
            searches: [],
        }

        this.getSearchData();
    }

    getSearchData = () => {
        const db = firebase.firestore();
        db.collection("searches").get().then(snapshot => {
            if (!snapshot.empty) {
                let currentSearches = this.state.searches;
                snapshot.forEach(doc => {
                    currentSearches.push(doc.data());
                    this.setState({searches: currentSearches});
                });
            }
        })
    }

    componentWillMount = () => {
        this.timer = null;
    }

    handleChange = e => {
        clearTimeout(this.timer);

        this.setState({ search: this.search.value });

        this.timer = setTimeout(this.triggerSearch, 500);
    }

    triggerSearch = () => {
        this.searchUsers(this.search.value);
    }

    searchUsers = search => {
        var user = firebase.auth().currentUser;
        if (search.length === 0) {
            let results = [];
            this.setState({results});
            return;
        }
        var searchRegex = new RegExp("(" + search + "[a-z ]).*", "gi");
        console.log(this.state.searches);
            let results = this.state.searches.filter(u => (u.displayName.match(searchRegex) || u.email.match(searchRegex) || u.displayName === search || u.emaill === search) && u.email !== user.email);
            console.log(results);
            this.setState({results});
    }

    handleClick = friedId => {
        this.props.toggleDrawer();
        this.props.addFriend(friedId);

    }

    renderResults = (classes) => {
            return (
                <List>
                    {this.state.results.map(r => 
                        <ListItem key={r.uid} onClick={() => this.handleClick(r.uid)}>
                        <ListItemAvatar>
                            <Avatar alt={r.displayName} src={`https://firebasestorage.googleapis.com/v0/b/react-chat-app-1a980.appspot.com/o/avatars%2F${r.uid}?alt=media&token=52ec6fdb-85ed-419a-879f-e0c4a06035cd`} />
                        </ListItemAvatar>
                        <ListItemText inset primary={r.displayName} />
                    </ListItem>
                    )}
                </List>    
            )
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <TextField
                    placeholder="Search..."
                    fullWidth
                    value={this.state.search}
                    inputRef={input => this.search = input}
                    onChange={this.handleChange}
                />
                {this.renderResults(classes)}
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Search);