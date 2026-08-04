// ==============================
// TravelX About Page
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       Scroll Reveal Animation
    ========================== */

    const revealElements = document.querySelectorAll(
        ".timeline-item, .stat-card, .section-title"
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }

        });
    }, {
        threshold: 0.2
    });

    revealElements.forEach((el) => {

        el.style.opacity = "0";
        el.style.transform = "translateY(60px)";
        el.style.transition = "all .8s ease";

        revealObserver.observe(el);

    });

    /* ==========================
       Animated Counter
    ========================== */

    const stats = document.querySelectorAll(".stat-card h3");

    let counted = false;

    function animateCounter() {

        if (counted) return;

        counted = true;

        stats.forEach(counter => {

            const text = counter.innerText;

            if (text.includes("M")) {

                let value = 0;

                const timer = setInterval(() => {

                    value += 0.1;

                    counter.innerText = value.toFixed(1) + "M+";

                    if (value >= 5) {

                        counter.innerText = "5M+";
                        clearInterval(timer);

                    }

                }, 40);

            }

            else if (text.includes("100")) {

                let value = 0;

                const timer = setInterval(() => {

                    value += 2;

                    counter.innerText = value + "+";

                    if (value >= 100) {

                        counter.innerText = "100+";
                        clearInterval(timer);

                    }

                }, 25);

            }

            else if (text.includes("24")) {

                let value = 0;

                const timer = setInterval(() => {

                    value++;

                    counter.innerText = value + "/7";

                    if (value >= 24) {

                        counter.innerText = "24/7";
                        clearInterval(timer);

                    }

                }, 40);

            }

            else if (text.includes("₹")) {

                counter.innerText = "₹0";

            }

        });

    }

    const statSection = document.querySelector(".stats");

    const statObserver = new IntersectionObserver((entries) => {

        if (entries[0].isIntersecting) {

            animateCounter();

        }

    });

    statObserver.observe(statSection);

    /* ==========================
       Hero Parallax
    ========================== */

    const hero = document.querySelector(".about-hero");

    hero.addEventListener("mousemove", (e) => {

        const x = (window.innerWidth / 2 - e.pageX) / 40;
        const y = (window.innerHeight / 2 - e.pageY) / 40;

        hero.style.backgroundPosition = `${x}px ${y}px`;

    });

    /* ==========================
       Card Hover Rotation
    ========================== */

    document.querySelectorAll(".card").forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 10;
            const rotateX = ((rect.height / 2 - y) / rect.height) * 10;

            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

    /* ==========================
       Progress Bar
    ========================== */

    const progress = document.createElement("div");

    progress.style.position = "fixed";
    progress.style.top = "0";
    progress.style.left = "0";
    progress.style.height = "5px";
    progress.style.width = "0";
    progress.style.zIndex = "9999";
    progress.style.background = "linear-gradient(to right,#4facfe,#00f2fe)";
    progress.style.transition = "width .2s";

    document.body.appendChild(progress);

    window.addEventListener("scroll", () => {

        const total =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const current =
            (window.pageYOffset / total) * 100;

        progress.style.width = current + "%";

    });

    /* ==========================
       Ripple Effect
    ========================== */

    document.querySelectorAll(".card,.stat-card").forEach(card => {

        card.addEventListener("click", function(e){

            const ripple = document.createElement("span");

            ripple.style.position="absolute";
            ripple.style.borderRadius="50%";
            ripple.style.background="rgba(255,255,255,.4)";
            ripple.style.width="20px";
            ripple.style.height="20px";
            ripple.style.pointerEvents="none";

            const rect=this.getBoundingClientRect();

            ripple.style.left=(e.clientX-rect.left-10)+"px";
            ripple.style.top=(e.clientY-rect.top-10)+"px";

            ripple.animate([
                {
                    transform:"scale(0)",
                    opacity:1
                },
                {
                    transform:"scale(18)",
                    opacity:0
                }
            ],{
                duration:700
            });

            this.appendChild(ripple);

            setTimeout(()=>{
                ripple.remove();
            },700);

        });

    });

    /* ==========================
       Timeline Active Glow
    ========================== */

    const timelineItems = document.querySelectorAll(".timeline-item");

    window.addEventListener("scroll",()=>{

        timelineItems.forEach(item=>{

            const top=item.getBoundingClientRect().top;

            if(top<window.innerHeight*0.7){

                item.querySelector(".card").style.boxShadow=
                "0 20px 40px rgba(0,180,255,.25)";

            }

        });

    });

    /* ==========================
       Smooth Hero Fade
    ========================== */

    window.addEventListener("scroll",()=>{

        const scroll=window.scrollY;

        hero.style.opacity=1-scroll/700;

    });

});