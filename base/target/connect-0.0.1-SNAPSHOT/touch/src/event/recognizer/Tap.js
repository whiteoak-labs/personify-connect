Ext.define("Ext.event.recognizer.Tap",{extend:"Ext.event.recognizer.SingleTouch",handledEvents:["tap","tapcancel"],config:{moveDistance:8},onTouchStart:function(a){if(this.callSuper(arguments)===false){return false}this.startPoint=a.changedTouches[0].point},onTouchMove:function(b){var c=b.changedTouches[0],a=c.point;if(Math.abs(a.getDistanceTo(this.startPoint))>=this.getMoveDistance()){this.fire("tapcancel",b,[c],{touch:c});return this.fail(this.self.TOUCH_MOVED)}},onTouchEnd:function(a){var b=a.changedTouches[0];this.fire("tap",a,[b],{touch:b})}});