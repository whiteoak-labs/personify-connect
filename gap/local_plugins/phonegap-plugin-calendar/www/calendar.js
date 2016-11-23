var exec = require("cordova/exec");

calendarPlugin = function () {};

calendarPlugin.prototype.createEvent = function(event, success, error) {
  var timeZone = true;
  var data = {};
    if (event.startDate.toUpperCase().indexOf('Z') > 0 || event.endDate.toUpperCase().indexOf('Z') > 0) {
        var temp = new Date(event.startDate);
        var startDate = temp.getTime();
        temp = new Date(event.endDate);
        var endDate = temp.getTime();

        data.title = event.title;
        data.body = event.body;
        data.location = event.location;
        data.startDate = startDate;
        data.endDate = endDate;
    } else {
        timeZone = false;
        data = event;
    }

  exec(success, error, 'CalendarPlugin', 'addToCalendar', [data, {"timeZone":timeZone}]);
};

calendarPlugin.prototype.getCalendarList = function(response, err) {
    exec(response, err, "CalendarPlugin", "getCalendarList",[]);
};

calendarPlugin.prototype.deleteEvent = function(title, location, notes,
		startDate, endDate, deleteAll, successCallback, errorCallback) {
	throw "NotImplemented";
};

calendarPlugin.prototype.findEvent = function(title, location, notes,
		startDate, endDate, successCallback, errorCallback) {
	throw "NotImplemented";
};

calendarPlugin.prototype.modifyEvent = function(title, location, notes,
		startDate, endDate, newTitle, newLocation, newNotes, newStartDate,
		newEndDate, successCallback, errorCallback) {
	throw "NotImplemented";
};

module.exports = new calendarPlugin();
