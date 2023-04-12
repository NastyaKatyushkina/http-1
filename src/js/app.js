const addTicketButton = document.querySelector('#add-ticket-button');
const createTicketModal = document.querySelector('#create-ticket-modal');
const createTicketForm = document.querySelector('#create-ticket-form');
const editTicketModal = document.querySelector('#edit-ticket-modal');
const editTicketForm = document.querySelector('#edit-ticket-form');
const deleteTicketModal = document.querySelector('#delete-ticket-modal');
const ticketsList = document.querySelector('#tickets-list');

addTicketButton.addEventListener('click', () => {
  createTicketModal.classList.remove('hidden');
});

function editTicket(id, name, description) {
  editTicketForm.id.value = id;
  editTicketForm.name.value = name;
  editTicketForm.description.value = description;
  editTicketModal.classList.remove('hidden');
}

function deleteTicket() {
  deleteTicketModal.classList.remove('hidden');
}

const renderTicket = (ticket) => {
  const ticketElement = document.createElement('div');
  ticketElement.classList.add('ticket');

  const statusElement = document.createElement('div');
  statusElement.textContent = ticket.status === 'open' ? '◻️' : '☑️';
  ticketElement.appendChild(statusElement);

  const nameElement = document.createElement('span');
  nameElement.classList.add('name');
  nameElement.textContent = ticket.name;
  ticketElement.appendChild(nameElement);

  const descriptionElement = document.createElement('div');
  descriptionElement.classList.add('description', 'hidden');
  descriptionElement.textContent = ticket.description;
  ticketElement.appendChild(descriptionElement);

  const dateElement = document.createElement('span');
  dateElement.classList.add('date');
  dateElement.textContent = ticket.created;
  ticketElement.appendChild(dateElement);

  const editButton = document.createElement('button');
  editButton.textContent = '🖊️';
  editButton.addEventListener('click', () => {
    editTicket(ticket.id, ticket.name, ticket.description);
  });
  ticketElement.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '⚔️';
  deleteButton.addEventListener('click', () => {
    deleteTicket(ticket.id);
  });

  ticketElement.appendChild(deleteButton);

  ticketElement.addEventListener('click', () => {
    descriptionElement.classList.toggle('hidden');
  });

  ticketsList.append(ticketElement);
};

createTicketForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(createTicketForm);
  const name = formData.get('name');
  const description = formData.get('description');
  const response = await fetch('http://localhost:7070/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  const ticket = await response.json();
  renderTicket(ticket);
  createTicketModal.classList.add('hidden');
});

document.querySelectorAll('.modal-close').forEach((closeButton) => {
  closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.modal').forEach((modal) => {
      modal.classList.add('hidden');
    });
  });
});

const getTickets = async () => {
  const response = await fetch('http://localhost:7070/');
  const tickets = await response.json();
  tickets.forEach(renderTicket);
};

getTickets();