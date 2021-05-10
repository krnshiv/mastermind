import React from 'react'

const Suggestions = (props) => {
    let allSuggestions = []
    let suggestionClass = ''
    const rowId = Number(props.rowId.substr(4))
    const suggestionArr = props.suggestions
    const prevSuggestions = props.previousSuggestions

    for (let i = 0; i < suggestionArr.length; i++) {
        if (rowId === props.selectedRow) {
            suggestionClass = suggestionArr[i] === 2 ? 'exact' : (suggestionArr[i] === 1 ? 'partial' : '')
        } else {
            for (let j = 0; j < prevSuggestions.length; j++)
                if (rowId === j) suggestionClass = prevSuggestions[j][i] === 2 ? 'exact' : (prevSuggestions[j][i] === 1 ? 'partial' : '')       
        }
        allSuggestions.push(
        <TinySuggestionBox 
            suggestionClass={suggestionClass} 
            key={'h_' + rowId + i} 
            id={'h_' + rowId + i} />)
    }
    return (
        <div className='suggestions'>{allSuggestions}</div>
    )
}

const TinySuggestionBox = (props) => (
    <span className={props.suggestionClass}id={props.id}></span>
)

const CheckButton = (props) => {   
    const row = Number(props.rowId.substr(4))
    let disabled = 'disabled'
    const doNothing = () => (false)

    if (props.selectedRow === (row)) disabled = props.check ? '' : 'disabled'
    
    const checkRowValidity = disabled === 'disabled' ? doNothing : props.checkRowValidity
    return (
        <div className={'check-button ' + disabled} onClick={checkRowValidity}>check</div>
    )
}

const Boxes = (props) => {
    const boxId = props.boxId.substr(props.boxId.indexOf('-') + 1)
    const rowId = props.boxId.substr(1, props.boxId.indexOf('-') - 1)
    let clase = ''
    
    if (props.selectedRow === Number(rowId)) {
        clase = props.currentRow[boxId]
    } else {
        for (let i in  props.previousRows)
            if (i === rowId) clase = props.previousRows[rowId][boxId]
    }
    return (
        <span
            id={props.boxId}
            className={'boxes ' + clase}
            onClick={()=>{
                props.move(props.selectedColor, props.boxId);
                props.setSelectedbox(props.boxId);
            }
                } >
        </span>
    )
}

const ColorCheckBox = (props) => {
    const rowId = props.rowId.substr(4)
    let Pegs = []
    for (let i = 0; i < 4; i++) {
        Pegs.push(
            <Boxes
                selectedRow={props.selectedRow}
                currentRow={props.currentRow}
                previousRows={props.previousRows}
                selectedColor={props.selectedColor}
                move={props.move}
                setSelectedbox={props.setSelectedbox}
                key={'p' + rowId + '-' + i}
                boxId={'p' + rowId + '-' + i} />)

    }

    return <div className='color-check-box'> {Pegs} </div>
}

const Row = (props) => {
    let selected = ''
    const rowId = Number(props.id.substr(4));
    if ( rowId === props.selectedRow) {
        selected = 'active'
    }

    return (
        <div className={'row ' + selected} id={props.id}>
            <ColorCheckBox
                rowId={props.id}
                selectedRow={props.selectedRow}
                currentRow={props.currentRow}
                previousRows={props.previousRows}
                selectedColor={props.selectedColor}
                move={props.move}
                setSelectedbox={props.setSelectedbox} />
            <CheckButton
                check={props.check}
                rowId={props.id}
                selectedRow={props.selectedRow}
                checkRowValidity={props.checkRowValidity} />
            <Suggestions
                previousSuggestions={props.previousSuggestions}
                suggestions={props.suggestions}
                selectedRow={props.selectedRow}
                rowId={props.id} />
        </div>
    )
}


const GameBoard = (props) => {
    let rows = [];
    for (let i = 0; i < props.totalRows; i++) {
        rows.push(
            <Row
                key={'row_' + i}
                id={'row_' + i}
                suggestions={props.suggestions}
                check={props.check}
                previousSuggestions={props.previousSuggestions}
                selectedRow={props.selectedRow}
                currentRow={props.currentRow}
                previousRows={props.previousRows}
                selectedColor={props.selectedColor}
                setSelectedbox={props.setSelectedbox}
                move={props.move}
                checkRowValidity={props.checkRowValidity} />
        )
    }
    return (
        <div className='gameboard'>{rows}</div>
    )

}

export default GameBoard;