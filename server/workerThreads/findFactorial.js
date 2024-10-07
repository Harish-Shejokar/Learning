const {parentPort} = require("worker_threads")

const findFactorial = (number) => {
    if(number == 0 || number == 1) return 1;
    return number * findFactorial(number - 1);
}

parentPort.on("message", (number)=>{
    
    // if(number) console.log(findFactorial(number));
    
    if(number ){
        const ans = findFactorial(number);
        parentPort.postMessage(`The Factorial of ${number} is ${ans}`);
    }
})

