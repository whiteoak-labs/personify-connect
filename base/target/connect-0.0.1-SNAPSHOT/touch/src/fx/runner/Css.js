Ext.define("Ext.fx.runner.Css",{extend:"Ext.Evented",requires:["Ext.fx.Animation"],prefixedProperties:{transform:true,"transform-origin":true,perspective:true,"transform-style":true,transition:true,"transition-property":true,"transition-duration":true,"transition-timing-function":true,"transition-delay":true,animation:true,"animation-name":true,"animation-duration":true,"animation-iteration-count":true,"animation-direction":true,"animation-timing-function":true,"animation-delay":true},lengthProperties:{top:true,right:true,bottom:true,left:true,width:true,height:true,"max-height":true,"max-width":true,"min-height":true,"min-width":true,"margin-bottom":true,"margin-left":true,"margin-right":true,"margin-top":true,"padding-bottom":true,"padding-left":true,"padding-right":true,"padding-top":true,"border-bottom-width":true,"border-left-width":true,"border-right-width":true,"border-spacing":true,"border-top-width":true,"border-width":true,"outline-width":true,"letter-spacing":true,"line-height":true,"text-indent":true,"word-spacing":true,"font-size":true,translate:true,translateX:true,translateY:true,translateZ:true,translate3d:true},durationProperties:{"transition-duration":true,"transition-delay":true,"animation-duration":true,"animation-delay":true},angleProperties:{rotate:true,rotateX:true,rotateY:true,rotateZ:true,skew:true,skewX:true,skewY:true},lengthUnitRegex:/([a-z%]*)$/,DEFAULT_UNIT_LENGTH:"px",DEFAULT_UNIT_ANGLE:"deg",DEFAULT_UNIT_DURATION:"ms",formattedNameCache:{},constructor:function(){var a=Ext.feature.has.Css3dTransforms;if(a){this.transformMethods=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","skewX","skewY","scaleX","scaleY","scaleZ"]}else{this.transformMethods=["translateX","translateY","rotate","skewX","skewY","scaleX","scaleY"]}this.vendorPrefix=Ext.browser.getStyleDashPrefix();this.ruleStylesCache={};return this},getStyleSheet:function(){var c=this.styleSheet,a,b;if(!c){a=document.createElement("style");a.type="text/css";(document.head||document.getElementsByTagName("head")[0]).appendChild(a);b=document.styleSheets;this.styleSheet=c=b[b.length-1]}return c},applyRules:function(i){var g=this.getStyleSheet(),k=this.ruleStylesCache,j=g.cssRules,c,e,h,b,d,a,f;for(c in i){e=i[c];h=k[c];if(h===undefined){d=j.length;g.insertRule(c+"{}",d);h=k[c]=j.item(d).style}b=h.$cache;if(!b){b=h.$cache={}}for(a in e){f=this.formatValue(e[a],a);a=this.formatName(a);if(b[a]!==f){b[a]=f;if(f===null){h.removeProperty(a)}else{h.setProperty(a,f,"important")}}}}return this},applyStyles:function(d){var g,c,f,b,a,e;for(g in d){if(d.hasOwnProperty(g)){c=document.getElementById(g);if(!c){return this}f=c.style;b=d[g];for(a in b){if(b.hasOwnProperty(a)){e=this.formatValue(b[a],a);a=this.formatName(a);if(e===null){f.removeProperty(a)}else{f.setProperty(a,e,"important")}}}}}return this},formatName:function(b){var a=this.formattedNameCache,c=a[b];if(!c){if((Ext.os.is.Tizen||!Ext.feature.has.CssTransformNoPrefix)&&this.prefixedProperties[b]){c=this.vendorPrefix+b}else{c=b}a[b]=c}return c},formatValue:function(j,b){var g=typeof j,l=this.DEFAULT_UNIT_LENGTH,e,a,d,f,c,k,h;if(j===null){return""}if(g=="string"){if(this.lengthProperties[b]){h=j.match(this.lengthUnitRegex)[1];if(h.length>0){if(h!==l){Ext.Logger.error("Length unit: '"+h+"' in value: '"+j+"' of property: '"+b+"' is not valid for animation. Only 'px' is allowed")}}else{return j+l}}return j}else{if(g=="number"){if(j==0){return"0"}if(this.lengthProperties[b]){return j+l}if(this.angleProperties[b]){return j+this.DEFAULT_UNIT_ANGLE}if(this.durationProperties[b]){return j+this.DEFAULT_UNIT_DURATION}}else{if(b==="transform"){e=this.transformMethods;c=[];for(d=0,f=e.length;d<f;d++){a=e[d];c.push(a+"("+this.formatValue(j[a],a)+")")}return c.join(" ")}else{if(Ext.isArray(j)){k=[];for(d=0,f=j.length;d<f;d++){k.push(this.formatValue(j[d],b))}return(k.length>0)?k.join(", "):"none"}}}}return j}});