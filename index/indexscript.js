/* ===============================
   DARK MODE FIX
================================ */
const toggle = document.getElementById("darkToggle");

toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        toggle.textContent = "☀️";
    } else {
        toggle.textContent = "🌙";
    }
});

/* ===============================
   DEPARTMENT SEARCH SUGGESTION
================================ */
const departments = [
    "Neurologist",
    "Cardiologist",
    "Pediatrician",
    "Orthopedic",
    "Gastroenterologist",
    "Dermatologist",
    "ENT Specialist",
    "Psychiatrist",
    "Urologist"
];

const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    suggestionsBox.innerHTML = "";

    if (value === "") return;

    const filtered = departments.filter(dep =>
        dep.toLowerCase().includes(value)
    );

    filtered.forEach(dep => {
        const div = document.createElement("div");
        div.classList.add("suggestion-item");
        div.textContent = dep;

        div.addEventListener("click", () => {
            searchInput.value = dep;
            suggestionsBox.innerHTML = "";
        });

        suggestionsBox.appendChild(div);
    });
});

/* ===============================
   CLICK OUTSIDE TO CLOSE
================================ */
document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target)) {
        suggestionsBox.innerHTML = "";
    }
});

/* ===== RIPPLE EFFECT ===== */
document.querySelectorAll("#medicalList li").forEach(card => {
    card.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");

        const rect = this.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

/* ===== MODAL LOGIC ===== */
const modal = document.getElementById("appointmentModal");
const closeModal = document.getElementById("closeModal");
const deptName = document.getElementById("deptName");

document.querySelectorAll("#medicalList li").forEach(item => {
    item.addEventListener("dblclick", () => {
        modal.style.display = "block";
        deptName.textContent = "Department: " + item.dataset.name;
    });
});

closeModal.onclick = () => modal.style.display = "none";

window.onclick = e => {
    if (e.target === modal) modal.style.display = "none";
};
