Ext.define('Personify.controller.event.complexevent.detailsession.SessionHeaderDetail',{
    extend: 'Personify.base.Controller',

    control: {
        daySession: true,
        timeSession: true,
        statusSession: true,
        titleHeaderDetail: true,
        price: true,
        memberPrice: true,
        labelMemberPrice: true,
        labelListPrice: true,
        location: true,
        timeZone: true,
        shareButton: {
            tap: 'onTapShareButton'
        },
        shareCalendar: {
            tap: 'onTapShareCalendar'
        },
        inMySchedule: {
            tap: 'onInMyScheduleTap'
        },
        mapItDetailComplex: {
            tap: 'onTapMapItDetail'
        },
        backToSessionList: {
            tap: 'backToSessionList'
        }
    },

    config: {
        data: null
    },

    setRecord: function(record) {           
        if(record.get('isAdded')){
            this.getInMySchedule().setCls('p-button-RemoveSchedule');
            this.getInMySchedule().setHtml('Remove');
        }else{
            this.getInMySchedule().setCls('p-button-AddToSchedule');
            this.getInMySchedule().setHtml('Add to My<br/>Schedule');
        }
        this.getView().setRecord(record);
        var me = this;
        var startTime = Personify.utils.ItemUtil.changeTimeSession(Personify.utils.ItemUtil.convertStringToDateSession(record.get('startDateTimeString')));
        var endTime = Personify.utils.ItemUtil.changeTimeSession(Personify.utils.ItemUtil.convertStringToDateSession(record.get('endDateTimeString')));
        var priceValue = record.get('price')? record.get('price'): 0;
        var mbpriceValue = record.get('memberPrice')? record.get('memberPrice'): 0;
        var yrpriceValue = record.get('yourPrice')? record.get('yourPrice'): 0;
        var yourPriceRateStructure = record.get('yourPriceRateStructure')? record.get('yourPriceRateStructure').trim().toLowerCase() : 'list';
        var price = Personify.utils.ItemUtil.formatPurchaseAmount(priceValue, 2);
        var memberPrice = Personify.utils.ItemUtil.formatPurchaseAmount(mbpriceValue, 2);
        var yourPrice = Personify.utils.ItemUtil.formatPurchaseAmount(yrpriceValue, 2);
        var htmlStatusSession = Personify.utils.ItemUtil.checkProductStatus(record.get('productStatus'));

        me.setData(record);
        me.getDaySession().setHtml(Personify.utils.ItemUtil.formatJSONDate(Personify.utils.ItemUtil.convertStringToDateSession(record.get('startDateTimeString'))));
        me.getTimeSession().setHtml(startTime + '<div class="type-time-p-headerdetailevent">to</div>' + endTime);
        me.getStatusSession().setHtml(htmlStatusSession);
        me.getTitleHeaderDetail().setHtml(record.get('title'));
        me.getPrice().setHtml(price );
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if (currentUser.isLogged()) {
           if(yourPriceRateStructure == 'list')
           {
            me.getLabelMemberPrice().setHtml('Member Price : ');
            me.getMemberPrice().setHtml(memberPrice);
            me.getLabelListPrice().setHtml('Your Price: ');
            me.getPrice().setHtml(yourPrice);
           }
           else
           {
            me.getMemberPrice().setHtml(yourPrice);
            me.getLabelMemberPrice().setHtml('Your Price : ');
            me.getLabelListPrice().setHtml('List Price: ');
           }
           
        }else{
           me.getMemberPrice().setHtml(memberPrice);
        }
        
        me.getLocation().setHtml(record.get('locationDescription'));
        me.getTimeZone().setHtml(record.get('timeZoneCode'));

        if(record){
            if (!record.get('location') || record.get('location') === '') {
                this.getMapItDetailComplex().hide();
            } else {
                this.getMapItDetailComplex().show();
                var mapData = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('mapData');

                if (mapData) {
                    var locationTemp = mapData.locations[record.get('location')];

                    if (!locationTemp) {
                        this.getMapItDetailComplex().hide();
                    }
                }
            }
        }
    },

    backToSessionList: function() {
        if (!Personify.utils.Configuration.getAllowChangeView()) {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
            return;
        }
        this.getView().getParent().getParent().getParent().setActiveItem(0);
    },

    onTapMapItDetail: function() {
        if (Personify.utils.Configuration.getAllowChangeView()) {
            this.getView().fireEvent('onmaptap');
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },

    onInMyScheduleTap: function() {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }

        if (Personify.utils.Configuration.getAllowChangeView()) {
            var currentUser = Personify.utils.Configuration.getCurrentUser();
            if(currentUser && currentUser.isLogged()){
                var isAdded = this.getView().getRecord().get('isAdded');
                this.getView().fireEvent('oninmyscheduletap', isAdded);
            }else{
                Personify.utils.ItemUtil.needToLogin();
            }
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },

    onTapShareButton: function() {
        if (Personify.utils.Configuration.getAllowChangeView()) {
            Personify.utils.ItemUtil.onShareSessionDetail(this.getData());
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },

    onTapShareCalendar: function() {
        if (Personify.utils.Configuration.getAllowChangeView()) {
            var me = this;
            if (window.plugins.calendarPlugin && window.plugins.calendarPlugin['createEvent']) {
                var data = me.getData();
                var event = {};
                var title = data.get('title');
                var startDate = new Date(data.get('startDateTimeString'));
                var endDate = new Date(data.get('endDateTimeString'));
                var location = data.get('locationDescription');
                var time = Personify.utils.ItemUtil.formatJSONDate(data.get('startDateTimeString'), "g:i a") + " - " + Personify.utils.ItemUtil.formatJSONDate(data.get('endDateTimeString'), "g:i a");
                var date = Personify.utils.ItemUtil.formatJSONDate(startDate) + " - " + Personify.utils.ItemUtil.formatJSONDate(endDate);
                body = "Title: " + title + "\n" + "Date: " + date + "\n" + "Time: " + time + "\n";

                if (location && location != "") {
                    body += "Location: " + location;
                }

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
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    }
});
