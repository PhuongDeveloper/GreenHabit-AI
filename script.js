document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Sticky Header Effect
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        header.classList.toggle("shadow-sm", window.scrollY > 20);
        header.style.background = window.scrollY > 20 ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.8)";
    });

    // 2. Mobile Menu Toggle
    const menuBtn = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
        menuBtn.innerHTML = mobileMenu.classList.contains("open") ? '<i class="ri-close-line"></i>' : '<i class="ri-menu-4-line"></i>';
    });
    
    // Đóng menu khi click vào link
    document.querySelectorAll(".mobile-link").forEach(link => link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        menuBtn.innerHTML = '<i class="ri-menu-4-line"></i>';
    }));

    // 3. Accordion Interaction
    document.querySelectorAll(".accordion-item").forEach(item => {
        item.querySelector(".accordion-btn").addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            document.querySelectorAll(".accordion-item").forEach(acc => {
                acc.classList.remove("active");
                acc.querySelector(".accordion-content").style.maxHeight = null;
            });
            if (!isActive) {
                item.classList.add("active");
                item.querySelector(".accordion-content").style.maxHeight = item.querySelector(".accordion-content").scrollHeight + "px";
            }
        });
    });

    // 4. Scroll Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll(".reveal-up").forEach(el => observer.observe(el));

    // 5. 3D Tilt Effect (Nghiêng thẻ khi di chuột)
    const tiltCards = document.querySelectorAll(".tilt-card");
    tiltCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const maxRotate = 10;
            
            const rotateX = ((centerY - y) / centerY) * maxRotate;
            const rotateY = ((x - centerX) / centerX) * maxRotate;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // 6. Parallax Effect (Nền di chuyển chậm)
    const parallaxElements = document.querySelectorAll(".parallax");
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        parallaxElements.forEach(el => {
            const speed = el.getAttribute("data-speed") || 0.1;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
});