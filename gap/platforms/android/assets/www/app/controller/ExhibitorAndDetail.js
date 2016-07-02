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
        this.getExhibitorDetailPanel().setRecord(record);
        this.getView().setActiveItem(1);
    },

    onTapBtnMapExhibitor: function(record, boothNosPresent){
        //// Added to filter MAP
        this.getMapExhibitorPanel().getController().filterMapsByProduct();
           
        this.getMapExhibitorPanel().getController().getExhibitorStore();
        this.getMapExhibitorPanel().getController().setCurrentLocation(boothNosPresent);
        this.getMapExhibitorPanel().getController().showMarker();
        this.getMapExhibitorPanel().getController().selectItemExhibitor(record);
        this.getView().setActiveItem(2);
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
