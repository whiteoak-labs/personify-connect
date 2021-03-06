Ext.define('Personify.controller.phone.map.MapDetail', {
	extend : 'Personify.base.Controller',
	control : {
		eventToolbar : {
			onNavigationButtonTap : 'onBack'
		}
	},

	onBack : function() {
		this.getView().fireEvent('back', this);
	},

	init : function() {
		this.getEventToolbar().getController().setHiddenActionButton(true);
		return this.callParent(arguments);
	}
}); 