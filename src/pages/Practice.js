import { Container, Grid2 } from "@mui/material"
import { useNavigate } from "react-router-dom"

import MainCard from "../components/MainCard"

function Practice() {
  const navigate = useNavigate()

  const list = [
    { title: 'Debounce Input', onClick: () => navigate("/debounce-input") },
    { title: 'ToDo List', onClick: () => navigate("/todo-list") }
  ]

  return (
    <Container sx={{paddingX: "0", paddingY: '1rem'}} component={"main"}>      
      <Grid2
        container 
        justifyContent="center"
        alignItems="strech" 
        spacing={2}
        sx={{ marginLeft: 0 }}
      >
        {list.map(item => (
          <MainCard
            key={item.title}
            cardTitle={item.title}
            subTitle={item.subTitle}
            buttonText={item.buttonText}
            onClick={item.onClick}
          />
        ))}
      </Grid2>
    </Container>
  )
}

export default Practice
