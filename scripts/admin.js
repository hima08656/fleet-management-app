// scripts/admin.js

// Global state
let fleets = [];
let filters = { category: "All", availability: "All" };

const container = document.getElementById("cardsContainer");
const form = document.getElementById("fleetForm");

// Vehicle image (use your provided PNG link)
const imgSrc =
    "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/5e80fcb6-3f8e-480c-945b-30a5359eb40e/JNmYjkVr3WOjsrbu.png";

// -------------------- Add Fleet --------------------
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const regNo = document.getElementById("regNo").value.trim();
    const category = document.getElementById("category").value;
    const driver = document.getElementById("driver").value.trim();
    const availability = document.getElementById("available").value;

    // Validation
    if (!regNo || !category || !driver || !availability) {
        alert("All fields are required.");
        return;
    }

    if (fleets.some((f) => f.regNo.toLowerCase() === regNo.toLowerCase())) {
        alert("Reg No must be unique.");
        return;
    }

    const fleet = {
        id: Date.now(),
        regNo,
        category,
        driver,
        available: availability === "Available",
    };

    fleets.push(fleet);
    form.reset();
    render();
});

// -------------------- Render Cards --------------------
function getFilteredFleets() {
    return fleets.filter((f) => {
        const catOk = filters.category === "All" || f.category === filters.category;
        const availOk =
            filters.availability === "All" ||
            (filters.availability === "Available" && f.available) ||
            (filters.availability === "Unavailable" && !f.available);
        return catOk && availOk;
    });
}

function render() {
    container.innerHTML = "";
    const visible = getFilteredFleets();

    visible.forEach((f) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
      <img src="${imgSrc}" alt="Vehicle" class="vehicle-img" />
      <div class="info">
        <p><strong>Reg No:</strong> ${f.regNo}</p>
        <p><strong>Category:</strong> ${f.category}</p>
        <p><strong>Driver:</strong> ${f.driver}</p>
        <p><strong>Status:</strong> ${f.available ? "Available" : "Unavailable"}</p>
      </div>
      <div class="actions">
        <button class="update-driver">Update Driver</button>
        <button class="toggle-availability">Change Availability</button>
        <button class="delete-vehicle">Delete Vehicle</button>
      </div>
    `;

        // Attach button events
        card.querySelector(".update-driver").addEventListener("click", () =>
            updateDriver(f.id)
        );
        card
            .querySelector(".toggle-availability")
            .addEventListener("click", () => toggleAvailability(f.id));
        card.querySelector(".delete-vehicle").addEventListener("click", () =>
            deleteVehicle(f.id)
        );

        container.appendChild(card);
    });
}

// -------------------- Card Actions --------------------
function updateDriver(id) {
    const fleet = fleets.find((f) => f.id === id);
    if (!fleet) return;

    const input = prompt("Enter new driver name:", fleet.driver);
    if (input === null) return; // user cancelled
    const name = input.trim();
    if (!name) {
        alert("Driver name cannot be empty.");
        return;
    }
    fleet.driver = name;
    render();
}

function toggleAvailability(id) {
    const fleet = fleets.find((f) => f.id === id);
    if (!fleet) return;
    fleet.available = !fleet.available;
    render();
}

function deleteVehicle(id) {
    const ok = confirm("Are you sure you want to delete this vehicle?");
    if (!ok) return;
    fleets = fleets.filter((f) => f.id !== id);
    render();
}

// -------------------- Filters --------------------
document.getElementById("filterCategory").addEventListener("change", (e) => {
    filters.category = e.target.value;
    render();
});

document.getElementById("filterAvailability").addEventListener("change", (e) => {
    filters.availability = e.target.value;
    render();
});

document.getElementById("clearFilters").addEventListener("click", () => {
    filters = { category: "All", availability: "All" };
    document.getElementById("filterCategory").value = "All";
    document.getElementById("filterAvailability").value = "All";
    render();
});

// -------------------- Initialize --------------------
render();