
const btnStartEl =  document.querySelector('[data-start]')
const btnStopEl =  document.querySelector('[data-stop]')
btnStopEl.disabled = true

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

const handleStartColorSwitcher =(e)=>{
    switcherID = setInterval(()=>{
        btnStopEl.disabled = false
        document.body.style.backgroundColor = getRandomHexColor()
        btnStartEl.disabled = true
    }, 1000)
}

const handleStopColorSwitcher =(e)=>{
    clearInterval(switcherID)
    btnStartEl.disabled = false
    btnStopEl.disabled = true
}

btnStartEl.addEventListener('click', handleStartColorSwitcher)
btnStopEl.addEventListener('click', handleStopColorSwitcher)