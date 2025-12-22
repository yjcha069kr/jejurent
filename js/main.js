/* ==================== 섹션1: 검색 바 ==================== */
document.addEventListener('DOMContentLoaded', () => {
    const filterBoxes = document.querySelectorAll('.filter-box');
    filterBoxes.forEach(box => {
        box.addEventListener('click', e => {

            // 날짜 선택 박스 (인수 / 반납) 
            if (box.classList.contains('date-box')) {
                const dateInput = box.querySelector('.date-input');

                // showPicker()를 지원하는 브라우저에서만 실행
                if (dateInput?.showPicker) {
                    dateInput.showPicker();
                }

                return;
            }

            // 보험 / 연령 선택 박스
            const isActive = box.classList.contains('active');

            filterBoxes.forEach(b => b.classList.remove('active'));

            if (!isActive) {
                box.classList.add('active');
            }

            e.stopPropagation();
        });
    });

    /* ===============================
       화면 바깥 클릭 시 모든 팝업 닫기
       =============================== */
    document.addEventListener('click', () => {
        filterBoxes.forEach(box => box.classList.remove('active'));
    });

    /* ===============================
       보험 / 연령 옵션 클릭 처리
       =============================== */
    document.querySelectorAll('.option-list li').forEach(option => {
        option.addEventListener('click', e => {
            // 클릭 이벤트가 상위로 전파되는 것 방지
            e.stopPropagation();

            // 선택된 옵션이 속한 필터 박스 찾기
            const box = option.closest('.filter-box');
            const display = box.querySelector('.value-display');

            // 선택한 텍스트를 화면에 표시
            display.textContent = option.textContent;

            // 선택되었음을 강조하는 색상
            display.style.color = '#ff5000';

            // 옵션 선택 후 팝업 닫기
            box.classList.remove('active');
        });
    });

    /* ===============================
       날짜 선택 처리 (인수 / 반납)
       =============================== */
    document.querySelectorAll('.date-input').forEach(input => {
        input.addEventListener('change', e => {
            // 이벤트 전파 방지
            e.stopPropagation();

            // 날짜 input이 속한 필터 박스 찾기
            const box = input.closest('.filter-box');
            const display = box.querySelector('.value-display');

            // 선택한 날짜를 화면에 표시
            display.textContent = input.value;

            // 날짜 선택 완료 표시 색상
            display.style.color = '#ff5000';
        });
    });
});

/* ==================== 섹션3: 렌터카 카드 더보기 ==================== */
const showMoreBtn = document.querySelector('.more-btn');
const hiddenCards = document.querySelectorAll('.car-card.hidden');

if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
        hiddenCards.forEach(card => card.classList.remove('hidden'));
        showMoreBtn.style.display = 'none';
    });
}