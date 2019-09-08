$(document).ready(function () {

    $("#cart").click(function() {
        $(".menu2").fadeToggle("fast");
    });

    // Click vào nút grid và list để liệt kê ra thứ cần liệt kệ
    changeTypeInput();

    $(".btn--payment").click(function() {
        $(location).attr('href', './Shopping--Cart.html')
    });

    // truyền dữ liệu từ server vào và liệt kê ra tại trang
    showGridProducts();
    showListProducts();
})

function changeTypeInput(){
    $('#gird__grid').click(function() {
        $('.product_list--item').addClass('d-none');
        $('.product_grid--item').removeClass('d-none');
        $(this).removeClass('typeButton__deactive') ;
        $('#gird__list').addClass('typeButton__deactive');
    });

    $('#gird__list').click(function() {
        $('.product_grid--item').addClass('d-none');
        $('.product_list--item').removeClass('d-none');
        $(this).removeClass('typeButton__deactive');
        $('#gird__grid').addClass('typeButton__deactive');
    });
}

async function showGridProducts() {
    let url   = "http://localhost:3005/products?_limit=6&_page=1";
    let res = await axios.get(url);
    loadProductGridData(res.data); // đưa data vào trong loadProductGridData
}
async function showListProducts() {
    let url   = "http://localhost:3005/products?_limit=3&_page=3";
    let res = await axios.get(url);
    loadProductListData(res.data); // đưa data vào trong loadProductListData
}

function loadProductGridData(datas) {
    let listItem = '';
    for(let data of datas ) {
        listItem += 
    '               <li class           ="product_grid--item mt-4 mr-0 ml-0 p-0 center triggeritem col-6 col-md-4 col-lg-4">\n' +
    '                 <img class        ="item-height nospace"'+'alt="'+data.image+'"' + 'src="images/'+data.image+'"'+'style="height:225px">\n' +
    '                 <hr style         ="border-top: 1px dotted #c1c1c1; width:80%">\n' +
    '                 <p class          ="nospace" style="color: #c1c1c1">'+data.productName+'</p>\n' +
    '                 <p class          ="bold nospace">'+data.description+'</p>\n' +
    '                 <s class          ="nospace">' +'<pre style="margin:0">' + '                           ' + '</pre>'+'</s>\n' +
    '                 <p class          ="bold italic active nospace inline" style="font-size: medium">' + data.price +'.000<sup>đ</sup></p>\n'+
    '                 <div class        ="nospace inline italic" style="font-size: unset; color: #c1c1c1">'+data.priceSale+'.000<sup>đ</sup></div>\n' +
    '                 <div class        ="block">\n' + 
    '                   <button class   ="bold btn btn-item1" value="'+data.id+'">MUA HÀNG</button>\n' +
    '                   <button class   ="btn btn-item2 fa fa-heart"></button>\n' +
    '                   <button class   ="btn btn-item3 fa fa-refresh"></button>\n' +
    '                 </div>\n' +
    '               </li>'
    }

    $('.product--grid--item').html(listItem)
}


function loadProductListData(datas) {
    let listItem = '';
    for(let data of datas ) {
        listItem += 
    '               <li class           ="product_list--item d-none row triggeritem">\n' +
    '                 <div class        ="mt-4 mr-0 ml-0 p-0 center triggeritem col-12 col-md-4 col-lg-4"><img class="item-height nospace" src="images/'+data.image+'" alt='+data.image+' style="height:195px">\n' +
    '                   <hr style       ="border-top: 1px dotted #c1c1c1; width:80%">\n' +
    '                 </div>\n' +
    '                 <div class        ="col-12 col-md-7 col-lg-8">\n' +
    '                   <h6 class       ="bold">'+data.productNameList+'</h6>\n' +
    '                   <pre><i class   ="fa fa-heart"></i><i class="fa fa-heart"></i><i class="fa fa-heart"></i><i class="fa fa-heart"></i><i class="fa fa-heart"></i>(4 lượt mua)</pre>\n' +
    '                   <p>'+data.descriptionList+'</p>\n' +
    '                   <p class        ="d-inline bold font-20">'+data.price+'.000<sup>đ</sup></p>\n' +
    '                   <p class        ="d-inline italic" style="font-size: unset; color: #c1c1c1">'+data.priceSale+'.000<sup>đ</sup></p>\n' +
    '                   <div class      ="block">\n' +
    '                     <button class ="bold btn btn-item1" value='+data.id+'>MUA HÀNG</button>\n' +
    '                     <button class ="btn btn-item2 fa fa-heart"></button>\n' +
    '                     <button class ="btn btn-item3 fa fa-refresh"></button>\n' +
    '                   </div>\n' +
    '                 </div>\n' +
    '               </li>'
    }

    $('.product--list--item').html(listItem)
}
