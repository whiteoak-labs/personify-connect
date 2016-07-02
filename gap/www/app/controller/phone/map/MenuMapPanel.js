Ext.define('Personify.controller.phone.map.MenuMapPanel', {
           extend : 'Personify.base.Controller',
           control : {
           eventToolbar : {
           onNavigationButtonTap : 'onBack'
           },
           mapTitleBar: true,
           //// Added to Get MAP List
           menuMapList:true
           },
           
           onBack : function() {
           this.getView().fireEvent('back', this);
           },
           
           init : function() {
           this.getEventToolbar().getController().setHiddenActionButton(true);
           
           //// Clear Filters
           
           if (this.getMenuMapList().getStore()!=null)
           {
           this.getMenuMapList().getStore().clearFilter();
           }
           
           return this.callParent(arguments);
           },
           
           setRecord: function(record) {
           if (record) {
           var title = '';
           
           if (record.get('shortName')) {
           title = record.get('shortName');
           } else {
           if (record.get('title')) {
           title = record.get('title');
           }
           }
           this.getMapTitleBar().setHtml(Personify.utils.ItemUtil.getShortContent(title, 48));
           
           //// To filter store associated with maps
           this.getMenuMapList().getStore().filter([{property:'productId',value:record.get('productID')}]);
           }
           }
           });
