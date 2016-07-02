Ext.define("Ext.viewport.Ios",{extend:"Ext.viewport.Default",isFullscreen:function(){return this.isHomeScreen()},isHomeScreen:function(){return window.navigator.standalone===true},constructor:function(){this.callParent(arguments);if(this.getAutoMaximize()&&!this.isFullscreen()){this.addWindowListener("touchstart",Ext.Function.bind(this.onTouchStart,this))}},maximize:function(){if(this.isFullscreen()){return this.callParent()}var c=this.stretchHeights,b=this.getOrientation(),d=this.getWindowHeight(),a=c[b];if(window.scrollY>0){this.scrollToTop();if(!a){c[b]=a=this.getWindowHeight()}this.setHeight(a);this.fireMaximizeEvent()}else{if(!a){a=this.getScreenHeight()}this.setHeight(a);this.waitUntil(function(){this.scrollToTop();return d!==this.getWindowHeight()},function(){if(!c[b]){a=c[b]=this.getWindowHeight();this.setHeight(a)}this.fireMaximizeEvent()},function(){Ext.Logger.error("Timeout waiting for window.innerHeight to change",this);a=c[b]=this.getWindowHeight();this.setHeight(a);this.fireMaximizeEvent()},50,1000)}},getScreenHeight:function(){var a=this.getOrientation();return window.screen[a===this.PORTRAIT?"height":"width"]},onElementFocus:function(){if(this.getAutoMaximize()&&!this.isFullscreen()){clearTimeout(this.scrollToTopTimer)}this.callParent(arguments)},onElementBlur:function(){if(this.getAutoMaximize()&&!this.isFullscreen()){this.scrollToTopTimer=setTimeout(this.scrollToTop,500)}this.callParent(arguments)},onTouchStart:function(){if(this.focusedElement===null){this.scrollToTop()}},scrollToTop:function(){window.scrollTo(0,0)}},function(){if(!Ext.os.is.iOS){return}if(Ext.os.version.lt("3.2")){this.override({constructor:function(){var a=this.stretchHeights={};a[this.PORTRAIT]=416;a[this.LANDSCAPE]=268;return this.callOverridden(arguments)}})}if(Ext.os.version.lt("5")){this.override({fieldMaskClsTest:"-field-mask",doPreventZooming:function(b){var a=b.target;if(a&&a.nodeType===1&&!this.isInputRegex.test(a.tagName)&&a.className.indexOf(this.fieldMaskClsTest)==-1){b.preventDefault()}}})}if(Ext.os.is.iPad){this.override({isFullscreen:function(){return true}})}if(Ext.os.version.gtEq("7")){if(Ext.os.deviceType==="Tablet"||!Ext.browser.is.Safari||window.navigator.standalone){this.override({constructor:function(){var d={},b={},a=this.determineOrientation(),f=window.screen.height,c=window.screen.width,e=a===this.PORTRAIT?f-window.innerHeight:c-window.innerHeight;d[this.PORTRAIT]=f-e;d[this.LANDSCAPE]=c-e;b[this.PORTRAIT]=c;b[this.LANDSCAPE]=f;this.stretchHeights=d;this.stretchWidths=b;this.callOverridden(arguments);this.on("ready",this.setViewportSizeToAbsolute,this);this.on("orientationchange",this.setViewportSizeToAbsolute,this)},getWindowHeight:function(){var a=this.getOrientation();return this.stretchHeights[a]},getWindowWidth:function(){var a=this.getOrientation();return this.stretchWidths[a]},setViewportSizeToAbsolute:function(){this.setWidth(this.getWindowWidth());this.setHeight(this.getWindowHeight())}})}if(Ext.os.deviceType==="Tablet"){this.override({constructor:function(){this.callOverridden(arguments);window.addEventListener("scroll",function(){if(window.scrollX!==0){window.scrollTo(0,window.scrollY)}},false)},setViewportSizeToAbsolute:function(){window.scrollTo(0,0);this.callOverridden(arguments)},onElementBlur:function(){this.callOverridden(arguments);if(window.scrollY!==0){window.scrollTo(0,0)}}})}}});