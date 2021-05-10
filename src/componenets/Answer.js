import React from 'react';

export const Answer = (props) => {
    let answerBoxes = []
    let answerClass = ''
    const isHidden = (props.defeat && !props.victory) ? '' : ' hidden'
    const playAgain = (props.defeat || props.victory) ? '' : ' hidden' 
    for (let i = 0; i < props.correctAnswer.length; i++) {
        answerClass = props.correctAnswer[i]
        answerBoxes.push(
            <div
            className={'color-holder ' + answerClass}
            key={'s_' + i}>
      </div>)
  }
  return (
    <div className='answer colors'>
      <div className={isHidden}>
        <p>Answer:</p>
        {answerBoxes}
      </div>
      <div className={playAgain}>
        <a onClick={props.newGame}> Play Again?</a>
      </div>
    </div>
  )
}