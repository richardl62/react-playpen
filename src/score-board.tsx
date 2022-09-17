import styled from "styled-components";
import { boundingBox, pegPoints, Position } from "./peg-points";
import { radius } from "./sizes";

const Board = styled.div<{height: number, width: number}>`
    position: relative;

    height: ${props => props.height}px;
    width: ${props => props.width}px;
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
    const allPoints = [...pegPoints.player1, ...pegPoints.player2];
    const holes = allPoints.map((pos, index) => {
        let {bottom, left} = pos;
        bottom -= boundingBox.minBottom;
        left -= boundingBox.minLeft;

        return <Hole key={index} pos={{bottom, left}}/>
    });

    const height = (boundingBox.maxBottom - boundingBox.minBottom) + radius;
    const width = (boundingBox.maxLeft - boundingBox.minLeft) + radius;

    return <Board height={height} width={width}>{holes}</Board>;
}