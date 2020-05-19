// event loop
// main thread -------------

// when to use async:
// open a file, read / write, make a request online, interact with a db

// Promises are syntactic sugar for callbacks
// pending
// fulfilled > (resolved, rejected)

new Promise((resolve, reject) => {
    try {
        setTimeout(() => {
            resolve("Everything went well");
        }, 4000);
    } catch {
        reject("Something went wrong");
    }
}).then(message => console.log(message))
.catch(errorMessage => console.log(errorMessage));

// Async/await are syntactic sugar for Promises
function myPromise() {
    // todo make this "done/fulfilled" after 5 seconds
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("The promise is done");
        }, 5000);
    });
}

async function callMyPromise() {
    // myPromise().then(message => {
    //     console.log(message);
    // });

    const message = await myPromise();
    console.log(message);
}

callMyPromise();

const arrowFunction = async () => {
    const message = await myPromise();
    console.log(message);
}




