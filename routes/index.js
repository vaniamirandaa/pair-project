const express = require('express');
const router = express.Router();
const easyinvoice = require('easyinvoice');



router.get('/invoice', (req, res) => {
    const invoiceData = {
      currency: 'USD',
      taxNotation: 'tax',
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      logo: 'path/to/your/logo.png',
      sender: {
        company: 'Your Company',
        address: '123 Street, City, Country',
      },
      client: {
        company: 'Client Company',
        address: '456 Street, City, Country',
        phone: '+9876543210',
        email: 'client@example.com',
      },
      invoiceNumber: 'INV-001',
      invoiceDate: '2023-07-06',
      products: [
        {
          quantity: 2,
          description: 'Product 1',
          tax: 10,
          price: 50,
        },
        {
          quantity: 1,
          description: 'Product 2',
          tax: 10,
          price: 100,
        },
      ],
      bottomNotice: 'Thank you for your business!',
    };
  
    const invoiceOptions = {
      filename: 'invoice.pdf',
    };
  
    easyinvoice.createInvoice(invoiceData, invoiceOptions, (result, err) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred');
      } else {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
        res.send(result.pdf);
      }
    });
  });
  
module.exports = router
