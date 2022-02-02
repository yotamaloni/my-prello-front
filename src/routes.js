import { TaskPreview } from './cmps/task-preview.jsx';
import { AppHome } from './pages/app-home.jsx'
import { BoardApp } from './pages/board-app.jsx'
import { BoardDetails } from './pages/board-details.jsx'
import { LoginSignup } from './pages/login-signup.jsx'
import { TaskDetails } from './cmps/task-details.jsx'


const routes = [
    {
        path: '/',
        component: AppHome,
        exact: true
    },
    {
        path: '/board',
        component: BoardApp,
        exact: true

    },
    {
        path: '/login-signup',
        component: LoginSignup,
        exact: true

    },
    {
        path: '/board/:boardId',
        component: BoardDetails,
        exact: false
    },

]

export default routes;