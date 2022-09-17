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

interface ContainerProps {
    pos: Position;
 };

/*
Originally, Hole did not use attribs, and instead bottom and left were defined
along with the ohter properies (position, etc). But doing it that way lead to
a warnings like
    Over 200 classes were generated for component styled.div with the id of "sc-crXcEl".
    Consider using the attrs method ...
*/
const Container = styled.div.attrs<
    ContainerProps, // What is consumed by .attrs()
    {style: {bottom: string, left: string }} // What comes out of .attrs()
>((props) => {
    return {style: {
        bottom: props.pos.bottom + "px",
        left: props.pos.left + "px",
    }}
})<ContainerProps>`
    height: ${radius}px;
    width: ${radius}px;
    border-radius: 50%;

    position: absolute;
    background: black
`

export function ScoreBoard() {
    const allPoints = [...pegPoints.player1, ...pegPoints.player2];
    const holes = allPoints.map((pos, index) => {
        let {bottom, left} = pos;
        bottom -= boundingBox.minBottom;
        left -= boundingBox.minLeft;

        return <Container key={index} pos={{bottom, left}}/>
    });

    const height = (boundingBox.maxBottom - boundingBox.minBottom) + radius;
    const width = (boundingBox.maxLeft - boundingBox.minLeft) + radius;

    return <Board height={height} width={width}>{holes}</Board>;
}