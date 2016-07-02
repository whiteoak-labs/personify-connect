#!/usr/bin/env node

var fs = require("fs"),
    path = require('path'),
	projectDir = process.argv[2],
	xcconfigFile = path.join(projectDir, 'platforms', 'ios', 'cordova', 'build.xcconfig');

if(fs.existsSync(xcconfigFile)){
	fs.readFile(xcconfigFile, 'utf8', function (err,data) {
		if (err) {
			console.log(err);
			throw err;
		}
		
		var len = data.length,
		    replacement = 'CODE_SIGN_RESOURCE_RULES_PATH = $(SDKROOT)/ResourceRules.plist',
	        search = 'CODE_SIGN_RESOURCE_RULES_PATH = \"$(SDKROOT)/ResourceRules.plist\"',
		   	result = data.replace(search, replacement),
		   	resultLen = result.length;

		if(resultLen < len){
			fs.writeFile(xcconfigFile, result, 'utf8', function (err) {
			    if (err) {
			   	     console.log(err);
			   	     throw err;
				 }
		    });	
		}		
	});	
}