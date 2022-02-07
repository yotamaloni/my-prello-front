

const initialState = {
    board: {},
    filterBy: null,
    modal: null

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
        case 'SET_MODAL':
            newState = { ...state, modal: { ...action.modal } }
            break;
        default:
    }

    return newState;
}
