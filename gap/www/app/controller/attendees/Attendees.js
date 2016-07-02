Ext.define('Personify.controller.attendees.Attendees', {
    extend: 'Personify.base.Controller',
    inject: ['currentUser'],

    control: {
        attendeeslistpanel: {
            selectattendeesitem: 'onSelectAtendeeItemTap'
        },
        attendeeInfo: {
            closeinfopanel: 'onCloseAttendessDetailsButtonTap'
        }
    },

    init: function() {
        this.showListAttendees();
        this.configComponentDetail();
    },

    showListAttendees: function() {
        var record = this.getView().getRecord();
        if(record.MeetingRegistrantStore) {
            if(window.plugins.app47) {
                window.plugins.app47.sendGenericEvent('Attendee List');
            }
            var attendeeslistpanel = this.getAttendeeslistpanel();
            attendeeslistpanel.getController().setStore(record.MeetingRegistrantStore);
        } else {
            this.onGetData(record);
        }
    },

    configComponentDetail: function() {
        var contactInfo = this.getAttendeeInfo();
        contactInfo.getController().hideCloseButton(false);
        contactInfo.getController().setListOfInfo(Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('listinfoAttendee'));
        contactInfo.getController().updateEnableEditToolBox(false);
        contactInfo.getController().addButtonAddToMyAddressBook(Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('useAddToMyAddressBookButton'));
    },

    onGetData: function(record) {
        var currentUser = Personify.utils.Configuration.getCurrentUser(),
            attendeeslistpanel = this.getAttendeeslistpanel();

        attendeeslistpanel.setMasked({xtype:'loadmask'});

        var attributes = {
                IsStaffMember: currentUser? currentUser.isStaffMember().toString() : false,
                ItemsPerPage: "10000",
                MasterCustomerID: currentUser? currentUser.get('masterCustomerId'): '' ,
                SubCustomerID: currentUser? currentUser.get('subCustomerId'): '',
                ProductID: record.get('productID'),
                StartIndex: "0"
            },
            storeManager = Personify.utils.ServiceManager.getStoreManager(),
            attendeeName = storeManager.getAttendeeStore(),
            attendeeStore = Ext.create(attendeeName),
            registrantStore = Ext.create(attendeeName);

        attendeeStore.setDataRequest(attributes);
        attendeeStore.load({
            callback: function(records, operation, sussess) {
                attendeeslistpanel.setMasked(false);
                if(sussess) {
                    registrantStore.add(records);
                    record.MeetingRegistrantStore = registrantStore;
                    if(!attendeeslistpanel.isDestroyed) {
                        attendeeslistpanel.getController().setStore(attendeeStore);
                    }
                }
            },
            scope: this
        });
    },

    onSelectAtendeeItemTap: function(record) {
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Attendee Detail');
        }

        var me = this,
            contactInfo = me.getAttendeeInfo();

        if(record.get('details') == null) {
            var params = {
                    ReqMasterCustomerId: Personify.utils.Configuration.getCurrentUser().get('masterCustomerId'),
                    ReqSubCustomerId: Personify.utils.Configuration.getCurrentUser().get('subCustomerId'),
                    IsStaff: Personify.utils.Configuration.getCurrentUser().isStaffMember(),
                    RecordType: record.get('type')
                },
                masterCustomerId = record.get('masterCustomerID'),
                subCustomerId = record.get('subCustomerID');

            if(masterCustomerId != null && !(masterCustomerId === '')) {
                params['MasterCustomerId'] = masterCustomerId;
            }

            if(subCustomerId != null && !(subCustomerId === '')) {
                params['SubCustomerId'] = subCustomerId;
            }

            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var profileStoreName = storeManager.getProfileStore();
            var profileStore = Ext.create(profileStoreName, {
                dataRequest: params
            });

            me.getView().setMasked({ xtype: 'loadmask' });
            profileStore.load({
                callback: function(records, operation, success) {
                    if (success && records.length) {
                        var profile = records[0];
                        record['data']['details'] = profile;
                        contactInfo.getController().setRecord(record.get('details'));
                        me.getView().setActiveItem(1);
                        contactInfo.getController().updateEnableEditToolBox(false);
                    } else {
                        Ext.Msg.alert('', 'Cannot load attendee profile.');
                    }

                    me.getView().setMasked(false);
                }
            });
        } else {
            me.getView().setMasked(false);
            contactInfo.getController().setRecord(record.get('details'));
            me.getView().setActiveItem(1);
            contactInfo.getController().updateEnableEditToolBox(false);
        }
    },

    onCloseAttendessDetailsButtonTap: function() {
        this.getView().setActiveItem(0);
        Ext.Viewport.setMasked(false);
    }
})