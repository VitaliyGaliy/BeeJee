import axios from 'axios';
import md5 from 'md5';

import { sortObj, serialize } from "../helper";

export const SAVE_TASK = 'SAVE_TASK';
export const GET_TASK = 'GET_TASK';
export const GET_TASKS = 'GET_TASKS';
export const RESET_TASKS = 'RESET_TASKS';
export const SORTED_TASKS = 'SORTED_TASKS';
export const IS_AUTH = 'IS_AUTH';

const API = `https://uxcandy.com/~shapoval/test-task-backend`

export const getTasks = (val) => async (dispatch) => {

    try {
        const { data: { message } } = await axios({
            method: 'get',
            params: {
                ...val,
            },

            url: `${API}/?developer=Vitaliy`,
            responseType: 'stream'
        })

        dispatch({
            type: GET_TASKS,
            payload: message,
        });
    } catch (error) {
        console.log('error', error);
    }
};

export const refreshTasks = val => async (dispatch) => {

    dispatch({
        type: RESET_TASKS,
    });
};

export const saveTask = (val, navigation) => async (dispatch) => {
    const { username, email, text, image } = val
    var form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("text", text);

    await form.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'testPhotoName'
    });

    try {
        const result = await axios({
            method: 'post',
            url: `${API}/create?developer=Vitaliy`,
            data: form,
            header: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        })

        dispatch({
            type: RESET_TASKS,
        });
        navigation.navigate('Main')
    } catch (error) {
    }
};

export const editTask = (val, navigation) => async (dispatch) => {

    const { text, status } = val

    const sortedVal = sortObj({ text, status: 0 })
    sortedVal.token = 'beejee'

    const params_string = serialize(sortedVal)
    const hash = md5(params_string)

    var form = new FormData();
    form.append("status", '10');
    form.append("text", text);
    form.append("token", 'beejee');
    form.append("signature", hash);

    try {
        const result = await axios({
            method: 'POST',
            url: `${API}/edit/${navigation.state.params.id}?developer=Vitaliy`,
            data: form,
            header: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        })
        console.log('result', result);

        dispatch({
            type: RESET_TASKS,
        });
        navigation.push('Main')
    } catch (error) {
    }
};

export const authenticate = val => async (dispatch) => {
    dispatch({
        type: IS_AUTH,
        payload: val,
    });
};
