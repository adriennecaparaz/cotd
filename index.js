const container = document.querySelector('.container');
const body = document.body;
const date = new Date();

let month = date.getMonth() / 100;
let day = date.getDate() / 100;
let yearOne = (+date.getFullYear().toString().slice(0,2)) / 100;
let yearTwo = (+date.getFullYear().toString().slice(2,4)) / 100;

const cmykToCMY = function(c, m, y, k) {
    c = ( c * ( 1 - k ) + k );
    m = ( m * ( 1 - k ) + k );
    y = ( y * ( 1 - k ) + k );

    return [c, m, y];
}

const cmyToRGB = function(c, m, y) {
    let r = ( 1 - c ) * 255;
    let g = ( 1 - m ) * 255;
    let b = ( 1 - y ) * 255;

    return [r, g, b];
}

let cmy = cmykToCMY(month, day, yearOne, yearTwo);
let rgb = cmyToRGB(cmy[0], cmy[1], cmy[2])

const changeBg = function(r, g, b) {
    body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    container.textContent = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

changeBg(rgb[0], rgb[1], rgb[2]);