Ext.define("Personify.controller.phone.aboutAPA.AboutAPAPhone",{extend:"Personify.base.Controller",inject:["personify"],control:{ptoolbarAboutAPA:{onNavigationButtonTap:"onTapNavigationButton"},imageFrame:true,versionAPAPhone:true,titlePanel:true,descriptionPanel:true,phoneList:true,importantNumbersPanel:true,addressPanel:true,emailPanel:true,websitePanel:true,emailList:{},addressList:{itemtap:"onTapAddressList"},websiteList:true,addToMyAddressBookButton:{tap:"onTapAddToMyAddressBookButton"},tellAFriendButton:{tap:"onTapTellAFriendButton"},bntApp47IdSettings:{tap:"onTapApp47IdSettings"},configContainer:true},config:{tempData:null,personify:null},init:function(){var b=this;b.getPtoolbarAboutAPA().getController().setHiddenActionButton(true);var c=b.getPersonify().getAt(0).AboutStore;if(c!=null){b.setTempData(c);b.getImageFrame().setSrc(c.get("logoUrl"));b.getVersionAPAPhone().setHtml("Version: "+c.get("version"));b.getTitlePanel().setHtml("<b>"+c.get("title")+"</b>");b.getDescriptionPanel().updateTitle(c.get("descriptionTitle"));b.getDescriptionPanel().setHtml(c.get("description"));b.getImportantNumbersPanel().updateTitle(c.get("importantNumbersTitle"));b.getImportantNumbersPanel().updateStore(c.NumbersStore);b.getAddressPanel().updateTitle(c.get("addressesTitle"));b.getAddressPanel().updateStore(c.AddressesStore);b.getWebsitePanel().updateTitle(c.get("websitesTitle"));b.getWebsitePanel().updateStore(c.WebsiteStore);b.getEmailPanel().updateTitle(c.get("emailTitle"));b.getEmailPanel().updateStore(c.EmailStore);var a=c.get("enableConfigSettings");if(a){b.getConfigContainer().setHidden(false)}}},onTapNavigationButton:function(){this.getView().fireEvent("back",this)},onTapAddToMyAddressBookButton:function(){var k=this;var d=this.getTempData();var c=[],b=[],f=[],j=[];myContact=navigator.contacts.create();myContact.displayName=d.getData().title;var n=d.NumbersStore;var g=d.AddressesStore;var h=d.EmailStore;var m=d.WebsiteStore;for(var e=0;e<n.getAllCount();e++){phoneNumber=new ContactField(n.getAt(e).get("type"),n.getAt(e).get("value"),false);c.push(phoneNumber)}myContact.phoneNumbers=c;for(var e=0;e<h.getAllCount();e++){email=new ContactField(h.getAt(e).get("type"),h.getAt(e).get("value"),false);f.push(email)}myContact.emails=f;for(var e=0;e<g.getAllCount();e++){var a=g.getAt(e);var l=new ContactAddress();var i=a.get("streetAddress");if(a.get("address")){i+=", "+a.get("address")}if(a.get("address2")){i+=", "+a.get("address2")}if(a.get("address3")){i+=", "+a.get("address3")}if(a.get("address4")){i+=", "+a.get("address4")}l.streetAddress=i;l.locality=a.get("locality");l.postalCode=a.get("postalCode");l.country=a.get("country");l.region=a.get("region");b.push(l)}myContact.addresses=b;for(var e=0;e<m.getAllCount();e++){url=new ContactField(m.getAt(e).get("type"),m.getAt(e).get("value"),false);j.push(url)}myContact.urls=j;myContact.save(k.onSuccess,k.onError)},onSuccess:function(){Ext.Msg.alert("Address Book","Added to address book",Ext.emptyFn)},onError:function(a){if(Ext.os.is.Android){Ext.Msg.alert("Address Book","This contact already exists in your device's contact list.",Ext.emptyFn)}else{Ext.Msg.alert("Address Book","To use this function, you have to allow this mobile application to access your contacts by changing iOS settings in Settings > Privacy > Contacts",Ext.emptyFn)}},onTapTellAFriendButton:function(){var c=Personify.utils.Configuration.getConfiguration().getAt(0).AboutStore.get("appShareTitle");var a=Personify.utils.Configuration.getConfiguration().getAt(0).AboutStore.get("appShareText");var b=Personify.utils.Configuration.getConfiguration().getAt(0).AboutStore.get("appUrl");a=a.replace("{appUrl}",b);if(window.plugins.emailComposer){window.plugins.emailComposer.showEmailComposer(c,a,null,null,null)}},onTapAddressList:function(h,c,g,b,f,d){var a="";if(b.get("fomatted")){a=b.get("formatted").split("/n").join(", ")}else{a=Personify.utils.ItemUtil.getAddress(b)}Personify.utils.ItemUtil.showAddressOnMaps(a)},onTapApp47IdSettings:function(){this.getView().fireEvent("requestchangeview","Personify.view.phone.aboutAPA.Settings",null)}});