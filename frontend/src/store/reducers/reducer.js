import {
    POST_MESSAGE_FAILURE,
    POST_MESSAGE_REQUEST,
    POST_MESSAGE_SUCCESS
} from "../actions/actions";

const initialState = {
    messages: [],
    lastDatetime: '',
    loading: false,
    postMessageError: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_MESSAGE_REQUEST:
            return {...state, loading: true};
        case POST_MESSAGE_SUCCESS:
            return {...state, loading: false, postMessageError: false};
        case POST_MESSAGE_FAILURE:
            return {...state, loading: false, postMessageError: action.payload};
        default:
            return state;
    }
};

export default reducer;