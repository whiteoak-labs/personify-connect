Ext.define('Personify.controller.phone.directory.directorylist.DirectoryList', {
    extend: 'Personify.controller.directory.DirectoryList',
    
    control: {
        view: {
            itemtap: 'onSelectContactRow'
        }
    },
    
    onSelectContactRow: function(item, index, target, record, e, eOpts) {
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Directory Detail');
        }
        this.getView().getParent().getParent().fireEvent('select', item, index, target, record, e, eOpts);
    }
})