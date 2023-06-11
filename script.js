	// 開始遊戲按鈕按下後顯示決定人數按鈕和設定人數表單
	function CLICK_startGame() {
		document.getElementById("start-btn").style.display = "none";
		document.getElementById("confirmPlayerNum-btn").style.display = "block";
		document.getElementById("playerNumSet-Form").style.display = "block";
	}
	
	// 設定人數表單的減號按鈕
	const minusBtn = document.getElementById("minus-btn");
	minusBtn.addEventListener("click", () => {
	const numberInput = document.getElementById("playerNum");
	// 如果目前的數字大於最小值，就把數字減1
	if (parseInt(numberInput.value) > parseInt(numberInput.min)) {
		numberInput.value = parseInt(numberInput.value) - 1;
	}
	});
	
	// 設定人數表單的加號按鈕
	const plusBtn = document.getElementById("plus-btn");
	plusBtn.addEventListener("click", () => {
	const numberInput = document.getElementById("playerNum");
	// 如果目前的數字小於最大值，就把數字加1
	if (parseInt(numberInput.value) < parseInt(numberInput.max)) {
		numberInput.value = parseInt(numberInput.value) + 1;
	}
	});
	
	// 決定人數按鈕按下後顯示確認玩家按鈕和設定玩家表單
	function CLICK_confirmPlayerNum() {
		document.getElementById("confirmPlayerNum-btn").style.display = "none";
		document.getElementById("playerNumSet-Form").style.display = "none";
		document.getElementById("setPlayerName-btn").style.display = "block";
		document.getElementById("setPlayerName-list").style.display = "block";
	}
	
	// 生成設定表單, 以撞球圖片作為序號, 並且加入可輸入的玩家名稱欄位
	function generateSetPlayerList() {
		const TotalNumOfPlayer = parseInt(document.getElementById("playerNum").value, 10);
		const containerOfSetPlayerList = document.getElementById("SetPlayerList");
		
		containerOfSetPlayerList.innerHTML = "";
		
		for (let i = 1; i <= TotalNumOfPlayer; i++) {
			const playerItem = document.createElement("li");
			const orderImage = document.createElement("img");
			const enterPlayerName = document.createElement("input");
		
			orderImage.setAttribute("src", `https://raw.githubusercontent.com/maxchang-ai/pool/main/icon/ball_0${i}.png`);
			enterPlayerName.setAttribute("type", "text");
		
			playerItem.appendChild(orderImage);
			playerItem.appendChild(enterPlayerName);
			containerOfSetPlayerList.appendChild(playerItem);
		}
	}
	
	// 確認玩家按鈕按下後顯示玩家清單及獲勝按鈕
	function CLICK_confirmPlayerName() {
		document.getElementById("setPlayerName-btn").style.display = "none";
		document.getElementById("setPlayerName-list").style.display = "none";
		document.getElementById("SetFinalPlayer-list").style.display = "block";
		document.getElementById("setWinner-btn").style.display = "block";
	}
	
	// 生成最終玩家清單, 以撞球圖片作為序號, 並且顯示玩家輸入的名稱
function generateFinalPlayerList() {
  const containerOfFinalPlayerList = document.getElementById("FinalPlayerList");
  containerOfFinalPlayerList.innerHTML = "";

  const containerOfSetPlayerList = document.getElementById("SetPlayerList");
  const arrayOfPlayerName = containerOfSetPlayerList.getElementsByTagName("input");

  for (let i = 1; i <= arrayOfPlayerName.length; i++) {
    const playerItem = document.createElement("li");
    const orderImage = document.createElement("img");
    const playerName = document.createElement("input");
    const winnerImage = document.createElement("img");
    const imageBalance = document.createElement("img");

    playerItem.setAttribute("id", "playerItem0" + i);

    orderImage.setAttribute(
      "src",
      `https://raw.githubusercontent.com/maxchang-ai/pool/main/icon/ball_0${i}.png`
    );
    playerName.setAttribute("type", "text");
    playerName.setAttribute("class", "player-name");
    playerName.setAttribute("readonly", true);
    playerName.value = arrayOfPlayerName[i - 1].value;

    winnerImage.setAttribute(
      "src",
      `https://raw.githubusercontent.com/maxchang-ai/pool/main/icon/winner.png`
    );
    winnerImage.setAttribute("id", "imageInput0" + i);
    winnerImage.style.visibility = "hidden";
	
    imageBalance.setAttribute(
      "src",
      `https://raw.githubusercontent.com/maxchang-ai/pool/main/icon/winner.png`
    );
    imageBalance.setAttribute("id", "imageBalance0" + i);
    imageBalance.style.visibility = "hidden";

    playerItem.appendChild(imageBalance);
    playerItem.appendChild(orderImage);
    playerItem.appendChild(playerName);
    playerItem.appendChild(winnerImage);
    containerOfFinalPlayerList.appendChild(playerItem);

    // 添加點擊事件處理程序
    playerName.addEventListener("click", function () {
		
      // 設定玩家的透明度為[0.8]
      const allPlayerItems = containerOfFinalPlayerList.getElementsByTagName("li");
      for (let j = 0; j < allPlayerItems.length; j++) {
        if (allPlayerItems[j].id.startsWith("playerItem0")) {
          allPlayerItems[j].style.opacity = "0.8";
        }
	  }
	  // 隱藏所有圖片欄位[winnerImage]的顯示狀態
	  const allImageInputs = containerOfFinalPlayerList.getElementsByTagName("img");
      for (let k = 0; k < allImageInputs.length; k++) {
        if (allImageInputs[k].id.startsWith("imageInput0")) {
          allImageInputs[k].style.visibility = "hidden";
          allImageInputs[k].style.transform = "translateX(-110px) translateY(-78px) rotate(19deg)";
        }
	  }

    // 顯示當前點擊的圖片欄位
	  // 設定玩家的所有欄位透明度為[1]
      playerItem.style.opacity = "1";
	  // 設定圖片欄位[winner]為顯示狀態
      winnerImage.style.visibility = "visible";
    });
  }
}

// 確認贏家按鈕按下後重新排序最終玩家清單
function CLICK_confirmWinner() {
  const selectedIndex = getSelectedIndex(); // 取得當前所選取的欄位索引
  reorderFinalPlayerList(selectedIndex);
  hideWinnerImages(); // 隱藏所有的winner image
}

// 取得當前所選取的欄位索引
function getSelectedIndex() {
  const containerOfFinalPlayerList = document.getElementById("FinalPlayerList");
  const allPlayerItems = containerOfFinalPlayerList.getElementsByTagName("li");
  
  for (let i = 0; i < allPlayerItems.length; i++) {
    if (allPlayerItems[i].style.opacity === "1") {
      return i;
    }
  }
  
  return -1; // 如果沒有選取任何欄位，返回-1
}

function reorderFinalPlayerList(selectedIndex) {
  const containerOfFinalPlayerList = document.getElementById("FinalPlayerList");
  const playerItems = Array.from(containerOfFinalPlayerList.getElementsByTagName("li"));
  const numOfPlayerItems = playerItems.length;

  // 取得原始玩家名稱順序
  const originalPlayerNames = playerItems.map((item) => item.querySelector(".player-name").value);

  // 更新玩家名稱
  playerItems[0].querySelector(".player-name").value = originalPlayerNames[selectedIndex];
  console.log(originalPlayerNames[selectedIndex])
	
 	if ( selectedIndex === 0 ) {
		playerItems[1].querySelector(".player-name").value = originalPlayerNames[numOfPlayerItems - 1];
	
		for (let i = 2; i < numOfPlayerItems; i++) {
			const currentPlayerItem = playerItems[i];
			currentPlayerItem.querySelector(".player-name").value = originalPlayerNames[i];
		}	
	
		playerItems[numOfPlayerItems - 1].querySelector(".player-name").value = originalPlayerNames[1];
	} 

	if ( [numOfPlayerItems - 1] > selectedIndex > 0 ) {
		playerItems[1].querySelector(".player-name").value = originalPlayerNames[(selectedIndex - 1 + numOfPlayerItems) % numOfPlayerItems];
		
		for (let i = 2; i < numOfPlayerItems; i++) {
			const currentPlayerItem = playerItems[i];
			currentPlayerItem.querySelector(".player-name").value = originalPlayerNames[(selectedIndex + i) % numOfPlayerItems];
		}
		
		playerItems[numOfPlayerItems - 1].querySelector(".player-name").value = originalPlayerNames[selectedIndex + 1];
	}
	
	if ( [numOfPlayerItems - 1] == selectedIndex ) {
		playerItems[1].querySelector(".player-name").value = originalPlayerNames[numOfPlayerItems - 2];
		
		for (let i = 2; i < numOfPlayerItems; i++) {
			const currentPlayerItem = playerItems[i];
			currentPlayerItem.querySelector(".player-name").value = originalPlayerNames[i - 1];
		}
		
		playerItems[numOfPlayerItems - 1].querySelector(".player-name").value = originalPlayerNames[0];
	}
  
  // 重新加入更新後的玩家項目
  playerItems.forEach((item) => containerOfFinalPlayerList.appendChild(item));
}

// 隱藏所有的winner image
function hideWinnerImages() {
  const containerOfFinalPlayerList = document.getElementById("FinalPlayerList");
  const allWinnerImages = containerOfFinalPlayerList.querySelectorAll("li img[id^='imageInput0']");

  allWinnerImages.forEach((image) => {
    image.style.visibility = "hidden";
  });
}
