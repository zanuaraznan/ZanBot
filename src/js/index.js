// ripple btn

const btn = document.querySelector("button");

btn.addEventListener("click", (e) => {
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  let ripples = document.createElement("span");
  ripples.style.left = `${x}px`;
  ripples.style.top = `${y}px`;
  btn.appendChild(ripples);

  setTimeout(() => {
    botStart();
    ripples.remove();
  }, 500);
});

// Pertanyaan dan Jawaban

const pertanyaan = document.getElementById("pertanyaan");
const jawaban = document.getElementById("jawaban");
const loader = document.querySelector(".loaderWrapper");

let init = 0;

const botSay = (data) => {
  return [
    "Welcome to ZanBot, Siapa nama anda?",
    `Good to see you, ${data?.nama}, berapa usiamu sekarang?`,
    `Ohhh ${data?.usia} tahun, hobimu yang kamu minati?`,
    `Salah satu hobiku juga ${data?.hobi}, btw punya pacar ga?`,
    `Ohh ${data?.pacar}, okee cuma tes lagian ini cuma bot`,
  ];
};

pertanyaan.textContent = botSay()[0];

let usersData = [];

function botStart() {
  if (jawaban.value.length < 1) return alert("Silahkan isi terlebih dahulu");
  init++;
  btn.textContent = "Kirim";
  if (init === 1) {
    botDelay({ nama: jawaban.value });
  } else if (init === 2) {
    botDelay({ usia: jawaban.value });
  } else if (init === 3) {
    botDelay({ hobi: jawaban.value });
  } else if (init === 4) {
    botDelay({ pacar: jawaban.value });
  } else if (init === 5) {
    finishing();
  } else {
    botEnd();
  }
}

function botDelay(jawabanUser) {
  loader.style.display = "block";
  setTimeout(() => {
    pertanyaan.textContent = botSay(jawabanUser)[init];
    loader.style.display = "none";
  }, [1300]);
  usersData.push(jawaban.value);
  jawaban.value = "";
}

function finishing() {
  loader.style.display = "block";
  setTimeout(() => {
  loader.style.display = "none";
  }, 1300)
  pertanyaan.textContent = `Thank u ${usersData[0]}, udah nyoba ZanBot, kali kali kita maen ${usersData[2]} bareng ya!`;
  jawaban.style.display = "none";
  btn.textContent = "akhiri";
}

function botEnd() {
  alert(
    `Terimakasih sekali lagi ${usersData[0]}, sudah menjadi user test ZanBot, anda akan dialihkan ke halaman utama`
  );
  window.location.reload();
}
