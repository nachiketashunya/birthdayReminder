//get table body 
let birthdaysTableBody = document.querySelector(".birthdays-table-body");

// get birthday form
let birthdayForm = document.querySelector(".add-birthday-form");

birthdayForm.addEventListener("submit", addNewBirthday);

function addNewBirthday(e) {
    e.preventDefault();

    let birthdays = getBirthdays();

    let name = document.querySelector("#name").value;
    let date = document.querySelector("#date").value;

    if (name === "" || date === ""){
        showAlert("Please enter valid details", "danger");
        return;
    }

    let birthday = {
        name : name,
        date : date
    }

    birthdays.push(birthday);
    //set to localstorage
    localStorage.setItem("birthdays", JSON.stringify(birthdays));
    //show alert
    showAlert(`${date} is marked as ${name}'s birthday`, "success");
    //display birthdays
    displayBirthdays();
    //reset form inputs
    birthdayForm.reset();
};

//remove birthday 
birthdaysTableBody.addEventListener("click", removeBirthday);

function removeBirthday(e){
    let birthdays = getBirthdays();
    let target = e.target;

    if (!(target.classList.contains("remove-btn"))) return;

    let targetName = target.parentElement.parentElement.childNodes[1].textContent;

    birthdays.forEach( (birthday, index) => {
        if (birthday.name === targetName){
            birthdays.splice(index, 1);
        }
    })

    //set to localstorage
    localStorage.setItem("birthdays", JSON.stringify(birthdays));

    displayBirthdays();

}

//get birthdays from localstorage
function getBirthdays(){
    let birthdays;

    if (!(localStorage.getItem("birthdays"))){
        birthdays = [];
    } else {
        birthdays = JSON.parse(localStorage.getItem("birthdays"));
    }

    return birthdays;
}


//display birthdays
function displayBirthdays(){
    let birthdays = getBirthdays();

    birthdaysTableBody.innerHTML = "";

    birthdays.forEach( (birthday) => {
        birthdaysTableBody.innerHTML += `
            <tr>
                <td>${birthday.name}</td>
                <td>${birthday.date}</td>
                <td><a href="#" class="btn btn-sm btn-danger remove-btn">X</a></td>
            </tr>
        `
    })
}

//show alert function
function showAlert(msg, color){
    let location = document.querySelector(".add-new-birthday");
    let newDiv = document.createElement("div");

    newDiv.className = `mt-3 mx-2 alert alert-${color}`
    newDiv.textContent = msg;

    location.insertAdjacentElement("beforebegin", newDiv);

    setTimeout( () => {
        document.querySelector(".alert").remove();
    }, 2000);
}