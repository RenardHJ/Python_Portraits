let isValid = false;
let imageDownloadable = false;
let file;
let drawMethod = "drawMethod1";
let json;

$(document).ready(function()
{
  console.log("Document Loaded.");
  var canvas = document.getElementById("drawingCanvas");

  canvas.height = 500;
  canvas.width = 500;
});

// check if a correct file type is selected
$("#fileinput").change(function()
{
  if (this.value.substr(this.value.length - 3) != ".py" && this.value.substr(this.value.length - 4) != ".ppc") {
    isValid = false;
    alert("Not a .py file!");
  } else {
    //isValid = true;
    file = this.value;
    fileName = file.split('.')[0];
    fileName = fileName.split("C:\\fakepath\\")[1];
    file = this.files[0];

    if (this.value.substr(this.value.length - 3) == ".py")
    {
      // parser.js
      //json = parse();
      var reader = new FileReader();
      reader.onload = function (progressEvent) {
        var lines = this.result.split('\n');
        json = parserFunction(lines);
        isValid = true;
      }
    }
    else
    {
      var reader = new FileReader();
      reader.onload = function (progressEvent) {
        // Entire file
        json = JSON.parse(this.result);
        isValid = true;
      }
    }
  };
  console.log(json);
  reader.readAsText(file);
});

// navigate the tab
$(".nav a").on("click", function(){

    if(!$(this).parent().hasClass("disabled"))
    {
        $(".nav .active").removeClass("active");
        $(this).parent().addClass("active");

        drawMethod = $(this).parent().attr('id');
    }

  return false;
});

// If create image button is clicked
$(".createPic").on("click", function()
{
  if (!isValid) alert("No .py or .ppc file!");
  else {
    switch (drawMethod) {
      case "drawMethod1":
        imageDownloadable = false;
        temp2();
        imageDownloadable = true;
        break;
    }
  }

  return false;
});

$(".clearCanvas").on("click", function()
{
    var canvas = document.getElementById("drawingCanvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
});
