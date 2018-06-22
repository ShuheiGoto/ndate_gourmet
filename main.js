$(function () {
  $('div#main.content').append("<input type='text' class='js--key'>");
  $('div#main.content').append("<input type='button' value='apply' class='js--apply'>");
  $('div#main.content').append("<div class='shops'></div>");

  var url = 'https://api.gnavi.co.jp/RestSearchAPI/20150630/';
  var params = {
      keyid: '',
      format: 'json',
      latitude: 35.6455121, // 今は田町駅になってる
      longitude: 139.7456368,
      range: 1 //300m圏内
    };

  var showResult = function(result){
      if ( result.total_hit_count > 0) {
          var res = '';
          alert( result.total_hit_count + '件の結果が見つかりました。');
          for (var i in result.rest){
              res = result.rest[i].name
              // TODO: 欲しいデータをこの辺に入れてく
              $('div.shops').append('<p>'+res+'</p>');
          }
      }
  }

  $(document).on('click', '.js--apply', function(){
      params.keyid = $('.js--key').val();
      $.get(url, params, function(result){
          showResult(result);
      }, "json");
  });
});
