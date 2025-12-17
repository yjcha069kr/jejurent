// ==================== 섹션1: 검색 바 ====================
document.addEventListener('DOMContentLoaded', function() {
    const filterBoxes = document.querySelectorAll('.filter-box');

    filterBoxes.forEach(box => {
        box.addEventListener('click', function(event) {
            const isAlreadyActive = this.classList.contains('active');

            filterBoxes.forEach(item => item.classList.remove('active'));

            if (!isAlreadyActive) {
                this.classList.add('active');

                const dateInput = this.querySelector('.date-input');
                if (dateInput && dateInput.showPicker) {
                    setTimeout(() => {
                        dateInput.showPicker();
                    }, 0);
                }
            }

            event.stopPropagation();
        });
    });

    document.addEventListener('click', function() {
        filterBoxes.forEach(box => box.classList.remove('active'));
    });

    // ✅ 옵션 선택
    document.querySelectorAll('.option-list li').forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const box = this.closest('.filter-box');
            box.querySelector('.value-display').textContent = this.textContent;
            box.classList.remove('active');
        });
    });
    // ✅ 날짜 선택
    document.querySelectorAll('.date-input').forEach(input => {
        input.addEventListener('change', function(e) {
            e.stopPropagation();
            const box = this.closest('.filter-box');
            box.querySelector('.value-display').textContent =
                this.value.replace('T', ' ');
            box.classList.remove('active');
        });
    });
});

// ===옵션 선택 후 선택된 항목들 색깔 변함===
const filterBoxes = document.querySelectorAll('.filter-box');

filterBoxes.forEach(box => {
    const valueDisplay = box.querySelector('.value-display');

    // 날짜 선택 후
    const dateInput = box.querySelector('.date-input');
    if(dateInput){
        dateInput.addEventListener('change', () => {
            if(dateInput.value){
                valueDisplay.style.color = '#ff5000'; // 선택 완료 시 색상
            }
        });
    }
    // 보험, 운전자 연령 선택 후
    const options = box.querySelectorAll('.option-list li');
    options.forEach(option => {
        option.addEventListener('click', () => {
            valueDisplay.textContent = option.textContent; // 선택 값 표시
            valueDisplay.style.color = '#ff5000';         // 색상 변경
            box.classList.remove('active');               // 팝업 닫기
        });
    });
});



// ==================== 섹션2: 이벤트 배너 슬라이드 ====================
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".event-items");
    const cards = document.querySelectorAll(".event-card");
    const total = cards.length;

    let index = 0;

    function moveSlide() {
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    // 5초마다 자동 이동
    setInterval(() => {
        index = (index + 1) % total;
        moveSlide();
    }, 5000);
});


// ==================== 섹션3: 렌트카 카드 "더보기" 버튼 ====================
const showMoreBtn = document.querySelector(".more-btn");
const hiddenCards = document.querySelectorAll(".car-card.hidden");

showMoreBtn.addEventListener("click", () => {
    hiddenCards.forEach(card => card.classList.remove("hidden"));
    showMoreBtn.style.display = "none"; // 버튼 숨기기
});