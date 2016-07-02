Ext.define('Personify.controller.Store', {
    extend : 'Personify.base.Controller',
    inject: ['allProductStore', 'shoppingCartStore'],

    requires: 'Personify.store.base.FilterProductStore',

    config : {
        allProductStore: null,
        storeProduct: null,
        productClassFilter: null,
        textFilter: null,
        productClass: null,
        orientation: null,
        productClassStore: null,
        shoppingCartStore: null ,
        allItemsPerPage: null
    },

    control : {
        filterList: {
            filterbytrack: 'onFilterStore'
        },
        featuredProductsStore: true,
        featuredItemCarousel: true,
        storeDetails: true,
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
            Ext.Viewport.setMasked(false);
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Product List');
        }
        var me = this;
        me.loadData();
        Ext.Viewport.setListeners({
            orientationchange: {
                fn: me.onOrientationChange,
                scope: me
            }
        });
        me.setOrientation(Ext.Viewport.getOrientation());
        this.getView().setMasked(false);
    },
    
    onOrientationChange: function(viewport, orientation) {
        this.setOrientation(orientation);
        this.updateOrientationCarousel();
    },
    
    onPainted: function () {
        this.updateOrientationCarousel();
        Ext.Viewport.setMasked(false);
    },

    loadData: function() {
        var me = this;
        var carousel = me.getFeaturedItemCarousel();
        var carouselStoreDetails = me.getStoreDetails();
        carousel.setMasked({xtype: 'loadmask'});
        carouselStoreDetails.setMasked({xtype: 'loadmask'});
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var store = null;
        if (this.getAllProductStore().getAllCount() > 0) {
            store = this.getAllProductStore();
            me.displayData(carousel, store);
        } else {
            store = Ext.create(storeManager.getProductListStore());
            var currentUser = Personify.utils.Configuration.getCurrentUser();
            var config = Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.DefaultListingParamsStore.getAt(0);
            var attributes = {
                    IsMember: true,
                    IsStaffmember: currentUser ? currentUser.isStaffMember(): 'false',
                    ItemsPerPage: '10',
                    OrgID: currentUser? currentUser.get('organizationId') : config.get('orgId'),
                    OrgUnitID: currentUser? currentUser.get('organizationUnitId') : config.get('orgUnitId'),
                    ProductClassCode: 'ALL',
                    StartIndex: '1',
                    MasterCustomerID: currentUser? currentUser.get('masterCustomerId'): '' ,
                    SubCustomerID: currentUser? currentUser.get('subCustomerId'): '0'
                };
                
            store.setDataRequest(attributes);
            store.load({
                callback: function(data, operation, success) {
                    if(success) {
                        store.load({callback: function(records, operation, success) {
                            if(success) {
                                Deft.Injector.configure({
                                    allProductStore: {
                                        value: store
                                    }
                                });
                                me.displayData(carousel, store);
                            } else {
                                me.displayNoData();
                            }
                        }});
                    } else {
                        me.displayNoData();
                    }
                }
            });
        }
    },
    displayData: function(carousel, store) {
        var me = this;
        var productStore = store.getProductItemStore();
        productStore.clearFilter();
        me.setStoreProduct(productStore);

        if (store.getAt(0) != null) {
            me.setProductClassStore(store.getAt(0).ProductClassItem);
            me.onUpdateListFilter();
        }

        if (store.getProductItemStore() != null) {
            var totalItem = store.getProductItemStore().getCount();
           
            //feature product
            var featureProduct =  store.getProductItemStore();
            var arrayFeatureProduct = [];
            for (var i = 0; i < totalItem; i++) {
                var item = featureProduct.getAt(i);
                if (item.get('featuredProduct') == true) {
                    arrayFeatureProduct.push(item);
                }
            }
            var modelManger = Personify.utils.ServiceManager.getModelManager();
            var tempFeatureStore = Ext.create('Ext.data.Store', {
                model: modelManger.getProductModel(),
                sorters: [
                    {
                        property : 'featuredProductSortOrder',
                        direction: 'ASC'
                    },
                    {
                        property : 'productID',
                        direction: 'ASC'
                    }
                ]
            });
            tempFeatureStore.add(arrayFeatureProduct);
            var totalItemCarousel = me.setDataCarousel(tempFeatureStore, carousel, 2, tempFeatureStore.getCount());

            if (parseInt(totalItemCarousel) > 0) {
                me.getFeaturedProductsStore().setHidden(false);
            } else {
                me.getFeaturedProductsStore().setHidden(true);
            }

            me.getFeaturedTotalItem().setHtml(totalItemCarousel);
            //total item
            me.updateOrientationCarousel();
        }
    },
    
    updateOrientationCarousel: function() {
        var me = this;
        var store = me.getStoreProduct();

        if (store != null) {
            var totalItem = store.getCount();
            var carouselStoreDetails = me.getStoreDetails();
            this.onUpdateAllItemsPerPage();
            var productItemRecords = me.setDataCarousel(store, carouselStoreDetails, this.getAllItemsPerPage(), totalItem);
            me.getTotalItemStore().setHtml(productItemRecords);
           
        }
    },
    
    setDataCarousel: function(store, carousel, itemPerPage, totalItem) {
        var me = this;
        var dataStoreDetails = [], countStoreDetails = 0;
        var arrayItemStoreDetails = [];
        var modelManger = Personify.utils.ServiceManager.getModelManager();
        var tempStore = Ext.create('Ext.data.Store', {
            model: modelManger.getProductModel()
        });

        for (var i = 0; i < totalItem; i++) {
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
        carousel.setMasked(false);
        carousel.removeAll(true);
        carousel.add(arrayItemStoreDetails);
        carousel.setActiveItem(0);
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
        var searchTerm = (value != null) ? value.toLowerCase() : "";
        
        if (searchTerm == '') {
            this.setTextFilter(null);
        } else {
            this.setTextFilter({
                filterFn: function(record) {
                    if (record.get('name').toLowerCase().indexOf(searchTerm) > -1)
                        return record;
                }
            });
        }
           
        this.updateFilters();
    },
           
    refreshData: function(user) {
        this.loadData();
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
        filterlist.getController().setButtonText("Clear Filter");
        var productClassStore = this.getProductClassStore();
        productClassStore.sort('name', 'DESC');
        filterlist.getController().getUpdateList().setStore(productClassStore);
        /*var productStore = Ext.create('Personify.store.base.FilterProductStore');
        productStore.load({
            callback: function(records, operation, success) {
                productStore.sort('name', 'DESC');
                filterlist.getController().getUpdateList().setStore(productStore);
            }
        });*/
    },
    
    onOpenFilterPanel: function(button) {
        var filterlist = this.getFilterList();
        filterlist.showBy(button);
        button.setZIndex(8);
    }, 
    
    onFilterStore: function(text){
        if (text == null) {
            this.setProductClassFilter(null);
            this.getFilterTextLabel().setHtml("");
        } else {
            this.setProductClassFilter({
                filterFn: function(record) {
                    if (record.get('productClass').trim().toLowerCase() == text.trim().toLowerCase())
                        return record;
                }
            });
           //changed the text VIEWING to FILTER
            this.getFilterTextLabel().setHtml("FILTER: " + text.toUpperCase());
        }

        this.setProductClass(text);
        this.updateFilters();
    },
    
    updateFilters: function() {
        var store = this.getStoreProduct();
        var carousel = this.getStoreDetails();
        if(store) {
            store.clearFilter();
        
            var filters = [];
            
            if (this.getProductClassFilter())
                filters.push(this.getProductClassFilter());
            
            if (this.getTextFilter())
                filters.push(this.getTextFilter());
            
            if (filters.length > 0) {
                this.getClearFilter().setDisabled(false);
            } else {
                this.getClearFilter().setDisabled(true);
            }
            store.filter(filters);
            this.setDataCarousel(store, carousel, this.getAllItemsPerPage(), store.getCount());
            this.getTotalItemStore().setHtml(store.getCount());
        }
    },
    
    onClearFilter: function() {
        this.setProductClassFilter(null);
        this.setTextFilter(null);
        this.updateFilters();
        this.getFilterTextLabel().setHtml("");
        this.getSearchField().setValue("");
    },
    
    displayNoData: function() {
        var carouselStoreDetails = this.getStoreDetails();
        this.getFeaturedProductsStore().setHidden(true);
        carouselStoreDetails.setHtml('No data');
        carouselStoreDetails.setCls('newsFeedItem-emptytext');
        carouselStoreDetails.setMasked(false);
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

        if (window.plugins.app47) {
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
                ref = window.open(checkoutUrl, '_blank', 'location=no,enableViewportScale=yes');
            }
            ref.addEventListener('exit', function() {
                Ext.callback(me.setTotalItemCheckout, me);
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
    }
});
