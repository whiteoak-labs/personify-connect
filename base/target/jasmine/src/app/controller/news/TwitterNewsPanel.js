Ext.define("Personify.controller.news.TwitterNewsPanel",{extend:"Personify.base.Controller",control:{tweetButtonNews:{tap:"onTweetButtonNewsTap"},textfieldTwitterNews:{keyup:"onTextfieldTwitterNews"},twitter:true,labelSizeTweetNews:true},onTweetButtonNewsTap:function(){var b=this,c,a=b.getTextfieldTwitterNews();if(TMA.Twitter.isAuthorized()){if(a.getValue().length>0){c={tweet:a.getValue(),success:b.onSucessTweet,failure:b.onFailureTweet,scope:b};TMA.Twitter.tweet(c)}else{Ext.Msg.alert("Twitter","Empty tweet",Ext.emptyFn)}}else{Ext.Msg.alert("Twitter","You have to login twitter",Ext.emptyFn)}},onTextfieldTwitterNews:function(c,d,a){var b=140;if(c.getValue().length>b){return false}this.getLabelSizeTweetNews().setHtml(b-c.getValue().length)},onSucessTweet:function(){this.getTwitter().fireEvent("reload")}});