// import { copyList } from '../store/board.action'
import { storageService } from './async-storage.service'

import { utilService } from './util.service'
import { httpService } from './http.service'
import { socketService } from './socket.service'



import Axios from 'axios'
import { userService } from './user.service'
var axios = Axios.create({
    withCredentials: true
})

export const boardService = {
    query,
    getBoardById,
    getGroupById,
    // removeGroup,
    // removeTask,
    // removeAllTasks,
    addBoard,
    // addGroup,
    // addTask,
    // updateTask,
    // updateBoardGroups,
    // updateBoardGroup,
    getTaskById,
    // copyList: copyGroup,
    // addActivity,
    saveBoard
}

const GUEST = {
    "_id": "guest123",
    "username": "Guest",
    "password": "123",
    "fullname": "Guest",
    "color": "#00c2e0",
    "isAdmin": false,
}

const LABELS = [
    { color: '#61bd4f', txt: '', id: utilService.makeId() },
    { color: '#f2d600', txt: '', id: utilService.makeId() },
    { color: '#ff9f1a', txt: '', id: utilService.makeId() },
    { color: '#eb5a46', txt: '', id: utilService.makeId() },
    { color: '#c377e0', txt: '', id: utilService.makeId() },
    { color: '#0079bf', txt: '', id: utilService.makeId() },
    { color: '#00c2e0', txt: '', id: utilService.makeId() },
    { color: '#344563', txt: '', id: utilService.makeId() },
]


// async function query(filterBy = null, sortBy = null) {
//     const boards = await storageService.query('board')
//     return boards
// }
async function query(filterBy = null, sortBy = null) {
    return httpService.get(`board`, { filterBy, sortBy })
}

function getFilteredTxt(filterTxt, board) {
    // console.log('board:', board);

    const { groups } = board
    return groups.map(group => {
        const { tasks } = group
        return tasks.filter(task => {
            const { title, description, comments, checklists, labels } = task


            if (title) if (title.toLowerCase().includes(filterTxt.toLowerCase())) return task
            if (description) if (description.toLowerCase().includes(filterTxt.toLowerCase())) return task
            if (comments) if (comments.filter(comment => comment.txt.toLowerCase().includes(filterTxt.toLowerCase()))) return task
            if (checklists)if  (checklists.filter(checklist => checklist.title.toLowerCase().includes(filterTxt.toLowerCase()))) return task
            if (labels) if (labels.filter(label => label.txt.toLowerCase().includes(filterTxt.toLowerCase()))) return task
            
            
            
            
            
            
        })
    })
}
// if (checklist.todos) if  (todos.filter(todo => todo.title.toLowerCase().includes(filterTxt.toLowerCase()))) return Task

function getFilteredMembers(filterMembers, board) {
    console.log('in filter members')
    const { groups } = board
    return groups.map(group => {

        console.log(group)
        const { tasks } = group
        return tasks.map(task => {
            console.log('task:', task);
            if (!task.members) return
            return task.members.filter(member => {
                if (!member.fullname) return
                return filterMembers.toLowerCase().includes(member.fullname)

            })
        })
    })
}

function getFilteredDueDates(filterDueDate, board) {
    const { groups } = board
    return groups.map(group => {
        const { tasks } = group
        return tasks.map(task => {
            const { time, completed } = task.dueDate
            // filter(member => filterDueDate.toLowerCase().includes(member.fullname))
        })
    })
}

function getFilteredLabels(filterLabels, board) {
    const { groups } = board
    return groups.map(group => {
        const { tasks } = group
        return tasks.map(task => {
            if (!task.labels) return
            return task.labels.filter(label => {
                if (!label) return
                return label.color.includes(filterLabels)
            })
        })
    })
}


// function removeGroup(boardId, groupId) {
//     return storageService.removeGroupFromBoard('board', boardId, groupId)
// }

// function copyGroup(boardId, groupId) {
//     const groupCopyId = 'g' + utilService.makeId(3)
//     return storageService.copyGroup('board', boardId, groupId, groupCopyId)
// }


// function removeTask(boardId, groupId, taskId) {
//     return storageService.removeTaskFromBoard('board', boardId, groupId, taskId)
// }

// function removeAllTasks(boardId, groupId) {
//     return storageService.removeAllTasksInGroup('board', boardId, groupId)
// }


function addBoard(board) {
    const user = userService.getLoggedinUser()
    board.createdBy = user
    board.activities = []
    board.groups = []
    board.members = user ? [user] : []
    board.labels = LABELS
    return axios.post(`http://localhost:3030/api/board`, board).then((res) => res.data);
}

// function addGroup(boardId, title = 'group title to add') {
//     console.log('add group title from service :', title);
//     const group = {
//         title,
//         id: 'g' + utilService.makeId(3),
//         tasks: [],
//         style: {}
//     }
//     return storageService.addItemToEntityOfBoard('board', 'groups', boardId, group)
// }

// function addActivity(boardId, taskId, txt) {

//     const activity = {
//         byMember: 'member',
//         createdAt: Date.now(),
//         txt,
//         id: utilService.makeId(3),
//         taskId
//     }
//     return storageService.addItemToEntityOfBoard('board', 'activities', boardId, activity)
// }

// function addTask(boardId, groupId, title = 'task title to add', byMember = { id: utilService.makeId(), username: 'TEST' }) {
//     const task = {
//         title: title,
//         byMember: byMember,
//         id: 'c' + utilService.makeId(3),
//         createdAt: Date.now(),
//         style: {},
//     }
//     return storageService.addItemToEntityOfGroup('board', 'tasks', boardId, groupId, task)
// }


// function updateBoardGroup(boardId, group) {
//     // return storageService.UpdateEntityOfBoard('board', boardId, group)
// }

// function updateBoardGroups(boardId, groups) {
//     return storageService.putGroups('board', 'groups', boardId, groups)
// }

// function updateTask(boardId, groupId, task) {
//     return storageService.putEntityOfGroup('board', 'tasks', boardId, groupId, task)
// }


// async function getBoardById(boardId, filterBy = null) {
//     console.log('filterBy:', filterBy);
//     const boards = await storageService.query('board')
//     const board = boards.find((board => board._id === boardId))
//     console.log('board:', board);
//     if (!filterBy) return board;
//     const { txt, members, dueDate, labels } = filterBy
//     if (txt) return getFilteredTxt(txt, board)
//     if (members) return getFilteredMembers(members, board)
//     if (dueDate) return getFilteredDueDates(dueDate, board)
//     if (dueDate) return getFilteredLabels(labels, board)
// }

async function getBoardById(boardId) {
    const board = await httpService.get(`board/${boardId}`)
    return board
    
}
// if (filterBy) {
//     const { txt, members, dueDate, labels } = filterBy
//     const filteredBoard = getFilteredTxt(txt, board)
//     return filteredBoard
// } else {
// }

async function getGroupById(boardId, groupId) {
    const board = await getBoardById(boardId)
    const group = board.groups.find(group => group.id === groupId)
    return group;

}

async function getTaskById(boardId, groupId, taskId) {
    const board = await getBoardById(boardId)
    const group = board.groups.find(group => group.id === groupId)
    const task = group.tasks.find(task => task.id === taskId)
    return task;
}




async function saveBoard(board) {
    const savedBoard = await httpService.put(`board/${board._id}`, board)
    socketService.emit('board-update', board)
    return

}