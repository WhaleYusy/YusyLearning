var os = function (){
    var ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
    };
}();
if (os.isAndroid || os.isPhone) {
    // 手机
    $(".stable").css({"width": "3.2rem","height": "4.8rem","background": "#00FF00"});
} else if (os.isTablet) {
    // 平板
   $(".stable").css({"width": "4.8rem","height": "6.4rem","background": "#00FF00"});
} else if (os.isPc) {
    // pc
    $(".stable").css({"width": "8rem","height": "3.2rem","background": "#00FF00"});
}