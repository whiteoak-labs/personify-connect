Ext.define("Ext.fx.animation.Cube",{extend:"Ext.fx.animation.Abstract",alias:"animation.cube",config:{before:{},after:{},direction:"right",out:false},getData:function(){var m=this.getTo(),n=this.getFrom(),k=this.getBefore(),a=this.getAfter(),e=this.getOut(),j=this.getDirection(),b=this.getElement(),g=b.getWidth(),c=b.getHeight(),l=e?"100% 100%":"0% 0%",i=1,d=1,f={rotateY:0,translateZ:0},h={rotateY:0,translateZ:0};if(j=="left"||j=="right"){if(e){d=0.5;h.translateZ=g;h.rotateY=-90}else{i=0.5;f.translateZ=g;f.rotateY=90}}k["transform-origin"]=l;a["transform-origin"]=null;m.set("transform",h);n.set("transform",f);n.set("opacity",i);m.set("opacity",d);return this.callParent(arguments)}});