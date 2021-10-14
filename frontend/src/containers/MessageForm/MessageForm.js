import React, {useState} from 'react';
import {Grid, makeStyles, Paper, Typography, TextField, Button} from "@material-ui/core";
import {useDispatch} from "react-redux";

import {getNewMessages, postMessage} from "../../store/actions/actions";
import FileInput from "../../components/UI/FileInput/FileInput";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
    title: {
        textAlign: "center",
        marginBottom: theme.spacing(3),
    },
}));

const initialState = {
    author: '',
    message: '',
    image: null,
};

const MessageForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [message, setMessage] = useState(initialState);
    const [fileInputKey, setFileInputKey] = useState(null);

    const handleInputChange = e => {
        const {name, value} = e.target;

        setMessage(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setMessage(prev => ({
            ...prev,
            [name]: file,
        }));
    };

    const handleFormSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(message).forEach(key => {
            formData.append(key, message[key]);
        });

        try {
            await dispatch(postMessage(formData));
            setMessage(initialState);
            setFileInputKey(Math.random());
        } catch (e) {
            console.log(e.message);
        }

        dispatch(getNewMessages());
    };

    return (
        <Grid item>
            <Paper className={classes.root}>
                <Typography variant="h6" className={classes.title}>Post reply</Typography>
                <form onSubmit={handleFormSubmit}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <TextField
                                name="author"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={message.author}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                required
                                name="message"
                                label="Message"
                                variant="outlined"
                                multiline
                                rows={5}
                                fullWidth
                                value={message.message}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs>
                            <FileInput
                                key={fileInputKey}
                                label="Image"
                                name="image"
                                onChange={handleFileChange}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    );
};

export default MessageForm;