// ======================= 공지사항 페이지네이션 =======================
document.addEventListener("DOMContentLoaded", () => {
    const itemsPerPage = 10;
    const items = document.querySelectorAll(".notice-item");
    const pageButtons = document.querySelectorAll(".pagination .page-number");

    function showPage(pageIndex) {
        const start = pageIndex * itemsPerPage;
        const end = start + itemsPerPage;

        items.forEach((item, idx) => {
            if (idx >= start && idx < end) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });

        // 버튼 active 처리
        pageButtons.forEach(btn => btn.classList.remove("active"));
        pageButtons[pageIndex].classList.add("active");
    }

    // 버튼 클릭 이벤트
    pageButtons.forEach((btn, idx) => {
        btn.addEventListener("click", () => {
            showPage(idx);
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    // 초기 페이지
    showPage(0);
});
