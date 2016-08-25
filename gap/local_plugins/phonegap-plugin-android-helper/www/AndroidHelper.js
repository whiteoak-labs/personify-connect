var exec = require("cordova/exec");

androidHelper = function() {};

androidHelper.prototype.setPortrait = function() {
	return exec(null, null, 'AndroidHelper', 'portrait', []);
};

androidHelper.prototype.setSofKeyBoardResize = function(){
	return exec(null, null, 'AndroidHelper', 'adjustResize', []);
};

androidHelper.prototype.setSofKeyBoardPan = function(){
	return exec(null, null, 'AndroidHelper', 'adjustPan', []);
};

androidHelper.prototype.clearHistory = function(){
	return exec(null, null, 'AndroidHelper', 'clearHistory', []);
};

androidHelper.prototype.showOnMaps = function(data){
	return exec(null, null, 'AndroidHelper', 'geocoderMaps', [data]);
};

androidHelper.prototype.getPersonifyDataPath = function(success, fail){
    return cordova.exec(success, fail, "AndroidHelper", "personifyDataPath",[]);
};

androidHelper.prototype.writeInternalStorageFile = function(data) {
    return exec(null, null, 'AndroidHelper', 'writeInternalFile', [data]);
};

androidHelper.prototype.hideAndroidKeyBoard = function () {
    return exec(null, null, 'AndroidHelper', 'hideKeyBoard', []);
}

module.exports = new androidHelper();