


const form = document.querySelector("form"); 
const loader = document.querySelector(".loader");
const API_URL = "http://localhost:5000/tweet";
loader.style.display = "none";

form.addEventListener("submit", (event) => {
    event.preventDefault();

    var formData = new FormData(form);
    var content = formData.get("content");
    var name = formData.get("name");

    var output = {
        name,
        content
    };

    // console.log(output);

    loader.style.display = "";
    form.style.display = "none";

    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(output),
        headers: {
            "content-type": "application/json"
        }
    });
    
    
});
