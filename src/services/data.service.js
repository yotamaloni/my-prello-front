
import { utilService } from './util.service'

const imgUrls = [
    'https://res.cloudinary.com/dnft2vfvz/image/upload/v1647273708/kq1ugldfmbcqpptvwvyh.png',
    'https://res.cloudinary.com/dnft2vfvz/image/upload/v1647273708/v0mqdvbqxh6czdrgrysb.png',
    'https://res.cloudinary.com/dnft2vfvz/image/upload/v1647273709/a4vbuuwexsllef1sa2p6.jpg',
    'https://res.cloudinary.com/dnft2vfvz/image/upload/v1647273605/mqnhc7cgcivlgohi2w2m.png',
    'https://res.cloudinary.com/dnft2vfvz/image/upload/v1647273605/tx1lfdili2uxlnyyinio.jpg',
    'https://res.cloudinary.com/dnft2vfvz/image/upload/v1643297323/vgunmxwzitxpvttyxyyh.jpg',
    'https://res.cloudinary.com/dnft2vfvz/image/upload/v1643633719/yxdyw5lmajrgmme9caye.jpg',
    'https://res.cloudinary.com/dnft2vfvz/image/upload/v1643539821/nkuvj56egafth7w7npyd.jpg',
    'https://res.cloudinary.com/dnft2vfvz/image/upload/v1643539695/wxf2jpeck7fmiugyxp1f.jpg',
]
const colors = [
    '#0079BF',
    '#D29034',
    '#519839',
    '#B04632',
    '#89609E',
    '#CD5A91',
    '#4BBF6B',
    '#00AECC',
    '#838C91',
    '#d7c62b',
]

const labels = [
    { color: '#61bd4f', txt: '', id: utilService.makeId() },
    { color: '#f2d600', txt: '', id: utilService.makeId() },
    { color: '#ff9f1a', txt: '', id: utilService.makeId() },
    { color: '#eb5a46', txt: '', id: utilService.makeId() },
    { color: '#c377e0', txt: '', id: utilService.makeId() },
    { color: '#0079bf', txt: '', id: utilService.makeId() },
    { color: '#00c2e0', txt: '', id: utilService.makeId() },
    { color: '#344563', txt: '', id: utilService.makeId() },
]

const guestUser = {
    "_id": utilService.makeId(),
    "username": "Guest",
    "password": "123",
    "fullname": "Guest",
    "color": "#00c2e0",
    "initials": "G",
    "isAdmin": false,
}
export const dataService = {
    imgUrls,
    colors,
    labels,
    guestUser
}