Ext.define('Personify.controller.event.complexevent.detailsession.PresenterList',{
    extend: 'Personify.base.Controller',
    control: {
        listSessionPresenter: {
            itemtap: 'onPresenterItemTap'
        }
    },

    init: function(){
        var record = this.getView().getRecord();
        this.setRecord(record);
    },
    
    setRecord: function(record){
        if (record) {
            if (record.SpeakerSession) {
                var store = record.SpeakerSession;

                store.setGrouper({
                    groupFn: function(record) {
                        return record.get('name')[0];
                    }
                });
                store.setSorters({
                    sorterFn: function(record1, record2) {
                        var firstName1 = record1.get('name');
                        var firstName2 = record2.get('name');
                        var fName1 = firstName1[0];
                        var fName2 = firstName2[0];
                        return fName1 > fName2 ? 1 : (fName1 == fName2 ? 0 : -1);
                    }
                });
                store.setRemoteFilter(false);
                store.clearFilter();
                this.getListSessionPresenter().setStore(store);
            }
        }
    },
    
    onPresenterItemTap: function(arg1, arg2, arg3, record) {
        if(record) {
            this.getView().fireEvent('showPresenterDetails', record);
        }
    }
});