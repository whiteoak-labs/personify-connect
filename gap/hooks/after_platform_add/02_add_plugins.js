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
			    'org.apache.cordova.camera',
			    'org.apache.cordova.console',
			    'org.apache.cordova.device',
			    'org.apache.cordova.file',
		            'org.apache.cordova.file-transfer',
			    'org.apache.cordova.geolocation',
			    'org.apache.cordova.inappbrowser',
			    'org.apache.cordova.media',
			    'org.apache.cordova.media-capture',
		            'org.apache.cordova.network-information',
			    'org.apache.cordova.splashscreen',
			    'org.apache.cordova.statusbar',
			    'org.apache.cordova.vibration',
			    'https://github.com/litehelpers/Cordova-sqlcipher-adapter.git'
			],
			android: [
			    'phonegap-plugin-barcodescanner',
		  	    'org.apache.cordova.camera',
			    'org.apache.cordova.console',
		    	    'org.apache.cordova.device',
			    'org.apache.cordova.file',
			    'org.apache.cordova.file-transfer',
			    'org.apache.cordova.geolocation',
			    'org.apache.cordova.inappbrowser',
			    'org.apache.cordova.media',
			    'org.apache.cordova.media-capture',
			    'org.apache.cordova.network-information',
			    'org.apache.cordova.splashscreen',
			    'org.apache.cordova.statusbar',
			    'org.apache.cordova.vibration',
                            'cordova-plugin-legacy-whitelist'
		        ]
		    }
		},
		localPlugins = {
		   platforms: {
		    	ios: [],
			android: []
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
