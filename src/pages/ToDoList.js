import { Container, Alert, AlertTitle, FormControl, InputLabel, OutlinedInput, Grid2 } from "@mui/material"
import { useCallback, useRef, useState } from "react"
import { useImmerReducer } from "use-immer"
import { FaPlusSquare } from "react-icons/fa"

import List from "../components/List"
import AlertBar from "../components/AlertBar"

function ToDoList() {
  const todoRef = useRef(null)
  const [alertContent, setAlertContent] = useState("")

  const initialTasks = {
    todoList: [
      { id: 1, text: "實作一個網站", done: false, isEdit: false },
      { id: 2, text: "學習Redux", done: false, isEdit: false }
    ],
    doneList: [
      { id: 0, text: "練習各式React題目", done: true }
    ]
  }

  const [tasks, dispatch] = useImmerReducer((draftState, action) => {
    let editList = draftState.todoList[action.index]

    switch (action.type) {
    case "ADD":
      draftState.todoList.push({
        id: action.id,
        text: action.text,
        done: false
      })
      break

    case "TOGGLE":
      if (!action.task.done) {
        const toggleTodo = draftState.todoList[action.index]
        toggleTodo.done = !toggleTodo.done
        draftState.doneList.push(toggleTodo)
        draftState.todoList.splice(action.index, 1)
      }
      else {
        const toogleDone = draftState.doneList[action.index]
        toogleDone.done = !toogleDone.done
        draftState.todoList.push(toogleDone)
        draftState.doneList.splice(action.index, 1)
      }
      break

    case "EDIT":
      editList.isEdit = true
      break

    case "SAVE":
      if (action.text === undefined) {
        editList.isEdit = false
      } else {
        editList.text = action.text
        editList.isEdit = false
      }
      break

    case "DELETE":
      if (!action.task.done) {
        draftState.todoList.splice(action.index, 1)
      }
      else {
        draftState.doneList.splice(action.index, 1)
      }
      break
    default:
      break
    }
  }, initialTasks)

  const handleAddTask = () => {
    const text = todoRef.current.value
    if (!text) {
      setAlertContent("Please add a todo item.")
      return
    }
    todoRef.current.value = ""
    dispatch({
      type: "ADD",
      id: tasks.todoList.length + tasks.doneList.length,
      text,
      done: false
    })
  }

  // 編輯未完成及已完成狀態
  const handleToggle = useCallback(({task, index}) => {
    if (!task.isEdit) {
      dispatch({ type: "TOGGLE", task, index })
    }
  }, [])

  // 編輯未完成的內容
  const handleEdit = useCallback(({ task, text, index }) => {
    handleSave({ task, text, index })
    dispatch({ type: "EDIT", task, text, index })
  }, [handleSave])

  function handleSave({ task, text, index }) {
    dispatch({ type: "SAVE", task, text, index })
  }
  // 刪除未完成及已完成清單
  function handleDelete({task, index}) {
    dispatch({ type: "DELETE", task, index })
  }

  const onChangeTextField = useCallback((task, e, index) => {
    handleEdit({ task, text: e, index })
  }, [handleEdit])

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddTask()
    }
  }

  const handleCloseAlert = () => {
    setAlertContent(""); // 關閉 AlertBar
  }
  // 判斷當有資料時才有背景色
  const todoBgColor = tasks.todoList.length > 0 ? "#E9D3D9" : "transparent"
  const doneBgColor = tasks.doneList.length > 0 ? "#DEECCF" : "transparent"

  return (
    <Container sx={{paddingY: "1rem"}} component={"main"}>
      {alertContent && <AlertBar content={alertContent} onClose={handleCloseAlert} />}
      <p className="time">2024.06.20</p>
      <Alert severity="info">
        <AlertTitle>實作一個 Todo List</AlertTitle>
        <ul>
          <li>有一個輸入匡可以輸入新的Todo清單</li>
          <li>可以編輯、修改、刪除每一項Todo清單</li>
          <li>分別顯示未完成及已完成的Todo清單</li>
        </ul>
      </Alert>

      <FormControl classes={{ root: "text-field" }}>
        <InputLabel htmlFor="todo-title">Add a todo item</InputLabel>
        <OutlinedInput
          id="todo-title"
          inputRef={todoRef}
          endAdornment={<FaPlusSquare size={20} color="#BBE1FA" onClick={handleAddTask} />}
          onKeyDown={handleKeyDown}
          label="Add a todo item"
        />
      </FormControl>
      
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <List
            title={"Todo List"}
            tasks={tasks.todoList}
            listBgcolor={todoBgColor}
            onChangeTextField={onChangeTextField}
            handleToggle={handleToggle}
            handleEdit={handleEdit}
            handleSave={handleSave}
            handleDelete={handleDelete}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <List
            title={"Done List"}
            tasks={tasks.doneList}
            listBgcolor={doneBgColor}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
          />
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default ToDoList
