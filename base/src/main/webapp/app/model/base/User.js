Ext.define('Personify.model.base.User', {
    extend: 'Personify.base.Model',
    requires: ['Personify.model.base.user.Address','Personify.model.base.user.Role',
        'Personify.model.base.user.Email','Personify.model.base.user.Name',
        'Personify.store.base.ModuleConfiguration'],
    config: {
        useCache: false,
        viewModuleStore: null,
        storeProfileDisplayOption: null,
        fields: [
            {name: 'id', type: 'string'},
            {name: 'masterCustomerId', type: 'string', defaultValue: ''},
            {name: 'subCustomerId', type: 'string', defaultValue: '0'},
            {name: 'encrMasterCustomerId', type: 'string'},
            {name: 'encrSubCustomerId', type: 'string'},
            {name: 'displayName', type: 'string'},
            {name: 'preferredCurrency', type: 'string'},
            {name: 'cCType', type: 'string'},
            {name: 'cCNumber', type: 'string'},
            {name: 'entryReference', type: 'string'},
            {name: 'organizationId', type: 'string', defaultValue: 'NASE'},
            {name: 'organizationUnitId', type: 'string', defaultValue: 'NASE'},
            {name: 'userKey', type: 'string'}
            ],
        associations: [
            {type: 'hasMany', model: 'Personify.model.base.user.Address', storeName: 'UserAddress', name: 'ProfileAddresses', associationKey:'ProfileAddresses',reader: {type: 'json', rootProperty: 'ProfileAddresses', record: 'MobileProfileAddresses'}},
            {type: 'hasMany', model: 'Personify.model.base.user.Role', storeName: 'UserRole', name: 'ProfileRoles', associationKey: 'ProfileRoles',reader: {type:'json', rootProperty: 'ProfileRoles', record: 'MobileNameValues'}},
            {type: 'hasMany', model: 'Personify.model.base.user.Email', storeName: 'UserEmail', name: 'ProfileEmails', associationKey: 'ProfileEmails', reader: {type: 'json', rootProperty: 'ProfileEmails',record: 'MobileNameValues'}},
            {type: 'hasMany', model: 'Personify.model.base.user.Name', storeName: 'UserName', name: 'ProfileName', associationKey: 'ProfileName', reader: {type: 'json', rootProperty: 'ProfileName', record: 'MobileProfileName'}}
        ],

        userName: null,
        password: null,

        profileUrl: null,
        shoppingCartUrl: null
    },
    
    isLogged: function() {
        return this.getId() != this.id;
    },

    get: function(field) {
        if (field === 'organizationId') {
            if (this.isLogged()) {
                return this.callParent(arguments);
            } else {
                var config = Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.DefaultListingParamsStore.getAt(0);
                return config.get('orgId');
            }
        } else if (field === 'organizationUnitId') {
            if (this.isLogged()) {
                return this.callParent(arguments);
            } else {
                var config = Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.DefaultListingParamsStore.getAt(0);
                return config.get('orgUnitId');
            }
        } else {
            return this.callParent(arguments);
        }
    },

    modulesConfigurationLoad: function(type,callback,scope) {
        var me = this,
            moduleConfigurationStore = Ext.getStore('moduleConfiguration');
        var url = Personify.utils.Configuration.getConfiguration().getAt(0).HomeStore.get('modulesUrl');

        if (!type)
            type='tablet';

        var readerType = 'moduleconfiguration.'+ type;

        var success = function(value) {
            if (!value || value == '') {
                fail(null);
                return;
            }

            var data = Ext.JSON.decode(value);
            moduleConfigurationStore.setConfig({
                data: data,
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json',
                        rootProperty: readerType
                    }
                }
            });
          
            me.onLoadModule(moduleConfigurationStore, callback, scope);
        };
        var fail = function(error) {
           alert('error');
            moduleConfigurationStore.getProxy().setUrl(url);
            moduleConfigurationStore.getProxy().setReader({ type: 'json',rootProperty: readerType});
            me.onLoadModule(moduleConfigurationStore, callback, scope);
        };

        if (window.plugins.app47) {
            window.plugins.app47.getFileValue('HomeModule', 'modules-url', success, fail);
        } else {
            fail(null);
        }

        return moduleConfigurationStore;
    },

    onLoadModule: function(moduleConfigurationStore, callback, scope) {
           var me = this;
        //moduleConfigurationStore.load({ callback: function(records, operation, success) {
            if (!me.isLogged()) {
                moduleConfigurationStore.clearFilter();
                moduleConfigurationStore.filter([{ property: "notLogged", value: true }]);
            } else {
                moduleConfigurationStore.clearFilter();
                moduleConfigurationStore.filter([{ property: "logged", value: true }]);
            }
//alert(moduleConfigurationStore.getCount());
            if (typeof callback == 'function')
                callback.call(scope, moduleConfigurationStore);
        //}});
    },
    
    getProfileDisplayOptionStore: function() {
        var me = this;
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var profileDisplayOptionStore = storeManager.getProfileDisplayOptionStore();
        storeProfileDisplayOption = Ext.create(profileDisplayOptionStore);
        data = null;
        
        if(me.internalId != me.id) {
            data = [
                {name:'Contact Information', view:'Personify.view.profile.ContactInfoManagement', cls:''},
                {name:'Purchase History', view:'Personify.view.profile.PurchaseHistory', cls:''},
                {name:'Participation History', view:'Personify.view.profile.ParticipationHistory', cls:''},
                {name: 'Connect Twitter', view: 'Personify.view.profile.ConnectTwitter', cls: ''}
            ];
        }
        
        storeProfileDisplayOption.setData(data);
        
        return storeProfileDisplayOption;
    },
    
    isStaffMember: function() {
        var me = this,
            isStaff = false,
            roleStore = me.userRole;
            
        if (roleStore) {
            for(var index=0; index < roleStore.getCount(); index++) {
                var record = roleStore.getAt(index);
                if( record.get('id') == 'STAFF') {
                    isStaff = record.get('value');
                    break;
                }
            }
        }
        
        return isStaff;
    },
    
    isMember: function() {
        var me = this,
            isMember = false,
            roleStore = me.userRole;
            
        if (roleStore) {
            for(var index=0; index < roleStore.getCount(); index++) {
                var record = roleStore.getAt(index);
                if( record.get('id') == 'MEMBER') {
                    isMember = record.get('value');
                    break;
                }
            }
        }
        
        return isMember;
    },
    
    isExpiredMember: function() {
        if (this.isLogged() && !this.isMember()) {
            return true;
        } else {
            return false;
        }
    },

    getEventMonthStore: function(meetingStore) {
        var currentDate = new Date(),
            currentNumMonth = Ext.Date.format(currentDate, 'm'),
            currentYear = Personify.utils.ItemUtil.getYearEventView(currentDate),
            eventMonthObject = {},
            eventMonthFuture = {};

        meetingStore.sort({
            sorterFn: function(record1, record2) {
                var startDateTime1 = Personify.utils.ItemUtil.convertStringToDate(record1.get('startDateTimeString'));
                var startDateTime2 = Personify.utils.ItemUtil.convertStringToDate(record2.get('startDateTimeString'));
                var date1 = Ext.Date.format(startDateTime1, 'U');
                var date2 = Ext.Date.format(startDateTime2, 'U');
                var time1 = parseInt(Ext.Date.format(startDateTime1, 'g:i'), 10);
                var time2 = parseInt(Ext.Date.format(startDateTime2, 'g:i'), 10);
                var shortName1 = record1.get('shortName');
                var shortName2 = record2.get('shortName');
                return date1 > date2 ? 1 : (date1 == date2 ? (time1 > time2 ? 1 : (time1 == time2 ? (shortName1 > shortName2 ? 1 : (shortName1 == shortName2 ? 0 : -1)) : -1)) : -1);
            },
            direction : 'ASC'
        });

        meetingStore.each(function(record) {
            var startDateTime = Personify.utils.ItemUtil.convertStringToDate(record.get('startDateTimeString'));
            var year = startDateTime.getFullYear();
            var month = startDateTime.getMonth();
            var monthForCompare = Ext.Date.format(startDateTime, 'm');

            if (eventMonthObject[month + "-" + year]) {
                eventMonthObject[month + "-" + year].push(record);
            } else {
                eventMonthObject[month + "-" + year] = [record];
                if (currentYear < year || (currentYear == year && currentNumMonth <= monthForCompare)) {
                    eventMonthFuture[month + "-" + year] = {isFuture: true, month: month, year: year};
                } else {
                    eventMonthFuture[month + "-" + year] = {isFuture: false, month: month, year: year};
                }
            }
        });

        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var modelManager = Personify.utils.ServiceManager.getModelManager();
        var eventMonthModelName = modelManager.getEventMonth();
        var eventMonthStore = Ext.create(storeManager.getEventMonthStore());
        for (var i = 0, length = Object.keys(eventMonthObject).length,
                 keyArray = Object.keys(eventMonthObject); i < length; i++) {
            var eventMonthItemConfig = eventMonthFuture[keyArray[i]];
            var eventMonthModel = Ext.create(eventMonthModelName, {
                expanded: eventMonthItemConfig.isFuture,
                month: eventMonthItemConfig.month,
                year: eventMonthItemConfig.year,
                events: eventMonthObject[keyArray[i]]
            });
            eventMonthStore.add(eventMonthModel);
        }
        return eventMonthStore;
    },

    getScheduleMonthStore: function(store) {
        var currentDate = new Date(),
            currentNumMonth = Ext.Date.format(currentDate, 'm'),
            currentYear = Personify.utils.ItemUtil.getYearEventView(currentDate),
            eventMonthObject = {},
            eventMonthFuture = {};

        store.sort({
            sorterFn: function(record1, record2) {
                var startDateTime1 = record1.get('startDateTime');
                var startDateTime2 = record2.get('startDateTime');
                var date1 = Ext.Date.format(startDateTime1, 'U');
                var date2 = Ext.Date.format(startDateTime2, 'U');
                return date1 > date2 ? 1 : (date1 == date2 ? 0 : -1);
            },
            direction : 'ASC'
        });

        var meetingStore = Ext.getStore('meetingListtingMain');

        store.each(function(record) {
            var startDateTime = Personify.utils.ItemUtil.convertStringToDate(record.get('startDateTimeString'));
            var year = startDateTime.getFullYear();
            var month = startDateTime.getMonth();
            var monthForCompare = Ext.Date.format(startDateTime, 'm');

            if (eventMonthObject[month + "-" + year]) {
                eventMonthObject[month + "-" + year].push(record);
            } else {
                eventMonthObject[month + "-" + year] = [record];
                if (currentYear < year || (currentYear == year && currentNumMonth <= monthForCompare)) {
                    eventMonthFuture[month + "-" + year] = {isFuture: true, month: month, year: year};
                } else {
                    eventMonthFuture[month + "-" + year] = {isFuture: false, month: month, year: year};
                }
            }

            if (meetingStore) {
                for (var i = 0; i < meetingStore.getCount(); i++) {
                    var recordEvent = meetingStore.getAt(i);

                    if (record.get('meetingId') == recordEvent.get('productID')) {
                        record.eventData = recordEvent;
                        break;
                    }
                };
            }
        });

        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var modelManager = Personify.utils.ServiceManager.getModelManager();
        var eventMonthModelName = modelManager.getEventMonth();
        var eventMonthStore = Ext.create(storeManager.getEventMonthStore());
        for (var i = 0, length = Object.keys(eventMonthObject).length,
                 keyArray = Object.keys(eventMonthObject); i < length; i++) {
            var eventMonthItemConfig = eventMonthFuture[keyArray[i]];
            var eventMonthModel = Ext.create(eventMonthModelName, {
                expanded: eventMonthItemConfig.isFuture,
                month: eventMonthItemConfig.month,
                year: eventMonthItemConfig.year,
                events: eventMonthObject[keyArray[i]]
            });
            eventMonthStore.add(eventMonthModel);
        }
        return eventMonthStore;
    },

    loadProfileUrl: function() {
        var deferred = Ext.create('Deft.promise.Deferred');

        if (this.getProfileUrl()) {
            deferred.resolve(this.getProfileUrl());
        } else {
            var me = this;
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var profileUrlStore = Ext.create(storeManager.getProfileAuthenticationUrl());
            var profileUrlRequestPayload = {
                MasterCustomerId: this.get('masterCustomerId'),
                SubCustomerId: this.get('subCustomerId'),
                UserName: this.getUserName(),
                Password: this.getPassword(),
                PageKey: 'ProfileURL',
                InputURL: ''
            };

            profileUrlStore.setDataRequest(profileUrlRequestPayload);
            profileUrlStore.load({
                callback: function (records, operation, success) {
                    if (success && records.length > 0) {
                        me.setProfileUrl(records[0].get('outputUrl'));
                        deferred.resolve(me.getProfileUrl());
                    } else {
                        deferred.reject();
                    }
                }
            });
        }

        return deferred.promise;
    },

    loadShoppingCartUrl: function() {
        var deferred = Ext.create('Deft.promise.Deferred');

        if (this.getShoppingCartUrl()) {
            deferred.resolve(this.getShoppingCartUrl());
        } else {
            var me = this;
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var shoppingCartUrlStore = Ext.create(storeManager.getProfileAuthenticationUrl());
            var shoppingCartUrlRequestPayload = {
                MasterCustomerId: this.get('masterCustomerId'),
                SubCustomerId: this.get('subCustomerId'),
                UserName: this.getUserName(),
                Password: this.getPassword(),
                PageKey: 'ShoppingCartURL',
                InputURL: ''
            };

            shoppingCartUrlStore.setDataRequest(shoppingCartUrlRequestPayload);
            shoppingCartUrlStore.load({
                callback: function (records, operation, success) {
                    if (success && records.length > 0) {
                        me.setShoppingCartUrl(records[0].get('outputUrl'));
                        deferred.resolve(me.getShoppingCartUrl());
                    } else {
                        deferred.reject();
                    }
                }
            });
        }

        return deferred.promise;
    },

    confirmEventOrder: function(event, confirmation) {
        return this.confirmOrder(event.get('productId'), 1, '', '', confirmation);
    },

    confirmProductOrder: function(product, quantity, address, confirmation) {
        return this.confirmOrder(product.get('productID'), quantity, address.get('addressesId'), address.get('type'), confirmation);
    },

    confirmOrder: function(product, quantity, addressId, addressType, confirmation) {
        var deferred = Ext.create('Deft.promise.Deferred');
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var orderStore = null;

        if (confirmation) {
            orderStore = Ext.create(storeManager.getOrderTrue());
        } else {
            orderStore = Ext.create(storeManager.getOrderFalse());
        }

        var orderStoreRequestPayload = {
            MasterCustomerID: this.get('masterCustomerId'),
            SubCustomerID: this.get('subCustomerId'),
            OrgID: this.get('organizationId') ? this.get('organizationId') : config.get('orgId'),
            OrgUnitID: this.get('organizationUnitId') ? this.get('organizationUnitId') : config.get('orgUnitId'),
            CusAddressID: addressId,
            CusAddressType: addressType,
            ProductID: product,
            Quantity: quantity,
            CustomPrice: '',
            ConfirmOrder: confirmation
        };

        orderStore.setDataRequest(orderStoreRequestPayload);
        orderStore.load({
            callback: function(records, operation, success) {
                if (success && records.length) {
                    orderStore.each(function(orderItem) {
                        var baseAmount = orderItem.get('baseAmount');
                        orderItem.set('baseAmount', baseAmount * quantity);
                    });
                    deferred.resolve(orderStore);
                } else {
                    deferred.reject();
                }
            }
        });

        return deferred.promise;
    },

    addToMySchedule: function(title, description, startDate, endDate, location, type, eventId, sessionId, price) {
        var me = this;
        var deferred = Ext.create('Deft.promise.Deferred');
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var createMeetingAgendaStore = Ext.create(storeManager.getCustomerMeetingAgenda());

        eventId = eventId || 0;
        sessionId = sessionId || 0;
        price = price || 0;

        createMeetingAgendaStore.load({
            callback: function(records, operation, success) {
                if (success && records.length > 0) {
                    var meetingAgenda = records[0];
                    var meetingAgendaPayload = {
                        "EntityGUID": meetingAgenda.get('entityGUID'),
                        "AppointmentId": meetingAgenda.get('appointmentId'),
                        "OrganizationId": meetingAgenda.get('organizationId'),
                        "OrganizationUnitId": meetingAgenda.get('organizationUnitId'),
                        "MasterCustomerId": me.get('masterCustomerId'),
                        "SubCustomerId": me.get('subCustomerId'),
                        "AddedBy": meetingAgenda.get('addedBy'),
                        "AddedOn": meetingAgenda.get('addedOn'),
                        "AppointmentDescription": description,
                        "AppointmentEndDateTime": endDate,
                        "AppointmentStartDateTime": startDate,
                        "AppointmentTitle": title,
                        "AppointmentTypeCodeString": type,
                        "AvailableToOrders": meetingAgenda.get('availableToOrders'),
                        "ChangedBy" : meetingAgenda.get('changedBy'),
                        "ChangedOn": Ext.Date.format(new Date(), "c"),
                        "ConcurrencyId": meetingAgenda.get('concurrencyId'),
                        "MeetingProductId": eventId,
                        "SessionFee": price,
                        "sessionLocation": location,
                        "SessionProductId": sessionId
                    };

                    var saveMeetingAgendaStore = Ext.create(storeManager.getSaveCustomerMeetingAgenda());
                    saveMeetingAgendaStore.setDataRequest(meetingAgendaPayload);
                    saveMeetingAgendaStore.load({
                        callback: function(records, operation, success) {
                            if (success && records.length > 0) {
                                deferred.resolve(records[0]);
                            } else {
                                deferred.reject();
                            }
                        }
                    });
                } else {
                    deferred.reject();
                }
            }
        });

        return deferred.promise;
    },

    addPersonalEvent: function(title, description, startDate, endDate, location, eventId) {
        return this.addToMySchedule(title, description, startDate, endDate, location, 'Personal', eventId);
    },

    addEventToSchedule: function(event) {
        var title = event.get('shortName');
        var description = event.get('shortDescription');
        var startDate = event.get('startDateTime');
        var endDate = event.get('endDateTime');
        var location = event.get('location');
        var eventId = event.get('productID');
        var price = event.get('price');
        return this.addToMySchedule(title, description, startDate, endDate, location, 'Meeting', eventId, null, price);
    },

    addSessionToSchedule: function(session, eventId) {
        var title = session.get('title');
        var description = session.get('description');
        var startDate = session.get('startDateTime');
        var endDate = session.get('endDateTime');
        var location = session.get('location');
        var sessionId = session.get('sessionID');
        var price = session.get('price');
        return this.addToMySchedule(title, description, startDate, endDate, location, 'Meeting', eventId, sessionId, price);
    }
});
