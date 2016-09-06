Ext.define('Personify.profile.AppProfile', {
    extend: 'Ext.app.Profile',

    initStep: 0,

    config: {
        isCssFileLoaded: false
    },

    launch: function () {
        var me = this;
        Personify.utils.PhoneGapHelper.listenerConnection();
        Personify.utils.Configuration.setAllowChangeView(true);
        window.plugins.loadResources.load(['resources/css/app.css'], function() {
            if (Ext.os.is.Phone) {
                window.plugins.loadResources.load(['resources/css/phone.css'], Ext.emptyFn);
            }

            me.setIsCssFileLoaded(true);
        });
        this.loadConfigurations(); 
    },
    
    loadConfigurations: function() {
        var me = this;
        Personify.utils.Configuration.loadConfigurationFromApp47(function() {
            me.configureUrbanAirship();
            Ext.callback(me.loadPreferences, me);
        });
    },

    configureUrbanAirship: function() {
        if (!window.plugins.pushNotification) {
            return;
        }
        var config = Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore;
        if (config) {
            var urbanairship = window.plugins.pushNotification;
            urbanairship.setUseProduction(config.get('UrbanAirship-UseProduction'));
            urbanairship.setDevAppId(config.get('UrbanAirship-Dev-Key'));
            urbanairship.setDevSecret(config.get('UrbanAirship-Dev-Secret'));
            urbanairship.setProdAppId(config.get('UrbanAirship-Prod-Key'));
            urbanairship.setProdSecret(config.get('UrbanAirship-Prod-Secret'));
           
            urbanairship.takeOff();

        document.addEventListener("resume", function() {
          urbanairship.resetBadge();
        });
        
        urbanairship.getIncoming(function (incoming) {
          if(incoming.message) {
          }
        });
        
        function on_push(data) {
        }
        
        function on_reg(error, pushID) {
          if (!error) {
          }
        }
        
        urbanairship.registerEvent('registration', on_reg);
        urbanairship.registerEvent('push', on_push);
        urbanairship.enablePush();
        urbanairship.registerForNotificationTypes(urbanairship.notificationType.badge |
                                                  urbanairship.notificationType.sound |
                                                  urbanairship.notificationType.alert);
        }
    },

    loadPreferences: function() {
        var me = this;
        var modelManager = Personify.utils.ServiceManager.getModelManager();
        var userModelName = modelManager.getUserModel();

        var user = Ext.create(userModelName);
        Personify.utils.Configuration.setCurrentUser(user);
        Deft.Injector.configure({
            currentUser: {
                value: user
            }
        });

        if (window.plugins.applicationPreferences) {
            window.plugins.applicationPreferences.get('keepUserLogin', function(result) {
                if (result) {
                    var userStore = Ext.create('Ext.data.Store', {
                        autoLoad: true,
                        model: userModelName,
                        data: result,
                        proxy: {
                            type: 'memory',
                            reader: 'json'
                        }
                    });

                    if (userStore.getCount()) {
                        Personify.utils.Configuration.setCurrentUser(userStore.first());
                        Deft.Injector.configure({
                            currentUser: {
                                value: userStore.first()
                            }
                        });
                    }

                    window.plugins.applicationPreferences.get('username', function(result) {
                        Personify.utils.Configuration.setUserName(result);
                        Personify.utils.Configuration.getCurrentUser().setUserName(result);
                    });

                    window.plugins.applicationPreferences.get('password', function(result) {
                        Personify.utils.Configuration.setPassword(result);
                        Personify.utils.Configuration.getCurrentUser().setPassword(result);
                    });
                }

                Ext.callback(me.initViews, me, [], 1000);
            }, function(error) {
                me.initViews();
            });

            window.plugins.applicationPreferences.get('twitterToken', function(token) {
                if (token) {
                    TMA.Twitter.setToken(Ext.JSON.decode(token));
                    window.plugins.applicationPreferences.get('userTwitter', function(dataTwitter) {
                        var paramInit = {
                            consumerKey:'6AqyEYuQnznxau9uYns17w',
                            consumerSecret :'eRZZMxdC2gAx5PnMbtcetAqRYPSv6FnA3J21rOAo74',
                            userModel:'Personify.model.twitter.User'
                        };
                        TMA.Twitter.init(paramInit);
                        var userTwitter = Ext.create(paramInit.userModel, Ext.JSON.decode(dataTwitter));
                        TMA.Twitter.setUser(userTwitter);
                    });
                }
            });
           
            window.plugins.applicationPreferences.get('appOnlyTwitterToken', function(token) {
                    if (token) {
                        TMA.Twitter.setAppOnlyToken(Ext.JSON.decode(token));
                        params = {
                            consumerKey:'6AqyEYuQnznxau9uYns17w',
                            consumerSecret :'eRZZMxdC2gAx5PnMbtcetAqRYPSv6FnA3J21rOAo74',
                            base64KeySecret:'NkFxeUVZdVFuem54YXU5dVluczE3dzplUlpaTXhkQzJnQXg1UG5NYnRjZXRBcVJZUFN2NkZuQTNKMjFyT0FvNzQ='
                        };
                        TMA.Twitter.setConsumer(params);
                    }
                    else
                    {
                        me.loadTwitterAccessToken();
                    }
                },function(error) {                    
                    me.loadTwitterAccessToken();
                }
            );
        } else {
            Personify.utils.Configuration.loadCountryAndState();
            me.initViews();
        }
    },

    initViews: function() {
        var me = this;
        if (Ext.os.is.Android) {
            document.addEventListener("backbutton", Ext.bind(onBackKeyDown, this), false);

            function onBackKeyDown(e) {
                e.preventDefault();
            }
        }

        var loadApp47CssFile = function() {
            if (me.getIsCssFileLoaded()) {
                if (Ext.os.is.Android) {
                    if (window.plugins.androidHelper) {
                        var success = function(result) {
                            var personifyCSSFile = result + '/resources/css/app47.css';
                            window.plugins.loadResources.load([personifyCSSFile], Ext.emptyFn, me);
                        };
                        window.plugins.androidHelper.getPersonifyDataPath(success, null);
                    }

                    //load css for android 4.0
                    var version = device.version;
                    var arrayVersion = version.split('.');

                    if (parseInt(arrayVersion[0] < 4) ||
                        (parseInt(arrayVersion[0]) == 4 && parseInt(arrayVersion[1]) == 0)) {
                        var android404CssFile = "resources/css/input.css";
                        window.plugins.loadResources.load([android404CssFile], Ext.emptyFn, me);
                    }
                } else if (Ext.os.is.iOS) {
                    var onFail = function(error) {
                        console.log('Request file system error: ' + error);
                    };

                    var onFileSystemSuccess = function (fileSystem) {
                        var personifyCSSFile = fileSystem.root.fullPath + '/resources/css/app47.css';

                        window.plugins.loadResources.load([personifyCSSFile], Ext.emptyFn, me);
                    };
                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFail);
                }
            } else {
                Ext.callback(loadApp47CssFile, me, [], 500);
            }
        };

        Ext.callback(loadApp47CssFile, me, [], 0);

        //cache event map image
        var mapData = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('mapData');
        var gotFS = function(fileSystem) {
            fileSystem.root.getDirectory("PersonifyCaches", {create: true}, function() {
                Personify.utils.PhoneGapHelper.downloadMapImage(mapData);
            });
        };

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, Ext.emptyFn);

        var storeManager = Personify.utils.ServiceManager.getStoreManager();

        Deft.Injector.configure({
            session: storeManager.getSessionStore(),
            mySessionStore: storeManager.getAgendaStore(),
            storeProfile: storeManager.getProfileStore(),
            ///storeExhibitor: storeManager.getExhibitorStore(),
                                
            exhibitorListStore: storeManager.getExhibitorListStore(),
                                
            shoppingCartStore: storeManager.getShoppingCartStore(),
            notificationStore: {
                value: Ext.create(storeManager.getNotificationStore())
            },
            mapStore: "Personify.store.base.Map",
            //countryListStore: storeManager.getCountryStore(),
            iCalendarStore: storeManager.getICalendarStore()/*,

            allProductStore: {
                value: Ext.create(storeManager.getProductListStore())
            }*/
        });

        var configurationChecking = function() {
            window.plugins.applicationPreferences.getString('configurationUpdated', function(value) {
                if (value == '1') {
                    Ext.Msg.alert('', 'The configuration of the app has been updated. Restart the app to see these changes.', Ext.emptyFn);
                } else {
                    Ext.callback(configurationChecking, me, [], 60 * 1000);
                }
            });
        };
        Ext.callback(configurationChecking, me, [], 5 * 1000);
    },
    loadTwitterAccessToken: function()
    {
        var me = this,
        params = {
           success: me.onAccessTokenGetTwitter,
           failure: me.onAccessTokenFailTwitter,
           scope: me
        },
        paramInit = {
            consumerKey:'6AqyEYuQnznxau9uYns17w',
            consumerSecret :'eRZZMxdC2gAx5PnMbtcetAqRYPSv6FnA3J21rOAo74',
            base64KeySecret:'NkFxeUVZdVFuem54YXU5dVluczE3dzplUlpaTXhkQzJnQXg1UG5NYnRjZXRBcVJZUFN2NkZuQTNKMjFyT0FvNzQ='
        };
        TMA.Twitter.init(paramInit);
        TMA.Twitter.apponlyauthorize(params);
    },
    onAccessTokenGetTwitter: function(oauthAccessToken, oauthTokenType, twitter) {
        console.log('Twitter Authorization Type: ' + oauthTokenType + 'and Authorization Token: ' +oauthAccessToken);
    },
    onAccessTokenFailTwitter: function(errorCode, errorMessage, twitter) {
        console.log('Twitter error: ' + errorCode + ' - ' + errorMessage);
    }
});
