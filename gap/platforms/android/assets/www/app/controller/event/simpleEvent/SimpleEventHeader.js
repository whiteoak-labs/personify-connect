Ext.define('Personify.controller.event.simpleEvent.SimpleEventHeader',{
    extend: 'Personify.base.Controller',
    requires: 'Personify.utils.ItemUtil',

    control: {
        daySession: true,
        timeSession: true,
        statusSession: true,
        titleHeaderDetail: true,
        price: true,
        memberPrice: true,
        labelMemberprice: true,
        labelListPrice: true,
        location: true,
        fullAddress: {
            onTapAddressList: 'onTapAddressList'
        },
        timeZone: true,
        shareButton: {
            tap: 'onTapShareButton'
        },
        shareCalendar: {
            tap: 'onTapShareCalendar'
        },
        inMySchedule: {
            tap: 'inMyScheduleTap'
        },
        mapItDetailComplex: {
            tap: 'onTapMapItDetail'
        }
    },

    config: {
        data: null,
        address: null
    },

    setRecord: function(record) {
        if(record != null) {
            this.updateAddRemoveButton(record);
            this.getView().setRecord(record);
            var me = this;
            var startTime = Personify.utils.ItemUtil.changeTimeSession(Personify.utils.ItemUtil.convertStringToDate(record.get('startDateTimeString')));
            var endTime = Personify.utils.ItemUtil.changeTimeSession(Personify.utils.ItemUtil.convertStringToDate(record.get('endDateTimeString')));
            var price = Personify.utils.ItemUtil.formatPurchaseAmount(record.get('price'), 2);
            var memberPrice = Personify.utils.ItemUtil.formatPurchaseAmount(record.get('memberPrice'), 2);
            var yourPrice = Personify.utils.ItemUtil.formatPurchaseAmount(record.get('yourPrice'), 2);
            var yourPriceRateStructure = record.get('yourPriceRateStructure')? record.get('yourPriceRateStructure').trim().toLowerCase() : 'list';
            var priceWidth = Personify.utils.ItemUtil.getWidthPrice(record.get('price'), record.get('memberPrice'), 9);
            var meetingTag = Personify.utils.ItemUtil.getMeetingTag(record.get('meetingTag'));
            var meetingTagCls = Personify.utils.ItemUtil.getMeetingTagCls(record.get('meetingTag'));
            var address = record.get('locationFullAddress').split('\r\n').join(', ');
            this.setAddress(address);

            me.getStatusSession().setHtml(meetingTag);
            me.getStatusSession().setCls(meetingTagCls);
            me.setData(record);
            me.getDaySession().setHtml(Personify.utils.ItemUtil.formatJSONDate(Personify.utils.ItemUtil.convertStringToDate(record.get('startDateTimeString'))));
            me.getTimeSession().setHtml(startTime + '<div class="type-time-p-headerdetailevent">to</div>' + endTime);
            me.getTitleHeaderDetail().setHtml(record.get('shortName'));
            me.getPrice().setHtml(price);
           
            var currentUser = Personify.utils.Configuration.getCurrentUser();
            if (currentUser && currentUser.isLogged()) {
                if(yourPriceRateStructure == 'list'){
                    me.getMemberPrice().setHtml(memberPrice);
                    me.getLabelListPrice().setHtml('Your Price: ');
                    me.getPrice().setHtml(yourPrice);
                    me.getLabelMemberprice().setHtml('Member Price :');
                }
                else
                {
                    me.getMemberPrice().setHtml(yourPrice);
                    me.getLabelMemberprice().setHtml('Your Price :');
                    me.getLabelListPrice().setHtml('List Price: ');
                }
                //me.getLabelMemberPrice().setWidth(priceWidth);
            }
            else{
                me.getMemberPrice().setHtml(memberPrice);
            }
            me.getPrice().setWidth(priceWidth);
            me.getMemberPrice().setWidth(priceWidth);
            me.getLocation().setHtml(record.get('location'));
            me.getFullAddress().setHtml(address);
            me.getTimeZone().setHtml(record.get('timeZoneCode'));
        }
    },

    inMyScheduleTap: function() {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if(currentUser && currentUser.isLogged()) {
            var isAdded = this.getView().getRecord().get('isAdded');
            if(isAdded) {
                me.getView().fireEvent('deleteagenda');
            } else {
                this.getView().fireEvent('addagenda');
            }
        } else {
            Personify.utils.ItemUtil.needToLogin();
        }
    },

    onTapShareButton: function(button, e, eOpts) {
        if (this.getData) {
            Personify.utils.ItemUtil.onShareEvent(this.getData());
        }
    },

    onTapShareCalendar: function() {
        var me = this;
        if (window.plugins.calendarPlugin && window.plugins.calendarPlugin['createEvent']) {
            var event = {};
            var data = me.getData();
            var title = data.get('shortName');
            var date = Personify.utils.ItemUtil.formatJSONDate(Personify.utils.ItemUtil.convertStringToDate(data.get('startDateTimeString')));
            var startTime = Personify.utils.ItemUtil.formatJSONDate(Personify.utils.ItemUtil.convertStringToDate(data.get('startDateTimeString')), "g:i a");
            var endTime = Personify.utils.ItemUtil.formatJSONDate(Personify.utils.ItemUtil.convertStringToDate(data.get('endDateTimeString')), "g:i a");
            var time = startTime + " - " + endTime;
            var location = data.get('locationFullAddress');
            var body = "Title: " + title + "\n" + "Date: " + date + "\n" + "Time: " + time + "\n" + "Location: " + location;
            event.title = title;
            event.location = location;
            event.startDate = data.get('startDateTime');
            event.endDate = data.get('endDateTime');
            event.body = body;
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

    onTapMapItDetail: function() {
        this.getView().fireEvent('onmaptap');
    },

    updateAddRemoveButton: function(record) {
        if(record.get('isAdded')) {
            this.getInMySchedule().setCls('p-button-RemoveSchedule');
            this.getInMySchedule().setHtml('Remove');
        } else {
            this.getInMySchedule().setCls('p-button-AddToSchedule');
            this.getInMySchedule().setHtml('Add to My<br/>Schedule');
        }
    },

    onTapAddressList: function() {
        var address = this.getAddress();

        if (address) {
            Personify.utils.ItemUtil.showAddressOnMaps(address);
        }
    }
});
