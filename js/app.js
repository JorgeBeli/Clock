const timersWraper = document.querySelector('.timers__wraper')
const options = document.querySelectorAll('i')
const home = document.querySelector('#home')

const addOptionsEvents = () =>{
    for(option of options){
        option.addEventListener('click', (e) =>{
            let id = e.target.id
            const option = document.querySelector(`#${id}`)
            option.style.borderBottom = '1px solid #202020'
            if(id === 'home'){
                timer.style.borderBottom = 'none'
                alarm.style.borderBottom = 'none'
                stopwatch.style.borderBottom = 'none'
                homeHTML()
                getHome()
            }
            if(id === 'stopwatch'){
                home.style.borderBottom = 'none'
                timer.style.borderBottom = 'none'
                alarm.style.borderBottom = 'none'
                stopwatchHTML()
                getStopwatch()
                clearInterval(dateInterval)
            }
            if(id === 'timer'){
                home.style.borderBottom = 'none'
                stopwatch.style.borderBottom = 'none'
                alarm.style.borderBottom = 'none'
                timerHTML()
                getTimer()
                clearInterval(dateInterval)
            }
            if(id === 'alarm'){
                home.style.borderBottom = 'none'
                stopwatch.style.borderBottom = 'none'
                timer.style.borderBottom = 'none'
                clearInterval(dateInterval)
            }
        })
    }
}

const homeHTML = () =>{
    timersWraper.innerHTML = `
        <div class='home__wraper'>
            <div class='home__display'>

            </div>
        </div>
    `
}

const stopwatchHTML = () =>{
    timersWraper.innerHTML = `
        <div class='stopwatch__wraper'>
            <div class='stopwatch__display'>

            </div>
            <div class='buttons__wraper'>
                <button id='button__start'>Start</button>
                <button id='button__pause'>Pause</button>
                <button id='button__reset'>Reset</button>
            </div>
        </div>
    `
}

const timerHTML = () =>{
    timersWraper.innerHTML = `
    <div class='timer__wraper'>
        <div class='timer__inputs'>
            <input id='timer__hours' type="tel" placeholder='Hours' onkeypress="return onlyNumberKey(event)">
            <p>:</p>
            <input id='timer__minutes' type="number" placeholder='Minutes' onkeypress="return onlyNumberKey(event)">
            <p>:</p>
            <input id='timer__seconds' type="number" placeholder='Seconds' onkeypress="return onlyNumberKey(event)">
        </div>
        <div class='timer__display'>

        </div>
        <div class='timer__buttons'>
            <button id='button__start'>Start</button>
            <button id='button__pause'>Pause</button>
            <button id='button__reset'>Reset</button>
        </div>
    </div>
    `
}

const currentDate = () =>{
    const home = document.querySelector('.home__display')
    const date = new Date()
    let [hour, min, sec] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    if(sec < 10){
        sec = '0' + sec
    }
    if(min < 10){
        min = '0' + min
    }
    if(hour < 10){
        hour = '0' + hour
    }
    home.innerHTML = hour + ':' + min + ':' + sec
}

const getHome = () =>{
    currentDate()
    dateInterval = setInterval( () => {
        currentDate()
    }, 1000)
}

const getStopwatch = () =>{
    const stopwatch = document.querySelector('.stopwatch__display')
    const buttonStart = document.querySelector('#button__start')
    const buttonPause = document.querySelector('#button__pause')
    const buttonReset = document.querySelector('#button__reset')
    stopwatch.innerHTML = '00:00:00.000'; 
    let prevTime, stopwatchInterval, elapsedTime = 0
    const updateTime = () =>{
        let tempTime = elapsedTime
        let ms = tempTime % 1000
        tempTime = Math.floor(tempTime / 1000)
        let sec = tempTime % 60
        tempTime = Math.floor(tempTime / 60)
        let min = tempTime % 60
        tempTime = Math.floor(tempTime / 60)
        let hour = tempTime % 60

        ms = parseInt(ms);
        sec = parseInt(sec);
        min = parseInt(min);
        if (ms < 100){
            ms = '0' + ms
        }
        if (sec < 10){
            sec = '0' + sec
        }
        if (min < 10){
            min = '0' + min
        }
        if(hour < 10){
            hour = '0' + hour
        }
        stopwatch.innerHTML = hour + ":" + min + ":" + sec + "." + ms;        
    }
    buttonStart.addEventListener('click', () =>{
        if(!stopwatchInterval){
            stopwatchInterval = setInterval(() =>{
                if(!prevTime){
                    prevTime = Date.now()
                }
                elapsedTime += Date.now() - prevTime
                prevTime = Date.now()
                updateTime()
            }, 1)
        }
    })
    buttonPause.addEventListener('click', () =>{
        if(stopwatchInterval){
            clearInterval(stopwatchInterval);
            stopwatchInterval = null;
        }
        prevTime = null;
    })
    buttonReset.addEventListener('click', () =>{
        buttonPause.click()
        elapsedTime = 0;
        updateTime();
        stopwatch.innerHTML = '00:00:00.000'; 
    })
}

const getTimer = () =>{
    const timerDisplay = document.querySelector('.timer__display')
    const timerInputs = document.querySelector('.timer__inputs')
    const timerHours = document.querySelector('#timer__hours')
    const timerMinutes = document.querySelector('#timer__minutes')
    const timerSeconds = document.querySelector('#timer__seconds')
    const buttonStart = document.querySelector('#button__start')
    const buttonPause = document.querySelector('#button__pause')
    const buttonReset = document.querySelector('#button__reset')

    timerDisplay.innerHTML = '00:00:00'
    let timerInterval = 0
    let hour, min, sec = 0

    buttonStart.addEventListener('click', () =>{
        timerDisplay.style.display = 'flex'
        timerInputs.style.display = 'none'
        if(!timerInterval){
            hour = timerHours.value
            min = timerMinutes.value
            sec = timerSeconds.value
            
            sec = parseInt(sec)
            min = parseInt(min)
            hour = parseInt(hour)
            
            if(Number.isNaN(sec)){
                sec = 0
            }
            if(Number.isNaN(min)){
                min = 0
            }
            if(Number.isNaN(hour)){
                hour = 0
            }
            
            if(hour === 0 && min === 0 && sec === 0){
                buttonReset.click()
                playSound()
            }

            if(sec > 59){
                temp = sec / 60
                min += Math.floor(temp)
                sec = sec % 60
            }
            if(min > 59){
                temp = min / 60
                hour += Math.floor(temp)
                min = min % 60
            }
            if(sec < 10){
                sec = '0' + sec
            }
            if(min < 10){
                min = '0' + min
            }
            if(hour < 10){
                hour = '0' + hour
            }

            timerDisplay.innerHTML = hour + ':' + min + ':' + sec 

            timerInterval = setInterval(() =>{
                sec = parseInt(sec)
                min = parseInt(min)
                hour = parseInt(hour)
                
                sec--

                if(sec < 0 && min === 0 && hour >= 1){
                    min = 59
                    sec = 59
                    hour--
                }
                if(sec < 0 && min === 0 && hour > 0){
                    sec = 59
                }
                if(sec < 0 && min > 0){
                    sec = 59
                    min--
                }
                if(hour === 0 && min === 0 && sec === 0){
                    buttonReset.click()
                    playSound()
                }

                if(sec < 10){
                    sec = '0' + sec
                }
                if(min < 10){
                    min = '0' + min
                }
                if(hour < 10){
                    hour = '0' + hour
                }

                timerDisplay.innerHTML = hour + ':' + min + ':' + sec
            }, 1000)
            timerHours.value = null
            timerMinutes.value = null
            timerSeconds.value = null
        }else{
            alert('intervalo')
        }
    })

    buttonPause.addEventListener('click', () =>{
        if(timerInterval){
            clearInterval(timerInterval)
            timerInterval = 0
        }
    })
    buttonReset.addEventListener('click', () =>{
        buttonPause.click()
        timerDisplay.style.display = 'none'
        timerInputs.style.display = 'flex'
        timerDisplay.innerHTML = '00:00:00'
    })
}

const playSound = () =>{
    let sound = new Audio('./sound/ding.mp3') 
    sound.play()
}

function onlyNumberKey(evt) {
    let ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)){
        return false;
    }
    return true;
}

addOptionsEvents()
home.click()