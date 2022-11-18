function bindDOMs(){
    btn_hit     = document.getElementById("btn_hit"); 
    btn_stand   = document.getElementById("btn_stand");
    btn_double  = document.getElementById("btn_double");
    btn_split   = document.getElementById("btn_split");
    btn_cheat   = document.getElementById("btn_cheat");
    btn_bet     = document.getElementById("btn_bet");
    btn_surrender= document.getElementById("btn_surrender");
    AllChips = document.getElementById("AllChips");
    input_chips  = document.getElementById("input_chips");
    arrow       = document.getElementById("arrow");
    game_result = document.getElementById("game_msg_text");

    layer_card = document.getElementById("L_card") ;
}
function setBtnEvent(){
    /* btn event */
    btn_hit     .addEventListener("click", onClick_hit);
    btn_stand   .addEventListener("click", onClick_stand);
    btn_double  .addEventListener("click", onClick_double);
    btn_split   .addEventListener("click", onClick_split);
    btn_surrender.addEventListener("click",onClick_surrender);
    btn_bet     .addEventListener("click", onClick_bet);
    btn_cheat   .addEventListener("click", onClick_cheat);
}

/* ctrl UI */
function initEnableBtn(){
    AllChips.innerText = `${holdChips}`;

    btn_hit      .classList.add("disabledBtn");
    btn_stand    .classList.add("disabledBtn");
    btn_double   .classList.add("disabledBtn");
    btn_split    .classList.add("disabledBtn");
    btn_surrender.classList.add("disabledBtn");
    btn_bet      .classList.remove("disabledBtn");
}
function removeCard(QUEUE){
    while(QUEUE.length!=0){
        let v = QUEUE.shift();
        let dom = document.getElementById(v['id']);
        dom.style.filter = "opacity(0)";
        setCardFrame_pos(dom, rmPos['x'], rmPos['y']);
        rm.push({"type":v['type'],"num":v['num']});
    }
}

/* card appearace */
function setCardBox(dom,type,number){
    // DOM = card dom
    // type= {Hearts, Clubs, Diamonds, Spades}
    // number = [1,13]

    let str_num = "";
    if(number==1)  str_num = "A";
    else if(2<=number && number<=10) str_num = `${number}`;
    else if(number==11) str_num = "J";
    else if(number==12) str_num = "Q";
    else if(number==13) str_num = "K";

    let spanColor="";
    if(type=="Hearts" || type=="Diamonds") spanColor = `style="color:rgb(240, 60, 60);"`;

    let begin= 
    `<div class="digiMark">
        <span name="cardDigit" ${spanColor}>${str_num}</span>
        <img src="card_img/${type}.png">
    </div>`;
    let end = 
    `<div class="digiMark upSideDown" ${spanColor}>
        <span name="cardDigit">${str_num}</span>
        <img src="card_img/${type}.png">
    </div>`;

    let mid = "";
    if( number == 0){
        dom.innerHTML=`<div class="backface"></div>`;
        return;
    }
    else if(number==1){
        mid = `<img src="card_img/${type}.png" class="card_1">`;
    }
    else if (number==2){
        mid = `
        <div class="flexColumn">
            <img src="card_img/${type}.png" class="card_2">
            <img src="card_img/${type}.png" class="card_2 upSideDown">
        </div>`;
    }
    else if (number==3){
        mid = `
        <div class="flexColumn">
            <img src="card_img/${type}.png" class="card_2">
            <img src="card_img/${type}.png" class="card_2">
            <img src="card_img/${type}.png" class="card_2">
        </div>`;
    }
    else if (number==4){
        mid = `
        <div>
            <div>
                <img src="card_img/${type}.png" class="card_4">
                <img src="card_img/${type}.png" class="card_4">
            </div>
            <div class="upSideDown">
                <img src="card_img/${type}.png" class="card_4">
                <img src="card_img/${type}.png" class="card_4">
            </div>
        </div>`;
    }
    else if (number==5){
        mid = `
        <div>
            <div>
                <img src="card_img/${type}.png" class="card_5">
                <img src="card_img/${type}.png" class="card_5">
            </div>
            <div style="display: flex; flex-flow: column; align-items: center;">
                <img src="card_img/${type}.png" class="card_5">
            </div>
            <div class="upSideDown">
                <img src="card_img/${type}.png" class="card_5">
                <img src="card_img/${type}.png" class="card_5">
            </div>
        </div>`;
    }
    else if (number==6){
        mid = `
        <div>
            <div>
                <img src="card_img/${type}.png" class="card_6">
                <img src="card_img/${type}.png" class="card_6">
            </div>
            <div>
                <img src="card_img/${type}.png" class="card_6">
                <img src="card_img/${type}.png" class="card_6">
            </div>
            <div class="upSideDown">
                <img src="card_img/${type}.png" class="card_6">
                <img src="card_img/${type}.png" class="card_6">
            </div>
        </div>`;
    }
    else if (number==7){
        mid = `
        <div>
            <div>
                <img src="card_img/${type}.png" class="card_7">
                <img src="card_img/${type}.png" class="card_7">
            </div>
            <div style="display: flex; flex-flow: column; align-items: center;">
                <img src="card_img/${type}.png" class="card_7">
            </div>
            <div>
                <img src="card_img/${type}.png" class="card_7">
                <img src="card_img/${type}.png" class="card_7">
            </div>
            <div class="upSideDown">
                <img src="card_img/${type}.png" class="card_7">
                <img src="card_img/${type}.png" class="card_7">
            </div>
        </div>`;
    }
    else if (number==8){
        mid = `
        <div>
            <div>
                <img src="card_img/${type}.png" class="card_8">
                <img src="card_img/${type}.png" class="card_8">
            </div>
            <div>
                <img src="card_img/${type}.png" class="card_8">
                <img src="card_img/${type}.png" class="card_8">
            </div>
            
            <div class="upSideDown">
                <img src="card_img/${type}.png" class="card_8">
                <img src="card_img/${type}.png" class="card_8">
            </div>
            <div class="upSideDown">
                <img src="card_img/${type}.png" class="card_8">
                <img src="card_img/${type}.png" class="card_8">
            </div>
        </div>`;
    }
    else if (number==9){
        mid = `
        <div>
            <div>
                <img src="card_img/${type}.png" class="card_9">
                <img src="card_img/${type}.png" class="card_9">
            </div>
            <div>
                <img src="card_img/${type}.png" class="card_9">
                <img src="card_img/${type}.png" class="card_9">
            </div>

            <div style="display: flex; flex-flow: column; align-items: center;">
                <img src="card_img/${type}.png" class="card_9">
            </div>

            <div class="upSideDown">
                <img src="card_img/${type}.png" class="card_9">
                <img src="card_img/${type}.png" class="card_9">
            </div>
            <div class="upSideDown">
                <img src="card_img/${type}.png" class="card_9">
                <img src="card_img/${type}.png" class="card_9">
            </div>
        </div>`;
    }
    else if (number==10){
        mid = `
        <div>
            <div>
                <img src="card_img/${type}.png" class="card_10">
                <img src="card_img/${type}.png" class="card_10">
            </div>
            <div style="display: flex; flex-flow: column; align-items: center;">
                <img src="card_img/${type}.png" class="card_10">
            </div>
            <div>
                <img src="card_img/${type}.png" class="card_10">
                <img src="card_img/${type}.png" class="card_10">
            </div>

            <div class="upSideDown">
                <div>
                    <img src="card_img/${type}.png" class="card_10">
                    <img src="card_img/${type}.png" class="card_10">
                </div>
                <div style="display: flex; flex-flow: column; align-items: center;">
                    <img src="card_img/${type}.png" class="card_10">
                </div>
                <div>
                    <img src="card_img/${type}.png" class="card_10">
                    <img src="card_img/${type}.png" class="card_10">
                </div>
            </div>
        </div>`;
    }
    else if (number==11 || number==12 || number==13){
        mid = `
            <img src="./card_img/${type}_${str_num}.png" class="img_JQK">
        `;
    }
    dom.innerHTML = `${begin} <div class="cardimg">${mid}</div> ${end}`;
}
function setCardFrame_pos(dom,x,y){
    /* x, y is percentage*/
    dom.style.left = `${1920*x/(100)}px`;
    dom.style.top = `${1080*y/(100)}px`;
}
function setCardFrame_rot(dom,deg){
    dom.style.transform = `rotate(${deg}deg)`;
}
function randomCard(dom){
    let num = Math.floor(1+Math.random()*13);
    let type = typearr[Math.floor(Math.random()*4)];
    setCardBox(dom, type, num);
}
function makeCard(idName,x,y){
    layer_card.innerHTML += `
        <div class="cardFrame" id="${idName}">
            <div class="cardBox"></div>
        </div>
    `;
    let dom = document.getElementById(idName);
    let child = dom.getElementsByClassName("cardBox")[0];
    let face = Q.shift();
    setCardBox(child,face['type'],0);
    setCardFrame_pos(dom, startPos['x'], startPos['y']);
    return {"id": idName, "posX":x, "posY":y, "type": face['type'], "num": face['num']};
}
function flipLastCard(queue){
    let v = queue[queue.length-1];
    let dom = document.getElementById(v['id']);
    setCardBox(dom.getElementsByClassName("cardBox")[0],v['type'],v['num']);
}


/* Compare */
function isCardSamePoints(a,b){
    /* 檢查點數是否相同 */
    /* a,b are card points */
    let aPoints = a>=10 ? 10 : a;
    let bPoints = b>=10 ? 10 : b;

    if(aPoints==bPoints)return true;
    else                return false;
}

/* cal queue sum */
function pileSum(queue){
    /* queue */
    let sum1 = 0;
    let sum2 = 0;
    queue.forEach( v =>{
        let n = v['num'];
        if(n==1){
            sum1 += 1;
            sum2 += 11;
        }
        else if(n>=10){
            sum1 += 10;
            sum2 += 10;
        }
        else{
            sum1 += n;
            sum2 += n;
        }
    });

    if((sum2>21 && 1<=sum1 && sum1<=21) || (sum1>21 && 1<=sum2 && sum2<=21)){
        return Math.min(sum1,sum2);
    }
    else{
        return Math.max(sum1,sum2);
    }
}

function judge(DEALER,PLAYER,n){
    {
        let v = DEALER[0];
        let child = document.getElementById(v['id']).children[0];
        setCardBox(child, v['type'], v['num']);
    }
    while(pileSum(DEALER)<=16){
        if(isDealerCheat){
            let indx = findMaxRevenuIndex(pileSum(DEALER));
            /* debug */ if(isDebug) console.log("findMaxRevenuIndex",indx,Q[indx]);
            doHitOnQueue_cheat(DEALER, 0, indx);
        }
        else{
            doHitOnQueue(DEALER, 0);
        }
    }
    let dealerJudge = {"type":"","sum":pileSum(DEALER)};
    let playerJudge = {"type":"","sum":pileSum(PLAYER)};

    setJudgeType(PLAYER, playerJudge);
    setJudgeType(DEALER, dealerJudge);
    /* debug */ if(isDebug) console.log("judge info",playerJudge,dealerJudge);

    if(playerJudge['type']==judgeType['BST']){
        setGameResText("player BUST", -1);
        return -1;
    }
    if(playerJudge['type']==judgeType['BJK'] && playerJudge.length==2){
        if(n==1)
            betChips1*=1.5;
        else if(n==2) 
            betChips2*=1.5;
        
        setGameResText("player BJK", 1);
        return 1;
    }

    if(playerJudge['type']>dealerJudge['type']){
        /* type big */
        setGameResText("dealer lose", 1);
        return 1;
    }
    else if(playerJudge['type']==dealerJudge['type']){
        /* type same */
        if(playerJudge['sum']>dealerJudge['sum']){
            setGameResText("player GREATER", 1);
            return 1;
        }
        else if(playerJudge['sum']<dealerJudge['sum']){
            setGameResText("player LESS", -1);
            return -1;
        }
        else {
            setGameResText("same points", 0);
            return 0;
        }
    }
    else{
        /* type small */
        setGameResText("dealer win", -1);
        return -1;
    }
}
function setGameResText(msg,judge){
    if(judge==-1){
        game_result.innerText += `LOSE: ${msg}\n`;
        game_result.classList.add("text_lose");
        game_result.classList.remove("text_tie");
        game_result.classList.remove("text_win");
    }
    else if(judge==0){
        game_result.innerText += `TIE: ${msg}\n`;
        game_result.classList.remove("text_lose");
        game_result.classList.add("text_tie");
        game_result.classList.remove("text_win");
    }
    else if(judge==1){
        game_result.innerText += `WIN: ${msg}\n`;
        game_result.classList.remove("text_lose");
        game_result.classList.remove("text_tie");
        game_result.classList.add("text_win");
    }
    else if(judge==2){
        game_result.innerText += `${msg}\n`;
        game_result.classList.add("text_lose");
        game_result.classList.remove("text_tie");
        game_result.classList.remove("text_win");
    }
}

function setJudgeType(QUEUE,info){
    if(info['sum']==21 && QUEUE.length==2)
    {   info['type'] = judgeType['BJK'];info['TYPE'] = 'BJK';}    
    else if(info['sum']==21 && QUEUE.length==5)
    {   info['type'] = judgeType['FIV'];info['TYPE'] = 'FIV';}
    else if(info['sum']==21)
    {   info['type'] = judgeType['NML'];info['TYPE'] = 'NML';}
    else if(info['sum']<21)
    {   info['type'] = judgeType['GNL'];info['TYPE'] = 'GNL';}
    else if(info['sum']>21)
    {   info['type'] = judgeType['BST'];info['TYPE'] = 'BST';}
}

function doHitOnQueue(queue,deg){
    let v = queue[queue.length-1];
    let x = v['posX'];let y = v['posY'];
    let index = Number(v['id'][v['id'].length-1]);

    let id = v['id'].slice(0,v['id'].length-1)+`${index+1}`;
    let card = makeCard(id, x+shfDist, y);
    queue.push(card);
    setTimeout(()=>{
        let dom = document.getElementById(id);
        let child = dom.children[0];
        setCardFrame_pos(dom, x+shfDist, y)
        setCardFrame_rot(dom, deg);
        setCardBox(child, card['type'], card['num']);
    },200);
}

/* CHEAT ON */
function doHitOnQueue_cheat(queue,deg,cheatIndex){
    let v = queue[queue.length-1];
    let x = v['posX'];let y = v['posY'];
    let index = Number(v['id'][v['id'].length-1]);

    let id = v['id'].slice(0,v['id'].length-1)+`${index+1}`;
    let card = makeCard_cheat(id, cheatIndex ,x+shfDist, y);
    queue.push(card);
    setTimeout(()=>{
        let dom = document.getElementById(id);
        let child = dom.children[0];
        setCardFrame_pos(dom, x+shfDist, y)
        setCardFrame_rot(dom, deg);
        setCardBox(child, card['type'], card['num']);
    },200);
}
function makeCard_cheat(idName,index,x,y){
    layer_card.innerHTML += `
        <div class="cardFrame" id="${idName}">
            <div class="cardBox"></div>
        </div>
    `;
    let dom = document.getElementById(idName);
    let child = dom.getElementsByClassName("cardBox")[0];
    let face = Q[index];
    Q.splice(index,1);
    setCardBox(child,face['type'],0);
    setCardFrame_pos(dom, startPos['x'], startPos['y']);
    return {"id": idName, "posX":x, "posY":y, "type": face['type'], "num": face['num']};
}

function findMaxRevenuIndex(now_points){
    let delta = 21-now_points;
    let maxScore = 1;
    let res_index = 0;
    /* find max in 1~delta */
    Q.forEach((v,i) =>{
        let num = v['num'];
        if(num==1){                     /* get A*/
            if(delta>=11){
                maxScore==11;
                return i;
            }
            res_index==i;
        }
        else{
            if(delta>=num && num>maxScore){
                maxScore = num;
                res_index = i;
            }
        }
    });

    return res_index;
}