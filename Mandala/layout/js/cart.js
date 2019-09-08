// file cart
var ProductItem = [];

$(document).ready(function () {

    addItemCart();

    showItemCart();

    removeCartItem();

});

function getItemCart(id) {
    let url = "http://localhost:3005/products/"+id+"";
    axios.get(url)
        .then(function (res) {
            // handle success
            // console.log(res)
            ProductItem.push(res.data);
            return;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            renderCart();
        });
}

function renderCart() {
    // console.log(ProductItem);
    let contentInfoCart = '';
    let total = 0;
    let totalAmount = 0;

    if (!ProductItem) contentInfoCart = '';

    else {
        let ItemCart = JSON.parse(localStorage.getItem("id--item--cart"));
        if (!ItemCart) ItemCart = {};

        if (ItemCart) {
            for (var index of ItemCart) {
                totalAmount += index.count;

                for (var item of ProductItem) {

                    if (parseInt(index.id) === parseInt(item.id)) {
                            total += (parseInt(item.price) * index.count);
                            contentInfoCart += 
                                    '    <li class="outspace-10 row li-menu2">\n' +
                                    '      <div class=\"col-lg-5 pl-0 pr-0 img-menu2\" style=\"background-image: url(\'images/'+item.image+'\')\">\n' +
                                    '        <div class="badge badge-pill badge-success">'+index.count+'</div>\n' +
                                    '      </div>\n' +
                                    '      <div class="ct-item col-lg-6 pr-0 pl-0">\n' +
                                    '        <p class="text-menu2">'+item.description+'</p>\n' +
                                    '        <p class="text-menu2 italic active">'+item.price+'.000<sup>đ</sup></p>\n' +
                                    '      </div>\n' +
                                    '      <div class="ct-item col-lg-1 pr-0 text-right">\n' +
                                    '        <button class="btn btn-close fa fa-times cart-item--remove" value="'+index.id+'"></button>\n' +
                                    '      </div>\n' +
                                    '    </li>'
                                    '    <hr/>'
                    }
                }
            }
        }
    }

    let totalCart = '<span>'+total+'.000<sup>đ</sup></span>';
    let contentAmount = '<span class="badge badge-pill badge-success">'+totalAmount+'</span>';


    $('.total--price').html(totalCart);
    $('.cart__item--sub').html(contentInfoCart);
    $('.show-amount-item').html(contentAmount);
}

function removeCartItem() {
    $(document).on('click','.cart-item--remove', function() {
        let arrItemRemove = [];
        arrItemRemove = JSON.parse(localStorage.getItem("id--item--cart"));


        let index = arrItemRemove.findIndex(obj => obj.id === $(this).attr('value'));
        arrItemRemove.splice(index, 1);

        localStorage.setItem("id--item--cart", JSON.stringify(arrItemRemove));

        ProductItem = [];
        showItemCart();

        ProductTableItem = [];
        showTableItemCart();
    });
}

function addItemCart() {
    $(document).on('click','.btn-item1', function() {
        let countObject = JSON.parse(localStorage.getItem('id--item--cart'));
        if (!countObject) { // First Array Check Count Init
            countObject = [];
            countObject.push({id: $(this).val(), count: 1})
        }
        else { // Array Check Count exist
            let index = countObject.findIndex(obj => obj.id === $(this).val()); // Get index of element in Array Check Count
            if (index > -1) // Found element in Array Check Count
                countObject[index].count += 1;
            else // Don't Found element in Array Check Count
                countObject.push({id: $(this).val(), count: 1})
        }

        localStorage.setItem('id--item--cart', JSON.stringify(countObject)); // Set LocalStorage for Array Check Count

        ProductItem = [];
        showItemCart();
    });
}

function showItemCart() {
    let ItemCart = JSON.parse(localStorage.getItem("id--item--cart"));

    if (ItemCart) {
        if (ItemCart.length <= 0) renderCart();
        else {
            for (var index of ItemCart) {
                getItemCart(index.id);
            }
        }
    }
}

