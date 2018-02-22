// function myfunc() {
//   var x = $('#options option:selected').text();
//   $("body").prepend('<div style="width:20px; height:10px; border: 1px solid red;"></div>');
// }
// console.log("i am here");
//
// $(document).ready(myfunc);

console.log("Script Loaded!");
window.addEventListener('load', accio_init);
var api_url = 'https://alphabrands.accio.ai/api/';
var proxy_url = 'https://bhg.accio.ai/';
var live_url = 'https://www.bhg.com/';
var products_data = [],
  all_data = [];
var current_slide_img = '',
  slidesImages, slidesLoaded = 0;

function accio_init() {
  var carousel_files = function() {
    $('body').append('<script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"><\/script>');
    $('head').append('<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css" />');
    $('head').append('<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css" />')
  }
  carousel_files();
  console.log("Script Started!");
  var magnify_box = function(options) {
    if ("xlargeOnly" == "smallOnly") {
      return ''
    }
    return '<div data-index="' + options.index + '" class="slide_image_magnify hide" style="top: ' + options.top + 'px; left: ' + options.left + 'px; width: ' + options.width + 'px; height: ' + options.height + 'px; z-index: 499; border-radius: 50%; overflow:hidden; position: absolute; border: 1px solid #eee; box-shadow: 0 0 6px 2px #ddd; background-image: url(' + options.img_url + '); background-position: ' + options.posx + 'px ' + options.posy + 'px; transform: scale(1.2);"></div>'
  }
  var overlay_box = function(options, product_html) {
    return '<div data-index="' + options.index + '" class="slide_image_overlay" style="top: ' + options.top + 'px; left: ' + options.left + 'px; width: ' + options.width + 'px; height: ' + options.height + 'px; z-index: 500; position: absolute; border: 1px solid #ddd; box-shadow: 0 0 5px 1px #555;">' + product_html + '</div>'
  }
  var product_count_box = function(options, count) {
    return '<div class="product_count_box" style="position: absolute; z-index: 501; left: ' + options.left + 'px; top: ' + options.top + 'px; font-size: 18px;"><img src="http://i66.tinypic.com/2wdq046.png" style="width: 16px; height: 16px; margin-right: 3px; margin-bottom: 2px; -webkit-transform: scaleX(-1); transform: scaleX(-1);" /> ' + count + '</div>'
  }
  var product_box = function(options, position = 'absolute', type = '', className = 'hide') {
    var html = '<div data-index="' + options.index + '" class="slide_product_box ' + className + '" style="text-align: center;';
    if (className != 'hide') {
      html += 'display: inline-block !important; margin: 10px 10px;'
    };
    if ("xlargeOnly" == 'smallOnly') {
      html += 'top: ' + options.top + 'px;left: ' + options.left + 'px;width: ' + options.width + 'px;height: ' + options.height + 'px;z-index: 500;position: ' + position + ';background: white;box-shadow: 0 0 5px 1px #666;"><div style=" margin-top: 0%; height: 55%;"> <img src="' + options.product.img_url + '" style=" height: 100%;"> </div><div style=" height: 20%;"> <h4 style=" margin: 0; font-size: 16px; padding: 0px 3px; font-weight: 500;">' + options.product.title.substr(0, 30) + '</h4> <p style=" margin: 0; padding: 1px 0px; ">' + options.product.currency + ' ' + options.product.price + ' - <a style=" text-transform: uppercase; text-decoration: none; font-size: 15px; color: purple; letter-spacing: 0.30px; font-weight: bold;" href="' + options.product.url + '" target="_blank">Buy Now</a></p></div>'
    } else {
      html += 'top: ' + options.top + 'px;left: ' + options.left + 'px;width: ' + options.width + 'px;height: ' + options.height + 'px;z-index: 500;position: ' + position + ';background: white;box-shadow: 0 0 5px 1px #666;"><div style=" margin-top: ' + ((type != 'carousel') ? '5' : '0') + '%; height: 60%;"> <img src="' + options.product.img_url + '" style=" height: 100%;"> </div><div style=" height: 20%;"> <h4 style=" margin: 0; font-size: 16px; padding: 0px 3px; font-weight: 500;">' + options.product.title.substr(0, 30) + '</h4> <p style=" margin: 0; padding: 3px 0px; ">' + options.product.currency + ' ' + options.product.price + ' - <a style=" text-transform: uppercase; text-decoration: none; font-size: 15px; color: purple; letter-spacing: 0.30px; font-weight: bold;" href="' + options.product.url + '" target="_blank">Buy Now</a></p></div>'
    }
    if (type != 'carousel') {
      html += '<div style=" height: 10%;"><img src="https://homestagingconcepts.net/wp-content/uploads/2016/08/home-staging-concepts-houzz.png" style=" width: 100%; height: 100%; object-fit: contain;"></div><div style=" height: 12%; padding: 3px;"><a href="' + options.product.category_url + '" style="display: block; width: 100%; height: 100%; color: white; background: grey; text-decoration: none; font-size: 14px; padding-top: 4px;">Shop ' + (options.product.category ? options.product.category : " Similar") + ' >> </a></div></div>'
    } else {
      html += '<div style=" height: 15%;"><img src="https://homestagingconcepts.net/wp-content/uploads/2016/08/home-staging-concepts-houzz.png" style=" width: 100%; height: 100%; object-fit: contain;"></div>'
    }
    return html
  }
  var product_box = function(options, position = 'absolute', type = '', className = 'hide') {
    var html = '<div data-index="' + options.index + '" class="slide_product_box ' + className + '" style="text-align: center;';
    if (className != 'hide') {
      html += 'display: inline-block !important; margin: 10px 10px;'
    };
    if ("xlargeOnly" == 'smallOnly') {
      html += 'top: ' + options.top + 'px;left: ' + options.left + 'px;width: ' + options.width + 'px;height: ' + options.height + 'px;z-index: 500;position: ' + position + ';background: white;box-shadow: 0 0 5px 1px #666;"><div style=" margin-top: 0%; height: 55%;"> <img src="' + options.product.img_url + '" style=" height: 100%;"> </div><div style=" height: 20%;"> <h4 style=" margin: 0; font-size: 16px; padding: 0px 3px; font-weight: 500;">' + options.product.title.substr(0, 30) + '</h4> <p style=" margin: 0; padding: 1px 0px; ">' + options.product.currency + ' ' + options.product.price + ' - <a style=" text-transform: uppercase; text-decoration: none; font-size: 15px; color: purple; letter-spacing: 0.30px; font-weight: bold;" href="' + options.product.url + '" target="_blank">Buy Now</a></p></div>'
    } else {
      html += 'top: ' + options.top + 'px;left: ' + options.left + 'px;width: ' + options.width + 'px;height: ' + options.height + 'px;z-index: 500;position: ' + position + ';background: white;box-shadow: 0 0 5px 1px #666;"><div style=" margin-top: ' + ((type != 'carousel') ? '5' : '0') + '%; height: 60%;"> <img src="' + options.product.img_url + '" style=" height: 100%;"> </div><div style=" height: 20%;"> <h4 style=" margin: 0; font-size: 16px; padding: 0px 3px; font-weight: 500;">' + options.product.title.substr(0, 30) + '</h4> <p style=" margin: 0; padding: 3px 0px; ">' + options.product.currency + ' ' + options.product.price + ' - <a style=" text-transform: uppercase; text-decoration: none; font-size: 15px; color: purple; letter-spacing: 0.30px; font-weight: bold;" href="' + options.product.url + '" target="_blank">Buy Now</a></p></div>'
    }
    if (type != 'carousel') {
      html += '<div style=" height: 10%;"><img src="https://homestagingconcepts.net/wp-content/uploads/2016/08/home-staging-concepts-houzz.png" style=" width: 100%; height: 100%; object-fit: contain;"></div><div style=" height: 12%; padding: 3px;"><a href="' + options.product.category_url + '" style="display: block; width: 100%; height: 100%; color: white; background: grey; text-decoration: none; font-size: 14px; padding-top: 4px;">Shop ' + (options.product.category ? options.product.category : " Similar") + ' >> </a></div></div>'
    } else {
      html += '<div style=" height: 15%;"><img src="https://homestagingconcepts.net/wp-content/uploads/2016/08/home-staging-concepts-houzz.png" style=" width: 100%; height: 100%; object-fit: contain;"></div>'
    }
    return html
  }
  var new_product_box = function(options, position = 'relative') {
    if (options.product.price) {
      var html = '<div class="slide_product_box" style="text-align: left; overflow: hidden; display: inline-block !important; margin: 10px 10px;width: ' + options.width + 'px !important;height: ' + options.height + 'px;z-index: 500;position: ' + position + ';background: white;"><div style=" margin-top: 0%; height: 60%; overflow: hidden;"> <img src="' + options.product.img_url + '" style=" height: 100% !important; display: inline-flex; object-fit: cover;"> </div><div style=" height: 40%;"> <h4 style=" margin: 0; font-size: 14px; padding: 0px 3px; font-weight: 700; text-align: left;">' + options.product.title.substr(0, 25) + '</h4> <p style="font-size: 15px; font-weight:bold; line-height: 16px; margin: 0; padding: 1px 0px; "><span style="line-height: 20px;">$ ' + options.product.price + '</span><br/><a style="text-transform: uppercase; text-decoration: none; font-size: 14px; color: purple; letter-spacing: 0.30px; font-weight: bold;" href="' + options.product.url + '" target="_blank">Buy Now</a><br/><span style="text-transform: capitalize; font-size: 13px; color: #666; font-weight: 500;">' + options.product.merchantName + '</span></p></div></div>';
      return html
    } else {
      return ''
    }
  }
  var generateId = function(s) {
    var code = s.split("").reduce(function(a, b) {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a
    }, 0);
    return "article" + code
  }
  var bhg = function() {
    console.log("BHG Loading...");
    carousel_files();
    var article = {};
    article.source = "bhg";
    var articleDOM = $('#siteContent');
    article.title = $('meta[property="og:title"]').attr('content');
    article.postId = generateId(article.title);
    article.link = window.location.href.replace(proxy_url, live_url);
    article.description = $('meta[property="og:description"]').attr('content');
    slidesImages = getSlideshowImages();
    $.ajax({
      url: api_url + 'articles/createNew',
      type: "POST",
      data: {
        data: article,
        images: slidesImages
      }
    }).done(function(res) {
      article.id = res.id;
      res.articleimages.forEach(function(article_images, index) {
        all_data[article_images.url] = article_images;
        if (index == slidesImages.length - 1) {
          console.log("Images Data Fetched.");
          setTimeout(function() {
            setInterval(function() {
              if ("xlargeOnly" == 'smallOnly') {
                if (slidesLoaded != $("img[data-src][content][src]").length) {
                  for (; slidesLoaded < $("img[data-src][content][src]").length; slidesLoaded++) {
                    renderProductsOnSlide($("img[data-src][content][src]")[slidesLoaded].src)
                  }
                }
              } else {
                if (current_slide_img != $("img[data-src][content][src]").attr('src')) {
                  current_slide_img = $("img[data-src][content][src]").attr('src');
                  renderProductsOnSlide(current_slide_img)
                }
              }
            }, 500);
            if ("xlargeOnly" != 'smallOnly') {
              allProductsHtml()
            }
          }, 1000)
        }
      })
    });
    mouse_events()
  }
  var allProductsHtml = function() {
    var heading_row = {
      "xlargeOnly": `<div style="height: 70px; width: 100%;"><div style="width: 100%;"><h2 style="display:inline-block; margin-top: 5px; font-size: 25px; text-align: left;">Products You Might Be Looking For</h2><div class="logo" style="display:inline; float: right;"><a class="bhgLogo" style="color: rgba(0,0,0,0.65);">BHG</a></div></div></div>`,
      "largeOnly": `<div style="height: min-content; width: 100%;"><div style="margin-left: 20%; width: 60%; text-align: center"><h2>Products You Might Be Looking For</h2><div class="logo"><a class="bhgLogo" style="color: rgba(0,0,0,0.65);">BHG</a></div></div></div>`,
      "mediumOnly": `<div style="height: min-content; width: 100%;"><div style="margin-left: 20%; width: 60%; text-align: center"><h2>Products You Might Be Looking For</h2><div class="logo"><a class="bhgLogo" style="color: rgba(0,0,0,0.65);">BHG</a></div></div></div>`,
      "smallOnly": `<div style="height: min-content; width: 100%;"><div style="margin-left: 5%; width: 90%; text-align: center"><h2>Products You Might Be Looking For</h2><div class="logo"><a class="bhgLogo" style="color: rgba(0,0,0,0.65);">BHG</a></div></div></div>`,
    };
    $(".relatedContent").before(heading_row["xlargeOnly"] + '<div id="all_products_html" style="width: 100%;" class="hide"></div><div style="width: 100%; margin-top: 10px; text-align:center;"><a href="#" style="font-size: 14px; color: black; font-weight: 700;">SHOP ALL PRODUCTS</a></div>');
    $.each(slidesImages, function(index, img_url) {
      data = all_data[img_url];
      if (data.croppings) {
        data.croppings.forEach(function(cropping, index) {
          if (cropping.products) {
            cropping.products.forEach(function(product) {
              $("#all_products_html").append(new_product_box(makeProductOptions({
                left: 0,
                top: 0,
                width: 140,
                height: 210,
                index: "no_index",
                c_product: product
              }), 'relative'));
              if ($("#all_products_html").hasClass('hide')) {
                $("#all_products_html").removeClass('hide')
              }
            })
          }
        })
      }
      if (index == slidesImages.length - 1) {
        var carousel_options = {
          dots: !0,
          infinite: !1,
          speed: 300,
          arrows: !0,
          slidesToScroll: 3,
          variableWidth: !0
        }
        $("#all_products_html").slick(carousel_options)
      }
    })
  }
  var makeProductOptions = function(options) {
    return {
      left: options.left,
      top: options.top,
      width: options.width,
      height: options.height,
      index: options.index,
      product: {
        img_url: options.c_product.imgUrl,
        title: options.c_product.title,
        currency: options.c_product.currency,
        price: parseFloat(options.c_product.sellingPrice / 100),
        url: options.c_product.link.replace('YOURUSERID', '1618243'),
        category_url: options.c_product.link.replace('YOURUSERID', '1618243'),
        category: options.c_product.category[0],
        merchantName: options.c_product.source
      }
    }
  }
  var calculateOptions = function(options, img) {
    ratio = {
      width: img.width / img.naturalWidth,
      height: img.height / img.naturalHeight
    };
    options.height = Math.round(options.height * ratio.height);
    options.width = Math.round(options.width * ratio.width);
    options.top = Math.round(options.top * ratio.height);
    options.left = Math.round(options.left * ratio.width);
    return options
  }
  var renderProductsOnSlide = function(img_url) {
    res = all_data[img_url];
    var index = slidesImages.indexOf(img_url);
    console.log('Rendering products on current Slide.', index, res);
    if (res && res.hasOwnProperty('croppings')) {
      product_count = res.croppings.length;
      img = $('img[data-src][content][src="' + img_url + '"]');
      if (img.length == 2) {
        img = $($('img[data-src][content][src="' + img_url + '"]').splice(1)[0])
      }
      left_padding = img.offset()['left'] - img.parent().parent().offset()['left'];
      top_padding = img.offset()['top'] - img.parent().parent().offset()['top'];
      if (product_count > 0) {
        img.parent().append(product_count_box({
          top: (img.outerHeight() - 25) + top_padding,
          left: 5 + left_padding
        }, product_count))
      }
      res.croppings.forEach(function(cropping, c_index) {
        if (cropping.products && cropping.products.length > 0) {
          cords = cropping.coordinates;
          options = calculateOptions({
            left: cords.x1 + left_padding,
            top: cords.y1 + top_padding,
            width: cords.x2 - cords.x1,
            height: cords.y2 - cords.y1,
            index: index + '_' + c_index
          }, img[0]);
          var c_product = cropping.products[0];
          product_options = makeProductOptions({
            left: ((options.left + options.width) + 160) > document.body.clientWidth ? (document.body.clientWidth - 160) - options.left : (options.width),
            top: (options.top + 240) > img[0].height ? (img[0].height - (options.top + 240)) : (0 + top_padding),
            width: "xlargeOnly" == 'smallOnly' ? 160 : 200,
            height: "xlargeOnly" == 'smallOnly' ? 240 : 300,
            index: index + '_' + c_index,
            c_product: c_product
          });
          product_html = product_box(product_options);
          magnify_html = magnify_box({
            left: options.left - 5,
            top: options.top - 5,
            width: options.width + 10,
            height: options.height + 10,
            index: index + '_' + c_index,
            img_url: cropping.url,
            posx: img[0].width - cords.x1,
            posy: img[0].height - cords.y1
          });
          overlay_html = overlay_box(options, product_html);
          if ($('img[src="' + img_url + '"][data-src][content]').length > 0) {
            $('img[src="' + img_url + '"][data-src][content]').parent().append(overlay_html + magnify_html)
          }
        }
      })
    }
    setTimeout(function() {
      $('img[src="' + img_url + '"]').parent().children('.slide_image_overlay').addClass('hideAnimate')
    }, 3000)
  }
  var getSlideshowImages = function() {
    var images = [];
    slideshow = $("#slideContent .slideImage").splice(0, $("#slideContent .slideImage").length - 1);
    $.each(slideshow, function(a, slide) {
      if ($(slide).children('.lazySlideImage').data('src')) {
        images.push($(slide).children('.lazySlideImage').data('src'))
      } else if ($(slide).children('[itemprop="image"]').children('.lazySlideImage').data('src')) {
        images.push($(slide).children('[itemprop="image"]').children('.lazySlideImage').data('src'))
      }
    });
    return images
  }
  var mouse_events = function() {
    $(document).on('mouseenter', '.slide_image_overlay', function(elem) {
      $(elem.currentTarget).children('.slide_product_box[data-index="' + elem.currentTarget.dataset.index + '"]').removeClass('hide');
      $(elem.currentTarget).parent().children('.slide_image_magnify[data-index="' + elem.currentTarget.dataset.index + '"]').removeClass('hide')
    });
    $(document).on('mouseleave', '.slide_image_overlay', function(elem) {
      $(elem.currentTarget).children('.slide_product_box[data-index="' + elem.currentTarget.dataset.index + '"]').addClass('hide');
      $(elem.currentTarget).parent().children('.slide_image_magnify[data-index="' + elem.currentTarget.dataset.index + '"]').addClass('hide')
    });
    $(document).on('touchend', '.slide_image_overlay', function(elem) {
      var $target = $(elem.currentTarget).children('.slide_product_box[data-index="' + elem.currentTarget.dataset.index + '"]');
      if ($target.hasClass("hide")) {
        $target.removeClass('hide')
      } else {
        $target.addClass('hide')
      }
      $(elem.currentTarget).parent().children('.slide_image_magnify[data-index="' + elem.currentTarget.dataset.index + '"]').removeClass('hide')
    });
    $(document).on('click', '.product_count_box', function() {
      console.log("Clicked on Product Count");
      if ($('img[src][data-src][content]').parent().children('.slide_image_overlay').hasClass('hideAnimate')) {
        $('img[src][data-src][content]').parent().children('.slide_image_overlay').removeClass('hideAnimate')
      } else {
        $('img[src][data-src][content]').parent().children('.slide_image_overlay').addClass('hideAnimate')
      }
    })
  }
  bhg()
}
