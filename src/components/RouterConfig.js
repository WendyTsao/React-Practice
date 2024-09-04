import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Resume from '../pages/Resume'
import NotFound from '../pages/NotFound'
// import NotFoundPage from './pages/NotFoundPage'

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
  { path: "*", element: <NotFound/> }
  // {
  //   path: "/about",
  //   element: <AboutPage />,
  // },
  // {
  //   path: "*",
  //   element: <NotFoundPage />,
  // },
])

const RouterConfig = () => {
  return <RouterProvider router={router} />
}

export default RouterConfig
