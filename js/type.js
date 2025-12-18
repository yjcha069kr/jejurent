/* // ==================== 탭버튼 누르면 각각 내용 설명 ==================== 
const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // 모든 버튼 active 제거
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // 모든 패널 숨기기
        tabPanels.forEach(panel => panel.style.display = "none");

        // 클릭한 버튼의 data-tab 패널 보이기
        const target = btn.dataset.tab;
        document.getElementById(target).style.display = "block";
    });
});
 */