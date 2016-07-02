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
                this.setIndexItemCardExhibitorPanelPhoneActive(1);
                this.getCardExhibitorPanelPhone().setActiveItem(1);
            } else {
                Personify.utils.ItemUtil.needToLogin();
            }
        } else {
            this.setIndexItemCardExhibitorPanelPhoneActive(0);
            this.getCardExhibitorPanelPhone().setActiveItem(0);
        }
    },

    openItemExhibitorList: function(record) {
        var meetingRecord = this.getView().getRecord();
        var view = Ext.create('Personify.view.phone.exhibitor.DetailItemListExhibitorPhone', {record: record, meetingRecord: meetingRecord});
        view.addListener('updatemyexibitors', this.updateMyExhibitors, this);
        this.getView().fireEvent('requestopendetail', view, null );
    },

    updateMyExhibitors: function(){
        var record = this.getView().getRecord();
        this.getMyExhibitorPanelPhone().getController().getMyExhibitorFromSql(record);
    }
});
