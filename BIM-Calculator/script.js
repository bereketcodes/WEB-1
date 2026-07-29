document.getElementById('bimForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get values from form
        const weight = parseFloat(document.getElementById('weight').value);
        const heightInMeters = parseFloat(document.getElementById('height').value) / 100;

        // Calculate BMI and round to 2 decimal places
        const bim = (weight / (heightInMeters * heightInMeters)).toFixed(2);
        const resultElement = document.getElementById('result');

        // Check conditions and display message
        if (bim > 18) {
            resultElement.textContent = `Your BIM is ${bim}: Above 18`;
        } else if (bim < 18) {
            resultElement.textContent = `Your BIM is ${bim}: Below 18`;
        } else {
            resultElement.textContent = `Your BIM is ${bim}: Exactly 18`;
        }
    });