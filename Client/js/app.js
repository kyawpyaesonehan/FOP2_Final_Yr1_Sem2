// Name: Kyaw Pyae Sone Han
// Class: DIT/FT/1B/11
// Admission numbers: 2334273

let allHdbData = [];
let townNames = [];

//Calculate mean price
function mean(price) {
    const sum = price.reduce((acc, num) => acc + num, 0);
    return (sum / price.length).toFixed(2);
  }

//Calculate median price
function median(price) {
    const sortedprice = price.sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedprice.length / 2);

    if (sortedprice.length % 2 === 0) {
        const median = (sortedprice[middleIndex - 1] + sortedprice[middleIndex]) / 2;
        return median;
    } else {
        return (sortedprice[middleIndex]).toFixed(2);
    }
}

//Load all the hdb data from the database
function loadAllHdbData() {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8081/allhdbdata')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => {
                console.error("Error: ", error);
                alert("An error occurred while fetching data. Please try again later.");
                reject(error);
            });
    });
}

//async await function
async function getAllHdbData() {
    try {
        allHdbData = await loadAllHdbData();
        return allHdbData;
    } catch (error) {
        console.log(error);
    }
}

//another async await function
async function selectionTowns() {
    try {
        const entry = await getAllHdbData();
        const uniqueTowns = [...new Set(entry.map(hdb => hdb.town))];
        for(const town of uniqueTowns) {
            townNames.push(town);
        }

        const selectTown = document.getElementById('selectTown');
        townNames.forEach(town => {
            const option = document.createElement('option');
            option.value = town;
            option.textContent = town;
            selectTown.appendChild(option);
        });
    } catch (error) {
        console.error('Error: ', error);
    }
}

selectionTowns()
.then(() => {
    const submit = document.getElementById('townSelected');
    submit.addEventListener('click', () => {
        let flatTypes = [];

        const selectedTown = document.getElementById(`selectTown`).value;
        console.log(`Selected Town: ${selectedTown}`);
    
        async function getAllHdbDataByTown (town) {
            try {
                const encodedTown = encodeURIComponent(town);
                const response = await fetch(`http://localhost:8081/bytown/${encodedTown}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error: ', error);
            }
        }

        async function displayAllFlatTypes () {
            try {
                const data = await getAllHdbDataByTown(selectedTown)
                uniqueFlatTypes = [...new Set(data.map(entry => entry.flat_type))];
                uniqueFlatTypes.sort();
                for(const type of uniqueFlatTypes) {
                    flatTypes.push(type);
                }
                
                highestLowest(data);
                meanMedian(data);
            } catch (error) {
                console.error('Error:', error)
            }
        }
        
        displayAllFlatTypes()
      
// Getting the attributes for highest, lowest, mean, median and flattype

        
        const highestLowest = (data) => {
            const highestLowestPricesList = document.getElementById('highestLowestPricesList')
            highestLowestPricesList.innerHTML = `<h3>Highest and Lowest HDB Prices in <br>${selectedTown}</h3>`
            
            flatTypes.forEach(type => {
                const hdbByFlatType = data.filter(hdb => hdb.flat_type === type);
                const sortByPrice = hdbByFlatType.slice().sort((a, b) => a.resale_price - b.resale_price);
            
                const highestPrice = sortByPrice[sortByPrice.length - 1].resale_price;
                const lowestPrice = sortByPrice[0].resale_price;

                const highestLowest = document.createElement('highest-lowest')
                highestLowest.setAttribute('flattype', type);
                highestLowest.setAttribute('highestprice', highestPrice);
                highestLowest.setAttribute('lowestprice', lowestPrice);
                highestLowestPricesList.appendChild(highestLowest)
                
            })
            
        }
    
        const meanMedian = (data) => {
            const meanMedianPricesList = document.getElementById('meanMedianPricesList')
            meanMedianPricesList.innerHTML = `<h3>Mean and Median HDB Prices in <br>${selectedTown}</h3>`
    
            flatTypes.forEach(type => {
                const hdbByFlatType = data.filter(hdb => hdb.flat_type === type); 
                const priceList = hdbByFlatType.map(hdb => hdb.resale_price);

                const meanPrice = mean(priceList);
                const medianPrice = median(priceList);    
                
                const meanMedian = document.createElement("mean-median");
                meanMedian.setAttribute('flattype', type)
                meanMedian.setAttribute('meanprice', meanPrice)
                meanMedian.setAttribute('medianprice', medianPrice)
                meanMedianPricesList.appendChild(meanMedian)
            })
        }
    });
})