/* ==================== 메인비쥬얼 풀페이지 ==================== */
const mainVisual = document.querySelector('.main-visual');
let scrolling = false;

mainVisual.addEventListener('wheel', (e) => {
    if (scrolling) return; // 연속 스크롤 방지
    if (e.deltaY > 0) { // 아래로 스크롤
        scrolling = true;
        window.scrollTo({
            top: mainVisual.offsetHeight,
            behavior: 'smooth'
        });
        setTimeout(() => scrolling = false, 1000); // 1초 후 스크롤 가능
    }
});

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
const section3 = document.querySelector('.section-3');

if (section3) {
    const showMoreBtn = section3.querySelector('.more-btn');
    const hiddenCards = section3.querySelectorAll('.car-card.hidden');

    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            hiddenCards.forEach(card => {
                card.classList.remove('hidden');
            });
            showMoreBtn.style.display = 'none';
        });
    }
}
