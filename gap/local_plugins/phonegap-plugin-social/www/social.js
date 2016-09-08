var exec = require("cordova/exec");

Social = function () {};

Social.prototype.available = function(callback) {
  exec(callback, null, "Social", "available", []);
}

Social.prototype.share = function(message, url, image) {
  exec(null, null, "Social", "share", [message, image, url]);
};

module.exports = new Social();
