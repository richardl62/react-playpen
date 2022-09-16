import { radius, standardGap, fifthRowGap, arcRadius } from "./sizes";

export interface Position {
    bottom: number;
    left: number;
}

function makePegPoints() {
    const points: Position[] = [];

    const addPoint = (pos: Position) => {
        points.push(pos);
    }

    const addArcPoint = (center: Position, radius: number, angle: number) => {
        let {bottom, left} = center;

        bottom += Math.sin(angle) * radius;
        left += -Math.cos(angle) * radius;
        addPoint({bottom, left});
    }

    const addColumn = (pos: Position, count: number, direction: "up" | "down") => {
        let {bottom, left} = pos;

        for(let ind = 1; ind <= count; ++ind) { // Count from 1
            addPoint({bottom, left});
            addPoint({bottom, left: left+radius+standardGap});

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

            addArcPoint(center, arcRadius, rad); 
            addArcPoint(center, arcRadius - radius - standardGap, rad); 
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

    return points;
}

export const pegPoints: Position[] = makePegPoints();