Ext.define('Personify.controller.phone.attendee.Attendee', {
    extend: 'Personify.base.Controller',

    control: {
        ptoolbarAttendeesPhone: {
            onNavigationButtonTap: 'onTapNavigationButton'
        },
        attendeeslistpanelphone: {
            selectattendeesitem: 'onSelectAtendeeItemTap'
        },
        attendeeInfo: true,
        attendeeContent: true
    },

    init: function(){
        this.getPtoolbarAttendeesPhone().getController().setHiddenActionButton(true);
        var record = this.getView().getRecord();
        this.setRecord(record);
    },

    onTapNavigationButton: function() {
        this.getView().fireEvent('back', this);
    },

    setRecord: function(record){
        if (record.MeetingRegistrantStore) {
            this.getAttendeeslistpanelphone().getController().setStore(record);
        }
    },

    configComponentDetail: function() {
        var contactInfo = this.getAttendeeInfo();
        contactInfo.getController().setListOfInfo(Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('listinfoAttendee'));
        contactInfo.getController().updateEnableEditToolBox(false);
        contactInfo.getController().addButtonAddToMyAddressBook(Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('useAddToMyAddressBookButton'));
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

            me.getView().setMasked({xtype:'loadmask'});
            profileStore.load({
                callback: function(records, operation, success) {
                    if (success && records.length) {
                        var profile = records[0];
                        record['data']['details'] = profile;
                        me.getView().fireEvent('requestopendetail','Personify.view.phone.directory.ContactInfoManagement', {
                            record: record.get('details'),
                            recordAttendee: record.get('details'),
                            addToMyAddressBookButton: Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('useAddToMyAddressBookButton'),
                            listOfInfo: Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('listinfoAttendee')
                        });
                    } else {
                        Ext.Msg.alert('', 'Cannot load attendee profile.');
                    }

                    me.getView().setMasked(false);
                }
            });
        } else {
            me.getView().setMasked(false);
            me.getView().fireEvent('requestopendetail','Personify.view.phone.directory.ContactInfoManagement', {
                record: record.get('details'),
                recordAttendee: record.get('details'),
                addToMyAddressBookButton: Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('useAddToMyAddressBookButton'),
                listOfInfo: Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('listinfoAttendee')
            });
        }
        
    }
});