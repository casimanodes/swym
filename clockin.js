
    let startTime = null;
    let interval = null;
    const dateTimeEl = document.getElementById('date-time');
    const elapsedTimeEl = document.getElementById('elapsed-time');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const downloadBtn = document.getElementById('download-btn');

    const stopBtn = document.getElementById('stop-btn');
    const continueBtn = document.getElementById('continue-btn');
    let totalPausedTime = 0;
    let pauseStartTime = null;




// Start Button 
startBtn.addEventListener('click', function() {
    if (!startTime) {
        startTime = new Date();
        dateTimeEl.textContent = `Date + Time: ${startTime.toLocaleString()}`;
        interval = setInterval(updateElapsedTime, 1000);
        startBtn.style.display = 'none';
        stopBtn.style.display = 'inline-block';
    }
});

// Stop Button
stopBtn.addEventListener('click', function() {
    if (interval) {
        clearInterval(interval);
        interval = null;
        
        const endTime = new Date(); // Capture the end time
        const elapsedTime = endTime - startTime - totalPausedTime; // Calculate the elapsed time in milliseconds
        const hoursWorked = (elapsedTime / (1000 * 60 * 60)).toFixed(2); // Convert to hours and round to 2 decimal places
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const startDateString = startTime.toLocaleDateString();
        let dayStarted = daysOfWeek[startTime.getDay()];

        // Create the list item with the captured data
        const listItem = document.createElement('li');
        listItem.textContent = `Date: ${startDateString}, Day: ${dayStarted}, Start Time: ${startTime.toLocaleTimeString()}, End Time: ${endTime.toLocaleTimeString()}, Hours Worked: ${hoursWorked}`;
        document.getElementById('saved-times').appendChild(listItem);
          

        // Reset the necessary variables
        startTime = null;
        totalPausedTime = 0;
        elapsedTimeEl.textContent = 'Elapsed Time: 00:00:00';
        
        // Adjust button visibility
        stopBtn.style.display = 'none';
        startBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'inline-block';
        continueBtn.style.display = 'none';
    }
});


// Pause button 
pauseBtn.addEventListener('click', function() {
    if (interval) {
        clearInterval(interval);
        interval = null;
        pauseBtn.style.display = 'none';
        continueBtn.style.display = 'inline-block';
        pauseStartTime = new Date();  // Record the time when paused
    }
});
//  Continue Button 
continueBtn.addEventListener('click', function() {
    if (!interval) {
        if (pauseStartTime) {
            totalPausedTime += new Date() - pauseStartTime;  // Add the time paused to totalPausedTime
            pauseStartTime = null;
        }
        interval = setInterval(updateElapsedTime, 1000);
        continueBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
    }
});

downloadBtn.addEventListener('click', function() {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Extract data from the saved times list
    const savedTimes = document.getElementById('saved-times').querySelectorAll('li');
    if (savedTimes.length === 0) {
        alert("No saved times found. Please record a time entry before downloading.");
        return;
    }

    // Prepare data for the worksheet
    const worksheetData = [['Date', 'Day', 'Start Time', 'End Time', 'Hours Worked']];
    savedTimes.forEach(entry => {
        const parts = entry.textContent.split(', ');
        const date = parts[0].split(': ')[1];
        const day = parts[1].split(': ')[1];
        const startTime = parts[2].split(': ')[1];
        const endTime = parts[3].split(': ')[1];
        const hoursWorked = parts[4].split(': ')[1];
        worksheetData.push([date, day, startTime, endTime, hoursWorked]);
    });

    
    const hoursWorkedColumn = 'E';
const firstRow = 2; // Assuming your data starts on the second row
const lastRow = firstRow + savedTimes.length - 1;
worksheetData.push(['', '', '', 'Total', `=SUMME(${hoursWorkedColumn}${firstRow}:${hoursWorkedColumn}${lastRow})`]);


    // Create a worksheet from the data
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // For testing, add a cell with the value "test"
    // worksheet['E6'] = { v: 'test', t: 'n' };

    // Generate the Excel file
    const workbookBinary = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

    // Trigger download
    const blob = new Blob([s2ab(workbookBinary)], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-work-times.xlsx';
    a.click();
    URL.revokeObjectURL(url);
});

function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}


// Vergangenezeit Button 
function updateElapsedTime() {
    const now = new Date();
    const diff = new Date(now - startTime - totalPausedTime);  // Subtract totalPausedTime
    const hours = diff.getUTCHours().toString().padStart(2, '0');
    const minutes = diff.getUTCMinutes().toString().padStart(2, '0');
    const seconds = diff.getUTCSeconds().toString().padStart(2, '0');
    elapsedTimeEl.textContent = `Elapsed Time: ${hours}:${minutes}:${seconds}`;
}


// Passwort funkiton 
const hashedPassword = "a880a69f1a61ddfbe330314ff97770aa";  // This is a hashed "password"
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password-input');
const loginBtn = document.getElementById('login-btn');
const timerContainer = document.getElementById('timer-container');

loginBtn.addEventListener('click', function() {
    const enteredPassword = passwordInput.value;
    const hashedEnteredPassword = md5(enteredPassword);  // Using md5 for simplicity, but it's not recommended for real-world security
    if (hashedEnteredPassword === hashedPassword) {
        loginForm.style.display = 'none';
        timerContainer.style.display = 'block';
        // alert('Correct password!');
    } else {
        alert('Incorrect password!');
    }
});


// Future Changes:
// Take out the seconds
