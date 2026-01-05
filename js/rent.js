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
