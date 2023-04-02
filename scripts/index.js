let url = 'https://localhost:7106/api/people/'


async function expand(id){
    let Employees = []
    

    fetch(url + id)
    .then(function (response) {
        return response.json();
    }) 
    .then(function (data) {
        Employees = data;
        if(Employees[0] == undefined){
            console.log("noData")
        }
        else{
                //This will create new collapsibles for the employyes that this 'id' owns
            let html = document.getElementById(id).innerHTML
            Employees.forEach(function(person) {
                html+= `<div data-role="collapsible">
                <div data-role="collapsible" class="ui-collapsible ui-collapsible-inset ui-corner-all ui-collapsible-themed-content"><h1 class="ui-collapsible-heading" onclick="expand('${person.id}')"><a href="#" class="ui-collapsible-heading-toggle ui-btn ui-btn-icon-left ui-btn-inherit ui-icon-minus">${person.fname} ${person.lname}: ${person.position}<span class="ui-collapsible-heading-status"> click to collapse contents</span></a></h1><div class="ui-collapsible-content ui-body-inherit" aria-hidden="false">
                <div data-role="collapsible" id='${person.id}'>
                <button data-bs-toggle="modal" data-bs-target="#infoModel" onclick="updateModel('${person.fname}', '${person.lname}', '${person.email}', '${person.position}', '${person.locationcode}', '${person.location}')">My Info</button>
                <p>I Manage these people</p>
                </div>
                </div>
                </div>
                </div>`
            })
            // html+=`</div>`
            document.getElementById(id).innerHTML = html
        }
        
    });
}

// <button data-bs-toggle="modal" data-bs-target="#infoModel" onclick="updateModel(${person.fname}, ${person.lname}, ${person.email}, ${person.position}, ${person.locationcode}, ${person.location})">My Info</button>

function updateModel(firstName, lastName, email, desc, locationCode, locationDesc){
    let html =`<p>${firstName} ${lastName}</p>
    <p>${email}</p>
    <p>${desc}</p>
    <p>${locationDesc}</p>
    <p>Location Code: ${locationCode}</p>`

    document.getElementById('modalBody').innerHTML = html
}