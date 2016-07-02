Ext.define('Personify.controller.phone.attendee.AttendeesListPanel',{
    extend: 'Personify.base.Controller',

    control: {
        titleEventOfAttendeesList: true,
        searchFieldAttendeePhone: {
            onClearIconTap: 'onClearIconTapSearchFieldAttendeePhone',
            onTextChange: 'onTextChangeSearchFieldAttendeePhone'
        },
        attendeesList: {
            itemtap: 'onSelectAtendeeItemTap'
        }
    },

    setStore: function(store) {

        var title = '';

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
    },

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

        var storeAttendee = this.getAttendeesList().getStore()

        if(storeAttendee) {
            storeAttendee.clearFilter();
            if(newText.trim() != '') {
                storeAttendee.filter(function(record) {
                    didMatch = (record.get('firstName').trim().toLowerCase() + " "
                                + record.get('lastName').trim().toLowerCase() + " "
                                + record.get('employerName').trim().toLowerCase() + " "
                               ).match(newText.trim().toLowerCase());

                    if(didMatch)
                        return record;
                });
            }
        }
    },

    onClearIconTapSearchFieldAttendeePhone: function() {
        this.getAttendeesList().getStore().clearFilter();
        this.getAttendeesList().deselectAll();
    }
});