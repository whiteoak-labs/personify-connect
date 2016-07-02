#!/usr/bin/env node

var fs = require("fs"),
    path = require('path'),
	projectDir = process.argv[2],
	file = path.join(projectDir, 'config.xml');

if(fs.existsSync(file)){
	fs.readFile(file, 'utf8', function (err,data) {	
		if (err) { 
		   throw err; 
		}
		
		var alreadyModifiedFlag = 'versionUpdated="true"';	
		
		// The build runs once for debug and release, so need this flag to only update the config.xml once.
		if (data.indexOf(alreadyModifiedFlag) !== -1) {
		  return;
		}
			
        var modifiedData = data.replace(/android-versionCode="(\d+)"/g, function(s, m) {
           return 'android-versionCode="' + (m * 1 + 1) + '"';
        });
        
        modifiedData = modifiedData.replace(/ios-CFBundleVersion="(\d+).(\d+).(\d+).(\d+)"/g, function(s, m1, m2, m3, m4) {
           return alreadyModifiedFlag + ' ios-CFBundleVersion="' + m1 + '.' + m2 + '.' + m3 + '.' + (m4 * 1 + 1) + '"';
        });
        
        fs.writeFile(file, modifiedData);       
    });
}