import { rowGap, columnGap, radius, innerArcRadiusBottom, innerArcRadiusTop } from "./sizes";

export interface Position {
    bottom: number;
    left: number;
}

interface PegPoints {
    player1: Position[];
    player2: Position[];
}

// Make 'raw' peg points for one player.
// 'raw' points are later adjusted to fit in a box with bottom left corner at (0,0)
function makeRawPegPoints(params : {
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


function makeBoundingBox(points: Position[]) {

    let minBottom = points[0].bottom;
    let maxBottom = minBottom;

    let minLeft = points[0].left;
    let maxLeft = minLeft;

    for(const pos of points) {
        minBottom = Math.min(minBottom, pos.bottom);
        maxBottom = Math.max(maxBottom, pos.bottom);

        minLeft = Math.min(minLeft, pos.left);
        maxLeft = Math.max(maxLeft, pos.left);
    }

    return {minBottom, maxBottom, minLeft, maxLeft};
}

// Add the cordinated in offset to each of the points in points.
function offsetPoints(points: Position[], offset: Position) {
    return points.map(pos => {
        return {
            bottom: pos.bottom + offset.bottom,
            left: pos.left + offset.left,
        };
    })
}

const rawPegPoints: PegPoints = {
    player1: makeRawPegPoints({
        start: {bottom:0, left:0},
        topArcRadius: innerArcRadiusTop + columnGap,
        bottomArcRadius: innerArcRadiusBottom + columnGap,
    }),

    player2: makeRawPegPoints({
        start: {bottom:0, left: columnGap},
        topArcRadius: innerArcRadiusTop,
        bottomArcRadius: innerArcRadiusBottom,
    }),
};

const rawBoundingBox = makeBoundingBox(
    [...rawPegPoints.player1, ...rawPegPoints.player2]
);

export const boardWidth = (rawBoundingBox.maxLeft - rawBoundingBox.minLeft) + radius;
export const boardHeight = (rawBoundingBox.maxBottom - rawBoundingBox.minBottom) + radius;

const offset = {
    bottom: -rawBoundingBox.minBottom,
    left: -rawBoundingBox.minLeft,
};

export const pegPoints: PegPoints = {
    player1: offsetPoints(rawPegPoints.player1, offset),
    player2: offsetPoints(rawPegPoints.player2, offset),
}