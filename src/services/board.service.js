
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
    addBoard,
    saveBoard
}

const GUEST = {
    "_id": utilService.makeId(),
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


async function query(filterBy = null, sortBy = null) {
    return httpService.get(`board`, { filterBy, sortBy })
}

async function addBoard(board) {
    const user = userService.getLoggedinUser()
    board.createdBy = user
    board.activities = []
    board.groups = []
    board.members = user ? [user] : []
    board.labels = LABELS
    const AddedBoard = await httpService.post(`board`, board)
    return AddedBoard
}


async function getBoardById(boardId) {
    const board = await httpService.get(`board/${boardId}`)
    return board

}

async function saveBoard(board) {
    const savedBoard = await httpService.put(`board/${board._id}`, board)
    socketService.emit('board-update', board)
    return
}