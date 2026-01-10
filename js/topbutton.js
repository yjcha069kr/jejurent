const topBtn = document.getElementById("topBtn");

// 스크롤 시 버튼 표시 / 숨김
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
});

// 클릭 시 상단 이동
topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
