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
		const num = parseInt(document.getElementById("playerNum").value, 10);
		const container = document.getElementById("SetPlayerList");
		
		container.innerHTML = "";
		
		for (let i = 1; i <= num; i++) {
			const listItem = document.createElement("li");
			const img = document.createElement("img");
			const input = document.createElement("input");
		
			img.setAttribute("src", `https://raw.githubusercontent.com/maxchang-ai/pool/main/icon/ball_0${i}.png`);
			input.setAttribute("type", "text");
		
			listItem.appendChild(img);
			listItem.appendChild(input);
			container.appendChild(listItem);
		}
	}
	
	// 確認玩家按鈕按下後顯示玩家清單及獲勝按鈕
	function CLICK_confirmPlayerName() {
		document.getElementById("setPlayerName-btn").style.display = "none";
		document.getElementById("setPlayerName-list").style.display = "none";
		document.getElementById("SetFinalPlayer-list").style.display = "block";
	}
	
	// 生成最終玩家清單, 以撞球圖片作為序號, 並且顯示玩家輸入的名稱
	function generateFinalPlayerList() {
		const FinalPlayerList = document.getElementById("FinalPlayerList");
		FinalPlayerList.innerHTML = "";
		
		const playerList = document.getElementById("SetPlayerList");
		const playerInputs = playerList.getElementsByTagName("input");
		
		for (let i = 1; i <= playerInputs.length; i++) {
			const listItem = document.createElement("li");
			const img = document.createElement("img");
			const playerName = playerInputs[i - 1].value;
			const nameInput = document.createElement("input");
		
			img.setAttribute("src", `https://raw.githubusercontent.com/maxchang-ai/pool/main/icon/ball_0${i}.png`);
			nameInput.setAttribute("type", "text");
			nameInput.setAttribute("readonly", true);
			nameInput.value = playerName;
		
			listItem.appendChild(img);
			listItem.appendChild(nameInput);
			FinalPlayerList.appendChild(listItem);
		}
	}
