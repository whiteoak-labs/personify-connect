Ext.define("Ext.util.paintmonitor.CssAnimation",{extend:"Ext.util.paintmonitor.Abstract",eventName:Ext.browser.is.WebKit?"webkitAnimationEnd":"animationend",monitorClass:"cssanimation",onElementPainted:function(a){if(a.animationName==="x-paint-monitor-helper"){this.getCallback().apply(this.getScope(),this.getArgs())}}});