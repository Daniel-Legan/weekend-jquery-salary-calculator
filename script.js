console.log('in script.js');

let employees = [];

$(document).ready(readyNow);

function readyNow(){
    console.log('the DOM is loaded!');

    $('#employeeForm').on('submit', addEmployee);
}

function addEmployee(event){

    event.preventDefault();

    console.log('in addEmployee');

    let employee = {
        firstName: $('#firstNameInput').val(),
        lastName: $('#lastNameInput').val(),
        ID: $('#idInput').val(),
        title: $('#titleInput').val(),
        annualSalary: $('#annualSalaryInput').val()
    }
    console.log('employee is', employee);

    employees.push(employee);

    console.log('employees is', employees);

    render();
}

function render(){
    
}