
const size = 10;
let tableHTML = "<table>";

// Generate rows and columns
for (let i = 1; i <= size; i++) {
    tableHTML += "<tr>";
    for (let j = 1; j <= size; j++) {
        // If it's the first row or first column, make it a header (th)
        if (i === 1 || j === 1) {
            tableHTML += `<th>${i * j}</th>`;
        } else {
            tableHTML += `<td>${i * j}</td>`;
        }
    }
    tableHTML += "</tr>";
}
tableHTML += "</table>";

// Inject the generated table into the webpage
document.getElementById("table-container").innerHTML = tableHTML;
