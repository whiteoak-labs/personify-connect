Ext.define('Personify.controller.ExhibitorAndDetail', {
    extend: 'Personify.base.Controller',

    control: {
        exhibitorlistPanel: {
            onexhibitortap: 'onEventExhibitorItemTap',
            updateAddMyScheduleButton: 'updateAddMyScheduleButton'
        },
        exhibitorDetailPanel: {
            onmapit: 'onTapBtnMapExhibitor',
            oninmyscheduletap: 'onInMyscheduleTap'
        },
        mapExhibitorPanel: {
            removeexhibitorsuccess: 'onRemoveExhibitorSuccess'
        }
    },

    init: function() {
        var record = this.getView().getRecord();
        var meetingRecord = this.getView().getMeetingRecord();

        this.getExhibitorlistPanel().setRecord(meetingRecord);

        this.getExhibitorDetailPanel().setMeetingRecord(meetingRecord);

        this.getMapExhibitorPanel().setShowAnimation(false);
        this.getMapExhibitorPanel().setMeetingRecord(meetingRecord);
        this.getMapExhibitorPanel().setRecord(record);
    },

    onEventExhibitorItemTap: function(record){
           if (!navigator.onLine) {
                Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
                return;
           }
           this.getView().setMasked({xtype:'loadmask'});
           var record1 = this.getView().getRecord();
           var me = this;
           var currentUser = Personify.utils.Configuration.getCurrentUser();
           var attributes = {
                "MasterCustomerId": record.get('masterCustomerID'),
                "XbtID": record.get('exhibitionID'),
                "XbtParentProduct": record1.get('xbtParentProduct'),
                "SubCustomerId": record.get('subCustomerID'),
                "XbtProductCode": record1.get('xbtProductCode')
           };
           
           var storeManager = Personify.utils.ServiceManager.getStoreManager();
           var exhibitorStore = storeManager.getExhibitorStore();
           var storeExhibitor = Ext.create(exhibitorStore);
           var storeMyExhibitor = Ext.create(exhibitorStore);
           
           storeExhibitor.setDataRequest(attributes);
           //record.ExhibitorStore = storeExhibitor;
           
           storeExhibitor.load({scope: me, callback: function(records, operation, success) {
                               
                if(success && records.length>0)
                {
                    var exhibitorRecord =records[0];
                    exhibitorRecord.set('recordId',record.get('recordId'));
                    exhibitorRecord.set('name',record.get('name') || '');
                    exhibitorRecord.set('boothNos',record.get('boothNos'));
                    exhibitorRecord.set('email',record.get('email'));
                    exhibitorRecord.set('phone',record.get('phone'));
                    exhibitorRecord.set('webSiteURL',record.get('webSiteURL'));
                    exhibitorRecord.set('fax',record.get('fax'));
                    exhibitorRecord.set('imageURL',record.get('imageURL'));
                    exhibitorRecord.set('isAdded',record.get('isAdded'));
                    exhibitorRecord.set('masterCustomerID',record.get('masterCustomerID'));
                    exhibitorRecord.set('subCustomerID',record.get('subCustomerID'));
                    exhibitorRecord.set('exhibitionID',record.get('exhibitionID'));                    
                    me.getExhibitorDetailPanel().setRecord(exhibitorRecord);
                    this.getView().setActiveItem(1);
                    Personify.utils.BackHandler.pushActionAndTarget('setActiveItem', this.getView(), 0);
                    this.getView().setMasked(false);
                    }else{
                        this.getView().setMasked(false);
                    }
                    
            }});

           
        //this.getExhibitorDetailPanel().setRecord(record);
        //this.getView().setActiveItem(1);
           
       //Personify.utils.BackHandler.pushActionAndTarget('setActiveItem', this.getView(), 0);
    },

    onTapBtnMapExhibitor: function(record, boothNosPresent){
        //// Added to filter MAP
        this.getMapExhibitorPanel().getController().filterMapsByProduct();
           
        this.getMapExhibitorPanel().getController().getExhibitorStore();
        this.getMapExhibitorPanel().getController().setCurrentLocation(boothNosPresent);
        this.getMapExhibitorPanel().getController().showMarker();
        this.getMapExhibitorPanel().getController().selectItemExhibitor(record);
        this.getView().setActiveItem(2);
           
       Personify.utils.BackHandler.pushActionAndTarget('setActiveItem', this.getView(), 1);
    },

    onOpenExhibitorPage: function(){
        this.getView().setActiveItem(0);
    },

    onRemoveExhibitorSuccess: function(){
        this.getExhibitorlistPanel().getController().getAllExhibitorFromSql(this.getView().getMeetingRecord());
    },

    onInMyscheduleTap: function(record) {
        this.getExhibitorlistPanel().getController().onTapInMySchedule(record);
    },

    updateAddMyScheduleButton: function(record) {           
        this.getExhibitorDetailPanel().getController().updateAddMyScheduleButton(record);
    }
});
