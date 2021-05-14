import invert from 'invert-color';

const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

const invertColor = (hexcolor) => invert(hexcolor.substring(1).padStart(6, '0'), true);

export { randomColor, invertColor };
