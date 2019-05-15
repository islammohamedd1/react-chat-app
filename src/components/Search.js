import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import TextField from '@material-ui/core/TextField';
import * as firebase from 'firebase';

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
        if (search.length == 0) {
            results = [];
            this.setState({results});
            return;
        }
        var searchRegex = new RegExp("(" + search + "[a-z ]).*", "gi");
        console.log(this.state.searches);
            let results = this.state.searches.filter(u => (u.displayName.match(searchRegex) || u.email.match(searchRegex) || u.displayName == search || u.emaill == search) && u.email != user.email);
            console.log(results);
            this.setState({results});
    }

    handleClick = friedId => {
        console.log("triggered");
        this.props.toggleDrawer();
        this.props.addFriend(friedId);

    }

    renderResults = (classes) => {
            return (
                <MenuList>
                    {this.state.results.map(r => 
                        <MenuItem key={r.uid} onClick={() => this.handleClick(r.uid)}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText inset primary={r.displayName} />
                    </MenuItem>
                    )}
                </MenuList>    
            )
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <TextField
                    placeholder="Search with email"
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