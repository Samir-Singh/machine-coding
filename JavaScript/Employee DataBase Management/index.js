(async function () {
  const data = await fetch("./data.json");
  let employees = await data.json();

  // console.log("klsdfjk", employees);

  let selectedEmployeeId = employees[0].id;
  let selectedEmployee = employees[0];

  const employeeList = document.querySelector(".employees_names_list");
  const employeeInfo = document.querySelector(".employees_single_info");

  // Add Employee Logic
  const createEmployee = document.querySelector(".createEmployee");
  const editEmployee = document.querySelector(".editEmployee");
  const addEmployeeModal = document.querySelector(".addEmployee");
  const addEmployeeForm = document.querySelector(".addEmployee_create");
  const dobInput = document.querySelector(".addEmployee_create_dob");

  createEmployee.addEventListener("click", () => {
    addEmployeeModal.style.display = "flex";
  });

  editEmployee.addEventListener("click", () => {
    addEmployeeModal.style.display = "flex";

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

  addEmployeeModal.addEventListener("click", (e) => {
    if (e.target.className === "addEmployee") {
      addEmployeeModal.style.display = "none";
    }
  });

  // Creating check for employee should be greater than or equal 18 years old
  dobInput.max = `${new Date().getFullYear() - 18}-${new Date()
    .toISOString()
    .slice(5, 10)}`;

  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addEmployeeForm);

    const values = [...formData.entries()];

    let empData = {};

    values.forEach((val) => {
      empData[val[0]] = val[1];
    });

    empData.id =
      employees.length > 0 ? employees[employees.length - 1].id + 1 : 1001;
    empData.age =
      new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
    empData.imageUrl =
      empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
    employees.push(empData);

    renderEmployees();

    addEmployeeForm.reset();

    addEmployeeModal.style.display = "none";
  });

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
