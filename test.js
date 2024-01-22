const url = 'https://65ad1fd1adbd5aa31be02a2d.mockapi.io/v1';

function getEmployees() {
    fetch(url)
    .then(res => res.json())
    .then(employees => {
        let employeesBody = document.getElementById('employeesBody');
        employeesBody.innerHTML = '';
        employees.forEach(employee => {
            console.log(employee);
            let employeeRow = document.createElement('tr');
            let nameCell = document.createElement('td');
            let designationCell = document.createElement('td');
            let departmentCell = document.createElement('td');
            let salaryCell = document.createElement('td');
            let actionsCell = document.createElement('td');
            let image = document.createElement('img');
            image.style.width='50px';
            image.style.paddingLeft='20%';
            
            nameCell.textContent = employee.name;
            designationCell.textContent = employee.designation;
            departmentCell.textContent = employee.department;
            salaryCell.textContent = employee.salary;
            image.src=employee.avatar;
            actionsCell.innerHTML = `
                <button onclick="editEmployee('${employee.id}')">Edit</button>
                <button onclick="deleteEmployee('${employee.id}')">Delete</button>
            `;

            employeeRow.appendChild(image);
            employeeRow.appendChild(nameCell
            );
            employeeRow.appendChild(designationCell);
            employeeRow.appendChild(departmentCell);
            employeeRow.appendChild(salaryCell);
            employeeRow.appendChild(actionsCell);

            // Append the employee row to the employees table
            employeesTable.appendChild(employeeRow);
        })
    })
    .catch(err => console.error(err));
}

function createEmployee() {
    let employeeDetails = {
        name: document.getElementById('name').value,
        designation: document.getElementById('designation').value,
        department: document.getElementById('department').value,
        salary: document.getElementById('salary').value,
        avatar: document.getElementById('avatar').value
    };
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employeeDetails),
    })
    .then(res => res.json())
    .then(employee => {
        console.log(employee);
        location.reload()
        // getEmployees();
    })
    .catch(err => console.error(err));
}

function editEmployee(id) {
    // const c
    console.log("in edit")
    document.getElementById("editEmployeeModal").style.display = 'block'
    document.getElementById('id').value = id;

    // const 
    // let newName = prompt("Enter new Employee name: ");
    // if(newName==="" ||newName==null){
    //     return;
    // }
    // let newDesignation = prompt("Enter new Designation: ");
    // if(newDesignation==="" ||newDesignation==null){
    //     return;
    // }
    // let newDepartment = prompt("Enter new Department: ");
    // if(newDepartment==="" ||newDepartment==null){
    //     return;
    // }
    // let newSalary = prompt("Enter new Salary: ");
    // if(newSalary==="" ||newSalary==null){
    //     return;
    // }
    // let newAvatar = prompt("Enter new Avatar: ");
    // if(newAvatar==="" ||newAvatar==null){
    //     return;
    // }
    
    // fetch(url + '/' + id, {
    //     method: "PUT",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(employeeDetails),
    // })
    // .then(res => res.json())
    // .then(employee => {
    //     console.log(employee);
    //     // getEmployees();
    //     location.reload();
    // })
    // .catch(err => console.error(err));
}
    

// function updatedata(data){
//     // event.preventdefault();
//     console.log("in updatedata fun"+data);
//     // const formData=new FormData(document.getElementById('editEmployeeModal'));
//     // // const formData=document.getElementById('editEmployeeModal');
//     // console.log('hi'+formData);
    
//        let name= document.getElementById('name').value;
//        let designation= document.getElementById('designation').value;
//        let  department= document.getElementById('department').value;
//        let  salary= document.getElementById('salary').value;
//        let  avatar= document.getElementById('Avatar').value;
    
//     console.log(name)
//     fetch(url + '/' + document.getElementById('id').value, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(employeeDetails),
//     })
//     .then(res => res.json())
//     .then(employee => {
//         console.log(employee);
//         // getEmployees();
//         // location.reload();
//     })
//     .catch(err => console.error(err));
// }

function updatedata() {
    // Prevent default form submission behavior
    // event.preventDefault();
  
    // Collect form data
    const formData = new FormData(document.getElementById('editEmployeeModal'));
  
    // Create an object to hold the extracted fields
    const employeeDetails = {};
  
    // Iterate through the form data and extract fields
    for (const [key, value] of formData.entries()) {
      employeeDetails[key] = value;
    }
  
    console.log(employeeDetails); // Check the extracted data
    fetch(url + '/' + document.getElementById('id').value, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employeeDetails),
            })
            .then(res => res.json())
            .then(employee => {
                console.log(employee);
                resetForm();
                closebtn();
                // getEmployees();
                // location.reload();
            })
            .catch(err => console.error(err));
  }

  function resetForm() {
    const form = document.getElementById('editEmployeeModal');
    const inputs = form.elements;
  
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].type !== 'button' && inputs[i].type !== 'submit') {
        inputs[i].value = '';
      }
    }
  }
  
  

function deleteEmployee(id) {
    const deleteEntry=confirm("Want to delete?");
    if(deleteEntry){
    fetch(url + '/' + id, { method: "DELETE" })
    .then(_ => location.reload())
    .catch(err => console.error(err));
    }

}

function closebtn(){
    resetForm();
    document.getElementById('editEmployeeModal').style.display = 'none'
}

window.onload = getEmployees;