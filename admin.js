import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    doc,
    setDoc,
    addDoc,
    collection
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
let uploadedPhotoUrl = "";
const profilePhoto = document.getElementById("profilePhoto");

if (profilePhoto) {
    profilePhoto.addEventListener("change", async () => {

        const file = profilePhoto.files[0];

        if (!file) return;

        // Preview
        const preview = document.getElementById("profilePhotoPreview");

        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";

        console.log("Photo selected:", file.name);

        // Cloudinary upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "siddharth_portfolio_upload");

        try {

            const response = await fetch(
                "https://api.cloudinary.com/v1_1/apvzcn4s/image/upload",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.json();

            if (data.secure_url) {
    uploadedPhotoUrl = data.secure_url;
    console.log("Upload successful:", uploadedPhotoUrl);
}

        } catch (error) {
            console.error("Cloudinary error:", error);
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

            const photoUrl =
                document.getElementById("profilePhotoPreview").src;

            await setDoc(doc(db, "profile", "main"), {

                name: name,
                title: title,
                bio: bio,
                photoUrl: uploadedPhotoUrl
            });

            alert("Profile saved successfully! ✅");

        } catch (error) {

            console.error(error);

            alert("Profile save nahi hua.");

        }

    });

}
// ================= CERTIFICATE UPLOAD =================

const certificateForm = document.getElementById("certificateForm");

if (certificateForm) {

    certificateForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const certificateName =
            document.getElementById("certificateName").value.trim();

        const certificateOrganization =
            document.getElementById("certificateOrganization").value.trim();

        const certificateFile =
            document.getElementById("certificateFile").files[0];

        if (!certificateName || !certificateOrganization || !certificateFile) {
            alert("Please fill all certificate details and select a file.");
            return;
        }

        const formData = new FormData();

        formData.append("file", certificateFile);
        formData.append(
            "upload_preset",
            "siddharth_portfolio_upload"
        );

        try {

            alert("Uploading certificate... ⏳");

            const response = await fetch(
                "https://api.cloudinary.com/v1_1/apvzcn4s/auto/upload",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.json();

            if (!data.secure_url) {
                console.error(data);
                throw new Error("Cloudinary upload failed");
            }

            console.log(
                "Certificate uploaded:",
                data.secure_url
            );

            await addDoc(
                collection(db, "certificates"),
                {
                    name: certificateName,
                    organization: certificateOrganization,
                    fileUrl: data.secure_url,
                    createdAt: new Date()
                }
            );

            alert("Certificate uploaded successfully! 🏆");

            certificateForm.reset();

        } catch (error) {

            console.error("Certificate upload error:", error);

            alert("Certificate upload failed. Check console.");

        }

    });

}