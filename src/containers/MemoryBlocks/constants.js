export const KEY_REDUCER = 'MEMORY_BLOCKS';
export const SET_INIT = `${KEY_REDUCER}/SET_INIT`;
export const UPDATE_ANSWER = `${KEY_REDUCER}/UPDATE_ANSWER`;
export const UPDATE_IS_COMPLETE = `${KEY_REDUCER}/UPDATE_IS_COMPLETE`;
export const UPDATE_IS_CORRECT = `${KEY_REDUCER}/UPDATE_IS_CORRECT`;

export const SET_RESTART_GAME = `${KEY_REDUCER}/SET_RESTART_GAME`;
export const SET_REPLAY_SOUND = `${KEY_REDUCER}/SET_REPLAY_SOUND`;
export const SET_IS_PLAYING = `${KEY_REDUCER}/SET_IS_PLAYING`;

export const DEFAULT_SIDE_LENGTH = 2;
export const MAX_SIDE_LENGTH = 5;
export const LEVEL_SET = 4;

export const DEFAULT_CHANCE = 5;

export const SHADOW_WIDTH = 50;

export const GAME_WRAPPER_SIZE = 600;
export const DEFAULT_LEVEL = 1;
export const SOUND_EFFECT = {
    correct: 'correct',
    wrong: 'wrong',
};

export const BLOCK_COLORS = [
    '#ff5353',
    '#ffc429',
    '#5980c1',
    '#fbe9b7',
    '#FF9F1C',
    '#b2ff59',
    '#69f0ae',
    '#ffff00',
    '#b2dfdb',
    '#ff6e40',
    '#00E5FF',
    '#e0e0e0',
    '#f06292',
    '#ba68c8',
    '#8c9eff',
    '#8BC34A',
    '#E91E63',
    '#FFE2D1',
    '#FFDF64',
    '#00c853',
    '#DCABDF',
    '#78FFD6',
    '#C8553D',
    '#3185FC',
    '#FFFFFF',
];

export const PIANO_SOUNDS_URL = 'https://awiclass.monoame.com/pianosound/set/';
export const PIANO_SOUNDS = [
    1,
    1.5,
    2,
    2.5,
    3,
    4,
    4.5,
    5,
    5.5,
    6,
    6.5,
    7,
    8,
    8.5,
    9,
    9.5,
    10,
    11,
    11.5,
    12,
    12.5,
    13,
    13.5,
    14,
    15,
];

export const CHORD = {
    correct: [1, 3, 5, 8].map((note) => new Audio(PIANO_SOUNDS_URL + note + '.wav')),
    wrong: [2, 4, 5.5, 7].map((note) => new Audio(PIANO_SOUNDS_URL + note + '.wav')),
};
