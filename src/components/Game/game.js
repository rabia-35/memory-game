import {useEffect, useState} from 'react'
import  Card  from '../card';
import { playAgain, moveScore, matchedCards } from '../../Redux/GameSlice/gameSlice';
import {useSelector, useDispatch} from "react-redux"
import {Container, Row, Button, Badge} from "react-bootstrap"

function Game() {
    const cards=useSelector(state=>state.game.item) 
    const score=useSelector(state=>state.game.score) 
    const [choiceOne, setChoiceOne]=useState(null); // the state for first choice card
    const [choiceTwo, setChoiceTwo]=useState(null); // the state for second choice card
    const dispatch=useDispatch();

    useEffect(()=>{
      
      if(choiceOne && choiceTwo){
        if(choiceOne.src === choiceTwo.src){
          dispatch(moveScore(50))
          dispatch(matchedCards(choiceOne.src))
          reset()
        }
        else{
          dispatch(moveScore(-10));
          setTimeout(() => reset(),1000);// use setTimeout to extend the display time of the second card
        }
      }
    },[dispatch,choiceOne, choiceTwo])

    useEffect( ()=>{
      dispatch(playAgain())
    },[dispatch])

  const handleClick=()=>{
    dispatch(playAgain())
  }

  const handleChoice=(card)=>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  const reset=()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
  }

  return (
    
    <Container >
        <div className='d-flex justify-content-center mt-5'>
         <Badge bg="dark" className='badge' >Score: {score}</Badge>
          <Button className='btn btn-warning ' onClick={handleClick} >Play Again</Button>
        </div>
        <div className='card'>
          <Row xs={5}>
            { cards.map((card)=>(
            <Card key={card.id}
             card={card}
             handleChoice={handleChoice}
             flipped={(choiceOne && choiceOne.id=== card.id) || (choiceTwo && choiceTwo.id===card.id) || card.matched}
             />
            ))
            }
          </Row>
        </div>
    </Container>
   
  )
}

export default Game