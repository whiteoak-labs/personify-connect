Ext.define("Ext.fx.runner.CssAnimation",{extend:"Ext.fx.runner.Css",constructor:function(){this.runningAnimationsMap={};this.elementEndStates={};this.animationElementMap={};this.keyframesRulesCache={};this.uniqueId=0;return this.callParent(arguments)},attachListeners:function(){var a=this.getEventDispatcher();this.listenersAttached=true;a.addListener("element","*","animationstart","onAnimationStart",this);a.addListener("element","*","animationend","onAnimationEnd",this)},onAnimationStart:function(g){var b=g.browserEvent.animationName,a=this.animationElementMap[b],f=this.runningAnimationsMap[a][b],h=this.elementEndStates,c=h[a],d={};console.log("START============= "+b);if(c){delete h[a];d[a]=c;this.applyStyles(d)}if(f.before){d[a]=f.before;this.applyStyles(d)}},onAnimationEnd:function(i){var c=i.target,b=i.browserEvent.animationName,d=this.animationElementMap,a=d[b],f=this.runningAnimationsMap,h=f[a],g=h[b];console.log("END============= "+b);if(g.onBeforeEnd){g.onBeforeEnd.call(g.scope||this,c)}if(g.onEnd){g.onEnd.call(g.scope||this,c)}delete d[b];delete h[b];this.removeKeyframesRule(b)},generateAnimationId:function(){return"animation-"+(++this.uniqueId)},run:function(f){var s={},t=this.elementEndStates,o=this.animationElementMap,r=this.runningAnimationsMap,b,d,h,k,p,g,q,u,m,l,c,e,a,j,n;if(!this.listenersAttached){this.attachListeners()}f=Ext.Array.from(f);for(p=0,g=f.length;p<g;p++){q=f[p];q=Ext.factory(q,Ext.fx.Animation);h=q.getElement().getId();k=q.getName()||this.generateAnimationId();o[k]=h;q=q.getData();d=q.states;this.addKeyframesRule(k,d);b=r[h];if(!b){b=r[h]={}}b[k]=q;l=[];c=[];e=[];a=[];j=[];n=[];for(u in b){if(b.hasOwnProperty(u)){m=b[u];l.push(u);c.push(m.duration);e.push(m.easing);a.push(m.delay);j.push(m.direction);n.push(m.iteration)}}s[h]={"animation-name":l,"animation-duration":c,"animation-timing-function":e,"animation-delay":a,"animation-direction":j,"animation-iteration-count":n};if(q.preserveEndState){t[h]=d["100%"]}}this.applyStyles(s)},addKeyframesRule:function(a,c){var k,e,b,g,i,j,d,h,f;g=this.getStyleSheet();i=g.cssRules;d=i.length;g.insertRule("@"+this.vendorPrefix+"keyframes "+a+"{}",d);b=i[d];for(k in c){e=c[k];i=b.cssRules;d=i.length;j=[];for(h in e){f=this.formatValue(e[h],h);h=this.formatName(h);j.push(h+":"+f)}b.insertRule(k+"{"+j.join(";")+"}",d)}return this},removeKeyframesRule:function(a){var f=this.getStyleSheet(),e=f.cssRules,b,c,d;for(b=0,c=e.length;b<c;b++){d=e[b];if(d.name===a){f.removeRule(b);break}}return this}});