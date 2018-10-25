"use strict";
var eaUtils = {
    domUniqueId: 0,
    eventPrefix: "",
    eventsFallbackAlias: {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    },
    cssStyle: {},
    cssStyleArray: [],
    rawCssStyle: "",
    cssPropsAlias: {
        fontFamily: "font-family",
        fontWeight: "font-weight",
        fontStyle: "font-style",
        fontSize: "font-size",
        lineHeight: "line-height"
    },
    extractRGB: function(t) {
        if (t) {
            t = t.toLowerCase();
            var e = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"],
                i = {
                    r: "",
                    g: "",
                    b: ""
                };
            return i.r = parseInt((16 * e.indexOf(t[1]) + e.indexOf(t[2])).toString()), i.g = parseInt((16 * e.indexOf(t[3]) + e.indexOf(t[4])).toString()), i.b = parseInt((16 * e.indexOf(t[5]) + e.indexOf(t[6])).toString()), i
        }
    },
    detectHTML5: function() {
        return Detect.transformOrigin
    },
    extractRGBA: function(t) {
        var e = t.replace(/[^\d,.]/g, "").split(",");
        return {
            r: e[0],
            g: e[1],
            b: e[2],
            a: e[3]
        }
    },
    rgba2hex: function(t, e) {
        return "#" + (0 != e ? (256 + parseInt(256 * Number(t.a))).toString(16).substr(1) : "") + (256 + parseInt(t.r)).toString(16).substr(1) + (256 + parseInt(t.g)).toString(16).substr(1) + (256 + parseInt(t.b)).toString(16).substr(1)
    },
    hex2rgb: function(t) {
        return [t >> 16, t >> 8 & 255, 255 & t]
    },
    hex2rgba: function(t, e) {
        var i = "#" === t[0] ? t.substr(1) : t,
            r = this.hex2rgb(parseInt(i, 16));
        return "rgba(" + r[0] + ", " + r[1] + ", " + r[2] + ", " + e + ")"
    },
    getIEVersion: function() {
        if (null != eaUtils.IEVersion) return eaUtils.IEVersion;
        var t = -1;
        if ("Microsoft Internet Explorer" == navigator.appName) {
            var e = navigator.userAgent;
            null != new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(e) && (t = parseFloat(RegExp.$1))
        }
        return eaUtils.IEVersion = t
    },
    detectIE: function() {
        return -1 != eaUtils.getIEVersion()
    },
    _is_safari: null,
    isSafari: function() {
        return null === this._is_safari && (this._is_safari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)), this._is_safari
    },
    isMobile: {
        Android: function() {
            return navigator.userAgent.match(/Android/i)
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i)
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i)
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i)
        },
        any: function() {
            return eaUtils.isMobile.Android() || eaUtils.isMobile.BlackBerry() || eaUtils.isMobile.iOS() || eaUtils.isMobile.Opera() || eaUtils.isMobile.Windows()
        }
    },
    getBrowser: function() {
        var t, e, i, r = navigator.userAgent,
            s = navigator.appName,
            n = "" + parseFloat(navigator.appVersion),
            a = parseInt(navigator.appVersion, 10);
        return -1 != (e = r.indexOf("OPR/")) ? (s = "Opera", n = r.substring(e + 4)) : -1 != (e = r.indexOf("Opera Mini")) ? (s = "Opera Mini", n = r.substring(e + 11)) : -1 != (e = r.indexOf("Opera")) ? (s = "Opera", n = r.substring(e + 6), -1 != (e = r.indexOf("Version")) && (n = r.substring(e + 8))) : -1 != (e = r.indexOf("Edge")) ? (s = "Edge", n = r.substring(e + 5)) : -1 != (e = r.indexOf("MSIE")) ? (s = "MSIE", n = r.substring(e + 5)) : /x64|x32/gi.test(r) ? (s = "MSIE", n = "12.0") : -1 != (e = r.indexOf("Chrome")) ? (s = "Chrome", n = r.substring(e + 7)) : -1 != (e = r.indexOf("Safari")) ? (s = "Safari", n = r.substring(e + 7), -1 != (e = r.indexOf("Version")) && (n = r.substring(e + 8))) : -1 != (e = r.indexOf("Firefox")) ? (s = "Firefox", n = r.substring(e + 8)) : (t = r.lastIndexOf(" ") + 1) < (e = r.lastIndexOf("/")) && (s = r.substring(t, e), n = r.substring(e + 1), s.toLowerCase() == s.toUpperCase() && (s = navigator.appName)), "Netscape" !== s || 5 != n || window.ActiveXObject || (s = "MSIE", n = "11.0"), -1 != (i = n.indexOf(";")) && (n = n.substring(0, i)), -1 != (i = n.indexOf(" ")) && (n = n.substring(0, i)), a = parseInt("" + n, 10), isNaN(a) && (n = "" + parseFloat(navigator.appVersion), a = parseInt(navigator.appVersion, 10)), isNaN(a) && (a = 0), /Chrome|Firefox|MSIE|Edge|Safari|Opera|Opera Mini/.test(s) || (s = "Other", a = 0), [s, a]
    },
    getOS: function() {
        var t, e = navigator.userAgent,
            i = [{
                s: "Windows 10",
                r: /(Windows 10.0|Windows NT 10.0)/
            }, {
                s: "Windows 8.1",
                r: /(Windows 8.1|Windows NT 6.3)/
            }, {
                s: "Windows 8",
                r: /(Windows 8|Windows NT 6.2)/
            }, {
                s: "Windows 7",
                r: /(Windows 7|Windows NT 6.1)/
            }, {
                s: "Windows Vista",
                r: /Windows NT 6.0/
            }, {
                s: "Windows Server 2003",
                r: /Windows NT 5.2/
            }, {
                s: "Windows XP",
                r: /(Windows NT 5.1|Windows XP)/
            }, {
                s: "Windows 2000",
                r: /(Windows NT 5.0|Windows 2000)/
            }, {
                s: "Windows ME",
                r: /(Win 9x 4.90|Windows ME)/
            }, {
                s: "Windows 98",
                r: /(Windows 98|Win98)/
            }, {
                s: "Windows 95",
                r: /(Windows 95|Win95|Windows_95)/
            }, {
                s: "Windows NT 4.0",
                r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
            }, {
                s: "Windows CE",
                r: /Windows CE/
            }, {
                s: "Windows 3.11",
                r: /Win16/
            }, {
                s: "Windows Phone",
                r: /Windows Phone|iemobile|WPDesktop/
            }, {
                s: "Chrome OS",
                r: /\bCrOS\b/
            }, {
                s: "Android",
                r: /Android/
            }, {
                s: "Open BSD",
                r: /OpenBSD/
            }, {
                s: "Sun OS",
                r: /SunOS/
            }, {
                s: "Linux",
                r: /(Linux|X11)/
            }, {
                s: "iOS",
                r: /(iPhone|iPad|iPod)/
            }, {
                s: "Mac OS X",
                r: /Mac OS X/
            }, {
                s: "Mac OS",
                r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
            }, {
                s: "QNX",
                r: /QNX/
            }, {
                s: "UNIX",
                r: /UNIX/
            }, {
                s: "BeOS",
                r: /BeOS/
            }, {
                s: "OS/2",
                r: /OS\/2/
            }, {
                s: "Search Bot",
                r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
            }];
        for (var r in i) {
            var s = i[r];
            if (s.r.test(e)) {
                t = s.s;
                break
            }
        }
        return /Windows/.test(t) && !/Windows Phone/.test(t) && (t = "Windows"), /Mac OS/.test(t) && (t = "Macintosh"), /Windows|Windows Phone|Macintosh|Linux|Android|iOS|Chrome OS/.test(t) || (t = "Other"), t
    },
    getScreenSize: function() {
        var t = window.devicePixelRatio || 1,
            e = window.screen.width ? window.screen.width : 0,
            i = window.screen.height ? window.screen.height : 0;
        return eaUtils.isAndroidStockBrowser() && (e /= t, e = Math.round(e), i /= t, i = Math.round(i)), e + "x" + i
    },
    isAndroidStockBrowser: function() {
        var t, e = !1,
            i = !1;
        return !("Android" != eaUtils.getOS()) && (e = (t = navigator.userAgent.match(/firefox/i)) && 0 < t.length, i = (t = navigator.userAgent.match(/chrome/i)) && 0 < t.length, !e && !i)
    },
    isTablet: function() {
        var t = navigator.userAgent.match(/(ipad|android|windows phone|silk|blackberry|iemobile)/i),
            e = eaUtils.getScreenSize().split("x");
        return !!(t && 0 < t.length && (960 <= e[0] || 960 <= e[1]))
    },
    getDevice: function() {
        return eaUtils.isTablet() ? "tablet" : eaUtils.isMobile.any() ? "mobile" : "desktop"
    },
    generateLighterColor: function(t, e) {
        if (t) {
            null == e && (e = 26);
            var i = eaUtils.extractRGB(t);
            return i.r = Math.min(255, parseInt(i.r) + e), i.g = Math.min(255, parseInt(i.g) + e), i.b = Math.min(255, parseInt(i.b) + e), "#" + eaUtils.fixed2(i.r.toString(16)) + eaUtils.fixed2(i.g.toString(16)) + eaUtils.fixed2(i.b.toString(16))
        }
    },
    fixed2: function(t) {
        return t.length < 2 ? "0" + t : t
    },
    getTransparentImageURL: function() {
        return "data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
    },
    getElementStyle: function(t, e) {
        var i;
        return t.currentStyle ? i = t.currentStyle[e] : window.getComputedStyle && (i = window.getComputedStyle(t, null).getPropertyValue(e)), i
    },
    addCSSById: function(t, e) {
        var i, r = "eautils-css",
            s = document.getElementsByTagName("head")[0],
            n = document.getElementById(r);
        if (null != n && null != n || ((n = document.createElement("style")).type = "text/css", n.id = r, s.appendChild(n)), null != eaUtils.cssStyle[e]) {
            eaUtils.rawCssStyle = "", eaUtils.cssStyle[e].css = t;
            for (var a = 0; a < eaUtils.cssStyleArray.length; a++) i = eaUtils.cssStyleArray[a], eaUtils.rawCssStyle += i.css
        } else eaUtils.rawCssStyle += t, (i = {}).css = t, eaUtils.cssStyle[e] = i, eaUtils.cssStyleArray.push(i);
        n.styleSheet ? n.styleSheet.cssText = eaUtils.rawCssStyle : n.innerHTML = eaUtils.rawCssStyle
    },
    backwardBackgroundTile: function(t) {
        return t && t.type && "image" == t.type && t.tile && (t.scaleMode = "tile", t.contentScale = 100, t.contentOffsetX = 50, t.contentOffsetY = 50, delete t.tile), t
    },
    toggleBackroundClasses: function(t, e) {
        if (!t || !e) return this.addClass(t, "background"), !1;
        var i = ["background", "background-crop", "background-stretch", "background-mask", "background-aspect", "background-tile"],
            r = i[0] + "-" + e.toLowerCase();
        for (var s in i) this.removeClass(t, i[s]);
        this.addClass(t, i[0]), this.addClass(t, r)
    },
    hasClass: function(t, e) {
        return t.className.match(new RegExp("(\\s|^)" + e + "(\\s|$)"))
    },
    addClass: function(t, e) {
        this.hasClass(t, e) || (t.className += " " + e)
    },
    removeClass: function(t, e) {
        if (this.hasClass(t, e)) {
            var i = new RegExp("(\\s|^)" + e + "(\\s|$)");
            t.className = t.className.replace(i, " ")
        }
    },
    getTextShadowCss: function(t) {
        if (!t) return null;
        var e = {
            "text-shadow": ""
        };
        return 1 != t.useShadow && "true" != t.useShadow || (e.textShadow = t.hShadow + "px " + t.vShadow + "px " + t.blur + "px " + t.color, e["text-shadow"] = t.hShadow + "px " + t.vShadow + "px " + t.blur + "px " + t.color, e["-moz-text-shadow"] = t.hShadow + "px " + t.vShadow + "px " + t.blur + "px " + t.color, e["-o-text-shadow"] = t.hShadow + "px " + t.vShadow + "px " + t.blur + "px " + t.color, e["-ms-text-shadow"] = t.hShadow + "px " + t.vShadow + "px " + t.blur + "px " + t.color), e
    },
    getBoxShadowCss: function(t) {
        if (!t) return null;
        var e = {
            "-webkit-box-shadow": "",
            "box-shadow": ""
        };
        return 1 != t.useShadow && "true" != t.useShadow || (e["-webkit-box-shadow"] = e.boxShadow = t.hShadow + "px " + t.vShadow + "px " + t.blur + "px " + t.spread + "px " + t.color), e
    },
    getDropShadowCss: function(t) {
        var e = {
            "-webkit-filter": "",
            filter: ""
        };
        return 1 != t.useShadow && "true" != t.useShadow || (e["-webkit-filter"] = e.filter = "drop-shadow(" + t.hShadow + "px " + t.vShadow + "px " + t.blur + "px " + t.color + ")"), e
    },
    getFiltersCss: function(t, e, i) {
        var r = {
            "-webkit-filter": "",
            filter: ""
        };
        return !t || 1 != t.useAdjustColor && "true" != t.useAdjustColor || (r.filter += "brightness(" + (parseInt(t.brightness) + 100) / 100 + ") ", r.filter += "contrast(" + (parseInt(t.contrast) + 100) / 100 + ") ", r.filter += "saturate(" + (parseInt(t.saturate) + 100) / 100 + ") ", r.filter += "hue-rotate(" + t.hue + "deg)"), !e || 1 != e.useBlur && "true" != e.useBlur || (r.filter += "blur(" + e.pixels + "px)"), !i || 1 != i.useShadow && "true" != i.useShadow || (r.filter += "drop-shadow(" + i.hShadow + "px " + i.vShadow + "px " + i.blur + "px " + i.color + ")"), r["-webkit-filter"] = r.filter, r
    },
    convertCssProps: function(t) {
        var e = {};
        for (var i in t) e[eaUtils.cssPropsAlias[i] || i] = t[i];
        return e
    },
    fixCSSProp: function(t, e, i) {
        if (null != t) return null == e && (e = "fontSize"), null == i && (i = "px"), t[e] = parseInt(t[e]) + i, t
    },
    getCssAsClass: function(t, e) {
        var i = "." + e + "{";
        for (var r in t) {
            var s = t[r];
            if (s instanceof Array)
                for (var n = 0, a = s.length; n < a; n++) i += r + ":" + s[n] + ";";
            else i += r + ":" + s + ";"
        }
        return i += "}"
    },
    getBackgroundCss: function(t) {
        var e = {};
        if (!t) return e;
        var i = t.type,
            r = t.scolor;
        switch ("lgrad" != i && "rgrad" != i || (t.gradColors && t.gradColors.length ? t.gradColors.length < 2 && 0 < t.gradColors.length && (r = t.gradColors[0].c, i = "solid") : (i = "solid", r = "#fff")), "true" == String(t.useBorder) && (e.border = "1px solid " + t.borderColor), e["background-image"] = "", i) {
            case "none":
                break;
            case "image":
                t = this.backwardBackgroundTile(t), e = this.getImageBackgroundCSS(e, t);
                break;
            case "solid":
                if (r && -1 != r.indexOf("rgba")) {
                    var s = eaUtils.getIEVersion(); - 1 < s && s < 9 && (r = eaUtils.rgba2hex(eaUtils.extractRGBA(r), !1))
                }
                e["background-color"] = r;
                break;
            case "rgrad":
            case "lgrad":
                for (var n = t.gradColors, a = [], o = 0; o < n.length; o++) a.push(n[o].c + " " + n[o].p + "%");
                var l = a.join(),
                    p = "linear",
                    d = (t.rotation || "0") + "deg";
                if ("rgrad" == t.type) {
                    p = "radial";
                    var c = t.rgradPos || "center";
                    if ("custom" == c) {
                        var h = "";
                        t.gradPosX && -1 != t.gradPosX.indexOf("%") || (h = "px");
                        var u = "";
                        t.gradPosY && -1 != t.gradPosY.indexOf("%") || (u = "px"), c = (t.gradPosX || "0") + h + " " + (t.gradPosY || "0") + u
                    }
                    d = c + ", circle cover"
                } else t.backgroundRotation && (d = t.backgroundRotation + "deg");
                if (n && 0 < n.length)(t = e["background-image"] = []).push("-moz-" + p + "-gradient(" + d + ",  " + l + ")"), t.push("-webkit-" + p + "-gradient(" + d + ",  " + l + ")"), t.push("-o-" + p + "-gradient(" + d + ",  " + l + ")"), t.push("-ms-" + p + "-gradient(" + d + ",  " + l + ")");
                e.filter = "progid:DXImageTransform.Microsoft.gradient( startColorstr='" + n[0].c + "', endColorstr='" + n[n.length - 1].c + "',GradientType=0 )"
        }
        return e
    },
    getImagePathFromBackground: function(t) {
        return bannerConfig.hqImages && t.hqUrl ? t.hqUrl : t.localUrl ? "images/" + t.localUrl : t.url && -1 !== t.url.indexOf("//") ? t.url : bannerConfig.photosUrl + t.url
    },
    applyImageSizeOnBackground: function(e, i) {
        var r = 0,
            t = !1,
            s = this.getImagePathFromBackground(i);
        for (var n in i) switch (n) {
            case "scaleMode":
            case "verticalAlign":
            case "horizontalAlign":
            case "contentScale":
                t = !0
        }
        if (t) {
            var a = new Image;
            a.onload = function(t) {
                r != a.width && (r = a.width), e.style.backgroundSize = "", "tile" == i.scaleMode && (e.style.backgroundSize = i.contentScale * r / 100 + "px", e.style.visibility = "visible")
            }, a.src = s
        }
    },
    getImageBackgroundCSS: function(t, e) {
        var i, r, s = this.getImagePathFromBackground(e);
        for (var n in t["background-image"] = "url(" + s + ")", e) switch (n) {
            case "scaleMode":
            case "verticalAlign":
            case "horizontalAlign":
                switch (e.verticalAlign) {
                    case "top":
                        i = "0";
                        break;
                    case "middle":
                        i = "50%";
                        break;
                    case "bottom":
                        i = "100%"
                }
                switch (e.horizontalAlign) {
                    case "left":
                        r = "0";
                        break;
                    case "center":
                        r = "50%";
                        break;
                    case "right":
                        r = "100%"
                }
                t["background-position"] = r + " " + i;
                break;
            case "contentOffsetX":
                "tile" === e.scaleMode && (t["background-position-x"] = e[n] + "%");
                break;
            case "contentOffsetY":
                "tile" === e.scaleMode && (t["background-position-y"] = e[n] + "%")
        }
        return t
    },
    getBorderCss: function(t) {
        var e = {};
        return t && (1 != t.useBorder && "true" != t.useBorder || (e.border = "1px solid " + t.borderColor)), e
    },
    applyCss: function(t, e) {
        for (var i in e) t.style[i] = e[i]
    },
    isURLValid: function(t) {
        return !(0 <= t.indexOf(" ") || -1 == t.indexOf("."))
    },
    getAppValidURL: function(t) {
        return eaUtils.isURLValid(t) ? t : EAdConfig.baseDomain
    },
    getElementUniqueId: function() {
        return "e_" + eaUtils.domUniqueId++
    },
    getImagePath: function(t, e, i) {
        return t ? t.replace("{hash}", e).replace("{wxh}", i) : ""
    },
    getUniqueId: function() {
        return (Math.random() + (new Date).getTime()).toString(36).replace(".", "")
    },
    preloadImage: function(t, e) {
        var i = new Image;
        i.onerror = i.onload = function() {
            e && e()
        }, i.src = t
    },
    isTouchDevice: function() {
        try {
            return document.createEvent("TouchEvent"), "ontouchstart" in document.documentElement
        } catch (t) {
            return !1
        }
    },
    getSharePageURL: function(t) {
        var e = 1 == t ? "" : "&v=" + (12345 + 1e3 * Math.random() >> 0),
            i = URLPaths.sharePageUrlFormat.replace("{domain}", EAdConfig.shareSubdomain).replace("{hash}", EAdConfig.creativeHash);
        return this.getAppValidURL(i + e)
    },
    cloneObject: function(t) {
        return JSON.parse(JSON.stringify(t))
    },
    getClickTagValue: function() {
        var t = window.location.search.substring(1).split("clickTag=");
        if (!t[1]) return !1;
        var e = t[1].replace(/&.+$/, "");
        return decodeURIComponent(e)
    },
    getProtocol: function() {
        return "http:" != location.protocol && "https:" != location.protocol ? "https:" : ""
    },
    addProtocolToUrl: function(t) {
        return -1 == t.indexOf("://") ? "http://" + t : t
    },
    getProportion: function(t, e) {
        var i = window.innerWidth / t,
            r = window.innerHeight / e;
        return {
            proportion: Math.min(i, r)
        }
    },
    getTextSubstr: function(t, e, i) {
        return t ? t.substring(e, e + i) : t
    },
    camelCaseToDash: function(t) {
        return t.replace(/([A-Z])/g, function(t) {
            return "-" + t.toLowerCase()
        })
    },
    getRichTextStyleString: function(t) {
        if (!t) return "";
        var e = "";
        for (var i in t)
            if ({}.hasOwnProperty.call(t, i) && t[i]) switch (i) {
                case "fontFamily":
                    e += "font-family:" + (0 === t[i].indexOf('"') ? t[i] : '"' + t[i] + '"') + ";";
                    break;
                case "fontWeight":
                case "fontStyle":
                case "color":
                case "textTransform":
                case "textDecoration":
                    e += eaUtils.camelCaseToDash(i) + ":" + t[i] + ";"
            }
        return e
    },
    replaceSpacesWithNbsps: function(t) {
        if (!t) return t;
        for (var e = "", i = !1, r = 0; r < t.length; r++) {
            var s = t[r];
            " " === s ? i ? (s = String.fromCharCode(160), i = !1) : i = !0 : i = !1, e += s
        }
        return e
    }
};
Array.prototype.indexOf || (Array.prototype.indexOf = function(t) {
    if (null == this) throw new TypeError;
    var e = Object(this),
        i = e.length >>> 0;
    if (0 === i) return -1;
    var r = 0;
    if (0 < arguments.length && ((r = Number(arguments[1])) != r ? r = 0 : 0 !== r && r !== 1 / 0 && r !== -1 / 0 && (r = (0 < r || -1) * Math.floor(Math.abs(r)))), i <= r) return -1;
    for (var s = 0 <= r ? r : Math.max(i - Math.abs(r), 0); s < i; s++)
        if (s in e && e[s] === t) return s;
    return -1
});
var Detect = function() {
    var t, e, i = "transformOrigin,textShadow,textStroke,boxShadow,borderRadius,borderImage,opacity".split(","),
        n = "Webkit,Moz,O,ms,Khtml".split(","),
        a = document.createElement("detect"),
        r = [];

    function s(t) {
        if ("string" != typeof t) return !1;
        for (var e = t.substr(0, 1).toUpperCase() + t.substr(1), i = (t + " " + n.join(e + " ") + e).split(" "), r = 0, s = i.length; r < s; r++)
            if ("" === a.style[i[r]]) return !0;
        return !1
    }
    for (t in i) r[e = i[t]] = s(e);
    return r
}();

function Preload() {
    window.assetsCache = {}, this.fontTypes = {
        CUSTOM: "custom",
        BANNERSNACK: "bannersnack",
        GOOGLE: "google"
    }, this.loadedSlides = {}, this.imagesToLoad = [], this.fontsToLoad = [], this.getFontUrl = function(t) {
        if (t.localUrl) return "fonts/" + t.localUrl;
        switch (t.fontFamily = this.unquoted(t.fontFamily), t.fontType) {
            case this.fontTypes.BANNERSNACK:
                return "//" + t.fontUrl;
            case this.fontTypes.CUSTOM:
                return "//" + (t.fontFaceUrl ? t.fontUrl : t.fontUrl + ".ttf");
            case this.fontTypes.GOOGLE:
                var e = "https://fonts.googleapis.com/css?family=" + t.fontFamily.split(" ").join("+") + ":" + parseInt(t.fontWeight);
                return "italic" === t.fontStyle && (e += "i"), this.bannerConfig.preview && (e += "&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese"), e;
            default:
                return ""
        }
    }, this.addFontToDOM = function(t) {
        var e, i, r, s, n = this,
            a = "ttf";
        if (t.fontType || (t.fontType = this.fontTypes.GOOGLE), e = this.getFontUrl(t), !window.assetsCache[e]) {
            switch (this.fontsToLoad.push(e), i = function() {
                n.fontsToLoad.pop(), n.resolveIfAssetsLoaded()
            }, t.fontType) {
                case this.fontTypes.GOOGLE:
                    (s = document.createElement("link")).setAttribute("rel", "stylesheet"), s.setAttribute("type", "text/css"), s.setAttribute("href", e), s.addEventListener("load", i), s.addEventListener("error", i), document.head.appendChild(s);
                    break;
                case this.fontTypes.BANNERSNACK:
                case this.fontTypes.CUSTOM:
                    if (this.relPreloadSupported() && (a = e.substr(e.lastIndexOf(".") + 1), (s = document.createElement("link")).setAttribute("rel", "preload"), s.setAttribute("type", "font/" + a), s.setAttribute("as", "font"), s.setAttribute("href", e), s.setAttribute("crossorigin", "anonymous"), s.addEventListener("load", i), s.addEventListener("error", i), document.head.appendChild(s)), t.fontFamily) {
                        var o = "@font-face {\nfont-family: '" + t.fontFamily.replace(/'/g, "\\'") + "';\nfont-style: " + t.fontStyle + ";\nfont-weight: " + t.fontWeight + ";\nsrc: url(" + e + ");\n}\n";
                        (r = document.createElement("style")).appendChild(document.createTextNode(o)), this.relPreloadSupported() || (r.addEventListener("load", i), r.addEventListener("error", i)), document.head.appendChild(r)
                    }
            }
            window.assetsCache[e] = !0
        }
    }, this.unquoted = function(t) {
        return "string" == typeof t ? t.replace(/(^")|("$)/g, "") : t
    }, this.relPreloadSupported = function() {
        return function(t, e) {
            if (t && t.supports) try {
                return t.supports(e)
            } catch (t) {
                return !1
            }
        }(document.createElement("link").relList, "preload")
    }, this.getSlideId = function(t) {
        return t.displayData ? t.displayData.properties.id : t.properties.id
    }, this.getSlideLoaded = function(t) {
        var e = this.getSlideId(t);
        return !!this.loadedSlides[e] && this.loadedSlides[e]
    }, this.setSlideLoaded = function(t) {
        var e = this.getSlideId(t);
        this.loadedSlides[e] = !0
    }, this.resolveIfAssetsLoaded = function() {
        0 === this.imagesToLoad.length && 0 === this.fontsToLoad.length && (this.currentSlide ? this.setSlideLoaded(this.currentSlide) : this.setAllSlidesLoaded(), "function" == typeof this.callback && this.callback())
    }, this.preloadImage = function(t, e, i) {
        var r = this,
            s = t;
        if (e && (s += e), !window.assetsCache[s]) {
            var n = new Image;
            this.imagesToLoad.push(n);
            var a = function() {
                r.imagesToLoad.pop(), r.resolveIfAssetsLoaded()
            };
            n.addEventListener("load", a), n.addEventListener("error", a), this.bannerConfig.preview && i ? this.setColorGroups(t, n, i) : n.src = t, window.assetsCache[s] = n
        }
    }, this.preloadElementAssets = function(t) {
        var e;
        if ("layer" === t.type) switch (t.layerType) {
            case "shape":
                "image" === t.properties.backgroundColor.type && this.preloadImage(eaUtils.getImagePathFromBackground(t.properties.backgroundColor));
                break;
            case "image":
                this.bannerConfig.hqImages && t.properties.hqUrl ? e = t.properties.hqUrl : t.properties.localUrl ? (e = "images/" + t.properties.localUrl, this.bannerConfig.embedUrl && (e = this.bannerConfig.embedUrl + e)) : e = t.properties.url && -1 !== t.properties.url.indexOf("//") ? t.properties.url : this.bannerConfig.photosUrl + t.properties.url, this.preloadImage(e);
                break;
            case "svg":
                e = t.properties.localUrl ? "images/" + t.properties.localUrl : this.bannerConfig.s3Url + "files/" + t.properties.url, this.preloadImage(e, t.properties.id, t.properties.colorGroups);
                break;
            case "text":
                var i = t.properties.config;
                if (i) {
                    var r = this;
                    i.forEach(function(t) {
                        var i = t.style,
                            e = t.children;
                        i && i.fontFamily && r.addFontToDOM(i), e && e.forEach(function(t) {
                            var e = t.style;
                            e && (e.fontFamily ? r.addFontToDOM(e) : e.fontWeight && i && (e.fontFamily = i.fontFamily, e.fontType = i.fontType, r.addFontToDOM(e)))
                        })
                    })
                } else this.addFontToDOM(t.properties);
                break;
            case "button":
                t.properties.localUrl || this.addFontToDOM(t.properties.labelStyle)
        } else if ("slide" === t.type)
            for (var s = 0; s < t.elements.length; s++) this.preloadElementAssets(t.elements[s])
    }
}
Preload.prototype.assets = function(t, e, i, r) {
        if (this.bannerConfig = i, this.callback = r, this.currentSlide = e.displayData ? e.displayData : e, this.getSlideLoaded(this.currentSlide)) this.resolveIfAssetsLoaded();
        else {
            var s = [this.currentSlide];
            if (null !== t) {
                "image" === t.properties.backgroundColor.type && this.preloadImage(eaUtils.getImagePathFromBackground(t.properties.backgroundColor));
                var n = t.elements.filter(function(t) {
                    return "layer" === t.type
                });
                s = s.concat(n)
            }
            for (var a = 0; a < s.length; a++) this.preloadElementAssets(s[a]);
            this.resolveIfAssetsLoaded()
        }
    }, window.eff = null,
    function() {
        var i = {
                linear: "linear",
                ease: "ease",
                easeIn: "ease-in",
                easeOut: "ease-out",
                easeInOut: "ease-in-out",
                easeInCubic: "cubic-bezier(.55,.055,.675,.19)",
                easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
                easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
                easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
                easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
                easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
                easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
                easeOutExpo: "cubic-bezier(.19,1,.22,1)",
                easeInOutExpo: "cubic-bezier(1,0,0,1)",
                easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
                easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
                easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
                easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
                easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
                easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
                easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
                easeOutQuint: "cubic-bezier(.23,1,.32,1)",
                easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
                easeInSine: "cubic-bezier(.47,0,.745,.715)",
                easeOutSine: "cubic-bezier(.39,.575,.565,1)",
                easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
                easeInStrong: "cubic-bezier(.97,.09,.79,.21)",
                easeOutStrong: "cubic-bezier(.21,.79,.09,.97)",
                easeInOutStrong: "cubic-bezier(.78,.03,.24,.99)",
                easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
                easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
                easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
            },
            g = function(t) {
                if ("Linear" === t.tween || "linear" === t.ease) return "linear";
                var e = "ease";
                switch (t.ease) {
                    default: e += "Out";
                    break;
                    case "easeIn":
                            e += "In";
                        break;
                    case "easeInOut":
                            e += "InOut"
                }
                return e += t.tween, i[e] || "linear"
            },
            p = function(t, e) {
                for (var i, r, s, n = t + "% {", a = Object.keys(e), o = 0; i = a[o]; o++) n += (s = e[r = i], r + ":" + s + ";-webkit-" + r + ":" + s + ";");
                return n += "}"
            },
            y = {},
            b = function(t, e) {
                if (!y[t]) {
                    for (var i, r, s = "@keyframes " + t + " {", n = "@-webkit-keyframes " + t + " {", a = 0; i = e[a]; a++) s += r = p(i.percent, i.props), n += r;
                    var o = (s += "}") + (n += "}"),
                        l = document.createElement("style");
                    l.type = "text/css", l.styleSheet ? l.styleSheet.cssText = o : l.innerHTML = o, document.getElementsByTagName("head")[0].appendChild(l), y[t] = !0
                }
            },
            m = function(t, e) {
                t.offsetWidth, t.style.animation = e, t.style.webkitAnimation = e, t.style.animationPlayState = window.eff.PLAYING_STATE, t.style.webkitAnimationPlayState = window.eff.PLAYING_STATE
            },
            w = function(t, e) {
                var i = 0,
                    r = 0,
                    s = parseInt(t.slideOffset);
                switch (t.direction) {
                    case "custom":
                        i = parseInt(t.slidePosX), r = parseInt(t.slidePosY);
                        break;
                    case "l2r":
                        i = e ? -s : s;
                        break;
                    case "r2l":
                        i = e ? s : -s;
                        break;
                    case "t2b":
                        r = e ? -s : s;
                        break;
                    case "b2t":
                        r = e ? s : -s
                }
                return {
                    translateX: i,
                    translateY: r,
                    alpha: parseInt(t.alphaOffset)
                }
            },
            v = function(t, e) {
                var i = 1,
                    r = 1,
                    s = "top left";
                switch (t.direction) {
                    case "l2r":
                        i = 0, s = e ? "left center" : "right center";
                        break;
                    case "r2l":
                        i = 0, s = e ? "right center" : "left center";
                        break;
                    case "t2b":
                        r = 0, s = e ? "center top" : "center bottom";
                        break;
                    case "b2t":
                        r = 0, s = e ? "center bottom" : "center top";
                        break;
                    case "center":
                        r = i = 0, s = "center center"
                }
                return {
                    startScaleX: i,
                    startScaleY: r,
                    transformOrigin: s
                }
            },
            S = function(t, e) {
                var i = "buildIn" === e,
                    r = "blur_" + e + "_" + t.blurAmount;
                if (y[r]) return r;
                var s = {
                    filter: "blur(" + t.blurAmount + "px)",
                    opacity: "0"
                };
                return b(r, [{
                    percent: i ? 0 : 100,
                    props: s
                }, {
                    percent: i ? 30 : 70,
                    props: {
                        opacity: 1
                    }
                }, {
                    percent: i ? 100 : 0,
                    props: {
                        filter: "blur(0px)"
                    }
                }]), r
            },
            C = function(t, e) {
                var i = "buildIn" === e,
                    r = "alpha_" + e;
                if (y[r]) return r;
                return b(r, [{
                    percent: i ? 0 : 100,
                    props: {
                        opacity: "0",
                        transform: "translateX(0) translateY(0)"
                    }
                }, {
                    percent: i ? 100 : 0,
                    props: {
                        opacity: "1"
                    }
                }]), r
            },
            x = function(t) {
                if (t.length) {
                    var r = String.fromCharCode(160);
                    t.forEach(function(e) {
                        if (e.getElementsByTagName("br").length) return !1;
                        var t = e.getElementsByTagName("span");
                        t = [].slice.call(t);
                        var a = [],
                            o = document.createElement("span");
                        for (o.className = "word", t.forEach(function(s) {
                                var t, e, i = s.textContent;
                                if (-1 === i.indexOf(" ") && -1 === i.indexOf(r)) o.appendChild(s);
                                else {
                                    var n = (t = i, e = new RegExp(String.fromCharCode(160), "g"), t.replace(e, " ")).split(" ");
                                    n.forEach(function(t, e) {
                                        var i = s.cloneNode(!0);
                                        i.textContent = t;
                                        var r = null;
                                        0 !== e && (a.push(o), (o = document.createElement("span")).className = "word", (r = s.cloneNode(!0)).textContent = " ", a.push(r)), "" !== t && o.appendChild(i), e === n.length - 1 && a.push(o)
                                    })
                                }
                            }), a.push(o); e.firstChild;) e.removeChild(e.firstChild);
                        a.forEach(function(t) {
                            e.appendChild(t)
                        })
                    })
                }
            },
            k = function(t, e) {
                return parseFloat(t.toFixed(e))
            };
        window.eff = {
            PLAYING_STATE: "running",
            clearAll: function(t) {
                t && t.firstChild && m(t.firstChild, "")
            },
            clearWordsTimeout: function(t, e) {
                for (var i, r = 0; i = e[r]; r++) m(i, "")
            },
            animate: function(t, e, i, r) {
                if ("none" !== e.type) {
                    r = r || 0;
                    var s, n, a, o, l, p, d, c = null;
                    switch (e.type) {
                        case "rotate":
                            c = function(t, e, i) {
                                var r = "buildIn" === e,
                                    s = parseInt(t.alphaOffset),
                                    n = Math.round(.3 * i.offsetWidth + .3 * i.offsetHeight),
                                    a = 45;
                                ("forward" === t.direction && r || "backward" === t.direction && !r) && (a *= -1, n *= -1);
                                var o = t.type + "_" + e + "_" + t.direction + "_" + s + "_" + n + "_" + a;
                                if (y[o]) return o;
                                return b(o, [{
                                    percent: r ? 0 : 100,
                                    props: {
                                        transform: "translateZ(" + n + "px) rotate(" + a + "deg)",
                                        opacity: s / 100
                                    }
                                }, {
                                    percent: r ? 100 : 0,
                                    props: {
                                        transform: "translateZ(0) rotate(0)",
                                        opacity: "1"
                                    }
                                }]), o
                            }(e, i, t);
                            break;
                        case "instant":
                            break;
                        case "flip":
                            c = function(t, e) {
                                var i = "buildIn" === e,
                                    r = t.deg || 80,
                                    s = 0,
                                    n = 0,
                                    a = parseInt(t.alphaOffset),
                                    o = "1, 1, 0, 0deg";
                                switch (i || (r *= -1), t.direction) {
                                    case "bottom":
                                        s = r;
                                        break;
                                    case "top":
                                        s = -r;
                                        break;
                                    case "right":
                                        n = -r;
                                        break;
                                    case "left":
                                        n = r;
                                        break;
                                    case "topLeft":
                                        o = "-1, 1, 0, " + r + "deg";
                                        break;
                                    case "topRight":
                                        o = "1, 1, 0, " + -r + "deg";
                                        break;
                                    case "bottomLeft":
                                        o = "1, 1, 0, " + r + "deg";
                                        break;
                                    case "bottomRight":
                                        o = "-1, 1, 0, " + -r + "deg"
                                }
                                var l = t.type + "_" + e + "_" + t.direction + "_" + a + "_" + r;
                                if (y[l]) return l;
                                return b(l, [{
                                    percent: i ? 0 : 100,
                                    props: {
                                        transform: "rotateX(" + s + "deg) rotateY(" + n + "deg) rotate3d(" + o + ")",
                                        opacity: a / 100
                                    }
                                }, {
                                    percent: 50,
                                    props: {
                                        opacity: "1"
                                    }
                                }, {
                                    percent: i ? 100 : 0,
                                    props: {
                                        transform: "rotateX(0) rotateY(0) rotate3d(1, 1, 0, 0deg)",
                                        opacity: "1"
                                    }
                                }]), l
                            }(e, i);
                            break;
                        case "zoom":
                            c = function(t, e) {
                                var i = "buildIn" === e,
                                    r = parseInt(t.alphaOffset),
                                    s = 0,
                                    n = 0;
                                switch (t.direction) {
                                    case "l2r":
                                        s = -50;
                                        break;
                                    case "r2l":
                                        s = 50;
                                        break;
                                    case "t2b":
                                        n = -50;
                                        break;
                                    case "b2t":
                                        n = 50
                                }
                                i || (s *= -1, n *= -1);
                                var a = t.type + "_" + e + "_" + s + "_" + n + "_" + t.zoom + "_" + r + "_" + t.blurAmount;
                                if (y[a]) return a;
                                var o = {
                                    transform: "scale(" + t.zoom + ") translateX(" + s + "%) translateY(" + n + "%)",
                                    filter: "blur(" + t.blurAmount + "px)",
                                    opacity: r / 100
                                };
                                return b(a, [{
                                    percent: i ? 0 : 100,
                                    props: o
                                }, {
                                    percent: i ? 100 : 0,
                                    props: {
                                        transform: "scale(1)",
                                        filter: "blur(0)",
                                        opacity: "1"
                                    }
                                }]), a
                            }(e, i);
                            break;
                        case "roll":
                            c = function(t, e) {
                                var i = "buildIn" === e,
                                    r = w(t, i),
                                    s = r.translateX,
                                    n = r.translateY,
                                    a = r.alpha,
                                    o = 1;
                                (s < 0 && 0 <= n || n < 0 && s <= 0) && (o = -1);
                                var l = 540 * o,
                                    p = t.type + "_" + e + "_" + s + "_" + n + "_" + a + "_" + l + "_" + t.blurAmount;
                                if (y[p]) return p;
                                var d = {
                                    transform: "translateX(" + s + "px) translateY(" + n + "px) rotate(" + l + "deg)",
                                    filter: "blur(" + t.blurAmount + "px)",
                                    opacity: a / 100
                                };
                                return b(p, [{
                                    percent: i ? 0 : 100,
                                    props: d
                                }, {
                                    percent: i ? 100 : 0,
                                    props: {
                                        transform: "translateX(0) translateY(0) rotate(0deg)",
                                        filter: "blur(0)",
                                        opacity: "1"
                                    }
                                }]), p
                            }(e, i);
                            break;
                        case "slide":
                            c = function(t, e) {
                                var i = "buildIn" === e,
                                    r = w(t, i),
                                    s = r.translateX,
                                    n = r.translateY,
                                    a = r.alpha,
                                    o = t.type + "_" + e + "_" + s + "_" + n + "_" + a;
                                if (y[o]) return o;
                                return b(o, [{
                                    percent: i ? 0 : 100,
                                    props: {
                                        transform: "translateX(" + s + "px) translateY(" + n + "px)",
                                        opacity: a / 100
                                    }
                                }, {
                                    percent: i ? 100 : 0,
                                    props: {
                                        transform: "translateX(0) translateY(0)",
                                        opacity: "1"
                                    }
                                }]), o
                            }(e, i);
                            break;
                        case "slideBounce":
                            c = function(t, e) {
                                var i = "buildIn" === e,
                                    r = w(t, i),
                                    s = r.translateX,
                                    n = r.translateY,
                                    a = r.alpha,
                                    o = "slideBounce_" + e + "_" + s + "_" + n + "_" + a;
                                if (y[o]) return o;
                                for (var l, p = [
                                        [0, s, n, a / 100],
                                        [38, 0, 0, 1],
                                        [55, .11 * s, .11 * n, 1],
                                        [72, 0, 0, 1],
                                        [81, .05 * s, .05 * n, 1],
                                        [90, 0, 0, 1],
                                        [95, .02 * s, .02 * n, 1],
                                        [100, 0, 0, 1]
                                    ], d = [], c = 0; l = p[c]; c++) {
                                    var h = {
                                        transform: "translateX(" + l[1] + "px) translateY(" + l[2] + "px)",
                                        opacity: l[3],
                                        "animation-timing-function": c % 2 ? "ease-out" : "ease-in"
                                    };
                                    d.push({
                                        percent: i ? l[0] : 100 - l[0],
                                        props: h
                                    })
                                }
                                return b(o, d), o
                            }(e, i);
                            break;
                        case "slideElastic":
                            c = function(t, e) {
                                var i = "buildIn" === e,
                                    r = w(t, i),
                                    s = r.translateX,
                                    n = r.translateY,
                                    a = r.alpha,
                                    o = "slideElastic_" + e + "_" + s + "_" + n + "_" + a;
                                if (y[o]) return o;
                                for (var l, p = [
                                        [0, s, n, a / 100],
                                        [16, -.25 * s, -.25 * n, 1],
                                        [28, .11 * s, .11 * n, 1],
                                        [44, -.05 * s, -.05 * n, 1],
                                        [60, .02 * s, .02 * n, 1],
                                        [72, -.01 * s, -.01 * n, 1],
                                        [88, .01 * s, .01 * n, 1],
                                        [100, 0, 0, 1]
                                    ], d = [], c = 0; l = p[c]; c++) {
                                    var h = {
                                        transform: "translateX(" + l[1] + "px) translateY(" + l[2] + "px)",
                                        opacity: l[3]
                                    };
                                    d.push({
                                        percent: i ? l[0] : 100 - l[0],
                                        props: h
                                    })
                                }
                                return b(o, d), o
                            }(e, i);
                            break;
                        case "scale":
                            a = v(e, n = "buildIn" === (s = i)), o = a.startScaleX, l = a.startScaleY, p = a.transformOrigin, d = "scale_" + s + "_" + p.replace(" ", "_") + "_" + o + "_" + l, y[d] || b(d, [{
                                percent: n ? 0 : 100,
                                props: {
                                    transform: "scaleX(" + o + ") scaleY(" + l + ")",
                                    "transform-origin": p
                                }
                            }, {
                                percent: n ? 100 : 0,
                                props: {
                                    transform: "scaleX(1) scaleY(1)",
                                    "transform-origin": p
                                }
                            }]), c = d;
                            break;
                        case "scaleBounce":
                            c = function(t, e) {
                                var i = "buildIn" === e,
                                    r = v(t, i),
                                    s = r.startScaleX,
                                    n = r.startScaleY,
                                    a = r.transformOrigin,
                                    o = "scaleBounce_" + e + "_" + a.replace(" ", "_") + "_" + s + "_" + n;
                                if (y[o]) return o;
                                for (var l, p = function(t) {
                                        return s || t
                                    }, d = function(t) {
                                        return n || t
                                    }, c = [
                                        [0, s, n],
                                        [38, 1, 1],
                                        [55, p(.7), d(.7)],
                                        [72, 1, 1],
                                        [81, p(.84), d(.84)],
                                        [90, 1, 1],
                                        [95, p(.95), d(.95)],
                                        [100, 1, 1]
                                    ], h = [], u = 0; l = c[u]; u++) {
                                    var f = {
                                        transform: "scaleX(" + l[1] + ") scaleY(" + l[2] + ")",
                                        "transform-origin": a,
                                        "animation-timing-function": u % 2 ? "ease-out" : "ease-in"
                                    };
                                    h.push({
                                        percent: i ? l[0] : 100 - l[0],
                                        props: f
                                    })
                                }
                                return b(o, h), o
                            }(e, i);
                            break;
                        case "scaleElastic":
                            c = function(t, e) {
                                var i = "buildIn" === e,
                                    r = v(t, i),
                                    s = r.startScaleX,
                                    n = r.startScaleY,
                                    a = r.transformOrigin,
                                    o = "scaleElastic_" + e + "_" + a.replace(" ", "_") + "_" + s + "_" + n;
                                if (y[o]) return o;
                                for (var l, p = function(t) {
                                        return s || t
                                    }, d = function(t) {
                                        return n || t
                                    }, c = [
                                        [0, s, n],
                                        [16, p(1.35), d(1.35)],
                                        [28, p(.86), d(.86)],
                                        [44, p(1.05), d(1.05)],
                                        [60, p(.98), d(.98)],
                                        [72, p(1.01), d(1.01)],
                                        [88, p(.99), d(.99)],
                                        [100, 1, 1]
                                    ], h = [], u = 0; l = c[u]; u++) h.push({
                                    percent: i ? l[0] : 100 - l[0],
                                    props: {
                                        transform: "scaleX(" + l[1] + ") scaleY(" + l[2] + ")",
                                        "transform-origin": a
                                    }
                                });
                                return b(o, h), o
                            }(e, i);
                            break;
                        case "blur":
                            c = S(e, i);
                            break;
                        case "alpha":
                            c = C(0, i);
                            break;
                        case "alpha-words":
                        case "blur-words":
                            c = function(t, e, i, r) {
                                var s, n = t.getElementsByClassName("text-content")[0],
                                    a = t.getElementsByClassName("row");
                                if (n && !a.length) ! function(t) {
                                    if (!t.getElementsByTagName("span").length) {
                                        for (var e = t.innerHTML, i = "<span>", r = !1, s = !1, n = 0; n < e.length; n++) " " === e[n] || "\n" === e[n] ? (s && (i += "</span>"), s = !(r = !0)) : (r && (i += "<span>"), s = !(r = !1)), i += e[n];
                                        i += "</span>", t.innerHTML = i
                                    }
                                }(n), s = n.getElementsByTagName("span");
                                else {
                                    if (!a.length) return;
                                    t.getElementsByClassName("word").length || (a = [].slice.call(a), x(a)), s = t.getElementsByClassName("word")
                                }
                                var o = (e.duration - e.wordsDuration) / (s.length - 1 || 1);
                                o < 0 && (o = 0);
                                var l = e.wordsAppearOrder || "random",
                                    p = 0,
                                    d = 0;
                                for (s = [].slice.call(s); s.length;) {
                                    var c, h;
                                    "r2l" === l ? c = s.pop() : "l2r" === l ? c = s.shift() : (d = Math.floor(Math.random() * s.length), c = s.splice(d, 1)[0]), h = {
                                        tween: e.tween,
                                        ease: e.ease,
                                        duration: Math.min(e.wordsDuration, e.duration),
                                        blurAmount: e.blurAmount,
                                        delay: p * o + Number(e.delay)
                                    };
                                    var u = null;
                                    switch (e.type) {
                                        case "alpha-words":
                                            u = C(0, i);
                                            break;
                                        case "blur-words":
                                            u = S(e, i)
                                    }
                                    if (u) {
                                        var f = Number(h.duration) || 1e-4,
                                            y = u + " " + Number(f) + "s " + g(e) + " " + k(h.delay + r, 3) + "s both";
                                        m(c, y), c.setAttribute("word-delay", p * o)
                                    }
                                    p++
                                }
                            }(t, e, i, r)
                    }
                    if ("rotate" === e.type || "flip" === e.type) {
                        var h = Math.round(.7 * t.offsetWidth + .7 * t.offsetHeight) + "px";
                        t.style.perspective = h, t.style.webkitPerspective = h
                    }
                    if (c) {
                        var u = c + " " + (Number(e.duration) || 1e-4) + "s " + g(e) + " " + k(e.delay + r, 3) + "s both";
                        m(t.firstChild && 1 === t.firstChild.nodeType && !t.classList.contains("word") ? t.firstChild : t, u)
                    }
                    var f = Number(e.duration) + Number(e.delay) + r;
                    setTimeout(function() {
                        e.onAnimationEnd && e.onAnimationEnd()
                    }, 1e3 * f)
                } else e.onAnimationEnd && e.onAnimationEnd()
            }
        }
    }();
var EventDispatcher = function() {};

function Stats(t) {
    this.hash = t.hash, this.userId = t.userId, this.rotatorHash = t.rotatorHash, this.sqsURI = "dev" === window.bannerConfig.env || "local" === window.bannerConfig.env ? "/174496846625/stats-bannersnack-dev" : "/174496846625/stats-bannersnack", this.sqsURL = "https://sqs.us-east-1.amazonaws.com" + this.sqsURI, this.timestamp = !1, this.ip = !1, this.vid = !1, this.viewTime = !1, this.browser = eaUtils.getBrowser(), this.params = {
        uid: this.userId,
        h: this.hash,
        eid: !1,
        ip: !1,
        b: this.browser[0],
        bv: this.browser[1],
        os: eaUtils.getOS(),
        d: eaUtils.getDevice(),
        r: eaUtils.getScreenSize(),
        mp: !1,
        t: !1,
        vid: !1,
        elt: !1,
        et: "view"
    }, this.rotatorHash && (this.params.rh = this.rotatorHash), this.planned = {}, this.slideSaved = !1, this.banner = t.banner, this.currentDomain = t.currentDomain, EventDispatcher.call(this)
}

function BaseDisplay() {
    window.EventDispatcher.call(this)
}

function BannerDisplay() {
    this.startSlide = 0, this.overflowSlide = null, BaseDisplay.call(this)
}
EventDispatcher.prototype = {
    constructor: EventDispatcher,
    apply: function(t) {
        t.on = EventDispatcher.prototype.on, t.off = EventDispatcher.prototype.off, t.trigger = EventDispatcher.prototype.trigger
    },
    on: function(t, e) {
        void 0 === this._listeners && (this._listeners = {});
        var i, r, s = this._listeners;
        for (t = t.split(" "), r = 0; i = t[r]; r++) s[i] = s[i] || [], -1 === s[i].indexOf(e) && s[i].push(e)
    },
    off: function(t, e) {
        if (void 0 !== this._listeners) {
            var i = this._listeners[t];
            if (void 0 !== i) {
                var r = i.indexOf(e); - 1 !== r && i.splice(r, 1)
            }
        }
    },
    trigger: function(t, e) {
        if (void 0 !== this._listeners) {
            var i = this._listeners[t];
            if (void 0 !== i) {
                var r = {};
                r.target = this, r.type = t, r.data = e;
                for (var s = i.length, n = 0; n < s; n++) i[n].call(this, r)
            }
        }
    }
}, Stats.prototype = new EventDispatcher, (Stats.prototype.constructor = Stats).prototype.plan = function(t, e, i) {
    if (this.timestamp) {
        this.planned[t] || (this.planned[t] = []);
        var r = e.displayData && e.displayData.type && "slide" == e.displayData.type;
        if (!this.slideSaved || !r) {
            !this.slideSaved && r && (this.slideSaved = r);
            var s = {};
            for (var n in this.params) s[n] = this.params[n];
            var a = e.displayData && e.displayData.properties && e.displayData.properties.id || e.id;
            a && (s.eid = a), s.ip = this.ip, s.vid = this.vid, s.t = this.timestamp + (Math.floor((new Date).getTime() / 1e3) - this.viewTime), s.mp = i.clientX + "x" + i.clientY, s.et = i.type, s.elt = this.getElementType(e), this.planned[t].push(s)
        }
    }
}, Stats.prototype.launch = function(t) {
    if (t) this.sendSQSRequest(this.planned[t]), this.planned[t] = [];
    else {
        var e = [];
        for (var i in this.planned)
            for (var r in this.planned[i]) e.push(this.planned[i][r]);
        this.sendSQSRequest(e), this.planned = {}
    }
    this.slideSaved = !1
}, Stats.prototype.isBlockedDomain = function(t) {
    if (!t) return !1;
    var e = ["www.bannersnack.com", "bannersnack.com", "dev.bannersnack.net", "bannersnack", "www.mediacpm.pl", "mediacpm.pl", "www.adsmodern.com", "adsmodern.com", "www.capital.gr", "capital.gr", "www.dikaiologitika.gr", "dikaiologitika.gr", "www.athensmagazine.gr", "athensmagazine.gr", "www.topontiki.gr", "topontiki.gr", "www.efsyn.gr", "efsyn.gr", "www.youweekly.gr", "youweekly.gr", "www.tribune.gr", "tribune.gr", "www.newpost.gr", "newpost.gr", "www.rizopoulospost.com", "rizopoulospost.com", "www.newpost.gr", "newpost.gr", "www.kontranews.gr", "kontranews.gr"],
        i = (t = (t = t.split("//")[1] || "").split("/")[0]).split(".");
    if (4 == i.length) {
        var r = t.replace(i[0] + ".", "");
        if ("share" != i[0] && -1 < e.indexOf(r)) return !0
    }
    return -1 < e.indexOf(t)
}, Stats.prototype.track = function() {
    var i = this,
        t = this.getStatsRequestUrl(),
        e = "bsStats_" + this.hash,
        r = this.isBlockedDomain(this.currentDomain);
    if (!r) try {
        ga("create", "UA-15731042-32", "auto"), ga("send", "pageview")
    } catch (t) {}
    var s = {
            h: this.hash,
            c: e
        },
        n = "";
    for (var a in s) n += a + "=" + encodeURIComponent(s[a]) + "&";
    t += "?" + (n = n.replace(/&$/, "")), window[e] = function(t) {
        var e = i.params;
        i.timestamp = e.t = t.t, i.ip = e.ip = t.ip, i.vid = e.vid = t.vid, e.et = "view", i.viewTime = Math.floor((new Date).getTime() / 1e3), t.premium || i.banner.showWatermark(), r || i.trackView(e)
    };
    var o = document.createElement("script");
    o.src = t, document.getElementsByTagName("head")[0].appendChild(o)
}, Stats.prototype.trackView = function(t) {
    delete t.mp, delete t.eid, delete t.elt;
    var e = [];
    e.push(t), this.sendSQSRequest(e)
}, Stats.prototype.trackEvent = function(t, i) {
    var r = this;
    t.addEventListener("click", function(t) {
        var e = r.getCurrentSlideFromOverflow(i);
        e && r.plan("click", e, t), r.plan("click", i, t)
    })
}, Stats.prototype.getCurrentSlideFromOverflow = function(t) {
    return t && t.properties && t.properties.showOnAllSlides ? t.slide.banner.currentSlide : !!(t && t.menu && t.menu.properties && t.menu.properties.showOnAllSlides) && t.menu.slide.banner.currentSlide
}, Stats.prototype.sendSQSRequest = function(t) {
    this.sendData(this.sqsURL + "?Action=SendMessage&MessageBody=" + encodeURIComponent(JSON.stringify(t)))
}, Stats.prototype.sendData = function(t) {
    if (!t) return !1;
    var e = new XMLHttpRequest;
    e.open("GET", t, !0), e.send()
}, Stats.prototype.getStatsRequestUrl = function() {
    if (window.bannerConfig.env) {
        if ("live" === window.bannerConfig.env) return "//stats.bannersnack.com/info/";
        if ("dev" === window.bannerConfig.env) return "//stats-dev.bannersnack.net/info/";
        if ("local" === window.bannerConfig.env) return "//stats-dev.bannersnack.net/info/"
    }
    return "//stats.bannersnack.com/info/"
}, Stats.prototype.getElementType = function(t) {
    if (!t) return !1;
    var e = t.displayData && t.displayData.type;
    if ("slide" == e) return e;
    if ("layer" == e) {
        var i = t.displayData && t.displayData.layerType;
        return i || !1
    }
    return t.itemIndex && t.menu ? "menuItem" : "banner"
}, BaseDisplay.prototype = new window.EventDispatcher, BaseDisplay.prototype.constructor = window.EventDispatcher, BaseDisplay.prototype.container = null, BaseDisplay.prototype.displayContainer = null, BaseDisplay.prototype.properties = null, BaseDisplay.prototype.displayData = null, BaseDisplay.prototype.buildTimeouts = [], BaseDisplay.prototype.init = function(t) {
    return this.displayData = t, this.displayData.properties = this.parseProps(this.displayData.properties), this.trigger("init"), this
}, BaseDisplay.prototype.parseProps = function(t) {
    for (var e, i = ["buildIn", "buildOut", "transition"], r = 0; e = i[r]; r++)
        if (t[e]) switch (t[e].tween) {
            case "Bounce":
            case "Elastic":
                "scale" !== t[e].type && "slide" !== t[e].type || (t[e].type += t[e].tween, "Elastic" === t[e].tween && (t[e].ease = "easeOut")), t[e].tween = ""
        }
    return t
}, BaseDisplay.prototype.render = function() {}, BaseDisplay.prototype.reset = function() {
    var t, e;
    for (window.eff.clearAll(this.container), t = 0; e = this.buildTimeouts[t]; t++) clearTimeout(e);
    for (this.buildTimeouts = [], this.transform("none"), this.webkitTransform("translate3d(0,0,0)"), this.setStyle(this.container, "x,y,width,height", "px"), this.container.style.opacity = "1", this.container.style.display = "", this.container.style.filter = "", this.container.style["-webkit-filter"] = "", this.container.style.animation = "", this.container.style["-webkit-animation"] = "", t = 0; e = this.buildTimeouts[t]; t++) clearTimeout(e);
    if (this.buildTimeouts = [], this.displayContainer) {
        var i = void 0 !== this.properties.opacity ? this.properties.opacity : 100;
        this.displayContainer.style.opacity = i / 100
    }
}, BaseDisplay.prototype.createMainContainers = function(t, e, i) {
    this.container = this.createElement("div", t), this.effHelper = this.createElement("div", "eff-helper"), this.displayContainer = this.createElement(i || "div", e), this.container.appendChild(this.effHelper), this.effHelper.appendChild(this.displayContainer)
}, BaseDisplay.prototype.applyActions = function(s, t) {
    var n = this;
    if (!s || !t) return !1;
    if ("none" === s.type) return !1;
    var e = "pointer";
    void 0 !== s.useHandCursor && !1 === s.useHandCursor && (e = ""), t.style.cursor = e, t.addEventListener(s.event, function(t) {
        if (t.clickFlag) return t.clickFlag = !1;
        if (s.disabled) return !1;
        if (t.clickFlag = this, "gotoSlide" === s.type) {
            var e = n.slide.getBuildOutTime();
            e && (s.disabled = !0, setTimeout(function() {
                s.disabled = !1
            }, e)), null === s.slideOrUrl && (s.slideOrUrl = "next");
            var i = n.slide.banner.currentSlide;
            switch (s.slideOrUrl) {
                case "first":
                    n.slide.banner.preload.assets(null, n.slide.getFirstSlide(), n.slide.banner.config), i.buildOut(n.slide.getFirstSlide());
                    break;
                case "last":
                    n.slide.banner.preload.assets(null, n.slide.getLastSlide(), n.slide.banner.config), i.buildOut(n.slide.getLastSlide());
                    break;
                case "next":
                    n.slide.banner.preload.assets(null, n.slide.getNextSlide(), n.slide.banner.config), i.buildOut(n.slide.getNextSlide());
                    break;
                case "prev":
                    n.slide.banner.preload.assets(null, n.slide.getPrevSlide(), n.slide.banner.config), i.buildOut(n.slide.getPrevSlide());
                    break;
                default:
                    n.slide.banner.preload.assets(null, i.getSlideByHashOrId(s.slideOrUrl), n.slide.banner.config), i.buildOut(i.getSlideByHashOrId(s.slideOrUrl))
            }
        } else {
            var r = "";
            r = eaUtils.getClickTagValue() ? eaUtils.addProtocolToUrl(eaUtils.getClickTagValue()) : window.clickTag ? eaUtils.addProtocolToUrl(window.clickTag) : s.slideOrUrl, window.open(r, s.target)
        }
    })
}, BaseDisplay.prototype.createElement = function(t, e, i, r, s) {
    var n = s || document.createElement(t);
    return n.setAttribute("class", e), 0 != i && (r || this.container) && (r || this.container).appendChild(n), n.setAttribute("id", eaUtils.getElementUniqueId()), n
}, BaseDisplay.prototype.setStyle = function(t, e, i) {
    i || (i = "");
    var r = {
        x: "left",
        y: "top",
        labelOffsetX: "margin-left",
        labelOffsetY: "margin-top",
        lineHeight: "line-height"
    };
    for (var s in e = e.split(",")) e.hasOwnProperty(s) && (t.style[r[e[s]] || e[s]] = this.properties[e[s]] + i);
    return this
}, BaseDisplay.prototype.getContainer = function() {
    return this.container
}, BaseDisplay.prototype.show = function() {
    return this.container.style.display = "", this
}, BaseDisplay.prototype.hide = function() {
    return this.container.style.display = "none", this
}, BaseDisplay.prototype.hasClass = function(t, e) {
    return !!t && new RegExp("(\\s|^)" + e + "(\\s|$)").test(t.className)
}, BaseDisplay.prototype.removeClass = function(t, e) {
    return this.hasClass(t, e) && (t.className = t.className.replace(new RegExp("(\\s|^)" + e + "(\\s|$)"), " ").replace(/^\s+|\s+$/g, "")), this
}, BaseDisplay.prototype.addClass = function(t, e) {
    return t && (this.hasClass(t, e) || (t.className += (t.className ? " " : "") + e)), this
}, BaseDisplay.prototype.toggleClass = function(t, e) {
    return t && (this.hasClass(t, e) ? this.removeClass(t, e) : this.addClass(t, e)), this
}, BaseDisplay.prototype.applyBackground = function(t, e) {
    var i = eaUtils.getBackgroundCss(e);
    for (var r in i) switch (r) {
        default: t.style[r] = i[r];
        break;
        case "background-image":
                if ("lgrad" === e.type || "rgrad" === e.type)
                    for (var s = 0; s < i[r].length; s++) t.style.backgroundImage = i[r][s];
                else t.style[r] = i[r];
            break;
        case "background":
                for (s = 0; s < i[r].length; s++) t.style.background = i[r][s]
    }
    e && e.type && "image" == e.type && (eaUtils.toggleBackroundClasses(t, e.scaleMode), eaUtils.applyImageSizeOnBackground(t, e))
}, BaseDisplay.prototype.applyBoxShadow = function(t, e) {
    eaUtils.applyCss(t, eaUtils.getBoxShadowCss(e))
}, BaseDisplay.prototype.applyFilters = function(t, e, i, r) {
    eaUtils.applyCss(t, eaUtils.getFiltersCss(e, i, r))
}, BaseDisplay.prototype.getFlipString = function(t) {
    return t ? "scale(" + ("both" === t || "horizontal" === t ? "-1" : "1") + ", " + ("both" === t || "vertical" === t ? "-1" : "1") + ")" : ""
}, BaseDisplay.prototype.getBRadius = function() {
    var t = this.properties,
        e = t.border || {},
        i = 0;
    return "rectangle" === t.type && (void 0 !== e.radius ? i = e.radius : void 0 !== t.bradius && (i = t.bradius)), i
}, BaseDisplay.prototype.getBorderString = function(t) {
    var e = t || this.properties.border || {};
    return void 0 === e.weight || void 0 === e.color ? "" : e.weight + "px solid " + e.color
}, BaseDisplay.prototype.getAnimationEl = function() {
    return this.container
}, BaseDisplay.prototype.playAnimation = function(t) {
    var e = this,
        i = this.getAnimationEl(),
        r = this.displayData.properties,
        s = r.buildIn,
        n = r.buildOut;
    if (t = t || 0, !this.properties.showOnAllSlides) {
        var a = this.slide.displayData.properties.duration,
            o = this.slide.displayData.properties.stopSlide,
            l = "none" !== s.type ? s.delay + s.duration : 0,
            p = l + n.delay + n.duration;
        ("instant" === n.type && a < p || n && !o && a < l) && (n = null)
    }
    s && "none" != s.type ? (this.buildTimeouts.push(setTimeout(function() {
        e.trigger("buildInStart")
    }, 1e3 * s.delay)), "instant" === s.type && 0 < s.delay && (i.style.display = "none", this.buildTimeouts.push(setTimeout(function() {
        i.style.display = ""
    }, 1e3 * (s.delay + t)))), s.onAnimationEnd = function() {
        n && "none" != n.type && (e.buildTimeouts.push(setTimeout(function() {
            e.trigger("buildOutStart")
        }, 1e3 * n.delay)), window.eff.animate(i, n, "buildOut"), e.buildTimeouts.push(setTimeout(function() {
            e.trigger("buildOutEnd"), i.style.display = "none"
        }, 1e3 * (n.duration + n.delay))))
    }, window.eff.animate(i, s, "buildIn", t), this.buildTimeouts.push(setTimeout(function() {
        e.trigger("buildInEnd")
    }, 1e3 * (s.duration + s.delay + t)))) : n && "none" != n.type && (this.buildTimeouts.push(setTimeout(function() {
        e.trigger("buildOutStart")
    }, 1e3 * (n.delay + t))), window.eff.animate(i, n, "buildOut", t), this.buildTimeouts.push(setTimeout(function() {
        e.trigger("buildOutEnd"), i.style.display = "none"
    }, 1e3 * (n.duration + n.delay + t))))
}, BaseDisplay.prototype.transform = function(t, e) {
    e || (e = this.container), e.style["-webkit-transform"] = t, e.style["-o-transform"] = t, e.style["-ms-transform"] = t, e.style["-moz-transform"] = t, e.style.transform = t
}, BaseDisplay.prototype.webkitTransform = function(t, e) {
    e || (e = this.container), e.style["-webkit-transform"] = t
}, BaseDisplay.prototype.createActionProperties = function(t) {
    var e = t || this.properties && this.properties.actions && this.properties.actions[0];
    if (!e) return !1;
    var i = "";
    if ("gotoURL" == e.type) {
        if (!(i = e.url)) return !1; - 1 == i.indexOf("://") && (i = "http://" + i)
    }
    return {
        event: e.event,
        slideOrUrl: "gotoSlide" == e.type ? e.slide : i,
        type: e.type,
        target: e.target,
        useHandCursor: e.useHandCursor
    }
}, BaseDisplay.prototype.applyExtraPropertiesForGradients = function(t) {
    if ("string" != typeof this.properties.backgroundColor) {
        var e = this.properties.backgroundColor.type,
            i = this.properties.border ? this.properties.border.weight : 0;
        if ("lgrad" === e || "rgrad" === e) {
            var r = "-" + i + "px",
                s = "calc(100% + " + 2 * i + "px)";
            eaUtils.applyCss(t, {
                backgroundPosition: r + " " + r,
                backgroundSize: s + " " + s
            })
        }
    }
}, BannerDisplay.prototype = new BaseDisplay, (BannerDisplay.prototype.constructor = BannerDisplay).prototype.currentSlide = null, BannerDisplay.prototype.lastSlide = null;
var scripts = document.getElementsByTagName("script");

function ButtonDisplay() {
    BaseDisplay.call(this)
}

function ClipartDisplay() {
    BaseDisplay.call(this)
}

function ImageDisplay() {
    BaseDisplay.call(this)
}

function ShapeDisplay() {
    BaseDisplay.call(this)
}

function SlideDisplay() {
    this.banner = null, this.rendered = !1, this._buildOutTimeout = null, this.container = null, this.elements = [], this.LOOP_COUNT_FOREVER = 0
}

function SvgDisplay() {
    BaseDisplay.call(this)
}

function TextDisplay() {
    BaseDisplay.call(this)
}

function EmbedCanvas() {
    EventDispatcher.call(this);
    var t = this;
    this.initBanner = function() {
        t.banner.init(t.json.banner, t.bannerContainer, t.config, t.preload), (!t.config.video && !t.config.pdf || t.config.autoPlay || void 0 === t.config.autoPlay) && t.banner.play(), t.inited = !0
    }
}
BannerDisplay.prototype.jsFileSrc = scripts[scripts.length - 1].src, BannerDisplay.prototype.init = function(t, e, i, r) {
    var s = this;
    if (this.container = e, this.displayContainer = this.createElement("div", "bs-helper"), this.container.appendChild(this.displayContainer), this.properties = t.properties, this.config = i, this.startSlide = parseInt(i.startSlide) || 0, this.noAnimation = Boolean(i.noAnimation) || !1, this.showOnlyOneSlide = Boolean(i.showOnlyOneSlide) || !1, this.preload = r, !window.bannerConfig.resourcesUrl) {
        var n = this.jsFileSrc.split("/");
        n = n.slice(0, n.indexOf("js")).join("/"), window.bannerConfig.resourcesUrl = n
    }
    this.setStyle(this.container, "width,height", "px"), this.setStyle(this.displayContainer, "width,height", "px");
    var a = this.properties.backgroundColor || {};
    (this.properties.width < 2 || this.properties.height < 2) && (a.useBorder = !1), a.useBorder && (this.displayContainer.style.left = "-1px", this.displayContainer.style.top = "-1px"), this.applyBackground(this.container, a), this.applyActions(this.createActionProperties(), this.container), BaseDisplay.prototype.init.call(this, t), this.initSlides(t.elements), this.container.addEventListener("click", function() {
        s.statsPresent && !s.stats.isBlockedDomain(document.referrer) && s.stats.launch()
    });
    var o = eaUtils.getProportion(this.properties.width, this.properties.height);
    window.addEventListener("resize", function() {
        o = eaUtils.getProportion(s.properties.width, s.properties.height), s.container.style.transform = "scale(" + o.proportion + ")"
    }), this.properties.transform = "scale(" + o.proportion + ")", this.properties.transformOrigin = "0 0 0", this.setStyle(this.container, "transform,transformOrigin")
}, BannerDisplay.prototype.showImageWatermark = function() {
    var t = document.createElement("div");
    t.setAttribute("class", "wtm"), document.getElementById("bs").appendChild(t);
    var e = 'div.wtm {position: absolute;right: 0;bottom: 0;z-index: 99999;background: url("' + window.bannerConfig.resourcesUrl + '/images/watermark.png"); width: 87px; height: 19px;}div.wtm:hover {cursor: pointer}';
    eaUtils.addCSSById(e, "bswmimg"), this._addClickWatermarkListener(t)
}, BannerDisplay.prototype.showWatermark = function() {
    var t = "11px",
        e = "normal",
        i = "Arial, sans-serif",
        r = "400",
        s = "pointer",
        n = "#fff",
        a = "rgba(100, 100, 100, .8)",
        o = "#090300",
        l = "10px",
        p = "0",
        d = "1",
        c = "opacity .25s",
        h = "0",
        u = "-68px",
        f = "0",
        y = "absolute",
        g = "999",
        b = "left",
        m = "left",
        w = "absolute",
        v = "0",
        S = "nowrap",
        C = "22px",
        x = "4px 0",
        k = "4px 4px 4px 0",
        O = "6px",
        D = document.createElement("div"),
        E = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
        A = document.createElementNS("http://www.w3.org/2000/svg", "path"),
        B = document.createElementNS("http://www.w3.org/2000/svg", "path"),
        T = document.createElement("div"),
        U = document.createElement("div");
    A.setAttribute("d", "M3.5,0l15.2,0.5c2.9,0.1,4.5,1.2,4,4l-0.9,5.1c-0.1,0.6-0.2,1.1-0.4,1.7c-0.6,2.1-7.9-7.4-10-6.8L9.2,18.2l-3.7,1.1c-2.2,0.7-3.1-1-3.3-2.5L0.1,4C-0.3,1.2,0.6-0.1,3.5,0z"), B.setAttribute("d", "M27.3,17.2c-4.7-4.9-9.3-9.5-14.1-13.8h0c-0.2-0.2-0.5-0.3-0.8-0.4c-0.7-0.1-1.6,0.3-2,1.3C9.1,7.2,9.2,19.9,9.1,23.8c0,0.6-0.1,1.1,0,1.6c0.7,0,1.9,0.2,2.2,0l3.7-4.3c0.7,1.8,2.2,6,3.2,8.8c0.3,0.7,1,1,1.7,0.8c0.8-0.8,5.4-1.9,5.6-1.9c-1.2-2.7-3.9-6.9-4.9-9.8l5.6,0.5c0.3,0.1,0.7-0.5,1-1.1C27.5,18.1,27.6,17.6,27.3,17.2z M24.9,18c-1-0.1-3.3-0.3-5.7-0.5l-0.6,0l0.2,0.6l5.1,10c-1.8,0.4-3.2,0.9-4.3,1.6c0-0.1-0.1-0.2-0.1-0.3c-0.1-0.2-0.2-0.4-0.2-0.6c-0.1-0.2-0.2-0.4-0.3-0.7c0-0.1-0.1-0.2-0.1-0.2c-0.9-2.2-2.1-5.7-3-7.6c-0.3-0.7-0.7-0.9-1-0.8c-0.1,0-0.2,0.1-0.3,0.2c-0.9,1.2-2.3,3.5-2.6,4.1l-1.5-0.4c-0.3-5.8,0.5-10.9,1.2-16.9c0.2-1.5,1.3-1.1,2.3-0.7c2.7,3.5,10.9,10.6,11.3,11.6C25.2,17.6,25.3,18,24.9,18z"), T.innerText = "bannersnack", U.innerText = "Create banners the Snack way", E.appendChild(A), E.appendChild(B), D.appendChild(E), D.appendChild(T), document.getElementById("bs").appendChild(D), D.setAttribute("style", "background-color: " + a + ";bottom: " + h + ";color: " + n + ";cursor: " + s + ";fill: " + n + ";font-family: " + i + ";font-size: " + t + ";font-style: " + e + ";font-weight: " + r + ";position: " + y + ";right: " + u + ";z-index: " + g + ";"), E.setAttribute("version", "1.1"), E.setAttribute("xmlns", "http://www.w3.org/2000/svg"), E.setAttribute("xmlns:xlink", "http://www.w3.org/a999/xlink"), E.setAttribute("width", "27"), E.setAttribute("height", "31"), E.setAttribute("x", "0"), E.setAttribute("y", "0"), E.setAttribute("viewBox", "0 0 27.6 30.9"), E.setAttribute("xml:space", "preserve"), E.setAttribute("style", "enable-background: new 0 0 27.6, 30.9;float: " + b + ";height: " + C + ";padding: " + x + ";width: " + C + ";"), T.setAttribute("style", "float: " + m + ";padding: " + k + ";"), U.setAttribute("style", "background-color: " + o + ";bottom: " + T.clientHeight + "px;font-size: " + l + ";filter: alpha(opacity=" + 100 * p + ");opacity: " + p + ";padding: " + O + "; position: " + w + ";right: " + v + ";-webkit-transition: " + c + ";-moz-transition: " + c + ";-o-transition: " + c + ";transition: " + c + ";white-space: " + S + ";"), this._addClickWatermarkListener(D), D.addEventListener("mouseenter", function() {
        D.style.right = f, D.appendChild(U), setTimeout(function() {
            U.style.opacity = d
        }, 250)
    }), D.addEventListener("mouseleave", function() {
        D.style.right = u, U.parentNode.removeChild(U), U.style.opacity = p, setTimeout(function() {
            U.style.opacity = p
        }, 250)
    })
}, BannerDisplay.prototype._addClickWatermarkListener = function(t) {
    var i = this;
    t.addEventListener("click", function(t) {
        var e = "//www.bannersnack.com/?utm_source=freebanner&utm_medium=watermark1&utm_content=" + i.properties.width + "x" + i.properties.height + "&utm_campaign=BannerSnackEmbed";
        window.open(e, "_blank"), t.stopPropagation()
    })
}, BannerDisplay.prototype.initSlides = function(t) {
    this.slides = [];
    var e, i, r, s, n = [],
        a = {
            properties: {},
            elements: []
        };
    for (e = 0; i = t[e]; e++) "slide" === i.type ? n.push(i) : (i.properties && (i.properties.showOnAllSlides = !0), a.elements.push(i));
    for (this.overflowSlide = new SlideDisplay, this.overflowSlide.isOverflowSlide = !0, (this.overflowSlide.banner = this).overflowSlide.init(a, this.displayContainer), e = 0; s = n[e]; e++)(r = new SlideDisplay).banner = this, r.init(s, this.displayContainer), this.slides.push(r)
}, BannerDisplay.prototype.getWidth = function() {
    return this.properties.width
}, BannerDisplay.prototype.getHeight = function() {
    return this.properties.height
}, BannerDisplay.prototype.play = function() {
    this.overflowSlide.render(), this.loopsPlayed = 1, this.slides[this.startSlide] && this.slides[this.startSlide].play(null, !0)
}, BannerDisplay.prototype.createActionProperties = function() {
    var t = eaUtils.getClickTagValue();
    t || (t = window.clickTag || window.clickTAG || this.config && this.config.clickTag);
    var e = {
        event: "click",
        slideOrUrl: "",
        type: "gotoURL",
        target: "_blank",
        useHandCursor: !0
    };
    if (t) return e.slideOrUrl = eaUtils.addProtocolToUrl(t), e;
    var i = this.properties;
    return !!i && (!(!i.bannerUrl || "http://" === i.bannerUrl || "https://" === i.bannerUrl) && (e.slideOrUrl = eaUtils.addProtocolToUrl(i.bannerUrl), e.target = i.urlTarget, e.useHandCursor = i.useHandCursor, e))
}, ButtonDisplay.prototype = new BaseDisplay, (ButtonDisplay.prototype.constructor = ButtonDisplay).prototype.getHoverBackgroundColor = function() {
    var t = JSON.parse(JSON.stringify(this.properties.backgroundColor));
    switch (t.type) {
        case "solid":
            t.scolor = eaUtils.generateLighterColor(t.scolor, 10);
            break;
        case "rgrad":
        case "lgrad":
            for (var e = t.gradColors, i = 0; i < e.length; i++) e[i].c = eaUtils.generateLighterColor(e[i].c, 10)
    }
    return t
}, ButtonDisplay.prototype.getBackgroundHoverCss = function(t) {
    var e = eaUtils.getBackgroundCss(t),
        i = "";
    for (var r in e) switch (r) {
        default: e[r] && (i += r + ": " + e[r] + " !important;");
        break;
        case "background-image":
                for (var s = 0; s < e[r].length; s++) i += "background-image:" + e[r][s] + " !important;"
    }
    return i
}, ButtonDisplay.prototype.getBorderColorHoverCss = function(t) {
    if (!t) return "";
    var e = eaUtils.extractRGBA(t),
        i = eaUtils.rgba2hex(e, !1);
    return "border-color: " + eaUtils.hex2rgba(eaUtils.generateLighterColor(i, 10), e.a) + " !important;"
}, ButtonDisplay.prototype.init = function(t) {
    var e = t.properties;
    this.createMainContainers("element", "bs-btn btn" + e.id), "string" == typeof e.backgroundColor && (e.backgroundColor = {
        type: "solid",
        scolor: e.backgroundColor
    });
    var i = e.border || {};
    if (e["border-radius"] = e.border && e.border.radius ? e.border.radius : e.borderRadius, (this.properties = e).localUrl && -1 !== e.localUrl.indexOf(".svg")) this.textContainer = this.createElement("div", "bs-btn-label image-crop", !0, this.displayContainer), this.textContainer.style.backgroundImage = "url(images/" + e.localUrl + ")", this.applyFilters(this.textContainer, null, null, e.labelShadow), i.weight && this.applyExtraPropertiesForGradients(this.displayContainer);
    else if (this.textContainer = this.createElement("label", "bs-btn-label", !0, this.displayContainer), this.textContainer.textContent = e.buttonLabel, e["line-height"] = e.height - (i.weight ? 2 * i.weight : 0), this.setStyle(this.textContainer, "line-height,labelOffsetX,labelOffsetY", "px"), ("string" != typeof e.labelStyle.fontSize || "string" == typeof e.labelStyle.fontSize && -1 === e.labelStyle.fontSize.indexOf("px")) && (e.labelStyle.fontSize = e.labelStyle.fontSize + "px"), ("string" != typeof e.labelStyle.letterSpacing || "string" == typeof e.labelStyle.letterSpacing && -1 === e.labelStyle.letterSpacing.indexOf("px")) && (e.labelStyle.letterSpacing = e.labelStyle.letterSpacing + "px"), "string" == typeof e.labelStyle.fontFamily && -1 === e.labelStyle.fontFamily.indexOf('"') && (e.labelStyle.fontFamily = '"' + e.labelStyle.fontFamily + '"'), eaUtils.applyCss(this.textContainer, e.labelStyle), eaUtils.applyCss(this.textContainer, eaUtils.getTextShadowCss(e.labelShadow)), i.weight) {
        var r = JSON.parse(JSON.stringify(i));
        r.color = "transparent", eaUtils.applyCss(this.textContainer, {
            left: "0",
            border: this.getBorderString(r)
        }), this.applyExtraPropertiesForGradients(this.displayContainer)
    }
    eaUtils.applyCss(this.displayContainer, eaUtils.getBoxShadowCss(e.dropShadow)), this.displayContainer.style.border = this.getBorderString(), this.applyBackground(this.displayContainer, e.backgroundColor);
    var s = ".bs-btn.btn" + e.id,
        n = "bs-btn" + e.id,
        a = s + ":hover{" + this.getBackgroundHoverCss(this.getHoverBackgroundColor()) + this.getBorderColorHoverCss(i.color) + "}";
    eaUtils.addCSSById(a, n), this.reset();
    var o = this.createActionProperties();
    return o && "click" === o.event && !o.useHandCursor && this.addClass(this.displayContainer, "no-hand-cursor"), this.slide.banner.statsPresent && this.slide.banner.stats.trackEvent(this.container, this), this.applyActions(o, this.container), BaseDisplay.prototype.init.call(this, t)
}, ButtonDisplay.prototype.reset = function() {
    BaseDisplay.prototype.reset.call(this), this.setStyle(this.displayContainer, "width,height,border-radius", "px")
}, ClipartDisplay.prototype = new BaseDisplay, ClipartDisplay.prototype.constructor = BaseDisplay, ClipartDisplay.prototype.init = function(t) {
    if (this.properties = t.properties, this.clipart = this.properties.svgObject, this.createMainContainers("element", "bs-clipart"), this.transformContainer = this.createElement("div", "transform-container"), this.displayContainer.parentNode.appendChild(this.transformContainer), this.transformContainer.appendChild(this.displayContainer), this.displayContainer.setAttribute("id", "ce-" + eaUtils.getUniqueId()), this.clipart.attributes && this.clipart.attributes["data-height"]) {
        var e = parseFloat(this.clipart.attributes["data-height"]);
        for (var i in this.clipart.children) this.clipart.children[i].attributes && this.clipart.children[i].attributes.transform && 0 != e && (this.clipart.children[i].attributes.transform = "scale(" + (this.properties.height / e).toFixed(3) + ")")
    }
    this.makeClipartItem(this.clipart, this.displayContainer), this.applyFilters(this.displayContainer, !1, this.properties.blur, this.properties.dropShadow), this.transformContainer.style.height = "100%", this.transformContainer.style.width = "100%";
    var r = this.getFlipString(this.properties.flip);
    if (this.transform("translateZ(0) rotate(" + this.properties.rotation + "deg) " + r, this.transformContainer), this.reset(), this.slide.banner.statsPresent) {
        var s = this.displayContainer.querySelector(".actionMask") ? this.displayContainer.querySelector(".actionMask") : this.displayContainer;
        this.slide.banner.stats.trackEvent(s, this)
    }
    return this.applyActions(this.createActionProperties(), this.displayContainer.querySelector(".actionMask")), BaseDisplay.prototype.init.call(this, t)
}, ClipartDisplay.prototype.makeClipartItem = function(t, e) {
    var i, r, s = this,
        n = {
            preserveAspectRatio: "none",
            version: "1.1",
            width: "100%",
            height: "100%",
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            "xml:space": "preserve"
        },
        a = document.createElementNS("http://www.w3.org/2000/svg", t.type);
    if ("svg" == t.type)
        for (i in n) a.setAttribute(i, n[i]);
    for (i in -1 < ["ellipse", "image", "line", "path", "polygon", "polyline", "rect", "use", "circle"].indexOf(t.type) && a.setAttribute("fill", this.properties.fillColor), t.attributes)
        if ("fill" == i && "url" == t.attributes[i].slice(0, 3)) {
            var o = t.attributes[i].slice(5).slice(0, -1);
            a.setAttribute(i, "url(#" + o + this.displayContainer.getAttribute("id") + ")")
        } else r = "className" === i ? "class" : i, a.setAttribute(r, t.attributes[i]);
    "pattern" == t.type && a.setAttribute("id", t.attributes.id + this.displayContainer.getAttribute("id")), e.appendChild(a), t.children && t.children.forEach(function(t) {
        s.makeClipartItem(t, this)
    }, a)
}, ImageDisplay.prototype = new BaseDisplay, ImageDisplay.prototype.constructor = BaseDisplay, ImageDisplay.prototype.init = function(t) {
    this.triggerReadyOnRender = !1, this.properties = t.properties;
    var e, i = this.properties;
    this.createMainContainers("element", "bs-image image-" + i.scaleMode), this.transformContainer = this.createElement("div", "transform-container"), this.displayContainer.parentNode.appendChild(this.transformContainer), this.transformContainer.appendChild(this.displayContainer);
    var r, s, n = window.bannerConfig;
    switch (n.hqImages && this.properties.hqUrl ? e = this.properties.hqUrl : this.properties.localUrl ? (e = "images/" + this.properties.localUrl, n.embedUrl && (e = n.embedUrl + e)) : e = i.url && -1 != i.url.indexOf("//") ? i.url : n.photosUrl + i.url, this.displayContainer.style.backgroundImage = "url(" + e + ")", this.applyFilters(this.displayContainer, i.adjustColor, i.blur, i.dropShadow), i.verticalAlign) {
        case "top":
            r = "0";
            break;
        case "middle":
            r = "50%";
            break;
        case "bottom":
            r = "100%"
    }
    switch (i.horizontalAlign) {
        case "left":
            s = "0";
            break;
        case "center":
            s = "50%";
            break;
        case "right":
            s = "100%"
    }
    if (this.displayContainer.style.backgroundPosition = s + " " + r, "tile" == i.scaleMode) {
        var a = i.contentScale;
        this.displayContainer.style.backgroundSize = a / 100 * i.oWidth + "px", this.displayContainer.style.backgroundPositionX = i.contentOffsetX + "%", this.displayContainer.style.backgroundPositionY = i.contentOffsetY + "%"
    }
    this.transformContainer.style.height = "100%", this.transformContainer.style.width = "100%";
    var o = this.getFlipString(i.flip);
    return this.transform("translateZ(0) rotate(" + i.rotation + "deg) " + o, this.transformContainer), this.reset(), this.slide.banner.statsPresent && this.slide.banner.stats.trackEvent(this.displayContainer, this), this.applyActions(this.createActionProperties(), this.displayContainer), BaseDisplay.prototype.init.call(this, t)
}, ShapeDisplay.prototype = new BaseDisplay, (ShapeDisplay.prototype.constructor = ShapeDisplay).prototype.init = function(t) {
    var e = t.properties;
    if (this.properties = e, this.createMainContainers("element", "shape " + e.type), eaUtils.detectIE()) {
        var i = this.createElement("img", "fakeImage");
        i.src = eaUtils.getTransparentImageURL(), this.displayContainer.appendChild(i)
    }
    "line" === e.type && (e.type = "rectangle", e.width = e.len, e.height = e.thick, delete e.len, delete e.thick, this.properties = e), this.container.style.width = e.width + "px", this.container.style.height = e.height + "px";
    var r = this.getBRadius();
    r && (this.displayContainer.style.borderRadius = r + "px"), this.displayContainer.style.border = this.getBorderString(), this.applyBackground(this.displayContainer, e.backgroundColor), this.applyExtraPropertiesForGradients(this.displayContainer), this.displayData = t;
    var s = this.getFlipString(e.flip);
    return this.transform("rotate(" + this.properties.rotation + "deg) " + s, this.displayContainer), this.applyFilters(this.displayContainer, !1, this.properties.blur, this.properties.dropShadow), this.reset(), this.slide.banner.statsPresent && this.slide.banner.stats.trackEvent(this.displayContainer, this), this.applyActions(this.createActionProperties(), this.displayContainer), BaseDisplay.prototype.init.call(this, t)
}, SlideDisplay.prototype = new BaseDisplay, (SlideDisplay.prototype.constructor = SlideDisplay).prototype.init = function(t, e) {
    if (this.isOverflowSlide) this.container = e, this.displayContainer = e, this.resetElements();
    else {
        this.createMainContainers("slide", "slide-inner"), e.appendChild(this.container);
        var i = t.properties;
        this.ah = t.ah, !this.ah && i && (this.ah = i.id), i.duration = parseFloat(i.duration), i.duration < .1 && (i.duration = .1);
        var r = i.transition = i.transition || {
            type: "none",
            delay: 0,
            duration: .1
        };
        this.parseTransition(r), this.applyBackground(this.displayContainer, i.backgroundColor), this.reset()
    }
    return this.banner.statsPresent && this.banner.stats.trackEvent(this.container, this), BaseDisplay.prototype.init.call(this, t)
}, SlideDisplay.prototype.parseTransition = function(t) {
    switch (t.duration = parseFloat(t.duration) || 0, t.delay = parseFloat(t.delay) || 0, t.type) {
        case "slide":
        case "slideBounce":
        case "slideElastic":
            if (!parseInt(t.slideOffset)) switch (t.direction) {
                case "r2l":
                case "l2r":
                    t.slideOffset = this.banner.getWidth();
                    break;
                case "t2b":
                case "b2t":
                    t.slideOffset = this.banner.getHeight()
            }
            break;
        case "flip":
            "cross" === t.crosstype && (t.deg = 180)
    }
}, SlideDisplay.prototype.isFirstSlide = function() {
    return 0 === this.banner.slides.indexOf(this)
}, SlideDisplay.prototype.isLastSlide = function() {
    return this.banner.slides.indexOf(this) === this.banner.slides.length - 1
}, SlideDisplay.prototype.reset = function() {
    window.eff.clearAll(this.container);
    var t = this.displayContainer.style;
    t.zIndex = 0, t.width = "100%", t.height = "100%", t.top = "0", t.left = "0", t.filter = "", t["-webkit-filter"] = "", t.animation = "", t["-webkit-animation"] = "", this.transform("none"), this.resetElements()
}, SlideDisplay.prototype.resetElements = function() {
    for (var t = 0; t < this.elements.length; t++) this.elements[t].reset()
}, SlideDisplay.prototype.play = function(t, e) {
    this.banner.lastSlide = this.banner.currentSlide, this.banner.currentSlide = this, e || this.banner.trigger("changeSlide"), this.rendered ? this.reset() : (this.banner.preload.assets(null, this.getNextSlide(), this.banner.config), this.render()), this.container.style.opacity = 1, this.playSlideAnimation(t)
}, SlideDisplay.prototype.render = function() {
    var t, e, i = this.displayData.elements;
    for (e = 0; e < i.length; e++)(t = this.renderElement(i[e])) && this.elements.push(t);
    if (this.on("buildInStart buildInEnd buildOutStart buildOutEnd", function(t) {
            for (var e = 0; e < this.elements.length; e++) {
                var i = "slide" + t.type.charAt(0).toUpperCase() + t.type.substr(1);
                this.elements[e].trigger(i, this)
            }
        }), this.isOverflowSlide) {
        if (!this.banner.noAnimation)
            for (e = 0; e < this.elements.length; e++) this.elements[e].playAnimation(0);
        this.trigger("buildInStart"), this.trigger("buildInEnd")
    } else this.createElement("div", "slide-hover", !0, this.container);
    this.rendered = !0
}, SlideDisplay.prototype.getDurationToStartSlide = function() {
    var s = this;
    return this.banner.slides.reduce(function(t, e, i) {
        var r;
        return i < s.banner.startSlide ? (r = "none" !== e.displayData.properties.transition.type ? e.displayData.properties.transition.duration : 0, t + e.displayData.properties.duration + r) : t
    }, 0)
}, SlideDisplay.prototype.renderElement = function(t) {
    var e, i = t.properties,
        r = i.buildIn = i.buildIn || {
            type: "none",
            delay: 0,
            duration: 0
        },
        s = i.buildOut = i.buildOut || {
            type: "none",
            delay: 0,
            duration: 0
        };

    function n(t) {
        t.duration = parseFloat(t.duration) || 0, t.delay = parseFloat(t.delay) || 0, "alpha-words" != t.type && "blur-words" != t.type || (t.duration = Math.max(Number(t.duration), Number(t.wordsDuration)))
    }
    if (n(r), n(s), this.isOverflowSlide) {
        var a = this.getDurationToStartSlide(),
            o = r.delay - a;
        r.duration + o < 0 ? (r.type = "none", s.delay -= a - r.duration - r.delay) : r.delay = o
    }
    switch (t.layerType) {
        case "text":
            e = new window.TextDisplay;
            break;
        case "image":
            e = new window.ImageDisplay;
            break;
        case "clipart":
            e = new window.ClipartDisplay;
            break;
        case "button":
            e = new window.ButtonDisplay;
            break;
        case "shape":
            e = new window.ShapeDisplay;
            break;
        case "youtube":
            e = new window.YoutubeDisplay;
            break;
        case "embed":
            e = new window.EmbedDisplay;
            break;
        case "svg":
            e = new window.SvgDisplay
    }
    if (e) {
        e.slide = this;
        var l = e.init(t).getContainer();
        this.displayContainer.appendChild(l), e.render(), this.isOverflowSlide && (e.container.style.zIndex = 10, e.container.style.webkitTransform = "translate3d(0, 0, 0)")
    }
    return e
}, SlideDisplay.prototype.getNextSlide = function(t) {
    t || (t = this.banner.currentSlide);
    var e = this.banner.slides,
        i = e.indexOf(t);
    return i + 1 >= e.length ? this.banner.slides[0] : this.banner.slides[i + 1]
}, SlideDisplay.prototype.getPrevSlide = function(t) {
    t || (t = this.banner.currentSlide);
    var e = this.banner.slides.indexOf(t);
    return e - 1 < 0 ? this.banner.slides[this.banner.slides.length - 1] : this.banner.slides[e - 1]
}, SlideDisplay.prototype.getFirstSlide = function() {
    return this.banner.slides[0]
}, SlideDisplay.prototype.getLastSlide = function() {
    return this.banner.slides[this.banner.slides.length - 1]
}, SlideDisplay.prototype.playSlideAnimation = function(t) {
    clearTimeout(this._buildOutTimeout);
    var e, i, r = this.getAnimationEl(),
        s = this,
        n = this.displayData.properties,
        a = this.banner.lastSlide ? this.banner.lastSlide.container : null,
        o = this.banner.slides.length,
        l = 0;
    for (e = 0; e < this.banner.slides.length; e++)(i = this.banner.slides[e].container).style.zIndex = 0, i.style.display = "none";
    if (this.container.style.display = "", this.container.style.zIndex = "1", this.trigger("buildInStart"), t && "none" !== t.type && !this.banner.noAnimation && 1 < o ? (this.addClass(this.container, "buildin"), l = parseFloat(t.duration) || 0, a && (a.style.display = ""), "hide" !== t.crosstype ? window.eff.animate(r, t, "buildIn") : a && (a.style.zIndex = "2"), setTimeout(function() {
            s.removeClass(s.container, "buildin"), s.trigger("buildInEnd")
        }, 1e3 * t.duration)) : this.trigger("buildInEnd"), n.stopSlide || this.banner.showOnlyOneSlide || (this._buildOutTimeout = setTimeout(function() {
            s.buildOut()
        }, 1e3 * (l + n.duration))), !this.banner.noAnimation)
        for (e = 0; e < this.elements.length; e++) this.elements[e].playAnimation(l)
}, SlideDisplay.prototype.buildOut = function(t) {
    this._buildOutTimeout && clearTimeout(this._buildOutTimeout);
    var e = this.banner.slides.length,
        i = this.displayData.properties.transition,
        r = this;
    r.trigger("buildOutStart");
    var s = null;
    if (i && "none" !== i.type && 1 < e) {
        if (r.addClass(r.container, "buildout"), "show" !== i.crosstype) {
            var n = eaUtils.cloneObject(i);
            window.eff.animate(this.getAnimationEl(), n, "buildOut")
        }
        s = setTimeout(function() {
            r.banner.currentSlide !== r && (r.container.style.display = "none"), r.removeClass(r.container, "buildout"), r.trigger("buildOutEnd")
        }, 1e3 * i.duration)
    } else r.trigger("buildOutEnd");
    t || (t = this.getNextSlide()), t === this && s && (clearTimeout(s), r.removeClass(r.container, "buildout"), r.trigger("buildOutEnd")), void 0 !== this.banner.properties.loopCount && (this.banner.loopsPlayed <= this.banner.properties.loopCount || this.banner.properties.loopCount === this.LOOP_COUNT_FOREVER) ? r.isLastSlide() ? (this.banner.loopsPlayed++, (this.banner.loopsPlayed <= this.banner.properties.loopCount || this.banner.properties.loopCount === this.LOOP_COUNT_FOREVER) && t.play(eaUtils.cloneObject(i))) : t.play(eaUtils.cloneObject(i)) : void 0 === this.banner.properties.loopCount && t.play(eaUtils.cloneObject(i))
}, SlideDisplay.prototype.getBuildOutTime = function() {
    var t = this.displayData.properties.transition;
    return t && "none" !== t.type ? 1e3 * t.duration : 0
}, SlideDisplay.prototype.getSlideByHashOrId = function(t) {
    if (!t) return !1;
    for (var e = this.banner.slides, i = 0; i < e.length; i++) {
        var r = e[i].displayData.properties;
        if (t === e[i].ah || r && t === r.id) return e[i]
    }
    return !1
}, SvgDisplay.prototype = new BaseDisplay, SvgDisplay.prototype.constructor = BaseDisplay, SvgDisplay.prototype.init = function(t) {
    this.properties = t.properties, this.createMainContainers("element", "svg");
    var e = (this.properties.localUrl ? "images/" + this.properties.localUrl : window.bannerConfig.s3Url + "files/" + this.properties.url) + this.properties.id,
        i = this.createElement("img", "svg-img", !1, null, window.assetsCache[e]);
    this.displayContainer.appendChild(i);
    var r = this.getFlipString(this.properties.flip);
    return this.transform("translateZ(0) rotate(" + this.properties.rotation + "deg) " + r, this.displayContainer), this.applyFilters(this.displayContainer, this.properties.adjustColor, this.properties.blur, this.properties.dropShadow), this.reset(), this.slide.banner.statsPresent && this.slide.banner.stats.trackEvent(this.displayContainer, this), this.applyActions(this.createActionProperties(), this.displayContainer), BaseDisplay.prototype.init.call(this, t)
}, window.SvgDisplay = SvgDisplay, TextDisplay.prototype = new BaseDisplay, (TextDisplay.prototype.constructor = TextDisplay).prototype.init = function(t) {
    this.properties = t.properties;
    var e = this.properties;
    return this.createMainContainers("element", "text"), this.initCommonProperties(), e.config ? this.initRichText() : this.initSimpleText(), this.reset(), BaseDisplay.prototype.init.call(this, t)
}, TextDisplay.prototype.initCommonProperties = function() {
    var t = this.properties;
    this.transform("rotate(" + this.properties.rotation + "deg)", this.displayContainer), this.setStyle(this.displayContainer, "opacity"), this.setStyle(this.displayContainer, "fontSize", "px");
    var e = this.displayContainer.style;
    e.textAlign = t.alignment, e.lineHeight = t.lineHeight, e.letterSpacing = t.letterSpacing + "px", eaUtils.applyCss(this.displayContainer, eaUtils.getTextShadowCss(this.properties.textShadow)), this.applyFilters(this.displayContainer, !1, this.properties.blur)
}, TextDisplay.prototype.initSimpleText = function() {
    this.text = this.createElement("span", "text-content"), this.displayContainer.appendChild(this.text);
    var t = this.properties;
    this.setStyle(this.displayContainer, "fontWeight,fontStyle,color");
    var e = this.displayContainer.style;
    e.fontFamily = '"' + t.fontFamily + '"', t.textTransform && (e.textTransform = t.textTransform), t.textDecoration && (e.textDecoration = t.textDecoration);
    try {
        this.text.textContent = this.properties.text
    } catch (t) {}
    this.slide.banner.statsPresent && this.slide.banner.stats.trackEvent(this.text, this), this.applyActions(this.createActionProperties(), this.text)
}, TextDisplay.prototype.initRichText = function() {
    this.applyConfigElements()
}, TextDisplay.prototype.applyConfigElements = function() {
    var a = this.properties.text,
        t = this.properties.config,
        o = a.replace(/\n/g, ""),
        l = this;
    t.forEach(function(t) {
        var e = t.offset,
            i = t.length,
            r = t.nodeType,
            s = t.style,
            n = t.children;
        0 === e && i === a.length ? l.displayContainer.appendChild(l.getNode(r, o, s, o, n)) : l.displayContainer.appendChild(l.getNode(r, eaUtils.getTextSubstr(o, e, i), s, o, n))
    })
}, TextDisplay.prototype.attachEventsAndActions = function(t) {
    this.slide.banner.statsPresent && this.slide.banner.stats.trackEvent(t, this), this.applyActions(this.createActionProperties(), t)
}, TextDisplay.prototype.getNode = function(t, e, i, n, r) {
    i || (i = null), n || (n = null), r || (r = null);
    var a = document.createElement(t),
        s = eaUtils.getRichTextStyleString(i);
    if (s && (a.style.cssText = s), "div" === t ? a.className = "row" : "span" === t && this.attachEventsAndActions(a), !r || !r.length) {
        if (e || "div" !== t)
            if ("div" === t) {
                var o = document.createElement("span");
                o.textContent = eaUtils.replaceSpacesWithNbsps(e), a.appendChild(o), this.attachEventsAndActions(o)
            } else a.textContent = eaUtils.replaceSpacesWithNbsps(e);
        else a.appendChild(document.createElement("BR"));
        return a
    }
    var l = this;
    return r.forEach(function(t) {
        var e = t.offset,
            i = t.length,
            r = t.nodeType,
            s = t.style;
        a.appendChild(l.getNode(r, eaUtils.getTextSubstr(n, e, i), s))
    }), a
}, TextDisplay.prototype.reset = function() {
    if (BaseDisplay.prototype.reset.call(this), this.properties.config) var t = this.container.getElementsByClassName("word");
    else t = this.container.getElementsByClassName("text-content")[0].getElementsByTagName("span");
    window.eff.clearWordsTimeout(this.container, t);
    for (var e = 0; e < t.length; e++) {
        var i = t[e].style;
        i.opacity = 1, i.animation = "", i["-webkit-animation"] = ""
    }
}, EmbedCanvas.prototype = new EventDispatcher, (EmbedCanvas.prototype.constructor = EmbedCanvas).prototype.init = function(t, e, i) {
    this.json = e, this.config = i, this.banner = new BannerDisplay, this.bannerContainer = t;
    var r = !i.preview && !i.download;
    if (r) {
        var s = new Stats({
            hash: e.hash,
            userId: e.userId,
            rotatorHash: this.getRotatorHashFromUrl(),
            banner: this.banner,
            currentDomain: document.referrer
        });
        s.track(), this.banner.stats = s
    }
    if (this.banner.statsPresent = r, this.config.video || this.config.pdf) this.initBanner();
    else {
        this.preload = new Preload;
        var n = parseInt(i.startSlide) || 0,
            a = e.banner.elements.filter(function(t) {
                return "slide" === t.type
            });
        this.preload.assets(e.banner, a[n], i, this.initBanner)
    }
}, EmbedCanvas.prototype.showWatermark = function(t) {
    t.printScreen ? this.banner.showImageWatermark() : this.banner.showWatermark()
}, EmbedCanvas.prototype.getRotatorHashFromUrl = function() {
    var t = !1,
        e = window.location.search;
    if (e) {
        var i, r = e.substr(1).split("&");
        for (var s in r)
            if ("rotator_hash" == (i = r[s].split("=", 2))[0]) {
                t = i[1];
                break
            }
    }
    return t
};
