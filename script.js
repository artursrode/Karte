const map = L.map('map').setView([56.94, 24.1], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let markers = [];

function updateMarkers() {
    fetch('https://marsruti.lv/rigasmikroautobusi/gps.txt')
        .then(response => response.text())
        .then(data => {
            markers.forEach(marker => marker.remove());
			markers = [];
			  data.split('\n').forEach(row => {
            const values = row.split(',');
            if (values.length > 4) {
                const lat = parseFloat(values[3].slice(0, 2) + '.' + values[3].slice(2));
                const lon = parseFloat(values[2].slice(0, 2) + '.' + values[2].slice(2));
                const speed = parseFloat(values[4]);
                const marker = L.marker([lat, lon]).addTo(map);
                marker.bindPopup(`Ātrums: ${speed} km/h`).addTo(map);
                markers.push(marker);
            }
        });
    });
}

updateMarkers();
setInterval(updateMarkers, 5000);
