
import { utilService } from './util.service'

const imgUrls = [
    'https://res.cloudinary.com/dnft2vfvz/image/upload/v1647273708/Prello/v0mqdvbqxh6czdrgrysb.png',
    'https://res.cloudinary.com/dnft2vfvz/image/upload/v1647273605/Prello/mqnhc7cgcivlgohi2w2m.png',
    'https://res.cloudinary.com/dnft2vfvz/image/upload/v1647273708/Prello/kq1ugldfmbcqpptvwvyh.png',
    'https://res.cloudinary.com/dnft2vfvz/image/upload/v1647273605/Prello/mu8ogvgnrquikhpiykxy.png',
    'https://res.cloudinary.com/dnft2vfvz/image/upload/v1647431111/Prello/vr03jv7bgekucyzborjv.jpg',
    'https://res.cloudinary.com/dnft2vfvz/image/upload/v1643297323/Prello/vgunmxwzitxpvttyxyyh.jpg',
    'https://res.cloudinary.com/dnft2vfvz/image/upload/v1643539821/Prello/nkuvj56egafth7w7npyd.jpg',
    'https://res.cloudinary.com/dnft2vfvz/image/upload/v1643539695/Prello/wxf2jpeck7fmiugyxp1f.jpg',
    'https://res.cloudinary.com/dnft2vfvz/image/upload/v1643539605/Prello/cqbnsiv8ad3r75daemsa.jpg',
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

const dateOptions = [
    { name: 'noDates', txt: 'No dates', id: utilService.makeId() },
    { name: 'overDue', txt: 'Over due', id: utilService.makeId() },
    { name: 'nextDay', txt: 'Due in the next day', id: utilService.makeId() },
    { name: 'nextWeek', txt: 'Due in the next week', id: utilService.makeId() },
    { name: 'nextMonth', txt: 'Due in the next month', id: utilService.makeId() },
    { name: 'completed', txt: 'Marked as completed', id: utilService.makeId() },
    { name: 'notCompleted', txt: 'Not marked as completed', id: utilService.makeId() }
]
export const dataService = {
    imgUrls,
    colors,
    labels,
    guestUser,
    dateOptions
}

