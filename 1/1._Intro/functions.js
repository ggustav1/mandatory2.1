// hoisting
addition(1, 1);

// hoisting


// this doesn't work for let
// test = 1;
// let test;

const example = "this is how you write a const";

function addition(a, b) {
    return a + b;
}

var sum = addition(2, 5);

// console.log(addition(3, 9));
// console.log(sum);

function pokeMe() {
    console.log("Meow");
}


function approachSomeone(someoneToPoke) {
    // console.log("tip tap tip tap");
    // someoneToPoke();
}

approachSomeone(pokeMe);

/* function introduce(name) {
    console.log("Hello my name is", name);
} */

const introduce = (name) => {
    console.log("Hello my name is", name);
}


const prepareIntroduction = (introducerFunction, name) => {
    console.log("Hmmhmhhhmmhhm");
    introducerFunction(name);
}

// prepareIntroduction(introduce, "Oliver");


const aboutMe = (me) => {
    console.log("My hobby is", me.hobby);
}

const me = {
    hobby: "Computers"
};

aboutMe(me);

const callLater = {
    toCall: () => {
        console.log("ring ring ring banana phone");
    }
};


callLater.toCall();

console.log(callLater);
