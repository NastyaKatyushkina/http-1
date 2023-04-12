/* eslint-disable default-case */
export default function upload(method, body = null) {
  const URL = 'http://localhost:7070/';

  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    params.append('method', method);

    const xhr = new XMLHttpRequest();

    switch (method) {
      case 'allTickets':
        xhr.open('GET', `${URL}/?${params}`);
        break;
      case 'ticketById':
        params.append('id', body);
        xhr.open('GET', `${URL}/?${params}`);
        break;
      case 'createTicket':
      case 'statusTicket':
      case 'changeTicket':
        xhr.open('POST', `${URL}/?${params}`);
        break;
      case 'deleteTicket':
        params.append('id', body);
        xhr.open('DELETE', `${URL}/?${params}`);
        break;
    }

    xhr.addEventListener('load', () => {
      const data = JSON.parse(xhr.responseText);

      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(data);
      } else {
        reject(xhr.response);
      }
    });

    xhr.send(body);
  });
}
