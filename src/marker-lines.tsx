import styled from "styled-components";
import { nPreStartPegs, skunkLinePos, nInPlayPegs } from "./config";
import { pegPoints } from "./peg-points";
import { sAssert } from "./s-assert";
import { columnGap, holeRadius } from "./sizes";
import { Position } from "./types";

const markerLineLength = columnGap + holeRadius;

function lineStart(indexAfter: number) {
    const pa = pegPoints.player1[indexAfter];
    const pb = pegPoints.player1[indexAfter-1];

    // check that some assumptions are true. (This might not be true it, say, the arcs
    // are in different places or the skunk line was moved). 
    sAssert(pa.left === pb.left);
    sAssert(pa.left < pegPoints.player2[indexAfter].left);

    return {
        bottom: (pa.bottom + pb.bottom)/2 + holeRadius/2,
        left: pa.left,
    };
}


const MarkerLine = styled.div<{start: Position}>`
    display: block;

    position: absolute;
    left: ${props => props.start.left}px;
    bottom: ${props => (props.start.bottom - 1)}px;

    height: 2px;
    width: ${markerLineLength}px;
    background: black;
`;

export function StartLine() : JSX.Element {
    return <MarkerLine start={lineStart(nPreStartPegs)} />
}

export function SkunkLine() : JSX.Element {
    return <MarkerLine start={lineStart(nPreStartPegs+skunkLinePos)} />
}

export function EndLine() : JSX.Element {
    return <MarkerLine start={lineStart(nPreStartPegs+nInPlayPegs)} />
}
