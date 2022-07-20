import {Col} from "react-bootstrap"

function Card({ card, handleChoice, flipped}) {
 

  const handleClick=()=>{
    handleChoice(card)
  }

  return (
        <Col style={{position:"relative", marginTop:"10px"}} >
          <div className={flipped   ? 'flipped' : ''}>
            <img className='back' src='/image/img-cover.jpg' alt="card back" onClick={handleClick} />
            <img className='front' src={card.src} alt='card front' />
          </div>
        </Col>
  )
}

export default Card