
var applicationPreferences = function() {}

applicationPreferences.prototype.get = function(key,success,fail)
{
    var args = {};
    args.key = key;
    if (cordova && cordova['exec'])
        cordova.exec(success,fail,"applicationPreferences","getSetting",[args]);
};

applicationPreferences.prototype.set = function(key,value,success,fail)
{
    var args = {};
    args.key = key;
    args.value = value;
    if (cordova && cordova['exec'])
        cordova.exec(success,fail,"applicationPreferences","setSetting",[args]);
};

applicationPreferences.prototype.getString = function(key,success,fail)
{
    var args = {};
    args.key = key;
    if (cordova && cordova['exec'])
        cordova.exec(success,fail,"applicationPreferences","getString",[args]);
};

applicationPreferences.prototype.setString = function(key,value,success,fail)
{
    var args = {};
    args.key = key;
    args.value = value;
    if (cordova && cordova['exec'])
        cordova.exec(success,fail,"applicationPreferences","setString",[args]);
};

applicationPreferences.install = function()
{
    if(!window.plugins) {
        window.plugins = {};
    }
    if (!window.plugins.applicationPreferences) {
        window.plugins.applicationPreferences = new applicationPreferences();
    }

    return window.plugins.applicationPreferences;
};

cordova.addConstructor(applicationPreferences.install);
