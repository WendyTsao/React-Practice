import PropTypes from "prop-types"
import { Snackbar, Alert } from "@mui/material"
import { useState, useEffect } from "react"

const AlertBar = ({content, onClose}) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (content) setOpen(true)
  }, [content])

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
    if (onClose) onClose()
  }

  return <>
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal:'center' }}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert severity="warning" sx={{ width: '100%' }} onClose={handleClose}>
        {content}
      </Alert>
    </Snackbar>
  </>
}

export default AlertBar

AlertBar.propsTypes = {
  content: PropTypes.string,
  onClose: PropTypes.func
}