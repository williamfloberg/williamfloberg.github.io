/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
//sorts the elements of the array from smallest to largest and updates swap counter 
async function bubbleSort(array) {
    for (var i = 0; i < array.length - 1; i++) { //creates for loop that increases in value while running through the array
        for (var j = array.length - 1; j > i; j--) { //creates for loop that decreases in value and compares the two elements 
            if (array[j].value < array[j - 1].value) {  //checks if array[j-1] is less than array[i], if it is then teh values get swapped
                swap(array, j, j - 1); //swaps values of j and j-1 indexes in the array  
                updateCounter(bubbleCounter); //updates the move count in the bubble section  
                await sleep(); //slows down the sorting to make it so that we can it happen
            }
        }
    }
}

// TODO 3: Implement quickSort
async function quickSort(array, left, right){
    if(right - left < 0){ //checks if the right index minus the left index is less than 0 
        return //stops function
    }

var index = await partition(array, left, right); 
if(left < index - 1){ //checks if left is less than index - 1
    await quickSort(array, left, index - 1); //calls the quicksort function
}

if (right > index){ //checks if right is greater than index
    await quickSort(array, index, right) //calls the quicksort function
}
}

// TODOs 4 & 5: Implement partition
async function partition(array, left, right){
    let pivot = array[Math.floor((right + left) / 2)].value; //creates a variable called pivot that selects the pivot amount by finding the middle index of the array
    while(left < right){ //loops until left and right pointers cross
        while(array[right].value > pivot){
            right--//moves right pointer leftward until a value less than pivot is found
        }
        while(array[left].value < pivot){
            left++ //moves left pointer rightward until a value greater than pivot is found
        }
        if(left < right){ //swap vlaues if left is still less than right
            swap(array, left, right); //swap elements at left and right pointers
            updateCounter(quickCounter); //update the swap counter for Quick Sort
            await sleep(); //pause to visualize swap
        }
    
    }
    
    
    return left + 1;    
}

// TODO 1: Implement swap
function swap(array, i, j){ //declares function swap with parameters array, i, and j
    var temp = array[i]; //stores array[i] in a temp variable
    array[i] = array[j] // stores array[j] in array[i]
    array[j] = temp; //changse array[j] value to temporary value
    drawSwap(array, i, j) //calls drawSwap function with changed variable
}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
}

// This function draws the swap on the screen
function drawSwap(array, i, j){ //declares function drawSwap with parameters array, i, and j
    let element1 = array[i]; //gets first element to swap
    let element2 = array[j]; //gets 2nd element to swap

    let temp = parseFloat($(element1.id).css("top")) + "px"; //stores current top position of element1

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px"); //sets element1's top position to element2's top position
    $(element2.id).css("top", temp); //sets element2's top position to the stored value
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}