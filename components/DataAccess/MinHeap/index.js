/*
Helper functions for a Min Heap.
Used to get the top three recomendations.
*/
function MinHeap() {
	this.myHeap = [];
	this.maxHeapSize = 3;
}


MinHeap.prototype.clearHeap = function() {
	/**
	This function clears the heap
	**/
	this.myHeap = [];
}

MinHeap.prototype.getHeap = function() {
	/**
	This function will return the heap
	**/
	return this.myHeap;
}

MinHeap.prototype.getLeftChildIndex = function(index) {
	/**
	Gets the Left Child Index
	**/
	return parseInt((index * 2) + 1);
}

MinHeap.prototype.getRightChildIndex = function(index) {
	/**
	This function will return the right child
	**/
	return parseInt((index * 2) + 2);
}

MinHeap.prototype.getParentIndex = function(index) {
	/**
	This function will return the parent index
	**/
	return parseInt((index - 1) / 2);
}

MinHeap.prototype.hasLeftchild = function(index) {
	/**
	Checks if the node has a left child
	**/
	return this.getLeftChildIndex(index) < this.myHeap.length;
}

MinHeap.prototype.hasRightChild = function(index) {
	/**
	Checks if the node has a right child
	**/
	return this.getRightChildIndex(index) < this.myHeap.length
}

MinHeap.prototype.hasParent = function(index) {
	/**
	Checks if the child has a parent node
	**/
	return this.getParentIndex(index) >= 0
}

MinHeap.prototype.getLeftChild = function(index) {
	/**
	Returns the left child value
	**/
	return this.myHeap[this.getLeftChildIndex(index)];
}

MinHeap.prototype.getRightChild = function(index) {
	/**
	Returns the right child value
	**/
	return this.myHeap[this.getRightChildIndex(index)];
}

MinHeap.prototype.getParent = function(index) {
	/**
	Returns the parent value
	**/
	return this.myHeap[this.getParentIndex(index)];
}

MinHeap.prototype.swap = function(indexA, indexB) {
	/**
	Swaps the two indexes
	**/
	let temp = this.myHeap[indexA];
	this.myHeap[indexA] = this.myHeap[indexB];
	this.myHeap[indexB] = temp;
}

MinHeap.prototype.checkForInsertion = function(value) {
	/** 
	Check if the value should be inserted or no
	**/
	let smallIndex = -1;
	for(let i = parseInt(this.maxHeapSize / 2); i < this.maxHeapSize; i++) {
		if(this.myHeap[i].score < value.score) {
			smallIndex =  i;
		}
	}
	return smallIndex;
}

MinHeap.prototype.addToHeap = function(value) {
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
	} else if(value.score > this.myHeap[0].score) {
		this.myHeap[0] = value;
		this.heapifyDown();
	}
}

MinHeap.prototype.heapifyUp = function(index=null) {
	/**
	Start from lowest and go up
	**/
	if(index === null) {
		index = this.myHeap.length - 1;
	}
	while(this.hasParent(index) && this.getParent(index).score > this.myHeap[index].score) {
		let smallChildIndex = index;
		let parentIndex = this.getParentIndex(index)
		if(this.hasRightChild(parentIndex) && this.getLeftChild(parentIndex).score < this.myHeap[smallChildIndex].score) {
			smallChildIndex = this.getLeftChildIndex(parentIndex);
		}
		if(this.myHeap[parentIndex].score > this.myHeap[smallChildIndex].score) {
			this.swap(parentIndex, smallChildIndex);
		}
		index = parentIndex;
	}
}

MinHeap.prototype.heapifyDown = function() {
	/**
	Start from the top and go down
	**/
	let index = 0;
	while(this.hasLeftchild(index)) {
		let smallChildIndex = this.getLeftChildIndex(index);
		if(this.hasRightChild(index) && this.myHeap[smallChildIndex].score > this.getRightChild(index).score) {
			smallChildIndex = this.getRightChildIndex(index);
		}
		if(this.myHeap[smallChildIndex].value < this.myHeap[index].score) {
			this.swap(smallChildIndex, index);
		}
		index = smallChildIndex;
	}
}

module.exports = new MinHeap();