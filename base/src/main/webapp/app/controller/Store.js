Ext.define('Personify.controller.Store', {
    extend : 'Personify.base.Controller',
    inject: ['shoppingCartStore'],

    requires: 'Personify.store.base.FilterProductStore',

    config : {
        storeProduct: null,
        productClassFilter: null,
        textFilter: null,
        productClass: null,
        orientation: null,
        productClassStore: null,
        shoppingCartStore: null ,
        allItemsPerPage: null,
        //Store Enhancement
        totalProducts: null,
        params: null,
        lastPageItemCount:0
        //Store Enhancement
    },

    control : {
        filterList: {
           filterbytrack: 'onFilterStore',
           show : 'showPopupPanel',
           hide : 'hidePopupPanel',
        },
        featuredProductsStore: true,
        //Store Enhancement
        featuredItemCarousel: true,
        storeDetails: {
           activeitemchange: 'onActiveItemChange'
        },
        //Store Enhancement
        totalItemStore: true,
        featuredTotalItem: true,
        searchStorePanel: {
            seachclearicontap: 'onSearchStore',
            onsearchtextchange: 'onSearchStore',
            tapsearchbutton: 'onSearchStore'
        },
        featureLabel: {
            onOpenFilterPanel: 'onOpenFilterPanel',
            onTapClearFilter: 'onClearFilter',
            ontapcartitemcheckout: 'onTapCartItemCheckout'
        },
        view: {
            painted: 'onPainted'
        },
        filterTextLabel: {
        },
        clearFilter: true,
        searchField: true
    },

    init: function() {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        if(navigator.onLine && window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Product List');
        }
        var me = this;
        me.onGetData();
        Ext.Viewport.setListeners({
            orientationchange: {
                fn: me.onOrientationChange,
                scope: me
            }
        });
        Ext.Viewport.bodyElement.on('resize', Ext.emptyFn, me, { buffer: 1});
        me.setOrientation(Ext.Viewport.getOrientation());
        //this.getView().setMasked(false);
    },
    
    onOrientationChange: function(viewport, orientation) {
        var me = this;
        me.setOrientation(orientation);
        me.getParams()['StartIndex'] = 1;
        me.updateFilters();
        //this.updateOrientationCarousel(true);
    },
    
    onPainted: function () {
        //this.updateOrientationCarousel(false);
        //Ext.Viewport.setMasked(false);
    },
    onGetData: function(){
        var me = this;
        me.setParams(null);
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var config = Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.DefaultListingParamsStore.getAt(0);
        var attributes = {
           IsMember: true,
           IsStaffmember: currentUser ? currentUser.isStaffMember(): 'false',
           ItemsPerPage: 10000,
           OrgID: currentUser? currentUser.get('organizationId') : config.get('orgId'),
           OrgUnitID: currentUser? currentUser.get('organizationUnitId') : config.get('orgUnitId'),
           ProductClassCode: 'ALL',
           StartIndex: 1,
           MasterCustomerID: currentUser? currentUser.get('masterCustomerId'): '' ,
           SubCustomerID: currentUser? currentUser.get('subCustomerId'): '0',
           SearchTerm:'',
           FeaturedProductsOnly:true
        };
        me.setParams(attributes);
           
        var carousel = me.getFeaturedItemCarousel();
        var carouselStoreDetails = me.getStoreDetails();
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        
        //carousel.setMasked({xtype: 'loadmask'});
        //carouselStoreDetails.setMasked({xtype: 'loadmask'});
        me.getView().setMasked({xtype: 'loadmask'});
        var store = null;
        me.loadFeatureProductData(carousel,storeManager);
    },
    loadFeatureProductData: function(carousel,storeManager) {
        var me = this;
        var carouselStoreDetails = me.getStoreDetails();
        var store = Ext.create(storeManager.getProductListStore());
        store.setDataRequest(me.getParams());
        store.load({
            callback: function(data, operation, success) {
                if(success) {
                    store.load({callback: function(records, operation, success) {
                        if(success) {
                            me.displayData(carousel, store,true,true);
                        } else {
                            me.displayNoData(true);
                        }
                    }});
                } else {
                   me.displayNoData(true);
                }
                me.loadData(carouselStoreDetails,storeManager,true);
            }
        });
           
    },
    loadData: function(carousel,storeManager,removeAll) {
        //if(carousel.getMasked().getHidden()){
        //   carousel.setMasked({xtype: 'loadmask'});
        //}
        var me = this;
        var store = Ext.create(storeManager.getProductListStore());
           me.getParams()['ItemsPerPage'] = Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.get('itemsPerPageProductList');
           me.getParams()['FeaturedProductsOnly'] = false;
            store.setDataRequest(me.getParams());
            store.load({
                callback: function(data, operation, success) {
                    if(success) {
                        store.load({callback: function(records, operation, success) {
                            if(success) {
                                if(!me.getStoreProduct())
                                {
                                   me.setStoreProduct(store.getProductItemStore());
                                }
                                else
                                {
                                   store.getProductItemStore().each(function(productItemRecord) {
                                        if(productItemRecord) {
                                            me.getStoreProduct().add(productItemRecord);
                                        }
                                    }, me);
                                }
                                me.displayData(carousel, store,false,removeAll);                                
                            } else {
                                me.displayNoData(false);
                            }
                        }});
                    } else {
                        me.displayNoData(false);
                    }
                }
            });
        
    },
    displayData: function(carousel, store,featuredProduct,removeAll) {
        var me = this;
        if(featuredProduct)
        {
           var totalItemCarousel = me.setDataCarousel(store.getProductItemStore(), carousel, 2, store.getProductItemStore().getCount(),removeAll,0,featuredProduct);
           if (parseInt(totalItemCarousel) > 0) {
                me.getFeaturedProductsStore().setHidden(false);
           } else {
                me.getFeaturedProductsStore().setHidden(true);
           }
           me.getFeaturedTotalItem().setHtml(totalItemCarousel);
        }
        else
        {
           me.setTotalProducts(store.getAt(0).get('totalResults'));
           if (store.getAt(0) != null && me.getParams()['StartIndex']==1) {
                me.setProductClassStore(store.getAt(0).ProductClassItem);
                me.onUpdateListFilter();
           }

           if (me.getStoreProduct() != null) {
                //total item
                me.updateOrientationCarousel(removeAll);
           }
        }
    },
    
    updateOrientationCarousel: function(removeAll) {
        var me = this;
        var store = me.getStoreProduct();

        if (store != null) {
            var carouselStoreDetails = me.getStoreDetails();
            this.onUpdateAllItemsPerPage();
            var productItemRecords = me.setDataCarousel(store, carouselStoreDetails, this.getAllItemsPerPage(), me.getTotalProducts(),removeAll,(me.getParams()['StartIndex']-1)-me.getLastPageItemCount(),false);
           
            //me.getTotalItemStore().setHtml(productItemRecords);
            me.getTotalItemStore().setHtml(me.getTotalProducts());
        }
    },
    
    setDataCarousel: function(store, carousel, itemPerPage, totalItem,removeAll,startCtr,featuredProduct) {
        var me = this;
        var dataStoreDetails = [], countStoreDetails = startCtr;
        var arrayItemStoreDetails = [];
        var modelManger = Personify.utils.ServiceManager.getModelManager();
        var tempStore = Ext.create('Ext.data.Store', {
            model: modelManger.getProductModel()
        });
        if(store.getCount()!= 0 && !featuredProduct)
        {
           me.setLastPageItemCount(store.getCount() % itemPerPage);
        }
        for (var i = startCtr; i < store.getCount(); i++) {
           
           if (store.getAt(i) != null) {
                dataStoreDetails.push(store.getAt(i));
            }
            countStoreDetails++;
            
            if (countStoreDetails % itemPerPage == 0 || countStoreDetails == totalItem) {
                tempStore.add(dataStoreDetails);
                var obj = Ext.create('Personify.view.store.StoreDetails', {
                    store: tempStore
                });
                
                obj.on({
                    itemtap : {
                        fn : me.onFeaturedItemCarouselTap,
                        scope : me,
                        item : store.getAt(i)
                    }
                });
                arrayItemStoreDetails.push(obj);
                dataStoreDetails = [];
                
                tempStore = Ext.create('Ext.data.Store', {
                    model: modelManger.getProductModel()
                });
            }
           
        }
        if(removeAll)
        {
           carousel.removeAll(true);
        }
        carousel.add(arrayItemStoreDetails);
        if(removeAll)
        {
           carousel.setActiveItem(0);
        }
        //carousel.setMasked(false);
        if(!featuredProduct)
        {
           me.getView().setMasked(false);
        }
        return countStoreDetails;
    },
    
    onStoreDetailsItemTap: function(dataView, index, target, record, e, eOpts) {
        var panel = Ext.Viewport.add({xtype: 'moredetailpage'});
        panel.setProductItemStore(record.getData());
        panel.show();
    },
    
    onFeaturedItemCarouselTap: function(dataView, index, target, record, e, eOpts) {
        var panel = Ext.Viewport.add({xtype: 'moredetailpage'});
        var imageStore = Ext.create('Personify.base.Store', {
            fields: [
                {name: 'imageURL', type: 'string'}
            ]
        });
        imageStore.add({'imageURL': record.get('imageURL')});
        panel.getController().getImagesMoredetailPage().setStore(imageStore);
        panel.getController().setProductItemStore(record);
        panel.show();
    },
    
    onSearchStore: function(value) {
           
        var me = this;
        var searchTerm = (value != null) ? value.toLowerCase() : "";
        if(searchTerm != me.getParams()['SearchTerm'])
           {
        me.getParams()['SearchTerm'] = searchTerm;
        me.getParams()['StartIndex'] = 1;
           
        this.updateFilters();
           }
    },
           
    refreshData: function(user) {
        var me = this;
        carousel = me.getStoreDetails();
        carousel.removeAll(true);
        me.getStoreProduct().removeAll();
        me.setLastPageItemCount(0);
        me.getParams()['ProductClassCode'] = 'ALL';
        me.getFilterTextLabel().setHtml("");
        me.getSearchField().setValue("");
        me.onGetData();
    },
    
    onCartItemCheckoutStore: function() {
        var me = this;
        if (!me.getCurrentUser().isLogged()) {
            Personify.utils.ItemUtil.needToLogin();
        } else {
            var panel = Ext.Viewport.add({xtype: 'cartpanel'});
            panel.show();
        }
    },
    
    onUpdateListFilter: function() {
        var filterlist = this.getFilterList();
        filterlist.getController().setButtonText("Clear");
        filterlist.getController().setFilterType("store");
        var productClassStore = this.getProductClassStore();
        productClassStore.sort('name', 'DESC');
        filterlist.getController().getUpdateList().setStore(productClassStore);
    },
    
    onOpenFilterPanel: function(button) {
        var filterlist = this.getFilterList();
        filterlist.showBy(button);
        button.setZIndex(8);
    }, 
    
    onFilterStore: function(text,displayText){
        var me = this;
        if (text == null) {
            this.getFilterTextLabel().setHtml("");
        } else {
           //changed the text VIEWING to FILTER
           this.getFilterTextLabel().setHtml("FILTER: " + displayText.toUpperCase());
        }
        var filterText = (text != null) ? text.toLowerCase() : "ALL";
        me.getParams()['ProductClassCode'] = filterText;
        me.getParams()['StartIndex'] = 1;
        me.updateFilters();
    },
    
    updateFilters: function() {
        var me=this;
        var carousel = me.getStoreDetails();
        //carousel.setMasked({xtype: 'loadmask'});
        me.getView().setMasked({xtype: 'loadmask'});
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        me.getStoreProduct().removeAll();
        carousel.removeAll(true);
        me.getTotalItemStore().setHtml("");
        me.setLastPageItemCount(0);
        me.loadData(carousel,storeManager,true);
           
        if(me.getParams()['ProductClassCode'] == 'ALL' && me.getParams()['SearchTerm'] == '') {
                this.getClearFilter().setDisabled(true);
        } else {
            this.getClearFilter().setDisabled(false);
        }
        
    },
    
    onClearFilter: function() {
        var me = this;
        me.getParams()['ProductClassCode'] = 'ALL';
        me.getParams()['StartIndex'] = 1;
        me.getParams()['SearchTerm'] = '';
        me.getFilterTextLabel().setHtml("");
        me.getSearchField().setValue("");
        me.updateFilters();
    },
    
    displayNoData: function(featuredProduct) {
        var me = this;
        if(!featuredProduct)
        {
           var carouselStoreDetails = this.getStoreDetails();
           carouselStoreDetails.setHtml('No data');
           carouselStoreDetails.setCls('newsFeedItem-emptytext');
           me.getView().setMasked(false);
        }
        else
        {
           me.getFeaturedProductsStore().setHidden(true);
        }
    },

    destroy: function() {
        var me = this;
        Ext.Viewport.removeListener ({
            orientationchange: {
                fn: me.onOrientationChange,
                scope: me
            }
        });

        return this.callParent(arguments);
    },

    onTapCartItemCheckout: function() {
        var me = this;
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }

        if (navigator.onLine && window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('View Shopping Cart');
        }

        var currentUser = Personify.utils.Configuration.getCurrentUser();

        if (currentUser && currentUser.isLogged()) {
            var checkoutUrl = Personify.utils.Configuration.getUrlCheckOut();

            if (!checkoutUrl) {
                Ext.Msg.alert('', 'Cannot check out shopping cart.');
                return;
            }

            var ref = null;
            if (Ext.os.is.Android) {
                ref = window.open(checkoutUrl, '_blank', 'location=yes,enableViewportScale=yes');
            } else {
                ref = window.open(checkoutUrl, '_blank', 'location=yes,enableViewportScale=yes');
            }
           Personify.utils.BackHandler.pushActionAndTarget('close', ref);
            ref.addEventListener('exit', function() {
                Ext.callback(me.setTotalItemCheckout, me);
                 Personify.utils.BackHandler.popActionAndTarget('close', ref);
            });
        } else {
            Personify.utils.ItemUtil.needToLogin();
        }
    },

    setTotalItemCheckout: function() {
        var me = this,
            currentUser = Personify.utils.Configuration.getCurrentUser(),
            masterCustomerId = null,
            subCustomerId = null;

        if (currentUser && currentUser.isLogged()) {
            masterCustomerId = currentUser.get('masterCustomerId'),
                subCustomerId = currentUser.get('subCustomerId');

            var storeShoppingCart = me.getShoppingCartStore(),
                requestPayload = {
                    "MasterCustomerId": masterCustomerId,
                    "SubCustomerId": subCustomerId
                };

            storeShoppingCart.setDataRequest(requestPayload);
            storeShoppingCart.load({callback: function(records, operation, success) {
                Deft.Injector.configure({
                    shoppingCartStore: {
                        value: storeShoppingCart
                    }
                });
            }});
        }
    },

    onUpdateAllItemsPerPage: function() {
        var height = this.getStoreDetails().element.getHeight();
        var itemPerColumn = parseInt(height / 101);
        this.setAllItemsPerPage((itemPerColumn > 1) ? itemPerColumn * 2 : 2 );
    },
    
    onActiveItemChange: function( field, value, oldValue ){
        var me = this;
        var store = me.getStoreProduct();
        var carouselStoreDetails = me.getStoreDetails();
        if(carouselStoreDetails.getActiveIndex() == carouselStoreDetails.getMaxItemIndex() && me.getTotalProducts() > store.getCount())
        {
           //carouselStoreDetails.setMasked({xtype: 'loadmask'});
           me.getView().setMasked({xtype: 'loadmask'});
           me.getParams()['StartIndex'] = me.getParams()['StartIndex'] + Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.get('itemsPerPageProductList');
           //var carousel = me.getFeaturedItemCarousel();
           var storeManager = Personify.utils.ServiceManager.getStoreManager();
           me.loadData(carouselStoreDetails,storeManager,false);
        }
    },
           
    showPopupPanel : function(obj) {
        Personify.utils.BackHandler.pushActionAndTarget('forceHide', this, obj);
    },
        
    hidePopupPanel : function(obj) {
        Personify.utils.BackHandler.popActionAndTarget('forceHide', this, obj);
    },
        
    forceHide : function(obj) {
        obj.hide();
        //this.updateFilters();
    }
});
