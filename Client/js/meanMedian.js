// Name: Kyaw Pyae Sone Han
// Class: DIT/FT/1B/11
// Admission numbers: 2334273

const template0 = document.createElement('template');

//css style
template0.innerHTML = `
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
        <h5>Mean price: $<span id='meanPrice'></span></h5>
        <h5>Median price: $<span id='medianPrice'></span></h5>
    </div>
`;

class meanMedianPricesCard extends HTMLElement {
    constructor () {
        super();
        // Create shadow DOM
        this.root = this.attachShadow({mode: 'closed'});
        
        // Clone template and append to shadow DOM
        let clone = template0.content.cloneNode(true);
        this.root.append(clone);
    }

    // Define attributes you need to observe for changes
    static get observedAttributes() {
        return ['flattype', 'meanprice', 'medianprice'];
    }

    // Define getter and setter for flattype attribute
    get flattype() {
        return this.getAttribute('flattype');
    }
    set flattype(value) {
        this.setAttribute('flattype', value); 
    }

    // Define getter and setter for meanprice attribute
    get meanprice() {
        return this.getAttribute('meanprice');
    }
    set meanprice(value) {
        this.setAttribute('meanprice', value); 
    }

    // Define getter and setter for medianprice attribute
    get medianprice() {
        return this.getAttribute('medianprice');
    }
    set medianprice(value) {
        this.setAttribute('medianprice', value); 
    }

    // handle attribute updates
    attributeChangedCallback(attrName, oldValue, newValue ) {
        attrName = attrName.toLowerCase();
        let element;

        // Find the corresponding element and update its text content based on the attribute change
        switch (attrName) {
            case 'flattype' :
                element = this.root.querySelector('#flatType')
                element.textContent = newValue;
            break;
            case 'meanprice' :
                element = this.root.querySelector('#meanPrice')
                element.textContent = newValue;
            break;
            case 'medianprice' :
                element = this.root.querySelector('#medianPrice')
                element.textContent = newValue;
            break;
        }
    }
}

// Define the custom element 'mean-median'
window.customElements.define('mean-median', meanMedianPricesCard);