/**
 * @class Twitter Class
 * @author Huy Kieu
 */
Ext.define("Social.lib.Twitter", {
    singleton: true,
    alternateClassName:'TMA.Twitter',
    config: {
        /**
         * Consumer key and Consumer secret
         * @private
         * @string
         */
        consumerKey: null,
        consumerSecret: null,
        base64KeySecret: null,

        /**
         *  Access Token and Access Token Secret of user
         * @string
         */
        accessToken: '',
        accessTokenSecret: '',
        appOnlyAccessToken: '',
        appOnlyAccessTokenType: '',
        /**
         * The parameters to Authorize a request
         *
         */
        oauthVersion: "1.0",
        oauthSignatureMethod: 'HMAC-SHA1',
        xauthMode: 'client_auth',
        grantType: 'client_credentials',

        /**
         * Error Callback and success Callback
         *
         */
        errorCallback: null,
        successCallBack: null,

        /**
         *
         * URL to request
         */
        urls: {
            authorize: 'https://api.twitter.com/oauth/access_token',
            tweet: 'https://api.twitter.com/1.1/statuses/update.json',
            userTimeline: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
            favoriteTweet:'https://api.twitter.com/1.1/favorites/create.json',
            retweet:'https://api.twitter.com/1.1/statuses/retweet',
            userInfo: 'https://api.twitter.com/1.1/account/verify_credentials.json',
            search: 'https://api.twitter.com/1.1/search/tweets.json',
           apponlyauthorize: 'https://api.twitter.com/oauth2/token'
        },

        /**
         * some error can get after request
         */
        errors: {
            invalidCredential: {
                code: 99,
                message: 'Unable to verify your credentials'
            },
            invalidConsumerInfo: {
                code: 100,
                message: 'consumer key and secret is required'
            },
            notAuthorized: {
                code: 101,
                message: 'access token and secret is required'
            },
            tweetTooLong: {
                code: 102,
                message: 'tweet text too long'
            },
            statusDuplicate: {
                code: 103,
                message: 'Status is a duplicate'
            },
            wrongVal: {
                code: 104,
                message: 'Invalid user name or password'
            },
            authorizeError: {
                code: 401,
                message: 'Failed to authorization'
            },
            unknown: {
                code: 900,
                message: 'Unknown error'
            }
        },

        /**
         * type request twitter
         * @type String
         */
        typeRequest: 'authorize',//authorize,tweet or userTimeline

        /**
         * Number of record expect get from timeline
         * @type Number
         */
        count: 20,
        page: 1,

        userModel:null,
        user:null,
        scope: null
    },

    constructor : function(config) {
        var me = this;
        me.initConfig(config);
        delete(config);
        return me;
    },

    /**
     * init Twitter
     * @param {} params
     * @param {} params.consumerKey
     * @param {} params.consumerSecret
     * @param {} params.userModel
     */
    init: function(params) {
        var me = this;

        if(params.hasOwnProperty('consumerKey'))
            me.setConsumerKey(params.consumerKey)

        if(params.hasOwnProperty('consumerSecret'))
            me.setConsumerSecret(params.consumerSecret)

        if(params.hasOwnProperty('userModel'))
            me.setUserModel(params.userModel)
           
        if(params.hasOwnProperty('base64KeySecret'))
           me.setBase64KeySecret(params.base64KeySecret)
    },
    /**
     * Get authorization from user
     * @param {Object} params
     * @param {String} params.username Username of User to login twitter
     * @param {String} params.password Password of user to login twitter
     * @param {Function} params.success Function callback when authorize success
     * @param {Function} params.failure Function callback when authorize failure
     * @param {String} params.consumerKey OPTION
     * @param {String} params.consumerSecret OPTION
     * @param {Object} params.errorMessages OPTION
     * @param {Object} params.scope OPTION
     */
    authorize : function(params) {
        var me = this,
        error = function(){},
        success = function(){},
        scope = params.scope || {};

        me.setTypeRequest('authorize');

        me.setConsumer(params);

        var accessor = {
            consumerSecret :me.getConsumerSecret(),
            tokenSecret : ""
        };

        var message = {
            method : "POST",
            action : me.getUrls().authorize,
            parameters : {
                oauth_consumer_key : me.getConsumerKey(),
                oauth_signature_method : me.getOauthSignatureMethod(),
                oauth_version : me.getOauthVersion(),
                x_auth_username : params.userName,
                x_auth_password : params.password,
                x_auth_mode : me.getXauthMode()
            }
        };
        if(params.hasOwnProperty('failure') && typeof params.failure =='function')
            error = params.failure;

        if(params.hasOwnProperty('success') && typeof params.success =='function')
            success = params.success;

        var successCallback = function(token, secret, twitter) {
            me.onAuthorizeSuccess(token, secret,success, scope);
        };
        var errorCallback = function(errorCode, errorMessage, twitter) {
            me.onAuthorizeError(errorCode, errorMessage,error, scope);
        };


        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, accessor);

        var authorizationHeader = 'OAuth oauth_nonce="'+ message.parameters.oauth_nonce + '"'+ ', oauth_signature_method="'
                                  + message.parameters.oauth_signature_method + '"'
                                  + ', oauth_timestamp="'
                                  + message.parameters.oauth_timestamp + '"'
                                  + ', oauth_consumer_key="'
                                  + message.parameters.oauth_consumer_key + '"'
                                  + ', oauth_signature="'
                                  + encodeURIComponent(message.parameters.oauth_signature)
                                  + '"' + ', oauth_version="'
                                  + message.parameters.oauth_version + '"';
        var additionalHeaders = {
            "Authorization" : authorizationHeader
        };
           console.log(authorizationHeader);
        var request = {
                method : message.method,
                action : message.action,
                consumerKey : me.getConsumerKey(),
                consumerSecret : me.getConsumerSecret(),
                additionalHeaders : additionalHeaders,
                errorMessages : params.hasOwnProperty('errorMessages')? params.errorMessages: {},
                postData : 'x_auth_username=' + params.userName
                        + '&x_auth_password=' + params.password + '&x_auth_mode='
                        + message.parameters.x_auth_mode,
                success : successCallback,
                error : errorCallback,
                scope: scope
        };
        me.send(request);
    },

    apponlyauthorize : function(params) {
        var me = this,
        error = function(){},
        success = function(){},
        scope = params.scope || {};
           
        me.setTypeRequest('apponlyauthorize');
           
        me.setConsumer(params);
           
           
        var message = {
           method : "POST",
           action : me.getUrls().apponlyauthorize,
           parameters : {
                oauth_consumer_key_secret : me.getBase64KeySecret(),
                oauth_grant_type : me.getGrantType()
           }
        };
           
        if(params.hasOwnProperty('failure') && typeof params.failure =='function')
           error = params.failure;
           
        if(params.hasOwnProperty('success') && typeof params.success =='function')
           success = params.success;
           
        var successCallback = function(oauthAccessToken, oauthTokenType, twitter) {
           me.onAppOnlyAuthorizeSuccess(oauthAccessToken, oauthTokenType,success, scope);
        };
        var errorCallback = function(errorCode, errorMessage, twitter) {
           me.onAppOnlyAuthorizeError(errorCode, errorMessage,error, scope);
        };
         
        var authorizationHeader = 'Basic '+ message.parameters.oauth_consumer_key_secret;
        var additionalHeaders = {
           "Authorization" : authorizationHeader
        };
           
        var request = {
           method : message.method,
           action : message.action,
           additionalHeaders : additionalHeaders,
           errorMessages : params.hasOwnProperty('errorMessages')? params.errorMessages: {},
           postData : 'grant_type=' + message.parameters.oauth_grant_type,
           success : successCallback,
           error : errorCallback,
           scope: scope
        };
        me.send(request);
    },
           
    unAuthorize: function() {
        var me= this;

        me.setToken({accessToken:null,accessTokenSecret:null});
        //me.setConsumer({consumerKey:null,consumerSecret:null});
        me.setUser(null);
        me.setUserModel(null);
        me.setScope(null);
        if (window.plugins.applicationPreferences) {
            window.plugins.applicationPreferences.set('twitterToken', null, function() {}, function() {});
            window.plugins.applicationPreferences.set('userTwitter', null, function() {}, function() {});
        }
    },

    /**
     * Post a tweet
     * @param {} params params can be string or object
     * @param {} params if params is string, it'll tweet
     * @param {} params.tweet Message post to twitter
     * @param {} params.failure callback function if request returned fail.
     * @param {} params.success callback funcion if request returned success.
     * @param {} params.scope scope OPTION
     */
    tweet : function(params) {
        var me = this,
            scope = params.scope || {};

        if (params == null|| (typeof params != "object" && typeof params != "String")) {
            return;
        }else if (typeof params == "String") {
            params = {tweet : params};
        }

        var errorCallback =function(code, message) {};
        var successCallback = function(){};

         if(params.hasOwnProperty('failure') && typeof params.failure =='function')
            errorCallback = params.failure;

        if(params.hasOwnProperty('success') && typeof params.success =='function')
            successCallback = params.success;

        if(!params.hasOwnProperty('tweet') || !params.tweet ){
            me.defaultErrorCallback("", errorCallback,'Tweet required');
        }

        if (me.getConsumerKey() == null || me.getConsumerSecret() == null) {
            me.defaultErrorCallback("invalidConsumerInfo", errorCallback, 'Failed');
            return;
        }

        if (!me.isAuthorized()) {
            me.defaultErrorCallback("notAuthorized", errorCallback, 'Failed');
            return;
        }
        if (params.tweet.length > 140) {
            me.defaultErrorCallback("tweet Too Long", errorCallback, 'Failed');
            return;
        }
        if (params.tweet.length == 0) {
            me.defaultErrorCallback("Empty Message", errorCallback, 'Failed');
            return;
        }


        me.setTypeRequest('tweet');

        var accessor = {
              consumerSecret : this.getConsumerSecret(),
              tokenSecret : this.getAccessTokenSecret()
            };
        var parameters ={
                oauth_consumer_key : me.getConsumerKey(),
                oauth_signature_method : me.getOauthSignatureMethod(),
                oauth_version : me.getOauthVersion(),
                oauth_token : me.getAccessToken(),
                status : params.tweet
            };

        if(params.hasOwnProperty('tweetId'))
            parameters.in_reply_to_status_id = params.tweetId;

        var message = {
                method : "POST",
                action : me.getUrls().tweet,
                parameters : parameters
            };

        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, accessor);

        var request = {
               method : message.method,
               action : OAuth.addToURL(message.action, message.parameters),
               success : successCallback,
               error : errorCallback,
               errorMessages : params.hasOwnProperty('errorMessages')? params.errorMessages: {},
               additionalHeaders : (params.hasOwnProperty("additionalHeaders"))? params.additionalHeaders: {},
               scope: scope
            };

        me.send(request);
    },

    /**
     * Get Timeline
     * @param {Object} params
     * @param {Object} params.count number record Expect
     * @param {} params.failure callback function if request returned fail.
     * @param {} params.success callback funcion if request returned success.
     * @param {} params.scope scope OPTION
     */
    userTimeline : function(params) {
        var me = this,
            errorCallback = function(code, message) {},
            successCallback = function(){},
            count = me.getCount(),
            page = me.getPage(),
            params = params || {},
            scope = params.scope || {},
           accessor = null;
           if(me.isAuthorized())
           {
           accessor ={
                consumerSecret : me.getConsumerSecret(),
                tokenSecret : me.getAccessTokenSecret()
            };
           }

        me.setTypeRequest('userTimeline');

        if (params.hasOwnProperty('failure') && typeof params.failure =='function')
            errorCallback = params.failure

        if (params.hasOwnProperty('success') && typeof params.success =='function')
            successCallback = params.success

        if (me.getConsumerKey() == null || me.getConsumerSecret() == null) {
            me.defaultErrorCallback("invalidConsumerInfo", errorCallback, 'Failed');
            return;
        }
        if (!params.screen_name) {
            me.defaultErrorCallback('', errorCallback,'screen_name required');
            return;
        }

        if (!me.isAuthorized() && !me.isAppOnlyAuthorized()) {
            me.defaultErrorCallback("notAuthorized", errorCallback, 'Failed');
            return;
        }

        if (params.hasOwnProperty('count')) {
            if (params.count!=0 && params.count) {
                count = params.count;
            }
        }

        if (params.hasOwnProperty('page')) {
            if (params.page) {
                page = params.page;
            }
        }
        var message = {
            method : "GET",
            action : me.getUrls().userTimeline,
            parameters : {
                screen_name: params.screen_name,
                oauth_consumer_key : me.getConsumerKey(),
                oauth_signature_method : me.getOauthSignatureMethod(),
                oauth_version : me.getOauthVersion(),
                oauth_token : me.isAuthorized()?me.getAccessToken():me.getAppOnlyAccessToken(),
                trim_user : false,
                page: page,
                count: count
            }
        };
        
        OAuth.setTimestampAndNonce(message);
        //OAuth.SignatureMethod.sign(message, accessor);
           
           var request = null;/*request = {
           method : message.method,
           action : OAuth.addToURL(message.action, message.parameters),
           success : successCallback,
           error : errorCallback,
           errorMessages : params.hasOwnProperty('errorMessages')? params.errorMessages: {},
           scope:scope
           };*/

        if(me.isAuthorized())
        {
           OAuth.SignatureMethod.sign(message, accessor);
           
           request = {
                method : message.method,
                action : OAuth.addToURL(message.action, message.parameters),
                success : successCallback,
                error : errorCallback,
                errorMessages : params.hasOwnProperty('errorMessages')? params.errorMessages: {},
                scope:scope
           };
        }
        else
        {
           var authorizationHeader = 'Bearer '+ me.getAppOnlyAccessToken();
           var additionalHeaders = {
           "Authorization" : authorizationHeader
           };
           request = {
                method : message.method,
                additionalHeaders : additionalHeaders,
                action : OAuth.addToURL(message.action, message.parameters),
                success : successCallback,
                error : errorCallback,
                errorMessages : params.hasOwnProperty('errorMessages')? params.errorMessages: {},
                scope:scope
           };
        }
        
          
        

        me.send(request);
    },

    /**
     * Favorite a tweet
     * @param {} params
     * @param {} params.tweetId tweet ID that user want Favorite
     * @param {} params.success callback function when request returned success
     * @param {} params.failure callback function when request returned fail
     * @param {} params.scope scope OPTION
     */
    favorite:function(params){
        var me = this,
            errorCallback = function(code, message){},
            successCallback = function(){},
            scope = params.scope || {};

        if (params == null|| (typeof params != "object" && typeof params != "String")) {
            return;
        }else if (typeof params == "String") {
            params = {tweetId : params};
        }

        if(params.hasOwnProperty('failure') && typeof params.failure =='function')
            errorCallback = params.failure

        if(params.hasOwnProperty('success') && typeof params.success =='function')
            successCallback = params.success

        if (me.getConsumerKey() == null || me.getConsumerSecret() == null) {
            me.defaultErrorCallback("invalidConsumerInfo", errorCallback, 'Failed');
            return;
        }

        if (!me.isAuthorized()) {
            me.defaultErrorCallback("notAuthorized", errorCallback, 'Failed');
            return;
        }

        me.setTypeRequest('favoriteTweet');

        var accessor = {
              consumerSecret : this.getConsumerSecret(),
              tokenSecret : this.getAccessTokenSecret()
            };
        var message = {
                method : "POST",
                action : me.getUrls().favoriteTweet,
                parameters : {
                    oauth_consumer_key : me.getConsumerKey(),
                    oauth_signature_method : me.getOauthSignatureMethod(),
                    oauth_version : me.getOauthVersion(),
                    oauth_token : me.getAccessToken(),
                    id: params.tweetId
                }
            };

        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, accessor);

        var request = {
               method : message.method,
               action : OAuth.addToURL(message.action, message.parameters),
               success :successCallback,
               error : errorCallback,
               additionalHeaders : (params.hasOwnProperty("additionalHeaders"))? params.additionalHeaders: {},
               errorMessages : params.hasOwnProperty('errorMessages')? params.errorMessages: {},
               scope: scope
            };

        me.send(request);
    },

    /**
     * Reweet
     * @param {} params
     * @param {String} params.tweetId tweet ID that user want retweet
     * @param {} params.success callback function when request returned success
     * @param {} params.failure callback function when request returned fail
     * @param {} params.scope scope OPTION
     */
    retweet: function(params){
        var me = this,
            scope = params.scope || {};

        if (params == null|| (typeof params != "object" && typeof params != "String")) {
            return;
        }else if (typeof params == "String") {
            params = {tweetId : params};
        }

        var errorCallback = function(code, message) {};
        var successCallback =function(){};

        if(params.hasOwnProperty('failure') && typeof params.failure =='function')
            errorCallback = params.failure

        if(params.hasOwnProperty('success') && typeof params.success =='function')
            successCallback = params.success

        if(!params.hasOwnProperty('tweetId')){
        	me.defaultErrorCallback('', errorCallback,'tweetId required');
            return;
        }
        if(!params.tweetId){
        	me.defaultErrorCallback('', errorCallback,'tweetId required');
            return;
        }

        if (me.getConsumerKey() == null || me.getConsumerSecret() == null) {
            me.defaultErrorCallback("invalidConsumerInfo", errorCallback, 'Failed');
            return;
        }

        if (!me.isAuthorized()) {
            me.defaultErrorCallback("notAuthorized", errorCallback, 'Failed');
            return;
        }

        me.setTypeRequest('retweet');

        var accessor = {
              consumerSecret : this.getConsumerSecret(),
              tokenSecret : this.getAccessTokenSecret()
            };
        var parameters ={
                oauth_consumer_key : me.getConsumerKey(),
                oauth_signature_method : me.getOauthSignatureMethod(),
                oauth_version : me.getOauthVersion(),
                oauth_token : me.getAccessToken()
            };

        var message = {
                method : "POST",
                action : me.getUrls().retweet+'/' + me.createFileName(params.tweetId),
                parameters : parameters
            };

        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, accessor);

        var request = {
               method : message.method,
               action : OAuth.addToURL(message.action, message.parameters),
               success : successCallback,
               error : errorCallback,
               additionalHeaders : (params.hasOwnProperty("additionalHeaders"))? params.additionalHeaders: {},
               errorMessages : params.hasOwnProperty('errorMessages')? params.errorMessages: {},
               scope: scope
            };

        me.send(request);
    },

     /**
     * Reply to a tweet
     * @param {} params
     * @param {String} params.tweetId tweet ID that user want answer
     * @param {String} params.tweet tweet that user want answer
     * @param {String} params.author the author of the tweet want to reply
     * @param {} params.success callback function when request returned success
     * @param {} params.failure callback function when request returned fail
     * @param {} params.scope scope OPTION
     */
    reply:function(params){
        var me = this;

        var errorCallback = function(code, message) {};

          if(params.hasOwnProperty('failure') && typeof params.failure =='function')
            errorCallback = params.failure

        if(!params.hasOwnProperty('tweetId') || !params.tweetId){
        	me.defaultErrorCallback("", errorCallback,'tweetId required');
            return;
        }

        if(!params.hasOwnProperty('tweet') || !params.tweet){
            me.defaultErrorCallback("", errorCallback,'tweet required');
            return;
        }
        if(!params.hasOwnProperty('author') || !params.author){
            me.defaultErrorCallback("", errorCallback,'author required');
            return;
        }

        var arr = params.tweet.split(' ');
        if(arr.length==0)
            return;
        if(arr[0]!='@'+params.author)
            params.tweet = '@'+params.author+' ' +  params.tweet;

        me.tweet(params)
    },

    /**
     * get Twist by hashtag
     * @param {Object} params
     * @param {Object} params.config
     * @param params.config.q hashtag want to search
     * @param params.config.include_entities if want to include entities
     * @param params.success callback function if request returned success
     * @param params.failure callback function if request returned fail
     **/
    search: function(params) {
        var me = this,
            errorCallback = function(code, message) {},
            successCallback = function(response){},
            count = me.getCount(),
            scope = params.scope || {},
            paramUrl = params.config,
            accessor = null;
            if(me.isAuthorized())
            {
                accessor = {
                    consumerSecret : me.getConsumerSecret(),
                    tokenSecret : me.getAccessTokenSecret()
                };
            }
        me.setTypeRequest('search');

        if(params.hasOwnProperty('failure') && typeof params.failure =='function')
            errorCallback = params.failure

        if(params.hasOwnProperty('success') && typeof params.success =='function')
            successCallback = params.success

        if (me.getConsumerKey() == null || me.getConsumerSecret() == null) {
            me.defaultErrorCallback("invalidConsumerInfo", errorCallback, 'Failed');
            return;
        }

        if (!me.isAuthorized() && !me.isAppOnlyAuthorized()) {
            me.defaultErrorCallback("notAuthorized", errorCallback, 'Failed');
            return;
        }

        if (!paramUrl) {
            return;
        }

        if (params.hasOwnProperty('count')) {
            if (params.count!=0 && params.count) {
                count = params.count;
            }
        }
           
        var message = {
            method : "GET",
            action : me.getUrls().search,
            parameters : {
                q : paramUrl.q,
                show_user: true,
                count: 100,
                oauth_consumer_key : me.getConsumerKey(),
                oauth_signature_method : me.getOauthSignatureMethod(),
                oauth_version : me.getOauthVersion(),
                oauth_token   : me.isAuthorized()?me.getAccessToken():me.getAppOnlyAccessToken()
            }
        };

        OAuth.setTimestampAndNonce(message);
        //OAuth.SignatureMethod.sign(message, accessor);
        var request = null;
        if(me.isAuthorized())
        {
           OAuth.SignatureMethod.sign(message, accessor);
           request = {
                method : message.method,
                action : OAuth.addToURL(message.action, message.parameters),
                success : successCallback,
                error : errorCallback,
                errorMessages : params.hasOwnProperty('errorMessages')? params.errorMessages: {},
                scope : scope
           };
        }
        else
        {
           var authorizationHeader = 'Bearer '+ me.getAppOnlyAccessToken();
           var additionalHeaders = {
                "Authorization" : authorizationHeader
           };
           request = {
                method : message.method,
                additionalHeaders : additionalHeaders,
                action : OAuth.addToURL(message.action, message.parameters),
                success : successCallback,
                error : errorCallback,
                errorMessages : params.hasOwnProperty('errorMessages')? params.errorMessages: {},
                scope : scope
           };
        }
        me.send(request);
    },

    /**
     * Set consumer Key and consumer Secret of your app
     * @param {} params
     * @param {} params.consumerKey
     * @param {} params.consumerSecret
     */
    setConsumer : function(params) {
        var me = this;
        params.hasOwnProperty('consumerKey')?me.setConsumerKey(params.consumerKey):'';
        params.hasOwnProperty('consumerSecret')?me.setConsumerSecret(params.consumerSecret):'';
        params.hasOwnProperty('base64KeySecret')?me.setBase64KeySecret(params.base64KeySecret):'';
    },

    /*
     * private function section
     */

    /**
     * get information's user
     * @param {} params
     * @param {} params.scope
     * @private
     */
    user: function(params) {
        var me = this,
            errorCallback = function(code, message) {},
            successCallback = function(){},
            scope = params.scope || {},
            accessor = {
                consumerSecret : me.getConsumerSecret(),
                tokenSecret : me.getAccessTokenSecret()
            };

        me.setTypeRequest('user');

        if(params.hasOwnProperty('failure') && typeof params.failure =='function')
            errorCallback = params.failure

        if(params.hasOwnProperty('success') && typeof params.success =='function')
            successCallback = params.success

        if (me.getConsumerKey() == null || me.getConsumerSecret() == null) {
            me.defaultErrorCallback("invalidConsumerInfo", errorCallback, 'Failed');
            return;
        }

        if (!me.isAuthorized()) {
            me.defaultErrorCallback("notAuthorized", errorCallback, 'Failed');
            return;
        }

        var message = {
            method : "GET",
            action : me.getUrls().userInfo,
            parameters : {
                oauth_consumer_key : me.getConsumerKey(),
                oauth_signature_method : me.getOauthSignatureMethod(),
                oauth_version : me.getOauthVersion(),
                oauth_token : me.getAccessToken()
            }
        };

        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, accessor);

        var request = {
            method : message.method,
            action : OAuth.addToURL(message.action, message.parameters),
            success : successCallback,
            error : errorCallback,
            errorMessages : params.hasOwnProperty('errorMessages')? params.errorMessages: {},
            scope : scope
        };

        me.send(request);
    },

    /**
     * set accessToken and accessTokenSecret of user after auth success
     * @param {} params
     * @param {} params.accessToken
     * @param {} params.accessTokenSecret
     * @private
     */
    setToken : function(params) {
        var me = this;
        me.setAccessToken(params.accessToken? params.accessToken: null);
        me.setAccessTokenSecret(params.accessTokenSecret? params.accessTokenSecret: null);
    },
    setAppOnlyToken : function(params) {
        var me = this;
        me.setAppOnlyAccessToken(params.appOnlyAccessToken? params.appOnlyAccessToken: null);
        me.setAppOnlyAccessTokenType(params.appOnlyAccessTokenType? params.appOnlyAccessTokenType: null);
    },
       
    /**
     * check Authorized Or Not
     * true if Authorized
     * fasle if Not
     * @return {Boolean}
     * @private
     */
    isAuthorized : function() {
        var me = this;
        if (me.getAccessToken() == null || me.getAccessToken().length == 0|| me.getAccessTokenSecret() == null|| me.getAccessTokenSecret().length == 0) {
            return false;
        }
        return true;
    },
    isAppOnlyAuthorized : function() {
        var me = this;
        if (me.getAppOnlyAccessToken() == null || me.getAppOnlyAccessToken().length == 0|| me.getAppOnlyAccessTokenType() == null|| me.getAppOnlyAccessTokenType().length == 0) {
           return false;
        }
        return true;
    },
    /**
     *
     * @param {} fileName
     * Retunr fileName.json
     * @private
     */
    createFileName : function(fileName){
        if(typeof fileName !='string')
            return;
        return fileName+'.json';
    },

    /**
     * Called when request returned failure
     * @param {string} error ErrorCode returned
     * @param {Function} callback The callback Function
     * @param {object} messages The object contain errorcode and message
     * @private
     */
    defaultErrorCallback : function(error, callback, messages) {
        var me = this;
        if (!me.getErrors().hasOwnProperty(error)) {
            callback(me.getErrors().unknown.code,me.getErrors().unknown.message);
            return;
        }
        var message = (messages != null && messages.hasOwnProperty(error))? messages[error]: me.getErrors()[error].message;
        callback(me.getErrors()[error].code, message);
    },

    /**
     * Function send all request to twitter api
     * @param {} request
     * @param {} callback
     * @private
     */
    send : function(request, callback) {
        var me = this,
            headers = {},
            data = request.hasOwnProperty("postData") ? request.postData : null,
            ajaxRequest = new XMLHttpRequest();
           console.log(request.action);
        for (var key in request.additionalHeaders) {
            headers[key] = request.additionalHeaders[key];
        }
        headers['Accept-Encoding'] = 'none';
        if (request.method == "POST") {
           if(me.getTypeRequest()=='apponlyauthorize')
                headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
           else
                headers["Content-Type"] = "application/x-www-form-urlencoded";
        }

        ajaxRequest.open(request.method, request.action, true);

        for (var i in headers) {
            ajaxRequest.setRequestHeader(i, headers[i]);
        }

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4) {
                if(ajaxRequest.status == 200) {
                    me.onRequestSuccess(ajaxRequest, request);
                } else {
                    me.onRequestError(ajaxRequest, request);
                }
            }
        };
        ajaxRequest.send(data);

    },

    /**
     *
     * @param {Object} respone
     * @param {Object} request
     * @private
     */
    onRequestError : function(respone, request) {
        var me = this;
        var code = respone.status;
        var message = respone.responseText;

        if (code == 403 && message.indexOf(me.getErrors().statusDuplicate.message) != -1) {
            code = me.getErrors().statusDuplicate.code;
            message = me.getErrors().statusDuplicate.message;
        } else if (code == 401 && (message.indexOf(me.getErrors().wrongVal.message) != -1)) {
            code = me.getErrors().wrongVal.code;
            message = me.getErrors().wrongVal.message;
        }

        if (request.hasOwnProperty('error')) {
            var callback = request.error;
            typeof callback == 'function'? callback.call(request.scope, code, message) : '';
        } else {
            console.log('errorcallback');
        }
    },

    /**
     *
     * @param {} respone
     * @param {} request
     * @private
     */
    onRequestSuccess : function(respone, request) {
        var me = this;

        me.setScope(request.scope);

        switch (me.getTypeRequest()) {
            case 'authorize' :
                var responseParams = OAuth.getParameterMap(respone.responseText);
                if (!responseParams['oauth_token'] || !responseParams['oauth_token_secret']) {
                    var errorMessage = (request.errorMessages.hasOwnProperty('authorizeError'))? request.errorMessages.authorizeError: me.getErrors().authorizeError.message, errorCode = me.getErrors().authorizeError.code;
                    me.onAuthorizeError(errorCode, errorMessage, request.error,request.scope);
                    return;
                }
                var oauthToken = responseParams['oauth_token'],
                oauthTokenSecret = responseParams['oauth_token_secret'];

                me.onAuthorizeSuccess(oauthToken, oauthTokenSecret,request.success,request.scope);
                break;

            case 'tweet' :
                me.onTweetSuccess(respone.responseText, request.success,request.scope)
                break;
            case 'userTimeline' :
                me.onUserTimeLineSuccess(respone.responseText,request.success,request.scope)
                break;
            case 'retweet':
                me.onTweetSuccess(respone.responseText, request.success,request.scope);
                break;
            case 'favoriteTweet':
                me.onTweetSuccess(respone.responseText, request.success,request.scope);
                break;
            case 'user':
                me.onUserSuccess(respone.responseText, request.success,request.scope);
                break;
            case 'search':
                me.onSearchSuccess(respone.responseText, request.success, request.scope);
                break;
           case 'apponlyauthorize':
                var responseParams = JSON.parse(respone.responseText);
                if (!responseParams['access_token'] || !responseParams['token_type']) {
                    var errorMessage = (request.errorMessages.hasOwnProperty('authorizeError'))? request.errorMessages.invalidCredential: me.getErrors().invalidCredential.message, errorCode = me.getErrors().invalidCredential.code;
                    me.onAuthorizeError(errorCode, errorMessage, request.error,request.scope);
                    return;
                }
                var oauthAccessToken = responseParams['access_token'],
                oauthTokenType = responseParams['token_type'];
                me.onAppOnlyAuthorizeSuccess(oauthAccessToken, oauthTokenType,request.success,request.scope);
                break;
        }

    },

    /**
     *
     * @param {} oauthToken
     * @param {} oauthTokenSecret
     * @param {} callback
     * @private
     */
    onAuthorizeSuccess : function(oauthToken, oauthTokenSecret, callback,scope) {
        var me = this,
            scope = scope || me.getScope(),
            userModel = me.getUserModel();

        me.setToken({
                    accessToken : oauthToken,
                    accessTokenSecret : oauthTokenSecret
                });

        if(userModel!='' || userModel) {
            var doCallback = function(data) {
                var userStore = null,
                    userModel = me.getUserModel();

                var userData = Ext.create(userModel,data);

               me.setUser(userData);
                if (window.plugins.applicationPreferences) {
                    window.plugins.applicationPreferences.set('userTwitter', Ext.JSON.encode(data), function() {}, function() {});
                }
               typeof callback == 'function'? callback.call(scope, oauthToken, oauthTokenSecret): '';
            };
            Ext.require(userModel,function() {
                me.user({ success:doCallback, scope:scope });
            });
        } else {
           typeof callback == 'function'? callback.call(scope, oauthToken, oauthTokenSecret): '';
        }
        if (window.plugins.applicationPreferences) {
            var token = { accessToken : oauthToken, accessTokenSecret : oauthTokenSecret };
            var twitterToken = Ext.JSON.encode(token);
            window.plugins.applicationPreferences.set('twitterToken', twitterToken, function() {}, function() {});
        }
    },

    onAppOnlyAuthorizeSuccess: function(oauthAccessToken, oauthTokenType,callback,scope){
        var me = this,
        scope = scope || me.getScope();
           
        me.setAppOnlyToken({
            appOnlyAccessToken : oauthAccessToken,
            appOnlyAccessTokenType : oauthTokenType
        });
           
        typeof callback == 'function'? callback.call(scope, oauthAccessToken, oauthTokenType): '';
        
        if (window.plugins.applicationPreferences) {
           var appOnlyToken = { appOnlyAccessToken : oauthAccessToken, appOnlyAccessTokenType : oauthTokenType };
           var appOnlyTwitterToken = Ext.JSON.encode(appOnlyToken);
           window.plugins.applicationPreferences.set('appOnlyTwitterToken', appOnlyTwitterToken, function() {}, function() {});
        }

           
    },
    /**
     *
     * @param {} errorCode
     * @param {} errorMessage
     * @param {} callback
     * @private
     */
    onAuthorizeError : function(errorCode, errorMessage, callback,scope) {
    	var me = this;
        if(errorCode == me.getErrors().invalidCredential.code)
        {
           me.setAppOnlyAccessToken(null);
           me.setAppOnlyAccessTokenType(null);
        }
        else
        {
           me.setAccessToken(null);
           me.setAccessTokenSecret(null);
        }
        typeof callback == 'function'? callback.call(scope,errorCode, errorMessage): '';
    },

    /**
     *
     * @param {} responseText
     * @param {} callback
     * @private
     */
    onTweetSuccess : function(responseText, callback,scope) {
        var data = Ext.JSON.decode(responseText);
        typeof callback == 'function' ? callback.call(scope,data) : '';
    },

    /**
     *
     * @param {} responseText
     * @param {} callback
     * @private
     */
    onUserTimeLineSuccess : function(responseText, callback,scope) {
        var data = Ext.JSON.decode(responseText);
        if(!scope)
            scope = this;
        typeof callback == 'function' ? callback.call(scope,data) : '';
    },

    onUserSuccess: function(responseText, callback,scope) {
        var data = Ext.JSON.decode(responseText);
        typeof callback == 'function' ? callback.call(scope,data) : '';
    },

    onSearchSuccess: function(responseText, callback, scope) {
        var data = Ext.JSON.decode(responseText);
        typeof callback == 'function' ? callback.call(scope, data) : '';
    }
});
