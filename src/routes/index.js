import logout from './auth/logout.js'
import authStatus from './auth/authStatus.js'
import googleAuth from './auth/googleAuth.js'
import githubAuth from './auth/githubAuth.js'

import userDetails from './userData/sendUserDetails.js'
import taskData from './userData/taskData.js'

import updateTask from './dbTasks/updateTask.js'
import deleteTask from './dbTasks/deleteTask.js'


export {logout, authStatus, googleAuth, userDetails, taskData, updateTask, deleteTask, githubAuth }