import {useEffect, useState} from 'react'
import  Card  from '../card';
import { againGame, moveScore, matchedCards } from '../../Redux/GameSlice/gameSlice';
import {useSelector, useDispatch} from "react-redux"
import {Container, Row, Button, Badge} from "react-bootstrap"

function Game() {
    const cards=useSelector(state=>state.game.item) 
    const score=useSelector(state=>state.game.score) 
    const [choiceOne, setChoiceOne]=useState(null);
    const [choiceTwo, setChoiceTwo]=useState(null);
    const dispatch=useDispatch();

    console.log(cards)
    console.log(choiceOne)

    useEffect(()=>{
      
      if(choiceOne && choiceTwo){
        if(choiceOne.src === choiceTwo.src){
          dispatch(moveScore(50))
          dispatch(matchedCards(choiceOne.src))
          reset()
        }
        else{
          dispatch(moveScore(-10))
          reset()
        }
      }
    },[dispatch,choiceOne, choiceTwo])

    useEffect( ()=>{
      dispatch(againGame())
    },[dispatch])

  const handleClick=()=>{
    dispatch(againGame())
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
        <div className='d-flex justify-content-center mt-3'>
          <Badge bg="dark">Score:{score}</Badge>
          <Button className='btn-sm btn-warning fw-lg ms-5' onClick={handleClick} >Again Game</Button>
        </div>
        <div className='card'>
          <Row xs={4}>
            { cards.map((card, key)=>(
            <Card key={key}
             card={card}
             handleChoice={handleChoice}
             flipped={card.matched}
             />
            ))
            }
          </Row>
        </div>
    </Container>
   
  )
}

export default Game