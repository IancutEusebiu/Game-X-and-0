const game = document.getElementById('game');
const btnReset = document.getElementById('resetBtn');

generateTable();

function generateTable() {
  let row, col;
  for (let i = 0; i < 9; i++) {
    let e = document.createElement("div");
    row = Math.round((i + 2) / 3) - 1;
    col = Math.round((i) % 3);
    e.setAttribute('row', row);
    e.setAttribute('col', col);
    game.appendChild(e);
  }
}

const matrice = [
  [null, null, null],
  [null, null, null],
  [null, null, null]];

let row, col;
let player = "X", occupied = 0;

resetBtn.addEventListener('click', resetGame);

game.addEventListener('click', (e) => {
  const tg = e.target;
  row = parseInt(tg.getAttribute('row'));
  col = parseInt(tg.getAttribute('col'));
  if (matrice[row][col])
    return;
  matrice[row][col] = player;
  tg.innerHTML = player;
  occupied++;
  if (gameOver(row, col, player)) {
    document.getElementById("msg").textContent = `Felicitari ${player}! Ai castigat.`;
    document.getElementById("img").src="win.png";
    openPopup();
    resetBtn.disabled = false;
  } else if (occupied == 9) {
    document.getElementById("msg").textContent = `Remiza!`;
    document.getElementById("img").src= "draw.png";
    openPopup();
    resetBtn.disabled = false;
  }
  else {
    changePlayer();
  }
});

function gameOver(row, col, player) {
  let cnt = 0;
  for (let i = 0; i < 3; i++) {
    if (matrice[row][i] == player)
      cnt++;
  }
  if (cnt == 3) return true;
  cnt = 0;
  for (let i = 0; i < 3; i++) {
    if (matrice[i][col] == player)
      cnt++;
  }
  if (cnt == 3) return true;
  if (row == col) {
    cnt = 0;
    for (let i = 0; i < 3; i++) {
      if (matrice[i][i] == player)
        cnt++;
    }
  } else if (row + col == 2) {
    cnt = 0;
    for (let i = 0; i < 3; i++) {
      if (matrice[i][3 - i - 1] == player)
        cnt++;
    }
  }
  if (cnt == 3) return true;
  return false;
}
function resetGame() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      matrice[i][j] = null;
    }
  }
  Array.from(document.querySelectorAll('div[row]')).forEach(x => {
    x.textContent = null;
  });
  document.getElementById('player').textContent = player;
  occupied = 0;
  resetBtn.disabled = true;
}

function changePlayer() {
  player = player == "X" ? "0" : "X";
  document.getElementById('player').textContent = player;
}

let popup = document.getElementById("popup");
let closePop = document.getElementById("closePop");
function openPopup() {
  popup.classList.add("open-popup");
}
function closePopup() {
  popup.classList.remove("open-popup");

}

closePop.addEventListener('click', closePopup);
   


