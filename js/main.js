"use strict";

//feature0にてtimerの作成

{

  //タイピングゲーム部分の実装
  //DOMの取得
  // const targetName = document.querySelector(".targetName");
  const target = document.getElementById("target");
  const targetIcon = document.getElementById("targetIcon");
  const scoreLabel = document.getElementById("score");
  const missLabel = document.getElementById("miss");
  const counterLabel = document.getElementById("counter");
  const clearCounter = document.getElementById("clearCounter");

  const time = document.getElementById("time");



  //タイピングゲームのタイプする文字列を格納
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
  let gameLevel = 30;//何問のタイピングを終了したらクリアするか設定
  let startTime;
  let timeoutId;

  //Counterのゲームレベルを表示
  clearCounter.textContent = gameLevel;

  //タイピングのターゲットを更新する関数
  function updateTarget() {
    let placeholder = "";
    for (let i = 0; i < loc; i++) {
      placeholder += "_";
    }
    target.textContent = placeholder + word.substring(loc);
  };

  //時間経過を描写する関数を作成
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


  //スタートの画面のクリックイベント
  window.addEventListener("click", () => {
    if (isPlaying === false) {
      isPlaying = true;
      target.textContent = word;
      targetIcon.textContent = icon;
      target.classList.remove("caution");
      targetIcon.classList.add("clicked");
      startTime = Date.now();
      countUp();
    } else {
      return;
    }
  });

  //タイピングゲームのタイプを実装
  window.addEventListener("keydown", (e) => {
      if (isPlaying === false) {
        return;
      } else {
        if (e.key === word[loc]) {
          loc++;
          score++;
          if (loc === word.length) {
            loc = 0;
            counter++;
            counterLabel.textContent = counter;
            randomNumbers = Math.floor(Math.random() * Words.length);
            icon = Words[randomNumbers].icon;
            targetIcon.textContent = icon;
            word = Words[randomNumbers].name;
          }
          updateTarget();
          scoreLabel.textContent = score;
        } else {
          miss++;
          missLabel.textContent = miss;
        }
      }
  });

}
