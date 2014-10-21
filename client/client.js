// Session.setDefault('redirect_url', '/');

// //on route change
// Router.onAfterAction(function() {
// 	var current_path = Router.current().location.path;

// 	//save current route path (if not login page)
// 	if(current_path != Router.path('login')) {
// 		Session.set('redirect_url', current_path);
// 	}
// });

// Deps.autorun(function() {
// 	//auto run when user login
// 	if(Meteor.userId()) {

// 		//nonreactive to fix a redirect loop
// 		Deps.nonreactive(function() {
// 			//always get out from login page after login
// 			if(Session.equals('redirect_url', Router.path('login'))) {
// 				Session.set('redirect_url', '/');
// 			} 

// 			//redirect to previous page
// 			Router.go(Session.get('redirect_url'));
// 		});
// 	}
// });
// Accounts.ui.config({
//     requestPermissions: {
//         facebook: ['public_profile', 'email', 'user_location', 'user_friends'],
//     }
// });