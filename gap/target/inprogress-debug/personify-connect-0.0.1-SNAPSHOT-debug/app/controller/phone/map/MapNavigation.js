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
        var location = mapData.locations[locationData];

        if (location) {
            var mapId = location.mapId;

            for (var i = 0; i < mapData.maps.length; i++) {
                if (mapData.maps[i].mapId == mapId) {
                    myView.animateActiveItem(1, {
                        type : 'slide',
                        direction : 'left'
                    });
                    var myMap = myView.getActiveItem();
                    myMap.removeAt(1);
                    var map = myMap.add({
                        xtype : 'pinchzoomimage',
                        src : mapData.maps[i].image,
                        width : '100%',
                        hight : '100%',
                        flex : 1
                    });
                    map.updateMarkerPosition({
                        x : location.coords[0],
                        y : location.coords[1]
                    });
                    myMap.items.items[0].setTitle(mapData.maps[i].name);
                }
            }
        } else {
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
