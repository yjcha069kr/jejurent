// ==================== 섹션2: 검색바 ====================
document.addEventListener('DOMContentLoaded', () => {

    let pickupDate = null;
    let returnDate = null;

    document.querySelectorAll('.date-box').forEach((box, index) => {
        const input = box.querySelector('.date-input');
        const display = box.querySelector('.value-display');
        const calendar = box.querySelector('.calendar');
        const monthYear = box.querySelector('.month-year');
        const body = box.querySelector('.calendar-body');
        const prevBtn = box.querySelector('.prev-month');
        const nextBtn = box.querySelector('.next-month');

        const days = ['일','월','화','수','목','금','토'];
        let currentDate = new Date();

        function formatDate(d){
            return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
        }

        function renderCalendar(date){
            body.innerHTML = '';

            // 요일 표시
            days.forEach(d => {
                const el = document.createElement('div');
                el.textContent = d;
                el.className = 'calendar-day';
                body.appendChild(el);
            });

            const year = date.getFullYear();
            const month = date.getMonth();
            monthYear.textContent = `${year}년 ${month+1}월`;

            const firstDay = new Date(year, month, 1).getDay();
            const lastDate = new Date(year, month+1, 0).getDate();

            for(let i=0;i<firstDay;i++) body.appendChild(document.createElement('div'));

            const today = new Date();
            today.setHours(0,0,0,0); // 오늘 기준

            for(let i=1;i<=lastDate;i++){
                const dateEl = document.createElement('div');
                dateEl.textContent = i;
                dateEl.className = 'calendar-date';

                const selected = new Date(year, month, i);

                // 오늘 이전 날짜는 disabled (CSS에서 색상/클릭 제한 처리)
                if(selected < today){
                    dateEl.classList.add('disabled');
                }

                dateEl.addEventListener('click', ()=>{
                    if(dateEl.classList.contains('disabled')) return;

                    if(index===0){ // 인수일시 선택
                        pickupDate = selected;
                        display.textContent = formatDate(selected);
                        display.style.color = '#ff5000';

                        // 반납 날짜가 인수일시보다 빠르면 초기화 및 경고
                        if(returnDate && returnDate < pickupDate){
                            alert('반납 날짜가 인수 날짜보다 빠릅니다. 반납 날짜를 다시 선택해주세요.');
                            returnDate = null;
                            const returnDisplay = document.querySelector('#return-box .value-display');
                            returnDisplay.textContent = '* 날짜 선택';
                            returnDisplay.style.color = '#333';
                        }
                    } else { // 반납일시 선택
                        if(!pickupDate){
                            alert('먼저 인수 날짜를 선택해주세요.');
                            return;
                        }

                        if(selected < pickupDate){
                            alert('반납 날짜는 인수 날짜 이후여야 합니다.');
                            return;
                        }

                        returnDate = selected;
                        display.textContent = formatDate(selected);
                        display.style.color = '#ff5000';
                    }

                    calendar.style.display='none';
                });

                body.appendChild(dateEl);
            }
        }

        // input 클릭 시 달력 열기
        input.addEventListener('click', e=>{
            e.stopPropagation();
            calendar.style.display = calendar.style.display==='block' ? 'none' : 'block';
            renderCalendar(currentDate);
        });

        // 이전/다음 달 이동
        prevBtn.addEventListener('click', e=>{
            e.stopPropagation();
            currentDate.setMonth(currentDate.getMonth()-1);
            renderCalendar(currentDate);
        });

        nextBtn.addEventListener('click', e=>{
            e.stopPropagation();
            currentDate.setMonth(currentDate.getMonth()+1);
            renderCalendar(currentDate);
        });

        // 달력 외 클릭 시 닫기
        document.addEventListener('click', e=>{
            if(!box.contains(e.target)) calendar.style.display='none';
        });
    });

    // ==================== 옵션 선택 (보험/연령) ====================
    const filterBoxes = document.querySelectorAll('.filter-box:not(.date-box)');
    filterBoxes.forEach(box=>{
        box.addEventListener('click', e=>{
            const isActive = box.classList.contains('active');
            filterBoxes.forEach(b=>b.classList.remove('active'));
            if(!isActive) box.classList.add('active');
            e.stopPropagation();
        });
    });

    document.addEventListener('click', ()=>filterBoxes.forEach(box=>box.classList.remove('active')));

    document.querySelectorAll('.option-list li').forEach(option=>{
        option.addEventListener('click', e=>{
            e.stopPropagation();
            const box = option.closest('.filter-box');
            const display = box.querySelector('.value-display');
            display.textContent = option.textContent;
            display.style.color = '#ff5000';
            box.classList.remove('active');
        });
    });

});




/* ==================== 섹션3: 렌터카 카드 더보기 ==================== */
document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.section-3 .car-items-wrapper');
    const track = wrapper.querySelector('.car-items');
    const cards = track.querySelectorAll('.car-card');
    const dotsContainer = wrapper.querySelector('.slider-dots');

    const visibleCards = 3; // 화면에 보이는 카드 수
    let currentIndex = 0;

    const totalCards = cards.length;
    const totalPages = totalCards - visibleCards + 1;

    // 페이지네이션 버튼 생성
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('button');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateSlide();
        });
        dotsContainer.appendChild(dot);
    }

    function updateSlide() {
        const cardWidth = cards[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(track).gap);
        const translateX = (cardWidth + gap) * currentIndex;
        track.style.transform = `translateX(-${translateX}px)`;

        // active dot
        dotsContainer.querySelectorAll('button').forEach((btn, idx) => {
            btn.classList.toggle('active', idx === currentIndex);
        });
    }

    updateSlide();

    // 화면 크기 바뀔 때 재계산
    window.addEventListener('resize', updateSlide);
});




/* ==================== 섹션4: 카페패스 ==================== */
document.querySelectorAll('.cafe-card').forEach(card => {
    const wrapper = card.querySelector('.slide-wrapper');
    const slides = card.querySelectorAll('.slide');
    const prevBtn = card.querySelector('.prev-btn');
    const nextBtn = card.querySelector('.next-btn');
    const totalSlides = slides.length;
    const countSpan = card.querySelector('.slide-count'); // 숫자 span

    let currentIndex = 0;

    function updateSlide() {
        // 슬라이드 이동
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        // 숫자만 업데이트
        countSpan.textContent = `${currentIndex + 1}/${totalSlides}`;
    }

    prevBtn.addEventListener('click', e => {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlide();
    });

    nextBtn.addEventListener('click', e => {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlide();
    });

    // 초기 설정
    updateSlide();
});





