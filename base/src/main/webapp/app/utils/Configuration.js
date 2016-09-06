Ext.define('Personify.utils.Configuration', {
    configuration: null,
    currentUser: null,
    username: null,
    password: null,
    urlCheckOut: null,
    profilePictureTimestamp: null,
    profileUrl: null,
    allowChangeView: null,
    discussionUrl: null,
    currentProfileUser: null,

    statics: {
        setConfiguration: function(store) {
            Personify.utils.Configuration.configuration = store;
        },

        getConfiguration: function() {
            return Personify.utils.Configuration.configuration;
        },

        reloadModules: function() {
            var views = Ext.ComponentQuery.query('#homeView');

            if (views.length) {
                views[0].getController().onLoadMenu();
            }
        },

        loadConfigurationFromApp47: function(callback) {
            var me = this;
            var configPersonify = Ext.create('Personify.store.personify.Personify');
            configPersonify.load(function() {
                Personify.utils.Configuration.setConfiguration(configPersonify);
                Deft.Injector.configure({
                    personify: {
                        value: configPersonify
                    }
                });

                if (window.plugins.applicationPreferences && window.plugins.app47) {
                    var delay = 0;
                    var configurationLoadRetry = function() {
                        delay++;

                        if (delay > 60) {
                            navigator.splashscreen.hide();
                            Ext.Msg.confirm('', 'We are experiencing a problem downloading your configuration. Do you want to retry?', function(confirmation) {
                                if (confirmation == 'yes') {
                                    navigator.splashscreen.show();
                                    delay = 0;
                                    Ext.callback(configurationLoad, me, [], 500);
                                } else {
                                    Ext.Msg.alert('', 'The app cannot start without configuration. Re-launch the app if you want to retry again.', Ext.emptyFn);
                                }
                            });
                        } else {
                            Ext.callback(configurationLoad, me, [], 500);
                        }
                    };
                    var configurationLoad = function() {
                        window.plugins.applicationPreferences.getString('configurationLoaded', function(value) {
                            if (value == '1') {
                                var configurations = {};
                                var moduleIndex = 0;
                                var moduleConfigurations = [
                                    'DefaultConfigurations',
                                    'DirectoryModule',
                                    'DiscussionsModule',
                                    'EventsModule',
                                    'HomeModule',
                                    'InfoModule',
                                    'NewsModule',
                                    'ProfileModule',
                                    'Stylesheet'
                                ];

                                var loadConfigurationCallback = function(configuration) {
                                    configurations[moduleConfigurations[moduleIndex]] = Ext.JSON.decode(configuration);
                                    moduleIndex++;

                                    if (moduleIndex < moduleConfigurations.length) {
                                        window.plugins.app47.getConfiguration(moduleConfigurations[moduleIndex], loadConfigurationCallback);
                                    } else {
                                        Personify.utils.Configuration.updateConfigurationFromApp47(configurations);
                                        Personify.utils.Configuration.loadWebServiceConfigurationFromApp47(callback);
                                    }
                                };

                                window.plugins.app47.getConfiguration(moduleConfigurations[moduleIndex], loadConfigurationCallback);
                            } else {
                                configurationLoadRetry();
                            }
                        }, function(error) {
                            configurationLoadRetry();
                        });
                    };
                    Ext.callback(configurationLoad, me, [], 0);
                } else {
                    if (callback) {
                        callback();
                    }
                }
            });
        },

        loadWebServiceConfigurationFromApp47: function(callback) {
            window.plugins.app47.getConfiguration('WebService', function(configuration) {
                configuration = Ext.JSON.decode(configuration);
                var wsManager = Personify.utils.wsmanager.WSManager;

                // common configurations
                if (configuration['protocol'])
                    wsManager.protocol = configuration['protocol'];

                if (configuration['server'])
                    wsManager.server = configuration['server'];

                if (configuration['path'])
                    wsManager.path = configuration['path'];

                var headers = wsManager.headers;

                if (configuration['content-type'])
                    headers['Content-Type'] = configuration['content-type'];

                if (configuration['authorization'])
                    headers['Authorization'] = configuration['authorization'];

                wsManager.headers = headers;

                var endpoints = wsManager.endpoints;

                // directory endpoints
                if (configuration['endpoint-directory-entries'])
                    endpoints['directoryEntries'] = configuration['endpoint-directory-entries'];

                if (configuration['endpoint-directory-employees'])
                    endpoints['directoryEmployees'] = configuration['endpoint-directory-employees'];

                if (configuration['endpoint-directory-staffs'])
                    endpoints['directoryStaffs'] = configuration['endpoint-directory-staffs'];

                // event endpoints
                if (configuration['endpoint-event-meetings'])
                    endpoints['eventMeetings'] = configuration['endpoint-event-meetings'];

                if (configuration['endpoint-event-registered'])
                    endpoints['eventRegistered'] = configuration['endpoint-event-registered'];

                if (configuration['endpoint-event-sessions'])
                    endpoints['eventSessions'] = configuration['endpoint-event-sessions'];

                if (configuration['endpoint-event-agenda'])
                    endpoints['eventAgenda'] = configuration['endpoint-event-agenda'];

                if (configuration['endpoint-event-session-details'])
                    endpoints['eventSessionDetails'] = configuration['endpoint-event-session-details'];

                if (configuration['endpoint-event-session-rating'])
                    endpoints['eventSessionRating'] = configuration['endpoint-event-session-rating'];

                /*if (configuration['endpoint-event-exhibitors'])
                    endpoints['eventExhibitors'] = configuration['endpoint-event-exhibitors'];*/
                                                  
                if (configuration['endpoint-event-exhibitors-list'])
                    endpoints['eventExhibitorsList'] = configuration['endpoint-event-exhibitors-list'];
                                                  
                if (configuration['endpoint-event-exhibitors-details'])
                    endpoints['eventExhibitorsDetails'] = configuration['endpoint-event-exhibitors-details'];
                                                  
                                                  

                if (configuration['endpoint-event-registrants'])
                    endpoints['eventRegistrants'] = configuration['endpoint-event-registrants'];

                if (configuration['endpoint-event-agenda-create'])
                    endpoints['eventGetEmptyMeetingAgenda'] = configuration['endpoint-event-agenda-create'];

                if (configuration['endpoint-event-agenda-save'])
                    endpoints['eventSaveMeetingAgenda'] = configuration['endpoint-event-agenda-save'];

                if (configuration['endpoint-event-agenda-get'])
                    endpoints['eventGetDeleteMeetingAgenda'] = configuration['endpoint-event-agenda-get'];

                if (configuration['endpoint-event-agenda-delete'])
                    endpoints['eventSaveDeleteMeetingAgenda'] = configuration['endpoint-event-agenda-delete'];

                // store endpoints
                if (configuration['endpoint-store-products'])
                    endpoints['storeProducts'] = configuration['endpoint-store-products'];

                if (configuration['endpoint-store-product-detail'])
                    endpoints['storeProductDetail'] = configuration['endpoint-store-product-detail'];

                if (configuration['endpoint-store-shoppingcart'])
                    endpoints['storeShoppingCart'] = configuration['endpoint-store-shoppingcart'];

                if (configuration['endpoint-store-shoppingcart-add'])
                    endpoints['storeShoppingCartAdd'] = configuration['endpoint-store-shoppingcart-add'];

                if (configuration['endpoint-store-shoppingcart-url'])
                    endpoints['storeShoppingCartUrl'] = configuration['endpoint-store-shoppingcart-url'];

                if (configuration['endpoint-store-order'])
                    endpoints['storeOrder'] = configuration['endpoint-store-order'];

                // profile endpoints
                if (configuration['endpoint-profile-get'])
                    endpoints['profileGet'] = configuration['endpoint-profile-get'];

                if (configuration['endpoint-profile-authentication-url'])
                    endpoints['profileAuthenticationUrl'] = configuration['endpoint-profile-authentication-url'];

                if (configuration['endpoint-profile-contacts'])
                    endpoints['profileContacts'] = configuration['endpoint-profile-contacts'];

                if (configuration['endpoint-profile-contact-detail'])
                    endpoints['profileContactDetails'] = configuration['endpoint-profile-contact-detail'];

                if (configuration['endpoint-profile-purchases'])
                    endpoints['profilePurchases'] = configuration['endpoint-profile-purchases'];

                if (configuration['endpoint-profile-participations'])
                    endpoints['profileParticipations'] = configuration['endpoint-profile-participations'];

                if (configuration['endpoint-profile-relationships'])
                    endpoints['profileRelationships'] = configuration['endpoint-profile-relationships'];

                if (configuration['endpoint-profile-biography'])
                    endpoints['customerBiography'] = configuration['endpoint-profile-biography'];

                if (configuration['endpoint-profile-update'])
                    endpoints['profileUpdate'] = configuration['endpoint-profile-update'];

                if (configuration['endpoint-profile-address-delete'])
                    endpoints['profileAddressDelete'] = configuration['endpoint-profile-address-delete'];

                if (configuration['endpoint-profile-contact-add'])
                    endpoints['profileContactAdd'] = configuration['endpoint-profile-contact-add'];

                if (configuration['endpoint-profile-communication-delete'])
                    endpoints['profileCommunicationDelete'] = configuration['endpoint-profile-communication-delete'];

                if (configuration['endpoint-profile-image-update'])
                    endpoints['profileImageUpdate'] = configuration['endpoint-profile-image-update'];

                // user endpoints
                if (configuration['endpoint-user-login'])
                    endpoints['userLogin'] = configuration['endpoint-user-login'];

                if (configuration['endpoint-user-notifications'])
                    endpoints['userNotifications'] = configuration['endpoint-user-notifications'];

                if (configuration['endpoint-user-preferences'])
                    endpoints['userPreferences'] = configuration['endpoint-user-preferences'];

                // utility endpoints
                if (configuration['endpoint-util-countries'])
                    endpoints['utilCountries'] = configuration['endpoint-util-countries'];

                if (configuration['endpoint-util-states'])
                    endpoints['utilStates'] = configuration['endpoint-util-states'];

                if (configuration['endpoint-util-fileupload'])
                    endpoints['utilFileUpload'] = configuration['endpoint-util-fileupload'];

                if (configuration['endpoint-util-call-type'])
                    endpoints['utilCallType'] = configuration['endpoint-util-call-type'];

                if (configuration['endpoint-util-call-topic'])
                    endpoints['utilCallTopic'] = configuration['endpoint-util-call-topic'];

                if (configuration['endpoint-util-call-subject'])
                    endpoints['utilCallSubject'] = configuration['endpoint-util-call-subject'];

                wsManager.endpoints = endpoints;

                if (callback) {
                    callback();
                }
            });
        },

        updateConfigurationFromApp47: function(configuration) {
            var personify = Personify.utils.Configuration.getConfiguration();

            if (personify.getCount() <= 0 || configuration == {}) {
                return;
            }

            personify = personify.first();

            if (configuration['InfoModule']) {
                if (configuration['InfoModule']['title'])
                    personify.AboutStore.set('title', configuration['InfoModule']['title']);

                if (configuration['InfoModule']['version'])
                    personify.AboutStore.set('version', configuration['InfoModule']['version']);

                if (configuration['InfoModule']['logo-url'])
                    personify.AboutStore.set('logoUrl', configuration['InfoModule']['logo-url']);

                if (configuration['InfoModule']['app-share-title'])
                    personify.AboutStore.set('appShareTitle', configuration['InfoModule']['app-share-title']);

                if (configuration['InfoModule']['app-share-text'])
                    personify.AboutStore.set('appShareText', configuration['InfoModule']['app-share-text']);

                if (Ext.os.is.Android) {
                    if (configuration['InfoModule']['app-url-android']) {
                        personify.AboutStore.set('appUrl', configuration['InfoModule']['app-url-android']);
                    }
                } else if (Ext.os.is.iOS) {
                    if (configuration['InfoModule']['app-url-ios']) {
                        personify.AboutStore.set('appUrl', configuration['InfoModule']['app-url-ios']);
                    }
                }

                if (configuration['InfoModule']['description-title'])
                    personify.AboutStore.set('descriptionTitle', configuration['InfoModule']['description-title']);

                if (configuration['InfoModule']['description-text'])
                    personify.AboutStore.set('description', configuration['InfoModule']['description-text']);

                if (configuration['InfoModule']['contact-phone-title'])
                    personify.AboutStore.set('importantNumbersTitle', configuration['InfoModule']['contact-phone-title']);

                if (configuration['InfoModule']['contact-phone-url']) {
                    var success = function(value) {
                        personify.AboutStore.NumbersStore.setConfig({
                            data: value,
                            proxy: {
                                type: 'memory',
                                reader: 'json'
                            }
                        });
                        //personify.AboutStore.NumbersStore.load();
                    };
                    var fail = function(error) {
                        personify.AboutStore.NumbersStore.setProxy({
                            url: 'data/contact_phones.json',
                            type: 'rest',
                            reader: 'json'
                        });
                        personify.AboutStore.NumbersStore.load();
                    };
                    if (window.plugins.app47) {
                        window.plugins.app47.getFileValue('InfoModule', 'contact-phone-url', success, fail);
                    } else {
                        fail(null);
                    }
                }

                if (configuration['InfoModule']['contact-address-title'])
                    personify.AboutStore.set('addressesTitle', configuration['InfoModule']['contact-address-title']);

                if (configuration['InfoModule']['contact-address-url']) {
                    var success = function(value) {
                        personify.AboutStore.AddressesStore.setConfig({
                            data: value,
                            proxy: {
                                type: 'memory',
                                reader: 'json'
                            }
                        });
                        //personify.AboutStore.AddressesStore.load();
                    };
                    var fail = function(error) {
                        personify.AboutStore.AddressesStore.setProxy({
                            url: 'data/contact_addresses.json',
                            type: 'rest',
                            reader: 'json'
                        });
                        personify.AboutStore.AddressesStore.load();
                    };
                    if (window.plugins.app47) {
                        window.plugins.app47.getFileValue('InfoModule', 'contact-address-url', success, fail);
                    } else {
                        fail(null);
                    }
                }

                if (configuration['InfoModule']['contact-website-title'])
                    personify.AboutStore.set('websitesTitle', configuration['InfoModule']['contact-website-title']);

                if (configuration['InfoModule']['contact-website-url']) {
                    var success = function(value) {
                        personify.AboutStore.WebsiteStore.setConfig({
                            data: value,
                            proxy: {
                                type: 'memory',
                                reader: 'json'
                            }
                        });
                        //personify.AboutStore.WebsiteStore.load();
                    };
                    var fail = function(error) {
                        personify.AboutStore.WebsiteStore.setProxy({
                            url: 'data/contact_websites.json',
                            type: 'rest',
                            reader: 'json'
                        });
                        personify.AboutStore.WebsiteStore.load();
                    };
                    if (window.plugins.app47) {
                        window.plugins.app47.getFileValue('InfoModule', 'contact-website-url', success, fail);
                    } else {
                        fail(null);
                    }
                }

                if (configuration['InfoModule']['contact-email-title'])
                    personify.AboutStore.set('emailTitle', configuration['InfoModule']['contact-email-title']);

                if (configuration['InfoModule']['contact-email-url']) {
                    var success = function(value) {
                        personify.AboutStore.EmailStore.setConfig({
                            data: value,
                            proxy: {
                                type: 'memory',
                                reader: 'json'
                            }
                        });
                        //personify.AboutStore.EmailStore.load();
                    };
                    var fail = function(error) {
                        personify.AboutStore.EmailStore.setProxy({
                            url: 'data/contact_emails.json',
                            type: 'rest',
                            reader: 'json'
                        });
                        personify.AboutStore.EmailStore.load();
                    };
                    if (window.plugins.app47) {
                        window.plugins.app47.getFileValue('InfoModule', 'contact-email-url', success, fail);
                    } else {
                        fail(null);
                    }
                }

                if (configuration['InfoModule']['enable-configsettings']) {
                    var enableConfigsettings = configuration['InfoModule']['enable-configsettings'];
                    var enable = (enableConfigsettings.toUpperCase() == 'YES') ? true : false;
                    personify.AboutStore.set('enableConfigSettings', enable);
                }
            }

            if (configuration['NewsModule']) {
                if (configuration['NewsModule']['twitter-tag'])
                    personify.NewsStore.set('twitterHashtag', configuration['NewsModule']['twitter-tag']);

                if (configuration['NewsModule']['twitter-refresh-interval'])
                    personify.NewsStore.set('refreshInterval', configuration['NewsModule']['twitter-refresh-interval']);

                if (configuration['NewsModule']['feeds-url']) {
                    var success = function(value) {
           
           var data = Ext.JSON.decode(value);
                        personify.NewsStore.FeedsStore.setConfig({
                            data: data,
                            proxy: {
                                type: 'memory',
                                reader: {
                                    type: 'json'
                                }
                            }
                        });
           
                    };
                    var fail = function(error) {
                        personify.NewsStore.FeedsStore.setProxy({
                            url: 'data/news_feeds.json',
                            type: 'rest',
                            reader: 'json'
                        });
                        personify.NewsStore.FeedsStore.load();
                    };
                    if (window.plugins.app47) {
                        window.plugins.app47.getFileValue('NewsModule', 'feeds-url', success, fail);
                    } else {
                        fail(null);
                    }
                }
            }

            if (configuration['DirectoryModule']) {
                if (configuration['DirectoryModule']['itemperpage'])
                    personify.DirectoryStore.set('itemPerPage', configuration['DirectoryModule']['itemperpage']);

                if (configuration['DirectoryModule']['defaultsearchterm'])
                    var searchTerm = configuration['DirectoryModule']['defaultsearchterm'];
                    if (searchTerm === "null") {
                        searchTerm = "";
                    }
                    personify.DirectoryStore.set('defaultSearchTerm', searchTerm);

                if (configuration['DirectoryModule']['listinfo-profile']) {
                    var profileInfoList = [];
                    Ext.Array.each(configuration['DirectoryModule']['listinfo-profile'].split(','), function(info) {
                        profileInfoList.push(info.trim());
                    });
                    personify.DirectoryStore.set('listInfo', profileInfoList);
                }

                if (configuration['DirectoryModule']['listinfo-presenter']) {
                    var presenterInfoList = [];
                    Ext.Array.each(configuration['DirectoryModule']['listinfo-presenter'].split(','), function(info) {
                        presenterInfoList.push(info.trim());
                    });
                    personify.DirectoryStore.set('listinfoPresenter', presenterInfoList);
                }

                if (configuration['DirectoryModule']['listinfo-attendee']) {
                    var attendeeInfoList = [];
                    Ext.Array.each(configuration['DirectoryModule']['listinfo-attendee'].split(','), function(info) {
                        attendeeInfoList.push(info.trim());
                    });
                    personify.DirectoryStore.set('listinfoAttendee', attendeeInfoList);
                }

                if (configuration['DirectoryModule']['name-fields-url']) {
                    if (configuration['DirectoryModule']['name-fields-url']) {
                        var success = function(value) {
                            personify.DirectoryStore.PhotoAndRelatedEditStore.setConfig({
                                data: value,
                                proxy: {
                                    type: 'memory',
                                    reader: 'json'
                                }
                            });
                            //personify.DirectoryStore.PhotoAndRelatedEditStore.load();
                        };
                        var fail = function(error) {
                            personify.DirectoryStore.PhotoAndRelatedEditStore.setProxy({
                                url: 'data/directory_name_fields.json',
                                type: 'rest',
                                reader: 'json'
                            });
                            personify.DirectoryStore.PhotoAndRelatedEditStore.load();
                        };
                        if (window.plugins.app47) {
                            window.plugins.app47.getFileValue('DirectoryModule', 'name-fields-url', success, fail);
                        } else {
                            fail(null);
                        }
                    }
                }

                if (configuration['DirectoryModule']['title-fields-url']) {
                    if (configuration['DirectoryModule']['title-fields-url']) {
                        var success = function(value) {
                            personify.DirectoryStore.JobTitleEditStore.setConfig({
                                data: value,
                                proxy: {
                                    type: 'memory',
                                    reader: 'json'
                                }
                            });
                            //personify.DirectoryStore.JobTitleEditStore.load();
                        };
                        var fail = function(error) {
                            personify.DirectoryStore.JobTitleEditStore.setProxy({
                                url: 'data/directory_title_fields.json',
                                type: 'rest',
                                reader: 'json'
                            });
                            personify.DirectoryStore.JobTitleEditStore.load();
                        };
                        if (window.plugins.app47) {
                            window.plugins.app47.getFileValue('DirectoryModule', 'title-fields-url', success, fail);
                        } else {
                            fail(null);
                        }
                    }
                }

                if (configuration['DirectoryModule']['enable-addtoaddressbook'])
                    personify.DirectoryStore.set('useAddToMyAddressBookButton', configuration['DirectoryModule']['enable-addtoaddressbook']);

                if (configuration['DirectoryModule']['minsearchcharacters'])
                    personify.DirectoryStore.set('minSearchCharacters', configuration['DirectoryModule']['minsearchcharacters']);
            }

            if (configuration['DefaultConfigurations']) {
                if (configuration['DefaultConfigurations']['currency'])
                    personify.ConfigStore.set('currency', configuration['DefaultConfigurations']['currency']);

                if (configuration['DefaultConfigurations']['currency-symbol'])
                    personify.ConfigStore.set('currencySymbol', configuration['DefaultConfigurations']['currency-symbol']);

                if (configuration['DefaultConfigurations']['itemperpage'])
                    personify.ConfigStore.set('itemPerPage', configuration['DefaultConfigurations']['itemperpage']);

                if (configuration['DefaultConfigurations']['UrbanAirship-Dev-Key'])
                    personify.ConfigStore.set('UrbanAirship-Dev-Key', configuration['DefaultConfigurations']['UrbanAirship-Dev-Key']);
                if (configuration['DefaultConfigurations']['UrbanAirship-Dev-Secret'])
                    personify.ConfigStore.set('UrbanAirship-Dev-Secret', configuration['DefaultConfigurations']['UrbanAirship-Dev-Secret']);
                if (configuration['DefaultConfigurations']['UrbanAirship-Prod-Key'])
                    personify.ConfigStore.set('UrbanAirship-Prod-Key', configuration['DefaultConfigurations']['UrbanAirship-Prod-Key']);
                if (configuration['DefaultConfigurations']['UrbanAirship-Prod-Secret'])
                    personify.ConfigStore.set('UrbanAirship-Prod-Secret', configuration['DefaultConfigurations']['UrbanAirship-Prod-Secret']);
                if (configuration['DefaultConfigurations']['UrbanAirship-UseProduction'])
                    personify.ConfigStore.set('UrbanAirship-UseProduction', configuration['DefaultConfigurations']['UrbanAirship-UseProduction']);

                if (configuration['DefaultConfigurations']['orgid'])
                    personify.ConfigStore.DefaultListingParamsStore.first().set('orgId', configuration['DefaultConfigurations']['orgid']);

                if (configuration['DefaultConfigurations']['orgunitid'])
                    personify.ConfigStore.DefaultListingParamsStore.first().set('orgUnitId', configuration['DefaultConfigurations']['orgunitid']);
           
                if (configuration['DefaultConfigurations']['store-itemperpage'])
                    personify.ConfigStore.set('itemsPerPageProductList', configuration['DefaultConfigurations']['store-itemperpage']);
                    
                if (configuration['DefaultConfigurations']['Date-Display-Format'])
                {
                    personify.ConfigStore.set('DateDisplayFormat', configuration['DefaultConfigurations']['Date-Display-Format']);
                }
                else
                {
                    personify.ConfigStore.set('DateDisplayFormat',"m/d/Y");
                }
                      
                if (configuration['DefaultConfigurations']['WS-Timeout-Interval'])
                {
                    personify.ConfigStore.set('ServiceRequestTimeout', configuration['DefaultConfigurations']['WS-Timeout-Interval']);
                }
                else
                {
                    personify.ConfigStore.set('ServiceRequestTimeout',"30000");
                }
           
           
                if (configuration['DefaultConfigurations']['WS-Timeout-Message'])
                {
                    personify.ConfigStore.set('ServiceRequestTimeoutMessage', configuration['DefaultConfigurations']['WS-Timeout-Message']);
                }
                else
                {
                    personify.ConfigStore.set('ServiceRequestTimeoutMessage',"Oops! Please check the network connectivity of your device.");
                }
           
                if (configuration['DefaultConfigurations']['WS-Timeout-MessageTitle'])
                {
                    personify.ConfigStore.set('ServiceRequestTimeoutMsgTitle', configuration['DefaultConfigurations']['WS-Timeout-MessageTitle']);
                }
                else
                {
                    personify.ConfigStore.set('ServiceRequestTimeoutMsgTitle', "Network Connectivity Issue");
                }
           
                if (configuration['DefaultConfigurations']['WS-HighLatency-Timeout-Interval'])
                {
                    personify.ConfigStore.set('HighLatencyServiceRequestTimeout', configuration['DefaultConfigurations']['WS-HighLatency-Timeout-Interval']);
                }
                else
                {
                    personify.ConfigStore.set('HighLatencyServiceRequestTimeout', "60000");
                }
           
                if (configuration['DefaultConfigurations']['WS-Timeout-WIFIMessage'])
                {
                    personify.ConfigStore.set('WIFIServiceRequestTimeoutMessage', configuration['DefaultConfigurations']['WS-Timeout-WIFIMessage']);
                }
                else
                {
                    personify.ConfigStore.set('WIFIServiceRequestTimeoutMessage',"Oops! Please check the WIFI connectivity of your device.");
                }
           
                if (configuration['DefaultConfigurations']['WS-HighLatency-Endpoints'])
                {
                    personify.ConfigStore.set('HighLatencyServiceEndpoints', configuration['DefaultConfigurations']['WS-HighLatency-Endpoints']);
                }
                else
                {
                    personify.ConfigStore.set('HighLatencyServiceEndpoints', "MobileGetMeetingListing1,MobileGetMeetingSessionList1,MobileGetMeetingAgenda,MobileGetSessionDetail,MobileGetExhibitorData1,MobileSearchMeetingRegistrants,MobileGetExhibitorListing,MobileGetExhibitorDetail");
                }
           
            }

            if (configuration['DiscussionsModule']) {
                if (configuration['DiscussionsModule']['site-url'])
                    personify.DiscussionStore.set('url', configuration['DiscussionsModule']['site-url']);

                if (configuration['DiscussionsModule']['vendor-id'])
                    personify.DiscussionStore.set('vendorId', configuration['DiscussionsModule']['vendor-id']);

                if (configuration['DiscussionsModule']['vendor-username'])
                    personify.DiscussionStore.set('vendorUsername', configuration['DiscussionsModule']['vendor-username']);

                if (configuration['DiscussionsModule']['vendor-password'])
                    personify.DiscussionStore.set('vendorPassword', configuration['DiscussionsModule']['vendor-password']);

                if (configuration['DiscussionsModule']['vendor-block'])
                    personify.DiscussionStore.set('vendorBlock', configuration['DiscussionsModule']['vendor-block']);
            }

            if (configuration['EventsModule']) {
                if (configuration['EventsModule']['types-url']) {
                    var success = function(value) {
                        var eventTypes = Ext.JSON.decode(value);
                        personify.EventsStore.set('types', eventTypes);
                    };
                    var fail = function(error) {
                        Ext.Ajax.request({
                            url: 'data/events_types.json',
                            method: 'GET',

                            callback: function(options, success, response) {
                                var eventTypes = Ext.JSON.decode(response.responseText);
                                personify.EventsStore.set('types', eventTypes);
                            }
                        });
                    };
                    if (window.plugins.app47) {
                        window.plugins.app47.getFileValue('EventsModule', 'types-url', success, fail);
                    } else {
                        fail(null);
                    }
                }

                if (configuration['EventsModule']['maps-url']) {
                    var success = function(value) {
                        var mapData = Ext.JSON.decode(value);
                        personify.EventsStore.set('mapData', mapData);
                    };
                    var fail = function(error) {
                        Ext.Ajax.request({
                            url: 'data/events_maps.json',
                            success: function(response) {
                                var mapData = Ext.JSON.decode(response.responseText);
                                personify.EventsStore.set('mapData', mapData);
                            }
                        });
                    };
                    if (window.plugins.app47) {
                        window.plugins.app47.getFileValue('EventsModule', 'maps-url', success, fail);
                    } else {
                        fail(null);
                    }
                }

                if (configuration['EventsModule']['conference-image-width'])
                    personify.EventsStore.set('conferenceImageWidth', configuration['EventsModule']['conference-image-width']);

                if (configuration['EventsModule']['conference-image-height'])
                    personify.EventsStore.set('conferenceImageHeight', configuration['EventsModule']['conference-image-height']);

                if (configuration['EventsModule']['rate-title-bar'])
                    personify.EventsStore.set('rateTitleBar', configuration['EventsModule']['rate-title-bar']);

                if (configuration['EventsModule']['featured-events-rotation-interval'])
                    personify.EventsStore.set('featuredEventsRotation', configuration['EventsModule']['featured-events-rotation-interval']);

                if (configuration['EventsModule']['featured-events-url']) {
                    var success = function(value) {
                        var featuredEvents = Ext.JSON.decode(value);
                        personify.EventsStore.set('featuredEvents', featuredEvents);
                    };

                    var fail = function(error) {
                        Ext.Ajax.request({
                            url: 'data/events_featured.json',
                            success: function(response) {
                                var featuredEvents = Ext.JSON.decode(response.responseText);
                                personify.EventsStore.set('featuredEvents', featuredEvents);
                            }
                        });
                    };
                    if (window.plugins.app47) {
                        window.plugins.app47.getFileValue('EventsModule', 'featured-events-url', success, fail);
                    } else {
                        fail(null);
                    }
                }

                if (configuration['EventsModule']['sponsor-rotation-interval'])
                    personify.EventsStore.set('sponsorRotation', configuration['EventsModule']['sponsor-rotation-interval']);

                if (configuration['EventsModule']['sponsor-events-url']) {
                    var success = function(value) {
                        var sponsorEventsData = Ext.JSON.decode(value);
                        personify.EventsStore.set('sponsorEvents', sponsorEventsData);
                    };

                    var fail = function(error) {
                        Ext.Ajax.request({
                            url: 'data/events_sponsor.json',
                            success: function(response) {
                                var sponsorEventsData = Ext.JSON.decode(response.responseText);
                                personify.EventsStore.set('sponsorEvents', sponsorEventsData);
                            }
                        });
                    };
                    if (window.plugins.app47) {
                        window.plugins.app47.getFileValue('EventsModule', 'sponsor-events-url', success, fail);
                    } else {
                        fail(null);
                    }
                }

                if (configuration['EventsModule']['mobile-registration']) {
                    var mobileRegistration = false;
                    if (configuration['EventsModule']['mobile-registration'].toLowerCase() == 'yes') {
                        mobileRegistration = true;
                    } else {
                        mobileRegistration = false;
                    }
                    personify.EventsStore.set('mobileRegistration', mobileRegistration);
                }
           
           if (configuration['EventsModule']['sessions-listing-itemperpage'])
                personify.EventsStore.set('itemsPerPageSession', configuration['EventsModule']['sessions-listing-itemperpage']);
           
                    if (configuration['EventsModule']['events-listing-itemperpage'])
                        personify.EventsStore.set('itemsPerPageEventList', configuration['EventsModule']['events-listing-itemperpage']);
           
                    if (configuration['EventsModule']['attendees-listing-itemperpage'])
                        personify.EventsStore.set('itemsPerPageAttendeeList', configuration['EventsModule']['attendees-listing-itemperpage']);
           
                    if (configuration['EventsModule']['presenters-listing-itemperpage'])
                        personify.EventsStore.set('itemsPerPagePresentersList', configuration['EventsModule']['presenters-listing-itemperpage']);
           
                    if (configuration['EventsModule']['materials-listing-itemperpage'])
                        personify.EventsStore.set('itemsPerPageMaterialsList', configuration['EventsModule']['materials-listing-itemperpage']);
           
                    if (configuration['EventsModule']['exhibitors-listing-itemperpage'])
                    personify.EventsStore.set('itemsPerPageExhibitorsList', configuration['EventsModule']['exhibitors-listing-itemperpage']);
           
            }

            if (configuration['ProfileModule']) {
                if (configuration['ProfileModule']['forgot-password-url'])
                    personify.ProfileStore.set('forgotPasswordUrl', configuration['ProfileModule']['forgot-password-url']);

                if (configuration['ProfileModule']['country-list-version']) {
                    var countryListVersion = configuration['ProfileModule']['country-list-version'];
                    personify.ProfileStore.set('countryListVersion', countryListVersion);

                    Personify.utils.Configuration.loadCountryAndState().then({
                        success: function() {
                            window.plugins.applicationPreferences.set('countryListVersion', countryListVersion, function() {
                            });
                        },
                        failure: function() {
                            window.plugins.applicationPreferences.set('countryListVersion', 0, function() {
                            });
                        }
                    });
                }
            }

            if (configuration['HomeModule']) {
                if (configuration['HomeModule']['notification-refresh-interval'])
                    personify.HomeStore.set('notificationRefreshInterval', configuration['HomeModule']['notification-refresh-interval']);
            }

            if (configuration['Stylesheet']) {
                if (configuration['Stylesheet']['stylesheet-url']) {
                    var success = function(value) {
                    };
                    var fail = function(error) {
                    };
                    if (window.plugins.app47) {
                        window.plugins.app47.getFileValue('Stylesheet', 'stylesheet-url', success, fail);
                    } else {
                        fail(null);
                    }
                }
            }
        },

        setCurrentUser: function(user) {
            Personify.utils.Configuration.currentUser = user;
        },

        getCurrentUser: function() {
            if (Personify.utils.Configuration.currentUser == null) {
                var user = Ext.create('Personify.model.base.User');
                Personify.utils.Configuration.currentUser = user;
            }
            return Personify.utils.Configuration.currentUser;
        },
           
       setCurrentProfileUser: function(user) {
           Personify.utils.Configuration.currentProfileUser = user;
       },
       
       getCurrentProfileUser: function() {
           return Personify.utils.Configuration.currentProfileUser;
       },

        setUserNameAndPassword: function(username, password) {
            Personify.utils.Configuration.username = username;
            Personify.utils.Configuration.password = password;
        },

        getUserName: function() {
            return Personify.utils.Configuration.username;
        },

        setUserName: function(username) {
            Personify.utils.Configuration.username = username;
        },

        getPassword: function() {
            return Personify.utils.Configuration.password;
        },

        setPassword: function(password) {
            Personify.utils.Configuration.password = password;
        },

        setUrlCheckOut: function(url) {
            Personify.utils.Configuration.urlCheckOut = url;
        },

        getUrlCheckOut: function() {
            return Personify.utils.Configuration.urlCheckOut;
        },

        getAllowChangeView: function() {
            return Personify.utils.Configuration.allowChangeView;
        },

        setAllowChangeView: function(allow) {
            Personify.utils.Configuration.allowChangeView = allow;
        },

        getDiscussionUrl: function() {
            return Personify.utils.Configuration.discussionUrl;
        },

        setDiscussionUrl: function(url) {
            Personify.utils.Configuration.discussionUrl = url;
        },

        loadCountryList: function() {
            var deferred = Ext.create('Deft.promise.Deferred');
            var cacheData = false;
            var fileName = 'country_list.json';
            var filePath = null;

            var onFail = function(error) {
                //load Country list from WS
                var proxy = {
                    type: 'rest',
                    url: Personify.utils.ServiceManager.getUrlWS('utilCountries'),
                    headers: Personify.utils.ServiceManager.getHeaders(),
                    reader: {
                        implicitIncludes: true,
                        type: 'json',
                        rootProperty: 'd'
                    }
                };
                cacheData = true;

                loadCountryStore(proxy);
            };

            var updateCountryStore = function(filePath) {
                window.plugins.applicationPreferences.get('countryListVersion', function(value) {
                    var countryListVersion = Personify.utils.Configuration.getConfiguration().getAt(0).ProfileStore.get('countryListVersion');
                    var proxy = null;
                    if (value == countryListVersion) {
                        proxy = {
                            type: 'rest',
                            url: filePath,
                            reader: {
                                implicitIncludes: true,
                                type: 'json',
                                rootProperty: 'd'
                            }
                        };
                    } else {
                        proxy = {
                            type: 'rest',
                            url: Personify.utils.ServiceManager.getUrlWS('utilCountries'),
                            headers: Personify.utils.ServiceManager.getHeaders(),
                            reader: {
                                implicitIncludes: true,
                                type: 'json',
                                rootProperty: 'd'
                            }
                        };
                        cacheData = true;
                    }
                    loadCountryStore(proxy);
                }, onFail);
            };

            var loadCountryStore = function(proxy) {
                var storeManager = Personify.utils.ServiceManager.getStoreManager();
                var countryStoreName = storeManager.getCountryStore();
                var countryStore = Ext.create(countryStoreName);
                var countryList = new Array();
                countryStore.setProxy(proxy);

                countryStore.load({callback: function(records, operation, success) {
                    if (success) {
                        var profileTypeStore = storeManager.getProfileTypeStore();
                        var storeProfileType = Ext.create(profileTypeStore);

                        for (var i = 0; i < records.length; i++) {
                            var country = records[i];
                            if ((country.get('countryCode') !== 'ALL') && (country.get('countryCode') !== '[ALL]')) {
                                countryList.push({text: country.get('countryDescription'), value: country.get('countryCode')});
                            }
                        }
                        storeProfileType.setData(countryList);
                        storeProfileType.sort('text', 'ASC');

                        if (cacheData) {
                            if (Ext.os.is.Android) {
                                var data = {
                                    filePath: filePath,
                                    content: operation.getResponse().responseText
                                };
                                window.plugins.androidHelper.writeInternalStorageFile(data);
                            } else if (Ext.os.is.iOS) {
                                Personify.utils.PhoneGapHelper.writeFile(fileName, operation.getResponse().responseText);
                            }
                        }

                        deferred.resolve(storeProfileType);
                    } else {
                        deferred.reject();
                    }

                    Deft.Injector.configure({
                        countryListStore: {
                            value: storeProfileType
                        }
                    });
                }});
            };

            if (Ext.os.is.Android) {
                if (window.plugins.androidHelper) {
                    var success = function(result) {
                        //load country list from local
                        filePath = result + '/' + fileName;
                        updateCountryStore(filePath);
                    };
                    window.plugins.androidHelper.getPersonifyDataPath(success, null);
                }
            } else if (Ext.os.is.iOS) {
                var onFileSystemSuccess = function (fileSystem) {
                    //load country list from local
                    filePath = fileSystem.root.fullPath + '/' + fileName;

                    updateCountryStore(filePath);
                };

                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFail);
            } else {
                onFail();
            }

            return deferred.promise;
        },

        loadUSStates: function() {
            var deferred = Ext.create('Deft.promise.Deferred');
            var cacheData = false;
            var fileName = 'state_list.json';
            var filePath = null;

            var onFail = function(error) {
                //load state list from WS
                var proxy = {
                    type : 'rest',
                    url: Personify.utils.ServiceManager.getUrlWS('utilStates') + "?%24format=json&%24filter=CountryCodeString%20eq('USA')",

                    headers: Personify.utils.ServiceManager.getHeaders(),

                    reader: {
                        implicitIncludes: true,
                        type: 'json',
                        rootProperty: 'd'
                    }
                };
                cacheData = true;

                loadStateStore(proxy);
            };

            var updateStateStore = function(filePath) {
                window.plugins.applicationPreferences.get('countryListVersion', function(value) {
                    var countryListVersion = Personify.utils.Configuration.getConfiguration().getAt(0).ProfileStore.get('countryListVersion');
                    var proxy = null;
                    if (value == countryListVersion) {
                        proxy = {
                            type: 'rest',
                            url: filePath,
                            reader: {
                                implicitIncludes: true,
                                type: 'json',
                                rootProperty: 'd'
                            }
                        };
                    } else {
                        proxy = {
                            type : 'rest',
                            url: Personify.utils.ServiceManager.getUrlWS('utilStates') + "?%24format=json&%24filter=CountryCodeString%20eq('USA')",

                            headers: Personify.utils.ServiceManager.getHeaders(),

                            reader: {
                                implicitIncludes: true,
                                type: 'json',
                                rootProperty: 'd'
                            }
                        };
                        cacheData = true;
                    }
                    loadStateStore(proxy);
                }, onFail);
            };

            var loadStateStore = function(proxy) {
                var storeManager = Personify.utils.ServiceManager.getStoreManager(),
                    stateStoreName = storeManager.getStateStore(),
                    stateStore = Ext.create(stateStoreName);
                stateStore.setProxy(proxy);

                stateStore.load({callback: function(records, operation, success) {
                    if (success) {
                        if (cacheData) {
                            if (Ext.os.is.Android) {
                                var data = {
                                    filePath: filePath,
                                    content: operation.getResponse().responseText
                                };
                                window.plugins.androidHelper.writeInternalStorageFile(data);
                            } else if (Ext.os.is.iOS) {
                                Personify.utils.PhoneGapHelper.writeFile(fileName, operation.getResponse().responseText);
                            }
                        }

                        deferred.resolve(stateStore);
                    } else {
                        deferred.reject();
                    }

                    Deft.Injector.configure({
                        usStateStore: {
                            value: stateStore
                        }
                    });
                }});
            };

            if (Ext.os.is.Android) {
                if (window.plugins.androidHelper) {
                    var success = function(result) {
                        //load state list from local
                        filePath = result + '/' + fileName;
                        updateStateStore(filePath);
                    };
                    window.plugins.androidHelper.getPersonifyDataPath(success, null);
                }
            } else if (Ext.os.is.iOS) {
                var onFileSystemSuccess = function (fileSystem) {
                    //load state list from local
                    filePath = fileSystem.root.fullPath + '/' + fileName;
                    updateStateStore(filePath);
                };

                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFail);
            } else {
                onFail();
            }

            return deferred.promise;
        },

        loadCountryAndState: function() {
            return Deft.Promise.all([Personify.utils.Configuration.loadCountryList(), Personify.utils.Configuration.loadUSStates()]);
        }
    }
});
