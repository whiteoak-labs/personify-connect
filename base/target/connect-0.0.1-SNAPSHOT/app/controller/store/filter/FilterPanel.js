Ext.define("Personify.controller.store.filter.FilterPanel",{extend:"Personify.base.Controller",control:{submitFilter:{tap:"onSubmitFilter"},filterProduct:{clearFilter:"clearFilter"}},config:{productClass:[]},init:function(){if(window.plugins.app47){window.plugins.app47.sendGenericEvent("Product Filter")}this.setData();this.getFilterProduct().getController().setLabel("Product Category")},setData:function(){var b=this;var c=b.getFilterProduct();var a=Ext.create("Personify.store.base.FilterProductStore");a.load({callback:function(e,d,f){c.getController().setStoreData(a);b.getFilterProduct().getController().setCheckedValue(b.getProductClass())}})},onSubmitFilter:function(){var a=this;var b=a.getFilterProduct().getController().onGetCheckedValue();a.getView().getParent().fireEvent("submitFilter",b);a.getView().removeAll(true);a.getView().destroy()},clearFilter:function(){this.getView().getParent().fireEvent("clearFilter")}});