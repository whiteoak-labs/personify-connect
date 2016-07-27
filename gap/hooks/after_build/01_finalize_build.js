#!/usr/bin/env node

var fs = require('fs'),
	path = require('path'),
	exec = require('child_process').execSync,	
	glob = require('glob'),
	fse = require('fs-extra'),
	zlib = require('zlib'),
	projectDir = process.argv[2];

if(fs.existsSync(projectDir)) {
	var androidPlatform = path.join(projectDir, 'platforms', 'android'),
		iosPlatform = path.join(projectDir, 'platforms', 'ios');
		
	if(fs.existsSync(androidPlatform)){
		finalizeAndroid(androidPlatform);		
	}
	
	if(fs.existsSync(iosPlatform)){
	    finalizeIOS(iosPlatform);
	}
}

function finalizeAndroid(platformDir) {
	if(fs.existsSync(platformDir)) {
		var dir = path.join(platformDir, 'build','outputs','apk'),
			buildArtifactDir = path.join(projectDir, 'target', 'android'),
			debugArtifacts = glob.sync(path.join(dir, '*-debug.apk'), {nonull:true}),
			releaseArtifacts = glob.sync(path.join(dir, '*-release*.apk'), {nonull:true}),
            artifactName = 'PersonifyConnect',
			finalDebugArtifactPath = path.join(buildArtifactDir, artifactName + '-debug-signed.apk'),
			finalReleaseArtifactPath = path.join(buildArtifactDir, artifactName + '-release-signed-aligned.apk'),
			keystore = path.join(projectDir, 'resources', 'android', 'personify-release.keystore'),
			mappingDir = path.join(platformDir, 'build', 'outputs', 'mapping'),
			result;
		
		if(buildArtifactDir && !fs.existsSync(buildArtifactDir)){
			fs.mkdir(buildArtifactDir);
		}
		
		console.log('dir', dir);
                console.log('artifactDir', buildArtifactDir);
                console.log('debugArtifacts', debugArtifacts);
                console.log('releaseArtifacts', releaseArtifacts);
                console.log('target', finalReleaseArtifactPath);
        
		if(Array.isArray(debugArtifacts) && debugArtifacts.length > 0){
			debugArtifacts.forEach(function(artifact){
				if(fs.existsSync(artifact)){
					console.log('Signing Android Debug APK');
					result = exec('zip -d ' + artifact + ' META-INF/\*');
					result = exec('jarsigner -keystore ' + keystore + ' -storepass nDbS9nSNjYIDQj3TQYFo9VJ1ofVDMF -keypass nDbS9nSNjYIDQj3TQYFo9VJ1ofVDMF ' + ' -sigalg  SHA1withRSA -digestalg SHA1 ' + artifact + ' personify-key');
					if(result){
						process.stdout.write(result);
					}	
					
					var basename = path.basename(artifact);
                                        
					console.log("basename:", basename);
                                        basename = artifactName + basename.substring(basename.indexOf("-"));
					fse.copySync(artifact, finalDebugArtifactPath);
				}
			});
		}
		
		if(Array.isArray(releaseArtifacts) && releaseArtifacts.length > 0){
			var artifact = releaseArtifacts[0];
			
			if(fs.existsSync(artifact)){
				console.log('Signing Android release APK');
				result = exec('jarsigner -keystore ' + keystore + ' -storepass nDbS9nSNjYIDQj3TQYFo9VJ1ofVDMF -keypass nDbS9nSNjYIDQj3TQYFo9VJ1ofVDMF ' + ' -sigalg  SHA1withRSA -digestalg SHA1 ' + artifact + ' personify-key');
				
				if(result){
					process.stdout.write(result);
				}
				
		    	         console.log('Zipaligning Android release APK');
		    	         result = exec('zipalign -f -v 4 ' + artifact + ' ' + finalReleaseArtifactPath);
			    
				if(result){
			    	    process.stdout.write(result);
			        }	
			}			
		}
		
		if(fs.existsSync(mappingDir)) {
			console.log('Copying Proguard mapping files');
			fse.copySync(mappingDir, buildArtifactDir);
		}
	}
}

function finalizeIOS(platformDir) {
	if(fs.existsSync(platformDir)) {
		var phonegapCLI = process.env.CORDOVA_CMDLINE,
			buildDir = path.join(platformDir, 'build', 'device'),
			buildArtifact = path.join(buildDir, 'PersonifyConnect.app'),
			finalArtifactDir = path.join(projectDir, 'target', 'ios'),
			result;
			
		if(fs.existsSync(buildDir + '/Payload')){
			result = exec('rm -rf '+ (buildDir + '/Payload'));
			if(result){
				process.stdout.write(result);
			}
		}
		
		result = exec('mkdir '+ (buildDir + '/Payload'));
		if(result) {
			process.stdout.write(result);
		}
		
		if(!fs.existsSync(finalArtifactDir)) {
			result = exec('mkdir '+ finalArtifactDir);
			if(result) {
				process.stdout.write(result);
			}
		}
		
		if(fs.existsSync(buildArtifact)) {
			result = exec('cp -a \'' + buildArtifact +  '\' ' + (buildDir + '/Payload'));
			if(result) {
				process.stdout.write(result);
			}
		}
		
	    if(phonegapCLI.indexOf('debug') !== -1){
	    	console.log('Creating iOS Debug IPA');
	    	try{
	    		process.chdir(buildDir);
	    		result = exec('/usr/bin/zip -vr ' + finalArtifactDir + '/PersonifyConnect-debug.ipa ./Payload/');
	    		if(result) {
					process.stdout.write(result);
				}
	    	}
			catch(e) {
				if(e) {
					console.log(e);
					throw e;
				}
			}
		}
		
	    if(phonegapCLI.indexOf('release') !== -1){
	    	console.log('Creating iOS Release IPA');
	    	try{
	    		process.chdir(buildDir);
	    		result = exec('/usr/bin/zip -vr ' + projectDir + '/target/ios/PersonifyConnect-release.ipa ./Payload/', {cwd: buildDir});
	    		if(result) {
	    			process.stdout.write(result);
	    		}
	    	}
	    	catch(e) {
				if(e) {
					console.log(e);
					throw e;
				}
			}
		}
	}
}
