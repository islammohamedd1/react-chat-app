import React from 'react';
import SideNav from '../SideNav/SideNav';
import * as DB from '../../db.json';

class Home extends React.Component {
    
    getInbox = () => {
        let chats = DB.chats.filter(chat => chat.participants.includes(this.props.username));
        chats.forEach(chat => {
            chat.participants = chat.participants.filter(p => p != this.props.username)
        });
        return chats;
    }

    getFriends = () => {
        let friends = DB.friends.filter(rel => rel.includes(this.props.username));
        let rel;
        for (let i = 0; i < friends.length; i++) {
            rel = friends[i];
            rel = rel.filter(p => p != this.props.username);
            friends[i] = rel;
        }
        return friends;
    }

    openChat = (chatID) => {
        let chat = DB.chats.filter(c => c.id === chatID);

    }

    render() {
        const chats = this.getInbox();
        const friends = this.getFriends();
        return (
            <div className="Home">
                <SideNav
                    chats={chats}
                    friends={friends}
                    openChat={this.openChat}
                />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                </main>
            </div>
        )
    }
}

export default Home;