// 차량 타입 선택
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

// 차량 선택
document.querySelectorAll('.car-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.car-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// 면허종류 탭
const licenseTabs = document.querySelectorAll('.license-tab');
const licenseValue = document.getElementById('licenseValue');

licenseTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    licenseTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    licenseValue.value = tab.dataset.value;
  });
});

// 부가서비스 드롭다운
const serviceBtn = document.getElementById('serviceBtn');
const serviceContent = document.getElementById('serviceContent');

serviceBtn.addEventListener('click', () => {
  serviceContent.style.display =
    serviceContent.style.display === 'block' ? 'none' : 'block';
});
