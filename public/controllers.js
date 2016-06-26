movieApp.controller('homeController', ['$scope', 'movieService', '$timeout', '$rootElement',
  function ($scope, movieService, $timeout, $rootElement) {
    $scope.loading = true;
    $scope.popularMovies = [];
    $scope.filterOutMoviesWithNoImages = function (moviesArr) {
      return moviesArr.filter(function (movie) {
        return movie.poster_path;
      })
    }
    $scope.getInitialMovies = function () {
      $scope.pageNumber = 1;
      return movieService.getPopularMovies(1).then(function (response) {
        response.data.results = $scope.filterOutMoviesWithNoImages(response.data.results);
        $scope.popularMovies = response.data.results;
      }, function (err) {
        console.log("there was an error getting the initial movies");
      })
    }
    $scope.getInitialMovies().then(function () {
      $scope.loading = false;
    });
    //automatically go to page 2 to get the scrollbar without css hackery. $timeout hackery > non-semantic css crap/hackery
    $timeout(function () {
      $scope.getMoreMovies();
    }, 500)
    //pass the displayRecordCount to the backend on the scroll event, then concat the new records on to $scope.popularMovies
    $scope.getMoreMovies = function () {
      $scope.pageNumber++;
      movieService.getPopularMovies($scope.pageNumber).then(function (response) {
        response.data.results = $scope.filterOutMoviesWithNoImages(response.data.results);
        $scope.popularMovies = $scope.popularMovies.concat(response.data.results);
      }, function () {
        console.log("the pagination service is down");
      })
    }
    $scope.$watch('popularMovies', function () {
      if ($scope.popularMovies.length > 1000) {
        alert("Did not have time to address too many DOM nodes - would have used angulars $cacheFactory and evicted records too far out of the view");
      }
    })
    //TODO: make this into a reusable directive or put it in a service for other views.
    $(window).scroll(function () {
      if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        $scope.getMoreMovies();
      }
    });
  }
]);