import {
    GET_MESSAGES_FAILURE,
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_NEW_MESSAGES_FAILURE,
    GET_NEW_MESSAGES_SUCCESS,
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
        case GET_MESSAGES_REQUEST:
            return {...state, loading: true};
        case GET_MESSAGES_SUCCESS: {
            const lastDatetime = action.payload.length > 0
                ? action.payload[0].datetime
                : state.lastDatetime;
            return {
                ...state,
                loading: false,
                messages: action.payload,
                lastDatetime
            };
        }
        case GET_MESSAGES_FAILURE:
            return {...state, loading: false, error: action.payload};
        case GET_NEW_MESSAGES_SUCCESS: {
            const lastDatetime = action.payload.length > 0
                ? action.payload[0].datetime
                : state.lastDatetime;
            return {
                ...state,
                loading: false,
                messages: [
                    ...action.payload,
                    ...state.messages
                ],
                lastDatetime
            };
        }
        case GET_NEW_MESSAGES_FAILURE:
            return {...state, error: action.payload};
        default:
            return state;
    }
};

export default reducer;