Ext.define("Ext.fx.easing.EaseOut",{extend:"Ext.fx.easing.Linear",alias:"easing.ease-out",config:{exponent:4,duration:1500},getValue:function(){var f=Ext.Date.now()-this.getStartTime(),d=this.getDuration(),b=this.getStartValue(),h=this.getEndValue(),a=this.distance,c=f/d,g=1-c,e=1-Math.pow(g,this.getExponent()),i=b+(e*a);if(f>=d){this.isEnded=true;return h}return i}});