/**
 * Created by wangweifeng on 16/5/25.
 */

function An(){}

function Item(options){
    $.extend(this, {
        dom: $('div'),
        UpState: 0,
        DownState: 0
    }, options || {});
    this.scale = window.innerWidth/750;
    this.initState = 0;
}
Item.prototype = {
    constructor: Item,
    init: function(callback){
        var obj = {top: 0};
        this.width && (obj.width = this.width * this.scale);
        this.height && (obj.height = this.height * this.scale);
        this.top && (obj.top = this.top * this.scale + (window.innerHeight- this.scale * 1120)/2);
        if(typeof this.durationInUp!='number') this.durationInUp = 500;
        if(typeof this.durationInDown!='number') this.durationInDown = 500;
        if(typeof this.durationOutUp!='number') this.durationOutUp = 500;
        if(typeof this.durationOutDown!='number') this.durationOutDown = 500;
        this.dom.css(obj).show();
        callback && callback.call(this);
        return this;
    },
    setState: function(direction){
        this.dom.css('-webkit-transform', 'translateY('+this[direction+'State']+'px)')
    },
    slideIn: function(direction, callback){
        this.dom.animate({
            '-webkit-transform': 'translateY(0px)'
        }, this['durationIn'+direction], function(){

        })
    },
    slideOut: function(direction, callback){
        this.dom.animate({
            '-webkit-transform': 'translateY('+this[direction+'State']+'px)'
        }, this['durationOut'+direction], function(){

        })
    }
}

var items = {
    page1: [
        /*** bg-left ***/
        (new Item({dom: $('.item-1 .bg-left')})).init()
        /*** bg-right ***/
        ,(new Item({dom: $('.item-1 .bg-right')})).init()
        /*** title-left ***/
        ,(new Item({dom: $('.item-1 .title-left'), width:139, height:181, top:36, UpState: -500})).init()
        /*** title-right ***/
        ,(new Item({dom: $('.item-1 .title-right'), width:136, height:181, top:36, UpState: -500})).init()
        /*** words ***/
        ,(new Item({dom: $('.item-1 .words'), width:226, height:133, top:782, UpState: -300})).init()
        /*** words2 ***/
        ,(new Item({dom: $('.item-1 .words2'), width:181, height:94, top:256, UpState: 200})).init()
        /*** knife ***/
        ,(new Item({dom: $('.item-1 .knife'), width:233, height:289, top:98, UpState: -600})).init()
        /*** fork ***/
        ,(new Item({dom: $('.item-1 .fork'), width:135, height:430, top:768, UpState: 100})).init()
        /*** cake-left ***/
        ,(new Item({dom: $('.item-1 .cake-left'), width:391, height:715, top:246, UpState: -800})).init()
        /*** cake-right ***/
        ,(new Item({dom: $('.item-1 .cake-right'), width:391, height:715, top:246, UpState: 200})).init()
        /*** arrow ***/
        ,(new Item({dom: $('.item-1 .arrow'), top:1018, width:56, height:30})).init(function(){this.dom.css('margin-left', -this.dom.width()/2)})
    ],
    page2: [
        /*** bg-left ***/
        (new Item({dom: $('.item-2 .bg-left')})).init()
        /*** bg-right ***/
        ,(new Item({dom: $('.item-2 .bg-right')})).init()
        /*** title-left ***/
        ,(new Item({dom: $('.item-2 .title-left'), width:139, height:181, top:36, DownState: 300, UpState: -300})).init()
        /*** title-right ***/
        ,(new Item({dom: $('.item-2 .title-right'), width:136, height:181, top:36, DownState: 300, UpState: -300})).init()
        /*** cake ***/
        ,(new Item({dom: $('.item-2 .cake'), width:728, height:714, top:252, DownState: 600, UpState: -600})).init(function(){this.dom.css('margin-left', -this.dom.width()/2)})
        /*** words2 ***/
        ,(new Item({dom: $('.item-2 .words2'), width:298, height:114, top:418, DownState: -300, UpState: 300})).init()
        /*** rose ***/
        ,(new Item({dom: $('.item-2 .rose'), width:263, height:241, top:198,DownState: -400, UpState: 400})).init()
        /*** text ***/
        ,(new Item({dom: $('.item-2 .text'), width:197, height:115, top:612, DownState: -200, UpState: 200})).init()
        /*** cake2 ***/
        ,(new Item({dom: $('.item-2 .cake2'), width:275, height:272, top:716, DownState: -500, UpState: 500})).init()
        /*** mony ***/
        ,(new Item({dom: $('.item-2 .mony'), width:236, height:43, top:960, DownState: 500, UpState: -200})).init(function(){this.dom.css('margin-left', -this.dom.width()/2)})
        /*** buy ***/
        ,(new Item({dom: $('.item-2 .buy'), width:325, height:70, top:1030, DownState: 500, UpState: -200})).init(function(){this.dom.css('margin-left', -this.dom.width()/2)})

    ],
    page3: [
        /*** bg-left ***/
        (new Item({dom: $('.item-3 .bg-left')})).init()
        /*** bg-right ***/
        ,(new Item({dom: $('.item-3 .bg-right')})).init()
        /*** title-left ***/
        ,(new Item({dom: $('.item-3 .title-left'), width:139, height:181, top:36, DownState: 300})).init()
        /*** title-right ***/
        ,(new Item({dom: $('.item-3 .title-right'), width:136, height:181, top:36, DownState: 300})).init()
        /*** cake ***/
        ,(new Item({dom: $('.item-3 .cake'), width:728, height:719, top:242, DownState: -500})).init(function(){this.dom.css('margin-left', -this.dom.width()/2)})
        /*** words ***/
        ,(new Item({dom: $('.item-3 .words'), width:258, height:121, top:508, DownState: 300})).init()
        /*** litchi ***/
        ,(new Item({dom: $('.item-3 .litchi'), width:279, height:261, top:248, DownState: 200})).init()
        /*** text ***/
        ,(new Item({dom: $('.item-3 .text'), width:131, height:125, top:704, DownState: 300})).init()
        /*** cake2 ***/
        ,(new Item({dom: $('.item-3 .cake2'), width:236, height:239, top:720, DownState: 300})).init()
        /*** mony ***/
        ,(new Item({dom: $('.item-3 .mony'), width:236, height:43, top:960, DownState: 500})).init(function(){this.dom.css('margin-left', -this.dom.width()/2)})
        /*** buy ***/
        ,(new Item({dom: $('.item-3 .buy'), width:325, height:70, top:1030, DownState: 500})).init(function(){this.dom.css('margin-left', -this.dom.width()/2)})
    ]
}


var pageAnimateArray = [{
    init: function(){

    },
    slideIn: function(direction, callback){
        this.show();
        items.page1.forEach(function(item){
            item.slideIn(direction);
        })
    },
    slideOut: function(direction, callback){
        var self = this;
        items.page1.forEach(function(item){
            item.slideOut(direction);
        })
    }
},{
    UpState: -window.innerHeight,
    DownState: window.innerHeight,
    durationInUp: 500,
    durationInDown: 500,
    durationOutUp: 500,
    durationOutDown: 500,
    init: function(){
        this.dom.css({
            '-webkit-transform': 'translateY('+this.DownState+'px)'
        });
        items.page2.forEach(function(item){
            item.setState('Down');
        })
    },
    slideIn: function(direction, cur, pages){
        this.show();
        this.dom.animate({
            '-webkit-transform': 'translateY(0px)'
        }, this['durationIn'+direction], 'linear', function(){
            switch(direction){
                case 'Up':
                    pages[cur-1].hide();
                    break;
                case 'Down':
                    pages[cur+1].hide();
                    break;
            }
        });
        items.page2.forEach(function(item){
            item.slideIn(direction);
        })
    },
    slideOut: function(direction, cur, pages){
        var self = this;
        this.dom.animate({
            '-webkit-transform': 'translateY('+this[direction+'State']+'px)'
        }, this['durationOut'+direction], function(){
            self.hide()
        });
        items.page2.forEach(function(item){
            item.slideOut(direction);
        })
    }
},{
    init: function(){
        this.dom.css('z-index', 9);
        items.page3.forEach(function(item){
            item.setState('Down');
        })
    },
    slideIn: function(direction, callback){
        this.dom.show();
        items.page3.forEach(function(item){
            item.slideIn(direction);
        })
    },
    slideOut: function(direction, callback){
        var self = this;
        items.page3.forEach(function(item){
            item.slideOut(direction);
        })
    }
}]

new Slider({
    an: pageAnimateArray
});

