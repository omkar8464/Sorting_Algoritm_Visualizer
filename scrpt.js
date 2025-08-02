let array = [];
let delay = 50; // Default speed

function generateArray(size = 10) {
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    renderArray();
    updateDescription("Array generated. Select the 'Sorting Algorigthm'  to visualize sorting.");
    let info = document.getElementById("complexity-info");
    info.innerHTML = "";
}

function renderArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    array.forEach((value) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        bar.style.width = `${100 / array.length}%`;
        bar.innerHTML = `<span>${value}</span>`;
        container.appendChild(bar);
    });
}

window.onload = () => generateArray();


function updateDescription(text) {
    const description = document.getElementById('description');
    description.textContent = text;
}

async function startSorting() {
    const algorithm = document.getElementById('algorithm-select').value;
    delay = 1000 - document.getElementById('speed').value; // Adjust delay based on speed
    console.log(document.getElementById("speed").value);

    switch (algorithm) {
        case 'bubbleSort':
            await bubbleSort();
            break;
        case 'selectionSort':
            await selectionSort();
            break;
        case 'insertionSort':
            await insertionSort();
            break;
        case 'quickSort':
            await quickSort(0, array.length - 1);
            break;
        case 'mergeSort':
            await mergeSort(array,0, array.length - 1);
            break;
        case 'heapSort':
            await heapSort();
            break;
        case 'radixSort':
            await radixSort();
            break;
        case 'countingSort':
            await countingSort();
            break;
        case 'shellSort':
            await shellSort();
            break;
        default:
            break;
    }
    showComplexityInfo();
}

async function bubbleSort() {
    let bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].classList.add('highlight');
            bars[j + 1].classList.add('highlight');
            updateDescription(`Comparing ${array[j]} and ${array[j + 1]}`);
            await delayAnimation();

            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = `${array[j] * 3}px`;
                bars[j].innerHTML = `<span>${array[j]}</span>`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;
                bars[j + 1].innerHTML = `<span>${array[j + 1]}</span>`;
                await delayAnimation();
            }

            bars[j].classList.remove('highlight');
            bars[j + 1].classList.remove('highlight');
        }
        bars[array.length - i - 1].classList.add('sorted');
    }
    updateDescription("Sorting completed!");
}

async function selectionSort() {
    let bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;

        // Highlight the current position
        bars[i].classList.add('highlight');
        updateDescription(`Finding minimum value in the unsorted portion of the array`);
        await delayAnimation();

        for (let j = i + 1; j < array.length; j++) {
            bars[j].classList.add('highlight');
            updateDescription(`Comparing ${array[j]} and ${array[minIdx]}`);
            await delayAnimation();
            
            if (array[j] < array[minIdx]) {
                // Remove highlight from the previous minimum index
                bars[minIdx].classList.remove('highlight');
                minIdx = j;
                bars[minIdx].classList.add('highlight');
            } else {
                bars[j].classList.remove('highlight');
            }
        }

        if (minIdx !== i) {
            // Swap the values
            let temp = array[i];
            array[i] = array[minIdx];
            array[minIdx] = temp;

            // Update the bars to reflect the swap
            bars[i].style.height = `${array[i] * 3}px`;
            bars[i].innerHTML = `<span>${array[i]}</span>`;
            bars[minIdx].style.height = `${array[minIdx] * 3}px`;
            bars[minIdx].innerHTML = `<span>${array[minIdx]}</span>`;
            await delayAnimation();
        }

        // Mark the current position as sorted
        bars[i].classList.add('sorted');
        bars[i].classList.remove('highlight');
    }
    updateDescription("Sorting completed!");
    // renderArray(); // Ensure the final sorted array is displayed
}
async function insertionSort() {
    let bars = document.getElementsByClassName('bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        // Highlight the key bar
        bars[i].classList.add('highlight');
        updateDescription(`Inserting ${key} into the sorted portion of the array`);
        await delayAnimation();

        // Shift elements of array[0..i-1] that are greater than key
        while (j >= 0 && array[j] > key) {
            bars[j].classList.add('highlight');
            bars[j + 1].style.height = `${array[j] * 3}px`;
            bars[j + 1].innerHTML = `<span>${array[j]}</span>`;
            array[j + 1] = array[j];
            j--;
            await delayAnimation();
        }

        // Insert the key at the correct position
        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 3}px`;
        bars[j + 1].innerHTML = `<span>${key}</span>`;
        bars[j + 1].classList.remove('highlight');
        await delayAnimation();

        // Mark the current position as sorted
        for (let k = 0; k <= i; k++) {
            bars[k].classList.add('sorted');
        }
    }
    updateDescription("Sorting completed!");
    // renderArray(); // Ensure the final sorted array is displayed
}


async function quickSort(left, right) {
    if (left < right) {
        let pivotIndex = await partition(left, right);
        await quickSort(left, pivotIndex - 1);
        await quickSort(pivotIndex + 1, right);
        let bars = document.getElementsByClassName("bar");
        for (let i = left; i <= right; i++) {
            bars[i].classList.add("sorted");
    }
}
}

async function partition(left, right) {
    let bars = document.getElementsByClassName('bar');
    let pivot = array[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
        bars[j].classList.add('highlight');
        updateDescription(`Comparing ${array[j]} with pivot ${pivot}`);
        await delayAnimation();

        if (array[j] <= pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];

            bars[i].style.height = `${array[i] * 3}px`;
            bars[i].innerHTML = `<span>${array[i]}</span>`;
            bars[j].style.height = `${array[j] * 3}px`;
            bars[j].innerHTML = `<span>${array[j]}</span>`;
            await delayAnimation();
        }
        bars[j].classList.remove('highlight');
    }

    // Place pivot in the correct position
    [array[i + 1], array[right]] = [array[right], array[i + 1]];
    bars[i + 1].style.height = `${array[i + 1] * 3}px`;
    bars[i + 1].innerHTML = `<span>${array[i + 1]}</span>`;
    bars[right].style.height = `${array[right] * 3}px`;
    bars[right].innerHTML = `<span>${array[right]}</span>`;
    await delayAnimation();

    return i + 1;
}
async function mergeSort(array, start, end) {
    if (start >= end) return;

    let mid = Math.floor((start + end) / 2);

    // Recursively sort the two halves
    await mergeSort(array, start, mid);
    await mergeSort(array, mid + 1, end);

    // Merge the sorted halves
    await merge(array, start, mid, end);
}

async function merge(array, start, mid, end) {
    let bars = document.getElementsByClassName('bar');
    let leftArray = array.slice(start, mid + 1);
    let rightArray = array.slice(mid + 1, end + 1);

    let leftIndex = 0;
    let rightIndex = 0;
    let sortedIndex = start;

    // Highlight the current section being merged
    for (let i = start; i <= end; i++) {
        bars[i].classList.add('highlight');
    }
    updateDescription(`Merging sections from ${start} to ${end}`);
    await delayAnimation();

    // Merge the two halves into a sorted array
    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
        if (leftArray[leftIndex] <= rightArray[rightIndex]) {
            array[sortedIndex] = leftArray[leftIndex];
            bars[sortedIndex].style.height = `${leftArray[leftIndex] * 3}px`;
            bars[sortedIndex].innerHTML = `<span>${leftArray[leftIndex]}</span>`;
            leftIndex++;
        } else {
            array[sortedIndex] = rightArray[rightIndex];
            bars[sortedIndex].style.height = `${rightArray[rightIndex] * 3}px`;
            bars[sortedIndex].innerHTML = `<span>${rightArray[rightIndex]}</span>`;
            rightIndex++;
        }
        sortedIndex++;
        await delayAnimation();
    }

    // Copy remaining elements from leftArray, if any
    while (leftIndex < leftArray.length) {
        array[sortedIndex] = leftArray[leftIndex];
        bars[sortedIndex].style.height = `${leftArray[leftIndex] * 3}px`;
        bars[sortedIndex].innerHTML = `<span>${leftArray[leftIndex]}</span>`;
        leftIndex++;
        sortedIndex++;
        await delayAnimation();
    }

    // Copy remaining elements from rightArray, if any
    while (rightIndex < rightArray.length) {
        array[sortedIndex] = rightArray[rightIndex];
        bars[sortedIndex].style.height = `${rightArray[rightIndex] * 3}px`;
        bars[sortedIndex].innerHTML = `<span>${rightArray[rightIndex]}</span>`;
        rightIndex++;
        sortedIndex++;
        await delayAnimation();
    }

    // Remove highlight from the bars after merging
    for (let i = start; i <= end; i++) {
        bars[i].classList.remove('highlight');
        bars[i].classList.add('sorted');
    }
    updateDescription(`Merged sections from ${start} to ${end}`);
}

// async function heapSort() {
//     let bars = document.getElementsByClassName('bar');

//     function heapify(n, i) {
//         let largest = i;
//         let left = 2 * i + 1;
//         let right = 2 * i + 2;

//         if (left < n && array[left] > array[largest]) largest = left;
//         if (right < n && array[right] > array[largest]) largest = right;
//         if (largest !== i) {
//             [array[i], array[largest]] = [array[largest], array[i]];
//             renderArray();
//             heapify(n, largest);
//         }
//     }

//     let n = array.length;
//     for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
//         heapify(n, i);
//     }
//     for (let i = n - 1; i >= 0; i--) {
//         [array[0], array[i]] = [array[i], array[0]];
//         renderArray();
//         heapify(i, 0);
//     }
//     updateDescription("Sorting completed!");
// }

// async function radixSort() {
//     let bars = document.getElementsByClassName('bar');
//     let max = Math.max(...array);
//     let exp = 1;

//     while (Math.floor(max / exp) > 0) {
//         await countingSort(exp);
//         exp *= 10;
//     }
//     updateDescription("Sorting completed!");
// }

// async function countingSort(exp) {
//     let bars = document.getElementsByClassName('bar');
//     let output = new Array(array.length);
//     let count = new Array(10).fill(0);

//     for (let i = 0; i < array.length; i++) {
//         count[Math.floor(array[i] / exp) % 10]++;
//     }
//     for (let i = 1; i < 10; i++) {
//         count[i] += count[i - 1];
//     }
//     for (let i = array.length - 1; i >= 0; i--) {
//         output[count[Math.floor(array[i] / exp) % 10] - 1] = array[i];
//         count[Math.floor(array[i] / exp) % 10]--;
//     }
//     for (let i = 0; i < array.length; i++) {
//         array[i] = output[i];
//         bars[i].style.height = `${array[i] * 3}px`;
//         bars[i].innerHTML = `<span>${array[i]}</span>`;
//         await delayAnimation();
//     }
// }

// async function shellSort() {
//     let bars = document.getElementsByClassName('bar');
//     let n = array.length;
//     let gap = Math.floor(n / 2);

//     while (gap > 0) {
//         for (let i = gap; i < n; i++) {
//             let temp = array[i];
//             let j = i;
//             while (j >= gap && array[j - gap] > temp) {
//                 array[j] = array[j - gap];
//                 bars[j].style.height = `${array[j] * 3}px`;
//                 bars[j].innerHTML = `<span>${array[j]}</span>`;
//                 j -= gap;
//                 await delayAnimation();
//             }
//             array[j] = temp;
//             bars[j].style.height = `${array[j] * 3}px`;
//             bars[j].innerHTML = `<span>${array[j]}</span>`;
//             await delayAnimation();
//         }
//         gap = Math.floor(gap / 2);
//     }
//     updateDescription("Sorting completed!");
// }

function delayAnimation() {
    return new Promise(resolve => setTimeout(resolve, 500));
}

function showComplexityInfo() {
    const complexityInfo = document.getElementById('complexity-info');
    let algorithm = document.getElementById('algorithm-select').value;

    // Time complexities for sorting algorithms
    let complexities = {
        'bubbleSort': 'O(n^2)',
        'selectionSort': 'O(n^2)',
        'insertionSort': 'O(n^2)',
        'quickSort': 'O(n log n)',
        'mergeSort': 'O(n log n)',
        'heapSort': 'O(n log n)',
        'radixSort': 'O(nk)',
        'countingSort': 'O(n + k)',
        'shellSort': 'O(n log n) to O(n^2)'
    };

    // Space complexities for sorting algorithms
    let spaceComplexities = {
        'bubbleSort': 'O(1)',
        'selectionSort': 'O(1)',
        'insertionSort': 'O(1)',
        'quickSort': 'O(log n)',
        'mergeSort': 'O(n)',
        'heapSort': 'O(1)',
        'radixSort': 'O(n + k)',
        'countingSort': 'O(k)',
        'shellSort': 'O(1)'
    };

    // Display both time and space complexities
    complexityInfo.innerHTML = `Time Complexity of ${algorithm}: ${complexities[algorithm]}<br>Space Complexity of ${algorithm}: ${spaceComplexities[algorithm]}`;
}