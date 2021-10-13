import axiosApi from "../../axiosApi";

export const POST_MESSAGE_REQUEST = 'POST_MESSAGE_REQUEST';
export const POST_MESSAGE_SUCCESS = 'POST_MESSAGE_SUCCESS';
export const POST_MESSAGE_FAILURE = 'POST_MESSAGE_FAILURE';

export const postMessageRequest = () => ({type: POST_MESSAGE_REQUEST});
export const postMessageSuccess = () => ({type: POST_MESSAGE_SUCCESS});
export const postMessageFailure = error => ({type: POST_MESSAGE_FAILURE, payload: error});

export const postMessage = (data) => {
    return async dispatch => {
        try {
            dispatch(postMessageRequest());
            await axiosApi.post('/messages', data);
            dispatch(postMessageSuccess());
        } catch (error) {
            dispatch(postMessageFailure(error.response.data.error));
        }
    };
};