Ext.define('Personify.controller.profile.EditToolBox', {
    extend: 'Personify.base.Controller',
    control: {
        editRecordButton: {
            tap: 'onTapEditRecordButton'
        },

        cancelEditButton: {
            tap: 'onTapActionButton'
        },

        doneEditButton: {
        }
    },

    init: function() {
        this.callParent(arguments);
        this.reset();
    },

    reset: function() {
        this.getEditRecordButton().show();
        this.getCancelEditButton().hide();
        this.getDoneEditButton().hide();
    },

    onTapEditRecordButton: function() {
        this.getEditRecordButton().hide();
        this.getCancelEditButton().show();
        this.getDoneEditButton().show();
    },
    
    onTapActionButton: function() {
        this.reset();
    }
});
