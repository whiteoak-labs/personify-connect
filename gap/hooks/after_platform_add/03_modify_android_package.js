#!/usr/bin/env node

var fs = require("fs"),
    path = require('path'),
	projectDir = process.argv[2],
	file = path.join(projectDir, 'config.xml'),
	cli = process.env.CORDOVA_CMDLINE;

if(fs.existsSync(file)){
	
	if(cli.indexOf('android') !== -1) {
		var content = fs.readFileSync(file, 'utf8');
		
		if(content && content.length > 0) {
			var modified = content.replace(/id="com.svg.mobile.client"/g, 'id="com.servigistics.mobile.client"');
			
			if(modified) {
				console.log("Found package name for replacement and replaced it correctly.");
				fs.writeFileSync(file, modified);
			}
		}	
	}	
}
