Ext.define('Personify.controller.phone.attendee.Attendee', {
    extend: 'Personify.base.Controller',
    config: {
           params: null,
           itemsPerPage: 10,
           totalAttendeesResult: 0,
           startIndexForService:1,
           searchTerm:''
           },

    control: {
        ptoolbarAttendeesPhone: {
            onNavigationButtonTap: 'onTapNavigationButton'
        },
        attendeeslistpanelphone: {
            selectattendeesitem: 'onSelectAtendeeItemTap',
            onscrollendattendees:'onScrollEndAttendees'
        },
        attendeeInfo: true,
        attendeeContent: true
    },
    init: function(){
          
           this.getPtoolbarAttendeesPhone().getController().setHiddenActionButton(true);
          
           //// Show records which are fetched in : Personify.controller.phone.event.ConfrerenceNavigation
           var record = this.getView().getRecord();
           
           //// Set Items Per Page
           var itemperpage=Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('itemsPerPageAttendeeList');
           this.setItemsPerPage(itemperpage);
           
          
           //// Set Parameter For Service for First time:
           this.paramsForService(record,true);
           this.resetAttendee(true,'',record);
           this.loadAttendeeModel(record);
           this.setRecord(record);
          
    },

    /* To enhance performance */
    
    //// To Set Parameter for Service
    paramsForService:function(record,resetStartIndex)
    {
           var me=this;
           var currentUser = Personify.utils.Configuration.getCurrentUser();
           
           me.setStartIndexForService(resetStartIndex=true? 1 : me.getItemsPerPage()+1);
           
           var attributes = {
           IsStaffMember: currentUser? currentUser.isStaffMember().toString() : false,
           ItemsPerPage: me.getItemsPerPage(),
           MasterCustomerID: currentUser? currentUser.get('masterCustomerId'): '' ,
           SubCustomerID: currentUser? currentUser.get('subCustomerId'): '',
           ProductID: record.get('productID'),
           SearchTerm: me.getSearchTerm(),
           StartIndex: me.getStartIndexForService()
           };
           me.setParams(attributes);
    },
           
    loadAttendeeModel: function(record) {
           var me = this;
           var attendeeslistpanelphone = this.getAttendeeslistpanelphone();
           attendeeslistpanelphone.setMasked({xtype:'loadmask'});
           
           var storeManager = Personify.utils.ServiceManager.getStoreManager();
           var attendeeName = storeManager.getAttendeeStore();
           
           var attendeeStore = Ext.create(attendeeName);
          
           attendeeStore.setDataRequest(me.getParams());
           attendeeStore.load({
                              callback: function(records, operation, success) {
                             //attendeeslistpanelphone.setMasked({xtype:'loadmask'});
                              if (success && records.length) {
                              
                                    var attendeeManagement = records[0];
                               
                                    var currentStore = attendeeslistpanelphone.getController().getStore();
                                    if (currentStore) {
                                            currentStore.suspendEvents();
                                            attendeeManagement.AttendeeStore.each(function(attendeeRecord) {
                                                      if(attendeeRecord) {
                                                                    currentStore.add(attendeeRecord);
                                                      }
                                                      }, me);
                               
                                            currentStore.sync();
                                            currentStore.resumeEvents(true);
                              
                                        record.MeetingRegistrantStore=currentStore;
                              
                                        attendeeslistpanelphone.getController().setStore(record);
                                        attendeeslistpanelphone.getController().refresh();
                                    } else {
                                        attendeeslistpanelphone.getController().setStore(record);
                                    }
                               
                                    if (attendeeManagement) {
                                        me.setTotalAttendeesResult(attendeeManagement.get('totalResults'));
                                    }
                               
                                    attendeeManagement=null;
                                    currentStore=null;
                               }
                               
                               attendeeslistpanelphone.setMasked(false);
                               
                               },
                              scope: me
                              });
         //attendeeslistpanelphone.setMasked(false);
     },
           
    resetAttendee:function(clearExistingData,searchText,record)
    {
           
        var me=this;
        var currentAttendeeItem = 0;
        me.setSearchTerm(searchText);
           
           if (clearExistingData==true)
           {
                //// Clear the existing data
                ///record.MeetingRegistrantStore.data.clear();
                record.MeetingRegistrantStore.removeAll();
                record.MeetingRegistrantStore.sync();
           }
           else if (record.MeetingRegistrantStore) {
                currentAttendeeItem = record.MeetingRegistrantStore.getCount();
           }
           
           return currentAttendeeItem;
           
    },


    onScrollEndAttendees:function(clearExistingData,searchText)
    {
         var me=this;
        var record = this.getView().getRecord();
         var currentAttendeeItem = me.resetAttendee(clearExistingData,searchText,record);
        if ((currentAttendeeItem==0 && me.getTotalAttendeesResult()==0))
        {
             me.getParams()['searchTerm']=me.getSearchTerm();
             me.getParams()['StartIndex']= 1;
             me.setStartIndexForService(me.getParams()['StartIndex']);
             me.loadAttendeeModel(record);
             
         }
         else if (currentAttendeeItem < me.getTotalAttendeesResult()) {
        
           me.getParams()['searchTerm']=me.getSearchTerm();
           me.getParams()['StartIndex']=currentAttendeeItem + 1;
           me.setStartIndexForService(me.getParams()['StartIndex']);
           me.loadAttendeeModel(record);
        }
    },
    /* End enhance performance */
           
           
    onTapNavigationButton: function() {
           
           var record =this.getView().getRecord();
           if(record && record.MeetingRegistrantStore
              && record.MeetingRegistrantStore.getCount()>0)
           {
                record.MeetingRegistrantStore.removeAll();
                record.MeetingRegistrantStore.sync();
                record=null;
           }
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