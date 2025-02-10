import './cell.css';

function Cell(props) {
  const handleClick = () => {
    if (props.winningMessage) {
      return;
    }

    const notTaken = !props.cells[props.id];

    if (notTaken) {
      if (props.go === 'X') {
        handleCellChange('X');
        props.setGo('O');
      } else if (props.go === 'O') {
        handleCellChange('O');
        props.setGo('X');
      }
    }
  };

  const handleCellChange = (cellToChange) => {
    let copyCells = [...props.cells];
    copyCells[props.id] = cellToChange;
    props.setCells(copyCells);
  };

  return (
    <div className="square" onClick={handleClick}>
      <div className={props.cell}>
        {props.cell ? (props.cell === 'X' ? 'X' : 'O') : ''}
      </div>
    </div>
  );
}

export default Cell;
