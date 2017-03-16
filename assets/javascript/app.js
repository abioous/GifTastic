var topics = ["cat", "dog", "parrot", "rabbit"];

var app = {
	topics:[],
	render:function(){
		var buttons = $('#buttons');
		buttons.empty();
		for(var i =0;i<this.topics.length;i++){
			var button = $('<button>');
			button.text(this.topics[i]);
			buttons.append(button);

		}
	},

	addTopic:function(topic){
		this.topics.push(topic);
		this.render();

	},

	start:function(topics){
		this.topics = topics;
		this.render();
	},

};

$(document).ready(function(){
	var submit = $('#submit');
	submit.click(function(){
		var topic = $('#name').val();
		app.addTopic(topic);
		
	})
	app.start(topics);


})

