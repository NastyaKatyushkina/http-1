/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */
import upload from './upload';
import markupTicket, { markupContentDescript } from './markup';

import modalAddTicket from './modal/modalAddTicket';
import modalChangeTicket from './modal/modalChangeTicket';
import modalDeleteTicket from './modal/modalDeleteTicket';

export default class HelpDesk {
  constructor(listTickets) {
    this.listTickets = listTickets;
  }

  init() {
    upload('allTickets')
      .then((data) => {
        data.forEach((ticket) => {
          this.listTickets.insertAdjacentHTML('beforeend', markupTicket(ticket));
        });
      })
      .catch((error) => {
        throw new Error(error);
      });

    document.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(e) {
    const { classList } = e.target;

    if (classList.contains('btn-add-ticket')) { modalAddTicket(); }
    if (classList.contains('btn-cancel')) { this.closeModal(e); }

    if (classList.contains('toggle')) { this.statusTicket(e); }
    if (classList.contains('item__content__name')) { this.getDescriptTicket(e); }

    if (classList.value === 'change') { modalChangeTicket(e); }
    if (classList.value === 'delete') { modalDeleteTicket(e); }
  }

  closeModal(e) {
    e.preventDefault();
    e.target.closest('.modal').remove();
  }

  statusTicket(e) {
    const status = e.target.previousElementSibling;

    if (status.value === 'false') {
      e.target.classList.add('toggle--true');
      status.value = true;
    } else {
      status.value = false;
      e.target.classList.remove('toggle--true');
    }

    const formData = new FormData();
    formData.set('id', e.target.closest('.item').dataset.id);
    formData.set('status', status.value);

    upload('statusTicket', formData);
  }

  getDescriptTicket(e) {
    const item = e.target.closest('.item');
    const ID = e.target.closest('.item').dataset.id;

    upload('ticketById', ID)
      .then((data) => {
        const itemContent = item.querySelector('.item__content');
        const itemDescript = item.querySelector('.item__content__descript');

        if (!itemDescript
          && data.description
          && (item.dataset.id == data.id)) {
          itemContent.insertAdjacentHTML('beforeend', markupContentDescript(data.description));
        }

        if (itemDescript && (item.dataset.id == data.id)) {
          itemDescript.remove();
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
