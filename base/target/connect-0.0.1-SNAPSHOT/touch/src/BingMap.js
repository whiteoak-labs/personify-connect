Ext.define("Ext.BingMap",{extend:"Ext.Map",xtype:"bingmap",requires:["Ext.util.Geolocation"],initMap:function(){var f=this.getMap();if(!f){var e=this,c=e.mapContainer,a=e.getMapOptions(),d;var g=Microsoft.Maps;var b="AokX-S2lieXTaXG8pvEw3i2AKYuStBMK8RsUu6BDJ6hrL5AYv0IfQqM9zc-BAA-v";a=Ext.merge({credentials:b,mapTypeId:"r",zoom:12},a);if(!a.center){a.center=new g.Location(37.381592,-122.135672)}if(c.dom.firstChild){Ext.fly(c.dom.firstChild).destroy()}g.loadModule("Microsoft.Maps.Overlays.Style",{callback:function(){e.setMap(new g.Map(c.dom,a));if(a.callback){a.callback()}}});f=e.getMap()}e.fireEvent("maprender",e,f)},setMapCenter:function(c){var a=this,b=a.getMap(),d=Microsoft.Maps;if(!a.isPainted()){a.un("painted","setMapCenter",this);a.on("painted","setMapCenter",this,{delay:150,single:true,args:[c]});return}c=c||new d.Location(37.381592,-122.135672);if(c&&!(c instanceof d.Location)&&"longitude" in c){c=new d.Location(c.latitude,c.longitude)}if(!b){a.initMap();b=a.getMap()}if(b&&c instanceof d.Location){b.updateMapPosition(c)}else{this.options=Ext.apply(this.getMapOptions(),{center:c})}}},function(){});