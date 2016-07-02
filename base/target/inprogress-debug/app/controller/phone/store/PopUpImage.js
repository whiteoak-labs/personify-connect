Ext.define('Personify.controller.phone.store.PopUpImage', {
    extend: 'Personify.base.Controller',

    control: {
        imageFullScreen: true,
        buttonClose: {
            tap: 'onCloseForm'
        }
    },

    config: {
        record: null
    },

    updateRecord: function(record) {
        this.getImageFullScreen().setSrc(record.get('imageURL'));
    },

    onCloseForm: function() {
        this.getView().destroy();
    }
});
