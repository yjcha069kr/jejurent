/* ==================== 섹션1: 검색 바 ==================== */
document.addEventListener('DOMContentLoaded', () => {
    const filterBoxes = document.querySelectorAll('.filter-box');

    // 필터 박스 클릭
    filterBoxes.forEach(box => {
        box.addEventListener('click', e => {
            const isActive = box.classList.contains('active');

            // 다른 박스 닫기
            filterBoxes.forEach(b => b.classList.remove('active'));

            if (!isActive) {
                box.classList.add('active');

                // 날짜 선택 자동 열기 (지원 브라우저)
                const dateInput = box.querySelector('.date-input');
                if (dateInput?.showPicker) {
                    setTimeout(() => dateInput.showPicker(), 0);
                }
            }

            e.stopPropagation();
        });
    });

    // 바깥 클릭 시 닫기
    document.addEventListener('click', () => {
        filterBoxes.forEach(box => box.classList.remove('active'));
    });

    // 보험 / 연령 옵션 선택
    document.querySelectorAll('.option-list li').forEach(option => {
        option.addEventListener('click', e => {
            e.stopPropagation();

            const box = option.closest('.filter-box');
            const display = box.querySelector('.value-display');

            display.textContent = option.textContent;
            display.style.color = '#ff5000';

            box.classList.remove('active');
        });
    });

    // 날짜 선택
    document.querySelectorAll('.date-input').forEach(input => {
        input.addEventListener('change', e => {
            e.stopPropagation();

            const box = input.closest('.filter-box');
            const display = box.querySelector('.value-display');

            display.textContent = input.value;
            display.style.color = '#ff5000';

            box.classList.remove('active');
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