Ext.define("Ext.fx.layout.card.Pop",{extend:"Ext.fx.layout.card.Style",alias:"fx.layout.card.pop",config:{duration:500,inAnimation:{type:"pop",easing:"ease-out"},outAnimation:{type:"pop",easing:"ease-in",out:true}},updateDuration:function(d){var c=d/2,b=this.getInAnimation(),a=this.getOutAnimation();b.setDelay(c);b.setDuration(c);a.setDuration(c)}});