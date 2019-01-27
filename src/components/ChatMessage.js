import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    container: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
        backgroundColor: "#fff",
        display: "inline-block",
        minWidth: '20%',
        float: 'left',
        borderRadius: 25,
    },
    message: {
        marginBottom: theme.spacing.unit,
    },
    primary: {
        backgroundColor: theme.palette.primary.dark,
        color: '#fff',
        float: 'right',
    },
    date: {
        float: 'right',
        color: '#aaa',
    }
})

class ChatMessage extends React.Component {
    render() {
        const { classes } = this.props;
        const isPrimary = this.props.dir === 'right'
        return (
            <div className={[classes.container, isPrimary ? classes.primary : ''].join(' ')}>
                <Typography color={'inherit'} className={classes.message} >{this.props.message.content}</Typography>
                <Typography className={classes.date} variant={"caption"}>{this.props.message.date}</Typography>
            </div>
        )
    }
}

export default withStyles(styles)(ChatMessage);