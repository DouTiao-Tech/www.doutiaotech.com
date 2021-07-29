/**
 * 简单的淡入淡出效果插件（不支持回调，也不支持键盘方向键）
 * 参数说明：
 * speed： 切换持续时间
 * delay： 每一页延迟多少毫秒后切换到下一页
 * init： 初始化显示那一页，索引从0开始
 * dots： 是否显示导航条，样式可以自定义
 */
 ;(function ($) {
    $.fn.extend({
        fadeMe: function (config) {
            var defaultSetting = {
                speed: undefined,
                delay: 5000,
                init: 0,
                dots: true
            };
            var setting = $.extend({}, defaultSetting, config);
            var self = this;
            var children = self.find('.wrap');
            var length = children.length;
            var index = setting.init;
            var nav = '<nav class="fade-nav"><ol>';
            for (var i = 0; i < length; i++) {
                nav += '<li ' + (index === i ? 'class="fade-active"' : '') + '>' + i + '</li>';
            }
            nav += '</ol></nav>';
            self.wrap('<div class="fade"></div>');
            children.first().show();
            if (length <= 1) {
                return;
            }
            self.parent('.fade').css({height: self.height(), overflow: 'hidden'}).append(nav);

            var onChange = function (self_, next_, speed_) {
                var parent = self_.parent('.fade');
                var $nav = parent.find('.fade-nav');
                self_.find('.wrap:visible').hide(speed_);
                self_.find('.wrap:eq(' + next_ + ')').show(speed_);
                $nav.find('.fade-active').removeClass('fade-active');
                $nav.find('li:eq(' + next_ + ')').addClass('fade-active');
            };

            var start = function (self_) {
                return setInterval(function () {
                    var next = index === (length - 1) ? 0 : (index + 1);
                    onChange(self_, next, setting.speed);
                    index = next;
                }, setting.delay);
            };

            var intervalId = start(self);

            $('.fade-nav li').on('mouseenter', function () {
                var dotIndex = $(this).index();
                onChange(self, dotIndex);
                if (intervalId) {
                    clearInterval(intervalId);
                }
                index = dotIndex;
                intervalId = start(self);
            });

            return self;
        }
    });
})(jQuery);