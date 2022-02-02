import { userService } from '../services/user.service.js'


const initialState = {
    user: userService.getLoggedinUser(),
    users: [],
    msg: null
}

export function userReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, user: { ...action.user } }
            break;
        case 'SET_USERS':
            newState = { ...state, users: [...action.users] }
            break;
        case 'REMOVE_USER':
            const users = state.users.filter((user) => user._id !== action.userId)
            newState = { ...state, users: [...users] }
            break;
        case 'SHOW_MSG':
            newState = { ...state, msg: action.msg }
            break;
        case 'HIDE_MSG':
            newState = { ...state, msg: action.msg }
    }
    return newState;
}
