import styled from "styled-components";
import { MarkerLines } from "./marker-lines";
import { boardHeight, boardWidth, pegPoints } from "./peg-points";
import { boardPadding, holeRadius } from "./sizes";


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
const PegContainer = styled.div.attrs<
HoleProps, // What is consumed by .attrs()
    {style: any} // What comes out of .attrs(). Use of 'any' is a kludge. 
>((props) => {
    return {style: {
        position: "absolute",
        bottom: props.bottom,
        left: props.left,
    }}
})<HoleProps>`

    height: ${holeRadius}px;
    width: ${holeRadius}px;
`

const Hole = styled.div`
    height: ${holeRadius}px;
    width: ${holeRadius}px;
    border-radius: 50%;


    box-sizing: border-box;
    border: solid 2px black;
    background: cornsilk;
`
const Peg = styled.div<{player1 : boolean}>`
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    border: solid 1px black;
    border-radius: 50%;
    background: ${props => props.player1 ? "yellow" : "blue"};
`;

export function ScoreBoard() {
    const allPoints = [...pegPoints.player1, ...pegPoints.player2];

    const holes = allPoints.map((pos, index) => {
        return <PegContainer key={index} bottom={pos.bottom} left={pos.left}>
                {index % 9 === 0 ? <Peg player1={index % 2 === 1}/> : <Hole/>}
            </PegContainer>;
    });

    return <Board height={boardHeight} width={boardWidth}>
        {holes}
        <MarkerLines/>
    </Board>;
}