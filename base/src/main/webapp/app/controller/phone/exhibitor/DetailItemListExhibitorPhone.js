Ext.define('Personify.controller.phone.exhibitor.DetailItemListExhibitorPhone', {
    extend: 'Personify.base.Controller',

    config: {
        noteNumber: 0
    },

    control: {
        ptoolbarDetailItemListExhibitorPhone: {
            onNavigationButtonTap: 'onTapNavigationButton'
        },
        btnExihibitorDetailLocationPhone: {
            tap: 'onTapBtnExihibitorDetailLocationPhone'
        },
        btnExihibitorDetailProductPhone: {
            tap: 'onTapBtnExihibitorDetailProductPhone'
        },
        btnExihibitorDetailContactPhone: {
            tap: 'onTapBtnExihibitorDetailContactPhone'
        },
        btnExihibitorDetailNotePhone: {
            tap: 'onTapBtnExihibitorDetailNotePhone'
        },
        websitePanel: true,
        phonePanel: true,
        faxPanel: true,
        addToMyExhibitor: {
            tap : 'onAddToMyExhibitorTap'
        }
    },

    init: function() {
        var me = this;
        me.callParent(arguments);
        me.setTextAllButton();
        me.getPtoolbarDetailItemListExhibitorPhone().getController().setHiddenActionButton(true);
        this.getWebsitePanel().on({tap: {
            fn: me.onTapWebsitePanel,
            element: 'element',
            scope: me
        }});
        this.getPhonePanel().on({tap: {
            fn: me.onTapPhonePanel,
            element: 'element',
            scope: me
        }});
        this.getFaxPanel().on({tap: {
            fn: me.onTapFaxPanel,
            element: 'element',
            scope: me
        }});
        var record = me.getView().getRecord();
        if (record) {
            this.loadNoteList();
        }
        var mapData = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('mapData');

        if (mapData) {
            var locationTemp = mapData.locations[record.get('boothNos')];

            if (!locationTemp) {
                this.getBtnExihibitorDetailLocationPhone().hide();
            }
        }
        me.updateAddRemoveButton(record);
    },

    updateAddRemoveButton: function(record) {
        if(record.get('isAdded')) {
            this.getAddToMyExhibitor().setCls('btnRemoveMyExihibitorPhone');
            this.getAddToMyExhibitor().setHtml('Delete from My Exhibitor');
        } else {
            this.getAddToMyExhibitor().setCls('btnAddMyExihibitorPhone');
            this.getAddToMyExhibitor().setHtml('Add to My Exhibitor');
        }
    },

    setTextAllButton: function() {
        var me = this,
            record = me.getView().getRecord(),
            numberProducts = record.ProductsExhibitor.getCount();
            numberContacts = record.ContactsExhibitor.getCount();
        me.getBtnExihibitorDetailProductPhone().setHtml('<b>Products:</b> ' + numberProducts);
        me.getBtnExihibitorDetailContactPhone().setHtml('<b>Contacts:</b> ' + numberContacts);
        me.getBtnExihibitorDetailNotePhone().setHtml('<b>Notes:</b> ' +  me.getNoteNumber());
    },

    onTapNavigationButton: function() {
        this.getView().fireEvent('back', this);
    },

    onTapBtnExihibitorDetailLocationPhone: function() {
        var sessionRecord = this.getView().getRecord();
        var lctData = sessionRecord.get('boothNos');
        this.getView().fireEvent('requestopendetail', 'Personify.view.phone.map.MapNavigation', {record: sessionRecord,locationData: lctData});
    },

    onTapBtnExihibitorDetailProductPhone: function() {
        var me = this,
            record = me.getView().getRecord();
        me.getView().fireEvent('requestopendetail', 'Personify.view.phone.exhibitor.ProductExItemPhone', {record:record});
    },

    onTapBtnExihibitorDetailContactPhone: function() {
        var me = this,
            record = me.getView().getRecord();
        me.getView().fireEvent('requestopendetail', 'Personify.view.phone.exhibitor.ContactExItemPhone', {record:record});
    },

    onTapBtnExihibitorDetailNotePhone: function() {
        var record = this.getView().getRecord();
        var meetingRecord = this.getView().getMeetingRecord();
        var sessionId = record.get('masterCustomerID');
        var eventId = meetingRecord.get('productID');
        var title = record.get('name');
        var view = Ext.create('Personify.view.phone.note.NoteNavigation', {record: record, eventId: eventId, sessionId: sessionId, title: title});
        view.addListener('updatelistnote', this.loadNoteList, this);
        this.getView().fireEvent('requestopendetail', view, null);
    },

    onTapWebsitePanel: function() {
        var record = this.getView().getRecord();
        var url = record.get('webSiteURL');
        if ((url.indexOf('http://') !== 0) && (url.indexOf('https://') !== 0)) {
            url = "http://" + url;
        }
           var ref = null;
        if (Ext.os.is.Android) {
            ref = window.open(url, '_blank', 'location=yes,enableViewportScale=yes');
        } else {
            ref = window.open(url, '_blank', 'location=yes,enableViewportScale=yes');
        }
           Personify.utils.BackHandler.pushActionAndTarget('close', ref);
           ref.addEventListener('exit', function() {
                Personify.utils.BackHandler.popActionAndTarget('close', ref);
            });
    },

    onTapPhonePanel: function() {
        var record = this.getView().getRecord();
        var phoneNumber = record.get('phone');
        this.showActionSheet(phoneNumber, this.getPhonePanel());
    },

    onTapFaxPanel: function() {
        var record = this.getView().getRecord();
        var fax = record.get('fax');
        this.showActionSheet(fax, this.getFaxPanel());
    },

    showActionSheet: function(phoneNumber, panel) {
        if (!Ext.os.is.Tablet && !Ext.os.is.Desktop) {
            var actionSheet = Ext.create("Ext.ActionSheet", {
                width: '250px',
                height: '143px',
                style: 'margin-top: -20px;',
                left: '20%',
                hideOnMaskTap: true,
                items: [
                    {
                        text: 'Call Phone',
                        handler: function() {
                            actionSheet.hide();
                            window.plugins.phoneDialer.dial(phoneNumber,'CALL');
                        }
                    },
                    {
                        text: 'SMS',
                        handler: function() {
                            actionSheet.hide();
                            window.plugins.phoneDialer.dial(phoneNumber,'SMS');
                        }
                    },
                    {
                        text: 'Cancel',
                        ui: 'confirm',
                        handler: function() {
                            actionSheet.hide();
                        }
                    }
                ]
            });
            Ext.Viewport.add(actionSheet);
            actionSheet.showBy(panel,'tl-br?');
        }
    },

    loadNoteList: function() {
        var me = this;
        var record = this.getView().getRecord();
        var meetingRecord = this.getView().getMeetingRecord();
        var sessionId = record.get('masterCustomerID');
        var eventId = meetingRecord.get('productID');
        var attributes = {
            "eventId": eventId,
            "sessionId": sessionId
        };
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var store = Ext.create(storeManager.getNoteListStore());
        store.setDataRequest(attributes);
        store.load({callback: function(records, operation, success) {
            me.setNoteNumber(records.length);
            me.getBtnExihibitorDetailNotePhone().setHtml('<b>Notes:</b> ' +  me.getNoteNumber());
        }});
    },

    onAddToMyExhibitorTap: function(){
           
        var record = this.getView().getRecord();
        var meetingRecord = this.getView().getMeetingRecord();
                  
        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if(currentUser && currentUser.isLogged()) {
            var store = record.ExhibitorStore,//// meetingRecord.ExhibitorStore,
                exhibitorId = record.get('recordId') || null,
                customerId = currentUser.get('masterCustomerId') || null,
                subCustomerId = currentUser.get('subCustomerId') || null,
                productId = meetingRecord.get('productID') || null;

           //// It is Exhibitor List Record
           var listRecord=this.getView().getExhibitorListRecord();
           
           if(record.get('isAdded') != true) {
                Personify.utils.Sqlite.insertTableExhibitor(exhibitorId, productId, customerId, subCustomerId, function(success) {
                    if(success) {
                        
                        //// Set Details and List record
                        record.set('isAdded', true);
                        listRecord.set('isAdded', true);
                                                            
                        me.getView().fireEvent('updatemyexibitors');
                        
                        me.updateAddRemoveButton(record);
                        Ext.Msg.alert('', 'Exhibitor has been added to your exhibitors.', Ext.emptyFn);
                    } else {
                        Ext.Msg.alert('', 'Add Exhibitor Failed.', Ext.emptyFn);
                    }
                });
            } else {
                Personify.utils.Sqlite.deleteMyExhibitor(exhibitorId, productId, customerId, subCustomerId, function(success) {
                    if(success) {                                               
                        //// Set Details and List record
                        record.set('isAdded', false);
                        listRecord.set('isAdded', false);
                        me.getView().fireEvent('updatemyexibitors');
                        
                        me.updateAddRemoveButton(record);
                        Ext.Msg.alert('', 'Exhibitor has been removed.', Ext.emptyFn);
                    } else {
                        Ext.Msg.alert('', 'Delete Exhibitor Failed.', Ext.emptyFn);
                    }
                });
            }
        } else {
            Personify.utils.ItemUtil.needToLogin();
        }
    }
});
