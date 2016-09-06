Ext.define('Personify.controller.phone.map.MapNavigation', {
    extend : 'Personify.base.Controller',
    requires: ['Personify.view.event.map.PinchZoomImage'],
    control : {
        menumappanel : {
            back : 'onBackMenuMapPanel'
        },
        mapdetail : {
            back : 'onBackMapDetail'
        }
    },
    init : function() {
        var me = this;
        var locationData = this.getView().getLocationData();
        var mapDetail = null;
        var myView = this.getView();
        this.getMenumappanel().getController().setRecord(myView.getRecord());

        if (locationData) {
            var mapData = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('mapData');
            me.initMap(mapData, locationData);
        } else {
            myView.animateActiveItem(0, {
                type : 'slide',
                direction : 'left'
            });
        }
    },

    initMap: function(mapData, locationData) {
        var myView = this.getView();
        var mapIDMatched=false;
           
        var productId = myView.getRecord().get('productID');
           
        var arrMapDataFiltered=[];
        if (productId && productId!='0')
        {
            if (mapData !=null && mapData.maps!=null  && mapData.maps.length>0)
            {
                for (var i = 0; i < mapData.maps.length; i++)
                {
                    var map = mapData.maps[i];
                    //// Match Product ID
                    if (map.productId===productId)
                    {
                        arrMapDataFiltered.push(map);
                    }
                }
            }
         }
         else
         {
           if (mapData !=null && mapData.maps!=null  && mapData.maps.length>0)
           {
                arrMapDataFiltered=mapData.maps;
           }
           
         }
           
        var location = mapData.locations[locationData];

        if (location && arrMapDataFiltered) {
           
           var mapId = location.mapId;
           
           for (var i = 0; i < arrMapDataFiltered.length; i++)
            {
                if (arrMapDataFiltered[i].mapId == mapId)
                {
           
                    mapIDMatched=true;
           
                    myView.animateActiveItem(1, {
                        type : 'slide',
                        direction : 'left'
                    });
                    var myMap = myView.getActiveItem();
                    myMap.removeAt(1);
                    var map = myMap.add({
                        xtype : 'pinchzoomimage',
                        src : arrMapDataFiltered[i].image,
                        width : '100%',
                        hight : '100%',
                        flex : 1
                    });
                    map.updateMarkerPosition({
                        x : location.coords[0],
                        y : location.coords[1]
                    });
                    myMap.items.items[0].setTitle(arrMapDataFiltered[i].name);
                }
             }
           
            //// If MAP ID of Location not matched with Map Data and MAP data has values then we are displaying First Map as Default
            if(arrMapDataFiltered.length>0 && mapIDMatched==false)
            {
                        myView.animateActiveItem(1, {
                                    type : 'slide',
                                    direction : 'left'
                                    });
                        var myMap = myView.getActiveItem();
                        myMap.removeAt(1);
                        var map = myMap.add({
                               xtype : 'pinchzoomimage',
                               src : arrMapDataFiltered[0].image,
                               width : '100%',
                               hight : '100%',
                               flex : 1
                               });
           
                        map.updateMarkerPosition();
                        myMap.items.items[0].setTitle(arrMapDataFiltered[0].name);

            }
           
           }
           else {
            myView.animateActiveItem(0, {
                type : 'slide',
                direction : 'left'
            });
        }
    },

    onBackMenuMapPanel : function() {
        this.getView().fireEvent('back', this);
    },

    onBackMapDetail : function() {
        var locationData = this.getView().getLocationData();

        if (locationData) {
            this.getView().fireEvent('back', this);
        } else {
            this.getView().animateActiveItem(0, {
                type : 'slide',
                direction : 'right'
            });
        }
    }
}); 
