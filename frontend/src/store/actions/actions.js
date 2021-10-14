import axiosApi from "../../axiosApi";

export const POST_MESSAGE_REQUEST = 'POST_MESSAGE_REQUEST';
export const POST_MESSAGE_SUCCESS = 'POST_MESSAGE_SUCCESS';
export const POST_MESSAGE_FAILURE = 'POST_MESSAGE_FAILURE';

export const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const GET_MESSAGES_FAILURE = 'GET_MESSAGES_FAILURE';

export const postMessageRequest = () => ({type: POST_MESSAGE_REQUEST});
export const postMessageSuccess = () => ({type: POST_MESSAGE_SUCCESS});
export const postMessageFailure = error => ({type: POST_MESSAGE_FAILURE, payload: error});

export const getMessagesRequest = () => ({type: GET_MESSAGES_REQUEST});
export const getMessagesSuccess = data => ({type: GET_MESSAGES_SUCCESS, payload: data});
export const getMessagesFailure = error => ({type: GET_MESSAGES_FAILURE, payload: error});

export const postMessage = (data) => {
    return async dispatch => {
        try {
            dispatch(postMessageRequest());
            await axiosApi.post('/messages', data);
            dispatch(postMessageSuccess());
        } catch (error) {
            dispatch(postMessageFailure(error.response.data.error));
            throw new Error(error.response.data.error);
        }
    };
};

export const getMessages = (datetime) => {
    return async dispatch => {
        try {
            dispatch(getMessagesRequest());
            const response = await axiosApi.get(datetime ?
                `/messages?datetime=${datetime}` : '/messages'
            );

            const sortedData = response.data.sort((a, b) => {
                let da = new Date(a.datetime);
                let db = new Date(b.datetime);
                return db - da;
            });

            dispatch(getMessagesSuccess(sortedData));
        } catch (error) {
            dispatch(getMessagesFailure(error));
        }
    };
};