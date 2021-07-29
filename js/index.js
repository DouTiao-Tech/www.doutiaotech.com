;$(function () {
    var height = window.innerHeight;
    $('.r-help').css({top: (height - 150) / 2});

    // 导航
    $('.nav-right li').hover(function () {
        var width = $(this).find('a').width();
        var index = $(this).index();
        var start = getLIWidth(index) + 16;// 此方法偏差大

        var marginList = [16, 80, 144, 209, 300, 393];
        $('.bot-bar').show().animate({width: width, marginLeft: marginList[index]}, 100);
    }, function () {
        $('.bot-bar').hide();
    });

    function getLIWidth(index) {
        var width = 0;
        var liList = $(".nav-right li");
        for (var i = 0; i < liList.length; i++) {
            if (i < index) {
                width += $(liList[i]).width();
            }
        }
        return width;
    }

    // 页面滚动
    $.event.add(window, 'scroll', function () {
        var t = $(window).scrollTop();
        if (t > 44) {
            $('.nav').css({
                position: 'fixed',
                borderBottom: '1px solid #f0f1f2',
                boxShadow: '0 0 5px #888'
            });
            $('.nav .nav-right').addClass('nav-right-scroll');
        } else {
            $('.nav').css({position: 'absolute', background: '', borderBottom: 'none', boxShadow: 'none'});
            $('.nav .nav-right').removeClass('nav-right-scroll');
        }
        if (t > height) {
            $('.r-help-arrow').show();
        } else {
            $('.r-help-arrow').hide();
        }
    });


    // 轮播
    $('.banner').fadeMe();

    // 生态产品切换效果
    $('.triangle').first().show();
    $('.app-container').first().show();
    $('.app-list-block').hover(function () {
        var index = $(this).index();
        var imgList = $('.app-list-block img');
        for (var i = 0; i < imgList.length; i++) {
            var $img = $(imgList[i]);
            var defaultSrc = $img.attr('originSrc');
            $img.attr('src', defaultSrc);
        }
        var $img = $(this).find('img');
        var hoverSrc = $img.attr('lightSrc');
        $img.attr('src', hoverSrc);
        $('.app-container').hide();
        $('.app-container:eq(' + index + ')').show();
        $('.triangle').hide();
        $('.triangle:eq(' + index + ')').show();
    });

    // 二维码
    $('.footer-weixin-img').hover(function () {
        var code = {width: 84, height: 108};
        var offset = $(this).offset();
        var top = offset.top - code.height;
        var left = offset.left + $(this).width() / 2 - code.width / 2;
        $('.weixin-code').css({top: top, left: left}).show();
    }, function () {
        $('.weixin-code').hide();
    });
    $('.weixin-code').hover(function () {
        $(this).show();
    }, function () {
        $(this).hide();
    });

    // 回到顶部
    $('.r-help-arrow').on('click', function () {
        $('html,body').animate({scrollTop: 0}, 500);
    });

    // 锚点
    $('.nav-right li a').on('click', function () {
        var link = $(this).attr('link');
        if (link.startsWith('#')) {
            var offset = $(link).offset();
            $('html,body').animate({scrollTop: offset.top - 60}, 500);
        } else {
            window.open(link);
        }
    });
});