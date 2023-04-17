import HelpDesk from './HelpDesk';

const listTickets = document.querySelector('.listTickets');

const helpDesk = new HelpDesk(listTickets);
helpDesk.init();
