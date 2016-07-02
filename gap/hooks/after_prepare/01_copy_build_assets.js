#!/usr/bin/env node

var fs = require("fs"),
    fse = require('fs-extra'),
    path = require('path'),
    exec = require('child_process').execSync,
    projectDir = process.argv[2];

if (projectDir) {
    var supportedPlatforms = process.env.CORDOVA_PLATFORMS.split(','),
        configDir = path.join(projectDir,'config');
        resourceDir = path.join(projectDir, 'resources'),
        assets = {
//            ios: [],
//            android: [{name: 'build-extras.gradle', src: path.join(configDir,'android'), dest: path.join(projectDir,'platforms','android')},
//                      {name: 'proguard.cfg', src: path.join(resourceDir, 'android'), dest: path.join(projectDir, 'platforms', 'android')}],
//            windows: []
        };
        
    console.log('Platforms:', supportedPlatforms);
    
    if(Array.isArray(supportedPlatforms)) {
	supportedPlatforms.forEach(function(platform) {
		console.log("Copying assets for", platform);

		if (assets[platform] && Array.isArray(assets[platform])) {
		    console.log('Assets:', assets[platform]);
		    assets[platform].forEach(function(item) {
		        copy(item.name, item.src, item.dest);
		    });
		}
	});
    }
}

function copy(name, src, dest) {
    if (name) {
        src = path.join(src,name);
        dest = path.join(dest,name);
    }
    console.log ('copying:', src, dest);
    fse.copySync(src, dest);
}


