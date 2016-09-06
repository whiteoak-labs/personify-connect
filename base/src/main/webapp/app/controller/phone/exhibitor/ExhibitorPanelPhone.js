Ext.define('Personify.controller.phone.exhibitor.ExhibitorPanelPhone', {
    extend: 'Personify.base.Controller',

    config: {
        indexItemCardExhibitorPanelPhoneActive : 0
    },

    control: {
        ptoolbarExhibitorPanelPhone: {
            onNavigationButtonTap: 'onTapNavigationButton'
        },
        cardExhibitorPanelPhone: true,
        allExhibitorPanelPhone: {
            openMyExhibitorsList: 'changeShowCurrentListExPhone',
            onTapAllExhibitorListPhoneItem: 'openItemExhibitorList'
        },
        myExhibitorPanelPhone: {
            openAllExhibitorsList: 'changeShowCurrentListExPhone',
            onTapMyExhibitorListPhoneItem: 'openItemExhibitorList'
        }
    },

    init: function() {
        var me = this,
            record = me.getView().getRecord();
        me.getPtoolbarExhibitorPanelPhone().setTitle('Exhibitors');
        me.getPtoolbarExhibitorPanelPhone().getTitle().setCls('p-phone-title-toolbar')
        me.setRecord(record);
        me.getPtoolbarExhibitorPanelPhone().getController().setHiddenActionButton(true);
    },

    setRecord: function(record) {
        var me = this,
            view = me.getView();

        if(view && !view.isDestroyed) {
            if(record) {
                me.getAllExhibitorPanelPhone().setRecord(record);
                me.getMyExhibitorPanelPhone().setRecord(record);
            }
        }
    },

    onTapNavigationButton: function() {
       this.getView().fireEvent('back', this);
    },

    changeShowCurrentListExPhone: function() {
        if(this.getIndexItemCardExhibitorPanelPhoneActive() == 0) {
            var currentUser = Personify.utils.Configuration.getCurrentUser();
            if(currentUser && currentUser.isLogged()) {
           
                //// To Rebind My Exhibitors
                /////this.getMyExhibitorPanelPhone().loadMyExhibitors('',true);
                this.updateMyExhibitors();
          
           
                this.setIndexItemCardExhibitorPanelPhoneActive(1);
                this.getCardExhibitorPanelPhone().setActiveItem(1);
            } else {
                Personify.utils.ItemUtil.needToLogin();
            }
        } else {
           //// To Rebind All Exhibitors
           /////this.getAllExhibitorPanelPhone().loadAllExhibitors('',true);

            this.setIndexItemCardExhibitorPanelPhoneActive(0);
            this.getCardExhibitorPanelPhone().setActiveItem(0);
        }
    },

    openItemExhibitorList: function(recordfromlist) {
           
           if (!navigator.onLine)
           {
                Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
                return;
           }
           
           var me = this;
           me.getView().setMasked({xtype:'loadmask'});

           var recordfromevent = this.getView().getRecord();
           
           
           var attributes = {
                    "MasterCustomerId": recordfromlist.get('masterCustomerID'),
                    "XbtID": recordfromlist.get('exhibitionID'),
                    "SubCustomerId": recordfromlist.get('subCustomerId'),
                    "XbtParentProduct": recordfromevent.get('xbtParentProduct'),
                    "XbtProductCode": recordfromevent.get('xbtProductCode')     
            };
           
           var storeManager = Personify.utils.ServiceManager.getStoreManager();
           var exhibitorDetailsStore = storeManager.getExhibitorStore();
           var storeExhibitorDetails = Ext.create(exhibitorDetailsStore);
           
           storeExhibitorDetails.setDataRequest(attributes);
           storeExhibitorDetails.load({scope: me, callback: function(records, operation, success){
                                        ///record.ExhibitorStore = storeExhibitorList;
                                        ///me.getAllExhibitorFromSql(record, currentUser, storeExhibitorList);
                                        ///me.removeMask();
                                      
                        if (records.length>0)
                        {
                                ///// Set value of following records from List Records to Details Record
                                var exhibitorDetails=records[0];
                                exhibitorDetails.set('recordId',recordfromlist.get('recordId') || 0);
                                exhibitorDetails.set('boothNos',recordfromlist.get('boothNos') || '');
                                exhibitorDetails.set('name',recordfromlist.get('name') || '');
                                exhibitorDetails.set('email',recordfromlist.get('email') || '');
                                exhibitorDetails.set('phone',recordfromlist.get('phone') || '');
                                exhibitorDetails.set('webSiteURL',recordfromlist.get('webSiteURL') || '');
                                exhibitorDetails.set('fax',recordfromlist.get('fax') || '');
                                exhibitorDetails.set('imageURL',recordfromlist.get('imageURL') || '');
                                exhibitorDetails.set('masterCustomerID',recordfromlist.get('masterCustomerID') || '');
                                exhibitorDetails.set('productID',recordfromevent.get('productID') || '');
                                exhibitorDetails.set('isAdded',recordfromlist.get('isAdded'));
                                      
                                //// set isadded value from Exhibitor List to Events
                                var meetingRecord = this.getView().getRecord();
                                meetingRecord.set("isAdded",recordfromlist.get("isAdded"));
                                      
                                var view = Ext.create('Personify.view.phone.exhibitor.DetailItemListExhibitorPhone', {record: exhibitorDetails, meetingRecord: meetingRecord,exhibitorListRecord:recordfromlist});
                                      
                                view.addListener('updatemyexibitors', this.updateMyExhibitors, this);
                                      
                                this.getView().fireEvent('requestopendetail', view, null );
                                      
                                me.getView().setMasked(false);
                        }
                        else
                        {
                                      me.getView().setMasked(false);
                        }
                                      
                }});
    },

    updateMyExhibitors: function(){
        var record = this.getView().getRecord();
        this.getMyExhibitorPanelPhone().getController().getMyExhibitorFromSql(record);
    }
});
