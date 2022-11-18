function onClick_hit(){                                     /* 要牌 */
    console.log("hit");//AllChips.innerText = "hit";
    /* ==== */
    if(splitState=="NOSPLIT"){
        doHitOnQueue(playerQ1,0);

        btn_double.classList.add("disabledBtn");
        btn_split.classList.add("disabledBtn");
        btn_surrender.classList.add("disabledBtn");

        if(pileSum(playerQ1)>21 || playerQ1.length==5)
            btn_hit.classList.add("disabledBtn");
    }
    else if(splitState=="PILEONE"){
        doHitOnQueue(playerQ1,0);
        btn_double.classList.add("disabledBtn");
        btn_stand.classList.remove("disabledBtn");
        if(pileSum(playerQ1)>21 || playerQ1.length==5)
            btn_hit.classList.add("disabledBtn");
    }
    else if(splitState=="PILETWO"){
        doHitOnQueue(playerQ2,0);
        btn_double.classList.add("disabledBtn");
        btn_stand.classList.remove("disabledBtn");
        if(pileSum(playerQ2)>21 || playerQ1.length==5)
            btn_hit.classList.add("disabledBtn");
    }
}
function onClick_stand(){                                   /* 停牌 */
    console.log("stand");
    /* ==== */
    if(splitState=="NOSPLIT"){
        let res = judge(dealer,playerQ1,1);
        if(res==1)      holdChips += Number(betChips1);
        else if(res==0){}
        else if(res==-1)holdChips -= Number(betChips1);

        setTimeout(()=>{
            initEnableBtn();
        },500);

        initEnableBtn();
    }
    else if(splitState=="PILEONE"){
        setCardFrame_pos(arrow, 72 , 55);
        btn_hit.classList.remove("disabledBtn");
        btn_stand.classList.add("disabledBtn");
        btn_double.classList.remove("disabledBtn");
        splitState="PILETWO";
    }
    else if(splitState=="PILETWO"){
        setTimeout(()=>{
            let res1 = judge(dealer,playerQ1,1);
            if(res1==1)      holdChips += Number(betChips1);
            else if(res1==-1)holdChips -= Number(betChips1);

            let res2 = judge(dealer,playerQ2,2);
            if(res2==1)      holdChips += Number(betChips2);
            else if(res2==-1)holdChips -= Number(betChips2);

            /* debug */ if(isDebug) console.log(`#stand piletwo# res1:${res1} res2:${res2}`);

            splitState="NOSPLIT";
            initEnableBtn();
        },1000);


        splitState="NOSPLIT";
        initEnableBtn();
    }
    
}
function onClick_double(){                                  /* bet加倍 */
    console.log("double");
    /* ==== */
    if(splitState=="NOSPLIT"){
        doHitOnQueue(playerQ1, 90);
        betChips1*=2;

        setTimeout(()=>{
            let res = judge(dealer,playerQ1,1);
            if(res==1)      holdChips += Number(betChips1);
            else if(res==0){}
            else if(res==-1)holdChips -= Number(betChips1);

            initEnableBtn();
        },1000);
    }
    else if(splitState=="PILEONE"){
        doHitOnQueue(playerQ1, 90);
        betChips1*=2;
        
        splitState="PILETWO";
        btn_double.classList.remove("disabledBtn");

        setCardFrame_pos(arrow, 72 , 55);
    }
    else if(splitState=="PILETWO"){
        doHitOnQueue(playerQ2, 90);
        betChips2*=2;

        setTimeout(()=>{
            let res1 = judge(dealer,playerQ1,1);
            if(res1==1)      holdChips += Number(betChips1);
            else if(res1==-1)holdChips -= Number(betChips1);

            let res2 = judge(dealer,playerQ2,2);
            if(res2==1)      holdChips += Number(betChips2);
            else if(res2==-1)holdChips -= Number(betChips2);

            splitState="NOSPLIT";
            initEnableBtn();
        },1000);
    }
}
function onClick_split(){
    console.log("split");
    /* ==== */

    /* split to 2 queue */
    let last = document.getElementById(playerQ1[1]['id']);    /* get DOM object */
    last.id = "PP1";
    playerQ1[1]['id']="PP1";                                  /* only change id string */
    playerQ1[0]['posX']-= shfDist*3;
    playerQ1[1]['posX']+= shfDist*3;
    let p = playerQ1.pop();
    playerQ2.push(p);
    /* debug */ if(isDebug) console.log("playerQ1 poped",p);

    /* split anim */
    setTimeout(()=>{
        let dom1 = document.getElementById("P1");
        let dom2 = document.getElementById("PP1");
        let v1 = playerQ1[0];
        let v2 = playerQ2[0];
        setCardFrame_pos(dom1, v1['posX'], v1['posY']);
        setCardFrame_pos(dom2, v2['posX'], v2['posY']);

        arrow.style.filter="opacity(100%)";
        setCardFrame_pos(arrow, v1['posX']+shfDist/2 , 55);
    },200);


    /* btn enable */
    btn_surrender.classList.add("disabledBtn");
    btn_double.classList.remove("disabledBtn");
    btn_stand.classList.add("disabledBtn");
    btn_split.classList.add("disabledBtn");
    splitState = "PILEONE";

    /* bet */
    betChips2 = betChips1;
}
function onClick_surrender(){
    console.log("surrender");
    /* ==== */
    holdChips -= betChips1/2;
    
    let v = dealer[0];
    let child = document.getElementById(v['id']).children[0];
    setCardBox(child, v['type'], v['num']);

    initEnableBtn();
}


function onClick_bet(){
    /* get bet value */
    betChips1 = input_chips.value;console.log("bet");
    /* remove card */
    setTimeout(()=>{
        removeCard(playerQ1);
        removeCard(playerQ2);
        removeCard(dealer);
        arrow.style.filter="opacity(0%)";
        setCardFrame_pos(arrow, 15, rmPos['y']);
    },200);

    setTimeout(()=>{
    /* debug */ if(isDebug) console.log("queue info\t",Q,rm); 

    /* initialize UI*/
    layer_card.innerHTML = "";
    game_result.innerText = "";


    /* combine two queue */
    if(Q.length<=combineQueueThreshold){
        Q = Q.concat(rm);
        shuffle(Q, 65536*2);
        rm = [];
        setGameResText("combine two queue",2);
        /* debug */ if(isDebug) console.log("queue info\t",Q,rm); 
    }

    /* === */
    if(betChips1%10==0 && betChips1>0 && holdChips>0 && holdChips>=betChips1){
        /* 發牌 */
        for(let i=1;i<=2;i++) playerQ1.push(makeCard(`P${i}`, mid_x+shfDist*i, 75));
        for(let i=1;i<=2;i++) dealer.push(makeCard(`D${i}`, mid_x+shfDist*i, 10));

        playerQ1.forEach(v =>{
            let dom = document.getElementById(v['id']);
            let child = dom.children[0];
            setTimeout(()=>{
                setCardFrame_pos(dom, v['posX'], v['posY']);
                setCardBox(child, v['type'], v['num']);
            },200);
        });
        dealer.forEach(v =>{
            let dom = document.getElementById(v['id']);
            let child = dom.children[0];
            setTimeout(()=>{
                setCardFrame_pos(dom, v['posX'], v['posY']);
                //setCardBox(child, v['type'], v['num']);
            },200);
        });
        /* 翻開第二張 */
        flipLastCard(dealer);

        /* lock some btns */
        btn_bet.classList.add("disabledBtn");
        btn_hit.classList.remove("disabledBtn");
        btn_stand.classList.remove("disabledBtn");
        if(holdChips>=betChips1*2) 
            btn_double.classList.remove("disabledBtn");
        if(holdChips>=betChips1*2 && isCardSamePoints(playerQ1[0]['num'], playerQ1[1]['num']))
            btn_split.classList.remove("disabledBtn");
        if(dealer[dealer.length-1]['num']==1)
            btn_surrender.classList.remove("disabledBtn");
    }
    else if(holdChips==0){
        setGameResText("滾吧!你這隻賭蟲", 2);
        btn_bet.classList.add("disabledBtn");
        btn_hit.classList.add("disabledBtn");
        btn_stand.classList.add("disabledBtn");
        btn_double.classList.add("disabledBtn");
        btn_split.classList.add("disabledBtn");
        btn_surrender.classList.add("disabledBtn");
    }
    else if(betChips1>holdChips )
        setGameResText("high bets", 2);
    else if(betChips1 == 0)
        setGameResText("no enough bets", 2);
    else
        setGameResText("invalid input\nuints is 10", 2);
    },1000);
}


function onClick_cheat(){
    console.log("cheat");
    /* ==== */
    isDealerCheat = !isDealerCheat;
    if(isDealerCheat)
        btn_cheat.children[0].innerText = "CHEAT OFF";
    else
        btn_cheat.children[0].innerText = "CHEAT ON";
        
}