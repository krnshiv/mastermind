import React, {useState , useEffect } from 'react';
import { Pallete } from './componenets/Pallete';
import { Answer } from './componenets/Answer';
import GameBoard  from './componenets/GameBoard';

const GameLogic = () => 
{
    const colors = ['red', 'green', 'blue', 'orange', 'purple']
    const correctAnswer = []
  
    for (let i = 0; i < 4; i++) correctAnswer.push(colors[Math.floor(Math.random() * 4) + 1]); 

    const totalRows = 10;
    const [selectedbox, setSelectedbox] = useState('')
    const [selectedColor, setSelectedColor] = useState('red')
    const [previousRows, setPreviousRows] = useState([])
    const [previousSuggestions,setpreviousSuggestions] = useState([])
    const [currentRow, setCurrentRow] = useState(['', '', '', ''])
    const [suggestions, setSuggestions] = useState([0, 0, 0, 0])
    const [selectedRow, setSelectedRow] = useState(0)
    const [correctRow, setCorrectRow] = useState(correctAnswer)
    const [check, setCheck] = useState(false) //this checks if it's ok to check whether currentRow matches correct
    const [victory, setVictory] = useState(false)
    const [defeat, setDefeat] = useState(false)

    /* function to play a move on the selectedrow  */

    function move(color, id){
        
        if (victory) {
            return false
        }

        const rowId = Number(id.substr(1, id.indexOf('-') - 1))
        const boxId = Number(id.substr(id.indexOf('-') + 1))
        let currentrow = currentRow;
    
        if (selectedRow === rowId && color) {
            currentrow[boxId] = color
            setCurrentRow(currentrow)
          }
    }

    /* function to check whether the current row matches with correctAnswer and provide suggestions accordingly */

    function checkRowValidity() {

        const current_row = JSON.parse(JSON.stringify(currentRow))
        const correctAnswer = JSON.parse(JSON.stringify(correctRow))
        const Suggestions = suggestions
        const currentrow = current_row
        const previous_suggestions = previousSuggestions
        const previous_rows = previousRows
        let victory = true
        let defeat = false
        
        /* Checking extact matches */
        for (let i = 0; i < 4; i++) {
          if (currentrow[i] === correctAnswer[i]) {
            Suggestions[i] = 2
            delete (current_row[i])
            delete (correctAnswer[i])
          }
        }
    
        /* Checking partial matches */
        for (let i in current_row) {
          for (let j in correctAnswer) {
            if (current_row[i] === correctAnswer[j]) {
              Suggestions[i] = 1
              delete (current_row[i])
              delete (correctAnswer[j])
            }
          }
        }

        Suggestions.sort((a, b) => (b - a))

        /* Checking victory */
        for (let i in Suggestions) {
          if (Suggestions[i] < 2) {
            victory = false;
            break;
          }
        }
        /* Checking defeat */
        if (selectedRow >= totalRows-1) defeat = true;
    
        /* updating the board */
        previous_suggestions.push(Suggestions)
        previous_rows.push(currentRow)
        setSuggestions([0, 0, 0, 0]);
        setSelectedRow(selectedRow + 1);
        setpreviousSuggestions(previous_suggestions);
        setCurrentRow(['', '', '', '']);
        setPreviousRows(previous_rows);
        setCheck(false);
        setVictory(victory);
        setDefeat(defeat);
    
      }

    /* function to reset the board and start a new game  */

    function newGame() {

        const correctAnswer = []
        for (let i = 0; i < 4; i++) correctAnswer.push(colors[Math.floor(Math.random() * 4) + 1])
    
        setSuggestions([0, 0, 0, 0]);
        setSelectedRow(0);
        setCorrectRow(correctAnswer);
        setpreviousSuggestions([]);
        setCurrentRow(['', '', '', '']);
        setPreviousRows([]);
        setCheck(false);
        setVictory(false);
        setDefeat(false);
      }

    useEffect(() => {

        //rerender after updation
        let isArrayFull = 0;
        for (let i in currentRow) 
            if (currentRow[i].length > 0) isArrayFull++;

        if (isArrayFull >= currentRow.length) {
            setCheck(true)
        } else {
            setCheck(false)
        }

    },[selectedbox, currentRow, victory, defeat])

   
    let msg = victory ? 'You Win!!' :
               ( defeat ? 'You Lost :(' : '')

    return (
      <div className='game-container'>
        <Pallete
          list={colors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <GameBoard
          totalRows={totalRows}
          selectedRow={selectedRow}
          currentRow={currentRow}
          correctRow={correctRow}
          previousRows={previousRows}
          previousSuggestions={previousSuggestions}
          suggestions={suggestions}
          move={move}
          selectedbox={selectedbox}
          setSelectedbox={setSelectedbox}
          selectedColor={selectedColor}
          check={check}
          checkRowValidity={checkRowValidity} />
        <p className='msg'> {msg} </p>           
        <Answer
          correctAnswer={correctAnswer}
          victory={victory}
          defeat={defeat}
          newGame={newGame} />
      </div>
    );

}
export default GameLogic;
