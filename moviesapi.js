$(document).ready(function(){
    
    $("#searchbtn").on("click",function(e){
      e.preventDefault();
      
      let query = $("#searchquery").val();
      let url = "http://www.omdbapi.com/?t="+query+"&apikey=988eb776";
      
    
      if(query !== ""){
        
        $.ajax({
          
          url: url,
          method: "GET",
          dataType: "json",
          
          beforeSend: function(){
            $("#loader").show();
          },
          
          complete: function(){
            $("#loader").hide();
          },
          
          success: function(movie){
            let output = "";
            
            
              output +=`
                <div class="col-lg-12  m6 s12">
                <h4><b>Name</b>: ${movie.Title}</h4>
                <img src="${movie.Poster}" class="responsive-img">
                <p><b>Type</b>: ${movie.Genre}</p>
                <p><b>Description</b>: ${movie.Plot}</p>
                <p><b>Director</b>: ${movie.Director}</p>
                <p><b>Released On</b>: ${movie.Released}</p>
                <p><b>IMDB Ratings</b>: ${movie.imdbRating}</p>
               
                </div>
              `;
            
            
            if(movie.Response == "True"){
              $("#movieResults").html(output);
               M.toast({
                html: "There you go",
                classes: 'green'
              });
              
            }else{
              let noMovie = `<div style='text-align:center; font-size:36px; margin-top:40px;'>This movie isn't available. Sorry about that.<br>Try searching for something else </div>`;
               $("#movieResults").html(noMovie);
              M.toast({
                html: "This movie isn't available",
                classes: 'red'
              });
            }
            
          },
          
          error: function(){
             let internetFailure = `
             <div style="font-size:34px; text-align:center; margin-top:40px;">Please check your internet connection and try again.
             
             </div>`;
             
            $("#movieResults").html(internetFailure);
             M.toast({
                html: "We encountered an error, please try again",
                classes: 'red'
              });
            console.log(error);
          }
          
          
        });
        
      }else{
        let missingVal = `<div style="font-size:34px; text-align:center; margin-top:40px;">Please enter any search term in the search engine</div>`;
        $("#movieResults").html(missingVal);
         M.toast({
                html: "Please enter something",
                classes: 'red'
              });
      }
      
    });
    
});