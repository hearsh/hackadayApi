function MaxHeap() {
	this.myHeap = [];
	this.maxHeapSize = 3;
}

MaxHeap.prototype.addToHeap = function(data) {
	if(this.myHeap.length < 4) {
		this.myHeap.unshift(data);
		this.heapefyDown();
	} else {
		if(this.myHeap[0].score < data.score) {
			this.myHeap.unshift(data);
			this.myHeap.pop();
		} else {
			this.myHeap.unshift(data);
		}
	}
}

MaxHeap.prototype.getParentIndex = function(index) {
	return parseInt((index + 1) / 2);
}

MaxHeap.prototype.getParent = function(index) {
	return this.myHeap[this.getParentIndex(index)];
}

MaxHeap.prototype.getLeftChildIndex = function(index) {
	return parseInt((index * 2) + 1);
}

MaxHeap.prototype.getLeftChild = function(index) {
	return this.myHeap[this.getLeftChildIndex(index)];
}

MaxHeap.prototype.getRightChildIndex = function(index) {
	return parseInt((index * 2) + 2);
}

MaxHeap.prototype.getRightChild = function(index) {
	return this.myHeap[this.getRightChildIndex(index)];
}

MaxHeap.prototype.swap = function(indexA, indexB) {
	let temp = this.myHeap[indexA];
	this.myHeap[indexA] = this.myHeap[indexB];
	this.myHeap[indexB] = temp;
}

MaxHeap.prototype.heapefyDown = function() {
	let index = 0;
	while(this.getLeftChild(index)) {
		if(this.myHeap[index].score < this.getLeftChild(index).score) {
			if(this.getRightChild(index) && 
				this.myHeap[index].score < this.getRightChild(index).score) {
				this.swap(index, this.getRightChildIndex(index));
				index = this.getRightChildIndex(index);
			} else {
				this.swap(index, this.getLeftChildIndex(index));
				index = this.getLeftChildIndex(index);
			}
		}
	}
}

MaxHeap.prototype.getHeap = function() {
	return this.myHeap;
}


module.exports = new MaxHeap();