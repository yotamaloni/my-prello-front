import { boardService } from "../services/board.service.js"


export function loadBoard(boardId) {
    console.log('IN LOAD BOARD')

    return async (dispatch, getState) => {
        const { boardModule: { filterBy } } = getState()
        try {
            let board = null
            if (boardId) {
                board = await boardService.getBoardById(boardId, filterBy)
                dispatch({ type: 'SET_BOARD', board })
                if (!board) throw new Error
            }
        } catch (err) {
            console.log('Cannot get board', err)
        }
    }
}

export function updateBoard(board) {
    console.log('IN UPDATE BOARD')
    return async (dispatch) => {
        try {
            await boardService.saveBoard(board)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('Cannot update board', err)
        }
    }
}


export function setFilter(filterBy) {
    return (dispatch) => {
        dispatch({ type: 'SET_FILTER', filterBy })

    }
}

export function setModal(modal) {
    return (dispatch) => {
        dispatch({ type: 'SET_MODAL', modal })
    }
}

export function setBoardInReducer(board) {
    return (dispatch) => {
        dispatch({ type: 'SET_BOARD', board })
    }
}