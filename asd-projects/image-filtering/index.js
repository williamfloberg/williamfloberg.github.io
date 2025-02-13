// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  //applyFilter(reddify);
  //applyFilter(decreaseBlue);
  //applyFilter(increaseGreen);
  applyFilterNoBackground(decreaseBlue);

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1: Create the applyFilter function here
function applyFilter(filterFunction) {
  for (let row = 0; row < image.length; row++) {
      for (let col = 0; col < image[row].length; col++) {
          let rgbString = image[row][col];
          let rgbNumbers = rgbStringToArray(rgbString);
          filterFunction(rgbNumbers);
          image[row][col] = rgbArrayToString(rgbNumbers);
      }
  }
}

// TODO 7: Create the applyFilterNoBackground function here
function applyFilterNoBackground(filterFunction) {
  const backgroundColor = image[0][0];
  for (var row = 0; row < image.length; row++) {
      for (var col = 0; col < image[row].length; col++) {
          if (image[row][col] !== backgroundColor) {
              var rgbString = image[row][col];
              var rgbNumbers = rgbStringToArray(rgbString);
              filterFunction(rgbNumbers);
              image[row][col] = rgbArrayToString(rgbNumbers);
          }
      }
  }
}

// TODO 5: Create the keepInBounds function
function keepInBounds(value) {
  return Math.min(255, Math.max(0, value));
}

// TODO 3: Create reddify function
function reddify(rgbNumbers) {
  rgbNumbers[RED] = 200;
}

// TODO 6: Create more filter functions
function decreaseBlue(rgbNumbers) {
  rgbNumbers[BLUE] = keepInBounds(rgbNumbers[BLUE] - 50);
}

function increaseGreen(rgbNumbers) {
  rgbNumbers[GREEN] = keepInBounds(rgbNumbers[GREEN] + 50);
}      
// CHALLENGE code goes below here
