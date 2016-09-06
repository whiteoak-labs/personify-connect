Ext.define('Personify.controller.phone.presenter.PresenterListPanel',{
    extend: 'Personify.base.Controller',

    control: {
        searchFieldPresenterPhone: {
            onClearIconTap: 'onClearIconTapSearchFieldPresenterPhone',
            onTextChange: 'onTextChangeSearchFieldPresenterPhone'
        },
        presenterList: {
            itemtap: 'onItemPresenterTap',
            scrollend:'onScrollEnd'
        }
    },

    setStore: function(store){
        if(store && store != null) {
            this.getPresenterList().setStore(store);
            ///this.updateLaytouPresenterList();
        }
    },

    onTextChangeSearchFieldPresenterPhone: function(newText) {
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Attendee Search');
        }
       
        this.getView().fireEvent('loadpresenters',newText,true);
    },

    onClearIconTapSearchFieldPresenterPhone: function() {
        this.getPresenterList().deselectAll();
        this.getView().fireEvent('loadpresenters',newText,true);
    },

    onItemPresenterTap: function (dataView, index, target, record, event, eOpts){
        this.getView().fireEvent('selectpresentersitem', record);
    },
   
    /* Performance Enhancement */
    onScrollEnd:function()
    {
           this.getView().fireEvent('onScrollEndPresenter');
    },
           
    getStore: function(){
           return this.getPresenterList().getStore();
     },
    refresh: function(){
        this.getPresenterList().refresh();
     }

           
    /* End Performance Enhancement */
});