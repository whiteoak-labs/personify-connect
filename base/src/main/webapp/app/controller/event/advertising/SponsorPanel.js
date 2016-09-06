Ext.define('Personify.controller.event.advertising.SponsorPanel', {
    extend : 'Personify.base.Controller',

    config : {
        storeData : null,
        storeCount : 0,
        ratio: 0,
        sponsorRotation: 15000,
        orientation: null
    },

    control : {
        advertisingCarousel : {
            activeitemchange : 'onActiveItemChange'
        }
    },

    init : function() {
    	this.setRatio( 844 / 1218 );
        var me = this;
        var sponsorRotation = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('sponsorRotation');
        this.setSponsorRotation(sponsorRotation * 1000);

        Ext.Viewport.setListeners({
            orientationchange: {
                fn: me.onOrientationChange,
                scope: me
            }
        });

        me.setOrientation(Ext.Viewport.getOrientation());
        me.refreshCarousel();
    },

    setStore : function(store) {
        this.setStoreData(store);
        this.setStoreCount(store.getCount());
        var orientation = Ext.Viewport.getOrientation();
        var items = this.getItemsSponsor(store, orientation);

        var carousel = this.getAdvertisingCarousel();
        carousel.setItems(items);
    },

    onShowImage : function() {
        var carousel = this.getAdvertisingCarousel();

        if (!carousel.pageTurner) {
            carousel.pageTurner = new Ext.util.DelayedTask(function() {
                if (carousel.getActiveIndex() == carousel.items.length - 1) {
                    carousel.setActiveItem(0, {
                        type : "slide",
                        direction : "right",
                        duration : 1000
                    });
                } else {
                    carousel.next();
                }
            }, carousel);
        }

        carousel.pageTurner.delay(this.getSponsorRotation());
    },

    onActiveItemChange : function() {
        var carousel = this.getAdvertisingCarousel();

        if (carousel.getActiveIndex() == 0) {
            this.onShowImage();
        } else {
            carousel.pageTurner.delay(this.getSponsorRotation());
        }
    },

    onOrientationChange : function(viewport, orientation, width, height) {
        this.setOrientation(orientation);
        this.refreshCarousel();
    },

    refreshCarousel: function() {
        var orientation = this.getOrientation();
        var store = this.getStoreData();

        if (store) {
            var items = this.getItemsSponsor(store, orientation);
            var carousel = this.getAdvertisingCarousel();
            carousel.setItems(items);
        }
    },
    
    getItemsSponsor: function (store, orientation) {
        var items = [];
        var numberRecord = 5;
        var spacingValue = 0;

        if (orientation == 'portrait') {
        	var wWidth = Ext.Viewport.getWindowWidth();
            var sponsorBarWidth = wWidth * this.getRatio() - 5;
            numberRecord = Math.floor( sponsorBarWidth / 120 );
        } else {
            var wWidth = Ext.Viewport.getWindowWidth();
            var sponsorBarWidth = wWidth * this.getRatio() - 5;
            numberRecord = Math.floor( sponsorBarWidth / 120 );
        }

        spacingValue = Math.floor( ( sponsorBarWidth - numberRecord * 120 ) / ( numberRecord - 1 ) );

        if( spacingValue < 5 ) {
            numberRecord -= 1;
            spacingValue = Math.floor( ( sponsorBarWidth - numberRecord * 120 ) / ( numberRecord - 1 ) );
        }

        for (var i = 0; i < store.getCount(); ) {
            var value = '<div style="height: 120px; width: 100%; text-align: left">';

            for (var j = 0; j < numberRecord; j++) {
                var temp = i + j;
                if (temp < store.getCount()) {
                    var curSpaceValue = spacingValue;
                    if( j == numberRecord - 1 ) {
                        curSpaceValue = 0;
                    }
                    var webURL = store.getAt(temp).getData().redirectURL ? store.getAt(temp).getData().redirectURL: 'javascript:void(0)';
                    value += '<a href="' + webURL + '">'+'<img alt="' + store.getAt(temp).getData().sponsorName + '" src="' + store.getAt(temp).getData().tabletImageURL + '"  width="auto" height="120px" style="margin:0 ' + curSpaceValue + 'px 0 0" />' + '</a>';
                }
            }

            value += '</div>';
            items.push({
                html : value
            });

            i += numberRecord;
        }

        return items;
    },

    destroy: function() {
        var me = this;
        Ext.Viewport.removeListener({
            orientationchange: {
                fn: me.onOrientationChange,
                scope: me
            }
        });

        var carousel = me.getAdvertisingCarousel();
        if (carousel.pageTurner) {
            carousel.pageTurner.cancel();
        }
        return this.callParent(arguments);
    },

    onHideImage: function() {
        var carousel = this.getAdvertisingCarousel();

        if (carousel.pageTurner) {
            carousel.pageTurner.cancel();
        }
    }
});
