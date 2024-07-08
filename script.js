// to get id fro input
const output1 = document.getElementById("input1");
const output2 = document.getElementById("input2");
// to query selector from button
const btnSubmit = document.querySelector("button");
// get div element by id
const div = document.getElementById("input-class");
const div2 = document.getElementById("main-class");
// to query selector from h1
const h1 = document.querySelector("h1");
// create element p (paragraph)
const para = document.createElement("p");
// give classname p
para.className = "para";
// when double click placeholder show it
output1.addEventListener("dblclick", ()=> {
    output1.placeholder = "watching";
});

output2.addEventListener("dblclick", ()=> {
    output2.placeholder = "running";
});

// when a click placeholder will blank
output1.addEventListener("click", ()=> {
    output1.placeholder = "";
    output1.style.borderBottom = "2px solid black";
});

output2.addEventListener("click", ()=> {
    output2.placeholder ="";
    output2.style.borderBottom = "2px solid black";
});

// action when click button submit
btnSubmit.addEventListener("click", async ()=> {

    // check whether value is blank or not
    const result1 = output1.value.trim();
    const result2 = output2.value.trim();

    // if result1 or result2 blank alert will show it
    if(result1==="" || result2=== "") {
        alert("You are not confused!");

    } else {

        try {
            // button, div, p, and button back will none when click button submit
            div.style.display = "none";
            btnSubmit.style.display = "none";
            para.style.display = "none";
            btnBack.style.display = "none";
        


            // h1 changed to be "loading" as long as the timer have not finished
            h1.innerHTML = "Loading...";
        
            // array to put 2 inputs
            let valuesOutput = [];
            valuesOutput.push(result1,result2);
        
            // variable decision to get result from array
            const Decision = await getRandomDecision(valuesOutput);

            // p and button back will display
            para.style.display = "block";
            btnBack.style.display = "inline-block";

            // h1 changed to be "I suggest you"
            h1.innerHTML = "I suggest you to";
    
            console.log(`${Decision}`);

            // result decision helper
            para.textContent = `${Decision}`;

            // save into sessionStorage
            sessionStorage.setItem("decision", Decision);
            sessionStorage.setItem("isDecisionMade", "true");
        
        // append element p and button
            div2.append(para);
            div2.append(btnBack);
        } catch (error) {
            console.error(error);
        }

        
    }

    

    output1.value = "";
    output2.value = "";

});

// create button element
const btnBack = document.createElement("button");
btnBack.type = "button";
btnBack.textContent = "back";
btnBack.className = "btnBack";
btnBack.style.display = "none";

// action when buttonBack clicked
btnBack.addEventListener("click", ()=> {
    div.style.display = "flex";
    btnSubmit.style.display = "inline-block";
    para.style.display = "none";
    btnBack.style.display = "none";

    h1.textContent = "What makes you confused?";
    sessionStorage.removeItem("decision");
    sessionStorage.removeItem("isDecisionMade");
});


// function to get result decision
function getRandomDecision(outputDecision) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * outputDecision.length);
            resolve(`${outputDecision[randomIndex]}`);
        }, 2000);
    });

}

// to display or undisplay ahref when clicked by users
function myFunction() {
    const header = document.querySelector('.header');
    if (header.classList.contains('responsive')) {
        header.classList.remove('responsive');
    } else {
        header.classList.add('responsive');
    }
  }

//   create smooth when one of burger clicked by users
  document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.header a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // prevent default action from link

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // to show and display interface when user refresh th browser
    const savedDecision = sessionStorage.getItem("decision");
    const isDecisionMade = sessionStorage.getItem("isDecisionMade");

    if (isDecisionMade === "true" && savedDecision) {
        div.style.display = "none";
        btnSubmit.style.display = "none";
        para.style.display = "block";
        btnBack.style.display = "inline-block";

        h1.innerHTML = "I suggest you to";
        para.textContent = savedDecision;

        div2.append(para);
        div2.append(btnBack);
    }
});