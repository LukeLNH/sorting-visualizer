import React from 'react';
import './sortingVisualizer.css';
import {Button, Dropdown, DropdownButton, Form} from 'react-bootstrap';

//todo: move change the color of the bars back to orange in the SETHEIGHT fn!
export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props); //something for React, just do it
        this.state = { 
            bars: [],
            currentAlgorithm: 'Insertion Sort',
            delay: 140,
            barColorR: 255,
            barColorB: 150,
            
            
        }; 

        //bars is a list of random numbers representing the height/color of the bars. Turned into bars using css
    }

    componentDidMount() { 
        // let barDisplay = document.getElementById("bar-display");
        // console.log(barDisplay.style.width);
        let newBars = [];
        for (let i = 0; i < 270; i ++) {
            newBars.push(i * 600 /270);
        }
        this.setState({bars: newBars});
    }

    async shuffle() {
        let bars = this.state.bars;
        let numSwitches = 500;
        while(numSwitches >= 0) {
            let i = Math.floor(Math.random() * 270);
            let j = Math.floor(Math.random() * 270);
            let temp = bars[i];
            bars[i] = bars[j];
            bars[j] = temp;
            numSwitches--;

            await this.renderSingleBar(i);
            this.setHeight(i, bars[i]);

            await this.renderSingleBar(j);
            this.setHeight(j, bars[j]);
        }

        this.setState({bars});
    }

    

    render() { //method belonging to super class, must implement. For React to render this component   
        
        let barDisplay = this.state.bars;
        return (
            <div>
                <div className = "menu-bar">
                    <div>
                        <Button className = "shuffle-button" onClick = {() => this.shuffle()}>Shuffle</Button>
                    </div>

                    <div>
                        <DropdownButton id = "dropdown-button" title = {this.state.currentAlgorithm}>
                            <Dropdown.Item onClick = {() => {this.changeSortingAlgorithm('Insertion Sort')}}>Insertion Sort</Dropdown.Item>
                            <Dropdown.Item onClick = {() => {this.changeSortingAlgorithm('Selection Sort')}}>Selection Sort</Dropdown.Item>
                            <Dropdown.Item onClick = {() => {this.changeSortingAlgorithm('Quick Sort')}}>Quick Sort</Dropdown.Item>
                            <Dropdown.Item onClick = {() => {this.changeSortingAlgorithm('Merge Sort')}}>Merge Sort</Dropdown.Item>
                            <Dropdown.Item onClick = {() => {this.changeSortingAlgorithm('Comb Sort')}}>Comb Sort</Dropdown.Item>
                            <Dropdown.Item onClick = {() => {this.changeSortingAlgorithm('Bubble Sort')}}>Bubble Sort</Dropdown.Item>
                        </DropdownButton>
                    </div>

                    <div>
                        <Button className = "sort-button" onClick = {() => {this.sort()}}>Sort</Button>
                    </div>

                    {/* <div>
                        <Button className = "stop-button" onClick = {() => {this.stop()}} >Stop</Button>
                    </div> */}

                    <div>
                        <Form>
                            <Form.Group controlId = "sortingSpeed">
                                <Form.Label>Algorithm Speed</Form.Label>
                                <Form.Control type = "range" min = "0" max = "140" step = "20" value = {this.state.delay}  
                                    onChange = {(e) => {this.changeDelay(e)}}
                                    onInput = {(e) => {this.changeDelay(e)}}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                    <div>
                        <Form>
                        <Form.Group controlId = "barColor">
                            <Form.Label>bar Colors</Form.Label>
                            <Form.Control type = "range" min = "0" max = "255" step = "1" value = {this.state.barColorR}
                                onChange = {(e) => {this.setState({barColorR: e.target.value})}}
                                onInput = {(e) => {this.setState({barColorR: e.target.value})}}
                            />
                        </Form.Group>
                        </Form>
                    </div>
                </div>            
                <div className = "bar-display">
                    {barDisplay.map((val, index) => ( //!!! the brackets after the arrow HAVE to be ()
                        <div className = "single-bar" 
                        key = {index}
                        style = {
                            {height: `${val}px`,
                            backgroundColor: `rgb(${this.state.barColorR},
                            130,
                            ${255*val/600})`
                            }
                            }> 
                        
                        </div>
                    ))}
                </div>
            </div>
        );
    }


    changeSortingAlgorithm(newAlgorithm) {
        this.setState({currentAlgorithm: newAlgorithm});
    }

    changeDelay(e) {
        this.setState({delay: parseFloat(e.target.value)});
    }

    sort() {
        switch(this.state.currentAlgorithm) {
            case 'Insertion Sort':
                this.insertionSort(this.state.bars);
                break;
            case 'Selection Sort':
                this.selectionSort(this.state.bars);
                break;
            case 'Quick Sort':
                this.quickSort(this.state.bars);
                break;
            case 'Merge Sort':
                this.mergeSort(this.state.bars);
                break;
            case 'Comb Sort':
                this.combSort(this.state.bars);
                break;
            case 'Bubble Sort':
                this.bubbleSort(this.state.bars);
                break;
            default:
                console.log("please choose a sorting algorithm");
        }
    }

    //all the sorting algorithms
    async insertionSort(barArray) {
        //!!! include a shield for when the array is empty later?

        for(let i = 1; i < barArray.length; i++) {
            
            await this.renderSingleBar(i);

            let current = barArray[i];
            let j = i - 1;

            while (j >= 0 && current < barArray[j]) {
                barArray[j + 1] = barArray[j];
                this.setHeight(j+1, barArray[j+1]);
                j--;
            }
            
            barArray[j+1] = current;
            this.setHeight(j+1, current);
        }
    }

    async selectionSort(barArray) {


        for (let i = 0; i < barArray.length; i++) {
            let currentMinIndex = i;

            for (let j = i + 1; j < barArray.length; j++) {
                if(barArray[currentMinIndex] > barArray[j]) {
                    currentMinIndex = j;
                }
            }
            
            await this.renderSingleBar(i);
            this.setHeight(i, barArray[currentMinIndex]);

            await this.renderSingleBar(currentMinIndex);
            this.setHeight(currentMinIndex, barArray[i]);

            
            

            let temp = barArray[currentMinIndex];
            barArray[currentMinIndex] = barArray[i];
            barArray[i] = temp;


        }
    }

    quickSort(barArray) {
        this.quickSortHelper(barArray, 0, barArray.length - 1, 0);
    }

    async quickSortHelper(barArray, lowIndex, highIndex, depth) {
        if(lowIndex >= highIndex) return; //guard for natural recursion
        
        let middleIndex = lowIndex; //middleIndex is where the pivotNum will end up in the end
        let pivotNum = barArray[highIndex]; //setting the pivot number to be the final number in the array

        for (let i = lowIndex; i < highIndex; i++) { //iterate through all numbers except pivotNum(the last element)
            
            await this.renderSingleBar(i);
            this.renderSingleBar(middleIndex);

            if (barArray[i] < pivotNum) {
                let temp = barArray[middleIndex]; 
                barArray[middleIndex] = barArray[i];
                barArray[i] = temp;
                middleIndex++;


                this.setHeight(i, temp);
                this.setHeight(middleIndex -1, barArray[middleIndex - 1]);
            }
        }

        barArray[highIndex] = barArray[middleIndex];
        barArray[middleIndex] = pivotNum;
        //logic for partioning method from https://www.geeksforgeeks.org/quick-sort/

        this.setHeight(highIndex, barArray[middleIndex]);
        this.setHeight(middleIndex, pivotNum);
        //natural recursion
        await this.quickSortHelper(barArray, lowIndex, middleIndex - 1, depth++);
        await this.quickSortHelper(barArray, middleIndex + 1, highIndex, depth++);
    }


    async mergeSort(barArray) {
        this.mergeSortHelper(barArray, 0, barArray.length - 1);
        //this.setState({bars: barArray});
    }

    async mergeSortHelper(barArray, absLowIndex) {
        if (barArray.length <= 1) return; //guard for natural recursion
        
    
        let midIndex = Math.floor(barArray.length / 2);

    
        let leftArray = barArray.slice(0, midIndex);
        let rightArray = barArray.slice(midIndex, barArray.length);
    
        await this.mergeSortHelper(leftArray, absLowIndex);
        await this.mergeSortHelper(rightArray, absLowIndex + midIndex);
    
        await this.mergeSortMerger(barArray, leftArray, rightArray, absLowIndex);
    
    }

    async mergeSortMerger(barArray, leftArray, rightArray, lowIndex) {
        for (let i = 0; i < barArray.length; i++) {
            if (leftArray.length <= 0) {
                barArray.splice(i);

                for (let j = 0; j < rightArray.length; j++) {
                    barArray.push(rightArray[j]);
                    this.setHeight(lowIndex + i, rightArray[j]);
                    i++;
                }
                break;

            } else if (rightArray.length <= 0) {
                barArray.splice(i);
                for (let j = 0; j < leftArray.length; j++) {
                    barArray.push(leftArray[j]);
                    this.setHeight(lowIndex + i, leftArray[j]);
                    i++;
                }
                break;
            }
    
            if (leftArray[0] < rightArray[0]) {
                barArray[i] = leftArray.shift();
            } else {
                barArray[i] = rightArray.shift();
            }
            await this.renderSingleBar(lowIndex + i);
            await this.setHeight(lowIndex + i, barArray[i]);
        }
    }

    async combSort(barArray) {
        let gap = barArray.length;

        let swap = true;
        while (gap > 1 || swap === true) {
            gap = await this.combSortHelper(gap).then(resolvedVal => {return resolvedVal});
            swap = false;

            for (let i = 0; i < barArray.length - gap; i++) {
                if (barArray[i] > barArray[i + gap]) {
                    let temp = barArray[i];
                    barArray[i] = barArray[i + gap];
                    barArray[i + gap] = temp;
                    swap = true;

                    await this.renderSingleBar(i);
                    this.renderSingleBar(i + gap);

                    await this.setHeight(i, barArray[i]);
                    await this.setHeight(i + gap, barArray[i + gap]);
                    
                }
            }
        }
        this.setState({bars: barArray});
    }

    async combSortHelper(gap) {
        //the "shrink factor" will be 1.3
        gap = Math.floor(gap / 1.3);
        return (gap <=1? 1 : gap);
    }

    async bubbleSort(barArray) {
        for (let i = 0; i < barArray.length; i++) {
            for (let j = 0; j < barArray.length - i - 1; j++) {
                if (barArray[j] > barArray[j+1]) {
                    let temp = barArray[j];
                    barArray[j] = barArray[j + 1];
                    barArray[j + 1] = temp;

                    await this.renderSingleBar(j);
                    this.renderSingleBar(j + 1);

                    this.setHeight(j, barArray[j]);
                    this.setHeight(j + 1, barArray[j + 1]);
                }
            }
        }
    }




    //sleep function using setTimeout from https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async renderSingleBar(index) {
        let barDisplayArray = document.getElementsByClassName("single-bar");
        let currentColor = barDisplayArray[index].style.backgroundColor;
        barDisplayArray[index].style.backgroundColor = "blue";
        await this.sleep(140.05 - this.state.delay);
        barDisplayArray[index].style.backgroundColor = currentColor;
        console.log(barDisplayArray[index].style.height);
        
    }

    async setHeight(curIndex, newHeight) {
        let barDisplayArray = document.getElementsByClassName("single-bar");
        await this.sleep(140.05 - this.state.delay);
        let currentBarStyle = barDisplayArray[curIndex].style;
        currentBarStyle.height = `${newHeight}px`;
    }




    
    //insertion sort --- done
    //selection sort --- done
    //quick sort --- done
    //merge sort --- done
    //comb sort --- done
    //bubble sort  --- done
    //heap sort
    //counting sort
    //radix sort
    //bucket sort
    //shell sort
    //cocktail sort

    // cancel button
    // change mergesort a bit?
    // sound effects
    // slider bar to adjust number of things to sort

    
    
    

    
}