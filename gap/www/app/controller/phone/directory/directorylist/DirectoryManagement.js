Ext.define('Personify.controller.phone.directory.directorylist.DirectoryManagement', {
    extend: 'Personify.controller.directory.DirectoryManagement',
    
    inject: [
        'personify',
        'currentUser'
    ],
    config: {
        personify: null,
        currentUser: null,
        params: null
    },
    control: {
        directorySearchField : {
            onClearIconTap : 'onClearIconTap',
            onTextChange : 'onSearchTextChanged'
        },
        directoryToolbar: {
            onNavigationButtonTap: 'onBack'
        },
        directorylist: {
            scrollend: 'onNextButtonTap'
        },
        view: {
            painted: 'onPaint'
        }
    },
    
    init: function() {
//        this.callParent(arguments);
        if (window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Directory List');
        }

        var itemId = this.getView().config.itemId;
        this.getView().setItemId(itemId);
        this.getDirectoryToolbar().getController().setHiddenActionButton(true);
    },
    onLoadedSelectedContactInfo: function(record) {
        this.getView().fireEvent('loadedSelectedContactInfo', record);
    },
    
    onBack: function() {
        var me = this;
        var thisView = me.getView();
        thisView.fireEvent('back',this, null);
    },
    
    refreshRecordAfterEditing: function() {
    }
})