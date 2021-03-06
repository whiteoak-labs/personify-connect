Ext.define('Personify.view.store.filter.FilterPanel', {
     extend: 'Ext.Container',
     xtype: 'filterPanelStore',
     controller: 'Personify.controller.store.filter.FilterPanel',
     requires: [
         'Personify.controller.store.filter.FilterPanel',
         'Personify.view.filter.FilterItemRadio'
     ],
     config: {
        cls: 'p-panel-addOrFilterPanel panel-left',
        xtype: 'panel',
        width: 400,
        height: '100%',
        modal: true,
        hideOnMaskTap: true,
        right: 0,
        top: 0,
        hidden: true,
        layout: 'vbox',
        showAnimation: {
            type: 'slide'
        },
        items:[
            {
                layout: 'hbox',
                cls: 'filterClosePanel',
                items: [
                    {
                        html: 'Selections'
                    },
                    {
                        xtype: 'button',
                        docked: 'right',
                        cls: 'p-close-button',
                        text: 'X',
                        top: 0,
                        right: 0,
                        listeners: {
                            tap: function() {
                                this.parent.parent.destroy();
                            }
                        }
                    }
                ]
            },
            {
                flex: 1,
                xtype: 'filterItemsRadio',
                itemId: 'filterProduct'
            },
            {
                layout:{
                    type:'vbox',
                    align:'center'
                },
                docked: 'bottom',
                items:[
                    {
                        xtype: 'button',
                        cls: 'p-button-submitFilter',
                        itemId: 'submitFilter',
                        text: 'Filter Store'
                    }
                ]
            }
        ]
     }
});