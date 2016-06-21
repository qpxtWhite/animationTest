;(function(window, document){
    var wrap = document.getElementById('wrap');
    wrap.style.height = window.innerHeight+'px';
    wrap.style.width = window.innerWidth+'px';
})(window, document)


var PAGES = function(options){
    $.extend(this, {}, options || {});
}
PAGES.prototype = {
    constructor: PAGES,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    slideFlag: true,
    init: function(){},
    hide: function(){
        this.items.forEach(function(item){
            item.hide();
        });
        this.dom.hide();
    },
    show: function(){
        this.items.forEach(function(item){
            item.show();
        });
    },
    slideIn: function(direction, callback, scope){
        this.slideFlag = false;
        this.dom.show();
        var total = this.items.length;
        var i = 0;
        this.items.forEach(function(item){
            item.slideIn(direction, function(){
                i++;
                if(i>=total){
                    callback && callback.call(scope);
                }
            }, this);
        })
    },
    slideOut: function(direction, callback, scope){
        var self = this;
        var total = this.items.length;
        var i = 0;
        this.items.forEach(function(item){
            item.slideOut(direction, function(){
                i++;
                if(i>=total){

                    callback && callback.call(scope);
                }
            }, this);
        })
    }
}

// var PAGES = {
//     windowWidth: window.innerWidth,
//     windowHeight: window.innerHeight,
//     init: function(){},
//     hide: function(){
//         this.items.forEach(function(item){
//             item.hide();
//         });
//         this.dom.hide();
//     },
//     show: function(){
//         this.items.forEach(function(item){
//             item.show();
//         });
//     },
//     slideIn: function(direction, callback, scope){
//         this.dom.show();
//         var total = this.items.length;
//         var i = 0;
//         this.items.forEach(function(item){
//             item.slideIn(direction, function(){
//                 i++;
//                 if(i>=total){
//                     callback && callback.call(scope);
//                 }
//             }, this);
//         })
//     },
//     slideOut: function(direction, callback, scope){
//         var self = this;
//         var total = this.items.length;
//         var i = 0;
//         this.items.forEach(function(item){
//             item.slideOut(direction, function(){
//                 i++;
//                 if(i>=total){
//                     self.dom.hide();
//                     callback && callback.call(scope);
//                 }
//             }, this);
//         })
//     }
// };

function ITEMS(options){
    $.extend(this, {
        inite:0,
        initState: {
            '-webkit-transform': 'translateY(0)'
        },
        animateStateup: {
            '-webkit-transform': 'translateY(0)'
        },
        animateStatedown: {
            '-webkit-transform': 'translateY(0)'
        },
        slideInDelayup: 0,
        slideOutDelayup: 0,
        slideInDelaydown: 0,
        slideOutDelaydown: 0,
        slideDuration: 500,
        scope: null,
        dom: null
    }, options || {});
}
ITEMS.prototype = {
    constructor: ITEMS,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    calculate: function (ratio, scale, initTop) {
        var width = this.windowWidth * scale,
            height = width / ratio,
            top = this.getCalculateTop(initTop);
        this.inite = top;

        this.dom.css({
            width: width,
            height: height,
            // top: top
            '-webkit-transform': 'translateY('+ top +'px)'
        });
        // return {top: top};
        return {'-webkit-transform':'translateY('+ top +'px)'}
    },
    getCalculateTop: function (initTop) {
        return this.windowWidth / 750 * initTop + (this.windowHeight - this.windowWidth * 1120 / 750) / 2;
    },
    init: function (scope, dom) {
        this.scope = scope;
        this.dom = scope.dom.find(dom);
        return this;
    },
    setInitState: function (ratio, scale, initTop, callback) {
        this.initState = this.calculate(ratio, scale, initTop);
        callback && callback.call(this);
        return this;
    },
    setAnimateState: function (animateStateup, animateStatedown) {
        if(animateStateup){
            this.animateStateup = animateStateup;
        } else {
            // this.animateStateup = {top: -this.dom.height()};
            // this.animateStateup = {'-webkit-transform': 'translateY('+ -this.dom.height() +'px)'}
            this.animateStateup = {'-webkit-transform': 'translateY('+ (this.inite-this.windowHeight) +'px)'}
        }
        if(animateStatedown){
            this.animateStatedown = animateStatedown;
        } else {
            // this.animateStatedown = {top:this.windowHeight}
            this.animateStatedown = {'-webkit-transform': 'translateY('+ (this.windowHeight+this.inite) +'px)'}
        }
        return this;
    },
    hide: function () {
        this.dom.css(this.animateStatedown);
    },
    show: function () {
        this.dom.css(this.initState);
    },
    slideIn: function (direction, callback, scope) {
        var self = this;
            self.dom.animate(self.initState, self.slideDuration, function () {
                callback && callback.call(scope)
            }, this['slideInDelay'+direction]);

    },
    slideOut: function (direction, callback, scope) {
        var self = this;
            self.dom.animate(self['animateState'+direction], self.slideDuration, function () {
                callback && callback.call(scope)
            },this['slideOutDelay'+direction])
    }
}

var Page1 = (function(){
    var P1 = new PAGES({
        items: [],
        dom: $('.item-1'),
        init: function(){

            this.items = [
                /*** bg-left ***/
                (new ITEMS({slideOut: function(direction, callback, scope){
                    callback && callback.call(scope);
                    // this.__proto__.slideOut.call(this, 'up', callback, scope);
                }, slideIn: function(direction, callback, scope){
                    callback && callback.call(scope);
                }})).init(this, '.bg-left').setAnimateState()
                /*** bg-right ***/
                ,(new ITEMS({slideOut: function(direction, callback, scope){
                    callback && callback.call(scope);
                    // this.__proto__.slideOut.call(this, 'down', callback, scope);
                }, slideIn: function(direction, callback, scope){
                    callback && callback.call(scope);
                }})).init(this, '.bg-right').setAnimateState()
                /*** cake-left ***/
                ,(new ITEMS({slideInDelaydown:100,slideOut: function(direction, callback, scope){
                    this.dom.animate(this.animateStateup, 1000, function(){
                        callback && callback.call(scope);
                    })
                }, slideIn: function(direction, callback, scope){
                    this.__proto__.slideIn.call(this, 'down', callback, scope);
                }})).init(this, '.cake-left').setInitState(782/716, 0.9, 250, function(){
                    var width = this.dom.width();
                    this.dom.css('margin-left', -width/2);
                }).setAnimateState()
                /*** cake-right ***/
                ,(new ITEMS({slideInDelaydown:100,slideOut: function(direction, callback, scope){
                    this.dom.animate(this.animateStatedown, 1200, function(){
                        callback && callback.call(scope);
                    })
                }, slideIn: function(direction, callback, scope){
                    this.dom.css(this.initState).css({
                        '-webkit-transition-duration': ''
                    });
                    callback && callback.call(scope);
                }})).init(this, '.cake-right').setInitState(782/716, 0.9, 250, function(){
                    var width = this.dom.width();
                    this.dom.css('margin-left', -width/2);
                }).setAnimateState()
                /*** words ***/
                ,(new ITEMS({slideInDelaydown:100,slideOut: function(direction, callback, scope){
                    this.dom.animate(this.animateStateup, 700, function(){
                        callback && callback.call(scope);
                    })
                }, slideIn: function(direction, callback, scope){
                    this.__proto__.slideIn.call(this, 'down', callback, scope);
                }})).init(this, '.words').setInitState(226/133, 0.35, 783).setAnimateState()
                /*** words2 ***/
                ,(new ITEMS({slideInDelaydown:0, slideDuration:600, slideOut: function(direction, callback, scope){
                    this.__proto__.slideOut.call(this, 'up', callback, scope);
                }, slideIn: function(direction, callback, scope){
                    this.__proto__.slideIn.call(this, 'down', callback, scope);
                }})).init(this, '.words2').setInitState(181/94, 0.27, 295).setAnimateState()
                /*** knife ***/
                ,(new ITEMS({slideInDelaydown:100,slideOut: function(direction, callback, scope){
                    this.__proto__.slideOut.call(this, 'up', callback, scope);
                }, slideIn: function(direction, callback, scope){
                    this.__proto__.slideIn.call(this, 'down', callback, scope);
                }})).init(this, '.knife').setInitState(233/289, 0.3, 100).setAnimateState()
                /*** fork ***/
                ,(new ITEMS({slideInDelaydown:100,slideOut: function(direction, callback, scope){
                    this.__proto__.slideOut.call(this, 'down', callback, scope);
                }, slideIn: function(direction, callback, scope){
                    this.__proto__.slideIn.call(this, 'down', callback, scope);
                }})).init(this, '.fork').setInitState(135/430, 0.25, 760).setAnimateState()
                /*** title-left ***/
                ,(new ITEMS({slideInDelaydown:100,slideOut: function(direction, callback, scope){
                    this.__proto__.slideOut.call(this, 'up', callback, scope);
                }, slideIn: function(direction, callback, scope){
                    this.__proto__.slideIn.call(this, 'down', callback, scope);
                }})).init(this, '.title-left').setInitState(139/181, 0.23, 32).setAnimateState()
                /*** title-right ***/
                ,(new ITEMS({slideInDelaydown:100,slideOut: function(direction, callback, scope){
                    this.__proto__.slideOut.call(this, 'up', callback, scope);
                }, slideIn: function(direction, callback, scope){
                    this.__proto__.slideIn.call(this, 'down', callback, scope);
                }})).init(this, '.title-right').setInitState(136/181, 0.23, 32).setAnimateState()
                /*** arrow ***/
                ,(new ITEMS()).init(this, '.arrow').setInitState(56/30, 0.1, 1020, function(){
                    var width = this.dom.width();
                    this.dom.css('margin-left', -width/2);
                })
            ];
        }
    });
    return P1;
})()

var Page2 = (function(){
    var P1 = new PAGES({
        items: [],
        dom: $('.item-2'),
        init: function(){
            this.items = [
                /*** bg-left ***/
                (new ITEMS({slideInDelaydown:1300,
                    slideIn: function(direction, callback, scope){
                        var self = this;
                        switch(direction){
                            case 'up':
                                this.dom.animate(this.initState, this.slideDuration, function(){
                                    callback && callback.call(scope);
                                })
                                break;
                            case 'down':
                                this.dom.animate(this.initState, this.slideDuration, function(){
                                    callback && callback.call(scope);
                                })
                                break;
                        }
                    },
                    slideOut: function(direction, callback, scope){
                        switch(direction){
                            case 'down':
                                this.dom.animate(this.animateStatedown, this.slideDuration, function(){
                                    callback && callback.call(scope);
                                });
                                break;
                            case 'up':
                                this.dom.animate(this.animateStateup, this.slideDuration, function(){
                                    callback && callback.call(scope)
                                })
                                break;
                        }
                    }
                })).init(this, '.bg-left').setAnimateState()
                /*** bg-right ***/
                ,(new ITEMS({slideInDelaydown:1300,
                    slideIn: function(direction, callback, scope){
                        var self =this;
                        switch(direction){
                            case 'up':
                                this.dom.animate(this.initState, this.slideDuration, function(){
                                    callback && callback.call(scope);
                                })
                                break;
                            case 'down':
                                this.dom.animate(this.initState, this.slideDuration, function(){
                                    callback && callback.call(scope);
                                })
                                break;
                        }
                    },
                    slideOut: function(direction, callback, scope){
                        switch(direction){
                            case 'down':
                                this.dom.animate(this.animateStatedown, this.slideDuration, function(){
                                    callback && callback.call(scope);
                                })
                                break;
                            case 'up':
                                this.dom.animate(this.animateStateup, this.slideDuration, function(){
                                    callback && callback.call(scope)
                                })
                                break;
                        }
                    }
                })).init(this, '.bg-right').setAnimateState()
                /*** cake ***/
                ,(new ITEMS({slideInDelayup:0, slideDuration:500, slideOutDelaydown:0, slideInDelaydown:0, slideOut: function(direction, callback, scope){
                    switch (direction){
                        case 'up': this.__proto__.slideOut.call(this, 'up', callback, scope);break;
                        case 'down': this.__proto__.slideOut.call(this, 'down', callback, scope);break;
                    }
                }})).init(this, '.cake').setInitState(728/714, 0.9, 250, function(){
                    var width = this.dom.width();
                    this.dom.css('margin-left', -width/2);
                }).setAnimateState()
                /*** title-left ***/
                ,(new ITEMS({slideInDelayup:0, slideDuration:500, slideInDelaydown:0, slideOutDelaydown:0, slideOut: function(direction, callback, scope){
                    switch (direction){
                        case 'up': this.__proto__.slideOut.call(this, 'up', callback, scope);break;
                        case 'down': this.__proto__.slideOut.call(this, 'down', callback, scope);break;
                    }
                }})).init(this, '.title-left').setInitState(139/181, 0.23, 32).setAnimateState()
                /*** title-right ***/
                ,(new ITEMS({slideInDelayup:0, slideDuration:500, slideOutDelayup: 0, slideInDelaydown:0, slideOutDelaydown:0, slideOut: function(direction, callback, scope){
                    switch (direction){
                        case 'up': this.__proto__.slideOut.call(this, 'up', callback, scope);break;
                        case 'down': this.__proto__.slideOut.call(this, 'down', callback, scope);break;
                    }
                }})).init(this, '.title-right').setInitState(139/181, 0.23, 32).setAnimateState()
                /*** words2 ***/
                ,(new ITEMS({slideInDelayup:100, slideDuration:400, slideOutDelayup:0, slideInDelaydown:0, slideOut: function(direction, callback, scope){
                    var self = this;
                    switch (direction){
                        case 'up':
                                self.dom.animate(self['animateState'+direction], 800, function () {
                                    callback && callback.call(scope)
                                }, this['slideOutDelay'+direction])
                            break;
                        case 'down': this.__proto__.slideOut.call(this, 'down', callback, scope);break;
                    }
                }})).init(this, '.words2').setInitState(298/114, 0.37, 420).setAnimateState()
                /*** cake2 ***/
                ,(new ITEMS({slideInDelayup:100, slideDuration:400, slideOutDelayup:0, slideInDelaydown:0, slideOut: function(direction, callback, scope){
                    switch (direction){
                        case 'up':
                            this.__proto__.slideOut.call(this, 'up', callback, scope);
                            break;
                        case 'down': this.__proto__.slideOut.call(this, 'down', callback, scope);break;
                    }
                }})).init(this, '.cake2').setInitState(275/272, 0.3, 720).setAnimateState()
                /*** text ***/
                ,(new ITEMS({slideInDelayup:100, slideDuration:400, slideOutDelayup:800, slideOutDelaydown:800, slideOut: function(direction, callback, scope){
                    switch (direction){
                        case 'up':
                            this.dom.animate(this.animateStateup, 800, function(){
                                callback && callback.call(scope)
                            }, 0)
                            break;
                        case 'down': this.__proto__.slideOut.call(this, 'down', callback, scope);break;
                    }
                }})).init(this, '.text').setInitState(197/115, 0.3, 636).setAnimateState()
                /*** rose ***/
                ,(new ITEMS({slideInDelayup:100, slideDuration:400, slideOutDelayup:0, slideInDelaydown:100, slideOut: function(direction, callback, scope){
                    var self = this;
                    switch (direction){
                        case 'up':
                                self.dom.animate(self['animateState'+direction], 1000, function () {
                                    callback && callback.call(scope)
                                }, this['slideOutDelay'+direction])
                            break;
                        case 'down': this.__proto__.slideOut.call(this, 'down', callback, scope);break;
                    }
                }, slideIn: function(direction, callback, scope){
                    var self = this;
                    switch(direction){
                        case 'up':
                                self.dom.animate(self.initState, 300, function(){
                                    callback && callback.call(scope)
                                }, 200)
                            break;
                        case 'down':
                            this.__proto__.slideIn.call(this, 'down', callback, scope);
                            break;
                    }
                }})).init(this, '.rose').setInitState(263/241, 0.25, 240).setAnimateState()
                /*** mony ***/
                ,(new ITEMS({slideInDelayup:0, slideOutDelaydown:0, slideDuration:500, slideInDelaydown:0, slideIn: function(direction, callback, scope){


                    this.__proto__.slideIn.call(this, direction, callback, scope);
                    // var self = this;
                    // switch (direction){
                    //     case 'up': setTimeout(function(){
                    //         self.dom.fadeIn(self.slideDuration, function(){ callback && callback.call(scope); })
                    //     }, this.slideInDelayup); break;
                    //     case 'down':
                    //         setTimeout(function(){
                    //             self.dom.fadeIn(self.slideDuration, function(){ callback && callback.call(scope); })
                    //         }, this.slideInDelaydown);
                    //         break;
                    // }
                }, slideOut: function(direction, callback, scope){
                    this.__proto__.slideOut.call(this, direction, callback, scope);
                    // var self = this;
                    // switch(direction){
                    //     case 'up':
                    //         self.dom.hide();
                    //         callback && callback.call(scope);
                    //         break;
                    //     case 'down': setTimeout(function(){
                    //         self.dom.hide();
                    //         callback && callback.call(scope);
                    //     }, this.slideOutDelaydown); break;
                    // }
                }})).init(this, '.mony').setInitState(236/43, 0.33, 950, function(){
                    var width = this.dom.width();
                    this.dom.css('margin-left', -width/2);
                }).setAnimateState()
                /*** buy ***/
                ,(new ITEMS({slideInDelayup:0, slideOutDelaydown:0, slideDuration:500, slideInDelaydown:0, slideIn: function(direction, callback, scope){
                    this.__proto__.slideIn.call(this, direction, callback, scope);
                    // var self = this;
                    // switch(direction){
                    //     case 'up': setTimeout(function(){
                    //         self.dom.fadeIn(self.slideDuration, function(){ callback && callback.call(scope); })
                    //     }, this.slideInDelayup); break;
                    //     case 'down':
                    //         setTimeout(function(){
                    //             self.dom.fadeIn(self.slideDuration, function(){ callback && callback.call(scope); })
                    //         }, this.slideInDelaydown);
                    //         break;
                    // }
                }, slideOut: function(direction, callback, scope){
                    this.__proto__.slideOut.call(this, direction, callback, scope);
                    // var self = this;
                    // switch(direction){
                    //     case 'up':
                    //         self.dom.hide();
                    //         callback && callback.call(scope);
                    //         break;
                    //     case 'down': setTimeout(function(){
                    //         self.dom.hide();
                    //         callback && callback.call(scope);
                    //     }, this.slideOutDelaydown); break;
                    // }
                }})).init(this, '.buy').setInitState(325/70, 0.45, 1015, function(){
                    var width = this.dom.width();
                    this.dom.css('margin-left', -width/2)
                }).setAnimateState()
            ];
        }
    })
    return P1;
})()

var Page3 = (function(){
    var P1 = new PAGES({
        items: [],
        dom: $('.item-3'),
        init: function(){
            this.items = [
                /*** bg-left ***/
                (new ITEMS(
                    {
                        slideIn: function(direction, callback, scope){
                            switch(direction){
                                case 'up':
                                    this.dom.css(this.initState);
                                    callback && callback.call(scope);
                                    break;
                            }
                        },
                        slideOut: function(direction, callback, scope){
                            switch(direction){
                                case 'down':
                                    this.dom.css(this.initState);
                                    callback && callback.call(scope);
                                    break;
                                case 'up':
                                    this.__proto__.slideOut.call(this, 'up', callback, scope); break;
                            }
                        }
                    }
                )).init(this, '.bg-left').setAnimateState()
                /*** bg-right ***/
                ,(new ITEMS(
                    {
                        slideIn: function(direction, callback, scope){
                            switch(direction){
                                case 'up':
                                    this.dom.animate(this.initState, this.slideDuration, function(){
                                        callback && callback.call(scope);
                                    })
                                    break;
                            }
                        },
                        slideOut: function(direction, callback, scope){
                            switch(direction){
                                case 'down':
                                    this.dom.animate(this.animateStatedown, this.slideDuration, function(){
                                        callback && callback.call(scope);
                                    })
                                    break;
                                case 'up':
                                    this.__proto__.slideOut.call(this, 'down', callback, scope); break;
                            }
                        }
                    }
                )).init(this, '.bg-right').setAnimateState()
                /*** cake ***/
                ,(new ITEMS({slideInDelayup:0, slideDuration:400, slideOutDelayup:600, slideOut: function(direction, callback, scope){
                    this.__proto__.slideOut.call(this, 'down', callback, scope);
                    // var self = this;
                    //     self.dom.animate({
                    //         '-webkit-transform': 'translateY('+ (this.inite+400) +'px)'
                    //     }, 500, function(){
                    //         callback && callback.call(scope);
                    //     })
                }, slideIn: function(direction, callback, scope){
                    this.__proto__.slideIn.call(this, 'up', callback, scope);
                    // var self = this;
                    // this.dom.css({
                    //     '-webkit-transform': 'translateY('+ (this.inite+400) +'px)'
                    // });
                    // setTimeout(function(){
                    //     self.dom.animate(self.initState, 500, function(){
                    //         callback && callback.call(scope);
                    //     })
                    // }, 100)
                    // callback && callback.call(scope);
                    this.__proto__.slideIn.call(this, 'up', callback, scope);
                }})).init(this, '.cake').setInitState(728/719, 0.9, 250, function(){
                    var width = this.dom.width();
                    this.dom.css('margin-left', -width/2);
                }).setAnimateState()
                /*** title-left ***/
                ,(new ITEMS({slideInDelayup: 0, slideDuration:500, slideOutDelaydown:0, slideOut:function(direction, callback, scope){
                    var self = this;
                    self.dom.animate({
                        '-webkit-transform': 'translateY('+ (this.inite+600) +'px)'
                    }, 500, function(){
                        callback && callback.call(scope);
                    })
                }, slideIn: function(direction, callback, scope){
                    var self = this;
                    this.dom.css({
                        '-webkit-transform': 'translateY('+ (this.inite+400) +'px)'
                    });
                        self.dom.animate(self.initState, 400, function(){
                            callback && callback.call(scope);
                        })
                }})).init(this, '.title-left').setInitState(139/181, 0.23, 32).setAnimateState()
                /*** title-right ***/
                ,(new ITEMS({slideInDelayup:0, slideDuration:500, slideOutDelayup:200, slideOut: function(direction, callback, scope){
                    var self = this;
                    self.dom.animate({
                        '-webkit-transform': 'translateY('+ (this.inite+600) +'px)'
                    }, 500, function(){
                        callback && callback.call(scope);
                    })
                }, slideIn: function(direction, callback, scope){
                    var self = this;
                    this.dom.css({
                        '-webkit-transform': 'translateY('+ (this.inite+400) +'px)'
                    });
                        self.dom.animate(self.initState, 400, function(){
                            callback && callback.call(scope);
                        })
                }})).init(this, '.title-right').setInitState(139/181, 0.23, 32).setAnimateState()
                /*** words ***/
                ,(new ITEMS({slideInDelayup: 100, slideDuration:400, slideOutDelaydown:0, slideOut:function(direction, callback, scope){
                    var self = this;
                    self.dom.animate({
                        '-webkit-transform': 'translateY('+ (this.inite+300) +'px)'
                    }, 500, function(){
                        callback && callback.call(scope);
                    })
                }, slideIn: function(direction, callback, scope){
                    var self = this;
                    this.dom.css({
                        '-webkit-transform': 'translateY('+ (this.inite+300) +'px)'
                    });
                        self.dom.animate(self.initState, 400, function(){
                            callback && callback.call(scope);
                        }, 100)
                }})).init(this, '.words').setInitState(258/121, 0.3, 500).setAnimateState()
                /*** text ***/
                ,(new ITEMS({slideInDelayup: 100, slideDuration:400, slideOutDelaydown:0, slideOut:function(direction, callback, scope){
                    var self = this;
                    self.dom.animate({
                        '-webkit-transform': 'translateY('+ (this.inite+500) +'px)'
                    }, 500, function(){
                        callback && callback.call(scope);
                    })
                }, slideIn: function(direction, callback, scope){
                    var self = this;
                    this.dom.css({
                        '-webkit-transform': 'translateY('+ (this.inite+500) +'px)'
                    });
                        self.dom.animate(self.initState, 400, function(){
                            callback && callback.call(scope);
                        }, 100)
                }})).init(this, '.text').setInitState(131/125, 0.2, 670).setAnimateState()
                /*** litchi ***/
                ,(new ITEMS({slideInDelayup: 100, slideDuration:400, slideOutDelaydown:0, slideOut:function(direction, callback, scope){
                    var self = this;
                    self.dom.animate({
                        '-webkit-transform': 'translateY('+ (this.inite+180) +'px)'
                    }, 500, function(){
                        callback && callback.call(scope);
                    })
                }, slideIn: function(direction, callback, scope){
                    var self = this;
                    this.dom.css({
                        '-webkit-transform': 'translateY('+ (this.inite+180) +'px)'
                    });
                        self.dom.animate(self.initState, 400, function(){
                            callback && callback.call(scope);
                        }, 100)
                }})).init(this, '.litchi').setInitState(279/261, 0.25, 308).setAnimateState()
                /*** mony ***/
                ,(new ITEMS({slideInDelayup: 0, slideDuration:400, slideIn: function(direction, callback, scope){
                    this.__proto__.slideIn.call(this, direction, callback, scope);
                }, slideOut: function(direction, callback, scope){
                    this.__proto__.slideOut.call(this, direction, callback, scope);
                }})).init(this, '.mony').setInitState(236/43, 0.33, 950, function(){
                    var width = this.dom.width();
                    this.dom.css('margin-left', -width/2);
                }).setAnimateState()
                /*** buy ***/
                ,(new ITEMS({slideInDelayup: 0, slideDuration:400, slideIn: function(direction, callback, scope){
                    this.__proto__.slideIn.call(this, direction, callback, scope);
                }, slideOut: function(direction, callback, scope){
                    this.__proto__.slideOut.call(this, direction, callback, scope);
                }})).init(this, '.buy').setInitState(325/70, 0.45, 1015, function(){
                    var width = this.dom.width();
                    this.dom.css('margin-left', -width/2)
                }).setAnimateState()
                /*** cake2 ***/
                ,(new ITEMS({slideInDelayup: 100, slideDuration:400, slideOutDelaydown:0, slideOut:function(direction, callback, scope){
                    var self = this;
                    self.dom.animate({
                        '-webkit-transform': 'translateY('+ (this.inite+500) +'px)'
                    }, 500, function(){
                        callback && callback.call(scope);
                    })
                }, slideIn: function(direction, callback, scope){
                    var self = this;
                    this.dom.css({
                        '-webkit-transform': 'translateY('+ (this.inite+500) +'px)'
                    });
                        self.dom.animate(self.initState, 400, function(){
                            callback && callback.call(scope);
                        }, 100)
                }})).init(this, '.cake2').setInitState(236/239, 0.3, 670).setAnimateState()
            ];
        }
    })
    return P1;
})()

Page1.init();
Page2.init();
Page3.init();
Page2.hide();
Page3.hide();


;(function(window, document){
    var currentPage = 1;
    var flag = false;
    var wrap = $('#wrap');
    var pageNum = wrap.children().length;
    document.addEventListener('touchmove', function(ev){
        ev.preventDefault();
    })
    $(document).on('swipeUp', function(){
        if(currentPage>=pageNum || flag){
            return;
        }
        flag = true;
        window['Page'+currentPage].slideOut('up');
        currentPage++;
        window['Page'+currentPage].slideIn('up', function(){
            setTimeout(function(){
                window['Page'+(currentPage-1)].dom.hide();
                flag = false;
            }, 100)
        });
    });
    $(document).on('swipeDown', function(){
        if(currentPage<=1 || flag){
            return;
        }
        flag = true;
        window['Page'+currentPage].slideOut('down');
        currentPage--;
        window['Page'+currentPage].slideIn('down', function(){
            setTimeout(function(){
                window['Page'+(currentPage+1)].dom.hide();
                flag = false;
            }, 100)

        });
    })
})(window, document)