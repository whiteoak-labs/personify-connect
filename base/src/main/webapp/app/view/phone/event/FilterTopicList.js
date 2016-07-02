Ext.define('Personify.view.phone.event.FilterTopicList', {
    extend: 'Ext.Container',
    xtype: 'filtertopiclistphone',
    controller: 'Personify.controller.phone.event.FilterTopicList',
    requires: 'Personify.controller.phone.event.FilterTopicList',
    config: {
        cls: 'p-phone-panel-filter-topic',
        layout: 'vbox',
        items:[
            {
                scrollable: null,
                itemId: 'listFilterItems',
                xtype: 'dataview',
                itemCls: 'p-filterlist-phone-checkbox-item-event',
                itemTpl:'<div class="p-filterlist-phone-checkbox-item-parent"><input type ="checkbox" {checked} value = "{code}"/><label for="{code}"><span></span></label> {description} ({count})</div>' +
                        '<div class="p-div-SubcodeList"><tpl for="SubcodeList">' +
                        '<div class="p-filterlist-phone-checkbox-item-child"><input type ="checkbox" value="{code}" {checked}/><label for="{code}"><span></span></label> {description} ({count})</div>' +
                        '</tpl></div>'
            },
            {
                layout: 'hbox',
                items: [
                    {
                        flex: 1,
                        cls: 'p-phone-button-submit',
                        xtype: 'button',
                        text: 'Filter',
                        itemId: 'submitFilter',
                        pressedCls: 'p-phone-button-red-pressing'
                    },
                    {
                        flex: 1,
                        xtype: 'button',
                        cls: 'p-phone-button-clear',
                        text: 'Clear checked',
                        itemId: 'clearButton',
                        docked: 'right',
                        pressedCls: 'p-phone-button-gray-pressing'
                    }
                ]
            }
        ]
     },
     
     setStore: function(store){
        this.getController().setStoreData(store);
     }
});