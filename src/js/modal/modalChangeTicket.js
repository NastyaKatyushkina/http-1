import upload from '../upload';
import { markupForm, markupContentDescript } from '../markup';

export default function modalChangeTicket(e) {
  const listTickets = document.querySelector('.listTickets');
  listTickets.insertAdjacentHTML('afterend', markupForm('changeTicketForm', 'Изменить тикет'));

  const form = document.querySelector('.changeTicketForm');

  const item = e.target.closest('.item');
  const ID = item.dataset.id;

  upload('ticketById', ID)
    .then((data) => {
      form.name.value = data.name;
      form.description.value = data.description;
    })
    .catch((error) => {
      throw new Error(error);
    });

  const itemContentName = item.querySelector('.item__content__name');
  const itemContentDescript = item.querySelector('.item__content__descript');

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const modalInput = evt.target.querySelector('.modal__input');

    if (!modalInput.value) {
      modalInput.classList.add('inputEmpty');
      setTimeout(() => modalInput.classList.remove('inputEmpty'), 2000);
    } else {
      const formData = new FormData(evt.target);

      formData.set('id', ID);
      formData.set('status', item.querySelector('input').value);

      upload('changeTicket', formData)
        .then((data) => {
          if (!itemContentDescript) {
            const itemContent = item.querySelector('.item__content');
            itemContent.insertAdjacentHTML('beforeend', markupContentDescript(data.description));
          } else {
            itemContentDescript.textContent = data.description;
          }

          itemContentName.textContent = data.name;
        })
        .catch((error) => {
          throw new Error(error);
        });

      form.reset();
      form.remove();
    }
  });
}
