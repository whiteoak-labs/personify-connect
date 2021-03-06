Ext.define('Personify.controller.tablet.directory.DirectoryManagement', {
    extend: 'Personify.controller.directory.DirectoryManagement',
    
    control: {
        searchDirectoryPanel : {
            seachclearicontap : 'onClearIconTap',
            tapsearchbutton : 'onSearchTextChanged',
            onsearchtextchange : 'onSearchTextChanged'
        },
        directorylist: {
            scrollend: 'onNextButtonTap'
        },
        view: {
            painted: 'onPaint'
        }
    },
    
    init: function() {
        this.callParent(arguments);
        this.getSearchDirectoryPanel().getController().setPlaceHolder("Search Directories");
    }
})