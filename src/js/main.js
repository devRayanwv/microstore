var cart = [];
$(document.body).on('click', '.addToCart', function(){
  var id = this.id;
  var flaq = 1;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i] === id)
    {
      flaq = 0;
      cart.splice(i,1);
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
    cart.push(id);
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
