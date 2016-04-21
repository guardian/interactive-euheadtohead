            function getViewportOffset($e) {
                    var $window = $(window),
                    scrollTop = $window.scrollTop(),
                    offset = $e.offset();
                     return {
                    scrollTop: scrollTop,
                    top: offset.top - scrollTop - 40
                  };
                }

                if (mobile) {
                    //don't check for scroll
                    changelanguage();
                    loadtext();
                   
                } else {

                $(window).resize(checkscroll);

                $(window).scroll($.throttle(200, checkscroll));
                    //$(window).scroll(checkscroll);
                }

                function checkscroll() 
                     {
                      var viewportOffset = getViewportOffset($("#manuscript"));
                      $("#log").text("scrollTop: " + viewportOffset.scrollTop + ", top: " + viewportOffset.top + "textpos: " + textpos);
                      
                        var manuscriptscrollpercent = Math.abs(viewportOffset.top) / $('#manuscript').height();
                        var manuscriptscroll = (viewportOffset.top > 0) ? 0 : manuscriptscrollpercent;
                       
                        //now do stuff
                        getnearest(manuscriptscroll);
                        changelanguage();
                        loadtext();
                        };

