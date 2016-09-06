var exec = require("cordova/exec");

ExternalFileUtil = function() {};

ExternalFileUtil.prototype.openWith = function(path, uti, success, fail) {
  exec(success, fail, "ExternalFileUtil", "openWith", [path, uti]);
};

module.exports = new ExternalFileUtil();
