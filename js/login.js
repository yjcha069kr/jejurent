/* ================== 회원/비회원 탭 ================== */
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.dataset.tab;

    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById(target).classList.add('active');
  });
});

/* ================== 비회원 로그인 버튼 활성화 ================== */
const guestForm = document.getElementById("guest");
const guestBtn = guestForm.querySelector(".confirm-btn");
const guestInputs = guestForm.querySelectorAll("input");

function checkGuestInputs() {
    const allFilled = [...guestInputs].every(input => input.value.trim() !== "");
    guestBtn.disabled = !allFilled;

    guestBtn.style.background = allFilled ? "#ff5000" : "#ccc";
    guestBtn.style.cursor = allFilled ? "pointer" : "default";
}

guestInputs.forEach(input => input.addEventListener("input", checkGuestInputs));

/* ================== 회원 로그인 버튼 활성화 ================== */
const memberForm = document.getElementById("member");
const memberBtn = memberForm.querySelector(".login-btn");
const memberInputs = memberForm.querySelectorAll("input");

function checkMemberInputs() {
    const allFilled = [...memberInputs].every(input => input.value.trim() !== "");
    memberBtn.disabled = !allFilled;

    memberBtn.style.background = allFilled ? "#ff5000" : "#ccc";
    memberBtn.style.cursor = allFilled ? "pointer" : "default";
}

memberInputs.forEach(input => input.addEventListener("input", checkMemberInputs));
