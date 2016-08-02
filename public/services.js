leagueScheduleApp.service('TeamsScheduleService', ['$http', 'myConfig',
    function($http, myConfig) {
        var apiKey = myConfig.apiKey;
        return {
            getTeamSchedules: function() {
                return $http.jsonp('https://api.leagueapps.com/v1/sites/7178/programs/71377/schedule?x-api-key=' + apiKey + '&callback=JSON_CALLBACK');
            }
        };
    }
]);