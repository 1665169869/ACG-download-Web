    var tanm = ["他只是暧昧成瘾、而你却走了心", "喜欢就加下群吧qwq","一直在开黑车，从未被超越", "“我重要吗？” “再重都要！”", "手机端请点击右上角打开菜单","加入群聊发车污污污","2020年还在手动？","千万不要以为高中单身时因为学校禁止早恋","明人不说暗话，你老婆真漂亮!","我们是学生，学生就要有学生的样子。    -「JOJO的奇妙冒险」","勇气并非来自体力，而是来自不屈不挠的意志。    -「守望先锋」","阁下是，人类？    -「东方妖妖梦」","哲♂学的力量","我在血海飘香弧光等你！","上帝为你关上了一扇门，然后就去洗洗睡了。","人与人的羁绊是真正的力量之源    -「少女前线」","喜欢上一个人是没有理由的！——「中二病也要谈恋爱-诚」","邪王真眼是最强的。——「小鸟游 六花」"];
    (function f(win, doc) {
        var danmArrayTop = [];//15个 同时
        var danmArrayBottom = [];//15个 同时
        var danmMoveDuration = 35;
        var movPx = 5;
        var startPosition = Math.ceil(Math.random() * 100);
        var topContainer = null;
        var bottomContainer = null;
        var createDanmDuration = 0;
        $(document).ready(function () {
            calculateRemPx();
            initPage();
            initDanm();
            initCartoon();
        });
        win.onload = function () {
            let diffWidth = $(document).width() - $(win).width();
            if (diffWidth > 0) {
                setTimeout(function () {
                    win.scrollTo && win.scrollTo(diffWidth / 2, 0);
                }, 0);
            }
        };
        function danm(el, speed, p) {
            this.el = el;
            this.position = p;
            this.speed = speed;
            this.width = -p;
            this.state = "run";
        }
        danm.prototype.delete = function () {
            this.state = "delete";
            $(this.el).remove();
        };
        function initDanm() {
            topContainer = $("#dwn-dm-top");
            bottomContainer = $("#dwn-dm-bottom");
            setInterval(moveDanm, danmMoveDuration);
        }
        function moveDM(b) {
            var docWidth = $(doc).width();
            if (b.position > (docWidth + b.width)) {
                b.delete();
            }
            else if (b.state === 'run') {
                b.position = b.position + b.speed;
                b.el.style.right = b.position + "px";
            }
        }
        function moveDanm() {
            if(createDanmDuration>=3600){
                createDanm();
                createDanmDuration=0;
            }
             createDanmDuration+=danmMoveDuration;
            danmArrayBottom.forEach(moveDM);
            danmArrayTop.forEach(moveDM);
        }
        var top = 0.5;
        var fontSizeArr = [1.8, 2.2, 2.5];
        var tfsize = null;
        var bfsize = null;
        function createDanm() {
            danmArrayTop = danmArrayTop.filter(function (b) {
                return b.state === "run"
            });
            danmArrayBottom = danmArrayBottom.filter(function (b) {
                return b.state === "run"
            });
            var topDm = createDmElement(tfsize, top, topContainer);
            var t = topDm.el;
            danmArrayTop.push(new danm(t, movPx, -topDm.width));
            var bottomDm = createDmElement(bfsize, top, bottomContainer);
            var b = bottomDm.el;
            danmArrayBottom.push(new danm(b, movPx, -bottomDm.width));
            top += 4;
            top = top > 12 ? .5 : top;
        }
        function createDmElement(fsize, top, container) {
            var t = document.createElement('span');
            t.className = "dan-m-span";
            t.textContent = tanm[startPosition];
            startPosition += 1;
            startPosition %= tanm.length;//100;
            t.style.display = "none";
            var tsize = 0;
            if (t.textContent.length < 20) {
                tsize = Math.floor((Math.random() * 10) % 3);
            }
            if (fsize === 2 && tsize === 2) {
                tsize = 0;
            }
            t.style.fontSize = fontSizeArr[tsize] + 'rem';
            t.style.top = top + 'rem';
            container.append(t);
            var twidth = $(t).width();
            // var bwidth = $(b).width();
            t.style.right = -twidth + "px";
            // b.style.right = -bwidth + "px";
            t.style.display = "block";
            return {
                el:t,
                size: tsize,
                width:twidth,
                txtLength: t.textContent.length
            }
        }
        function initPage() {
            setTimeout(function () {
                $(".dwn-download-center").removeClass("opacity0");
            }, 200);
            setTimeout(function () {
                $(".dwn-body-line .line-left").removeClass("opacity0");
            }, 500);
            setTimeout(function () {
                $(".dwn-body-line .line-right").removeClass("opacity0");
            }, 600);
            setTimeout(function () {
                $(".dwn-diamond-qr").removeClass("opacity0").addClass("qr-normal");
            }, 800);
            var resizeCancel = null;
            $(window).resize(function () {
                clearTimeout(resizeCancel);
                resizeCancel = setTimeout(function () {
                    calculateRemPx();
                }, 300)
            })
        }
        function initCartoon() {
            setTimeout(function () {
                $(".cartoon-start .cartoon-left .cartoon-figure").animate({"left": "20px"}, "normal", "swing", function () {
                    $(".cartoon-start").removeClass("cartoon-start")
                }).animate({left:0});
                $(".cartoon-start .cartoon-right .cartoon-figure").animate({"left": "-20px"}, "normal", "swing", function () {
                    $(".cartoon-start").removeClass("cartoon-start")
                }).animate({left:0});
            }, 1200);
        }
        function calculateRemPx() {
            var width = $(win).width();
            var height = $(win).height();
            if (width < 1000) {
                $(document.documentElement).css("font-size", "12px");
                return;
            }
            var ratio = width / height;
            var fontSize = 16;
            if (ratio >= 1.8) { // 以宽度为准
                fontSize = width / 100
            }
            else { //以高度为准
                fontSize = height / 55
            }
            $(document.documentElement).css("font-size",  fontSize + "px");
        }
    })(window, document);