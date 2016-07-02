Ext.define('Personify.controller.attendees.AttendeesListPanel',{
    extend: 'Personify.base.Controller',

    control: {
        searchFieldAttendees: {
            seachclearicontap: 'onTapBtnClearFilter',
            seachkeyup: 'onSearchKeyUp'
        },
        btnClearFilter: {
            tap: 'onTapBtnClearFilter'
        },
        attendeesList: {
            itemtap: 'onSelectAtendeeItemTap',
            itemtouchstart: 'onItemTouchStartAttendee',
            itemtouchend: 'onItemTouchEndAttendee'
        }
    },

    init: function() {
        this.getSearchFieldAttendees().getController().setPlaceHolder('Search Attendees');
    },

    setStore: function(store){
        store.clearFilter();
        this.getAttendeesList().setStore(store);
    },

    onSelectAtendeeItemTap: function (dataView, index, target, record, event, eOpts) {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        this.getView().fireEvent('selectattendeesitem', record);
    },

    onItemTouchStartAttendee: function(dataview, index, target, record, e, eOpts) {
        target.addCls('x-item-pressed');
    },

    onItemTouchEndAttendee: function(dataview, index, target, record, e, eOpts) {
        target.removeCls('x-item-pressed');
    },

    onSearchKeyUp: function(value, keyCode) {
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Attendee Search');
        }

        var storeAttendee = this.getAttendeesList().getStore();

        if(storeAttendee) {
            storeAttendee.clearFilter();
            if(keyCode == 13 || keyCode == 10) {
                if(value.trim() != '' || value.trim() != null) {
                    this.getBtnClearFilter().setDisabled(false);
                    storeAttendee.filter(function(record) {
                        didMatch = (record.get('firstName').trim().toLowerCase() + " "
                                + record.get('lastName').trim().toLowerCase() + " "
                                + record.get('employerName').trim().toLowerCase() + " "
                               ).match(value.trim().toLowerCase());

                        if(didMatch)
                            return record;
                    });
                } else {
                    return;
                }
            } else {
                return;
            }
        }
    },

    onTapBtnClearFilter: function() {
        this.getAttendeesList().getStore().clearFilter();
        this.getBtnClearFilter().setDisabled(true);
        this.getSearchFieldAttendees().getController().clearSearchField();
        this.getAttendeesList().deselectAll();
    }
});
