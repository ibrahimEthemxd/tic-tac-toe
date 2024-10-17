const cells = document.querySelectorAll('.cell') // Oyun tahtasındaki tüm hücreleri seçer.
const message = document.querySelector(".message") // Oyun durumu mesajını göstermek için öğeyi seçer.

let currentPlayer = "X" // Şu anki oyunucu  belirlemek için bu değişken oluşturuldu.

let gameBoard = ["", "", "", "", "", "", "", "", ""] // Oyun tahtasını temisil eden dizi ve başlangıçta boşluklarla doldurulur.

let gameIsOver = false; // Oyunun bitip bitmediğini belirlemek için değişken oluşturulur.


//Kazanma durumunu kontrol eden fonk.
function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let pattern of winPatterns) {
        //mevcut kazanma durumunun indislerini ayrıştırır.
        const [a, b, c] = pattern;
        //eğer aynı oyuncunun işareti üç hücrede aynıysa, oyunu kazanan oyuncuyu belirler.
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameIsOver = true;
            message.textContent = `${currentPlayer} KAZANDI`;

            //kazanan hücreleri renklendirir
            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");
            return;
        }
    }
    //eğer oyun tahtası dolu ise ve kazanan yoksa oyun berabere biter.
    if (!gameBoard.includes("")) {
        gameIsOver = true;
        message.textContent = "OYUN BERABERE!";
    }
}

//Oyuncunun hamle yapmasını sağlayan fonk.
function makeMove(cellIndex) {
    //Eğer hücre boşsa ve oyun bitmemişse hamle yapılır.
    if (!gameBoard[cellIndex] && !gameIsOver) {
        // Hücreye mevcut oyuncunun işareti eklenir.
        gameBoard[cellIndex] = currentPlayer;
        cells[cellIndex].textContent = currentPlayer;
        cells[cellIndex].classList.add(currentPlayer);

        //Kazanma durumu kontrol edilir.
        checkWin();

        //Oyuncu Değiştirilir.
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

//Oyunu yeniden başlatan fonk.
function restartGame() {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""] // Oyun tahtasını temisil eden dizi ve başlangıçta boşluklarla doldurulur.
    gameIsOver = false;
    message.textContent = "";

    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("win", "X", "O");
    })
}