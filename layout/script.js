const GameState = {
    gamerName: '',
    statistic: {
        games: 0,
        victories: 0,
        defeats: 0
    },
    rounds: 0,
    victories: 0,
    defeats: 0,
    colorMap: [
        ['#D5E052', '#D3E03D', '#69E0DB', '#983DE0', '#E07D48'],
        ['#E0B353', '#E0AC3D', '#6CE069', '#2D6FE0', '#E04899'],
        ['#E07053', '#E05E3D', '#E0D869', '#39E0AA', '#7548E0'],
        ['#E05364', '#E03D50', '#E0C469', '#3BE05E', '#485FE0'],
        ['#536FE0', '#3D5DE0', '#E06982', '#E0B63A', '#79E08B']
    ],
    invitationsToGame: [],
    comments: [],
};

const GREEN_TICK = '&#10004;',
  OBLIQUE_CROSS = '&#128942;';
