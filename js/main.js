/* ==================== 섹션1: 검색 바 ==================== */
document.addEventListener('DOMContentLoaded', () => {
    const filterBoxes = document.querySelectorAll('.filter-box');
    filterBoxes.forEach(box => {
        box.addEventListener('click', e => {

            // 날짜 선택 박스 (인수 / 반납)
            if (box.classList.contains('date-box')) {
                const dateInput = box.querySelector('.date-input');

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

    document.addEventListener('click', () => {
        filterBoxes.forEach(box => box.classList.remove('active'));
    });

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

    document.querySelectorAll('.date-input').forEach(input => {
        input.addEventListener('change', e => {
            e.stopPropagation();

            const box = input.closest('.filter-box');
            const display = box.querySelector('.value-display');

            display.textContent = input.value;
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