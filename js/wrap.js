/*****************
 *   wrap.js   *
 *****************/

$(function() {
    var $tabs = $('.tab'),
        tabsCount = $tabs.length,
        isWrapped = false,
        timeout;

    function hideSection() {
        $('#content section').hide();
    }

    function showSection($li) {
        $('#content').find('.' + $li.attr('class')).fadeIn();
    }

    function mouseIn() {
        var $this = $(this);
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            $this.find('div[class^="slide-"]').stop().animate({'height': '600px'}, 200);
            $this.find('.sub-menu').stop().animate({'height': '160px'}, 400);
        }, 100);
    }

    function mouseOut() {
        var $this = $(this);
        clearTimeout(timeout);
        $this.find('div[class^="slide-"]').stop().animate({'height': '0px'}, 400);
        $this.find('.sub-menu').stop().animate({'height': '0px'}, 200);
    }

    function wrap($li) {
        var $currentTab = $li.closest('.tab'),
            step = 0;
        $tabs.unbind('mouseenter mouseleave');
        $tabs.not($currentTab).each(function() {
            var $tabs = $(this);
            $tabs.stop().animate({'marginLeft': '-450px'}, 750, function() {
                $tabs.stop().css("display", "none");
                step += 1;
                if (step === tabsCount - 1) {
                    isWrapped = true;
                    $('#content').css("display", "block").stop().animate({'width': '600px'}, 100, function() {
                        showSection($li);
                    });
                }
            });
        });
    }

    function unwrap() {
        $('#content').find('section[style*="block"]').fadeOut(function() {
            $('#content').stop().animate({'width': '0'}, 200, function() {
                $(this).stop().css('display', 'none');
                var step = 0,
                    unwrapTime = 100;
                $tabs.each(function() {
                    var $tab = $(this);
                    unwrapTime = unwrapTime + 100;
                    $tab.find('div[class^="slide-"]').stop().animate({'height': '0'}, 600).andSelf().find('.sub-menu').stop().animate({'height': '0px'}, 200);
                    $tab.stop().css("display", "block").animate({'marginLeft': '10px'}, unwrapTime, function() {
                        step += 1;
                        if (step === tabsCount - 1) {
                            isWrapped = false;
                            $tabs.unbind('mouseenter').bind('mouseenter', mouseIn).unbind('mouseleave').bind('mouseleave', mouseOut);
                            hideSection();
                        }
                    });
                });
            });
        });
    }

    $('.js_back').bind('click', unwrap);

    $tabs.unbind('mouseenter').bind('mouseenter', mouseIn).unbind('mouseleave').bind('mouseleave', mouseOut).find('.sub-menu li').bind('click', function() {
        var $li = $(this);
        if (isWrapped) {
            hideSection();
            $('#content').stop().animate({'width': '600px'}, 100, function() {
                showSection($li);
            });
        } else {
            wrap($li);
        }
    });
});
