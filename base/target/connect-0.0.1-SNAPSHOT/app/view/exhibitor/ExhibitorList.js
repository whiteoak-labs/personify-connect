Ext.define("Personify.view.exhibitor.ExhibitorList",{extend:"Ext.dataview.List",xtype:"allExhibitorList",config:{baseCls:"allExhibitorList",pressedCls:"",selectedCls:"",itemCls:"allExhibitorListItem",grouped:true,indexBar:{direction:"horizontal"},scrollToTopOnRefresh:false,deferEmptyText:false,emptyText:'<div class="p-presenter-emptyText">No Exhibitor</div>',itemTpl:new Ext.XTemplate('<table width="100%"><tr width="100%"><td width="84px" height="86px" class="img-allExhibitorList"><img src="{[Personify.utils.ItemUtil.displayImage(values.imageURL)]}" width="84px" height="86px"/></td><td width="70%" class="cont-allExhibitorList"><p style="margin-bottom: 5px;"><b>{[Personify.utils.ItemUtil.checkStringNull(values.name)]}</b></p>{[this.checkBoothNull(values.boothNos)]}<p>{[Personify.utils.ItemUtil.checkStringNull(values.webSiteURL)]}</p></td><td width="20%" "align="center"><button width="100px" class="{[this.changeButtonCls(values.isAdded)]}">{[this.changeButtonText(values.isAdded)]}</button></td></tr></table>',{checkBoothNull:function(a){if(a==null||a==""){return""}else{return"<p>Booth: <b>"+a+"</b></p>"}},changeButtonCls:function(a){if(a){return"p-button-red-inlist-exhibitor"}else{return"p-button-blue-inlist-exhibitor"}},changeButtonText:function(a){if(a){return"Remove Exhibitor"}else{return"Add Exhibitor"}}}),listeners:{itemtap:function(d,b,g,a,f,c){if(f.target.className.indexOf("button")>=0){d.fireEvent("onTapBtnDelProductAllExhibitor",a)}else{d.fireEvent("tapAllExhibitorItem",d,b,g,a,f,c)}},itemtouchstart:function(b,c,g,a,f,d){if(f.target.className.indexOf("button")<0){g.addCls("allExhibitorListItemPressed")}},itemtouchend:function(b,c,g,a,f,d){g.removeCls("allExhibitorListItemPressed")}}}});