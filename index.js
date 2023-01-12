
// take input from the given array.
function fetchInput() {
    let inputElement=document.getElementById('inputArr')
    let inputArr=inputElement.value.split(',')
    let blocks =wwaterAndwall(inputArr)
    let water =onlyWater(inputArr)
    wwaterAndwall(inputArr,blocks)
    onlyWater(inputArr,water)
}

// create table

function createTable(Xinput,outputArr,id) {
    var dom = document.getElementById(id);
    var waterTable = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
    });
    var TableDetail
     = {
    xAxis: {
        type: 'category',
        data: Xinput
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
        data: outputArr,
        type: 'bar'
        }
    ]
    };
    if (TableDetail && typeof TableDetail === 'object') {
    waterTable.setOption(TableDetail);
    }
    window.addEventListener('scale', waterTable.resize);
}



// Only water table
function onlyWater(water) {
    let FirstArray=[]
    let SecondArray=[]
    let finalCase=[]
    let result=[]
    let lastValueForFirstArray=0
    let lastValueForSecondArray=0
    for (let i = 0; i < water.length; i++) {
        let element = water[i];
        if (element == 0) {
            FirstArray.push(lastValueForFirstArray)
        }else{
            FirstArray.push('-')
            lastValueForFirstArray=element
        }
    }
    for (let  i = water.length-1; i >= 0; i--) {
        let element = water[i];
        if (element == 0) {
            SecondArray[i]='-'
        }else{
            SecondArray.push('-')
            lastValueForSecondArray=element
        }
    }
    for (let i = 0; i < water.length; i++) {
        let fc=FirstArray[i];
        let sc=SecondArray[i]
        if (fc == '-') {
            finalCase[i]='-'
        }else{
            finalCase[i]= fc - sc > 0 ? sc : fc
        }
    }
    for (let i = 0; i < water.length; i++) {
        let element = water[i];
        if (element == 0) {
            result.push({
                value:finalCase[i],
                itemStyle:{
                    color:"blue"
                }
            })
        }else{
            result.push({
                value:0,
                itemStyle:{
                    color:'#0000FF'
                }
            })
        }
    }
    createTable(water,result,'chart-container1')
}




// count water and wall blocks
function wwaterAndwall(blocks) {
    let FinalArray=[]
    let FirstArray=[]
    let SecondArray=[]
    let result=[]
    let lastValueForFirstArray=0
    let lastValueForSecondArray=0
    for (let i = 0; i < blocks.length; i++) {
        let element = blocks[i];
        if (element == 0) {
            FirstArray.push(lastValueForFirstArray)
        }else{
            FirstArray.push('-')
            lastValueForFirstArray =element
        }
    }
    for (let  i = blocks.length - 1; i >= 0; i--) {
        let element = blocks[i];
        if (element == 0) {
            SecondArray[i] = lastValueForSecondArray
        }else{
            SecondArray[i]= '-'
            lastValueForSecondArray=element
        }
    }
    for (let i = 0; i < blocks.length; i++) {
        let fc=FirstArray[i]
        let sc=SecondArray[i]
        if (fc == '-') {
            FinalArray[i]='-'
        }else{
            FinalArray[i]=fc - sc > 0 ? sc : fc
        }
    }
    for (let i = 0; i < blocks.length; i++) {
        let element = blocks[i];
        if(element == 0){
            result.push({
                value: FinalArray[i],
                itemStyle: {
                    color: '#0000FF'
                }
            })
        }else{
            result.push({
                value: element,
                itemStyle: {
                    color: '#FFFF00'
                }
            })
        }
    }
    console.log(FirstArray);
    console.log(SecondArray);
    console.log(FinalArray);
    console.log(result);
    console.log(countWaterUnits(FinalArray));
    createTable(blocks,result,'chart-container')
    let outputSpan = document.getElementById('waterunit')
    outputSpan.innerHTML= `OUTPUT :   ${countWaterUnits(FinalArray)} Units` 
}


// count water blocks
const countWaterUnits = (FinalArray) => {
    let sum = 0
    for (let i = 0; i < FinalArray.length; i++) {
        let element = FinalArray[i];
        if (element != '-') {
            sum += +element
        }
    }
    return sum
}

