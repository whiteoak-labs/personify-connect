Ext.define('Personify.controller.home.BigEvent',{
    extend: 'Personify.base.Controller',
    requires: ['Ext.util.DelayedTask'],
    control: {
    	// viewMoreEvent: {
            // tap: 'onViewMoreEventTap'
        // },

        carouselImg:{
            show: 'onShowImage',
            activeitemchange: 'onActiveItemChange'
        }
    },

    config: {
        featuredEventsData: null,
        orientation: null
    },

    init: function() {
        var me = this;
        this.onShowImage();
        Ext.Viewport.setListeners({
            orientationchange: {
                fn: me.onOrientationChange,
                scope: me
            }
        });
        me.setOrientation(Ext.Viewport.getOrientation());
        this.onLoadFeaturedEvents();
    },

    onLoadFeaturedEvents: function() {
        var featuredEvents = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('featuredEvents');
        this.setFeaturedEventsData(featuredEvents);
        this.setDataCarousel();
    },

    onOrientationChange: function(viewport, orientation) {
        this.setOrientation(orientation);
        this.setDataCarousel();
    },

    setDataCarousel: function() {
        var me = this,
            carousel = this.getCarouselImg(),
            data = this.getFeaturedEventsData(),
            orientation = this.getOrientation();

        carousel.removeAll(true);
        for (var i = 0; i < data.length; i++) {
            var src = null;
            if (orientation == 'portrait') {
                src = data[i].TabletPortraitImageURL;
            } else {
                src = data[i].TabletLandscapeImageURL;
            }
            var item = Ext.create('Ext.Img', {
                src: src,
                layout: 'fit',
                record: data[i]
            });
            item.on({
                tap: {
                    fn: me.onOpenEventPage,
                    scope: me,
                    item: data[i]
                }
            });
            carousel.add(item);
        }
        carousel.setActiveItem(0);
    },

    onOpenEventPage: function(item) {
        var me = this;
        var data = item.config.record;

        if (!data.ProductId) {
            return;
        }

        var record = null;
        var eventListStore = Ext.getStore('meetingListtingMain');

        eventListStore.each(function(item) {
            if (item.get('productID') == data.ProductId) {
                record = item;
            }
        });

        if (record) {
            me.getView().fireEvent('onEventItemTapped', record);
        }
    },

    destroy: function() {
        var carousel = this.getCarouselImg(),
            me = this;

        Ext.Viewport.removeListener ({
            orientationchange: {
                fn: me.onOrientationChange,
                scope: me
            }
        });

        if (carousel.pageTurner) {
            carousel.pageTurner.cancel();
        }

        return this.callParent(arguments);
    },

    onShowImage: function() {
        var rotation = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('featuredEventsRotation');
        var carousel = this.getCarouselImg();
        //Start-Fix-3246-8398082
        if (!carousel.pageTurner) {
            carousel.pageTurner = new Ext.util.DelayedTask(function() {
                if (carousel.getActiveIndex() == carousel.items.length - 1) {
                    carousel.setActiveItem(0, { type: "slide", direction: "right", duration: rotation * 1000 });
                    setTimeout(function(){carousel.next();},rotation * 1000);
                } else {
                    carousel.next();
                }
            }, carousel);
        }
        //End-Fix-3246-8398082
        carousel.pageTurner.delay(rotation * 1000);
    },
    
    onActiveItemChange: function() {
        var rotation = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('featuredEventsRotation');
        var carousel = this.getCarouselImg();
        carousel.pageTurner.delay(rotation * 1000);
    }
});
