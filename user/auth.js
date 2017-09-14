$(function() {
   $.extend(WorkoutLog, {
      signup: function() {
            var username = $("#su_username").val();
            var password = $("#su_password").val();
            var user = {user:  {username: username, password: password }};
            var signup = $.ajax({
               type: "POST", 
               url: WorkoutLog.API_BASE + "user", 
               data: JSON.stringify(user), 
               contentType: "application/json"
            });
            //signup done/fail
            signup.done(function(data) {
               if (data.sessionToken) {
                  WorkoutLog.setAuthHeader(data.sessionToken);
                  WorkoutLog.definition.fetchAll();
                  WorkoutLog.log.fetchAll();
                  // console.log("You made it!");
                  // console.log(data.sessionToken);
                  
               }
               $("#signup-modal").modal("hide");
               $(".disabled").removeClass("disabled");
               $("#pillnav").removeAttr("style");
               $("#recordWhat").removeAttr("style");
               $("#logsign").css({"display": "none"});
               $("#forLogout").removeAttr("style");
               // console.log("Great job signing up!");
               $("#su_username").val("");
               $("#su_password").val("");
               $('a[href="#home"]').tab('show');

            }).fail(function() {

               $("#su_error").text("There was an issue with sign up").show();

            });
      },

      login: function() {
   		var username = $("#li_username").val();
   		var password = $("#li_password").val();
   		var user = {user:  {username: username, password: password }};
   		var login = $.ajax({
   			type: "POST", 
   			url: WorkoutLog.API_BASE + "login", 
   			data: JSON.stringify(user), 
   			contentType: "application/json"
   		});
   		login.done(function(data) {
   			if (data.sessionToken) {
               WorkoutLog.setAuthHeader(data.sessionToken);
               WorkoutLog.definition.fetchAll();
               WorkoutLog.log.fetchAll();
               
   			}	
   			$("#login-modal").modal("hide");
   			$(".disabled").removeClass("disabled");
            $("#li_username").val("");
            $("#li_password").val("");
            $("#pillnav").removeAttr("style");
            $("#recordWhat").removeAttr("style");
            $("#logsign").css({"display": "none"});
            $("#forLogout").removeAttr("style");
            $('a[href="#home"]').tab('show');
            

   		}).fail(function() {
   			$("#li_error").text("There was an issue with your username or password").show();
      		});
      },

      loginout: function() {
         if (window.localStorage.getItem("sessionToken")) {
            window.localStorage.removeItem("sessionToken");
         }
      }
   });

   // bind events
   $("#login").on("click", WorkoutLog.login);
   $("#signup").on("click", WorkoutLog.signup);
   $("#forLogout").on("click", WorkoutLog.loginout);


});





