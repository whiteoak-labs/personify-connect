Ext.define('Personify.controller.phone.profile.ProfileSetting', {
    extend: 'Personify.controller.profile.DisplayOption',
    inject: [
        'personify',
        'currentUser'
    ],
    
    requires: [
        'Personify.view.phone.purchasehistory.PurchaseHistoryManagement',
        'Personify.view.phone.participationhistory.ParticipationHistoryManagement',
        'Personify.view.phone.profile.ConnectTwitter'
    ],
    
    
    control: {
        profileSettingToolbar: {
            onNavigationButtonTap: 'onBack'
        },
        goOnlineProfile: {
            tap: 'goOnlineProfile'
        },
        viewMyPurchaseHistoryButton: {
            tap: 'onViewMyPurchaseHistoryButtonTap'
        },
        viewMyParticipationHistoryButton: {
            tap: 'onViewMyParticipationHistoryButtonTap'
        },
        toggleOption: {
        },
        connectTwitterButton: {
            tap: 'onOpenConnectTwitter'
        },
        disconnectTwitterButton: {
            tap: 'onUnAuthorizeTwitter'
        },
        view: {
            show: 'onShow'
        }
    },
    
    config: {
        personify: null,
        record: null,
        currentUser: null
    },
    
    init: function() {
        this.getProfileSettingToolbar().getController().setHiddenActionButton(true);
        var config = this.getView().config;
        var me = this;
        var displayOptionPanelRecord = config.displayOptionPanelRecord;
        this.setRecord(displayOptionPanelRecord);

        if (window.plugins.applicationPreferences) {
            window.plugins.applicationPreferences.getString('app47Id',
                function(result) {
                    me.getSettingOption().setValue(result);
                },
                function() {}
            );
        }
    },
    
    onBack: function() {
        var me = this;
        var thisView = me.getView();
        thisView.fireEvent('back', this, null);
    },
    
    onViewMyPurchaseHistoryButtonTap: function() {
        this.getView().fireEvent('requestchangeview','Personify.view.phone.purchasehistory.PurchaseHistoryManagement', {record: this.getView().config.record});
    },
    
    onViewMyParticipationHistoryButtonTap: function() {
        this.getView().fireEvent('requestchangeview','Personify.view.phone.participationhistory.ParticipationHistoryManagement', {record: this.getView().config.record});
    },
    
    refreshRecordAfterEditing: function() {
        
    },

    onOpenConnectTwitter: function() {
        this.getView().fireEvent('requestchangeview', 'Personify.view.phone.profile.ConnectTwitter');
    },

    onShow: function() {
        if (TMA.Twitter.isAuthorized()) {
            this.setVisibleTwitterButton(false);
        } else {
            this.setVisibleTwitterButton(true);
        }
    },

    onUnAuthorizeTwitter: function() {
        TMA.Twitter.unAuthorize();
        this.setVisibleTwitterButton(true);
    },

    setVisibleTwitterButton: function(value) {
        this.getDisconnectTwitterButton().setHidden(value);
        this.getConnectTwitterButton().setHidden(!value);
    }
});
