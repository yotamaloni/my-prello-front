import { boardService } from "../services/board.service.js"
import { socketService } from "../services/socket.service.js"
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
// import { userService } from '../services/user.service.js'


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
    // console.log('board:', board);
    return async (dispatch) => {
        try {
            await boardService.saveBoard(board)
           
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('Cannot update board', err)
        }
    }
}

export function removeGroup(boardId, groupId) {
    return async (dispatch) => {
        try {
            await boardService.removeGroup(boardId, groupId)
            dispatch({ type: 'REMOVE_GROUP', groupId })
        } catch (err) {
            console.log('Cannot remove group', err)
        }
    }
}


export function copyList(boardId, groupId) {
    return async (dispatch) => {
        try {
            const copiedGroup = await boardService.copyList(boardId, groupId)
            dispatch({ type: 'COPY_GROUP', groupId, copiedGroup })
        } catch (err) {
            console.log('Cannot copy group', err)
        }
    }
}

export function removeTask(boardId, groupId, taskId) {
    return async (dispatch) => {
        try {
            await boardService.removeTask(boardId, groupId, taskId)
            dispatch({ type: 'REMOVE_TASK', groupId, taskId })
        } catch (err) {
            console.log('Cannot remove task', err)
        }
    }
}

export function removeAllTasks(boardId, groupId) {
    return async (dispatch) => {
        try {
            await boardService.removeAllTasks(boardId, groupId)
            dispatch({ type: 'REMOVE_ALL_TASKS', groupId })
        } catch (err) {
            console.log('Cannot remove tasks', err)
        }
    }
}

export function addGroup(boardId, title) {

    return async (dispatch) => {
        try {
            const group = await boardService.addGroup(boardId, title)
            console.log('group:', group);
            socketService.emit('group-added', group)

            dispatch({ type: 'ADD_GROUP', group })

        } catch (err) {
            console.log('Cannot add group', err)
        }
    }
}

export function addTask(boardId, groupId, title, byMember) {
    return async (dispatch) => {
        try {
            const task = await boardService.addTask(boardId, groupId, title, byMember)
            socketService.emit('task-added', task)
            dispatch({ type: 'ADD_TASK', groupId, task })

        } catch (err) {
            console.log('Cannot add task', err)
        }
    }
}


export function addActivityToBoard(boardId, taskId, txt) {
    return async (dispatch) => {
        try {
            const activity = await boardService.addActivity(boardId, taskId, txt)
            // socketService.emit('task-added', task)
            dispatch({ type: 'ADD_ACTIVITY', activity })

        } catch (err) {
            console.log('Cannot add task', err)
        }
    }
}

export function updateGroupsInBoard(boardId, groups) {
    return async (dispatch) => {
        try {
            const newGroups = await boardService.updateBoardGroups(boardId, groups)
            socketService.emit('groups-updated', newGroups)
            dispatch({ type: 'UPDATE_GROUPS_IN_BOARD', groups })
        } catch (err) {
            console.log('Cannot update groups', err)
        }
    }
}

export function updateTask(boardId, groupId, task) {
    return async (dispatch) => {
        try {
            const updatedTask = await boardService.updateTask(boardId, groupId, task)
            socketService.emit('task-updated', updatedTask)
            dispatch({ type: 'UPDATE_TASK', groupId, task })
        } catch (err) {
            console.log('Cannot update task', err)
        }
    }
}

export function setFilter(filterBy) {
    return (dispatch) => {
        dispatch({ type: 'SET_FILTER', filterBy })

    }
}


