Ext.define('Personify.controller.phone.store.StoreManagement', {
           extend: 'Personify.controller.Store',
           inject: ['shoppingCartStore'],
           
           control: {
           storeToolbar: {
           onNavigationButtonTap: 'onBack'
           },
           featuredItemCarousel: true,
           featureproductPhoneArea: true,
           storeDetails: {
           itemtap: 'onItemTapStoreDetail',
           scrollend: 'onScrollEnd'
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
           filterProductPanel:
           {
           show:'showPopupPanel',
           hide:'hidePopupPanel',
           },
           actionButton: {},
           view: {
           show: 'onShow'
           }
           },
           
           config: {
           productStore: null,
           productClassFilter: null,
           textFilter: null,
           shoppingCartStore: null,
           //Store Enhancement
           totalProducts: null,
           initialFeaturedProducts: null,
           params: null
           //Store Enhancement
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
           me.setParams(null);
           me.getView().setMasked({xtype: 'loadmask'});
           Ext.callback(function() {
                        var currentUser = Personify.utils.Configuration.getCurrentUser();
                        var config = Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.DefaultListingParamsStore.getAt(0);
                        
                        var attributes = {
                        IsMember: true,
                        IsStaffmember: currentUser ? currentUser.isStaffMember(): 'false',
                        ItemsPerPage: '10000',
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
                        var storeManager = Personify.utils.ServiceManager.getStoreManager();
                        me.loadFeatureProductCarousel(carousel,storeManager);
                        }, me, [], 1);
           },
           loadFeatureProductCarousel: function(carousel,storeManager) {
           var me = this;
           var store = Ext.create(storeManager.getProductListStore());
           store.setDataRequest(me.getParams());
           store.load({callback: function(data, operation, success) {
                      if (success) {
                      store.load({callback: function(records, operation, success) {
                                 if (success) {
                                 if (records[0]) {
                                 me.displayData(store);
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
                      me.loadStoreList(storeManager);
                      }});
           },
           
           //Store Enhancement
           displayData: function(store) {
           var me = this;
           var totalItemCarousel = me.setDataCarousel(store.getProductItemStore(), this.getFeaturedItemCarousel(), 1, store.getProductItemStore().getCount());
           
           var featureproductArea = this.getFeatureproductPhoneArea();
           if(totalItemCarousel > 0)
           {
           featureproductArea.setHidden(false);
           }
           else
           {
           featureproductArea.setHidden(true);
           }
           //this.getStoreDetails().setStore(productItem);
           //this.getView().setMasked(false);
           //this.getFilterProductList().setStore(productClass);
           },
           
           displayNoData: function() {
           var me = this;
           var list = this.getStoreDetails();
           var carousel = this.getFeaturedItemCarousel();
           carousel.setHtml('No data');
           me.getView().setMasked(false);
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
           carousel.removeAll(true);
           carousel.add(arrayItemStoreDetails);
           carousel.setActiveItem(0);
           return countStoreDetails;
           },
           loadStoreList: function(storeManager) {
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
                                 var productManagement = records[0];
                                 if(me.getParams()['StartIndex'] == 1 && me.getParams()['SearchTerm'] == '' && me.getParams()['ProductClassCode'] == 'ALL')
                                 {
                                 me.getFilterProductList().setStore(productManagement.ProductClassItem);
                                 }
                                 var currentStore = me.getStoreDetails().getStore();
                                 if (currentStore) {
                                 currentStore.suspendEvents();
                                 productManagement.ProductItem.each(function(productRecord) {
                                                                    if(productRecord) {
                                                                    currentStore.add(productRecord);
                                                                    }
                                                                    }, me);
                                 currentStore.sync();
                                 currentStore.resumeEvents(true);
                                 me.getStoreDetails().setStore(currentStore);
                                 me.getStoreDetails().refresh();
                                 } else {
                                 me.getStoreDetails().setStore(productManagement.ProductItem);
                                 currentStore = productManagement.ProductItem;
                                 }
                                 
                                 if (productManagement) {
                                 me.setTotalProducts(productManagement.get('totalResults'));
                                 }
                                 me.getView().setMasked(false);
                                 }
                                 else
                                 {
                                 me.getView().setMasked(false);
                                 }
                                 }});
                      }
                      else
                      {
                      me.getView().setMasked(false);
                      }
                      }
                      });
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
           onScrollEnd: function(record) {
           var me = this;
           var ProductStore = me.getStoreDetails().getStore();
           var currentProductItem = 0;
           if (ProductStore) {
           currentProductItem = ProductStore.getCount();
           }
           
           if (currentProductItem < me.getTotalProducts()) {
           me.getParams()['StartIndex'] = me.getParams()['StartIndex'] + (Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.get('itemsPerPageProductList'));
           me.getView().setMasked({xtype: 'loadmask'});
           var storeManager = Personify.utils.ServiceManager.getStoreManager();
           me.loadStoreList(storeManager);
           }
           },
           
           showPopupPanel: function(obj) {
           Personify.utils.BackHandler.pushActionAndTarget('forceHide', this, obj);
           },
           
           hidePopupPanel: function(obj) {
           Personify.utils.BackHandler.popActionAndTarget('forceHide', this, obj);
           },
           
           forceHide: function(obj) {
           obj.hide();
           this.updateFilters();
           },
           
           onFilterProduct: function(button) {
           var filterList = this.getFilterProductPanel();
           filterList.showBy(button, "tl-tr?");
           //button.setZIndex(8);
           },
           
           onFilterProductList: function(list, index, target, record, e, eOpts) {
           this.onFilterStore(record.get('description'));
           this.getFilterProductPanel().hide();
           this.getFilterStorePanel().getController().updateLabel('<span style = "font-size: 12px; float: left; margin-top: 3px; margin-right: 7px;">FILTER: </span>' + record.get('text').toUpperCase());
           this.getFilterStorePanel().show();
           },
           
           updateFilters: function() {
           var me=this;
           me.getView().setMasked({xtype: 'loadmask'});
           me.getStoreDetails().getStore().removeAll(true);
           var storeManager = Personify.utils.ServiceManager.getStoreManager();
           me.loadStoreList(storeManager)
           },
           
           onFilterStore: function(text) {           
           var me = this;
           var filterText = (text != null) ? text.toLowerCase() : "ALL";
           me.getParams()['ProductClassCode'] = filterText;
           me.getParams()['StartIndex'] = 1;
           me.updateFilters();        
           },
           
           onTapClearFilter: function() {
           var me = this;
           me.getParams()['SearchTerm'] = '';
           me.getParams()['StartIndex'] = 1;
           me.getParams()['ProductClassCode'] = 'ALL';
           me.getSearchStorePanel().getController().clearSearchField();
           me.updateFilters();
           me.getFilterProductPanel().hide();
           me.getFilterStorePanel().hide();
           },
           
           onUpdateCurrentUser: function() {
           var me = this;
           var storeManager = Personify.utils.ServiceManager.getStoreManager();
           me.loadStoreList(storeManager);
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