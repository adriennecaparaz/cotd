const container = document.querySelector('.container');
const body = document.body;
const toggle = document.querySelector('.toggle');
const date = new Date();

let month = date.getMonth();
let day = date.getDate();
let yearOne = (+date.getFullYear().toString().slice(0,2));
let yearTwo = (+date.getFullYear().toString().slice(2,4));

const addLeadingZero = function(number) {
    return String(number).padStart(2, '0');
}

let valueFirst = 'month';
let dateString = `${addLeadingZero(month)}.${addLeadingZero(day)}.${addLeadingZero(yearOne)}${addLeadingZero(yearTwo)}`;

const toggleMode = function() {
    switch (valueFirst) {
        case 'month':
            valueFirst = 'day';
            dateString = `${addLeadingZero(day)}.${addLeadingZero(month)}.${addLeadingZero(yearOne)}${addLeadingZero(yearTwo)}`;
            break;
        case 'day':
            valueFirst = 'year';
            dateString = `${addLeadingZero(yearTwo)}${addLeadingZero(month)}${addLeadingZero(day)}`;
            break;
        case 'year':
            valueFirst = 'month';
            dateString = `${addLeadingZero(month)}.${addLeadingZero(day)}.${addLeadingZero(yearOne)}${addLeadingZero(yearTwo)}`;
            break;
    }
    handleBg();
}

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

const changeBg = function(r, g, b) {
    body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    toggle.style.color = `rgb(${r}, ${g}, ${b})`;
    container.innerHTML = `${dateString}
                            <br>
                            rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

const handleBg = function() {
    let cmy;
    switch (valueFirst) {
        case 'month':
            cmy = cmykToCMY(month / 100, day / 100, yearOne / 100, yearTwo / 100);
            break;
        case 'day':
            cmy = cmykToCMY(day / 100, month / 100, yearOne / 100, yearTwo / 100);
            break;
        case 'year':
            cmy = cmykToCMY(yearOne / 100, yearTwo / 100, month / 100, day / 100);
            break;
    }
    let rgb = cmyToRGB(cmy[0], cmy[1], cmy[2]);
    changeBg(rgb[0], rgb[1], rgb[2]);
}
toggle.addEventListener('click', toggleMode);
handleBg();