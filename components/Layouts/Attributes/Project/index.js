function Project() {
	this.className = null;
}

Project.prototype.getProjectTag = function(className) {
	this.className = className;
	return `<Project class='${this.className ? this.className : ''}' id='project'></Project>`;
}

module.exports = new Project();