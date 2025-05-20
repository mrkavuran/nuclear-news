const map = L.map('map', {
  maxBounds: [[-85, -180], [85, 180]],
  maxBoundsViscosity: 1.0,
  worldCopyJump: false,
  zoomSnap: 0.5,
  zoomControl: false,
  attributionControl: false,
  minZoom: 2,
  maxZoom: 6
}).setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  noWrap: true,
  bounds: [[-85, -180], [85, 180]]
}).addTo(map);


map.setMaxBounds(map.options.maxBounds);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Custom color based on status
function getColor(status) {
  if (status === "Active") return "green";
  if (status === "under construction") return "yellow";
  if (status === "shut down") return "red";
  return "gray";
}

// Add markers from data.js
nuclearFacilities.forEach(facility => {
  const marker = L.circleMarker([facility.lat, facility.lng], {
    radius: 6,
    fillColor: getColor(facility.status),
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }).addTo(map);

  marker.bindPopup(`
    <b>${facility.name}</b><br/>
    Country: ${facility.country}<br/>
    Status: ${facility.status}<br/>
    Reactor Type: ${facility.type}<br/>
    Start Year: ${facility.year}<br/>
  `);
});

  // Fetch the latest posts from the 'technology' subreddit (you can change it)
  fetch("https://www.reddit.com/r/nuclear/new.json?limit=10") // 'limit=10' fetches 10 posts
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
      let html = '<ul>'; // Start an unordered list

      // Loop through each post
      data.data.children.forEach(item => {
        const post = item.data; // Get the actual post data

        // Add each post as a list item with a clickable link
        html += `<li><a href="https://reddit.com${post.permalink}" target="_blank">${post.title}</a></li>`;
      });

      html += '</ul>'; // End the unordered list

      // Insert the generated HTML into the container
      document.getElementById("reddit-posts").innerHTML = html;
    });
const rssUrl = 'https://news.google.com/rss/search?q=nuclear+power&hl=en-US&gl=US&ceid=US:en';
const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    let html = '<ul class="news-list">';
    data.items.slice(0, 10).forEach(item => {
      html += `<li><a href="${item.link}" target="_blank">${item.title}</a></li>`;
    });
    html += '</ul>';
    document.getElementById('nuclear-news').innerHTML = html;
  })
  .catch(() => {
    document.getElementById('nuclear-news').innerHTML = 'Failed to load news.';
  });
