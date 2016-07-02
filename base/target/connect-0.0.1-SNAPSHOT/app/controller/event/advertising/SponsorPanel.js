Ext.define("Personify.controller.event.advertising.SponsorPanel",{extend:"Personify.base.Controller",config:{storeData:null,storeCount:0,ratio:0,sponsorRotation:15000,orientation:null},control:{advertisingCarousel:{activeitemchange:"onActiveItemChange"}},init:function(){this.setRatio(844/1218);var b=this;var a=Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get("sponsorRotation");this.setSponsorRotation(a*1000);Ext.Viewport.setListeners({orientationchange:{fn:b.onOrientationChange,scope:b}});b.setOrientation(Ext.Viewport.getOrientation());b.refreshCarousel()},setStore:function(c){this.setStoreData(c);this.setStoreCount(c.getCount());var b=Ext.Viewport.getOrientation();var a=this.getItemsSponsor(c,b);var d=this.getAdvertisingCarousel();d.setItems(a)},onShowImage:function(){var a=this.getAdvertisingCarousel();if(!a.pageTurner){a.pageTurner=new Ext.util.DelayedTask(function(){if(a.getActiveIndex()==a.items.length-1){a.setActiveItem(0,{type:"slide",direction:"right",duration:1000})}else{a.next()}},a)}a.pageTurner.delay(this.getSponsorRotation())},onActiveItemChange:function(){var a=this.getAdvertisingCarousel();if(a.getActiveIndex()==0){this.onShowImage()}else{a.pageTurner.delay(this.getSponsorRotation())}},onOrientationChange:function(b,c,d,a){this.setOrientation(c);this.refreshCarousel()},refreshCarousel:function(){var c=this.getOrientation();var b=this.getStoreData();if(b){var a=this.getItemsSponsor(b,c);var d=this.getAdvertisingCarousel();d.setItems(a)}},getItemsSponsor:function(n,b){var h=[];var d=5;var c=0;if(b=="portrait"){var f=Ext.Viewport.getWindowWidth();var l=f*this.getRatio()-5;d=Math.floor(l/120)}else{var f=Ext.Viewport.getWindowWidth();var l=f*this.getRatio()-5;d=Math.floor(l/120)}c=Math.floor((l-d*120)/(d-1));if(c<5){d-=1;c=Math.floor((l-d*120)/(d-1))}for(var g=0;g<n.getCount();){var m='<div style="height: 120px; width: 100%; text-align: left">';for(var e=0;e<d;e++){var o=g+e;if(o<n.getCount()){var a=c;if(e==d-1){a=0}var k=n.getAt(o).getData().redirectURL?n.getAt(o).getData().redirectURL:"javascript:void(0)";m+='<a href="'+k+'"><img alt="'+n.getAt(o).getData().sponsorName+'" src="'+n.getAt(o).getData().tabletImageURL+'"  width="auto" height="120px" style="margin:0 '+a+'px 0 0" /></a>'}}m+="</div>";h.push({html:m});g+=d}return h},destroy:function(){var a=this;Ext.Viewport.removeListener({orientationchange:{fn:a.onOrientationChange,scope:a}});var b=a.getAdvertisingCarousel();if(b.pageTurner){b.pageTurner.cancel()}return this.callParent(arguments)},onHideImage:function(){var a=this.getAdvertisingCarousel();if(a.pageTurner){a.pageTurner.cancel()}}});