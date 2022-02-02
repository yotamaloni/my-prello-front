import io from 'socket.io-client'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

window.socketService = socketService

var socketIsReady = false;
socketService.setup()


function createSocketService() {
  var socket = null;
  const socketService = {
    setup() {
      socket = io(baseUrl)
    },
    on(eventName, cb) {
      // console.log('cb:', cb);
      // console.log('eventName:', eventName);
      
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data=null) {
      socket.emit(eventName, data)
      // console.log('data:', data);
      // console.log('eventName:', eventName);
    },
    terminate() {
      socket = null
    }
  }
  return socketService
}

// eslint-disable-next-line
// function createDummySocketService() {
//   var listenersMap = {}
//   const socketService = {
//     listenersMap,
//     setup() {
//       listenersMap = {}
//     },
//     terminate() {
//       // console.log('board closed');
//       this.setup()
//     },
//     on(eventName, cb) {
     
      
      
//       listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
//     },
//     off(eventName, cb) {
//       if (!listenersMap[eventName]) return
//       if (!cb) delete listenersMap[eventName]
//       else listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
//     },
//     emit(eventName, data) {
//       // console.log('eventName:',eventName );
//       // console.log('data:', data);
//       if (!listenersMap[eventName]) return
//       listenersMap[eventName].forEach(listener => {
//         listener(data)
//       })
//     },
//     debugMsg() {
//       this.emit('chat addMsg', { from: 'Someone', txt: 'Aha it worked!' })
//     },
//   }
//   window.listenersMap = listenersMap;
//   return socketService
// }


// const socket=socketService.setup()
// socket.on('taskChanged',(task)=>{
// console.log('taskChanged',task)
// taskService.update(task)
// })

// taskService.save(task)
// socket.emit('taskChanged',task)





