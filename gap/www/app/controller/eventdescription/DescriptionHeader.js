Ext.define('Personify.controller.eventdescription.DescriptionHeader',{
    extend: 'Personify.base.Controller',

    control: {
        timeLabel: true,
        titleOfEvent: true,
        locationFullAddress: {
            onTapAddressList: 'onTapAddressList'
        },
        location: true,
        inMySchedule: {
            tap: 'onAddToMyScheduleButton'
        },
        shareButton: {
            tap: 'onTapShareButton'
        },
        shareCalendar: {
            tap: 'onTapShareCalendar'
        }
    },

    config: {
        data: null,
        address: null
    },

    setRecord: function(record) {
        if(record) {
            this.getView().setRecord(record);
            var start = Ext.Date.format(Personify.utils.ItemUtil.convertStringToDate(record.get('startDateTimeString')),'F d');
            var end = Ext.Date.format(Personify.utils.ItemUtil.convertStringToDate(record.get('endDateTimeString')),'F d');
            var timeZone = record.get('timeZoneCode');
            this.getTimeLabel().setHtml(start + " - " + end + ' ' + timeZone);
            this.getTitleOfEvent().setHtml(record.get('shortName'));

            if(record.get('locationFullAddress')) {
                var address = record.get('locationFullAddress').split('\r\n').join('<br>');
                this.getLocationFullAddress().setHtml(address);
                this.setAddress(address);
            }
            this.getLocation().setHtml(record.get('location') );
            if(record.get('isAdded')) {
                this.getInMySchedule().setCls('p-button-RemoveSchedule');
                this.getInMySchedule().setHtml('Remove');
            } else {
                this.getInMySchedule().setCls('p-button-AddToSchedule');
                this.getInMySchedule().setHtml('Add to My<br/>Schedule')
            }
        }
    },

    onAddToMyScheduleButton: function() {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if(currentUser && currentUser.isLogged()) {
            var isAdded = this.getView().getRecord().get('isAdded');
            this.getView().fireEvent('inmyscheduletap', isAdded);
        } else {
            Personify.utils.ItemUtil.needToLogin();
        }
    },

    onTapShareButton: function(button, e, eOpts) {
        if (this.getView().getRecord()) {
            Personify.utils.ItemUtil.onShareEvent(this.getView().getRecord());
        }
    },

    onTapShareCalendar: function() {
        var me = this;
        if (window.plugins.calendarPlugin && window.plugins.calendarPlugin['createEvent']) {
            var event = {};
            var data = me.getView().getRecord();
            var title = data.get('shortName');
            var date = Personify.utils.ItemUtil.formatJSONDate(Personify.utils.ItemUtil.convertStringToDate(data.get('startDateTimeString')));
            var startTime = Personify.utils.ItemUtil.formatJSONDate(Personify.utils.ItemUtil.convertStringToDate(data.get('startDateTimeString')), "g:i a");
            var endTime = Personify.utils.ItemUtil.formatJSONDate(Personify.utils.ItemUtil.convertStringToDate(data.get('endDateTimeString')), "g:i a");
            var time = startTime + " - " + endTime;
            var location = data.get('locationFullAddress');
            var body = "Title: " + title + "\n" + "Date: " + date + "\n" + "Time: " + time + "\n" + "Location: " + location;
            event.title = title;
            event.location = location;
            event.body = body;
            event.startDate = data.get('startDateTime');
            event.endDate = data.get('endDateTime');
            event.calendarName = title;
            window.plugins.calendarPlugin.createEvent(event, function() {
                Ext.Msg.alert('', 'Saved to calendar successfully.', Ext.emptyFn);
            }, function() {
                if (Ext.os.is.Android){
                    Ext.Msg.alert('Calendar', 'To use this function, you have to allow this mobile application to access your contacts', Ext.emptyFn);
                }else{
                    Ext.Msg.alert('Calendar', 'To use this function, you have to allow this mobile application to access your contacts by changing iOS settings in Settings > Privacy > Calendars', Ext.emptyFn);
                }
            });
        }
    },

    onTapAddressList: function() {
        var address = this.getAddress();

        if (address) {
            Personify.utils.ItemUtil.showAddressOnMaps(address);
        }
    }
});
