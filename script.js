
// final Data has to be displayed in the Bootstrap Cards
// Multiple api with async and await


async function get_data() {
    var res = await fetch("https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json")
    var result = await res.json();
    console.log(result);
    for (var i = 0; i < result.length; i++) {
        //     const div = document.createElement("div")
        //     div.innerHTML= `<div class="card" style="width: 18rem;">
        //     <div class="card-body">
        //       <h5 class="card-title">${result[i].name}</h5>
        //       <h6 class="card-subtitle mb-2 text-muted">${result[i].capital}</h6>
        //       <p class="card-text">${result[i].latlng}</p>

        //     </div>
        //   </div>`
        //     document.body.append(div)

        const containerDiv = document.createElement("div");
        containerDiv.className = "container-fluid";

        // Create a row for every 4 cards
        for (let i = 0; i < result.length; i += 4) {
            const rowDiv = document.createElement("div");
            rowDiv.className = "row";

            // Create 4 columns in each row
            for (let j = 0; j < 4 && i + j < result.length; j++) {
                const columnDiv = document.createElement("div");
                columnDiv.className = "col-md-3"; // Use col-md-3 for 4 columns in a row

                const cardHTML = `
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">${result[i + j].name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${result[i + j].capital}</h6>
                    <p class="card-text">${result[i + j].latlng}</p>
                </div>
            </div>
        `;

                columnDiv.innerHTML = cardHTML;
                rowDiv.appendChild(columnDiv);
            }

            containerDiv.appendChild(rowDiv);
        }

        document.body.appendChild(containerDiv);






        var name = result[i].name;
        var latlng = result[i].latlng;
        var capital_data = result[i].capital
        
        open_data(name, ...latlng, capital_data);
    }

}

async function open_data(name, lat, lon, capital_data) {
    try {
        if (lat == undefined) {
            throw new Error("Invalid Lat Long values")
        }
        var open_res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fa4973b1fa1ca717811b9566c55321ec`)
        var final_res = await open_res.json();
        console.log(`Name:${name},Capital:${capital_data},lat:${lat},longitude:${lon}`);
    } catch (error) {
        console.log("data lost" + error.message);
    }
}


get_data();