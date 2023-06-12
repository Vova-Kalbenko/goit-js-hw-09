import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const formEl = document.querySelector('.form')



const handleSubmitForm =(e)=>{
  e.preventDefault()
  const {delay, step, amount} = e.target.elements


if(delay.value < 0 || step.value < 0 || amount.value < 0){
  Notiflix.Notify.warning(`please fill all fields`);
} else {
  for (let i = 0; i < amount.value; i += 1) {
    let position = i + 1;
    const delays = Number(delay.value) + step.value * i;



createPromise(position, delays)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }
  }
}
  



formEl.addEventListener('submit', handleSubmitForm)
