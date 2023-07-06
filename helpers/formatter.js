module.exports = {
    formatPrice: function(num) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(num);
    },
  
    formatDate: function(date) {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('id-ID', options);
      }
      
  };
  