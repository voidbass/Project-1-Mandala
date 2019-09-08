(function ($, window, document) {
  // The $ is now locally scoped
 
  // Listen for the jQuery ready event on the document
  $(function () {
    // The DOM is ready!
    var form = $("#example-basic");

    form.children('div').steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "fade",
        transitionEffectSpeed: 300,
        autoFocus: true,
        titleTemplate: "#title#",
        labels: {
            finish: "HOÀN TẤT",
            next: "TIẾP THEO",
            previous: "COME BACK"
        },

        onStepChanging: function (event, currentIndex, newIndex) {
            if (currentIndex > newIndex)
            {
                return true;
            }
            let items = JSON.parse(localStorage.getItem('id--item--cart'));
            if (items == null || items == undefined || items == '') {
                alert("Items ở đâu ra cha");
                return false;
            }

            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
        },

        onFinishing: function (event, currentIndex)
        {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },

        onFinished: function (event, currentIndex)
        {
            alert('Hoàn thành :O');
            localStorage.removeItem('customerInfo');
            localStorage.removeItem('id--item--cart');
            localStorage.removeItem('total--price');

            location.href = "./Payment.html";
        }
    });

    // Custom steps
    $('.wizard > .steps li').click(function(){
        $(this).addClass('checked');
        $(this).nextAll().removeClass('checked');
        $(this).prevAll().addClass('checked');
    });

    infoCustomer();

  });
  // The rest of the code goes here!
}(window.jQuery, window, document));


function showInfoCheck() {
    let dataCheck = JSON.parse(localStorage.getItem('customerInfo'));
    let total = JSON.parse(localStorage.getItem('total--price'));

    if(!dataCheck.description) dataCheck.description = 'Viết content làm gì?';

    let content =
                `<p>
                    <b>Tên:</b>
                    ${dataCheck.name}
                </p>
                <p>
                    <b>Phone:</b>
                    ${dataCheck.phone}
                </p>
                <p>
                    <b>Địa chỉ:</b>
                    ${dataCheck.address}
                </p>
                <p>
                    <b>Email:</b>
                    ${dataCheck.email}
                </p>
                <p>
                    <b>Description:</b>
                    ${dataCheck.description}
                </p>
                <p class="mb-5">
                    <b>Tổng Tiền:</b>
                    ${total}.000<sup>đ</sup>
                </p>`;

    $('.Info__Payment__Check').html(content);
}

function infoCustomer() {
    let customerData = {};

    $('#name').change(function () {
        let name = $(this).val();
        customerData.name = name;
        localStorage.setItem('customerInfo', JSON.stringify(customerData));

        showInfoCheck();
    });
    $('#phone').change(function () {
        let phone = $(this).val();
        customerData.phone = phone;
        localStorage.setItem('customerInfo', JSON.stringify(customerData));

        showInfoCheck();
    });
    $('#address').change(function () {
        let address = $(this).val();
        customerData.address = address;
        localStorage.setItem('customerInfo', JSON.stringify(customerData));

        showInfoCheck();
    });
    $('#email').change(function () {
        let email = $(this).val();
        customerData.email = email;
        localStorage.setItem('customerInfo', JSON.stringify(customerData));

        showInfoCheck();
    });
    $('#description').change(function () {
        let description = $(this).val();
        customerData.description = description;
        localStorage.setItem('customerInfo', JSON.stringify(customerData));

        showInfoCheck();
    });
}
