// ===== 인수/반납 일시 =====
let pickupDate = null;
let returnDate = null;

document.querySelectorAll('.custom-date-box').forEach((box, index) => {
    const input = box.querySelector('.date-display');
    const calendar = box.querySelector('.calendar');
    const body = box.querySelector('.calendar-body');
    const monthYear = box.querySelector('.month-year');
    const prevBtn = box.querySelector('.prev-month');
    const nextBtn = box.querySelector('.next-month');

    const days = ['일', '월', '화', '수', '목', '금', '토'];
    let currentDate = new Date();

    function formatDate(date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }

    function renderCalendar(date) {
        body.innerHTML = '';

        // 요일
        days.forEach(d => {
            const el = document.createElement('div');
            el.textContent = d;
            el.className = 'calendar-day';
            body.appendChild(el);
        });

        const year = date.getFullYear();
        const month = date.getMonth();
        monthYear.textContent = `${year}년 ${month + 1}월`;

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            body.appendChild(document.createElement('div'));
        }

        for (let i = 1; i <= lastDate; i++) {
            const dateEl = document.createElement('div');
            dateEl.textContent = i;
            dateEl.className = 'calendar-date';

            const selected = new Date(year, month, i);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // 지난 날짜 회색 처리
            if (selected < today) dateEl.classList.add('disabled');

            dateEl.addEventListener('click', () => {
                // 지난 날짜는 클릭 안됨
                if (dateEl.classList.contains('disabled')) return;

                if (index === 0) { // 인수
                    pickupDate = selected;
                    input.value = formatDate(selected);
                    // 반납 날짜가 인수보다 빠르면 초기화
                    if (returnDate && returnDate < pickupDate) {
                        returnDate = null;
                        document.querySelectorAll('.date-display')[1].value = '';
                    }
                }

                if (index === 1) { // 반납
                    if (!pickupDate) {
                        alert('먼저 인수 날짜를 선택해주세요.');
                        return;
                    }

                    if (selected < pickupDate) {
                        alert('반납 날짜는 인수 날짜 이후여야 합니다.');
                        return;
                    }

                    returnDate = selected;
                    input.value = formatDate(selected);
                }

                calendar.style.display = 'none';
            });

            body.appendChild(dateEl);
        }
    }

    input.addEventListener('click', e => {
        e.stopPropagation();
        calendar.style.display = calendar.style.display === 'block' ? 'none' : 'block';
        renderCalendar(currentDate);
    });

    prevBtn.addEventListener('click', e => {
        e.stopPropagation();
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextBtn.addEventListener('click', e => {
        e.stopPropagation();
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    document.addEventListener('click', e => {
        if (!box.contains(e.target)) {
            calendar.style.display = 'none';
        }
    });
});

// ===== 차량 타입 선택 =====
const typeBtns = document.querySelectorAll('.type-btn');
const carLists = document.querySelectorAll('.car-list');

typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        typeBtns.forEach(b => b.classList.remove('active'));
        carLists.forEach(list => list.style.display = 'none');

        btn.classList.add('active');
        document.getElementById(btn.dataset.type).style.display = 'grid';
    });
});

// ===== 차량 선택 =====
document.querySelectorAll('.car-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.car-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// ===== 면허 종류 선택 =====
const licenseTabs = document.querySelectorAll('.license-tab');
const licenseInput = document.querySelector('input[name="license"]');

licenseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        licenseTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        licenseInput.value = tab.dataset.value;
    });
});

// ===== 예약 버튼 클릭 시 검증 =====
const rentBtn = document.querySelector('.rent-btn');

rentBtn.addEventListener('click', (e) => {
    e.preventDefault(); // 폼 제출 방지

    let errors = [];

    // 인수/반납
    const dateInputs = document.querySelectorAll('input[type="date"]');
    if (!dateInputs[0].value || !dateInputs[1].value) errors.push("인수/반납일시");

    // 차량
    const selectedCar = document.querySelector('.car-item.active');
    if (!selectedCar) errors.push("차량 선택");

    // 예약자 정보 (이름 + 전화번호)
    const reserverBox = document.querySelectorAll('.box')[2];
    const reserverName = reserverBox.querySelector('input[type="text"]').value.trim();
    const reserverPhone = reserverBox.querySelector('input[type="tel"]').value.trim();
    if (!reserverName || /[^가-힣a-zA-Z\s]/.test(reserverName) || !reserverPhone || !/^\d{10,11}$/.test(reserverPhone)) {
        errors.push("예약자 정보");
    }

    // 운전자 정보 (이름 + 전화번호 + 생년월일 + 면허)
    const driverBox = document.querySelectorAll('.box')[3];
    const driverName = driverBox.querySelectorAll('input[type="text"]')[0].value.trim();
    const driverPhone = driverBox.querySelectorAll('input[type="tel"]')[0].value.trim();
    const birthSelects = driverBox.querySelectorAll('.birth-grid select');
    const birthValid = Array.from(birthSelects).every(sel => sel.value);
    const licenseValid = !!licenseInput.value;

    if (!driverName || /[^가-힣a-zA-Z\s]/.test(driverName) ||
        !driverPhone || !/^\d{10,11}$/.test(driverPhone) ||
        !birthValid || !licenseValid) {
        errors.push("운전자 정보");
    }

    // 부가서비스
    const serviceSelect = document.querySelectorAll('.box')[4].querySelector('select');
    if (!serviceSelect.value) errors.push("유아용품");

    // 결과 처리
    if (errors.length > 0) {
        alert("다시 입력해주세요.\n* " + errors.join("\n* "));
    } else {
        alert("예약이 성공적으로 완료되었습니다!");
    }
});