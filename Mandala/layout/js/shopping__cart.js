var ProductTableItem = [];

(function ($, window, document) {
  // The $ is now locally scoped
 
  // Listen for the jQuery ready event on the document
  $(function () {
    // The DOM is ready!
    showTableItemCart();

    changeValueInput();

    clickRemoveItem();

    clickButtonRemoveItem();

    clickRefreshButtonItem();

    clickButtonBuyItem();

    $('.wizard > .actions li').addClass("btn btn-info");

    clickPaymentbutton();
    
  });
  // The rest of the code goes here!
}(window.jQuery, window, document));

function clickPaymentbutton() {
    let items = JSON.parse(localStorage.getItem('id--item--cart'));
    if (items == null || items == undefined || items == '') {
        $(".cart-button__4").click(function() {
            alert("Không có item mà cũng thanh toán à!!");
        });
    } else {
        $(".cart-button__4").click(function() {
            $(location).attr('href', './Payment.html')
        });
    }
}

function clickRefreshButtonItem() {
    $(document).on('click', '.cart-button__3', function () {
        ProductItem = [];
        showItemCart();

        ProductTableItem = [];
        showTableItemCart();
    })
}
function clickButtonBuyItem() {
    $(".cart-button__buy").click(function() {
        location.href = "./Product.html"
    });
}


function clickButtonRemoveItem() {
    let ItemRemove = [];
    ItemRemove = JSON.parse(localStorage.getItem("id--item--cart"));
    if (ItemRemove == null || ItemRemove == undefined || ItemRemove == '') {
        $(document).on('click', '.cart-button__2', function () {
            alert("Xóa không khí à @@");
        });
    }
    else {
        $(document).on('click', '.cart-button__2', function () {

            let confirmed = confirm('Bạn muốn xóa tất cả?');
            if(confirmed) {
                ItemRemove.splice("id--item--cart");
                showTableItemCart();
                showItemCart();
            } else {
                return false;
            }
            localStorage.setItem("id--item--cart", JSON.stringify(ItemRemove));

        })
    }
}

function clickRemoveItem() {
    $(document).on('click', '.item_icon--remove', function () {
        let ItemRemove = [];
        ItemRemove = JSON.parse(localStorage.getItem("id--item--cart"));


        let index = ItemRemove.findIndex(obj => obj.id === $(this).attr('data--id'));
        ItemRemove.splice(index, 1);

        localStorage.setItem("id--item--cart", JSON.stringify(ItemRemove));

        ProductItem = [];
        showItemCart();

        ProductTableItem = [];
        showTableItemCart();
    })
}

function changeValueInput() {
    $(document).on('change', '.input--value', function () {
        let countProducts = JSON.parse(localStorage.getItem('id--item--cart'));
        let index = countProducts.findIndex(obj => obj.id == $(this).attr('data--id'));
        countProducts[index].count = parseInt($(this).val());

        localStorage.setItem('id--item--cart', JSON.stringify(countProducts));
    });
}

function loadCartTable(id) {
    var url = "http://localhost:3005/products/"+id+"";
    axios.get(url)
        .then(function (res) {
            // handle success
            ProductTableItem.push(res.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            layoutTable();
        });
}

function layoutTable() {
    let content = '';
    let countProducts = JSON.parse(localStorage.getItem('id--item--cart'));
    let total = 0;

    for (let count of countProducts) {

        for (let dataTable of ProductTableItem) {
            if (parseInt(count.id) == parseInt(dataTable.id)) {
                content += 
                `<tr class="row p-0" style="margin: 0px auto;">
                    <td class="cart--table__space col-lg-2"><img src="images/${dataTable.image}"></td>
                    <td class="cart--table__space col-lg-3"><p>${dataTable.productName}</p></td>
                    <td class="cart--table__space col-lg-2 bold">${dataTable.price}.000<sup>đ</sup></td>
                    <td class="cart--table__space col-lg-2"><input class="mx-auto input--value" data--id="${count.id}" type="number" min="1" max="10" value="${count.count}"></td>
                    <td class="cart--table__space col-lg-2 bold">${count.count*dataTable.price}.000<sup>đ</sup></td>
                    <td class="cart--table__space col-lg-1"><button data--id="${count.id}" class="btn item_icon--remove"><i class="fa fa-trash-o"></i></button></td>
                <tr/>`

                total += (count.count * dataTable.price);

            }
        }
    }

    let totalShoppingCart = 
                        `<tr class="row p-0" style="margin: 0px auto;">
                            <td class="col-lg-9 bold pt-2 uppercase">Tổng tiền</td>
                            <td class="col-lg-3 bold pt-2">${total}.000<sup>đ</sup></span></td>
                        <tr/>`

    localStorage.setItem('total--price', JSON.stringify(total));

    $('.table__cart').html(content);
    $('.total__shopping--price').html(totalShoppingCart);
}

function showTableItemCart() {
    let arrItemCart = JSON.parse(localStorage.getItem("id--item--cart"));

    if (arrItemCart) {
        for (var index of arrItemCart) {
            loadCartTable(index.id);
        }
    }
}