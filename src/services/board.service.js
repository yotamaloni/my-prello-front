
import { utilService } from './util.service'
import { httpService } from './http.service'
import { socketService } from './socket.service'

import { userService } from './user.service'
import { dataService } from './data.service'


export const boardService = {
    query,
    getBoardById,
    addBoard,
    saveBoard,
    removeBoard,
    uploadImg,
}

async function query(filterBy = null) {
    return httpService.get(`board`, { filterBy })
}

async function addBoard(board) {
    let user = userService.getLoggedinUser()
    if (!user) user = dataService.guestUser
    board.createdBy = user
    board.activities = []
    board.groups = []
    board.members = user ? [user] : []
    board.labels = dataService.labels
    const AddedBoard = await httpService.post(`board`, board)
    return AddedBoard
}


async function getBoardById(boardId) {
    const board = await httpService.get(`board/${boardId}`)
    return board

}

async function saveBoard(board) {
    const savedBoard = await httpService.put(`board/${board._id}`, board)
    socketService.emit('board-update', savedBoard)
    return savedBoard
}


async function removeBoard(boardId) {
    return httpService.delete(`board/${boardId}`)
}

async function uploadImg(ev) {
    const CLOUD_NAME = 'dnft2vfvz'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', 'bhdlgcay');

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(res => res.url)
        .catch(err => console.error(err))
}