Ext.define('Personify.controller.eventdescription.DescriptionPanel',{
    extend: 'Personify.base.Controller',
    requires: 'Personify.view.news.NewsPage',

    control: {
        descriptionEventHeader: {
            inmyscheduletap: 'onInMyScheudleTap'
        },
        descriptionContent:{
        },
        descriptionLinks:{
            itemtap: 'onItemTapQuickLink'
        },
        quickLinkPanel: {},
        sponsorPanel: {}
    },

    init: function() {
        var record = this.getView().getRecord();
        this.setRecord(record);
    },

    setRecord: function(record) {
        var me = this;

        if (record) {
            var quickLinkStore = record.QuickLinkListEvent;
            this.getView().setRecord(record);
            this.getDescriptionEventHeader().getController().setRecord(record);
            this.getDescriptionContent().setRecord(record);
            var sponsorRecord = record.SponsorListEvent;

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

            quickLinkStore.clearFilter();
            quickLinkStore.setRemoteFilter(false);
            quickLinkStore.filterBy(function(item) {
                if (item.get('name')) {
                   return true;
                }
            }, this);

            if(quickLinkStore.getCount() > 0) {
                this.getDescriptionLinks().setStore(quickLinkStore);
            } else {
                this.getQuickLinkPanel().hide();
            }
        }
    },
    
    onInMyScheudleTap: function(isAdded){
        var view = this.getView();
        var record = view.getRecord();
        if(isAdded){
            this.getView().getParent().fireEvent('deletesession', record, view, true);
        }else{
            this.getView().getParent().fireEvent('addsessiontoagenda', record, view, true);
        }
    },
    
    onItemTapQuickLink: function(dataview, index, target, record, e, eOpts) {
           var ref = null;
        if (Ext.os.is.Android) {
            ref = window.open(record.get('url'), '_blank', 'location=yes,enableViewportScale=yes');
        } else {
            ref = window.open(record.get('url'), '_blank', 'location=yes,enableViewportScale=yes');
        }
           Personify.utils.BackHandler.pushActionAndTarget('close', ref);
           ref.addEventListener('exit', function() {
                Personify.utils.BackHandler.popActionAndTarget('close', ref);
            });
    }
});