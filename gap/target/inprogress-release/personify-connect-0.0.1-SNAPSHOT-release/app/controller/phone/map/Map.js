Ext.define("Personify.controller.phone.map.Map",{extend:"Personify.base.Controller",control:{apaPanelMap:{backtomain:"onBackToMainView"},prevMapPhone:{tap:"onTapPrevMap"},mapSchema:{},nextMapPhone:{tap:"onTapNextMap"}},config:{currentXCord:0,change:30},init:function(){var a=this;a.callParent(arguments);a.setApaPanel()},setApaPanel:function(){var a=this;a.getApaPanelMap().getController().setTitleOfToolbar("Conference Map");a.getApaPanelMap().getController().setHiddenActionButton(true);a.getApaPanelMap().getController().setToolbarUI("blue")},onTapPrevMap:function(){var b=this;if(b.getCurrentXCord()<=-30){var a=b.getCurrentXCord()+b.getChange();b.setCurrentXCord(a);b.getMapSchema().setStyle("-webkit-transform: translate3d("+(a)+"px, 0px, 0px);")}},onTapNextMap:function(){var b=this;if(b.getCurrentXCord()>=-1470){var a=b.getCurrentXCord()-b.getChange();b.setCurrentXCord(a);b.getMapSchema().setStyle("-webkit-transform: translate3d("+(a)+"px, 0px, 0px);")}},onBackToMainView:function(){this.getView().fireEvent("backtomain")}});