Ext.define('Personify.controller.phone.attendee.AttendeesListPanel',{
    extend: 'Personify.base.Controller',
    config: {
                searchTerm:''
           },
    control: {
        titleEventOfAttendeesList: true,
        searchFieldAttendeePhone: {
            onClearIconTap: 'onClearIconTapSearchFieldAttendeePhone',
            onTextChange: 'onTextChangeSearchFieldAttendeePhone'
        },
        attendeesList: {
            itemtap: 'onSelectAtendeeItemTap',
            scrollend:'onScrollEnd'
        }
    },

    setStore: function(store) {
        var title = '';
         
        if(store)
        {           
           if (store.get('shortName')) {
                title = store.get('shortName');
           } else {
                if (store.get('title')) {
                    title = store.get('title');
                }
           }
               
           this.getTitleEventOfAttendeesList().setHtml(Personify.utils.ItemUtil.getShortContent(store.get('shortName'), 48));
           var storeMeetingRegistrantStore = store.MeetingRegistrantStore;
           storeMeetingRegistrantStore.clearFilter();
           this.getAttendeesList().setStore(storeMeetingRegistrantStore);
        }
    },

    /* To enhnace performance */
     getStore: function(){
                return this.getAttendeesList().getStore();
           },
    refresh: function(){
           this.getAttendeesList().refresh();
    },
           
    onScrollEnd:function () {
           if (!Personify.utils.PhoneGapHelper.checkConnection()) {
           Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
           return;
           }
           
           ///// 'onscrollendattendees' is written in attendee.js
           this.getView().fireEvent('onscrollendattendees',false,this.getSearchTerm());
     },
       
     /* end enhnace performance */
           
           
    onSelectAtendeeItemTap: function (dataView, index, target, record, event, eOpts) {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        this.getView().fireEvent('selectattendeesitem', record);
    },

    onTextChangeSearchFieldAttendeePhone: function(newText) {
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Attendee Search');
        }
         this.setSearchTerm(newText);
         this.getView().fireEvent('onscrollendattendees',true,newText);
   },

   
    onClearIconTapSearchFieldAttendeePhone: function() {
             
    }
});