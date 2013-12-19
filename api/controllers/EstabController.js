/**
 * EstabController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var Estab = {
	index: function(req,res) {
		var path = "http://breadsmith.revelup.com/enterprise/Establishment/?format=json";
		var dataOut = "";
		require('http').get(path, function(resp) {
//			console.log("Got response: " + resp.statusCode);
			resp.on('data', function(chunk) {
				dataOut = dataOut + chunk;
			});
			resp.on('end', function() {
				var estabs = JSON.parse(dataOut).objects;
				var sendEstabs = [];
				for (i=0;i<estabs.length;i++) {
					sendEstabs[i] = {id: estabs[i].id, name: estabs[i].name};
				}	
				res.json(sendEstabs);
			});
		}).on('error', function(e) {
			console.log("Got Error: " + e.message);
		});
	}
};

module.exports = Estab;