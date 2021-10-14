import React from 'react';
import {Grid, makeStyles, Paper, Typography} from "@material-ui/core";

import {apiURL} from "../../config";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
    header: {
        marginBottom: theme.spacing(2),
    },
    imageWrapper: {
        width: '30%',
        marginRight: theme.spacing(2),
    },
    image: {
        maxHeight: '130px',
        width: '150px',
    },
}));

const Message = ({message}) => {
    const classes = useStyles();

    let image = null;

    if (message.image) {
        const imageUrl = apiURL + '/uploads/' + message.image;

        image = (
            <Grid item className={classes.imageWrapper}>
                <img src={imageUrl} className={classes.image}/>
            </Grid>
        );
    }

    return (
        <Grid item>
            <Paper className={classes.root}>
                <Grid container direction="column">
                    <Grid item container direction="row" justifyContent="space-between" className={classes.header}>
                        <Typography variant="subtitle2">{message.author}</Typography>
                        <Typography variant="subtitle2">{message.datetime}</Typography>
                        <Typography variant="subtitle2">No. {message.id}</Typography>
                    </Grid>
                    <Grid item container direction="row">
                        {image}
                        <Grid item>
                            <Typography variant="body1">{message.message}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default Message;