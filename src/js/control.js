import http from './http';
import CreateElement from './createElement';

export default function control() {
  const url = 'http://localhost:7070/';
  let liID = null;

  const page = new CreateElement();
  page.initDOM();

  const responseServerAllTickets = http('GET', `${url}?method=allTickets`);

  responseServerAllTickets
    .then((data) => {
      console.log(data);
      page.createTicket(JSON.parse(data));
    })
    .catch((err) => err.message);

  document.addEventListener('click', (evt) => {
    evt.preventDefault();

    // кнопка отмена модальные окна
    if (evt.target.matches('.btn__false')) {
      evt.target.closest('.popup').remove();
    }

    // кнопка добавить тикет
    if (evt.target.matches('.btn-add')) {
      page.createPopapForm('Добавить тикет');
    }

    // просмотр деталей тикета
    if (evt.target.matches('.card__name')) {
      if (
        evt.target.closest('.card__content').querySelector('.card__description')
      ) {
        return;
      }
      const responseServerTicketById = http(
        'GET',
        `${url}?method=ticketById&id=${evt.target.closest('li').dataset.id}`,
      );

      responseServerTicketById
        .then((data) => {
          const dataParse = JSON.parse(data);
          const description = page.createElementCardDescription(
            dataParse.description,
          );
          evt.target.closest('.card__content').appendChild(description);
        })
        .catch((err) => err.message);
    }

    // отправка формы добавить тикет
    if (evt.target.dataset.popupBtnSubmit) {
      const formData = new FormData(evt.target.closest('#form'));

      const responseServerCreateTicket = http(
        'POST',
        `${url}?method=createTicket`,
        formData,
      );
      responseServerCreateTicket
        .then((data) => {
          // console.log(data);
          const dataParse = JSON.parse(data);

          page.createTicket(dataParse);
        })
        .catch((err) => err.message);
      evt.target.closest('.popup').remove();
    }

    // кнопка удалить тикет
    if (evt.target.dataset.btnDelete) {
      page.createPopapDelete();
      liID = evt.target.closest('li');
    }
    // кнопка подтвердить удаление тикета
    if (evt.target.dataset.popupBtnTrue) {
      const responseServerDeleteTicket = http(
        'DELETE',
        `${url}?method=deleteTicket&id=${liID.dataset.id}`,
      );

      responseServerDeleteTicket
        // eslint-disable-next-line no-unused-vars
        .then((data) => {
          liID.remove();
        })
        .catch((err) => err.message);
      evt.target.closest('.popup').remove();
    }

    // Модальное окно редактирования существующего тикета
    if (evt.target.dataset.btnEdit) {
      page.createPopapForm('Изменить тикет', 'popup-btn-submit-edit');
      liID = evt.target.closest('li');

      const responseServerTicketById = http(
        'GET',
        `${url}?method=ticketById&id=${liID.dataset.id}`,
      );

      responseServerTicketById
        .then((data) => {
          const dataParse = JSON.parse(data);
          document.querySelector('.form__name').value = dataParse.name;
          document.querySelector('.form__description').value = dataParse.description;
        })
        .catch((err) => err.message);
    }

    // Модальное окно редактирования кнопка ОК
    if (evt.target.dataset.popupBtnSubmitEdit) {
      const formData = new FormData(evt.target.closest('#form'));

      const responseServerEditTicket = http(
        'PUT',
        `${url}?method=editTicket&id=${liID.dataset.id}`,
        formData,
      );
      responseServerEditTicket
        .then((data) => {
          const dataParse = JSON.parse(data);
          liID.querySelector('.card__name').textContent = dataParse.name;
          if (liID.querySelector('.card__description')) {
            liID.querySelector('.card__description').textContent = dataParse.description;
          }
        })
        .catch((err) => err.message);
      evt.target.closest('.popup').remove();
    }

    // кнопка добавить status
    if (evt.target.dataset.btnStatus) {
      liID = evt.target.closest('li');

      const responseServerTicketStatus = http(
        'GET',
        `${url}?method=ticketStatus&id=${liID.dataset.id}`,
      );
      responseServerTicketStatus
        .then((data) => {
          const dataParse = JSON.parse(data);
          liID.querySelector('[data-btn-status=js-btn-status]').textContent = '\u2714';
          liID.dataset.status = dataParse.status;
        })
        .catch((err) => err.message);
    }
  });
}
