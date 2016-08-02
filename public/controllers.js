leagueScheduleApp.controller('homeController', ['$scope', 'TeamsScheduleService',
    function($scope, TeamsScheduleService) {
        $scope.getSchedules = function() {
            return TeamsScheduleService.getTeamSchedules().then(function(response) {
                $scope.gamesSchedule = response.data.games;
            }, function(err) {
                console.log("there was an error getting the teams schedules");
            })
        }
        $scope.homeVsAwaySchedules = {};
        $scope.getSchedules().then(trackHomeVsAway);

        function updateTeamSchedule(team, games) {
            if (team) {
                if ($scope.homeVsAwaySchedules[team]) {
                    $scope.homeVsAwaySchedules[team][games]++;
                }
            }
        }

        //check if the schedule is imbalanced
        function checkBalancedSchedule(homeVsAwayData) {
            if (homeVsAwayData.homeGames > 10 || homeVsAwayData.awayGames < 10) {
                $scope.imbalancedSchedule = true;
            }
        }

        function trackHomeVsAway() {
            //initialize homeVsAwaySchedules object in separate loop for efficiency and readability
            //nstead of trying to initialize + tally at the same time.
            $scope.gamesSchedule.forEach(function(gameData) {
                function checkTeam(team) {
                    if (team) {
                        if (!$scope.homeVsAwaySchedules[team]) {
                            $scope.homeVsAwaySchedules[team] = {
                                "homeGames": 0,
                                "awayGames": 0
                            };
                        }
                    }
                }
                checkTeam(gameData.team1);
                checkTeam(gameData.team2);
            })

            $scope.gamesSchedule.forEach(function(gameData) {
                updateTeamSchedule(gameData.team1, "homeGames");
                updateTeamSchedule(gameData.team2, "awayGames");
            })

            for (var homeVsAwayData in $scope.homeVsAwaySchedules) {
                checkBalancedSchedule($scope.homeVsAwaySchedules[homeVsAwayData]);
            }
        };
    }
]);