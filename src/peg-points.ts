import { rowGap, columnGap } from "./sizes";

export interface Position {
    bottom: number;
    left: number;
}

interface PegPoints {
    player1: Position[];
    player2: Position[];
}

function makePegPoints(params : {
        start: Position, 
        topArcRadius: number,
        bottomArcRadius: number,
    }) {
    const {start, topArcRadius, bottomArcRadius} = params;

    const points: Position[] = [];

    // In general lastPoint will be the last point in points. But it can also be the
    // nomimal end point of an arc.
    let lastPoint: Position;

    const addPoint = (pos: Position) => {
        points.push(pos);
        lastPoint = pos;
    }

    const addOffsetPoint = (offset: number) => {
        let {bottom, left} = lastPoint;
        addPoint({bottom: bottom + offset, left})
    }

    const addArcPoint = (center: Position, radius: number, angle: number) => {
        let {bottom, left} = center;

        bottom += Math.sin(angle) * radius;
        left += -Math.cos(angle) * radius;
        addPoint({bottom, left});
    }

    const addColumn = (count: number, direction: "up" | "down") => {
        for(let ind = 0; ind < count; ++ind) {
            const sign = direction === "up" ? 1 : -1;
            const gap = (ind % 5 === 0) ? rowGap.fifthRow : rowGap.standard;
            
           addOffsetPoint(gap*sign)
        }
    }

    const addSimpleArc = (
            center: Position,
            radius: number, 
            span: {startAngle: number, endAngle: number, steps: number}
        ) => {
        const startRad = span.startAngle * (Math.PI/180);
        const endRad = span.endAngle * (Math.PI/180);

        const step = (endRad-startRad) / (span.steps-1);

        for(let ind = 0; ind < span.steps; ++ind) {
            const rad = startRad + step * ind;

            addArcPoint(center, radius, rad); 
        }
    };

    const addTopArc = () => {
        const radius = topArcRadius;
        
        const center = {
            bottom: lastPoint.bottom + rowGap.fifthRow,
            left: lastPoint.left + radius,
        };


        addSimpleArc(center, radius, {startAngle:10, endAngle:75, steps: 5});
        addSimpleArc(center, radius, {startAngle:105, endAngle:170, steps:5}); 
        
        // Set the nominal end point of the arc.
        lastPoint = {bottom: center.bottom, left: center.left + radius}
    };

    const addBottomArc = () => {
        const radius = bottomArcRadius;

        const center = {
            bottom: lastPoint.bottom - rowGap.fifthRow,
            left: lastPoint.left - radius,
        };

        addSimpleArc(center, radius, {startAngle:195, endAngle:345, steps: 5}); 
        
        // Set the nominal end point of the arc.
        lastPoint = {bottom: center.bottom, left: center.left - radius}
    };

    // Starting peg points
    addPoint(start);
    addOffsetPoint(rowGap.standard);

    // Main 120 peg points
    addColumn(35, "up");

    addTopArc();

    addColumn(35, "down");

    addBottomArc();

    addColumn(35, "up");

    // Finish point
    addOffsetPoint(rowGap.fifthRow);

    // Playing points
    if(points.length !== 123) {
        console.warn("Did not find expected number of peg points")
    }
    return points;
}

export const pegPoints: PegPoints = {
    player1: makePegPoints({
        start: {bottom:0, left:0},
        topArcRadius: columnGap * 5,
        bottomArcRadius: columnGap * 3,
    }),

    player2: makePegPoints({
        start: {bottom:0, left: columnGap},
        topArcRadius: columnGap * 4,
        bottomArcRadius: columnGap * 2,
    }),
};

interface BoundingBox {
    minBottom: number;
    maxBottom: number;

    minLeft: number;
    maxLeft: number;
};

function makeBoundingBox() {
    const allPoints = [...pegPoints.player1, ...pegPoints.player2];
    
    let minBottom = allPoints[0].bottom;
    let maxBottom = minBottom;

    let minLeft = allPoints[0].left;
    let maxLeft = minLeft;

    for(const pos of allPoints) {
        minBottom = Math.min(minBottom, pos.bottom);
        maxBottom = Math.max(maxBottom, pos.bottom);

        minLeft = Math.min(minLeft, pos.left);
        maxLeft = Math.max(maxLeft, pos.left);
    }

    return {minBottom, maxBottom, minLeft, maxLeft};
}

export const boundingBox : BoundingBox = makeBoundingBox();