import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}

const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('[data-start]');
const daysCounterEl = document.querySelector('[data-days]');
const hoursCounterEl = document.querySelector('[data-hours]');
const minutesCounterEl = document.querySelector('[data-minutes]');
const secondsCounterEl = document.querySelector('[data-seconds]');
let timerId = null;

btnEl.disabled = true;

 flatpickr(inputEl, {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
          Notiflix.Notify.failure('Please choose a date in the future');
          return;
        }
        Notiflix.Notify.success('Timer is ready to go');
          btnEl.disabled = false;
      },
    });

const handleStartCount = (e)=>{
  timerId = setInterval(() => {
    const pickedDate = new Date(inputEl.value);
    const timeToFinish = pickedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(timeToFinish);

    daysCounterEl.textContent = addLeadingZero(days);
    hoursCounterEl.textContent = addLeadingZero(hours);
    minutesCounterEl.textContent = addLeadingZero(minutes);
    secondsCounterEl.textContent = addLeadingZero(seconds);

    if (timeToFinish < 1000) {
      clearInterval(timerId);
      date.disabled = false;
    }
  }, 1000);
}




btnEl.addEventListener('click', handleStartCount);
