// function createCounterPromise(maxCount = 3, timeoutMs = 5000) {  
//     let counter = 0
//     let intervalId;
//     let cancelled = false
 
//     const promise = new Promise((resolve, reject) => {
//       intervalId = setInterval(()=>{
//         if(cancelled){
//           clearInterval(intervalId);
//           return
//         }
//         counter++
//         console.log(`Counter ${counter}`)
//         if(counter >= maxCount) {
//             clearInterval(intervalId);
//             resolve(`Done ! Counter reached ${maxCount}`);
//         }
//       }, timeoutMs / maxCount)
//     });
  
//     return {
//         promise,
//         cancel: ()=>{
//           cancelled = true
//         }

//     };
//   }
  
//   // Usage:
//   const { promise , cancel} = createCounterPromise(10, 15000);
  
//   promise
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => {
//       console.error("Error:", error.message);
//     });
  
//   // OUTPUT:
//   // Counter 1
//   // Counter 2
//   // Counter 3
//   // Counter 4
//   // Counter 5
//   // Counter 6
//   // Counter 7
//   // Counter 8
//   // Counter 9
//   // Counter 10
//   // Done ! Counter reached 10


  
  
//   // Cancel after 2 seconds
//   setTimeout(cancel, 2000)
//  //This should cancel the operation after 2 seconds with message "Operation canceled after 2 seconds


function generateRandomDelay(max, min) {
  return Math.random() * (max - min) + min;
}

function sequentialDelayedCounting(limit = 5, current = 1) {
  if (current < limit) {
    const delay = generateRandomDelay(1000, 5000);
    console.log(`Waiting ${delay.toFixed(0)}ms before logging ${current}`);
    
    setTimeout(() => {
      console.log('Number', current);
      sequentialDelayedCounting(limit, current + 1); // Call the function recursively
    }, delay);
  }
}

sequentialDelayedCounting(6);
