import { Card, CardContent, CardActions, Button } from "@mui/material"
import { BsFillArrowRightCircleFill } from "react-icons/bs"
import PropTypes from "prop-types"

const MainCard = ({cardId, direction, cardTitle, subTitle, buttonText, onClick, onMouseEnter, children}) => {

  return <>
    <Card id={cardId} classes={{ root: `card ${direction}` }} sx={{ minWidth: 320, bgcolor: '#3f4a61' }} onClick={onClick} onMouseEnter={onMouseEnter}>
      <CardContent classes={{ root: "cardContent" }}>
        <h2 className="cardTitle">{ cardTitle }</h2>
        {subTitle && <p className="subTitle">{ subTitle }</p>}
        { children }
      </CardContent>
      {buttonText && <CardActions classes={{ root: "cardActions" }}>
        <Button 
          size="middle"
          classes={{ root: "button" }}
          sx={{ '&:hover': { backgroundColor: 'transparent' } }}
        >
          { buttonText }
          <BsFillArrowRightCircleFill style={{ marginLeft: "5px" }} />
        </Button>
      </CardActions>}
    </Card>
  </>
}

export default MainCard

MainCard.propsTypes = {
  cardId: PropTypes.string,
  direction: PropTypes.string,
  cardTitle: PropTypes.string,
  subTitle: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func
}