import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
    getFirestore,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB-CzRPp1VCjTOvnuBN1u0k2WR1t5tBdzs",
    authDomain: "siddharth-portfolio-7acd1.firebaseapp.com",
    projectId: "siddharth-portfolio-7acd1",
    storageBucket: "siddharth-portfolio-7acd1.firebasestorage.app",
    messagingSenderId: "28762666864",
    appId: "1:28762666864:web:28dcc97d9588b62a4b01b5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadProfile() {

    try {

        const profileRef = doc(db, "profile", "main");
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {

            const data = profileSnap.data();

            console.log("Profile loaded:", data);

            const profileImage =
                document.getElementById("profileImage");

            if (profileImage && data.photoUrl) {
                profileImage.src = data.photoUrl;
            }

        }

    } catch (error) {

        console.error("Profile loading error:", error);

    }

}

loadProfile();
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