$(function () {
  $('div#main.content').append("<input type='text' class='js--key'>");
  $('div#main.content').append("<input type='button' value='apply' class='js--apply'>");
  $('div#main.content').append("<div class='row' id='shops'></div>");

  var url = 'https://api.gnavi.co.jp/RestSearchAPI/20150630/';
  var params = {
      keyid: '',
      format: 'json',
      latitude: 35.6455121, // 今は田町駅になってる
      longitude: 139.7456368,
      range: 1, //300m圏内
      hit_per_page: 100 // 1回のリクエストで取ってこれる最大件数
    };

  var showResult = function(result){
      if ( result.total_hit_count > 0) {
          var res = '';
          //alert( result.total_hit_count + '件の結果が見つかりました。');
          //var shops_information = shuffleArray(result.rest);
          shuffleArray(result.rest);
          for (var i in result.rest.slice(0,3) ){
              var name = result.rest[i].name
              var url = result.rest[i].url
              // TODO: 欲しいデータをこの辺に入れてく
              $('div#shops').append("<div class='card 4 col' id=card-" +i+ "></div>")
              $('div#card-'+i).append('<a rel='+url+'>' +name+ '</p>');
          }
      }
  }
  var shuffleArray = function(array) {
      var n = array.length, t, i;
      while (n) {
          i = Math.floor(Math.random() * n--);
          t = array[n];
          array[n] = array[i];
          array[i] = t;
        }
      return array;
  }

  $(document).on('click', '.js--apply', function(){
      params.keyid = $('.js--key').val();
      $.get(url, params, function(result){
          showResult(result);
      }, "json");
  });
});
