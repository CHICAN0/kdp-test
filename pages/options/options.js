(() => {
    "use strict";
    var e, a = {
        533: (e, a, r) => {
            r(150);
            var o = r(534), t = r(551), _ = r(357), i = r(576), c = r.n(i);
            const saveConfig = (e = !0) => {
                chrome.storage.local.set({
                    defaultRegion: n,
                    defaultType: p
                }), e && (m.text("\u2713 Saved!"), setTimeout((() => {
                    m.text("Save");
                }), 1800));
            }, updateView = () => {
                l.val(n), (0, o.$)(`input[name="location"][value="${p}"]`).prop("checked", !0);
            };
            new URL(window.location.href).searchParams.get("in_popup") && (0, o.$)("body").addClass("popup");
            let n, p, l = (0, o.$)("#regionSelector"), s = (0, o.$)('input[name="location"]'), u = ((0, 
            o.$)('input[name="cache"]'), (0, o.$)("#locationKindle")), d = (0, o.$)("#locationAudiobooks"), b = (0, 
            o.$)('label[for="locationAudiobooks"]'), k = (0, o.$)(".audiobooks-not-supported"), h = (0, 
            o.$)("#clearCache"), m = (0, o.$)("#save"), g = (0, o.$)("#reset"), w = (0, o.$)("#back");
            l.on("change", (e => {
                n = l.val(), _.W.getMainUrlByRegionAndType(n, "audiobooks") ? (k.hide(), d.prop("disabled", !1), 
                b.removeClass("disabled")) : (d.prop("checked") && (p = "kindle", d.prop("checked", !1), 
                u.prop("checked", !0)), k.css({
                    display: "inline"
                }), d.prop("disabled", !0), b.addClass("disabled"));
            })), s.on("change", (e => {
                e.target.checked && (p = e.target.value);
            })), m.on("click", saveConfig), g.on("click", (e => {
                n = "USA", p = "kindle", k.hide(), d.prop("disabled", !1), b.removeClass("disabled"), 
                updateView(), saveConfig();
            })), w.on("click", (e => {
                window.history.back();
            })), h.on("click", (e => {
                const callback = () => {
                    chrome.runtime.lastError ? h.text("Error :(") : h.text("\u2713 Done!"), setTimeout((() => {
                        h.text("Go");
                    }), 1800);
                };
                let a = (0, o.$)('input[name="cache"]:checked').val();
                [ "all", "partial" ].includes(a) && chrome.permissions.request({
                    permissions: [ "browsingData" ]
                }, (e => {
                    if (e) {
                        let e;
                        e = "all" === a ? {
                            originTypes: {
                                unprotectedWeb: !0
                            }
                        } : {
                            origins: [ "https://*.publishingaltitude.com", "https://*.google.com", "https://*.amazon.com", "https://*.amazon.co.uk", "https://*.amazon.de", "https://*.amazon.fr", "https://*.amazon.ca", "https://*.amazon.it", "https://*.amazon.es", "https://*.amazon.in", "https://*.amazon.co.jp", "https://*.amazon.com.au", "https://*.amazon.com.br", "https://*.amazon.com.mx" ]
                        }, h.text("Clearing"), chrome.browsingData.remove(e, {
                            cache: !0,
                            cacheStorage: !0,
                            cookies: !0
                        }, callback);
                    }
                }));
            })), chrome.storage.local.get({
                defaultRegion: "USA",
                defaultType: "kindle"
            }, (e => {
                n = e.defaultRegion, p = e.defaultType, updateView();
            })), (0, t.f)([ c() ]);
        }
    }, r = {};
    function __webpack_require__(e) {
        var o = r[e];
        if (void 0 !== o) return o.exports;
        var t = r[e] = {
            id: e,
            exports: {}
        };
        return a[e].call(t.exports, t, t.exports, __webpack_require__), t.exports;
    }
    __webpack_require__.m = a, e = [], __webpack_require__.O = (a, r, o, t) => {
        if (!r) {
            var _ = 1 / 0;
            for (p = 0; p < e.length; p++) {
                for (var [r, o, t] = e[p], i = !0, c = 0; c < r.length; c++) (!1 & t || _ >= t) && Object.keys(__webpack_require__.O).every((e => __webpack_require__.O[e](r[c]))) ? r.splice(c--, 1) : (i = !1, 
                t < _ && (_ = t));
                if (i) {
                    e.splice(p--, 1);
                    var n = o();
                    void 0 !== n && (a = n);
                }
            }
            return a;
        }
        t = t || 0;
        for (var p = e.length; p > 0 && e[p - 1][2] > t; p--) e[p] = e[p - 1];
        e[p] = [ r, o, t ];
    }, __webpack_require__.n = e => {
        var a = e && e.__esModule ? () => e.default : () => e;
        return __webpack_require__.d(a, {
            a
        }), a;
    }, __webpack_require__.d = (e, a) => {
        for (var r in a) __webpack_require__.o(a, r) && !__webpack_require__.o(e, r) && Object.defineProperty(e, r, {
            enumerable: !0,
            get: a[r]
        });
    }, __webpack_require__.o = (e, a) => Object.prototype.hasOwnProperty.call(e, a), 
    __webpack_require__.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, __webpack_require__.j = 756, (() => {
        var e = {
            756: 0
        };
        __webpack_require__.O.j = a => 0 === e[a];
        var webpackJsonpCallback = (a, r) => {
            var o, t, [_, i, c] = r, n = 0;
            if (_.some((a => 0 !== e[a]))) {
                for (o in i) __webpack_require__.o(i, o) && (__webpack_require__.m[o] = i[o]);
                if (c) var p = c(__webpack_require__);
            }
            for (a && a(r); n < _.length; n++) t = _[n], __webpack_require__.o(e, t) && e[t] && e[t][0](), 
            e[t] = 0;
            return __webpack_require__.O(p);
        }, a = globalThis.webpackChunkkindlespy = globalThis.webpackChunkkindlespy || [];
        a.forEach(webpackJsonpCallback.bind(null, 0)), a.push = webpackJsonpCallback.bind(null, a.push.bind(a));
    })();
    var o = __webpack_require__.O(void 0, [ 576, 522 ], (() => __webpack_require__(533)));
    o = __webpack_require__.O(o);
})();