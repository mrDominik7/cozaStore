$(document).ready(function () {

    getProductCategory();

});

function getProductCategory() {
    $.getJSON("data/data.json", function (response) {
        let parent = $('#category');

        parent.append(
            $('<button/>', {class: 'category-item stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 cap how-active1'}).attr('data-filter', '*').text('All')
        );
        for (let i = 0; i < response.category.length; i++) {
            parent.append(
                $('<button/>', {class: 'category-item stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 cap'}).attr('data-filter', '.' + response.category[i].name).text(response.category[i].name)
            );

            for (let k = 0; k < response.category[i].products.length; k++) {
                let prod_id = (response.category[i].products[k].prod_name).toLowerCase().split(' ').join('-');
                let product = response.category[i].products[k];
                console.log(prod_id);
                $('#productsWrapper').append(
                    $('<div/>', {class: `product-item col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${response.category[i].name}`}).append(
                        $('<div/>', {class: 'block2'}).append(
                            $('<div/>', {class: 'block2-pic hov-img0'}).append(
                                $('<img/>').attr('src', product.img[0]),
                                $('<a/>', {class: 'viewProduct block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1'}).attr('data-id', product.art).text('View')
                            ),
                            $('<div/>', {class: 'block2-txt flex-w flex-t p-t-14'}).append(
                                $('<div/>', {class: 'block2-txt-child1 flex-col-l'}).append(
                                    $('<a/>', {class: 'viewProduct stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6'}).attr({
                                        'href': `product-detail.html`,
                                        'data-id': product.art
                                    }).text(product.prod_name),
                                    $('<span/>', {class: 'stext-105 cl3'}).text('$' + product.cost)
                                )
                            )
                        )
                    )
                );
            }
        }
        $('.category-item').on('click', activeItemCategory);
        $('.viewProduct').on('click', getViewProduct);
    });
}
function activeItemCategory() {
    $('#category .category-item').removeClass('how-active1');
    $(this).addClass('how-active1');
}

function getViewProduct(e) {
    let index = e.target.getAttribute('data-id');
    location.href='product-detail.html';

}