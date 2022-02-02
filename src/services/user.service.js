import { storageService } from './async-storage.service'
import { utilService } from './util.service'

import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
// var gWatchedUser = null;



export const userService = {
   login,
   logout,
   signup,
   getLoggedinUser,
   getUsers,
   removeUserFromData
}



async function signup({ username, password, fullname }) {
   const userCred = { username, password, fullname, color: _getRandomColor(), initials: _getInitials(fullname) }
   const user = await httpService.post('auth/signup', userCred)
   // socketService.emit('set-user-socket', user._id);
   return _saveLocalUser(user)
}

async function login({ username, password }) {
   const userCred = { username, password }

   const user = await httpService.post('auth/login', userCred)
   // socketService.emit('set-user-socket', user._id);
   // if (user) return _saveLocalUser(user)
   return _saveLocalUser(user)
}

async function logout() {
   sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
   // socketService.emit('unset-user-socket');
   return await httpService.post('auth/logout')
}

function getUsers(filterBy) {
   return httpService.get(`user`,filterBy)
}

function removeUserFromData(userId) {
   return storageService.remove('user', userId)
   //    return httpService.delete(`user/${userId}`)
}


// async function update(user) {
//    await storageService.put('user', user)
// //    user = await httpService.put(`user/${user._id}`, user)
//    // Handle case in which admin updates other user's details
//    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
//    return user;
// }


function getLoggedinUser() {
   return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}



function _saveLocalUser(user) {
   sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
   return user
}



// async function getById(userId) {
//    // const user = await storageService.get('user', userId)
//    const user = await httpService.get(`user/${userId}`)
//    gWatchedUser = user;
//    return user;
// }



// (async () => {
//    // Dev Helper: Listens to when localStorage changes in OTHER browser

//    // Here we are listening to changes for the watched user (comming from other browsers)
//    window.addEventListener('storage', async () => {
//       if (!gWatchedUser) return;
//       const freshUsers = await storageService.query('user')
//       const watchedUser = freshUsers.find(u => u._id === gWatchedUser._id)
//       if (!watchedUser) return;
//       if (gWatchedUser.score !== watchedUser.score) {
//          console.log('Watched user score changed - localStorage updated from another browser')
//          socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedUser)
//       }
//       gWatchedUser = watchedUser
//    })
// })();

const colors = [
   '#61bd4f',
   '#f2d600',
   '#ff9f1a',
   '#eb5a46',
   '#c377e0',
   '#0079bf',
   '#00c2e0',
   '#344563',
]
function _getRandomColor() {
   return colors[utilService.getRandomIntInclusive(0, colors.length - 1)]
}




function _getInitials(fullname) {
   let splitedName = fullname.split(' '),
      initials = splitedName[0].substring(0, 1).toUpperCase();

   if (splitedName.length > 1) {
      initials += splitedName[splitedName.length - 1].substring(0, 1).toUpperCase();
   }

   return initials;
}