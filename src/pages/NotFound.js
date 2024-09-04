import { useNavigate } from "react-router-dom";
import { Card, CardContent, Button } from "@mui/material"

import '../assets/styles/ErrorLayout.styl';
import errorImg from '../assets/images/error.png';

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="layout error">
      <Card classes={{ root: "card" }} sx={{ minWidth: 600, bgcolor: '#3f4a61' }}>
        <CardContent classes={{ root: "cardContent" }}>
          <h2 className="cardTitle">ERROR</h2>
          <img src={errorImg} className="image" alt="logo" />
          <p className="subTitle">Page Not Found</p>
        </CardContent>
        <Button size="large" classes={{ root: "button" }} onClick={() => navigate("/")}>
          Go Back Home
        </Button>
      </Card>
    </div>
  );
}

export default NotFound;
