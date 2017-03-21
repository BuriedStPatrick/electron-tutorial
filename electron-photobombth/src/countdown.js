function setCount(counterElem, count){
    counterElem.innerHTML = count > 0 ? count: ''
}

exports.start = (counterElem, downFrom, done) => {
    for (let i = 0; i <= downFrom; ++i){
        setTimeout(_ => {
            const count = downFrom - i
            setCount(counterElem, count)
            if(i === downFrom){
                done()
            }
        }, i * 1000)
    }
}