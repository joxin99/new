var output = document.querySelector('#output');
var ws = new WebSocket('ws://localhost:8080/');
ws.onopen = function() {
  output.innerHTML = 'chat room connected';
};

ws.onmessage = function(evt) {
  output.innerHTML += '<br>';
  output.innerHTML += evt.data;
};

var form = document.querySelector('form');
var name1 = document.querySelector('#name1');
var text = document.querySelector('#text');

form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  console.log(name1.value, text.value);
  if (!name1.value || !text.value) {
    return;
  }
  ws.send(name1.value + ':' + text.value);
});
