Ext.define('Personify.controller.directory.DirectoryList', {
    extend: 'Personify.base.Controller', 

    control: {
        view: {
            itemtap: 'onSelectContactRow',
            itemtouchstart: 'onItemTouchStartDirectory',
            itemtouchend: 'onItemTouchEndDirectory'
        }
    },

    onItemTouchStartDirectory: function(dataview, index, target, record, e, eOpts) {
        target.addCls('x-item-pressed');
    },

    onItemTouchEndDirectory: function(dataview, index, target, record, e, eOpts) {
        target.removeCls('x-item-pressed');
    },

    onSelectContactRow: function(item, index, target, record, e, eOpts) {
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Directory Detail');
        }
        this.getView().getParent().getParent().fireEvent('select', item, index, target, record, e, eOpts);
    }
});