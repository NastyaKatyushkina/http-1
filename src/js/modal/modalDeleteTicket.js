import upload from '../upload';
import { markupFormDelete } from '../markup';

export default function modalDeleteTicket(e) {
  const listTickets = document.querySelector('.listTickets');
  listTickets.insertAdjacentHTML('afterend', markupFormDelete());

  const form = document.querySelector('.deleteTicketForm');

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    formData.set('delId', e.target.closest('.item').dataset.id);
    const ID = e.target.closest('.item').dataset.id;

    upload('deleteTicket', ID);

    e.target.closest('.item').remove();
    evt.target.closest('.modal').remove();
  });
}
