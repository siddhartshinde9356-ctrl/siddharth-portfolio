import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
    getFirestore,
    doc,
    getDoc,
    collection,
    getDocs
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
// ================= CERTIFICATES =================

async function loadCertificates() {

    try {

        const certificateGrid =
            document.getElementById("certificateGrid");

        if (!certificateGrid) return;

        const certificatesSnapshot =
            await getDocs(collection(db, "certificates"));

        certificateGrid.innerHTML = "";

        let number = 1;

        certificatesSnapshot.forEach((certificateDoc) => {

            const certificate =
                certificateDoc.data();

            const card =
                document.createElement("article");

            card.className = "certificate-card";

            card.innerHTML = `
                <span class="certificate-number">
                    ${String(number).padStart(2, "0")}
                </span>

                <p>
                    CERTIFICATE
                </p>

                <h3>
                    ${certificate.name}
                </h3>

                <span class="certificate-org">
                    ${certificate.organization}
                </span>

                <a
                    href="${certificate.fileUrl}"
                    target="_blank"
                    rel="noopener noreferrer">

                    View Certificate ↗

                </a>
            `;

            certificateGrid.appendChild(card);

            number++;

        });

    } catch (error) {

        console.error(
            "Certificate loading error:",
            error
        );

    }

}

loadCertificates();