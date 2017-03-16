var topics = ["cat", "dog", "parrot", "rabbit"];

var app = {
    topics:[],
    render:function(){
        var buttons = $('#buttons');
        buttons.empty();
        for(var i =0;i<this.topics.length;i++){
            var button = $('<button>');
            button.text(this.topics[i]);
            button.attr('data-topic', this.topics[i])
            buttons.append(button);
            button.click(function() {
                var topic = $(this).attr('data-topic');
                app.getTopicInfo(topic)
            })

        }
    },
    renderTopic:function(data) {
        console.log(data);
        $('#images').empty();
        for(var i = 0;i<data.length;i++) {
             var item = $("<div>");
            // Creating a paragraph tag with the result item's rating
            var rating = $("<p>").text("Rating: " + data[i].rating);

            // Creating and storing an image tag
            var image = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            image.attr("src", data[i].images.fixed_height_still.url);
            image.attr("data-state", "still"); //assign original image type

            //set attribute for  still image url
            image.attr("data-still-image-url", data[i].images.fixed_height_still.url);
            
            //set attribute for animated image url
            image.attr("data-animated-image-url", data[i].images.fixed_height.url);
            
            //append rating
            item.append(rating);
            //append image
            item.append(image);
            //add flex at 33% with wrap
            item.addClass('flex-33');
            //swap image function
            image.click(function() {
                //if still set image src to animated image and update state
                if($(this).attr('data-state') == 'still') {
                    $(this).attr("src", $(this).attr("data-animated-image-url"));
                    $(this).attr('data-state', 'animated')
                } else {
                    //set image src with still image url and update state
                    $(this).attr("src", $(this).attr("data-still-image-url"));
                    $(this).attr('data-state', 'still')
                }
            })

            $('#images').append(item)
        }    
    },
    getTopicInfo:function(topic) {
         // Constructing a queryURL using the topic
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })// After data comes back from the request
        .done(function(response) {
            app.renderTopic(response.data)
        })
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