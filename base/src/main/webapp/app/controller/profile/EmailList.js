Ext.define('Personify.controller.profile.EmailList', {
    extend: 'Personify.base.Controller',
    control: {
        view: {
            itemtap: 'onItemTapEmailList'
        }
    }, //end config

    onItemTapEmailList: function(list, index, target, record, e, eOpts) {
        if (window.plugins['EmailComposer'])
            window.plugins.EmailComposer.showEmailComposer(null, null, null, [record.get('value')], null, null);
    }
});
