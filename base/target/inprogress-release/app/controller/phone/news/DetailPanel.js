Ext.define("Personify.controller.phone.news.DetailPanel",{extend:"Personify.base.Controller",control:{sourceDetailPanelPhone:true,publicDetailPanelPhone:true,shareNewsButton:{tap:"onTapShareNewsButton"}},config:{record:null,feedRecord:null},updateRecord:function(a){if(a){var b=a.get("date");if(b){var c=Ext.Date.format(b,"F, j, Y");this.getPublicDetailPanelPhone().setHtml('<div class="p-phone-panel-informationofnews">Published: </div>'+c)}}},updateFeedRecord:function(a){if(a){var b=a.get("name");this.getSourceDetailPanelPhone().setHtml('<div class="p-phone-panel-informationofnews">Source: </div>'+b)}},onTapShareNewsButton:function(){var a=this;if(window.plugins.social&&window.plugins.social.available){window.plugins.social.available(function(c){if(c==1){var b="";var d="";var e=a.getRecord();if(e){b=e.get("title")+" "+e.get("description");d=e.get("link")}window.plugins.social.share(b,d,"")}else{Ext.Msg.alert("","Social network plugins is not supported.",Ext.emptyFn)}})}}});