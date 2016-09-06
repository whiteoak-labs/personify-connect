Ext.define('Personify.view.filter.FilterItemRadio', {
    extend: 'Ext.Container',
    xtype: 'filterItemsRadio',
    controller: 'Personify.controller.filter.FilterItemRadio',
    requires: 'Personify.controller.filter.FilterItemRadio',
    config: {
        layout: 'vbox',
        items:[
            {
                itemId: 'filterTypeLabel',
                cls: 'filtertypelabel'
            },            
            {
            	xtype: 'container',
            	items:[
            	{
            		xtype: 'button',
	                text: 'Clear Filter',
	                itemId: 'clearButton',
	                cls: 'p-button-panelfilter-clear',
	                docked: 'right'
            	}
            	]
                
            },
            {
                flex: 7,
                scrollable: true,
                itemId: 'listFilterItems',
                xtype: 'dataview',
                itemTpl: '<input type="checkbox" value="{code}" {checked} id="{code}"><label for="{code}"><span></span></label> {description}<br>'
            }
        ]
     }
});