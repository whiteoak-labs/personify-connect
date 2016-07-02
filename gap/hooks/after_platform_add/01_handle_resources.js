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
        defaultIconPath = path.join(androidPlatformResources, 'drawable', 'icon.png'),
    	resources = [
               {'resources/android/icon/icon-hdpi.png' :  androidPlatformResources + '/drawable-hdpi/icon.png'},
               {'resources/android/splash/splash-hdpi.png' : androidPlatformResources + '/drawable-hdpi/splash.png'},
               {'resources/android/icon/icon-ldpi.png' : androidPlatformResources + '/drawable-ldpi/icon.png'},
               {'resources/android/splash/splash-ldpi.png' : androidPlatformResources + '/drawable-ldpi/splash.png'},
               {'resources/android/icon/icon-mdpi.png' : androidPlatformResources + '/drawable-mdpi/icon.png'},
               {'resources/android/splash/splash-mdpi.png' : androidPlatformResources + '/drawable-mdpi/splash.png'},
               {'resources/android/icon/icon-xhdpi.png' : androidPlatformResources + '/drawable-xhdpi/icon.png'},
               {'resources/android/icon/icon-xxhdpi.png' : androidPlatformResources + '/drawable-xxhdpi/splash.png'}
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
    	
    	if(fs.existsSync(defaultIconPath)){
    		fs.unlinkSync(defaultIconPath);
    	}
    }
}

function copyIOSResources(){
	var iosPlatformResources = path.join(projectDir, 'platforms', 'ios', 'FieldServiceMobile', 'Resources'),
		cpIconsCmd = 'cp resources/ios/Images.xcassets/AppIcon.appiconset/*.png ' + iosPlatformResources + '/icons',
		cpSplashCmd = 'cp resources/ios/Images.xcassets/LaunchImage.launchimage/*.png ' + iosPlatformResources + '/splash',
		cpMediaCmd = 'cp resources/ios/media/*.aiff ' + iosPlatformResources + '/media';
	
	if(fs.existsSync(iosPlatformResources)){
		//replace phonegaps icons
		exec('rm -rf ' + iosPlatformResources + '/icons');
		fs.mkdir(iosPlatformResources + '/icons');
		//replace phonegaps splashscreens
		exec('rm -rf ' + iosPlatformResources + '/splash');
		fs.mkdir(iosPlatformResources + '/splash');
		
		if(!fs.existsSync(iosPlatformResources + '/media')) {
			fs.mkdir(iosPlatformResources + '/media');
		}
		
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
		process.stdout.write('Copying iOS media content using command [' + cpMediaCmd + ']');
		result = exec(cpMediaCmd);
		if(result){
			process.stdout.write(result);
		}
	}
}

//function copyWindowsResources() {
//	var windowsPlatformDirectory = path.join(projectDir, 'platforms', 'windows'),
//	    projectResourcesDirectory = path.join(projectDir, 'resources', 'windows'),
//		cpImagesCmd = ('echo d | xcopy /v /e ' + (projectResourcesDirectory + '\\images ') + (windowsPlatformDirectory + '\\images')),
//		cpPagesCmd = ('echo d | xcopy /v /e ' + (projectResourcesDirectory + '\\pages ') + (windowsPlatformDirectory + '\\pages')),
//		cpScriptsCmd = ('echo d | xcopy /v /e ' + (projectResourcesDirectory + '\\scripts ') + (windowsPlatformDirectory + '\\scripts')),
//		cpStoreKeyCmd = ('echo f | xcopy /v /y ' + (projectResourcesDirectory + '\\FieldServiceMobile_StoreKey.pfx ') + (windowsPlatformDirectory + '\\CordovaApp_StoreKey.app')),
//		cpDevKeyCmd = ('echo f | xcopy /v /y ' + (projectResourcesDirectory + '\\FieldServiceMobile_TemporaryKey.pfx ') + (windowsPlatformDirectory + '\\CordovaApp_TemporaryKey.pfx'));
//	
//	if(fs.existsSync(windowsPlatformDirectory)){
////		if(fs.existsSync(windowsPlatformDirectory + '\\images')){
////			//replace phonegap icons
////			exec('rd /s /q ' + windowsPlatformDirectory + '\\images');
////		}
//		
////		if(fs.existsSync(windowsPlatformDirectory + '\\pages')){
////			//replace custom platform pages
////			exec('rd /s /q ' + windowsPlatformDirectory + '\\pages');			
////		}
////		
////		if(fs.existsSync(windowsPlatformDirectory + '\\scripts')){
////			//replace custom platform scripts
////			exec('rd /s /q ' + windowsPlatformDirectory + '\\scripts');
////		}
//		
////		process.stdout.write('Copying Windows images using command [' + cpImagesCmd + ']');
////		var result = exec(cpImagesCmd);
////		if(result){
////			process.stdout.write(result);
////		}
//		
////		process.stdout.write('Copying Windows custom pages using command [' + cpPagesCmd + ']');
////		result = exec(cpPagesCmd);
////		if(result){
////			process.stdout.write(result);
////		}
////		
////		process.stdout.write('Copying Windows custom scripts using command [' + cpScriptsCmd + ']');
////		result = exec(cpScriptsCmd);
////		if(result){
////			process.stdout.write(result);
////		}
//		
//		process.stdout.write('Copying Windows store key file using command [' + cpStoreKeyCmd + ']');
//		result = exec(cpStoreKeyCmd);
//		if(result){
//			process.stdout.write(result);
//		}
//		
//		process.stdout.write('Copying Windows developer key file using command [' + cpDevKeyCmd + ']');
//		result = exec(cpDevKeyCmd);
//		if(result){
//			process.stdout.write(result);
//		}
//	}
//}
