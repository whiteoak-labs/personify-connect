Ext.define("Personify.controller.phone.directory.directorylist.DirectoryManagement",{extend:"Personify.controller.directory.DirectoryManagement",inject:["personify","currentUser"],config:{personify:null,currentUser:null,params:null},control:{directorySearchField:{onClearIconTap:"onClearIconTap",onTextChange:"onSearchTextChanged"},directoryToolbar:{onNavigationButtonTap:"onBack"},directorylist:{scrollend:"onNextButtonTap"},view:{painted:"onPaint"}},init:function(){if(window.plugins.app47){window.plugins.app47.sendGenericEvent("Directory List")}var a=this.getView().config.itemId;this.getView().setItemId(a);this.getDirectoryToolbar().getController().setHiddenActionButton(true)},onLoadedSelectedContactInfo:function(a){this.getView().fireEvent("loadedSelectedContactInfo",a)},onBack:function(){var a=this;var b=a.getView();b.fireEvent("back",this,null)},refreshRecordAfterEditing:function(){}});