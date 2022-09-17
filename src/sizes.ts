// All sizes in pixels

export const radius = 10;

export const columnGap = radius*1.5;

export const rowGap = {
    standard: radius * 1.5,
    fifthRow: radius * 2,
};

export const boardPadding = 10;

// Kludge: It would be better to define just innerArcRadiusTop here,
// and to then compute innerArcRadiusBottom to ensure that the inner
// 'meta' column is central.
export const innerArcRadiusTop = radius * 5;
export const innerArcRadiusBottom = radius * 2;