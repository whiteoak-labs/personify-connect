Ext.define('Personify.view.event.filter.FilterPanel', {
     extend: 'Ext.Container',
     xtype: 'filterPanel',
     controller: 'Personify.controller.event.filter.FilterPanel',
     requires: [
         'Personify.controller.event.filter.FilterPanel',
         'Personify.view.filter.FilterItem'
     ],
     config: {
        cls: 'p-panel-addOrFilterPanel panel-left',
        xtype: 'panel',
        width: 400,
        height: '90%',
        modal: true,
        hideOnMaskTap: true,
        right: 0,
        top: 57,
        zIndex: 10,
        layout: 'vbox',
        showAnimation: {
            type: 'slide'
        },
        items:[
            {
                layout: 'hbox',
                cls: 'filterClosePanel',
                docked: 'top',
                items: [
                    {
                        html: 'Selections'
                    },
                    {
                        xtype: 'button',
                        docked: 'right',
                        cls: 'p-close-button',
                        text: 'X',
                        listeners: {
                            tap: function() {
                                this.parent.parent.destroy();
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'panel',
                scrollable: true,
                flex: 1,
                cls: 'p-panel-same-component-top',
                items: [
                    {
                        scrollable: null,
                        xtype: 'filterItems',
                        itemId: 'filterTopic',
                        cls: 'p-panel-same-component-top'
                    },
                    {
                        scrollable: null,
                        xtype: 'filterItems',
                        itemId: 'filterLocation',
                        cls: 'p-panel-same-component-top'
                    }
                ]
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
                        text: 'Filter Events'
                    }
                ]
            }
        ]
    },
     
    hide: function() {
        this.destroy();
    }
});