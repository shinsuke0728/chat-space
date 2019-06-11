$(document).on('turbolinks:load', function() {
  
  var search_list = $("#user-search-result");
  var input = $("#user-search-field").val();

  function appendUser(user){
    var html =  `<div class="chat-group-user clearfix">
                   <p class="chat-group-user__name">${user.name}</p>
                   <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}" >追加</div>
                 </div>`
      search_list.append(html);
  }

  function appendErrMsgToHTML(){
     var html = `<div class="chat-group-user clearfix">
                   <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
                 </div>`
     search_list.append(html);
  }
  
  $("#user-search-field").on("keyup", function(){
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user); 
        });
      }
      else{
        appendErrMsgToHTML("一致するユーザーは存在しません");
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  });
  $(document).on('click', ".user-search-add", function(){
      var user_id = $(this).data('user-id');
      var user_name = $(this).data('user-name');
      var html = `<div class='chat-group-user clearfix js-chat-member' id='${user_id}'>
                    <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                    <p class='chat-group-user__name'>${user_name}</p>
                    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                  </div>`
      $("#chat-group-users").append(html);
    $(this).parent().remove();
  });
  $(document).on('click', ".user-search-remove", function(){
    $(this).parent().remove();
  });
});