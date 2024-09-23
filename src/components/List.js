import {
  TextField,
  Box,
  Typography,
  List,
  ListItem,
  Checkbox,
  ListItemText,
  ListItemButton
} from "@mui/material"
import { FaRegEdit, FaRegSave, FaRegTrashAlt } from "react-icons/fa"
import { memo } from "react"
import PropTypes from "prop-types"

const ToDoList = memo(({title, listBgcolor, tasks, handleToggle, onChangeTextField, handleSave, handleEdit, handleDelete}) => {

  return <>
    <Box>
      <Typography variant="h5">{ title }</Typography>
      <List sx={{ width: "100%", bgcolor: listBgcolor, color: "#000" }}>
        {tasks.map((task, index) => (
          <ListItem key={task.id} disablePadding>
            <ListItemButton onClick={() => handleToggle({task, index})}>
              <Checkbox
                checked={task.done}
                color="success"
                disableRipple
              />
              {task.isEdit ? (
                <TextField
                  variant="outlined"
                  value={task.text}
                  onChange={(e) => onChangeTextField(task, e.target.value, index)}
                />
              ): (
                <ListItemText primary={task.text}/>
              )}
            </ListItemButton>
            {!task.done && (
              task.isEdit ? (
                <FaRegSave size={20} style={{ margin: "10px" }} onClick={() => handleSave({task, index})}/>
              ) : (
                <FaRegEdit size={20} style={{ margin: "10px" }} onClick={() => handleEdit({task, index})}/>
              )
            )}
            <FaRegTrashAlt size={20} style={{ margin: "20px" }} onClick={() => handleDelete({task, index})}/>
          </ListItem>
        ))}
      </List>
    </Box>
  </>
})

export default ToDoList

ToDoList.propsTypes = {
  title: PropTypes.string,
  listBgcolor: PropTypes.string,
  tasks: PropTypes.array,
  handleToggle: PropTypes.func,
  handleSave: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func
}