var exec = require('cordova/exec');

applicationPreferences = function() {}

applicationPreferences.prototype.get = function(key,success,fail)
{
    var args = {};
    args.key = key;
    exec(success,fail,"ApplicationPreferences","getSetting",[args]);
};

applicationPreferences.prototype.set = function(key,value,success,fail)
{
    var args = {};
    args.key = key;
    args.value = value;
    exec(success,fail,"ApplicationPreferences","setSetting",[args]);
};

applicationPreferences.prototype.getString = function(key,success,fail)
{
    var args = {};
    args.key = key;
    exec(success,fail,"ApplicationPreferences","getString",[args]);
};

applicationPreferences.prototype.setString = function(key,value,success,fail)
{
    var args = {};
    args.key = key;
    args.value = value;
    exec(success,fail,"ApplicationPreferences","setString",[args]);
};

module.exports = new applicationPreferences();
