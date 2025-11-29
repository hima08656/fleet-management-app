let fleets = [];
let filters = { category: 'All', availability: 'All' };
const container = document.getElementById('cardsContainer');
const form = document.getElementById('fleetForm');
const imgSrc = "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/5e80fcb6-3f8e-480c-945b-30a5359eb40e/JNmYjkVr3WOjsrbu.png";

form.addEventListener('submit', e => {
    e.preventDefault();
    const regNo = document.getElementById('regNo').value.trim();
    const category = document.getElementById('category').value;
    const driver = document.getElementById('driver').value.trim();
    const availability = document.getElementById('available').value;

    if (!regNo || !category || !driver || !availability) {
        alert('All fields required');
        return;
    }

    fleets.push({
        id: Date.now(),
        regNo,
        category,
        driver,
        available: availability === 'Available'
    });
    form.reset();
    render();
});

function render() {
    container.innerHTML = '';
    fleets.filter(f => {
        const catOk = filters.category === 'All' || f.category === filters.category;
        const availOk = filters.availability === 'All' ||
            (filters.availability === 'Available' && f.available) ||
            (filters.availability === 'Unavailable' && !f.available);
        return catOk && availOk;
    }).forEach(f => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
      <img src="${imgSrc}" alt="Vehicle">
      <p>Reg No: ${f.regNo}</p>
      <p>Category: ${f.category}</p>
      <p>Driver: ${f.driver}</p>
      <p>Status: ${f.available ? 'Available' : 'Unavailable'}</p>
      <button onclick="updateDriver(${f.id})">Update Driver</button>
      <button onclick="toggleAvailability(${f.id})">Change Availability</button>
      <button onclick="deleteVehicle(${f.id})">Delete Vehicle</button>
    `;
        container.appendChild(card);
    });
}

function updateDriver(id) {
    const fleet = fleets.find(f => f.id === id);
    const input = prompt('Enter new driver name:', fleet.driver);
    if (input === null) return;
    if (!input.trim()) { alert('Driver name cannot be empty'); return; }
    fleet.driver = input.trim();
    render();
}

function toggleAvailability(id) {
    const fleet = fleets.find(f => f.id === id);
    fleet.available = !fleet.available;
    render();
}

function deleteVehicle(id) {
    if (!confirm('Delete this vehicle?')) return;
    fleets = fleets.filter(f => f.id !== id);
    render();
}

// Filters
document.getElementById('filterCategory').addEventListener('change', e => {
    filters.category = e.target.value;
    render();
});
document.getElementById('filterAvailability').addEventListener('change', e => {
    filters.availability = e.target.value;
    render();
});
document.getElementById('clearFilters').addEventListener('click', () => {
    filters = { category: 'All', availability: 'All' };
    document.getElementById('filterCategory').value = 'All';
    document.getElementById('filterAvailability').value = 'All';
    render();
});