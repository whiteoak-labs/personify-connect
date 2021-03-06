Ext.define('Personify.view.phone.map.MenuMapList', {
	extend: 'Ext.List',
	mixins: [ 'Deft.mixin.Controllable' ],
	xtype: 'menumaplist',
	controller: 'Personify.controller.phone.map.MenuMapList',
	requires: 'Personify.controller.phone.map.MenuMapList',

	config: {
		itemId: 'menuMapList',
		baseCls: 'p-phone-list-menumap',
		pressedCls: 'p-phone-common-list-selected',
        selectedCls: 'p-phone-common-list-selected',
		itemTpl: '{name}',
		onItemDisclosure: true,
		locationData: null
	}
});