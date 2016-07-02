Ext.define('Personify.controller.phone.directory.contactinfo.ContactInfoEditForm', {
    extend: 'Personify.controller.profile.ContactInfoManagement',

    inject: [
        'currentUser'
    ],
    config: {
        recordProfile: null,
        currentUser: null
    },

    control: {
        memberDetailToolbar: {
            onNavigationButtonTap: 'onBack',
            actionButtonTap: 'onTapDoneEditButton'
        },
        contactinfo: {
            'updatedContact': 'onUpdatedContact',
            'updateContactFail' : 'onUpdateContactFail'
        }
    },

    init: function() {
        Ext.Viewport.setMasked({xtype:'loadmask'});
        var me = this;
        me.getMemberDetailToolbar().getController().setActionText("Save");
        me.getMemberDetailToolbar().getController().setNavigationText("Cancel");

        var config = me.getView().config;
        var record = config.record;
        var listOfInfo = config.listOfInfo;
        var countryListStore = config.countryListStore;

        this.getContactinfo().getController().setCountryListStore(countryListStore);
        this.setEditmode(true);
        this.setListOfInfo(listOfInfo);
        this.setRecord(record);
    },
    onTapDoneEditButton: function() {
        //Ext.Viewport.setMasked({xtype:'loadmask'});
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        this.getContactinfo().getController().saveData();
    },

    onUpdatedContact: function(updatedContact) {
        if(updatedContact) {
            var onBackParams = {};
            onBackParams['updatedContact'] = updatedContact;
            this.onBack(onBackParams);
        }
    },

    onUpdateContactFail: function() {
        var onBackParams = {};
        this.onBack(onBackParams);
    },

    setCanedit: function() {

    },

    setListOfInfo: function(listOfInfo) {
        if(listOfInfo) {
            this.getContactinfo().getController().showListInfo(listOfInfo);
        }
    },
    onBack: function(onBackParams) {
        var me = this;
        var thisView = me.getView();
        thisView.fireEvent('back', this, onBackParams);
    },
    resetToolbox: function() {

    },

    updateEnableEditToolBox: function(value) {
        if(this.getView()) {
            this.getMemberDetailToolbar().getController().setHiddenActionButton(!value);
        }
    },

    refreshRecordAfterEditing: function() {

    },

    setEditmode: function(newValue) {
        this.callParent(arguments);
        //Ext.Viewport.setMasked(false);
    }
});
