import { Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";

import MainCard from "../components/MainCard"
import logo from '../assets/images/logo.svg';

function Home() {
  const navigate = useNavigate()

  const menu = [
    { title: 'PRACTICE', subTitle: 'Learn React through the question bank and document', buttonText: 'Easy try', onClick: () => navigate("/DebounceInput") },
    { title: 'RESUME', subTitle: 'Committed to transforming into a project manager', buttonText: 'Get to know', onClick: () => navigate("/resume") }
  ]
  
  return (
    <div className="layout">
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
      </header>
      <Grid2
        container 
        justifyContent="center"
        alignItems="strech" 
        spacing={2}
        sx={{ marginLeft: 0 }}
      >
        {menu.map(item => (
          <MainCard
            key={item.title}
            cardTitle={item.title}
            subTitle={item.subTitle}
            buttonText={item.buttonText}
            onClick={item.onClick}
          />
        ))}
      </Grid2>
    </div>
  );
}

export default Home;
