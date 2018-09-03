import {
    GET_TASKS,
    RESET_TASKS,
    SORTED_TASKS,
    IS_AUTH
} from '../actions/main';

const initials = {
    tasks: [],
    isAdmin: false
};

const reducer = (state = initials, action) => {
    switch (action.type) {
        case GET_TASKS:
            return { ...state, tasks: state.tasks.concat(action.payload.tasks), total_task_count: action.payload.total_task_count };
        case RESET_TASKS:
            return { ...state, tasks: [] };
        case SORTED_TASKS:
            return { ...state, tasks: state.tasks.concat(action.payload.tasks), total_task_count: action.payload.total_task_count };
        case IS_AUTH:
            return { ...state, isAdmin: action.payload };
        default:
            return state;
    }
};

export default reducer;