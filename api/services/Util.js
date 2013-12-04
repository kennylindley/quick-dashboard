// Util.js - general utils in api/services
strReplace = function(str, opt) {
	for (o in opt) {
		var rpl = '{' + o + '}';
		str = str.replace(rpl, opt[o]);
	} 
	return(str);
};

exports.strReplace = strReplace;
