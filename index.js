const list = document.querySelector('ul');

function request(callback, url, method = 'GET', body = null, headers = {}) {
  const xhr = new XMLHttpRequest();

  xhr.open(method, url);
  Object.entries(headers).forEach(([key, value]) => {
    xhr.setRequestHeader(key, value);
  });

  xhr.send(body ? JSON.stringify(body) : null);
  xhr.onload = () => {
    callback(xhr.response);
  }
}

request((response) => {
  const data = JSON.parse(response);

  Object.values(data).forEach((transaction) => {
    const item = document.createElement('li');

    item.innerText = transaction.description;
    list.append(item);
  });
}, 'https://bank-api-transactions.herokuapp.com/api/transactions');

