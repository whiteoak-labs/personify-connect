Ext.define('Personify.controller.help.Settings', {
    extend: 'Personify.base.Controller',
    control: {
        applysetting: {
            tap: 'onTapApply'
        },
        settingOption: true
    },

    init: function(){
        var me = this;

        if (window.plugins.applicationPreferences) {
            window.plugins.applicationPreferences.getString('app47Id',
                function(result) {
                    me.getSettingOption().setValue(result);
                },
                function() {}
            );
        }
    },

    onTapApply: function() {
        if (!window.plugins.app47) {
            Ext.Msg.alert('', 'App47 is supported on devices only.', Ext.emptyFn);
            return;
        }

        var me = this;
        var app47Id = me.getSettingOption().getValue();

        if (window.plugins.applicationPreferences) {
            window.plugins.applicationPreferences.setString('app47Id', app47Id, function() {
                Ext.Msg.alert('', 'Configured App47 agent successfully. Re-launch the app for your change to take effect.', Ext.emptyFn);

                var mainView = Ext.ComponentQuery.query('#mainView')[0];
                mainView.getController().logout();
                window.plugins.applicationPreferences.setString('configurationLoaded', '0', Ext.emptyFn, Ext.emptyFn);
            }, function(error) {
                Ext.Msg.alert('', 'There was an error configuring App47 agent, please check your App47 ID.', Ext.emptyFn);
            });
        }
    }
});