import React from 'react';
import SideNav from './SideNav';
import * as DB from '../db.json';
import { withStyles } from '@material-ui/core';
import ChatContainer from './ChatContainer';

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
			chats: {},
			friends: [],
		}
		this.getChat = this.getChat.bind(this);
		this.addMessage = this.addMessage.bind(this);
		this.getFriends();
		this.getInbox();
	}

	getInbox = () => {
		let user = firebase.auth().currentUser;
		let db = firebase.firestore();
		db.collection('chats')
			.where('users', 'array-contains', user.uid)
			.onSnapshot(chatsSnapshot => {
				chatsSnapshot.docChanges().forEach(change => {
					if (change.type === 'added') {
						this.createChat(change.doc);
					}
				})
				chatsSnapshot.docs.forEach(doc => {
					doc.ref.collection('messages')
						.onSnapshot(messagesSnapshot => {
							messagesSnapshot.docChanges().forEach(change => {
								if (change.type === 'added') {
									this.addMessage(change.doc);
								}
							})
						})
				});
			});
	}

	addMessage = doc => {
		let chats = this.state.chats;
		const chatId = doc.ref.parent.parent.id;
		if (chats[chatId]) {
			chats[chatId].messages.push(doc.data());
			this.setState({ chats });
		}
	}

	createChat = async doc => {
		let chats = this.state.chats;
		const user = firebase.auth().currentUser;
		const db = firebase.firestore();
		let newChat = doc.data();

		newChat.id = doc.id;
		
		newChat.messages = [];
		const messagesSnapshot = await doc.ref.collection('messages').get();
		messagesSnapshot.docs.forEach(doc => {
			newChat.messages.push(doc.data());
		})
		
		let participantID = newChat.users[0] !== user.uid ? newChat.users[0] : newChat.users[1];
		db.doc(`users/${participantID}`).get().then(participantSnapshot => {
			newChat.participant = participantSnapshot.data();
			chats[newChat.id] = newChat;
			this.setState({ chats });
		}).catch(error => console.log(error));
	}

	getFriends = () => {
		let user = firebase.auth().currentUser;
		let db = firebase.firestore();
		db.collection('friends')
			.where('users', 'array-contains', user.uid)
			.onSnapshot(snapshot => {
				snapshot.docChanges().forEach(change => {
					if (change.type === 'added') {
						const data = change.doc.data();
						let friend = data.users[0] !== user.uid ? data.users[0] : data.users[1];
						db.doc(`users/${friend}`)
							.get()
							.then(friendSnapshot => {
								const friendData = friendSnapshot.data();
								let friends = this.state.friends;
								friends.push(friendData);
								this.setState({ friends });
							}).catch(error => console.log(error));
					}
				})
			});
	}

	addFriend = friendId => {
		const user = firebase.auth().currentUser;
		const db = firebase.firestore();
		if (!this.isFriend(friendId)) {
			db.collection('friends').add({
				users: [user.uid, friendId]
			})
			.then(docRef => {
				this.setFriendChat(friendId);
			})
			.catch(error => console.log(error));
		}
	}

	isFriend = friendId => {
		let friend = this.state.friends.filter(f => f.uid === friendId )[0];
		if (friend) {
			return true;
		} else {
			return false;
		}
	}
	
	setFriendChat = friendId => {
		let chat;
		let chats = this.state.chats;
		Object.keys(chats).map(k => {
			if (chats[k].participant.uid === friendId) {
				chat = chats[k];
			}
		});

		if (chat) {
			this.setCurrentChat(chat.id);
		} else {
			let user = firebase.auth().currentUser;
			this.newChat([user.uid, friendId]);
		}
	}

	newChat = participants => {
		let db = firebase.firestore();
		db.collection('chats').add({
			messages: [],
			users: participants,
		}).then(docRef => {
			this.setCurrentChat(docRef.id);
		}).catch(error => console.log(error));
	}

	setCurrentChat = chatID => {
		if (this.state.currentChat !== chatID) {
			this.setState({ currentChat: chatID })
		}
	};

	getChat = chatId => {		
		let chat = this.state.chats[chatId];
		return chat;
	}

	render() {
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
					chats={this.state.chats}
					friends={this.state.friends}
					openChat={this.openChat}
					setCurrentChat={this.setCurrentChat}
					setFriendChat={this.setFriendChat}
					participant={currentChat ? currentChat.participant : ''}
					isFriend={this.isFriend}
					addFriend={this.addFriend}
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