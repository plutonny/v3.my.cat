/**
 * Normalizin regullary dates to readable by COUNTER() function
 * @param {list} params [Date, str (PROCESS), str (END)]
 */
function normalizeDate(params) {
    let NOW = new Date()
    let d1, d2
    if (params[0] < NOW){ 
        d1 = new Date(new Date(NOW.getFullYear(), params[0].getMonth(), params[0].getDate(), params[0].getHours(), params[0].getMinutes(), params[0].getSeconds()))
        d2 = new Date(new Date(NOW.getFullYear() + 1, params[0].getMonth(), params[0].getDate(), params[0].getHours(), params[0].getMinutes(), params[0].getSeconds()))
    } else {
        d1 = new Date(new Date(NOW.getFullYear() - 1, params[0].getMonth(), params[0].getDate(), params[0].getHours(), params[0].getMinutes(), params[0].getSeconds()))  
        d2 = new Date(new Date(NOW.getFullYear(), params[0].getMonth(), params[0].getDate(), params[0].getHours(), params[0].getMinutes(), params[0].getSeconds()))
    } return [d1, d2, params[1], params[2]]
}

function fastPercents(START, END) {
    let NOW = new Date()
    let r   = END - NOW
    let percents = (START - NOW) / (START - END) * 100
    let p        = parseFloat(parseInt((percents * 10) + 1)) / 10
    return p
}

var URL = new Object(),
    isURLempty = false
try {
    var urladd = window.location.href.split('?')[1].split('&')
    for (var i = 0; i < urladd.length; i++) URL[urladd[i].split('=')[0]] = urladd[i].split('=')[1]
} catch {
    console.log(`No URL attributes`)
    isURLempty = true
}