cordova.define("net.dynagility.personify.calendar", function(require, exports, module) { //
// Cordova Calendar Plugin
// Author: Felix Montanez 
// Created: 01-17-2012
//
// Contributors:
// Michael Brooks


function calendarPlugin()
{
}



calendarPlugin.prototype.createEvent = function(event, success, error) {
    cordova.exec(success, error,"calendarPlugin","createEvent", [event]);
};

calendarPlugin.prototype.getCalendarList = function(response, err) {
    cordova.exec(response, err, "calendarPlugin", "getCalendarList",[]);
};

// More methods will need to be added like fetch events, delete event, edit event

calendarPlugin.install = function()
{
    if(!window.plugins)
    {
        window.plugins = {};
    }
    
    window.plugins.calendarPlugin = new calendarPlugin();
    return window.plugins.calendarPlugin;
};

cordova.addConstructor(calendarPlugin.install);

});
