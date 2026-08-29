import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-CzRPp1VCjTOvnuBN1u0k2WR1t5tBdzs",
    authDomain: "siddharth-portfolio-7acd1.firebaseapp.com",
    projectId: "siddharth-portfolio-7acd1",
    storageBucket: "siddharth-portfolio-7acd1.firebasestorage.app",
    messagingSenderId: "28762666864",
    appId: "1:28762666864:web:28dcc97d9588b62a4b01b5"
};


// Start Firebase
const app = initializeApp(firebaseConfig);

// Start Firestore
const db = getFirestore(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "login.html";
    }

});

// ================= NAVIGATION =================

const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".dashboard-section");
const pageTitle = document.getElementById("pageTitle");

const titles = {
    overview: "Dashboard",
    profile: "Profile",
    experience: "Experience",
    skills: "Skills",
    projects: "Projects",
    certificates: "Certificates",
    social: "Social Links"
};


navItems.forEach((item) => {

    item.addEventListener("click", () => {

        const sectionId = item.dataset.section;

        navItems.forEach((nav) => {
            nav.classList.remove("active");
        });

        item.classList.add("active");

        sections.forEach((section) => {
            section.classList.remove("active-section");
        });

        const selectedSection = document.getElementById(sectionId);

        if (selectedSection) {
            selectedSection.classList.add("active-section");
        }

        pageTitle.textContent = titles[sectionId] || "Dashboard";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});


// ================= PROFILE =================

const profileForm = document.getElementById("profileForm");
const profilePhoto = document.getElementById("profilePhoto");

if (profilePhoto) {
    profilePhoto.addEventListener("change", () => {

        const file = profilePhoto.files[0];

        if (file) {
    console.log("Photo selected:", file.name);

    const preview = document.getElementById("profilePhotoPreview");

    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
}

    });
}
if (profileForm) {

    profileForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        try {

            const name = document.getElementById("fullName").value;
const title = document.getElementById("professionalTitle").value;
const bio = document.getElementById("aboutMe").value;

            await setDoc(doc(db, "profile", "main"), {

                name: name,
                title: title,
                bio: bio

            });

            alert("Profile saved successfully! ✅");

        } catch (error) {

            console.error(error);

            alert("Profile save nahi hua. Firebase configuration check karo.");

        }

    });

}


// ================= LOGOUT =================

const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", () => {

        window.location.href = "login.html";

    });

}