/* gen queue */
function genDeckQueue(){
    let res = [];
    typearr.forEach((v,i)=>{
        for(let i=1;i<=13;i++){
            res.push({"type":v,"num":i});
        }
    });
    return res;
}
function genDeckQueue2(){
    let res = [];
    for(let i=1;i<=13;i++){
        typearr.forEach(v=>{
            res.push({"type":v,"num":i});
        });
    }
    return res;
}   

/* shuffle */
function shuffleQueue(queue){
    for(let i=0;i<queue.length-1;i++){
        if(Math.random()>0.5){
            let t = queue[i];
            queue[i] = queue[i+1];
            queue[i+1] = t;
        }
    }

    let sp = Math.round(Math.random()*3);
    queue = queue.slice(sp*17,queue.length).concat(queue.slice(0,sp*17));
    sp = Math.round(Math.random()*4);
    queue = queue.slice(sp*13,queue.length).concat(queue.slice(0,sp*13));
    sp = Math.round(Math.random()*4);
    queue = queue.slice(sp*11,queue.length).concat(queue.slice(0,sp*11));
    sp = Math.round(Math.random()*7);
    queue = queue.slice(sp*7,queue.length).concat(queue.slice(0,sp*7));
    sp = Math.round(Math.random()*10);
    queue = queue.slice(sp*5,queue.length).concat(queue.slice(0,sp*5));
    sp = Math.round(Math.random()*17);
    queue = queue.slice(sp*3,queue.length).concat(queue.slice(0,sp*3));
    return queue;
}
function shuffle(queue,n){
    for(let i=0;i<n;i++){
        queue = shuffleQueue(queue);
    }
    return queue;
}

function start(){
    bindDOMs();
    setBtnEvent();
    /* initialize UI */
    initEnableBtn();lateTick=1500;
    AllChips.innerHTML = `${holdChips}`;

    /* 3 decks */
    Q = Q.concat(Q).concat(Q);
    if(needShuffle) Q = shuffle(Q, 65536*2);
    Q = Q.reverse();
}

window.addEventListener("load",start,false);