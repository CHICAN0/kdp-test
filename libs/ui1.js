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