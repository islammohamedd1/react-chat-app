import React from 'react';
import SideNav from '../SideNav/SideNav';
import * as DB from '../../db.json';
import { withStyles } from '@material-ui/core';
import ChatContainer from '../ChatContainer';

import * as firebase from 'firebase';

const styles = theme => ({
  home: {
    height: '100%',
  },
  content: {
    // flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
        marginLeft: Number(process.env.REACT_APP_DRAWER_WIDTH),
    },
    height: '100%;'
  },
  toolbar: theme.mixins.toolbar,
  title: {
    // padding: theme.spacing.unit * 2,
    // fontWeight: 'bold'
  }
});

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentChat: null,
            participant: null,
        }
        this.getChat = this.getChat.bind(this);
    }

    getInbox = () => {
        let chats = DB.chats.filter(chat => chat.participants.includes(this.props.username));
        for (let i = 0; i < chats.length; i++) {
            chats[i].participants = chats[i].participants.filter(p => p !== this.props.username)   
        }
        return chats;
    }

    getFriends = () => {
        let friends = DB.friends.filter(rel => rel.includes(this.props.username));
        let rel;
        for (let i = 0; i < friends.length; i++) {
            rel = friends[i];
            rel = rel.filter(p => p !== this.props.username);
            friends[i] = rel;
        }
        return friends;
    }

    setCurrentChat = chatID => {
        this.setState({currentChat: chatID})
        console.log(this.state.currentChat);
    };

    getChat = chatID => {
        let chat = DB.chats.filter(c => c.id === chatID)[0];
        chat.participants = chat.participants.filter(p => p !== this.username);
    
        

        return chat;
    }

    render() {
        const chats = this.getInbox();
        console.log("chats:", chats);
        const friends = this.getFriends();
        const { classes } = this.props;
        let currentChat;
        if (this.state.currentChat) {
            currentChat = this.getChat(this.state.currentChat);
        } else {
            currentChat = null;
        }
        return (
            <div className={classes.home}>
                <SideNav
                    chats={chats}
                    friends={friends}
                    openChat={this.openChat}
                    setCurrentChat={this.setCurrentChat}
                    participant={currentChat ? currentChat.participants[0] : ''}
                />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <ChatContainer
                        chat={currentChat}
                        username={this.props.username}
                    />
                </main>
            </div>
        )
    }
}

export default withStyles(styles)(Home);