import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', hadlerPromise);

function hadlerPromise(event) {
  event.preventDefault();
  const delay = +event.target.elements.delay.value;
  const state = event.target.elements.state.value;
  console.log(state);

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
    .then(date => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${date}ms`,
        color: 'green',
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.show({
        message: `❌ Rejected promise in ${error}ms`,
        color: 'red',
        position: 'topRight',
      });
    });
}
