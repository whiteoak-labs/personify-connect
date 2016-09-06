Ext.define('Personify.view.exhibitor.ExhibitorPanel', {
    extend: 'Ext.Panel',
    xtype: 'exhibitorPanel',
    controller: 'Personify.controller.exhibitor.ExhibitorPanel',

    requires: [
        'Personify.controller.exhibitor.ExhibitorPanel',
        'Personify.view.event.search.SearchPanel',
        'Personify.view.exhibitor.ExhibitorList'
    ],

    config: {
        //cls: 'panelExhibitor',
        meetingRecord: null,
        layout: 'vbox',
        defaultFilter: null,
        items: [
            {
                layout: 'hbox',
                style: 'margin: 10px 0px;',
                items: [
                    {
                        xtype: 'searchEventPanel',
                        flex: 1,
                        itemId: 'searchFieldExhibitor'
                    }
                    /*,
                    {
                        xtype: 'button',
                        cls: 'clearFilter',
                        pressedCls: 'red-button-pressing-background',
                        itemId: 'btnClearFilter',
                        text: 'Clear Filters',
                        docked: 'right',
                        disabled: true,
                        disabledCls: 'p-button-disabled'
                    } */
                ]
            },
            {
                flex: 1,
                xtype: 'allExhibitorList',
                itemId: 'exhibitorList'
            }
        ]
    },

    setStore: function(store){
        this.getController().setExhibitorStore(store);
    },

    getStore: function(store){
        return this.getController().getExhibitorList().getStore();
    },

    refresh: function(){
        this.getController().getExhibitorList().refresh();
    }
});