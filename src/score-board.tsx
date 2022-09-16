import styled from "styled-components";

// Dimensions in pixels
const height = 600; 
const width = 200;

const radius = 10;
const gap = radius/2;

const Board = styled.div`
    position: relative;

    height: ${height}px;
    width: ${width}px;
    border: 1px solid black;

    margin: 10px;
`;

const Hole = styled.div<{pos: [number, number]}>`

    height: ${radius}px;
    width: ${radius}px;
    border-radius: 50%;

    position: absolute; 
    bottom: ${props => props.pos[0]}px;
    left:${props => props.pos[1]}px;;

    background: black;
`

export function ScoreBoard() {
    const holes : JSX.Element [] = [];

    const addHole = (bottom: number, left: number) => {
        holes.push(<Hole pos={[bottom, left]} />);
    }

    const addColumn = (colBottom: number, left: number, size: number) => {
        for(let ind = 0; ind < size; ++ind) {
            const holeBottom = colBottom + ind * (radius+gap);
            addHole(holeBottom, left);
            addHole(holeBottom, left+radius+gap);
        }
    }

    addColumn(0, 0, 30);
    addColumn(0, 40, 30);
    addColumn(0, 80, 30);

    return <Board>{holes}</Board>;
}