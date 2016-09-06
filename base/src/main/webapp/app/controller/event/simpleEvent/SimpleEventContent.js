Ext.define('Personify.controller.event.simpleEvent.SimpleEventContent',{
    extend: 'Personify.base.Controller',
    control: {
        simpleEventHeader: {
            addagenda: 'addNewCustomerMeetingAgenda',
            deleteagenda: 'onDeleteMeetingAgenda',
            onmaptap: 'onTapMapItDetail'
        },
        cardMainDetailContainer: true,
        sponsorPanel: true
    },
    requires: [
        'Personify.view.eventdescription.DescriptionContent',
        'Personify.view.event.complexevent.detailsession.Rate'
    ],
    
    init: function(){
        var record = this.getView().getRecord();
        this.setRecord(record);
    },
    
    setRecord: function(record){
        var me = this;

        if (record) {
            var subView = Ext.create('Personify.view.eventdescription.DescriptionContent', {record: record});
            var cardMainDetailContainer = this.getCardMainDetailContainer();
            cardMainDetailContainer.removeAll(true, true);
            cardMainDetailContainer.add(subView);
            this.getSimpleEventHeader().getController().setRecord(record);
            var sponsorRecord = record.SponsorListEvent;

            Personify.utils.ItemUtil.getSponsorListFromJsonFile (
                Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('sponsorEvents'), record.get('productID'), sponsorRecord, function() {
                    if (sponsorRecord.getCount() > 0) {
                        if (me['getSponsorPanel']) {
                            me.getSponsorPanel().getController().setStore(sponsorRecord);
                            me.getSponsorPanel().show();
                        }
                    } else {
                        if (me['getSponsorPanel']) {
                            me.getSponsorPanel().hide();
                        }
                    }
                }
            );
        }
    },

    addNewCustomerMeetingAgenda: function(){
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }

        Ext.Viewport.setMasked({xtype: 'loadmask'});
        var me = this;
        var record = this.getView().getRecord();
        var currentUser = Personify.utils.Configuration.getCurrentUser();

        currentUser.addEventToSchedule(record).then({
                success: function(recordsResponse) {
                    if (recordsResponse) {
                        record.set('appointmentId', recordsResponse.get('appointmentId'));
                    }

                    if (!record.get('isAdded')) {
                        record.set('isAdded', true);
                    }

                    me.getSimpleEventHeader().getController().updateAddRemoveButton(record);
                    me.refreshDataAgenda();
                    Ext.Msg.alert('', 'Meeting has been added to your schedule.');
                },
                failure: function() {
                    Ext.Msg.alert('', 'Error occurred while adding to your schedule.');
                }
            }).always(
            function() {
                Ext.Viewport.setMasked(false);
            }
        );
    },
    
    onDeleteMeetingAgenda: function(){
        var record = this.getView().getRecord();
        this.getView().getParent().fireEvent('deletesession', record, this.getView());
    },
    
    refreshDataAgenda: function(){
        this.getView().getParent().fireEvent('refreshmyschedule');
    },
    
    onTapMapItDetail: function(){
        var record = this.getView().getRecord();
        this.getView().getParent().fireEvent('buttonmapittap', record);
    }
});