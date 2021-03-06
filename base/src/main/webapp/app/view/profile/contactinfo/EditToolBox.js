Ext.define('Personify.view.profile.contactinfo.EditToolBox', {
    extend: 'Ext.Panel',
    xtype: 'edittoolbox',
    controller: 'Personify.controller.profile.EditToolBox',
    requires: 'Personify.controller.profile.EditToolBox',

    config: {
        xtype: 'panel',
        itemId: 'editToolBox',
        cls: 'p-panel-editToolBox',
        items: [
            {
                docked: 'left',
                flex: 1,
                xtype: 'button',
                text: 'Cancel',
                baseCls: 'p-button-profile-cancel',
                itemId: 'cancelEditButton'
            },
            {
                docked: 'left',
                flex: 1,
                xtype: 'button',
                text: 'Done',
                baseCls: 'p-button-profile-done',
                itemId: 'doneEditButton'
            },
            {
                flex: 1,
                docked: 'right',
                itemId: 'editRecordButton',
                xtype: 'button',
                baseCls: 'p-button-edit',
                disabledCls:'p-button-edit-disabled',
                text: 'Edit this record'
            }
        ]
    },
    
    reset: function() {
        this.getController().reset();
    }
});
