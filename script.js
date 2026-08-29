console.log("Siddharth Shinde Portfolio Loaded");


/* ================= SCROLL REVEAL ================= */

const elements = document.querySelectorAll(
    ".section, .contact"
);


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add(
                    "visible"
                );

            }

        });

    },

    {
        threshold: 0.1
    }
);


elements.forEach((element) => {

    element.classList.add("reveal");

    observer.observe(element);

});


/* ================= DYNAMIC STYLE ================= */

const animationStyle =
    document.createElement("style");


animationStyle.innerHTML = `

.reveal {

    opacity: 0;

    transform:
        translateY(35px);

    transition:
        opacity 0.8s ease,
        transform 0.8s ease;

}

.reveal.visible {

    opacity: 1;

    transform:
        translateY(0);

}

`;


document.head.appendChild(
    animationStyle
);