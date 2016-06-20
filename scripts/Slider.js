/**
 * Created by wangweifeng on 16/5/25.
 */

;(function(window, document){
    var wrap = $('#wrap'),
        wrapWidth = window.innerWidth,
        wrapHeight = window.innerHeight,
        wrapTop = 0,
        wrapLeft = 0;

    wrap.css({
        width: wrapWidth,
        height:wrapHeight,
        top:wrapTop,
        left: wrapLeft,
        position:'relative'
    })

    function Page(options){
        $.extend(this, {

        }, options || {});
        this.init();
    }
    Page.prototype = {
        constructor: Page,
        init: function(){
            $.Velocity.hook(this.dom, 'translateY', 0);
        },
        slideIn: function(direction, cur, pages){
            switch(direction){
                case 'Up':
                    this.dom.show()
                    break;
                case 'Down':
                    this.dom.show().css('z-index', 11);
                    this.dom.velocity({
                        translateY: 0
                    }, {
                        duration: 500,
                        complete: function(){
                            $(this).css('z-index', 10);
                            pages[cur+1].hide();
                        }
                    })
                    break;
            }
        },
        slideOut: function(direction, cur, pages){

            switch(direction){
                case 'Up':
                    this.dom.css('z-index',11).velocity({
                        translateY: -wrapHeight
                    }, {
                        duration: 500,
                        complete: function(){
                            $(this).hide().css('z-index', 10);
                        }
                    })
                    break;
                case 'Down':
                    // this.hide();
                    break;
            }
        },
        hide: function(){
            this.dom.css('display', 'none');
            return this;
        },
        show: function(){
            this.dom.css('display', 'block');
            return this;
        }
    }


    function Slider(options){
        $.extend(this, {
            wrap: $('#wrap'),
            an: []
        }, options || {});
        this.items = this.wrap.children();
        this.cur = 0;
        this.num = this.items.length;
        this.pages = [];
        this.init();
    }
    Slider.prototype = {
        constructor: Slider,
        init: function(){
            this.items.hide().css('z-index',10).eq(this.cur).show();
            for(var i=0,n=this.num; i<n; i++){
                this.an[i] ? this.an[i].dom=this.items.eq(i) : this.an[i] = {dom: this.items.eq(i)};
                this.pages.push(new Page(this.an[i]));
            }
            this.initEvent();
        },
        initEvent: function(){
            var self = this;
            document.addEventListener('touchmove', function(ev){
                ev.preventDefault();
            })
            $(document).on('swipeUp', function(){
                if(self.cur>=self.num-1) return;
                self.pages[self.cur++].slideOut('Up', self.cur, self.pages);
                self.pages[self.cur].slideIn('Up', self.cur, self.pages);
            }).on('swipeDown', function(){
                if(self.cur<=0) return;
                self.pages[self.cur--].slideOut('Down', self.cur, self.pages);
                self.pages[self.cur].slideIn('Down', self.cur, self.pages);
            })
        }
    }

    window.Slider = Slider;
})(window, document)



