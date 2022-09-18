import styled from "styled-components";
import { pegPoints, boardHeight, boardWidth, startLine, endLine, skunkLine } from "./peg-points";
import { boardPadding, holeRadius } from "./sizes";
import { HorizontalLine } from "./types";


const Board = styled.div<{height: number, width: number}>`
    position: relative;

    height: ${props => props.height}px;
    width: ${props => props.width}px;


    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    background: brown;
    border: ${boardPadding}px solid brown;
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
    height: ${holeRadius}px;
    width: ${holeRadius}px;
    border-radius: 50%;

    position: absolute;
    box-sizing: border-box;
    border: solid 2px black;
    background: cornsilk;
`
const Line = styled.div<{line: HorizontalLine}>`
    display: block;

    position: absolute;
    bottom: ${props => props.line.start.bottom};
    left: ${props => props.line.start.left};

    height: 4px;
    width: ${props => props.line.length};
    background: black;
`;
export function ScoreBoard() {
    const allPoints = [...pegPoints.player1, ...pegPoints.player2];

    const holes = allPoints.map((pos, index) => {
        return <Hole key={index} bottom={pos.bottom} left={pos.left}/>
    });

    return <Board height={boardHeight} width={boardWidth}>
        {holes}
        <Line line={startLine} />
        <Line line={skunkLine} />
        <Line line={endLine} />
    </Board>
}