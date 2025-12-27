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