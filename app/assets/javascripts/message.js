// $(document).on('turbolinks:load', function(){
$(function() {
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__content">
                      ${content}
                    </p>
                    <p class="lower-message__image">
                      ${img}
                    </p>
                  </div>
                </div>`
  return html;
  }

  function scroll_view() {
    var position = $('.messages').get(0).scrollHeight;
      $('.messages').animate({scrollTop: position});
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('');
      $('.hidden').val('');
      scroll_view();
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした');
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
  })

  function reloadMessages(){
    var last_message_id = $('.message').last().data('id');
    var herf = 'api/messages'
    $.ajax({
      url: herf,
      type: 'GET',
      data:{id: last_message_id},
      dataType: 'json',
    })
    .done(function(messages){
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML += buildHTML(message);
        scroll_view();
      })
      $('.messages').append(this);
    })
    .fail(function(){
      console.log('error');
    });
  };
  setInterval(reloadMessages, 5000);
});