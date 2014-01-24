(function (){

  'use strict';

  $(document).ready(init);

  function init(){
    $('#addItem').click(addItem);
  }

  function addItem(event){
    var item = $('#item').val();
    var qty = $('#qty').val() * 1;
    var amt = $('#amt').val() * 1;
    var total = qty * amt;
    addItemToTable(item, qty, amt, total);
    event.preventDefault();
    debugger;
  }

  function addItemToTable(item, qty, amt, total){
    var $tr = $('<tr>');
    var $item = ('<td>');
    $item.text(item);
    var $qty = ('<td>');
    $qty.text(qty);
    var $amt = ('<td>');
    $amt.text(numberToCurrency(amt * 1));
    var $total = ('<td>');
    $total.text(numberToCurrency(total));

    $tr.append($item, $qty, $amt, $total);
    $('table tbody').append($tr);
  }

  function numberToCurrency(number){
    return '$' + number.toFixed(2);
  }

})();
