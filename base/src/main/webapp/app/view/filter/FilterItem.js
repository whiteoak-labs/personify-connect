Ext.define('Personify.view.filter.FilterItem', {
    extend: 'Ext.Container',
    xtype: 'filterItems',
    controller: 'Personify.controller.filter.FilterItem',
    requires: 'Personify.controller.filter.FilterItem',
    config: {
        layout: 'vbox',
        items:[
            {
                itemId: 'filterTypeLabel',
                cls: 'filtertypelabel'
            },
            {
                xtype: 'container',
                items: [
                    {
                        xtype: 'button',
                        text: 'Clear',
                        itemId: 'clearButton',
                        docked: 'right',
                        cls: 'p-button-panelfilter-clear'
                    }
                ]
            },
            {
                scrollable: null,
                itemId: 'listFilterItems',
                xtype: 'dataview',
                itemCls: 'p-filterlist-checkbox-item',
                itemTpl:'<input type ="checkbox" {checked} value = "{code}"/><label for="{code}"><span></span></label> {description} ({count})<br>' +
                        '<div class="p-div-SubcodeList"><tpl for="SubcodeList">' +
                        '<input type ="checkbox" value="{code}" {checked}/><label for="{code}"><span></span></label> {description} ({count})<br>' +
                        '</tpl></div>'
            }
        ]
     }
});