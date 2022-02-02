import { utilService } from './util.service'

import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
   login,
   logout,
   signup,
   getLoggedinUser,
   getUsers,
}

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

async function signup({ username, password, fullname }) {
   const userCred = { username, password, fullname, color: _getRandomColor(), initials: _getInitials(fullname) }
   const user = await httpService.post('auth/signup', userCred)
   return _saveLocalUser(user)
}

async function login({ username, password }) {
   const userCred = { username, password }

   const user = await httpService.post('auth/login', userCred)
   return _saveLocalUser(user)
}

async function logout() {
   sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
   return await httpService.post('auth/logout')
}

function getUsers(filterBy) {
   return httpService.get(`user`, filterBy)
}

function getLoggedinUser() {
   return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}



function _saveLocalUser(user) {
   sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
   return user
}


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