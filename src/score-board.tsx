import styled from "styled-components";
import { boundingBox, pegPoints } from "./peg-points";
import { radius } from "./sizes";

const Board = styled.div<{height: number, width: number}>`
    position: relative;

    height: ${props => props.height}px;
    width: ${props => props.width}px;
    border: 1px solid black;

    background: cornsilk;
`;

interface HoleProps {
    left: number;
    bottom: number;
 };

/*
Originally, Hole did not use attribs, and instead bottom and left were defined
along with the ohter properies (position, etc). But doing it that way lead to
a warnings like
    Over 200 classes were generated for component styled.div with the id of "sc-crXcEl".
    Consider using the attrs method ...
*/
const Hole = styled.div.attrs<
HoleProps, // What is consumed by .attrs()
    {style: any} // What comes out of .attrs(). Use of 'any' is a kludge. 
>((props) => {
    return {style: {
        bottom: props.bottom,
        left: props.left,
    }}
})<HoleProps>`
    height: ${radius}px;
    width: ${radius}px;
    border-radius: 50%;

    position: absolute;
    box-sizing: border-box;
    border: solid 2px black;
    background: brown;
`

export function ScoreBoard() {
    const allPoints = [...pegPoints.player1, ...pegPoints.player2];
    const holes = allPoints.map((pos, index) => {
        let {bottom, left} = pos;
        bottom -= boundingBox.minBottom;
        left -= boundingBox.minLeft;

        return <Hole key={index} bottom={bottom} left={left}/>
    });

    const height = (boundingBox.maxBottom - boundingBox.minBottom) + radius;
    const width = (boundingBox.maxLeft - boundingBox.minLeft) + radius;

    return <Board height={height} width={width}>{holes}</Board>;
}