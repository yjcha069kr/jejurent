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
const carDropdown = document.querySelector('.car-dropdown');

if (carDropdown) {
    const carBtn = carDropdown.querySelector('.dropdown-btn');
    const typeOptions = carDropdown.querySelectorAll('.dropdown-option');
    const carLists = document.querySelectorAll('.car-list');

    // 차량 타입 드롭다운 열기
    carBtn.addEventListener('click', e => {
        e.stopPropagation();
        carBtn.classList.toggle('active');
    });

    // 1️⃣ 차량 타입 선택
    typeOptions.forEach(option => {
        option.addEventListener('click', e => {
            e.stopPropagation();

            const targetId = option.dataset.value;

            // 버튼 텍스트
            carBtn.innerHTML =
                option.innerText + ' <i class="fa fa-caret-down"></i>';
            carBtn.classList.add('selected');
            carBtn.classList.remove('active');

            // 차량 목록 표시
            carLists.forEach(list => list.classList.remove('active'));
            document.getElementById(targetId)?.classList.add('active');
        });
    });

    // 2️⃣ 실제 차량 선택
    carLists.forEach(list => {
        list.querySelectorAll('.car-item').forEach(item => {
            item.addEventListener('click', e => {
                e.stopPropagation();

                // 전체 차량 active 제거
                document
                    .querySelectorAll('.car-item')
                    .forEach(i => i.classList.remove('active'));

                // 선택 차량 active
                item.classList.add('active');

            });
        });
    });

    // 바깥 클릭 시 드롭다운 닫기 (선택 유지)
    document.addEventListener('click', e => {
        if (
            !e.target.closest('.car-dropdown') &&
            !e.target.closest('.car-lists')
        ) {
            carBtn.classList.remove('active');
        }
    });
}



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



// ===== 생년월일 =====
document.querySelectorAll('.birth-dropdown').forEach(dropdown => {
    const btn = dropdown.querySelector('.dropdown-btn');
    const options = dropdown.querySelectorAll('.dropdown-option');

    btn.addEventListener('click', () => {
        document.querySelectorAll('.birth-dropdown .dropdown-btn')
            .forEach(b => b !== btn && b.classList.remove('active'));
        btn.classList.toggle('active');
        btn.classList.add('selected');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            btn.innerHTML = option.innerText + ' <i class="fa fa-caret-down"></i>';
            btn.classList.remove('active');
        });
    });
});

document.addEventListener('click', e => {
    if (!e.target.closest('.birth-dropdown')) {
        document.querySelectorAll('.birth-dropdown .dropdown-btn')
            .forEach(btn => btn.classList.remove('active'));
    }
});

// ===== 부가서비스 =====
const serviceDropdown = document.querySelector('.service-dropdown');

if (serviceDropdown) {
    const btn = serviceDropdown.querySelector('.dropdown-btn');
    const options = serviceDropdown.querySelectorAll('.dropdown-option');

    // 드롭다운 열기
    btn.addEventListener('click', e => {
        e.stopPropagation();

        // 🔥 다시 열 때 옵션 active 제거
        options.forEach(o => o.classList.remove('active'));

        btn.classList.toggle('active');
    });

    // 옵션 선택
    options.forEach(option => {
        option.addEventListener('click', e => {
            e.stopPropagation();

            // 버튼 텍스트 교체 (아이콘 유지)
            btn.firstChild.textContent = option.innerText;

            btn.classList.add('selected');
            btn.classList.remove('active');

            // 선택 표시
            options.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
        });
    });

    // 바깥 클릭 시 닫기
    document.addEventListener('click', e => {
        if (!e.target.closest('.service-dropdown')) {
            btn.classList.remove('active');
        }
    });
}



// ===== 예약 버튼 작동 =====
document.addEventListener("DOMContentLoaded", () => {
    const rentBtn = document.querySelector(".rent-btn");

    rentBtn.addEventListener("click", (e) => {
        // ===== 이름 / 전화번호 체크 =====
        const bookerName = document.getElementById("bookerName").value.trim();
        const bookerPhone = document.getElementById("bookerPhone").value.trim();
        const driverName = document.getElementById("driverName").value.trim();
        const driverPhone = document.getElementById("driverPhone").value.trim();

        if (bookerName && !isKoreanOnly(bookerName)) {
            alert("이름은 한글만 가능합니다.");
            return;
        }

        if (bookerPhone && !isPhoneValid(bookerPhone)) {
            alert("번호는 숫자만 11자리로 입력해주세요.");
            return;
        }

        if (driverName && !isKoreanOnly(driverName)) {
            alert("이름은 한글만 가능합니다.");
            return;
        }

        if (driverPhone && !isPhoneValid(driverPhone)) {
            alert("번호는 숫자만 11자리로 입력해주세요.");
            return;
        }
        const errors = [];

        // 인수 / 반납 일시
        document.querySelectorAll(".date-display").forEach(input => {
            if (!input.value.trim()) {
                if (!errors.includes("인수 / 반납 일시")) errors.push("인수 / 반납 일시");
            }
        });

        // 차량 종류
        const carBtn = document.querySelector(".car-dropdown .dropdown-btn");
        const selectedCarList = document.querySelector(".car-lists .car-list.active .car-item.active");

        if (
            !carBtn.classList.contains("selected") || // 종류 선택 안됨
            !selectedCarList // 세부 차량 선택 안됨
        ) {
            errors.push("차량 종류");
        }

        // 예약자 정보
        if (
            !document.getElementById("bookerName").value.trim() ||
            !document.getElementById("bookerPhone").value.trim()
        ) {
            errors.push("예약자 정보");
        }

        // 운전자 정보
        if (
            !document.getElementById("driverName").value.trim() ||
            !document.getElementById("driverPhone").value.trim() ||
            !document.getElementById("license").value
        ) {
            errors.push("운전자 정보");
        }

        // 부가 서비스
        const serviceBtn = document.querySelector(".service-dropdown .dropdown-btn");
        if (!serviceBtn.classList.contains("selected")) {
            errors.push("부가 서비스");
        }

        // ❌ 선택항목 하나라도 빠졌으면
        if (errors.length > 0) {
            e.preventDefault();
            alert(
                "아래 항목을 확인해주세요.\n\n" +
                errors.map(item => `- ${item}`).join("\n")
            );
            return;
        }

        // ✅ 전부 입력되면
        alert("예약이 완료되었습니다.");
    });
});

// ===== 이름 / 전화번호 유효성 검사 =====
// 한글만
function isKoreanOnly(value) {
    return /^[가-힣]+$/.test(value);
}
// 숫자만 11자리
function isPhoneValid(value) {
    return /^[0-9]{11}$/.test(value);
}