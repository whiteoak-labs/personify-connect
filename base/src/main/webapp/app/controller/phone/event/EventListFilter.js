Ext.define('Personify.controller.phone.event.EventListFilter',{
    extend: 'Personify.base.Controller',
    control: {
        searchField:{
            change: 'onSearchKeyUp',
            clearicontap: 'onClearIconTap'
        },
        filterButtonPanel:{},
        locationFilterButton:{
            tap: 'onLocationFilterButtonTap'
        },
        topicFilterButton:{
            tap: 'onTopicFilterButtonTap'
        },
        myEventButton:{
            tap: 'onMyEventButtonTap'
        },
        searchView: true
    },//control

    init: function(){
        this.callParent(arguments);
    },

    onLocationFilterButtonTap: function() {
        this.getView().fireEvent('locationbtntap', this.getLocationFilterButton());
    },
    
    onTopicFilterButtonTap: function( ){
        this.getView().fireEvent('topicbtntap', this.getTopicFilterButton());
    },

    onMyEventButtonTap: function() {
        this.getView().fireEvent('gotomyschedule');
    },

    setSearchViewText: function(value){
        this.getSearchView().setHtml(value);
    },

    onSearchKeyUp: function(field, e) {
        if(field.getValue().trim() == ''){
            this.onClearIconTap();
        }else{
            this.getView().fireEvent('seachkeyup', field.getValue());
        }
    },
    
    onClearIconTap: function(){
        this.getView().fireEvent('clearicontap');
    }
    
});