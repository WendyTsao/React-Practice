import { Breadcrumbs, Link, Box, Drawer, List, ListItem, ListItemText, ListItemButton } from "@mui/material"
import { Outlet } from "react-router-dom"
import { FaHome } from "react-icons/fa"

import '../assets/styles/Practice.styl'

function Practice() {
  // const navigate = useNavigate()

  return (
    <div className="practice">
      <header className="header">
        <Breadcrumbs classes={{ root: "breadcrumb" }} aria-label="breadcrumb">
          <Link underline="none" color="inherit" href="/">
            <FaHome size={14} style={{ marginRight: "5px" }} />
            Home
          </Link>
          <Link
            underline="none"
            color="#BBE1FA"
            href="/resume"
            aria-current="page"
          >
            Practice
          </Link>
        </Breadcrumbs>
        <h1 className="title">PRACTICE</h1>
      </header>

      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          classes={{ root: "drawer" }}
        >
          <Box sx={{ overflow: 'auto' }}>  
          <List>
              {['DebounceInput', 'ToDoList'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton to={`/${text}`}>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        <Box component="main" flexGrow={1}>
          <Outlet />
        </Box>
      </Box>
    </div>
  )
}

export default Practice
