var exec = require("cordova/exec");

PhoneDialer = function() {};

PhoneDialer.prototype.dial = function(phnum) {
  exec(null, null, "PhoneDialer", "dialPhone", [{"number": phnum}]);
};

module.exports = new PhoneDialer();
