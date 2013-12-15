/**
 * NetincomeController
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

var NetIncome = {
	index: function(req,res) {
//		console.log(req.param('date'));
		var myDate = new Date(parseFloat(req.param('date')));
		
//		console.log(myDate);
		var repOptsStart = {
			day : myDate.getDate(),
			month: myDate.getMonth() + 1,
			year: myDate.getFullYear(),
			hour: '00',
			minute: '00'
		};
		var range_from = Util.strReplace('{month}%2F{day}%2F{year}+{hour}%3A{minute}', repOptsStart);
	
		var repOptsEnd = {
			day : myDate.getDate(),
			month: myDate.getMonth() + 1,
			year: myDate.getFullYear(),
			hour: myDate.getHours(),
			minute: myDate.getMinutes()
		};
		var range_to = Util.strReplace('{month}%2F{day}%2F{year}+{hour}%3A{minute}',repOptsEnd);

		var repOptsURL = {
			range_from: range_from,
			range_to: range_to,
			client_dt_now: range_to,
			estab: 8
		};
		var path = Util.strReplace('http://breadsmith.revelup.com/reports/sales_summary/json/?posstation=&employee=&range_from={range_from}&range_to={range_to}&client_dt_now={client_dt_now}&format=json&establishment={estab}', repOptsURL);
		var dataOut = "";
//		console.log(path);
		require('http').get(path, function(resp) {
//			console.log("Got response: " + resp.statusCode);
			resp.on('data', function(chunk) {
				dataOut = dataOut + chunk;
			});
			resp.on('end', function() {
				res.json(dataOut);
			});
		}).on('error', function(e) {
			console.log("Got Error: " + e.message);
		});
	}
};

module.exports = NetIncome;
