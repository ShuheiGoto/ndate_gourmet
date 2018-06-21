$(function () {
  $('div#main.content').append("<input type='text' class='js--key'>");
  $('div#main.content').append("<input type='button' value='apply' class='js--apply'>");
  $('div#main.content').append("<div class='shops'></div>");

  var url = 'https://api.gnavi.co.jp/RestSearchAPI/20150630/?callback=?';
  var params = {
      keyid: '',
      format: 'json',
      latitude: 35.6455121,
      longitude: 139.7456368,
      range: 1
    };

  $(document).on('click', '.js--apply', function(){
      params.keyid = $('.js--key').val();
      console.log(params.keyid);
      $.getJSON(url, params, function(result){
      console.log(result);
          //        showResult(result);
      });
  });
});
