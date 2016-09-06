	Ext.define('Personify.profile.Phone', {
    extend: 'Personify.profile.AppProfile',

    config: {
        name: 'phone',
        namespace: 'phone',
        views: ['Personify.view.phone.Main']
    },

    isActive: function() {
        return Ext.os.is.Phone;
    },

    initViews: function() {
        this.callParent(arguments);
        Ext.Viewport.add(Ext.create('Personify.view.phone.Main'));
               
       // Adjust toolbar height when running in iOS to fit with new iOS 7 style
       if (Ext.os.is.iOS && Ext.os.version.major >= 7) {
            Ext.select(".banner-container").applyStyles("height: 62px; padding-top: 15px;");
        }
    }
});
