Ext.define('Personify.controller.phone.store.StoreManagement', {
    extend: 'Personify.controller.Store',
    inject: ['allProductStore', 'shoppingCartStore'],

    control: {
        storeToolbar: {
            onNavigationButtonTap: 'onBack'
        },
        featuredItemCarousel: true,
        storeDetails: {
            itemtap: 'onItemTapStoreDetail'
        },
        searchStorePanel: {
            seachclearicontap: 'onSearchStore',
            onsearchtextchange: 'onSearchStore',
            tapsearchbutton: 'onSearchStore'
        },
        filterStorePanel: {
            clearFilter: 'onTapClearFilter'
        },
        detailPanel: {
            onFilterProduct: 'onFilterProduct',
            onTapSearchProduct: 'onTapSearchProduct',
            onTapButtonShoppingCart: 'onTapButtonShoppingCart'
        },
        filterProductList: {
            itemtap: 'onFilterProductList'
        },
        filterProductPanel: true,
        actionButton: {},
        view: {
            show: 'onShow'
        }
    },

    config: {
        productStore: null,
        productClassFilter: null,
        textFilter: null,
        allProductStore: null,
        shoppingCartStore: null
    },

    init: function() {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Product List');
        }

        var me = this;
        this.getStoreToolbar().getController().setActionCls('p-phone-button-storeshoppingcart');
        this.getActionButton().hide();
    },

    destroy: function() {
        this.getShoppingCartStore().un('load', this.onLoadDone, this);
        return this.callParent(arguments);
    },

    onShow: function() {
        if (this.getShoppingCartStore().getCount() != 0) {
            this.getActionButton().setText(this.getShoppingCartStore().getCount());
        } else {
            this.getActionButton().setText('0');
        }
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if (!currentUser.isLogged()) {
            this.getActionButton().setText('0');
        }
    },

    onBack: function() {
        var me = this;
        thisView = me.getView();
        thisView.fireEvent('back',this);
    },

    onGetData: function() {
        var me = this;
        me.getView().setMasked({xtype: 'loadmask'});
        Ext.callback(function() {
            if (me.getAllProductStore().getAllCount() > 0) {
                var store = me.getAllProductStore();
                me.displayData(store.getAt(0).ProductItem, store.getAt(0).ProductClassItem);
            } else {
                var storeManager = Personify.utils.ServiceManager.getStoreManager();
                var store = Ext.create(storeManager.getProductListStore());
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
                store.load({callback: function(data, operation, success) {
                    if (success) {
                        store.load({callback: function(records, operation, success) {
                            if (success) {
                                if (records[0]) {
                                    me.setAllProductStore(store);
                                    Deft.Injector.configure({
                                        allProductStore: {
                                            value: store
                                        }
                                    });
                                    me.displayData(records[0].ProductItem, records[0].ProductClassItem);
                                } else {
                                    me.displayNoData();
                                }
                            } else {
                                me.displayNoData();
                            }
                        }});
                    } else {
                        me.displayNoData();
                    }
                }});
            }
        }, me, [], 1);
    },

    displayData: function(productItem, productClass) {
        productItem.clearFilter();
        productItem.setRemoteFilter(false);
        this.setProductStore(productItem);
        var totalItem = productItem.getAllCount();
        //get feature product item
        var arrayFeatureProduct = [];
        for (var i = 0; i < totalItem; i++) {
            var item = productItem.getAt(i);
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
        var totalItemCarousel = this.setDataCarousel(tempFeatureStore, this.getFeaturedItemCarousel(), 1, tempFeatureStore.getCount());
        this.getStoreDetails().setStore(productItem);
        this.getView().setMasked(false);
        this.getFilterProductList().setStore(productClass);
    },

    displayNoData: function() {
        var list = this.getStoreDetails();
        var carousel = this.getFeaturedItemCarousel();
        carousel.setHtml('No data');
        list.setMasked(false);
        carousel.setMasked(false);
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
                var obj = Ext.create('Personify.view.phone.store.FeatureItemTemplate', {
                    store: tempStore
                });

                obj.on({
                    itemtap : {
                        fn : me.onFeaturedItemCarouselTap,
                        //element : 'element',
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

    onFeaturedItemCarouselTap: function(dataView, index, target, record, e, eOpts) {
        this.openMoreDetailPage(record);
    },

    onItemTapStoreDetail: function(dataview, index, target, record, e, eOpts) {
        this.openMoreDetailPage(record);
    },

    openMoreDetailPage: function(record) {
        this.getView().fireEvent('requestchangeview','Personify.view.phone.store.MoreDetailPage', {record:record});
    },

    onFilterProduct: function(button) {
        var filterList = this.getFilterProductPanel();
        filterList.showBy(button, "tl-tr?");
        //button.setZIndex(8);
    },

    onFilterProductList: function(list, index, target, record, e, eOpts) {
        this.onFilterStore(record.get('text'));
        this.getFilterProductPanel().hide();
        this.getFilterStorePanel().getController().updateLabel('<span style = "font-size: 12px; float: left; margin-top: 3px; margin-right: 7px;">FILTER: </span>' + record.get('text').toUpperCase());
        this.getFilterStorePanel().show();
    },

    updateFilters: function(text) {
        var productStore = this.getStoreDetails().getStore();

        if (productStore) {
            productStore.clearFilter();

            var filters = [];

            if (this.getProductClassFilter()) {
                filters.push(this.getProductClassFilter());
            }

            if (this.getTextFilter()) {
                filters.push(this.getTextFilter());
            }

            if (filters.length > 0) {
                productStore.filter(filters);
            }
        }
    },

    onFilterStore: function(text) {
        if (text == null) {
            this.setProductClassFilter(null);
        } else {
            this.setProductClassFilter({
                filterFn: function(record) {
                    if (record.get('productClass').trim().toLowerCase() == text.trim().toLowerCase()) {
                        return record;
                    }
                }
            });
        }
        this.updateFilters(text);
    },

    onTapClearFilter: function() {
        this.setProductClassFilter(null);
        this.setTextFilter(null);
        this.updateFilters();
        this.getFilterProductPanel().hide();
        this.getFilterStorePanel().hide();
    },

    onUpdateCurrentUser: function() {
        this.getAllProductStore().removeAll();
        this.loadData();
    },

    onTapSearchProduct: function() {
        var me = this;
        searchStorePanel = me.getSearchStorePanel();
        if(searchStorePanel.isHidden()) {
            searchStorePanel.setHidden(false);
        } else {
            searchStorePanel.setHidden(true);
        }
    },

    onTapButtonShoppingCart: function() {
        var currentUser = Personify.utils.Configuration.getCurrentUser();

        if (currentUser && currentUser.isLogged()) {
            this.getView().fireEvent('checkoutshoppingcart', this);
        } else {
            var loginForm = Ext.create('Personify.view.phone.login.LoginPhone');
            loginForm.addListener('updatecurrentuser', this.onUpdateCurrentUser, this);
            this.getView().fireEvent('requestchangeview', loginForm, null);
        }
    }
});
