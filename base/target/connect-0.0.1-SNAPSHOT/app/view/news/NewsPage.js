Ext.define("Personify.view.news.NewsPage",{extend:"Ext.dataview.DataView",xtype:"newspage",config:{baseCls:"news-page",emptyText:"No data",scrollable:null,itemTpl:new Ext.XTemplate('<div class="news-page-title">{title}</div>'),listeners:{itemtap:function(d,b,g,a,f,c){if(f.target.className.indexOf("news-page-title")!=-1){this.fireEvent("tapTitle",a)}}}}});