import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Resume from '../pages/Resume'
import Layout from '../components/Layout'
import DebounceInput from '../pages/DebounceInput'
import ToDoList from '../pages/ToDoList'
import NotFound from '../pages/NotFound'

// 定義路由配置
const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
  },
  {
    path: "/resume",
    element: <Resume />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/DebounceInput",
        element: <DebounceInput />
      },
      {
        path: "/ToDoList",
        element: <ToDoList />
      }
    ]
  },
  { path: "*", element: <NotFound /> }
])

const RouterConfig = () => {
  return <RouterProvider router={router} />
}

export default RouterConfig
