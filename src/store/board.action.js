import { boardService } from "../services/board.service.js"
import { socketService } from "../services/socket.service.js"


export function loadBoard(boardId) {
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


