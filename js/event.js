// ======================= 탭 전환 =======================
document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.tab;

            // 버튼 active 처리
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // 콘텐츠 전환
            tabContents.forEach(content => {
                content.classList.remove("active");
                content.style.display = "none";
            });

            const activeTab = document.getElementById(`tab-${target}`);
            activeTab.classList.add("active");
            activeTab.style.display = "grid";
        });
    });

    // 초기 상태 (진행중 이벤트만 보이게)
    document.getElementById("tab-end").style.display = "none";
});



// ======================= 페이지네이션 =======================
function setupPagination(tabId, itemsPerPage = 6) {
    const tab = document.getElementById(tabId);
    const items = tab.querySelectorAll(".event-item");
    const pageButtons = tab.querySelectorAll(".page-number");

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
        });
    });

    // 초기 페이지
    showPage(0);
}

// 진행중 / 종료된 이벤트 각각 적용
document.addEventListener("DOMContentLoaded", () => {
    setupPagination("tab-ing", 6);
    setupPagination("tab-end", 6);
});
