#!/usr/bin/env node

var fs = require("fs"),
    path = require('path'),
    exec = require('child_process').execSync,
    projectDir = process.argv[2],
    platforms = process.env.CORDOVA_PLATFORMS,
    cmdLine = process.env.CORDOVA_CMDLINE;

if(platforms.indexOf('ios') !== -1) {
	var platformDir = path.join(projectDir, 'platforms', 'ios'),
	    infoPlistDir = path.join(platformDir, 'FieldServiceMobile', 'FieldServiceMobile-Info.plist'),
	    debugPlist = path.join(projectDir, 'resources', 'ios', 'debug-FieldServiceMobile-Info.plist'),
	    isDebug = (cmdLine.indexOf('debug') !== -1),
	    copyCmd = 'cp -rf ' + debugPlist + ' ' + infoPlistDir,
	    result;
	
	if(isDebug) {
		process.stdout.write('Copying Debug Info.plist using command [' + copyCmd + ']');
		result = exec(copyCmd);
		if(result){
			process.stdout.write(result);
		}
	}
}