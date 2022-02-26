function validate(){
    let newSchoolNameInput = document.querySelector('#newSchoolName').value;
    let newSchoolGraduationDateInput = document.querySelector('#newSchoolGraduationDate').value;
    let errorMessageName = document.querySelector('#errorMessageName');
    let errorMessageDate = document.querySelector('#errorMessageDate');
    let newSchoolSubmit = document.querySelector('#newSchoolSubmit');

    if(newSchoolNameInput === "" && newSchoolGraduationDateInput === ""){
        errorMessageName.innerHTML = "Enter school name!";
        errorMessageDate.innerHTML = "Enter school graduation date!";
        newSchoolSubmit.disabled = true;
    } else if(newSchoolNameInput !== "" && newSchoolGraduationDateInput === ""){
        errorMessageName.innerHTML = "";
        errorMessageDate.innerHTML = "Enter school graduation date!";
        newSchoolSubmit.disabled = true;
    } else if(newSchoolNameInput === "" && newSchoolGraduationDateInput !== ""){
        errorMessageName.innerHTML = "Enter school name!";
        errorMessageDate.innerHTML = "";
        newSchoolSubmit.disabled = true;
    } else {
        errorMessageName.innerHTML = "";
        errorMessageDate.innerHTML = "";
        newSchoolSubmit.disabled = false;
    }
}