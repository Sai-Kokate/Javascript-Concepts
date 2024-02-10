const searchBar = document.querySelector("[search-bar]")
const defaultText = document.querySelector("[default-text]")
const debounceText = document.querySelector("[debounce-text]")
const throtellText = document.querySelector("[throtell-text]")

searchBar.addEventListener("input", e => {
    text = e.target.value
    setDefaultText(text)
    setDebounceText(text)
    setThrotellText(text)
})

document.addEventListener("mousemove", (e) =>{
    incrementCount(defaultText)
    debounceNum()
    throtellNum()
})

function setDefaultText (text) {
    defaultText.textContent = text
}

const setDebounceText = debounce(text => {
    debounceText.textContent = text
})

// const setThrotellText = throtell(text => {
//     throtellText.textContent = text
// })

const setThrotellText = advthrotell(text => {
    throtellText.textContent = text
})

const throtellNum = advthrotell(() => {
    incrementCount(throtellText)
}, 250)

const debounceNum = debounce(()=>{
    incrementCount(debounceText)
}, 250)

// debounce returns a function, which executes the callback function only after a delay after its last execution
function debounce (cb, delay = 1000){
    let timer;

    return(...args) => {
        clearTimeout(timer)
        timer = setTimeout(()=>{
            cb(...args)
        }, delay)
    }
}

// throtell function
function throtell (cb , delay = 1000) {
    let lasttime = 0;
    return (...args) => {
        const now = new Date().getTime()
        const argument = args
        if (now - lasttime < delay)
        {
            return
        }
        lasttime = now;
        cb(...args)
    }
}

// advance throtell
function advthrotell (cb, delay = 1000) {
    let shouldwait = false
    let endArgs
    return (...args) => {
        if(shouldwait) {
            endArgs = args
            return
        }

        cb(...args)
        shouldwait = true

        setTimeout(()=>{
            if(endArgs == null)
            {
                shouldwait=false
            } else {
                cb(endArgs)
                endArgs = null
                shouldwait = false
            }
        }, delay)
    }
}

function incrementCount (ele) {
    ele.textContent = (parseInt(ele.textContent) || 0) + 1
}