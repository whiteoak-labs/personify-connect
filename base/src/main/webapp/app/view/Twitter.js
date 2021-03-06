Ext.define('Personify.view.Twitter', {
    extend: 'Ext.dataview.DataView',
    xtype: 'twitter',
    controller:'Personify.controller.Twitter',

    requires:[
        'Personify.controller.Twitter',
        'Personify.view.twitter.SearchList'
    ],

    config: {
        twitterHashTag: null,
        currentUser: null,
        autoDestroy: true,
        cls: 'twitter-list',
        itemId: 'twitter',
        scrollable: {
            direction: 'vertical'
        },
        emptyText: 'Empty Tweet',
        configSearch: null,
        type: 'timeline',
        baseCls: 'twitter-timeline',
        scrollToTopOnRefresh: false,
        itemTpl: new Ext.XTemplate(
            '<div class="div_content_twitter">',
                '<div class="content-twitter subdiv_content_twitter">',
                    '<span class="screen_name-twitter subdiv_content_twitter">{user.screen_name}&nbsp</span>',
                    '{text}',
                '</div>',
            '</div>',
            '<div class="p-date-reply-container">',
                '<div>',
                    '<div class="subdiv_feature_twitter time-tweet-twitter">',
                        '<div class="subdiv_feature_twitter-button">{created_at}</div>',
                    '</div>',
                    '<div class="reply-feature-twitter">',
                          '<tpl if="this.checkIsAuthorize()"><div class="reply-feature-twitter-button">reply</div></tpl>',
                    '</div>',
                '</div>',
                '<div style="clear: both;">',
                    '<div class="retweet_feature_twitter">',
                          '<tpl if="!this.checkIsOwnTweet(user) && this.checkIsAuthorize()"><div class="twitter-retweet">retweet</div></tpl>',
                    '</div>',
                    '<div class="favorited_feature_twitter">',
                          '<tpl if="this.checkIsAuthorize()">',
                              '<tpl if="favorited==true">',
                                  '<div class="tweet-favorited">',
                                  'favorited',
                                  '</div>',
                              '</tpl>',
                              '<tpl if="favorited==false">',
                                  '<div class="favorite-feature-twitter">',
                                      'favorite',
                                  '</div>',
                              '</tpl>',
                          '</tpl>',
                    '</div>',
                '</div>',
            '</div>',
            '<tpl if="isReply==true">',
                '<div class="x-container x-field-textarea x-field x-label-align-left x-layout-box-item x-stretched x-field-clearable p-twitter-inputfield x-form-label-nowrap" style="width: 100%;">',
                    '<div class="x-form-label">',
                    '</div>',
                    '<div class="x-component-outer">',
                        '<div class="x-unsized sencha-clear-icon">',
                            '<textarea class="x-input-el x-input-text x-form-field" type="text" autocapitalize="off" maxlength="140">',
                            '</textarea>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>',
                '<button class="x-unsized x-button-normal x-button reply-twitter-button">Tweet</button>',
                '<button class="x-unsized x-button-normal x-button cancel-reply-twitter-button">Cancel</button>',
            '</tpl>',
            {
                checkIsAuthorize: function() {
                    return TMA.Twitter.isAuthorized();
                },
                checkIsOwnTweet: function(tweetUser) {
                    if (TMA.Twitter.getUser().get('id') == tweetUser.id) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        )
    },

    addNewTweet: function(record) {
        var me = this;
        me.getStore().add(record);
        me.getStore().sort('created_at','DESC');
    },

    updateTwitterHashTag: function(twitterHashTag) {
        var me = this,
            type = me.getType(),
            controller = me.getController();

        switch (type) {
            case 'timeline':
                controller.reLoad(twitterHashTag);
                break;
            case 'search':
            default:
                this.setConfigSearch({ q: twitterHashTag, include_entities:true });
                controller.onSearch(this.getConfigSearch());
        }
    }
});