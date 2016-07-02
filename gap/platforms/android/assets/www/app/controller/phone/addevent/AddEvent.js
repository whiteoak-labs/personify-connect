Ext.define('Personify.controller.phone.addevent.AddEvent',{
    extend: 'Personify.base.Controller',
    control: {
        singledayButton:{
            tap: 'onSingleDayTap'
        },
        multipledayButton: {
            tap: 'onMultipleDaysTap'
        },
        eventDayCard: true,
        bothDatePicker: {
            change: 'onBothDatePickerChanged',
            show: 'hideAndroidKeyBoard'
        },
        startDatePicker: {
            change: 'onStartDatePickerChanged',
            show: 'hideAndroidKeyBoard'
        },
        endDatePicker: {
            change: 'onEndDatePickerChanged',
            show: 'hideAndroidKeyBoard'
        },
        singleStartTime: {
            change: 'onSingleStartTimeChanged',
            show: 'hideAndroidKeyBoard'
        },
        singleEndTime: {
            change: 'onSingleEndTimeChanged',
            show: 'hideAndroidKeyBoard'
        },
        eventTitle: true,
        eventDescription: true,
        eventLocation: true,
        eventToolbar: {
            onNavigationButtonTap: 'onBack',
            actionButtonTap: 'onAddPersonalEventButtonTap'
        }
    }, // end control

    config: {
        startDate: new Date(),
        endDate: new Date(),
        isSingleDate: true
    },

    init: function() {
        if (window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Session Add To Calendar');
        }
        this.getEventToolbar().getController().setActionText('Done');
        this.updateDate();
    },

    updateDate: function(){
        var startTime, endTime, startDate, endDate;

        startTime = Personify.utils.ItemUtil.roundMinutes(new Date());

        if (startTime.getHours() == 23) {
            endTime = new Date();
            endTime.setHours(23);
            endTime.setMinutes(59);
        } else {
            endTime = Personify.utils.ItemUtil.oneHourLater(new Date());
        }

        startDate = Personify.utils.ItemUtil.roundMinutes(new Date());
        endDate = Personify.utils.ItemUtil.oneDateLater(startDate);

        this.getStartDatePicker().setValue(startDate);
        this.getEndDatePicker().setValue(endDate);

        this.getSingleStartTime().setValue(startTime);
        this.getSingleEndTime().setValue(endTime);
        this.getBothDatePicker().setValue(startTime);

        if (this.getIsSingleDate()) {
            this.setStartDate(startTime);
            this.setEndDate(endTime);
        } else {
            this.setStartDate(startDate);
            this.setEndDate(endDate);
        }
    },

    onSingleDayTap: function() {
        this.setIsSingleDate(true);
        this.updateDate();

        this.getEventDayCard().setHeight(162);
        this.getEventDayCard().animateActiveItem(0, {type:'slide',direction: 'right',duration: 500});
    },

    onMultipleDaysTap: function(){
        this.setIsSingleDate(false);
        this.updateDate();

        this.getEventDayCard().setHeight(108);
        this.getEventDayCard().animateActiveItem(1, {type:'slide',direction: 'left',duration: 500});
    },

    onBothDatePickerChanged: function(picker, value) {
        var date = Ext.Date.format(this.getBothDatePicker().getValue(), 'm/d/Y');
        var startTime = Ext.Date.format(this.getSingleStartTime().getValue(), 'h:i A');
        var endTime = Ext.Date.format(this.getSingleEndTime().getValue(), 'h:i A');
        this.getSingleStartTime().setValue(Ext.Date.parse(date + ' ' + startTime, 'm/d/Y h:i A'));
        this.getSingleEndTime().setValue(Ext.Date.parse(date + ' ' + endTime, 'm/d/Y h:i A'));

        this.setStartDate(this.getSingleStartTime().getValue());
        this.setEndDate(this.getSingleEndTime().getValue());
    },

    onSingleStartTimeChanged: function(picker, value){
        if (typeof value == 'object') {
            value = Ext.Date.format(value, 'h:i A');
        }

        var date = Ext.Date.format(this.getBothDatePicker().getValue(), 'm/d/Y');
        var newStartTimeValue = Ext.Date.parse(date + ' ' + value, 'm/d/Y h:i A');
        var temp = Ext.Date.format(this.getSingleEndTime().getValue(), 'h:i A');
        var currentEndTime = Ext.Date.parse(date + ' ' + temp, 'm/d/Y h:i A');

        this.setStartDate(newStartTimeValue);

        if (newStartTimeValue > currentEndTime) {
            this.getSingleEndTime().setValue(newStartTimeValue);
            this.setEndDate(newStartTimeValue);
        } else {
            this.setEndDate(currentEndTime);
        }
    },

    onSingleEndTimeChanged: function(picker, value){
        if (typeof value == 'object') {
            value = Ext.Date.format(value, 'h:i A');
        }

        var date = Ext.Date.format(this.getBothDatePicker().getValue(), 'm/d/Y');
        var newEndTimeValue = Ext.Date.parse(date + ' ' + value, 'm/d/Y h:i A');
        var temp = Ext.Date.format(this.getSingleStartTime().getValue(), 'h:i A');
        var currentStartTime = Ext.Date.parse(date + ' ' + temp, 'm/d/Y h:i A');

        this.setEndDate(newEndTimeValue);

        if (newEndTimeValue < currentStartTime) {
            this.getSingleStartTime().setValue(newEndTimeValue);
            this.setStartDate(newEndTimeValue);
        } else {
            this.setStartDate(currentStartTime);
        }
    },

    onStartDatePickerChanged: function(picker, value) {
        value = new Date(value);
        this.setStartDate(picker.getValue());
        if (value > this.getEndDate()) {
            this.setEndDate(picker.getValue());
            this.getEndDatePicker().setValue(picker.getValue());
        }
    },

    onEndDatePickerChanged: function(picker, value) {
        value = new Date(value);
        this.setEndDate(picker.getValue());
        if (value < this.getStartDate()) {
            this.setStartDate(picker.getValue());
            this.getStartDatePicker().setValue(picker.getValue());
        }
    },

    onAddPersonalEventButtonTap: function() {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }

        this.getEventTitle().blur();
        this.getEventDescription().blur();
        this.getEventLocation().blur();
        Ext.Viewport.setMasked({xtype: 'loadmask',  message: 'Saving...'});
        var title = this.getEventTitle().getValue();
        title = title ? title.trim() : '';

        var description = this.getEventDescription().getValue();
        description = description ? description.trim() : '';

        var location = this.getEventLocation().getValue();
        location = location ? location.trim() : '';

        var startDate = this.getStartDate();
        var endDate = this.getEndDate();

        var error = '';

        if (title == '') {
            error += 'Event Name <br>';
        }

        if(description == ''){
            error += 'Event Details <br>';
        }

        if (error == '') {
            this.addNewCustomerMeetingAgenda(title, description, startDate, endDate, location);
        } else {
            var errorMsg = "Please check your input for: <br>" + error;
            Ext.Msg.alert('', errorMsg, Ext.emptyFn);
            Ext.Viewport.setMasked(false);
        }
    },

    addNewCustomerMeetingAgenda: function(title, description, startDate, endDate, location) {
        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var record = this.getView().getRecord();
        var productId = 0;
        var titleOfPanel = 'Personal event';

        if (record) {
            productId = record.get('productID');
        }

        if (productId) {
            titleOfPanel = 'Personal session';
        }

        currentUser.addPersonalEvent(title, description, startDate, endDate, location, productId).then({
                success: function(recordsResponse) {
                    me.getView().fireEvent('refreshagenda', recordsResponse, true, function(success, appointmentId, shouldNotBack) {
                        if (Ext.typeOf(shouldNotBack) == 'boolean') {
                            if (!shouldNotBack) {
                                me.getView().fireEvent('back', me);
                            }
                        } else {
                            me.getView().fireEvent('back', me);
                        }
                    });
                    Ext.Msg.alert('', titleOfPanel + ' has been added to your schedule.');
                },
                failure: function() {
                    Ext.Msg.alert('', 'Error occurred while adding ' + titleOfPanel);
                }
            }).always(
            function() {
                Ext.Viewport.setMasked(false);
            }
        );
    },

    onBack: function() {
        var me = this;
            thisView = me.getView();
        thisView.fireEvent('back',this);
    },

    hideAndroidKeyBoard: function() {
        this.getEventTitle().blur();
        this.getEventDescription().blur();
        this.getEventLocation().blur();

        if (Ext.os.is('Android')) {
            if (window.plugins.androidHelper) {
                window.plugins.androidHelper.hideAndroidKeyBoard();
            }
        }
    }
});
