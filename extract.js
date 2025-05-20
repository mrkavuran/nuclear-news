// extract.js

const fs = require("fs");

const raw = require("./raw-under-construction.json");

const results = [];

for (let i = 1; i < raw.length; i++) {
  const row = raw[i];
  const name = row[0]?.replace(/["\[\]\d]/g, "").trim();
  const country = row[2]?.trim();
  const coord = row[3] || "";
  const shutdownYear = parseInt(row[5]) || null;

  const match = coord.match(/([-+]?[0-9]*\.?[0-9]+);\s*([-+]?[0-9]*\.?[0-9]+)/);
  if (!match) continue;
  const lat = parseFloat(match[1]);
  const lng = parseFloat(match[2]);

  results.push({
    name,
    country,
    status: "shut down",
    year: shutdownYear,
    lat,
    lng
  });
}


console.log("const dataUnderConstruction = [");
for (const item of results) {
  console.log(`  {
    name: "${item.name}",
    country: "${item.country}",
    status: "${item.status}",
    year: ${item.year},
    lat: ${item.lat},
    lng: ${item.lng}
  },`);
}
console.log("];");
