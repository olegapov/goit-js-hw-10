// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const dateTimePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
btnStart.disabled = true;
const fieldsDate = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let intervalId = null;

console.log(fieldsDate);

let userSelectedDate = null;

btnStart.addEventListener('click', handlerTimer);

function handlerTimer(event) {
  btnStart.disabled = true;
  dateTimePicker.disabled = true;
  intervalId = setInterval(() => {
    const currentTime = Date.now();

    if (userSelectedDate - currentTime <= 0) {
      clearInterval(intervalId);
      dateTimePicker.disabled = false;
      updateTimerInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }
    const leftTime = convertMs(userSelectedDate - currentTime);

    leftTimeMarkUp(fieldsDate, leftTime);
    console.log(leftTime);
  }, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = Date.now();
    console.log(currentTime);
    if (currentTime >= selectedDates[0].getTime()) {
      iziToast.show({
        title: 'Hey',
        message: 'Please choose a date in the future',
        color: 'red',
        position: 'topCenter',
      });
      btnStart.disabled = true;
      return;
    }
    userSelectedDate = selectedDates[0].getTime();
    btnStart.disabled = false;
  },
};

flatpickr(dateTimePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function leftTimeMarkUp(objMarkup, objLeftTime) {
  objMarkup.days.textContent = String(objLeftTime.days).padStart(2, '0');
  objMarkup.hours.textContent = String(objLeftTime.hours).padStart(2, '0');
  objMarkup.minutes.textContent = String(objLeftTime.minutes).padStart(2, '0');
  objMarkup.seconds.textContent = String(objLeftTime.seconds).padStart(2, '0');
}
