import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ChatMessage from './ChatMessage';
import * as firebase from 'firebase';

const styles = theme => ({
	container: {
		height: '100%',
		padding: theme.spacing.unit * 3,
	},
	message: {
		width: '100%',
		display: 'block',
		minHeight: 64,
		marginBottom: theme.spacing.unit,
	},
	newMessage: {
		position: 'fixed',
		bottom: 0,
		width: '75%',
		backgroundColor: '#fff',
		padding: theme.spacing.unit,
		height: 70,
	},
	text: {
		width: '85%',
	},
	btn: {
		width: '10%',

		float: 'right',
	}
})

class ChatContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			message: '',
		}

		this.handleClick = this.handleClick.bind(this);
	}

	sendMessage = () => {
		let message = this.state.message;
		this.setState({ message: '' });
		if (message.length > 0) {
			const db = firebase.firestore();
			const user = firebase.auth().currentUser;
			const chatId = this.props.chat.id;

			db.collection(`chats/${chatId}/messages`)
				.add({
					content: message,
					from: user.uid,
				})
				.then(messageRef => console.log('message sent', messageRef.id))
				.catch(error => console.log(error));
		}
	}

	handleChange = e => {
		this.setState({ message: e.target.value });
	}

	handleClick = e => {
		if (e.target.value === 'enter') {
			   this.sendMessage();
		}
	}

	renderMessages = classes => {
		let user = firebase.auth().currentUser;
		if (this.props.chat) {
			return (
				this.props.chat.messages.map((m, i) => {
					return (
						<div className={classes.message} key={i}>
							<ChatMessage dir={m.from === user.uid ? 'right' : 'left'} message={m} />
						</div>
					)
				})
			)
		}
	}

	renderSendContainer = classes => {
		if (this.props.chat) {
			return (
				<div className={classes.newMessage}>
					<TextField
						className={classes.text}
						style={{ margin: 8 }}
						placeholder="Write your message"
						fullWidth
						margin="normal"
						variant="standard"
						InputLabelProps={{
							shrink: true,
						}}
						value={this.state.message}
						onChange={this.handleChange}
						onClick={this.handleClick}
					/>
					<Button variant="contained" margin="normal" className={classes.btn} onClick={this.sendMessage}>Send</Button>
				</div>
			)
		}
	}

	render() {
		const { classes } = this.props;
		return (
			<div>
				<div className={classes.container}>
					{this.renderMessages(classes)}
					{this.renderSendContainer(classes)}
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(ChatContainer);