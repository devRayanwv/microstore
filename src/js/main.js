var cart = [];

function Product(id,name, quantity, cost, total)
{
  this.id = id;
  this.name = name;
  this.quantity = quantity;
  this.cost = cost;
  this.total = total;
}

function addNewItem(product){
  $('#table-content').append("<tr class=\" "+product.id+"\">\
      <td class='text-left'>"+product.name+"</td>\
      <td class='text-left'>"+product.cost+"</td>\
      <td class='text-center'>\
        <input type='number' value='1' min='1' max='1000' />\
      </td>\
      <td class='text-right'>"+product.total+"</td>\
  </tr>");
}

function removeItem(product) {
  $('.'+product.id).remove();
}
$(document.body).on('click', '.addToCart', function(){
  var name = $(this).parent().parent().children('.product-item-title').text();
  var cost = $(this).parent().children('.price').text();
  var id = this.id;
  var flaq = 1;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name)
    {
      flaq = 0;
      cart.splice(i,1);
      $('.'+id).remove();
      $('.cartStatus-text').fadeOut("slow");
      switch (cart.length) {
        case 0:
        $('.cartStatus-text').text("No items in shopping cart.");
          break;
        case 1:
        $('.cartStatus-text').text("One item in your cart");
        $('.cartStatus-text').append("<a style='margin-left:5px;' class='btn btn-xs btn-warning'>Check out</a>");
          break;
        default:
        $('.cartStatus-text').text(cart.length + " Items in your cart");
        $('.cartStatus-text').append("<a style='margin-left:5px;' class='btn btn-xs btn-warning'>Check out</a>");
      }
      $('.cartStatus-text').fadeIn("slow");
      $('#'+id + ' a').addClass('btn-success');
      $('#'+id + ' a').removeClass('btn-danger');
      $('#'+id + ' a').text('Add to Cart');
    }
  }

  if (flaq)
  {
    var product = new Product(id, name, '1', cost, cost);
    cart.push(product);
    addNewItem(product);
    console.log(cart);
    $('.cartStatus-text').fadeOut("slow");
    switch (cart.length) {
      case 1:
      $('.cartStatus-text').text("One item in your cart");
        break;
      default:
      $('.cartStatus-text').text(cart.length + " Items in your cart");
    }
    $('.cartStatus-text').fadeIn("slow");
    $('.cartStatus-text').append("<a style='margin-left:5px;' class='btn btn-xs btn-warning'>Check out</a>");

    $('#'+id + ' a').addClass('btn-danger');
    $('#'+id + ' a').text('Remove');
    $('#'+id + ' a').removeClass('btn-success');
  }
});
