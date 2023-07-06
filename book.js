var easyinvoice = require('easyinvoice');

function renderInvoice(){
    var data = getSampleData();
  document.getElementById("pdf").innerHTML = "loading...";
    easyinvoice.createInvoice(data, function(result) {
      easyinvoice.render('pdf', result.pdf);
  });
}

function createInvoice() {
    var data = getSampleData();
      easyinvoice.createInvoice(data, function(result) {
      document.getElementById('invoiceBase64').innerText = result.pdf;
      /* console.log(result.pdf); */
    });
  }

function getSampleData() {
    return {
        sender: {
            company: 'Explore Express',
            // "custom1": "custom value 1",
            // "custom2": "custom value 2",
            // "custom3": "custom value 3"
        },
        information: {
            number: '2021.0001',
            date: new Date(),
        },
        products: [
            {
                quantity: 2,
                description: 'Product 1',
                'tax-rate': 6,
                price: 33.87
            }
        ],
        'bottom-notice': 'Kindly pay your invoice within 15 days.',
        settings: {
            currency: 'USD' // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
            // "locale": "nl-NL", // Defaults to en-US, used for number formatting (see docs)
            // "margin-top": 25, // Default to 25
            // "margin-right": 25, // Default to 25
            // "margin-left": 25, // Default to 25
            // "margin-bottom": 25, // Default to 25
            // "format": "Letter", // Defaults to A4,
            // "height": "1000px", // allowed units: mm, cm, in, px
 		        // "width": "500px", // allowed units: mm, cm, in, px
     		    // "orientation": "landscape", // portrait or landscape, defaults to portrait
        },
        "translate": {
        },
    };
}
