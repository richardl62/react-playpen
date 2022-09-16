import styled from "styled-components";

// Dimensions in pixels
const height = 600; 
const width = 200;

const radius = 10;
const standardGap = radius/2;
const fifthRowGap = radius;

const arcRadius = 60;

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

    const addArcHole = (center: number[], radius: number, angle: number) => {
        const [bottom, left] = center;

        const bottomOffset = Math.sin(angle);
        const leftOffset = -Math.cos(angle);
        addHole(
            bottom + bottomOffset * radius,
            left + leftOffset * radius,
            )
    }

    const addColumn = (pos: number[], count: number, direction: "up" | "down") => {
        let [bottom, left] = pos;

        for(let ind = 1; ind <= count; ++ind) { // Count from 1
            addHole(bottom, left);
            addHole(bottom, left+radius+standardGap);

            const sign = direction === "up" ? 1 : -1;
            const gap = (ind % 5 === 0) ? fifthRowGap : standardGap;
            bottom += sign * (radius + gap);
        }

        return [bottom, left];
    }

    const addArc = (pos: number[]) => {
        let center = [...pos];
        center[1] += arcRadius;

        const nSteps = 10;
        for(let ind = 0; ind < nSteps; ++ind) {
            const angle = Math.PI * ind / (nSteps-1);

            addArcHole(center, arcRadius, angle); 
            addArcHole(center, arcRadius - radius - standardGap, angle); 
        }
    };

    let pos = [standardGap, standardGap];
    //pos = addColumn(pos, 20, "up");
    addArc(pos)
    //addColumn([pos[0], pos[1]+50], 20, "down")

    return <Board>{holes}</Board>;
}