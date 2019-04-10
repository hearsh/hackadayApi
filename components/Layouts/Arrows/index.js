function Arrows() {
	this.next = null;
	this.prev = null;
}

Arrows.prototype.getArrows = function(next=null, prev=null) {
	if(next) {
		this.next = `<button class='next'>Next</button>`;
	} else {
		this.next = `<button class='next' disabled>Next</button>`;
	}
	if(prev) {
		this.prev = `<button class='prev'>Prev</button>`;
	} else {
		this.prev = `<button class='prev' disabled>Prev</button>`;
	}
	return {
		'next': this.next,
		'prev': this.prev,
	}
}