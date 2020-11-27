"use strict";

//feature1を作成

{
  /////////////
  //DOMの取得//
  /////////////
  // const targetName = document.querySelector(".targetName");
  const target = document.getElementById("target");
  const targetIcon = document.getElementById("targetIcon");
  const scoreLabel = document.getElementById("score");
  const missLabel = document.getElementById("miss");
  const counterLabel = document.getElementById("counter");
  const clearCounter = document.getElementById("clearCounter");
  const time = document.getElementById("time");
  const message = document.getElementById("message");

  ////////////////////////////////////////////
  //タイピングゲームのタイプする文字列を格納//
  ////////////////////////////////////////////
  const Words = [
    { icon: "🥑アボカド🥑", name: "avocado" },
    { icon: "🍓いちご🍓", name: "strawberry" },
    { icon: "🥝キウイフルーツ🥝", name: "kiwifruit" },
    { icon: "🌰くり🌰", name: "chestnut" },
    { icon: "🥥ココナッツ🥥", name: "coconuts" },
    { icon: "🍒さくらんぼ🍒", name: "cherry" },
    { icon: "🍉スイカ🍉", name: "watermelon" },
    { icon: "🍐なし🍐", name: "pear" },
    { icon: "🍌バナナ🍌", name: "banana" },
    { icon: "🍍パイナップル🍍", name: "pineapple" },
    { icon: "🍇ぶどう🍇", name: "grape" },
    { icon: "🥭マンゴー🥭", name: "mango" },
    { icon: "🍊みかん🍊", name: "mandrianorange" },
    { icon: "🍈メロン🍈", name: "melon" },
    { icon: "🍑もも🍑", name: "peach" },
    { icon: "🍎りんご🍎", name: "apple" },
    { icon: "🍋レモン🍋", name: "lemon" },
  ];

  let randomNumbers = Math.floor(Math.random() * Words.length);
  let icon = Words[randomNumbers].icon;
  let word = Words[randomNumbers].name;
  let loc = 0;
  let score = 0;
  let miss = 0;
  let isPlaying = false;
  let counter = 0;
  let gameLevel = 3;//何問のタイピングを終了したらクリアするか設定
  let startTime;
  let timeoutId;

  ///////////////////////////////
  //Counterのゲームレベルを表示//
  ///////////////////////////////
  clearCounter.textContent = gameLevel;

  //////////////////////////
  //時間経過を描写する関数//
  //////////////////////////
  function countUp(){
    const day = new Date(Date.now() - startTime);
    const m = String(day.getMinutes()).padStart(2,"0");
    const s = String(day.getSeconds()).padStart(2,"0");
    const ms = String(day.getMilliseconds()).padStart(3,"0");
    time.textContent = `${m}:${s}.${ms}`;
    timeoutId = setTimeout(()=> {
      countUp()
    },10);
  };

  //////////////////////////////
  //ゲーム再開時の数字リセット//
  //////////////////////////////
  function resetGame(){
    loc = 0;
    score = 0;
    miss = 0;
    counter = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    counterLabel.textContent = counter;
  }

  //////////////////////////////////
  //スタート画面のクリックイベント//
  //////////////////////////////////
  window.addEventListener("click", () => {
    if (isPlaying === true) {
      return;
    }
    resetGame();
    isPlaying = true;
    target.textContent = word;
    targetIcon.textContent = icon;
    target.classList.remove("caution");
    target.classList.add("active");
    targetIcon.classList.add("active");
    startTime = Date.now();
    countUp();
  });

  //////////////////////
  //ゲーム終了時の関数//
  //////////////////////
  function gameClear(){
      scoreLabel.textContent = score;
      clearTimeout(timeoutId);
      target.textContent = "✨Congratulations✨";
      targetIcon.textContent = "おめでとうございます！！";
      //typeSpeed.textContent = `${score / }`;
      const percent = score / (score+miss) *100;
      const scorePercent = percent.toPrecision(3);
      let scoreMessage ="";
      if(scorePercent === 100){
      scoreMessage = `正解率${scorePercent}% 完璧！！！`
      } else if(scorePercent >= 85){
      scoreMessage = `正解率${scorePercent}% すごい！!`
      } else if(scorePercent >= 75){
      scoreMessage = `正解率${scorePercent}% やったね♪`
      } else {
      scoreMessage = `正解率${scorePercent}% まだまだいけます！`
      };

      message.textContent = scoreMessage;
      isPlaying = false;
  }

  ////////////////////////////////////////
  //タイピングのターゲットを更新する関数//
  ////////////////////////////////////////
  function updateTypeTarget() {
    let placeholder = "";
    for (let i = 0; i < loc; i++) {
      placeholder += "_";
    }
    target.textContent = placeholder + word.substring(loc);
  };

  //////////////////////////////////
  //タイピングゲームのタイプを実装//
  //////////////////////////////////
  window.addEventListener("keydown", (e) => {
      if (isPlaying === false) {
        return;//ゲームが開始されていなかったら処理を実行しない
      } else {
        if(e.key !== word[loc]){
          miss++;
          missLabel.textContent = miss;
        } else {
          loc++;
          score++;
          scoreLabel.textContent = score;
          if (loc === word.length) {
            loc = 0;
            counter++;
            counterLabel.textContent = counter;
            if(counter === gameLevel) {
              //gameClear()関数を実行し、以下の処理は実行しない
              gameClear();
              return;
            }
            ////////////////////////////////////////////////////////
            //ゲームが終了してない場合、タイプする文字列を変更する//
            ////////////////////////////////////////////////////////
            randomNumbers = Math.floor(Math.random() * Words.length);
            word = Words[randomNumbers].name;
            icon = Words[randomNumbers].icon;
            targetIcon.textContent = icon;
          }
          updateTypeTarget();
        }
      }
  });

}
