$(document).ready(function () {
  var omdbUrl = 'https://www.omdbapi.com/';
  var apiKey = '3a181f1c';
  var arrMovies = [];

  $('#search-btn').click(function () {
    searchMoviesApi(1);
  });

  $('#search-get-btn').click(function () {
    searchMoviesApiJQuery(1);
  });

  $('#search-vanilla-btn').click(function () {
    searchMoviesApiVanilla(1);
  });

  function searchMoviesApi(page) {
    var str = $('#enter-title').val();

    if (str.length >= 1) {
      var link = omdbUrl + '?apikey=' + apiKey + '&s=' + str + '&page=' + page;

      // type: especifica si será una petición POST o GET
      // url: la URL para la petición
      // success: cb
      $.ajax({
        type: 'GET',
        url: link,
        success: function (data) {
          $.each(data.Search, function (index, p) {
            var str = ['ID: ' + p.imdbID,
            'Title: ' + p.Title,
            'Type: ' + p.Type,
            'Year: ' + p.Year,
            'Poster: ' + p.Poster];
            console.log(str.join('\n'));
          });
        },
      });
    }
  }

  function searchMoviesApiJQuery(page) {
    var str = $('#enter-title').val();

    if (str.length >= 1) {
      var link = omdbUrl + '?apikey=' + apiKey + '&s=' + str + '&page=' + page;

      $.getJSON(link, function (data) {
        $.each(data.Search, function (index, p) {
          var str = ['ID: ' + p.imdbID,
          'Title: ' + p.Title,
          'Type: ' + p.Type,
          'Year: ' + p.Year,
          'Poster: ' + p.Poster];
          console.log(str.join('\n'));
        });
      });
    }
  }

  function searchMoviesApiVanilla(page) {
    var str = $('#enter-title').val();

    if (str.length >= 1) {
      var link = omdbUrl + '?apikey=' + apiKey + '&s=' + str + '&page=' + page;
      var request = new XMLHttpRequest();

      request.open('GET', link, true);
      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          
          var data = JSON.parse(request.responseText);

          $.each(data.Search, function (index, p) {
            var str = ['ID: ' + p.imdbID,
            'Title: ' + p.Title,
            'Type: ' + p.Type,
            'Year: ' + p.Year,
            'Poster: ' + p.Poster];
            console.log(str.join('\n'));
          });
        }
      }
      request.send();
    }
  }
});
