Ext.define('Personify.utils.ItemUtil', {
    xtype : 'itemutil',
    requires: ['Ext.MessageBox'],

    inject: [
        'personify'
    ],
    requires: ['Ext.MessageBox'],

    config : {
        user: 'abc',
        personify: null
    },

    statics : {
        searchItemsAndUpdateEditMode: function(item, newValue, oldValue) {
            try {
                item.setEditmode(newValue);
            } catch (exception) {
                try {
                    var subItems = item.getItems().items;
                    if(subItems.length != 0) {
                        for (var i = 0; i < subItems.length; i++) {
                            this.searchItemsAndUpdateEditMode(subItems[i],
                                    newValue, oldValue);
                        }
                    }
                } catch (exception) {

                }
            }
        },

        getDate:function(jsonDate) {
            var tempDate = jsonDate.replace('/Date(',"");
            tempDate = tempDate.replace(")/","");
            return tempDate;
        },

        searchItemsAndSetParameter: function(item, newValue, oldValue) {
            try {
                item.setContactparameters(newValue);
            } catch (exception) {
                try {
                    var subItems = item.getItems().items;
                    if(subItems.length != 0) {
                        for(var i = 0; i < subItems.length; i++) {
                            this.searchItemsAndSetParameter(subItems[i],
                                    newValue, oldValue);
                        }
                    }
                } catch(exception) {
                    //dont do anything
                }
            }
        },

        formatJSONFullDate: function(jsonDate) {
            if (jsonDate != null) {
                var date = new Date(jsonDate);
                return Ext.Date.format(date, "M d, Y");
            } else {
                return '';
            }
        },

        formatIso8601Date: function(dateString, format) {
            var date = '',
                formatTime = format || 'm/d/Y';

            if (dateString) {
                date = Ext.Date.format(Personify.utils.ItemUtil.convertStringToDate(dateString), formatTime);
            }
            return date;
        },

        formatJSONDate: function(jsonDate,format) {
           var date = '',
               formatTime = format || 'm/d/Y';
           if(jsonDate) {
               date = Ext.Date.format(new Date(jsonDate), formatTime);
           }
            return date;
        },

        formatPurchaseHistoryDate: function(jsonDate) {
            var arrayJsonDate = jsonDate.substring(0, 10).split('-');
            var date = new Date(arrayJsonDate[0], arrayJsonDate[1], arrayJsonDate[2]);
            return Ext.Date.format(date, "M d, Y");
        },

        formatParticipationDate: function(jsonDate,format) {
            var date = 'unknow',
            formatTime = format || 'm/d/Y';
            if(jsonDate) {
                var arrayJsonDate = jsonDate.substring(0, 10).split('-');
                date = Ext.Date.format(new Date(arrayJsonDate[0], arrayJsonDate[1], arrayJsonDate[2]), formatTime);
            }
             return date;
        },

        //format: "ActivityDate": "2013 02 25 T085201Z"
        formatContactTrackingDate: function(activityDate) {
            var formattedDate = '';
            if(activityDate) {
                var year = activityDate.substring(0,4);
                var month = activityDate.substring(4,6);
                var day = activityDate.substring(6,8);
                formattedDate = month + '/' + day + '/' + year;
            }
            return formattedDate;
        },

        formatDate: function(stringDate) {
            var date = new Date(stringDate);
            return Ext.Date.format(date, "M. d, Y");
        },

        formatPurchaseAmount: function(amount, numberOfDecimals) { //add 2 decimal to the following of number if it doesn't have
            var amountString = amount.toString();
            var currentDecimal;
            if(amountString.indexOf('.') != -1) {
                currentDecimal = amountString.length - (amountString.indexOf('.') + 1)
            } else {
                currentDecimal = 0;
                amountString = amountString + ".";
            }
            var addTime = (numberOfDecimals - currentDecimal) > 0 ? (numberOfDecimals - currentDecimal) : 0;
            for(var j=0; j<addTime; j++) {
                amountString = amountString + "0";
            }
            // add comma to number
            while (/(\d+)(\d{3})/.test(amountString)) {
                amountString = amountString.replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
            }

            return '<div style="float: left;">' + Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.get('currencySymbol') + '</div><div style="float: right;">' + amountString + "&nbsp;" + Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.get('currency') + '</div>';
        },

        formatOrderComfirmAmount: function(currencySymbol, amount) {
            var currency = Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.get('currency');
            amount = amount.toFixed(2);
            var amountString = amount.toString();
            // add comma to number
            while (/(\d+)(\d{3})/.test(amountString)) {
                amountString = amountString.replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
            }
            return '<div style="float:left;">' + currencySymbol + '</div><div style="float: right;">' +  amountString + "&nbsp;" + currency + '</div>';
        },

        checkStringNull: function(string) {
            if(string == null || string == "") {
                return '';
            } else {
                return string;
            }
        },

        displayImage: function(imageURL) {
            if(imageURL == null || imageURL == "") {
                return 'resources/icons/phone/defaultAvatar.png';
            } else {
                return imageURL;
            }
        },

        checkProductStatus: function(status) {
            if(status) {
                return (status == 'A' || status == '') ? '':'<div class="p-label-soldOut">Sold Out</div>';
            } else {
                return '';
            }
        },

        getShortContent: function(title, length) {
            var tempLength = length;

            if(title.length <= length) {
                return title;
            }
            var content = title.substring(0, length);

            while((content.charAt(length - 1) != ' ') && (content.charAt(length - 1) != ',')
                    && (content.charAt(length - 1) != '.') && (content.charAt(length - 1) != '?')
                    && (length > 0)) {
                content = content.substring(0, --length);
            }
            if(title.length > tempLength) {
                content += " ...";
            }
            return content;
        },

        getReturnContent: function(text) {
            while(text.indexOf('\n') != -1) {
                text = text.replace('\n', '<br />');
            }
            return text;
        },

        getDayEventView: function(icalStr) {
            return icalStr.getDate();
        },

        getMonthEventView: function(icalStr) {
            return Ext.Date.format(icalStr,'F');
        },

        getYearEventView: function(icalStr) {
             return icalStr.getFullYear();
        },

        getHourEventView: function(icalStr) {
            return Ext.Date.format(icalStr, 'g:i A');
        },

        getDateEventView: function(icalStr) {
            return Ext.Date.format(icalStr, 'm/d/y');
        },

        formatXMLDate: function(xmlDate) {
            /*var bits = xmlDate.split(/[-T:]/g);
            var d = new Date(bits[0], bits[1]-1, bits[2]);
            d.setHours(bits[3], bits[4], bits[5]);*/
            return xmlDate;
        },

        convertMilisecondToString: function(milis, format) {
            var date = new Date(milis);
            return Ext.Date.format(date, format);
        },
        timeAgoInWords: function(date){
            try {
                var now = Math.ceil(Number(new Date()) / 1000),
                    dateTime = Math.ceil(Number(new Date(date)) / 1000),
                    diff = now - dateTime,
                    str;

                if (diff < 60) {
                    return String(diff) + ' seconds ago';
                } else if (diff < 3600) {
                    str = String(Math.ceil(diff / (60)));
                    return str + (str == "1" ? ' minute' : ' minutes') + ' ago';
                } else if (diff < 86400) {
                    str = String(Math.ceil(diff / (3600)));
                    return str + (str == "1" ? ' hour' : ' hours') + ' ago';
                } else if (diff < 60 * 60 * 24 * 7) {
                    str = String(Math.ceil(diff / (60 * 60 * 24)));
                    return str + (str == "1" ? ' day' : ' days') + ' ago';
                }else if (diff < 60 * 60 * 24 * 30) {
                    str = String(Math.ceil(diff / (60 * 60 * 24 * 7)));
                    return str + (str == "1" ? ' week' : ' weeks') + ' ago';
                }else if (diff < 60 * 60 * 24 * 30 * 12) {
                    str = String(Math.ceil(diff / (60 * 60 * 24 * 30)));
                    return str + (str == "1" ? ' month' : ' months') + ' ago';
                }else {
                    return Ext.Date.format(new Date(date), "m/d/Y");
                }
            } catch (e) {
                return '';
            }
        },

        getClsNotification: function(read) {
            if(read){
                return 'p-panel-notification-title-read';
            }else{
                return "p-panel-notification-title-noread";
            }
        },

        getClsTitleItemNotificationPhone: function(read) {
            if(read){
                return 'itemNotificationReadPhone';
            }else{
                return 'itemNotificationUnReadPhone';
            }
        },

        convertMilisecondToDatePhone: function(milis) {
            var milis = milis.substr(milis.indexOf('(')+1);
            milis = milis.substr(0, milis.length - 2);

            var date = new Date(parseInt(milis));
            var currentDate = new Date();
            var dateMilis = parseInt(currentDate - date);
            var actualSubtractDate = (dateMilis/(24 * 60 * 60 * 1000));
            var roundedDate = parseInt(actualSubtractDate);
            var subtractDate = new Array();
            subtractDate[0] = roundedDate + " days ago...";

            if(parseInt(roundedDate) == 1) {
                subtractDate[0] = roundedDate + " day ago...";
            }

            var remainingDate = actualSubtractDate - roundedDate;
            var actualSubtractHour = remainingDate * 24;
            var subtractHour = parseInt(actualSubtractHour);
            var remainingHour = actualSubtractHour - subtractHour;
            var actualMin =  remainingHour * 60;
            var subtractMin = parseInt(actualMin);
            subtractDate[1] = roundedDate + " Days " + subtractHour + " Hours " + subtractMin + " Minutes ago";
            return subtractDate;
        },

        getFormattedNumber: function(string) {
            if(parseInt(string) < 10) {
                string = "0" + string.toString();
            }
            return string;
        },

        getDisplaysStartTimeOrDateRange: function (start, end) {
            if(Ext.Date.format(start, 'm/d/y') == Ext.Date.format(end, 'm/d/y')) {
                return this.getHourEventView(start) + ' - ' + this.getHourEventView(end);
            } else {
                return this.getDateEventView(start) + ' - ' + this.getDateEventView(end);
            }
        },

        getDisplayTimeForEvent: function(startDateTimeString, endDateTimeString, timeZoneCode, isConference) {
            var start = Personify.utils.ItemUtil.convertStringToDate(startDateTimeString);
            var end = Personify.utils.ItemUtil.convertStringToDate(endDateTimeString);

            if (Ext.Date.format(start, 'm/d/y') == Ext.Date.format(end, 'm/d/y')) {
                if (isConference) {
                    return this.getDateEventView(start);
                } else {
                    var displayTime = this.getHourEventView(start) + ' ' + ' - ' + this.getHourEventView(end);

                    if (timeZoneCode) {
                        displayTime += ' ' + timeZoneCode;
                    }

                    return displayTime;
                }
            } else {
                return this.getDateEventView(start) + ' - ' + this.getDateEventView(end);
            }
        },

        getDisplaysTimeWithTimeZoneCode: function (values) {
            var start = Personify.utils.ItemUtil.convertStringToDate(values.startDateTimeString);
            var end = Personify.utils.ItemUtil.convertStringToDate(values.endDateTimeString);
            if(Ext.Date.format(start, 'm/d/y') == Ext.Date.format(end, 'm/d/y')) {
                if(values.isConference){
                    return this.getDateEventView(start);
                }else
                    return this.getHourEventView(start) + ' '+
                       ' - ' + this.getHourEventView(end) + ' '+ values.timeZoneCode;
            } else {
                return this.getDateEventView(start) + ' - ' + this.getDateEventView(end);
            }
        },
        
        getDisplayDateTimeEventDetailPhone: function (start, end, timeZoneCode) {
            var timeStart = '';
            var timeEnd = '';
            var date = '';
            if(Ext.Date.format(start, 'm/d/y') == Ext.Date.format(end, 'm/d/y')) {
                timeStart = this.getHourEventView(start);
                timeEnd = this.getHourEventView(end) + ' '+ timeZoneCode;
                date = '<br>' + Ext.Date.format(start, 'F d, Y');
                date = this.removeZero(date);
            } else {
                timeStart = Ext.Date.format(start, 'F d, Y');
                timeStart = this.removeZero(timeStart);
                timeEnd = Ext.Date.format(end, 'F d, Y');
                timeEnd = this.removeZero(timeEnd);
            }
            return '<div class = "p-inlineblock"><b>'+ timeStart+'</b></div> - <div class = "p-inlineblock"><b>'+ timeEnd+'</b></div>' + date ;
        },

        removeZero: function (date) {
            var index = date.indexOf(',') - 2;
            if (date && date.charAt(index) == '0') {
                var temp = date.substr(0, index);
                var temp2 = date.substr(index + 1, date.length - temp.length - 1);
                return temp + temp2;
            } else {
                return date;
            }
        },

        getDaysBetweenTwoDates: function(firstDate, secondDate ) {
            var oneDay = 24*60*60*1000;
            var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
            if(firstDate < secondDate) {
                diffDays = -diffDays;
            }
            return diffDays;
        },

        getMonthsBetweenTwoDates: function(d1, d2 ) {
            var months;
            months = (d1.getFullYear() - d2.getFullYear()) * 12;
            months -= d2.getMonth();
            months += d1.getMonth();
            return months;
        },

        onCheckedEmailValue: function(email) {
            var reg = /^([A-Za-z0-9_\-\.\+\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            return reg.test(email);
        },

        onCheckedPhoneValue: function(phone) {
            var reg = /^\([0-9]{3,3}\)[\s]*[0-9]{3,3}\-[0-9]{4,4}$/;
            return reg.test(phone);
        },

        onCheckedUrlValue : function(url) {
            var reg = /^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-\/]*[a-z0-9]$/;
            return reg.test(url);
        },

        onCheckedHourValue: function(value){
            var reg = /^[0-1][0-9][\s]*[:][\s]*[0-5][0-9]$/;
            return reg.test(value);
        },

        onClearFilterStore: function(store){
            if(store) {
                store.each(function(record){
                    record.set('checked', '');
                    if(record.SubcodeListEvent) {
                        record.SubcodeListEvent.each(function(subRecord){
                            subRecord.set('checked', '');
                        });
                    }
                });
            }
        },

        getTypeOfEvent: function(value){
            var config = Personify.utils.Configuration.getConfiguration();
            var type = config.getAt(0).EventsStore.get('types')[value];
            return type;

        },

        getDates: function (d1, d2) {
            var oneDay = 24*3600*1000;
            for(var d=[],ms=d1*1,last=d2*1;ms<=last;ms+=oneDay) {
                d.push( new Date(ms) );
            }
            return d;
        },

        removeImageHtmlContent: function(content) {
            var tempDiv = document.createElement('DIV');
            tempDiv.innerHTML = content;
            var images = tempDiv.getElementsByTagName('img');
            for (var i = 0; i < images.length; i++) {
                tempDiv.removeChild(tempDiv.getElementsByTagName('img')[i]);
            }
            return tempDiv.innerHTML;
        },

        removeTagHtml: function(content, tag) {
            var tempDiv = document.createElement('DIV');
            tempDiv.innerHTML = content;
            var tag = tempDiv.getElementsByTagName(tag);
            for (var i = 0; i < tag.length; i++) {
                tempDiv.removeChild(tag[i]);
            }
            return tempDiv.innerText;
        },

        updateImageDimension: function(content) {
            var tempDiv = document.createElement('DIV');
            tempDiv.innerHTML = content;
            var images = tempDiv.getElementsByTagName('img');
            for (var i = 0, length = images.length; i < length; i++) {
                images[i].removeAttribute('width');
                images[i].removeAttribute('height');
            }
            return tempDiv.innerHTML;
        },

        needToLogin: function() {
            Ext.Msg.alert('', 'You need to log in to access this feature.', function() {
                var loginPanel = Ext.ComponentQuery.query('#loginPanel')[0];
                if(loginPanel) {
                    var login = loginPanel.getController();
                    Ext.ComponentQuery.query('#loginButton')[0].fireEvent('submitLogin', login.getLoginButton());
                } else {
                    Ext.ComponentQuery.query('#logInButton')[0].fireEvent('submitLogin');
                }
            });
        },

        getMeetingTagCls: function(MeetingTag) {
            if(MeetingTag.trim() == "Sold Out") {
                return 'p-label-soldOut';
            } else if(MeetingTag.trim() == "Cancelled") {
                return 'p-label-cancelled';
            } else if(MeetingTag.trim() == "Wait List") {
                return 'p-label-waitlist';
            } else {
                if(parseInt(MeetingTag) > 10) {
                    return '';
                } else return 'p-label-event-normal';
            }
        },

        getMeetingTag: function(MeetingTag) {
            if(MeetingTag.trim() == "Sold Out" || MeetingTag.trim() == "Cancelled" || MeetingTag.trim() == "Wait List") {
                return MeetingTag;
            } else {
                if(parseInt(MeetingTag) > 10) {
                    return '';
                }
                else return MeetingTag;
            }
        },

        cantLoadEvent: function() {
             Ext.Msg.alert('', 'Cannot load events.');
        },

        formatDateTimeSession: function(date) {
            if(date) {
                var dateF = new Date(date);
                return Ext.Date.format(dateF, "c");
            } else {
                return '';
            }
        },

        formatDateMSMySchedule: function(date){
            if(date){
                var dateF = Ext.Date.parse(date, "MS");
                return Ext.Date.format(dateF, "c");
            }else{
                return '';
            }
        },

        checkDateInDateArray: function(array, date) {
            var arrString = new Array();
            for(var i =0 ; i < array.length; i++) {
                arrString.push(Ext.Date.format(array[i], 'm/d/y'))
            }
            return Ext.Array.contains(arrString, Ext.Date.format(date, 'm/d/y'));
        },

        changeTimeSession: function(time) {
            if(time) {
                var timeformated = this.formatJSONDate(time,"g:i A"),
                    arrTime = timeformated.split(' ');
                if(arrTime.length > 0)
                    str = '<div class="detail-time-p-headerdetailevent">'+ arrTime[0] +'</div><div class="type-time-p-headerdetailevent">'+ arrTime[1].toUpperCase() +'</div>';
                return str;
            }
            return time;
        },

        changeTimeMySession: function(time) {
            if (time) {
                var timeformated = this.formatIso8601Date(time,"g:i A"),
                    arrTime = timeformated.split(' ');

                if (arrTime.length > 0)
                    str = '<div class="detail-time-p-headerdetailevent">'+ arrTime[0] +'</div><div class="type-time-p-headerdetailevent">'+ arrTime[1].toUpperCase() +'</div>';

                return str;
            }

            return time;
        },

        getSeatsRemaining: function(MeetingTag){
            if(MeetingTag.trim() == "Sold Out" || MeetingTag.trim() == "Cancelled" || MeetingTag.trim() == "Wait List") {
                return MeetingTag;
            } else {
                if(parseInt(MeetingTag) > 10) {
                    return 'Seats Remaining: ' + parseInt(MeetingTag);
                }
                else return 'Seats Remaining: <span class="p-phone-text-red">0' + parseInt(MeetingTag) + '</span>';
            }
        },

        isSoldOutEvent: function(MeetingTag){
            return (MeetingTag.trim() == "Sold Out")? 'p-phone-icon-soulOut' : '';
        },

        isMemberOnlyEvent: function(isMembersOnly){
            return (isMembersOnly == false)? '' : 'p-phone-icon-member';
        },

        roundMinutes: function(value) {
            var date = new Date(value);
            date.setHours(date.getHours() + 1);
            date.setMinutes(0);
            date.setSeconds(0);
            return date;
        },

        oneHourLater: function(value) {
            var date = new Date(value);
            date.setHours(date.getHours() + 2);
            date.setMinutes(0);
            date.setSeconds(0);
            return date;
        },

        oneDateLater: function(value) {
            var date = new Date(value);
            date.setDate(date.getDate() + 1);
            return date;
        },

        getSelectDateTimeValue: function(value) {
            var month = this.getMonthEventView(value);
            var numMonth = Ext.Date.format(value, 'm');
            var year = this.getYearEventView(value);
            var temp = month + ', ' + year;
            return temp;
        },

        getSelectTimeSessionValue: function(value) {
            return Ext.Date.format(value,'g a');
        },

        compareTwoDays: function(sDate, eDate){
            var sMonth = this.getMonthEventView(sDate);
            var eMonth = this.getMonthEventView(eDate);
            var sYear = this.getYearEventView(sDate);
            var eYear = this.getYearEventView(eDate);
            return (sMonth == eMonth && sYear == eYear) ? true : false;
        },

        convertStringToDate: function(value) {
            var d = null;
            if (value) {
                var bits = value.split(/[-T:]/g);
                d = new Date(bits[0], bits[1]-1, bits[2]);
                d.setHours(bits[3], bits[4], bits[5]);
            }
            return d;
        },

        convertStringToDateSession: function(value) {
            if (value) {
                return new Date(value);
            }
        },

        getWidthPrice: function(price1, price2, pixel) {
            var price = null;
            var priceLength = 0;

            if (parseInt(price1).toString().length > parseInt(price2).toString().length) {
                price = price1;
            } else {
                price = price2;
            }

            price = price.toString();

            if (parseInt(price.length/3) > 1) {
                priceLength += parseInt(price.length/3);
            }

            if (price.indexOf('.') != -1)
                price = price.substring(0, price.indexOf('.'));

            priceLength += price.length + 8;
            return priceLength * pixel;
        },

        getWidthOrderPrice: function(price1, price2, price3, price4, price5, pixel) {
            var price = 0;
            var priceLength = 0;
            var array = [];
            array.push(price1);
            array.push(price2);
            array.push(price3);
            array.push(price4);
            array.push(price5);

            for (var i = 0; i < array.length; i++) {
                if (array[i] && parseInt(array[i]).toString().length > parseInt(price).toString().length) {
                    price = array[i];
                }
            }

            price = price.toString();

            if (parseInt(price.length/3) > 1) {
                priceLength += parseInt(price.length/3);
            }

            if (price.indexOf('.') != -1)
                price = price.substring(0, price.indexOf('.'));

            priceLength = price.length + 8;
            return priceLength * pixel;
        },

        getSponsorListFromJsonFile: function(eventSponsors, productId, sponsorStore, callback){
            var sponsorEventsData = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('sponsorEvents');
            sponsorStore.removeAll(true);

            for (var i = 0; i < sponsorEventsData.length; i++) {
                if (sponsorEventsData[i].ProductId == productId) {
                    sponsorStore.setData(sponsorEventsData[i].SponsorImageList);
                }
            }

            callback();
        },

        getAddress: function(record) {
            var address = null;
            var streetAddress =  record.get('streetAddress')? record.get('streetAddress') + ', ': '';
            var address2 =  record.get('address2')? record.get('address2') + ', ': '';
            var address3 =  record.get('address3')? record.get('address3') + ', ': '';
            var address4 =  record.get('address4')? record.get('address4') + ', ': '';
            var locality =  record.get('locality')? record.get('locality') + ', ': '';
            var region =  record.get('region')? record.get('region') + ', ': '';
            var postalCode =  record.get('postalCode')? record.get('postalCode') + ', ': '';
            var country =  record.get('country')? record.get('country'): '';
            address = streetAddress + address2 + address3 + address4 + locality + region + postalCode + country;
            return address
        },

        showAddressOnMaps: function(address) {
            var me = this;

            var isLoadSuccess = function() {
                var message = 'Currently the google maps can not be loaded. Please check your connection and try again after few minutes';

                if (!window.google) {
                    Ext.Msg.alert('Connection', message);
                } else if (typeof google.maps.Geocoder != 'function') {
                    Ext.Msg.alert('Connection', message);
                } else {
                    var geoCoder = new google.maps.Geocoder();
                    me.callGeocoder(address, geoCoder);
                }
            };

            if (!window.google) {
                me.loadScript('https://maps.googleapis.com/maps/api/js?v=3&sensor=false&callback=isLoadSuccess');
                window.setTimeout(isLoadSuccess, 2500);
            } else {
                var geoCoder = new google.maps.Geocoder();
                me.callGeocoder(address, geoCoder);
            }

        },

        callGeocoder: function(address, geoCoder) {
            var latitude = null, longitude = null;
            Ext.Viewport.setMasked({xtype: 'loadmask'});

            geoCoder.geocode({'address': address}, function(results, status) {
                Ext.Viewport.setMasked(false);

                if (status == google.maps.GeocoderStatus.OK) {
                    var keys = [];
                    var location = results[0].geometry.location;

                    for (var item in location) {
                        if (hasOwnProperty.call(location, item)) {
                            keys.push(item);
                        }
                    }

                    latitude = results[0].geometry.location[keys[0]];
                    longitude = results[0].geometry.location[keys[1]];

                    if (Ext.os.is.Android) {
                        var dataPlugin = {};
                        dataPlugin.latitude = latitude;
                        dataPlugin.longitude = longitude;
                        dataPlugin.address = address;

                        if (window.plugins.androidHelper) {
                            window.plugins.androidHelper.showOnMaps(dataPlugin);
                        }
                    } else {
                        var url = 'http://maps.google.com/?q=loc:' + latitude + ',' + longitude +'';
                        window.open(url, '_blank', 'location=no,enableviewportscale=yes');
                    }
                }
            });
        },

        loadScript: function(url) {
            var script = document.createElement("script");
            script.src = url;
            script.type = "text/javascript";
            document.getElementsByTagName("head")[0].appendChild(script);
        },

        getMessageMatchTypeOfEvent: function(record) {
            var result = {};
            var msg = "Are you sure you want to delete the personal event from My Schedule?";
            var msgSuccess = "Personal event has been removed.";

            if (record.get('type').toUpperCase() == 'MEETING') {
                msg = "Are you sure you want to delete the meeting from My Schedule?";
                msgSuccess = "Meeting has been removed.";

                if (record.get('sessionID').trim() != "" && record.get('sessionID') != 0) {
                    msg = "Are you sure you want to delete the session from My Schedule?";
                    msgSuccess = "Session has been removed.";
                }
            } else if (record.get('type').toUpperCase() == 'PERSONAL') {
                if (record.get('meetingId').trim() != "" && record.get('meetingId') != 0) {
                    msg = "Are you sure you want to delete the personal session from My Schedule?";
                    msgSuccess = "Personal session has been removed.";
                }
            }

            result.msg = msg;
            result.msgSuccess = msgSuccess;
            return result;

        },

        setCaretSelection: function(element, positionStart, positionEnd) {
            element.focus();
            element.setSelectionRange(positionStart, positionEnd);
        },

        onShareEvent: function(data) {
            if (window.plugins.social && window.plugins.social['available']) {
                window.plugins.social.available(function(result) {
                    if (result == 1) {
                        var body = '';
                        var title = '';
                        if (data) {
                            title = data.get('shortName');
                            var date = Personify.utils.ItemUtil.formatJSONDate(Personify.utils.ItemUtil.convertStringToDate(data.get('startDateTimeString')));
                            var startTime = Personify.utils.ItemUtil.formatJSONDate(Personify.utils.ItemUtil.convertStringToDate(data.get('startDateTimeString')), "g:i a");
                            var endTime = Personify.utils.ItemUtil.formatJSONDate(Personify.utils.ItemUtil.convertStringToDate(data.get('endDateTimeString')), "g:i a");
                            var time = startTime + " - " + endTime;
                            var location = data.get('locationFullAddress').replace('\r\n', ' ');
                            body = "Title: " + title + "\n" + "Date: " + date + "\n" + "Time: " + time + "\n" + "Location: " + location;
                        }
                        window.plugins.social.share(body, '', '');
                    } else {
                        Ext.Msg.alert('', 'Social network plugins is not supported.', Ext.emptyFn);
                    }
                });
            }
        },

        onShareSessionDetail: function(data) {
            if (window.plugins.social && window.plugins.social['available']) {
                window.plugins.social.available(function(result) {
                    if (result == 1) {
                        var body = '';
                        var title = '';
                        if (data) {
                            title = data.get('title');
                            var startDate = new Date(data.get('startDateTimeString'));
                            var endDate = new Date(data.get('endDateTimeString'));
                            var location = data.get('locationDescription');
                            var time = Personify.utils.ItemUtil.formatJSONDate(data.get('startDateTimeString'), "g:i a") + " - " + Personify.utils.ItemUtil.formatJSONDate(data.get('endDateTimeString'), "g:i a");
                            var date = Personify.utils.ItemUtil.formatJSONDate(startDate) + " - " + Personify.utils.ItemUtil.formatJSONDate(endDate);
                            body = "Title: " + title + "\n" + "Date: " + date + "\n" + "Time: " + time + "\n";

                            if (location && location != "") {
                                body += "Location: " + location;
                            }
                        }
                        window.plugins.social.share(body, '', '');
                    } else {
                        Ext.Msg.alert('', 'Social network plugins is not supported.', Ext.emptyFn);
                    }
                });
            }
        }
    }
});
