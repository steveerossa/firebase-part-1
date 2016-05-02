myApp.controller('MeetingsController', ['$scope', "$rootScope","$firebaseAuth",
"$firebaseArray" , "FIREBASE_URL",
function($scope, $rootScope, $firebaseAuth, $firebaseArray,FIREBASE_URL) {
    
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);
    // THEN
    auth.$onAuth(function (authUser) {
        if(authUser) {
            console.log('AUTHORIZED');
            var meetingsRef = new Firebase(FIREBASE_URL + "users/" + 
            $rootScope.currentUser.$id + "/meetings");
            var meetingsInfo = $firebaseArray(meetingsRef);
            $scope.meetings = meetingsInfo;
            
            meetingsInfo.$loaded().then(function(data) {
                $rootScope.howManyMeetings = meetingsInfo.length;
            }); //ENSURE MEETING DATA IS LOADED
            
            meetingsInfo.$watch(function(data) {
                $rootScope.howManyMeetings = meetingsInfo.length;
            });
            
            $scope.addMeeting = function() {
                meetingsInfo.$add({
                    name: $scope.meetingname,
                    date: Firebase.ServerValue.TIMESTAMP
                    
                }).then(function() {
                    $scope.meetingname = "";
                }); // PROMISE 
                    
               
            }; // addMeeting
            
            $scope.deleteMeeting = function(key) {
                meetingsInfo.$remove(key);
            } // DELETE MEETING
        } // user authentication
    }); // end onAuth
    
    
}]); // END CONTROLLER