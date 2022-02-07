

const initialState = {
    board: {},
    filterBy: null

}
export function boardReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'SET_BOARD':
            newState = { ...state, board: { ...action.board } }
            break;
        case 'SET_FILTER':
            newState = { ...state, filterBy: { ...action.filterBy } }
            break;
        default:
    }

    return newState;
}
