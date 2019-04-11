function Arrows() {
	this.next = null;
	this.prev = null;
}

Arrows.prototype.getArrows = function(next=false, prev=false) {
	if(next) {
		this.next = `<button onClick="Change('${next}')" class='next btn'>Next</button>`;
	} else {
		this.next = `<button class='next btn' disabled>Next</button>`;
	}
	if(prev) {
		this.prev = `<button onClick="Change('${prev}')" class='prev btn'>Prev</button>`;
	} else {
		this.prev = `<button class='prev btn' disabled>Prev</button>`;
	}

	return `<div class='arrows'>${this.prev}${this.next}</div>`;
}

module.exports = new Arrows();