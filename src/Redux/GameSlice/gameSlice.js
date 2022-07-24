import { createSlice} from "@reduxjs/toolkit";

let initialCard=[
    {"src":"./image/img-1.jpg", matched:false},
    {"src":"./image/img-2.jpg", matched:false},
    {"src":"./image/img-3.jpg", matched:false},
    {"src":"./image/img-4.jpg", matched:false},
    {"src":"./image/img-5.jpg", matched:false},
    {"src":"./image/img-6.jpg", matched:false},
    {"src":"./image/img-7.jpg", matched:false},
    {"src":"./image/img-8.jpg", matched:false},
    {"src":"./image/img-9.jpg", matched:false},
    {"src":"./image/img-10.jpg", matched:false}
]
const gameSlice=createSlice({
    name:"game",
    initialState:{
        item:[...initialCard, ...initialCard].map(card=>({...card, id:Math.random()})),
        score:0,
    },
    reducers:{
        playAgain:(state)=>{
            for(let i=0; i<state.item.length; i++){
                if(state.item[i].matched===true){
                    state.item[i].matched=false
                }
            }
            state.item=state.item.sort(()=> Math.random() -0.5) //Shuffle cards using math.random
            state.score=0
        },
        moveScore:(state, action)=>{
            const score=action.payload
            state.score+=score
        },
        matchedCards:(state, action)=>{
            const src=action.payload;
            for(let i=0; i<state.item.length; i++){
                if(state.item[i].src===src){
                    state.item[i].matched=true
                 }
            }
        }
    }

})
export default gameSlice.reducer 
export const {playAgain, moveScore, matchedCards}=gameSlice.actions