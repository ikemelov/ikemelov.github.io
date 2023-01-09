const canvas = document.getElementById("myCanvas");
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;



var generateButton = document.getElementById('generateButton');

var data = [];

// attach a click event listener to the button
function generateAndDisplayData() {
    data = [];
    for (let i = 0; i < 50; i++) {
        data.push(Math.random());
    }

    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // customize the appearance of the lines
    context.strokeStyle = 'green';
    context.lineWidth = 4;

    // start a new path
    context.beginPath();

    // draw the lines
    for (let i = 0; i < data.length; i++) {
        context.moveTo(i * 8, 500 - data[i] * 500);
        context.lineTo(i * 8, 500);
        context.stroke();
    }
}

// attach a click event listener to the button
generateButton.addEventListener('click', generateAndDisplayData);

// generate and display the data when the page first loads
generateAndDisplayData();


// Event Listener for bubble sort
const bubbleSortButton = document.getElementById('bubbleSortButton');
bubbleSortButton.addEventListener('click', async function() {
    // disable the button
    bubbleSortButton.disabled = true;

    // disable the "Generate New Numbers" button
    generateButton.disabled = true;

    // sort the data using bubble sort
    await bubbleSort(data);

    // enable the button
    bubbleSortButton.disabled = false;

    // enable the "Generate New Numbers" button
    generateButton.disabled = false;

    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // customize the appearance of the lines
    context.strokeStyle = 'green';
    context.lineWidth = 4;

    // start a new path
    context.beginPath();

    // draw the lines
    for (var i = 0; i < data.length; i++) {
        context.moveTo(i * 8, 500 - data[i] * 500);
        context.lineTo(i * 8, 500);
        context.stroke();
    }
});


// Event Listener for Insertion sort
const insertionSortButton = document.getElementById('insertionSortButton');
insertionSortButton.addEventListener('click', async function() {
  // disable the button
  insertionSortButton.disabled = true;

  // disable the "Generate New Numbers" button
  generateButton.disabled = true;

  // sort the data using insertion sort
  await insertionSort(data, 100);

  // enable the button
  insertionSortButton.disabled = false;

  // enable the "Generate New Numbers" button
  generateButton.disabled = false;

  // clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // customize the appearance of the lines
  context.strokeStyle = 'green';
  context.lineWidth = 4;

  // start a new path
  context.beginPath();

  // draw the lines
  for (var i = 0; i < data.length; i++) {
    context.moveTo(i * 8, 500 - data[i] * 500);
    context.lineTo(i * 8, 500);
    context.stroke();
  }
});



const mergeSortButton = document.getElementById('mergeSortButton');
mergeSortButton.addEventListener('click', function() {
    // sort the data using merge sort
    mergeSort(data).then(sortedData => {
        // update the data array with the sorted data
        data = sortedData;

        // clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // customize the appearance of the lines
        context.strokeStyle = 'green';
        context.lineWidth = 4;

        // start a new path
        context.beginPath();

        // draw the lines
        for (let i = 0; i < data.length; i++) {
            context.moveTo(i * 8, 500 - data[i] * 500);
            context.lineTo(i * 8, 500);
            context.stroke();
        }
    });
});




// add a global variable for the delay
let delay = 100;

async function bubbleSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                // update the canvas after each swap
                context.clearRect(0, 0, canvas.width, canvas.height);

                
                context.beginPath();
                for (var k = 0; k < data.length; k++) {
                    context.moveTo(k * 8, 500 - data[k] * 500);
                    context.lineTo(k * 8, 500);
                    context.stroke();
                    //context.closePath();
                }

                // delay the execution of the next iteration
                // to visualize the sorting process
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
}

// Insertion sort
async function insertionSort(arr, delay) {
    for (var i = 1; i < arr.length; i++) {
      var current = arr[i];
      var j = i - 1;
      while (j >= 0 && arr[j] > current) {
        arr[j + 1] = arr[j];
        j--;
  
        // update the canvas after each iteration
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        for (var k = 0; k < data.length; k++) {
          context.moveTo(k * 8, 500 - data[k] * 500);
          context.lineTo(k * 8, 500);
          context.stroke();
        }
  
        // delay the execution of the next iteration
        // to visualize the sorting process
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      arr[j + 1] = current;
    }
  }
  
   
  
  




// add a "2X" button
const speedButton = document.getElementById('speedButton');
speedButton.addEventListener('click', function() {
    // double the value of the delay
    delay /= 2;
});

// add a reset button
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', function() {
    // set the value of the delay back to the starting value
    delay = 100;
});





//Merge sort

/*
async function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    const sortedLeft = await mergeSort(left);
    const sortedRight = await mergeSort(right);

    let leftIndex = 0;
    let rightIndex = 0;
    let resultIndex = 0;
    const result = [];
    while (leftIndex < sortedLeft.length && rightIndex < sortedRight.length) {
        if (sortedLeft[leftIndex] < sortedRight[rightIndex]) {
            result[resultIndex++] = sortedLeft[leftIndex++];
        } else {
            result[resultIndex++] = sortedRight[rightIndex++];
        }
        // update the canvas to visualize the current state of the array
        updateCanvas(arr, leftIndex, rightIndex);
        // delay the next iteration
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    return result
        .concat(sortedLeft.slice(leftIndex))
        .concat(sortedRight.slice(rightIndex));
}

function updateCanvas(arr, leftIndex, rightIndex) {
    // customize the appearance of the lines
    context.strokeStyle = 'green';
    context.lineWidth = 1;

    // start a new path
    context.beginPath();

    // draw the lines
    for (let i = 0; i < arr.length; i++) {
        if (i === leftIndex || i === rightIndex) {
            // change the color of the line being compared to red
            context.strokeStyle = 'red';
        }
        context.moveTo(i * 8, 500 - arr[i] * 500);
        context.lineTo(i * 8, 500);
        context.stroke();
        // change the color back to green
        context.strokeStyle = 'green';
    }
}
*/
