var exec = require("cordova/exec");

PhoneDialer = function() {};

PhoneDialer.prototype.dial = function(phnum, option) {
  exec(null, null, "PhoneDialer", "dialPhone", [{ "number" : phnum, "option" : option }]);
};

module.exports = new PhoneDialer();
