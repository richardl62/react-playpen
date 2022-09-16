import styled from "styled-components";
import { pegPoints, Position } from "./peg-points";
import { height, width, radius } from "./sizes";

const Board = styled.div`
    position: relative;

    height: ${height}px;
    width: ${width}px;
    border: 1px solid black;

    margin: 10px;
`;

const Hole = styled.div<{pos: Position}>`

    height: ${radius}px;
    width: ${radius}px;
    border-radius: 50%;

    position: absolute; 
    bottom: ${props => props.pos.bottom}px;
    left:${props => props.pos.left}px;

    background: black;
`

export function ScoreBoard() {
    const holes = pegPoints.map((pos, index) => <Hole key={index} pos={pos}/>);

    return <Board>{holes}</Board>;
}