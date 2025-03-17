import {
    SEND_EMAIL_REQUEST,
    SEND_EMAIL_SUCCESS,
    SEND_EMAIL_FAIL,
} from '../constants/toolConstant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    response: null,
};

export const toolReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_EMAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SEND_EMAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                response: action.payload,
            };
        case SEND_EMAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};