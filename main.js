$(function () {
  $('div#main.content').append("<div class='row' id='shops' style='margin-bottom: 100px'></div>");

  var url = 'https://api.gnavi.co.jp/RestSearchAPI/20150630/';
  var params = {
      keyid: '141a9e86a558f929a1cd59416c8a7430',
      format: 'json',
      latitude: 35.6455121, // 今は田町駅になってる
      longitude: 139.7456368,
      range: 1, //300m圏内
      lunch: 1, // ランチ営業
      hit_per_page: 100 // 1回のリクエストで取ってこれる最大件数
    };

  var showResult = function(result){
      if ( result.total_hit_count > 0) {
          shuffleArray(result.rest);
          for (var i in result.rest.slice(0,3) ){
              var name = result.rest[i].name
              var address = result.rest[i].address
              var tel = result.rest[i].tel
              var url = result.rest[i].url
              var open_time = result.rest[i].opentime
              var image_url = result.rest[i].image_url.shop_image1
              var access_station = result.rest[i].access.station
              var access_walk = result.rest[i].access.walk
              var pr_text = result.rest[i].pr.pr_short

              $('div#shops').append("<div class='card 4 col' id=card-" +i+ "></div>")
              $('div#card-'+i).append('<a href='+url+'><h4>' +name+ '</h4></a>');
              if (0 !== Object.keys(image_url).length) {
                  $('div#card-'+i).append('<div><img src='+image_url+'></div>');
              }
              $('div#card-'+i).append('<p>'+ '住所：' +address+ '</p>');
              if (0 !== Object.keys(open_time).length) {
                  $('div#card-'+i).append('<p>'+ '営業時間：' +open_time+ '</p>');
              }
              $('div#card-'+i).append('<p>' +access_station+'から'+access_walk+'分'+'</p>');
              $('div#card-'+i).append('<p>'+ 'TEL：' +tel+ '</p>');
              if (0 !== Object.keys(pr_text).length) {
                  $('div#card-'+i).append('<p>' +pr_text+ '</p>');
              }
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

    $.get(url, params, function (result) {
        showResult(result);
    }, "json");
});
