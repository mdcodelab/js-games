const form=document.querySelector(".form");
const nameInput=document.querySelector(".name-input");
console.log(nameInput);

form.addEventListener("submit", (e)=> {
e.preventDefault();
const formData = new FormData(e.currentTarget); //capture form data as on object
console.log(formData);
const values=[...formData.values()]; //array of values introduced in the fields
if(values.includes("")) {
    console.log("please enter all values")
    return
}
const formObject = Object.fromEntries(formData);
console.log(formObject);
});

