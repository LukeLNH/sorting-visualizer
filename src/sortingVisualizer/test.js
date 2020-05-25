let arr = [5,2,3,1,4,8,6,7];

console.log(arr);

function mergeSort(barArray) {
    if (barArray.length <= 1) return; //guard for natural recursion

        let middleIndex = Math.floor(barArray.length / 2);
        let tempLeftArray = barArray.slice(0, middleIndex);
        let tempRightArray = barArray.slice(middleIndex, barArray.length);


        mergeSort(tempLeftArray);
        mergeSort(tempRightArray);

        for (let i = 0; i < barArray.length; i++) {
            if (tempLeftArray.length <= 0) {
                barArray.splice(i);
                tempRightArray.forEach(element => barArray.push(element));
                break;
            } else if (tempRightArray.length <= 0) {
                barArray.splice(i);
                tempLeftArray.forEach(element => barArray.push(element));
                break;
            }

            if (tempLeftArray[0] < tempRightArray[0]) {
                barArray[i] = tempLeftArray.shift();
            } else {
                barArray[i] = tempRightArray.shift();
            }
        }

    }


    function mergeSort2(barArray) {
        mergeSortHelper(barArray, 0, barArray.length - 1);
        
    }
    
    function mergeSortHelper(barArray, absLowIndex, absHighIndex) {
        if (barArray.length <= 1) return; //guard for natural recursion
        
    
        let midIndex = Math.floor(barArray.length / 2);

    
        let leftArray = barArray.slice(0, midIndex);
        let rightArray = barArray.slice(midIndex, barArray.length);
    
        mergeSortHelper(leftArray, absLowIndex, absLowIndex + midIndex);
        mergeSortHelper(rightArray, absLowIndex + midIndex, absHighIndex);
    
        mergeSortMerger(barArray, leftArray, rightArray, absLowIndex, absHighIndex);
    
    }
    
    function mergeSortMerger(barArray, leftArray, rightArray, absLowIndex, absHighIndex) {
        for (let i = 0; i < barArray.length; i++) {
            if (leftArray.length <= 0) {
                barArray.splice(i);
    
                for (let j = 0; j < rightArray.length; j++) {
                    barArray.push(rightArray[j]);
                    
                }
                break;
    
            } else if (rightArray.length <= 0) {
                barArray.splice(i);
                for (let j = 0; j < leftArray.length; j++) {
                    barArray.push(leftArray[j]);
                    
                }
                break;
            }
    
            if (leftArray[0] < rightArray[0]) {
                barArray[i] = leftArray.shift();
            } else {
                barArray[i] = rightArray.shift();
            }
        }
    }

function combSort(barArray) {
    let gap = barArray.length;

    let swap = true;
    while (gap !== 1 || swap === true) {
        gap = combSortHelper(gap);
        swap = false;
        for (let i = 0; i < barArray.length - gap; i++) {
            if (barArray[i] > barArray[i + gap]) {
                let temp = barArray[i];
                barArray[i] = barArray[i + gap];
                barArray[i + gap] = temp;
                swap = true;
            }
        }
    }

}

function combSortHelper(gap) {
    //the "shrink factor" will be 1.3
    gap = Math.floor(gap / 1.3);
    return (gap <=1? 1 : gap);
}

function bubbleSort(barArray) {
    for (let i = 0; i < barArray.length; i++) {
        for (let j = 0; j < barArray.length - i - 1; j++) {
            if (barArray[j] > barArray[j+1]) {
                let temp = barArray[j];
                barArray[j] = barArray[j + 1];
                barArray[j + 1] = temp;
            }
        }
    }
}



bubbleSort(arr);
console.log(arr);


