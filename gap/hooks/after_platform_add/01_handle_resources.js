#!/usr/bin/env node

var fs = require('fs-extra'),
    path = require('path'),
    exec = require('child_process').execSync,
    projectDir = process.argv[2];

if (projectDir) {
	var androidResources = path.join(projectDir, 'resources', 'android'),
	    iosResources = path.join(projectDir, 'resources', 'ios');
	
	if(fs.existsSync(androidResources)){
	    copyAndroidResources();
	}
	
	if(fs.existsSync(iosResources)){
	    copyIOSResources();
	}
}

function copyAndroidResources(){
    var androidPlatformResources = path.join(projectDir, 'platforms', 'android', 'res'),
    	resources = [
               {'resources/android/icon/icon-hdpi.png' :  androidPlatformResources + '/drawable-hdpi/icon.png'},
               {'resources/android/splash/splash-hdpi.png' : androidPlatformResources + '/drawable-hdpi/splash.png'},
               {'resources/android/splash/splash-land-hdpi.png' : androidPlatformResources + '/drawable-land-hdpi/splash.png'},
               {'resources/android/icon/icon-ldpi.png' : androidPlatformResources + '/drawable-ldpi/icon.png'},
               {'resources/android/splash/splash-ldpi.png' : androidPlatformResources + '/drawable-ldpi/splash.png'},
               {'resources/android/splash/splash-land-ldpi.png' : androidPlatformResources + '/drawable-land-ldpi/splash.png'},
               {'resources/android/icon/icon-mdpi.png' : androidPlatformResources + '/drawable-mdpi/icon.png'},
               {'resources/android/splash/splash-mdpi.png' : androidPlatformResources + '/drawable-mdpi/splash.png'},
               {'resources/android/splash/splash-land-mdpi.png' : androidPlatformResources + '/drawable-land-mdpi/splash.png'},
               {'resources/android/icon/icon-xhdpi.png' : androidPlatformResources + '/drawable-xhdpi/icon.png'},
               {'resources/android/splash/splash-xdpi.png' : androidPlatformResources + '/drawable-xdpi/splash.png'},
               {'resources/android/splash/splash-land-xdpi.png' : androidPlatformResources + '/drawable-land-xdpi/splash.png'}
        ];
    
    if(fs.existsSync(androidPlatformResources)){
    	resources.forEach(function(resource){
        	Object.keys(resource).forEach(function(key){
        		var from = key,
        		    to = resource[key]; 
        		
        		if(fs.existsSync(from)){
        			console.log('Copying file ' + from + ' -> ' + to);
        			
        			fs.copy(from, to, function(err) {
        			    if(err) {
        				    console.log('Failed to copy '+ from + ' -> ' + to + ': ' + err);
        			    }
        				
        			    console.log('Successfully copied '+ from + ' -> ' + to);
        			});
        		}
        	});
        });
    }
}

function copyIOSResources(){
	var iosPlatformResources = path.join(projectDir, 'platforms', 'ios', 'PersonifyConnect', 'Resources'),
		cpIconsCmd = 'cp resources/ios/icons/*.png ' + iosPlatformResources + '/icons',
		cpSplashCmd = 'cp resources/ios/splash/*.png ' + iosPlatformResources + '/splash';
	
	if(fs.existsSync(iosPlatformResources)){
		//replace phonegaps icons
		exec('rm -rf ' + iosPlatformResources + '/icons');
		fs.mkdir(iosPlatformResources + '/icons');
		//replace phonegaps splashscreens
		exec('rm -rf ' + iosPlatformResources + '/splash');
		fs.mkdir(iosPlatformResources + '/splash');
		
		process.stdout.write('Copying iOS icons using command [' + cpIconsCmd + ']');
		var result = exec(cpIconsCmd);
		if(result){
			process.stdout.write(result);
		}
		process.stdout.write('Copying iOS splash using command [' + cpSplashCmd + ']');
		result = exec(cpSplashCmd);
		if(result){
			process.stdout.write(result);
		}
	}
}
