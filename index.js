const container = document.querySelector('.container');
const body = document.body;
const toggleButton = document.querySelector('.toggle');
const copyButton = document.querySelector('.copy');
const copyNotif = document.querySelector('.copied');
const date = new Date();

let month = date.getMonth();
let day = date.getDate();
let yearOne = (+date.getFullYear().toString().slice(0,2));
let yearTwo = (+date.getFullYear().toString().slice(2,4));

function copyToClipboard() {
    navigator.clipboard.writeText(body.style.backgroundColor);
    copyNotif.style.opacity = 1;
    setTimeout(() => copyNotif.style.opacity = 0, 1000);
}

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

const cmykToRGB = function(c, m, y, k) {
    c = ( c * ( 1 - k ) + k );
    m = ( m * ( 1 - k ) + k );
    y = ( y * ( 1 - k ) + k );

    return [( 1 - c ) * 255, ( 1 - m ) * 255, ( 1 - y ) * 255];
}

const changeBg = function(r, g, b) {
    body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    toggleButton.style.color = `rgb(${r}, ${g}, ${b})`;
    copyButton.style.color = `rgb(${r}, ${g}, ${b})`;
    container.innerHTML = `${dateString}
                            <br>
                            rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

const handleBg = function() {
    let rgb;
    switch (valueFirst) {
        case 'month':
            rgb = cmykToRGB(month / 100, day / 100, yearOne / 100, yearTwo / 100);
            break;
        case 'day':
            rgb = cmykToRGB(day / 100, month / 100, yearOne / 100, yearTwo / 100);
            break;
        case 'year':
            rgb = cmykToRGB(yearOne / 100, yearTwo / 100, month / 100, day / 100);
            break;
    }
    changeBg(rgb[0], rgb[1], rgb[2]);
}

toggleButton.addEventListener('click', toggleMode);
copyButton.addEventListener('click', copyToClipboard);
handleBg();