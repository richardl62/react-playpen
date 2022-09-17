// All sizes in pixels

export const holeRadius = 10;

export const columnGap = holeRadius*1.5;

export const rowGap = {
    standard: holeRadius * 1.5,
    fifthRow: holeRadius * 2,
};

export const boardPadding = 10;

// Kludge: It would be better to define just innerArcRadiusTop here,
// and to then compute innerArcRadiusBottom to ensure that the inner
// 'meta' column is central.
export const innerArcRadiusTop = holeRadius * 5;
export const innerArcRadiusBottom = holeRadius * 2;