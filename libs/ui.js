(globalThis.webpackChunkkindlespy = globalThis.webpackChunkkindlespy || []).push([ [ 522 ], {
    988: (e, t, n) => {
        "use strict";
        n.d(t, {
            v: () => InfoBox
        });
        var i = n(248), r = n(357), o = n(534);
        class InfoBox {
            constructor(e, t, n) {
                const a = (0, o.$)(e), s = (0, o.$)("body");
                this.$mount = a, this.pageType = null, i.V.sendMessageToActiveTabAsync({
                    type: "get-type-page"
                }).then((e => {
                    this.pageType = e, "BestSellersPage" !== e && "SearchResultsPage" !== e && "NewReleasesPage" !== e || a.show();
                })), s.on("mouseenter", ".infoBox-icon", (() => {
                    i.V.sendMessageToActiveTab({
                        type: "get-data"
                    }, (({books: e}) => {
                        let {books: i} = t();
                        if ([ "BestSellersPage", "NewReleasesPage" ].includes(this.pageType)) {
                            let t = e.sort(((e, t) => parseInt(e.No) > parseInt(t.No) ? 1 : parseInt(e.No) < parseInt(t.No) ? -1 : 0));
                            a.find(".infoBox-rank--first").text(Math.floor((i[0] && i[0].EstSales || 0) / 15));
                            let n = Math.max(1, Math.floor((t[19] && t[19].EstSales || 0) / 15));
                            a.find(".infoBox-rank--last").text(n);
                        } else if ("SearchResultsPage" === this.pageType) {
                            let e = n(), t = "high";
                            e.avgReviews < 85 && (t = "medium"), e.avgReviews < 40 && (t = "low"), a.find(".infoBox-rank--reviews").text(r.W.addCommas(e.avgReviews)), 
                            a.find(".infoBox-level--reviews").text(t);
                            let i = "high";
                            e.totalResults < 1500 && (i = "medium"), e.totalResults < 500 && (i = "low"), a.find(".infoBox-rank--competition").text(r.W.addCommas(e.totalResults)), 
                            a.find(".infoBox-level--competition").text(i);
                        }
                    }));
                }));
            }
            hide() {
                this.$mount.hide();
            }
            show() {
                this.$mount.show();
            }
        }
    },
    964: (e, t, n) => {
        "use strict";
        n.d(t, {
            m: () => Tabs
        });
        var i = n(248), r = n(357), o = n(534);
        class Tabs {
            constructor(e = "", t = Function.prototype) {
                this.$body = (0, o.$)("body"), this.$tabs = (0, o.$)(e), this.main = e, this.onTabActivated = t, 
                this.defaultOrder = [ "all", "kindle", "book", "audiobook" ], this.setDefault("kindle");
            }
            setTabs(e = [], t = null, n = {}, i = !0) {
                if (Array.isArray(e) || (e = Object.entries(e)), i && e.sort(((e, t) => {
                    let n = e, i = t;
                    return Array.isArray(e) && (n = e[0], i = t[0]), this.defaultOrder.includes(n) && this.defaultOrder.includes(i) ? this.defaultOrder.indexOf(n) - this.defaultOrder.indexOf(i) : this.defaultOrder.includes(n) ? -1 : this.defaultOrder.includes(i) ? 1 : n.localeCompare(i);
                })), e.length) {
                    const i = t ? t.getBookTypes() : {};
                    this.$tabs.empty();
                    for (const [t, a] of e.entries()) {
                        let e, s;
                        Array.isArray(a) ? (e = a[0], s = a[1]) : (e = r.W.toMachineName(a.trim()), s = `${a}`);
                        const l = e.replace(/-\d+$/, "");
                        i[l] && l !== i[l] && (s = /\d+$/.test(a) ? `${i[l]} - ${e.replace(/(.+)-(\d+)$/, "$1 - [$2]")}` : `${i[l]} - ${e}`);
                        let c = (0, o.$)("<div>").addClass("tabs-item").addClass(`data-key-${r.W.toMachineName(e)}`).data("key", r.W.toMachineName(e)).text(s);
                        0 === t && c.addClass("tabs-item--active"), e in n && c.append(`<div class="attention-mark">${n[e]}</div>`), 
                        this.$tabs.append(c);
                    }
                }
            }
            setDefault(e) {
                e = r.W.toMachineName(e), this.default = e, this.$tabs.find(".tabs-item").removeClass("tabs-item--active");
                const t = this.$tabs.find(`.tabs-item.data-key-${e}`);
                t.length > 0 ? t.addClass("tabs-item--active") : this.$tabs.find(".tabs-item").addClass("tabs-item--active");
            }
            setBadges(e) {
                for (let t of Object.keys(e)) {
                    let n = this.$tabs.find(`.tabs-item.data-key-${t}`);
                    n.find(".attention-mark").remove(), n.append(`<div class="attention-mark">${e[t]}</div>`);
                }
            }
            bootstrap() {
                return i.V.sendMessageToActiveTabAsync({
                    type: "get-current-url"
                }).catch((() => "")).then((e => {
                    const t = this;
                    this.$body.off("click", `${this.main} .tabs-item`.trim()), this.$body.on("click", `${this.main} .tabs-item`.trim(), (function(e) {
                        e.preventDefault();
                        const n = (0, o.$)(this);
                        n.siblings().removeClass("tabs-item--active"), n.addClass("tabs-item--active"), 
                        "function" == typeof t.onTabActivated && t.onTabActivated(n.data("key"));
                    }));
                }));
            }
            show() {
                this.$tabs.css("display", "flex");
            }
            hide() {
                this.$tabs.hide();
            }
            static reset() {
                (0, o.$)(".tabs").hide();
            }
        }
    },
    915: (e, t, n) => {
        "use strict";
        n.d(t, {
            u: () => InsightsTab
        });
        var i = n(248), r = n(405);
        const o = 532 == n.j ? '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>' : null;
        class InsightsTab {
            constructor(e) {
                this.pageNum = e, this.type = "", this.data = {}, this.$promptsList = $(".prompts-list"), 
                this.hasPermission = !0;
            }
            loadPrompts() {
                this.$promptsList.empty(), r.N.forEach(((e, t, n) => {
                    const i = e.filter((e => e.type === this.type));
                    0 !== i.length && (0 !== t && this.$promptsList.append('<div class="spacer-horizontal"></div>'), 
                    i.forEach((e => {
                        const t = $(`<div class="prompt" data-id="${e.id}">\n                    <div class="prompt-name"></div>\n                    <button class="copy-button">\n                        <span>Copy</span>\n                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 512 512"><path fill="currentColor" d="M408 480H184a72 72 0 0 1-72-72V184a72 72 0 0 1 72-72h224a72 72 0 0 1 72 72v224a72 72 0 0 1-72 72Z"/><path fill="currentColor" d="M160 80h235.88A72.12 72.12 0 0 0 328 32H104a72 72 0 0 0-72 72v224a72.12 72.12 0 0 0 48 67.88V160a80 80 0 0 1 80-80Z"/></svg>\n                    </button>   \n                    <button class="use-button">\n                        <span>Use prompt</span>\n                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n                            <path fill="currentColor" d="M0.707544 0.710877C0.614841 0.80339 0.541293 0.913279 0.491112 1.03425C0.44093 1.15523 0.4151 1.28491 0.4151 1.41588C0.4151 1.54684 0.44093 1.67653 0.491112 1.7975C0.541293 1.91847 0.614841 2.02836 0.707544 2.12088L4.58754 6.00088L0.707544 9.88088C0.614962 9.97346 0.541523 10.0834 0.491418 10.2043C0.441313 10.3253 0.415524 10.4549 0.415524 10.5859C0.415524 10.7168 0.441313 10.8465 0.491418 10.9674C0.541523 11.0884 0.614962 11.1983 0.707544 11.2909C0.800126 11.3835 0.910037 11.4569 1.031 11.507C1.15197 11.5571 1.28161 11.5829 1.41254 11.5829C1.54347 11.5829 1.67312 11.5571 1.79409 11.507C1.91505 11.4569 2.02496 11.3835 2.11754 11.2909L6.70754 6.70088C6.80025 6.60836 6.8738 6.49847 6.92398 6.3775C6.97416 6.25653 6.99999 6.12684 6.99999 5.99588C6.99999 5.86491 6.97416 5.73523 6.92398 5.61425C6.8738 5.49328 6.80025 5.38339 6.70754 5.29088L2.11754 0.700876C1.73754 0.320876 1.09754 0.320877 0.707544 0.710877Z" />\n                        </svg> \n                    </button>\n                </div>`);
                        t.find(".prompt-name").text(e.name), t.find(".use-button").on("click", (t => {
                            this.usePrompt(e);
                        })), t.find(".copy-button").on("click", (t => {
                            this.copyPrompt(e);
                        })), this.$promptsList.append(t);
                    })));
                }));
            }
            async resolvePrompt(e) {
                const t = await fetch(e.promptUrl), n = await t.text();
                let i = n;
                if ("single" === this.type) i = (0, r.P)(n, {
                    "BOOK TITLE": this.data.title,
                    "BOOK AUTHOR NAME": this.data.author,
                    "BOOK DESCRIPTION": this.data.description
                }); else {
                    const e = this.data.map((e => "* " + e.Title)).join("\n"), t = this.data.map((e => `TITLE: ${e.Title}\nDESCRIPTION: ${e.Description}`)).join("\n\n\n"), o = this.data[0].Category || this.data[0].Author;
                    i = (0, r.P)(n, {
                        "CATEGORY/KEYWORD": o,
                        "BOOK TITLES": e,
                        "BOOK TITLES AND DESCRIPTIONS": t
                    });
                }
                return i;
            }
            usePrompt(e) {
                $(`.prompt[data-id="${e.id}"] .use-button svg`).replaceWith(o), this.resolvePrompt(e).then((e => {
                    i.V.sendMessageToBackground({
                        type: "open-chatgpt",
                        prompt: e
                    }), setTimeout((() => window.close()), 300);
                }));
            }
            async copyPrompt(e) {
                const t = $(`.prompt[data-id="${e.id}"] .copy-button svg`);
                t.replaceWith(o);
                const n = await this.resolvePrompt(e);
                await navigator.clipboard.writeText(n), $(`.prompt[data-id="${e.id}"] .copy-button svg`).replaceWith(t), 
                $(`.prompt[data-id="${e.id}"] .copy-button span`).text("Copied!"), setTimeout((() => {
                    $(`.prompt[data-id="${e.id}"] .copy-button span`).text("Copy");
                }), 1500);
            }
            load(e, t) {
                chrome.permissions.contains({
                    origins: [ "https://chat.openai.com/*" ]
                }, (e => {
                    this.hasPermission = e;
                })), this.data = t, this.type = e, "single" === e ? $("#SingleAiInsightsBack").show() : $("#SingleAiInsightsBack").hide(), 
                this.loadPrompts();
            }
        }
    },
    90: (e, t, n) => {
        "use strict";
        n.d(t, {
            $: () => KeywordAnalysisTab
        });
        var i = n(248), r = n(357), o = n(436), a = n(534);
        class KeywordAnalysisTab {
            constructor(e) {
                if (KeywordAnalysisTab._singletonInstance) return KeywordAnalysisTab._singletonInstance;
                KeywordAnalysisTab._singletonInstance = this, this.pageNum = 1, this.parent = e, 
                this.isPaged = !0, this.prevTableHtml = "", this.analysis = new o.y;
            }
            savePageNum() {
                i.V.sendMessageToActiveTab({
                    type: "save-pageNum",
                    tab: "KeywordAnalysisTab",
                    pageNum: this.pageNum
                });
            }
            loadPageNum(e) {
                var t = this;
                e = r.W.valueOrDefault(e, (function() {})), i.V.sendMessageToActiveTab({
                    type: "get-pageNum",
                    tab: "KeywordAnalysisTab"
                }, (function(n) {
                    t.pageNum = parseInt(n), e();
                }));
            }
            kwdAnalysisListShow() {
                return {
                    info: '<div class="info-item"><span style="font-size:11px">Results:</span><div style="font-size:16px;font-weight:bold;margin-top:-6px;" id="result1">1-20</div></div><div class="info-item"><span style="font-size:11px">Avg. Price:</span><div style="font-size:16px;font-weight:bold; margin-top:-6px;" id="result2">$7.95</div></div><div class="info-item"><span style="font-size:11px">Avg. Sales Rank:</span><div style="font-size:16px;font-weight:bold;margin-top:-6px;" id="result3">4,233</div></div><div class="info-item"><span style="font-size:11px">Avg. Pages:</span><div style="font-size:16px;font-weight:bold;margin-top:-6px;" id="result4">112</div></div><div class="info-item"><span style="font-size:11px">Avg. Rating:</span><div style="font-size:16px;font-weight:bold;margin-top:-6px;" id="result5">4.1</div></div><div class="info-item"><span style="font-size:11px">Avg. Reviews:</span><div style="font-size:16px;font-weight:bold;margin-top:-6px;" id="result6">31</div></div>',
                    header: '<label class="sort-column" id="no" style="padding-right:6px;">#</label><label class="sort-column" id="title-book" style="padding-right:295px;"> </label><label class="sort-column" id="publication-date" style="padding-right: 8px;"></label><label class="sort-column" id="price" style="padding-right:20px;" >Price</label><label class="sort-column" id="pages" style="padding-right:15px;">Page(s)</label><label class="sort-column" id="kwt" style="padding-right:15px;">KWT</label><label class="sort-column" id="kwd" style="padding-right:20px;">KWD</label><label class="sort-column" id="rating" style="padding-right:25px;" >Rating</label><label class="sort-column" id="reviews" style="padding-right:40px;" >Reviews</label><label class="sort-column" id="sales-rank" style="padding-right:10px;" >Sales Rank</label>'
                };
            }
            exportToCsv(e, t, n) {
                n = r.W.valueOrDefault(n, (function() {}));
                for (var o = new Array(20 * this.pageNum + 1), a = 0; a < 20 * this.pageNum + 1; a++) o[a] = new Array(9);
                o[0][0] = "#", o[0][1] = "Book Title", o[0][2] = "Price", o[0][3] = "Page No(s)", 
                o[0][4] = "KWT", o[0][5] = "KWD", o[0][6] = "Rating", o[0][7] = "Reviews", o[0][8] = "Sales Rank";
                for (var s = 0; s < e.length; s++) Math.floor(s / 20) <= this.pageNum - 1 && (o[s + 1][0] = (s + 1).toString(), 
                o[s + 1][1] = e[s].Title, o[s + 1][2] = e[s].FormattedPrice.replace(t.currencySign, t.currencySignForExport), 
                o[s + 1][3] = e[s].PrintLength, o[s + 1][4] = this.isKeywordInText(e[s].Category, e[s].Title), 
                o[s + 1][5] = this.isKeywordInText(e[s].Category, e[s].Description), o[s + 1][6] = e[s].Rating, 
                o[s + 1][7] = "string" == typeof e[s].Reviews ? e[s].Reviews.replace(/\./, ",") : e[s].Reviews, 
                o[s + 1][8] = e[s].SalesRank);
                var l = "ka-" + r.W.getTypeFromBookData(e) + "-" + r.W.getCategoryFromBookData(e);
                i.V.sendMessageToActiveTab({
                    type: "download-file",
                    data: o,
                    fileName: l,
                    booksNumber: e.length
                }, n);
            }
            insertData(e, t, n, i, o) {
                for (var s = "", l = 0, c = 0, u = 0, d = 0, p = 0, h = "", f = 0, g = 0, m = t.length - 1; m >= 0; m--) (void 0 === t[m].SalesRank || t[m].SalesRank.length < 1 || void 0 === t[m].Title || t[m].Title.length < 1) && t.splice(m, 1);
                for (m = 0; m < t.length; m++) if (Math.floor(m / 20) <= e) {
                    var y = this.isKeywordInText(t[m].Category, t[m].Title), v = this.isKeywordInText(t[m].Category, t[m].Description);
                    g = this.getSalesRankConclusion(r.W.parseInt(t[m].SalesRank, n.decimalSeparator)), 
                    h += "<tr><td>" + (m + 1) + "</td><td class='wow' style='min-width:280px;max-width:280px;'><a href='" + t[m].Url + "' title='" + t[m].Title.replace("'", "&apos;") + "' target='_blank'>" + t[m].Title + "</a></td><td style='min-width:50px;max-width:50px;padding-left:5px;padding-right:5px;'>" + t[m].FormattedPrice + "</td><td class='bg-" + this.getPagesColor(t[m].PrintLength) + "' style='padding-left:18px;min-width:22px;max-width:22px;padding-right:18px;'>" + t[m].PrintLength + "</td><td class='bg-" + this.getKWColor(y) + "' style='padding-left:10px;min-width:22px;max-width:22px;padding-right:10px;'>" + y + "</td><td class='bg-" + this.getKWColor(v) + "' style='padding-left:10px;min-width:22px;max-width:22px;padding-right:10px;'>" + v + "</td><td class='bg-" + this.getRatingColor(t[m].Rating) + "' style='padding-left:20px;min-width:20px;max-width:20px;padding-right:20px;'>" + Number(t[m].Rating).toFixed(1) + "</td><td class='bg-" + this.getReviewColor(r.W.parseInt(t[m].Reviews, n.decimalSeparator)) + "' style='min-width:50px;max-width:50px;padding-left:20px;padding-right:10px;' align='right'>" + t[m].Reviews + "</td><td class='bg-" + this.getSalesRankColor(g) + "' align='right' style='padding-left:31px;width:70px;'>" + t[m].SalesRank + "</td></tr>";
                    var b = "" + t[m].Reviews;
                    l += r.W.parseInt(t[m].SalesRank, n.decimalSeparator), d += t[m].Price, p += r.W.parseInt(b, n.decimalSeparator), 
                    c += a.$.isNumeric(t[m].PrintLength) ? parseInt(t[m].PrintLength) : 0, u += parseFloat(t[m].Rating), 
                    f++, "" == s && (t[m].CategoryKind, s = t[m].Category);
                }
                20 * e >= 20 && (0, a.$)("#data-body").css("overflow-y", "scroll");
                var x = 20 * (e + 1) - 19, w = 20 * (e + 1);
                if (e >= 4 || w >= (this.parent.totalResults || 100)) (0, a.$)("#result1").html("1-" + t.length), 
                (0, a.$)("#PullResult").html(""); else {
                    const e = Math.min(w + 20, this.parent.totalResults || 100);
                    (0, a.$)("#result1").html("1-" + w), (0, a.$)("#PullResult").html("Pull Results " + (x + 20) + "-" + e);
                }
                this.parent.isPulling ? ((0, a.$)("#PullResult").hide(), (0, a.$)("#PullResultLoading").show()) : ((0, 
                a.$)("#PullResult").show(), (0, a.$)("#PullResultLoading").hide()), this.prevTableHtml === h && (0, 
                a.$)("table[name='data']").find("tbody").html().trim() || (this.prevTableHtml = h, 
                (0, a.$)("table[name='data']").find("tbody").html(h));
                var T = 0, k = 0;
                for (m = 0; m < 20 && m < i.length; m++) this.getSalesRankConclusion(r.W.parseInt(i[m].SalesRank, n.decimalSeparator)) > 0 && T++, 
                i[m].SalesRecv > 500 && k++;
                (0, a.$)("#result2").html(n.formatPrice(r.W.addCommas((d / f).toFixed(2)))), (0, 
                a.$)("#result3").html(r.W.addCommas(Math.floor(l / f))), (0, a.$)("#result4").html(r.W.addCommas(Math.floor(c / f))), 
                (0, a.$)("#result5").html(r.W.addCommas((u / f).toFixed(1))), (0, a.$)("#result6").html(r.W.addCommas(Math.floor(p / f))), 
                o || this.analysis.setBullets({
                    salesRankConclusionValue: T,
                    monthlyRevBook: k
                });
            }
            isKeywordInText(e, t) {
                return -1 != t.toLowerCase().indexOf(e.toLowerCase()) ? "Yes" : "No";
            }
            getSalesRankConclusion(e) {
                return 0 == e ? 0 : e < 1e4 ? 1 : e < 2e4 ? 2 : e < 45e3 ? 3 : 0;
            }
            getSalesRankColor(e) {
                return 1 == e ? "red" : 2 == e ? "orange" : 3 == e ? "green" : "grey";
            }
            getRatingColor(e) {
                return "" == e ? "grey" : e < 4 ? "green" : e < 4.5 ? "orange" : "red";
            }
            getReviewColor(e) {
                return "" == e || 0 == e ? "grey" : e < 21 ? "green" : e < 76 ? "orange" : "red";
            }
            getKWColor(e) {
                return "yes" == e.toLowerCase() ? "red" : "green";
            }
            getPagesColor(e) {
                return a.$.isNumeric(e) ? e < 66 ? "green" : e < 150 ? "orange" : "red" : "grey";
            }
        }
    },
    604: (e, t, n) => {
        "use strict";
        n.d(t, {
            o: () => LoginTab
        });
        var i = n(248), r = n(357), o = n(534);
        const a = "https://www.publishingaltitude.com", s = a + "/wp-json/jwt-auth/v1/token", l = "KindleSpy";
        class LoginTab {
            constructor(e) {
                if (LoginTab._singletonInstance) return LoginTab._singletonInstance;
                LoginTab._singletonInstance = this;
                var t = this;
                this.parentPopup = e, this.loginContent = (0, o.$)("#login-content"), this.trialExpiredContent = (0, 
                o.$)("#trial-expired-content"), this.expiredTitle = (0, o.$)("#expired-text"), this.expiredButton = (0, 
                o.$)("#unlock-account-button"), this.noDataButton = (0, o.$)("#no-data-button"), 
                this.noSupportButton = (0, o.$)("#no-support-button"), this.noAllTypesSupportButton = (0, 
                o.$)("#no-support-type-button"), this.noLanguageButton = (0, o.$)("#no-language-button"), 
                this.cancelledTitle = (0, o.$)("#cancelled-text"), this.cancelledButton = (0, o.$)("#unlock-cancelled-account-button"), 
                this.loginFooter = (0, o.$)("#login-footer"), this.username = (0, o.$)("#username"), 
                this.password = (0, o.$)("#password"), this.loginButton = (0, o.$)("#login-button"), 
                this.unlockAccountButton = (0, o.$)("#unlock-account-button"), this.unlockCancelledAccountButton = (0, 
                o.$)("#unlock-cancelled-account-button"), this.createAccount = (0, o.$)("#create-account"), 
                this.resetPassword = (0, o.$)("#reset-password"), this.privacyPolicy = (0, o.$)("#privacy-policy"), 
                this.learnMoreAboutKdspy = (0, o.$)("#learn-more-about-kdspy"), this.learnMoreAboutNoSupport = (0, 
                o.$)("#learn-more-about-no-support"), this.learnMoreAboutNoTypeSupport = (0, o.$)("#learn-more-about-no-support-type"), 
                this.learnMoreAboutNoLoggedIn = (0, o.$)("#learn-more-about-no-logged-in"), this.learnMoreAboutTracking = (0, 
                o.$)("#learn-more-about-book-tracking"), this.learnMoreAboutNoData = (0, o.$)("#learn-more-about-no-data"), 
                this.loginFailedMessage = (0, o.$)("#login-failed-message"), this.storage = i.V.storage, 
                this.inputForm = (0, o.$)(".validate-input .input"), this.loginButton.click((function() {
                    t.onLoginClick();
                })), this.unlockAccountButton.click((function() {
                    i.V.openNewTab("https://www.kdspy.com/activate/");
                })), this.unlockCancelledAccountButton.click((function() {
                    i.V.openNewTab("https://www.kdspy.com/activate/");
                })), this.createAccount.click((function() {
                    i.V.openNewTab("https://www.kdspy.com/create/");
                })), this.resetPassword.click((function() {
                    i.V.openNewTab("https://www.publishingaltitude.com/forgotten/");
                })), this.privacyPolicy.click((function() {
                    i.V.openNewTab("https://www.kdspy.com/c/legal-notices/#privacy");
                })), this.noDataButton.click((function() {
                    i.V.openNewTab("https://www.publishingaltitude.com/contact-us/");
                })), this.noSupportButton.click(r.W.openDefaultCategoryUrl), this.noAllTypesSupportButton.click((function() {
                    (0, o.$)(".search")[0].click();
                })), this.noLanguageButton.click((function() {
                    i.V.sendMessageToActiveTab({
                        type: "change-language"
                    }), setTimeout((() => {
                        window.close();
                    }), 100);
                })), this.learnMoreAboutKdspy.click((function() {
                    i.V.openNewTab("https://www.kdspy.com/learn/");
                })), this.learnMoreAboutNoSupport.click((function() {
                    i.V.openNewTab("https://www.kdspy.com/c/help/#location");
                })), this.learnMoreAboutNoTypeSupport.click((function() {
                    i.V.openNewTab("https://www.kdspy.com/c/help/#location");
                })), this.learnMoreAboutNoLoggedIn.click((function() {
                    i.V.openNewTab("https://www.kdspy.com/c/help/#prices");
                })), this.learnMoreAboutTracking.click((function() {
                    i.V.openNewTab("https://www.kdspy.com/c/help/#tracking");
                })), this.learnMoreAboutNoData.click((function() {
                    i.V.openNewTab("https://www.kdspy.com/c/help/#data");
                })), (0, o.$)("#username,#password").keyup((function(e) {
                    i.V.sendMessageToActiveTab({
                        type: "save-login",
                        login: t.username.val(),
                        password: t.password.val()
                    });
                    13 === e.keyCode && t.loginButton.click();
                })), (0, o.$)(".validate-form .input").each((function() {
                    (0, o.$)(this).focus((function() {
                        t.hideValidate(this);
                    }));
                }));
            }
            getUserAccessLevel() {
                var e, t = this, n = t.getLoginData(), i = !0, r = !1;
                return n.then((function(t) {
                    return e = t, fetch(s, {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: t.login,
                            password: t.password
                        }),
                        credentials: "omit"
                    });
                })).then((e => e.json())).then((e => fetch("https://www.publishingaltitude.com/wp-json/wp/v2/users/me", {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + e.token,
                        Accept: "application/json"
                    },
                    credentials: "omit"
                }))).then((e => e.json())).then((function(n) {
                    var o = n.levels;
                    return (o.some((function(e) {
                        return e.name === l;
                    })) || o.some((function(e) {
                        return "KindleSpy Trial" === e.name && !e.isExpired;
                    }))) && (i = !1), o.some((function(e) {
                        return e.name === l && "1" === e.isCancelled;
                    })) && (r = !0), e.lastAccessCheck = Date.now(), void 0 !== LoginTab.simulateTrialExpired && (i = LoginTab.simulateTrialExpired), 
                    e.isTrialExpired = i, void 0 !== LoginTab.simulateAccountInactive && (r = LoginTab.simulateAccountInactive), 
                    e.isAccountInactive = r, t.setLoginData(e);
                })).then((function() {
                    return {
                        isTrialExpired: i,
                        isAccountInactive: r,
                        isCredentialsIncorrect: !1
                    };
                })).catch((function(e) {
                    return {
                        isCredentialsIncorrect: !0,
                        isTrialExpired: !1,
                        isAccountInactive: !1
                    };
                }));
            }
            onLoginClick() {
                var e = this;
                if (e.loginButton.prop("disabled")) return;
                if (!e.isFormValid()) return;
                const loginSuccessAction = function() {
                    e.parentPopup.checkAndStartKdspy();
                }, loginErrorAction = function(t) {
                    e.loginFailedMessage.show();
                };
                if (void 0 === LoginTab.simulateLoginSuccess) {
                    e.loginButton.prop("disabled", !0);
                    var t = fetch(s, {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: e.username.val(),
                            password: e.password.val()
                        }),
                        credentials: "omit"
                    }).then((e => e.json())), n = e.getLoginData();
                    return Promise.all([ t, n ]).then((function([t, n]) {
                        return n.isLoggedIn = !0, n.login = e.username.val(), n.password = e.password.val(), 
                        e.setLoginData(n);
                    })).then(loginSuccessAction).catch(loginErrorAction).finally((function() {
                        e.loginButton.prop("disabled", !1);
                    }));
                }
                LoginTab.simulateLoginSuccess ? e.setLoginData({
                    isLoggedIn: !0,
                    login: "dummy_user",
                    userId: 999999
                }).then((function() {
                    loginSuccessAction();
                })) : loginErrorAction();
            }
            onLogoutClick() {
                return this.setLoginData(c);
            }
            getLoginData() {
                var e = this;
                return new Promise((function(t, n) {
                    e.storage.get("loginData", (function(e) {
                        void 0 === e && (e = {}), void 0 === e.loginData && (e.loginData = c), e.loginData.lastAccessCheck > Date.now() && (e.loginData.lastAccessCheck = Date.now() - 288e5), 
                        t(e.loginData);
                    }));
                }));
            }
            setLoginData(e) {
                var t = this;
                return new Promise((function(n, i) {
                    t.storage.set({
                        loginData: e
                    }, (function() {
                        n();
                    }));
                }));
            }
            resetLoginData() {
                var e = this;
                return new Promise((function(t, n) {
                    e.storage.set({
                        loginData: c
                    }, (function() {
                        t();
                    }));
                }));
            }
            loadLevelsInfo() {}
            setupStaticClickListeners() {
                this.resetPassword.click((() => {
                    this.parentPopup.initResetPasswordTab();
                }));
            }
            load() {
                var e = this;
                this.loginContent.show(), this.loginFooter.show(), i.V.sendMessageToActiveTab({
                    type: "get-login"
                }, (function(t) {
                    e.username.val(t.login), e.password.val(t.password);
                }));
            }
            showTrialExpired() {
                this.trialExpiredContent.show(), this.loginFooter.show();
            }
            showAccountInactive() {
                this.trialExpiredContent.show(), this.cancelledTitle.show(), this.cancelledButton.show(), 
                this.expiredTitle.hide(), this.expiredButton.hide(), this.loginFooter.show();
            }
            showCancelledContent() {
                this.cancelledContent.show(), this.loginFooter.show();
            }
            isLoggedIn(e) {
                e = r.W.valueOrDefault(e, (function() {})), this.getLoginData().then((function(t) {
                    e(t.isLoggedIn);
                }));
            }
            isCheckAccessNeeded(e) {
                e = r.W.valueOrDefault(e, (function() {})), this.getLoginData().then((function(t) {
                    var n = Date.now() - Number(t.lastAccessCheck);
                    return n < 0 ? e(!0) : n / 1e3 / 60 / 60 < 1 && !t.isExpired && !LoginTab.debug ? e(!1) : void e(!0);
                }));
            }
            isCredentialsIncorrect(e) {
                e = r.W.valueOrDefault(e, (function() {}));
                var t = this;
                this.isCheckAccessNeeded((function(n) {
                    n ? t.getUserAccessLevel().then((function(t) {
                        e(t.isCredentialsIncorrect);
                    })) : e(!1);
                }));
            }
            isTrialExpired(e) {
                e = r.W.valueOrDefault(e, (function() {}));
                var t = this;
                this.isCheckAccessNeeded((function(n) {
                    n ? t.getUserAccessLevel().then((function(t) {
                        e(t.isTrialExpired);
                    })) : t.getLoginData().then((function(t) {
                        e(t.isTrialExpired);
                    }));
                }));
            }
            isAccountInactive(e) {
                e = r.W.valueOrDefault(e, (function() {}));
                var t = this;
                this.isCheckAccessNeeded((function(n) {
                    n ? t.getUserAccessLevel().then((function(t) {
                        e(t.isAccountInactive);
                    })) : t.getLoginData().then((function(t) {
                        e(t.isAccountInactive);
                    }));
                }));
            }
            isFormValid() {
                for (var e = !0, t = this.inputForm, n = 0; n < t.length; n++) !1 === this.validate(t[n]) && (this.showValidate(t[n]), 
                e = !1);
                return e;
            }
            validate(e) {
                if ("email" == (e = (0, o.$)(e)).attr("type") || "email" == e.attr("name")) {
                    if (null == e.val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/)) return !1;
                } else if ("" == e.val().trim()) return !1;
            }
            showValidate(e) {
                var t = (0, o.$)(e).parent();
                (0, o.$)(t).addClass("alert-validate");
            }
            hideValidate(e) {
                var t = (0, o.$)(e).parent();
                (0, o.$)(t).removeClass("alert-validate");
            }
        }
        var c = {
            userId: -1,
            isLoggedIn: !1,
            login: "",
            password: "",
            levels: [],
            isTrialExpired: !1,
            isAccountInactive: !1,
            lastAccessCheck: null
        };
    },
    672: (e, t, n) => {
        "use strict";
        n.d(t, {
            L: () => MainTab
        });
        var i = n(248), r = n(357), o = n(712), a = n(436), s = n(964), l = n(988), c = n(534);
        class MainTab {
            constructor(e) {
                if (MainTab._singletonInstance) return MainTab._singletonInstance;
                MainTab._singletonInstance = this, this.pageNum = 1, this.isPaged = !0, this._singletonInstance = this, 
                this.parent = e, this.stats = {}, new l.v(".infoBox", MainTab.prototype.getSelectedBooks.bind(this), MainTab.prototype.getStats.bind(this)), 
                this.tabs = new s.m("#main-tabs", (e => {
                    this.selectedBookType = e;
                })), this.selectedBookType = null, this.prevTableHtml = "", this.tabs.bootstrap();
            }
            getSelectedBooks() {
                const e = this.pageType && [ "AuthorPage", "SeriesPage" ].includes(this.pageType), t = e ? this.filterAuthorBooks(this.books, this._siteParser) : this.filterBooks(this.books, this._siteParser), {types: n, defType: i} = this.getDefaultType(t, e);
                let r = this.selectedBookType || i;
                if ("book" === r) for (const e of n) if ("kindle" !== e) return {
                    selected: e,
                    books: t
                };
                return {
                    selected: r,
                    books: t
                };
            }
            getStats() {
                return this.stats;
            }
            savePageNum() {
                i.V.sendMessageToActiveTab({
                    type: "save-pageNum",
                    tab: "MainTab",
                    pageNum: this.pageNum
                });
            }
            loadPageNum(e) {
                var t = this;
                e = r.W.valueOrDefault(e, (function() {})), i.V.sendMessageToActiveTab({
                    type: "get-pageNum",
                    tab: "MainTab"
                }, (function(n) {
                    t.pageNum = parseInt(n), e();
                }));
            }
            load() {
                return {
                    info: '\n            <div class="info-item">\n                <span style="font-size:11px">Results:</span>\n                <div style="font-size:16px;font-weight:bold;margin-top:-6px;" id="result1">1-20</div>\n            </div>\n            <div class="info-item">\n                <span style="font-size:11px">Avg. Sales Rank:</span>\n                <div style="font-size:16px;font-weight:bold; margin-top:-6px;" id="result2">2,233</div>\n            </div>\n            <div class="info-item">\n              <span style="font-size:11px">Avg. Monthly Rev:</span>\n              <div style="font-size:16px;font-weight:bold;margin-top:-6px;" id="result3">$7,000.00</div>\n            </div>\n            <div class="info-item">\n              <span style="font-size:11px">Avg. Price:</span>\n              <div style="font-size:16px;font-weight:bold;margin-top:-6px;" id="result4">$7.95</div>\n            </div>\n            <div class="info-item">\n              <span style="font-size:11px">Avg. No. Reviews:</span>\n              <div style="font-size:16px;font-weight:bold;margin-top:-6px;" id="result5">31</div>\n            </div>',
                    header: '\n            <label class="sort-column" id="no" style="width: 20px; text-align: center;">#</label>\n            <label class="sort-column" id="title-book" style="width: 267px;">Book Title</label>\n\x3c!--            <label class="sort-column" id="publication-date" style="padding-right: 12px;"></label>--\x3e\n            <label class="sort-column" id="searchf" style="width: 50px; text-align: center">More</label>\n            <label class="sort-column" id="pageno" style="width: 59px;text-align: center;">Length</label>\n            <label class="sort-column" id="price" style="width: 45px;">Price</label>\n            <label class="sort-column" id="est-sales" style="width: 80px;" >Est. Mo. Sales</label>\n            <label class="sort-column" id="sales-rev" style="width: 90px;text-align: center;" >Est. Mo. Rev.</label>\n            <label class="sort-column" id="reviews" style="width: 55px;text-align: right;" >Reviews</label>\n            <label class="sort-column" id="sales-rank" style="flex-grow: 1;text-align: right; margin-right: 8px">Sales Rank</label>'
                };
            }
            resetCss() {
                this.tabs && this.tabs.hide();
            }
            exportToCsv(e, t, n) {
                if (n = r.W.valueOrDefault(n, (function() {})), this.pageType && [ "AuthorPage", "SearchResultsPage", "SeriesPage" ].includes(this.pageType)) return this.exportAllTypesResultsToCsv(e, t, n);
                for (var o = new Array(20 * this.pageNum + 1), a = 0; a < 20 * this.pageNum + 1; a++) o[a] = new Array(11);
                o[0][0] = "#", o[0][1] = "Book Title", o[0][2] = "Author", o[0][3] = "Date of publication", 
                o[0][4] = "Price", o[0][5] = "Est. Sales", o[0][6] = "Sales Rev.", o[0][7] = "Reviews", 
                o[0][8] = "Sales Rank", o[0][9] = "ASIN/ISBN-13", o[0][10] = "ISBN-10", o[0][11] = "Length", 
                o[0][12] = "Format", o[0][13] = "Book URL";
                let s = 1;
                const l = this.pageType && [ "AuthorPage", "SeriesPage" ].includes(this.pageType), c = r.W.getBookTypesMachineNameToPretty(t);
                for (var u = 0; u < e.length; u++) if (Math.floor(u / 20) <= this.pageNum - 1 || l && Math.floor(s / 20) <= this.pageNum - 1) {
                    let n = this.selectedBookType;
                    if ("book" === n && (n = r.W.getBookFirstPaperMachineType(Object.keys(e[u].CurrentSalesRanks), this.parent.siteParser)), 
                    "all" === n && (n = e[u].Type), e[u].AdditionalData && e[u].AdditionalData.bookTypes && !e[u].AdditionalData.bookTypes.find((e => e.toLowerCase() === n))) continue;
                    o[s][0] = s.toString(), o[s][1] = e[u].Title.replace(",", ""), o[s][2] = e[u].Author.replace(",", ""), 
                    o[s][3] = (e[u].DateOfPublication || "").replace(/\u200E/gi, "").trim(), o[s][4] = (e[u].FormattedPrices[n] ? e[u].FormattedPrices[n] : e[u].FormattedPrice).replace(t.currencySign, t.currencySignForExport), 
                    o[s][5] = r.W.addCommas(e[u].EstSalesAll[n] || e[u].EstSales), o[s][6] = t.currencySignForExport + " " + r.W.addCommas(Math.round(e[u].EstSalesRecvAll[n] || e[u].SalesRecv)), 
                    o[s][7] = "string" == typeof e[u].Reviews ? e[u].Reviews.replace(/\./, ",") : e[u].Reviews, 
                    o[s][8] = e[u].CurrentSalesRanks[n] || e[u].SalesRank, o[s][9] = e[u].Asin, o[s][10] = e[u].Isbn10;
                    let i = e[u].AllPages[n] || e[u].PrintLength;
                    o[s][11] = i.includes(":") ? r.W.audioLengthToMinutes(i) : i;
                    let a = e[u].Type || n;
                    o[s][12] = n in c ? c[a] : a, o[s][13] = '=HYPERLINK(""' + e[u].Url + '"")', s++;
                }
                var d = "bs-" + r.W.getCategoryFromBookData(e);
                i.V.sendMessageToActiveTab({
                    type: "download-file",
                    data: o,
                    fileName: d,
                    booksNumber: e.length
                }, n);
            }
            exportAllTypesResultsToCsv(e, t, n) {
                n = r.W.valueOrDefault(n, (function() {}));
                let o = [ [ "#", "Book Title", "Author", "Date of publication", "Price", "Est. Sales", "Sales Rev.", "Reviews", "Sales Rank", "ASIN/ISBN-13", "ISBN-10", "Length", "Format", "Book URL" ] ], a = {};
                const s = r.W.getBookTypesMachineNameToPretty(t);
                for (let n = 0; n < e.length; n++) {
                    let i = e[n], o = Object.keys(i.CurrentSalesRanks);
                    for (let e of o) a[e] || (a[e] = []), a[e].push([ (a[e].length + 1).toString(), i.Title.replace(",", ""), i.Author.replace(",", ""), (i.DateOfPublication || "").trim(), i.FormattedPrices[e].replace(t.currencySign, t.currencySignForExport), r.W.addCommas(i.EstSalesAll[e]), t.currencySignForExport + " " + r.W.addCommas(Math.round(i.EstSalesRecvAll[e])), "string" == typeof i.Reviews ? i.Reviews.replace(/\./, ",") : i.Reviews, i.CurrentSalesRanks[e], i.AllAsin ? i.AllAsin[e] : i.Asin, i.AllIsbn10 ? i.AllIsbn10[e] : i.Isbn10, i.AllPages[e].includes(":") ? r.W.audioLengthToMinutes(i.AllPages[e]) : i.AllPages[e], s[e] || e, '=HYPERLINK(""' + i.Url + '"")' ]);
                }
                for (let e of Object.keys(a)) o.push(...a[e]);
                let l = "bs-" + r.W.getCategoryFromBookData(e);
                i.V.sendMessageToActiveTab({
                    type: "download-file",
                    data: o,
                    fileName: l,
                    booksNumber: o.length - 1
                }, n);
            }
            insertData(e, t, n, i, s) {
                let l = [ ...t ];
                this.books = [ ...t ], this._siteParser = n;
                let u = "", d = 0, p = 0, h = "", f = 0, g = 0, m = "", y = 0;
                const v = this.pageType && [ "AuthorPage", "SeriesPage" ].includes(this.pageType);
                v && (0, c.$)("#InsightsLinkWrapper").hide(), l = v ? this.filterAuthorBooks(l, n) : this.filterBooks(l, n);
                const {types: b, defType: x} = this.getDefaultType(l, v);
                for (const [t, i] of l.entries()) if (Math.floor(t / 20) <= e) {
                    let e = this.selectedBookType || x;
                    "book" === e ? e = r.W.getBookFirstPaperMachineType(Object.keys(i.CurrentSalesRanks), this.parent.siteParser) : "all" === e && (e = i.Type), 
                    m += v ? this.renderAuthorRowHTML(t, i, e, n) : this.renderRowHTML(t, i, n);
                    let o = "" + i.Reviews;
                    if (i.excluded) continue;
                    let a = i.CurrentSalesRanks[e];
                    i.CurrentSalesRanks[e] || i.Type !== e || (a = i.SalesRank);
                    let s = i.EstSalesRecvAll[e];
                    i.EstSalesRecvAll[e] || i.Type !== e || (s = i.SalesRecv);
                    let l = i.Prices[e];
                    i.Prices[e] || i.Type !== e || (l = i.Price), f += r.W.parseInt(a, n.decimalSeparator), 
                    g += Math.round(s || 0), d += r.W.parseInt(l, n.decimalSeparator), p += r.W.parseInt(o, n.decimalSeparator), 
                    y++, "" == u && (h = i.CategoryKind, u = i.Category);
                }
                this.isPaged && 20 * e >= 20 && (0, c.$)("#data-body").css("overflow-y", "scroll");
                let w = 20 * (e + 1) - 19, T = 20 * (e + 1);
                if (e >= 4 || T >= (this.parent.totalResults || 100)) (0, c.$)("#result1").html("1-" + l.length), 
                (0, c.$)("#PullResult").html(""); else {
                    const e = Math.min(T + 20, this.parent.totalResults || 100);
                    (0, c.$)("#result1").html("1-" + T), (0, c.$)("#PullResult").html("Pull Results " + (w + 20) + "-" + e);
                }
                this.parent.isPulling ? ((0, c.$)("#PullResult").hide(), (0, c.$)("#PullResultLoading").show()) : ((0, 
                c.$)("#PullResult").show(), (0, c.$)("#PullResultLoading").hide()), this.prevTableHtml === m && (0, 
                c.$)("table[name='data']").find("tbody").html().trim() || (this.prevTableHtml = m, 
                (0, c.$)("table[name='data']").find("tbody").html(m));
                let k = i[Math.min(19, i.length - 1)].SalesRank || 0;
                k = r.W.parseInt(k, n.decimalSeparator);
                let C = 0, S = 0, A = 0;
                for (let e = 0; e < 20 && e < i.length; e++) C += parseInt(i[e].SalesRecv), this.getSalesRankConclusion(r.W.parseInt(i[e].SalesRank, n.decimalSeparator)) > 0 && S++, 
                i[e].SalesRecv > 500 && A++;
                let $ = C / Math.min(20, i.length);
                this.stats = {
                    ...this.stats,
                    avgSalesRank: Math.floor(f / y),
                    avgMonthlyRev: Math.floor(g / y),
                    avgPrice: d / y,
                    avgReviews: Math.floor(p / y)
                }, (0, c.$)("#result2").html(r.W.addCommas(this.stats.avgSalesRank)), (0, c.$)("#result3").html(n.formatPrice(r.W.addCommas(this.stats.avgMonthlyRev))), 
                (0, c.$)("#result4").html(n.formatPrice(r.W.addCommas(this.stats.avgPrice.toFixed(2)))), 
                (0, c.$)("#result5").html(r.W.addCommas(this.stats.avgReviews)), (0, c.$)("#totalReSalesRecv").html(n.formatPrice(r.W.addCommas(g))), 
                this.analysis = r.W.isSearchPageFromCategoryKind(h) ? new a.y : new o.R, (!s || [ "NewReleasesPage", "BestSellersPage" ].includes(this.pageType) && l.length >= 20) && this.analysis.setBullets({
                    salesRank20: k,
                    avgMonthlyRev: $,
                    salesRankConclusionValue: S,
                    monthlyRevBook: A
                });
            }
            renderRowHTML(e, t, n) {
                let o = t.excluded || !1, a = i.V.isFirefox(), s = this.selectedBookType;
                "book" === s && (s = r.W.getBookFirstPaperMachineType(Object.keys(t.CurrentSalesRanks), this.parent.siteParser)), 
                "all" === s && (s = t.Type);
                let l = t.AllPages[s];
                t.AllPages[s] || t.Type !== s || (l = t.PrintLength);
                let c = t.FormattedPrices[s];
                t.FormattedPrices[s] || t.Type !== s || (c = t.FormattedPrice);
                let u = t.CurrentSalesRanks[s];
                t.CurrentSalesRanks[s] || t.Type !== s || (u = t.SalesRank);
                let d = t.EstSalesAll[s];
                t.EstSalesAll[s] || t.Type !== s || (d = t.EstSales);
                let p = t.EstSalesRecvAll[s];
                return t.EstSalesRecvAll[s] || t.Type !== s || (p = t.SalesRecv), (!l || isNaN(l) && !l.toString().includes(":")) && (l = "n/a"), 
                `<tr>\n            <td style="width: 16px; padding-right: 4px">${t.No || "-"}</td>\n            <td class='wow'><a href='${t.Url}' title='${t.Title.replace("'", "&apos;")}' target='_blank'>${t.Title}</a></td>\n            <td class="calendar-td" style="width: 12px;">\n                <img class="calendar-icon" src="${chrome.runtime.getURL("/assets/images/calendar.png")}">\n                <div class="infoBox-popup">\n                    ${"Date Published: " + (t.DateOfPublication || "unknown")}\n                </div>\n            </td>\n            <td style='width:50px;'>\n              <a class='RankTrackingResultSingle' href='#' bookUrl='${t.Url}'>T</a>  |\n              <a target='_blank' href='${t.GoogleSearchUrl}' >S</a>  |\n              <a target='_blank' href='${t.GoogleImageSearchUrl}' >C</a>\n            </td>\n            <td style="width: ${a ? "49" : "58"}px;text-align: center;">${l}</td>\n            <td style="width: 45px;">${c}</td>\n            <td style="width: 80px;text-align: center;">${r.W.addCommas(d)}</td>\n            <td style="width: ${a ? "75" : "90"}px;padding-left: ${a ? "4" : "6"}px;padding-right: 8px;box-sizing: border-box;"><div style='float:left'>${n.currencySign}</div><div style='float:right'>${r.W.addCommas(Math.round(p))}</div></td>\n            <td style="width: ${a ? "52" : "56"}px" align='right'>${t.Reviews}</td>\n            <td style='width: ${a ? "76" : "72"}px' align='right'>${r.W.addCommas(u)}\n                <img class="sr_checkbox" \n                data-excluded="${o}" \n                data-index="${e}"\n                data-asin="${t.Asin}"\n                data-title="${t.Title}"\n                src="${chrome.runtime.getURL(o ? "/assets/images/checkbox_no.png" : "/assets/images/checkbox_yes.png")}"\n                />\n            </td>\n        </tr>`;
            }
            renderAuthorRowHTML(e, t, n, o) {
                const a = o.formatPrice(r.W.addCommas(t.Prices[n] || 0)), s = r.W.addCommas(t.EstSalesAll[n] || 0), l = r.W.addCommas(Math.round(t.EstSalesRecvAll[n]) || 0), c = t.CurrentSalesRanks[n], u = t.AdditionalData.urls[n];
                let d = t.AllPages[n], p = t.excluded || !1;
                (!d || isNaN(d) && !d.toString().includes(":")) && (d = "n/a");
                let h = i.V.isFirefox();
                return `<tr>\n            <td style="width: 16px; padding-right: 4px">${t.No || "-"}</td>\n            <td class='wow' style="width: 255px;"><a href=${u} title='${t.Title.replace("'", "&apos;")}' target='_blank'>${t.Title}</a></td>\n            <td class="calendar-td" style="width: 12px;">\n                <img class="calendar-icon" src="${chrome.runtime.getURL("/assets/images/calendar.png")}">\n                <div class="infoBox-popup">\n                    ${"Date Published: " + (t.DateOfPublication || "unknown")}\n                </div>\n            </td>\n            <td style='width:50px;'>\n                <a class='RankTrackingResultSingle' href='#' bookUrl='${u}'>T</a> |\n                <a target='_blank' href='${t.GoogleSearchUrl}' >S</a> |\n                <a target='_blank' href='${t.GoogleImageSearchUrl}' >C</a>\n            </td>\n            <td style="width: ${h ? "49" : "58"}px;text-align: center;">${d}</td>\n            <td style="width: 45px;">${a}</td>\n            <td style="width: 80px;text-align: center;">${s}</td>\n            <td style="width: ${h ? "75" : "90"}px;padding-left: 6px;padding-right: 8px;box-sizing: border-box;">\n                <div style='float:left'> ${o.currencySign} </div>\n                <div style='float:right'>${l}</div>\n            </td>\n            <td style="width: ${h ? "52" : "56"}px" align="right">${t.Reviews}</td>\n            <td style='width: ${h ? "76" : "82"}px' align='right'>${r.W.addCommas(c)}\n                <img class="sr_checkbox" \n                data-excluded="${p}" \n                data-index="${e}"\n                data-asin="${t.Asin}"\n                data-title="${t.Title}"\n                src="${chrome.runtime.getURL(p ? "/assets/images/checkbox_no.png" : "/assets/images/checkbox_yes.png")}"\n                />\n            </td>\n        </tr>`;
            }
            filterBooks(e, t) {
                const _filter = (e, n) => e.filter((e => {
                    let i = `${n}`;
                    if ("book" === n && (i = r.W.getBookFirstPaperMachineType(Object.keys(e.CurrentSalesRanks), this.parent.siteParser)), 
                    "BestSellersPage" === this.pageType) {
                        if ("all" === i) return !0;
                        if (e.Type === i) return !0;
                        return !!Object.entries(t.getAllBookTypes()).some((([t, n]) => r.W.toMachineName(t) === e.Type && r.W.toMachineName(n) === i));
                    }
                    return !(!e.CurrentSalesRanks[i] || e.CurrentSalesRanks[i].length < 1 || void 0 === e.Title || e.Title.length < 1);
                }));
                let n = new Set, i = {};
                for (const o of e) {
                    let e = !1;
                    for (const a of o.BookTypes) {
                        let o = r.W.toCanonicalTypeName(r.W.toMachineName(a), t);
                        if (n.add(o), "book" === o) {
                            if (e) continue;
                            e = !0;
                        }
                        Object.keys(i).includes(o) || (i[o] = 0), i[o]++;
                    }
                }
                let o, a = Object.entries(i).sort(((e, t) => t[1] - e[1]))[0][0];
                n = [ ...n ], o = this.selectedBookType ? this.selectedBookType : a, n.includes(o) || "all" === o || (o = n[0]);
                let s = {}, l = {};
                if (n.forEach((t => {
                    let n = t.substr(0, 1).toUpperCase() + t.substr(1);
                    "book" === t && (n = "Books"), "audiobook" === t && (n = "Audiobooks");
                    let i = _filter(e, t).length;
                    s[t] = i > 20 ? "20+" : i, l[t] = n;
                })), l = Object.keys(l).filter((e => 0 !== s[e])).reduce(((e, t) => (e[t] = l[t], 
                e)), {}), 1 !== Object.keys(l).length || "BestSellersPage" === this.pageType && "book" === this.currentType || (o = Object.keys(l)[0]), 
                [ "SearchResultsPage", "NewReleasesPage" ].includes(this.pageType)) "audiobook" === this.currentType || this.pageUrl.includes("i=audible") ? (l = {
                    audiobook: "Audiobooks"
                }, o = "audiobook") : "kindle" === this.currentType || this.pageUrl.includes("i=digital-text") ? (l = {
                    kindle: "Kindle"
                }, o = "kindle") : this.selectedBookType || (o = "book"); else if ("BestSellersPage" === this.pageType) {
                    let n = {};
                    e.forEach((e => {
                        let i = r.W.toCanonicalTypeName(r.W.toMachineName(r.W.translateMachineTypeName(e.Type, t)), t);
                        n[i] || (n[i] = 0), n[i]++;
                    }));
                    let i = Object.entries(n).sort(((e, t) => t[1] - e[1]))[0][0];
                    l = {}, "book" === this.currentType && (l.all = "All", s.all = 0);
                    for (let e in n) {
                        let t = "Kindle";
                        "book" === e && (t = "Books"), "audiobook" === e && (t = "Audiobooks"), l[e] = t, 
                        s[e] = n[e], "book" === this.currentType && (s.all += n[e]);
                    }
                    this.selectedBookType || (o = "book" === this.currentType ? "all" : i);
                }
                return this.tabs.setTabs(l, t, s), this.selectedBookType = o, this.tabs.setDefault(o), 
                this.tabs.show(), _filter(e, o);
            }
            filterAuthorBooks(e, t) {
                const _filter = (e, t) => e.filter((e => !(void 0 === e.SalesRank || e.SalesRank.length < 1 || void 0 === e.Title || e.Title.length < 1) && e.AdditionalData.bookTypes.map(r.W.toMachineName).includes(t))), {types: n, defType: i} = this.getDefaultType(e, !0);
                let o = this.selectedBookType || i;
                const a = n.map(r.W.toMachineName), s = [ "Kindle", "Paperback", "Hardcover", "Flexibound", "Spiral-bound", "Ring-bound", "Board book", "Diary", "Mass Market Paperback" ], l = t.getBookTypes();
                let c = {}, u = {};
                a.forEach((t => {
                    let n = t.substr(0, 1).toUpperCase() + t.substr(1);
                    "book" === t && (n = "Books");
                    let i = _filter(e, t).length;
                    c[t] = i > 20 ? "20+" : i, u[t] = n;
                }));
                let d = Object.values(u).sort(((e, t) => {
                    let n = l[e] || e, i = l[t] || t;
                    return s.indexOf(n) > s.indexOf(i);
                }));
                return this.tabs.setTabs(d, t, c, !1), a.includes(o) || (o = a[0]), this.selectedBookType = o, 
                this.tabs.setDefault(o), this.tabs.show(), e = _filter(e, this.selectedBookType || i);
            }
            getDefaultType(e, t = !1) {
                if (!e.length) return {
                    types: [],
                    defType: void 0
                };
                let n = new Set;
                if (t) for (const t of e) for (const e of t.AdditionalData.bookTypes) n.add(e); else for (const t of e) n.add(t.Type);
                return n = [ ...n ].filter((e => !!e)), n.includes("Paperback") ? {
                    types: n,
                    defType: "paperback"
                } : {
                    types: n,
                    defType: r.W.toMachineName(n[0])
                };
            }
            getSalesRankConclusion(e) {
                return 0 == e ? 0 : e < 1e4 ? 1 : e < 2e4 ? 2 : e < 45e3 ? 3 : 0;
            }
        }
    },
    580: (e, t, n) => {
        "use strict";
        n.d(t, {
            Z: () => RankTrackingTab
        });
        var i = n(838), r = n(248), o = n(357), a = n(889), s = n(72), l = n(964), c = n(985), u = n(534), d = n(512);
        d.kL.register(d.qi, d.jn, d.ZL, d.od, d.vn, d.N0, d.jI, d.ST, d.tt, d.CV, d.Xi, d.ho, d.uw, d.f$, d.WV, d.l7, d.FB, d.RM, d.WY, d.Gu, d.De, d.Dx, d.u, d.DK);
        class RankTrackingTab {
            constructor(e, t) {
                if (RankTrackingTab._singletonInstance) return RankTrackingTab._singletonInstance;
                RankTrackingTab._singletonInstance = this, this.parent = t, this.storage = new a.N, 
                this.siteParser = e, this._singletonInstance = this, this.bookParser = new c.D(null, e), 
                this.bookTypesTabs = new l.m("#tracking-tabs", (e => {
                    this.selectedBookType = e, this.loadDetails(this.url, this.updateBookView.bind(this));
                })), this.tabs = new l.m("#global-tracking-tabs", (e => {
                    this.selectedTableType = e, this.selectedBookType = e, this.bookTypesTabs.setDefault(e), 
                    n.updateRateTrackingTable();
                })), this.selectedBookType = "kindle", this.selectedTableType = "kindle", this.bookTypesTabs.bootstrap(), 
                this.tabs.bootstrap();
                const n = this, i = (0, u.$)("body");
                i.on("click", ".data-rank-tracking-remove", (function(e) {
                    e.preventDefault(), n.storage.removeBookInStorage((0, u.$)(this).data("book-url"), (function() {
                        n.updateRateTrackingTable();
                    }));
                })), i.on("click", ".data-rank-tracking-disable", (function(e) {
                    e.preventDefault(), n.storage.disableTracking((0, u.$)(this).data("book-url"), (function() {
                        n.updateRateTrackingTable();
                    }));
                })), i.on("click", ".data-rank-tracking-enable", (function(e) {
                    e.preventDefault(), n.storage.enableTracking((0, u.$)(this).data("book-url"), (function() {
                        n.updateRateTrackingTable();
                    }));
                })), i.on("input", ".data-rank-tracking-search", (function(e) {
                    n.updateRateTrackingTable();
                })), (0, u.$)("#SingleAiInsights").off("click").click((() => {
                    this.parent.showInsightsTab("single", this.book);
                })), (0, u.$)("#SingleAiInsightsBack").off("click").click((() => {
                    this.parent.initRankTrackingTab(this.parent.url, !0);
                }));
            }
            updateBookView(e, t) {
                if ((0, u.$)("#LinkBackTo").show(), (0, u.$)("#loading-content").hide(), !e.bookTypes.length) return (0, 
                u.$)("#no-supported-area").show(), void (0, u.$)("#no-compatible-aria-footer").show();
                RankTrackingTab.resetTrackingBookPage(this.url), (0, u.$)("#tracking-header").show(), 
                (0, u.$)("#tracking-content").show(), (0, u.$)("#TrackedPanelFooter").show(), (0, 
                u.$)(".info.single_book").show(), (0, u.$)(".right-panel").show(), (0, u.$)(".table-head").show(), 
                (0, u.$)(".table-head").html("<label>Bestseller rank tracking (30 days)<label>"), 
                (0, u.$)(".left-panel").css("width", "525px"), (0, u.$)("#main-header").html(""), 
                (0, u.$)("#tracking-content").html(""), this.bookTypesTabs.setDefault(this.selectedBookType), 
                t(e);
            }
            exportToCsv(e, t, n) {
                n = o.W.valueOrDefault(n, (function() {}));
                var i = (0, u.$)("#ExportBtnWordCloud").attr("book-url");
                this.storage.getBook(i, (function(e) {
                    if (e) {
                        let t = [], i = [ "Date" ], o = [];
                        for (const t of Object.keys(e.salesRankData[0].salesRanks)) o.push(t), i.push(t.slice(0, 1).toUpperCase() + t.slice(1) + " Sales Rank");
                        t.push(i);
                        for (const n of e.salesRankData) {
                            let e = [ new Date(n.date).toDateString() ];
                            for (const t of o) e.push(n.salesRanks[t]);
                            t.push(e);
                        }
                        r.V.sendMessageToActiveTab({
                            type: "download-file",
                            data: t,
                            fileName: "rs-" + e.title,
                            booksNumber: e.salesRankData.length + 1
                        }, n);
                    } else n(null);
                }));
            }
            load() {
                return {
                    info: '<div style="font-size:15px; display:flex; justify-content: space-between;">\n                        <b>Best Seller Rank Tracking:</b>\n                        <input type="text" class="data-rank-tracking-search" autocomplete="off" name="search" placeholder="Search">\n                        <style>#main-header { min-height: unset; }</style>\n                    </div>',
                    header: '<label class="sort-column" id="no" style="padding-right:6px;">#</label>\n            <label class="sort-column" id="title-book" style="width: 270px;">Book Title</label>\n            <label class="spacer" style="width: 10px"></label>\n            <label class="sort-column" id="daysTracked" style="width: 30px;">Days</label>\n            <label class="spacer" style="width: 25px"></label>\n            <label class="sort-column" id="region" style="width: 40px;">Region</label>\n            <label class="spacer" style="width: 25px"></label>\n            <label class="sort-column" id="avgBsr" style="width: 51px;">Avg. BSR</label>\n            <label class="spacer" style="width: 25px"></label>\n            <label class="sort-column" id="estDailyRev" style="width: 80px">Est. Daily Rev.</label>\n            <label class="spacer" style="width: 20px"></label>\n            <label class="sort-column" id="resTracking" style="width: 40px">Results</label>\n            <label class="spacer" style="width: 45px"></label>\n            <label class="sort-column" id="removeTracking" style="margin-right:5px;">Actions</label>'
                };
            }
            loadDetails(e, t, n = !1) {
                if (t = o.W.valueOrDefault(t, (function() {})), this.url = e, n) this.book = null; else if (this.book) return this.book = a.N.upgradeBookData(this.book), 
                t(this.book, this.updateTrackedBookView.bind(this));
                this.storage.getBook(e, (n => {
                    if (n) return this.book = n, t(n, this.updateTrackedBookView.bind(this));
                    this.storage.initBookFromUrl(e, (e => (this.book = e, t(e, this.updateTrackedBookView.bind(this)))));
                }));
            }
            updateRateTrackingTable(e) {
                const t = this;
                e || (e = (0, u.$)(".data-rank-tracking-search").val()), t.storage.getAllBooks((function(n) {
                    let r = t.selectedTableType || "kindle", a = [];
                    if (n.forEach((e => {
                        Object.keys(e.currentSalesRanks).forEach((e => {
                            a.includes(e) || a.push(e);
                        }));
                    })), a.includes(r) || (r = a[0]), a.length > 0) {
                        let e = {}, n = o.W.getBookTypesMachineNameToPretty(new i.O);
                        a.forEach((t => {
                            e[t] = n[t], "mass-market-paperback" === t && (e[t] = "MPP");
                        })), t.tabs.setTabs(e, t.siteParser), t.tabs.setDefault(r), t.tabs.show();
                    }
                    let s = [];
                    if (0 === n.length) (0, u.$)("#no-tracked-books").show(), (0, u.$)(".list_books").hide(), 
                    (0, u.$)(".table-head").hide(), (0, u.$)("#main-content").hide(); else {
                        (0, u.$)("#no-tracked-books").hide(), (0, u.$)(".list_books").show(), (0, u.$)(".table-head").show(), 
                        (0, u.$)("#main-content").show();
                        for (let i = 0; i < n.length; i++) {
                            let a = n[i];
                            if (!a.currentSalesRanks[r]) continue;
                            if (e && !a.title.toLowerCase().includes(e.toLowerCase())) continue;
                            let l = o.W.getSiteParser(a.url), c = l.region, u = t.calculateAvgBSR(a, r), d = l.formatPrice(o.W.addCommas(t.calculateAvgDailyRev(a, r).toFixed(2))), p = `<tr>\n                    <td>${i + 1}</td>\n                    <td style="max-width:270px;min-width:270px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title='${a.title.replace("'", "&apos;")}'>${a.title}</td>\n                    <td class="spacer" style="width: 2px"></td>\n                    <td style="max-width:30px;min-width:30px;text-align:center;">${a.salesRankData.length}</td>\n                    <td class="spacer" style="width: 27px"></td>\n                    <td style="max-width:40px;min-width:40px;">${c}</td>\n                    <td class="spacer" style="width: 16px"></td>\n                    <td style="max-width:51px;min-width:51px;text-align: right;">${o.W.addCommas(u)}</td>\n                    <td class="spacer" style="width: 16px"></td>\n                    <td style="max-width:80px;min-width:80px;text-align: right;">${d}</td>\n                    <td class="spacer" style="width: 29px"></td>\n                    <td style="max-width:40px;min-width:40px;">\n                        <a class='RankTrackingResultSingle' href='#' bookUrl='${a.url}'>View</a>\n                    </td>\n                    <td class="spacer" style="width: 12px"></td>\n                    <td style="">\n                        <a class='data-rank-tracking-disable' href='#' data-book-url='${a.url}'>Disable</a>&nbsp;|&nbsp; \n                    </td>\n                    <td style="">\n                        <a class='data-rank-tracking-remove' href='#' data-book-url='${a.url}'>Remove</a>\n                    </td>\n                </tr>`;
                            n[i].trackingEnabled || (p = p.replace(/Disable/, "Enable").replace(/disable/, "enable")), 
                            s.push(p);
                        }
                        (0, u.$)('table[name="data"] tbody').html(s.join("")), (0, u.$)(".content").addClass("tracking-list");
                    }
                }));
            }
            resetCss() {
                this.bookTypesTabs.hide(), this.tabs.hide(), (0, u.$)(".tracking-list").removeClass("tracking-list");
            }
            updateTrackedBookView(e) {
                let t = this.selectedBookType || "kindle";
                const n = o.W.resolve(e, "bookTypes", [ "Kindle" ]).map(o.W.toMachineName);
                n.includes(t) || (t = n[0]), o.W.resolve(e, "bookTypes", [ "Kindle" ]).length > 1 && (this.bookTypesTabs.setTabs(e.bookTypes, this.siteParser), 
                this.bookTypesTabs.setDefault(t), this.bookTypesTabs.show()), (0, u.$)("#tracking-header").show(), 
                (0, u.$)("#ExportBtnWordCloud").show(), (0, u.$)("#BackToTrackingList").show(), 
                (0, u.$)("#SingleAiInsights").show(), (0, u.$)("#AdPanel").show(), (0, u.$)("#GlobalHelpButton").show();
                var i = "";
                (0, u.$)("#bookTitle").text(e.title);
                var r = e.salesRankData.slice(Math.max(e.salesRankData.length - 30, 0));
                1 != r.length || e.trackingEnabled ? (i = '<div><canvas id="canvas" height="285" width="530"></canvas></div>', 
                (0, u.$)("#infoPages").show(), (0, u.$)(".info.single_book .info-item").css("width", "20%"), 
                (0, u.$)("#ExportBtnWordCloud").show(), (0, u.$)("#BookTracked").show()) : i = '<div class="brtdisable">\n                <canvas id="canvas-fake" height="285" width="530"></canvas>\n                <div class="brtdisable-blur"></div>\n                <div class="btnTracking data-enable-tracking">\n                    CLICK HERE TO TRACK SALES RANK >\n                </div>\n            </div>', 
                (0, u.$)("#BackToTrackingList").show(), (0, u.$)("#SingleAiInsights").show(), (0, 
                u.$)("#enableTracking").prop("disabled", e.trackingEnabled), (0, u.$)("#disableTracking").prop("disabled", !e.trackingEnabled), 
                (0, u.$)("#tracking-content").html(i), (0, u.$)("#enableTracking").toggle(!e.trackingEnabled), 
                (0, u.$)("#disableTracking").toggle(e.trackingEnabled), (0, u.$)(".data-enable-tracking").data({
                    url: e.url
                }), (0, u.$)("#disableTracking").data({
                    url: e.url
                }), (0, u.$)("#singleResult1").html(o.W.addCommas(e.currentSalesRanks[t])), (0, 
                u.$)("#singleResult2").html(e.formattedPrices[t]), "audiobook" === t ? (0, u.$)(".data-print-length").html(e.allPages[t] + " hours") : (0, 
                u.$)(".data-print-length").html(e.allPages[t] + " pages"), (0, u.$)(".data-publication-date").html(e.dateOfPublication), 
                (0, u.$)(".data-cover-search-url").attr("href", e.googleImageSearchUrl), (0, u.$)(".data-google-search-url").attr("href", e.googleSearchUrl), 
                (0, u.$)(".bookProps").show(), (0, u.$)("#singleResult4").html(o.W.addCommas(e.estSales[t])), 
                (0, u.$)("#singleResult5").html(this.siteParser.formatPrice(o.W.addCommas(Math.round(e.estSalesRecv[t])))), 
                (0, u.$)("#singleResult6").html(e.numberOfReviews);
                var a = r.reduce(((e, n) => e + o.W.parseInt(n.salesRanks[t], this.siteParser.decimalSeparator)), 0) / r.length, s = e.estSalesRecv[t], l = Math.floor(s / 30 * 100) / 100;
                (0, u.$)("#days").html(r.length), (0, u.$)("#AvgSalesRank").html(o.W.addCommas(Math.floor(a))), 
                (0, u.$)("#EstDailyRev").html(this.siteParser.formatPrice(o.W.addCommas(l))), (0, 
                u.$)("#bookImage").attr("src", e.image.replace("AA300", "").replace("AA324", "").replace("AA278", "").replace("PIsitb-sticker-v3-big,TopRight", "").replace("PIkin4,BottomRight", "")), 
                (0, u.$)("#ExportBtnWordCloud").attr("book-url", e.url);
                let c = r.map((({date: e, ...n}) => ({
                    date: e,
                    salesRank: n.salesRanks[t]
                })));
                for (var p = [], h = [], f = 0; f < c.length; f++) {
                    let e = new Date(c[f].date);
                    p.push(e.toDateString().replace(e.getFullYear(), "")), h.push(o.W.parseInt(c[f].salesRank, this.siteParser.decimalSeparator));
                }
                var g = {
                    labels: p,
                    datasets: [ {
                        label: "Sales Rank",
                        fill: "rgba(220,220,220,0.2)",
                        data: h
                    } ]
                };
                const m = document.getElementById("canvas-fake");
                if (m) {
                    let e = m.getContext("2d");
                    window.myFakeLine = new d.kL(e, {
                        type: "line",
                        data: {
                            labels: [ "Wed May 30", "Thu May 31", "Fri Jun 01", "Sat Jun 02", "Sun Jun 03", "Mon Jun 04", "Tue Jun 05", "Wed Jun 06", "Thu Jun 07", "Fri Jun 08", "Sat Jun 09", "Sun Jun 10", "Mon Jun 11", "Tue Jun 12", "Wed Jun 13", "Thu Jun 14", "Fri Jun 15", "Sat Jun 16", "Sun Jun 17", "Mon Jun 18", "Tue Jun 19", "Wed Jun 20", "Thu Jun 21", "Fri Jun 22", "Sat Jun 23", "Sun Jun 24", "Mon Jun 25", "Tue Jun 26", "Wed Jun 27", "Thu Jun 28" ],
                            datasets: [ {
                                label: "Sales Rank",
                                fill: "rgba(220,220,220,0.2)",
                                data: [ 1, 1.5, 2, 27, 30, 25, 23, 22, 15, 17, 18, 18, 18, 28, 29, 30, 31, 30, 31, 35, 34, 33, 35, 37, 39, 38, 39, 41, 43, 45 ]
                            } ]
                        },
                        options: {
                            scales: {
                                yAxis: {
                                    reverse: !0
                                }
                            }
                        }
                    });
                }
                var y = document.getElementById("canvas");
                if (y) {
                    var v = y.getContext("2d");
                    window.myLine = new d.kL(v, {
                        type: "line",
                        data: g,
                        options: {
                            scales: {
                                yAxis: {
                                    reverse: !0
                                }
                            }
                        }
                    });
                }
            }
            export() {
                this.storage.export((function(e) {
                    s.D.downloadFile(JSON.stringify(e), "TrackingData.json", "application/json");
                }));
            }
            import() {
                return r.V.sendMessageToActiveTabAsync({
                    type: "get-text-from-file"
                });
            }
            calculateAvgBSR(e, t) {
                let n = [];
                return e.salesRankData.forEach((e => {
                    let i = e.salesRanks[t];
                    i && n.push(parseInt(i));
                })), Math.round(n.reduce(((e, t) => e + t), 0) / n.length);
            }
            calculateAvgDailyRev(e, t) {
                let n = e.currentSalesRanks[t], i = o.W.getSiteParser(e.url), r = new c.D(e.url, i), a = r.getSalesRecv(r.getEstSale(n, t), e.prices[t]);
                return Math.floor(a / 30 * 100) / 100;
            }
            static resetTrackingBookPage(e) {
                RankTrackingTab.prevBookUrl !== e && (RankTrackingTab.prevBookUrl = e, (0, u.$)("#singleResult1").html(""), 
                (0, u.$)("#singleResult2").html(""), (0, u.$)("#singleResult3").html(""), (0, u.$)("#singleResult4").html(""), 
                (0, u.$)("#singleResult5").html(""), (0, u.$)("#singleResult6").html(""), (0, u.$)("#days").html(""), 
                (0, u.$)("#AvgSalesRank").html(""), (0, u.$)("#EstDailyRev").html(""), (0, u.$)("#bookImage").attr("src", ""), 
                (0, u.$)("#enableTracking").show(), (0, u.$)("#enableTracking").prop("disabled", !0), 
                (0, u.$)("#disableTracking").hide(), (0, u.$)("#BookTracked").hide(), (0, u.$)("#ExportBtn").hide(), 
                (0, u.$)("#BackToTrackingList").show(), (0, u.$)("#SingleAiInsights").show(), (0, 
                u.$)("#ExportBtnWordCloud").show(), (0, u.$)("#ExportBtnWordCloud").attr("book-url", ""), 
                (0, u.$)(".data-book-props").hide());
            }
            static formatScaleLabel(e) {
                for (var t = e, n = 0; t >= 1e3; ) t /= 1e3, n++;
                return t = Math.floor(100 * t) / 100, String(t) + [ "", "k", "M", "G", "T", "P" ][n];
            }
        }
        RankTrackingTab.prevBookUrl = "";
    },
    877: (e, t, n) => {
        "use strict";
        n.d(t, {
            f: () => SearchKeywordsTab
        });
        var i = n(248), r = n(357), o = n(436), a = n(964), s = n(534), l = n(127);
        class SearchKeywordsTab {
            constructor(e, t = "kindle") {
                if (SearchKeywordsTab._singletonInstance) return SearchKeywordsTab._singletonInstance;
                SearchKeywordsTab._singletonInstance = this, this.siteParser = e, this.items = {
                    kindle: [],
                    book: [],
                    audiobook: []
                }, this.currentType = t, this.tabs = new a.m("#keyword-search-tabs", (e => {
                    this.currentType = e, this.tabs.setDefault(e), this.render(this.currentType);
                })), this.tabs.setDefault(this.currentType), this.tabs.bootstrap();
            }
            static clearTable() {
                (0, s.$)('table[name="data-keyword-search"] tbody').html(""), (0, s.$)("#content-keyword-search .content").hide(), 
                (0, s.$)("#content-keyword-search .no-data-found-content").hide();
            }
            load() {
                return '<div class="search-inner-panel"><div><div style="width: 100px; position: absolute; top: -40px; left: -70px;" id="LinkBack"><a id="LinkBackTo" style="float:right;" href="#">&lt;&lt; Back to results</a></div><div style="width: 100%; height: 0; clear: both;"></div></div><div class="search-panel">   <input id="search-text" value="' + SearchKeywordsTab.searchedKeyword + '" type="text"/>   <div id="go-search">      Search   </div></div></div>';
            }
            async getSearchSuggestions(e, t) {
                const n = encodeURIComponent(e);
                let r, o;
                r = "kindle" === t ? "digital-text" : "books" === t ? "stripbooks" : "audible", 
                this.siteParser instanceof l.O$ ? o = `https://completion.amazon.com/api/2017/suggestions?mid=ATVPDKIKX0DER&alias=${r}&prefix=${n}&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&limit=20&b2b=0&suggestion-type=KEYWORD&suggestion-type=WIDGET` : this.siteParser instanceof l.kA ? o = `https://completion.amazon.co.uk/api/2017/suggestions?mid=A1F83G8C2ARO7P&alias=${r}&prefix=${n}&lop=en_GB&site-variant=desktop&client-info=amazon-search-ui&limit=20&b2b=0&suggestion-type=KEYWORD&suggestion-type=WIDGET` : this.siteParser instanceof l.vE ? o = `https://completion.amazon.co.uk/api/2017/suggestions?mid=A1PA6795UKMFR9&alias=${r}&prefix=${n}&lop=de_DE&site-variant=desktop&client-info=amazon-search-ui&limit=20&b2b=0&suggestion-type=KEYWORD&suggestion-type=WIDGET` : this.siteParser instanceof l.y_ ? o = `https://completion.amazon.co.uk/api/2017/suggestions?mid=A13V1IB3VIYZZH&alias=${r}&prefix=${n}&lop=fr_FR&site-variant=desktop&client-info=amazon-search-ui&limit=20&b2b=0&suggestion-type=KEYWORD&suggestion-type=WIDGET` : this.siteParser instanceof l.ir ? o = `https://completion.amazon.com/api/2017/suggestions?mid=A2EUQ1WTGCTBG2&alias=${r}&prefix=${n}&lop=en_CA&site-variant=desktop&client-info=amazon-search-ui&limit=20&b2b=0&suggestion-type=KEYWORD&suggestion-type=WIDGET` : this.siteParser instanceof l.gu ? o = `https://completion.amazon.co.uk/api/2017/suggestions?mid=APJ6JRA9NG5V4&alias=${r}&prefix=${n}&lop=it_IT&site-variant=desktop&client-info=amazon-search-ui&limit=20&b2b=0&suggestion-type=KEYWORD&suggestion-type=WIDGET` : this.siteParser instanceof l._H ? o = `https://completion.amazon.co.uk/api/2017/suggestions?mid=A1RKKUPIHCS9HS&alias=${r}&prefix=${n}&lop=es_ES&site-variant=desktop&client-info=amazon-search-ui&limit=20&b2b=0&suggestion-type=KEYWORD&suggestion-type=WIDGET` : this.siteParser instanceof l.Wu ? o = `https://completion.amazon.co.uk/api/2017/suggestions?mid=A21TJRUUN4KGV&alias=${r}&prefix=${n}&lop=en_IN&site-variant=desktop&client-info=amazon-search-ui&limit=20&b2b=0&suggestion-type=KEYWORD&suggestion-type=WIDGET` : this.siteParser instanceof l.GB ? o = `https://completion.amazon.co.jp/api/2017/suggestions?mid=A1VC38T7YXB528&alias=${r}&prefix=${n}&lop=ja_JP&site-variant=desktop&client-info=amazon-search-ui&limit=20&b2b=0&suggestion-type=KEYWORD&suggestion-type=WIDGET` : this.siteParser instanceof l.$_ ? o = `https://completion.amazon.co.jp/api/2017/suggestions?mid=A39IBJ37TRP1C6&alias=${r}&prefix=${n}&lop=en_AU&site-variant=desktop&client-info=amazon-search-ui&limit=20&b2b=0&suggestion-type=KEYWORD&suggestion-type=WIDGET` : this.siteParser instanceof l.GW ? o = `https://completion.amazon.com/api/2017/suggestions?mid=A2Q3Y263D00KWC&alias=${r}&prefix=${n}&lop=pt_BR&site-variant=desktop&client-info=amazon-search-ui&limit=20&b2b=0&suggestion-type=KEYWORD&suggestion-type=WIDGET` : this.siteParser instanceof l.wJ && (o = `https://completion.amazon.com/api/2017/suggestions?mid=A1AM78C64UM0Y8&alias=${r}&prefix=${n}&lop=es_MX&site-variant=desktop&client-info=amazon-search-ui&limit=20&b2b=0&suggestion-type=KEYWORD&suggestion-type=WIDGET`);
                const a = "xxx-xxxxxxx-xxxxxxx".replace(/x/, (() => Math.floor(10 * Math.random())));
                o += `&session-id=${encodeURIComponent(a)}`;
                const s = await i.V.sendMessageToBackgroundAsync({
                    type: "http-get-bg",
                    data: {
                        url: o
                    }
                }), c = JSON.parse(s);
                if (!("suggestions" in c)) return [];
                const u = [];
                for (const e of c.suggestions) e.help || "scopes" in e || e.spellCorrected && exact || u.push(e.value || "");
                return u;
            }
            async showAZ() {
                const e = this, t = e.currentType;
                (0, s.$)(".table-head-keyword-search").hide(), SearchKeywordsTab.searchedKeyword = (0, 
                s.$)("#search-text").val(), SearchKeywordsTab.clearTable(), e.items[e.currentType] = [], 
                (0, s.$)("#loading-content").show();
                const n = (0, s.$)("#search-text").val(), i = [];
                for (let e = -1; e < 26; e++) {
                    const t = e >= 0 ? " " + String.fromCharCode(65 + e) : "";
                    i.push(this.getSearchSuggestions(n + t, this.currentType));
                }
                const r = await Promise.all(i);
                if (0 === r.length) return;
                const o = [ ...new Set(r.flat()) ];
                e.getFullData(o.map((e => ({
                    keyword: e,
                    volume: 0
                }))), t, (function(n) {
                    e.items[t].push(n), e.tabs.setBadges({
                        [t]: e.items[t].length
                    }), t === e.currentType && e.render(t);
                }));
            }
            search() {
                var e = this;
                (0, s.$)(".table-head-keyword-search").hide(), SearchKeywordsTab.searchedKeyword = (0, 
                s.$)("#search-text").val(), SearchKeywordsTab.clearTable(), e.items = {
                    kindle: [],
                    book: [],
                    audiobook: []
                }, (0, s.$)("#loading-content").show();
                for (let t of [ "kindle", "book", "audiobook" ]) i.V.sendMessageToActiveTab({
                    type: "get-current-url"
                }, (function(n) {
                    e.getKeywords(t, (function(n) {
                        if (0 === n.length) return (0, s.$)("#loading-content").hide(), void (0, s.$)("#content-keyword-search .no-data-found-content").show();
                        e.getFullData(n.map((e => ({
                            keyword: e,
                            volume: 0
                        }))), t, (function(n) {
                            e.items[t].push(n), e.tabs.setBadges({
                                [t]: e.items[t].length
                            }), t === e.currentType && e.render(t);
                        }));
                    }));
                }));
            }
            exportToCsv(e, t, n) {
                n = r.W.valueOrDefault(n, (function() {}));
                let o = [];
                o.push([ "#", "Keyword Suggestions", "Competitors", "Avg. Mo. Rev" ]);
                for (const [e, t] of this.items[this.currentType].entries()) o.push([ (e + 1).toString(), t.keyword ? t.keyword.toString() : "", t.competitors ? t.competitors.toString() : "", t.avgSales ? t.avgSales : "" ]);
                i.V.sendMessageToActiveTab({
                    type: "download-file",
                    data: o,
                    fileName: "search-result",
                    booksNumber: this.items[this.currentType].length
                }, n);
            }
            getFullData(e, t, n) {
                var a = this;
                new o.y;
                e.forEach((function(e) {
                    var o = r.W.getSearchUrl(e.keyword, a.siteParser, t);
                    i.V.sendMessageToActiveTab({
                        type: "get-keyword-data",
                        uri: o,
                        keyword: e,
                        booksType: t
                    }, (function(e) {
                        return n(e);
                    }));
                }));
            }
            emphasizeKeyword(e, t) {
                return e.replace(t, "<b>" + t + "</b>");
            }
            render(e) {
                SearchKeywordsTab.clearTable(), (0, s.$)("#loading-content").hide(), (0, s.$)("#content-keyword-search .content").show(), 
                (0, s.$)(".table-head-keyword-search").show();
                let t = (0, s.$)('table[name="data-keyword-search"] tbody').html();
                0 === t.trim().length && (t += '<tr><td><div style="padding-top: 20px"></div></td></tr>');
                const n = [ ...this.items[e] ].sort(((e, t) => (t.competitors || 0) - (e.competitors || 0)));
                for (const [e, i] of n.entries()) t += '<tr><td style="width: 25px; text-align: right">' + (e + 1) + '</td><td style="width: 255px; padding-left: 5px">' + this.emphasizeKeyword(i.keyword, SearchKeywordsTab.searchedKeyword) + '</td><td style="width: 75px; padding-left: 5px; text-align: right">' + r.W.addCommas(i.competitors || 0) + '</td><td style="width: 85px; padding-left: 15px">$&nbsp;<a href="#" class="keyword-get-avg" data-keyword="' + i.keyword + "\">Get...</a></td><td style=\"width: 80px; \"><div style='width:32px; height:31px; margin: -9px auto -4px auto;' class='bullet-" + i.color + "' ></div></td><td style=\"width: 115px; padding-right: 20px; text-align: right;\"><a class='keyword-analyze' href='#' keyword = '" + i.keyword + "'>Analyze</a></td></tr>";
                (0, s.$)('table[name="data-keyword-search"] thead').css("display", "block"), (0, 
                s.$)('table[name="data-keyword-search"] tbody').html(t);
            }
            async getKeywords(e, t) {
                t(await this.getSearchSuggestions((0, s.$)("#search-text").val(), e));
            }
        }
        SearchKeywordsTab.searchedKeyword = "";
    },
    148: (e, t, n) => {
        "use strict";
        n.d(t, {
            P: () => WordCloudTab
        });
        var i = n(248), r = n(357);
        class WordCloudTab {
            constructor(e) {
                this.pageNum = e, this.clouds = [];
            }
            static wordSort=532 == n.j ? function(e, t) {
                return parseInt(e.Len) < parseInt(t.Len) ? -1 : parseInt(e.Len) > parseInt(t.Len) ? 1 : 0;
            } : null;
            exportToCsv(e, t, n) {
                n = r.W.valueOrDefault(n, (function() {}));
                for (var o = this.clouds, a = new Array(o.length + 1), s = 0; s < o.length + 1; s++) a[s] = new Array(2);
                a[0][0] = "Words", a[0][1] = "Count";
                for (var l = 1, c = o.length - 1; c >= 0; c--) a[l][0] = o[c].Word, a[l][1] = o[c].Len.toString(), 
                l++;
                var u = "wc-" + r.W.getCategoryFromBookData(e);
                i.V.sendMessageToActiveTab({
                    type: "download-file",
                    data: a,
                    fileName: u,
                    booksNumber: void 0
                }, n);
            }
            shuffle(e) {
                for (var t, n, i = e.length; 0 !== i; ) n = Math.floor(Math.random() * i), t = e[i -= 1], 
                e[i] = e[n], e[n] = t;
                return e;
            }
            load(e) {
                var t = "";
                e.forEach((function(e) {
                    t += e.Title + " ";
                }));
                var n = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = t.toLowerCase()).replace(/ the /g, " ")).replace(/the /g, " ")).replace(/ a /g, " ")).replace(/ of /g, " ")).replace(/ i /g, " ")).replace(/ and /g, " ")).replace(/ in /g, " ")).replace(/ at /g, " ")).replace(/-/g, " ")).replace(/\d+/g, " ")).replace(/ and /g, " ")).replace(/ to /g, " ")).replace(/to /g, " ")).replace(/:/g, " ")).replace(/ at /g, " ")).replace(/at /g, " ")).replace(/ for /g, " ")).replace(/we /g, " ")).replace(/you /g, " ")).replace(/me /g, " ")).replace(/'/g, " ")).replace(/ our /g, " ")).replace(/,/g, " ")).replace(/will /g, " ")).replace(/ will /g, " ")).replace(/[()]/g, " ")).replace(/[{}]/g, " ")).replace(/\[/g, " ")).replace(/\]/g, " ")).replace(/&/g, " ")).replace(/\//g, " ")).replace(/!/g, " ")).replace(/book/g, " ")).replace(/novel/g, " ")).replace(/series/g, " ")).split(" ");
                this.clouds = [];
                for (var i = 0; i < n.length; i++) if (!(void 0 === n[i] || n[i].length < 1)) {
                    for (var r = !1, o = 0; o < this.clouds.length; o++) if (this.clouds[o].Word == n[i]) {
                        r = !0;
                        break;
                    }
                    if (!r) {
                        for (var a = 0, s = 0; s < n.length; s++) n[i] === n[s] && a++;
                        this.clouds.push({
                            Len: a,
                            Word: n[i]
                        });
                    }
                }
                this.clouds.sort(WordCloudTab.wordSort);
                var l = '<div style="font-size:11px;color:#a8a8a8;padding-top: 1px">Showing top 50 of ' + (this.clouds.length - 1) + " possible words:</div>", c = [], u = 0;
                for (i = this.clouds.length - 1; i >= 0; i--) {
                    for (r = !1, o = 0; o < this.clouds.length; o++) if (this.clouds[o].Len == c[i]) {
                        r = !0;
                        break;
                    }
                    if (r || this.clouds[i].Word.length > 2 && (c[u] = this.clouds[i].Len, u++), u >= 6) break;
                }
                var d = 1, p = "", h = 0, f = [];
                for (i = this.clouds.length - 1; i >= 0; i--) {
                    d = 6;
                    for (o = 0; o < c.length; o++) if (this.clouds[i].Len === c[o]) {
                        d = o + 1;
                        break;
                    }
                    if (this.clouds[i].Word.length > 2 && (this.clouds[i].Len < 2 ? f.push({
                        Level: 6,
                        Word: this.clouds[i].Word,
                        Len: this.clouds[i].Len
                    }) : f.push({
                        Level: d,
                        Word: this.clouds[i].Word,
                        Len: this.clouds[i].Len
                    })), h >= 50) break;
                    h++;
                }
                f = this.shuffle(f);
                for (i = 0; i < f.length; i++) p += '<span class="occurcnt"><span class="best' + f[i].Level + '">&nbsp;' + f[i].Word + "</span>(" + f[i].Len + ")&nbsp;</span>";
                var g = "";
                h = 1;
                for (i = this.clouds.length - 1; i >= 0; i--) if (this.clouds[i].Word.length > 2) {
                    if (g += h + ". <b style='padding-right : 15px;'>" + this.clouds[i].Word + "</b>&nbsp;&nbsp;&nbsp;&nbsp;", 
                    h >= 5) break;
                    h++;
                }
                return {
                    info: l,
                    content: p,
                    words: g
                };
            }
        }
    },
    534: (e, t, n) => {
        "use strict";
        n.d(t, {
            $: () => o
        });
        var i = n(755), r = n.n(i);
        const o = "undefined" == typeof window ? (() => {
            const {window: e} = new jsdomModule.jsdom.JSDOM("<html></html>"), t = r()(e);
            return t.get = (e, t) => {
                const n = fetch(e, {
                    method: "GET"
                }).then((e => e.text())).then((e => (void 0 !== t && t(e), e)));
                return n.fail = n.catch, n.done = n.then, n;
            }, t;
        })() : r();
    },
    755: function(e, t) {
        var n;
        /*!
 * jQuery JavaScript Library v3.6.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2022-08-26T17:52Z
 */        !function(t, n) {
            "use strict";
            "object" == typeof e.exports ? e.exports = t.document ? n(t, !0) : function(e) {
                if (!e.document) throw new Error("jQuery requires a window with a document");
                return n(e);
            } : n(t);
        }("undefined" != typeof window ? window : this, (function(i, r) {
            "use strict";
            var o = [], a = Object.getPrototypeOf, s = o.slice, l = o.flat ? function(e) {
                return o.flat.call(e);
            } : function(e) {
                return o.concat.apply([], e);
            }, c = o.push, u = o.indexOf, d = {}, p = d.toString, h = d.hasOwnProperty, f = h.toString, g = f.call(Object), m = {}, isFunction = function(e) {
                return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item;
            }, isWindow = function(e) {
                return null != e && e === e.window;
            }, y = i.document, v = {
                type: !0,
                src: !0,
                nonce: !0,
                noModule: !0
            };
            function DOMEval(e, t, n) {
                var i, r, o = (n = n || y).createElement("script");
                if (o.text = e, t) for (i in v) (r = t[i] || t.getAttribute && t.getAttribute(i)) && o.setAttribute(i, r);
                n.head.appendChild(o).parentNode.removeChild(o);
            }
            function toType(e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? d[p.call(e)] || "object" : typeof e;
            }
            var b = "3.6.1", jQuery = function(e, t) {
                return new jQuery.fn.init(e, t);
            };
            function isArrayLike(e) {
                var t = !!e && "length" in e && e.length, n = toType(e);
                return !isFunction(e) && !isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e);
            }
            jQuery.fn = jQuery.prototype = {
                jquery: b,
                constructor: jQuery,
                length: 0,
                toArray: function() {
                    return s.call(this);
                },
                get: function(e) {
                    return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e];
                },
                pushStack: function(e) {
                    var t = jQuery.merge(this.constructor(), e);
                    return t.prevObject = this, t;
                },
                each: function(e) {
                    return jQuery.each(this, e);
                },
                map: function(e) {
                    return this.pushStack(jQuery.map(this, (function(t, n) {
                        return e.call(t, n, t);
                    })));
                },
                slice: function() {
                    return this.pushStack(s.apply(this, arguments));
                },
                first: function() {
                    return this.eq(0);
                },
                last: function() {
                    return this.eq(-1);
                },
                even: function() {
                    return this.pushStack(jQuery.grep(this, (function(e, t) {
                        return (t + 1) % 2;
                    })));
                },
                odd: function() {
                    return this.pushStack(jQuery.grep(this, (function(e, t) {
                        return t % 2;
                    })));
                },
                eq: function(e) {
                    var t = this.length, n = +e + (e < 0 ? t : 0);
                    return this.pushStack(n >= 0 && n < t ? [ this[n] ] : []);
                },
                end: function() {
                    return this.prevObject || this.constructor();
                },
                push: c,
                sort: o.sort,
                splice: o.splice
            }, jQuery.extend = jQuery.fn.extend = function() {
                var e, t, n, i, r, o, a = arguments[0] || {}, s = 1, l = arguments.length, c = !1;
                for ("boolean" == typeof a && (c = a, a = arguments[s] || {}, s++), "object" == typeof a || isFunction(a) || (a = {}), 
                s === l && (a = this, s--); s < l; s++) if (null != (e = arguments[s])) for (t in e) i = e[t], 
                "__proto__" !== t && a !== i && (c && i && (jQuery.isPlainObject(i) || (r = Array.isArray(i))) ? (n = a[t], 
                o = r && !Array.isArray(n) ? [] : r || jQuery.isPlainObject(n) ? n : {}, r = !1, 
                a[t] = jQuery.extend(c, o, i)) : void 0 !== i && (a[t] = i));
                return a;
            }, jQuery.extend({
                expando: "jQuery" + (b + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(e) {
                    throw new Error(e);
                },
                noop: function() {},
                isPlainObject: function(e) {
                    var t, n;
                    return !(!e || "[object Object]" !== p.call(e)) && (!(t = a(e)) || "function" == typeof (n = h.call(t, "constructor") && t.constructor) && f.call(n) === g);
                },
                isEmptyObject: function(e) {
                    var t;
                    for (t in e) return !1;
                    return !0;
                },
                globalEval: function(e, t, n) {
                    DOMEval(e, {
                        nonce: t && t.nonce
                    }, n);
                },
                each: function(e, t) {
                    var n, i = 0;
                    if (isArrayLike(e)) for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++) ; else for (i in e) if (!1 === t.call(e[i], i, e[i])) break;
                    return e;
                },
                makeArray: function(e, t) {
                    var n = t || [];
                    return null != e && (isArrayLike(Object(e)) ? jQuery.merge(n, "string" == typeof e ? [ e ] : e) : c.call(n, e)), 
                    n;
                },
                inArray: function(e, t, n) {
                    return null == t ? -1 : u.call(t, e, n);
                },
                merge: function(e, t) {
                    for (var n = +t.length, i = 0, r = e.length; i < n; i++) e[r++] = t[i];
                    return e.length = r, e;
                },
                grep: function(e, t, n) {
                    for (var i = [], r = 0, o = e.length, a = !n; r < o; r++) !t(e[r], r) !== a && i.push(e[r]);
                    return i;
                },
                map: function(e, t, n) {
                    var i, r, o = 0, a = [];
                    if (isArrayLike(e)) for (i = e.length; o < i; o++) null != (r = t(e[o], o, n)) && a.push(r); else for (o in e) null != (r = t(e[o], o, n)) && a.push(r);
                    return l(a);
                },
                guid: 1,
                support: m
            }), "function" == typeof Symbol && (jQuery.fn[Symbol.iterator] = o[Symbol.iterator]), 
            jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), (function(e, t) {
                d["[object " + t + "]"] = t.toLowerCase();
            }));
            var x = 
            /*!
 * Sizzle CSS Selector Engine v2.3.6
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2021-02-16
 */
            function(e) {
                var t, n, i, r, o, a, s, l, c, u, d, p, h, f, g, m, y, v, b, x = "sizzle" + 1 * new Date, w = e.document, T = 0, k = 0, C = createCache(), S = createCache(), A = createCache(), $ = createCache(), sortOrder = function(e, t) {
                    return e === t && (d = !0), 0;
                }, R = {}.hasOwnProperty, D = [], P = D.pop, E = D.push, N = D.push, L = D.slice, indexOf = function(e, t) {
                    for (var n = 0, i = e.length; n < i; n++) if (e[n] === t) return n;
                    return -1;
                }, M = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", B = "[\\x20\\t\\r\\n\\f]", W = "(?:\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", I = "\\[[\\x20\\t\\r\\n\\f]*(" + W + ")(?:" + B + "*([*^$|!~]?=)" + B + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + W + "))|)" + B + "*\\]", j = ":(" + W + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + I + ")*)|.*)\\)|)", O = new RegExp(B + "+", "g"), F = new RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g"), z = new RegExp("^[\\x20\\t\\r\\n\\f]*,[\\x20\\t\\r\\n\\f]*"), H = new RegExp("^[\\x20\\t\\r\\n\\f]*([>+~]|[\\x20\\t\\r\\n\\f])[\\x20\\t\\r\\n\\f]*"), q = new RegExp(B + "|>"), _ = new RegExp(j), K = new RegExp("^" + W + "$"), V = {
                    ID: new RegExp("^#(" + W + ")"),
                    CLASS: new RegExp("^\\.(" + W + ")"),
                    TAG: new RegExp("^(" + W + "|[*])"),
                    ATTR: new RegExp("^" + I),
                    PSEUDO: new RegExp("^" + j),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)", "i"),
                    bool: new RegExp("^(?:" + M + ")$", "i"),
                    needsContext: new RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)", "i")
                }, U = /HTML$/i, G = /^(?:input|select|textarea|button)$/i, J = /^h\d$/i, Y = /^[^{]+\{\s*\[native \w/, X = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, Z = /[+~]/, Q = new RegExp("\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\([^\\r\\n\\f])", "g"), funescape = function(e, t) {
                    var n = "0x" + e.slice(1) - 65536;
                    return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320));
                }, ee = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, fcssescape = function(e, t) {
                    return t ? "\0" === e ? "\ufffd" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e;
                }, unloadHandler = function() {
                    p();
                }, te = addCombinator((function(e) {
                    return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase();
                }), {
                    dir: "parentNode",
                    next: "legend"
                });
                try {
                    N.apply(D = L.call(w.childNodes), w.childNodes), D[w.childNodes.length].nodeType;
                } catch (e) {
                    N = {
                        apply: D.length ? function(e, t) {
                            E.apply(e, L.call(t));
                        } : function(e, t) {
                            for (var n = e.length, i = 0; e[n++] = t[i++]; ) ;
                            e.length = n - 1;
                        }
                    };
                }
                function Sizzle(e, t, i, r) {
                    var o, s, c, u, d, f, y, v = t && t.ownerDocument, w = t ? t.nodeType : 9;
                    if (i = i || [], "string" != typeof e || !e || 1 !== w && 9 !== w && 11 !== w) return i;
                    if (!r && (p(t), t = t || h, g)) {
                        if (11 !== w && (d = X.exec(e))) if (o = d[1]) {
                            if (9 === w) {
                                if (!(c = t.getElementById(o))) return i;
                                if (c.id === o) return i.push(c), i;
                            } else if (v && (c = v.getElementById(o)) && b(t, c) && c.id === o) return i.push(c), 
                            i;
                        } else {
                            if (d[2]) return N.apply(i, t.getElementsByTagName(e)), i;
                            if ((o = d[3]) && n.getElementsByClassName && t.getElementsByClassName) return N.apply(i, t.getElementsByClassName(o)), 
                            i;
                        }
                        if (n.qsa && !$[e + " "] && (!m || !m.test(e)) && (1 !== w || "object" !== t.nodeName.toLowerCase())) {
                            if (y = e, v = t, 1 === w && (q.test(e) || H.test(e))) {
                                for ((v = Z.test(e) && testContext(t.parentNode) || t) === t && n.scope || ((u = t.getAttribute("id")) ? u = u.replace(ee, fcssescape) : t.setAttribute("id", u = x)), 
                                s = (f = a(e)).length; s--; ) f[s] = (u ? "#" + u : ":scope") + " " + toSelector(f[s]);
                                y = f.join(",");
                            }
                            try {
                                return N.apply(i, v.querySelectorAll(y)), i;
                            } catch (t) {
                                $(e, !0);
                            } finally {
                                u === x && t.removeAttribute("id");
                            }
                        }
                    }
                    return l(e.replace(F, "$1"), t, i, r);
                }
                function createCache() {
                    var e = [];
                    return function cache(t, n) {
                        return e.push(t + " ") > i.cacheLength && delete cache[e.shift()], cache[t + " "] = n;
                    };
                }
                function markFunction(e) {
                    return e[x] = !0, e;
                }
                function assert(e) {
                    var t = h.createElement("fieldset");
                    try {
                        return !!e(t);
                    } catch (e) {
                        return !1;
                    } finally {
                        t.parentNode && t.parentNode.removeChild(t), t = null;
                    }
                }
                function addHandle(e, t) {
                    for (var n = e.split("|"), r = n.length; r--; ) i.attrHandle[n[r]] = t;
                }
                function siblingCheck(e, t) {
                    var n = t && e, i = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                    if (i) return i;
                    if (n) for (;n = n.nextSibling; ) if (n === t) return -1;
                    return e ? 1 : -1;
                }
                function createInputPseudo(e) {
                    return function(t) {
                        return "input" === t.nodeName.toLowerCase() && t.type === e;
                    };
                }
                function createButtonPseudo(e) {
                    return function(t) {
                        var n = t.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && t.type === e;
                    };
                }
                function createDisabledPseudo(e) {
                    return function(t) {
                        return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && te(t) === e : t.disabled === e : "label" in t && t.disabled === e;
                    };
                }
                function createPositionalPseudo(e) {
                    return markFunction((function(t) {
                        return t = +t, markFunction((function(n, i) {
                            for (var r, o = e([], n.length, t), a = o.length; a--; ) n[r = o[a]] && (n[r] = !(i[r] = n[r]));
                        }));
                    }));
                }
                function testContext(e) {
                    return e && void 0 !== e.getElementsByTagName && e;
                }
                for (t in n = Sizzle.support = {}, o = Sizzle.isXML = function(e) {
                    var t = e && e.namespaceURI, n = e && (e.ownerDocument || e).documentElement;
                    return !U.test(t || n && n.nodeName || "HTML");
                }, p = Sizzle.setDocument = function(e) {
                    var t, r, a = e ? e.ownerDocument || e : w;
                    return a != h && 9 === a.nodeType && a.documentElement ? (f = (h = a).documentElement, 
                    g = !o(h), w != h && (r = h.defaultView) && r.top !== r && (r.addEventListener ? r.addEventListener("unload", unloadHandler, !1) : r.attachEvent && r.attachEvent("onunload", unloadHandler)), 
                    n.scope = assert((function(e) {
                        return f.appendChild(e).appendChild(h.createElement("div")), void 0 !== e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length;
                    })), n.attributes = assert((function(e) {
                        return e.className = "i", !e.getAttribute("className");
                    })), n.getElementsByTagName = assert((function(e) {
                        return e.appendChild(h.createComment("")), !e.getElementsByTagName("*").length;
                    })), n.getElementsByClassName = Y.test(h.getElementsByClassName), n.getById = assert((function(e) {
                        return f.appendChild(e).id = x, !h.getElementsByName || !h.getElementsByName(x).length;
                    })), n.getById ? (i.filter.ID = function(e) {
                        var t = e.replace(Q, funescape);
                        return function(e) {
                            return e.getAttribute("id") === t;
                        };
                    }, i.find.ID = function(e, t) {
                        if (void 0 !== t.getElementById && g) {
                            var n = t.getElementById(e);
                            return n ? [ n ] : [];
                        }
                    }) : (i.filter.ID = function(e) {
                        var t = e.replace(Q, funescape);
                        return function(e) {
                            var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                            return n && n.value === t;
                        };
                    }, i.find.ID = function(e, t) {
                        if (void 0 !== t.getElementById && g) {
                            var n, i, r, o = t.getElementById(e);
                            if (o) {
                                if ((n = o.getAttributeNode("id")) && n.value === e) return [ o ];
                                for (r = t.getElementsByName(e), i = 0; o = r[i++]; ) if ((n = o.getAttributeNode("id")) && n.value === e) return [ o ];
                            }
                            return [];
                        }
                    }), i.find.TAG = n.getElementsByTagName ? function(e, t) {
                        return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0;
                    } : function(e, t) {
                        var n, i = [], r = 0, o = t.getElementsByTagName(e);
                        if ("*" === e) {
                            for (;n = o[r++]; ) 1 === n.nodeType && i.push(n);
                            return i;
                        }
                        return o;
                    }, i.find.CLASS = n.getElementsByClassName && function(e, t) {
                        if (void 0 !== t.getElementsByClassName && g) return t.getElementsByClassName(e);
                    }, y = [], m = [], (n.qsa = Y.test(h.querySelectorAll)) && (assert((function(e) {
                        var t;
                        f.appendChild(e).innerHTML = "<a id='" + x + "'></a><select id='" + x + "-\r\\' msallowcapture=''><option selected=''></option></select>", 
                        e.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")"), 
                        e.querySelectorAll("[selected]").length || m.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|" + M + ")"), 
                        e.querySelectorAll("[id~=" + x + "-]").length || m.push("~="), (t = h.createElement("input")).setAttribute("name", ""), 
                        e.appendChild(t), e.querySelectorAll("[name='']").length || m.push("\\[[\\x20\\t\\r\\n\\f]*name[\\x20\\t\\r\\n\\f]*=[\\x20\\t\\r\\n\\f]*(?:''|\"\")"), 
                        e.querySelectorAll(":checked").length || m.push(":checked"), e.querySelectorAll("a#" + x + "+*").length || m.push(".#.+[+~]"), 
                        e.querySelectorAll("\\\f"), m.push("[\\r\\n\\f]");
                    })), assert((function(e) {
                        e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                        var t = h.createElement("input");
                        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?="), 
                        2 !== e.querySelectorAll(":enabled").length && m.push(":enabled", ":disabled"), 
                        f.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && m.push(":enabled", ":disabled"), 
                        e.querySelectorAll("*,:x"), m.push(",.*:");
                    }))), (n.matchesSelector = Y.test(v = f.matches || f.webkitMatchesSelector || f.mozMatchesSelector || f.oMatchesSelector || f.msMatchesSelector)) && assert((function(e) {
                        n.disconnectedMatch = v.call(e, "*"), v.call(e, "[s!='']:x"), y.push("!=", j);
                    })), m = m.length && new RegExp(m.join("|")), y = y.length && new RegExp(y.join("|")), 
                    t = Y.test(f.compareDocumentPosition), b = t || Y.test(f.contains) ? function(e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e, i = t && t.parentNode;
                        return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)));
                    } : function(e, t) {
                        if (t) for (;t = t.parentNode; ) if (t === e) return !0;
                        return !1;
                    }, sortOrder = t ? function(e, t) {
                        if (e === t) return d = !0, 0;
                        var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
                        return i || (1 & (i = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === i ? e == h || e.ownerDocument == w && b(w, e) ? -1 : t == h || t.ownerDocument == w && b(w, t) ? 1 : u ? indexOf(u, e) - indexOf(u, t) : 0 : 4 & i ? -1 : 1);
                    } : function(e, t) {
                        if (e === t) return d = !0, 0;
                        var n, i = 0, r = e.parentNode, o = t.parentNode, a = [ e ], s = [ t ];
                        if (!r || !o) return e == h ? -1 : t == h ? 1 : r ? -1 : o ? 1 : u ? indexOf(u, e) - indexOf(u, t) : 0;
                        if (r === o) return siblingCheck(e, t);
                        for (n = e; n = n.parentNode; ) a.unshift(n);
                        for (n = t; n = n.parentNode; ) s.unshift(n);
                        for (;a[i] === s[i]; ) i++;
                        return i ? siblingCheck(a[i], s[i]) : a[i] == w ? -1 : s[i] == w ? 1 : 0;
                    }, h) : h;
                }, Sizzle.matches = function(e, t) {
                    return Sizzle(e, null, null, t);
                }, Sizzle.matchesSelector = function(e, t) {
                    if (p(e), n.matchesSelector && g && !$[t + " "] && (!y || !y.test(t)) && (!m || !m.test(t))) try {
                        var i = v.call(e, t);
                        if (i || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i;
                    } catch (e) {
                        $(t, !0);
                    }
                    return Sizzle(t, h, null, [ e ]).length > 0;
                }, Sizzle.contains = function(e, t) {
                    return (e.ownerDocument || e) != h && p(e), b(e, t);
                }, Sizzle.attr = function(e, t) {
                    (e.ownerDocument || e) != h && p(e);
                    var r = i.attrHandle[t.toLowerCase()], o = r && R.call(i.attrHandle, t.toLowerCase()) ? r(e, t, !g) : void 0;
                    return void 0 !== o ? o : n.attributes || !g ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null;
                }, Sizzle.escape = function(e) {
                    return (e + "").replace(ee, fcssescape);
                }, Sizzle.error = function(e) {
                    throw new Error("Syntax error, unrecognized expression: " + e);
                }, Sizzle.uniqueSort = function(e) {
                    var t, i = [], r = 0, o = 0;
                    if (d = !n.detectDuplicates, u = !n.sortStable && e.slice(0), e.sort(sortOrder), 
                    d) {
                        for (;t = e[o++]; ) t === e[o] && (r = i.push(o));
                        for (;r--; ) e.splice(i[r], 1);
                    }
                    return u = null, e;
                }, r = Sizzle.getText = function(e) {
                    var t, n = "", i = 0, o = e.nodeType;
                    if (o) {
                        if (1 === o || 9 === o || 11 === o) {
                            if ("string" == typeof e.textContent) return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling) n += r(e);
                        } else if (3 === o || 4 === o) return e.nodeValue;
                    } else for (;t = e[i++]; ) n += r(t);
                    return n;
                }, i = Sizzle.selectors = {
                    cacheLength: 50,
                    createPseudo: markFunction,
                    match: V,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(e) {
                            return e[1] = e[1].replace(Q, funescape), e[3] = (e[3] || e[4] || e[5] || "").replace(Q, funescape), 
                            "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                        },
                        CHILD: function(e) {
                            return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || Sizzle.error(e[0]), 
                            e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && Sizzle.error(e[0]), 
                            e;
                        },
                        PSEUDO: function(e) {
                            var t, n = !e[6] && e[2];
                            return V.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && _.test(n) && (t = a(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), 
                            e[2] = n.slice(0, t)), e.slice(0, 3));
                        }
                    },
                    filter: {
                        TAG: function(e) {
                            var t = e.replace(Q, funescape).toLowerCase();
                            return "*" === e ? function() {
                                return !0;
                            } : function(e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t;
                            };
                        },
                        CLASS: function(e) {
                            var t = C[e + " "];
                            return t || (t = new RegExp("(^|[\\x20\\t\\r\\n\\f])" + e + "(" + B + "|$)")) && C(e, (function(e) {
                                return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "");
                            }));
                        },
                        ATTR: function(e, t, n) {
                            return function(i) {
                                var r = Sizzle.attr(i, e);
                                return null == r ? "!=" === t : !t || (r += "", "=" === t ? r === n : "!=" === t ? r !== n : "^=" === t ? n && 0 === r.indexOf(n) : "*=" === t ? n && r.indexOf(n) > -1 : "$=" === t ? n && r.slice(-n.length) === n : "~=" === t ? (" " + r.replace(O, " ") + " ").indexOf(n) > -1 : "|=" === t && (r === n || r.slice(0, n.length + 1) === n + "-"));
                            };
                        },
                        CHILD: function(e, t, n, i, r) {
                            var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
                            return 1 === i && 0 === r ? function(e) {
                                return !!e.parentNode;
                            } : function(t, n, l) {
                                var c, u, d, p, h, f, g = o !== a ? "nextSibling" : "previousSibling", m = t.parentNode, y = s && t.nodeName.toLowerCase(), v = !l && !s, b = !1;
                                if (m) {
                                    if (o) {
                                        for (;g; ) {
                                            for (p = t; p = p[g]; ) if (s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) return !1;
                                            f = g = "only" === e && !f && "nextSibling";
                                        }
                                        return !0;
                                    }
                                    if (f = [ a ? m.firstChild : m.lastChild ], a && v) {
                                        for (b = (h = (c = (u = (d = (p = m)[x] || (p[x] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[e] || [])[0] === T && c[1]) && c[2], 
                                        p = h && m.childNodes[h]; p = ++h && p && p[g] || (b = h = 0) || f.pop(); ) if (1 === p.nodeType && ++b && p === t) {
                                            u[e] = [ T, h, b ];
                                            break;
                                        }
                                    } else if (v && (b = h = (c = (u = (d = (p = t)[x] || (p[x] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[e] || [])[0] === T && c[1]), 
                                    !1 === b) for (;(p = ++h && p && p[g] || (b = h = 0) || f.pop()) && ((s ? p.nodeName.toLowerCase() !== y : 1 !== p.nodeType) || !++b || (v && ((u = (d = p[x] || (p[x] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[e] = [ T, b ]), 
                                    p !== t)); ) ;
                                    return (b -= r) === i || b % i == 0 && b / i >= 0;
                                }
                            };
                        },
                        PSEUDO: function(e, t) {
                            var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || Sizzle.error("unsupported pseudo: " + e);
                            return r[x] ? r(t) : r.length > 1 ? (n = [ e, e, "", t ], i.setFilters.hasOwnProperty(e.toLowerCase()) ? markFunction((function(e, n) {
                                for (var i, o = r(e, t), a = o.length; a--; ) e[i = indexOf(e, o[a])] = !(n[i] = o[a]);
                            })) : function(e) {
                                return r(e, 0, n);
                            }) : r;
                        }
                    },
                    pseudos: {
                        not: markFunction((function(e) {
                            var t = [], n = [], i = s(e.replace(F, "$1"));
                            return i[x] ? markFunction((function(e, t, n, r) {
                                for (var o, a = i(e, null, r, []), s = e.length; s--; ) (o = a[s]) && (e[s] = !(t[s] = o));
                            })) : function(e, r, o) {
                                return t[0] = e, i(t, null, o, n), t[0] = null, !n.pop();
                            };
                        })),
                        has: markFunction((function(e) {
                            return function(t) {
                                return Sizzle(e, t).length > 0;
                            };
                        })),
                        contains: markFunction((function(e) {
                            return e = e.replace(Q, funescape), function(t) {
                                return (t.textContent || r(t)).indexOf(e) > -1;
                            };
                        })),
                        lang: markFunction((function(e) {
                            return K.test(e || "") || Sizzle.error("unsupported lang: " + e), e = e.replace(Q, funescape).toLowerCase(), 
                            function(t) {
                                var n;
                                do {
                                    if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-");
                                } while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1;
                            };
                        })),
                        target: function(t) {
                            var n = e.location && e.location.hash;
                            return n && n.slice(1) === t.id;
                        },
                        root: function(e) {
                            return e === f;
                        },
                        focus: function(e) {
                            return e === h.activeElement && (!h.hasFocus || h.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                        },
                        enabled: createDisabledPseudo(!1),
                        disabled: createDisabledPseudo(!0),
                        checked: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && !!e.checked || "option" === t && !!e.selected;
                        },
                        selected: function(e) {
                            return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
                        },
                        empty: function(e) {
                            for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                            return !0;
                        },
                        parent: function(e) {
                            return !i.pseudos.empty(e);
                        },
                        header: function(e) {
                            return J.test(e.nodeName);
                        },
                        input: function(e) {
                            return G.test(e.nodeName);
                        },
                        button: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && "button" === e.type || "button" === t;
                        },
                        text: function(e) {
                            var t;
                            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
                        },
                        first: createPositionalPseudo((function() {
                            return [ 0 ];
                        })),
                        last: createPositionalPseudo((function(e, t) {
                            return [ t - 1 ];
                        })),
                        eq: createPositionalPseudo((function(e, t, n) {
                            return [ n < 0 ? n + t : n ];
                        })),
                        even: createPositionalPseudo((function(e, t) {
                            for (var n = 0; n < t; n += 2) e.push(n);
                            return e;
                        })),
                        odd: createPositionalPseudo((function(e, t) {
                            for (var n = 1; n < t; n += 2) e.push(n);
                            return e;
                        })),
                        lt: createPositionalPseudo((function(e, t, n) {
                            for (var i = n < 0 ? n + t : n > t ? t : n; --i >= 0; ) e.push(i);
                            return e;
                        })),
                        gt: createPositionalPseudo((function(e, t, n) {
                            for (var i = n < 0 ? n + t : n; ++i < t; ) e.push(i);
                            return e;
                        }))
                    }
                }, i.pseudos.nth = i.pseudos.eq, {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) i.pseudos[t] = createInputPseudo(t);
                for (t in {
                    submit: !0,
                    reset: !0
                }) i.pseudos[t] = createButtonPseudo(t);
                function setFilters() {}
                function toSelector(e) {
                    for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
                    return i;
                }
                function addCombinator(e, t, n) {
                    var i = t.dir, r = t.next, o = r || i, a = n && "parentNode" === o, s = k++;
                    return t.first ? function(t, n, r) {
                        for (;t = t[i]; ) if (1 === t.nodeType || a) return e(t, n, r);
                        return !1;
                    } : function(t, n, l) {
                        var c, u, d, p = [ T, s ];
                        if (l) {
                            for (;t = t[i]; ) if ((1 === t.nodeType || a) && e(t, n, l)) return !0;
                        } else for (;t = t[i]; ) if (1 === t.nodeType || a) if (u = (d = t[x] || (t[x] = {}))[t.uniqueID] || (d[t.uniqueID] = {}), 
                        r && r === t.nodeName.toLowerCase()) t = t[i] || t; else {
                            if ((c = u[o]) && c[0] === T && c[1] === s) return p[2] = c[2];
                            if (u[o] = p, p[2] = e(t, n, l)) return !0;
                        }
                        return !1;
                    };
                }
                function elementMatcher(e) {
                    return e.length > 1 ? function(t, n, i) {
                        for (var r = e.length; r--; ) if (!e[r](t, n, i)) return !1;
                        return !0;
                    } : e[0];
                }
                function condense(e, t, n, i, r) {
                    for (var o, a = [], s = 0, l = e.length, c = null != t; s < l; s++) (o = e[s]) && (n && !n(o, i, r) || (a.push(o), 
                    c && t.push(s)));
                    return a;
                }
                function setMatcher(e, t, n, i, r, o) {
                    return i && !i[x] && (i = setMatcher(i)), r && !r[x] && (r = setMatcher(r, o)), 
                    markFunction((function(o, a, s, l) {
                        var c, u, d, p = [], h = [], f = a.length, g = o || function(e, t, n) {
                            for (var i = 0, r = t.length; i < r; i++) Sizzle(e, t[i], n);
                            return n;
                        }(t || "*", s.nodeType ? [ s ] : s, []), m = !e || !o && t ? g : condense(g, p, e, s, l), y = n ? r || (o ? e : f || i) ? [] : a : m;
                        if (n && n(m, y, s, l), i) for (c = condense(y, h), i(c, [], s, l), u = c.length; u--; ) (d = c[u]) && (y[h[u]] = !(m[h[u]] = d));
                        if (o) {
                            if (r || e) {
                                if (r) {
                                    for (c = [], u = y.length; u--; ) (d = y[u]) && c.push(m[u] = d);
                                    r(null, y = [], c, l);
                                }
                                for (u = y.length; u--; ) (d = y[u]) && (c = r ? indexOf(o, d) : p[u]) > -1 && (o[c] = !(a[c] = d));
                            }
                        } else y = condense(y === a ? y.splice(f, y.length) : y), r ? r(null, a, y, l) : N.apply(a, y);
                    }));
                }
                function matcherFromTokens(e) {
                    for (var t, n, r, o = e.length, a = i.relative[e[0].type], s = a || i.relative[" "], l = a ? 1 : 0, u = addCombinator((function(e) {
                        return e === t;
                    }), s, !0), d = addCombinator((function(e) {
                        return indexOf(t, e) > -1;
                    }), s, !0), p = [ function(e, n, i) {
                        var r = !a && (i || n !== c) || ((t = n).nodeType ? u(e, n, i) : d(e, n, i));
                        return t = null, r;
                    } ]; l < o; l++) if (n = i.relative[e[l].type]) p = [ addCombinator(elementMatcher(p), n) ]; else {
                        if ((n = i.filter[e[l].type].apply(null, e[l].matches))[x]) {
                            for (r = ++l; r < o && !i.relative[e[r].type]; r++) ;
                            return setMatcher(l > 1 && elementMatcher(p), l > 1 && toSelector(e.slice(0, l - 1).concat({
                                value: " " === e[l - 2].type ? "*" : ""
                            })).replace(F, "$1"), n, l < r && matcherFromTokens(e.slice(l, r)), r < o && matcherFromTokens(e = e.slice(r)), r < o && toSelector(e));
                        }
                        p.push(n);
                    }
                    return elementMatcher(p);
                }
                return setFilters.prototype = i.filters = i.pseudos, i.setFilters = new setFilters, 
                a = Sizzle.tokenize = function(e, t) {
                    var n, r, o, a, s, l, c, u = S[e + " "];
                    if (u) return t ? 0 : u.slice(0);
                    for (s = e, l = [], c = i.preFilter; s; ) {
                        for (a in n && !(r = z.exec(s)) || (r && (s = s.slice(r[0].length) || s), l.push(o = [])), 
                        n = !1, (r = H.exec(s)) && (n = r.shift(), o.push({
                            value: n,
                            type: r[0].replace(F, " ")
                        }), s = s.slice(n.length)), i.filter) !(r = V[a].exec(s)) || c[a] && !(r = c[a](r)) || (n = r.shift(), 
                        o.push({
                            value: n,
                            type: a,
                            matches: r
                        }), s = s.slice(n.length));
                        if (!n) break;
                    }
                    return t ? s.length : s ? Sizzle.error(e) : S(e, l).slice(0);
                }, s = Sizzle.compile = function(e, t) {
                    var n, r = [], o = [], s = A[e + " "];
                    if (!s) {
                        for (t || (t = a(e)), n = t.length; n--; ) (s = matcherFromTokens(t[n]))[x] ? r.push(s) : o.push(s);
                        s = A(e, function(e, t) {
                            var n = t.length > 0, r = e.length > 0, superMatcher = function(o, a, s, l, u) {
                                var d, f, m, y = 0, v = "0", b = o && [], x = [], w = c, k = o || r && i.find.TAG("*", u), C = T += null == w ? 1 : Math.random() || .1, S = k.length;
                                for (u && (c = a == h || a || u); v !== S && null != (d = k[v]); v++) {
                                    if (r && d) {
                                        for (f = 0, a || d.ownerDocument == h || (p(d), s = !g); m = e[f++]; ) if (m(d, a || h, s)) {
                                            l.push(d);
                                            break;
                                        }
                                        u && (T = C);
                                    }
                                    n && ((d = !m && d) && y--, o && b.push(d));
                                }
                                if (y += v, n && v !== y) {
                                    for (f = 0; m = t[f++]; ) m(b, x, a, s);
                                    if (o) {
                                        if (y > 0) for (;v--; ) b[v] || x[v] || (x[v] = P.call(l));
                                        x = condense(x);
                                    }
                                    N.apply(l, x), u && !o && x.length > 0 && y + t.length > 1 && Sizzle.uniqueSort(l);
                                }
                                return u && (T = C, c = w), b;
                            };
                            return n ? markFunction(superMatcher) : superMatcher;
                        }(o, r)), s.selector = e;
                    }
                    return s;
                }, l = Sizzle.select = function(e, t, n, r) {
                    var o, l, c, u, d, p = "function" == typeof e && e, h = !r && a(e = p.selector || e);
                    if (n = n || [], 1 === h.length) {
                        if ((l = h[0] = h[0].slice(0)).length > 2 && "ID" === (c = l[0]).type && 9 === t.nodeType && g && i.relative[l[1].type]) {
                            if (!(t = (i.find.ID(c.matches[0].replace(Q, funescape), t) || [])[0])) return n;
                            p && (t = t.parentNode), e = e.slice(l.shift().value.length);
                        }
                        for (o = V.needsContext.test(e) ? 0 : l.length; o-- && (c = l[o], !i.relative[u = c.type]); ) if ((d = i.find[u]) && (r = d(c.matches[0].replace(Q, funescape), Z.test(l[0].type) && testContext(t.parentNode) || t))) {
                            if (l.splice(o, 1), !(e = r.length && toSelector(l))) return N.apply(n, r), n;
                            break;
                        }
                    }
                    return (p || s(e, h))(r, t, !g, n, !t || Z.test(e) && testContext(t.parentNode) || t), 
                    n;
                }, n.sortStable = x.split("").sort(sortOrder).join("") === x, n.detectDuplicates = !!d, 
                p(), n.sortDetached = assert((function(e) {
                    return 1 & e.compareDocumentPosition(h.createElement("fieldset"));
                })), assert((function(e) {
                    return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
                })) || addHandle("type|href|height|width", (function(e, t, n) {
                    if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
                })), n.attributes && assert((function(e) {
                    return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
                })) || addHandle("value", (function(e, t, n) {
                    if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
                })), assert((function(e) {
                    return null == e.getAttribute("disabled");
                })) || addHandle(M, (function(e, t, n) {
                    var i;
                    if (!n) return !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null;
                })), Sizzle;
            }(i);
            jQuery.find = x, jQuery.expr = x.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, 
            jQuery.uniqueSort = jQuery.unique = x.uniqueSort, jQuery.text = x.getText, jQuery.isXMLDoc = x.isXML, 
            jQuery.contains = x.contains, jQuery.escapeSelector = x.escape;
            var dir = function(e, t, n) {
                for (var i = [], r = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; ) if (1 === e.nodeType) {
                    if (r && jQuery(e).is(n)) break;
                    i.push(e);
                }
                return i;
            }, siblings = function(e, t) {
                for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                return n;
            }, w = jQuery.expr.match.needsContext;
            function nodeName(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
            }
            var T = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
            function winnow(e, t, n) {
                return isFunction(t) ? jQuery.grep(e, (function(e, i) {
                    return !!t.call(e, i, e) !== n;
                })) : t.nodeType ? jQuery.grep(e, (function(e) {
                    return e === t !== n;
                })) : "string" != typeof t ? jQuery.grep(e, (function(e) {
                    return u.call(t, e) > -1 !== n;
                })) : jQuery.filter(t, e, n);
            }
            jQuery.filter = function(e, t, n) {
                var i = t[0];
                return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? jQuery.find.matchesSelector(i, e) ? [ i ] : [] : jQuery.find.matches(e, jQuery.grep(t, (function(e) {
                    return 1 === e.nodeType;
                })));
            }, jQuery.fn.extend({
                find: function(e) {
                    var t, n, i = this.length, r = this;
                    if ("string" != typeof e) return this.pushStack(jQuery(e).filter((function() {
                        for (t = 0; t < i; t++) if (jQuery.contains(r[t], this)) return !0;
                    })));
                    for (n = this.pushStack([]), t = 0; t < i; t++) jQuery.find(e, r[t], n);
                    return i > 1 ? jQuery.uniqueSort(n) : n;
                },
                filter: function(e) {
                    return this.pushStack(winnow(this, e || [], !1));
                },
                not: function(e) {
                    return this.pushStack(winnow(this, e || [], !0));
                },
                is: function(e) {
                    return !!winnow(this, "string" == typeof e && w.test(e) ? jQuery(e) : e || [], !1).length;
                }
            });
            var k, C = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
            (jQuery.fn.init = function(e, t, n) {
                var i, r;
                if (!e) return this;
                if (n = n || k, "string" == typeof e) {
                    if (!(i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [ null, e, null ] : C.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                    if (i[1]) {
                        if (t = t instanceof jQuery ? t[0] : t, jQuery.merge(this, jQuery.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : y, !0)), 
                        T.test(i[1]) && jQuery.isPlainObject(t)) for (i in t) isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                        return this;
                    }
                    return (r = y.getElementById(i[2])) && (this[0] = r, this.length = 1), this;
                }
                return e.nodeType ? (this[0] = e, this.length = 1, this) : isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(jQuery) : jQuery.makeArray(e, this);
            }).prototype = jQuery.fn, k = jQuery(y);
            var S = /^(?:parents|prev(?:Until|All))/, A = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
            function sibling(e, t) {
                for (;(e = e[t]) && 1 !== e.nodeType; ) ;
                return e;
            }
            jQuery.fn.extend({
                has: function(e) {
                    var t = jQuery(e, this), n = t.length;
                    return this.filter((function() {
                        for (var e = 0; e < n; e++) if (jQuery.contains(this, t[e])) return !0;
                    }));
                },
                closest: function(e, t) {
                    var n, i = 0, r = this.length, o = [], a = "string" != typeof e && jQuery(e);
                    if (!w.test(e)) for (;i < r; i++) for (n = this[i]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && jQuery.find.matchesSelector(n, e))) {
                        o.push(n);
                        break;
                    }
                    return this.pushStack(o.length > 1 ? jQuery.uniqueSort(o) : o);
                },
                index: function(e) {
                    return e ? "string" == typeof e ? u.call(jQuery(e), this[0]) : u.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
                },
                add: function(e, t) {
                    return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(e, t))));
                },
                addBack: function(e) {
                    return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
                }
            }), jQuery.each({
                parent: function(e) {
                    var t = e.parentNode;
                    return t && 11 !== t.nodeType ? t : null;
                },
                parents: function(e) {
                    return dir(e, "parentNode");
                },
                parentsUntil: function(e, t, n) {
                    return dir(e, "parentNode", n);
                },
                next: function(e) {
                    return sibling(e, "nextSibling");
                },
                prev: function(e) {
                    return sibling(e, "previousSibling");
                },
                nextAll: function(e) {
                    return dir(e, "nextSibling");
                },
                prevAll: function(e) {
                    return dir(e, "previousSibling");
                },
                nextUntil: function(e, t, n) {
                    return dir(e, "nextSibling", n);
                },
                prevUntil: function(e, t, n) {
                    return dir(e, "previousSibling", n);
                },
                siblings: function(e) {
                    return siblings((e.parentNode || {}).firstChild, e);
                },
                children: function(e) {
                    return siblings(e.firstChild);
                },
                contents: function(e) {
                    return null != e.contentDocument && a(e.contentDocument) ? e.contentDocument : (nodeName(e, "template") && (e = e.content || e), 
                    jQuery.merge([], e.childNodes));
                }
            }, (function(e, t) {
                jQuery.fn[e] = function(n, i) {
                    var r = jQuery.map(this, t, n);
                    return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (r = jQuery.filter(i, r)), 
                    this.length > 1 && (A[e] || jQuery.uniqueSort(r), S.test(e) && r.reverse()), this.pushStack(r);
                };
            }));
            var $ = /[^\x20\t\r\n\f]+/g;
            function Identity(e) {
                return e;
            }
            function Thrower(e) {
                throw e;
            }
            function adoptValue(e, t, n, i) {
                var r;
                try {
                    e && isFunction(r = e.promise) ? r.call(e).done(t).fail(n) : e && isFunction(r = e.then) ? r.call(e, t, n) : t.apply(void 0, [ e ].slice(i));
                } catch (e) {
                    n.apply(void 0, [ e ]);
                }
            }
            jQuery.Callbacks = function(e) {
                e = "string" == typeof e ? function(e) {
                    var t = {};
                    return jQuery.each(e.match($) || [], (function(e, n) {
                        t[n] = !0;
                    })), t;
                }(e) : jQuery.extend({}, e);
                var t, n, i, r, o = [], a = [], s = -1, fire = function() {
                    for (r = r || e.once, i = t = !0; a.length; s = -1) for (n = a.shift(); ++s < o.length; ) !1 === o[s].apply(n[0], n[1]) && e.stopOnFalse && (s = o.length, 
                    n = !1);
                    e.memory || (n = !1), t = !1, r && (o = n ? [] : "");
                }, l = {
                    add: function() {
                        return o && (n && !t && (s = o.length - 1, a.push(n)), function add(t) {
                            jQuery.each(t, (function(t, n) {
                                isFunction(n) ? e.unique && l.has(n) || o.push(n) : n && n.length && "string" !== toType(n) && add(n);
                            }));
                        }(arguments), n && !t && fire()), this;
                    },
                    remove: function() {
                        return jQuery.each(arguments, (function(e, t) {
                            for (var n; (n = jQuery.inArray(t, o, n)) > -1; ) o.splice(n, 1), n <= s && s--;
                        })), this;
                    },
                    has: function(e) {
                        return e ? jQuery.inArray(e, o) > -1 : o.length > 0;
                    },
                    empty: function() {
                        return o && (o = []), this;
                    },
                    disable: function() {
                        return r = a = [], o = n = "", this;
                    },
                    disabled: function() {
                        return !o;
                    },
                    lock: function() {
                        return r = a = [], n || t || (o = n = ""), this;
                    },
                    locked: function() {
                        return !!r;
                    },
                    fireWith: function(e, n) {
                        return r || (n = [ e, (n = n || []).slice ? n.slice() : n ], a.push(n), t || fire()), 
                        this;
                    },
                    fire: function() {
                        return l.fireWith(this, arguments), this;
                    },
                    fired: function() {
                        return !!i;
                    }
                };
                return l;
            }, jQuery.extend({
                Deferred: function(e) {
                    var t = [ [ "notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2 ], [ "resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected" ] ], n = "pending", r = {
                        state: function() {
                            return n;
                        },
                        always: function() {
                            return o.done(arguments).fail(arguments), this;
                        },
                        catch: function(e) {
                            return r.then(null, e);
                        },
                        pipe: function() {
                            var e = arguments;
                            return jQuery.Deferred((function(n) {
                                jQuery.each(t, (function(t, i) {
                                    var r = isFunction(e[i[4]]) && e[i[4]];
                                    o[i[1]]((function() {
                                        var e = r && r.apply(this, arguments);
                                        e && isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[i[0] + "With"](this, r ? [ e ] : arguments);
                                    }));
                                })), e = null;
                            })).promise();
                        },
                        then: function(e, n, r) {
                            var o = 0;
                            function resolve(e, t, n, r) {
                                return function() {
                                    var a = this, s = arguments, mightThrow = function() {
                                        var i, l;
                                        if (!(e < o)) {
                                            if ((i = n.apply(a, s)) === t.promise()) throw new TypeError("Thenable self-resolution");
                                            l = i && ("object" == typeof i || "function" == typeof i) && i.then, isFunction(l) ? r ? l.call(i, resolve(o, t, Identity, r), resolve(o, t, Thrower, r)) : (o++, 
                                            l.call(i, resolve(o, t, Identity, r), resolve(o, t, Thrower, r), resolve(o, t, Identity, t.notifyWith))) : (n !== Identity && (a = void 0, 
                                            s = [ i ]), (r || t.resolveWith)(a, s));
                                        }
                                    }, l = r ? mightThrow : function() {
                                        try {
                                            mightThrow();
                                        } catch (i) {
                                            jQuery.Deferred.exceptionHook && jQuery.Deferred.exceptionHook(i, l.stackTrace), 
                                            e + 1 >= o && (n !== Thrower && (a = void 0, s = [ i ]), t.rejectWith(a, s));
                                        }
                                    };
                                    e ? l() : (jQuery.Deferred.getStackHook && (l.stackTrace = jQuery.Deferred.getStackHook()), 
                                    i.setTimeout(l));
                                };
                            }
                            return jQuery.Deferred((function(i) {
                                t[0][3].add(resolve(0, i, isFunction(r) ? r : Identity, i.notifyWith)), t[1][3].add(resolve(0, i, isFunction(e) ? e : Identity)), 
                                t[2][3].add(resolve(0, i, isFunction(n) ? n : Thrower));
                            })).promise();
                        },
                        promise: function(e) {
                            return null != e ? jQuery.extend(e, r) : r;
                        }
                    }, o = {};
                    return jQuery.each(t, (function(e, i) {
                        var a = i[2], s = i[5];
                        r[i[1]] = a.add, s && a.add((function() {
                            n = s;
                        }), t[3 - e][2].disable, t[3 - e][3].disable, t[0][2].lock, t[0][3].lock), a.add(i[3].fire), 
                        o[i[0]] = function() {
                            return o[i[0] + "With"](this === o ? void 0 : this, arguments), this;
                        }, o[i[0] + "With"] = a.fireWith;
                    })), r.promise(o), e && e.call(o, o), o;
                },
                when: function(e) {
                    var t = arguments.length, n = t, i = Array(n), r = s.call(arguments), o = jQuery.Deferred(), updateFunc = function(e) {
                        return function(n) {
                            i[e] = this, r[e] = arguments.length > 1 ? s.call(arguments) : n, --t || o.resolveWith(i, r);
                        };
                    };
                    if (t <= 1 && (adoptValue(e, o.done(updateFunc(n)).resolve, o.reject, !t), "pending" === o.state() || isFunction(r[n] && r[n].then))) return o.then();
                    for (;n--; ) adoptValue(r[n], updateFunc(n), o.reject);
                    return o.promise();
                }
            });
            var R = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
            jQuery.Deferred.exceptionHook = function(e, t) {
                i.console && i.console.warn && e && R.test(e.name) && i.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t);
            }, jQuery.readyException = function(e) {
                i.setTimeout((function() {
                    throw e;
                }));
            };
            var D = jQuery.Deferred();
            function completed() {
                y.removeEventListener("DOMContentLoaded", completed), i.removeEventListener("load", completed), 
                jQuery.ready();
            }
            jQuery.fn.ready = function(e) {
                return D.then(e).catch((function(e) {
                    jQuery.readyException(e);
                })), this;
            }, jQuery.extend({
                isReady: !1,
                readyWait: 1,
                ready: function(e) {
                    (!0 === e ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0, !0 !== e && --jQuery.readyWait > 0 || D.resolveWith(y, [ jQuery ]));
                }
            }), jQuery.ready.then = D.then, "complete" === y.readyState || "loading" !== y.readyState && !y.documentElement.doScroll ? i.setTimeout(jQuery.ready) : (y.addEventListener("DOMContentLoaded", completed), 
            i.addEventListener("load", completed));
            var access = function(e, t, n, i, r, o, a) {
                var s = 0, l = e.length, c = null == n;
                if ("object" === toType(n)) for (s in r = !0, n) access(e, t, s, n[s], !0, o, a); else if (void 0 !== i && (r = !0, 
                isFunction(i) || (a = !0), c && (a ? (t.call(e, i), t = null) : (c = t, t = function(e, t, n) {
                    return c.call(jQuery(e), n);
                })), t)) for (;s < l; s++) t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
                return r ? e : c ? t.call(e) : l ? t(e[0], n) : o;
            }, P = /^-ms-/, E = /-([a-z])/g;
            function fcamelCase(e, t) {
                return t.toUpperCase();
            }
            function camelCase(e) {
                return e.replace(P, "ms-").replace(E, fcamelCase);
            }
            var acceptData = function(e) {
                return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
            };
            function Data() {
                this.expando = jQuery.expando + Data.uid++;
            }
            Data.uid = 1, Data.prototype = {
                cache: function(e) {
                    var t = e[this.expando];
                    return t || (t = {}, acceptData(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                        value: t,
                        configurable: !0
                    }))), t;
                },
                set: function(e, t, n) {
                    var i, r = this.cache(e);
                    if ("string" == typeof t) r[camelCase(t)] = n; else for (i in t) r[camelCase(i)] = t[i];
                    return r;
                },
                get: function(e, t) {
                    return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][camelCase(t)];
                },
                access: function(e, t, n) {
                    return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), 
                    void 0 !== n ? n : t);
                },
                remove: function(e, t) {
                    var n, i = e[this.expando];
                    if (void 0 !== i) {
                        if (void 0 !== t) {
                            n = (t = Array.isArray(t) ? t.map(camelCase) : (t = camelCase(t)) in i ? [ t ] : t.match($) || []).length;
                            for (;n--; ) delete i[t[n]];
                        }
                        (void 0 === t || jQuery.isEmptyObject(i)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]);
                    }
                },
                hasData: function(e) {
                    var t = e[this.expando];
                    return void 0 !== t && !jQuery.isEmptyObject(t);
                }
            };
            var N = new Data, L = new Data, M = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, B = /[A-Z]/g;
            function dataAttr(e, t, n) {
                var i;
                if (void 0 === n && 1 === e.nodeType) if (i = "data-" + t.replace(B, "-$&").toLowerCase(), 
                "string" == typeof (n = e.getAttribute(i))) {
                    try {
                        n = function(e) {
                            return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : M.test(e) ? JSON.parse(e) : e);
                        }(n);
                    } catch (e) {}
                    L.set(e, t, n);
                } else n = void 0;
                return n;
            }
            jQuery.extend({
                hasData: function(e) {
                    return L.hasData(e) || N.hasData(e);
                },
                data: function(e, t, n) {
                    return L.access(e, t, n);
                },
                removeData: function(e, t) {
                    L.remove(e, t);
                },
                _data: function(e, t, n) {
                    return N.access(e, t, n);
                },
                _removeData: function(e, t) {
                    N.remove(e, t);
                }
            }), jQuery.fn.extend({
                data: function(e, t) {
                    var n, i, r, o = this[0], a = o && o.attributes;
                    if (void 0 === e) {
                        if (this.length && (r = L.get(o), 1 === o.nodeType && !N.get(o, "hasDataAttrs"))) {
                            for (n = a.length; n--; ) a[n] && 0 === (i = a[n].name).indexOf("data-") && (i = camelCase(i.slice(5)), 
                            dataAttr(o, i, r[i]));
                            N.set(o, "hasDataAttrs", !0);
                        }
                        return r;
                    }
                    return "object" == typeof e ? this.each((function() {
                        L.set(this, e);
                    })) : access(this, (function(t) {
                        var n;
                        if (o && void 0 === t) return void 0 !== (n = L.get(o, e)) || void 0 !== (n = dataAttr(o, e)) ? n : void 0;
                        this.each((function() {
                            L.set(this, e, t);
                        }));
                    }), null, t, arguments.length > 1, null, !0);
                },
                removeData: function(e) {
                    return this.each((function() {
                        L.remove(this, e);
                    }));
                }
            }), jQuery.extend({
                queue: function(e, t, n) {
                    var i;
                    if (e) return t = (t || "fx") + "queue", i = N.get(e, t), n && (!i || Array.isArray(n) ? i = N.access(e, t, jQuery.makeArray(n)) : i.push(n)), 
                    i || [];
                },
                dequeue: function(e, t) {
                    t = t || "fx";
                    var n = jQuery.queue(e, t), i = n.length, r = n.shift(), o = jQuery._queueHooks(e, t);
                    "inprogress" === r && (r = n.shift(), i--), r && ("fx" === t && n.unshift("inprogress"), 
                    delete o.stop, r.call(e, (function() {
                        jQuery.dequeue(e, t);
                    }), o)), !i && o && o.empty.fire();
                },
                _queueHooks: function(e, t) {
                    var n = t + "queueHooks";
                    return N.get(e, n) || N.access(e, n, {
                        empty: jQuery.Callbacks("once memory").add((function() {
                            N.remove(e, [ t + "queue", n ]);
                        }))
                    });
                }
            }), jQuery.fn.extend({
                queue: function(e, t) {
                    var n = 2;
                    return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? jQuery.queue(this[0], e) : void 0 === t ? this : this.each((function() {
                        var n = jQuery.queue(this, e, t);
                        jQuery._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && jQuery.dequeue(this, e);
                    }));
                },
                dequeue: function(e) {
                    return this.each((function() {
                        jQuery.dequeue(this, e);
                    }));
                },
                clearQueue: function(e) {
                    return this.queue(e || "fx", []);
                },
                promise: function(e, t) {
                    var n, i = 1, r = jQuery.Deferred(), o = this, a = this.length, resolve = function() {
                        --i || r.resolveWith(o, [ o ]);
                    };
                    for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--; ) (n = N.get(o[a], e + "queueHooks")) && n.empty && (i++, 
                    n.empty.add(resolve));
                    return resolve(), r.promise(t);
                }
            });
            var W = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, I = new RegExp("^(?:([+-])=|)(" + W + ")([a-z%]*)$", "i"), j = [ "Top", "Right", "Bottom", "Left" ], O = y.documentElement, isAttached = function(e) {
                return jQuery.contains(e.ownerDocument, e);
            }, F = {
                composed: !0
            };
            O.getRootNode && (isAttached = function(e) {
                return jQuery.contains(e.ownerDocument, e) || e.getRootNode(F) === e.ownerDocument;
            });
            var isHiddenWithinTree = function(e, t) {
                return "none" === (e = t || e).style.display || "" === e.style.display && isAttached(e) && "none" === jQuery.css(e, "display");
            };
            function adjustCSS(e, t, n, i) {
                var r, o, a = 20, s = i ? function() {
                    return i.cur();
                } : function() {
                    return jQuery.css(e, t, "");
                }, l = s(), c = n && n[3] || (jQuery.cssNumber[t] ? "" : "px"), u = e.nodeType && (jQuery.cssNumber[t] || "px" !== c && +l) && I.exec(jQuery.css(e, t));
                if (u && u[3] !== c) {
                    for (l /= 2, c = c || u[3], u = +l || 1; a--; ) jQuery.style(e, t, u + c), (1 - o) * (1 - (o = s() / l || .5)) <= 0 && (a = 0), 
                    u /= o;
                    u *= 2, jQuery.style(e, t, u + c), n = n || [];
                }
                return n && (u = +u || +l || 0, r = n[1] ? u + (n[1] + 1) * n[2] : +n[2], i && (i.unit = c, 
                i.start = u, i.end = r)), r;
            }
            var z = {};
            function getDefaultDisplay(e) {
                var t, n = e.ownerDocument, i = e.nodeName, r = z[i];
                return r || (t = n.body.appendChild(n.createElement(i)), r = jQuery.css(t, "display"), 
                t.parentNode.removeChild(t), "none" === r && (r = "block"), z[i] = r, r);
            }
            function showHide(e, t) {
                for (var n, i, r = [], o = 0, a = e.length; o < a; o++) (i = e[o]).style && (n = i.style.display, 
                t ? ("none" === n && (r[o] = N.get(i, "display") || null, r[o] || (i.style.display = "")), 
                "" === i.style.display && isHiddenWithinTree(i) && (r[o] = getDefaultDisplay(i))) : "none" !== n && (r[o] = "none", 
                N.set(i, "display", n)));
                for (o = 0; o < a; o++) null != r[o] && (e[o].style.display = r[o]);
                return e;
            }
            jQuery.fn.extend({
                show: function() {
                    return showHide(this, !0);
                },
                hide: function() {
                    return showHide(this);
                },
                toggle: function(e) {
                    return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each((function() {
                        isHiddenWithinTree(this) ? jQuery(this).show() : jQuery(this).hide();
                    }));
                }
            });
            var H, q, _ = /^(?:checkbox|radio)$/i, K = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, V = /^$|^module$|\/(?:java|ecma)script/i;
            H = y.createDocumentFragment().appendChild(y.createElement("div")), (q = y.createElement("input")).setAttribute("type", "radio"), 
            q.setAttribute("checked", "checked"), q.setAttribute("name", "t"), H.appendChild(q), 
            m.checkClone = H.cloneNode(!0).cloneNode(!0).lastChild.checked, H.innerHTML = "<textarea>x</textarea>", 
            m.noCloneChecked = !!H.cloneNode(!0).lastChild.defaultValue, H.innerHTML = "<option></option>", 
            m.option = !!H.lastChild;
            var U = {
                thead: [ 1, "<table>", "</table>" ],
                col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
                tr: [ 2, "<table><tbody>", "</tbody></table>" ],
                td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
                _default: [ 0, "", "" ]
            };
            function getAll(e, t) {
                var n;
                return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], 
                void 0 === t || t && nodeName(e, t) ? jQuery.merge([ e ], n) : n;
            }
            function setGlobalEval(e, t) {
                for (var n = 0, i = e.length; n < i; n++) N.set(e[n], "globalEval", !t || N.get(t[n], "globalEval"));
            }
            U.tbody = U.tfoot = U.colgroup = U.caption = U.thead, U.th = U.td, m.option || (U.optgroup = U.option = [ 1, "<select multiple='multiple'>", "</select>" ]);
            var G = /<|&#?\w+;/;
            function buildFragment(e, t, n, i, r) {
                for (var o, a, s, l, c, u, d = t.createDocumentFragment(), p = [], h = 0, f = e.length; h < f; h++) if ((o = e[h]) || 0 === o) if ("object" === toType(o)) jQuery.merge(p, o.nodeType ? [ o ] : o); else if (G.test(o)) {
                    for (a = a || d.appendChild(t.createElement("div")), s = (K.exec(o) || [ "", "" ])[1].toLowerCase(), 
                    l = U[s] || U._default, a.innerHTML = l[1] + jQuery.htmlPrefilter(o) + l[2], u = l[0]; u--; ) a = a.lastChild;
                    jQuery.merge(p, a.childNodes), (a = d.firstChild).textContent = "";
                } else p.push(t.createTextNode(o));
                for (d.textContent = "", h = 0; o = p[h++]; ) if (i && jQuery.inArray(o, i) > -1) r && r.push(o); else if (c = isAttached(o), 
                a = getAll(d.appendChild(o), "script"), c && setGlobalEval(a), n) for (u = 0; o = a[u++]; ) V.test(o.type || "") && n.push(o);
                return d;
            }
            var J = /^([^.]*)(?:\.(.+)|)/;
            function returnTrue() {
                return !0;
            }
            function returnFalse() {
                return !1;
            }
            function expectSync(e, t) {
                return e === function() {
                    try {
                        return y.activeElement;
                    } catch (e) {}
                }() == ("focus" === t);
            }
            function on(e, t, n, i, r, o) {
                var a, s;
                if ("object" == typeof t) {
                    for (s in "string" != typeof n && (i = i || n, n = void 0), t) on(e, s, n, i, t[s], o);
                    return e;
                }
                if (null == i && null == r ? (r = n, i = n = void 0) : null == r && ("string" == typeof n ? (r = i, 
                i = void 0) : (r = i, i = n, n = void 0)), !1 === r) r = returnFalse; else if (!r) return e;
                return 1 === o && (a = r, r = function(e) {
                    return jQuery().off(e), a.apply(this, arguments);
                }, r.guid = a.guid || (a.guid = jQuery.guid++)), e.each((function() {
                    jQuery.event.add(this, t, r, i, n);
                }));
            }
            function leverageNative(e, t, n) {
                n ? (N.set(e, t, !1), jQuery.event.add(e, t, {
                    namespace: !1,
                    handler: function(e) {
                        var i, r, o = N.get(this, t);
                        if (1 & e.isTrigger && this[t]) {
                            if (o.length) (jQuery.event.special[t] || {}).delegateType && e.stopPropagation(); else if (o = s.call(arguments), 
                            N.set(this, t, o), i = n(this, t), this[t](), o !== (r = N.get(this, t)) || i ? N.set(this, t, !1) : r = {}, 
                            o !== r) return e.stopImmediatePropagation(), e.preventDefault(), r && r.value;
                        } else o.length && (N.set(this, t, {
                            value: jQuery.event.trigger(jQuery.extend(o[0], jQuery.Event.prototype), o.slice(1), this)
                        }), e.stopImmediatePropagation());
                    }
                })) : void 0 === N.get(e, t) && jQuery.event.add(e, t, returnTrue);
            }
            jQuery.event = {
                global: {},
                add: function(e, t, n, i, r) {
                    var o, a, s, l, c, u, d, p, h, f, g, m = N.get(e);
                    if (acceptData(e)) for (n.handler && (n = (o = n).handler, r = o.selector), r && jQuery.find.matchesSelector(O, r), 
                    n.guid || (n.guid = jQuery.guid++), (l = m.events) || (l = m.events = Object.create(null)), 
                    (a = m.handle) || (a = m.handle = function(t) {
                        return void 0 !== jQuery && jQuery.event.triggered !== t.type ? jQuery.event.dispatch.apply(e, arguments) : void 0;
                    }), c = (t = (t || "").match($) || [ "" ]).length; c--; ) h = g = (s = J.exec(t[c]) || [])[1], 
                    f = (s[2] || "").split(".").sort(), h && (d = jQuery.event.special[h] || {}, h = (r ? d.delegateType : d.bindType) || h, 
                    d = jQuery.event.special[h] || {}, u = jQuery.extend({
                        type: h,
                        origType: g,
                        data: i,
                        handler: n,
                        guid: n.guid,
                        selector: r,
                        needsContext: r && jQuery.expr.match.needsContext.test(r),
                        namespace: f.join(".")
                    }, o), (p = l[h]) || ((p = l[h] = []).delegateCount = 0, d.setup && !1 !== d.setup.call(e, i, f, a) || e.addEventListener && e.addEventListener(h, a)), 
                    d.add && (d.add.call(e, u), u.handler.guid || (u.handler.guid = n.guid)), r ? p.splice(p.delegateCount++, 0, u) : p.push(u), 
                    jQuery.event.global[h] = !0);
                },
                remove: function(e, t, n, i, r) {
                    var o, a, s, l, c, u, d, p, h, f, g, m = N.hasData(e) && N.get(e);
                    if (m && (l = m.events)) {
                        for (c = (t = (t || "").match($) || [ "" ]).length; c--; ) if (h = g = (s = J.exec(t[c]) || [])[1], 
                        f = (s[2] || "").split(".").sort(), h) {
                            for (d = jQuery.event.special[h] || {}, p = l[h = (i ? d.delegateType : d.bindType) || h] || [], 
                            s = s[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length; o--; ) u = p[o], 
                            !r && g !== u.origType || n && n.guid !== u.guid || s && !s.test(u.namespace) || i && i !== u.selector && ("**" !== i || !u.selector) || (p.splice(o, 1), 
                            u.selector && p.delegateCount--, d.remove && d.remove.call(e, u));
                            a && !p.length && (d.teardown && !1 !== d.teardown.call(e, f, m.handle) || jQuery.removeEvent(e, h, m.handle), 
                            delete l[h]);
                        } else for (h in l) jQuery.event.remove(e, h + t[c], n, i, !0);
                        jQuery.isEmptyObject(l) && N.remove(e, "handle events");
                    }
                },
                dispatch: function(e) {
                    var t, n, i, r, o, a, s = new Array(arguments.length), l = jQuery.event.fix(e), c = (N.get(this, "events") || Object.create(null))[l.type] || [], u = jQuery.event.special[l.type] || {};
                    for (s[0] = l, t = 1; t < arguments.length; t++) s[t] = arguments[t];
                    if (l.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, l)) {
                        for (a = jQuery.event.handlers.call(this, l, c), t = 0; (r = a[t++]) && !l.isPropagationStopped(); ) for (l.currentTarget = r.elem, 
                        n = 0; (o = r.handlers[n++]) && !l.isImmediatePropagationStopped(); ) l.rnamespace && !1 !== o.namespace && !l.rnamespace.test(o.namespace) || (l.handleObj = o, 
                        l.data = o.data, void 0 !== (i = ((jQuery.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, s)) && !1 === (l.result = i) && (l.preventDefault(), 
                        l.stopPropagation()));
                        return u.postDispatch && u.postDispatch.call(this, l), l.result;
                    }
                },
                handlers: function(e, t) {
                    var n, i, r, o, a, s = [], l = t.delegateCount, c = e.target;
                    if (l && c.nodeType && !("click" === e.type && e.button >= 1)) for (;c !== this; c = c.parentNode || this) if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
                        for (o = [], a = {}, n = 0; n < l; n++) void 0 === a[r = (i = t[n]).selector + " "] && (a[r] = i.needsContext ? jQuery(r, this).index(c) > -1 : jQuery.find(r, this, null, [ c ]).length), 
                        a[r] && o.push(i);
                        o.length && s.push({
                            elem: c,
                            handlers: o
                        });
                    }
                    return c = this, l < t.length && s.push({
                        elem: c,
                        handlers: t.slice(l)
                    }), s;
                },
                addProp: function(e, t) {
                    Object.defineProperty(jQuery.Event.prototype, e, {
                        enumerable: !0,
                        configurable: !0,
                        get: isFunction(t) ? function() {
                            if (this.originalEvent) return t(this.originalEvent);
                        } : function() {
                            if (this.originalEvent) return this.originalEvent[e];
                        },
                        set: function(t) {
                            Object.defineProperty(this, e, {
                                enumerable: !0,
                                configurable: !0,
                                writable: !0,
                                value: t
                            });
                        }
                    });
                },
                fix: function(e) {
                    return e[jQuery.expando] ? e : new jQuery.Event(e);
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    click: {
                        setup: function(e) {
                            var t = this || e;
                            return _.test(t.type) && t.click && nodeName(t, "input") && leverageNative(t, "click", returnTrue), 
                            !1;
                        },
                        trigger: function(e) {
                            var t = this || e;
                            return _.test(t.type) && t.click && nodeName(t, "input") && leverageNative(t, "click"), 
                            !0;
                        },
                        _default: function(e) {
                            var t = e.target;
                            return _.test(t.type) && t.click && nodeName(t, "input") && N.get(t, "click") || nodeName(t, "a");
                        }
                    },
                    beforeunload: {
                        postDispatch: function(e) {
                            void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                        }
                    }
                }
            }, jQuery.removeEvent = function(e, t, n) {
                e.removeEventListener && e.removeEventListener(t, n);
            }, jQuery.Event = function(e, t) {
                if (!(this instanceof jQuery.Event)) return new jQuery.Event(e, t);
                e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? returnTrue : returnFalse, 
                this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, 
                this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, 
                t && jQuery.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[jQuery.expando] = !0;
            }, jQuery.Event.prototype = {
                constructor: jQuery.Event,
                isDefaultPrevented: returnFalse,
                isPropagationStopped: returnFalse,
                isImmediatePropagationStopped: returnFalse,
                isSimulated: !1,
                preventDefault: function() {
                    var e = this.originalEvent;
                    this.isDefaultPrevented = returnTrue, e && !this.isSimulated && e.preventDefault();
                },
                stopPropagation: function() {
                    var e = this.originalEvent;
                    this.isPropagationStopped = returnTrue, e && !this.isSimulated && e.stopPropagation();
                },
                stopImmediatePropagation: function() {
                    var e = this.originalEvent;
                    this.isImmediatePropagationStopped = returnTrue, e && !this.isSimulated && e.stopImmediatePropagation(), 
                    this.stopPropagation();
                }
            }, jQuery.each({
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                code: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: !0
            }, jQuery.event.addProp), jQuery.each({
                focus: "focusin",
                blur: "focusout"
            }, (function(e, t) {
                jQuery.event.special[e] = {
                    setup: function() {
                        return leverageNative(this, e, expectSync), !1;
                    },
                    trigger: function() {
                        return leverageNative(this, e), !0;
                    },
                    _default: function(t) {
                        return N.get(t.target, e);
                    },
                    delegateType: t
                };
            })), jQuery.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, (function(e, t) {
                jQuery.event.special[e] = {
                    delegateType: t,
                    bindType: t,
                    handle: function(e) {
                        var n, i = this, r = e.relatedTarget, o = e.handleObj;
                        return r && (r === i || jQuery.contains(i, r)) || (e.type = o.origType, n = o.handler.apply(this, arguments), 
                        e.type = t), n;
                    }
                };
            })), jQuery.fn.extend({
                on: function(e, t, n, i) {
                    return on(this, e, t, n, i);
                },
                one: function(e, t, n, i) {
                    return on(this, e, t, n, i, 1);
                },
                off: function(e, t, n) {
                    var i, r;
                    if (e && e.preventDefault && e.handleObj) return i = e.handleObj, jQuery(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), 
                    this;
                    if ("object" == typeof e) {
                        for (r in e) this.off(r, t, e[r]);
                        return this;
                    }
                    return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = returnFalse), 
                    this.each((function() {
                        jQuery.event.remove(this, e, n, t);
                    }));
                }
            });
            var Y = /<script|<style|<link/i, X = /checked\s*(?:[^=]|=\s*.checked.)/i, Z = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
            function manipulationTarget(e, t) {
                return nodeName(e, "table") && nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") && jQuery(e).children("tbody")[0] || e;
            }
            function disableScript(e) {
                return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
            }
            function restoreScript(e) {
                return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), 
                e;
            }
            function cloneCopyEvent(e, t) {
                var n, i, r, o, a, s;
                if (1 === t.nodeType) {
                    if (N.hasData(e) && (s = N.get(e).events)) for (r in N.remove(t, "handle events"), 
                    s) for (n = 0, i = s[r].length; n < i; n++) jQuery.event.add(t, r, s[r][n]);
                    L.hasData(e) && (o = L.access(e), a = jQuery.extend({}, o), L.set(t, a));
                }
            }
            function fixInput(e, t) {
                var n = t.nodeName.toLowerCase();
                "input" === n && _.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue);
            }
            function domManip(e, t, n, i) {
                t = l(t);
                var r, o, a, s, c, u, d = 0, p = e.length, h = p - 1, f = t[0], g = isFunction(f);
                if (g || p > 1 && "string" == typeof f && !m.checkClone && X.test(f)) return e.each((function(r) {
                    var o = e.eq(r);
                    g && (t[0] = f.call(this, r, o.html())), domManip(o, t, n, i);
                }));
                if (p && (o = (r = buildFragment(t, e[0].ownerDocument, !1, e, i)).firstChild, 1 === r.childNodes.length && (r = o), 
                o || i)) {
                    for (s = (a = jQuery.map(getAll(r, "script"), disableScript)).length; d < p; d++) c = r, 
                    d !== h && (c = jQuery.clone(c, !0, !0), s && jQuery.merge(a, getAll(c, "script"))), 
                    n.call(e[d], c, d);
                    if (s) for (u = a[a.length - 1].ownerDocument, jQuery.map(a, restoreScript), d = 0; d < s; d++) c = a[d], 
                    V.test(c.type || "") && !N.access(c, "globalEval") && jQuery.contains(u, c) && (c.src && "module" !== (c.type || "").toLowerCase() ? jQuery._evalUrl && !c.noModule && jQuery._evalUrl(c.src, {
                        nonce: c.nonce || c.getAttribute("nonce")
                    }, u) : DOMEval(c.textContent.replace(Z, ""), c, u));
                }
                return e;
            }
            function remove(e, t, n) {
                for (var i, r = t ? jQuery.filter(t, e) : e, o = 0; null != (i = r[o]); o++) n || 1 !== i.nodeType || jQuery.cleanData(getAll(i)), 
                i.parentNode && (n && isAttached(i) && setGlobalEval(getAll(i, "script")), i.parentNode.removeChild(i));
                return e;
            }
            jQuery.extend({
                htmlPrefilter: function(e) {
                    return e;
                },
                clone: function(e, t, n) {
                    var i, r, o, a, s = e.cloneNode(!0), l = isAttached(e);
                    if (!(m.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || jQuery.isXMLDoc(e))) for (a = getAll(s), 
                    i = 0, r = (o = getAll(e)).length; i < r; i++) fixInput(o[i], a[i]);
                    if (t) if (n) for (o = o || getAll(e), a = a || getAll(s), i = 0, r = o.length; i < r; i++) cloneCopyEvent(o[i], a[i]); else cloneCopyEvent(e, s);
                    return (a = getAll(s, "script")).length > 0 && setGlobalEval(a, !l && getAll(e, "script")), 
                    s;
                },
                cleanData: function(e) {
                    for (var t, n, i, r = jQuery.event.special, o = 0; void 0 !== (n = e[o]); o++) if (acceptData(n)) {
                        if (t = n[N.expando]) {
                            if (t.events) for (i in t.events) r[i] ? jQuery.event.remove(n, i) : jQuery.removeEvent(n, i, t.handle);
                            n[N.expando] = void 0;
                        }
                        n[L.expando] && (n[L.expando] = void 0);
                    }
                }
            }), jQuery.fn.extend({
                detach: function(e) {
                    return remove(this, e, !0);
                },
                remove: function(e) {
                    return remove(this, e);
                },
                text: function(e) {
                    return access(this, (function(e) {
                        return void 0 === e ? jQuery.text(this) : this.empty().each((function() {
                            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e);
                        }));
                    }), null, e, arguments.length);
                },
                append: function() {
                    return domManip(this, arguments, (function(e) {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || manipulationTarget(this, e).appendChild(e);
                    }));
                },
                prepend: function() {
                    return domManip(this, arguments, (function(e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = manipulationTarget(this, e);
                            t.insertBefore(e, t.firstChild);
                        }
                    }));
                },
                before: function() {
                    return domManip(this, arguments, (function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this);
                    }));
                },
                after: function() {
                    return domManip(this, arguments, (function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
                    }));
                },
                empty: function() {
                    for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (jQuery.cleanData(getAll(e, !1)), 
                    e.textContent = "");
                    return this;
                },
                clone: function(e, t) {
                    return e = null != e && e, t = null == t ? e : t, this.map((function() {
                        return jQuery.clone(this, e, t);
                    }));
                },
                html: function(e) {
                    return access(this, (function(e) {
                        var t = this[0] || {}, n = 0, i = this.length;
                        if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                        if ("string" == typeof e && !Y.test(e) && !U[(K.exec(e) || [ "", "" ])[1].toLowerCase()]) {
                            e = jQuery.htmlPrefilter(e);
                            try {
                                for (;n < i; n++) 1 === (t = this[n] || {}).nodeType && (jQuery.cleanData(getAll(t, !1)), 
                                t.innerHTML = e);
                                t = 0;
                            } catch (e) {}
                        }
                        t && this.empty().append(e);
                    }), null, e, arguments.length);
                },
                replaceWith: function() {
                    var e = [];
                    return domManip(this, arguments, (function(t) {
                        var n = this.parentNode;
                        jQuery.inArray(this, e) < 0 && (jQuery.cleanData(getAll(this)), n && n.replaceChild(t, this));
                    }), e);
                }
            }), jQuery.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, (function(e, t) {
                jQuery.fn[e] = function(e) {
                    for (var n, i = [], r = jQuery(e), o = r.length - 1, a = 0; a <= o; a++) n = a === o ? this : this.clone(!0), 
                    jQuery(r[a])[t](n), c.apply(i, n.get());
                    return this.pushStack(i);
                };
            }));
            var Q = new RegExp("^(" + W + ")(?!px)[a-z%]+$", "i"), ee = /^--/, getStyles = function(e) {
                var t = e.ownerDocument.defaultView;
                return t && t.opener || (t = i), t.getComputedStyle(e);
            }, swap = function(e, t, n) {
                var i, r, o = {};
                for (r in t) o[r] = e.style[r], e.style[r] = t[r];
                for (r in i = n.call(e), t) e.style[r] = o[r];
                return i;
            }, te = new RegExp(j.join("|"), "i"), ne = new RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g");
            function curCSS(e, t, n) {
                var i, r, o, a, s = ee.test(t), l = e.style;
                return (n = n || getStyles(e)) && (a = n.getPropertyValue(t) || n[t], s && (a = a.replace(ne, "$1")), 
                "" !== a || isAttached(e) || (a = jQuery.style(e, t)), !m.pixelBoxStyles() && Q.test(a) && te.test(t) && (i = l.width, 
                r = l.minWidth, o = l.maxWidth, l.minWidth = l.maxWidth = l.width = a, a = n.width, 
                l.width = i, l.minWidth = r, l.maxWidth = o)), void 0 !== a ? a + "" : a;
            }
            function addGetHookIf(e, t) {
                return {
                    get: function() {
                        if (!e()) return (this.get = t).apply(this, arguments);
                        delete this.get;
                    }
                };
            }
            !function() {
                function computeStyleTests() {
                    if (l) {
                        s.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", 
                        l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", 
                        O.appendChild(s).appendChild(l);
                        var o = i.getComputedStyle(l);
                        e = "1%" !== o.top, a = 12 === roundPixelMeasures(o.marginLeft), l.style.right = "60%", 
                        r = 36 === roundPixelMeasures(o.right), t = 36 === roundPixelMeasures(o.width), 
                        l.style.position = "absolute", n = 12 === roundPixelMeasures(l.offsetWidth / 3), 
                        O.removeChild(s), l = null;
                    }
                }
                function roundPixelMeasures(e) {
                    return Math.round(parseFloat(e));
                }
                var e, t, n, r, o, a, s = y.createElement("div"), l = y.createElement("div");
                l.style && (l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", 
                m.clearCloneStyle = "content-box" === l.style.backgroundClip, jQuery.extend(m, {
                    boxSizingReliable: function() {
                        return computeStyleTests(), t;
                    },
                    pixelBoxStyles: function() {
                        return computeStyleTests(), r;
                    },
                    pixelPosition: function() {
                        return computeStyleTests(), e;
                    },
                    reliableMarginLeft: function() {
                        return computeStyleTests(), a;
                    },
                    scrollboxSize: function() {
                        return computeStyleTests(), n;
                    },
                    reliableTrDimensions: function() {
                        var e, t, n, r;
                        return null == o && (e = y.createElement("table"), t = y.createElement("tr"), n = y.createElement("div"), 
                        e.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", t.style.cssText = "border:1px solid", 
                        t.style.height = "1px", n.style.height = "9px", n.style.display = "block", O.appendChild(e).appendChild(t).appendChild(n), 
                        r = i.getComputedStyle(t), o = parseInt(r.height, 10) + parseInt(r.borderTopWidth, 10) + parseInt(r.borderBottomWidth, 10) === t.offsetHeight, 
                        O.removeChild(e)), o;
                    }
                }));
            }();
            var ie = [ "Webkit", "Moz", "ms" ], re = y.createElement("div").style, oe = {};
            function finalPropName(e) {
                var t = jQuery.cssProps[e] || oe[e];
                return t || (e in re ? e : oe[e] = function(e) {
                    for (var t = e[0].toUpperCase() + e.slice(1), n = ie.length; n--; ) if ((e = ie[n] + t) in re) return e;
                }(e) || e);
            }
            var ae = /^(none|table(?!-c[ea]).+)/, se = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            }, le = {
                letterSpacing: "0",
                fontWeight: "400"
            };
            function setPositiveNumber(e, t, n) {
                var i = I.exec(t);
                return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t;
            }
            function boxModelAdjustment(e, t, n, i, r, o) {
                var a = "width" === t ? 1 : 0, s = 0, l = 0;
                if (n === (i ? "border" : "content")) return 0;
                for (;a < 4; a += 2) "margin" === n && (l += jQuery.css(e, n + j[a], !0, r)), i ? ("content" === n && (l -= jQuery.css(e, "padding" + j[a], !0, r)), 
                "margin" !== n && (l -= jQuery.css(e, "border" + j[a] + "Width", !0, r))) : (l += jQuery.css(e, "padding" + j[a], !0, r), 
                "padding" !== n ? l += jQuery.css(e, "border" + j[a] + "Width", !0, r) : s += jQuery.css(e, "border" + j[a] + "Width", !0, r));
                return !i && o >= 0 && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - l - s - .5)) || 0), 
                l;
            }
            function getWidthOrHeight(e, t, n) {
                var i = getStyles(e), r = (!m.boxSizingReliable() || n) && "border-box" === jQuery.css(e, "boxSizing", !1, i), o = r, a = curCSS(e, t, i), s = "offset" + t[0].toUpperCase() + t.slice(1);
                if (Q.test(a)) {
                    if (!n) return a;
                    a = "auto";
                }
                return (!m.boxSizingReliable() && r || !m.reliableTrDimensions() && nodeName(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === jQuery.css(e, "display", !1, i)) && e.getClientRects().length && (r = "border-box" === jQuery.css(e, "boxSizing", !1, i), 
                (o = s in e) && (a = e[s])), (a = parseFloat(a) || 0) + boxModelAdjustment(e, t, n || (r ? "border" : "content"), o, i, a) + "px";
            }
            function Tween(e, t, n, i, r) {
                return new Tween.prototype.init(e, t, n, i, r);
            }
            jQuery.extend({
                cssHooks: {
                    opacity: {
                        get: function(e, t) {
                            if (t) {
                                var n = curCSS(e, "opacity");
                                return "" === n ? "1" : n;
                            }
                        }
                    }
                },
                cssNumber: {
                    animationIterationCount: !0,
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    gridArea: !0,
                    gridColumn: !0,
                    gridColumnEnd: !0,
                    gridColumnStart: !0,
                    gridRow: !0,
                    gridRowEnd: !0,
                    gridRowStart: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {},
                style: function(e, t, n, i) {
                    if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                        var r, o, a, s = camelCase(t), l = ee.test(t), c = e.style;
                        if (l || (t = finalPropName(s)), a = jQuery.cssHooks[t] || jQuery.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (r = a.get(e, !1, i)) ? r : c[t];
                        "string" === (o = typeof n) && (r = I.exec(n)) && r[1] && (n = adjustCSS(e, t, r), 
                        o = "number"), null != n && n == n && ("number" !== o || l || (n += r && r[3] || (jQuery.cssNumber[s] ? "" : "px")), 
                        m.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), 
                        a && "set" in a && void 0 === (n = a.set(e, n, i)) || (l ? c.setProperty(t, n) : c[t] = n));
                    }
                },
                css: function(e, t, n, i) {
                    var r, o, a, s = camelCase(t);
                    return ee.test(t) || (t = finalPropName(s)), (a = jQuery.cssHooks[t] || jQuery.cssHooks[s]) && "get" in a && (r = a.get(e, !0, n)), 
                    void 0 === r && (r = curCSS(e, t, i)), "normal" === r && t in le && (r = le[t]), 
                    "" === n || n ? (o = parseFloat(r), !0 === n || isFinite(o) ? o || 0 : r) : r;
                }
            }), jQuery.each([ "height", "width" ], (function(e, t) {
                jQuery.cssHooks[t] = {
                    get: function(e, n, i) {
                        if (n) return !ae.test(jQuery.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? getWidthOrHeight(e, t, i) : swap(e, se, (function() {
                            return getWidthOrHeight(e, t, i);
                        }));
                    },
                    set: function(e, n, i) {
                        var r, o = getStyles(e), a = !m.scrollboxSize() && "absolute" === o.position, s = (a || i) && "border-box" === jQuery.css(e, "boxSizing", !1, o), l = i ? boxModelAdjustment(e, t, i, s, o) : 0;
                        return s && a && (l -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - boxModelAdjustment(e, t, "border", !1, o) - .5)), 
                        l && (r = I.exec(n)) && "px" !== (r[3] || "px") && (e.style[t] = n, n = jQuery.css(e, t)), 
                        setPositiveNumber(0, n, l);
                    }
                };
            })), jQuery.cssHooks.marginLeft = addGetHookIf(m.reliableMarginLeft, (function(e, t) {
                if (t) return (parseFloat(curCSS(e, "marginLeft")) || e.getBoundingClientRect().left - swap(e, {
                    marginLeft: 0
                }, (function() {
                    return e.getBoundingClientRect().left;
                }))) + "px";
            })), jQuery.each({
                margin: "",
                padding: "",
                border: "Width"
            }, (function(e, t) {
                jQuery.cssHooks[e + t] = {
                    expand: function(n) {
                        for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [ n ]; i < 4; i++) r[e + j[i] + t] = o[i] || o[i - 2] || o[0];
                        return r;
                    }
                }, "margin" !== e && (jQuery.cssHooks[e + t].set = setPositiveNumber);
            })), jQuery.fn.extend({
                css: function(e, t) {
                    return access(this, (function(e, t, n) {
                        var i, r, o = {}, a = 0;
                        if (Array.isArray(t)) {
                            for (i = getStyles(e), r = t.length; a < r; a++) o[t[a]] = jQuery.css(e, t[a], !1, i);
                            return o;
                        }
                        return void 0 !== n ? jQuery.style(e, t, n) : jQuery.css(e, t);
                    }), e, t, arguments.length > 1);
                }
            }), jQuery.Tween = Tween, Tween.prototype = {
                constructor: Tween,
                init: function(e, t, n, i, r, o) {
                    this.elem = e, this.prop = n, this.easing = r || jQuery.easing._default, this.options = t, 
                    this.start = this.now = this.cur(), this.end = i, this.unit = o || (jQuery.cssNumber[n] ? "" : "px");
                },
                cur: function() {
                    var e = Tween.propHooks[this.prop];
                    return e && e.get ? e.get(this) : Tween.propHooks._default.get(this);
                },
                run: function(e) {
                    var t, n = Tween.propHooks[this.prop];
                    return this.options.duration ? this.pos = t = jQuery.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, 
                    this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
                    n && n.set ? n.set(this) : Tween.propHooks._default.set(this), this;
                }
            }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
                _default: {
                    get: function(e) {
                        var t;
                        return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = jQuery.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0;
                    },
                    set: function(e) {
                        jQuery.fx.step[e.prop] ? jQuery.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !jQuery.cssHooks[e.prop] && null == e.elem.style[finalPropName(e.prop)] ? e.elem[e.prop] = e.now : jQuery.style(e.elem, e.prop, e.now + e.unit);
                    }
                }
            }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
                set: function(e) {
                    e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
                }
            }, jQuery.easing = {
                linear: function(e) {
                    return e;
                },
                swing: function(e) {
                    return .5 - Math.cos(e * Math.PI) / 2;
                },
                _default: "swing"
            }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
            var ce, ue, de = /^(?:toggle|show|hide)$/, pe = /queueHooks$/;
            function schedule() {
                ue && (!1 === y.hidden && i.requestAnimationFrame ? i.requestAnimationFrame(schedule) : i.setTimeout(schedule, jQuery.fx.interval), 
                jQuery.fx.tick());
            }
            function createFxNow() {
                return i.setTimeout((function() {
                    ce = void 0;
                })), ce = Date.now();
            }
            function genFx(e, t) {
                var n, i = 0, r = {
                    height: e
                };
                for (t = t ? 1 : 0; i < 4; i += 2 - t) r["margin" + (n = j[i])] = r["padding" + n] = e;
                return t && (r.opacity = r.width = e), r;
            }
            function createTween(e, t, n) {
                for (var i, r = (Animation.tweeners[t] || []).concat(Animation.tweeners["*"]), o = 0, a = r.length; o < a; o++) if (i = r[o].call(n, t, e)) return i;
            }
            function Animation(e, t, n) {
                var i, r, o = 0, a = Animation.prefilters.length, s = jQuery.Deferred().always((function() {
                    delete tick.elem;
                })), tick = function() {
                    if (r) return !1;
                    for (var t = ce || createFxNow(), n = Math.max(0, l.startTime + l.duration - t), i = 1 - (n / l.duration || 0), o = 0, a = l.tweens.length; o < a; o++) l.tweens[o].run(i);
                    return s.notifyWith(e, [ l, i, n ]), i < 1 && a ? n : (a || s.notifyWith(e, [ l, 1, 0 ]), 
                    s.resolveWith(e, [ l ]), !1);
                }, l = s.promise({
                    elem: e,
                    props: jQuery.extend({}, t),
                    opts: jQuery.extend(!0, {
                        specialEasing: {},
                        easing: jQuery.easing._default
                    }, n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: ce || createFxNow(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(t, n) {
                        var i = jQuery.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                        return l.tweens.push(i), i;
                    },
                    stop: function(t) {
                        var n = 0, i = t ? l.tweens.length : 0;
                        if (r) return this;
                        for (r = !0; n < i; n++) l.tweens[n].run(1);
                        return t ? (s.notifyWith(e, [ l, 1, 0 ]), s.resolveWith(e, [ l, t ])) : s.rejectWith(e, [ l, t ]), 
                        this;
                    }
                }), c = l.props;
                for (!function(e, t) {
                    var n, i, r, o, a;
                    for (n in e) if (r = t[i = camelCase(n)], o = e[n], Array.isArray(o) && (r = o[1], 
                    o = e[n] = o[0]), n !== i && (e[i] = o, delete e[n]), (a = jQuery.cssHooks[i]) && "expand" in a) for (n in o = a.expand(o), 
                    delete e[i], o) n in e || (e[n] = o[n], t[n] = r); else t[i] = r;
                }(c, l.opts.specialEasing); o < a; o++) if (i = Animation.prefilters[o].call(l, e, c, l.opts)) return isFunction(i.stop) && (jQuery._queueHooks(l.elem, l.opts.queue).stop = i.stop.bind(i)), 
                i;
                return jQuery.map(c, createTween, l), isFunction(l.opts.start) && l.opts.start.call(e, l), 
                l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), 
                jQuery.fx.timer(jQuery.extend(tick, {
                    elem: e,
                    anim: l,
                    queue: l.opts.queue
                })), l;
            }
            jQuery.Animation = jQuery.extend(Animation, {
                tweeners: {
                    "*": [ function(e, t) {
                        var n = this.createTween(e, t);
                        return adjustCSS(n.elem, e, I.exec(t), n), n;
                    } ]
                },
                tweener: function(e, t) {
                    isFunction(e) ? (t = e, e = [ "*" ]) : e = e.match($);
                    for (var n, i = 0, r = e.length; i < r; i++) n = e[i], Animation.tweeners[n] = Animation.tweeners[n] || [], 
                    Animation.tweeners[n].unshift(t);
                },
                prefilters: [ function(e, t, n) {
                    var i, r, o, a, s, l, c, u, d = "width" in t || "height" in t, p = this, h = {}, f = e.style, g = e.nodeType && isHiddenWithinTree(e), m = N.get(e, "fxshow");
                    for (i in n.queue || (null == (a = jQuery._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, 
                    s = a.empty.fire, a.empty.fire = function() {
                        a.unqueued || s();
                    }), a.unqueued++, p.always((function() {
                        p.always((function() {
                            a.unqueued--, jQuery.queue(e, "fx").length || a.empty.fire();
                        }));
                    }))), t) if (r = t[i], de.test(r)) {
                        if (delete t[i], o = o || "toggle" === r, r === (g ? "hide" : "show")) {
                            if ("show" !== r || !m || void 0 === m[i]) continue;
                            g = !0;
                        }
                        h[i] = m && m[i] || jQuery.style(e, i);
                    }
                    if ((l = !jQuery.isEmptyObject(t)) || !jQuery.isEmptyObject(h)) for (i in d && 1 === e.nodeType && (n.overflow = [ f.overflow, f.overflowX, f.overflowY ], 
                    null == (c = m && m.display) && (c = N.get(e, "display")), "none" === (u = jQuery.css(e, "display")) && (c ? u = c : (showHide([ e ], !0), 
                    c = e.style.display || c, u = jQuery.css(e, "display"), showHide([ e ]))), ("inline" === u || "inline-block" === u && null != c) && "none" === jQuery.css(e, "float") && (l || (p.done((function() {
                        f.display = c;
                    })), null == c && (u = f.display, c = "none" === u ? "" : u)), f.display = "inline-block")), 
                    n.overflow && (f.overflow = "hidden", p.always((function() {
                        f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2];
                    }))), l = !1, h) l || (m ? "hidden" in m && (g = m.hidden) : m = N.access(e, "fxshow", {
                        display: c
                    }), o && (m.hidden = !g), g && showHide([ e ], !0), p.done((function() {
                        for (i in g || showHide([ e ]), N.remove(e, "fxshow"), h) jQuery.style(e, i, h[i]);
                    }))), l = createTween(g ? m[i] : 0, i, p), i in m || (m[i] = l.start, g && (l.end = l.start, 
                    l.start = 0));
                } ],
                prefilter: function(e, t) {
                    t ? Animation.prefilters.unshift(e) : Animation.prefilters.push(e);
                }
            }), jQuery.speed = function(e, t, n) {
                var i = e && "object" == typeof e ? jQuery.extend({}, e) : {
                    complete: n || !n && t || isFunction(e) && e,
                    duration: e,
                    easing: n && t || t && !isFunction(t) && t
                };
                return jQuery.fx.off ? i.duration = 0 : "number" != typeof i.duration && (i.duration in jQuery.fx.speeds ? i.duration = jQuery.fx.speeds[i.duration] : i.duration = jQuery.fx.speeds._default), 
                null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                    isFunction(i.old) && i.old.call(this), i.queue && jQuery.dequeue(this, i.queue);
                }, i;
            }, jQuery.fn.extend({
                fadeTo: function(e, t, n, i) {
                    return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({
                        opacity: t
                    }, e, n, i);
                },
                animate: function(e, t, n, i) {
                    var r = jQuery.isEmptyObject(e), o = jQuery.speed(t, n, i), doAnimation = function() {
                        var t = Animation(this, jQuery.extend({}, e), o);
                        (r || N.get(this, "finish")) && t.stop(!0);
                    };
                    return doAnimation.finish = doAnimation, r || !1 === o.queue ? this.each(doAnimation) : this.queue(o.queue, doAnimation);
                },
                stop: function(e, t, n) {
                    var stopQueue = function(e) {
                        var t = e.stop;
                        delete e.stop, t(n);
                    };
                    return "string" != typeof e && (n = t, t = e, e = void 0), t && this.queue(e || "fx", []), 
                    this.each((function() {
                        var t = !0, i = null != e && e + "queueHooks", r = jQuery.timers, o = N.get(this);
                        if (i) o[i] && o[i].stop && stopQueue(o[i]); else for (i in o) o[i] && o[i].stop && pe.test(i) && stopQueue(o[i]);
                        for (i = r.length; i--; ) r[i].elem !== this || null != e && r[i].queue !== e || (r[i].anim.stop(n), 
                        t = !1, r.splice(i, 1));
                        !t && n || jQuery.dequeue(this, e);
                    }));
                },
                finish: function(e) {
                    return !1 !== e && (e = e || "fx"), this.each((function() {
                        var t, n = N.get(this), i = n[e + "queue"], r = n[e + "queueHooks"], o = jQuery.timers, a = i ? i.length : 0;
                        for (n.finish = !0, jQuery.queue(this, e, []), r && r.stop && r.stop.call(this, !0), 
                        t = o.length; t--; ) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), 
                        o.splice(t, 1));
                        for (t = 0; t < a; t++) i[t] && i[t].finish && i[t].finish.call(this);
                        delete n.finish;
                    }));
                }
            }), jQuery.each([ "toggle", "show", "hide" ], (function(e, t) {
                var n = jQuery.fn[t];
                jQuery.fn[t] = function(e, i, r) {
                    return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(genFx(t, !0), e, i, r);
                };
            })), jQuery.each({
                slideDown: genFx("show"),
                slideUp: genFx("hide"),
                slideToggle: genFx("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, (function(e, t) {
                jQuery.fn[e] = function(e, n, i) {
                    return this.animate(t, e, n, i);
                };
            })), jQuery.timers = [], jQuery.fx.tick = function() {
                var e, t = 0, n = jQuery.timers;
                for (ce = Date.now(); t < n.length; t++) (e = n[t])() || n[t] !== e || n.splice(t--, 1);
                n.length || jQuery.fx.stop(), ce = void 0;
            }, jQuery.fx.timer = function(e) {
                jQuery.timers.push(e), jQuery.fx.start();
            }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
                ue || (ue = !0, schedule());
            }, jQuery.fx.stop = function() {
                ue = null;
            }, jQuery.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, jQuery.fn.delay = function(e, t) {
                return e = jQuery.fx && jQuery.fx.speeds[e] || e, t = t || "fx", this.queue(t, (function(t, n) {
                    var r = i.setTimeout(t, e);
                    n.stop = function() {
                        i.clearTimeout(r);
                    };
                }));
            }, function() {
                var e = y.createElement("input"), t = y.createElement("select").appendChild(y.createElement("option"));
                e.type = "checkbox", m.checkOn = "" !== e.value, m.optSelected = t.selected, (e = y.createElement("input")).value = "t", 
                e.type = "radio", m.radioValue = "t" === e.value;
            }();
            var he, fe = jQuery.expr.attrHandle;
            jQuery.fn.extend({
                attr: function(e, t) {
                    return access(this, jQuery.attr, e, t, arguments.length > 1);
                },
                removeAttr: function(e) {
                    return this.each((function() {
                        jQuery.removeAttr(this, e);
                    }));
                }
            }), jQuery.extend({
                attr: function(e, t, n) {
                    var i, r, o = e.nodeType;
                    if (3 !== o && 8 !== o && 2 !== o) return void 0 === e.getAttribute ? jQuery.prop(e, t, n) : (1 === o && jQuery.isXMLDoc(e) || (r = jQuery.attrHooks[t.toLowerCase()] || (jQuery.expr.match.bool.test(t) ? he : void 0)), 
                    void 0 !== n ? null === n ? void jQuery.removeAttr(e, t) : r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), 
                    n) : r && "get" in r && null !== (i = r.get(e, t)) ? i : null == (i = jQuery.find.attr(e, t)) ? void 0 : i);
                },
                attrHooks: {
                    type: {
                        set: function(e, t) {
                            if (!m.radioValue && "radio" === t && nodeName(e, "input")) {
                                var n = e.value;
                                return e.setAttribute("type", t), n && (e.value = n), t;
                            }
                        }
                    }
                },
                removeAttr: function(e, t) {
                    var n, i = 0, r = t && t.match($);
                    if (r && 1 === e.nodeType) for (;n = r[i++]; ) e.removeAttribute(n);
                }
            }), he = {
                set: function(e, t, n) {
                    return !1 === t ? jQuery.removeAttr(e, n) : e.setAttribute(n, n), n;
                }
            }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), (function(e, t) {
                var n = fe[t] || jQuery.find.attr;
                fe[t] = function(e, t, i) {
                    var r, o, a = t.toLowerCase();
                    return i || (o = fe[a], fe[a] = r, r = null != n(e, t, i) ? a : null, fe[a] = o), 
                    r;
                };
            }));
            var ge = /^(?:input|select|textarea|button)$/i, me = /^(?:a|area)$/i;
            function stripAndCollapse(e) {
                return (e.match($) || []).join(" ");
            }
            function getClass(e) {
                return e.getAttribute && e.getAttribute("class") || "";
            }
            function classesToArray(e) {
                return Array.isArray(e) ? e : "string" == typeof e && e.match($) || [];
            }
            jQuery.fn.extend({
                prop: function(e, t) {
                    return access(this, jQuery.prop, e, t, arguments.length > 1);
                },
                removeProp: function(e) {
                    return this.each((function() {
                        delete this[jQuery.propFix[e] || e];
                    }));
                }
            }), jQuery.extend({
                prop: function(e, t, n) {
                    var i, r, o = e.nodeType;
                    if (3 !== o && 8 !== o && 2 !== o) return 1 === o && jQuery.isXMLDoc(e) || (t = jQuery.propFix[t] || t, 
                    r = jQuery.propHooks[t]), void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : e[t] = n : r && "get" in r && null !== (i = r.get(e, t)) ? i : e[t];
                },
                propHooks: {
                    tabIndex: {
                        get: function(e) {
                            var t = jQuery.find.attr(e, "tabindex");
                            return t ? parseInt(t, 10) : ge.test(e.nodeName) || me.test(e.nodeName) && e.href ? 0 : -1;
                        }
                    }
                },
                propFix: {
                    for: "htmlFor",
                    class: "className"
                }
            }), m.optSelected || (jQuery.propHooks.selected = {
                get: function(e) {
                    var t = e.parentNode;
                    return t && t.parentNode && t.parentNode.selectedIndex, null;
                },
                set: function(e) {
                    var t = e.parentNode;
                    t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
                }
            }), jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], (function() {
                jQuery.propFix[this.toLowerCase()] = this;
            })), jQuery.fn.extend({
                addClass: function(e) {
                    var t, n, i, r, o, a;
                    return isFunction(e) ? this.each((function(t) {
                        jQuery(this).addClass(e.call(this, t, getClass(this)));
                    })) : (t = classesToArray(e)).length ? this.each((function() {
                        if (i = getClass(this), n = 1 === this.nodeType && " " + stripAndCollapse(i) + " ") {
                            for (o = 0; o < t.length; o++) r = t[o], n.indexOf(" " + r + " ") < 0 && (n += r + " ");
                            a = stripAndCollapse(n), i !== a && this.setAttribute("class", a);
                        }
                    })) : this;
                },
                removeClass: function(e) {
                    var t, n, i, r, o, a;
                    return isFunction(e) ? this.each((function(t) {
                        jQuery(this).removeClass(e.call(this, t, getClass(this)));
                    })) : arguments.length ? (t = classesToArray(e)).length ? this.each((function() {
                        if (i = getClass(this), n = 1 === this.nodeType && " " + stripAndCollapse(i) + " ") {
                            for (o = 0; o < t.length; o++) for (r = t[o]; n.indexOf(" " + r + " ") > -1; ) n = n.replace(" " + r + " ", " ");
                            a = stripAndCollapse(n), i !== a && this.setAttribute("class", a);
                        }
                    })) : this : this.attr("class", "");
                },
                toggleClass: function(e, t) {
                    var n, i, r, o, a = typeof e, s = "string" === a || Array.isArray(e);
                    return isFunction(e) ? this.each((function(n) {
                        jQuery(this).toggleClass(e.call(this, n, getClass(this), t), t);
                    })) : "boolean" == typeof t && s ? t ? this.addClass(e) : this.removeClass(e) : (n = classesToArray(e), 
                    this.each((function() {
                        if (s) for (o = jQuery(this), r = 0; r < n.length; r++) i = n[r], o.hasClass(i) ? o.removeClass(i) : o.addClass(i); else void 0 !== e && "boolean" !== a || ((i = getClass(this)) && N.set(this, "__className__", i), 
                        this.setAttribute && this.setAttribute("class", i || !1 === e ? "" : N.get(this, "__className__") || ""));
                    })));
                },
                hasClass: function(e) {
                    var t, n, i = 0;
                    for (t = " " + e + " "; n = this[i++]; ) if (1 === n.nodeType && (" " + stripAndCollapse(getClass(n)) + " ").indexOf(t) > -1) return !0;
                    return !1;
                }
            });
            var ye = /\r/g;
            jQuery.fn.extend({
                val: function(e) {
                    var t, n, i, r = this[0];
                    return arguments.length ? (i = isFunction(e), this.each((function(n) {
                        var r;
                        1 === this.nodeType && (null == (r = i ? e.call(this, n, jQuery(this).val()) : e) ? r = "" : "number" == typeof r ? r += "" : Array.isArray(r) && (r = jQuery.map(r, (function(e) {
                            return null == e ? "" : e + "";
                        }))), (t = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, r, "value") || (this.value = r));
                    }))) : r ? (t = jQuery.valHooks[r.type] || jQuery.valHooks[r.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(r, "value")) ? n : "string" == typeof (n = r.value) ? n.replace(ye, "") : null == n ? "" : n : void 0;
                }
            }), jQuery.extend({
                valHooks: {
                    option: {
                        get: function(e) {
                            var t = jQuery.find.attr(e, "value");
                            return null != t ? t : stripAndCollapse(jQuery.text(e));
                        }
                    },
                    select: {
                        get: function(e) {
                            var t, n, i, r = e.options, o = e.selectedIndex, a = "select-one" === e.type, s = a ? null : [], l = a ? o + 1 : r.length;
                            for (i = o < 0 ? l : a ? o : 0; i < l; i++) if (((n = r[i]).selected || i === o) && !n.disabled && (!n.parentNode.disabled || !nodeName(n.parentNode, "optgroup"))) {
                                if (t = jQuery(n).val(), a) return t;
                                s.push(t);
                            }
                            return s;
                        },
                        set: function(e, t) {
                            for (var n, i, r = e.options, o = jQuery.makeArray(t), a = r.length; a--; ) ((i = r[a]).selected = jQuery.inArray(jQuery.valHooks.option.get(i), o) > -1) && (n = !0);
                            return n || (e.selectedIndex = -1), o;
                        }
                    }
                }
            }), jQuery.each([ "radio", "checkbox" ], (function() {
                jQuery.valHooks[this] = {
                    set: function(e, t) {
                        if (Array.isArray(t)) return e.checked = jQuery.inArray(jQuery(e).val(), t) > -1;
                    }
                }, m.checkOn || (jQuery.valHooks[this].get = function(e) {
                    return null === e.getAttribute("value") ? "on" : e.value;
                });
            })), m.focusin = "onfocusin" in i;
            var ve = /^(?:focusinfocus|focusoutblur)$/, stopPropagationCallback = function(e) {
                e.stopPropagation();
            };
            jQuery.extend(jQuery.event, {
                trigger: function(e, t, n, r) {
                    var o, a, s, l, c, u, d, p, f = [ n || y ], g = h.call(e, "type") ? e.type : e, m = h.call(e, "namespace") ? e.namespace.split(".") : [];
                    if (a = p = s = n = n || y, 3 !== n.nodeType && 8 !== n.nodeType && !ve.test(g + jQuery.event.triggered) && (g.indexOf(".") > -1 && (m = g.split("."), 
                    g = m.shift(), m.sort()), c = g.indexOf(":") < 0 && "on" + g, (e = e[jQuery.expando] ? e : new jQuery.Event(g, "object" == typeof e && e)).isTrigger = r ? 2 : 3, 
                    e.namespace = m.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
                    e.result = void 0, e.target || (e.target = n), t = null == t ? [ e ] : jQuery.makeArray(t, [ e ]), 
                    d = jQuery.event.special[g] || {}, r || !d.trigger || !1 !== d.trigger.apply(n, t))) {
                        if (!r && !d.noBubble && !isWindow(n)) {
                            for (l = d.delegateType || g, ve.test(l + g) || (a = a.parentNode); a; a = a.parentNode) f.push(a), 
                            s = a;
                            s === (n.ownerDocument || y) && f.push(s.defaultView || s.parentWindow || i);
                        }
                        for (o = 0; (a = f[o++]) && !e.isPropagationStopped(); ) p = a, e.type = o > 1 ? l : d.bindType || g, 
                        (u = (N.get(a, "events") || Object.create(null))[e.type] && N.get(a, "handle")) && u.apply(a, t), 
                        (u = c && a[c]) && u.apply && acceptData(a) && (e.result = u.apply(a, t), !1 === e.result && e.preventDefault());
                        return e.type = g, r || e.isDefaultPrevented() || d._default && !1 !== d._default.apply(f.pop(), t) || !acceptData(n) || c && isFunction(n[g]) && !isWindow(n) && ((s = n[c]) && (n[c] = null), 
                        jQuery.event.triggered = g, e.isPropagationStopped() && p.addEventListener(g, stopPropagationCallback), 
                        n[g](), e.isPropagationStopped() && p.removeEventListener(g, stopPropagationCallback), 
                        jQuery.event.triggered = void 0, s && (n[c] = s)), e.result;
                    }
                },
                simulate: function(e, t, n) {
                    var i = jQuery.extend(new jQuery.Event, n, {
                        type: e,
                        isSimulated: !0
                    });
                    jQuery.event.trigger(i, null, t);
                }
            }), jQuery.fn.extend({
                trigger: function(e, t) {
                    return this.each((function() {
                        jQuery.event.trigger(e, t, this);
                    }));
                },
                triggerHandler: function(e, t) {
                    var n = this[0];
                    if (n) return jQuery.event.trigger(e, t, n, !0);
                }
            }), m.focusin || jQuery.each({
                focus: "focusin",
                blur: "focusout"
            }, (function(e, t) {
                var handler = function(e) {
                    jQuery.event.simulate(t, e.target, jQuery.event.fix(e));
                };
                jQuery.event.special[t] = {
                    setup: function() {
                        var n = this.ownerDocument || this.document || this, i = N.access(n, t);
                        i || n.addEventListener(e, handler, !0), N.access(n, t, (i || 0) + 1);
                    },
                    teardown: function() {
                        var n = this.ownerDocument || this.document || this, i = N.access(n, t) - 1;
                        i ? N.access(n, t, i) : (n.removeEventListener(e, handler, !0), N.remove(n, t));
                    }
                };
            }));
            var be = i.location, xe = {
                guid: Date.now()
            }, we = /\?/;
            jQuery.parseXML = function(e) {
                var t, n;
                if (!e || "string" != typeof e) return null;
                try {
                    t = (new i.DOMParser).parseFromString(e, "text/xml");
                } catch (e) {}
                return n = t && t.getElementsByTagName("parsererror")[0], t && !n || jQuery.error("Invalid XML: " + (n ? jQuery.map(n.childNodes, (function(e) {
                    return e.textContent;
                })).join("\n") : e)), t;
            };
            var Te = /\[\]$/, ke = /\r?\n/g, Ce = /^(?:submit|button|image|reset|file)$/i, Se = /^(?:input|select|textarea|keygen)/i;
            function buildParams(e, t, n, i) {
                var r;
                if (Array.isArray(t)) jQuery.each(t, (function(t, r) {
                    n || Te.test(e) ? i(e, r) : buildParams(e + "[" + ("object" == typeof r && null != r ? t : "") + "]", r, n, i);
                })); else if (n || "object" !== toType(t)) i(e, t); else for (r in t) buildParams(e + "[" + r + "]", t[r], n, i);
            }
            jQuery.param = function(e, t) {
                var n, i = [], add = function(e, t) {
                    var n = isFunction(t) ? t() : t;
                    i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
                };
                if (null == e) return "";
                if (Array.isArray(e) || e.jquery && !jQuery.isPlainObject(e)) jQuery.each(e, (function() {
                    add(this.name, this.value);
                })); else for (n in e) buildParams(n, e[n], t, add);
                return i.join("&");
            }, jQuery.fn.extend({
                serialize: function() {
                    return jQuery.param(this.serializeArray());
                },
                serializeArray: function() {
                    return this.map((function() {
                        var e = jQuery.prop(this, "elements");
                        return e ? jQuery.makeArray(e) : this;
                    })).filter((function() {
                        var e = this.type;
                        return this.name && !jQuery(this).is(":disabled") && Se.test(this.nodeName) && !Ce.test(e) && (this.checked || !_.test(e));
                    })).map((function(e, t) {
                        var n = jQuery(this).val();
                        return null == n ? null : Array.isArray(n) ? jQuery.map(n, (function(e) {
                            return {
                                name: t.name,
                                value: e.replace(ke, "\r\n")
                            };
                        })) : {
                            name: t.name,
                            value: n.replace(ke, "\r\n")
                        };
                    })).get();
                }
            });
            var Ae = /%20/g, $e = /#.*$/, Re = /([?&])_=[^&]*/, De = /^(.*?):[ \t]*([^\r\n]*)$/gm, Pe = /^(?:GET|HEAD)$/, Ee = /^\/\//, Ne = {}, Le = {}, Me = "*/".concat("*"), Be = y.createElement("a");
            function addToPrefiltersOrTransports(e) {
                return function(t, n) {
                    "string" != typeof t && (n = t, t = "*");
                    var i, r = 0, o = t.toLowerCase().match($) || [];
                    if (isFunction(n)) for (;i = o[r++]; ) "+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n);
                };
            }
            function inspectPrefiltersOrTransports(e, t, n, i) {
                var r = {}, o = e === Le;
                function inspect(a) {
                    var s;
                    return r[a] = !0, jQuery.each(e[a] || [], (function(e, a) {
                        var l = a(t, n, i);
                        return "string" != typeof l || o || r[l] ? o ? !(s = l) : void 0 : (t.dataTypes.unshift(l), 
                        inspect(l), !1);
                    })), s;
                }
                return inspect(t.dataTypes[0]) || !r["*"] && inspect("*");
            }
            function ajaxExtend(e, t) {
                var n, i, r = jQuery.ajaxSettings.flatOptions || {};
                for (n in t) void 0 !== t[n] && ((r[n] ? e : i || (i = {}))[n] = t[n]);
                return i && jQuery.extend(!0, e, i), e;
            }
            Be.href = be.href, jQuery.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: be.href,
                    type: "GET",
                    isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(be.protocol),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": Me,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /\bxml\b/,
                        html: /\bhtml/,
                        json: /\bjson\b/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": JSON.parse,
                        "text xml": jQuery.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(e, t) {
                    return t ? ajaxExtend(ajaxExtend(e, jQuery.ajaxSettings), t) : ajaxExtend(jQuery.ajaxSettings, e);
                },
                ajaxPrefilter: addToPrefiltersOrTransports(Ne),
                ajaxTransport: addToPrefiltersOrTransports(Le),
                ajax: function(e, t) {
                    "object" == typeof e && (t = e, e = void 0), t = t || {};
                    var n, r, o, a, s, l, c, u, d, p, h = jQuery.ajaxSetup({}, t), f = h.context || h, g = h.context && (f.nodeType || f.jquery) ? jQuery(f) : jQuery.event, m = jQuery.Deferred(), v = jQuery.Callbacks("once memory"), b = h.statusCode || {}, x = {}, w = {}, T = "canceled", k = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (c) {
                                if (!a) for (a = {}; t = De.exec(o); ) a[t[1].toLowerCase() + " "] = (a[t[1].toLowerCase() + " "] || []).concat(t[2]);
                                t = a[e.toLowerCase() + " "];
                            }
                            return null == t ? null : t.join(", ");
                        },
                        getAllResponseHeaders: function() {
                            return c ? o : null;
                        },
                        setRequestHeader: function(e, t) {
                            return null == c && (e = w[e.toLowerCase()] = w[e.toLowerCase()] || e, x[e] = t), 
                            this;
                        },
                        overrideMimeType: function(e) {
                            return null == c && (h.mimeType = e), this;
                        },
                        statusCode: function(e) {
                            var t;
                            if (e) if (c) k.always(e[k.status]); else for (t in e) b[t] = [ b[t], e[t] ];
                            return this;
                        },
                        abort: function(e) {
                            var t = e || T;
                            return n && n.abort(t), done(0, t), this;
                        }
                    };
                    if (m.promise(k), h.url = ((e || h.url || be.href) + "").replace(Ee, be.protocol + "//"), 
                    h.type = t.method || t.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match($) || [ "" ], 
                    null == h.crossDomain) {
                        l = y.createElement("a");
                        try {
                            l.href = h.url, l.href = l.href, h.crossDomain = Be.protocol + "//" + Be.host != l.protocol + "//" + l.host;
                        } catch (e) {
                            h.crossDomain = !0;
                        }
                    }
                    if (h.data && h.processData && "string" != typeof h.data && (h.data = jQuery.param(h.data, h.traditional)), 
                    inspectPrefiltersOrTransports(Ne, h, t, k), c) return k;
                    for (d in (u = jQuery.event && h.global) && 0 == jQuery.active++ && jQuery.event.trigger("ajaxStart"), 
                    h.type = h.type.toUpperCase(), h.hasContent = !Pe.test(h.type), r = h.url.replace($e, ""), 
                    h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(Ae, "+")) : (p = h.url.slice(r.length), 
                    h.data && (h.processData || "string" == typeof h.data) && (r += (we.test(r) ? "&" : "?") + h.data, 
                    delete h.data), !1 === h.cache && (r = r.replace(Re, "$1"), p = (we.test(r) ? "&" : "?") + "_=" + xe.guid++ + p), 
                    h.url = r + p), h.ifModified && (jQuery.lastModified[r] && k.setRequestHeader("If-Modified-Since", jQuery.lastModified[r]), 
                    jQuery.etag[r] && k.setRequestHeader("If-None-Match", jQuery.etag[r])), (h.data && h.hasContent && !1 !== h.contentType || t.contentType) && k.setRequestHeader("Content-Type", h.contentType), 
                    k.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Me + "; q=0.01" : "") : h.accepts["*"]), 
                    h.headers) k.setRequestHeader(d, h.headers[d]);
                    if (h.beforeSend && (!1 === h.beforeSend.call(f, k, h) || c)) return k.abort();
                    if (T = "abort", v.add(h.complete), k.done(h.success), k.fail(h.error), n = inspectPrefiltersOrTransports(Le, h, t, k)) {
                        if (k.readyState = 1, u && g.trigger("ajaxSend", [ k, h ]), c) return k;
                        h.async && h.timeout > 0 && (s = i.setTimeout((function() {
                            k.abort("timeout");
                        }), h.timeout));
                        try {
                            c = !1, n.send(x, done);
                        } catch (e) {
                            if (c) throw e;
                            done(-1, e);
                        }
                    } else done(-1, "No Transport");
                    function done(e, t, a, l) {
                        var d, p, y, x, w, T = t;
                        c || (c = !0, s && i.clearTimeout(s), n = void 0, o = l || "", k.readyState = e > 0 ? 4 : 0, 
                        d = e >= 200 && e < 300 || 304 === e, a && (x = function(e, t, n) {
                            for (var i, r, o, a, s = e.contents, l = e.dataTypes; "*" === l[0]; ) l.shift(), 
                            void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
                            if (i) for (r in s) if (s[r] && s[r].test(i)) {
                                l.unshift(r);
                                break;
                            }
                            if (l[0] in n) o = l[0]; else {
                                for (r in n) {
                                    if (!l[0] || e.converters[r + " " + l[0]]) {
                                        o = r;
                                        break;
                                    }
                                    a || (a = r);
                                }
                                o = o || a;
                            }
                            if (o) return o !== l[0] && l.unshift(o), n[o];
                        }(h, k, a)), !d && jQuery.inArray("script", h.dataTypes) > -1 && jQuery.inArray("json", h.dataTypes) < 0 && (h.converters["text script"] = function() {}), 
                        x = function(e, t, n, i) {
                            var r, o, a, s, l, c = {}, u = e.dataTypes.slice();
                            if (u[1]) for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
                            for (o = u.shift(); o; ) if (e.responseFields[o] && (n[e.responseFields[o]] = t), 
                            !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = u.shift()) if ("*" === o) o = l; else if ("*" !== l && l !== o) {
                                if (!(a = c[l + " " + o] || c["* " + o])) for (r in c) if ((s = r.split(" "))[1] === o && (a = c[l + " " + s[0]] || c["* " + s[0]])) {
                                    !0 === a ? a = c[r] : !0 !== c[r] && (o = s[0], u.unshift(s[1]));
                                    break;
                                }
                                if (!0 !== a) if (a && e.throws) t = a(t); else try {
                                    t = a(t);
                                } catch (e) {
                                    return {
                                        state: "parsererror",
                                        error: a ? e : "No conversion from " + l + " to " + o
                                    };
                                }
                            }
                            return {
                                state: "success",
                                data: t
                            };
                        }(h, x, k, d), d ? (h.ifModified && ((w = k.getResponseHeader("Last-Modified")) && (jQuery.lastModified[r] = w), 
                        (w = k.getResponseHeader("etag")) && (jQuery.etag[r] = w)), 204 === e || "HEAD" === h.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = x.state, 
                        p = x.data, d = !(y = x.error))) : (y = T, !e && T || (T = "error", e < 0 && (e = 0))), 
                        k.status = e, k.statusText = (t || T) + "", d ? m.resolveWith(f, [ p, T, k ]) : m.rejectWith(f, [ k, T, y ]), 
                        k.statusCode(b), b = void 0, u && g.trigger(d ? "ajaxSuccess" : "ajaxError", [ k, h, d ? p : y ]), 
                        v.fireWith(f, [ k, T ]), u && (g.trigger("ajaxComplete", [ k, h ]), --jQuery.active || jQuery.event.trigger("ajaxStop")));
                    }
                    return k;
                },
                getJSON: function(e, t, n) {
                    return jQuery.get(e, t, n, "json");
                },
                getScript: function(e, t) {
                    return jQuery.get(e, void 0, t, "script");
                }
            }), jQuery.each([ "get", "post" ], (function(e, t) {
                jQuery[t] = function(e, n, i, r) {
                    return isFunction(n) && (r = r || i, i = n, n = void 0), jQuery.ajax(jQuery.extend({
                        url: e,
                        type: t,
                        dataType: r,
                        data: n,
                        success: i
                    }, jQuery.isPlainObject(e) && e));
                };
            })), jQuery.ajaxPrefilter((function(e) {
                var t;
                for (t in e.headers) "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "");
            })), jQuery._evalUrl = function(e, t, n) {
                return jQuery.ajax({
                    url: e,
                    type: "GET",
                    dataType: "script",
                    cache: !0,
                    async: !1,
                    global: !1,
                    converters: {
                        "text script": function() {}
                    },
                    dataFilter: function(e) {
                        jQuery.globalEval(e, t, n);
                    }
                });
            }, jQuery.fn.extend({
                wrapAll: function(e) {
                    var t;
                    return this[0] && (isFunction(e) && (e = e.call(this[0])), t = jQuery(e, this[0].ownerDocument).eq(0).clone(!0), 
                    this[0].parentNode && t.insertBefore(this[0]), t.map((function() {
                        for (var e = this; e.firstElementChild; ) e = e.firstElementChild;
                        return e;
                    })).append(this)), this;
                },
                wrapInner: function(e) {
                    return isFunction(e) ? this.each((function(t) {
                        jQuery(this).wrapInner(e.call(this, t));
                    })) : this.each((function() {
                        var t = jQuery(this), n = t.contents();
                        n.length ? n.wrapAll(e) : t.append(e);
                    }));
                },
                wrap: function(e) {
                    var t = isFunction(e);
                    return this.each((function(n) {
                        jQuery(this).wrapAll(t ? e.call(this, n) : e);
                    }));
                },
                unwrap: function(e) {
                    return this.parent(e).not("body").each((function() {
                        jQuery(this).replaceWith(this.childNodes);
                    })), this;
                }
            }), jQuery.expr.pseudos.hidden = function(e) {
                return !jQuery.expr.pseudos.visible(e);
            }, jQuery.expr.pseudos.visible = function(e) {
                return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
            }, jQuery.ajaxSettings.xhr = function() {
                try {
                    return new i.XMLHttpRequest;
                } catch (e) {}
            };
            var We = {
                0: 200,
                1223: 204
            }, Ie = jQuery.ajaxSettings.xhr();
            m.cors = !!Ie && "withCredentials" in Ie, m.ajax = Ie = !!Ie, jQuery.ajaxTransport((function(e) {
                var t, n;
                if (m.cors || Ie && !e.crossDomain) return {
                    send: function(r, o) {
                        var a, s = e.xhr();
                        if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (a in e.xhrFields) s[a] = e.xhrFields[a];
                        for (a in e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest"), 
                        r) s.setRequestHeader(a, r[a]);
                        t = function(e) {
                            return function() {
                                t && (t = n = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, 
                                "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(We[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                                    binary: s.response
                                } : {
                                    text: s.responseText
                                }, s.getAllResponseHeaders()));
                            };
                        }, s.onload = t(), n = s.onerror = s.ontimeout = t("error"), void 0 !== s.onabort ? s.onabort = n : s.onreadystatechange = function() {
                            4 === s.readyState && i.setTimeout((function() {
                                t && n();
                            }));
                        }, t = t("abort");
                        try {
                            s.send(e.hasContent && e.data || null);
                        } catch (e) {
                            if (t) throw e;
                        }
                    },
                    abort: function() {
                        t && t();
                    }
                };
            })), jQuery.ajaxPrefilter((function(e) {
                e.crossDomain && (e.contents.script = !1);
            })), jQuery.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /\b(?:java|ecma)script\b/
                },
                converters: {
                    "text script": function(e) {
                        return jQuery.globalEval(e), e;
                    }
                }
            }), jQuery.ajaxPrefilter("script", (function(e) {
                void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
            })), jQuery.ajaxTransport("script", (function(e) {
                var t, n;
                if (e.crossDomain || e.scriptAttrs) return {
                    send: function(i, r) {
                        t = jQuery("<script>").attr(e.scriptAttrs || {}).prop({
                            charset: e.scriptCharset,
                            src: e.url
                        }).on("load error", n = function(e) {
                            t.remove(), n = null, e && r("error" === e.type ? 404 : 200, e.type);
                        }), y.head.appendChild(t[0]);
                    },
                    abort: function() {
                        n && n();
                    }
                };
            }));
            var je, Oe = [], Fe = /(=)\?(?=&|$)|\?\?/;
            jQuery.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var e = Oe.pop() || jQuery.expando + "_" + xe.guid++;
                    return this[e] = !0, e;
                }
            }), jQuery.ajaxPrefilter("json jsonp", (function(e, t, n) {
                var r, o, a, s = !1 !== e.jsonp && (Fe.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Fe.test(e.data) && "data");
                if (s || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, 
                s ? e[s] = e[s].replace(Fe, "$1" + r) : !1 !== e.jsonp && (e.url += (we.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), 
                e.converters["script json"] = function() {
                    return a || jQuery.error(r + " was not called"), a[0];
                }, e.dataTypes[0] = "json", o = i[r], i[r] = function() {
                    a = arguments;
                }, n.always((function() {
                    void 0 === o ? jQuery(i).removeProp(r) : i[r] = o, e[r] && (e.jsonpCallback = t.jsonpCallback, 
                    Oe.push(r)), a && isFunction(o) && o(a[0]), a = o = void 0;
                })), "script";
            })), m.createHTMLDocument = ((je = y.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 
            2 === je.childNodes.length), jQuery.parseHTML = function(e, t, n) {
                return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (m.createHTMLDocument ? ((i = (t = y.implementation.createHTMLDocument("")).createElement("base")).href = y.location.href, 
                t.head.appendChild(i)) : t = y), o = !n && [], (r = T.exec(e)) ? [ t.createElement(r[1]) ] : (r = buildFragment([ e ], t, o), 
                o && o.length && jQuery(o).remove(), jQuery.merge([], r.childNodes)));
                var i, r, o;
            }, jQuery.fn.load = function(e, t, n) {
                var i, r, o, a = this, s = e.indexOf(" ");
                return s > -1 && (i = stripAndCollapse(e.slice(s)), e = e.slice(0, s)), isFunction(t) ? (n = t, 
                t = void 0) : t && "object" == typeof t && (r = "POST"), a.length > 0 && jQuery.ajax({
                    url: e,
                    type: r || "GET",
                    dataType: "html",
                    data: t
                }).done((function(e) {
                    o = arguments, a.html(i ? jQuery("<div>").append(jQuery.parseHTML(e)).find(i) : e);
                })).always(n && function(e, t) {
                    a.each((function() {
                        n.apply(this, o || [ e.responseText, t, e ]);
                    }));
                }), this;
            }, jQuery.expr.pseudos.animated = function(e) {
                return jQuery.grep(jQuery.timers, (function(t) {
                    return e === t.elem;
                })).length;
            }, jQuery.offset = {
                setOffset: function(e, t, n) {
                    var i, r, o, a, s, l, c = jQuery.css(e, "position"), u = jQuery(e), d = {};
                    "static" === c && (e.style.position = "relative"), s = u.offset(), o = jQuery.css(e, "top"), 
                    l = jQuery.css(e, "left"), ("absolute" === c || "fixed" === c) && (o + l).indexOf("auto") > -1 ? (a = (i = u.position()).top, 
                    r = i.left) : (a = parseFloat(o) || 0, r = parseFloat(l) || 0), isFunction(t) && (t = t.call(e, n, jQuery.extend({}, s))), 
                    null != t.top && (d.top = t.top - s.top + a), null != t.left && (d.left = t.left - s.left + r), 
                    "using" in t ? t.using.call(e, d) : u.css(d);
                }
            }, jQuery.fn.extend({
                offset: function(e) {
                    if (arguments.length) return void 0 === e ? this : this.each((function(t) {
                        jQuery.offset.setOffset(this, e, t);
                    }));
                    var t, n, i = this[0];
                    return i ? i.getClientRects().length ? (t = i.getBoundingClientRect(), n = i.ownerDocument.defaultView, 
                    {
                        top: t.top + n.pageYOffset,
                        left: t.left + n.pageXOffset
                    }) : {
                        top: 0,
                        left: 0
                    } : void 0;
                },
                position: function() {
                    if (this[0]) {
                        var e, t, n, i = this[0], r = {
                            top: 0,
                            left: 0
                        };
                        if ("fixed" === jQuery.css(i, "position")) t = i.getBoundingClientRect(); else {
                            for (t = this.offset(), n = i.ownerDocument, e = i.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === jQuery.css(e, "position"); ) e = e.parentNode;
                            e && e !== i && 1 === e.nodeType && ((r = jQuery(e).offset()).top += jQuery.css(e, "borderTopWidth", !0), 
                            r.left += jQuery.css(e, "borderLeftWidth", !0));
                        }
                        return {
                            top: t.top - r.top - jQuery.css(i, "marginTop", !0),
                            left: t.left - r.left - jQuery.css(i, "marginLeft", !0)
                        };
                    }
                },
                offsetParent: function() {
                    return this.map((function() {
                        for (var e = this.offsetParent; e && "static" === jQuery.css(e, "position"); ) e = e.offsetParent;
                        return e || O;
                    }));
                }
            }), jQuery.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, (function(e, t) {
                var n = "pageYOffset" === t;
                jQuery.fn[e] = function(i) {
                    return access(this, (function(e, i, r) {
                        var o;
                        if (isWindow(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === r) return o ? o[t] : e[i];
                        o ? o.scrollTo(n ? o.pageXOffset : r, n ? r : o.pageYOffset) : e[i] = r;
                    }), e, i, arguments.length);
                };
            })), jQuery.each([ "top", "left" ], (function(e, t) {
                jQuery.cssHooks[t] = addGetHookIf(m.pixelPosition, (function(e, n) {
                    if (n) return n = curCSS(e, t), Q.test(n) ? jQuery(e).position()[t] + "px" : n;
                }));
            })), jQuery.each({
                Height: "height",
                Width: "width"
            }, (function(e, t) {
                jQuery.each({
                    padding: "inner" + e,
                    content: t,
                    "": "outer" + e
                }, (function(n, i) {
                    jQuery.fn[i] = function(r, o) {
                        var a = arguments.length && (n || "boolean" != typeof r), s = n || (!0 === r || !0 === o ? "margin" : "border");
                        return access(this, (function(t, n, r) {
                            var o;
                            return isWindow(t) ? 0 === i.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, 
                            Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === r ? jQuery.css(t, n, s) : jQuery.style(t, n, r, s);
                        }), t, a ? r : void 0, a);
                    };
                }));
            })), jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], (function(e, t) {
                jQuery.fn[t] = function(e) {
                    return this.on(t, e);
                };
            })), jQuery.fn.extend({
                bind: function(e, t, n) {
                    return this.on(e, null, t, n);
                },
                unbind: function(e, t) {
                    return this.off(e, null, t);
                },
                delegate: function(e, t, n, i) {
                    return this.on(t, e, n, i);
                },
                undelegate: function(e, t, n) {
                    return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
                },
                hover: function(e, t) {
                    return this.mouseenter(e).mouseleave(t || e);
                }
            }), jQuery.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), (function(e, t) {
                jQuery.fn[t] = function(e, n) {
                    return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
                };
            }));
            var ze = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
            jQuery.proxy = function(e, t) {
                var n, i, r;
                if ("string" == typeof t && (n = e[t], t = e, e = n), isFunction(e)) return i = s.call(arguments, 2), 
                r = function() {
                    return e.apply(t || this, i.concat(s.call(arguments)));
                }, r.guid = e.guid = e.guid || jQuery.guid++, r;
            }, jQuery.holdReady = function(e) {
                e ? jQuery.readyWait++ : jQuery.ready(!0);
            }, jQuery.isArray = Array.isArray, jQuery.parseJSON = JSON.parse, jQuery.nodeName = nodeName, 
            jQuery.isFunction = isFunction, jQuery.isWindow = isWindow, jQuery.camelCase = camelCase, 
            jQuery.type = toType, jQuery.now = Date.now, jQuery.isNumeric = function(e) {
                var t = jQuery.type(e);
                return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
            }, jQuery.trim = function(e) {
                return null == e ? "" : (e + "").replace(ze, "$1");
            }, void 0 === (n = function() {
                return jQuery;
            }.apply(t, [])) || (e.exports = n);
            var He = i.jQuery, qe = i.$;
            return jQuery.noConflict = function(e) {
                return i.$ === jQuery && (i.$ = qe), e && i.jQuery === jQuery && (i.jQuery = He), 
                jQuery;
            }, void 0 === r && (i.jQuery = i.$ = jQuery), jQuery;
        }));
    }
} ]);