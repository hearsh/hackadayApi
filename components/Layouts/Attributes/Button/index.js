function Button = () => {
	this.btn = null;
}

Button.prototype.GetButtonTag = function (content, className, onClick, disabled=null) {
	if(disabled) {
		this.btn = `<button class='btn ${className}}' onClick='${onClick}' disabled>${content}</button>`;
	} else {
		this.btn = `<button class='btn ${className}}' onClick='${onClick}'>${content}</button>`;
	}
	return this.btn;
}

module.exports = new Button();