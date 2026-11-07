/*// Serves the HTML when deployed as a Web App URL
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('ប្រព័ន្ធគ្រប់គ្រងសាលា - School System')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
function getPageContent(pageName) {
  return HtmlService.createHtmlOutputFromFile(pageName).getContent();
}
// Adds custom menu when opened inside Google Sheets
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('ប្រព័ន្ធគ្រប់គ្រងសាលា')
    .addItem('បើកផ្ទាំងគ្រប់គ្រង (Dashboard)', 'showDashboard')
    .addToUi();
}

// Opens the dashboard as a sidebar inside Google Sheets
function showDashboard() {
  var html = HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('ប្រព័ន្ធគ្រប់គ្រងសាលា - School System')
    .setWidth(1200);
  SpreadsheetApp.getUi().showSidebar(html);
}

// Backend function triggered when clicking a module card in the HTML UI
function handleModuleClick(moduleName) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.getRange("A1").setValue("Last Clicked: " + moduleName);
  return "បានចូលទៅកាន់: " + moduleName;
}

function addStudentRow(studentData) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    studentData.no,
    studentData.id,
    studentData.name,
    studentData.gender,
    studentData.dob,
    studentData.age,
    "ជ្រើសរើសរូបថត",
    studentData.birthplace,
    studentData.address,
    studentData.fatherName,
    studentData.fatherJob,
    studentData.motherName,
    studentData.motherJob,
    studentData.projectId,
    studentData.status,
    studentData.teacher
  ]);
  return "Success";
}*/
function getStudentData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rows = sheet.getDataRange().getValues();
  // រំលង Header (row ទី 1) ហើយយកទិន្នន័យនៅសល់
  return rows.slice(1); 
}

function importExcel(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Get the first worksheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert worksheet to JSON (array of arrays or objects)
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = ''; // Clear existing table data

        // Loop through rows (skip header row if index starts at 1, or use 0 if data has no header)
        // Assuming row 0 is headers, we start from index 1:
        for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i];
            if (row.length === 0) continue; // Skip empty rows

            // Create a new table row matching your structure
            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td class="center">${i}</td>
                <td class="center">${row[1] || ''}</td>
                <td>${row[2] || ''}</td>
                <td class="center">${row[3] || ''}</td>
                <td class="center">${row[4] || ''}</td>
                <td class="center">${row[5] || ''}</td>
                <td class="center">ជ្រើសរើសរូបថត</td>
                <td>${row[7] || ''}</td>
                <td>${row[8] || ''}</td>
                <td>${row[9] || ''}</td>
                <td>${row[10] || ''}</td>
                <td>${row[11] || ''}</td>
                <td>${row[12] || ''}</td>
                <td>${row[13] || ''}</td>
                <td>${row[14] || ''}</td>
                <td class="center">
                    <div class="action-btns">
                        <button class="btn btn-red" onclick="deleteStudent(this)">លុប</button>
                    </div>
                </td>
            `;
            tableBody.appendChild(tr);
        }
    };
    reader.readAsArrayBuffer(file);
}

// Keep your existing delete function
function deleteStudent(button) {
    const row = button.closest('tr');
    row.remove();
}