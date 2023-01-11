//1. fetch input feild value
//2. create table formet
//3. water wall container
//4. only water container
//5. count water units

function fetchArr() {
    let inputElement=document.getElementById('inputArr')
    let inputArr=inputElement.value.split(',')
    let bricks =waterAndBricks(inputArr)
    let water =onlyWater(inputArr)
    waterAndBricks(inputArr,bricks)
    onlyWater(inputArr,water)
}

