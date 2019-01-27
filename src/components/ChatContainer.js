import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ChatMessage from './ChatMessage';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

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
    }
})

class ChatContainer extends React.Component {

    renderMessages = () => {
        if (this.props.chat) {
            return (
                this.props.chat.messages.map((m, i) => {
                    return (
                        <div className={this.props.classes.message} key={i}>
                            <ChatMessage dir={m.from === this.props.username ? 'right' : 'left'} message={m} />
                        </div>
                    )
                })
            )
        }
    }

    renderBar = () => {
        const { chat } = this.props;
        if (this.props.chat) {
            for (let i = 0; i < chat.participants.length; i++) {
                if (chat.participants[i] !== this.props.username) {
                    return (
                        <AppBar position="static" color={"default"}>
                            <Toolbar>
                                <Typography variant="h6" color="inherit">{chat.participants[i]}</Typography>
                            </Toolbar>
                        </AppBar>
                    );
                }
            }
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.renderBar()}
                <div className={classes.container}>
                    {this.renderMessages()}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(ChatContainer);