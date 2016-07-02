Ext.define('Personify.controller.exhibitor.DetailExhibitor', {
    extend: 'Personify.base.Controller',
    requires: 'Personify.view.event.complexevent.detailsession.Notes',

    config: {
        productExhibitorItem: null,
        contactExhibitorItem: null
    },

    control: {
        btnMapExhibitor: {
            tap: 'onTapBtnMapExhibitor'
        },
        inMySchedule: {
            tap: 'onTapAddToMySchedule'
        },
        backToExhibitorList: {
            tap: 'onBackToExhibitorList'
        },
        segmentButtonDetailAboutEx: {
            tap: 'onTapSegBtnDetailAboutEx'
        },
        segmentButtonDetailProductEx: {
            tap: 'onTapSegBtnDetailProductEx'
        },
        segmentButtonDetailContactEx: {
            tap: 'onTapSegBtnDetailContactEx'
        },
        segmentButtonDetailNoteEx: {
            tap: 'onTapSegBtnDetailNoteEx'
        },
        aboutExhibitorPanel: true,
        panelContDetailDescExhibitorItem: true,
        descExhibitorItem: true,
        segmentedButtonDetail: true
    },

    setRecord: function(record) {
        this.getDescExhibitorItem().setRecord(record);

        if (record) {
            this.onTapSegBtnDetailAboutEx();
            this.getSegmentedButtonDetail().setPressedButtons(this.getSegmentButtonDetailAboutEx());

            if (!record.get('boothNos') || record.get('boothNos') === '') {
                this.getBtnMapExhibitor().hide();
            } else {
                this.getBtnMapExhibitor().show();
                var mapData = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('mapData');

                if (mapData) {
                    var locationTemp = mapData.locations[record.get('boothNos')];

                    if (!locationTemp) {
                        this.getBtnMapExhibitor().hide();
                    }
                }
            }

            if (record.get('isAdded')) {
                this.getInMySchedule().setCls('p-button-RemoveSchedule');
                this.getInMySchedule().setHtml('Remove');
            } else {
                this.getInMySchedule().setCls('p-button-AddToSchedule');
                this.getInMySchedule().setHtml('Add <br/>Exhibitor');
            }
        }
    },

    onBackToExhibitorList: function() {
        this.getView().getParent().setActiveItem(0);
    },

    onTapBtnMapExhibitor: function() {
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Exhibitor View on Map');
        }
        var record = this.getView().getRecord();
        var boothNosPresent = record.get('boothNos') ? record.get('boothNos') : null;
        this.getView().fireEvent('onmapit', record, boothNosPresent);
    },

    onTapSegBtnDetailAboutEx: function() {
        this.getPanelContDetailDescExhibitorItem().removeAll(true);
        var aboutPanel = this.getPanelContDetailDescExhibitorItem().add({ xtype: 'aboutExhibitorPanel' });
        var storeExhibitor = allExhibitorList.getStore();

        if (!this.getView().getRecord()) {
            aboutPanel.setRecord(storeExhibitor.getAt(0));
        } else {
            aboutPanel.setRecord(this.getView().getRecord());
        }
    },

    onTapSegBtnDetailProductEx: function() {
        this.getPanelContDetailDescExhibitorItem().removeAll(false);
        var productsPanel = this.getPanelContDetailDescExhibitorItem().add({ xtype: 'productExhibitorItem' });
        var storeExhibitor = allExhibitorList.getStore();

        if (!this.getView().getRecord()) {
            productsPanel.setRecord(storeExhibitor.getAt(0));
        } else {
            productsPanel.setRecord(this.getView().getRecord());
        }
    },

    onTapSegBtnDetailContactEx: function() {
        this.getPanelContDetailDescExhibitorItem().removeAll(true);
        var contactsPanel = this.getPanelContDetailDescExhibitorItem().add({ xtype: 'contactExhibitorItem' });
        var storeExhibitor = allExhibitorList.getStore();

        if (!this.getView().getRecord()) {
            contactsPanel.setRecord(storeExhibitor.getAt(0));
        } else {
            contactsPanel.setRecord(this.getView().getRecord());
        }
    },

    onTapSegBtnDetailNoteEx: function() {
        this.getPanelContDetailDescExhibitorItem().removeAll(true);
        var record = this.getView().getRecord();
        var meetingRecord = this.getView().getMeetingRecord();
        var sessionId = record.get('masterCustomerID');
        var eventId = meetingRecord.get('productID');
        this.getPanelContDetailDescExhibitorItem().add({ xtype: 'sessionnotes', record: record, meetingRecord: meetingRecord, sessionId : sessionId, eventId : eventId});
    },

    onTapAddToMySchedule: function() {
        var record = this.getView().getRecord();
        if (Personify.utils.Configuration.getAllowChangeView()) {
            var currentUser = Personify.utils.Configuration.getCurrentUser();
            if (currentUser && currentUser.isLogged()) {
                this.getView().fireEvent('oninmyscheduletap', record);
            } else {
                Personify.utils.ItemUtil.needToLogin();
            }
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },

    updateAddMyScheduleButton: function(record) {
        if (record.get('isAdded')) {
            this.getInMySchedule().setCls('p-button-RemoveSchedule');
            this.getInMySchedule().setHtml('Remove');
        } else {
            this.getInMySchedule().setCls('p-button-AddToSchedule');
            this.getInMySchedule().setHtml('Add <br/>Exhibitor');
        }
    }
});
