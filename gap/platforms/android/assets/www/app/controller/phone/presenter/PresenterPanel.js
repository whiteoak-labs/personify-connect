Ext.define('Personify.controller.phone.presenter.PresenterPanel',{
    extend: 'Personify.base.Controller',
    requires: 'Personify.view.phone.directory.ContactInfoManagement',

    control: {
        ptoolbarPresentersPhone: {
            onNavigationButtonTap: 'onTapNavigationButton'
        },
        presenterlistpanelphone: {
            selectpresentersitem: 'onSelectPresenter'
        },
        presenterTitleBar: true
    },

    init: function() {
        this.getPtoolbarPresentersPhone().getController().setHiddenActionButton(true);
        var record = this.getView().getRecord();
        var title = '';

        if (record.get('shortName')) {
           title = record.get('shortName');
        } else {
            if (record.get('title')) {
                title = record.get('title');
            }
        }

        this.getPresenterTitleBar().setHtml(Personify.utils.ItemUtil.getShortContent(title, 48));
        this.setRecord(record);
    },

    onTapNavigationButton: function() {
        this.getView().fireEvent('back', this);
    },

    setRecord: function(record) {
        if(record.SpeakersListEvent){
            this.getPresenterlistpanelphone().getController().setStore(record.SpeakersListEvent);
        } else if(record.SpeakerSession){
            this.getPresenterlistpanelphone().getController().setStore(record.SpeakerSession);
        }
    },

    onSelectPresenter: function(record) {
        var me = this;
        if(record) {
            var storeManager = Personify.utils.ServiceManager.getStoreManager(),
                storeName = storeManager.getCustomerBiographyStore(),
                store = Ext.create(storeName);
            store.setDataRequest(record);
            me.getView().setMasked({xtype:'loadmask'});
            store.load({
                callback: function(records, operation, success) {
                    var bioRecord = null;
                    if(records.length > 0) {
                        bioRecord = records[0];
                    }

                    me.getView().fireEvent('requestopendetail','Personify.view.phone.directory.ContactInfoManagement', {
                        record: me.getView().config.record,
                        listOfInfo: Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('listinfoPresenter'),
                        bio: bioRecord,
                        presenterRecord: record
                    });
                    me.getView().setMasked(false);
                },
                scope: me
            });
        }
    }
});
