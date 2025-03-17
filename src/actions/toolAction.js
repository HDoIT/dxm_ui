import axios from 'axios';
import { SEND_EMAIL_FAIL, SEND_EMAIL_REQUEST, SEND_EMAIL_SUCCESS } from '../constants/toolConstant';

export const sendEmail = (emailData) => async (dispatch) => {
    try {
        dispatch({ type: SEND_EMAIL_REQUEST });

        // Tạo query string từ dữ liệu
        const queryString = new URLSearchParams(emailData).toString();
        const apiUrl = `https://dxm-sendmail-service.onrender.com/send?${queryString}`;

        // Gọi API với phương thức POST và không có body dữ liệu
        const { data } = await axios.post(apiUrl, null, {
            headers: {
                accept: '*/*',
            },
        });

        dispatch({
            type: SEND_EMAIL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SEND_EMAIL_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};