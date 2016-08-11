#!/usr/bin/env node

var fs = require('fs'),
	path = require('path'),
	exec = require('child_process').execSync,
	projectDir = process.argv[2];

if(fs.existsSync(projectDir)){
	var pluginsDir = path.join(projectDir, 'plugins'),
	    supportedPlatforms = process.env.CORDOVA_PLATFORMS.split(','),
		hostedPlugins = {
		    platforms: {
		    	ios: [		             
			    'https://github.com/EddyVerbruggen/LaunchMyApp-PhoneGap-Plugin.git --variable URL_SCHEME=personify',
			    'https://github.com/apache/cordova-plugin-camera.git',
			    'https://github.com/apache/cordova-plugin-console.git',
				'https://github.com/apache/cordova-plugin-device.git',
			    'https://github.com/apache/cordova-plugin-file.git',
		        'https://github.com/apache/cordova-plugin-file-transfer.git',
			    'https://github.com/apache/cordova-plugin-geolocation.git',
			    'https://github.com/apache/cordova-plugin-inappbrowser.git',
			    'https://github.com/apache/cordova-plugin-media.git',
			    'https://github.com/apache/cordova-plugin-media-capture.git',
		        'https://github.com/apache/cordova-plugin-network-information.git',
			    'https://github.com/apache/cordova-plugin-splashscreen.git',
			    'https://github.com/apache/cordova-plugin-statusbar.git',
			    'https://github.com/apache/cordova-plugin-vibration.git',
			    'https://github.com/litehelpers/Cordova-sqlite-storage.git'
//			    ,'https://github.com/urbanairship/phonegap-ua-push.git'
			],
			android: [
			    'https://github.com/phonegap/phonegap-plugin-barcodescanner.git',
			    'https://github.com/apache/cordova-plugin-camera.git',
			    'https://github.com/apache/cordova-plugin-console.git',
				'https://github.com/apache/cordova-plugin-device.git',
			    'https://github.com/apache/cordova-plugin-file.git',
		        'https://github.com/apache/cordova-plugin-file-transfer.git',
			    'https://github.com/apache/cordova-plugin-geolocation.git',
			    'https://github.com/apache/cordova-plugin-inappbrowser.git',
			    'https://github.com/apache/cordova-plugin-media.git',
			    'https://github.com/apache/cordova-plugin-media-capture.git',
		        'https://github.com/apache/cordova-plugin-network-information.git',
			    'https://github.com/apache/cordova-plugin-splashscreen.git',
			    'https://github.com/apache/cordova-plugin-statusbar.git',
			    'https://github.com/apache/cordova-plugin-vibration.git',
			    'https://github.com/apache/cordova-plugin-legacy-whitelist.git',
			    'https://github.com/litehelpers/Cordova-sqlite-storage.git'
//			    ,'https://github.com/urbanairship/phonegap-ua-push.git'
		        ]
		    }
		},
		localPlugins = {
		   platforms: {
		    	ios: [
		    	   'phonegap-plugin-app47 --variable PROJECT_NAME=PersonifyConnect',
		    	   'phonegap-plugin-app-preferences'
		    	],
			android: [
			      'phonegap-plugin-app47',
			      'phonegap-plugin-app-preferences'
			]
		   }
	    };
	
	if(Array.isArray(supportedPlatforms)) {
		supportedPlatforms.forEach(function(platform) {
			var cmdPrefix = (platform !== 'windows') ? 'phonegap plugin add ' : 'cmd.exe /c phonegap.cmd plugin add ';
			
			hostedPlugins.platforms[platform].forEach(function(hostedPlugin){
				var result = exec((cmdPrefix + hostedPlugin + ' --verbose'));
				if(result){
					process.stdout.write(result);
				}
			});
			
			localPlugins.platforms[platform].forEach(function(localPlugin){
				var result = exec((cmdPrefix + projectDir + '/local_plugins/' + localPlugin + ' --verbose'));
				if(result){
					process.stdout.write(result);
				}
			});		
		});
	}
}
