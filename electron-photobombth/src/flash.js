let timer
module.exports = elem => {
    if(elem.classList.contains('is-flashing')){
        elem.classList.remove('is-flashing')
    }
    clearTimeout(timer)
    elem.classList.add('is-flashing')
    timer = setTimeout(_ => elem.classList.remove('is-flashing'), 2000)
}