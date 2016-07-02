Ext.define('Personify.controller.phone.map.Map', {
	extend : 'Personify.base.Controller',

	control : {
		apaPanelMap : {
			backtomain : 'onBackToMainView'
		},
		prevMapPhone : {
			tap : 'onTapPrevMap'
		},
		mapSchema : {

		},
		nextMapPhone : {
			tap : 'onTapNextMap'
		}
	},

	config : {
		currentXCord : 0,
		change : 30
	},

	init : function() {
		var me = this;
		me.callParent(arguments);

		me.setApaPanel();
	},

	setApaPanel : function() {
		var me = this;

		me.getApaPanelMap().getController().setTitleOfToolbar("Conference Map");
		me.getApaPanelMap().getController().setHiddenActionButton(true);
		me.getApaPanelMap().getController().setToolbarUI('blue');
	},

	onTapPrevMap : function() {
		var me = this;

		if (me.getCurrentXCord() <= -30) {
			var newXCord = me.getCurrentXCord() + me.getChange();
			me.setCurrentXCord(newXCord);
			me.getMapSchema().setStyle("-webkit-transform: translate3d(" + (newXCord) + "px, 0px, 0px);");
		}
	},

	onTapNextMap : function() {
		var me = this;

		if (me.getCurrentXCord() >= -1470) {
			var newXCord = me.getCurrentXCord() - me.getChange();
			me.setCurrentXCord(newXCord);
			me.getMapSchema().setStyle("-webkit-transform: translate3d(" + (newXCord) + "px, 0px, 0px);");
		}
	},

	onBackToMainView : function() {
		this.getView().fireEvent('backtomain');
	}
}); 