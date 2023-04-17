export default function http(metod, url, formData = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(metod, url);
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText);
      } else {
        reject(xhr.status);
      }
    });
    if (metod === 'POST' || metod === 'PUT') {
      xhr.send(formData);
    } else {
      xhr.send();
    }
  });
}
