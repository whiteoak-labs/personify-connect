var exec = require("cordova/exec");

SMSComposer = function() {
	this.resultCallback = null;
};

SMSComposer.ComposeResultType = {
	Cancelled: 0,
	Sent: 1,
	Failed: 2,
	NotSent: 3
};

SMSComposer.prototype.showSMSComposer = function(toRecipients, body) {
	var args = {};

	if(toRecipients)
		args.toRecipients = toRecipients;

	if(body)
		args.body = body;

	exec(null, null, "SMSComposer", "showSMSComposer", [args]);
};

SMSComposer.prototype.showSMSComposerWithCB = function(cbFunction,toRecipients,body) {
	this.resultCallback = cbFunction;
	this.showSMSComposer.apply(this,[toRecipients,body]);
};

SMSComposer.prototype._didFinishWithResult = function(res) {
	this.resultCallback(res);
};


module.exports = new SMSComposer();
