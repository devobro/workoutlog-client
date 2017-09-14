$(function(){

var WorkoutLog = (function($, undefined) {
      var API_BASE =  "https://workoutlog-server-devon.herokuapp.com/api/";
      // var API_BASE = "http://localhost:3000/api/"
      var userDefinitions = [];

      var setAuthHeader = function(sessionToken) {
         window.localStorage.setItem("sessionToken", sessionToken);
         // Set the authorization header
         // This can be done on individual calls
         // here we showcase ajaxSetup as a global tool
         $.ajaxSetup({
            "headers": {
               "Authorization": sessionToken
            }
         });
      };

      // public
      return {
         API_BASE: API_BASE,
         setAuthHeader: setAuthHeader
      };
   })(jQuery);

   // Ensure .disabled aren't clickable
   $(".nav-tabs a[data-toggle='tab']").on("click", function(e) {
      var token = window.localStorage.getItem("sessionToken");
      if ($(this).hasClass("disabled") && !token) {
         e.preventDefault();
         return false;
      }
   });


   // bind enter key
   $(document).on("keypress", function(e) {
      if (e.which === 13) { // enter key
         if ($("#signup-modal").is(":visible")) {
            $("#signup").trigger("click");
         }
         if ($("#login-modal").is(":visible")) {
            $("#login").trigger("click");
         }
      }
   });

   // bind tab change events
  // bootstrap tab --> binding to a bootstrap event
  $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
     var target = $(e.target).attr("href"); // activated tab
     if (target === "#log") {
        WorkoutLog.log.setDefinitions();
        $("#pillnav").removeAttr("style");
        $("#pillnav").css({"display": "none"});
        $("#recordWhat").removeAttr("style");
        $("#recordWhat").css({"display": "none"});
        $("#homeButton").removeAttr("style");
     }

     if (target === "#define"){
        $("#pillnav").removeAttr("style");
        $("#pillnav").css({"display": "none"});
        $("#recordWhat").removeAttr("style");
        $("#recordWhat").css({"display": "none"});
        $("#homeButton").removeAttr("style");

     }

     if (target === "#update-log"){
        WorkoutLog.log.setDefinitions();
        $("#pillnav").removeAttr("style");
        $("#pillnav").css({"display": "none"});
        $("#recordWhat").removeAttr("style");
        $("#recordWhat").css({"display": "none"});
        $("#homeButton").removeAttr("style");
     }

     if (target === "#history") {
        WorkoutLog.log.setHistory();
        $("#pillnav").removeAttr("style");
        $("#pillnav").css({"display": "none"});
        $("#recordWhat").removeAttr("style");
        $("#recordWhat").css({"display": "none"});
        $("#homeButton").removeAttr("style");
     }
     if (target === "#home") {
        $("#pillnav").removeAttr("style");
        $("#recordWhat").removeAttr("style");
        $("#homeButton").removeAttr("style");
        $("#homeButton").css({"display": "none"});
        $("#define").removeClass("active");
        $("#log").removeClass("active");
        $("#history").removeClass("active");
        $("#update-log").removeClass("active");

     }
     if (target === "#logsign"){
        $("#pillnav").removeAttr("style");
        $("#pillnav").css({"display": "none"});
        $("#recordWhat").removeAttr("style");
        $("#recordWhat").css({"display": "none"});
        $("#logsign").removeAttr("style");
     }

  });

   // setHeader if we
   var token = window.localStorage.getItem("sessionToken");
   if (token) {
      WorkoutLog.setAuthHeader(token); 
   }

   // expose this to the other workoutlog modules
   window.WorkoutLog = WorkoutLog;
});

