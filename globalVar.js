
/* dom elements */
let btn_hit     ;
let btn_stand   ;
let btn_double  ;
let btn_split   ;
let btn_cheat   ;
let btn_bet     ;
let btn_surrender;
let input_chips  ;
let AllChips    ;
let arrow       ;
let layer_card  ;
let game_result ;

/* types */
let typearr = ["Hearts","Clubs", "Diamonds", "Spades"];
let splitState = "NOSPLIT";
let splitType = {
    "NOSPLIT":"NOSPLIT",
    "PILEONE":"PILEONE",
    "PILETWO":"PILETWO"
}
let judgeType = {
    "BJK":5,    //  黑傑克
    "FIV":4,    //  五小龍
    "NML":3,    //  普通21
    "GNL":2,    //  普通牌
    "BST":1     //  爆牌
};

/* data structure */
// let Q = genDeckQueue2();
// let needShuffle=false;
let needShuffle=true;
let Q = genDeckQueue();
let rm = [];                    /* 丟棄牌組 */
let dealer = [];                /* 莊家牌組 */
let playerQ1 = [];              /* 閒家牌組 */
let playerQ2 = [];              /* 閒家牌組 */

/* player holdings */
let holdChips=1000;             /* 持有籌碼 */
let betChips1=0;                /* 下注籌碼 */
let betChips2=0;                /* 下注籌碼 */
let isDealerCheat = false;      /* 莊家作弊 */


let lateTick = 0;
let shfDist = 5;
let mid_x = 45;

let startPos={"x":0, "y":0};
let rmPos = {"x":90, "y":0};

combineQueueThreshold = 13;

/* debug */
let isDebug = false;
