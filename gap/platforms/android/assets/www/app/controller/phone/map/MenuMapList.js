Ext.define('Personify.controller.phone.map.MenuMapList', {
           extend : 'Personify.base.Controller',
           inject : ["mapStore"],
           requires : ['Personify.view.phone.map.MapDetail'],
           config : {
           mapStore : null
           },
           
           control : {
           view : {
           
           /* Commented OLD Code
            itemtap : function(view, record) {
            var parentView = this.getView().getParent().getParent();
            var store = this.getView().getStore();
            var rc = null;
            record = record + 1;
            store.each(function(item, index, length) {
            if (item.get('mapId') == record) {
            rc = item;
            }
            });
            var mapImg = rc.get('image');
            parentView.animateActiveItem(1, {
            type : 'slide',
            direction : 'left'
            });
            
            var map = Ext.create('Personify.view.event.map.PinchZoomImage', {
            src : mapImg,
            width : '100',
            hight : '100',
            flex : 1,
            itemId : 'pinchzoomimage'
            });
            var myMap = parentView.getActiveItem();
            myMap.removeAt(1);
            map.updateMarkerPosition();
            myMap.add(map);
            myMap.items.items[0].setTitle(rc.get('name'));
            } */
           
           itemtap : function(view, index,target,record,event) {
           
           var parentView = this.getView().getParent().getParent();
           var store = this.getView().getStore();
           var rc = null;
           ////record = record + 1;
           
           var selectedMapId= record.get('mapId')? record.get('mapId'):0;
           
           store.each(function(item, index, length) {
                      if (item.get('mapId') == selectedMapId) {
                      rc = item;
                      }
                      });
           
           if (rc!=null && rc.get('image')!=null)
           {
           var mapImg = rc.get('image');
           parentView.animateActiveItem(1, {
                                        type : 'slide',
                                        direction : 'left'
                                        });
           
           var map = Ext.create('Personify.view.event.map.PinchZoomImage', {
                                src : mapImg,
                                width : '100',
                                hight : '100',
                                flex : 1,
                                itemId : 'pinchzoomimage'
                                });
           var myMap = parentView.getActiveItem();
           myMap.removeAt(1);
           map.updateMarkerPosition();
           myMap.add(map);
           myMap.items.items[0].setTitle(rc.get('name'));
           
           }
           }
           }
           },
           
           init : function() {
           var mapData = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('mapData');
           var store = this.getMapStore();
           store.setData(mapData.maps);
           this.getView().setStore(store);
           return this.callParent(arguments);
           }
           });