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
            delay: 30,
            barColorR: 255,
            barMaxHeight: Math.floor(window.screen.height*2/3),
            maxNumBars: Math.floor((window.screen.width - 220)/5),
            barWidth: 1,
        }; 

        //bars is a list of random numbers representing the height/color of the bars. Turned into bars using css
    }

    componentDidMount() { 
        let numBars = Math.floor(this.state.maxNumBars / this.state.barWidth);

        let newBars = [];
        // for (let i = 0; i < this.state.maxNumBars; i ++) {
        //     newBars.push(i * this.state.barMaxHeight/this.state.maxNumBars);
        // }

        for (let i = 0; i < numBars; i++) {
            newBars.push(i * this.state.barMaxHeight/numBars);
        }
        this.setState({bars: newBars});
    }

    async shuffle() {
        let numBars = Math.ceil(this.state.maxNumBars / this.state.barWidth);
        let bars = this.state.bars;
        let numSwitches = 500;
        while(numSwitches >= 0) {
            let i = Math.floor(Math.random() * numBars);
            let j = Math.floor(Math.random() * numBars);
            let temp = bars[i];
            bars[i] = bars[j];
            bars[j] = temp;
            numSwitches--;

            await Promise.all([this.renderSingleBar(i), this.renderSingleBar(j)]);
            
            this.setHeight(i, bars[i]);
            this.setHeight(j, bars[j]);
        }

        this.setState({bars});
    }

    

    render() { //method belonging to super class, must implement. For React to render this component   
        
        let barDisplay = this.state.bars;
        return (
            <div  className = "sorting-visualizer" >
                <div className = "menu-bar">
                    <div className = "shuffle-area">
                        <Button variant = "dark" size = "lg" className = "shuffle-button" onClick = {() => this.shuffle()}>Shuffle</Button>
                    </div>

                    <div className = "choose-algorithm-area">
                        <DropdownButton variant = "dark" size = "lg" id = "dropdown-button" title = {this.state.currentAlgorithm}>
                            <Dropdown.Item onClick = {() => {this.changeSortingAlgorithm('Insertion Sort')}}>Insertion Sort</Dropdown.Item>
                            <Dropdown.Item onClick = {() => {this.changeSortingAlgorithm('Selection Sort')}}>Selection Sort</Dropdown.Item>
                            <Dropdown.Item onClick = {() => {this.changeSortingAlgorithm('Quick Sort')}}>Quick Sort</Dropdown.Item>
                            <Dropdown.Item onClick = {() => {this.changeSortingAlgorithm('Merge Sort')}}>Merge Sort</Dropdown.Item>
                            <Dropdown.Item onClick = {() => {this.changeSortingAlgorithm('Comb Sort')}}>Comb Sort</Dropdown.Item>
                            <Dropdown.Item onClick = {() => {this.changeSortingAlgorithm('Bubble Sort')}}>Bubble Sort</Dropdown.Item>
                        </DropdownButton>
                    </div>

                    <div className = "sort-button-area">
                        <Button variant = "dark" size = "lg" className = "sort-button" onClick = {() => {this.sort()}}>Sort</Button>
                    </div>

                    <div className = "sorting-speed-slider-area">
                        <Form>
                            <Form.Group controlId = "sortingSpeed">
                                <Form.Label style = {{color: "white"}}>Algorithm Speed</Form.Label>
                                <Form.Control type = "range" min = "0" max = "30" step = "6" value = {this.state.delay}  
                                    onChange = {(e) => {this.changeDelay(e)}}
                                    onInput = {(e) => {this.changeDelay(e)}}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                    <div className = "color-slider-area">
                        <Form>
                        <Form.Group controlId = "barColor">
                            <Form.Label style = {{color: "white"}}>Bar Colors</Form.Label>
                            <Form.Control type = "range" min = "0" max = "255" step = "1" value = {this.state.barColorR}
                                onChange = {(e) => {this.setState({barColorR: e.target.value})}}
                                onInput = {(e) => {this.setState({barColorR: e.target.value})}}
                            />
                        </Form.Group>
                        </Form>
                    </div>

                    <div className = "bar-Width-slider-area">
                        <Form>
                        <Form.Group controlId = "barWidth">
                            <Form.Label style = {{color: "white"}}>Bar Width</Form.Label>
                            <Form.Control type = "range" min = "1" max = "5" step = "0.25" value = {this.state.barWidth}
                                onChange = {(e) => {this.changeBarWidth(e.target.value)}}
                                onInput = {(e) => {this.changeBarWidth(e.target.value)}}
                            />
                        </Form.Group>
                        </Form>
                    </div>
                </div>

                <div className = "bar-display" style = {{height: this.state.barMaxHeight}}>
                    {barDisplay.map((val, index) => ( //!!! the brackets after the arrow HAVE to be ()
                        <div className = "single-bar" 
                        key = {index}
                        style = {
                            {height: `${val}px`,
                            backgroundColor: `rgb(${this.state.barColorR},
                            130,
                            ${255*val/600})`,
                            width: `${this.state.barWidth * 3}px`,
                            }
                            }> 
                        
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    changeBarWidth(newBarWidth) {
        let numBars = Math.ceil(this.state.maxNumBars / newBarWidth);

        let newBars = [];
        for (let i = 0; i < numBars; i++) {
            newBars.push(i * this.state.barMaxHeight/numBars);
        }
        this.setState({bars: newBars, barWidth: newBarWidth});
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

        for(let i = 1; i < barArray.length; i++) {
            
            let current = barArray[i];
            let j = i - 1;

            while (j >= 0 && current < barArray[j]) {
                await this.renderSingleBar(j);
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
                await this.renderSingleBar(j);
                if(barArray[currentMinIndex] > barArray[j]) {
                    currentMinIndex = j;
                }
            }
            
            // await Promise.all([this.renderSingleBar(i), this.renderSingleBar(currentMinIndex)]);
            this.setHeight(i, barArray[currentMinIndex]);
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

        this.setHeight(highIndex, barArray[highIndex]);
        this.setHeight(middleIndex, pivotNum);
        //natural recursion
        
        await Promise.all([this.quickSortHelper(barArray, lowIndex, middleIndex - 1, depth++), 
            this.quickSortHelper(barArray, middleIndex + 1, highIndex, depth++)]);
        
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
    
        await Promise.all([this.mergeSortHelper(leftArray, absLowIndex), 
            this.mergeSortHelper(rightArray, absLowIndex + midIndex)]);
        await this.mergeSortMerger(barArray, leftArray, rightArray, absLowIndex);
    
    }

    async mergeSortMerger(barArray, leftArray, rightArray, lowIndex) {
        for (let i = 0; i < barArray.length; i++) {
            if (leftArray.length <= 0) {
                barArray.splice(i);

                for (let j = 0; j < rightArray.length; j++) {
                    barArray.push(rightArray[j]);
                    await this.renderSingleBar(lowIndex + i);
                    this.setHeight(lowIndex + i, rightArray[j]);
                    i++;
                }
                break;

            } else if (rightArray.length <= 0) {
                barArray.splice(i);
                for (let j = 0; j < leftArray.length; j++) {
                    barArray.push(leftArray[j]);
                    await this.renderSingleBar(lowIndex + i);
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
            this.setHeight(lowIndex + i, barArray[i]);
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

                    await Promise.all([this.renderSingleBar(i), this.renderSingleBar(i + gap)]);
                
                    this.setHeight(i, barArray[i]);
                    this.setHeight(i + gap, barArray[i + gap]);
                    
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

                    await Promise.all([this.renderSingleBar(j),
                        this.renderSingleBar(j + 1)]);
                    
                    this.setHeight(j, barArray[j]);
                    this.setHeight(j + 1, barArray[j + 1]);
                }
            }
        }
    }




    //sleep function using setTimeout from https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
    sleep() {
        return new Promise(resolve => setTimeout(resolve, 30.00001 - this.state.delay));
    }

    async renderSingleBar(index) {
        let barDisplayArray = document.getElementsByClassName("single-bar");
        let currentColor = barDisplayArray[index].style.backgroundColor;
        barDisplayArray[index].style.backgroundColor = "black";
        await this.sleep();
        barDisplayArray[index].style.backgroundColor = currentColor;
    }

    async setHeight(curIndex, newHeight) {
        let barDisplayArray = document.getElementsByClassName("single-bar");
        await this.sleep();
        let currentBarStyle = barDisplayArray[curIndex].style;
        currentBarStyle.height = `${newHeight}px`;
        currentBarStyle.backgroundColor = `rgb(${this.state.barColorR}, 130, ${255*newHeight/600})`
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