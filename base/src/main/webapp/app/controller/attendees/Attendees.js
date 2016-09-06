Ext.define('Personify.controller.attendees.Attendees', {
    extend: 'Personify.base.Controller',
    inject: ['currentUser'],
    config: {
        params: null,
        totalAttendeesResult: 10000
    },
    control: {
        attendeeslistpanel: {
           selectattendeesitem: 'onSelectAtendeeItemTap',
           nextbuttontap: 'onNextButtonTap',
           searchkeyup: 'onSearchKeyUp',
           tapbtnclearfilter: 'onTapBtnClearFilter'
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
        /*var record = this.getView().getRecord();
        if(record.MeetingRegistrantStore) {
            if(navigator.onLine && window.plugins.app47) {
                window.plugins.app47.sendGenericEvent('Attendee List');
            }   
            var attendeeslistpanel = this.getAttendeeslistpanel();
            attendeeslistpanel.getController().setStore(record.MeetingRegistrantStore);
        } else {
            this.onGetData(record);
        }
         */
           
           if(navigator.onLine && window.plugins.app47) {
                window.plugins.app47.sendGenericEvent('Attendee List');
           }
           var me = this;
           Ext.callback(
                me.onGetData,
                me, [], 1
            );
    },

    configComponentDetail: function() {
        var contactInfo = this.getAttendeeInfo();
        contactInfo.getController().hideCloseButton(false);
        contactInfo.getController().setListOfInfo(Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('listinfoAttendee'));
        contactInfo.getController().updateEnableEditToolBox(false);
        contactInfo.getController().addButtonAddToMyAddressBook(Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('useAddToMyAddressBookButton'));
    },

    onGetData: function() {
        var me = this,
        record = this.getView().getRecord(),
        currentUser = Personify.utils.Configuration.getCurrentUser(),
        attendeeslistpanel = me.getAttendeeslistpanel();

        //attendeeslistpanel.setMasked({xtype:'loadmask'});
        Ext.callback(function() {
        
        var itemsPerPage = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('itemsPerPageAttendeeList');
        var searchTerm = '';
        var phoneAttendeeSearch = Ext.ComponentQuery.query('#searchFieldAttendees');
        if (phoneAttendeeSearch[0]) {
                
            var searchFieldAttendees = attendeeslistpanel.getController().getSearchFieldAttendees().getController().getSearchField();
                     
            if (searchFieldAttendees && searchFieldAttendees.getValue() != "") {
                searchTerm = searchFieldAttendees.getValue();
            }
        }
        var attributes = {
                IsStaffMember: currentUser? currentUser.isStaffMember().toString() : false,
                ItemsPerPage: itemsPerPage,
                MasterCustomerID: currentUser? currentUser.get('masterCustomerId'): '' ,
                SubCustomerID: currentUser? currentUser.get('subCustomerId'): '',
                ProductID: record.get('productID'),
                SearchTerm: searchTerm,
                StartIndex: 1
        };
        me.setParams(attributes);
        me.loadAttendeeModel();
                        
        //attendeeslistpanel.setMasked(false);
        }, me, [], 1);
    },

    onSelectAtendeeItemTap: function(record) {
        if(navigator.onLine && window.plugins.app47) {
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
           
           Personify.utils.BackHandler.pushActionAndTarget('onCloseAttendessDetailsButtonTap', this);
    },

    onCloseAttendessDetailsButtonTap: function() {
        this.getView().setActiveItem(0);
        Ext.Viewport.setMasked(false);
       Personify.utils.BackHandler.popActionAndTarget('onCloseAttendessDetailsButtonTap', this);
    },
    loadAttendeeModel: function() {
        var me = this,
        attendeeslistpanel = me.getAttendeeslistpanel();
        attendeeslistpanel.setMasked({xtype:'loadmask'});
         
        var storeManager = Personify.utils.ServiceManager.getStoreManager(),
        attendeeName = storeManager.getAttendeeStore(),
        registrantStore = Ext.create(attendeeName),
        attendeeStore = Ext.create(attendeeName, {
            dataRequest: me.getParams()
        });
           
        attendeeStore.load({
            callback: function(records, operation, success) {
                attendeeslistpanel.setMasked(false);
                if (success) {
                           
                    var attendeeManagement = records[0];
                    var currentStore = attendeeslistpanel.getController().getStore();
                    if(me.getParams()['SearchTerm'] != '' && me.getParams()['StartIndex'] == 1)
                           {
                        currentStore.removeAll();
                           currentStore = null;
                           }
                        if (currentStore) {
                        currentStore.suspendEvents();
                        attendeeManagement.AttendeeStore.each(function(attendeeRecord) {
                            if(attendeeRecord) {
                                currentStore.add(attendeeRecord);
                            }
                        }, me);
                        currentStore.sync();
                        currentStore.resumeEvents(true);
                        attendeeslistpanel.getController().setStore(currentStore);
                        attendeeslistpanel.getController().refresh();
                    } else {
                        attendeeslistpanel.getController().setStore(attendeeManagement.AttendeeStore);
                        currentStore = attendeeManagement.AttendeeStore;
                    }
                
                    if (attendeeManagement) {
                           me.setTotalAttendeesResult(attendeeManagement.get('totalResults'));
                    }
                }
            },
            scope: me
        });
    },
    onNextButtonTap: function(record) {
        var me = this;
        var attendeeStore = me.getAttendeeslistpanel().getController().getStore();
        var currentAttendeeItem = 0;
        if (attendeeStore) {
           currentAttendeeItem = attendeeStore.getCount();
        }
           
        if (currentAttendeeItem < me.getTotalAttendeesResult()) {
           me.getParams()['StartIndex'] = me.getParams()['StartIndex'] + (Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('itemsPerPageAttendeeList'));
           me.loadAttendeeModel();
        }
    },
    onSearchKeyUp: function(newText) {
        var me = this,
        attendeeslistpanel = me.getAttendeeslistpanel();
        
        if(navigator.onLine && window.plugins.app47) {
           window.plugins.app47.sendGenericEvent('Attendee Search');
        }
        
        me.getParams()['SearchTerm'] = newText;
        me.getParams()['StartIndex'] = 1;
        attendeeslistpanel.getController().removeAll();
        me.loadAttendeeModel();
        //attendeeslistpanel.getController().getBtnClearFilter().setDisabled(false);
    },
    onTapBtnClearFilter : function() {
        var me = this,
        attendeeslistpanel = me.getAttendeeslistpanel();
        me.getParams()['SearchTerm'] = '';
        me.getParams()['StartIndex'] = 1;
        attendeeslistpanel.getController().removeAll();
        me.loadAttendeeModel();
        //attendeeslistpanel.getController().getBtnClearFilter().setDisabled(true);
        attendeeslistpanel.getController().getSearchFieldAttendees().getController().clearSearchField();
        attendeeslistpanel.getController().getAttendeesList().deselectAll();
    }
})