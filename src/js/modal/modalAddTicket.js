import upload from '../upload';
import markupTicket, { markupForm } from '../markup';

export default function modalAddTicket() {
  const listTickets = document.querySelector('.listTickets');
  listTickets.insertAdjacentHTML('afterend', markupForm('addTicketForm', 'Добавить тикет'));

  const form = document.querySelector('.addTicketForm');

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const modalInput = evt.target.querySelector('.modal__input');

    if (!modalInput.value) {
      modalInput.classList.add('inputEmpty');
      setTimeout(() => modalInput.classList.remove('inputEmpty'), 2000);
    } else {
      const formData = new FormData(evt.target);
      formData.set('id', null);

      upload('createTicket', formData)
        .then((data) => {
          listTickets.insertAdjacentHTML('beforeend', markupTicket(data));
        })
        .catch((error) => {
          throw new Error(error);
        });

      form.reset();
      form.remove();
    }
  });
}
