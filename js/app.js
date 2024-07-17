const context = document.getElementById("data-set").getContext("2d");
let bar = new Chart(context, {});
//let line = new Chart(context, {});
//Values from the form
const cost = document.getElementById("systemcost");
const size = document.getElementById("systemsize");
const prod = document.getElementById("annualprod");
const elec = document.getElementById("elecprice");
const table = document.getElementById("testBody");  //table 

//Messge
const message = document.getElementById("message");

//The calculate button
const button = document.querySelector(".input-group button");
//Attach an event listener
button.addEventListener("click", calculateGrowth);

const data = [];
const dataline = [];
const labels = [];

function calculateGrowth(e) {
    e.preventDefault();
    data.length = 0;
    dataline.length = 0;
    labels.length = 0;
    let growth = 0;
    let hi = 0.3;
    let lo = 0.1075;
    let cusavings = 0;
    let payback = 0;
    table.innerHTML = "";


    try {
        const systemcost = parseInt(cost.value);
        const systemsize = parseFloat(size.value);
        const annualprod = parseInt(prod.value);
        const elecincrease = parseFloat(elec.value);

        let savings = annualprod * lo;
        console.log(elecincrease);
        payback = cusavings-systemcost;

        //calculate annual savings
        for(let i = 1; i <= 25; i++) {
            data.push(toDecimal(savings, 2));
            console.log(data, dataline);
            cusavings = cusavings + savings;
            //dataline.push(i*100);
            dataline.push(cusavings-systemcost);
            labels.push("Year " + i);
            //drawTable();
            //growth = toDecimal(final, 2);
        /*
        for(let i = 1; i <= systemsize; i++) {
            const final = systemcost * Math.pow(1 + ((annaulprod / 100) / elecincrease), elecincrease * i);
            data.push(toDecimal(final, 2));
            labels.push("Year " + i);
            growth = toDecimal(final, 2);  
            */  
                let row = table.insertRow();
                let year = row.insertCell(0);
                year.innerHTML = i;
                let credit = row.insertCell(1);
                credit.innerHTML = "$" +savings.toFixed(2);
                let roi = row.insertCell(2);
                roi.innerHTML = "$" +cusavings.toFixed(2);
                let payback = row.insertCell(3);
                payback.innerHTML = "$" +numberWithCommas((cusavings-systemcost).toFixed(2));  //+((systemcost*-1)-roi);

            savings = savings * (elecincrease + 1);
            //payback = cusavings-systemcost;
            
        }

        //message.innerText = `You will have this amount ${growth} after ${systemsize} years`;
        drawGraph();
    } catch (error) {
        console.error(error);
    }
}

function drawGraph() {
    bar.destroy();
    bar = new Chart(context, {
        //type: 'bar',
        data: {
            labels,
            datasets: [
            {
                type: 'bar',
                label: "Savings/Year",
                data: data,
                fill: true,
                backgroundColor: "rgba(4, 133, 155, 0.7)",
                borderWidth: 3,
                order: 1,
                yAxisID: 'y',
            }, 
            {
                type: 'line',
                label: "Cumulative ROI",
                data: dataline,
                fill: false,
                backgroundColor: "rgba(81, 40, 79, 0.5)",
                borderWidth: 3,
                order: 0,
                yAxisID: 'y1',
            }
        ],
            
        },
        options: {
            scales: {
                y: { 
                type: 'linear',
                display: true,
                position: 'left',
                },
                y1: {
                type: 'linear',
                display: true,
                position: 'right',
              },
         },
        }
    });
}

function toDecimal(value, decimals) {
    return +value.toFixed(decimals);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}