$(document).ready(function () {
    function getProductCategory() {
        $.getJSON("data/data.json", function (resp) {
            let parent = $('#category');
            parent.append(
                $('<button/>', {class: 'stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 cap'}).attr('data-filter', '*').text('All')
            );
            for (let i = 0; i < resp.category.length; i++) {
                parent.append(
                    $('<button/>', {class: 'stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 cap'}).attr('data-filter', '.' + resp.category[i].name).text(resp.category[i].name)
                );

                for(let k = 0; k < resp.category[i].products.length; k++) {
                    $('#productsWrapper').append(
                        $('<div/>', {class: `col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${resp.category[i].name}`}).append(
                            $('<div/>', {class: 'block2'}).append(
                                $('<div/>', {class: 'block2-pic hov-img0'}).append(
                                    $('<img/>').attr('src', resp.category[i].products[k].img[0]),
                                    $('<a/>', {class: 'block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1'}).text('Quick View')
                                ),
                                $('<div/>', {class:'block2-txt flex-w flex-t p-t-14'}).append(
                                    $('<div/>', {class: 'block2-txt-child1 flex-col-l'}).append(
                                        $('<a/>', {class:'stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6'}).attr('href', 'product-detail.html').text(resp.category[i].products[k].prod_name),
                                        $('<span/>', {class: 'stext-105 cl3'}).text('$' + resp.category[i].products[k].cost)
                                    )
                                )
                            )
                        )
                    )
                }
            }
        });
    }
    getProductCategory();

});