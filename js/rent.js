// ===== 인수/반납일시 =====
document.addEventListener('DOMContentLoaded', () => {
    let pickupDate = null;
    let returnDate = null;

    // .calendar-box 클래스를 가진 모든 박스를 처리
    document.querySelectorAll('.calendar-box').forEach((box, index) => {
        const display = box.querySelector('.date-display');
        const calendar = box.querySelector('.calendar');
        const body = box.querySelector('.calendar-body');
        const monthYear = box.querySelector('.month-year');
        const prevBtn = box.querySelector('.prev-month');
        const nextBtn = box.querySelector('.next-month');

        let currentDate = new Date();
        const days = ['일', '월', '화', '수', '목', '금', '토'];

        // 날짜 포맷 함수
        function formatDate(d) {
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        }

        // 달력 렌더링 함수
        function renderCalendar(date) {
            body.innerHTML = '';  // 달력 내용 초기화

            // 요일 표시
            days.forEach(d => {
                const el = document.createElement('div');
                el.className = 'calendar-day';
                el.textContent = d;
                body.appendChild(el);
            });

            const y = date.getFullYear();
            const m = date.getMonth();
            monthYear.textContent = `${y}년 ${m + 1}월`;

            const first = new Date(y, m, 1).getDay(); // 해당 월의 첫 번째 날짜가 시작되는 요일
            const last = new Date(y, m + 1, 0).getDate(); // 해당 월의 마지막 날짜

            // 빈 공간 채우기 (요일에 맞게)
            for (let i = 0; i < first; i++) body.appendChild(document.createElement('div'));

            const today = new Date();
            today.setHours(0, 0, 0, 0); // 오늘 날짜 기준으로 초기화

            // 날짜 생성
            for (let i = 1; i <= last; i++) {
                const d = new Date(y, m, i);
                const el = document.createElement('div');
                el.className = 'calendar-date';
                el.textContent = i;

                if (d < today) el.classList.add('disabled'); // 오늘 이전 날짜는 비활성화

                // 날짜 선택 이벤트
                el.onclick = () => {
                    if (el.classList.contains('disabled')) return;

                    if (index % 2 === 0) {
                        // 인수일시 선택 (홀수번째 박스)
                        pickupDate = d;
                        display.value = formatDate(d);
                        display.style.color = ''; 
                        
                        // 선택된 날짜의 색상을 기본 텍스트 색상으로 설정
                        el.style.color = ''; 

                        if (returnDate && returnDate < pickupDate) {
                            alert('반납 날짜는 인수 날짜 이후여야 합니다.');
                            returnDate = null;
                        }
                    } else {
                        // 반납일시 선택 (짝수번째 박스)
                        if (!pickupDate) {
                            alert('먼저 인수 날짜를 선택해주세요.');
                            return;
                        }
                        if (d < pickupDate) {
                            alert('반납 날짜는 인수 날짜 이후여야 합니다.');
                            return;
                        }
                        returnDate = d;
                        display.value = formatDate(d);
                        display.style.color = '';

                        // 선택된 날짜의 색상을 기본 텍스트 색상으로 설정
                        el.style.color = ''; 
                    }

                    // 날짜 선택 후 달력 닫기
                    setTimeout(() => {
                        calendar.style.display = 'none';
                    }, 0);
                };

                body.appendChild(el);
            }
        }

        // 달력 표시 토글
        display.onclick = e => {
            e.stopPropagation();
            calendar.style.display = 'block';
            renderCalendar(currentDate);
        };

        // 이전/다음 달 이동
        prevBtn.onclick = e => {
            e.stopPropagation();
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar(currentDate);
        };

        nextBtn.onclick = e => {
            e.stopPropagation();
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar(currentDate);
        };

        // 달력 외부 클릭 시 닫기
        document.addEventListener('click', e => {
            if (!box.contains(e.target)) {
                calendar.style.display = 'none';
            }
        });
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