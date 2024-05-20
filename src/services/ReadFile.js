import * as XLSX from "xlsx"; // Import XLSX library

export const ReadFile = async (file) => {
  if (!file) {
    throw new Error("Please select an Excel file");
  }

  const columnMappings = [
    { column: "Register Number", format: "registerNumber" },
    { column: "Name", format: "name" },
    { column: "Dob", format: "dob" },
    { column: "Email", format: "email" },
    { column: "Phone", format: "phone" },
    { column: "Fathers Name", format: "fathersName" },
    { column: "Fathers Phone", format: "fathersPhone" },
    { column: "Mothers Name", format: "mothersName" },
    { column: "Mothers Phone", format: "mothersPhone" },
    { column: "10th Mark", format: "_10thMark" },
    { column: "12th Mark", format: "_12thMark" },
    { column: "Counselling Application Number", format: "counsellingApplicationNumber" },
    { column: "Address", format: "address" },
  ];

  return new Promise((resolve, reject) => {
    try {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          // Map column names to their respective field keys
          const columnKeyMap = {};
          columnMappings.forEach(({ column, format }) => {
            const index = rows[0].indexOf(column); // Assuming column names are in the first row
            columnKeyMap[format] = index;
          });

          // Loop through the rows to create student objects
          const studentsData = rows.slice(1).map((row) => {
            const studentData = {};
            // Populate student data dynamically using column names and their field keys
            columnMappings.forEach(({ column, format }) => {
              const index = columnKeyMap[format];
              if (format === "dob" && row[index]) {
                const dob = XLSX.SSF.parse_date_code(row[index]);
                const day = dob.d < 10 ? "0" + dob.d : dob.d;
                const month = dob.m < 10 ? "0" + dob.m : dob.m;
                studentData[format] = `${day}-${month}-${dob.y}`;
              } else {
                studentData[format] = row[index];
              }
            });
            return studentData;
          });

          resolve(studentsData);
        } catch (error) {
          console.error("Error reading Excel sheet:", error);
          reject(new Error("Error reading Excel sheet"));
        }
      };

      fileReader.readAsBinaryString(file);
    } catch (error) {
      console.error("Error handling file input change:", error);
      reject(new Error("Error handling file input change"));
    }
  });
};
