var test = document.querySelector('#test');
var form = document.querySelector('form');
var input = document.querySelector('#comment');

function getComments() {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      test.innerHTML = '';
      var comments = JSON.parse(this.responseText);
      comments.forEach(el => appendComment(el));
    }
  };

  request.open(
    'GET',
    'https://api.github.com/gists/e75106246384d540c1bdb1285261d375/comments'
  );
  request.setRequestHeader(
    'Authorization',
    'token 3e5a3bbf44b8be0a1bece8c7cb9723564703d496'
  );
  request.send();
}

function appendComment(comment) {
  var wrapper = document.createElement('div');
  wrapper.setAttribute('class', 'comment');
  var avatar = document.createElement('img');
  avatar.setAttribute('src', comment.user.avatar_url);
  var span = document.createElement('span');
  span.textContent = comment.user.login;
  var content = document.createElement('div');
  content.setAttribute('class', 'content');
  content.textContent = comment.body;
  var delBtn = document.createElement('button');
  delBtn.setAttribute('class', 'del');
  delBtn.textContent = '删除'
  wrapper.appendChild(avatar);
  wrapper.appendChild(span);
  wrapper.appendChild(content);
  test.appendChild(wrapper);
  wrapper.appendChild(delBtn);
  delBtn.addEventListener('click', function() {
    delComment(comment.id);
  })
}

function submitComment(text) {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 201) {
      test.innerHTML = '';
      getCommentsByFetch();
      alert('评论成功');
    }
  };

  request.open(
    'POST',
    'https://api.github.com/gists/e75106246384d540c1bdb1285261d375/comments'
  );
  request.setRequestHeader(
    'Authorization',
    'token 3e5a3bbf44b8be0a1bece8c7cb9723564703d496'
  );

  var sendData = JSON.stringify({ body: text });

  request.send(sendData);
}

form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  if (input.value == null || input.value == '') {
    return;
  }
  var text = input.value;
  submitComment(text);
});

function getCommentsByFetch() {
  fetch(
    'https://api.github.com/gists/e75106246384d540c1bdb1285261d375/comments',
    {
      headers: {
        'content-type': 'application/json',
        Authorization: 'token 3e5a3bbf44b8be0a1bece8c7cb9723564703d496'
      }
    }
  )
    .then(resp => resp.json())
    .then(resp => {
      resp.forEach(el => appendComment(el));
    });
}

function delComment(id) {
  console.log('https://api.github.com/gists/xlssl/comments/' + id);
}

getCommentsByFetch();
