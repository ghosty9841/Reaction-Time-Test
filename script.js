// html tags

let main=document.getElementById("main");

// flags

let bestreaction=null;
let state;
let timer;
let starttime;
let endtime;
let resulttime;

// functions

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function homepage(){
    state="wait";
    main.innerHTML=
    `
    <h1 id="heading">Reaction Time Test</h1>
    <p id="msg1">When the red box turns green, click as quickly as you can.</p>
    <p id="msg2">Click anywhere to start.</p>
    `
};

function waitpage(){
    main.className="waiting";
    state="too";
    main.innerHTML=
    `
    <h1 id="head1">...</h1>
    <h1 id="head2">Wait for green</h1>
    `
    let rand=getRandomIntInclusive(3,8)*1000;
    timer=setTimeout(() => {
        greenpage();
    }, rand);

};

function toosoonpage(){
    main.className="too-soon";
    clearTimeout(timer);
    timer=null;
    state="wait";
    main.innerHTML=
    `
    <h1 id="head1">⚠</h1>
    <h1 id="head2">Too Soon!</h1>
    <p id="msg">Click to try again</p>
    `
};

function greenpage(){
    main.className="ready";
requestAnimationFrame(() => {
  starttime = performance.now();
});
    clearTimeout(timer);
    timer=null;
    state="result";
    main.innerHTML=
    `
    <h1 id="head1">...</h1>
    <h1 id="head2">Click</h1>
    `
};

function resultpage(){
    main.className="result";
    clearTimeout(timer);
    timer=null;
    state="wait";
    resulttime=Math.round(endtime-starttime);

    main.innerHTML=
    `
    <h1 id="head1">🕓</h1>
    <h1 id="head2">${resulttime} ms</h1>
    <p id="best"></p>
    <p id="msg">Click to keep going</p>
    `
    let best=document.getElementById("best");
    if(bestreaction>resulttime || bestreaction==null){
    bestreaction=resulttime;    
    }
    best.textContent=`bestreaction: ${bestreaction} ms`;
};

// events

document.addEventListener("pointerdown", function(){
    if(state=="wait"){
        waitpage();
    }
    else if(state=="too"){
        toosoonpage();
    }
    else if(state=="result"){
        endtime=performance.now();
        resultpage();
    }
});

//main program

homepage();