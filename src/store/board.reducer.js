// import { userService } from '../services/user.service.js'
import { boardService } from "../services/board.service.js";


const initialState = {
    board: {},
    filterBy:null

}

export function boardReducer(state = initialState, action) {

    let newState = state;
    // let groupFound = state.board.groups.find((group) => group.id === action.groupId)
    var updatedGroups
    var group
    var updatedGroup
    var updatedTasks
    var updatedBoard

    switch (action.type) {
        case 'SET_BOARD':
            newState = { ...state, board: {...action.board} }
            console.log('newState:', newState);
            
            break;
        case 'SET_FILTER':
            newState = { ...state, filterBy: { ...action.filterBy } }
            console.log('newState:', newState);
            
            break;
        case 'ADD_GROUP':
            updatedGroups = [...state.board.groups, action.group]
            newState = { ...state, board: { ...state.board, groups:{ ...updatedGroups} } }
            break;
        case 'ADD_TASK':
            let groupFoundAddTask = state.board.groups.find((group) => group.id === action.groupId)
            const groupWithAddedTask = { ...groupFoundAddTask, tasks: [...groupFoundAddTask.tasks, action.task] }
            const updatedGroupsWithAddedTask = state.board.groups.map((group) => group.id === action.groupId ? groupWithAddedTask : group)
            const updatedBoardWithAddedTask = { ...state.board, groups: updatedGroupsWithAddedTask }
            newState = { ...state, board: updatedBoardWithAddedTask }
            break;
        case 'UPDATE_TASK':
            group = state.board.groups.find((group) => group.id === action.groupId)
            updatedTasks = group.tasks.map((task) => task.id === action.task.id ? action.task : task)
            updatedGroup = { ...group, tasks: updatedTasks }
            updatedGroups = state.board.groups.map((currGroup) => currGroup.id === updatedGroup.id ? updatedGroup : currGroup)
            updatedBoard = { ...state.board, groups: updatedGroups }
            newState = { ...state, board: updatedBoard }
            break;
        case 'REMOVE_GROUP':
            updatedGroups = state.board.groups.filter((group) => group.id !== action.groupId)
            updatedBoard = { ...state.board, groups: updatedGroups }
            newState = { ...state, board: updatedBoard }
            break;
        case 'REMOVE_TASK':
            group = state.board.groups.find((currGroup) => currGroup.id === action.groupId)
            updatedTasks = group.tasks.filter((task) => task.id !== action.taskId)
            updatedGroup = { ...group, tasks: updatedTasks }
            updatedGroups = state.board.groups.map((group) => group.id === action.groupId ? updatedGroup : group)
            updatedBoard = { ...state.board, groups: updatedGroups }
            newState = { ...state, board: updatedBoard }
            break;
        case 'REMOVE_ALL_TASKS':
            group = state.board.groups.find((currGroup) => currGroup.id === action.groupId)
            updatedTasks = []
            updatedGroup = { ...group, tasks: updatedTasks }
            updatedGroups = state.board.groups.map((group) => group.id === action.groupId ? updatedGroup : group)
            updatedBoard = { ...state.board, groups: updatedGroups }
            newState = { ...state, board: updatedBoard }
            break;
        case 'UPDATE_GROUPS_IN_BOARD':
            updatedBoard = { ...state.board, groups: action.groups }
            newState = { ...state, board: updatedBoard }
            break;
        case 'ADD_ACTIVITY':
            const activities = [...state.board.activities, action.activity]
            updatedBoard = { ...state.board, activities }
            newState = { ...state, board: updatedBoard }
            break;
        case 'COPY_GROUP':
            const groupIdx = state.board.groups.findIndex((currGroup) => currGroup.id === action.groupId)
            updatedGroups = [...state.board.groups]
            updatedGroups.splice(groupIdx, 0, action.copiedGroup)
            updatedBoard = { ...state.board, groups: updatedGroups }
            newState = { ...state, board: updatedBoard }
            break;
        default:
    }
    return newState;
}





        // case 'UPDATE_GROUP_IN_BOARD':
        //     const groupsUpdateGroup = state.board.groups.map((currGroup => currGroup.id === action.group.id ? action.group : currGroup))
        //     const boardUpdatedGroup = { ...state.board, groups: groupsUpdateGroup }
        //     newState = { ...state, board: boardUpdatedGroup }
        //     break;




