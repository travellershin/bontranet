function comma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function difToMin(dif) {
    var min = Math.floor(dif / 60) + 1;
    return min;
}

function difToMinWord(dif) {
    var min = Math.floor(dif / 60) + 1;
    var word = '';

    if (min < 6) {
        word = '<strong>도보 단 ' + min + '분 거리</strong>'
    } else {
        word = '<strong>도보 ' + min + '분 거리</strong>'
    }

    return word;
}