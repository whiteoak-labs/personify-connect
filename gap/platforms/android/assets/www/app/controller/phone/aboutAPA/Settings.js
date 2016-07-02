Ext.define('Personify.controller.phone.aboutAPA.Settings', {
    extend: 'Personify.base.Controller',
    control: {
        ptoolbarSettings: {
            onNavigationButtonTap: 'onBack'
        },
        settingOption: true,
        applySetting: {
            tap: 'onTapApply'
        }
    },

    init: function() {
        var me = this;
        me.getPtoolbarSettings().getController().setHiddenActionButton(true);

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
        this.getView().fireEvent('back',this);
    },

    onTapApply: function() {
        if (!window.plugins.app47) {
            Ext.Msg.alert('', 'App47 is supported on devices only.', Ext.emptyFn);
            return;
        }

        var me = this;
        me.getSettingOption().blur();
        var app47Id = me.getSettingOption().getValue();

        if (window.plugins.applicationPreferences) {
            window.plugins.applicationPreferences.setString('app47Id', app47Id, function() {
                Ext.Msg.alert('', 'Configured App47 agent successfully. Re-launch the app for your change to take effect.', Ext.emptyFn);

                me.getView().fireEvent('loggedout');
                window.plugins.applicationPreferences.setString('configurationLoaded', '0', Ext.emptyFn, Ext.emptyFn);
            }, function(error) {
                Ext.Msg.alert('', 'There was an error configuring App47 agent, please check your App47 ID.', Ext.emptyFn);
            });
        }
    }
});