import styled from "styled-components";

// Dimensions in pixels
const height = 600; 
const width = 200;

const radius = 10;
const standardGap = radius/2;
const fifthRowGap = radius;

const arcRadius = 60;

interface Position {
    bottom: number;
    left: number;
}

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
    left:${props => props.pos.left}px;;

    background: black;
`

export function ScoreBoard() {
    const holes : JSX.Element [] = [];

    const addHole = (pos: Position) => {
        holes.push(<Hole pos={pos} />);
    }

    const addArcHole = (center: Position, radius: number, angle: number) => {
        let {bottom, left} = center;

        bottom += Math.sin(angle) * radius;
        left += -Math.cos(angle) * radius;
        addHole({bottom, left});
    }

    const addColumn = (pos: Position, count: number, direction: "up" | "down") => {
        let {bottom, left} = pos;

        for(let ind = 1; ind <= count; ++ind) { // Count from 1
            addHole({bottom, left});
            addHole({bottom, left: left+radius+standardGap});

            const sign = direction === "up" ? 1 : -1;
            const gap = (ind % 5 === 0) ? fifthRowGap : standardGap;
            bottom += sign * (radius + gap);
        }

        return {bottom, left};
    }

    const addSimpleArc = (center: Position, 
            span: {startAngle: number, endAngle: number, steps: number}
        ) => {
        const startRad = span.startAngle * (Math.PI/180);
        const endRad = span.endAngle * (Math.PI/180);

        const step = (endRad-startRad) / (span.steps-1);

        for(let ind = 0; ind < span.steps; ++ind) {
            const rad = startRad + step * ind;

            addArcHole(center, arcRadius, rad); 
            addArcHole(center, arcRadius - radius - standardGap, rad); 
        }
    };

    const add10StepArc = (start: Position) => {
        let center = {...start};
        center.left += arcRadius;

        addSimpleArc(center, {startAngle:0, endAngle:75, steps: 5});
        addSimpleArc(center, {startAngle:105, endAngle:180, steps:5});       
    };

    let start = {bottom:standardGap, left:standardGap};
    start = addColumn(start, 30, "up");
    add10StepArc(start);

    return <Board>{holes}</Board>;
}