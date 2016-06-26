movieApp.service('movieService', ['$http',
  function ($http) {
    //todo: put this in a gitignore 
    var apiKey = '9952def8e4e171a89ef202376a61cbe6';
    return {
      getPopularMovies: function (pageNumber) {
        return $http.get('http://api.themoviedb.org/3/discover/movie?language=en&sort_by=popularity.asc&api_key=' + apiKey + '&page=' + pageNumber);
      },
      getImageConfigurationSettings: function () {
        return $http.get('http://api.themoviedb.org/3/configuration?api_key=' + apiKey);
      }
    };
  }
]);