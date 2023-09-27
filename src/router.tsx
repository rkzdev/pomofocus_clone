import { RouteObject, createBrowserRouter } from 'react-router-dom'
import RootPage from './pages/root.page'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootPage />,
  },
]

const router = createBrowserRouter(routes)

export default router
