// 스크롤할때 각각의 카드 순차적으로 나오게
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');

    function animateCards() {
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top + scrollTop;

            if (scrollTop > sectionTop - windowHeight + 100) {
                const cards = section.querySelectorAll('.car-card');
                cards.forEach((card, index) => {
                    // 순차적으로 나타나게 0.2초 간격
                    setTimeout(() => {
                        card.classList.add('show');
                    }, index * 200);
                });
            }
        });
    }

    window.addEventListener('scroll', animateCards);
    animateCards(); // 페이지 로드 시 초기 적용
});