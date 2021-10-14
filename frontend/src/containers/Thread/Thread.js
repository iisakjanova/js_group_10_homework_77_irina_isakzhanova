import {useEffect} from 'react';
import React from 'react';
import {Backdrop, Box, CircularProgress, Grid, makeStyles, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";

import MessageForm from "../MessageForm/MessageForm";
import {getMessages} from "../../store/actions/actions";
import Messages from "../Messages/Messages";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
    },
    title: {
        textAlign: "center",
        marginBottom: theme.spacing(3),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

let interval;

const Thread = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const loading = useSelector(state => state.loading);
    const datetime = useSelector(state => state.lastDatetime);

    useEffect(() => {
        dispatch(getMessages());
    }, [dispatch]);

    useEffect(() => {
        interval = setInterval(() => {
            dispatch(getMessages(datetime));
        }, 3000);
        return () => clearInterval(interval);
    }, [dispatch, datetime]);

    const showBackdrop = () => {
        if (!loading) {
            return null;
        }

        return (
            <Backdrop open={loading && !datetime} className={classes.backdrop}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        );
    };

    return (
        <>
            {showBackdrop()}
            <Box className={classes.root}>
                <Box className={classes.title}>
                    <Typography variant="h5">Thread: Comics and cartoons</Typography>
                </Box>
                <Grid container direction="column" spacing={3}>
                    <Messages />
                    <MessageForm
                        lastDatetime={datetime}
                    />
                </Grid>
            </Box>
        </>
    );
};

export default Thread;