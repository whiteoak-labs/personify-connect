Ext.define('Personify.controller.event.search.SearchPanel',{
    extend: 'Personify.base.Controller',

    control: {
        searchField: {
            clearicontap: 'onClearIconTap',
            keyup: 'onSearchKeyUp',
            change: 'onTextChange'
        },
        searchEventButton: {
            tap: 'onTapSearchButton'
        }
    },

    onSearchKeyUp: function(field, e) {        
        this.getView().fireEvent('seachkeyup', field.getValue(), e.browserEvent.keyCode);
        if(e.browserEvent.keyCode == 13)
           this.getView().fireEvent('onsearchtextchange', field.getValue(), e.browserEvent.keyCode);
    },

    onClearIconTap: function() {
        this.getView().fireEvent('seachclearicontap');
    },

    onTapSearchButton: function() {
        var value = this.getSearchField().getValue().trim();
        this.getView().fireEvent('tapsearchbutton', value)
    },

    onTextChange: function(arg1, newText, oldText, arg4, arg5) {
        this.getView().fireEvent('onsearchtextchange',newText);
    },

    setPlaceHolder: function(value) {
        if(value) {
            this.getSearchField().setPlaceHolder(value);
        }
    },

    clearSearchField: function() {
        this.getSearchField().setValue('');
    }
});