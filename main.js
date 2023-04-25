/**
 * Rusificator numbers
 * @param {str} format ('week', 'day', 'hour', 'minute', 'second', 'milisecond')
 * @param {float} number (any)
 * @returns text with current formatting number
 */
function rus(format, number) {
    var n    = Math.floor(number % 10)
    var n100 = Math.floor(number % 100)

    var u1 = [11, 12, 13, 14, 15, 16, 17, 18, 19].includes(n100),
        u2 = n == 1,
        u3 = [2, 3, 4].includes(n),
        u4 = [5, 6, 7, 8, 9, 0].includes(n)

    switch (format) {
        case 'week':
            if (u1 || u4) return number + ' недель'
            if (u2) return number + ' неделя'
            if (u3) return number + ' недели'
            break
        case 'day':
            if (u1 || u4) return number + ' дней'
            if (u2) return number + ' день'
            if (u3) return number + ' дня'
            break
        case 'hour':
            if (u1 || u4) return number + ' часов'
            if (u2) return number + ' час'
            if (u3) return number + ' часа'
            break
        case 'minute':
            if (u1 || u4) return number + ' минут'
            if (u2) return number + ' минута'
            if (u3) return number + ' минуты'
            break
        case 'second':
            if (u1 || u4) return number + ' секунд'
            if (u2) return number + ' секунда'
            if (u3) return number + ' секунды'
            break
        case 'milisecond':
            if (u1 || u4) return number + ' миллисекунд'
            if (u2) return number + ' миллисекунда'
            if (u3) return number + ' миллисекунды'
            break
        default:
            return 'ошибка'
    }
}

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

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }

function enableLogger() {
    if ('serviceWorker' in navigator) { 
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('service-worker.js').then(
                function(registration) { console.log(`ServiceWorker: registration with scope ${registration.scope}`) },
                function(e) { console.error(`ServiceWorker registration failed: ${e}`) }
            ).catch(function(e) { console.error(`ServiceWorker function (${e})`) })
        })
    }
    else console.warn('Service worker is not supported')
}; enableLogger()

var URL = new Object(),
    isURLempty = false
try {
    var urladd = window.location.href.split('?')[1].split('&')
    for (var i = 0; i < urladd.length; i++) URL[urladd[i].split('=')[0]] = urladd[i].split('=')[1]
} catch {
    console.log(`No URL attributes`)
    isURLempty = true
}

// Theme top bar
var tc = setInterval(function(){
    const dark = window.matchMedia("(prefers-color-scheme: dark)");
    if (dark.matches) document.getElementById('theme-color').content = '#000000'
    else              document.getElementById('theme-color').content = '#f5f5f5'
}, 100)

// SEASON worker
var NOW = new Date()
var SEASON; 
let dec10 = new Date(NOW.getFullYear(), 11, 10), jan20 = new Date(NOW.getFullYear(), 0, 20), dec31 = new Date(NOW.getFullYear(), 11, 31), jan01 = new Date(NOW.getFullYear(), 0, 1)
if ((dec10 <= NOW && NOW <= dec31) || (jan01 <= NOW && NOW <= jan20)) { SEASON = 'newyear' }
else { if ([11, 0, 1].includes(NOW.getMonth())) SEASON = 'winter'; if ([2, 3, 4].includes(NOW.getMonth())) SEASON = 'spring'; if ([5, 6, 7].includes(NOW.getMonth())) SEASON = 'summer'; if ([8, 9, 10].includes(NOW.getMonth())) SEASON = 'autumn' }