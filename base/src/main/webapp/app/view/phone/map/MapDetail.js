Ext.define('Personify.view.phone.map.MapDetail', {
	extend: 'Ext.Container',
	xtype: 'mapdetail',
	controller: 'Personify.controller.phone.map.MapDetail',
	requires: 'Personify.controller.phone.map.MapDetail',

	config: {
		layout: 'vbox',
		title: 'Map',
		items: [{ 
				xtype: 'ptoolbar',
                title: 'Map',
                itemId: 'eventToolbar'
			}]
	}
});