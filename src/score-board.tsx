import styled from "styled-components";

// Dimensions in pixels
const height = 500; 
const width = 200;
const radius = 10;

const Board = styled.div`
    position: relative;

    height: ${height}px;
    width: ${width}px;
    border: 1px solid black;
`;

const Hole = styled.div<{pos: [number, number]}>`

    height: ${radius}px;
    width: ${radius}px;
    border-radius: 50%;

    position: absolute; 
    top: ${props => props.pos[0]}px;
    left:${props => props.pos[1]}px;;

    background: black;
`

export function ScoreBoard() {
    return <Board>
        <Hole pos={[10, 20]}/>
        <Hole pos={[30, 40]}/>
    </Board>;
}