// ==========================
// Projects
// ==========================
const projects = [
    {
        title: "Personal Portfolio Website",
        description: "A full-stack portfolio website built using HTML, CSS, JavaScript and Node.js."
    },
    {
        title: "Bus Tracking System",
        description: "A web application to track college buses in real-time."
    },
    {
        title: "Women Safety App",
        description: "An emergency safety application with live location sharing."
    }
];

// Display Projects
const projectList = document.getElementById("project-list");

if (projectList) {
    projects.forEach(project => {
        const card = document.createElement("div");
        card.classList.add("project-card");
        card.setAttribute("data-aos", "zoom-in");

        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        `;

        projectList.appendChild(card);
    });
}

// ==========================
// Contact Form
// ==========================
const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        try {

            const response = await fetch("http://localhost:5000/api/contact", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    message
                })

            });

            console.log("Status :", response.status);

            const data = await response.json();

            console.log(data);

            if (response.ok) {

                alert(data.message);

                contactForm.reset();

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error("Error :", error);

            alert("Failed to send message");

        }

    });

}

// ==========================
// View Projects Button
// ==========================
const viewBtn = document.getElementById("projectBtn");

if (viewBtn) {

    viewBtn.addEventListener("click", () => {

        document.getElementById("projects").scrollIntoView({

            behavior: "smooth"

        });

    });

}

// ==========================
// Typing Effect
// ==========================
const text = "Full Stack Developer | CSBS Student";

let i = 0;

function typing() {

    if (i < text.length) {

        document.getElementById("typing").innerHTML += text.charAt(i);

        i++;

        setTimeout(typing, 80);

    }

}

typing();