import io from 'socket.io-client'
import { userService } from './user.service'

export const SOCKET_EVENT_REGISTER_USER_TO_ROOM = 'chat-register-users-to-channel'
export const SOCKET_EVENT_REGISTER_HOST_TO_ROOM = 'chat-register-host-to-room'
export const SOCKET_EMIT_SEND_RESERVATION_DETAILS = 'chat-send-reservation-details'
export const SOCKET_EMIT_SEND_HOST_NOTIFICATION = 'chat-sent-host-notification'
// export const SOCKET_EMIT_SET_TOPIC = 'chat-set-topic'
// export const SOCKET_EMIT_USER_WATCH = 'user-watch'
// export const SOCKET_EVENT_USER_UPDATED = 'user-updated'
// export const SOCKET_EVENT_REVIEW_ADDED = 'review-added'
// export const SOCKET_EVENT_REVIEW_ABOUT_YOU = 'review-about-you'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'


const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

// for debugging from console
window.socketService = socketService

socketService.setup()


function createSocketService() {
  var socket = null;
  const socketService = {
    setup() {
      socket = io(baseUrl)
      setTimeout(() => {
        const user = userService.getLoggedinUser()
        if (user) this.login(user._id)
      }, 500)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    login(userId) {
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    },

  }
  return socketService
}