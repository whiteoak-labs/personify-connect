Ext.define('Personify.controller.phone.common.SearchFieldWithSearchKeyBoard', {
    extend: 'Personify.controller.event.search.SearchPanel',

    control: {
        view: {
            clearicontap: 'onClearIconTap',
            keyup: 'onSearchKeyUp',
            change: 'onTextChange',
           focus:'focus'
        }
    },

    onClearIconTap: function() {
        this.getView().fireEvent('onClearIconTap');
    },

    onSearchKeyUp: function(field, e) {
        this.getView().fireEvent('onSearchKeyUp', field.getValue(), e.browserEvent.keyCode);
    },

    onTextChange: function(arg1, newText, oldText, arg4, arg5) {
        this.getView().fireEvent('onTextChange', newText);
    },

    clearSearchField: function() {
        this.getView().setValue('');
    },
    focus: function(field, event, eOpts) 
    {
        if (window.plugins.androidHelper)
            window.plugins.androidHelper.setSofKeyBoardPan();
    },
});