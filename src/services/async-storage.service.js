
import { utilService } from './util.service.js'
import { initData } from './init.data.js'


export const storageService = {
    query,
    get,
    putGroups,
    removeGroupFromBoard,
    removeTaskFromBoard,
    addItemToEntityOfBoard,
    addItemToEntityOfGroup,
    putEntityOfGroup,
    removeAllTasksInGroup,
    copyGroup,
    addBoardToData,
    //users:
    post,
    remove,
}

function query(entityType, delay = 200) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || initData.getBoards()

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(entities)
            _save(entityType, entities)

        }, delay)
    })
}


function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}

function addBoardToData(entityType, board) {
    return query(entityType)
        .then(boards => {
            boards.push(board)
            return boards
        })
        .then(boards => {
            _save(entityType, boards)
            return boards
        }
        )
}


function addItemToEntityOfBoard(entityType, entityKey, boardId, itemToAdd) {
    return query(entityType)
        .then(boards => {
            const boardIdx = boards.findIndex(board => board._id === boardId)
            boards[boardIdx][entityKey]?.push(itemToAdd)
            _save(entityType, boards)
            return itemToAdd
        })
}

function addItemToEntityOfGroup(entityType, entityKey, boardId, groupId, itemToAdd) {
    return query(entityType)
        .then(boards => {
            const boardIdx = boards.findIndex(board => board._id === boardId)
            const groupIdx = boards[boardIdx].groups.findIndex(group => group.id === groupId)
            boards[boardIdx].groups[groupIdx][entityKey].push(itemToAdd)
            _save(entityType, boards)

            return itemToAdd
        })
}


function putEntityOfGroup(entityType, entityKey, boardId, groupId, updatedItem) {

    return query(entityType)
        .then(boards => {
            const boardIdx = boards.findIndex(board => board._id === boardId)
            const groupIdx = boards[boardIdx].groups.findIndex(group => group.id === groupId)
            const entityIdx = boards[boardIdx].groups[groupIdx][entityKey].findIndex(entity => entity.id === updatedItem.id)
            boards[boardIdx].groups[groupIdx][entityKey].splice(entityIdx, 1, updatedItem)
            _save(entityType, boards)
            return updatedItem
        })
}


function putGroups(entityType, updatedEntity, boardId, itemToUpdate) {
    return query(entityType)
        .then(boards => {
            const boardIdx = boards.findIndex(board => board._id === boardId)
            boards[boardIdx][updatedEntity] = itemToUpdate
            _save(entityType, boards)
            return boards
        })
}


function removeGroupFromBoard(entityType, boardId, groupId) {
    return query(entityType)
        .then(boards => {
            const boardIdx = boards.findIndex(board => board._id === boardId)
            const groupIdx = boards[boardIdx].groups.findIndex(group => group.id === groupId)
            if (groupIdx === -1) return
            boards[boardIdx].groups.splice(groupIdx, 1)
            _save(entityType, boards)
        })
}

function removeTaskFromBoard(entityType, boardId, groupId, taskId) {
    return query(entityType)
        .then(boards => {
            const boardIdx = boards.findIndex(board => board._id === boardId)
            const groupIdx = boards[boardIdx].groups.findIndex(group => group.id === groupId)
            const taskIdx = boards[boardIdx].groups[groupIdx].tasks.findIndex(task => task.id === taskId)
            if (taskIdx === -1) return
            boards[boardIdx].groups[groupIdx].tasks.splice(taskIdx, 1)
            _save(entityType, boards)
        })
}

function removeAllTasksInGroup(entityType, boardId, groupId) {
    return query(entityType)
        .then(boards => {
            const boardIdx = boards.findIndex(board => board._id === boardId)
            const groupIdx = boards[boardIdx].groups.findIndex(group => group.id === groupId)
            const tasks = boards[boardIdx].groups[groupIdx].tasks
            tasks.splice(0, tasks.length)
            _save(entityType, boards)
        })
}

function copyGroup(entityType, boardId, groupId, groupCopyId) {
    return query(entityType)
        .then(boards => {
            const boardIdx = boards.findIndex(board => board._id === boardId)
            const groupIdx = boards[boardIdx].groups.findIndex(group => group.id === groupId)
            if (groupIdx === -1) return
            const groups = boards[boardIdx].groups
            const groupCopy = { ...groups[groupIdx] }
            groupCopy.id = groupCopyId
            groups.splice(groupIdx, 0, groupCopy)
            _save(entityType, boards)
            return groupCopy
        })

}


function _save(entityType, entities) {
    console.log('entityType FROM SAVE!', entityType)
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

//users

function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}






