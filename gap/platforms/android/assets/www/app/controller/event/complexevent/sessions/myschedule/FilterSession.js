Ext.define('Personify.controller.event.complexevent.sessions.myschedule.FilterSession',{
    extend: 'Personify.base.Controller',

    control: {
        filterByTrackButton: {
            tap: 'onFilterByTrackButtonTap'
        },
        addPersonalAppointmentButton: {
            tap: 'onAddPersonalAppointmentButtonTap'
        },
        searchSession: {
            tapsearchbutton: 'onTapButtonSearch',
            seachclearicontap: 'onClearIconTap',
            onsearchtextchange: 'onTextChange'
        }
    },

    init: function() {
        var currentUser = Personify.utils.Configuration.getCurrentUser();

        if (currentUser.isLogged()) {
            this.getAddPersonalAppointmentButton().show();
        } else {
            this.getAddPersonalAppointmentButton().hide();
        }

        this.getSearchSession().getController().setPlaceHolder('Search Session and Presenter');
    },

    onClearTextField: function() {
        this.getSearchSession().getController().clearSearchField();
    },

    onFilterByTrackButtonTap: function() {
        var filterByTrackButton = this.getFilterByTrackButton();
        this.getView().fireEvent('onFilterByTrackButtonTap', filterByTrackButton);
    },

    onAddPersonalAppointmentButtonTap: function() {
        this.getView().fireEvent('addpersonaltap');
    },

    onTapButtonSearch: function(value) {
        this.getView().fireEvent('searchbuttontap', value);
    },

    onTextChange: function(newText) {
        this.getView().fireEvent('onsearchtextchange',newText);
    },

    onClearIconTap: function() {
        this.getView().fireEvent('clearicontap');
    },

    hideFilterByTrackButton: function() {
        this.getFilterByTrackButton().destroy();
        this.getSearchSession().setWidth('100%');
    }
});