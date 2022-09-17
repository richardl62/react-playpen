import styled from "styled-components";
import { pegPoints, boardHeight, boardWidth } from "./peg-points";
import { boardPadding, holeRadius } from "./sizes";

const BoardBoarder = styled.div`
    display: inline-flex;
    /* background: cornsilk; */
    /* border: 2px solid black; */
`;

const InnerBoard = styled.div<{height: number, width: number}>`
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

export function ScoreBoard() {
    const allPoints = [...pegPoints.player1, ...pegPoints.player2];

    const holes = allPoints.map((pos, index) => {
        return <Hole key={index} bottom={pos.bottom} left={pos.left}/>
    });

    return <BoardBoarder>
        <InnerBoard height={boardHeight} width={boardWidth}>{holes}</InnerBoard>
    </BoardBoarder>;
}