// Name: Kyaw Pyae Sone Han
// Class: DIT/FT/1B/11
// Admission numbers: 2334273

const template = document.createElement('template');

//css style
template.innerHTML = `
    <style>
        :host {
            display : block;
            border-style: outset;
            font-family: sans-serif, Arial, Helvetica;
            background-color : #637A9F;
            margin: 10px;
            box-shadow: 0 6px 6px rgba(0, 0, 0, 0.6);
        }
        div {
            padding : 0px 30px 30px 30px;
            margin: 10px;
        }
        h3 {
            font-size : 2rem;
            text-align: center;
        }
        h5 {
            font-size : 1rem;
            text-align: center;
        }
    </style>
    <div>
        <h3 id='flatType'></h3>
        <h5>Highest price: $<span id='highestPrice'></span></h5>
        <h5>Lowest price: $<span id='lowestPrice'></span></h5>
    </div>
`;

class highestLowestPricesCard extends HTMLElement {
    constructor () {
        super();
        // Create shadow DOM
        this.root = this.attachShadow({mode: 'closed'});
        
        // Clone template and append to shadow DOM
        let clone = template.content.cloneNode(true);
        this.root.append(clone);
    }

     // Define attributes you need to observe for changes
    static get observedAttributes() {
        return ['flattype', 'highestprice', 'lowestprice'];
    }

     // Define getter and setter for flattype attribute
    get flattype() {
        return this.getAttribute('flattype');
    }
    set flattype(value) {
        this.setAttribute('flattype', value); 
    }

     // Define getter and setter for highestprice attribute
    get highestprice() {
        return this.getAttribute('highestprice');
    }
    set highestprice(value) {
        this.setAttribute('highestprice', value); 
    }

     // Define getter and setter for lowestprice attribute
    get lowestprice() {
        return this.getAttribute('lowestprice');
    }
    set lowestprice(value) {
        this.setAttribute('lowestprice', value); 
    }

    // handle attribute updates
    attributeChangedCallback(attrName, oldValue, newValue ) {
        attrName = attrName.toLowerCase(); // Convert attribute name to lowercase
        let element;

        // Find the corresponding element and update its text content based on the attribute change
        switch (attrName) {
            case 'flattype' :
                element = this.root.querySelector('#flatType')
                element.textContent = newValue;
            break;
            case 'highestprice' :
                element = this.root.querySelector('#highestPrice')
                element.textContent = newValue;
            break;
            case 'lowestprice' :
                element = this.root.querySelector('#lowestPrice')
                element.textContent = newValue;
            break;
        }
    }
}

// Define the custom element 'highest-lowest'
window.customElements.define('highest-lowest', highestLowestPricesCard);