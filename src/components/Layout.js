import { Breadcrumbs, Link, Box, Drawer, List, ListItem, ListItemText, ListItemButton } from "@mui/material"
import { useLocation } from 'react-router-dom'
import { Outlet } from "react-router-dom"
import { FaHome } from "react-icons/fa"
import { isMobile } from 'react-device-detect'
import { useNavigate } from "react-router-dom"

import Copyright from "../components/Copyright"

import '../assets/styles/Practice.styl'

function Layout() {
  const navigate = useNavigate()

  const routes = [
    { path: "debounce-input", title: "Debounce Input" },
    { path: "todo-list", title: "ToDo List" },
  ]

  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x)
  const breadcrumbs = [
    { title: "Home", path: "/" },
    { title: "Practice", path: "/practice" },
    ...routes.filter(route => pathnames.includes(route.path)).map(route => ({
      title: route.title,
      path: `/${route.path}`
    }))
  ]

  return (
    <div className="practice">
      <header className="header">
        {isMobile && <Breadcrumbs classes={{ root: "breadcrumb" }} aria-label="breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => (
            index < breadcrumbs.length - 1 ? (
              <Link
                key={breadcrumb.path}
                underline="none"
                color="inherit"
                href={breadcrumb.path}
              >
                {breadcrumb.title === 'Home' && <FaHome size={14} style={{ marginRight: "5px" }} />}
                {breadcrumb.title}
              </Link>
            ) : (
              <Link
                key={breadcrumb.path}
                underline="none"
                color="#BBE1FA"
                aria-current="page"
              >
                {breadcrumb.title}
              </Link>
            )
          ))}
        </Breadcrumbs>}
        <h1 className="title" onClick={!isMobile ? () => navigate(-1) : undefined}>PRACTICE</h1>
      </header>

      <Box sx={{ display: 'flex' }}>
        {!isMobile && (pathnames[0] !== 'practice') && <Drawer
          variant="permanent"
          classes={{ root: "drawer" }}
        >
          <Box sx={{ overflow: 'auto' }}>  
            <List>
              {routes.map(route => (
                <ListItem key={route.path} disablePadding>
                  <ListItemButton to={`/${route.path}`}>
                    <ListItemText primary={route.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>}

        <Box component="main" flexGrow={1}>
          <Outlet />
        </Box>
      </Box>

      {!isMobile && <Copyright />}
    </div>
  )
}

export default Layout
