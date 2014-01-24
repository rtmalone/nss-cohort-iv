(function (){

  'use strict';

  $(document).ready(init);

  function init(){
    $('#addItem').click(addItem);
  }

  function addItem(event){
    var item = $('#item').val();
    var qty = $('#qty').val();
    var amt = $('#amt').val();
    var total = qty * amt;
    addItemToTable(item, qty, amt, total);
    updateTotals();
    event.preventDefault();
  }

  function updateTotals(){
    var $amts = $('table > tbody > tr > td:nth-child(3)');
    var numbers = transformTdsToNums($amts);
    var sumAmts = sum(numbers);
    $('table > tfoot > tr > td:nth-child(3)').text(numberToCurrency(sumAmts));

    var $totals = $('table > tbody > tr > td:nth-child(4)');
    numbers = transformTdsToNums($totals);
    sumAmts = sum(numbers);
    $('table > tfoot > tr > td:nth-child(4)').text(numberToCurrency(sumAmts));
  }

  function sum(numbers){
    var total = 0;
    for(var i=0; i<numbers.length; i++){
      total += numbers[i];
    }
    return total;
  }

  function transformTdsToNums($tds){
    return $.map($tds, function(td){
      return td.textContent.slice(1) * 1;
    });
  }

  function addItemToTable(item, qty, amt, total){
    var $tr = $('<tr>');
    var $item = $('<td>');
    $item.text(item);
    var $qty = $('<td>');
    $qty.text(qty);
    var $amt = $('<td>');
    $amt.text(numberToCurrency(amt * 1));
    var $total = $('<td>');
    $total.text(numberToCurrency(total));

    $tr.append($item, $qty, $amt, $total);
    $('table tbody').append($tr);
  }

  function numberToCurrency(number){
    return '$' + number.toFixed(2);
  }

})();
