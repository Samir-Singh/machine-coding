(async function () {
  const data = await fetch("./data.json");
  let employees = await data.json();

  let selectedEmployeeId = employees[0].id;
  let selectedEmployee = employees[0];
  let isEmployeeEdit = false;

  const employeeList = document.querySelector(".employees_names_list");
  const employeeInfo = document.querySelector(".employees_single_info");

  // Add Employee Logic
  const createEmployee = document.querySelector(".createEmployee");
  const editEmployee = document.querySelector(".editEmployee");
  const addEmployeeModal = document.querySelector(".addEmployee");
  const addEmployeeForm = document.querySelector(".addEmployee_create");
  const dobInput = document.querySelector(".addEmployee_create_dob");
  const employee_purpose = document.querySelector(".employee_purpose_text");

  // Implementing when user clicks on the add employee button
  createEmployee.addEventListener("click", () => {
    isEmployeeEdit = false;
    addEmployeeModal.style.display = "flex";
    employee_purpose.innerHTML = "Add a new Employee";
  });

  //Implementing when user clicks on the edit employee button
  editEmployee.addEventListener("click", () => {
    isEmployeeEdit = true;
    addEmployeeModal.style.display = "flex";
    employee_purpose.innerHTML = "Edit Employee";

    Object.keys(selectedEmployee).forEach((key) => {
      const inputElement = document.querySelector(`input[name="${key}"]`);

      if (inputElement) {
        if (key === "dob") {
          const formattedDate = selectedEmployee[key];

          const [day, month, year] = formattedDate.split("/");

          const date = `${year}-${month}-${day}`;

          inputElement.value = date;
        } else {
          inputElement.value = selectedEmployee[key];
        }
      }
    });
  });

  // Logic for when user click outside the modal than close the modal and empty the input fields
  addEmployeeModal.addEventListener("click", (e) => {
    if (e.target.className === "addEmployee") {
      addEmployeeModal.style.display = "none";
      addEmployeeForm.reset();
    }
  });

  // Creating check for employee should be greater than or equal 18 years old
  dobInput.max = `${new Date().getFullYear() - 18}-${new Date()
    .toISOString()
    .slice(5, 10)}`;

  // Implement logic when user click on the submit button
  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addEmployeeForm);

    const values = [...formData.entries()];

    let empData = {};

    values.forEach((val) => {
      empData[val[0]] = val[1];
    });

    empData.id = !isEmployeeEdit
      ? employees.length > 0
        ? employees[employees.length - 1].id + 1
        : 1001
      : Number(selectedEmployeeId);
    empData.age =
      new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
    empData.imageUrl =
      empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
    empData.dob = empData.dob.split("-").reverse().join("/");

    if (isEmployeeEdit) {
      updateEmployeeRecord(selectedEmployee.id, empData);
    } else {
      employees.push(empData);
    }

    renderEmployees();

    renderSingleEmployee();

    addEmployeeForm.reset();

    addEmployeeModal.style.display = "none";
  });

  // Logic for updating existing employee data
  const updateEmployeeRecord = (employeeId, empData) => {
    const index = employees.findIndex((item) => item.id === employeeId);
    employees[index] = empData;
    selectedEmployee = employees[index];
  };

  // Select Employee Logic
  employeeList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
      selectedEmployeeId = e.target.id;
      renderEmployees();
      renderSingleEmployee();
    }

    // Deleting employee
    if (e.target.tagName === "I") {
      employees = employees.filter(
        (emp) => String(emp.id) !== e.target.parentNode.id
      );

      if (String(selectedEmployeeId) === e.target.parentNode.id) {
        selectedEmployeeId = employees[0]?.id || -1;
        selectedEmployee = employees[0] || {};
        renderSingleEmployee();
      }

      renderEmployees();
    }
  });

  // Render Employee List Logic
  const renderEmployees = () => {
    employeeList.innerHTML = "";
    employees?.forEach((emp) => {
      const employee = document.createElement("span");
      employee.classList.add("employees_names_item");

      // here written 10 to check if we want to parse the int into hexadecimal or decimal etc
      if (parseInt(selectedEmployeeId, 10) === emp.id) {
        employee.classList.add("selected");
        selectedEmployee = emp;
      }

      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete" title="Delete">❌</i>`;

      employeeList.append(employee);
    });
  };

  // Render Single Employee Logic
  const renderSingleEmployee = () => {
    if (selectedEmployeeId === -1) {
      employeeInfo.innerHTML = "";
      return;
    }

    employeeInfo.innerHTML = `
    <img src=${selectedEmployee.imageUrl} />  
    <span class="employees_single_heading">${selectedEmployee.firstName} ${selectedEmployee.lastName} ${selectedEmployee.age}</span>
    <span>${selectedEmployee.address}</span>
    <span${selectedEmployee.email}></span>
    <span>Mobile - ${selectedEmployee.contactNumber}</span>
    <span>DOB - ${selectedEmployee.dob}</span>
    `;
  };

  if (selectedEmployee) renderSingleEmployee();

  renderEmployees();
})();
