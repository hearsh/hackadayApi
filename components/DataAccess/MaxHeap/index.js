function MaxHeap() {
	this.myHeap = [];
	this.maxHeapSize = 3;
}


MaxHeap.prototype.clearHeap = function() {
	/**
	This function clears the heap
	**/
	this.myHeap = [];
}

MaxHeap.prototype.getHeap = function() {
	/**
	This function will return the heap
	**/
	return this.myHeap;
}

MaxHeap.prototype.getLeftChildIndex = function(index) {
	/**
	Gets the Left Child Index
	**/
	return parseInt((index * 2) + 1);
}

MaxHeap.prototype.getRightChildIndex = function(index) {
	/**
	This function will return the right child
	**/
	return parseInt((index * 2) + 2);
}

MaxHeap.prototype.getParentIndex = function(index) {
	/**
	This function will return the parent index
	**/
	return parseInt((index - 1) / 2);
}

MaxHeap.prototype.hasLeftchild = function(index) {
	/**
	Checks if the node has a left child
	**/
	return this.getLeftChildIndex(index) < this.myHeap.length;
}

MaxHeap.prototype.hasRightChild = function(index) {
	/**
	Checks if the node has a right child
	**/
	return this.getRightChildIndex(index) < this.myHeap.length
}

MaxHeap.prototype.hasParent = function(index) {
	/**
	Checks if the child has a parent node
	**/
	return this.getParentIndex(index) >= 0
}

MaxHeap.prototype.getLeftChild = function(index) {
	/**
	Returns the left child value
	**/
	return this.myHeap[this.getLeftChildIndex(index)];
}

MaxHeap.prototype.getRightChild = function(index) {
	/**
	Returns the right child value
	**/
	return this.myHeap[this.getRightChildIndex(index)];
}

MaxHeap.prototype.getParent = function(index) {
	/**
	Returns the parent value
	**/
	return this.myHeap[this.getParentIndex(index)];
}

MaxHeap.prototype.swap = function(indexA, indexB) {
	/**
	Swaps the two indexes
	**/
	let temp = this.myHeap[indexA];
	this.myHeap[indexA] = this.myHeap[indexB];
	this.myHeap[indexB] = temp;
}

MaxHeap.prototype.checkForInsertion = function(value) {
	/** 
	Check if the value should be inserted or no
	**/
	for(let i = parseInt(this.maxHeapSize / 2); i < this.maxHeapSize; i++) {
		if(this.myHeap[i].score < value.score) {
			return i;
		}
	}
	return -1;
}

MaxHeap.prototype.addToHeap = function(value) {
	/**
	Add the value to the heap
	**/
	if(this.myHeap.length < 1) {
		this.myHeap.push(value);
		return;
	}
	if(this.myHeap.length < this.maxHeapSize) {
		this.myHeap.push(value);
		this.heapifyUp();
	} else {
		let index = this.checkForInsertion(value);
		if(index !== -1) {
			this.myHeap[index] = value;
			this.heapifyUp(index);
		}
	}
}

MaxHeap.prototype.heapifyUp = function(index=null) {
	/**
	Start from lowest and go up
	**/
	if(index === null) {
		index = this.myHeap.length - 1;
	}
	while(this.hasParent(index) && this.getParent(index).score < this.myHeap[index].score) {
		this.swap(this.getParentIndex(index), index);
		index = this.getParentIndex(index);
	}
}

MaxHeap.prototype.heapefyDown = function() {
	/**
	Start from the top and go down
	**/
	let index = 0;
	while(this.hasLeftchild(index)) {
		let smallChildIndex = this.getLeftChildIndex(index);
		if(this.hasRightChild(index) && this.myHeap[smallChildIndex].score < this.getRightChild(index).score) {
			smallChildIndex = this.getRightChildIndex(index);
		}
		if(this.myHeap[smallChildIndex].value > this.myHeap[index].score) {
			break;
		} else {
			this.swap(smallChildIndex, index);
		}
		index = smallChildIndex;
	}
}

module.exports = new MaxHeap();