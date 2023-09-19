(() => {
    "use strict";
    var e, t = {
        192: (e, t, r) => {
            var a = r(150), c = r.n(a), n = r(248), i = r(357), o = r(889), _ = r(534);
            function trackData() {
                (new o.N).trackData();
            }
            self.$ = _.$, n.V.setBackgroundPage(), n.V.addBackgroundListener((function(e, t, r) {
                if (r = i.W.valueOrDefault(r, (function() {})), "http-get-bg" === e.type) {
                    const t = new URLSearchParams(e.data.params || {}).toString();
                    return fetch(e.data.url + (t ? "?" + t : ""), {
                        method: "GET"
                    }).then((e => e.text())).then((e => (r(e), !0))).catch((() => (r(void 0), !0))), 
                    !0;
                }
                "update-browseraction-state" === e.type && (e.inProgress ? c().action.setIcon({
                    path: "/assets/images/128_kdspy_inverted.png"
                }) : e.completed && c().action.setIcon({
                    path: "/assets/images/128_kdspy.png"
                }), r(null));
                "get-current-tab-id" === e.type && r(t.tab.id);
                if ("execute-check-language" === e.type) {
                    const func = () => {
                        let e = document.querySelector(".icp-link-style-2");
                        e.dispatchEvent(new Event("mouseout")), e.dispatchEvent(new Event("mouseover"));
                    };
                    chrome.scripting.executeScript({
                        target: {
                            tabId: t.tab.id
                        },
                        func
                    }, (() => {
                        chrome.runtime.lastError;
                    }));
                }
                if ("execute-language-switch" === e.type) {
                    const func = () => {
                        document.querySelector(".icp-link-style-2").dispatchEvent(new Event("mouseover"));
                    };
                    chrome.scripting.executeScript({
                        target: {
                            tabId: t.tab.id
                        },
                        func
                    }, (() => {
                        chrome.runtime.lastError;
                    }));
                }
                if ("open-chatgpt" === e.type) {
                    const callback = () => {
                        chrome.tabs.create({
                            active: !0,
                            url: "https://chat.openai.com/chat"
                        }, (async t => {
                            await i.W.waitAsync(800), chrome.scripting.executeScript({
                                target: {
                                    tabId: t.id
                                },
                                func: injectChatGptPayload,
                                args: [ e.prompt ]
                            });
                        }));
                    };
                    chrome.permissions.request({
                        origins: [ "https://chat.openai.com/*" ]
                    }, (e => {
                        e && callback();
                    }));
                }
                return !0;
            })), n.V.addAlarmListener("update-tracker", trackData), n.V.createAlarm("update-tracker", 60), 
            self.trackData = trackData;
            const injectChatGptPayload = async e => {
                const waitForElement = e => new Promise((t => {
                    let r = document.querySelector(e);
                    if (r) return void t(r);
                    let a = setInterval((() => {
                        let r = document.querySelector(e);
                        if (0 !== $el.length) return clearInterval(a), void t(r);
                    }), 300);
                })), waitAsync = e => new Promise((t => {
                    setTimeout((() => t()), e);
                }));
                let t;
                for (;;) {
                    t = await waitForElement('textarea[data-id="root"]'), await waitAsync(800);
                    if (document.querySelector('textarea[data-id="root"]') === t) break;
                }
                descriptor = Object.getOwnPropertyDescriptor(t, "value");
                let r = document.createEvent("UIEvents");
                r.initEvent("focus", !1, !1), t.dispatchEvent(r), t.value = e;
                const a = e;
                var c, n, i;
                t.value = a + "#", c = t, n = "value", (i = Object.getOwnPropertyDescriptor(c, n)) && i.configurable && delete c[n], 
                t.value = a, r = document.createEvent("HTMLEvents"), r.initEvent("propertychange", !1, !1), 
                r.propertyName = "value", t.dispatchEvent(r), r = document.createEvent("HTMLEvents"), 
                r.initEvent("input", !0, !1), t.dispatchEvent(r), descriptor && Object.defineProperty(t, "value", descriptor);
            };
            c().runtime.onInstalled.addListener((e => {
                "install" === e.reason ? c().tabs.create({
                    url: "https://www.kdspy.com/get-started/",
                    active: !0
                }) : "update" === e.reason && c().storage.local.set({
                    recentlyUpdated: !0
                });
            }));
        }
    }, r = {};
    function __webpack_require__(e) {
        var a = r[e];
        if (void 0 !== a) return a.exports;
        var c = r[e] = {
            id: e,
            exports: {}
        };
        return t[e].call(c.exports, c, c.exports, __webpack_require__), c.exports;
    }
    __webpack_require__.m = t, e = [], __webpack_require__.O = (t, r, a, c) => {
        if (!r) {
            var n = 1 / 0;
            for (u = 0; u < e.length; u++) {
                for (var [r, a, c] = e[u], i = !0, o = 0; o < r.length; o++) (!1 & c || n >= c) && Object.keys(__webpack_require__.O).every((e => __webpack_require__.O[e](r[o]))) ? r.splice(o--, 1) : (i = !1, 
                c < n && (n = c));
                if (i) {
                    e.splice(u--, 1);
                    var _ = a();
                    void 0 !== _ && (t = _);
                }
            }
            return t;
        }
        c = c || 0;
        for (var u = e.length; u > 0 && e[u - 1][2] > c; u--) e[u] = e[u - 1];
        e[u] = [ r, a, c ];
    }, __webpack_require__.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return __webpack_require__.d(t, {
            a: t
        }), t;
    }, __webpack_require__.d = (e, t) => {
        for (var r in t) __webpack_require__.o(t, r) && !__webpack_require__.o(e, r) && Object.defineProperty(e, r, {
            enumerable: !0,
            get: t[r]
        });
    }, __webpack_require__.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), 
    __webpack_require__.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, __webpack_require__.j = 860, (() => {
        var e = {
            860: 0
        };
        __webpack_require__.O.j = t => 0 === e[t];
        var webpackJsonpCallback = (t, r) => {
            var a, c, [n, i, o] = r, _ = 0;
            if (n.some((t => 0 !== e[t]))) {
                for (a in i) __webpack_require__.o(i, a) && (__webpack_require__.m[a] = i[a]);
                if (o) var u = o(__webpack_require__);
            }
            for (t && t(r); _ < n.length; _++) c = n[_], __webpack_require__.o(e, c) && e[c] && e[c][0](), 
            e[c] = 0;
            return __webpack_require__.O(u);
        }, t = globalThis.webpackChunkkindlespy = globalThis.webpackChunkkindlespy || [];
        t.forEach(webpackJsonpCallback.bind(null, 0)), t.push = webpackJsonpCallback.bind(null, t.push.bind(t));
    })();
    var a = __webpack_require__.O(void 0, [ 576, 522 ], (() => __webpack_require__(192)));
    a = __webpack_require__.O(a);
})();