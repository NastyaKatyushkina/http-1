export default function markupTicket(item) {
  return `
      <div class="item" data-id="${item.id}">
        <div class="item__status">
          <input type="checkbox" value="${item.status}"> 
          <span class="toggle ${!item.status ? '' : 'toggle--true'}"></span>
        </div>
        <div class="item__content">
          <div class="item__content__name">${item.name}</div>
        </div>
        <div class="item__time">${item.created}</div>
        <button class="change">&#9998;</button>
        <button class="delete">&#10007;</button>
      </div>
    `;
}

export function markupContentDescript(description) {
  return `<div class="item__content__descript">${description}</div>`;
}

export function markupForm(nameForm, header) {
  return `
      <form class="modal ${nameForm}">
        <h2 class="modal__header">${header}</h2>
        <label>Краткое описание
          <input class="modal__input" name="name">
        </label>
        <label>Подробное описание
          <textarea class="modal__textarea" name="description"></textarea>
        </label>
        <div class="modal__btns">
          <button class="btn btn-cancel">Отмена</button>
          <button class="btn btn-send">Ок</button>
        </div>
      </form>
  `;
}

export function markupFormDelete() {
  return `
      <form class="modal deleteTicketForm">
        <h2 class="modal__header">Удалить тикет</h2>
        <p class="modal__message">Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>
        <div class="modal__btns">
          <button class="btn btn-cancel">Отмена</button>
          <button class="btn btn-send">Ок</button>
        </div>
      </form>
    `;
}
