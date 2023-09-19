(globalThis.webpackChunkkindlespy = globalThis.webpackChunkkindlespy || []).push([ [ 576 ], {
    551: (n, o, r) => {
        "use strict";
        r.d(o, {
            f: () => injectStyles
        });
        const injectStyles = (n, o) => {
            o || (o = document.head);
            const r = n.join("\n"), s = document.createElement("style");
            s.append(document.createTextNode(r)), o.append(s);
        };
    },
    304: (n, o, r) => {
        "use strict";
        var s = r(248), a = r(357);
        class AsyncRunner {
            constructor() {
                this.itemsInProgress = 0, this.finished = function() {}, this.itemFinished = function() {}, 
                this.itemStarted = function() {};
            }
            start(n) {
                var o = this;
                o.itemsInProgress++, this.itemStarted(), n((function() {
                    o.itemsInProgress--, o.itemFinished(), 0 == o.itemsInProgress && o.finished();
                }));
            }
        }
        var l = r(889);
        class DataStorage {
            constructor() {
                this.defaultData = {
                    isWaitingForPulling: !1,
                    isPulling: !1,
                    pageNum: {
                        MainTab: "1",
                        KeywordAnalysisTab: "1"
                    },
                    totalResults: "",
                    books: []
                }, this.data = void 0;
            }
            get() {
                return void 0 === this.data && (this.data = JSON.parse(JSON.stringify(this.defaultData))), 
                this.data;
            }
            remove() {
                this.data = void 0;
            }
        }
        var h = r(72), p = r(534);
        class Pager {
            constructor(n, o, r, s) {
                this.itemsInResult = 0, this.itemsPerPage = n, this.lastPage = 1, this.alreadyPulled = 0, 
                this.pagesLoaded = 0, this.isInProgress = !1, this.isStopped = !1, this.pullItemsFunction = o || function(n, o, r) {}, 
                this.pullItemDetailsFunction = r || function(n) {}, this.getPageUrlFunction = s || function(n, o) {}, 
                this.queue = [];
            }
            async loadPageIntoQueue(n, o) {
                if (void 0 === this.alreadyPulled) return;
                if (this.isStopped) return;
                let r = [], s = [];
                if (await a.W.waitAsync(100), this.isStopped) return;
                const l = await this.getPageUrlFunction(n, o);
                if (!l) return;
                const h = await p.$.get(l.trim());
                if (this.isStopped) return;
                let x = this.alreadyPulled;
                s = r;
                let _ = await this.pullItemsFunction(x, h, n);
                r = _.items;
                let y = _.totalResults;
                return y && window.kindleSpy.saveTotalResults(y), void 0 === r || 0 === s.length && 0 === r.length ? void 0 : (this.queue.push(...r.sort(((n, o) => n.no - o.no))), 
                r.length);
            }
            async processQueue(n) {
                let o = 0, r = [];
                for (;o < n; ) {
                    if (0 === this.queue.length) return await Promise.all(r), o;
                    let n = this.queue.shift();
                    if (void 0 !== n.url && n.url.length > 0 && void 0 !== n.price && n.price.length > 0) {
                        let s = this.pullItemDetailsFunction(n, o);
                        s = s.then((() => {})), r.push(s), o += 1;
                    }
                }
                return await Promise.all(r), o;
            }
            async loadResults(n, o = 20, r = !1) {
                let s = 0;
                s += await this.processQueue(o), this.alreadyPulled += s;
                let a = null;
                for (;s < o && (null === a || a === this.itemsPerPage); ) {
                    if (await this.loadPageIntoQueue(n, this.lastPage), this.isStopped) return;
                    if (a = await this.processQueue(o - s), s += a, this.itemsInResult += a, this.pagesLoaded++, 
                    this.lastPage++, this.alreadyPulled += a, r) break;
                }
                this.isInProgress = !1;
            }
            stop() {
                this.isStopped = !0;
            }
        }
        class AuthorPage {
            constructor(n) {
                if (AuthorPage._singletonInstance) return AuthorPage._singletonInstance;
                AuthorPage._singletonInstance = this, this.pageName = AuthorPage.pageName, this.authorPager = void 0, 
                this.kindleSpy = n;
            }
            loadData(n, o, r, s, l, h) {
                h = a.W.valueOrDefault(h, (function() {}));
                let p, x = o.authorResultsNumber, _ = new URL(r), y = _.pathname;
                /\/[^/]+\/(e|author)\/[A-Z0-9]+/.test(y) ? r = `${_.protocol}//${_.hostname}${_.pathname}` : (p = _.pathname.toString().match(/\/([0-9A-Z]+)\/(?:allbooks)?$/), 
                r = `${_.protocol}//${_.hostname}/kindle-dbs/e/${p[1]}`), void 0 !== o.overrideAuthorPageFormat && (r = o.overrideAuthorPageFormat(r));
                const v = y.includes("/stores/");
                void 0 === this.authorPager && (this.authorPager = new Pager(x, (async (r, s, l) => {
                    let h = a.W.parseHtmlToJquery(s);
                    return await this.parseItemsFromPage(n, r, h, s, l, o);
                }), ((n, o) => this.parseItem(n, o)), v ? (n, o) => {
                    if (2 !== o) return n;
                } : a.W.setPage)), this.authorPager.loadResults(r, 20, v).then(h);
            }
            async parseItemsFromPage(n, o, r, s, a, l) {
                let h, p, x = [], _ = [], y = [], v = [], w = [], k = [], S = 0, P = r.find("#mainResults li").has(".s-item-container");
                if (0 === P.length ? r.find('ul[class*="ProductGrid__grid"]').length ? ({counter: S, totalResults: p} = await this.parseNodesFromStoreLayout.call(this, s, l, x, _, y, v, S, k, o)) : S = this.parseRoundDesign.call(this, P, r, l, k, x, o, _, y, S) : S = this.parseNodes.call(this, P, o, 0, undefined, l, x, _, y, v, S, k), 
                0 === S) return {
                    items: [],
                    totalResults: 0
                };
                h = r.find("#entityHeader").text().trim();
                var A = h.split("by");
                let T = r.find("#ap-author-name").text().trim();
                T && T.toString().trim().length || (T = r.find('#authorName span, div[class*="AuthorSubHeader__author-subheader__name"]').text().trim()), 
                h = A.length > 1 ? A[1] : T;
                let R = [];
                for (let o = 0; o < _.length; o++) R.push({
                    no: x[o],
                    url: _[o],
                    price: y[o],
                    review: v[o],
                    types: w[o],
                    pullingToken: n,
                    parentUrl: a,
                    category: h,
                    type: "Author",
                    additionalData: {
                        bookTypes: k[o] ? k[o].types : [],
                        prices: k[o] ? k[o].prices : {},
                        urls: k[o] ? k[o].urls : {}
                    }
                });
                return {
                    items: R,
                    totalResults: p
                };
            }
            parseItem(n, o) {
                return new Promise((r => {
                    let {no: s, url: a, price: l, review: h, types: p, type: x, pullingToken: _, category: y, parentUrl: v, additionalData: w} = n;
                    const k = this;
                    void 0 !== a && a.length > 0 && void 0 !== l && l.length > 0 && this.kindleSpy.parserAsyncRunner.start((function(n) {
                        const wrappedCallback = o => {
                            n(o), r(o);
                        };
                        setTimeout((function() {
                            k.kindleSpy.parseDataFromBookPageAndSend({
                                pullingToken: _,
                                num: s,
                                url: a,
                                price: l,
                                parentUrl: v,
                                nextUrl: "",
                                reviews: h,
                                category: y,
                                categoryKind: x,
                                callback: wrappedCallback,
                                bookType: p,
                                additionalData: w
                            });
                        }), o * k.kindleSpy.requestDelay);
                    }));
                }));
            }
            getTypesFromItem(n, o) {
                let r = n.find(".a-span7 .a-row").length > 0 ? n.find(".a-span7 .a-row") : n.find(".a-fixed-right-grid-col.a-col-left").find(".a-section"), s = [ "Kindle", ...Object.keys(o.getAllBookTypes()) ], l = o.getAllBookTypes();
                l.Kindle = "Kindle";
                let h = s.map((n => `a:contains(${n})`)), x = new RegExp(s.join("|")), _ = new Set, y = {}, v = {};
                for (const n of r) {
                    let r = (0, p.$)(n), s = r.text(), w = h.some((n => r.find(n).length > 0));
                    const k = s.match(x);
                    if (k && w) {
                        let n, s = k[0], h = (0, p.$)(r.next());
                        if (h.find(".a-price").length > 0 ? n = h.find(".a-price").find(".a-offscreen").text().trim().replace(/[^0-9,.]/gi, "") : h.find(".s-price").length > 0 ? (n = h.find(".s-price").text().trim().replace(/[^0-9,.]/gi, ""), 
                        0 === a.W.parseInt(n, o.decimalSeparator) && h.find(".s-icon-kindle-unlimited").length > 0 && (n = h.next().next().find(".s-price").text().trim().replace(/[^0-9,.]/gi, ""))) : h.find(".a-color-price").length > 0 && (n = h.find(".a-color-price").text().trim().replace(/[^0-9,.]/gi, "")), 
                        s.includes("Kindle") && (s = "Kindle"), s && s in l) {
                            let h = l[s];
                            _.add(h), y[a.W.toMachineName(h)] = n;
                            let p = r.find("a").attr("href");
                            v[a.W.toMachineName(h)] = p.startsWith("https") ? p : `https:${o.mainUrl}${p}`;
                        }
                    }
                }
                return {
                    types: [ ..._ ],
                    urls: v,
                    prices: y
                };
            }
            parseRoundDesign(n, o, r, s, l, h, x, _, y) {
                n = o.find("#searchWidget .a-fixed-left-grid").toArray();
                for (const [o, v] of n.entries()) {
                    let n, w = (0, p.$)(v), {types: k, urls: S, prices: P} = this.getTypesFromItem(w, r);
                    s[o] = {
                        types: k,
                        urls: S,
                        prices: P
                    }, l[o] = h + o + 1, n = w.find('a:contains("' + r.searchPattern + '")').attr("href"), 
                    x[o] = n ? a.W.getUrlWORedirect(n) : a.W.getUrlWORedirect(w.find(".a-col-left").last().find(".a-section:first-child").first().find(".a-link-normal").attr("href"));
                    let A = w.find(':contains("' + r.searchPattern + '")').parent(".a-section").next().find(".a-offscreen").text();
                    _[o] = r.currencySign + "0" + r.decimalSeparator + "00", A.length > 0 && (_[o] = A), 
                    x[o] = x[o].replace("&amp;", "&").replace(" ", "%20"), y++;
                }
                return y;
            }
            parseNodes(n, o, r, s, l, h, x, _, y, v, w) {
                for (const S of n) {
                    const n = (0, p.$)(S);
                    if (n.attr("id") !== "result_" + (o + r) && "centerPlus" !== n.attr("id")) continue;
                    let {types: P, urls: A, prices: T} = this.getTypesFromItem(n, l);
                    s = n.find(".s-item-container"), w[r] = {
                        types: P,
                        urls: A,
                        prices: T
                    }, h[r] = o + r + 1, x[r] = a.W.getUrlWORedirect((0, p.$)(s).find("h2").parent().attr("href")), 
                    x[r] = a.W.getUrlWORedirect((0, p.$)(s).find("h2").parent().attr("href"));
                    var k = (0, p.$)(s).find("div").filter((function() {
                        return (0, p.$)(this).text() == l.searchPattern || (0, p.$)(this).children("a:contains(" + l.searchPattern + ")").length > 0;
                    }));
                    _[r] = l.currencySign + "0" + l.decimalSeparator + "00", (0, p.$)(k).length > 0 && ((0, 
                    p.$)(k).next().find(".sx-price").length > 0 ? _[r] = (0, p.$)(k).next().find(".sx-price-whole").html() + l.decimalSeparator + (0, 
                    p.$)(k).next().find(".sx-price-fractional").html() : (0, p.$)(k).next().next().next().find(".sx-price-whole").length > 0 && (_[r] = (0, 
                    p.$)(k).next().next().next().find(".sx-price-whole").html() + l.decimalSeparator + (0, 
                    p.$)(k).next().next().next().find(".sx-price-fractional").html())), y[r] = void 0, 
                    x[r] = x[r].replace("&amp;", "&"), x[r] = x[r].replace(" ", "%20"), r++, v++;
                }
                return v;
            }
            async parseNodesFromStoreLayout(n, o, r, s, l, h, p, x, _) {
                const y = n.match(/config = ({.+\"products\":.+});/im), v = JSON.parse(y[1]);
                let w = v.content.products, k = v.content.totalCount || v.content.totalResultCount, S = 0;
                const P = v.content.ASINList || [];
                let A = w.map((n => n.asin)), T = P.filter((n => !A.includes(n)));
                for (;S <= 8 && 0 !== T.length; ) {
                    const n = JSON.stringify({
                        requestContext: {
                            ...v.requestContext,
                            queryParameterMap: {}
                        },
                        widgetType: "ProductGrid",
                        sectionType: "AuthorAllBooksProductGrid",
                        productGridType: "ma",
                        isManualGrid: !0,
                        content: {
                            includeOutOfStock: !0
                        },
                        includeOutOfStock: !0,
                        endpoint: "ajax-data",
                        ASINList: T
                    });
                    let r = `${o.mainUrl}/juvec`;
                    r.startsWith("https://") || (r = "https:" + r);
                    const s = await fetch(r, {
                        method: "POST",
                        body: n,
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json;text/plain"
                        }
                    }), l = await s.json();
                    w = [ ...w, ...l.products ], A = w.map((n => n.asin)), T = (v.content.ASINList || []).filter((n => !A.includes(n))), 
                    S++, await a.W.waitAsync(250);
                }
                const R = {};
                for (let n of w) "kindle_edition" === n.bindingInformation.binding.symbol && (R[n.asin] || (R[n.asin] = [ n ]));
                for (let n of w) {
                    if ("kindle_edition" === n.bindingInformation.binding.symbol) continue;
                    if (!n.mediaMatrix) continue;
                    const o = n.mediaMatrix.items.find((n => "kindle_edition" === n.binding.symbol));
                    if (o) {
                        const r = o.product.match(/products\/([A-Z0-9]{10,13})/);
                        r && Object.keys(R).includes(r[1]) ? R[r[1]].push(n) : R[n.asin] = [ n ];
                    } else R[n.asin] = [ n ];
                }
                const O = o.getAllBookTypes();
                let C = 0;
                for (let n of P) {
                    const h = R[n];
                    if (!h) continue;
                    let y = [], v = {}, w = {};
                    h.forEach((n => {
                        let r = n.bindingInformation.binding.displayString;
                        r = r.toLowerCase().includes("kindle") ? "Kindle" : O[r], r && (y.push(r), v[a.W.toMachineName(r)] = n.buyingOptions && n.buyingOptions[0] && n.buyingOptions[0].price && n.buyingOptions[0].price.priceToPay ? n.buyingOptions[0].price.priceToPay.moneyValueOrRange.value.displayString : n.marketplaceOfferSummary?.newOfferSummary?.minPrice?.displayString ? n.marketplaceOfferSummary.newOfferSummary.minPrice.displayString : o.currencySign + "0" + o.decimalSeparator + "00", 
                        w[a.W.toMachineName(r)] = "https:" + o.mainUrl + n.links.viewOnAmazon.url);
                    })), x[C] = {
                        types: y,
                        urls: w,
                        prices: v
                    }, r[C] = _ + C + 1;
                    const k = h[0];
                    s[C] = "https:" + o.mainUrl + k.links.viewOnAmazon.url, l[C] = k.buyingOptions && k.buyingOptions[0].price && k.buyingOptions[0].price.priceToPay ? k.buyingOptions[0].price.priceToPay.moneyValueOrRange.value.displayString : k.marketplaceOfferSummary?.newOfferSummary?.minPrice?.displayString ? k.marketplaceOfferSummary.newOfferSummary.minPrice.displayString : o.currencySign + "0" + o.decimalSeparator + "00", 
                    p++, C++;
                }
                return {
                    counter: p,
                    totalResults: k
                };
            }
        }
        AuthorPage.pageName = "author";
        var x = r(985);
        class SearchPageParser {
            constructor(n) {
                this.kindleSpy = n;
            }
            parseBook(n, o, r, s, a, h, p, _, y, v) {
                var w = new x.D(null, this.kindleSpy.siteParser);
                return w.isNotValid() ? Promise.reject({}) : new Promise((function(n) {
                    setTimeout((function() {
                        w.getBookData(r, s, p, (function(s) {
                            let {prices: p, currentSalesRanks: x, formattedPrices: v, estSales: w, estSalesRecv: k, pages: S} = l.N.splitRankData(s.allRanks);
                            n({
                                No: o,
                                Prices: p,
                                EstSalesAll: w,
                                EstSalesRecvAll: k,
                                CurrentSalesRanks: x,
                                FormattedPrices: v,
                                Url: r,
                                ParentURL: a,
                                NextUrl: h,
                                Title: s.title,
                                Type: s.type,
                                Description: s.description,
                                BookTypes: s.bookTypes,
                                Price: s.price,
                                FormattedPrice: s.formattedPrice,
                                EstSales: s.estSale,
                                SalesRecv: s.salesRecv,
                                Reviews: s.reviews,
                                Asin: s.asin,
                                Isbn10: s.isbn10,
                                SalesRank: s.salesRank,
                                Category: _,
                                CategoryKind: y,
                                PrintLength: s.printLength,
                                AllPages: S,
                                Author: s.author,
                                DateOfPublication: s.dateOfPublication,
                                GoogleSearchUrl: s.googleSearchUrl,
                                GoogleImageSearchUrl: s.googleImageSearchUrl,
                                Rating: s.rating
                            });
                        }));
                    }), v);
                }));
            }
            parsePageAsync(n, o, r, s, l, h, p) {
                const x = this;
                let {no: _, url: y, price: v, review: w, counter: k, types: S} = parser.call(this, r, o, h);
                if (0 === k) return Promise.resolve([]);
                var P = a.W.parseInt(h.getTotalSearchResult(r), h.decimalSeparator), A = [];
                return y.forEach((function(r, a) {
                    void 0 !== y[a] && y[a].length > 0 && void 0 !== v[a] && v[a].length > 0 && A.push(x.parseBook(n, _[a], y[a], v[a], s, "", w[a], l, p, (a - o) * x.kindleSpy.requestDelay, S[a]));
                })), Promise.all(A).then((function(n) {
                    return {
                        books: n,
                        total: P
                    };
                }));
            }
            parseItemsFromPage(n, o, r, s, l, h, p) {
                let {no: x, url: _, price: y, review: v, counter: w, types: k} = parser.call(this, r, o, h);
                if (0 === w) return {
                    items: [],
                    totalResults: 0
                };
                let S = a.W.parseInt(h.getTotalSearchResult(r), h.decimalSeparator), P = [];
                for (let o = 0; o < _.length; o++) P.push({
                    no: x[o],
                    url: _[o],
                    price: y[o],
                    review: v[o],
                    types: k[o],
                    pullingToken: n,
                    parentUrl: s,
                    category: l,
                    type: p
                });
                return {
                    items: P,
                    totalResults: S
                };
            }
            parseItem(n, o) {
                return new Promise((r => {
                    let {no: s, url: a, price: l, review: h, types: p, type: x, pullingToken: _, category: y, parentUrl: v} = n;
                    const w = this;
                    void 0 !== a && a.length > 0 && void 0 !== l && l.length > 0 && w.kindleSpy.parserAsyncRunner.start((function(n) {
                        const wrappedCallback = o => {
                            n(o), r(o);
                        };
                        setTimeout((function() {
                            w.kindleSpy.parseDataFromBookPageAndSend({
                                pullingToken: _,
                                num: s,
                                url: a,
                                price: l,
                                parentUrl: v,
                                nextUrl: "",
                                reviews: h,
                                category: y,
                                categoryKind: x,
                                callback: wrappedCallback,
                                bookType: p
                            });
                        }), o * w.kindleSpy.requestDelay);
                    }));
                }));
            }
        }
        function parser(n, o, r) {
            let s, l = [], h = [], x = [], _ = [], y = [], v = 0, w = n.find("#atfResults li").not(".AdHolder").has(".a-fixed-left-grid-inner");
            return w = p.$.merge(w, n.find("#btfResults li").not(".AdHolder").has(".s-item-container")), 
            w = p.$.merge(w, n.find('div[data-asin]:not([data-asin=""])').not(".AdHolder").has(".sg-col-inner")), 
            w.each((function() {
                let n = (0, p.$)(this);
                if (0 !== n.parents('.s-shopping-adviser-heading, span[data-component-type="s-searchgrid-carousel"]').length) return;
                const w = n.attr("id") || "result_" + n.attr("data-index");
                if (!w.startsWith("result_") && "centerPlus" !== w) return;
                const k = a.W.getBookType(r, n.html());
                if (a.W.isBookTypeSupported(r, k)) {
                    var S = w.split("_")[1];
                    s = n.find(".a-fixed-left-grid-inner"), l[S] = parseInt(o) + v + 1, y[S] = k;
                    var P = n.find(".a-column.a-span7 a").has("h3");
                    if ((P = p.$.merge(P, n.find("a.a-size-base.a-link-normal.a-text-bold"))).length > 0) P.each((function() {
                        var n = (0, p.$)(this).attr("href");
                        if (n = n.replace("&amp;", "&").replace(" ", "%20"), n = a.W.getUrlWORedirect(n), 
                        (0, p.$)(this).text().trim() in r.getBookTypes()) return h[S] = n, x[S] = (0, p.$)(this).parents("div.a-section").eq(0).find(`.a-price > .a-offscreen, span.a-color-base:contains(${r.currencySign})`).eq(0).text().trim(), 
                        !1;
                        n && !h[S] && (h[S] = n, x[S] = (0, p.$)(this).parents("div.a-section").eq(0).find(`.a-price > .a-offscreen, span.a-color-base:contains(${r.currencySign})`).eq(0).text().trim());
                    })); else if (h[S] = a.W.getUrlWORedirect((0, p.$)(s).find('a:contains("' + r.searchPattern + '")').attr("href")), 
                    !h[S]) return void S++;
                    if (!x[S]) {
                        var A, T = (0, p.$)(s).find("div").filter((function() {
                            return (0, p.$)(this).text() == r.searchPattern || (0, p.$)(this).children("a:contains(" + r.searchPattern + ")").length > 0;
                        }));
                        if (x[S] = r.currencySign + "0" + r.decimalSeparator + "00", (0, p.$)(T).length > 0) {
                            var R = T.next().find("span.s-price");
                            R.length > 0 && -1 !== R.text().indexOf("0" + r.decimalSeparator + "00") && (R = T.parent().find("span.s-price"));
                        }
                        void 0 !== R && (A = R.parent().parent().has("span.s-icon-kindle-unlimited").length > 0 || R.parent().has("span:contains('" + r.searchKeys[1] + "')").length > 0 ? p.$.grep(R, (function(n) {
                            return (0, p.$)(n).parent().has("span:contains('" + r.searchKeys[0] + "')").length > 0;
                        })) : R.parent().parent().parent().has("h3:contains('Audible Audio Edition')").length > 0 || (0, 
                        p.$)(R).length > 1 ? (0, p.$)(R[0]) : T.find("span.s-price").length > 0 ? T.find("span.s-price") : R).length > 0 && (x[S] = (0, 
                        p.$)(A).text().trim());
                    }
                    _[S] = void 0, v++;
                }
            })), {
                no: l,
                url: h,
                price: x,
                review: _,
                counter: v,
                types: y
            };
        }
        class AuthorSearchResultsPage {
            constructor(n) {
                if (AuthorSearchResultsPage._singletonInstance) return AuthorSearchResultsPage._singletonInstance;
                AuthorSearchResultsPage._singletonInstance = this, this.kindleSpy = n, this.pageName = AuthorSearchResultsPage.pageName, 
                this.authorSearchResultsPager = void 0;
            }
            loadData(n, o, r, s, l, h) {
                h = a.W.valueOrDefault(h, (function() {}));
                var p = this, x = o.authorResultsNumber;
                void 0 === p.authorSearchResultsPager && (p.authorSearchResultsPager = new Pager(x, ((r, s, l) => {
                    var h = a.W.parseHtmlToJquery(s), x = h.find("#s-result-count > span > span").text().trim().replace(/"/g, "");
                    return new SearchPageParser(p.kindleSpy).parseItemsFromPage(n, r, h, l, x, o, "Author");
                }), ((n, o) => new SearchPageParser(p.kindleSpy).parseItem(n, o)), a.W.setPage)), 
                setTimeout((() => {
                    this.authorSearchResultsPager.loadResults(r, 20).then(h);
                }), this.kindleSpy.requestDelay);
            }
        }
        AuthorSearchResultsPage.pageName = "author-search";
        class BestSellersPage {
            constructor(n, o) {
                if (!o) {
                    if (BestSellersPage._bestSellersSingletonInstance) return BestSellersPage._bestSellersSingletonInstance;
                    BestSellersPage._bestSellersSingletonInstance = this;
                }
                this.kindleSpy = n, this.pageName = BestSellersPage.pageName, this.bestSellerResultsPager = void 0, 
                this.categoryKind = "Seller";
            }
            loadData(n, o, r, s, l, h) {
                h = a.W.valueOrDefault(h, (function() {}));
                let p = o.bestSellerResultsNumber, x = Promise.resolve();
                void 0 === this.bestSellerResultsPager && (this.bestSellerResultsPager = new Pager(p, (async (r, s, a) => await this.parseItemsFromPage(n, o, s, a)), (async (n, o) => await this.parseItem(n, o)), (async (n, o) => {
                    let r = a.W.setPage(n, o, "pg");
                    return a.W.isTop100Free() && (r = new URL(r), r.searchParams.set("tf", "1"), r = r.toString()), 
                    r;
                })), x = this.bestSellerResultsPager.loadPageIntoQueue(r, 1).then((() => this.bestSellerResultsPager.loadPageIntoQueue(r, 2)))), 
                x.then((() => this.bestSellerResultsPager.loadResults(r, 20))).then((() => h()));
            }
            async parseItemsFromPage(n, o, r, s) {
                let l, h = a.W.parseHtmlToJquery(r), p = r;
                l = this.getCategoryInfo(p).trim();
                const x = h.find("[data-acp-params][data-acp-path]");
                if (x.length) {
                    const r = x.attr("data-acp-params"), p = x.attr("data-acp-path"), _ = window.location.origin + p + "nextPage", y = Array(50).fill().map(((n, o) => o)), v = JSON.parse(h.find("[data-client-recs-list]").attr("data-client-recs-list")), _makeAcpRequest = async n => {
                        const o = n, s = o + 25;
                        return (await fetch(_, {
                            method: "POST",
                            headers: {
                                "x-amz-acp-params": r,
                                "x-requested-with": "XMLHttpRequest",
                                "content-type": "application/json"
                            },
                            body: JSON.stringify({
                                faceoutkataname: "GeneralFaceout",
                                ids: v.slice(o, s).map((n => JSON.stringify(n))),
                                indexes: y.slice(o, s),
                                offset: "25"
                            })
                        })).text();
                    }, [w, k] = await Promise.all([ _makeAcpRequest(0), _makeAcpRequest(25) ]), S = a.W.parseHtmlToJquery(`<div>${w}${k}</div>`);
                    return this._parseItemsFromResponse(S, s, l, o, n);
                }
                return this._parseItemsFromResponse(h, s, l, o, n);
            }
            _parseItemsFromResponse(n, o, r, s, l) {
                let h = [];
                return n.find(".zg_itemImmersion, .zg-item-immersion, .zg_itemRow, #gridItemRoot").each(((n, x) => {
                    let _ = (0, p.$)(x), y = _.html();
                    const v = a.W.getBookType(s, y);
                    a.W.isBookTypeSupported(s, v) && h.push({
                        no: this.getNoInfo(y, s),
                        url: a.W.getUrlWORedirect(this.getPageUrl(y)),
                        price: this.getPriceInfo(_),
                        review: this.getReviewInfo(y),
                        types: v,
                        pullingToken: l,
                        parentUrl: o,
                        category: r,
                        type: this.categoryKind
                    });
                })), {
                    items: h,
                    totalResults: 100
                };
            }
            parseItem(n, o) {
                return new Promise((r => {
                    const s = this;
                    let {no: a, url: l, price: h, review: p, types: x, type: _, pullingToken: y, category: v, parentUrl: w} = n;
                    void 0 !== l && l.length > 0 && void 0 !== h && h.length > 0 && s.kindleSpy.parserAsyncRunner.start((function(n) {
                        const wrappedCallback = o => {
                            n(o), r(o);
                        };
                        setTimeout((function() {
                            s.kindleSpy.parseDataFromBookPageAndSend({
                                pullingToken: y,
                                num: a,
                                url: l,
                                price: h,
                                parentUrl: w,
                                nextUrl: "",
                                reviews: p,
                                category: v,
                                categoryKind: _,
                                callback: wrappedCallback,
                                bookType: x
                            });
                        }), o * s.kindleSpy.requestDelay);
                    }));
                }));
            }
            getCategoryInfo(n) {
                let o = a.W.parseString(n, 'class="category"', ">", "<");
                if (o) return o;
                const r = a.W.parseString(n, 'class="_p13n-zg-nav-tree-all_style_zg-selected__1SfhQ"', ">", "<");
                let s = a.W.parseHtmlToJquery(n).find("div[data-acp-tracking] h1").text().trim();
                return s ? (s = s.replace(/Best Sellers in /i, "").replace(/Bestseller in /i, "").replace(/Les meilleures ventes en /i, "").replace(/\u306e \u58f2\u308c\u7b4b\u30e9\u30f3\u30ad\u30f3\u30b0/i, "").replace(/Mais Vendidos em /i, "").replace(/Los m\xe1s vendidos en /i, ""), 
                s) : r;
            }
            getNoInfo(n, o) {
                var r = a.W.parseString(n, 'class="zg-badge-text"', ">#", "<");
                return "" !== r || "" !== (r = a.W.parseString(n, 'class="zg_rankNumber"', ">", ".")) ? r : a.W.parseString(n, 'class="zg-bdg-text"', ">#", "<");
            }
            getPriceInfo(n) {
                let o = n.find(".p13n-sc-price").text().trim();
                return o || (o = n.find(".a-color-price").text().trim()), o;
            }
            getPageUrl(n) {
                var o = a.W.parseString(n, 'class="zg_title"', 'href="', '"');
                if (o) return o;
                if (o = a.W.parseString(n, 'class="a-link-normal"', 'href="', '"')) return window.location.origin + o;
                const r = (0, p.$)(p.$.parseHTML(n)).find('[class*="sc-uncoverable-faceout"][id]').attr("id");
                return r ? `${window.location.origin}/dp/${r}/` : void 0;
            }
            getReviewInfo(n) {
                for (var o = "href", r = n, s = r.indexOf(o), l = ""; s >= 0; ) {
                    if (r = r.substr(s + o.length), void 0 !== (l = a.W.parseString(r, "product-reviews", ">", "<")) && l.length > 0) return l;
                    s = r.indexOf(o);
                }
                return null;
            }
        }
        BestSellersPage.pageName = "best-seller";
        class NewReleasesPage extends BestSellersPage {
            constructor(n) {
                if (super(n, !0), NewReleasesPage._newReleasesSingletonInstance) return NewReleasesPage._newReleasesSingletonInstance;
                NewReleasesPage._newReleasesSingletonInstance = this, this.pageName = NewReleasesPage.pageName, 
                this.categoryKind = "New-Releases";
            }
        }
        NewReleasesPage.pageName = "new-releases";
        class SearchResultsPage {
            constructor(n) {
                if (SearchResultsPage._singletonInstance) return SearchResultsPage._singletonInstance;
                SearchResultsPage._singletonInstance = this, this.kindleSpy = n, this.pageName = SearchResultsPage.pageName, 
                this.searchResultsPager = void 0, this.searchKeyword = void 0;
            }
            loadData(n, o, r, s, l, h) {
                h = a.W.valueOrDefault(h, (function() {}));
                let p, x = new URL(r), _ = x.searchParams.get("k");
                p = x.searchParams.get("i") ? x.searchParams.get("i") : r.match(/search-alias%3D([\w-]+)/i) ? r.match(/search-alias%3D([\w-]+)/i)[1] : r.includes("digital-text") ? "digital-text" : r.includes("audible") ? "audible" : "stripbooks", 
                (r.includes("/s?i=") || r.includes("/s?crid=")) && (r = `${x.origin}/s?k=${encodeURIComponent(_)}&i=${p}`), 
                r.includes("i=") || (r += `&i=${p}`);
                var y = o.searchResultsNumber;
                this.searchKeyword = s, void 0 === this.searchResultsPager && (this.searchResultsPager = new Pager(y, ((r, l, h) => {
                    var p = a.W.parseHtmlToJquery(l);
                    return new SearchPageParser(this.kindleSpy).parseItemsFromPage(n, r, p, h, s, o, "Search");
                }), ((n, o) => new SearchPageParser(this.kindleSpy).parseItem(n, o)), a.W.setPage)), 
                this.searchResultsPager.loadResults(r, 20).then((() => h()));
            }
        }
        SearchResultsPage.pageName = "search";
        class SingleBookPage {
            constructor() {
                if (SingleBookPage._singletonInstance) return SingleBookPage._singletonInstance;
                SingleBookPage._singletonInstance = this, this.pageName = SingleBookPage.pageName;
            }
            loadData(n, o, r, s, l, h) {
                return (h = a.W.valueOrDefault(h, (function() {})))();
            }
        }
        SingleBookPage.pageName = "single";
        var _ = r(436);
        class SeriesPage {
            constructor(n) {
                if (SeriesPage._singletonInstance) return SeriesPage._singletonInstance;
                SeriesPage._singletonInstance = this, this.pageName = SeriesPage.pageName, this.pager = void 0, 
                this.kindleSpy = n;
            }
            loadData(n, o, r, s, l, h) {
                h = a.W.valueOrDefault(h, (function() {}));
                void 0 === this.pager && (this.pager = new Pager(20, (async (r, s, l) => {
                    let h = a.W.parseHtmlToJquery(s);
                    return await this.parseItemsFromPage(n, r, h, s, l, o);
                }), ((n, o) => this.parseItem(n, o)), ((n, o) => {
                    if (2 !== o) return n;
                }))), this.pager.loadResults(r, 20, !0).then(h);
            }
            async parseItemsFromPage(n, o, r, s, l, h) {
                let x = [];
                const _ = r.find(".series-childAsin-item"), y = _.length, v = r.find("#collection-title").text();
                return _.each(((o, r) => {
                    const s = (0, p.$)(r), _ = s.find(".itemBookTitle").attr("href"), y = s.find(`.series-childAsin-item .a-text-strike:contains(${h.currencySign})`), w = s.find(`.series-childAsin-item .a-size-large:contains(${h.currencySign})`), k = s.find('.series-childAsin-item i[class*="a-star-small"] + span').text().replace(/[\(\)]/gim, "");
                    let {types: S, urls: P, prices: A} = this.getTypesFromItem(s, h);
                    x.push({
                        no: o + 1,
                        url: a.W.getUrlWORedirect(_),
                        price: (y.length ? y.text() : w.text()) || "$0.00",
                        review: k,
                        types: a.W.getBookType(h, r.innerHTML),
                        pullingToken: n,
                        parentUrl: l,
                        category: v.trim(),
                        type: "Series",
                        additionalData: {
                            bookTypes: S,
                            prices: A,
                            urls: P
                        }
                    });
                })), {
                    items: x,
                    totalResults: y
                };
            }
            parseItem(n, o) {
                return new Promise((r => {
                    let {no: s, url: a, price: l, review: h, types: p, type: x, pullingToken: _, category: y, parentUrl: v, additionalData: w} = n;
                    const k = this;
                    void 0 !== a && a.length > 0 && void 0 !== l && l.length > 0 && this.kindleSpy.parserAsyncRunner.start((function(n) {
                        const wrappedCallback = o => {
                            n(o), r(o);
                        };
                        setTimeout((function() {
                            k.kindleSpy.parseDataFromBookPageAndSend({
                                pullingToken: _,
                                num: s,
                                url: a,
                                price: l,
                                parentUrl: v,
                                nextUrl: "",
                                reviews: h,
                                category: y,
                                categoryKind: x,
                                callback: wrappedCallback,
                                bookType: p,
                                additionalData: w
                            });
                        }), o * k.kindleSpy.requestDelay);
                    }));
                }));
            }
            getTypesFromItem(n, o) {
                const r = n.find(".formatTwister, #formatTwisterList ~ a"), s = [ "Kindle", ...Object.keys(o.getAllBookTypes()) ], l = o.getAllBookTypes();
                l.Kindle = "Kindle";
                const h = s.map((n => `a:contains(${n})`)), x = new RegExp(s.join("|")), _ = new Set, y = {}, v = {};
                return r.each(((n, r) => {
                    const s = (0, p.$)(r), w = s.text();
                    let k = h.some((n => s.find(n).length > 0 || s.is(n)));
                    const S = w.match(x);
                    if (S && k) {
                        let n = S[0], r = s.find(".a-text-bold").text().replace(/[^0-9,.]/gi, "") || "0.00";
                        if (n.includes("Kindle") && (n = "Kindle"), n && n in l) {
                            let h = l[n];
                            _.add(h), y[a.W.toMachineName(h)] = r;
                            let p = s.is("a") ? s.attr("href") : s.find("a").attr("href");
                            v[a.W.toMachineName(h)] = p.startsWith("https") ? p : `https:${o.mainUrl}${p}`;
                        }
                    }
                })), {
                    types: [ ..._ ],
                    urls: v,
                    prices: y
                };
            }
        }
        SeriesPage.pageName = "series";
        var y = new class {
            constructor() {
                var n = this;
                n.pageData = new DataStorage, n.url = "", n.parentUrl = "", n.siteParser = void 0, 
                n.kdspyResultsNumber = 20, n.pullingToken = 0, n.currentPage = void 0, n.pagesPulled = 0, 
                n.login = "", n.password = "", n.requestDelay = 700, n.activePullingCount = 0, n.storage = new l.N, 
                n.parserAsyncRunner = new AsyncRunner, n.parserAsyncRunner.itemStarted = function() {
                    n.pageData.get().isPulling = !0;
                }, n.parserAsyncRunner.itemFinished = function() {
                    n.pageData.get().isWaitingForPulling = !1;
                }, n.parserAsyncRunner.finished = function() {
                    n.pageData.get().isPulling = !1;
                };
            }
            start() {
                var n = this;
                n.url = window.location.href, n.parentUrl = a.W.trimCurrentUrl(n.url), n.siteParser = a.W.getSiteParser(n.url), 
                void 0 !== n.siteParser && (n.url.indexOf(this.siteParser.mainUrl + "/Best-Sellers-Kindle-Store/zgbs/digital-text/ref=zg_bs_nav_0") >= 0 || (n.currentPage = this.getPageFromCurrentPage(), 
                n.booksType = this.getBookTypeFromCurrentPage(), void 0 !== n.currentPage && ((0, 
                p.$)("#nav-searchbar, .nav-searchbar").submit((function() {
                    n.clearSearchResults(), setTimeout((function() {
                        y.waitingForSearchResults();
                    }), 500);
                })), (0, p.$)(document).on("click", ".s-suggestion", (o => {
                    n.clearSearchResults(), setTimeout((function() {
                        y.waitingForSearchResults();
                    }), 500);
                })), n.pullingToken = (new Date).getTime(), n.startPulling(1))));
            }
            saveBook(n) {
                for (var o = this.pageData.get(), r = 0; r < o.books.length; r++) {
                    let s = o.books[r];
                    if (s.Title === n.Title && s.CategoryKind === n.CategoryKind && s.Type === n.Type && s.Asin === n.Asin) return void (o.books[r] = n);
                }
                o.books.push(n);
            }
            saveTotalResults(n) {
                this.pageData.get().totalResults = n;
            }
            getPageFromCurrentPage() {
                return a.W.isAuthorPage(document.documentElement.innerHTML, this.siteParser) ? new AuthorPage(this) : a.W.isAuthorSearchResultPage(window.location.href, this.siteParser) ? new AuthorSearchResultsPage(this) : a.W.isBestSellersPage(window.location.href, this.siteParser) ? new BestSellersPage(this) : a.W.isSeriesPage(document.documentElement.innerHTML, this.siteParser) ? new SeriesPage(this) : a.W.isNewReleasesPage(window.location.href, this.siteParser) ? new NewReleasesPage(this) : a.W.isSearchPage(window.location.href, this.siteParser) ? new SearchResultsPage(this) : a.W.isSingleBookPage(window.location.href, this.siteParser) ? new SingleBookPage : void 0;
            }
            getBookTypeFromCurrentPage() {
                return a.W.isAuthorPage(document.documentElement.innerHTML, this.siteParser) || a.W.isAuthorSearchResultPage(window.location.href, this.siteParser) || a.W.isSeriesPage(document.documentElement.innerHTML, this.siteParser) ? "all" : a.W.isBestSellersPage(window.location.href, this.siteParser) ? a.W.getBestSellerPageType(window.location.href, this.siteParser) : a.W.isNewReleasesPage(window.location.href, this.siteParser) ? window.location.href.includes("digital-text") ? "kindle" : window.location.href.includes("i=audible") ? "audiobook" : "book" : a.W.isSearchPage(window.location.href, this.siteParser) ? window.location.href.includes("i=digital-text") ? "kindle" : window.location.href.includes("i=audible") ? "audiobook" : "book" : a.W.isSingleBookPage(window.location.href, this.siteParser) ? "all" : void 0;
            }
            clearSearchResults() {
                this.pullingToken = 0, this.pageData.remove();
                var n = new SearchResultsPage(this);
                n.searchResultsPager && n.searchResultsPager.stop(), n.searchResultsPager = void 0, 
                this.pagesPulled = 0;
            }
            waitingForSearchResults() {
                var n = a.W.getParameterByName(window.location.href, "k");
                if ("" === n.trim() || (0, p.$)("#search .s-breadcrumb .sg-col-inner .a-text-bold").text() !== '"' + n + '"' || "visible" != (0, 
                p.$)("#search .s-breadcrumb .sg-col-inner .a-text-bold").css("visibility")) return setTimeout((function() {
                    y.waitingForSearchResults();
                }), 500);
                this.startPullingSearchPage(window.location.href);
            }
            parseDataFromBookPageAndSend(n) {
                let {pullingToken: o, num: r, url: s, price: h, parentUrl: p, nextUrl: _, reviews: y, category: v, categoryKind: w, bookType: k, callback: S, additionalData: P = {}} = n;
                S = a.W.valueOrDefault(S, (function() {}));
                var A = this;
                if (o != A.pullingToken) return;
                var T = new x.D(null, A.siteParser);
                if (T.isNotValid()) return S();
                let R = s;
                if (!s.startsWith("https://")) {
                    let n = new URL(window.location.href);
                    R = n.protocol + "//" + n.host + s;
                }
                T.getBookData(R, h, y, (function(n) {
                    if (o != A.pullingToken) return;
                    if (null === n) return S();
                    let {prices: s, currentSalesRanks: a, formattedPrices: h, estSales: x, estSalesRecv: y, pages: T, asin: O, isbn10: C} = l.N.splitRankData(n.allRanks);
                    return P.bookTypes = [ ...new Set([ ...P.bookTypes || [], ...n.bookTypes ]) ], A.saveBook({
                        No: r,
                        Url: R,
                        Prices: s,
                        EstSalesAll: x,
                        EstSalesRecvAll: y,
                        CurrentSalesRanks: a,
                        FormattedPrices: h,
                        ParentURL: p,
                        NextUrl: _,
                        Title: n.title,
                        Type: k,
                        BookTypes: n.bookTypes,
                        Description: n.description,
                        Price: n.price,
                        FormattedPrice: n.formattedPrice,
                        EstSales: n.estSale,
                        SalesRecv: n.salesRecv,
                        Reviews: n.reviews,
                        Asin: n.asin,
                        Isbn10: n.isbn10,
                        AllAsin: O,
                        AllIsbn10: C,
                        SalesRank: n.salesRank,
                        Category: v,
                        CategoryKind: w,
                        PrintLength: n.printLength,
                        AllPages: T,
                        Author: n.author,
                        DateOfPublication: (n.dateOfPublication || "").replace(/\u200E/gi, "").trim(),
                        GoogleSearchUrl: n.googleSearchUrl,
                        GoogleImageSearchUrl: n.googleImageSearchUrl,
                        Rating: n.rating,
                        AdditionalData: P
                    }), S();
                }), k);
            }
            getPageResultsNumber() {
                return this.currentPage.pageName === BestSellersPage.pageName ? this.siteParser.bestSellerResultsNumber : this.currentPage.pageName === SearchResultsPage.pageName ? this.siteParser.searchResultsNumber : this.currentPage.pageName === AuthorPage.pageName ? this.siteParser.authorResultsNumber : 0;
            }
            startPulling(n) {
                if (this.activePullingCount++, s.V.sendMessageToBackground({
                    type: "update-browseraction-state",
                    inProgress: !0
                }, (() => {
                    chrome.runtime.lastError;
                })), !(n <= this.pagesPulled)) {
                    var o = a.W.getParameterByName(this.url, "field-keywords") || a.W.getParameterByName(this.url, "k");
                    this.pagesPulled++;
                    var r = this.pageData.get();
                    r.isWaitingForPulling = !0, r.isPulling = !0, this.currentPage.loadData(this.pullingToken, this.siteParser, this.parentUrl, o, n, (() => {
                        this.activePullingCount--, 0 === this.activePullingCount && s.V.sendMessageToBackground({
                            type: "update-browseraction-state",
                            completed: !0
                        }, (() => {
                            chrome.runtime.lastError;
                        }));
                    }));
                }
            }
            startPullingSearchPage(n) {
                this.url = n, this.parentUrl = a.W.trimCurrentUrl(this.url), this.currentPage = new SearchResultsPage(this), 
                this.pullingToken = (new Date).getTime(), this.startPulling(1);
            }
            httpGet(n, o) {
                p.$.get(n, (function(n) {
                    return o(n);
                })).fail((function(...n) {
                    return o("");
                }));
            }
        };
        window.kindleSpy = y, (0, p.$)(window).ready((function() {
            y.start();
        })), s.V.addListener((function(n, o) {
            if (o = a.W.valueOrDefault(o, (function() {})), "pull-data" === n.type) return o(y.startPulling(n.page));
            if ("start-analyze-search-keywords" === n.type) return y.booksType = n.booksType, 
            y.clearSearchResults(), y.startPullingSearchPage(a.W.getSearchUrl(n.keyword, y.siteParser, n.booksType)), 
            o();
            if ("get-data" === n.type) return o(y.pageData.get());
            if ("get-avg-sales" === n.type) {
                var r = new SearchPageParser(y);
                return y.httpGet(n.uri, (function(s) {
                    r.parsePageAsync(y.pullingToken, 0, a.W.parseHtmlToJquery(s), n.uri, "", y.siteParser, "Search").then((function(n) {
                        var r = (n.books || []).reduce((function(n, o) {
                            return n + parseInt(o.SalesRecv);
                        }), 0), s = y.siteParser.formatPrice(a.W.addCommas(Math.floor(r / n.books.length)));
                        o({
                            avgSales: s
                        });
                    }));
                })), !0;
            }
            if ("get-keyword-data" === n.type) {
                var l = new _.y;
                return y.httpGet(n.uri, (function(r) {
                    var s = a.W.parseHtmlToJquery(r), h = a.W.parseInt(y.siteParser.getTotalSearchResult(s), y.siteParser.decimalSeparator), p = {
                        color: l.getCompetitionColor(h),
                        keyword: n.keyword.keyword,
                        volume: n.keyword.volume,
                        competitors: h
                    };
                    o(p);
                })), !0;
            }
            if ("save-pageNum" === n.type) return y.pageData.get().pageNum[n.tab] = n.pageNum, 
            o();
            if ("save-excluded" === n.type) {
                let r = y.pageData.get().books.find((o => n.ASIN === o.Asin));
                return r && n.ASIN && ![ "undefined", "n/a" ].includes(n.ASIN) || (r = y.pageData.get().books.find((o => n.Title === o.Title))), 
                r.excluded = n.excluded, o();
            }
            if ("check-language" === n.type) {
                if (0 === (0, p.$)(".icp-link-style-2").length) return o(!0);
                let n, r, s;
                return (0, p.$)("#nav-flyout-icp .nav-tpl-itemList").length ? n = Promise.resolve() : (s = document.createElement("style"), 
                s.innerHTML = "#nav-flyout-icp { position: absolute; left: -2000px; opacity: 0 !important; }\n", 
                s.innerHTML += "#nav-cover { position: absolute; left: -2000px; opacity: 0 !important; }", 
                document.body.appendChild(s), r = (0, p.$)(".icp-link-style-2")[0], chrome.runtime.sendMessage({
                    type: "execute-check-language"
                }), n = a.W.waitForElement("#nav-flyout-icp .nav-tpl-itemList")), n.then((() => {
                    let n = (0, p.$)("#nav-flyout-icp .nav-tpl-itemList span.nav-text:has(.icp-radio)");
                    0 === n.length ? o(!0) : o(!!n.eq(0).has(".icp-radio-active").length), r && ((0, 
                    p.$)("#nav-cover")[0].click(), setTimeout((() => {
                        document.body.removeChild(s);
                    }), 500));
                })), !0;
            }
            "change-language" === n.type && (chrome.runtime.sendMessage({
                type: "execute-language-switch"
            }), a.W.waitForElement("#nav-flyout-icp .nav-tpl-itemList").then((() => {
                (0, p.$)(".nav-link:has(.icp-radio)")[0].click();
            })));
            if ("check-logged-in" === n.type) return o(!(0, p.$)("#nav-flyout-ya-signin").length), 
            !0;
            if ("get-pageNum" === n.type) return o(y.pageData.get().pageNum[n.tab]);
            if ("get-current-url" === n.type) return o(window.location.href);
            if ("get-text-from-file" === n.type) {
                let n, r;
                s.V.isFirefox() ? (n = document.createElement("div"), n.setAttribute("style", "padding: 8px; box-shadow: 0px 6px 16px 1px rgba(0,0,0,0.85); position: fixed; top: 50px; left: 40%; width: 20%;background: #fef9f6;z-index: 10000000;"), 
                n.innerHTML = '<p>Firefox requires us to show this popup. Please click on \'Choose File\' to continue importing process.</p>\n                                 <div id="close-file-select-popup" style="position: absolute;top: 1px;right: 5px;font-size: 22px;cursor:pointer;">\xd7</div>\n                                 <input type="file" accept=".json">', 
                r = n.querySelector("input"), n.querySelector("#close-file-select-popup").addEventListener("click", (o => {
                    document.body.removeChild(n);
                })), document.body.appendChild(n)) : (n = document.createElement("div"), n.innerHTML = '<input type="file" accept=".json">', 
                n.style.position = "absolute", n.style.left = "-9999px", r = n.firstChild, document.body.appendChild(n));
                const a = y;
                return r.addEventListener("change", (function() {
                    const s = r.files[0];
                    if (s.name.match(/\.(json)$/)) {
                        const r = new FileReader;
                        r.onload = function() {
                            a.storage.import(r.result, (function() {
                                alert("Data successfully imported."), o();
                            })), document.body.removeChild(n);
                        }, r.readAsText(s);
                    } else alert("File type is not supported, .json files only."), document.body.removeChild(n), 
                    o();
                })), s.V.isFirefox() || r.click(), !0;
            }
            if ("get-type-page" === n.type) return o(void 0 !== y.currentPage ? y.currentPage.constructor.name : "");
            if ("get-type-page-and-url" === n.type) return o([ void 0 !== y.currentPage ? y.currentPage.constructor.name : "", window.location.href, y.booksType ]);
            if ("get-totalResults" === n.type) return o(y.pageData.get().totalResults);
            "http-get" === n.type && y.httpGet(n.url, (function(n) {
                return o(n);
            }));
            if ("download-file" === n.type) return h.D.toCSV(n.data, n.fileName, n.booksNumber, o), 
            !0;
            if ("save-login" === n.type) return y.login = n.login, y.password = n.password, 
            o();
            if ("get-login" === n.type) return o({
                login: y.login,
                password: y.password
            });
            return !0;
        }));
    },
    889: (n, o, r) => {
        "use strict";
        r.d(o, {
            N: () => BookStorage
        });
        var s = r(248), a = r(357), l = r(985);
        class BookStorage {
            constructor() {
                if (BookStorage._singletonInstance) return BookStorage._singletonInstance;
                BookStorage._singletonInstance = this, this._storage = s.V.storage, this._singletonInstance = this;
            }
            clear() {
                this._storage.clear();
            }
            enableTracking(n, o) {
                o = a.W.valueOrDefault(o, (function() {}));
                var r = this;
                this.getBook(n, (function(s) {
                    var changeStatus = function(s) {
                        s.trackingEnabled = !0, r.updateBookInStorage(n, s, o);
                    };
                    void 0 === s ? r.initBookFromUrl(n, changeStatus) : changeStatus(s);
                }));
            }
            disableTracking(n, o) {
                o = a.W.valueOrDefault(o, (function() {}));
                var r = this;
                this.getBook(n, (function(s) {
                    void 0 !== s && (s.trackingEnabled = !1, r.updateBookInStorage(n, s, o));
                }));
            }
            getBook(n, o) {
                var r = this;
                this._storage.get("trackingData", (function(s) {
                    if (void 0 !== s && void 0 !== s.trackingData) {
                        var a = r.findUrlIndex(s.trackingData, n);
                        return o(BookStorage.upgradeBookData(s.trackingData[a]));
                    }
                    return o(void 0);
                }));
            }
            static upgradeBookData(n) {
                if (!n) return n;
                let o = n.salesRankData && n.salesRankData.some((n => !!n.salesRank));
                return (5 !== n.kdspyVersion || o || n.currentRanks) && (n = {
                    ...n,
                    prices: {
                        kindle: n.price
                    },
                    bookTypes: [ "kindle" ],
                    currentSalesRanks: {
                        kindle: n.currentSalesRank
                    },
                    estSales: {
                        kindle: n.estSales
                    },
                    estSalesRecv: {
                        kindle: n.estSalesRev
                    },
                    formattedPrices: {
                        kindle: n.formattedPrice
                    },
                    salesRankData: n.salesRankData.map((function(n) {
                        return n.salesRanks ? n : {
                            date: n.date,
                            salesRanks: {
                                kindle: n.salesRank
                            }
                        };
                    }))
                }).currentRanks && (n.currentSalesRanks = n.currentRanks), n;
            }
            initBookFromUrl(n, o) {
                new l.D(n).getBookData(n, null, null, (function(r) {
                    let {prices: s, currentSalesRanks: a, formattedPrices: l, estSalesRecv: h, estSales: p, pages: x} = BookStorage.splitRankData(r.allRanks);
                    var _ = {
                        kdspyVersion: 5,
                        url: n,
                        type: r.type,
                        bookTypes: r.bookTypes,
                        allRanks: r.allRanks,
                        trackingEnabled: !1,
                        title: r.title,
                        description: r.description,
                        author: r.author,
                        image: r.imageUrl,
                        currentSalesRank: r.salesRank,
                        price: r.price,
                        asin: r.asin,
                        isbn10: r.isbn10,
                        googleSearchUrl: r.googleSearchUrl,
                        googleImageSearchUrl: r.googleImageSearchUrl,
                        currentSalesRanks: a,
                        allPages: x,
                        prices: s,
                        formattedPrice: r.formattedPrice,
                        formattedPrices: l,
                        dateOfPublication: (r.dateOfPublication || "").trim(),
                        estSalesRecv: h,
                        estSales: p,
                        pages: r.printLength,
                        numberOfReviews: r.reviews,
                        salesRankData: [ {
                            date: (new Date).setHours(0, 0, 0, 0),
                            salesRanks: a
                        } ]
                    };
                    o(_);
                }));
            }
            getAllBooks(n) {
                this._storage.get("trackingData", (function(o) {
                    return void 0 !== o && void 0 !== o.trackingData ? n(o.trackingData) : n([]);
                }));
            }
            findUrlIndex(n, o) {
                for (var r = 0; r < n.length; r++) if (0 === n[r].url.indexOf(a.W.trimCurrentUrl(o))) return r;
            }
            updateBookInStorage(n, o, r) {
                r = a.W.valueOrDefault(r, (function() {}));
                var s = this;
                if (BookStorage.lockStorage) return setTimeout(s.updateBookInStorage.bind(s, n, o, r), 100);
                BookStorage.lockStorage = !0, this._storage.get("trackingData", (function(a) {
                    void 0 === a && (a = {}), void 0 === a.trackingData && (a.trackingData = []);
                    var l = s.findUrlIndex(a.trackingData, n);
                    void 0 === l ? a.trackingData.push(o) : a.trackingData[l] = o, s._storage.set(a, (function(n) {
                        BookStorage.lockStorage = !1, r(n);
                    }));
                }));
            }
            trackData() {
                var n = this;
                this._storage.get("lastUpdate", (function(o) {
                    void 0 === o && (o = {}), void 0 === o.lastUpdate && (o.lastUpdate = 0), (Date.now() - Number(o.lastUpdate)) / 1e3 / 60 / 60 < 1 && !BookStorage.debug || n._storage.set({
                        lastUpdate: Date.now()
                    }, (function(o) {
                        n.getAllBooks((function(o) {
                            if (void 0 !== o) {
                                var r = (new Date).setHours(0, 0, 0, 0);
                                o.forEach((function(o) {
                                    for (var s = 0; s < o.salesRankData.length; s++) if (!o.trackingEnabled || o.salesRankData[s].date === r && !BookStorage.debug) return;
                                    5 !== o.kdspyVersion && o.salesRankData.length > 0 && (o = {
                                        ...o,
                                        prices: {
                                            kindle: o.price
                                        },
                                        bookTypes: [ "kindle" ],
                                        currentSalesRanks: {
                                            kindle: o.currentSalesRank
                                        },
                                        estSales: {
                                            kindle: o.estSales
                                        },
                                        estSalesRecv: {
                                            kindle: o.estSalesRev
                                        },
                                        formattedPrices: {
                                            kindle: o.formattedPrice
                                        },
                                        salesRankData: o.salesRankData.map((function(n) {
                                            return n.salesRanks ? n : {
                                                date: n.date,
                                                salesRanks: {
                                                    kindle: n.salesRank
                                                }
                                            };
                                        }))
                                    }).currentRanks && (o.currentSalesRanks = o.currentRanks), new l.D(o.url).getAllRanks(o.url, !0).then((function(s) {
                                        let {prices: a, currentSalesRanks: l, formattedPrices: h, estSales: p, estSalesRecv: x, pages: _} = BookStorage.splitRankData(s);
                                        o.kdspyVersion = 5, o.prices = a, o.currentSalesRanks = l, o.formattedPrices = h, 
                                        o.estSales = p, o.estSalesRecv = x, o.allPages = _, o.salesRankData.push({
                                            date: r,
                                            salesRanks: l
                                        }), n.updateBookInStorage(o.url, o);
                                    }));
                                }));
                            }
                        }));
                    }));
                }));
            }
            static splitRankData(n) {
                let o = {}, r = {}, s = {}, a = {}, l = {}, h = {}, p = {}, x = {};
                for (const _ of Object.keys(n)) {
                    const {rank: y, price: v, formattedPrice: w, estSale: k, estSalesRev: S, pages: P, asin: A, isbn10: T} = n[_];
                    o[_] = v, r[_] = y, s[_] = w, a[_] = k, l[_] = S, h[_] = P, p[_] = A, x[_] = T;
                }
                return {
                    prices: o,
                    currentSalesRanks: r,
                    formattedPrices: s,
                    estSales: a,
                    estSalesRecv: l,
                    pages: h,
                    asin: p,
                    isbn10: x
                };
            }
            getNumberOfBooks(n) {
                this._storage.get("trackingData", (function(o) {
                    return void 0 !== o && void 0 !== o.trackingData ? n(o.trackingData.length) : n(void 0);
                }));
            }
            removeBookInStorage(n, o) {
                var r = this;
                this._storage.get("trackingData", (function(s) {
                    if (void 0 !== s && void 0 !== s.trackingData) {
                        var a = r.findUrlIndex(s.trackingData, n);
                        void 0 !== a && s.trackingData.splice(a, 1), r._storage.set(s, o);
                    }
                }));
            }
            export(n) {
                this._storage.get("trackingData", (function(o) {
                    return n(void 0 !== o ? o.trackingData : null);
                }));
            }
            import(n, o) {
                let r = {};
                r.trackingData = JSON.parse(n), BookStorage.lockStorage = !0, this._storage.set(r, (function(n) {
                    BookStorage.lockStorage = !1, o(n);
                }));
            }
        }
        BookStorage.debug = !1, BookStorage.lockStorage = !1;
    },
    72: (n, o, r) => {
        "use strict";
        r.d(o, {
            D: () => Export
        });
        var s = r(357);
        class Export {
            static downloadFile(n, o, r, a) {
                a = s.W.valueOrDefault(a, (function() {}));
                var l = new Blob([ n ], {
                    type: r,
                    charset: "utf-8",
                    encoding: "utf-8"
                }), h = URL.createObjectURL(l), p = document.createElement("a");
                p.setAttribute("href", h), p.setAttribute("download", o), document.body.appendChild(p), 
                p.click(), document.body.removeChild(p), a();
            }
            static toCSV(n, o, r, a) {
                a = s.W.valueOrDefault(a, (function() {}));
                var l = "\ufeff";
                n.forEach((function(n, o) {
                    if (void 0 === r || o <= r) {
                        for (var s = [], a = 0; a < n.length; a++) {
                            null !== n[a] && void 0 !== n[a] || (n[a] = ""), "string" != typeof n[a] && (n[a] = n[a].toString());
                            var h = !1;
                            n[a].indexOf(",") >= 0 && (h = !0);
                            var p = !1;
                            n[a].indexOf('"') >= 0 && (p = !0);
                            var x = n[a];
                            (x.indexOf("\r") >= 0 || x.indexOf("\n") >= 0) && (h = !0, x = (x = (x = x.replace("\r\n", "")).replace("\r", "")).replace("\n", "")), 
                            s[a] = (h || p ? '"' : "") + x + (h || p ? '"' : "") + (a < n.length - 1 ? "," : "\r\n");
                        }
                        for (var _ = 0; _ < s.length; _++) l += s[_];
                    }
                }));
                var h = new Date, p = h.getDate(), x = o + "-" + (h.getMonth() + 1) + "-" + p + "-" + h.getFullYear() + ".csv";
                this.downloadFile(l, x, "text/csv", a);
            }
        }
    },
    357: (n, o, r) => {
        "use strict";
        r.d(o, {
            W: () => Helper
        });
        var s = r(248), a = r(534), l = r(127);
        class Helper {
            static parseFloat(n, o) {
                if ("string" != typeof n) return n;
                o = Helper.valueOrDefault(o, ".");
                var r = n.trim().replace(new RegExp("[^0-9" + o + "]", "g"), "");
                return parseFloat(r.replace(o, "."));
            }
            static parseInt(n, o) {
                return "string" != typeof n ? n : (o = Helper.valueOrDefault(o, "."), parseInt(n.trim().replace(new RegExp("[^0-9" + o + "]", "g"), "")));
            }
            static getParameterByName(n, o) {
                o = o.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var r = new RegExp("[\\?&]" + o + "=([^&#]*)").exec(n);
                return null == r ? "" : decodeURIComponent(r[1].replace(/\+/g, " "));
            }
            static valueOrDefault(n, o) {
                return void 0 === n ? o : n;
            }
            static parseString(n, o, r, s) {
                var a = n.indexOf(o);
                if (a < 0) return "";
                var l = n.substr(a + o.length);
                return (a = l.indexOf(r)) < 0 || (a = (l = l.substr(a + r.length)).indexOf(s)) < 0 ? "" : l.substr(0, a).trim();
            }
            static resolve(n, o, r = null) {
                return o.split(/[.\[\]'"]/).filter((n => n)).reduce(((n, o) => n && o in n ? n[o] : r), n);
            }
            static getSiteParser(n) {
                let o = new URL(n).hostname;
                if (o.includes("www.amazon.")) return o.includes(l.$_.zone) ? new l.$_ : o.includes(l.GW.zone) ? new l.GW : o.includes(l.wJ.zone) ? new l.wJ : o.includes(l.O$.zone) ? new l.O$ : o.includes(l.kA.zone) ? new l.kA : o.includes(l.vE.zone) ? new l.vE : o.includes(l.y_.zone) ? new l.y_ : o.includes(l.ir.zone) ? new l.ir : o.includes(l.gu.zone) ? new l.gu : o.includes(l._H.zone) ? new l._H : o.includes(l.Wu.zone) ? new l.Wu : o.includes(l.GB.zone) ? new l.GB : void 0;
            }
            static addCommas(n) {
                let o = (n += "").split("."), r = o[0], s = o.length > 1 ? "." + o[1] : "", a = /(\d+)(\d{3})/;
                for (;a.test(r); ) r = r.replace(a, "$1,$2");
                return r + s;
            }
            static getCategoryFromBookData(n) {
                return (n = Helper.valueOrDefault(n, [])).length > 0 ? n[0].Category : "";
            }
            static getTypeFromBookData(n) {
                return (n = Helper.valueOrDefault(n, [])).length > 0 ? n[0].Type : "";
            }
            static isBestSellersPage(n, o) {
                return (n = n.replace(/portal\-migration\//i, "")).indexOf(o.mainUrl + "/Best-Sellers-Kindle-Store") >= 0 && n.indexOf("digital-text") > 0 || n.includes(o.mainUrl + "/Best-Sellers-Audible-Audiobooks") || n.includes(o.mainUrl + "/gp/browse.html?node=22490395031") || n.indexOf(o.mainUrl + "/gp/bestsellers") >= 0 && n.indexOf("audible") >= 0 || n.indexOf(o.mainUrl + "/gp/bestsellers") >= 0 && n.indexOf("digital-text") >= 0 || n.indexOf(o.mainUrl + "/bestsellers") >= 0 && n.indexOf("digital-text") >= 0 || n.indexOf(o.mainUrl + "/gp/bestsellers") >= 0 && n.indexOf("books") >= 0 || n.indexOf(o.mainUrl + "/bestsellers") >= 0 && n.indexOf("books") >= 0 || n.indexOf(o.mainUrl + "/Best-Sellers-") >= 0 && n.indexOf("digital-text") >= 0 || n.indexOf(o.mainUrl + "/Best-Sellers-") >= 0 && n.indexOf("books") >= 0 || n.indexOf(o.mainUrl + "/Best-Sellers-") >= 0 && n.indexOf("audible") >= 0 || n.indexOf(o.mainUrl + "/-/en/gp/bestsellers") >= 0 && n.indexOf("books") >= 0 || n.indexOf(o.mainUrl + "/-/en/gp/bestsellers") >= 0 && n.indexOf("digital-text") >= 0 || n.toLowerCase().indexOf(o.mainUrl + "/best-sellers-books") >= 0 && n.indexOf("books") >= 0;
            }
            static getBestSellerPageType(n, o) {
                return (n = n.replace(/portal\-migration\//i, "")).indexOf(o.mainUrl + "/Best-Sellers-Kindle-Store") >= 0 && n.indexOf("digital-text") > 0 ? "kindle" : n.includes(o.mainUrl + "/Best-Sellers-Audible-Audiobooks") || n.includes(o.mainUrl + "/gp/bestsellers/books/17465192031") || n.includes(o.mainUrl + "/gp/browse.html?node=22490395031") || n.indexOf(o.mainUrl + "/gp/bestsellers") >= 0 && n.indexOf("audible") >= 0 ? "audiobook" : n.indexOf(o.mainUrl + "/gp/bestsellers") >= 0 && n.indexOf("digital-text") >= 0 || n.indexOf(o.mainUrl + "/bestsellers") >= 0 && n.indexOf("digital-text") >= 0 ? "kindle" : n.indexOf(o.mainUrl + "/gp/bestsellers") >= 0 && n.indexOf("books") >= 0 || n.indexOf(o.mainUrl + "/bestsellers") >= 0 && n.indexOf("books") >= 0 ? "book" : n.indexOf(o.mainUrl + "/Best-Sellers-") >= 0 && n.indexOf("digital-text") >= 0 ? "kindle" : n.indexOf(o.mainUrl + "/Best-Sellers-") >= 0 && n.indexOf("books") >= 0 ? "book" : n.indexOf(o.mainUrl + "/Best-Sellers-") >= 0 && n.indexOf("audible") >= 0 ? "audiobook" : n.indexOf(o.mainUrl + "/-/en/gp/bestsellers") >= 0 && n.indexOf("books") >= 0 ? "book" : n.indexOf(o.mainUrl + "/-/en/gp/bestsellers") >= 0 && n.indexOf("digital-text") >= 0 ? "kindle" : n.toLowerCase().indexOf(o.mainUrl + "/best-sellers-books") >= 0 && n.indexOf("books") >= 0 ? "book" : "kindle";
            }
            static isNewReleasesPage(n, o) {
                return (n = n.replace(/portal\-migration\//i, "")).indexOf(o.mainUrl + "/gp/new-releases") >= 0 && (n.indexOf("digital-text") > 0 || n.indexOf("books"));
            }
            static isBestSellersPageFromCategoryKind(n) {
                return -1 != n.indexOf("Seller");
            }
            static isAuthorPage(n, o) {
                return n.includes(o.areYouAnAuthorPattern) && n.includes("ap-author-name") || n.includes('id="authorName"') || n.includes('class="AuthorSubHeader__author-subheader__name__');
            }
            static isSeriesPage(n, o) {
                return n.includes('id="collection-title"') || n.includes('id="collection-size"');
            }
            static isNewReleasesPageFromCategoryKind(n) {
                return n.includes("New-Releases");
            }
            static isSearchPage(n, o) {
                return n.includes("field-keywords=") || n.includes("?k=") || n.includes("&k=");
            }
            static isSearchPageFromCategoryKind(n) {
                return -1 != n.indexOf("Search");
            }
            static isSeriesPageFromCategoryKind(n) {
                return n.includes("Series");
            }
            static isAuthorSearchResultPage(n, o) {
                return n.includes(o.mainUrl + "/s") && (n.includes("field-author") || n.includes("rh=p_27")) && (n.includes("digital-text") || n.includes("stripbooks") || n.includes("audible"));
            }
            static isSingleBookPage(n, o) {
                var r = n.split("/");
                return (r[0] + "//" + r[2]).indexOf(o.mainUrl) >= 0 && r.length > 4 && r[4].indexOf("dp") >= 0 || "gp" === r[3] || 0 === r[3].indexOf("dp");
            }
            static parseHtmlToJquery(n) {
                return n = (n = a.$.trim(n)).replace(/src=/gi, "data-src="), (0, a.$)(n);
            }
            static setupHeader(n, o) {
                return (0, a.$)("#KeywordAnalysisMenu").hide(), Helper.isBestSellersPageFromCategoryKind(o) ? ((0, 
                a.$)("#CategoryKind").html("Best Sellers in"), (0, a.$)("#title").html(n + ":"), 
                void (0, a.$)("#BestSellerLink").html("Best Sellers")) : Helper.isNewReleasesPageFromCategoryKind(o) ? ((0, 
                a.$)("#CategoryKind").html("New Releases in"), (0, a.$)("#title").html(n + ":"), 
                void (0, a.$)("#BestSellerLink").html("New Releases Rankings")) : Helper.isSearchPageFromCategoryKind(o) ? ((0, 
                a.$)("#CategoryKind").html("Keyword:"), (0, a.$)("#title").html(n), (0, a.$)("#KeywordAnalysisMenu").show(), 
                void (0, a.$)("#BestSellerLink").html("Results")) : Helper.isSeriesPageFromCategoryKind(o) ? ((0, 
                a.$)("#CategoryKind").html("Series:"), (0, a.$)("#title").html(n), void (0, a.$)("#BestSellerLink").html("Series Titles")) : ((0, 
                a.$)("#CategoryKind").html("Author:"), (0, a.$)("#title").html(n), void (0, a.$)("#BestSellerLink").html("Author Titles"));
            }
            static setupFooter(n) {
                (0, a.$)("#Conclusion").hide(), (0, a.$)("#AdPanel").hide(), Helper.isBestSellersPageFromCategoryKind(n) || Helper.isNewReleasesPageFromCategoryKind(n) || Helper.isSearchPageFromCategoryKind(n) ? (0, 
                a.$)("#Conclusion").show() : (0, a.$)("#AdPanel").show();
            }
            static buildHeaderHtml(n, o) {
                return '<div class="infoBox">\n                <div class="infoBox-icon"><img src="/assets/images/info.png"></div>\n                <div class="infoBox-popup" data-screen="BestSellersPage">\n                    <div class="infoBox-row">\n                        <div class="infoBox-tick"><img src="/assets/images/tick.png"></div>\n                        <div class="infoBox-text">Sales required in 24 hours to hit #1 bestseller:</div>\n                        <div class="infoBox-rank infoBox-rank--first"></div>\n                    </div>\n                    <div class="infoBox-row">\n                        <div class="infoBox-tick"><img src="/assets/images/tick.png"></div>\n                        <div class="infoBox-text">Sales required in 24 hours to hit #20 here:</div>\n                        <div class="infoBox-rank infoBox-rank--last"></div>\n                    </div>\n                </div>\n                <div class="infoBox-popup" data-screen="SearchResultsPage">\n                    <div class="infoBox-row">\n                        <div class="infoBox-tick"><img src="/assets/images/tick.png"></div>\n                        <div class="infoBox-text">This keyword has a <span class="infoBox-level--competition"></span> level of competition:</div>\n                        <div class="infoBox-rank infoBox-rank--competition"></div>\n                    </div>\n                    <div class="infoBox-row">\n                        <div class="infoBox-tick"><img src="/assets/images/tick.png"></div>\n                        <div class="infoBox-text">Books here have a <span class="infoBox-level--reviews"></span> level of Avg. Reviews:</div>\n                        <div class="infoBox-rank infoBox-rank--reviews"></div>\n                    </div>\n                </div>\n            </div><div style="float:left;font-size:14px;padding-left:11px;" id="CategoryKind"></div><div style="float:left;font-size:14px;padding-left:6px;font-weight:bold;white-space:nowrap;max-width:210px;overflow:hidden;text-overflow:ellipsis;" id="title"></div><div style="float:right"><a id="BestSellerLink" href="#"></a>&nbsp;&nbsp;|&nbsp;&nbsp;<span style="display: none;" id="KeywordAnalysisMenu"><a id="KeywordAnalysis" href="#">Analysis</a>&nbsp;&nbsp;|&nbsp;&nbsp;</span><span id="InsightsLinkWrapper"><a id="InsightsLink" href="#">Insights</a>&nbsp;&nbsp;|&nbsp;&nbsp;</span><a id="TitleWordCloud" href="#">Word Cloud (' + o + ')</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a id="RankTrackingResultList" href="#">Book Tracking (' + n + ")</a></div>";
            }
            static trimCurrentUrl(n) {
                var o = n;
                if (n.indexOf("/s/") >= 0) o = n.replace(/\&page=[0-9]+/, ""); else if (n.indexOf("/ref=") >= 0) {
                    var r = n.lastIndexOf("/ref=");
                    o = n.substr(0, r);
                }
                return o;
            }
            static isTop100Free() {
                return -1 != window.location.href.indexOf("tf=1");
            }
            static getSearchUrl(n, o, r = "kindle") {
                let s = o.mainUrl + `/s/?url=search-alias%3D${Helper.typeToAlias[r]}&field-keywords=` + encodeURI(n);
                return s.startsWith("//") && (s = "https:" + s), s;
            }
            static getUrlWORedirect(n) {
                return void 0 === n || -1 === n.indexOf("picassoRedirect.html") ? n : decodeURIComponent(n.split("url=")[1]);
            }
            static md5(n) {
                function L(n, o) {
                    return n << o | n >>> 32 - o;
                }
                function K(n, o) {
                    var r, s, a, l, h;
                    return a = 2147483648 & n, l = 2147483648 & o, h = (1073741823 & n) + (1073741823 & o), 
                    (r = 1073741824 & n) & (s = 1073741824 & o) ? 2147483648 ^ h ^ a ^ l : r | s ? 1073741824 & h ? 3221225472 ^ h ^ a ^ l : 1073741824 ^ h ^ a ^ l : h ^ a ^ l;
                }
                function u(n, o, r, s, a, l, h) {
                    return n = K(n, K(K(function(n, o, r) {
                        return n & o | ~n & r;
                    }(o, r, s), a), h)), K(L(n, l), o);
                }
                function f(n, o, r, s, a, l, h) {
                    return n = K(n, K(K(function(n, o, r) {
                        return n & r | o & ~r;
                    }(o, r, s), a), h)), K(L(n, l), o);
                }
                function D(n, o, r, s, a, l, h) {
                    return n = K(n, K(K(function(n, o, r) {
                        return n ^ o ^ r;
                    }(o, r, s), a), h)), K(L(n, l), o);
                }
                function t(n, o, r, s, a, l, h) {
                    return n = K(n, K(K(function(n, o, r) {
                        return o ^ (n | ~r);
                    }(o, r, s), a), h)), K(L(n, l), o);
                }
                function B(n) {
                    var o, r = "", s = "";
                    for (o = 0; o <= 3; o++) r += (s = "0" + (n >>> 8 * o & 255).toString(16)).substr(s.length - 2, 2);
                    return r;
                }
                var o, r, s, a, l, h, p, x, _, y = Array();
                for (y = function(n) {
                    for (var o, r = n.length, s = r + 8, a = 16 * ((s - s % 64) / 64 + 1), l = Array(a - 1), h = 0, p = 0; p < r; ) h = p % 4 * 8, 
                    l[o = (p - p % 4) / 4] = l[o] | n.charCodeAt(p) << h, p++;
                    return h = p % 4 * 8, l[o = (p - p % 4) / 4] = l[o] | 128 << h, l[a - 2] = r << 3, 
                    l[a - 1] = r >>> 29, l;
                }(n = function(n) {
                    n = n.replace(/rn/g, "n");
                    for (var o = "", r = 0; r < n.length; r++) {
                        var s = n.charCodeAt(r);
                        s < 128 ? o += String.fromCharCode(s) : s > 127 && s < 2048 ? (o += String.fromCharCode(s >> 6 | 192), 
                        o += String.fromCharCode(63 & s | 128)) : (o += String.fromCharCode(s >> 12 | 224), 
                        o += String.fromCharCode(s >> 6 & 63 | 128), o += String.fromCharCode(63 & s | 128));
                    }
                    return o;
                }(n)), h = 1732584193, p = 4023233417, x = 2562383102, _ = 271733878, o = 0; o < y.length; o += 16) r = h, 
                s = p, a = x, l = _, h = u(h, p, x, _, y[o + 0], 7, 3614090360), _ = u(_, h, p, x, y[o + 1], 12, 3905402710), 
                x = u(x, _, h, p, y[o + 2], 17, 606105819), p = u(p, x, _, h, y[o + 3], 22, 3250441966), 
                h = u(h, p, x, _, y[o + 4], 7, 4118548399), _ = u(_, h, p, x, y[o + 5], 12, 1200080426), 
                x = u(x, _, h, p, y[o + 6], 17, 2821735955), p = u(p, x, _, h, y[o + 7], 22, 4249261313), 
                h = u(h, p, x, _, y[o + 8], 7, 1770035416), _ = u(_, h, p, x, y[o + 9], 12, 2336552879), 
                x = u(x, _, h, p, y[o + 10], 17, 4294925233), p = u(p, x, _, h, y[o + 11], 22, 2304563134), 
                h = u(h, p, x, _, y[o + 12], 7, 1804603682), _ = u(_, h, p, x, y[o + 13], 12, 4254626195), 
                x = u(x, _, h, p, y[o + 14], 17, 2792965006), h = f(h, p = u(p, x, _, h, y[o + 15], 22, 1236535329), x, _, y[o + 1], 5, 4129170786), 
                _ = f(_, h, p, x, y[o + 6], 9, 3225465664), x = f(x, _, h, p, y[o + 11], 14, 643717713), 
                p = f(p, x, _, h, y[o + 0], 20, 3921069994), h = f(h, p, x, _, y[o + 5], 5, 3593408605), 
                _ = f(_, h, p, x, y[o + 10], 9, 38016083), x = f(x, _, h, p, y[o + 15], 14, 3634488961), 
                p = f(p, x, _, h, y[o + 4], 20, 3889429448), h = f(h, p, x, _, y[o + 9], 5, 568446438), 
                _ = f(_, h, p, x, y[o + 14], 9, 3275163606), x = f(x, _, h, p, y[o + 3], 14, 4107603335), 
                p = f(p, x, _, h, y[o + 8], 20, 1163531501), h = f(h, p, x, _, y[o + 13], 5, 2850285829), 
                _ = f(_, h, p, x, y[o + 2], 9, 4243563512), x = f(x, _, h, p, y[o + 7], 14, 1735328473), 
                h = D(h, p = f(p, x, _, h, y[o + 12], 20, 2368359562), x, _, y[o + 5], 4, 4294588738), 
                _ = D(_, h, p, x, y[o + 8], 11, 2272392833), x = D(x, _, h, p, y[o + 11], 16, 1839030562), 
                p = D(p, x, _, h, y[o + 14], 23, 4259657740), h = D(h, p, x, _, y[o + 1], 4, 2763975236), 
                _ = D(_, h, p, x, y[o + 4], 11, 1272893353), x = D(x, _, h, p, y[o + 7], 16, 4139469664), 
                p = D(p, x, _, h, y[o + 10], 23, 3200236656), h = D(h, p, x, _, y[o + 13], 4, 681279174), 
                _ = D(_, h, p, x, y[o + 0], 11, 3936430074), x = D(x, _, h, p, y[o + 3], 16, 3572445317), 
                p = D(p, x, _, h, y[o + 6], 23, 76029189), h = D(h, p, x, _, y[o + 9], 4, 3654602809), 
                _ = D(_, h, p, x, y[o + 12], 11, 3873151461), x = D(x, _, h, p, y[o + 15], 16, 530742520), 
                h = t(h, p = D(p, x, _, h, y[o + 2], 23, 3299628645), x, _, y[o + 0], 6, 4096336452), 
                _ = t(_, h, p, x, y[o + 7], 10, 1126891415), x = t(x, _, h, p, y[o + 14], 15, 2878612391), 
                p = t(p, x, _, h, y[o + 5], 21, 4237533241), h = t(h, p, x, _, y[o + 12], 6, 1700485571), 
                _ = t(_, h, p, x, y[o + 3], 10, 2399980690), x = t(x, _, h, p, y[o + 10], 15, 4293915773), 
                p = t(p, x, _, h, y[o + 1], 21, 2240044497), h = t(h, p, x, _, y[o + 8], 6, 1873313359), 
                _ = t(_, h, p, x, y[o + 15], 10, 4264355552), x = t(x, _, h, p, y[o + 6], 15, 2734768916), 
                p = t(p, x, _, h, y[o + 13], 21, 1309151649), h = t(h, p, x, _, y[o + 4], 6, 4149444226), 
                _ = t(_, h, p, x, y[o + 11], 10, 3174756917), x = t(x, _, h, p, y[o + 2], 15, 718787259), 
                p = t(p, x, _, h, y[o + 9], 21, 3951481745), h = K(h, r), p = K(p, s), x = K(x, a), 
                _ = K(_, l);
                return (B(h) + B(p) + B(x) + B(_)).toLowerCase();
            }
            static toMachineName(n) {
                return n = n.includes("Kindle") ? "kindle" : n.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-{2,}/g, "-").replace(/^-+|-+$/g, "-");
            }
            static isBookTypeSupported(n, o) {
                if (Array.isArray(o)) return o.filter((o => Helper.isBookTypeSupported(n, o)));
                if (o.toLowerCase().includes("kindle") || o.toLowerCase().includes("audiobook")) return !0;
                let r = Helper.toMachineName(o);
                return Object.keys(n.getAllBookTypes()).some((n => Helper.toMachineName(n) === r));
            }
            static setPage(n, o, r = "page") {
                let s = `${n}`;
                s.startsWith("//") && (s = `https:${s}`);
                let a = new URL(s);
                return a.searchParams.set(r, o), a.toString();
            }
            static getBookType(n, o) {
                let r = (0, a.$)(a.$.parseHTML(o)), s = r.find("a").contents().unwrap().parents().last();
                if (s.find("img").remove(), s = s.html(), s && /\bkindle\b/i.test(s)) return "kindle";
                for (let [o, a] of Object.entries(n.getAllBookTypes())) {
                    let n = new RegExp(o);
                    const l = s || r.find(".a-row.a-size-small .a-color-secondary").html();
                    if (!l) return "UNKNOWN";
                    let h = l.match(n);
                    if (h && h[0]) return "Audiobook" === a ? "audiobook" : Helper.toMachineName(h[0].trim());
                }
                return "kindle";
            }
            static isKindlePage(n) {
                const o = n.toLowerCase();
                return o.includes("kindle") || o.includes("digital-text");
            }
            static waitAsync(n) {
                return new Promise((o => {
                    setTimeout((() => o()), n);
                }));
            }
            static waitForElement(n) {
                return new Promise((o => {
                    let r = (0, a.$)(n);
                    if (0 !== r.length) return void o(r);
                    let s = setInterval((() => {
                        let r = (0, a.$)(n);
                        if (0 !== r.length) return clearInterval(s), void o(r);
                    }), 300);
                }));
            }
            static timeoutDecorator(n, o, r = null) {
                return new Promise(((s, a) => {
                    let l = setTimeout((() => {
                        r ? s(r) : a("timeout");
                    }), o);
                    n.then((n => {
                        clearInterval(l), s(n);
                    })).catch((n => {
                        clearInterval(l), a(n);
                    }));
                }));
            }
            static getMainUrlByRegionAndType(n, o) {
                return {
                    USA: {
                        kindle: "https://www.amazon.com/Best-Sellers-Kindle-Store-eBooks/zgbs/digital-text/154606011/",
                        books: "https://www.amazon.com/best-sellers-books-Amazon/zgbs/books/",
                        audiobooks: "https://www.amazon.com/Best-Sellers-Audible-Audiobooks/zgbs/audible/"
                    },
                    UK: {
                        kindle: "https://www.amazon.co.uk/Best-Sellers-Kindle-Store-eBooks/zgbs/digital-text/341689031/",
                        books: "https://www.amazon.co.uk/best-sellers-books-Amazon/zgbs/books/",
                        audiobooks: "https://www.amazon.co.uk/Best-Sellers-Audible-Audiobooks/zgbs/audible/"
                    },
                    DE: {
                        kindle: "https://www.amazon.de/gp/bestsellers/digital-text/530886031/",
                        books: "https://www.amazon.de/gp/bestsellers/books/",
                        audiobooks: "https://www.amazon.de/gp/bestsellers/audible/"
                    },
                    FR: {
                        kindle: "https://www.amazon.fr/gp/bestsellers/digital-text/695398031/",
                        books: "https://www.amazon.fr/gp/bestsellers/books/",
                        audiobooks: "https://www.amazon.fr/gp/bestsellers/audible/"
                    },
                    CA: {
                        kindle: "https://www.amazon.ca/gp/bestsellers/digital-text/2980423011/",
                        books: "https://www.amazon.ca/best-sellers-books-Amazon/zgbs/books/",
                        audiobooks: "https://www.amazon.ca/Best-Sellers-Audible-Audiobooks/zgbs/audible/"
                    },
                    IT: {
                        kindle: "https://www.amazon.it/gp/bestsellers/digital-text/827182031/",
                        books: "https://www.amazon.it/gp/bestsellers/books/",
                        audiobooks: "https://www.amazon.it/gp/browse.html?node=22490395031"
                    },
                    ES: {
                        kindle: "https://www.amazon.es/gp/bestsellers/digital-text/827231031/",
                        books: "https://www.amazon.es/gp/bestsellers/books/",
                        audiobooks: "https://www.amazon.es/gp/bestsellers/books/17465192031"
                    },
                    IN: {
                        kindle: "https://www.amazon.in/gp/bestsellers/digital-text/1634753031/",
                        books: "https://www.amazon.in/gp/bestsellers/books/",
                        audiobooks: "https://www.amazon.in/gp/bestsellers/audible/"
                    },
                    JP: {
                        kindle: "https://www.amazon.co.jp/gp/bestsellers/digital-text/2275256051/",
                        books: "https://www.amazon.co.jp/-/en/gp/bestsellers/books/",
                        audiobooks: "https://www.amazon.co.jp/gp/bestsellers/audible/"
                    },
                    AU: {
                        kindle: "https://www.amazon.com.au/gp/bestsellers/digital-text/2496751051/",
                        books: "https://www.amazon.com.au/gp/bestsellers/books/",
                        audiobooks: "https://www.amazon.com.au/gp/bestsellers/audible/"
                    },
                    BR: {
                        kindle: "https://www.amazon.com.br/gp/bestsellers/digital-text/5475882011/",
                        books: "https://www.amazon.com.br/gp/bestsellers/books/",
                        audiobooks: ""
                    },
                    MX: {
                        kindle: "https://www.amazon.com.mx/gp/bestsellers/digital-text/6507977011/",
                        books: "https://www.amazon.com.mx/gp/bestsellers/books/",
                        audiobooks: ""
                    }
                }[n][o];
            }
            static openDefaultCategoryUrl() {
                return new Promise((n => {
                    chrome.storage.local.get({
                        defaultRegion: "USA",
                        defaultType: "kindle"
                    }, (o => {
                        let r = Helper.getMainUrlByRegionAndType(o.defaultRegion, o.defaultType);
                        s.V.openNewTab(r).then(n);
                    }));
                }));
            }
            static getBookTypesMachineNameToPretty(n) {
                let o = {
                    kindle: "Kindle"
                };
                return Object.values(n.getAllBookTypes()).forEach((n => {
                    o[Helper.toMachineName(n)] = n;
                })), o;
            }
            static toCanonicalTypeName(n, o) {
                if (n.includes("kindle")) return "kindle";
                return Object.values(o.getAudioBookTypes()).some((o => Helper.toMachineName(o) === n)) ? "audiobook" : Object.values(o.getBookTypes()).some((o => Helper.toMachineName(o) === n)) ? "book" : n;
            }
            static translateMachineTypeName(n, o) {
                const r = o.getAllBookTypes(), s = Object.entries(r).filter((([o, r]) => n === Helper.toMachineName(o)))[0];
                return s ? s[1] : n;
            }
            static translateTypeName(n, o) {
                const r = o.getAllBookTypes()[n];
                return r || n;
            }
            static getBookFirstPaperMachineType(n, o) {
                const r = [ "kindle", "audiobook" ], s = o.getAllBookTypes();
                for (const o of n) {
                    const n = Helper.toMachineName(o);
                    if (!r.includes(n)) {
                        for (let o of Object.keys(s)) if (Helper.toMachineName(o) === n) return Helper.toMachineName(s[o]);
                        return n;
                    }
                }
            }
            static audioLengthToMinutes(n) {
                const [o, r] = n.split(":"), s = 60 * parseInt(o) + parseInt(r);
                return Number.isNaN(s) ? 0 : s;
            }
        }
        Helper.typeToAlias = {
            kindle: "digital-text",
            books: "stripbooks",
            book: "stripbooks",
            audiobook: "audible"
        };
    },
    838: (n, o, r) => {
        "use strict";
        r.d(o, {
            O: () => AmazonComParser
        });
        var s = r(357), a = r(534);
        class AmazonComParser {
            constructor() {
                this.mainUrl = "//www.amazon." + AmazonComParser.zone, this.completionUrl = "https://completion.amazon." + AmazonComParser.zone + "/search/complete?method=completion&search-alias=digital-text&client=amazon-search-ui&mkt=1", 
                this.region = AmazonComParser.region, this.areYouAnAuthorPattern = "Are You an Author", 
                this.free = "free", this.currencySign = "$", this.currencySignForExport = "$", this.decimalSeparator = ".", 
                this.thousandSeparator = ",";
                const n = "undefined" != typeof window && (0, a.$)(".zg_rankDiv").length;
                this.bestSellerResultsNumber = n || ("undefined" == typeof window ? 50 : (0, a.$)(".zg-badge-text").length), 
                this.searchResultsNumber = 16, this.authorResultsNumber = 12, this.publisher = "Publisher", 
                this.publicationDate = [ "Publication Date", "Publication date" ], this.searchKeys = [ "to buy", "to rent" ], 
                this.numberSign = "#", this.searchPattern = "Kindle Edition", this.bestSellersPatternStart = n ? 'class="zg_itemImmersion"' : 'class="zg-item-immersion"', 
                this.bestSellersPatternEnd = n ? 'class="zg_clear"' : "</li>", this.estSalesPercentage = 100;
            }
            getTitle(n) {
                var o = n.find("#btAsinTitle").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 === o || 0 == o.length ? "" : o[0].nodeValue.trim();
            }
            getDescription(n) {
                var o = n.find("#bookDescription_feature_div noscript");
                return o.length > 0 ? (0, a.$)(o.text()).text().trim() : (o = n.find("#bookDescription_feature_div .a-expander-content")).length > 0 ? o.text() : n.find("#outer_postBodyPS").text().trim();
            }
            getKindleEditionRow(n) {
                var o, r = this;
                return n.find(".tp").find("tr").each((function() {
                    (0, a.$)(this).text().indexOf(r.searchPattern) > 0 && (o = (0, a.$)(this));
                })), o;
            }
            getUrlFromKindleEditionRow(n) {
                return n.find(".tpType > a:first").attr("href");
            }
            getPriceFromKindleEditionRow(n) {
                var o = n.find(".toeOurPrice > a:first");
                return o.length > 0 ? o : n.find(".toeOurPriceWithRent > a:first");
            }
            getReviewsCountFromResult(n) {
                return n.find(".reviewsCount > a:first").text();
            }
            parsePrice(n) {
                return n ? n.toString().toLowerCase() == this.free ? 0 : s.W.parseFloat(n, this.decimalSeparator) : 0;
            }
            formatPrice(n) {
                return this.currencySign + n;
            }
            getGoogleImageSearchUrlRel(n, o, r) {
                var s = n.find("#ebooksImgBlkFront, #imgBlkFront").attr("data-a-dynamic-image");
                if (void 0 !== s) {
                    var a = JSON.parse(s), l = Object.keys(a);
                    return r(l.length > 0 ? l[0] : "undefined");
                }
                return r(n.find("#main-image").attr("data-src") || "undefined");
            }
            getImageUrlSrc(n) {
                return s.W.parseString(n.find("#holderMainImage noscript").text(), "src=", '"', '" ');
            }
            getReviews(n) {
                var o = n.find("#acr .acrCount a:first");
                return o.length > 0 ? (0, a.$)(o).text().trim() : (o = n.find("#acrCustomerReviewText:eq(0)")).length ? (0, 
                a.$)(o).text().replace("customer reviews", "").replace("customer review", "").replace("ratings", "").replace("rating", "").trim() : "0";
            }
            getRating(n) {
                var o = n.find(".arp-rating-out-of-text:contains('out of')");
                if (0 === o.length && (o = n.find('[data-hook="rating-out-of-text"]')), void 0 !== o || "" != o) return o.text().split("out of")[0].trim().replace(",", ".");
            }
            getAsin(n) {
                let o = n.find("#detailBullets_feature_div li span > span:contains(ASIN)+span");
                return o = o.text().trim(), o || (o = n.find("#detailBullets_feature_div li span > span:contains(ISBN-13)+span").text().trim()), 
                o || (o = n.find("#detailsAsin > td > span").text().trim()), o || "n/a";
            }
            getTotalSearchResult(n) {
                var o = n.find("#s-result-count").text();
                o || (o = (0, a.$)(n.find("#search .a-section span")[0]).text());
                var r = -1 != o.indexOf("of") ? o.indexOf("of") + 3 : 0;
                return o.substring(r, o.indexOf("results") - 1);
            }
            getPrintLength(n) {
                const o = n.find("#aboutEbooksSection span a:first");
                if (o.length > 0 && !isNaN(parseInt(o.text().trim()))) return parseInt(o.text()).toString();
                let r = n.find("#productDetailsTable .content li:contains(pages), #detailBullets_feature_div li span > span:contains(pages)");
                if (r.find("b").remove(), r = r.text().trim(), r.length > 0) return parseInt(r).toString();
                let s = n.find("#detailsListeningLength td");
                if (s.length) {
                    let n = s.text().trim(), o = this.getAudioBookLengthRegex().exec(n);
                    if (!o.groups.minutes && !o.groups.hours) return null;
                    let r = o.groups.hours || "00", a = o.groups.minutes || "00";
                    return 1 === r.length && (r = `0${r}`), 1 === a.length && (a = `0${a}`), `${r}:${a}`;
                }
                return null;
            }
            getAuthor(n) {
                var o = n.find("#byline a.contributorNameID");
                if (o.length > 0) return o.text().trim();
                var r = n.find("#byline span.author a:first");
                return r.length > 0 ? r.text().trim() : null;
            }
            getPrice(n) {
                var o = n.find('#tmmSwatches .a-button-text span:contains("Kindle")').next().next(), r = (0, 
                a.$)(o.find(".a-color-price")).contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 !== r && 0 !== r.length ? r[0].nodeValue.trim() : void 0 === (r = (0, 
                a.$)(o.find("span")).contents().filter((function() {
                    return 3 == this.nodeType;
                }))) || 0 === r.length ? null : r[0].nodeValue.trim();
            }
            getBookTypes() {
                return {
                    Flexibound: "Flexibound",
                    "Spiral-bound": "Spiral-bound",
                    "Ring-bound": "Ring-bound",
                    "Board book": "Board book",
                    Diary: "Diary",
                    "Mass Market Paperback": "Mass Market Paperback",
                    Paperback: "Paperback",
                    Hardcover: "Hardcover"
                };
            }
            getAudioBookTypes() {
                return {
                    "Audible Audiobook": "Audiobook",
                    Audiobook: "Audiobook"
                };
            }
            getAllBookTypes() {
                return Object.assign(this.getBookTypes(), this.getAudioBookTypes());
            }
            getAudioBookLengthRegex() {
                return /(?:(?<hours>\d+) hours?)?(?: and )?(?:(?<minutes>\d+)? minutes?)?/;
            }
            getRankNo(n) {
                return s.W.parseString(n, 'class="zg-badge-text"', ">#", "<");
            }
            overrideAuthorPageFormat(n) {
                if (n.includes("/stores/") && !n.includes("/allbooks")) return `${n.replace("/about", "")}/allbooks`;
                return `${n}/?node=283155&pageSize=20`;
            }
        }
        AmazonComParser.zone = "com", AmazonComParser.region = "USA";
    },
    127: (n, o, r) => {
        "use strict";
        r.d(o, {
            $_: () => AmazonAuParser,
            GW: () => AmazonBrParser,
            ir: () => AmazonCaParser,
            kA: () => AmazonCoUkParser,
            O$: () => l.O,
            vE: () => AmazonDeParser,
            _H: () => AmazonEsParser,
            y_: () => AmazonFrParser,
            Wu: () => AmazonInParser,
            gu: () => AmazonItParser,
            GB: () => AmazonJpParser,
            wJ: () => AmazonMxParser
        });
        var s = r(357), a = r(534);
        class AmazonJpParser {
            constructor() {
                this.mainUrl = "//www.amazon." + AmazonJpParser.zone, this.completionUrl = "https://completion.amazon." + AmazonJpParser.zone + "/search/complete?method=completion&search-alias=digital-text&client=amazon-search-ui&mkt=6", 
                this.region = AmazonJpParser.region, this.areYouAnAuthorPattern = "\u8457\u8005\u306e\u7686\u3055\u307e\u3078", 
                this.free = "\u7121\u6599", this.currencySign = "\uffe5", this.currencySignForExport = "\uffe5", 
                this.decimalSeparator = ".", this.thousandSeparator = ",";
                const n = "undefined" != typeof window && (0, a.$)(".zg_rankDiv").length;
                this.bestSellerResultsNumber = n || ("undefined" == typeof window ? 50 : (0, a.$)(".zg-badge-text").length), 
                this.searchResultsNumber = 16, this.authorResultsNumber = 24, this.publisher = "\u51fa\u7248\u793e", 
                this.searchKeys = [ "to buy", "to rent" ], this.numberSign = "\u4f4d", this.searchPattern = "Kindle\u7248", 
                this.bestSellersPatternStart = n ? 'class="zg_itemRow"' : 'class="zg-item-immersion"', 
                this.bestSellersPatternEnd = n ? 'class="zg_clear"' : "</li>", this.estSalesPercentage = 9;
            }
            getTitle(n) {
                var o = n.find("#btAsinTitle").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 === o || 0 == o.length ? "" : o[0].nodeValue.trim();
            }
            getDescription(n) {
                var o = n.find("#bookDescription_feature_div noscript");
                return o.length > 0 ? (0, a.$)(o.text()).text().trim() : (o = n.find("#bookDescription_feature_div .a-expander-content")).length > 0 ? o.text() : n.find("#outer_postBodyPS").text().trim();
            }
            getKindleEditionRow(n) {
                var o, r = this;
                return n.find(".tp").find("tr").each((function() {
                    (0, a.$)(this).text().indexOf(r.searchPattern) > 0 && (o = (0, a.$)(this));
                })), o;
            }
            getUrlFromKindleEditionRow(n) {
                return n.find(".tpType > a:first").attr("href");
            }
            getPriceFromKindleEditionRow(n) {
                var o = n.find(".toeOurPrice > a:first");
                return o.length > 0 ? o : n.find(".toeOurPriceWithRent > a:first");
            }
            getReviewsCountFromResult(n) {
                return n.find(".reviewsCount > a:first").text();
            }
            parsePrice(n) {
                return n ? n.toString().toLowerCase() == this.free ? 0 : s.W.parseFloat(n, this.decimalSeparator) : 0;
            }
            formatPrice(n) {
                return this.currencySign + n;
            }
            getGoogleImageSearchUrlRel(n, o, r) {
                var s = n.find("#imgBlkFront").attr("data-a-dynamic-image");
                if (void 0 !== s) {
                    var a = JSON.parse(s), l = Object.keys(a);
                    return r(l.length > 0 ? l[0] : "undefined");
                }
                return r(n.find("#main-image").attr("data-src") || "undefined");
            }
            getImageUrlSrc(n) {
                return s.W.parseString(n.find("#holderMainImage noscript").text(), "src=", '"', '" ');
            }
            getReviews(n) {
                var o = n.find("#acr .acrCount a:first");
                return o.length > 0 ? (0, a.$)(o).text().trim() : (o = n.find("#acrCustomerReviewText:eq(0)")).length ? (0, 
                a.$)(o).text().replace("\u4ef6\u306e\u30ab\u30b9\u30bf\u30de\u30fc\u30ec\u30d3\u30e5\u30fc", "").replace("\u4ef6\u30ab\u30b9\u30bf\u30de\u30fc\u30ec\u30d3\u30e5\u30fc", "").replace("customer reviews", "").replace("customer review", "").replace("\u500b\u306e\u8a55\u4fa1", "").trim() : "0";
            }
            getRating(n) {
                var o = n.find("#avgRating span");
                if (0 === o.length && (o = n.find("#acrPopover")), void 0 !== o || "" != o) {
                    var r = o.text().split("\u3064\u661f\u306e\u3046\u3061")[1];
                    return null == r ? null : r.trim();
                }
            }
            getAsin(n) {
                let o = n.find("#detailBullets_feature_div li span > span:contains(ASIN)+span");
                return o = o.text().trim(), o || (o = n.find("#detailBullets_feature_div li span > span:contains(ISBN-13)+span").text().trim()), 
                o || (o = n.find("#detailsAsin > td > span").text().trim()), o || "n/a";
            }
            getTotalSearchResult(n) {
                var o = n.find("#s-result-count").text();
                o || (o = (0, a.$)(n.find("#search .a-section span")[0]).text());
                var r = -1 != o.indexOf("\u691c\u7d22\u7d50\u679c") ? o.indexOf("\u691c\u7d22\u7d50\u679c") + 4 : 0, s = o.substring(r, o.indexOf("\u4ef6\u4e2d")).trim();
                return "" !== s ? s : o.substring(0, o.indexOf("\u4ef6\u306e\u7d50\u679c")).trim();
            }
            getPrintLength(n) {
                var o = n.find("#aboutEbooksSection span a:first");
                if (o.length > 0) return parseInt(o.text()).toString();
                var r = n.find("#productDetailsTable li:contains('\u30da\u30fc\u30b8')").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                if (void 0 !== r && 0 !== r.length || (r = n.find("#detail_bullets_id li:contains('\u30da\u30fc\u30b8'), #detailBullets_feature_div li span > span:contains('\u30da\u30fc\u30b8')").contents().filter((function() {
                    return 3 == this.nodeType;
                }))), void 0 !== r && 0 !== r.length) return r[0].nodeValue.replace("\u30da\u30fc\u30b8", "").trim();
                let s = n.find("#detailsListeningLength td");
                if (s.length) {
                    let n = s.text().trim(), o = this.getAudioBookLengthRegex().exec(n);
                    if (!o.groups.minutes && !o.groups.hours) return null;
                    let r = o.groups.hours || "00", a = o.groups.minutes || "00";
                    return 1 === r.length && (r = `0${r}`), 1 === a.length && (a = `0${a}`), `${r}:${a}`;
                }
                return null;
            }
            getAuthor(n) {
                var o = n.find("#byline a.contributorNameID");
                if (o.length > 0) return o.text().trim();
                var r = n.find("#byline span.author a:first");
                return r.length > 0 ? r.text().trim() : null;
            }
            getPrice(n) {
                var o = n.find('#tmmSwatches .a-button-text span:contains("Kindle")').next().next(), r = (0, 
                a.$)(o.find(".a-color-price")).contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 !== r && 0 !== r.length ? r[0].nodeValue.trim() : void 0 === (r = (0, 
                a.$)(o.find("span")).contents().filter((function() {
                    return 3 == this.nodeType;
                }))) || 0 === r.length ? null : r[0].nodeValue.trim();
            }
            getSalesRank(n) {
                var o, r = n.find("#SalesRank").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                if (void 0 !== r && r.length >= 2) {
                    if (void 0 === (o = r[1].nodeValue.trim()) || "" == o) return "0";
                    var s = o.substring(0, o.indexOf(this.numberSign)).split("-");
                    return s[s.length - 1];
                }
                var a = (o = void 0 !== (r = n.find("#detailBullets_feature_div+ul>li>span:eq(0)").contents().filter((function() {
                    return 3 == this.nodeType;
                }))) && r.length >= 2 ? r[1].nodeValue.trim() : (r = n.find("#detailsNarrationAccent").length ? n.find("#detailsNarrationAccent+tr > td > span > span:eq(0)") : n.find("#detailsAsin+tr > td > span > span:eq(0)")).text().trim()).match(/(\d+(?:[\.\,]?\d*)*)\u4f4d/);
                return a ? a[1].replace(/,/g, "") : "0";
            }
            getBookTypes() {
                return {
                    "\u5358\u884c\u672c\uff08\u30bd\u30d5\u30c8\u30ab\u30d0\u30fc\uff09": "Paperback",
                    \u30da\u30fc\u30d1\u30fc\u30d0\u30c3\u30af: "Paperback",
                    \u5358\u884c\u672c: "Hardcover",
                    \u30cf\u30fc\u30c9\u30ab\u30d0\u30fc: "Hardcover"
                };
            }
            getAudioBookTypes() {
                return {
                    Audible\u7248: "Audiobook"
                };
            }
            getCanonicalTypeName(n) {
                return this.getAllBookTypes()[n] || n;
            }
            getAllBookTypes() {
                return Object.assign(this.getBookTypes(), this.getAudioBookTypes());
            }
            getAudioBookLengthRegex() {
                return /(?:(?<hours>\d+) \u6642\u9593?)? ?(?:(?<minutes>\d+)? \u5206)?/i;
            }
            overrideAuthorPageFormat(n) {
                if (n.includes("/stores/") && !n.includes("/allbooks")) return `${n.replace("/about", "")}/allbooks`;
                return `${n}/?node=465392&pageSize=20`;
            }
        }
        AmazonJpParser.zone = "co.jp", AmazonJpParser.region = "JP";
        class AmazonAuParser {
            constructor() {
                this.mainUrl = "//www.amazon.com." + AmazonAuParser.zone, this.completionUrl = "https://completion.amazon." + AmazonJpParser.zone + "/search/complete?method=completion&search-alias=digital-text&client=amazon-search-ui&mkt=111172&l=en_AU", 
                this.region = AmazonAuParser.region, this.free = "free", this.currencySign = "$", 
                this.currencySignForExport = "$", this.decimalSeparator = ".", this.thousandSeparator = ",";
                const n = "undefined" != typeof window && (0, a.$)(".zg_rankDiv").length;
                this.bestSellerResultsNumber = n || ("undefined" == typeof window ? 50 : (0, a.$)(".zg-badge-text").length), 
                this.searchResultsNumber = 16, this.authorResultsNumber = 16, this.publisher = "Publisher", 
                this.publicationDate = "Date Published", this.searchKeys = [ "to buy", "to rent" ], 
                this.numberSign = "#", this.searchPattern = "Kindle Edition", this.bestSellersPatternStart = n ? 'class="zg_itemImmersion"' : 'class="zg-item-immersion"', 
                this.bestSellersPatternEnd = n ? 'class="zg_clear"' : "</li>", this.estSalesPercentage = 15;
            }
            getTitle(n) {
                var o = n.find("#btAsinTitle>span").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 === o || 0 == o.length ? "" : o[0].nodeValue.trim();
            }
            getDescription(n) {
                var o = n.find("#bookDescription_feature_div noscript");
                return o.length > 0 ? (0, a.$)(o.text()).text().trim() : (o = n.find("#bookDescription_feature_div .a-expander-content")).length > 0 ? o.text() : n.find("#outer_postBodyPS").text().trim();
            }
            getKindleEditionRow(n) {
                var o, r = this;
                return n.find(".tp").find("tr").each((function() {
                    (0, a.$)(this).text().indexOf(r.searchPattern) > 0 && (o = (0, a.$)(this));
                })), o;
            }
            getUrlFromKindleEditionRow(n) {
                return n.find(".tpType > a:first").attr("href");
            }
            getPriceFromKindleEditionRow(n) {
                var o = n.find(".toeOurPrice > a:first");
                return o.length > 0 ? o : n.find(".toeOurPriceWithRent > a:first");
            }
            getReviewsCountFromResult(n) {
                return n.find(".reviewsCount > a:first").text();
            }
            parsePrice(n) {
                return n ? n.toString().toLowerCase() == this.free ? 0 : s.W.parseFloat(n, this.decimalSeparator) : 0;
            }
            formatPrice(n) {
                return this.currencySign + n;
            }
            getGoogleImageSearchUrlRel(n, o, r) {
                var s = n.find("#ebooksImgBlkFront, #imgBlkFront").attr("data-a-dynamic-image");
                if (void 0 !== s) {
                    var a = JSON.parse(s), l = Object.keys(a);
                    return r(l.length > 0 ? l[0] : "undefined");
                }
                return r(n.find("#main-image").attr("data-src") || "undefined");
            }
            getImageUrlSrc(n) {
                return s.W.parseString(n.find("#holderMainImage noscript").text(), "src=", '"', '" ');
            }
            getReviews(n) {
                var o = n.find("#acr .acrCount a:first");
                return o.length > 0 ? (0, a.$)(o).text().trim() : (o = n.find("#acrCustomerReviewText:eq(0)")).length ? (0, 
                a.$)(o).text().replace("customer reviews", "").replace("customer review", "").replace("ratings", "").replace("rating", "").trim() : "0";
            }
            getRating(n) {
                var o = n.find("#avgRating span");
                if (0 === o.length && (o = n.find("#revSum .acrRating:contains('out of')")), 0 === o.length && (o = n.find('[data-hook="rating-out-of-text"]')), 
                void 0 !== o || "" != o) return o.text().split("out of")[0].trim().replace(",", ".");
            }
            getAsin(n) {
                let o = n.find("#detailBullets_feature_div li span > span:contains(ASIN)+span");
                return o = o.text().trim(), o || (o = n.find("#detailBullets_feature_div li span > span:contains(ISBN-13)+span").text().trim()), 
                o || (o = n.find("#detailsAsin > td > span").text().trim()), o || "n/a";
            }
            getTotalSearchResult(n) {
                var o = n.find("#s-result-count").text();
                o || (o = (0, a.$)(n.find("#search .a-section span")[0]).text());
                var r = -1 != o.indexOf("of") ? o.indexOf("of") + 3 : 0;
                return o.substring(r, o.indexOf("results") - 1);
            }
            getPrintLength(n) {
                var o = n.find("#aboutEbooksSection span a:first");
                if (o.length > 0) return parseInt(o.text()).toString();
                var r = n.find("#productDetailsTable .content li:contains(pages)").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                if (void 0 !== r && 0 !== r.length || (r = n.find("#detail_bullets_id li:contains('pages'), #detailBullets_feature_div li span > span:contains('pages')").contents().filter((function() {
                    return 3 == this.nodeType;
                }))), void 0 !== r && 0 !== r.length) return r[0].nodeValue.replace("pages", "").trim();
                let s = n.find("#detailsListeningLength td");
                if (s.length) {
                    let n = s.text().trim(), o = this.getAudioBookLengthRegex().exec(n);
                    if (!o.groups.minutes && !o.groups.hours) return null;
                    let r = o.groups.hours || "00", a = o.groups.minutes || "00";
                    return 1 === r.length && (r = `0${r}`), 1 === a.length && (a = `0${a}`), `${r}:${a}`;
                }
                return null;
            }
            getAuthor(n) {
                var o = n.find("#byline a.contributorNameID");
                if (o.length > 0) return o.text().trim();
                var r = n.find("#byline span.author a:first");
                return r.length > 0 ? r.text().trim() : null;
            }
            getPrice(n) {
                var o = n.find('#tmmSwatches .a-button-text span:contains("Kindle")').next().next(), r = (0, 
                a.$)(o.find(".a-color-price")).contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 !== r && 0 !== r.length ? r[0].nodeValue.trim() : void 0 === (r = (0, 
                a.$)(o.find("span")).contents().filter((function() {
                    return 3 == this.nodeType;
                }))) || 0 === r.length ? null : r[0].nodeValue.trim();
            }
            getBookTypes() {
                return {
                    Paperback: "Paperback",
                    Hardcover: "Hardcover"
                };
            }
            getAudioBookTypes() {
                return {
                    "Audible Audiobook": "Audiobook",
                    Audiobook: "Audiobook"
                };
            }
            getAllBookTypes() {
                return Object.assign(this.getBookTypes(), this.getAudioBookTypes());
            }
            getAudioBookLengthRegex() {
                return /(?:(?<hours>\d+) hours?)?(?: and )?(?:(?<minutes>\d+)? minutes?)?/;
            }
            overrideAuthorPageFormat(n) {
                if (n.includes("/stores/") && !n.includes("/allbooks")) return `${n.replace("/about", "")}/allbooks`;
                return `${n}/?node=4851626051&pageSize=20`;
            }
        }
        AmazonAuParser.zone = "au", AmazonAuParser.region = "AU";
        var l = r(838);
        class AmazonBrParser {
            constructor() {
                this.mainUrl = "//www.amazon." + AmazonBrParser.zone, this.completionUrl = "https://completion.amazon." + l.O.zone + "/search/complete?method=completion&search-alias=digital-text&client=amazon-search-ui&mkt=1", 
                this.region = AmazonBrParser.region, this.areYouAnAuthorPattern = "Voc\xea \xe9 um autor?", 
                this.free = "livre", this.currencySign = "R$", this.currencySignForExport = "R$", 
                this.decimalSeparator = ",", this.thousandSeparator = ",";
                const n = "undefined" != typeof window && (0, a.$)(".zg_rankDiv").length;
                this.bestSellerResultsNumber = n || ("undefined" == typeof window ? 50 : (0, a.$)(".zg-badge-text").length), 
                this.searchResultsNumber = 16, this.authorResultsNumber = 24, this.publisher = "Editora", 
                this.searchKeys = [ "comprar", "alugar" ], this.numberSign = "N\xba", this.searchPattern = "eBook Kindle", 
                this.bestSellersPatternStart = n ? 'class="zg_itemRow"' : 'class="zg-item-immersion"', 
                this.bestSellersPatternEnd = n ? 'class="zg_clear"' : "</li>", this.estSalesPercentage = 4;
            }
            getTitle(n) {
                var o = n.find("#btAsinTitle>span").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 === o || 0 == o.length ? "" : o[0].nodeValue.trim();
            }
            getDescription(n) {
                var o = n.find("#bookDescription_feature_div noscript");
                return o.length > 0 ? (0, a.$)(o.text()).text().trim() : (o = n.find("#bookDescription_feature_div .a-expander-content")).length > 0 ? o.text() : n.find("#outer_postBodyPS").text().trim();
            }
            getKindleEditionRow(n) {}
            getUrlFromKindleEditionRow(n) {}
            getPriceFromKindleEditionRow(n) {}
            getReviewsCountFromResult(n) {}
            parsePrice(n) {
                return n.toString().toLowerCase() == this.free ? 0 : n ? s.W.parseFloat(n, this.decimalSeparator) : 0;
            }
            formatPrice(n) {
                return this.currencySign + n;
            }
            getGoogleImageSearchUrlRel(n, o, r) {
                var s = n.find("#ebooksImgBlkFront, #imgBlkFront").attr("data-a-dynamic-image");
                if (void 0 !== s) {
                    var a = JSON.parse(s), l = Object.keys(a);
                    return r(l.length > 0 ? l[0] : "undefined");
                }
                return r(n.find("#main-image").attr("data-src") || "undefined");
            }
            getReviews(n) {
                var o = n.find("#summaryStars a").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                if (void 0 === o || 0 == o.length) {
                    let o = n.find("#reviewFeatureGroup, #averageCustomerReviews_feature_div").find("#acrCustomerReviewText");
                    return o.length > 0 ? parseInt(o.text().trim()) : "0";
                }
                return o[1].nodeValue.replace("classifica\xe7\xf5es", "").replace("classifica\xe7\xe3o", "").trim();
            }
            getRating(n) {
                var o = n.find("#avgRating span:contains('de')");
                if (0 === o.length && (o = n.find('[data-hook="rating-out-of-text"]')), void 0 !== o || "" != o) return o.text().split("de")[0].trim().replace(",", ".");
            }
            getAsin(n) {
                let o = n.find("#detailBullets_feature_div li span > span:contains(ASIN)+span");
                return o = o.text().trim(), o || (o = n.find("#detailBullets_feature_div li span > span:contains(ISBN-13)+span").text().trim()), 
                o || "n/a";
            }
            getTotalSearchResult(n) {
                var o = n.find("#s-result-count").text();
                o || (o = (0, a.$)(n.find("#search .a-section span")[0]).text());
                var r = -1 != o.indexOf("de mais de") ? o.indexOf("de mais de") + 11 : 0;
                return o.substring(r, o.indexOf("resultados") - 1);
            }
            getPrintLength(n) {
                const o = n.find("#aboutEbooksSection span a:first");
                if (o.length > 0 && !isNaN(parseInt(o.text().trim()))) return parseInt(o.text()).toString();
                let r = n.find("#productDetailsTable .content li:contains(p\xe1ginas), #detailBullets_feature_div li span > span:contains(p\xe1ginas):not(.a-text-bold)").eq(0);
                return r.find("b").remove(), r = r.text().trim(), r.length > 0 ? parseInt(r).toString() : null;
            }
            getPrice(n) {
                var o = n.find('#tmmSwatches .a-button-text span:contains("Kindle")').next().next(), r = (0, 
                a.$)(o.find(".a-color-price")).contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 !== r && 0 !== r.length ? r[0].nodeValue.trim() : void 0 === (r = (0, 
                a.$)(o.find("span")).contents().filter((function() {
                    return 3 == this.nodeType;
                }))) || 0 === r.length ? null : r[0].nodeValue.trim();
            }
            getSalesRank(n) {
                var o = n.find("#SalesRank").contents().filter((function() {
                    return 3 == this.nodeType;
                })), r = "";
                if (void 0 === o || o.length < 2) {
                    if (void 0 === (o = n.find("#detailBullets_feature_div+ul>li>span:eq(0)").contents().filter((function() {
                        return 3 == this.nodeType;
                    }))) || o.length < 2) return "0";
                    var s = (r = o[1].nodeValue.trim()).match(/(?:Nr\.|N\xba|#|n\.)?\s?(\d+(?:[\.\,]?\d*)*)/);
                    return s ? s[1].replace(/,/g, "") : "0";
                }
                return void 0 === (r = o[0].nodeValue.trim()) || "" === r ? "0" : r.includes("N\xba") ? r.substring(r.indexOf("N\xba") + "N\xba".length, r.indexOf("a")) : r.substring(r.indexOf(this.numberSign) + this.numberSign.length, r.indexOf("em"));
            }
            getBookTypes() {
                return {
                    "Capa comum": "Paperback",
                    "Capa dura": "Hardcover"
                };
            }
            getAudioBookTypes() {
                return {};
            }
            getAllBookTypes() {
                return Object.assign(this.getBookTypes(), this.getAudioBookTypes());
            }
            overrideAuthorPageFormat(n) {
                if (n.includes("/stores/") && !n.includes("/allbooks")) return `${n.replace("/about", "")}/allbooks`;
                return `${n}/?node=6740748011&pageSize=20`;
            }
        }
        AmazonBrParser.zone = "com.br", AmazonBrParser.region = "BR";
        class AmazonCaParser {
            constructor() {
                this.mainUrl = "//www.amazon." + AmazonCaParser.zone, this.completionUrl = "https://completion.amazon." + l.O.zone + "/search/complete?method=completion&search-alias=digital-text&client=amazon-search-ui&mkt=7", 
                this.region = AmazonCaParser.region, this.free = "free", this.currencySign = "$", 
                this.currencySignForExport = "$", this.decimalSeparator = ".", this.thousandSeparator = ",";
                const n = "undefined" != typeof window && (0, a.$)(".zg_rankDiv").length;
                this.bestSellerResultsNumber = n || ("undefined" == typeof window ? 50 : (0, a.$)(".zg-badge-text").length), 
                this.searchResultsNumber = 16, this.authorResultsNumber = 16, this.publisher = "Publisher", 
                this.publicationDate = "Date Published", this.searchKeys = [ "to buy", "to rent" ], 
                this.numberSign = "#", this.searchPattern = "Kindle Edition", this.bestSellersPatternStart = n ? 'class="zg_itemImmersion"' : 'class="zg-item-immersion"', 
                this.bestSellersPatternEnd = n ? 'class="zg_clear"' : "</li>", this.estSalesPercentage = 13;
            }
            getTitle(n) {
                var o = n.find("#btAsinTitle>span").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 === o || 0 == o.length ? "" : o[0].nodeValue.trim();
            }
            getDescription(n) {
                var o = n.find("#bookDescription_feature_div noscript");
                return o.length > 0 ? (0, a.$)(o.text()).text().trim() : (o = n.find("#bookDescription_feature_div .a-expander-content")).length > 0 ? o.text() : n.find("#outer_postBodyPS").text().trim();
            }
            getKindleEditionRow() {}
            getUrlFromKindleEditionRow() {}
            getPriceFromKindleEditionRow() {}
            getReviewsCountFromResult() {}
            parsePrice(n) {
                return n.toString().toLowerCase() == this.free ? 0 : n ? s.W.parseFloat(n, this.decimalSeparator) : 0;
            }
            formatPrice(n) {
                return this.currencySign + n;
            }
            getGoogleImageSearchUrlRel(n, o, r) {
                var s = n.find("#ebooksImgBlkFront, #imgBlkFront").attr("data-a-dynamic-image");
                if (void 0 !== s) {
                    var a = JSON.parse(s), l = Object.keys(a);
                    return r(l.length > 0 ? l[0] : "undefined");
                }
                return r(n.find("#main-image").attr("data-src") || "undefined");
            }
            getReviews(n) {
                var o = n.find("#acrCustomerReviewText:eq(0)");
                return o.length ? (0, a.$)(o).text().replace("customer reviews", "").replace("customer review", "").replace("ratings", "").replace("rating", "").trim() : "0";
            }
            getRating(n) {
                var o = n.find("#avgRating span:contains('out of')");
                if (0 === o.length && (o = n.find('[data-hook="rating-out-of-text"]')), void 0 !== o || "" != o) return o.text().split("out of")[0].trim().replace(",", ".");
            }
            getAsin(n) {
                let o = n.find("#detailBullets_feature_div li span > span:contains(ASIN)+span");
                return o = o.text().trim(), o || (o = n.find("#detailBullets_feature_div li span > span:contains(ISBN-13)+span").text().trim()), 
                o || (o = n.find("#detailsAsin > td > span").text().trim()), o || "n/a";
            }
            getTotalSearchResult(n) {
                var o = n.find("#s-result-count").text();
                o || (o = (0, a.$)(n.find("#search .a-section span")[0]).text());
                var r = -1 != o.indexOf("of") ? o.indexOf("of") + 3 : 0;
                return o.substring(r, o.indexOf("results") - 1);
            }
            getPrintLength(n) {
                var o = n.find("#productDetailsTable .content li:contains(pages)").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                if (void 0 !== o && 0 !== o.length || (o = n.find("#detail_bullets_id li:contains('pages'), #detailBullets_feature_div li span > span:contains('pages')").contents().filter((function() {
                    return 3 == this.nodeType;
                }))), void 0 !== o && 0 !== o.length) return o[0].nodeValue.replace("pages", "").trim();
                let r = n.find("#detailsListeningLength td");
                if (r.length) {
                    let n = r.text().trim(), o = this.getAudioBookLengthRegex().exec(n);
                    if (!o.groups.minutes && !o.groups.hours) return null;
                    let s = o.groups.hours || "00", a = o.groups.minutes || "00";
                    return 1 === s.length && (s = `0${s}`), 1 === a.length && (a = `0${a}`), `${s}:${a}`;
                }
                return null;
            }
            getBookTypes() {
                return {
                    Paperback: "Paperback",
                    Hardcover: "Hardcover"
                };
            }
            getAudioBookTypes() {
                return {
                    "Audible Audiobook": "Audiobook",
                    Audiobook: "Audiobook"
                };
            }
            getAllBookTypes() {
                return Object.assign(this.getBookTypes(), this.getAudioBookTypes());
            }
            getAudioBookLengthRegex() {
                return /(?:(?<hours>\d+) hours?)?(?: and )?(?:(?<minutes>\d+)? minutes?)?/;
            }
            overrideAuthorPageFormat(n) {
                if (n.includes("/stores/") && !n.includes("/allbooks")) return `${n.replace("/about", "")}/allbooks`;
                return `${n}/?node=916520&pageSize=20`;
            }
        }
        AmazonCaParser.zone = "ca", AmazonCaParser.region = "CA";
        class AmazonCoUkParser {
            constructor() {
                this.mainUrl = "//www.amazon." + AmazonCoUkParser.zone, this.completionUrl = "https://completion.amazon." + AmazonCoUkParser.zone + "/search/complete?method=completion&search-alias=digital-text&client=amazon-search-ui&mkt=3", 
                this.region = AmazonCoUkParser.region, this.areYouAnAuthorPattern = "Are You an Author", 
                this.free = "free", this.currencySign = "&pound;", this.currencySignForExport = "\xa3", 
                this.thousandSeparator = ",", this.decimalSeparator = ".";
                const n = "undefined" != typeof window && (0, a.$)(".zg_rankDiv").length;
                this.bestSellerResultsNumber = n || ("undefined" == typeof window ? 50 : (0, a.$)(".zg-badge-text").length), 
                this.searchResultsNumber = 16, this.authorResultsNumber = 16, this.publisher = "Publisher", 
                this.publicationDate = "Date Published", this.searchKeys = [ "to buy", "to rent" ], 
                this.numberSign = "#", this.searchPattern = "Kindle Edition", this.bestSellersPatternStart = n ? 'class="zg_itemImmersion"' : 'class="zg-item-immersion"', 
                this.bestSellersPatternEnd = n ? 'class="zg_clear"' : "</li>", this.estSalesPercentage = 23;
            }
            getTitle(n) {
                var o = n.find("#btAsinTitle>span").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 === o || 0 == o.length ? "" : o[0].nodeValue.trim();
            }
            getDescription(n) {
                var o = n.find("#bookDescription_feature_div noscript");
                return o.length > 0 ? (0, a.$)(o.text()).text().trim() : (o = n.find("#bookDescription_feature_div .a-expander-content")).length > 0 ? o.text() : n.find("#outer_postBodyPS").text().trim();
            }
            getKindleEditionRow(n) {
                var o;
                return n.find("li").each((function() {
                    ((0, a.$)(this).text().indexOf("Kindle Edition") > 0 || (0, a.$)(this).text().indexOf("Kindle Purchase") > 0) && (o = (0, 
                    a.$)(this));
                })), o;
            }
            getUrlFromKindleEditionRow(n) {
                return n.find("a:first").attr("href");
            }
            getPriceFromKindleEditionRow(n) {
                return n.find("span.bld");
            }
            getReviewsCountFromResult(n) {
                return n.find(".rvwCnt > a:first").text();
            }
            parsePrice(n) {
                return n.toString().toLowerCase() == this.free ? 0 : n ? s.W.parseFloat(n, this.decimalSeparator) : 0;
            }
            formatPrice(n) {
                return this.currencySign + n;
            }
            getGoogleImageSearchUrlRel(n, o, r) {
                var s = n.find("#ebooksImgBlkFront, #imgBlkFront").attr("data-a-dynamic-image");
                if (void 0 !== s) {
                    var a = JSON.parse(s), l = Object.keys(a);
                    return r(l.length > 0 ? l[0] : "undefined");
                }
                return r(n.find("#main-image").attr("data-src") || "undefined");
            }
            getReviews(n) {
                var o = n.find("#summaryStars a").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 !== o && 0 != o.length ? o[1].nodeValue.replace("reviews", "").replace("review", "").replace("customer", "").replace(/ratings?/gi, "").trim() : (o = n.find("#acrCustomerReviewText:eq(0)")).length ? (0, 
                a.$)(o).text().replace("customer reviews", "").replace("customer review", "").replace(/ratings?/gi, "").trim() : "0";
            }
            getRating(n) {
                var o = n.find("#revSum .acrRating:contains('out of')");
                if (0 === o.length && (o = n.find('[data-hook="rating-out-of-text"]')), void 0 !== o || "" != o) return o.text().split("out of")[0].trim().replace(",", ".");
            }
            getAsin(n) {
                let o = n.find("#detailBullets_feature_div li span > span:contains(ASIN)+span");
                return o = o.text().trim(), o || (o = n.find("#detailBullets_feature_div li span > span:contains(ISBN-13)+span").text().trim()), 
                o || (o = n.find("#detailsAsin > td > span").text().trim()), o || "n/a";
            }
            getTotalSearchResult(n) {
                var o = n.find("#s-result-count").text();
                o || (o = (0, a.$)(n.find("#search .a-section span")[0]).text());
                var r = -1 != o.indexOf("of") ? o.indexOf("of") + 3 : 0;
                return o.substring(r, o.indexOf("results") - 1).replace(/[^0-9]/g, "");
            }
            getPrintLength(n) {
                var o = n.find("#productDetailsTable li:contains('pages')").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                if (void 0 !== o && 0 !== o.length || (o = n.find("#detail_bullets_id li:contains('pages'), #detailBullets_feature_div li span > span:contains('pages')").contents().filter((function() {
                    return 3 == this.nodeType;
                }))), void 0 !== o && 0 !== o.length) return o[0].nodeValue.replace("pages", "").trim();
                let r = n.find("#detailsListeningLength td");
                if (r.length) {
                    let n = r.text().trim(), o = this.getAudioBookLengthRegex().exec(n);
                    if (!o.groups.minutes && !o.groups.hours) return null;
                    let s = o.groups.hours || "00", a = o.groups.minutes || "00";
                    return 1 === s.length && (s = `0${s}`), 1 === a.length && (a = `0${a}`), `${s}:${a}`;
                }
                return null;
            }
            getPrice(n) {
                var o = n.find(".swatchElement:contains('Kindle Edition') .a-button-inner .a-color-price");
                return void 0 === o || 0 == o.length ? "" : o.text().trim();
            }
            getAuthor(n) {
                var o = n.find(".author .contributorNameID");
                return void 0 === o || 0 == o.length ? "" : o.text().trim();
            }
            getBookTypes() {
                return {
                    Paperback: "Paperback",
                    Hardcover: "Hardcover"
                };
            }
            getAudioBookTypes() {
                return {
                    "Audible Audiobook": "Audiobook",
                    Audiobook: "Audiobook"
                };
            }
            getAllBookTypes() {
                return Object.assign(this.getBookTypes(), this.getAudioBookTypes());
            }
            getAudioBookLengthRegex() {
                return /(?:(?<hours>\d+) hours?)?(?: and )?(?:(?<minutes>\d+)? minutes?)?/;
            }
            overrideAuthorPageFormat(n) {
                if (n.includes("/stores/") && !n.includes("/allbooks")) return `${n.replace("/about", "")}/allbooks`;
                return `${n}/?node=266239&pageSize=20`;
            }
        }
        AmazonCoUkParser.zone = "co.uk", AmazonCoUkParser.region = "UK";
        class AmazonDeParser {
            constructor() {
                this.mainUrl = "//www.amazon." + AmazonDeParser.zone, this.completionUrl = "https://completion.amazon." + AmazonCoUkParser.zone + "/search/complete?method=completion&search-alias=digital-text&client=amazon-search-ui&mkt=4", 
                this.region = AmazonDeParser.region, this.areYouAnAuthorPattern = "Sind Sie ein Autor", 
                this.free = "gratis", this.currencySign = "&euro;", this.currencySignForExport = "\u20ac", 
                this.thousandSeparator = ".", this.decimalSeparator = ",";
                const n = "undefined" != typeof window && (0, a.$)(".zg_rankDiv").length;
                this.bestSellerResultsNumber = n || ("undefined" == typeof window ? 50 : (0, a.$)(".zg-badge-text").length), 
                this.searchResultsNumber = 16, this.authorResultsNumber = 16, this.publisher = "Herausgeber", 
                this.searchKeys = [ "kaufen", "to rent" ], this.numberSign = "#", this.searchPattern = "Kindle Ausgabe", 
                this.bestSellersPatternStart = n ? 'class="zg_itemImmersion"' : 'class="zg-item-immersion"', 
                this.bestSellersPatternEnd = n ? 'class="zg_clear"' : "</li>", this.estSalesPercentage = 14;
            }
            getTitle(n) {
                var o = n.find("#btAsinTitle>span").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 === o || 0 == o.length ? "" : o[0].nodeValue.trim();
            }
            getDescription(n) {
                var o = n.find("#bookDescription_feature_div noscript");
                return o.length > 0 ? (0, a.$)(o.text()).text().trim() : (o = n.find("#bookDescription_feature_div .a-expander-content")).length > 0 ? o.text() : n.find("#outer_postBodyPS").text().trim();
            }
            getKindleEditionRow(n) {
                var o;
                return n.find("li").each((function() {
                    ((0, a.$)(this).text().indexOf("Kindle Edition") > 0 && (0, a.$)(this).text().indexOf("andere Formate") < 0 || (0, 
                    a.$)(this).text().indexOf("Kindle-Kauf") > 0) && (o = (0, a.$)(this));
                })), o;
            }
            getUrlFromKindleEditionRow(n) {
                return n.find("a:first").attr("href");
            }
            getPriceFromKindleEditionRow(n) {
                return n.find("span.bld");
            }
            getReviewsCountFromResult(n) {
                return n.find(".rvwCnt > a:first").text();
            }
            parsePrice(n) {
                return n.toString().toLowerCase() == this.free ? 0 : n ? s.W.parseFloat(n, this.decimalSeparator) : 0;
            }
            formatPrice(n) {
                return this.currencySign + n;
            }
            getGoogleImageSearchUrlRel(n, o, r) {
                var s = n.find("#ebooksImgBlkFront, #imgBlkFront").attr("data-a-dynamic-image");
                if (void 0 !== s) {
                    var a = JSON.parse(s), l = Object.keys(a);
                    return r(l.length > 0 ? l[0] : "undefined");
                }
                return r(n.find("#main-image").attr("data-src") || "undefined");
            }
            getReviews(n) {
                var o = n.find("#summaryStars a").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 !== o && 0 != o.length ? o[1].nodeValue.replace("Rezensionen", "").replace("Rezension", "").replace("Sternebewertung", "").replace("Sternebewertungen", "").replace("ratings", "").replace("rating", "").replace("en", "").trim() : void 0 !== (o = n.find("#acrCustomerReviewText:eq(0)")) && 0 != o.length ? (0, 
                a.$)(o).eq(0).text().replace("Kundenrezensionen", "").replace("Kundenrezension", "").replace("Sternebewertung", "").replace("Sternebewertungen", "").replace("en", "").trim() : (o = n.find("#cmrs-atf")).length ? (0, 
                a.$)(o).text().replace("Kundenrezensionen auf Amazon.com", "").trim() : "0";
            }
            getRating(n) {
                var o = n.find("#avgRating span:contains('von')");
                if (0 === o.length && (o = n.find('[data-hook="rating-out-of-text"]')), void 0 !== o || "" != o) return o.text().split("von")[0].trim().replace(",", ".");
            }
            getAsin(n) {
                let o = n.find("#detailBullets_feature_div li span > span:contains(ASIN)+span");
                return o = o.text().trim(), o || (o = n.find("#detailBullets_feature_div li span > span:contains(ISBN-13)+span").text().trim()), 
                o || (o = n.find("#detailsAsin > td > span").text().trim()), o || "n/a";
            }
            getTotalSearchResult(n) {
                var o = n.find("#s-result-count").text();
                o || (o = (0, a.$)(n.find("#search .a-section span")[0]).text());
                var r = -1 != o.indexOf("von") ? o.indexOf("von") + 4 : 0, s = -1 != o.indexOf("Ergebnissen") ? o.indexOf("Ergebnissen") - 1 : o.indexOf("Ergebnisse") - 1;
                return o.substring(r, s);
            }
            getPrintLength(n) {
                var o = n.find("#productDetailsTable li:contains('Seiten')").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                if (void 0 !== o && 0 !== o.length || (o = n.find("#detail_bullets_id li:contains('Seiten'), #detailBullets_feature_div li span > span:not(.a-text-bold):contains('Seiten')").contents().filter((function() {
                    return 3 == this.nodeType;
                }))), void 0 !== o && 0 !== o.length) return o[0].nodeValue.replace("Seiten", "").trim();
                let r = n.find("#detailsListeningLength td");
                if (r.length) {
                    let n = r.text().trim(), o = this.getAudioBookLengthRegex().exec(n);
                    if (!o.groups.minutes && !o.groups.hours) return null;
                    let s = o.groups.hours || "00", a = o.groups.minutes || "00";
                    return 1 === s.length && (s = `0${s}`), 1 === a.length && (a = `0${a}`), `${s}:${a}`;
                }
                return null;
            }
            getPrice(n) {
                var o = n.find(".swatchElement:contains('Kindle Edition') .a-button-inner .a-color-price");
                return void 0 === o || 0 == o.length ? "" : o.text().trim();
            }
            getAuthor(n) {
                var o = n.find(".author .contributorNameID");
                return 0 === o.length && (o = n.find(".author .a-link-normal")), void 0 === o || 0 == o.length ? "" : o.text().trim();
            }
            getBookTypes() {
                return {
                    Taschenbuch: "Paperback",
                    Broschiert: "Paperback",
                    "Gebundene Ausgabe": "Hardcover",
                    "Gebundenes Buch": "Hardcover"
                };
            }
            getAudioBookTypes() {
                return {
                    "Audible H\xf6rbuch": "Audiobook",
                    H\u00f6rbuch: "Audiobook"
                };
            }
            getCanonicalTypeName(n) {
                return this.getAllBookTypes()[n] || n;
            }
            getAllBookTypes() {
                return Object.assign(this.getBookTypes(), this.getAudioBookTypes());
            }
            getAudioBookLengthRegex() {
                return /(?:(?<hours>\d+) Stunden?)?(?: und )?(?:(?<minutes>\d+)? Minuten?)?/i;
            }
            getSalesRank(n) {
                var o = n.find("#SalesRank").contents().filter((function() {
                    return 3 == this.nodeType;
                })), r = "";
                if (void 0 === (r = void 0 !== o && o.length >= 2 ? o[0].nodeValue.trim() : void 0 !== (o = n.find("#detailBullets_feature_div+ul>li>span:eq(0)").contents().filter((function() {
                    return 3 == this.nodeType;
                }))) && o.length >= 2 ? o[1].nodeValue.trim() : (o = n.find("#detailsNarrationAccent").length ? n.find("#detailsNarrationAccent+tr > td > span > span:eq(0)") : n.find("#detailsAsin+tr > td > span > span:eq(0)")).text().trim()) || !r) return "0";
                var s = r.match(/(?:Nr\.|#)?\s?(\d+(?:[\.\,]?\d*)*)/);
                return s ? s[1].replace(/,/g, "") : "0";
            }
            overrideAuthorPageFormat(n) {
                if (n.includes("/stores/") && !n.includes("/allbooks")) return `${n.replace("/about", "")}/allbooks`;
                return `${n}/?node=186606&pageSize=20`;
            }
        }
        AmazonDeParser.zone = "de", AmazonDeParser.region = "DE";
        class AmazonEsParser {
            constructor() {
                this.mainUrl = "//www.amazon." + AmazonEsParser.zone, this.completionUrl = "https://completion.amazon." + AmazonCoUkParser.zone + "/search/complete?method=completion&search-alias=digital-text&client=amazon-search-ui&mkt=44551&l=es_ES", 
                this.region = AmazonEsParser.region, this.free = "gratis", this.currencySign = "&euro;", 
                this.currencySignForExport = "\u20ac", this.thousandSeparator = ".", this.decimalSeparator = ",";
                const n = "undefined" != typeof window && (0, a.$)(".zg_rankDiv").length;
                this.bestSellerResultsNumber = n || ("undefined" == typeof window ? 50 : (0, a.$)(".zg-badge-text").length), 
                this.searchResultsNumber = 16, this.authorResultsNumber = 16, this.publisher = "Editorial", 
                this.searchKeys = [ "para comprar", "to rent" ], this.numberSign = decodeURI("n.?%C2%B0"), 
                this.searchPattern = decodeURI(encodeURI("Versi\xf3n Kindle")), this.bestSellersPatternStart = n ? 'class="zg_itemImmersion"' : 'class="zg-item-immersion"', 
                this.bestSellersPatternEnd = n ? 'class="zg_clear"' : "</li>", this.estSalesPercentage = 11;
            }
            getTitle(n) {
                var o = n.find("#btAsinTitle>span").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 === o || 0 == o.length ? "" : o[0].nodeValue.trim();
            }
            getDescription(n) {
                var o = n.find("#bookDescription_feature_div noscript");
                return o.length > 0 ? (0, a.$)(o.text()).text().trim() : (o = n.find("#bookDescription_feature_div .a-expander-content")).length > 0 ? o.text() : n.find("#outer_postBodyPS").text().trim();
            }
            getKindleEditionRow(n) {}
            getUrlFromKindleEditionRow(n) {}
            getPriceFromKindleEditionRow(n) {}
            getReviewsCountFromResult(n) {}
            parsePrice(n) {
                return n.toString().toLowerCase() == this.free ? 0 : n ? s.W.parseFloat(n, this.decimalSeparator) : 0;
            }
            formatPrice(n) {
                return this.currencySign + n;
            }
            getGoogleImageSearchUrlRel(n, o, r) {
                var s = n.find("#ebooksImgBlkFront, #imgBlkFront").attr("data-a-dynamic-image");
                if (void 0 !== s) {
                    var a = JSON.parse(s), l = Object.keys(a);
                    return r(l.length > 0 ? l[0] : "undefined");
                }
                return r(n.find("#main-image").attr("data-src") || "undefined");
            }
            getReviews(n) {
                let o = n.find("#acrCustomerReviewText:eq(0)").text().trim().match(/\d+/);
                if (o) return o[0] || 0;
                var r = n.find("#summaryStars a").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 === r || 0 == r.length ? "0" : r[1].nodeValue.replace("opiniones", "").replace(decodeURI("opini%C3%B3n"), "").trim();
            }
            getRating(n) {
                var o = n.find("#avgRating span:contains('de')");
                if (0 === o.length && (o = n.find('[data-hook="rating-out-of-text"]')), void 0 !== o || "" != o) return o.text().split("de")[0].trim().replace(",", ".");
            }
            getAsin(n) {
                let o = n.find("#detailBullets_feature_div li span > span:contains(ASIN)+span");
                return o = o.text().trim(), o || (o = n.find("#detailBullets_feature_div li span > span:contains(ISBN-13)+span").text().trim()), 
                o || (o = n.find("#detailsAsin > td > span").text().trim()), o || "n/a";
            }
            getTotalSearchResult(n) {
                var o = n.find("#s-result-count").text();
                o || (o = (0, a.$)(n.find("#search .a-section span")[0]).text());
                var r = -1 != o.indexOf("de") ? o.indexOf("de") + 3 : 0;
                return o.substring(r, o.indexOf("resultados para") - 1);
            }
            getPrintLength(n) {
                var o = n.find("#productDetailsTable li:contains('p\xe1ginas')").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                if (void 0 !== o && 0 !== o.length || (o = n.find("#detail_bullets_id li:contains('p\xe1ginas'), #detailBullets_feature_div li span > span:contains('p\xe1ginas')").contents().filter((function() {
                    return 3 == this.nodeType;
                }))), void 0 !== o && 0 !== o.length) return o[0].nodeValue.replace("p\xe1ginas", "").trim();
                if (o = n.find("#aboutEbooksSection").find("td:contains(Longitud)").find("a").text().replace("p\xe1ginas", "").trim()) return o;
                let r = n.find("#detailsListeningLength td");
                if (r.length) {
                    let n = r.text().trim(), o = this.getAudioBookLengthRegex().exec(n);
                    if (!o.groups.minutes && !o.groups.hours) return null;
                    let s = o.groups.hours || "00", a = o.groups.minutes || "00";
                    return 1 === s.length && (s = `0${s}`), 1 === a.length && (a = `0${a}`), `${s}:${a}`;
                }
                return null;
            }
            getPrice(n) {
                var o = (0, a.$)(n.find("#buybox .kindle-price td")[1]).contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 !== o && o.length > 0 ? o[0].nodeValue.trim() : void 0 === (o = (0, 
                a.$)(n.find('#tmmSwatches .a-button-text span:contains("Kindle")').next().next().find(".a-color-price")).contents().filter((function() {
                    return 3 == this.nodeType;
                }))) || 0 == o.length ? null : o[0].nodeValue.trim();
            }
            getSalesRank(n) {
                var o = n.find("#SalesRank").contents().filter((function() {
                    return 3 == this.nodeType;
                })), r = "";
                if (void 0 === (r = void 0 !== o && o.length >= 2 ? o[0].nodeValue.trim() : void 0 !== (o = n.find("#detailBullets_feature_div+ul>li>span:eq(0)").contents().filter((function() {
                    return 3 == this.nodeType;
                }))) && o.length >= 2 ? o[1].nodeValue.trim() : (o = n.find("#detailsNarrationAccent").length ? n.find("#detailsNarrationAccent+tr > td > span > span:eq(0)") : n.find("#detailsAsin+tr > td > span > span:eq(0)")).text().trim()) || !r) return "0";
                let s = /n[^\d]{1,2}/, a = r.match(s);
                return a && a[0] && (a = a[0].length), r.substring(r.search(s) + a, r.search(/de|en/)).replace(/,/g, "");
            }
            getBookTypes() {
                return {
                    "Tapa blanda": "Paperback",
                    "Tapa dura": "Hardcover"
                };
            }
            getAudioBookTypes() {
                return {
                    "Audible Audiolibro": "Audiobook",
                    Audiolibro: "Audiobook"
                };
            }
            getCanonicalTypeName(n) {
                return this.getAllBookTypes()[n] || n;
            }
            getAllBookTypes() {
                return Object.assign(this.getBookTypes(), this.getAudioBookTypes());
            }
            getAudioBookLengthRegex() {
                return /(?:(?<hours>\d+) horas?)?(?: y )?(?:(?<minutes>\d+)? minutos?)?/i;
            }
            overrideAuthorPageFormat(n) {
                if (n.includes("/stores/") && !n.includes("/allbooks")) return `${n.replace("/about", "")}/allbooks`;
                return `${n}/?node=599364031&pageSize=20`;
            }
        }
        AmazonEsParser.zone = "es", AmazonEsParser.region = "ES";
        class AmazonFrParser {
            constructor() {
                this.mainUrl = "//www.amazon." + AmazonFrParser.zone, this.completionUrl = "https://completion.amazon." + AmazonCoUkParser.zone + "/search/complete?method=completion&search-alias=digital-text&client=amazon-search-ui&mkt=5&l=fr_FR", 
                this.region = AmazonFrParser.region, this.areYouAnAuthorPattern = "Etes-vous un auteur", 
                this.free = "gratuit", this.currencySign = "&euro;", this.currencySignForExport = "\u20ac", 
                this.thousandSeparator = ".", this.decimalSeparator = ",";
                const n = "undefined" != typeof window && (0, a.$)(".zg_rankDiv").length;
                this.bestSellerResultsNumber = n || ("undefined" == typeof window ? 50 : (0, a.$)(".zg-badge-text").length), 
                this.searchResultsNumber = 16, this.authorResultsNumber = 16, this.publisher = "\xc9diteur", 
                this.searchKeys = [ decodeURI(encodeURI("achat")), "louer" ], this.numberSign = decodeURI("n%C2%B0"), 
                this.searchPattern = "Format Kindle", this.bestSellersPatternStart = n ? 'class="zg_itemImmersion"' : 'class="zg-item-immersion"', 
                this.bestSellersPatternEnd = n ? 'class="zg_clear"' : "</li>", this.estSalesPercentage = 9;
            }
            getTitle(n) {
                var o = n.find("#btAsinTitle>span").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 === o || 0 == o.length ? "" : o[0].nodeValue.trim();
            }
            getDescription(n) {
                var o = n.find("#bookDescription_feature_div noscript");
                return o.length > 0 ? (0, a.$)(o.text()).text().trim() : (o = n.find("#bookDescription_feature_div .a-expander-content")).length > 0 ? o.text() : n.find("#outer_postBodyPS").text().trim();
            }
            getKindleEditionRow(n) {
                var o, r = this;
                return n.find("li").each((function() {
                    (0, a.$)(this).text().indexOf(r.searchPattern) > 0 && (o = (0, a.$)(this));
                })), o;
            }
            getUrlFromKindleEditionRow(n) {
                return n.find("a:first").attr("href");
            }
            getPriceFromKindleEditionRow(n) {
                return n.find("span.bld");
            }
            getReviewsCountFromResult(n) {
                return n.find(".rvwCnt > a:first").text();
            }
            parsePrice(n) {
                return n.toString().toLowerCase() == this.free ? 0 : n ? s.W.parseFloat(n, this.decimalSeparator) : 0;
            }
            formatPrice(n) {
                return this.currencySign + n;
            }
            getGoogleImageSearchUrlRel(n, o, r) {
                var s = 0 !== n.find("#imgBlkFront").length ? n.find("#imgBlkFront").attr("data-a-dynamic-image") : n.find("#ebooksImgBlkFront").attr("data-a-dynamic-image");
                if (void 0 !== s) {
                    var a = JSON.parse(s), l = Object.keys(a);
                    return r(l.length > 0 ? l[0] : "undefined");
                }
                return r(n.find("#main-image").attr("data-src") || "undefined");
            }
            getReviews(n) {
                var o = n.find("#acrCustomerReviewText:eq(0)");
                return o.length ? (0, a.$)(o).text().replace("\xe9valuations", "").replace("\xe9valuation", "").replace("client", "").trim() : "0";
            }
            getRating(n) {
                var o = n.find("#revSum span:contains('sur')");
                if (0 === o.length && (o = n.find('[data-hook="rating-out-of-text"]')), void 0 !== o || "" != o) return o.text().split("sur")[0].trim().replace(",", ".");
            }
            getAsin(n) {
                let o = n.find("#detailBullets_feature_div li span > span:contains(ASIN)+span");
                return o = o.text().trim(), o || (o = n.find("#detailBullets_feature_div li span > span:contains(ISBN-13)+span").text().trim()), 
                o || (o = n.find("#detailsAsin > td > span").text().trim()), o || "n/a";
            }
            getTotalSearchResult(n) {
                var o = n.find("#s-result-count").text();
                o || (o = (0, a.$)(n.find("#search .a-section span")[0]).text());
                var r = -1 != o.indexOf("sur") ? o.indexOf("sur") + 4 : 0;
                return o.substring(r, o.indexOf(decodeURI(encodeURI("r\xe9sultats"))) - 1);
            }
            getPrintLength(n) {
                var o = n.find("#productDetailsTable li:contains('pages')").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                if (void 0 !== o && 0 !== o.length || (o = n.find("#detail_bullets_id li:contains('pages'), #detailBullets_feature_div li span > span:not(.a-text-bold):contains('pages')").contents().filter((function() {
                    return 3 == this.nodeType;
                }))), void 0 !== o && 0 !== o.length || (o = n.find("#aboutEbooksSection span a:first").contents().filter((function() {
                    return 3 == this.nodeType;
                }))), void 0 !== o && 0 !== o.length) return o[0].nodeValue.replace("pages", "").trim();
                let r = n.find("#detailsListeningLength td");
                if (r.length) {
                    let n = r.text().trim(), o = this.getAudioBookLengthRegex().exec(n);
                    if (!o.groups.minutes && !o.groups.hours) return null;
                    let s = o.groups.hours || "00", a = o.groups.minutes || "00";
                    return 1 === s.length && (s = `0${s}`), 1 === a.length && (a = `0${a}`), `${s}:${a}`;
                }
                return null;
            }
            getSalesRank(n) {
                var o, r = n.find("#SalesRank").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                if (void 0 !== r && r.length >= 2) return void 0 === (o = r[1].nodeValue.trim()) || "" === o ? "0" : -1 === o.indexOf(this.numberSign) ? o.substring(0, o.indexOf(" en Livres")) : o.substring(o.indexOf(this.numberSign) + this.numberSign.length, o.indexOf("dans"));
                var s = (o = void 0 !== (r = n.find("#detailBullets_feature_div+ul>li>span:eq(0)").contents().filter((function() {
                    return 3 == this.nodeType;
                }))) && r.length >= 2 ? r[1].nodeValue.trim() : (r = n.find("#detailsNarrationAccent").length ? n.find("#detailsNarrationAccent+tr > td > span > span:eq(0)") : n.find("#detailsAsin+tr > td > span > span:eq(0)")).text().trim()).match(/(?:Nr\.|#|n\xb0)?\s?(\d+(?:[\.\,]?\d*)*)/);
                return s ? s[1].replace(/,/g, "") : "0";
            }
            getBookTypes() {
                return {
                    Poche: "Paperback",
                    Broch\u00e9: "Paperback",
                    Carte: "Paperback",
                    Reli\u00e9: "Hardcover"
                };
            }
            getAudioBookTypes() {
                return {
                    "Livre audio": "Audiobook",
                    "Livres audio Audible": "Audiobook"
                };
            }
            getCanonicalTypeName(n) {
                return this.getAllBookTypes()[n] || n;
            }
            getAllBookTypes() {
                return Object.assign(this.getBookTypes(), this.getAudioBookTypes());
            }
            getAudioBookLengthRegex() {
                return /(?:(?<hours>\d+) heures?)?(?: et )?(?:(?<minutes>\d+)? minutes?)?/i;
            }
            overrideAuthorPageFormat(n) {
                if (n.includes("/stores/") && !n.includes("/allbooks")) return `${n.replace("/about", "")}/allbooks`;
                return `${n}/?node=301061&pageSize=20`;
            }
        }
        AmazonFrParser.zone = "fr", AmazonFrParser.region = "FR";
        class AmazonInParser {
            constructor() {
                this.mainUrl = "//www.amazon." + AmazonInParser.zone, this.completionUrl = "https://completion.amazon." + AmazonCoUkParser.zone + "/search/complete?method=completion&search-alias=digital-text&client=amazon-search-ui&mkt=44571", 
                this.region = AmazonInParser.region, this.free = "free", this.currencySign = "\u20a8", 
                this.currencySignForExport = "\u20a8", this.decimalSeparator = ".", this.thousandSeparator = ",";
                const n = "undefined" != typeof window && (0, a.$)(".zg_rankDiv").length;
                this.bestSellerResultsNumber = n || ("undefined" == typeof window ? 50 : (0, a.$)(".zg-badge-text").length), 
                this.searchResultsNumber = 16, this.authorResultsNumber = 16, this.publisher = "Publisher", 
                this.publicationDate = "Date Published", this.searchKeys = [ "to buy", "to rent" ], 
                this.numberSign = "#", this.searchPattern = "Kindle Edition", this.bestSellersPatternStart = n ? 'class="zg_itemImmersion"' : 'class="zg-item-immersion"', 
                this.bestSellersPatternEnd = n ? 'class="zg_clear"' : "</li>", this.estSalesPercentage = 12;
            }
            getTitle(n) {
                var o = n.find("#btAsinTitle span").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 === o || 0 == o.length ? "" : o[0].nodeValue.trim();
            }
            getDescription(n) {
                var o = n.find("#bookDescription_feature_div noscript");
                return o.length > 0 ? (0, a.$)(o.text()).text().trim() : (o = n.find("#bookDescription_feature_div .a-expander-content")).length > 0 ? o.text() : n.find("#outer_postBodyPS").text().trim();
            }
            getKindleEditionRow(n) {
                var o, r = this;
                return n.find("li").each((function() {
                    (0, a.$)(this).text().indexOf(r.searchPattern) > 0 && (o = (0, a.$)(this));
                })), o;
            }
            getUrlFromKindleEditionRow(n) {
                return n.find("a:first").attr("href");
            }
            getPriceFromKindleEditionRow(n) {
                return n.find("span.bld");
            }
            getReviewsCountFromResult(n) {
                return n.find(".rvwCnt > a:first").text();
            }
            parsePrice(n) {
                return n.toString().toLowerCase() == this.free ? 0 : n ? s.W.parseFloat(n, this.decimalSeparator) : 0;
            }
            formatPrice(n) {
                return this.currencySign + n;
            }
            getGoogleImageSearchUrlRel(n, o, r) {
                var s = 0 !== n.find("#imgBlkFront").length ? n.find("#imgBlkFront").attr("data-a-dynamic-image") : n.find("#ebooksImgBlkFront").attr("data-a-dynamic-image");
                if (void 0 !== s) {
                    var a = JSON.parse(s), l = Object.keys(a);
                    return r(l.length > 0 ? l[0] : "undefined");
                }
                return r(n.find("#main-image").attr("data-src") || "undefined");
            }
            getReviews(n) {
                var o = n.find("#acrCustomerReviewText:eq(0)");
                return o.length ? (0, a.$)(o).text().replace("customer reviews", "").replace("ratings", "").trim() : "0";
            }
            getRating(n) {
                var o = n.find("#avgRating span:contains('out of')");
                if (0 === o.length && (o = n.find('[data-hook="rating-out-of-text"]')), void 0 !== o || "" != o) return o.text().split("out of")[0].trim().replace(",", ".");
            }
            getAsin(n) {
                let o = n.find("#detailBullets_feature_div li span > span:contains(ASIN)+span");
                return o = o.text().trim(), o || (o = n.find("#detailBullets_feature_div li span > span:contains(ISBN-13)+span").text().trim()), 
                o || (o = n.find("#detailsAsin > td > span").text().trim()), o || "n/a";
            }
            getTotalSearchResult(n) {
                var o = n.find("#s-result-count").text();
                o || (o = (0, a.$)(n.find("#search .a-section span")[0]).text());
                var r = -1 != o.indexOf("of") ? o.indexOf("of") + 3 : 0;
                return o.substring(r, o.indexOf("results") - 1);
            }
            getPrintLength(n) {
                var o = n.find("#productDetailsTable li:contains('pages')").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                if (void 0 !== o && 0 !== o.length || (o = n.find("#detail_bullets_id li:contains('pages'), #detailBullets_feature_div li span > span:contains('pages')").contents().filter((function() {
                    return 3 == this.nodeType;
                }))), void 0 !== o && 0 !== o.length) return o[0].nodeValue.replace("pages", "").trim();
                let r = n.find("#detailsListeningLength td");
                if (r.length) {
                    let n = r.text().trim(), o = this.getAudioBookLengthRegex().exec(n);
                    if (!o.groups.minutes && !o.groups.hours) return null;
                    let s = o.groups.hours || "00", a = o.groups.minutes || "00";
                    return 1 === s.length && (s = `0${s}`), 1 === a.length && (a = `0${a}`), `${s}:${a}`;
                }
                return null;
            }
            getPrice(n) {
                var o = (0, a.$)(n.find("#buybox .kindle-price td")[1]).contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 !== o && o.length > 0 ? o[1].nodeValue.trim() : void 0 === (o = n.find("#priceBlock b.priceLarge span").contents().filter((function() {
                    return 3 == this.nodeType;
                }))) || 0 == o.length ? "" : o[0].nodeValue.trim();
            }
            getBookTypes() {
                return {
                    Paperback: "Paperback",
                    Hardcover: "Hardcover"
                };
            }
            getAudioBookTypes() {
                return {
                    "Audible Audiobook": "Audiobook",
                    Audiobook: "Audiobook"
                };
            }
            getAllBookTypes() {
                return Object.assign(this.getBookTypes(), this.getAudioBookTypes());
            }
            getAudioBookLengthRegex() {
                return /(?:(?<hours>\d+) hours?)?(?: and )?(?:(?<minutes>\d+)? minutes?)?/;
            }
            overrideAuthorPageFormat(n) {
                if (n.includes("/stores/") && !n.includes("/allbooks")) return `${n.replace("/about", "")}/allbooks`;
                return `${n}/?node=976389031&pageSize=20`;
            }
        }
        AmazonInParser.zone = "in", AmazonInParser.region = "IN";
        class AmazonItParser {
            constructor() {
                this.mainUrl = "//www.amazon." + AmazonItParser.zone, this.completionUrl = "https://completion.amazon." + AmazonCoUkParser.zone + "/search/complete?method=completion&search-alias=digital-text&client=amazon-search-ui&mkt=35691", 
                this.region = AmazonItParser.region, this.free = "gratuito", this.currencySign = "&euro;", 
                this.currencySignForExport = "\u20ac", this.thousandSeparator = ".", this.decimalSeparator = ",";
                const n = "undefined" != typeof window && (0, a.$)(".zg_rankDiv").length;
                this.bestSellerResultsNumber = n || ("undefined" == typeof window ? 50 : (0, a.$)(".zg-badge-text").length), 
                this.searchResultsNumber = 16, this.authorResultsNumber = 16, this.publisher = "Editore", 
                this.searchKeys = [ "da acquistare", "to rent" ], this.numberSign = "n.", this.searchPattern = "Formato Kindle", 
                this.bestSellersPatternStart = n ? 'class="zg_itemImmersion"' : 'class="zg-item-immersion"', 
                this.bestSellersPatternEnd = n ? 'class="zg_clear"' : "</li>", this.estSalesPercentage = 8;
            }
            getTitle(n) {
                var o = n.find("#btAsinTitle>span").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 === o || 0 == o.length ? "" : o[0].nodeValue.trim();
            }
            getDescription(n) {
                var o = n.find("#bookDescription_feature_div noscript");
                return o.length > 0 ? (0, a.$)(o.text()).text().trim() : (o = n.find("#bookDescription_feature_div .a-expander-content")).length > 0 ? o.text() : n.find("#outer_postBodyPS").text().trim();
            }
            getKindleEditionRow(n) {}
            getUrlFromKindleEditionRow(n) {}
            getPriceFromKindleEditionRow(n) {}
            getReviewsCountFromResult(n) {}
            parsePrice(n) {
                return n.toString().toLowerCase() == this.free ? 0 : n ? s.W.parseFloat(n, this.decimalSeparator) : 0;
            }
            formatPrice(n) {
                return this.currencySign + n;
            }
            getGoogleImageSearchUrlRel(n, o, r) {
                var s = n.find("#ebooksImgBlkFront, #imgBlkFront").attr("data-a-dynamic-image");
                if (void 0 !== s) {
                    var a = JSON.parse(s), l = Object.keys(a);
                    return r(l.length > 0 ? l[0] : "undefined");
                }
                return r(n.find("#main-image").attr("data-src") || "undefined");
            }
            getReviews(n) {
                var o = n.find("#summaryStars a").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                if (void 0 === o || 0 == o.length) {
                    let o = n.find("#reviewFeatureGroup, #averageCustomerReviews_feature_div").find("#acrCustomerReviewText");
                    return o.length > 0 ? parseInt(o.text().trim().replace(/\./, "")) : "0";
                }
                return o[1].nodeValue.replace("recensioni", "").replace("recensione", "").replace(/\./, "").trim();
            }
            getRating(n) {
                var o = n.find("#avgRating span:contains('su')");
                if (0 === o.length && (o = n.find('[data-hook="rating-out-of-text"]')), void 0 !== o || "" != o) return o.text().split("su")[0].trim().replace(",", ".");
            }
            getAsin(n) {
                let o = n.find("#detailBullets_feature_div li span > span:contains(ASIN)+span");
                return o = o.text().trim(), o || (o = n.find("#detailBullets_feature_div li span > span:contains(ISBN-13)+span").text().trim()), 
                o || (o = n.find("#detailsAsin > td > span").text().trim()), o || "n/a";
            }
            getTotalSearchResult(n) {
                var o = n.find("#s-result-count").text();
                o || (o = (0, a.$)(n.find("#search .a-section span")[0]).text());
                var r = -1 != o.indexOf("dei") ? o.indexOf("dei") + 4 : 0;
                return o.substring(r, o.indexOf("risultati") - 1);
            }
            getPrintLength(n) {
                var o = n.find("#productDetailsTable li:contains('Lunghezza stampa')").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                if (void 0 !== o && 0 !== o.length || (o = n.find("#detail_bullets_id li:contains('pagine'), #detailBullets_feature_div li span > span:contains('pagine'):eq(0)").contents().filter((function() {
                    return 3 == this.nodeType;
                }))), void 0 !== o && 0 !== o.length) return o[0].nodeValue.replace("pagine", "").trim();
                let r = n.find("#detailsListeningLength td");
                if (r.length) {
                    let n = r.text().trim(), o = this.getAudioBookLengthRegex().exec(n);
                    if (!o.groups.minutes && !o.groups.hours) return null;
                    let s = o.groups.hours || "00", a = o.groups.minutes || "00";
                    return 1 === s.length && (s = `0${s}`), 1 === a.length && (a = `0${a}`), `${s}:${a}`;
                }
                return null;
            }
            getPrice(n) {
                var o = (0, a.$)(n.find("#buybox .kindle-price td")[1]).contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 !== o && o.length > 0 ? o[0].nodeValue.trim() : void 0 === (o = (0, 
                a.$)(n.find('#tmmSwatches .a-button-text span:contains("Kindle")').next().next().find(".a-color-price")).contents().filter((function() {
                    return 3 == this.nodeType;
                }))) || 0 == o.length ? null : o[0].nodeValue.trim();
            }
            getSalesRank(n) {
                var o = n.find("#SalesRank").contents().filter((function() {
                    return 3 == this.nodeType;
                })), r = "";
                if (void 0 !== o && o.length >= 2) return void 0 === (r = o[0].nodeValue.trim()) || "" === r ? "0" : r.includes("#") ? r.substring(r.indexOf("#") + "#".length, r.indexOf("a")) : r.substring(r.indexOf(this.numberSign) + this.numberSign.length, r.indexOf("in"));
                if (void 0 === (r = void 0 !== (o = n.find("#detailBullets_feature_div+ul>li>span:eq(0)").contents().filter((function() {
                    return 3 == this.nodeType;
                }))) && o.length >= 2 ? o[1].nodeValue.trim() : (o = n.find("#detailsNarrationAccent").length ? n.find("#detailsNarrationAccent+tr > td > span > span:eq(0)") : n.find("#detailsAsin+tr > td > span > span:eq(0)")).text().trim()) || !r) return "0";
                var s = r.match(/(?:Nr\.|#|n\.)?\s?(\d+(?:[\.\,]?\d*)*)/);
                return s ? s[1].replace(/,/g, "") : "0";
            }
            getBookTypes() {
                return {
                    "Copertina flessibile": "Paperback",
                    "Rilegatura flessibile": "Paperback",
                    Opuscolo: "Paperback",
                    Libro: "Paperback",
                    "Pacchetto di prodotti": "Paperback",
                    "Libro con copertina morbida": "Paperback",
                    "Copertina rigida": "Hardcover"
                };
            }
            getAudioBookTypes() {
                return {
                    Audiolibro: "Audiobook",
                    "Audiolibro Audible": "Audiobook"
                };
            }
            getCanonicalTypeName(n) {
                return this.getAllBookTypes()[n] || n;
            }
            getAllBookTypes() {
                return Object.assign(this.getBookTypes(), this.getAudioBookTypes());
            }
            getAudioBookLengthRegex() {
                return /(?:(?<hours>\d+) ore)?(?: e )?(?:(?<minutes>\d+)? minuti)?/i;
            }
            overrideAuthorPageFormat(n) {
                if (n.includes("/stores/") && !n.includes("/allbooks")) return `${n.replace("/about", "")}/allbooks`;
                return `${n}/?node=411663031&pageSize=20`;
            }
        }
        AmazonItParser.zone = "it", AmazonItParser.region = "IT";
        class AmazonMxParser {
            constructor() {
                this.mainUrl = "//www.amazon." + AmazonMxParser.zone, this.completionUrl = "https://completion.amazon." + l.O.zone + "/search/complete?method=completion&search-alias=digital-text&client=amazon-search-ui&mkt=771770", 
                this.region = AmazonMxParser.region, this.areYouAnAuthorPattern = "Eres un autor?", 
                this.free = "gratis", this.currencySign = "$", this.currencySignForExport = "$", 
                this.decimalSeparator = ".", this.thousandSeparator = ",";
                const n = "undefined" != typeof window && (0, a.$)(".zg_rankDiv").length;
                this.bestSellerResultsNumber = n || ("undefined" == typeof window ? 50 : (0, a.$)(".zg-badge-text").length), 
                this.searchResultsNumber = 16, this.authorResultsNumber = 24, this.publisher = "Editorial", 
                this.searchKeys = [ "para comprar", "to rent" ], this.numberSign = "#", this.searchPattern = "Edici\xf3n Kindle", 
                this.bestSellersPatternStart = n ? 'class="zg_itemRow"' : 'class="zg-item-immersion"', 
                this.bestSellersPatternEnd = n ? 'class="zg_clear"' : "</li>", this.estSalesPercentage = 10;
            }
            getTitle(n) {
                var o = n.find("#btAsinTitle>span").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 === o || 0 == o.length ? "" : o[0].nodeValue.trim();
            }
            getDescription(n) {
                var o = n.find("#bookDescription_feature_div noscript");
                return o.length > 0 ? (0, a.$)(o.text()).text().trim() : (o = n.find("#bookDescription_feature_div .a-expander-content")).length > 0 ? o.text() : n.find("#outer_postBodyPS").text().trim();
            }
            getKindleEditionRow(n) {}
            getUrlFromKindleEditionRow(n) {}
            getPriceFromKindleEditionRow(n) {}
            getReviewsCountFromResult(n) {}
            parsePrice(n) {
                return n.toString().toLowerCase() == this.free ? 0 : n ? s.W.parseFloat(n, this.decimalSeparator) : 0;
            }
            formatPrice(n) {
                return this.currencySign + n;
            }
            getGoogleImageSearchUrlRel(n, o, r) {
                var s = n.find("#ebooksImgBlkFront, #imgBlkFront").attr("data-a-dynamic-image");
                if (void 0 !== s) {
                    var a = JSON.parse(s), l = Object.keys(a);
                    return r(l.length > 0 ? l[0] : "undefined");
                }
                return r(n.find("#main-image").attr("data-src") || "undefined");
            }
            getReviews(n) {
                var o = n.find("#summaryStars a").contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                if (void 0 === o || 0 == o.length) {
                    let o = n.find("#reviewFeatureGroup, #averageCustomerReviews_feature_div").find("#acrCustomerReviewText");
                    return o.length > 0 ? parseInt(o.text().trim().replace(/[,\.]/i, "")) : "0";
                }
                return o[1].nodeValue.replace("calificaciones", "").replace("classifica\xe7\xe3o", "").trim();
            }
            getRating(n) {
                var o = n.find("#avgRating span:contains('de')");
                if (0 === o.length && (o = n.find('[data-hook="rating-out-of-text"]')), void 0 !== o || "" != o) return o.text().split("de")[0].trim().replace(",", ".");
            }
            getAsin(n) {
                let o = n.find("#detailBullets_feature_div li span > span:contains(ASIN)+span");
                return o = o.text().trim(), o || (o = n.find("#detailBullets_feature_div li span > span:contains(ISBN-13)+span").text().trim()), 
                o || "n/a";
            }
            getTotalSearchResult(n) {
                var o = n.find("#s-result-count").text();
                o || (o = (0, a.$)(n.find("#search .a-section span")[0]).text());
                var r = -1 != o.indexOf("de mais de") ? o.indexOf("de mais de") + 11 : 0;
                return o.substring(r, o.indexOf("resultados") - 1);
            }
            getPrintLength(n) {
                const o = n.find("#aboutEbooksSection span a:first");
                if (o.length > 0 && !isNaN(parseInt(o.text().trim()))) return parseInt(o.text()).toString();
                let r = n.find("#productDetailsTable .content li:contains(p\xe1ginas), #detailBullets_feature_div li span > span:contains(p\xe1ginas):not(.a-text-bold)").eq(0);
                return r.find("b").remove(), r = r.text().trim(), r.length > 0 ? parseInt(r).toString() : null;
            }
            getPrice(n) {
                var o = n.find('#tmmSwatches .a-button-text span:contains("Kindle")').next().next(), r = (0, 
                a.$)(o.find(".a-color-price")).contents().filter((function() {
                    return 3 == this.nodeType;
                }));
                return void 0 !== r && 0 !== r.length ? r[0].nodeValue.trim() : void 0 === (r = (0, 
                a.$)(o.find("span")).contents().filter((function() {
                    return 3 == this.nodeType;
                }))) || 0 === r.length ? null : r[0].nodeValue.trim();
            }
            getSalesRank(n) {
                var o = n.find("#SalesRank").contents().filter((function() {
                    return 3 == this.nodeType;
                })), r = "";
                if (void 0 === o || o.length < 2) {
                    if (void 0 === (o = n.find("#detailBullets_feature_div+ul>li>span:eq(0)").contents().filter((function() {
                        return 3 == this.nodeType;
                    }))) || o.length < 2) return "0";
                    var s = (r = o[1].nodeValue.trim()).match(/(?:Nr\.|N\xba|#|n\.)?\s?(\d+(?:[\.\,]?\d*)*)/);
                    return s ? s[1].replace(/,/g, "") : "0";
                }
                return void 0 === (r = o[0].nodeValue.trim()) || "" === r ? "0" : r.includes("N\xba") ? r.substring(r.indexOf("N\xba") + "N\xba".length, r.indexOf("a")) : r.substring(r.indexOf(this.numberSign) + this.numberSign.length, r.indexOf("em"));
            }
            getBookTypes() {
                return {
                    "Pasta blanda": "Paperback",
                    "Pasta dura": "Hardcover"
                };
            }
            getAudioBookTypes() {
                return {};
            }
            getAllBookTypes() {
                return Object.assign(this.getBookTypes(), this.getAudioBookTypes());
            }
            overrideAuthorPageFormat(n) {
                if (n.includes("/stores/") && !n.includes("/allbooks")) return `${n.replace("/about", "")}/allbooks`;
                return `${n}/?node=9298576011&pageSize=20`;
            }
        }
        AmazonMxParser.zone = "com.mx", AmazonMxParser.region = "MX";
    },
    712: (n, o, r) => {
        "use strict";
        r.d(o, {
            R: () => CategoryAnalysisAlgorithm
        });
        var s = r(534);
        r(594);
        class CategoryAnalysisAlgorithm {
            constructor() {
                if (CategoryAnalysisAlgorithm._singletonInstance) return CategoryAnalysisAlgorithm._singletonInstance;
                CategoryAnalysisAlgorithm._singletonInstance = this;
            }
            getPopularityColor(n) {
                var o = parseInt(n);
                return o < 24999 ? "green" : o < 6e4 ? "yellow" : "red";
            }
            getPotentialColor(n) {
                var o = parseInt(n);
                return o < 200 ? "red" : o < 1e3 ? "yellow" : "green";
            }
            getCompetitionColor(n) {
                var o = parseInt(n);
                return o < 4600 ? "red" : o < 14e3 ? "yellow" : "green";
            }
            setBullets(n) {
                this.setPopularityBullet(n.salesRank20), this.setPotentialBullet(n.avgMonthlyRev), 
                this.setCompetitionBullet(n.salesRank20);
            }
            setPopularityBullet(n) {
                var o = this.getPopularityColor(n), r = (0, s.$)("#bullet-1");
                r.removeClass().addClass("bullet-" + o), r.tooltipster("content", this.getPopularityTooltip(o));
            }
            setPotentialBullet(n) {
                var o = this.getPotentialColor(n), r = (0, s.$)("#bullet-2");
                r.removeClass().addClass("bullet-" + o), r.tooltipster("content", this.getPotentialTooltip(o));
            }
            setCompetitionBullet(n) {
                var o = this.getCompetitionColor(n), r = (0, s.$)("#bullet-3");
                r.removeClass().addClass("bullet-" + o), r.tooltipster("content", this.getCompetitionTooltip(o));
            }
            getPopularityTooltip(n) {
                return "green" == n ? "This category is very popular and books here have good sales volumes." : "yellow" == n ? "Caution: This category has a rather average popularity with mediocre sales volumes." : "Warning: This category is not very popular and sales volumes here are very low.";
            }
            getPotentialTooltip(n) {
                return "green" == n ? "The revenue potential in this category is very good." : "yellow" == n ? "Caution: The avg. monthly revenue of these books is rather mediocre." : "Warning: The avg. monthly revenue of books here is rather low.";
            }
            getCompetitionTooltip(n) {
                return "green" == n ? "You can easily compete here for a first page category ranking." : "yellow" == n ? "Caution: There is some healthy competition here." : "Warning: The competition here is very strong.";
            }
        }
    },
    436: (n, o, r) => {
        "use strict";
        r.d(o, {
            y: () => SearchAnalysisAlgorithm
        });
        var s = r(534), a = (r(594), r(248));
        window.$ = s.$, window.jQuery = s.$;
        class SearchAnalysisAlgorithm {
            constructor() {
                if (SearchAnalysisAlgorithm._singletonInstance) return SearchAnalysisAlgorithm._singletonInstance;
                SearchAnalysisAlgorithm._singletonInstance = this;
            }
            getPopularityColor(n) {
                var o = parseInt(n);
                return o < 3 ? "red" : o < 8 ? "yellow" : "green";
            }
            getPotentialColor(n) {
                return n < 3 ? "red" : n < 8 ? "yellow" : "green";
            }
            getCompetitionColor(n) {
                return isNaN(n) && (n = 0), n < 500 ? "green" : n < 1500 ? "yellow" : "red";
            }
            setBullets(n) {
                this.setPopularityBullet(n.salesRankConclusionValue), this.setPotentialBullet(n.monthlyRevBook), 
                this.setCompetitionBullet();
            }
            setPopularityBullet(n) {
                var o = this.getPopularityColor(n), r = (0, s.$)("#bullet-1");
                r.removeClass().addClass("bullet-" + o), r.tooltipster("content", this.getPopularityTooltip(o));
            }
            setPotentialBullet(n) {
                var o = this.getPotentialColor(n), r = (0, s.$)("#bullet-2");
                r.removeClass().addClass("bullet-" + o), r.tooltipster("content", this.getPotentialTooltip(o));
            }
            setCompetitionBullet() {
                var n = this;
                a.V.sendMessageToActiveTab({
                    type: "get-totalResults"
                }, (function(o) {
                    var r = n.getCompetitionColor(parseInt(o)), a = (0, s.$)("#bullet-3");
                    a.removeClass().addClass("bullet-" + r), a.tooltipster("content", n.getCompetitionTooltip(r));
                }));
            }
            getPopularityTooltip(n) {
                return "green" == n ? "This is a popular keyword and there are a number of books here performing well." : "yellow" == n ? "Caution: There are only a small number of books performing well for this keyword." : "Warning: This keyword is not very popular.";
            }
            getPotentialTooltip(n) {
                return "green" == n ? "The revenue potential of books under this keyword looks very good." : "yellow" == n ? "Caution: The revenue potential of books under this keyword looks a little average." : "Warning: The revenue potential of books under this keyword is rather low.";
            }
            getCompetitionTooltip(n) {
                return "green" == n ? "You can easily compete here for a first page ranking." : "yellow" == n ? "Caution: There is some healthy competition here." : "Warning: The competition here is very strong.";
            }
        }
    },
    248: (n, o, r) => {
        "use strict";
        function Api() {}
        r.d(o, {
            V: () => Api
        }), Api.messageListener = function(n, o) {}, Api.backgroundMessageListener = function(n, o) {}, 
        Api.addListener = function(n) {
            Api.messageListener = n, chrome.runtime.onMessage.addListener((function(o, r, s) {
                return n(o, s);
            }));
        }, Api.addBackgroundListener = function(n) {
            Api.backgroundMessageListener = n, chrome.runtime.onMessage.addListener((function(o, r, s) {
                return n(o, r, s);
            }));
        }, Api.sentFromPageScript = function() {
            return void 0 === chrome.tabs;
        }, Api.sendMessageToActiveTab = function(n, o) {
            void 0 === o && (o = function() {}), Api.sentFromPageScript() ? Api.messageListener(n, (function(n) {
                return o(n);
            })) : chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, (function(r) {
                chrome.tabs.sendMessage(r[0].id, n, (function(n) {
                    if (void 0 !== o && "function" == typeof o) return o(n);
                }));
            }));
        }, Api.sendMessageToActiveTabAsync = function(n) {
            return new Promise((function(o, r) {
                Api.sendMessageToActiveTab(n, (n => {
                    chrome.runtime.lastError ? r(chrome.runtime.lastError) : o(n);
                }));
            }));
        }, Api.sendMessageToBackground = function(n, o) {
            void 0 === o && (o = function() {}), chrome.runtime.sendMessage(n, o);
        }, Api.sendMessageToBackgroundAsync = function(n) {
            return new Promise((function(o, r) {
                Api.sendMessageToBackground(n, o);
            }));
        }, Api.setBackgroundPage = function() {}, Api.openNewTab = function(n) {
            return new Promise((o => {
                chrome.tabs.create({
                    url: n
                }, (n => {
                    o(n);
                }));
            }));
        }, Api.registerOnShowEvent = function(n) {
            setTimeout(n, 0);
        }, Api.storage = chrome.storage.local, Api.addAlarmListener = function(n, o) {
            chrome.alarms.onAlarm.addListener((function(r) {
                r.name === n && o();
            }));
        }, Api.createAlarm = function(n, o) {
            chrome.alarms.create(n, {
                delayInMinutes: o,
                periodInMinutes: o
            });
        }, Api.getImageDataFromUrl = function(n, o) {
            o(n);
        }, Api.isFirefox = function() {
            return window.navigator.userAgent.includes("Firefox/");
        };
    },
    405: (n, o, r) => {
        "use strict";
        r.d(o, {
            N: () => s,
            P: () => formatPrompt
        });
        const s = [ [ {
            id: "marketIntel",
            type: "topic",
            name: "Market Intelligence Report",
            promptUrl: "https://www.publishingaltitude.com/aichat/1CatKeyMarketReport.txt"
        }, {
            id: "demographics",
            type: "topic",
            name: "Demographics & Psychographics",
            promptUrl: "https://www.publishingaltitude.com/aichat/2CatKeyDemoPsychReport.txt"
        }, {
            id: "trendAnalysis",
            type: "topic",
            name: "Trend Analysis",
            promptUrl: "https://www.publishingaltitude.com/aichat/11CatKeyTrendAnalysis.txt"
        }, {
            id: "nicheProblems",
            type: "topic",
            name: "Market Problems & Questions",
            promptUrl: "https://www.publishingaltitude.com/aichat/4CatKeyNicheProblems.txt"
        }, {
            id: "nicheDreams",
            type: "topic",
            name: "Market Dreams & Goals",
            promptUrl: "https://www.publishingaltitude.com/aichat/5CatKeyNicheDreams.txt"
        }, {
            id: "singleAnalysis",
            type: "single",
            name: "Book Strengths & Weaknesses",
            promptUrl: "https://www.publishingaltitude.com/aichat/7SingleBookAnalysis.txt"
        }, {
            id: "discourseAnalysis",
            type: "single",
            name: "Discourse Analysis",
            promptUrl: "https://publishingaltitude.com/aichat/8SingleBookDiscourse.txt"
        }, {
            id: "thematicAnalysis",
            type: "single",
            name: "Thematic Analysis",
            promptUrl: "https://publishingaltitude.com/aichat/9SingleBookThematic.txt"
        }, {
            id: "structuralAnalysis",
            type: "single",
            name: "Structural Analysis",
            promptUrl: "https://publishingaltitude.com/aichat/10SingleBookStructural.txt"
        } ], [ {
            id: "keySuccessNonFiction",
            type: "topic",
            name: "Key Success Factors (Non-Fiction)",
            promptUrl: "https://www.publishingaltitude.com/aichat/3CatKeyNonFictionIdea.txt"
        }, {
            id: "keySuccessFiction",
            type: "topic",
            name: "Key Success Factors (Fiction)",
            promptUrl: "https://www.publishingaltitude.com/aichat/6CatKeyFictionIdea.txt"
        } ] ], formatPrompt = (n, o) => {
            let r = n;
            return Object.keys(o).forEach((n => {
                r = r.replace(`{${n}}`, o[n]);
            })), r;
        };
    },
    985: (n, o, r) => {
        "use strict";
        r.d(o, {
            D: () => BookPageParser
        });
        var s = r(248), a = r(357), l = r(534);
        const h = 756 != r.j ? l.$ : null;
        class BookPageParser {
            constructor(n, o) {
                this._siteParser = o || a.W.getSiteParser(n);
            }
            isNotValid() {
                return void 0 === this._siteParser;
            }
            getDateOfPublication(n, o) {
                var r = n.find("#pubdate").val();
                if (void 0 === r) {
                    var s = n.find("#productDetailsTable div.content li:contains(" + this._siteParser.publisher + "), #detailBullets_feature_div li:contains(" + this._siteParser.publisher + ")"), l = "";
                    if (s.text().includes("(")) l = a.W.parseString(s.text(), "", "(", ")"); else if (this._siteParser.publicationDate) if (Array.isArray(this._siteParser.publicationDate)) {
                        let o;
                        for (let r of this._siteParser.publicationDate) if (o = n.find("#productDetailsTable div.content li:contains(" + r + "), #detailBullets_feature_div li:contains(" + r + "), #detailsReleaseDate td"), 
                        o.length) {
                            (l = o.text().trim()).includes(":") && (l = l.split(":")[1]);
                            break;
                        }
                    } else {
                        (l = n.find("#productDetailsTable div.content li:contains(" + this._siteParser.publicationDate + "), #detailBullets_feature_div li:contains(" + this._siteParser.publicationDate + "), #detailsReleaseDate td").text().trim()).includes(":") && (l = l.split(":")[1]);
                    }
                    return o(l.trim());
                }
                fetch(this._siteParser.mainUrl + "/gp/product/features/ebook-synopsis/formatDate.html", {
                    method: "GET",
                    body: JSON.stringify({
                        datetime: r
                    }),
                    headers: {
                        "content-type": "application/json"
                    }
                }).then((n => n.json())).then((n => {
                    var r = n.value;
                    if (null != r) return o(r.toString());
                })).catch((n => o()));
            }
            getAuthorTitle(n) {
                return n.find("#productTitle").text().trim();
            }
            getGoogleSearchUrlByTitleAndAuthor(n, o) {
                var r = "";
                return void 0 !== n && n.length > 0 && (r += n), void 0 !== o && o.length > 0 && (r += " " + o), 
                "http://google.com/search?q=" + (r = encodeURIComponent(r).replace(/'/g, "%27")) + "&oq=" + r + "#safe=off&q=" + r;
            }
            getGoogleImageSearchUrl(n, o, r) {
                var s = "https://lens.google.com/";
                if (void 0 === n || 0 == n.length) return r(s);
                this._siteParser.getGoogleImageSearchUrlRel(n, o, (function(n) {
                    return void 0 === n || n.length < 1 ? r(s) : r(s + "uploadbyurl?url=" + n);
                }));
            }
            getImageUrl(n) {
                if (void 0 === n || 0 === n.length) return "";
                let o = n.find("#ebooksImgBlkFront, #imgBlkFront, #main-image").attr("data-src");
                if (void 0 !== o && o.length > 0) return o;
                let r = n.find("#imgBlkFront, #imgTagWrapperId img").attr("data-a-dynamic-image");
                try {
                    o = Object.keys(JSON.parse(r))[0];
                } catch (n) {
                    o = void 0;
                }
                return void 0 !== o && o.length > 0 ? o : (void 0 !== this._siteParser.getImageUrlSrc && (o = this._siteParser.getImageUrlSrc(n)), 
                void 0 === o || o.length < 1 ? "" : o);
            }
            getTitle(n) {
                if (void 0 === n || 0 == n.length) return "";
                var o = n.find("#ebooksProductTitle");
                return void 0 !== o && o.length > 0 || void 0 !== (o = n.find("#productTitle")) && o.length > 0 ? o.text().trim() : this._siteParser.getTitle(n);
            }
            getDescription(n) {
                return void 0 === n || 0 == n.length ? "" : this._siteParser.getDescription(n);
            }
            getRating(n) {
                return void 0 === n || 0 == n.length ? "" : this._siteParser.getRating(n);
            }
            getAsin(n) {
                return void 0 === n || 0 == n.length ? "" : this._siteParser.getAsin(n);
            }
            getISBN10(n) {
                if (void 0 === n || 0 == n.length) return "";
                if (this._siteParser.getISBN10) {
                    return this._siteParser.getISBN10(n) || "";
                }
                return n.find("#detailBullets_feature_div li span > span:contains(ISBN-10)+span").text().trim() || "";
            }
            getReviews(n) {
                return void 0 === n || 0 == n.length ? "" : this._siteParser.getReviews(n);
            }
            getPrice(n) {
                var o = null;
                if (void 0 !== (o = (0, l.$)(n.find("#buybox .kindle-price td")[1]).contents().filter((function() {
                    return 3 == this.nodeType;
                }))) && o.length > 0 && "" !== o[0].nodeValue.trim()) return o[0].nodeValue.trim();
                if (void 0 !== (o = (0, l.$)(n.find("#buybox .kindle-price span.a-color-price")).text()) && o.trim().length > 0) return o;
                if (void 0 !== (o = n.find("#buyNewSection").find(".a-color-price").text()) && o.trim().length > 0) return o;
                if (void 0 !== (o = n.find('[data-feature-name="newBooksSingleBuyingOptionHeader"], #newBooksSingleBuyingOptionHeader_feature_div, #unqualifiedBuyBox').find(".a-color-price").text()) && o.trim().length > 0) return o;
                if (void 0 !== (o = n.find("#newBuyBoxPrice").text()) && o.trim().length > 0) return o;
                if (void 0 !== (o = n.find('#buybox [data-offer-type="CASH_PREORDER"] .a-accordion-row .a-text-right').text()) && o.trim().length > 0) return o;
                if ((o = n.find("li.selected .olp-new .olp-from")).length && o[0].nextSibling && o[0].nextSibling.nodeValue.trim()) return o[0].nextSibling.nodeValue.trim();
                if (void 0 !== (o = n.find("#mediaTabs_tabSetContainer .a-row:first-child .a-color-price").text().trim()) && o.trim().length > 0) return o;
                if (void 0 !== (o = n.find("#accordion_row_header-COMPETITIVE_PRICE .a-text-right,#accordion_row_header-LIST_PRICE .a-text-right,#accordion_row_header-COMPETITIVE_MEMBER_PRICE .a-text-right,#audibleCashAccordionRow .a-accordion-row .a-price > span.a-offscreen").text().trim()) && o.length > 0) return o;
                if (void 0 !== (o = n.find("#tmmSwatches .a-button-selected .slot-price").text()) && o.trim().length > 0) return o;
                var r = n.find("#priceBlock b.priceLarge");
                if (r && "" !== r.text().trim()) return "free" == r.text().trim() ? this._siteParser.formatPrice("0" + this._siteParser.decimalSeparator + "00") : r.text().trim();
                if ((r = n.find("#kindle_meta_binding_winner .price")).length) return r.text().trim();
                if ((r = n.find(".tmm-olp-links .extra-message.olp-link a")).length) {
                    const n = r.eq(0).contents().filter((function() {
                        return 3 == this.nodeType;
                    })).text().trim();
                    if (n) return n;
                }
                return void 0 !== this._siteParser.getPrice && (o = this._siteParser.getPrice(n)), 
                null != o && o.length > 0 ? o : this._siteParser.formatPrice("0" + this._siteParser.decimalSeparator + "00");
            }
            getSalesRank(n) {
                if (void 0 === n || 0 == n.length) return "0";
                var o, r;
                if (void 0 === this._siteParser) return "0";
                if (void 0 !== this._siteParser.getSalesRank && (o = this._siteParser.getSalesRank(n)), 
                void 0 !== o && o.length > 0) return o;
                if (void 0 !== (o = n.find("#SalesRank").contents().filter((function() {
                    return 3 == this.nodeType;
                }))) && o.length >= 2) return void 0 === (r = o[1].nodeValue.trim()) || "" == r ? "0" : r.substring(r.indexOf(this._siteParser.numberSign) + this._siteParser.numberSign.length, r.indexOf(" "));
                if (!(r = void 0 !== (o = n.find("#detailBullets_feature_div+ul>li>span:eq(0)").contents().filter((function() {
                    return 3 == this.nodeType;
                }))) && o.length >= 2 ? o[1].nodeValue.trim() : (o = n.find("#detailsNarrationAccent").length ? n.find("#detailsNarrationAccent+tr > td > span > span:eq(0)") : n.find("#detailsAsin+tr > td > span > span:eq(0)")).text().trim())) return "0";
                var s = r.match(/(?:Nr\.|#)?\s?(\d+(?:[\.\,]?\d*)*)/);
                return s ? s[1].replace(/,/g, "") : "0";
            }
            getEstSale(n, o) {
                if (void 0 === n) return 1;
                if ("0" === n) return 0;
                const r = a.W.translateMachineTypeName(o, this._siteParser);
                let s, l, h = !r.toLowerCase().includes("kindle") && !r.toLowerCase().includes("audiobook"), p = r.toLowerCase().includes("audiobook"), x = new RegExp(this._siteParser.thousandSeparator.replace(".", "\\."), "g"), _ = parseInt(n.toString().replace(x, ""), 10);
                h ? (s = -.06, l = 3.696) : (s = -.08, l = 3.99);
                let y = Math.log10(_), v = Math.round(16.2 * Math.pow(10, l - .34 * y + s * y * y)) * (this._siteParser.estSalesPercentage / 100);
                return p && (v *= .4133), Math.round(v);
            }
            getSalesRecv(n, o) {
                return void 0 === n ? o : n * o;
            }
            getPrintLength(n) {
                var o = null;
                return void 0 !== this._siteParser.getPrintLength && (o = this._siteParser.getPrintLength(n)), 
                null !== o ? o : parseInt(n.find("#pageCountAvailable span").text()).toString();
            }
            getAuthor(n) {
                var o = null;
                if (void 0 !== this._siteParser.getAuthor && (o = this._siteParser.getAuthor(n)), 
                null !== o) return o;
                if ("" == (o = n.find(".contributorNameTrigger>a").text().trim())) {
                    var r = n.find(".contributorNameTrigger").attr("asin");
                    o = n.find("#contributorContainer" + r + " b:first").text().trim();
                }
                if (o || (o = n.find(".contributorNameID").text().trim()), "" == o && (o = n.find(".byLinePipe").parent().find("a:first").text().trim()), 
                "" == o) {
                    var s = n.find(".author a").contents().filter((function() {
                        return 3 == this.nodeType;
                    }));
                    o = s && s[0] && s[0].nodeValue.trim();
                }
                return o;
            }
            getSalesRankFromUrl(n, o) {
                var r = this;
                l.$.get(n, (function(n) {
                    var s = a.W.parseHtmlToJquery(n), l = r.getSalesRank(s);
                    l || (l = "1");
                    var h = r._siteParser.parsePrice(r.getPrice(s)), p = h == r._siteParser.free ? r._siteParser.free : r._siteParser.formatPrice(h);
                    o(l, h, p);
                }));
            }
            getBookType(n) {
                if (void 0 === n || 0 == n.length) return "";
                let o = "";
                const r = n.find("#mediaTabs_tabSetContainer").length > 0, s = n.find("#tmmSwatches ul").length > 0, a = n.find("#tmmSwatches").length > 0 && !s, h = n.find("#twister_feature_div").length > 0;
                if (r) o = n.find("#mediaTabs_tabSetContainer").find(".mediaTab_heading.a-active .mediaTab_title").text(); else if (h) o = n.find("#twister_feature_div .a-button-selected .text span").text(); else if (s || a) {
                    if (s ? (o = n.find("#tmmSwatches").find(".swatchElement.selected .a-button-text span:first-child").get(0), 
                    o = (0, l.$)(o).text().trim()) : (o = n.find("#tmmSwatches").find('a[href*="javascript:"]').get(0), 
                    (0, l.$)(o).find("style").remove(), o = (0, l.$)(o).find("span.slot-title:eq(0)").text().trim()), 
                    !o.trim()) if (o = n.find("#tmmSwatches").find(".swatchElement .a-button-text span:first-child:contains(Kindle)"), 
                    o.length) o = "Kindle"; else {
                        if (o = n.find("#ebooksProductTitle").nextAll("span:not(#bookEdition)").text() || n.find("#productTitle").next("span").text(), 
                        o && o.includes("Kindle")) return "Kindle";
                        let r = this._siteParser.getBookTypes();
                        for (const s of Object.keys(r)) if (o = n.find("#tmmSwatches").find(`.swatchElement .a-button-text span:first-child:contains(${s})`), 
                        o.length) return s.trim();
                        o = "";
                    }
                } else o = n.find("#ebooksProductTitle").nextAll("span:not(#bookEdition)").text() || n.find("#productTitle").next("span").text(), 
                "Large Print Edition" === o.trim() && (o = "Paperback");
                return o.trim();
            }
            getBookTypes(n) {
                let o = this._siteParser.getBookTypes(), r = this._siteParser.getAudioBookTypes();
                const s = this;
                let a = BookPageParser.getTabNodes(n);
                a instanceof h && (a = a.map((function() {
                    return (0, l.$)(this).text().trim();
                })).toArray());
                let p = a.filter((n => n.includes("Kindle") || o[n] || r[n])).map((function(n) {
                    return n.toLowerCase().includes("kindle") ? "Kindle" : s._siteParser.getCanonicalTypeName ? s._siteParser.getCanonicalTypeName(n) : n;
                })), x = {}, _ = {};
                for (const n of p) x[n] = (x[n] || 0) + 1;
                return p.map((n => x[n] > 1 ? (_[n] = (_[n] || 0) + 1, `${n}-${_[n]}`) : n));
            }
            static getTabNodes(n, o = !1) {
                const r = n.find("#mediaTabs_tabSetContainer").length > 0, s = n.find("#tmmSwatches ul").length > 0, a = n.find("#tmmSwatches").length > 0 && !s, h = n.find("#twister_feature_div").length > 0;
                let p;
                switch (!0) {
                  case r:
                    p = n.find("#mediaTabs_tabSetContainer"), p = o ? p.find(".mediaTab_heading") : p.find(".mediaTab_heading .mediaTab_title");
                    break;

                  case h:
                    p = n.find("#twister_feature_div .text span");
                    break;

                  case s:
                    p = n.find("#tmmSwatches"), p = o ? p.find("li.swatchElement .a-button-text") : p.find("li.swatchElement .a-button-text > span:first-child");
                    break;

                  case a:
                    p = n.find("#tmmSwatches"), p = p.find('.a-row span.slot-title, li a[role="button"]');
                    break;

                  default:
                    p = (0, l.$)();
                }
                return p.find("style").remove(), p;
            }
            getBookTypeUrls(n, o = null, r = null) {
                let s = Object.keys(this._siteParser.getBookTypes()), h = Object.keys(this._siteParser.getAudioBookTypes());
                const p = n.find("#mediaTabs_tabSetContainer").length > 0, x = n.find("#tmmSwatches ul").length > 0, _ = n.find("#tmmSwatches").length > 0 && !x, y = (n.find("#twister_feature_div").length, 
                this), v = BookPageParser.getTabNodes(n, !0).toArray().map((function(n) {
                    let r, s = "", h = (0, l.$)(n);
                    return p ? (r = h.find("a").attr("href"), s = h.find(".mediaTab_title").text().trim()) : x ? (r = h.attr("href"), 
                    s = h.find("> span:first-child").text().trim()) : _ && (r = h.parent("a").attr("href"), 
                    s = h.text().trim()), o && (r = `${(o = new URL(o)).protocol}//${o.hostname}/${r}`), 
                    s.includes("Kindle") && (s = "Kindle"), s = a.W.toCanonicalTypeName(s, y._siteParser), 
                    {
                        url: r,
                        text: s
                    };
                })).filter((({text: n, url: o}) => (!o || !o.includes("javascript:")) && (s.includes(n) || h.includes(n) || "Kindle" === n)));
                let w = {}, k = {};
                for (const {text: n} of v) w[n] = (w[n] || 0) + 1;
                return r && !r.toLowerCase().includes("kindle") && w[r] > 1 && (w[r] = (w[r] || 0) + 1, 
                k[r] = 1, w[r] > 1 && (r = `${r}-1`)), {
                    type: r,
                    typeUrls: v.map((n => {
                        let o = `${n.text}`, r = {
                            ...n
                        };
                        return w[o] > 1 && (k[o] = (k[o] || 0) + 1, r.text = `${o}-${k[o]}`), r;
                    }))
                };
            }
            getAllRanks(n, o = !1) {
                let r = this;
                const l = o ? async function(n) {
                    const o = await fetch(n.url);
                    return await o.text();
                } : s.V.sendMessageToBackgroundAsync;
                return (n instanceof h ? Promise.resolve(n) : l({
                    type: "http-get-bg",
                    url: n
                })).then((s => {
                    let l = s instanceof h ? s : a.W.parseHtmlToJquery(s), {srcType: p, rank: x, price: _, formattedPrice: y, estSale: v, estSalesRev: w, pages: k, asin: S, isbn10: P} = this.getBookTypeInfo(l), {type: A, typeUrls: T} = r.getBookTypeUrls(l, n instanceof h ? null : n, p);
                    return r._siteParser.getCanonicalTypeName && (A = r._siteParser.getCanonicalTypeName(A)), 
                    A = a.W.toMachineName(A), Promise.all([ Promise.resolve({
                        [A]: {
                            rank: x,
                            price: _,
                            formattedPrice: y,
                            estSale: v,
                            estSalesRev: w,
                            pages: k,
                            asin: S,
                            isbn10: P
                        }
                    }), r.getAdditionalRanks(T, o) ]);
                })).then((n => n.reduce(((n, o) => ({
                    ...n,
                    ...o
                })), {})));
            }
            getBookTypeInfo(n) {
                let o = this.getBookType(n), r = `${o}`, s = this.getSalesRank(n), l = this.getPrintLength(n), h = this.getAsin(n), p = this.getISBN10(n);
                o = a.W.toMachineName(o), s || (s = "1");
                let x = this._siteParser.parsePrice(this.getPrice(n)), _ = x == this._siteParser.free ? this._siteParser.free : this._siteParser.formatPrice(x), y = this.getEstSale(s, o), v = this._siteParser.parsePrice(x);
                return {
                    type: o,
                    rank: s,
                    price: x,
                    formattedPrice: _,
                    estSale: y,
                    estSalesRev: this.getSalesRecv(y, v),
                    srcType: r,
                    pages: l,
                    asin: h,
                    isbn10: p
                };
            }
            getAdditionalRanks(n, o = !1) {
                const r = this;
                let h = [];
                if (n.length) {
                    const p = o ? function(n) {
                        return l.$.get(n.url);
                    } : s.V.sendMessageToActiveTabAsync;
                    for (const s of n) h.push(new Promise((function(n) {
                        let l = s.url;
                        l.startsWith("http") || (l = `https:${r._siteParser.mainUrl}${l}`), p({
                            type: o ? "http-get-bg" : "http-get",
                            url: l
                        }).then((function(o) {
                            const l = a.W.parseHtmlToJquery(o);
                            let h = s.text;
                            r._siteParser.getCanonicalTypeName && (h = r._siteParser.getCanonicalTypeName(h)), 
                            h = a.W.toMachineName(h);
                            let {rank: p, price: x, formattedPrice: _, estSale: y, estSalesRev: v, pages: w, asin: k, isbn10: S} = r.getBookTypeInfo(l);
                            n({
                                [h]: {
                                    rank: p,
                                    price: x,
                                    formattedPrice: _,
                                    estSale: y,
                                    estSalesRev: v,
                                    pages: w,
                                    asin: k,
                                    isbn10: S
                                }
                            });
                        }));
                    })));
                }
                return Promise.all(h).then((n => n.reduce(((n, o) => ({
                    ...n,
                    ...o
                })), {})));
            }
            getBookData(n, o, r, l, h = "kindle") {
                const p = this;
                n.startsWith("/") && (n = window.location.origin + n), s.V.sendMessageToActiveTab({
                    type: "http-get",
                    url: n
                }, (function(s) {
                    try {
                        var x = a.W.parseHtmlToJquery(s), _ = p.getTitle(x);
                        if ("" == _ && (_ = p.getAuthorTitle(x)), void 0 === _) return;
                        var y = p.getDescription(x);
                        r || (r = p.getReviews(x)), o && 0 !== p._siteParser.parsePrice(o) || (o = p.getPrice(x));
                        let v = p.getSalesRank(x), w = p.getEstSale(v, h), k = p._siteParser.parsePrice(o), S = p.getSalesRecv(w, k), P = p.getPrintLength(x), A = p.getAuthor(x), T = p.getGoogleSearchUrlByTitleAndAuthor(_, A), R = p.getImageUrl(x), O = p.getRating(x), C = p.getAsin(x), z = p.getISBN10(x);
                        p.getGoogleImageSearchUrl(x, n, (function(n) {
                            p.getDateOfPublication(x, (function(s) {
                                void 0 !== w && w || (w = "0"), void 0 !== S && S || (S = "0"), void 0 === r && (r = "0"), 
                                (void 0 === v || v.length < 1) && (v = "1"), void 0 !== P && "" != P && "NaN" != P || (P = "n/a"), 
                                (void 0 === A || A.length < 1) && (A = "n/a"), void 0 === R && (R = ""), (null == O || O.length < 1) && (O = "0"), 
                                (void 0 === C || C.length < 1) && (C = "n/a"), p.getAllRanks(x).then((function(a) {
                                    return l({
                                        title: _,
                                        type: h,
                                        bookTypes: p.getBookTypes(x),
                                        description: y,
                                        price: k,
                                        formattedPrice: o == p._siteParser.free ? p._siteParser.free : p._siteParser.formatPrice(k),
                                        estSale: w,
                                        salesRecv: S,
                                        reviews: r,
                                        salesRank: v,
                                        allRanks: a,
                                        printLength: P,
                                        author: A,
                                        dateOfPublication: s,
                                        googleSearchUrl: T,
                                        googleImageSearchUrl: n,
                                        imageUrl: R,
                                        rating: O,
                                        asin: C,
                                        isbn10: z
                                    });
                                }));
                            }));
                        }));
                    } catch (n) {
                        l(null);
                    }
                }));
            }
        }
    },
    785: (n, o, r) => {
        "use strict";
        r.r(o), r.d(o, {
            default: () => p
        });
        var s = r(81), a = r.n(s), l = r(645), h = r.n(l)()(a());
        h.push([ n.id, ".tooltipster-fall,.tooltipster-grow.tooltipster-show{-webkit-transition-timing-function:cubic-bezier(.175,.885,.32,1);-moz-transition-timing-function:cubic-bezier(.175,.885,.32,1.15);-ms-transition-timing-function:cubic-bezier(.175,.885,.32,1.15);-o-transition-timing-function:cubic-bezier(.175,.885,.32,1.15)}.tooltipster-base{display:flex;pointer-events:none;position:absolute}.tooltipster-box{flex:1 1 auto}.tooltipster-content{box-sizing:border-box;max-height:100%;max-width:100%;overflow:auto}.tooltipster-ruler{bottom:0;left:0;overflow:hidden;position:fixed;right:0;top:0;visibility:hidden}.tooltipster-fade{opacity:0;-webkit-transition-property:opacity;-moz-transition-property:opacity;-o-transition-property:opacity;-ms-transition-property:opacity;transition-property:opacity}.tooltipster-fade.tooltipster-show{opacity:1}.tooltipster-grow{-webkit-transform:scale(0,0);-moz-transform:scale(0,0);-o-transform:scale(0,0);-ms-transform:scale(0,0);transform:scale(0,0);-webkit-transition-property:-webkit-transform;-moz-transition-property:-moz-transform;-o-transition-property:-o-transform;-ms-transition-property:-ms-transform;transition-property:transform;-webkit-backface-visibility:hidden}.tooltipster-grow.tooltipster-show{-webkit-transform:scale(1,1);-moz-transform:scale(1,1);-o-transform:scale(1,1);-ms-transform:scale(1,1);transform:scale(1,1);-webkit-transition-timing-function:cubic-bezier(.175,.885,.32,1.15);transition-timing-function:cubic-bezier(.175,.885,.32,1.15)}.tooltipster-swing{opacity:0;-webkit-transform:rotateZ(4deg);-moz-transform:rotateZ(4deg);-o-transform:rotateZ(4deg);-ms-transform:rotateZ(4deg);transform:rotateZ(4deg);-webkit-transition-property:-webkit-transform,opacity;-moz-transition-property:-moz-transform;-o-transition-property:-o-transform;-ms-transition-property:-ms-transform;transition-property:transform}.tooltipster-swing.tooltipster-show{opacity:1;-webkit-transform:rotateZ(0);-moz-transform:rotateZ(0);-o-transform:rotateZ(0);-ms-transform:rotateZ(0);transform:rotateZ(0);-webkit-transition-timing-function:cubic-bezier(.23,.635,.495,1);-webkit-transition-timing-function:cubic-bezier(.23,.635,.495,2.4);-moz-transition-timing-function:cubic-bezier(.23,.635,.495,2.4);-ms-transition-timing-function:cubic-bezier(.23,.635,.495,2.4);-o-transition-timing-function:cubic-bezier(.23,.635,.495,2.4);transition-timing-function:cubic-bezier(.23,.635,.495,2.4)}.tooltipster-fall{-webkit-transition-property:top;-moz-transition-property:top;-o-transition-property:top;-ms-transition-property:top;transition-property:top;-webkit-transition-timing-function:cubic-bezier(.175,.885,.32,1.15);transition-timing-function:cubic-bezier(.175,.885,.32,1.15)}.tooltipster-fall.tooltipster-initial{top:0!important}.tooltipster-fall.tooltipster-dying{-webkit-transition-property:all;-moz-transition-property:all;-o-transition-property:all;-ms-transition-property:all;transition-property:all;top:0!important;opacity:0}.tooltipster-slide{-webkit-transition-property:left;-moz-transition-property:left;-o-transition-property:left;-ms-transition-property:left;transition-property:left;-webkit-transition-timing-function:cubic-bezier(.175,.885,.32,1);-webkit-transition-timing-function:cubic-bezier(.175,.885,.32,1.15);-moz-transition-timing-function:cubic-bezier(.175,.885,.32,1.15);-ms-transition-timing-function:cubic-bezier(.175,.885,.32,1.15);-o-transition-timing-function:cubic-bezier(.175,.885,.32,1.15);transition-timing-function:cubic-bezier(.175,.885,.32,1.15)}.tooltipster-slide.tooltipster-initial{left:-40px!important}.tooltipster-slide.tooltipster-dying{-webkit-transition-property:all;-moz-transition-property:all;-o-transition-property:all;-ms-transition-property:all;transition-property:all;left:0!important;opacity:0}@keyframes tooltipster-fading{0%{opacity:0}100%{opacity:1}}.tooltipster-update-fade{animation:tooltipster-fading .4s}@keyframes tooltipster-rotating{25%{transform:rotate(-2deg)}75%{transform:rotate(2deg)}100%{transform:rotate(0)}}.tooltipster-update-rotate{animation:tooltipster-rotating .6s}@keyframes tooltipster-scaling{50%{transform:scale(1.1)}100%{transform:scale(1)}}.tooltipster-update-scale{animation:tooltipster-scaling .6s}.tooltipster-sidetip .tooltipster-box{background:#565656;border:2px solid #000;border-radius:4px}.tooltipster-sidetip.tooltipster-bottom .tooltipster-box{margin-top:8px}.tooltipster-sidetip.tooltipster-left .tooltipster-box{margin-right:8px}.tooltipster-sidetip.tooltipster-right .tooltipster-box{margin-left:8px}.tooltipster-sidetip.tooltipster-top .tooltipster-box{margin-bottom:8px}.tooltipster-sidetip .tooltipster-content{color:#fff;line-height:18px;padding:6px 14px}.tooltipster-sidetip .tooltipster-arrow{overflow:hidden;position:absolute}.tooltipster-sidetip.tooltipster-bottom .tooltipster-arrow{height:10px;margin-left:-10px;top:0;width:20px}.tooltipster-sidetip.tooltipster-left .tooltipster-arrow{height:20px;margin-top:-10px;right:0;top:0;width:10px}.tooltipster-sidetip.tooltipster-right .tooltipster-arrow{height:20px;margin-top:-10px;left:0;top:0;width:10px}.tooltipster-sidetip.tooltipster-top .tooltipster-arrow{bottom:0;height:10px;margin-left:-10px;width:20px}.tooltipster-sidetip .tooltipster-arrow-background,.tooltipster-sidetip .tooltipster-arrow-border{height:0;position:absolute;width:0}.tooltipster-sidetip .tooltipster-arrow-background{border:10px solid transparent}.tooltipster-sidetip.tooltipster-bottom .tooltipster-arrow-background{border-bottom-color:#565656;left:0;top:3px}.tooltipster-sidetip.tooltipster-left .tooltipster-arrow-background{border-left-color:#565656;left:-3px;top:0}.tooltipster-sidetip.tooltipster-right .tooltipster-arrow-background{border-right-color:#565656;left:3px;top:0}.tooltipster-sidetip.tooltipster-top .tooltipster-arrow-background{border-top-color:#565656;left:0;top:-3px}.tooltipster-sidetip .tooltipster-arrow-border{border:10px solid transparent;left:0;top:0}.tooltipster-sidetip.tooltipster-bottom .tooltipster-arrow-border{border-bottom-color:#000}.tooltipster-sidetip.tooltipster-left .tooltipster-arrow-border{border-left-color:#000}.tooltipster-sidetip.tooltipster-right .tooltipster-arrow-border{border-right-color:#000}.tooltipster-sidetip.tooltipster-top .tooltipster-arrow-border{border-top-color:#000}.tooltipster-sidetip .tooltipster-arrow-uncropped{position:relative}.tooltipster-sidetip.tooltipster-bottom .tooltipster-arrow-uncropped{top:-10px}.tooltipster-sidetip.tooltipster-right .tooltipster-arrow-uncropped{left:-10px}", "" ]);
        const p = 532 == r.j ? h : null;
    },
    404: (n, o, r) => {
        "use strict";
        r.r(o), r.d(o, {
            default: () => p
        });
        var s = r(81), a = r.n(s), l = r(645), h = r.n(l)()(a());
        h.push([ n.id, "@font-face {\n    font-family: Ubuntu-Regular;\n    src: url('/assets/fonts/ubuntu/Ubuntu-Regular.ttf');\n}\n\n@font-face {\n    font-family: Ubuntu-Bold;\n    src: url('/assets/fonts/ubuntu/Ubuntu-Bold.ttf');\n}\n\nhtml,\nbody {\n    margin: 0;\n    padding: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-family: Ubuntu-Regular, sans-serif;\n\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n\nmain {\n    box-sizing: border-box;\n    width: 770px;\n    height: 570px; /* Original popup heights is 592px */\n    background: #527190;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n\n    padding: 48px;\n    padding-top: 0px;\n}\n\n.popup main {\n    height: 591px;\n}\n\nbody:not(.popup) .show-in-popup-only {\n    display: none;\n}\n\n.logo {\n    margin: 18px 0;\n}\n\n.inner-box {\n    background: #fff9ed;\n    border: 1px solid #000000;\n    box-sizing: border-box;\n    width: 100%;\n    flex-grow: 1;\n    display: flex;\n    flex-direction: column;\n\n    padding: 36px 36px 20px;\n}\n\n.footer {\n    flex-grow: 1;\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-end;\n    align-items: center;\n}\n\n.footer div,\n.footer a {\n    text-align: center;\n}\n\n.option {\n    display: flex;\n    align-items: center;\n    margin: 8px 0;\n}\n\n.option .title {\n    font-family: Ubuntu-Regular, sans-serif;\n    width: 190px;\n    font-size: 16px;\n    color: #333333;\n}\n\n.option .control {\n    font-size: 13px;\n}\n\n.option .extra-control {\n    margin-left: 12px;\n}\n\n.radio-group {\n    display: flex;\n    /*justify-content: space-between;*/\n    align-items: center;\n    background: #ffffff;\n    border: 2px solid #666;\n    box-sizing: border-box;\n    height: 40px;\n    width: 260px;\n    padding: 0 12px;\n    color: #333333;\n}\n\ninput[type='radio'] {\n    margin: 0 4px 0 0;\n}\n\n.radio {\n    display: inline-flex;\n    align-items: center;\n}\n\n.radio-group .radio {\n    flex-grow: 1;\n}\n\n#regionSelector {\n    border: 2px solid #666;\n    height: 34px;\n    width: 100px;\n}\n\n.buttons {\n    display: flex;\n    margin-top: 24px;\n}\n\n.button {\n    background: #d77631;\n    padding: 12px 20px;\n    cursor: pointer;\n    color: white;\n    width: 100px;\n    height: 40px;\n    box-sizing: border-box;\n    line-height: 1.2;\n    text-align: center;\n    font-size: 14px;\n    font-family: Ubuntu-Regular, sans-serif;\n    margin-right: 12px;\n    border-radius: 2px;\n}\n\n.button:hover {\n    background: #cd7030;\n}\n\n#back {\n    width: 140px;\n}\n\n.button.primary {\n    font-weight: 700;\n    font-family: Ubuntu-Bold, sans-serif;\n}\n\n.hr {\n    box-sizing: border-box;\n    margin: 24px 0;\n    width: 100%;\n    border-top: 1px solid #999999;\n}\n\n.audiobooks-not-supported {\n    display: none;\n}\n\nlabel.disabled {\n    color: #999999;\n}\n\n.radio-group-location {\n    flex-direction: column;\n    align-items: flex-start;\n    height: auto;\n    width: 372px;\n}\n\n.radio-group-location .radio {\n    margin-top: 8px;\n}\n\n.radio-group-location .radio:last-child {\n    margin-bottom: 8px;\n}\n", "" ]);
        const p = 756 == r.j ? h : null;
    },
    903: (n, o, r) => {
        "use strict";
        r.r(o), r.d(o, {
            default: () => p
        });
        var s = r(81), a = r.n(s), l = r(645), h = r.n(l)()(a());
        h.push([ n.id, "/*!\n *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\n */\n@font-face {\n    font-family: 'FontAwesome';\n    src: url('../fonts/fontawesome-webfont.eot?v=4.7.0');\n    src: url('../fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'),\n        url('../fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'),\n        url('../fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'),\n        url('../fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype'),\n        url('../fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg');\n    font-weight: normal;\n    font-style: normal;\n}\n.fa {\n    display: inline-block;\n    font: normal normal normal 14px/1 FontAwesome;\n    font-size: inherit;\n    text-rendering: auto;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n.fa-lg {\n    font-size: 1.33333333em;\n    line-height: 0.75em;\n    vertical-align: -15%;\n}\n.fa-2x {\n    font-size: 2em;\n}\n.fa-3x {\n    font-size: 3em;\n}\n.fa-4x {\n    font-size: 4em;\n}\n.fa-5x {\n    font-size: 5em;\n}\n.fa-fw {\n    width: 1.28571429em;\n    text-align: center;\n}\n.fa-ul {\n    padding-left: 0;\n    margin-left: 2.14285714em;\n    list-style-type: none;\n}\n.fa-ul > li {\n    position: relative;\n}\n.fa-li {\n    position: absolute;\n    left: -2.14285714em;\n    width: 2.14285714em;\n    top: 0.14285714em;\n    text-align: center;\n}\n.fa-li.fa-lg {\n    left: -1.85714286em;\n}\n.fa-border {\n    padding: 0.2em 0.25em 0.15em;\n    border: solid 0.08em #eee;\n    border-radius: 0.1em;\n}\n.fa-pull-left {\n    float: left;\n}\n.fa-pull-right {\n    float: right;\n}\n.fa.fa-pull-left {\n    margin-right: 0.3em;\n}\n.fa.fa-pull-right {\n    margin-left: 0.3em;\n}\n.pull-right {\n    float: right;\n}\n.pull-left {\n    float: left;\n}\n.fa.pull-left {\n    margin-right: 0.3em;\n}\n.fa.pull-right {\n    margin-left: 0.3em;\n}\n.fa-spin {\n    -webkit-animation: fa-spin 2s infinite linear;\n    animation: fa-spin 2s infinite linear;\n}\n.fa-pulse {\n    -webkit-animation: fa-spin 1s infinite steps(8);\n    animation: fa-spin 1s infinite steps(8);\n}\n@-webkit-keyframes fa-spin {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n    }\n}\n@keyframes fa-spin {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n    }\n}\n.fa-rotate-90 {\n    -ms-filter: 'progid:DXImageTransform.Microsoft.BasicImage(rotation=1)';\n    -webkit-transform: rotate(90deg);\n    -ms-transform: rotate(90deg);\n    transform: rotate(90deg);\n}\n.fa-rotate-180 {\n    -ms-filter: 'progid:DXImageTransform.Microsoft.BasicImage(rotation=2)';\n    -webkit-transform: rotate(180deg);\n    -ms-transform: rotate(180deg);\n    transform: rotate(180deg);\n}\n.fa-rotate-270 {\n    -ms-filter: 'progid:DXImageTransform.Microsoft.BasicImage(rotation=3)';\n    -webkit-transform: rotate(270deg);\n    -ms-transform: rotate(270deg);\n    transform: rotate(270deg);\n}\n.fa-flip-horizontal {\n    -ms-filter: 'progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)';\n    -webkit-transform: scale(-1, 1);\n    -ms-transform: scale(-1, 1);\n    transform: scale(-1, 1);\n}\n.fa-flip-vertical {\n    -ms-filter: 'progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)';\n    -webkit-transform: scale(1, -1);\n    -ms-transform: scale(1, -1);\n    transform: scale(1, -1);\n}\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n    filter: none;\n}\n.fa-stack {\n    position: relative;\n    display: inline-block;\n    width: 2em;\n    height: 2em;\n    line-height: 2em;\n    vertical-align: middle;\n}\n.fa-stack-1x,\n.fa-stack-2x {\n    position: absolute;\n    left: 0;\n    width: 100%;\n    text-align: center;\n}\n.fa-stack-1x {\n    line-height: inherit;\n}\n.fa-stack-2x {\n    font-size: 2em;\n}\n.fa-inverse {\n    color: #fff;\n}\n.fa-glass:before {\n    content: '\\f000';\n}\n.fa-music:before {\n    content: '\\f001';\n}\n.fa-search:before {\n    content: '\\f002';\n}\n.fa-envelope-o:before {\n    content: '\\f003';\n}\n.fa-heart:before {\n    content: '\\f004';\n}\n.fa-star:before {\n    content: '\\f005';\n}\n.fa-star-o:before {\n    content: '\\f006';\n}\n.fa-user:before {\n    content: '\\f007';\n}\n.fa-film:before {\n    content: '\\f008';\n}\n.fa-th-large:before {\n    content: '\\f009';\n}\n.fa-th:before {\n    content: '\\f00a';\n}\n.fa-th-list:before {\n    content: '\\f00b';\n}\n.fa-check:before {\n    content: '\\f00c';\n}\n.fa-remove:before,\n.fa-close:before,\n.fa-times:before {\n    content: '\\f00d';\n}\n.fa-search-plus:before {\n    content: '\\f00e';\n}\n.fa-search-minus:before {\n    content: '\\f010';\n}\n.fa-power-off:before {\n    content: '\\f011';\n}\n.fa-signal:before {\n    content: '\\f012';\n}\n.fa-gear:before,\n.fa-cog:before {\n    content: '\\f013';\n}\n.fa-trash-o:before {\n    content: '\\f014';\n}\n.fa-home:before {\n    content: '\\f015';\n}\n.fa-file-o:before {\n    content: '\\f016';\n}\n.fa-clock-o:before {\n    content: '\\f017';\n}\n.fa-road:before {\n    content: '\\f018';\n}\n.fa-download:before {\n    content: '\\f019';\n}\n.fa-arrow-circle-o-down:before {\n    content: '\\f01a';\n}\n.fa-arrow-circle-o-up:before {\n    content: '\\f01b';\n}\n.fa-inbox:before {\n    content: '\\f01c';\n}\n.fa-play-circle-o:before {\n    content: '\\f01d';\n}\n.fa-rotate-right:before,\n.fa-repeat:before {\n    content: '\\f01e';\n}\n.fa-refresh:before {\n    content: '\\f021';\n}\n.fa-list-alt:before {\n    content: '\\f022';\n}\n.fa-lock:before {\n    content: '\\f023';\n}\n.fa-flag:before {\n    content: '\\f024';\n}\n.fa-headphones:before {\n    content: '\\f025';\n}\n.fa-volume-off:before {\n    content: '\\f026';\n}\n.fa-volume-down:before {\n    content: '\\f027';\n}\n.fa-volume-up:before {\n    content: '\\f028';\n}\n.fa-qrcode:before {\n    content: '\\f029';\n}\n.fa-barcode:before {\n    content: '\\f02a';\n}\n.fa-tag:before {\n    content: '\\f02b';\n}\n.fa-tags:before {\n    content: '\\f02c';\n}\n.fa-book:before {\n    content: '\\f02d';\n}\n.fa-bookmark:before {\n    content: '\\f02e';\n}\n.fa-print:before {\n    content: '\\f02f';\n}\n.fa-camera:before {\n    content: '\\f030';\n}\n.fa-font:before {\n    content: '\\f031';\n}\n.fa-bold:before {\n    content: '\\f032';\n}\n.fa-italic:before {\n    content: '\\f033';\n}\n.fa-text-height:before {\n    content: '\\f034';\n}\n.fa-text-width:before {\n    content: '\\f035';\n}\n.fa-align-left:before {\n    content: '\\f036';\n}\n.fa-align-center:before {\n    content: '\\f037';\n}\n.fa-align-right:before {\n    content: '\\f038';\n}\n.fa-align-justify:before {\n    content: '\\f039';\n}\n.fa-list:before {\n    content: '\\f03a';\n}\n.fa-dedent:before,\n.fa-outdent:before {\n    content: '\\f03b';\n}\n.fa-indent:before {\n    content: '\\f03c';\n}\n.fa-video-camera:before {\n    content: '\\f03d';\n}\n.fa-photo:before,\n.fa-image:before,\n.fa-picture-o:before {\n    content: '\\f03e';\n}\n.fa-pencil:before {\n    content: '\\f040';\n}\n.fa-map-marker:before {\n    content: '\\f041';\n}\n.fa-adjust:before {\n    content: '\\f042';\n}\n.fa-tint:before {\n    content: '\\f043';\n}\n.fa-edit:before,\n.fa-pencil-square-o:before {\n    content: '\\f044';\n}\n.fa-share-square-o:before {\n    content: '\\f045';\n}\n.fa-check-square-o:before {\n    content: '\\f046';\n}\n.fa-arrows:before {\n    content: '\\f047';\n}\n.fa-step-backward:before {\n    content: '\\f048';\n}\n.fa-fast-backward:before {\n    content: '\\f049';\n}\n.fa-backward:before {\n    content: '\\f04a';\n}\n.fa-play:before {\n    content: '\\f04b';\n}\n.fa-pause:before {\n    content: '\\f04c';\n}\n.fa-stop:before {\n    content: '\\f04d';\n}\n.fa-forward:before {\n    content: '\\f04e';\n}\n.fa-fast-forward:before {\n    content: '\\f050';\n}\n.fa-step-forward:before {\n    content: '\\f051';\n}\n.fa-eject:before {\n    content: '\\f052';\n}\n.fa-chevron-left:before {\n    content: '\\f053';\n}\n.fa-chevron-right:before {\n    content: '\\f054';\n}\n.fa-plus-circle:before {\n    content: '\\f055';\n}\n.fa-minus-circle:before {\n    content: '\\f056';\n}\n.fa-times-circle:before {\n    content: '\\f057';\n}\n.fa-check-circle:before {\n    content: '\\f058';\n}\n.fa-question-circle:before {\n    content: '\\f059';\n}\n.fa-info-circle:before {\n    content: '\\f05a';\n}\n.fa-crosshairs:before {\n    content: '\\f05b';\n}\n.fa-times-circle-o:before {\n    content: '\\f05c';\n}\n.fa-check-circle-o:before {\n    content: '\\f05d';\n}\n.fa-ban:before {\n    content: '\\f05e';\n}\n.fa-arrow-left:before {\n    content: '\\f060';\n}\n.fa-arrow-right:before {\n    content: '\\f061';\n}\n.fa-arrow-up:before {\n    content: '\\f062';\n}\n.fa-arrow-down:before {\n    content: '\\f063';\n}\n.fa-mail-forward:before,\n.fa-share:before {\n    content: '\\f064';\n}\n.fa-expand:before {\n    content: '\\f065';\n}\n.fa-compress:before {\n    content: '\\f066';\n}\n.fa-plus:before {\n    content: '\\f067';\n}\n.fa-minus:before {\n    content: '\\f068';\n}\n.fa-asterisk:before {\n    content: '\\f069';\n}\n.fa-exclamation-circle:before {\n    content: '\\f06a';\n}\n.fa-gift:before {\n    content: '\\f06b';\n}\n.fa-leaf:before {\n    content: '\\f06c';\n}\n.fa-fire:before {\n    content: '\\f06d';\n}\n.fa-eye:before {\n    content: '\\f06e';\n}\n.fa-eye-slash:before {\n    content: '\\f070';\n}\n.fa-warning:before,\n.fa-exclamation-triangle:before {\n    content: '\\f071';\n}\n.fa-plane:before {\n    content: '\\f072';\n}\n.fa-calendar:before {\n    content: '\\f073';\n}\n.fa-random:before {\n    content: '\\f074';\n}\n.fa-comment:before {\n    content: '\\f075';\n}\n.fa-magnet:before {\n    content: '\\f076';\n}\n.fa-chevron-up:before {\n    content: '\\f077';\n}\n.fa-chevron-down:before {\n    content: '\\f078';\n}\n.fa-retweet:before {\n    content: '\\f079';\n}\n.fa-shopping-cart:before {\n    content: '\\f07a';\n}\n.fa-folder:before {\n    content: '\\f07b';\n}\n.fa-folder-open:before {\n    content: '\\f07c';\n}\n.fa-arrows-v:before {\n    content: '\\f07d';\n}\n.fa-arrows-h:before {\n    content: '\\f07e';\n}\n.fa-bar-chart-o:before,\n.fa-bar-chart:before {\n    content: '\\f080';\n}\n.fa-twitter-square:before {\n    content: '\\f081';\n}\n.fa-facebook-square:before {\n    content: '\\f082';\n}\n.fa-camera-retro:before {\n    content: '\\f083';\n}\n.fa-key:before {\n    content: '\\f084';\n}\n.fa-gears:before,\n.fa-cogs:before {\n    content: '\\f085';\n}\n.fa-comments:before {\n    content: '\\f086';\n}\n.fa-thumbs-o-up:before {\n    content: '\\f087';\n}\n.fa-thumbs-o-down:before {\n    content: '\\f088';\n}\n.fa-star-half:before {\n    content: '\\f089';\n}\n.fa-heart-o:before {\n    content: '\\f08a';\n}\n.fa-sign-out:before {\n    content: '\\f08b';\n}\n.fa-linkedin-square:before {\n    content: '\\f08c';\n}\n.fa-thumb-tack:before {\n    content: '\\f08d';\n}\n.fa-external-link:before {\n    content: '\\f08e';\n}\n.fa-sign-in:before {\n    content: '\\f090';\n}\n.fa-trophy:before {\n    content: '\\f091';\n}\n.fa-github-square:before {\n    content: '\\f092';\n}\n.fa-upload:before {\n    content: '\\f093';\n}\n.fa-lemon-o:before {\n    content: '\\f094';\n}\n.fa-phone:before {\n    content: '\\f095';\n}\n.fa-square-o:before {\n    content: '\\f096';\n}\n.fa-bookmark-o:before {\n    content: '\\f097';\n}\n.fa-phone-square:before {\n    content: '\\f098';\n}\n.fa-twitter:before {\n    content: '\\f099';\n}\n.fa-facebook-f:before,\n.fa-facebook:before {\n    content: '\\f09a';\n}\n.fa-github:before {\n    content: '\\f09b';\n}\n.fa-unlock:before {\n    content: '\\f09c';\n}\n.fa-credit-card:before {\n    content: '\\f09d';\n}\n.fa-feed:before,\n.fa-rss:before {\n    content: '\\f09e';\n}\n.fa-hdd-o:before {\n    content: '\\f0a0';\n}\n.fa-bullhorn:before {\n    content: '\\f0a1';\n}\n.fa-bell:before {\n    content: '\\f0f3';\n}\n.fa-certificate:before {\n    content: '\\f0a3';\n}\n.fa-hand-o-right:before {\n    content: '\\f0a4';\n}\n.fa-hand-o-left:before {\n    content: '\\f0a5';\n}\n.fa-hand-o-up:before {\n    content: '\\f0a6';\n}\n.fa-hand-o-down:before {\n    content: '\\f0a7';\n}\n.fa-arrow-circle-left:before {\n    content: '\\f0a8';\n}\n.fa-arrow-circle-right:before {\n    content: '\\f0a9';\n}\n.fa-arrow-circle-up:before {\n    content: '\\f0aa';\n}\n.fa-arrow-circle-down:before {\n    content: '\\f0ab';\n}\n.fa-globe:before {\n    content: '\\f0ac';\n}\n.fa-wrench:before {\n    content: '\\f0ad';\n}\n.fa-tasks:before {\n    content: '\\f0ae';\n}\n.fa-filter:before {\n    content: '\\f0b0';\n}\n.fa-briefcase:before {\n    content: '\\f0b1';\n}\n.fa-arrows-alt:before {\n    content: '\\f0b2';\n}\n.fa-group:before,\n.fa-users:before {\n    content: '\\f0c0';\n}\n.fa-chain:before,\n.fa-link:before {\n    content: '\\f0c1';\n}\n.fa-cloud:before {\n    content: '\\f0c2';\n}\n.fa-flask:before {\n    content: '\\f0c3';\n}\n.fa-cut:before,\n.fa-scissors:before {\n    content: '\\f0c4';\n}\n.fa-copy:before,\n.fa-files-o:before {\n    content: '\\f0c5';\n}\n.fa-paperclip:before {\n    content: '\\f0c6';\n}\n.fa-save:before,\n.fa-floppy-o:before {\n    content: '\\f0c7';\n}\n.fa-square:before {\n    content: '\\f0c8';\n}\n.fa-navicon:before,\n.fa-reorder:before,\n.fa-bars:before {\n    content: '\\f0c9';\n}\n.fa-list-ul:before {\n    content: '\\f0ca';\n}\n.fa-list-ol:before {\n    content: '\\f0cb';\n}\n.fa-strikethrough:before {\n    content: '\\f0cc';\n}\n.fa-underline:before {\n    content: '\\f0cd';\n}\n.fa-table:before {\n    content: '\\f0ce';\n}\n.fa-magic:before {\n    content: '\\f0d0';\n}\n.fa-truck:before {\n    content: '\\f0d1';\n}\n.fa-pinterest:before {\n    content: '\\f0d2';\n}\n.fa-pinterest-square:before {\n    content: '\\f0d3';\n}\n.fa-google-plus-square:before {\n    content: '\\f0d4';\n}\n.fa-google-plus:before {\n    content: '\\f0d5';\n}\n.fa-money:before {\n    content: '\\f0d6';\n}\n.fa-caret-down:before {\n    content: '\\f0d7';\n}\n.fa-caret-up:before {\n    content: '\\f0d8';\n}\n.fa-caret-left:before {\n    content: '\\f0d9';\n}\n.fa-caret-right:before {\n    content: '\\f0da';\n}\n.fa-columns:before {\n    content: '\\f0db';\n}\n.fa-unsorted:before,\n.fa-sort:before {\n    content: '\\f0dc';\n}\n.fa-sort-down:before,\n.fa-sort-desc:before {\n    content: '\\f0dd';\n}\n.fa-sort-up:before,\n.fa-sort-asc:before {\n    content: '\\f0de';\n}\n.fa-envelope:before {\n    content: '\\f0e0';\n}\n.fa-linkedin:before {\n    content: '\\f0e1';\n}\n.fa-rotate-left:before,\n.fa-undo:before {\n    content: '\\f0e2';\n}\n.fa-legal:before,\n.fa-gavel:before {\n    content: '\\f0e3';\n}\n.fa-dashboard:before,\n.fa-tachometer:before {\n    content: '\\f0e4';\n}\n.fa-comment-o:before {\n    content: '\\f0e5';\n}\n.fa-comments-o:before {\n    content: '\\f0e6';\n}\n.fa-flash:before,\n.fa-bolt:before {\n    content: '\\f0e7';\n}\n.fa-sitemap:before {\n    content: '\\f0e8';\n}\n.fa-umbrella:before {\n    content: '\\f0e9';\n}\n.fa-paste:before,\n.fa-clipboard:before {\n    content: '\\f0ea';\n}\n.fa-lightbulb-o:before {\n    content: '\\f0eb';\n}\n.fa-exchange:before {\n    content: '\\f0ec';\n}\n.fa-cloud-download:before {\n    content: '\\f0ed';\n}\n.fa-cloud-upload:before {\n    content: '\\f0ee';\n}\n.fa-user-md:before {\n    content: '\\f0f0';\n}\n.fa-stethoscope:before {\n    content: '\\f0f1';\n}\n.fa-suitcase:before {\n    content: '\\f0f2';\n}\n.fa-bell-o:before {\n    content: '\\f0a2';\n}\n.fa-coffee:before {\n    content: '\\f0f4';\n}\n.fa-cutlery:before {\n    content: '\\f0f5';\n}\n.fa-file-text-o:before {\n    content: '\\f0f6';\n}\n.fa-building-o:before {\n    content: '\\f0f7';\n}\n.fa-hospital-o:before {\n    content: '\\f0f8';\n}\n.fa-ambulance:before {\n    content: '\\f0f9';\n}\n.fa-medkit:before {\n    content: '\\f0fa';\n}\n.fa-fighter-jet:before {\n    content: '\\f0fb';\n}\n.fa-beer:before {\n    content: '\\f0fc';\n}\n.fa-h-square:before {\n    content: '\\f0fd';\n}\n.fa-plus-square:before {\n    content: '\\f0fe';\n}\n.fa-angle-double-left:before {\n    content: '\\f100';\n}\n.fa-angle-double-right:before {\n    content: '\\f101';\n}\n.fa-angle-double-up:before {\n    content: '\\f102';\n}\n.fa-angle-double-down:before {\n    content: '\\f103';\n}\n.fa-angle-left:before {\n    content: '\\f104';\n}\n.fa-angle-right:before {\n    content: '\\f105';\n}\n.fa-angle-up:before {\n    content: '\\f106';\n}\n.fa-angle-down:before {\n    content: '\\f107';\n}\n.fa-desktop:before {\n    content: '\\f108';\n}\n.fa-laptop:before {\n    content: '\\f109';\n}\n.fa-tablet:before {\n    content: '\\f10a';\n}\n.fa-mobile-phone:before,\n.fa-mobile:before {\n    content: '\\f10b';\n}\n.fa-circle-o:before {\n    content: '\\f10c';\n}\n.fa-quote-left:before {\n    content: '\\f10d';\n}\n.fa-quote-right:before {\n    content: '\\f10e';\n}\n.fa-spinner:before {\n    content: '\\f110';\n}\n.fa-circle:before {\n    content: '\\f111';\n}\n.fa-mail-reply:before,\n.fa-reply:before {\n    content: '\\f112';\n}\n.fa-github-alt:before {\n    content: '\\f113';\n}\n.fa-folder-o:before {\n    content: '\\f114';\n}\n.fa-folder-open-o:before {\n    content: '\\f115';\n}\n.fa-smile-o:before {\n    content: '\\f118';\n}\n.fa-frown-o:before {\n    content: '\\f119';\n}\n.fa-meh-o:before {\n    content: '\\f11a';\n}\n.fa-gamepad:before {\n    content: '\\f11b';\n}\n.fa-keyboard-o:before {\n    content: '\\f11c';\n}\n.fa-flag-o:before {\n    content: '\\f11d';\n}\n.fa-flag-checkered:before {\n    content: '\\f11e';\n}\n.fa-terminal:before {\n    content: '\\f120';\n}\n.fa-code:before {\n    content: '\\f121';\n}\n.fa-mail-reply-all:before,\n.fa-reply-all:before {\n    content: '\\f122';\n}\n.fa-star-half-empty:before,\n.fa-star-half-full:before,\n.fa-star-half-o:before {\n    content: '\\f123';\n}\n.fa-location-arrow:before {\n    content: '\\f124';\n}\n.fa-crop:before {\n    content: '\\f125';\n}\n.fa-code-fork:before {\n    content: '\\f126';\n}\n.fa-unlink:before,\n.fa-chain-broken:before {\n    content: '\\f127';\n}\n.fa-question:before {\n    content: '\\f128';\n}\n.fa-info:before {\n    content: '\\f129';\n}\n.fa-exclamation:before {\n    content: '\\f12a';\n}\n.fa-superscript:before {\n    content: '\\f12b';\n}\n.fa-subscript:before {\n    content: '\\f12c';\n}\n.fa-eraser:before {\n    content: '\\f12d';\n}\n.fa-puzzle-piece:before {\n    content: '\\f12e';\n}\n.fa-microphone:before {\n    content: '\\f130';\n}\n.fa-microphone-slash:before {\n    content: '\\f131';\n}\n.fa-shield:before {\n    content: '\\f132';\n}\n.fa-calendar-o:before {\n    content: '\\f133';\n}\n.fa-fire-extinguisher:before {\n    content: '\\f134';\n}\n.fa-rocket:before {\n    content: '\\f135';\n}\n.fa-maxcdn:before {\n    content: '\\f136';\n}\n.fa-chevron-circle-left:before {\n    content: '\\f137';\n}\n.fa-chevron-circle-right:before {\n    content: '\\f138';\n}\n.fa-chevron-circle-up:before {\n    content: '\\f139';\n}\n.fa-chevron-circle-down:before {\n    content: '\\f13a';\n}\n.fa-html5:before {\n    content: '\\f13b';\n}\n.fa-css3:before {\n    content: '\\f13c';\n}\n.fa-anchor:before {\n    content: '\\f13d';\n}\n.fa-unlock-alt:before {\n    content: '\\f13e';\n}\n.fa-bullseye:before {\n    content: '\\f140';\n}\n.fa-ellipsis-h:before {\n    content: '\\f141';\n}\n.fa-ellipsis-v:before {\n    content: '\\f142';\n}\n.fa-rss-square:before {\n    content: '\\f143';\n}\n.fa-play-circle:before {\n    content: '\\f144';\n}\n.fa-ticket:before {\n    content: '\\f145';\n}\n.fa-minus-square:before {\n    content: '\\f146';\n}\n.fa-minus-square-o:before {\n    content: '\\f147';\n}\n.fa-level-up:before {\n    content: '\\f148';\n}\n.fa-level-down:before {\n    content: '\\f149';\n}\n.fa-check-square:before {\n    content: '\\f14a';\n}\n.fa-pencil-square:before {\n    content: '\\f14b';\n}\n.fa-external-link-square:before {\n    content: '\\f14c';\n}\n.fa-share-square:before {\n    content: '\\f14d';\n}\n.fa-compass:before {\n    content: '\\f14e';\n}\n.fa-toggle-down:before,\n.fa-caret-square-o-down:before {\n    content: '\\f150';\n}\n.fa-toggle-up:before,\n.fa-caret-square-o-up:before {\n    content: '\\f151';\n}\n.fa-toggle-right:before,\n.fa-caret-square-o-right:before {\n    content: '\\f152';\n}\n.fa-euro:before,\n.fa-eur:before {\n    content: '\\f153';\n}\n.fa-gbp:before {\n    content: '\\f154';\n}\n.fa-dollar:before,\n.fa-usd:before {\n    content: '\\f155';\n}\n.fa-rupee:before,\n.fa-inr:before {\n    content: '\\f156';\n}\n.fa-cny:before,\n.fa-rmb:before,\n.fa-yen:before,\n.fa-jpy:before {\n    content: '\\f157';\n}\n.fa-ruble:before,\n.fa-rouble:before,\n.fa-rub:before {\n    content: '\\f158';\n}\n.fa-won:before,\n.fa-krw:before {\n    content: '\\f159';\n}\n.fa-bitcoin:before,\n.fa-btc:before {\n    content: '\\f15a';\n}\n.fa-file:before {\n    content: '\\f15b';\n}\n.fa-file-text:before {\n    content: '\\f15c';\n}\n.fa-sort-alpha-asc:before {\n    content: '\\f15d';\n}\n.fa-sort-alpha-desc:before {\n    content: '\\f15e';\n}\n.fa-sort-amount-asc:before {\n    content: '\\f160';\n}\n.fa-sort-amount-desc:before {\n    content: '\\f161';\n}\n.fa-sort-numeric-asc:before {\n    content: '\\f162';\n}\n.fa-sort-numeric-desc:before {\n    content: '\\f163';\n}\n.fa-thumbs-up:before {\n    content: '\\f164';\n}\n.fa-thumbs-down:before {\n    content: '\\f165';\n}\n.fa-youtube-square:before {\n    content: '\\f166';\n}\n.fa-youtube:before {\n    content: '\\f167';\n}\n.fa-xing:before {\n    content: '\\f168';\n}\n.fa-xing-square:before {\n    content: '\\f169';\n}\n.fa-youtube-play:before {\n    content: '\\f16a';\n}\n.fa-dropbox:before {\n    content: '\\f16b';\n}\n.fa-stack-overflow:before {\n    content: '\\f16c';\n}\n.fa-instagram:before {\n    content: '\\f16d';\n}\n.fa-flickr:before {\n    content: '\\f16e';\n}\n.fa-adn:before {\n    content: '\\f170';\n}\n.fa-bitbucket:before {\n    content: '\\f171';\n}\n.fa-bitbucket-square:before {\n    content: '\\f172';\n}\n.fa-tumblr:before {\n    content: '\\f173';\n}\n.fa-tumblr-square:before {\n    content: '\\f174';\n}\n.fa-long-arrow-down:before {\n    content: '\\f175';\n}\n.fa-long-arrow-up:before {\n    content: '\\f176';\n}\n.fa-long-arrow-left:before {\n    content: '\\f177';\n}\n.fa-long-arrow-right:before {\n    content: '\\f178';\n}\n.fa-apple:before {\n    content: '\\f179';\n}\n.fa-windows:before {\n    content: '\\f17a';\n}\n.fa-android:before {\n    content: '\\f17b';\n}\n.fa-linux:before {\n    content: '\\f17c';\n}\n.fa-dribbble:before {\n    content: '\\f17d';\n}\n.fa-skype:before {\n    content: '\\f17e';\n}\n.fa-foursquare:before {\n    content: '\\f180';\n}\n.fa-trello:before {\n    content: '\\f181';\n}\n.fa-female:before {\n    content: '\\f182';\n}\n.fa-male:before {\n    content: '\\f183';\n}\n.fa-gittip:before,\n.fa-gratipay:before {\n    content: '\\f184';\n}\n.fa-sun-o:before {\n    content: '\\f185';\n}\n.fa-moon-o:before {\n    content: '\\f186';\n}\n.fa-archive:before {\n    content: '\\f187';\n}\n.fa-bug:before {\n    content: '\\f188';\n}\n.fa-vk:before {\n    content: '\\f189';\n}\n.fa-weibo:before {\n    content: '\\f18a';\n}\n.fa-renren:before {\n    content: '\\f18b';\n}\n.fa-pagelines:before {\n    content: '\\f18c';\n}\n.fa-stack-exchange:before {\n    content: '\\f18d';\n}\n.fa-arrow-circle-o-right:before {\n    content: '\\f18e';\n}\n.fa-arrow-circle-o-left:before {\n    content: '\\f190';\n}\n.fa-toggle-left:before,\n.fa-caret-square-o-left:before {\n    content: '\\f191';\n}\n.fa-dot-circle-o:before {\n    content: '\\f192';\n}\n.fa-wheelchair:before {\n    content: '\\f193';\n}\n.fa-vimeo-square:before {\n    content: '\\f194';\n}\n.fa-turkish-lira:before,\n.fa-try:before {\n    content: '\\f195';\n}\n.fa-plus-square-o:before {\n    content: '\\f196';\n}\n.fa-space-shuttle:before {\n    content: '\\f197';\n}\n.fa-slack:before {\n    content: '\\f198';\n}\n.fa-envelope-square:before {\n    content: '\\f199';\n}\n.fa-wordpress:before {\n    content: '\\f19a';\n}\n.fa-openid:before {\n    content: '\\f19b';\n}\n.fa-institution:before,\n.fa-bank:before,\n.fa-university:before {\n    content: '\\f19c';\n}\n.fa-mortar-board:before,\n.fa-graduation-cap:before {\n    content: '\\f19d';\n}\n.fa-yahoo:before {\n    content: '\\f19e';\n}\n.fa-google:before {\n    content: '\\f1a0';\n}\n.fa-reddit:before {\n    content: '\\f1a1';\n}\n.fa-reddit-square:before {\n    content: '\\f1a2';\n}\n.fa-stumbleupon-circle:before {\n    content: '\\f1a3';\n}\n.fa-stumbleupon:before {\n    content: '\\f1a4';\n}\n.fa-delicious:before {\n    content: '\\f1a5';\n}\n.fa-digg:before {\n    content: '\\f1a6';\n}\n.fa-pied-piper-pp:before {\n    content: '\\f1a7';\n}\n.fa-pied-piper-alt:before {\n    content: '\\f1a8';\n}\n.fa-drupal:before {\n    content: '\\f1a9';\n}\n.fa-joomla:before {\n    content: '\\f1aa';\n}\n.fa-language:before {\n    content: '\\f1ab';\n}\n.fa-fax:before {\n    content: '\\f1ac';\n}\n.fa-building:before {\n    content: '\\f1ad';\n}\n.fa-child:before {\n    content: '\\f1ae';\n}\n.fa-paw:before {\n    content: '\\f1b0';\n}\n.fa-spoon:before {\n    content: '\\f1b1';\n}\n.fa-cube:before {\n    content: '\\f1b2';\n}\n.fa-cubes:before {\n    content: '\\f1b3';\n}\n.fa-behance:before {\n    content: '\\f1b4';\n}\n.fa-behance-square:before {\n    content: '\\f1b5';\n}\n.fa-steam:before {\n    content: '\\f1b6';\n}\n.fa-steam-square:before {\n    content: '\\f1b7';\n}\n.fa-recycle:before {\n    content: '\\f1b8';\n}\n.fa-automobile:before,\n.fa-car:before {\n    content: '\\f1b9';\n}\n.fa-cab:before,\n.fa-taxi:before {\n    content: '\\f1ba';\n}\n.fa-tree:before {\n    content: '\\f1bb';\n}\n.fa-spotify:before {\n    content: '\\f1bc';\n}\n.fa-deviantart:before {\n    content: '\\f1bd';\n}\n.fa-soundcloud:before {\n    content: '\\f1be';\n}\n.fa-database:before {\n    content: '\\f1c0';\n}\n.fa-file-pdf-o:before {\n    content: '\\f1c1';\n}\n.fa-file-word-o:before {\n    content: '\\f1c2';\n}\n.fa-file-excel-o:before {\n    content: '\\f1c3';\n}\n.fa-file-powerpoint-o:before {\n    content: '\\f1c4';\n}\n.fa-file-photo-o:before,\n.fa-file-picture-o:before,\n.fa-file-image-o:before {\n    content: '\\f1c5';\n}\n.fa-file-zip-o:before,\n.fa-file-archive-o:before {\n    content: '\\f1c6';\n}\n.fa-file-sound-o:before,\n.fa-file-audio-o:before {\n    content: '\\f1c7';\n}\n.fa-file-movie-o:before,\n.fa-file-video-o:before {\n    content: '\\f1c8';\n}\n.fa-file-code-o:before {\n    content: '\\f1c9';\n}\n.fa-vine:before {\n    content: '\\f1ca';\n}\n.fa-codepen:before {\n    content: '\\f1cb';\n}\n.fa-jsfiddle:before {\n    content: '\\f1cc';\n}\n.fa-life-bouy:before,\n.fa-life-buoy:before,\n.fa-life-saver:before,\n.fa-support:before,\n.fa-life-ring:before {\n    content: '\\f1cd';\n}\n.fa-circle-o-notch:before {\n    content: '\\f1ce';\n}\n.fa-ra:before,\n.fa-resistance:before,\n.fa-rebel:before {\n    content: '\\f1d0';\n}\n.fa-ge:before,\n.fa-empire:before {\n    content: '\\f1d1';\n}\n.fa-git-square:before {\n    content: '\\f1d2';\n}\n.fa-git:before {\n    content: '\\f1d3';\n}\n.fa-y-combinator-square:before,\n.fa-yc-square:before,\n.fa-hacker-news:before {\n    content: '\\f1d4';\n}\n.fa-tencent-weibo:before {\n    content: '\\f1d5';\n}\n.fa-qq:before {\n    content: '\\f1d6';\n}\n.fa-wechat:before,\n.fa-weixin:before {\n    content: '\\f1d7';\n}\n.fa-send:before,\n.fa-paper-plane:before {\n    content: '\\f1d8';\n}\n.fa-send-o:before,\n.fa-paper-plane-o:before {\n    content: '\\f1d9';\n}\n.fa-history:before {\n    content: '\\f1da';\n}\n.fa-circle-thin:before {\n    content: '\\f1db';\n}\n.fa-header:before {\n    content: '\\f1dc';\n}\n.fa-paragraph:before {\n    content: '\\f1dd';\n}\n.fa-sliders:before {\n    content: '\\f1de';\n}\n.fa-share-alt:before {\n    content: '\\f1e0';\n}\n.fa-share-alt-square:before {\n    content: '\\f1e1';\n}\n.fa-bomb:before {\n    content: '\\f1e2';\n}\n.fa-soccer-ball-o:before,\n.fa-futbol-o:before {\n    content: '\\f1e3';\n}\n.fa-tty:before {\n    content: '\\f1e4';\n}\n.fa-binoculars:before {\n    content: '\\f1e5';\n}\n.fa-plug:before {\n    content: '\\f1e6';\n}\n.fa-slideshare:before {\n    content: '\\f1e7';\n}\n.fa-twitch:before {\n    content: '\\f1e8';\n}\n.fa-yelp:before {\n    content: '\\f1e9';\n}\n.fa-newspaper-o:before {\n    content: '\\f1ea';\n}\n.fa-wifi:before {\n    content: '\\f1eb';\n}\n.fa-calculator:before {\n    content: '\\f1ec';\n}\n.fa-paypal:before {\n    content: '\\f1ed';\n}\n.fa-google-wallet:before {\n    content: '\\f1ee';\n}\n.fa-cc-visa:before {\n    content: '\\f1f0';\n}\n.fa-cc-mastercard:before {\n    content: '\\f1f1';\n}\n.fa-cc-discover:before {\n    content: '\\f1f2';\n}\n.fa-cc-amex:before {\n    content: '\\f1f3';\n}\n.fa-cc-paypal:before {\n    content: '\\f1f4';\n}\n.fa-cc-stripe:before {\n    content: '\\f1f5';\n}\n.fa-bell-slash:before {\n    content: '\\f1f6';\n}\n.fa-bell-slash-o:before {\n    content: '\\f1f7';\n}\n.fa-trash:before {\n    content: '\\f1f8';\n}\n.fa-copyright:before {\n    content: '\\f1f9';\n}\n.fa-at:before {\n    content: '\\f1fa';\n}\n.fa-eyedropper:before {\n    content: '\\f1fb';\n}\n.fa-paint-brush:before {\n    content: '\\f1fc';\n}\n.fa-birthday-cake:before {\n    content: '\\f1fd';\n}\n.fa-area-chart:before {\n    content: '\\f1fe';\n}\n.fa-pie-chart:before {\n    content: '\\f200';\n}\n.fa-line-chart:before {\n    content: '\\f201';\n}\n.fa-lastfm:before {\n    content: '\\f202';\n}\n.fa-lastfm-square:before {\n    content: '\\f203';\n}\n.fa-toggle-off:before {\n    content: '\\f204';\n}\n.fa-toggle-on:before {\n    content: '\\f205';\n}\n.fa-bicycle:before {\n    content: '\\f206';\n}\n.fa-bus:before {\n    content: '\\f207';\n}\n.fa-ioxhost:before {\n    content: '\\f208';\n}\n.fa-angellist:before {\n    content: '\\f209';\n}\n.fa-cc:before {\n    content: '\\f20a';\n}\n.fa-shekel:before,\n.fa-sheqel:before,\n.fa-ils:before {\n    content: '\\f20b';\n}\n.fa-meanpath:before {\n    content: '\\f20c';\n}\n.fa-buysellads:before {\n    content: '\\f20d';\n}\n.fa-connectdevelop:before {\n    content: '\\f20e';\n}\n.fa-dashcube:before {\n    content: '\\f210';\n}\n.fa-forumbee:before {\n    content: '\\f211';\n}\n.fa-leanpub:before {\n    content: '\\f212';\n}\n.fa-sellsy:before {\n    content: '\\f213';\n}\n.fa-shirtsinbulk:before {\n    content: '\\f214';\n}\n.fa-simplybuilt:before {\n    content: '\\f215';\n}\n.fa-skyatlas:before {\n    content: '\\f216';\n}\n.fa-cart-plus:before {\n    content: '\\f217';\n}\n.fa-cart-arrow-down:before {\n    content: '\\f218';\n}\n.fa-diamond:before {\n    content: '\\f219';\n}\n.fa-ship:before {\n    content: '\\f21a';\n}\n.fa-user-secret:before {\n    content: '\\f21b';\n}\n.fa-motorcycle:before {\n    content: '\\f21c';\n}\n.fa-street-view:before {\n    content: '\\f21d';\n}\n.fa-heartbeat:before {\n    content: '\\f21e';\n}\n.fa-venus:before {\n    content: '\\f221';\n}\n.fa-mars:before {\n    content: '\\f222';\n}\n.fa-mercury:before {\n    content: '\\f223';\n}\n.fa-intersex:before,\n.fa-transgender:before {\n    content: '\\f224';\n}\n.fa-transgender-alt:before {\n    content: '\\f225';\n}\n.fa-venus-double:before {\n    content: '\\f226';\n}\n.fa-mars-double:before {\n    content: '\\f227';\n}\n.fa-venus-mars:before {\n    content: '\\f228';\n}\n.fa-mars-stroke:before {\n    content: '\\f229';\n}\n.fa-mars-stroke-v:before {\n    content: '\\f22a';\n}\n.fa-mars-stroke-h:before {\n    content: '\\f22b';\n}\n.fa-neuter:before {\n    content: '\\f22c';\n}\n.fa-genderless:before {\n    content: '\\f22d';\n}\n.fa-facebook-official:before {\n    content: '\\f230';\n}\n.fa-pinterest-p:before {\n    content: '\\f231';\n}\n.fa-whatsapp:before {\n    content: '\\f232';\n}\n.fa-server:before {\n    content: '\\f233';\n}\n.fa-user-plus:before {\n    content: '\\f234';\n}\n.fa-user-times:before {\n    content: '\\f235';\n}\n.fa-hotel:before,\n.fa-bed:before {\n    content: '\\f236';\n}\n.fa-viacoin:before {\n    content: '\\f237';\n}\n.fa-train:before {\n    content: '\\f238';\n}\n.fa-subway:before {\n    content: '\\f239';\n}\n.fa-medium:before {\n    content: '\\f23a';\n}\n.fa-yc:before,\n.fa-y-combinator:before {\n    content: '\\f23b';\n}\n.fa-optin-monster:before {\n    content: '\\f23c';\n}\n.fa-opencart:before {\n    content: '\\f23d';\n}\n.fa-expeditedssl:before {\n    content: '\\f23e';\n}\n.fa-battery-4:before,\n.fa-battery:before,\n.fa-battery-full:before {\n    content: '\\f240';\n}\n.fa-battery-3:before,\n.fa-battery-three-quarters:before {\n    content: '\\f241';\n}\n.fa-battery-2:before,\n.fa-battery-half:before {\n    content: '\\f242';\n}\n.fa-battery-1:before,\n.fa-battery-quarter:before {\n    content: '\\f243';\n}\n.fa-battery-0:before,\n.fa-battery-empty:before {\n    content: '\\f244';\n}\n.fa-mouse-pointer:before {\n    content: '\\f245';\n}\n.fa-i-cursor:before {\n    content: '\\f246';\n}\n.fa-object-group:before {\n    content: '\\f247';\n}\n.fa-object-ungroup:before {\n    content: '\\f248';\n}\n.fa-sticky-note:before {\n    content: '\\f249';\n}\n.fa-sticky-note-o:before {\n    content: '\\f24a';\n}\n.fa-cc-jcb:before {\n    content: '\\f24b';\n}\n.fa-cc-diners-club:before {\n    content: '\\f24c';\n}\n.fa-clone:before {\n    content: '\\f24d';\n}\n.fa-balance-scale:before {\n    content: '\\f24e';\n}\n.fa-hourglass-o:before {\n    content: '\\f250';\n}\n.fa-hourglass-1:before,\n.fa-hourglass-start:before {\n    content: '\\f251';\n}\n.fa-hourglass-2:before,\n.fa-hourglass-half:before {\n    content: '\\f252';\n}\n.fa-hourglass-3:before,\n.fa-hourglass-end:before {\n    content: '\\f253';\n}\n.fa-hourglass:before {\n    content: '\\f254';\n}\n.fa-hand-grab-o:before,\n.fa-hand-rock-o:before {\n    content: '\\f255';\n}\n.fa-hand-stop-o:before,\n.fa-hand-paper-o:before {\n    content: '\\f256';\n}\n.fa-hand-scissors-o:before {\n    content: '\\f257';\n}\n.fa-hand-lizard-o:before {\n    content: '\\f258';\n}\n.fa-hand-spock-o:before {\n    content: '\\f259';\n}\n.fa-hand-pointer-o:before {\n    content: '\\f25a';\n}\n.fa-hand-peace-o:before {\n    content: '\\f25b';\n}\n.fa-trademark:before {\n    content: '\\f25c';\n}\n.fa-registered:before {\n    content: '\\f25d';\n}\n.fa-creative-commons:before {\n    content: '\\f25e';\n}\n.fa-gg:before {\n    content: '\\f260';\n}\n.fa-gg-circle:before {\n    content: '\\f261';\n}\n.fa-tripadvisor:before {\n    content: '\\f262';\n}\n.fa-odnoklassniki:before {\n    content: '\\f263';\n}\n.fa-odnoklassniki-square:before {\n    content: '\\f264';\n}\n.fa-get-pocket:before {\n    content: '\\f265';\n}\n.fa-wikipedia-w:before {\n    content: '\\f266';\n}\n.fa-safari:before {\n    content: '\\f267';\n}\n.fa-chrome:before {\n    content: '\\f268';\n}\n.fa-firefox:before {\n    content: '\\f269';\n}\n.fa-opera:before {\n    content: '\\f26a';\n}\n.fa-internet-explorer:before {\n    content: '\\f26b';\n}\n.fa-tv:before,\n.fa-television:before {\n    content: '\\f26c';\n}\n.fa-contao:before {\n    content: '\\f26d';\n}\n.fa-500px:before {\n    content: '\\f26e';\n}\n.fa-amazon:before {\n    content: '\\f270';\n}\n.fa-calendar-plus-o:before {\n    content: '\\f271';\n}\n.fa-calendar-minus-o:before {\n    content: '\\f272';\n}\n.fa-calendar-times-o:before {\n    content: '\\f273';\n}\n.fa-calendar-check-o:before {\n    content: '\\f274';\n}\n.fa-industry:before {\n    content: '\\f275';\n}\n.fa-map-pin:before {\n    content: '\\f276';\n}\n.fa-map-signs:before {\n    content: '\\f277';\n}\n.fa-map-o:before {\n    content: '\\f278';\n}\n.fa-map:before {\n    content: '\\f279';\n}\n.fa-commenting:before {\n    content: '\\f27a';\n}\n.fa-commenting-o:before {\n    content: '\\f27b';\n}\n.fa-houzz:before {\n    content: '\\f27c';\n}\n.fa-vimeo:before {\n    content: '\\f27d';\n}\n.fa-black-tie:before {\n    content: '\\f27e';\n}\n.fa-fonticons:before {\n    content: '\\f280';\n}\n.fa-reddit-alien:before {\n    content: '\\f281';\n}\n.fa-edge:before {\n    content: '\\f282';\n}\n.fa-credit-card-alt:before {\n    content: '\\f283';\n}\n.fa-codiepie:before {\n    content: '\\f284';\n}\n.fa-modx:before {\n    content: '\\f285';\n}\n.fa-fort-awesome:before {\n    content: '\\f286';\n}\n.fa-usb:before {\n    content: '\\f287';\n}\n.fa-product-hunt:before {\n    content: '\\f288';\n}\n.fa-mixcloud:before {\n    content: '\\f289';\n}\n.fa-scribd:before {\n    content: '\\f28a';\n}\n.fa-pause-circle:before {\n    content: '\\f28b';\n}\n.fa-pause-circle-o:before {\n    content: '\\f28c';\n}\n.fa-stop-circle:before {\n    content: '\\f28d';\n}\n.fa-stop-circle-o:before {\n    content: '\\f28e';\n}\n.fa-shopping-bag:before {\n    content: '\\f290';\n}\n.fa-shopping-basket:before {\n    content: '\\f291';\n}\n.fa-hashtag:before {\n    content: '\\f292';\n}\n.fa-bluetooth:before {\n    content: '\\f293';\n}\n.fa-bluetooth-b:before {\n    content: '\\f294';\n}\n.fa-percent:before {\n    content: '\\f295';\n}\n.fa-gitlab:before {\n    content: '\\f296';\n}\n.fa-wpbeginner:before {\n    content: '\\f297';\n}\n.fa-wpforms:before {\n    content: '\\f298';\n}\n.fa-envira:before {\n    content: '\\f299';\n}\n.fa-universal-access:before {\n    content: '\\f29a';\n}\n.fa-wheelchair-alt:before {\n    content: '\\f29b';\n}\n.fa-question-circle-o:before {\n    content: '\\f29c';\n}\n.fa-blind:before {\n    content: '\\f29d';\n}\n.fa-audio-description:before {\n    content: '\\f29e';\n}\n.fa-volume-control-phone:before {\n    content: '\\f2a0';\n}\n.fa-braille:before {\n    content: '\\f2a1';\n}\n.fa-assistive-listening-systems:before {\n    content: '\\f2a2';\n}\n.fa-asl-interpreting:before,\n.fa-american-sign-language-interpreting:before {\n    content: '\\f2a3';\n}\n.fa-deafness:before,\n.fa-hard-of-hearing:before,\n.fa-deaf:before {\n    content: '\\f2a4';\n}\n.fa-glide:before {\n    content: '\\f2a5';\n}\n.fa-glide-g:before {\n    content: '\\f2a6';\n}\n.fa-signing:before,\n.fa-sign-language:before {\n    content: '\\f2a7';\n}\n.fa-low-vision:before {\n    content: '\\f2a8';\n}\n.fa-viadeo:before {\n    content: '\\f2a9';\n}\n.fa-viadeo-square:before {\n    content: '\\f2aa';\n}\n.fa-snapchat:before {\n    content: '\\f2ab';\n}\n.fa-snapchat-ghost:before {\n    content: '\\f2ac';\n}\n.fa-snapchat-square:before {\n    content: '\\f2ad';\n}\n.fa-pied-piper:before {\n    content: '\\f2ae';\n}\n.fa-first-order:before {\n    content: '\\f2b0';\n}\n.fa-yoast:before {\n    content: '\\f2b1';\n}\n.fa-themeisle:before {\n    content: '\\f2b2';\n}\n.fa-google-plus-circle:before,\n.fa-google-plus-official:before {\n    content: '\\f2b3';\n}\n.fa-fa:before,\n.fa-font-awesome:before {\n    content: '\\f2b4';\n}\n.fa-handshake-o:before {\n    content: '\\f2b5';\n}\n.fa-envelope-open:before {\n    content: '\\f2b6';\n}\n.fa-envelope-open-o:before {\n    content: '\\f2b7';\n}\n.fa-linode:before {\n    content: '\\f2b8';\n}\n.fa-address-book:before {\n    content: '\\f2b9';\n}\n.fa-address-book-o:before {\n    content: '\\f2ba';\n}\n.fa-vcard:before,\n.fa-address-card:before {\n    content: '\\f2bb';\n}\n.fa-vcard-o:before,\n.fa-address-card-o:before {\n    content: '\\f2bc';\n}\n.fa-user-circle:before {\n    content: '\\f2bd';\n}\n.fa-user-circle-o:before {\n    content: '\\f2be';\n}\n.fa-user-o:before {\n    content: '\\f2c0';\n}\n.fa-id-badge:before {\n    content: '\\f2c1';\n}\n.fa-drivers-license:before,\n.fa-id-card:before {\n    content: '\\f2c2';\n}\n.fa-drivers-license-o:before,\n.fa-id-card-o:before {\n    content: '\\f2c3';\n}\n.fa-quora:before {\n    content: '\\f2c4';\n}\n.fa-free-code-camp:before {\n    content: '\\f2c5';\n}\n.fa-telegram:before {\n    content: '\\f2c6';\n}\n.fa-thermometer-4:before,\n.fa-thermometer:before,\n.fa-thermometer-full:before {\n    content: '\\f2c7';\n}\n.fa-thermometer-3:before,\n.fa-thermometer-three-quarters:before {\n    content: '\\f2c8';\n}\n.fa-thermometer-2:before,\n.fa-thermometer-half:before {\n    content: '\\f2c9';\n}\n.fa-thermometer-1:before,\n.fa-thermometer-quarter:before {\n    content: '\\f2ca';\n}\n.fa-thermometer-0:before,\n.fa-thermometer-empty:before {\n    content: '\\f2cb';\n}\n.fa-shower:before {\n    content: '\\f2cc';\n}\n.fa-bathtub:before,\n.fa-s15:before,\n.fa-bath:before {\n    content: '\\f2cd';\n}\n.fa-podcast:before {\n    content: '\\f2ce';\n}\n.fa-window-maximize:before {\n    content: '\\f2d0';\n}\n.fa-window-minimize:before {\n    content: '\\f2d1';\n}\n.fa-window-restore:before {\n    content: '\\f2d2';\n}\n.fa-times-rectangle:before,\n.fa-window-close:before {\n    content: '\\f2d3';\n}\n.fa-times-rectangle-o:before,\n.fa-window-close-o:before {\n    content: '\\f2d4';\n}\n.fa-bandcamp:before {\n    content: '\\f2d5';\n}\n.fa-grav:before {\n    content: '\\f2d6';\n}\n.fa-etsy:before {\n    content: '\\f2d7';\n}\n.fa-imdb:before {\n    content: '\\f2d8';\n}\n.fa-ravelry:before {\n    content: '\\f2d9';\n}\n.fa-eercast:before {\n    content: '\\f2da';\n}\n.fa-microchip:before {\n    content: '\\f2db';\n}\n.fa-snowflake-o:before {\n    content: '\\f2dc';\n}\n.fa-superpowers:before {\n    content: '\\f2dd';\n}\n.fa-wpexplorer:before {\n    content: '\\f2de';\n}\n.fa-meetup:before {\n    content: '\\f2e0';\n}\n.sr-only {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    padding: 0;\n    margin: -1px;\n    overflow: hidden;\n    clip: rect(0, 0, 0, 0);\n    border: 0;\n}\n.sr-only-focusable:active,\n.sr-only-focusable:focus {\n    position: static;\n    width: auto;\n    height: auto;\n    margin: 0;\n    overflow: visible;\n    clip: auto;\n}\n", "" ]);
        const p = 532 == r.j ? h : null;
    },
    689: (n, o, r) => {
        "use strict";
        r.r(o), r.d(o, {
            default: () => p
        });
        var s = r(81), a = r.n(s), l = r(645), h = r.n(l)()(a());
        h.push([ n.id, "/*---[ FONT ]---*/\n\n@font-face {\n    font-family: Ubuntu-Regular;\n    src: url('/assets/fonts/ubuntu/Ubuntu-Regular.ttf');\n}\n\n@font-face {\n    font-family: Ubuntu-Bold;\n    src: url('/assets/fonts/ubuntu/Ubuntu-Bold.ttf');\n}\n\n/*---------------------------------------------*/\n\nhtml {\n    height: 591px;\n}\n\nbody,\ndiv,\na,\np,\ntable,\ntr,\ntd,\nth {\n    font-family: 'arial', sans-serif;\n    font-size: 12px;\n    margin-top: -0.05px;\n}\n\nbody.firefox {\n    overflow-y: hidden;\n    overflow-x: hidden;\n}\n\n.space-filler {\n    display: none;\n}\n\n.firefox .space-filler {\n    /*height: 5px;*/\n}\n\n::-webkit-scrollbar {\n    -webkit-appearance: none;\n    width: 14px;\n    border-left: 1px solid #ddd;\n    background-color: #f8f8f8;\n}\n\n::-webkit-scrollbar-thumb {\n    width: 10px;\n    border-radius: 10px;\n    background-color: rgba(0, 0, 0, 0.4);\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);\n}\n\n.block {\n    width: 770px;\n    padding: 0px;\n    margin: 0px;\n}\n\n.top {\n    background: #556b94;\n    width: 100%;\n    height: 70px;\n    border-bottom: 3px solid #999999;\n}\n\n.body {\n    background: #fef9f6;\n    padding: 10px;\n    min-height: 440px;\n    max-height: 440px;\n    overflow: hidden;\n}\n\n.footer {\n    display: table;\n    width: 100%;\n    height: 60px;\n    border-top: 1px solid #b5b5b5;\n}\n\n.search-inner-panel {\n    position: relative;\n}\n\n#main-header {\n    line-height: 30px;\n    min-height: 30px;\n    max-width: 750px;\n}\n\n#tracking-header {\n    padding-top: 25px;\n    overflow: hidden;\n    min-height: 32px;\n    max-height: 32px;\n}\n\n.info {\n    margin-top: 5px;\n    padding-left: 15px;\n    margin-bottom: 5px;\n    line-height: 23px;\n    min-height: 45px;\n}\n\n.info-item {\n    float: left;\n    width: 20%;\n    text-align: left;\n}\n\n.content {\n    overflow: auto;\n    /*margin-right: 5px;*/\n    height: 320px;\n    display: block;\n    max-height: 325px;\n    line-height: 55px;\n}\n\n.content.tracking-list {\n    max-height: 350px;\n    height: 350px;\n}\n\n.content.tracking-list table tbody {\n    height: 340px;\n}\n\n.info.single_book {\n    margin-bottom: 10px;\n}\n\n#tracking-content {\n    height: 285px;\n    max-height: 285px;\n}\n\n#word-cloud-content {\n    height: 380px;\n    max-height: 380px;\n    min-height: 380px;\n    margin-top: -25px;\n    margin-left: 21px;\n    line-height: 55px;\n}\n\n\n\n#bookImage {\n    width: 225px;\n    max-height: 340px;\n}\n\n.table-head {\n    display: flex;\n    margin-left: 0px !important;\n    margin-right: 0px !important;\n    width: 750px;\n}\n\n.sort-column {\n    display: inline-block;\n}\n\n.data {\n    border-collapse: collapse;\n    width: 100%;\n    line-height: 13px;\n}\n\n.firefox .data {\n    line-height: 12px;\n}\n\n.data tr:hover {\n    background: #d7ecf7;\n}\n\n.data tr td:first-child {\n    /*padding-left : 10px;*/\n    text-align: right;\n    min-width: 14px;\n}\n\nth {\n    font-weight: normal;\n    text-align: left;\n    background: #333333;\n    color: #ffffff;\n}\n\n#pagenation {\n    float: left;\n    width: 25%;\n}\n\ndiv.switch {\n    display: block;\n    float: right;\n    margin-right: 55px;\n    /*background: -moz-linear-gradient(19% 75% 90deg,#3095C7, #14539C);*/\n    /*background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#14539C), to(#3095C7));*/\n    /*background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#009900), to(#009900));*/\n    background-color: #009900;\n    border-radius: 4px;\n    -moz-border-radius: 4px;\n    border: 1px solid #555555;\n    width: 80px;\n    position: relative;\n    height: 26px;\n    margin-top: 7px;\n}\n\ndiv.switch:before {\n    content: 'ON';\n    padding-left: 3px;\n    line-height: 28px;\n    color: #fff;\n    font-size: 12px;\n    text-shadow: #093b5c 0px -1px 1px;\n}\n\ndiv.switch:after {\n    content: 'OFF';\n    padding-left: 17px;\n    line-height: 28px;\n    color: #fff;\n    font-size: 12px;\n    text-shadow: #093b5c 0px -1px 1px;\n}\n\n.check {\n    display: block;\n    width: 40px;\n    height: 24px;\n    border-radius: 3px;\n    -moz-border-radius: 3px;\n    background: -moz-linear-gradient(19% 75% 90deg, #ffffff, #a1a1a1);\n    background: #fff -webkit-gradient(linear, 0% 0%, 0% 100%, from(#a1a1a1), to(#ffffff));\n    border: 1px solid #e5e5e5;\n    position: absolute;\n    top: 0px;\n    left: 0px;\n}\n\ninput[type='checkbox'] {\n    display: none;\n}\n\n@-webkit-keyframes labelON {\n    0% {\n        top: 0px;\n        left: 0px;\n    }\n\n    100% {\n        top: 0px;\n        left: 38px;\n    }\n}\n\ninput[type='checkbox']:checked+label.check {\n    top: 0px;\n    left: 38px;\n    -webkit-animation-name: labelON;\n    -webkit-animation-duration: 0.2s;\n    -webkit-animation-iteration-count: 1;\n    -webkit-animation-timing-function: ease-in;\n    -webkit-box-shadow: #244766 -1px 0px 3px;\n}\n\n@-webkit-keyframes labelOFF {\n    0% {\n        top: 0px;\n        left: 38px;\n    }\n\n    100% {\n        top: 0px;\n        left: 0px;\n    }\n}\n\ninput[type='checkbox']+label.check {\n    top: 0px;\n    left: 0px;\n    -webkit-animation-name: labelOFF;\n    -webkit-animation-duration: 0.2s;\n    -webkit-animation-iteration-count: 1;\n    -webkit-animation-timing-function: ease-in;\n    -webkit-box-shadow: #244766 1px 0px 3px;\n}\n\n.check {\n    display: block;\n    width: 40px;\n    height: 24px;\n    border-radius: 3px;\n    -moz-border-radius: 3px;\n    background: -moz-linear-gradient(19% 75% 90deg, #ffffff, #a1a1a1);\n    background: #fff -webkit-gradient(linear, 0% 0%, 0% 100%, from(#a1a1a1), to(#ffffff));\n    border: 1px solid #e5e5e5;\n    position: absolute;\n    top: 0px;\n    left: 0px;\n}\n\n.best1 {\n    font-family: Verdana, Courier New, Arial;\n    font-size: 70px;\n    /*font-weight:bold;*/\n    color: #282828;\n}\n\n.best2 {\n    float: left;\n    font-family: Verdana, Courier New, Arial;\n    font-size: 60px;\n    /*font-weight:bold;*/\n    color: #444444;\n}\n\n.best3 {\n    font-family: Verdana, Courier New, Arial;\n    font-size: 55px;\n    /*font-weight:bold;*/\n    color: #545454;\n}\n\n.best4 {\n    font-family: Verdana, Courier New, Arial;\n    font-size: 45px;\n    /*font-weight:bold;*/\n    color: #6a6a6a;\n}\n\n.best5 {\n    font-family: Verdana, Courier New, Arial;\n    font-size: 40px;\n    /*font-weight:bold;*/\n    color: #979797;\n}\n\n.best6 {\n    font-family: Verdana, Courier New, Arial;\n    font-size: 15px;\n    /*font-weight:bold;*/\n    color: #c9c9c9;\n}\n\n.occurcnt {\n    font-family: Verdana, Courier New, Arial;\n    font-size: 10px;\n    float: left;\n    height: 50px;\n    color: #bfbfbf;\n}\n\nlabel.info {\n    position: absolute;\n    color: #000;\n    top: 0px;\n    left: 100px;\n    line-height: 32px;\n    width: 200px;\n}\n\n.logo {}\n\n#tablePagination_firstPage {\n    cursor: pointer;\n    padding-left: 5px;\n    padding-right: 5px;\n}\n\n#tablePagination_prevPage {\n    cursor: pointer;\n    padding-left: 5px;\n    padding-right: 5px;\n}\n\n#tablePagination_nextPage {\n    cursor: pointer;\n    padding-left: 5px;\n    padding-right: 5px;\n}\n\n#tablePagination_lastPage {\n    cursor: pointer;\n    padding-left: 5px;\n    padding-right: 5px;\n}\n\n#tablePagination_currPage {\n    border: 0px solid transparent;\n    width: 20px;\n    text-align: center;\n    color: #808080;\n}\n\n.content.border {\n    padding-left: 10px;\n    padding-right: 10px;\n    border: 2px dashed #ddd;\n    width: 95%;\n}\n\n.content table tbody {\n    height: 318px;\n    padding-top: 2px;\n    display: block;\n    overflow-y: scroll;\n}\n\ntd.wow {\n    max-width: 245px;\n    min-width: 245px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.firefox td.wow {\n    max-width: 255px;\n    min-width: 255px;\n}\n\ntd.wow a {\n    color: black;\n    text-decoration: none;\n}\n\ntd.wow a:hover {\n    /*color:darkgray;*/\n}\n\n.table-head,\n.table-head-keyword-search {\n    background-color: #eaede9;\n    margin-right: 5px;\n    margin-left: 10px;\n    border-bottom: 1px solid #b5b5b5;\n    overflow: hidden;\n    white-space: nowrap;\n}\n\n.table-head label,\n.table-head-keyword-search label {\n    color: black;\n}\n\n.panel {\n    float: left;\n}\n\n#enableTracking {\n    border: none;\n    background-image: url('/assets/images/enable-tracking.png');\n    width: 201px;\n    height: 50px;\n}\n\n#disableTracking {\n    border: none;\n    background-image: url('/assets/images/disable-tracking.png');\n    width: 201px;\n    height: 50px;\n}\n\n.brtdisable {\n    margin: 0;\n    position: relative;\n}\n\n.brtdisable div {\n    text-align: center;\n    font-weight: bold;\n}\n\n.brtdisable .arrow {\n    width: 157px;\n    height: 129px;\n    float: right;\n    background-image: url('/assets/images/arrow-right-down.png');\n}\n\n.bg-red {\n    background-color: #ff3232;\n}\n\n.bg-green {\n    background-color: #00b300;\n}\n\n.bg-orange {\n    background-color: #fd9214;\n}\n\n.bg-grey {\n    background-color: #cccccc;\n}\n\n.status {\n    width: 50px;\n    text-align: center;\n    float: left;\n}\n\n.status-text {\n    font-size: 11px;\n    color: #666666;\n}\n\n.status-img {\n    margin-left: 10px;\n}\n\n.status-img div {\n    width: 32px;\n    height: 32px;\n}\n\n.bullet-green {\n    background: url('/assets/images/bullet-green.png') no-repeat;\n}\n\n.bullet-red {\n    background: url('/assets/images/bullet-red.png') no-repeat;\n}\n\n.bullet-yellow {\n    background: url('/assets/images/bullet-yellow.png') no-repeat;\n}\n\n.status-img .bullet-progress {\n    background: url('/assets/images/3-dot-load.gif') no-repeat;\n    background-size: 32px;\n    margin-top: 10px;\n    height: 20px;\n}\n\n.img-load {\n    margin-top: 5px;\n}\n\n.img-load img {\n    height: 15px;\n}\n\n/*Search panel for keyword*/\n.search-inner-panel {\n    width: 600px;\n    height: 40px;\n\n    border-radius: 10px;\n    margin-left: 50px;\n}\n\n.search-panel {\n    height: 38px;\n    display: flex;\n    border: 5px solid #dfdad7;\n    background: #dfdad7;\n    border-radius: 25px;\n}\n\n#go-search {\n    position: absolute;\n    right: 10px;\n    top: 9px;\n    float: right;\n    height: 30px;\n    /* width: 30px; */\n    padding: 0 10px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    background-color: #1a92e2;\n    border-radius: 19px;\n    color: white;\n    font-size: 14px;\n}\n\n#go-search img {\n    width: 20px;\n    height: 20px;\n}\n\n#search-text {\n    flex-grow: 1;\n    height: 100%;\n    border: none;\n    border-radius: 19px;\n    padding: 0 18px;\n    font-size: 17px;\n}\n\n#search-text:active,\n#search-text:focus {\n    outline: none;\n}\n\n#keyword-search-tabs {\n    /*display: flex;*/\n    position: absolute;\n    bottom: 62px;\n    left: 0;\n}\n\n#content-keyword-search,\n.table-head-keyword-search,\n#content-keyword-search .loading {\n    display: none;\n}\n\n#loading-content {\n    display: none;\n    width: 750px;\n}\n\n.table-head-keyword-search th {\n    color: #000000;\n    background: unset;\n}\n\n.table-head-keyword-search {\n    margin: 0 0 10px 0;\n}\n\n.data-keyword-search {\n    margin: 0 auto;\n    border-collapse: collapse;\n    margin-left: 22px;\n}\n\n#content-keyword-search .content {\n    overflow: hidden;\n}\n\ntbody#data-body-keyword-search {\n    height: 270px;\n    max-width: 700px;\n}\n\n#content-keyword-search .no-data-found-content {\n    display: none;\n}\n\n/*Tooltip*/\n.tooltip-theme .tooltipster-content {\n    font-size: 11px;\n    line-height: 13px;\n    padding: 8px 10px;\n    color: #ffffff;\n    font-weight: bold;\n}\n\n/*Buttons in footer*/\n.footer-btn-panel-common {\n    display: flex;\n    flex-direction: column-reverse;\n    align-items: center;\n    justify-content: center;\n    text-align: center;\n    margin: 0 auto;\n    border-left: 1px solid #b5b5b5;\n    height: 59px;\n    color: #666666;\n}\n\n.footer-btn-panel-common img {\n    height: 28px;\n}\n\n.footer-btn-panel-text {\n    font-size: 12px;\n    margin-top: 6px;\n}\n\n.region-select-wrapper {\n    width: 70px;\n    height: 59px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    color: #666666;\n    float: left;\n}\n\n.region-select-wrapper span {\n    margin-top: 6px;\n}\n\n#regionSelector {\n    border: 2px solid #666;\n    height: 28px;\n}\n\n/*Help button in footer*/\n.help-btn {\n    width: 70px;\n    float: left;\n}\n\n/*Search btn in footer*/\n.search-btn {\n    float: left;\n    width: 76px;\n}\n\n.footer-btn-left {\n    float: left;\n}\n\n.footer-btn-right {\n    float: right !important;\n    min-width: 80px;\n}\n\n.image-frame img {\n    vertical-align: middle;\n    max-height: 37px;\n}\n\n.image-frame-helper {\n    display: inline-block;\n    height: 100%;\n    vertical-align: middle;\n}\n\n.hidden {\n    display: none;\n}\n\n.validation-error {\n    color: red;\n}\n\n.centered {\n    text-align: center;\n}\n\n.underlined {\n    text-decoration: underline;\n}\n\n.full-width {\n    width: 750px;\n}\n\n#trial-expired-content,\n#no-data-found-content,\n#no-supported-area,\n#no-supported-language,\n#no-supported-type,\n#no-supported-logged-in,\n#no-tracked-books {\n    max-height: none;\n    height: auto;\n    font-size: 1.4em;\n    line-height: normal;\n    padding-top: 30px;\n}\n\n#no-data-found-content,\n#no-supported-area,\n#no-supported-language,\n#no-supported-type,\n#no-supported-logged-in,\n#no-tracked-books {\n    margin-top: 0;\n    padding-top: 15px;\n}\n\n#trial-expired-content img {\n    height: 100px;\n    width: 100px;\n}\n\n#trial-expired-content h1,\n#no-data-found-content h1,\n#no-supported-area h1,\n#no-supported-language h1,\n#no-supported-type h1,\n#no-supported-logged-in h1,\n#no-tracked-books h1 {\n    font-family: Ubuntu-Bold;\n    font-size: 42px;\n    color: #403866;\n    line-height: 1.2;\n}\n\n#no-data-found-content h1,\n#no-supported-area h1,\n#no-supported-language h1,\n#no-supported-type h1,\n#no-supported-logged-in h1,\n#no-tracked-books h1 {\n    margin-top: 10px;\n}\n\n.container-btn {\n    display: block;\n    padding: 15px 120px;\n    cursor: pointer;\n}\n\n#trial-expired-content p,\n#no-data-found-content p,\n#no-supported-area p,\n#no-supported-language p,\n#no-supported-type p,\n#no-supported-logged-in p,\n#no-tracked-books p {\n    font-family: Ubuntu-Bold;\n    font-size: 17px;\n    color: #403866;\n    margin-right: 120px;\n    margin-left: 120px;\n}\n\n#trial-expired-content a,\n#no-data-found-content a,\n#no-supported-area a,\n#no-supported-language a,\n#no-supported-type a,\n#no-supported-logged-in a,\n#no-tracked-books a {\n    font-family: Ubuntu-Bold;\n    font-size: 14px;\n    color: #666666;\n    margin-right: 145px;\n    margin-left: 145px;\n    text-decoration: none;\n    cursor: pointer;\n}\n\n/*Login Form*/\n#login-content {\n    font-family: Ubuntu-Regular, sans-serif;\n    width: 100%;\n    max-height: none;\n    height: auto;\n    padding-left: 180px;\n    padding-top: 50px;\n}\n\n.publishing-logo {\n    padding: 5px 68px;\n}\n\n.login-block {\n    max-width: 380px;\n}\n\n/*[ Utility ]*/\n.reset-pass {\n    font-family: Ubuntu-Regular;\n    font-size: 16px;\n    line-height: 1.4;\n}\n\n.reset-pass a {\n    font-family: Ubuntu-Regular;\n    font-size: 16px;\n    color: #577cb9;\n    line-height: 1.4;\n    text-decoration: none;\n}\n\n.flex-center-m {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n/*[ login ]*/\n.container-login {\n    background-position: center;\n    background-size: cover;\n    background-repeat: no-repeat;\n}\n\n.wrap-login {\n    width: 390px;\n    border-radius: 10px;\n    position: relative;\n}\n\n/*[ Form ]*/\n.login-form {\n    width: 100%;\n}\n\n.login-form-title p {\n    font-family: Ubuntu-Regular;\n    font-size: 13px;\n    color: #403866;\n    line-height: 1.2;\n    text-align: center;\n    width: 100%;\n    padding-bottom: 10px;\n}\n\n.login-form-text {\n    font-family: Ubuntu-Bold;\n    font-size: 16px;\n    color: #403866;\n    line-height: 1.2;\n    text-align: center;\n    width: 100%;\n    display: block;\n}\n\n/*[ Input ]*/\n.wrap-input {\n    width: 100%;\n    position: relative;\n    background-color: #e6e6e6;\n    border: 1px solid transparent;\n    border-radius: 3px;\n    margin-bottom: 10px;\n}\n\n.input {\n    font-family: Ubuntu-Bold;\n    color: #403866;\n    line-height: 1.2;\n    font-size: 18px;\n\n    display: block;\n    width: 100%;\n    background: transparent;\n    height: 62px;\n    padding: 0 20px 0 38px;\n\n    outline: none;\n    border: none;\n}\n\n/*[ Focus Input ]*/\n.focus-input {\n    position: absolute;\n    display: block;\n    width: calc(100% + 2px);\n    height: calc(100% + 2px);\n    top: -1px;\n    left: -1px;\n    pointer-events: none;\n    border: 1px solid #827ffe;\n    border-radius: 3px;\n\n    visibility: hidden;\n    opacity: 0;\n\n    -webkit-transition: all 0.4s;\n    -o-transition: all 0.4s;\n    -moz-transition: all 0.4s;\n    transition: all 0.4s;\n\n    -webkit-transform: scaleX(1.1) scaleY(1.3);\n    -moz-transform: scaleX(1.1) scaleY(1.3);\n    -ms-transform: scaleX(1.1) scaleY(1.3);\n    -o-transform: scaleX(1.1) scaleY(1.3);\n    transform: scaleX(1.1) scaleY(1.3);\n}\n\n.input:focus+.focus-input {\n    visibility: visible;\n    opacity: 1;\n\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1);\n}\n\n/*[ Restyle Checkbox ]*/\n.input-checkbox {\n    display: none;\n}\n\n.label-checkbox {\n    font-family: Ubuntu-Regular;\n    font-size: 16px;\n    color: #999999;\n    line-height: 1.2;\n\n    display: block;\n    position: relative;\n    padding-left: 26px;\n    cursor: pointer;\n}\n\n.label-checkbox::before {\n    content: '\\f00c';\n    font-family: FontAwesome;\n    font-size: 13px;\n    color: transparent;\n\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: absolute;\n    width: 18px;\n    height: 18px;\n    border-radius: 3px;\n    background: #fff;\n    border: 2px solid #827ffe;\n    left: 0;\n    top: 50%;\n    -webkit-transform: translateY(-50%);\n    -moz-transform: translateY(-50%);\n    -ms-transform: translateY(-50%);\n    -o-transform: translateY(-50%);\n    transform: translateY(-50%);\n}\n\n.input-checkbox:checked+.label-checkbox::before {\n    color: #827ffe;\n}\n\n/*[ Button ]*/\n.container-login-form-btn {\n    width: 100%;\n    display: flex;\n    flex-wrap: wrap;\n    margin-top: 17px;\n    margin-bottom: 10px;\n    cursor: pointer;\n}\n\n.login-form-btn {\n    outline: none !important;\n    border: none;\n    background: transparent;\n\n    font-family: Ubuntu-Bold;\n    font-size: 16px;\n    color: #fff;\n    line-height: 1.2;\n\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 0 20px;\n    width: 100%;\n    height: 62px;\n    background-color: #4ca54c;\n    border-radius: 3px;\n\n    -webkit-transition: all 0.4s;\n    -o-transition: all 0.4s;\n    -moz-transition: all 0.4s;\n    transition: all 0.4s;\n    cursor: pointer;\n}\n\n.login-form-btn:hover {\n    background-color: #403866;\n    cursor: pointer;\n}\n\n/*---------login end-----------*/\n\n.top {\n    display: flex;\n    justify-content: space-between;\n}\n\n.top-buttons {\n    display: flex;\n}\n\n.logo {\n    height: 58px;\n    width: auto;\n    padding-left: 20px;\n    padding-top: 6px;\n    display: inline-block;\n}\n\n.recently-updated {\n    position: absolute;\n    display: flex;\n    padding: 10px;\n    border-radius: 8px;\n    background: #ffffff;\n    color: #222222;\n    left: 230px;\n    top: 18px;\n}\n\n#close-recently-updated {\n    cursor: pointer;\n    margin-left: 12px;\n}\n\n.top-button {\n    color: #fff;\n    width: 50px;\n    margin-top: 10px;\n    display: inline-block;\n    cursor: pointer;\n    margin-right: 12px;\n}\n\n.top-button img {\n    height: 43px;\n}\n\n.top-button:last-child {\n    margin-right: 0;\n}\n\n.black {\n    color: black;\n}\n\n/*[ Alert validate ]*/\n.validate-input {\n    position: relative;\n}\n\n.alert-validate::before {\n    content: attr(data-validate);\n    position: absolute;\n    max-width: 70%;\n    background-color: #fff;\n    border: 1px solid #c80000;\n    border-radius: 3px;\n    padding: 4px 25px 5px 10px;\n    top: 50%;\n    -webkit-transform: translateY(-50%);\n    -moz-transform: translateY(-50%);\n    -ms-transform: translateY(-50%);\n    -o-transform: translateY(-50%);\n    transform: translateY(-50%);\n    right: 12px;\n    pointer-events: none;\n\n    font-family: Ubuntu-Regular;\n    color: #c80000;\n    font-size: 14px;\n    line-height: 1.4;\n    text-align: left;\n\n    visibility: hidden;\n    opacity: 0;\n\n    -webkit-transition: opacity 0.4s;\n    -o-transition: opacity 0.4s;\n    -moz-transition: opacity 0.4s;\n    transition: opacity 0.4s;\n}\n\n.alert-validate::after {\n    content: '\\f12a';\n    font-family: FontAwesome;\n    display: block;\n    position: absolute;\n    color: #c80000;\n    font-size: 18px;\n    top: 50%;\n    -webkit-transform: translateY(-50%);\n    -moz-transform: translateY(-50%);\n    -ms-transform: translateY(-50%);\n    -o-transform: translateY(-50%);\n    transform: translateY(-50%);\n    right: 18px;\n}\n\n.alert-validate:hover:before {\n    visibility: visible;\n    opacity: 1;\n}\n\n@media (max-width: 992px) {\n    .alert-validate::before {\n        visibility: visible;\n        opacity: 1;\n    }\n}\n\n.infoBox,\n#infoBox {\n    float: left;\n    display: none;\n    position: relative;\n    padding-left: 15px;\n    top: 3px;\n}\n\nbody[data-screen='BestSellersPage'] .infoBox:hover .infoBox-popup[data-screen='BestSellersPage'] {\n    display: block;\n}\n\nbody[data-screen='NewReleasesPage'] .infoBox:hover .infoBox-popup[data-screen='BestSellersPage'] {\n    display: block;\n}\n\nbody[data-screen='SearchResultsPage'] .infoBox:hover .infoBox-popup[data-screen='SearchResultsPage'] {\n    display: block;\n}\n\n.infoBox-popup {\n    margin-top: 12px;\n    position: absolute;\n    display: none;\n    border-radius: 4px;\n    box-sizing: border-box;\n    width: 500px;\n    padding: 20px 20px 25px;\n    color: white;\n    background: #333;\n    left: 9px;\n    z-index: 999;\n}\n\n.infoBox-popup:before {\n    content: '';\n\n    top: -20px;\n    left: 13px;\n\n    height: 0;\n    width: 0;\n    display: block;\n    position: absolute;\n\n    border-left: 5px solid transparent;\n    border-bottom: 10px solid #333;\n    border-right: 5px solid transparent;\n    border-top: 10px solid transparent;\n}\n\n.infoBox-row {\n    display: flex;\n    align-items: center;\n}\n\n.infoBox-row:first-child {\n    margin-bottom: 5px;\n}\n\n.infoBox-text {\n    width: 400px;\n    font-size: 15px;\n    line-height: 15px;\n    padding-left: 5px;\n}\n\n.infoBox-rank {\n    font-weight: bold;\n    text-decoration: underline;\n    font-size: 16px;\n}\n\n.infoBox-tick img {\n    max-height: 22px;\n}\n\n.tabs {\n    border-top: 1px solid #b5b5b5;\n    display: none;\n    position: relative;\n    left: -10px;\n    width: 105%;\n    background: white;\n}\n\n.tabs-item {\n    border: 1px solid #999;\n    border-top: none;\n    padding: 5px 20px;\n    border-bottom-left-radius: 10px;\n    border-bottom-right-radius: 10px;\n    cursor: pointer;\n    background: white;\n    display: flex;\n    align-items: center;\n}\n\n.tabs-item.tabs-item--active {\n    border-top: 1px solid #fef9f6;\n    padding-top: 6px;\n    margin-top: -1px;\n    background: #fef9f6;\n}\n\n#global-tracking-tabs .tabs-item {\n    padding: 5px 10px;\n    max-width: 90px;\n    white-space: nowrap;\n}\n\n.btnTracking {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 380px;\n    font-size: 16px;\n    line-height: 17px;\n    transform: translate(-50%, -50%) scale(0.9999);\n    background: #00ae4f;\n    color: white;\n    padding: 20px;\n    border-radius: 3px;\n    font-weight: 900;\n    margin-top: -6px;\n    cursor: pointer;\n}\n\n.brtdisable-blur {\n    width: 520px;\n    height: 275px;\n    position: absolute;\n    left: 0;\n    top: 0;\n}\n\n#canvas-fake {\n    filter: blur(2px);\n    opacity: 0.6;\n}\n\n.bookProps {\n    text-align: left;\n    font-style: italic;\n    display: flex;\n    flex-direction: column;\n    overflow: hidden;\n    white-space: nowrap;\n    margin-top: 12px;\n    margin-left: 1px;\n}\n\n.bookProps-item {\n    display: flex;\n    margin-bottom: 6px;\n}\n\n.bookProps-item div,\n.bookProps-item a {\n    font-size: 13px;\n}\n\n.bookProps-caption {\n    font-weight: bold;\n    margin-right: 5px;\n}\n\n.bookProps-content span {\n    margin: 0 3px;\n}\n\n#GlobalHelpButton {\n    min-width: unset;\n}\n\n.calendar-td {\n    position: relative;\n    width: 10px;\n}\n\n.calendar-icon {\n    width: 10px;\n}\n\n.calendar-td:hover .infoBox-popup {\n    display: block;\n}\n\n.calendar-td .infoBox-popup {\n    width: 230px;\n    padding: 4px;\n    text-align: center;\n    z-index: 999999;\n    height: 20px;\n    top: -14px;\n    left: 26px;\n}\n\ntr:first-child .calendar-td .infoBox-popup {\n    top: -10px;\n}\n\n.calendar-td .infoBox-popup:before {\n    content: '';\n    top: 0px;\n    left: -10px;\n    height: 0;\n    width: 0;\n    display: block;\n    position: absolute;\n    border-top: 10px solid transparent;\n    border-bottom: 10px solid transparent;\n    border-right: 10px solid #333;\n}\n\n.tabs-item--active .attention-mark {\n    display: none;\n    /*opacity: 0;*/\n}\n\n.attention-mark {\n    display: inline-block;\n    min-width: 14px;\n    text-align: center;\n    /* height: 14px; */\n    font-size: 10px;\n    background: #db000f;\n    color: white;\n    border-radius: 6px;\n    margin-left: 4px;\n    padding: 1px 4px;\n}\n\n.sr_checkbox {\n    width: 13px;\n    height: 13px;\n    vertical-align: middle;\n    cursor: pointer;\n    white-space: nowrap;\n}\n\n.sr_checkbox:hover {\n    filter: brightness(200%);\n}\n\n.loader {\n    border: 4px solid #f3f3f3;\n    border-radius: 50%;\n    border-top: 4px solid #3498db;\n    width: 20px;\n    height: 20px;\n    animation: spin 1.5s linear infinite;\n}\n\n.remember-logout-choice-wrapper {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin-bottom: 12px;\n}\n\n#rememberLogoutChoice {\n    display: block;\n}\n\n\na.disabled {\n    cursor: not-allowed;\n    color: black;\n    text-decoration: none;\n}\n\n.intro-screen {\n    overflow: hidden;\n    height: 410px;\n    flex-grow: 1;\n    display: flex;\n    flex-direction: column;\n}\n\n#insights-content {\n    width: 750px;\n    color: #333;\n    font-size: 14px;\n    line-height: 1.42857143;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n#insights-content h1 {\n    font-size: 28px;\n    margin-bottom: 18px;\n}\n\n#insights-content h2 {\n    margin: 0;\n}\n\n#insights-content .prompts-wrapper {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    flex-grow: 1;\n}\n\n#insights-content .icon {\n    width: 32px;\n}\n\n#insights-content .spacer-vertical {\n    align-self: stretch;\n    border-right: 1px solid #eee;\n}\n\n#insights-content .spacer-horizontal {\n    align-self: stretch;\n    border-bottom: 1px solid #eee;\n}\n\n#insights-content .prompts-section {\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n    align-self: stretch;\n}\n\n#insights-content .prompts-list {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n}\n\n#insights-content .prompt {\n    display: flex;\n    flex-direction: row;\n    gap: 8px;\n    align-items: center;\n    padding: 6px 0px;\n    min-width: 435px;\n    flex-shrink: 1;\n    background: transparent;\n    transition: 0.175s ease-in-out;\n    font-size: 14px;\n}\n\n#insights-content .prompt:hover {\n    /* border-color: #CE6D35; */\n}\n\n#insights-content .prompt-name {\n    flex-grow: 1;\n    line-height: 1;\n    margin-top: 1px;\n}\n\n#insights-content .prompt button {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n    background: #D77731;\n    color: white;\n    padding: 4px 8px;\n    cursor: pointer;\n    border-radius: 4px;\n    border: 0;\n    font-size: 14px;\n    border-radius: 4px;\n    font-size: 12px;\n}\n\n#insights-content .prompt button:disabled {\n    cursor: not-allowed;\n    background: #908f8e;\n}\n\n#insights-content .prompt button:not(:disabled):hover {\n    background: #c76c2b;\n}\n\n#insights-content .learn-more-link {\n    text-decoration: none;\n    color: #337ab7;\n}\n\n#insights-content .learn-more-link:visited {\n    color: #337ab7;\n}\n\n#insights-content .learn-more-link:focus,\n#insights-content .learn-more-link:hover {\n    color: #23527c;\n    text-decoration: underline\n}\n\n\n\n\n@keyframes spin {\n    0% {\n        transform: rotate(0deg);\n    }\n\n    100% {\n        transform: rotate(360deg);\n    }\n}", "" ]);
        const p = 532 == r.j ? h : null;
    },
    645: n => {
        "use strict";
        n.exports = function(n) {
            var o = [];
            return o.toString = function() {
                return this.map((function(o) {
                    var r = "", s = void 0 !== o[5];
                    return o[4] && (r += "@supports (".concat(o[4], ") {")), o[2] && (r += "@media ".concat(o[2], " {")), 
                    s && (r += "@layer".concat(o[5].length > 0 ? " ".concat(o[5]) : "", " {")), r += n(o), 
                    s && (r += "}"), o[2] && (r += "}"), o[4] && (r += "}"), r;
                })).join("");
            }, o.i = function(n, r, s, a, l) {
                "string" == typeof n && (n = [ [ null, n, void 0 ] ]);
                var h = {};
                if (s) for (var p = 0; p < this.length; p++) {
                    var x = this[p][0];
                    null != x && (h[x] = !0);
                }
                for (var _ = 0; _ < n.length; _++) {
                    var y = [].concat(n[_]);
                    s && h[y[0]] || (void 0 !== l && (void 0 === y[5] || (y[1] = "@layer".concat(y[5].length > 0 ? " ".concat(y[5]) : "", " {").concat(y[1], "}")), 
                    y[5] = l), r && (y[2] ? (y[1] = "@media ".concat(y[2], " {").concat(y[1], "}"), 
                    y[2] = r) : y[2] = r), a && (y[4] ? (y[1] = "@supports (".concat(y[4], ") {").concat(y[1], "}"), 
                    y[4] = a) : y[4] = "".concat(a)), o.push(y));
                }
            }, o;
        };
    },
    81: n => {
        "use strict";
        n.exports = function(n) {
            return n[1];
        };
    },
    637: (n, o, r) => {
        var s = r(785);
        s && s.__esModule && (s = s.default), n.exports = "string" == typeof s ? s : s.toString();
    },
    576: (n, o, r) => {
        var s = r(404);
        s && s.__esModule && (s = s.default), n.exports = "string" == typeof s ? s : s.toString();
    },
    106: (n, o, r) => {
        var s = r(903);
        s && s.__esModule && (s = s.default), n.exports = "string" == typeof s ? s : s.toString();
    },
    387: (n, o, r) => {
        var s = r(689);
        s && s.__esModule && (s = s.default), n.exports = "string" == typeof s ? s : s.toString();
    },
    594: function(n, o, r) {
        var s, a;
 /*! tooltipster v4.2.8 */        s = [ r(755) ], a = function(n) {
            return function(n) {
                function b(n) {
                    this.$container, this.constraints = null, this.__$tooltip, this.__init(n);
                }
                function c(o, r) {
                    var s = !0;
                    return n.each(o, (function(n, a) {
                        return void 0 === r[n] || o[n] !== r[n] ? (s = !1, !1) : void 0;
                    })), s;
                }
                function d(o) {
                    var r = o.attr("id"), a = r ? s.window.document.getElementById(r) : null;
                    return a ? a === o[0] : n.contains(s.window.document.body, o[0]);
                }
                function e() {
                    if (!r) return !1;
                    var n = (r.document.body || r.document.documentElement).style, o = "transition", s = [ "Moz", "Webkit", "Khtml", "O", "ms" ];
                    if ("string" == typeof n[o]) return !0;
                    o = o.charAt(0).toUpperCase() + o.substr(1);
                    for (var a = 0; a < s.length; a++) if ("string" == typeof n[s[a] + o]) return !0;
                    return !1;
                }
                var o = {
                    animation: "fade",
                    animationDuration: 350,
                    content: null,
                    contentAsHTML: !1,
                    contentCloning: !1,
                    debug: !0,
                    delay: 300,
                    delayTouch: [ 300, 500 ],
                    functionInit: null,
                    functionBefore: null,
                    functionReady: null,
                    functionAfter: null,
                    functionFormat: null,
                    IEmin: 6,
                    interactive: !1,
                    multiple: !1,
                    parent: null,
                    plugins: [ "sideTip" ],
                    repositionOnScroll: !1,
                    restoration: "none",
                    selfDestruction: !0,
                    theme: [],
                    timer: 0,
                    trackerInterval: 500,
                    trackOrigin: !1,
                    trackTooltip: !1,
                    trigger: "hover",
                    triggerClose: {
                        click: !1,
                        mouseleave: !1,
                        originClick: !1,
                        scroll: !1,
                        tap: !1,
                        touchleave: !1
                    },
                    triggerOpen: {
                        click: !1,
                        mouseenter: !1,
                        tap: !1,
                        touchstart: !1
                    },
                    updateAnimation: "rotate",
                    zIndex: 9999999
                }, r = "undefined" != typeof window ? window : null, s = {
                    hasTouchCapability: !(!r || !("ontouchstart" in r || r.DocumentTouch && r.document instanceof r.DocumentTouch || r.navigator.maxTouchPoints)),
                    hasTransitions: e(),
                    IE: !1,
                    semVer: "4.2.8",
                    window: r
                }, i = function() {
                    this.__$emitterPrivate = n({}), this.__$emitterPublic = n({}), this.__instancesLatestArr = [], 
                    this.__plugins = {}, this._env = s;
                };
                i.prototype = {
                    __bridge: function(r, s, a) {
                        if (!s[a]) {
                            var e = function() {};
                            e.prototype = r;
                            var l = new e;
                            l.__init && l.__init(s), n.each(r, (function(n, r) {
                                0 != n.indexOf("__") && (s[n] ? o.debug : (s[n] = function() {
                                    return l[n].apply(l, Array.prototype.slice.apply(arguments));
                                }, s[n].bridged = l));
                            })), s[a] = l;
                        }
                        return this;
                    },
                    __setWindow: function(n) {
                        return s.window = n, this;
                    },
                    _getRuler: function(n) {
                        return new b(n);
                    },
                    _off: function() {
                        return this.__$emitterPrivate.off.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), 
                        this;
                    },
                    _on: function() {
                        return this.__$emitterPrivate.on.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), 
                        this;
                    },
                    _one: function() {
                        return this.__$emitterPrivate.one.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), 
                        this;
                    },
                    _plugin: function(o) {
                        var r = this;
                        if ("string" == typeof o) {
                            var s = o, a = null;
                            return s.indexOf(".") > 0 ? a = r.__plugins[s] : n.each(r.__plugins, (function(n, o) {
                                return o.name.substring(o.name.length - s.length - 1) == "." + s ? (a = o, !1) : void 0;
                            })), a;
                        }
                        if (o.name.indexOf(".") < 0) throw new Error("Plugins must be namespaced");
                        return r.__plugins[o.name] = o, o.core && r.__bridge(o.core, r, o.name), this;
                    },
                    _trigger: function() {
                        var n = Array.prototype.slice.apply(arguments);
                        return "string" == typeof n[0] && (n[0] = {
                            type: n[0]
                        }), this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate, n), this.__$emitterPublic.trigger.apply(this.__$emitterPublic, n), 
                        this;
                    },
                    instances: function(o) {
                        var r = [];
                        return n(o || ".tooltipstered").each((function() {
                            var o = n(this), s = o.data("tooltipster-ns");
                            s && n.each(s, (function(n, s) {
                                r.push(o.data(s));
                            }));
                        })), r;
                    },
                    instancesLatest: function() {
                        return this.__instancesLatestArr;
                    },
                    off: function() {
                        return this.__$emitterPublic.off.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), 
                        this;
                    },
                    on: function() {
                        return this.__$emitterPublic.on.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), 
                        this;
                    },
                    one: function() {
                        return this.__$emitterPublic.one.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), 
                        this;
                    },
                    origins: function(o) {
                        return n((o ? o + " " : "") + ".tooltipstered").toArray();
                    },
                    setDefaults: function(r) {
                        return n.extend(o, r), this;
                    },
                    triggerHandler: function() {
                        return this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), 
                        this;
                    }
                }, n.tooltipster = new i, n.Tooltipster = function(o, r) {
                    this.__callbacks = {
                        close: [],
                        open: []
                    }, this.__closingTime, this.__Content, this.__contentBcr, this.__destroyed = !1, 
                    this.__$emitterPrivate = n({}), this.__$emitterPublic = n({}), this.__enabled = !0, 
                    this.__garbageCollector, this.__Geometry, this.__lastPosition, this.__namespace = "tooltipster-" + Math.round(1e6 * Math.random()), 
                    this.__options, this.__$originParents, this.__pointerIsOverOrigin = !1, this.__previousThemes = [], 
                    this.__state = "closed", this.__timeouts = {
                        close: [],
                        open: null
                    }, this.__touchEvents = [], this.__tracker = null, this._$origin, this._$tooltip, 
                    this.__init(o, r);
                }, n.Tooltipster.prototype = {
                    __init: function(r, a) {
                        var l = this;
                        if (l._$origin = n(r), l.__options = n.extend(!0, {}, o, a), l.__optionsFormat(), 
                        !s.IE || s.IE >= l.__options.IEmin) {
                            var h = null;
                            if (void 0 === l._$origin.data("tooltipster-initialTitle") && (void 0 === (h = l._$origin.attr("title")) && (h = null), 
                            l._$origin.data("tooltipster-initialTitle", h)), null !== l.__options.content) l.__contentSet(l.__options.content); else {
                                var p, x = l._$origin.attr("data-tooltip-content");
                                x && (p = n(x)), p && p[0] ? l.__contentSet(p.first()) : l.__contentSet(h);
                            }
                            l._$origin.removeAttr("title").addClass("tooltipstered"), l.__prepareOrigin(), l.__prepareGC(), 
                            n.each(l.__options.plugins, (function(n, o) {
                                l._plug(o);
                            })), s.hasTouchCapability && n(s.window.document.body).on("touchmove." + l.__namespace + "-triggerOpen", (function(n) {
                                l._touchRecordEvent(n);
                            })), l._on("created", (function() {
                                l.__prepareTooltip();
                            }))._on("repositioned", (function(n) {
                                l.__lastPosition = n.position;
                            }));
                        } else l.__options.disabled = !0;
                    },
                    __contentInsert: function() {
                        var n = this, o = n._$tooltip.find(".tooltipster-content"), r = n.__Content, d = function(n) {
                            r = n;
                        };
                        return n._trigger({
                            type: "format",
                            content: n.__Content,
                            format: d
                        }), n.__options.functionFormat && (r = n.__options.functionFormat.call(n, n, {
                            origin: n._$origin[0]
                        }, n.__Content)), "string" != typeof r || n.__options.contentAsHTML ? o.empty().append(r) : o.text(r), 
                        n;
                    },
                    __contentSet: function(o) {
                        return o instanceof n && this.__options.contentCloning && (o = o.clone(!0)), this.__Content = o, 
                        this._trigger({
                            type: "updated",
                            content: o
                        }), this;
                    },
                    __destroyError: function() {
                        throw new Error("This tooltip has been destroyed and cannot execute your method call.");
                    },
                    __geometry: function() {
                        var o = this, r = o._$origin, a = o._$origin.is("area");
                        if (a) {
                            var l = o._$origin.parent().attr("name");
                            r = n('img[usemap="#' + l + '"]');
                        }
                        var h = r[0].getBoundingClientRect(), p = n(s.window.document), x = n(s.window), _ = r, y = {
                            available: {
                                document: null,
                                window: null
                            },
                            document: {
                                size: {
                                    height: p.height(),
                                    width: p.width()
                                }
                            },
                            window: {
                                scroll: {
                                    left: s.window.scrollX || s.window.document.documentElement.scrollLeft,
                                    top: s.window.scrollY || s.window.document.documentElement.scrollTop
                                },
                                size: {
                                    height: x.height(),
                                    width: x.width()
                                }
                            },
                            origin: {
                                fixedLineage: !1,
                                offset: {},
                                size: {
                                    height: h.bottom - h.top,
                                    width: h.right - h.left
                                },
                                usemapImage: a ? r[0] : null,
                                windowOffset: {
                                    bottom: h.bottom,
                                    left: h.left,
                                    right: h.right,
                                    top: h.top
                                }
                            }
                        };
                        if (a) {
                            var v = o._$origin.attr("shape"), w = o._$origin.attr("coords");
                            if (w && (w = w.split(","), n.map(w, (function(n, o) {
                                w[o] = parseInt(n);
                            }))), "default" != v) switch (v) {
                              case "circle":
                                var k = w[0], S = w[1], P = w[2], A = S - P, T = k - P;
                                y.origin.size.height = 2 * P, y.origin.size.width = y.origin.size.height, y.origin.windowOffset.left += T, 
                                y.origin.windowOffset.top += A;
                                break;

                              case "rect":
                                var R = w[0], O = w[1], C = w[2], z = w[3];
                                y.origin.size.height = z - O, y.origin.size.width = C - R, y.origin.windowOffset.left += R, 
                                y.origin.windowOffset.top += O;
                                break;

                              case "poly":
                                for (var M = 0, I = 0, E = 0, $ = 0, N = "even", F = 0; F < w.length; F++) {
                                    var U = w[F];
                                    "even" == N ? (U > E && (E = U, 0 === F && (M = E)), M > U && (M = U), N = "odd") : (U > $ && ($ = U, 
                                    1 == F && (I = $)), I > U && (I = U), N = "even");
                                }
                                y.origin.size.height = $ - I, y.origin.size.width = E - M, y.origin.windowOffset.left += M, 
                                y.origin.windowOffset.top += I;
                            }
                        }
                        var D = function(n) {
                            y.origin.size.height = n.height, y.origin.windowOffset.left = n.left, y.origin.windowOffset.top = n.top, 
                            y.origin.size.width = n.width;
                        };
                        for (o._trigger({
                            type: "geometry",
                            edit: D,
                            geometry: {
                                height: y.origin.size.height,
                                left: y.origin.windowOffset.left,
                                top: y.origin.windowOffset.top,
                                width: y.origin.size.width
                            }
                        }), y.origin.windowOffset.right = y.origin.windowOffset.left + y.origin.size.width, 
                        y.origin.windowOffset.bottom = y.origin.windowOffset.top + y.origin.size.height, 
                        y.origin.offset.left = y.origin.windowOffset.left + y.window.scroll.left, y.origin.offset.top = y.origin.windowOffset.top + y.window.scroll.top, 
                        y.origin.offset.bottom = y.origin.offset.top + y.origin.size.height, y.origin.offset.right = y.origin.offset.left + y.origin.size.width, 
                        y.available.document = {
                            bottom: {
                                height: y.document.size.height - y.origin.offset.bottom,
                                width: y.document.size.width
                            },
                            left: {
                                height: y.document.size.height,
                                width: y.origin.offset.left
                            },
                            right: {
                                height: y.document.size.height,
                                width: y.document.size.width - y.origin.offset.right
                            },
                            top: {
                                height: y.origin.offset.top,
                                width: y.document.size.width
                            }
                        }, y.available.window = {
                            bottom: {
                                height: Math.max(y.window.size.height - Math.max(y.origin.windowOffset.bottom, 0), 0),
                                width: y.window.size.width
                            },
                            left: {
                                height: y.window.size.height,
                                width: Math.max(y.origin.windowOffset.left, 0)
                            },
                            right: {
                                height: y.window.size.height,
                                width: Math.max(y.window.size.width - Math.max(y.origin.windowOffset.right, 0), 0)
                            },
                            top: {
                                height: Math.max(y.origin.windowOffset.top, 0),
                                width: y.window.size.width
                            }
                        }; "html" != _[0].tagName.toLowerCase(); ) {
                            if ("fixed" == _.css("position")) {
                                y.origin.fixedLineage = !0;
                                break;
                            }
                            _ = _.parent();
                        }
                        return y;
                    },
                    __optionsFormat: function() {
                        return "number" == typeof this.__options.animationDuration && (this.__options.animationDuration = [ this.__options.animationDuration, this.__options.animationDuration ]), 
                        "number" == typeof this.__options.delay && (this.__options.delay = [ this.__options.delay, this.__options.delay ]), 
                        "number" == typeof this.__options.delayTouch && (this.__options.delayTouch = [ this.__options.delayTouch, this.__options.delayTouch ]), 
                        "string" == typeof this.__options.theme && (this.__options.theme = [ this.__options.theme ]), 
                        null === this.__options.parent ? this.__options.parent = n(s.window.document.body) : "string" == typeof this.__options.parent && (this.__options.parent = n(this.__options.parent)), 
                        "hover" == this.__options.trigger ? (this.__options.triggerOpen = {
                            mouseenter: !0,
                            touchstart: !0
                        }, this.__options.triggerClose = {
                            mouseleave: !0,
                            originClick: !0,
                            touchleave: !0
                        }) : "click" == this.__options.trigger && (this.__options.triggerOpen = {
                            click: !0,
                            tap: !0
                        }, this.__options.triggerClose = {
                            click: !0,
                            tap: !0
                        }), this._trigger("options"), this;
                    },
                    __prepareGC: function() {
                        var o = this;
                        return o.__options.selfDestruction ? o.__garbageCollector = setInterval((function() {
                            var r = (new Date).getTime();
                            o.__touchEvents = n.grep(o.__touchEvents, (function(n, o) {
                                return r - n.time > 6e4;
                            })), d(o._$origin) || o.close((function() {
                                o.destroy();
                            }));
                        }), 2e4) : clearInterval(o.__garbageCollector), o;
                    },
                    __prepareOrigin: function() {
                        var n = this;
                        if (n._$origin.off("." + n.__namespace + "-triggerOpen"), s.hasTouchCapability && n._$origin.on("touchstart." + n.__namespace + "-triggerOpen touchend." + n.__namespace + "-triggerOpen touchcancel." + n.__namespace + "-triggerOpen", (function(o) {
                            n._touchRecordEvent(o);
                        })), n.__options.triggerOpen.click || n.__options.triggerOpen.tap && s.hasTouchCapability) {
                            var o = "";
                            n.__options.triggerOpen.click && (o += "click." + n.__namespace + "-triggerOpen "), 
                            n.__options.triggerOpen.tap && s.hasTouchCapability && (o += "touchend." + n.__namespace + "-triggerOpen"), 
                            n._$origin.on(o, (function(o) {
                                n._touchIsMeaningfulEvent(o) && n._open(o);
                            }));
                        }
                        return (n.__options.triggerOpen.mouseenter || n.__options.triggerOpen.touchstart && s.hasTouchCapability) && (o = "", 
                        n.__options.triggerOpen.mouseenter && (o += "mouseenter." + n.__namespace + "-triggerOpen "), 
                        n.__options.triggerOpen.touchstart && s.hasTouchCapability && (o += "touchstart." + n.__namespace + "-triggerOpen"), 
                        n._$origin.on(o, (function(o) {
                            !n._touchIsTouchEvent(o) && n._touchIsEmulatedEvent(o) || (n.__pointerIsOverOrigin = !0, 
                            n._openShortly(o));
                        }))), (n.__options.triggerClose.mouseleave || n.__options.triggerClose.touchleave && s.hasTouchCapability) && (o = "", 
                        n.__options.triggerClose.mouseleave && (o += "mouseleave." + n.__namespace + "-triggerOpen "), 
                        n.__options.triggerClose.touchleave && s.hasTouchCapability && (o += "touchend." + n.__namespace + "-triggerOpen touchcancel." + n.__namespace + "-triggerOpen"), 
                        n._$origin.on(o, (function(o) {
                            n._touchIsMeaningfulEvent(o) && (n.__pointerIsOverOrigin = !1);
                        }))), n;
                    },
                    __prepareTooltip: function() {
                        var o = this, r = o.__options.interactive ? "auto" : "";
                        return o._$tooltip.attr("id", o.__namespace).css({
                            "pointer-events": r,
                            zIndex: o.__options.zIndex
                        }), n.each(o.__previousThemes, (function(n, r) {
                            o._$tooltip.removeClass(r);
                        })), n.each(o.__options.theme, (function(n, r) {
                            o._$tooltip.addClass(r);
                        })), o.__previousThemes = n.merge([], o.__options.theme), o;
                    },
                    __scrollHandler: function(o) {
                        var r = this;
                        if (r.__options.triggerClose.scroll) r._close(o); else if (d(r._$origin) && d(r._$tooltip)) {
                            var a = null;
                            if (o.target === s.window.document) r.__Geometry.origin.fixedLineage || r.__options.repositionOnScroll && r.reposition(o); else {
                                a = r.__geometry();
                                var l = !1;
                                if ("fixed" != r._$origin.css("position") && r.__$originParents.each((function(o, r) {
                                    var s = n(r), h = s.css("overflow-x"), p = s.css("overflow-y");
                                    if ("visible" != h || "visible" != p) {
                                        var x = r.getBoundingClientRect();
                                        if ("visible" != h && (a.origin.windowOffset.left < x.left || a.origin.windowOffset.right > x.right)) return l = !0, 
                                        !1;
                                        if ("visible" != p && (a.origin.windowOffset.top < x.top || a.origin.windowOffset.bottom > x.bottom)) return l = !0, 
                                        !1;
                                    }
                                    return "fixed" != s.css("position") && void 0;
                                })), l) r._$tooltip.css("visibility", "hidden"); else if (r._$tooltip.css("visibility", "visible"), 
                                r.__options.repositionOnScroll) r.reposition(o); else {
                                    var h = a.origin.offset.left - r.__Geometry.origin.offset.left, p = a.origin.offset.top - r.__Geometry.origin.offset.top;
                                    r._$tooltip.css({
                                        left: r.__lastPosition.coord.left + h,
                                        top: r.__lastPosition.coord.top + p
                                    });
                                }
                            }
                            r._trigger({
                                type: "scroll",
                                event: o,
                                geo: a
                            });
                        }
                        return r;
                    },
                    __stateSet: function(n) {
                        return this.__state = n, this._trigger({
                            type: "state",
                            state: n
                        }), this;
                    },
                    __timeoutsClear: function() {
                        return clearTimeout(this.__timeouts.open), this.__timeouts.open = null, n.each(this.__timeouts.close, (function(n, o) {
                            clearTimeout(o);
                        })), this.__timeouts.close = [], this;
                    },
                    __trackerStart: function() {
                        var n = this, o = n._$tooltip.find(".tooltipster-content");
                        return n.__options.trackTooltip && (n.__contentBcr = o[0].getBoundingClientRect()), 
                        n.__tracker = setInterval((function() {
                            if (d(n._$origin) && d(n._$tooltip)) {
                                if (n.__options.trackOrigin) {
                                    var r = n.__geometry(), s = !1;
                                    c(r.origin.size, n.__Geometry.origin.size) && (n.__Geometry.origin.fixedLineage ? c(r.origin.windowOffset, n.__Geometry.origin.windowOffset) && (s = !0) : c(r.origin.offset, n.__Geometry.origin.offset) && (s = !0)), 
                                    s || (n.__options.triggerClose.mouseleave ? n._close() : n.reposition());
                                }
                                if (n.__options.trackTooltip) {
                                    var a = o[0].getBoundingClientRect();
                                    a.height === n.__contentBcr.height && a.width === n.__contentBcr.width || (n.reposition(), 
                                    n.__contentBcr = a);
                                }
                            } else n._close();
                        }), n.__options.trackerInterval), n;
                    },
                    _close: function(o, r, a) {
                        var l = this, h = !0;
                        if (l._trigger({
                            type: "close",
                            event: o,
                            stop: function() {
                                h = !1;
                            }
                        }), h || a) {
                            r && l.__callbacks.close.push(r), l.__callbacks.open = [], l.__timeoutsClear();
                            var g = function() {
                                n.each(l.__callbacks.close, (function(n, r) {
                                    r.call(l, l, {
                                        event: o,
                                        origin: l._$origin[0]
                                    });
                                })), l.__callbacks.close = [];
                            };
                            if ("closed" != l.__state) {
                                var p = !0, x = (new Date).getTime() + l.__options.animationDuration[1];
                                if ("disappearing" == l.__state && x > l.__closingTime && l.__options.animationDuration[1] > 0 && (p = !1), 
                                p) {
                                    l.__closingTime = x, "disappearing" != l.__state && l.__stateSet("disappearing");
                                    var m = function() {
                                        clearInterval(l.__tracker), l._trigger({
                                            type: "closing",
                                            event: o
                                        }), l._$tooltip.off("." + l.__namespace + "-triggerClose").removeClass("tooltipster-dying"), 
                                        n(s.window).off("." + l.__namespace + "-triggerClose"), l.__$originParents.each((function(o, r) {
                                            n(r).off("scroll." + l.__namespace + "-triggerClose");
                                        })), l.__$originParents = null, n(s.window.document.body).off("." + l.__namespace + "-triggerClose"), 
                                        l._$origin.off("." + l.__namespace + "-triggerClose"), l._off("dismissable"), l.__stateSet("closed"), 
                                        l._trigger({
                                            type: "after",
                                            event: o
                                        }), l.__options.functionAfter && l.__options.functionAfter.call(l, l, {
                                            event: o,
                                            origin: l._$origin[0]
                                        }), g();
                                    };
                                    s.hasTransitions ? (l._$tooltip.css({
                                        "-moz-animation-duration": l.__options.animationDuration[1] + "ms",
                                        "-ms-animation-duration": l.__options.animationDuration[1] + "ms",
                                        "-o-animation-duration": l.__options.animationDuration[1] + "ms",
                                        "-webkit-animation-duration": l.__options.animationDuration[1] + "ms",
                                        "animation-duration": l.__options.animationDuration[1] + "ms",
                                        "transition-duration": l.__options.animationDuration[1] + "ms"
                                    }), l._$tooltip.clearQueue().removeClass("tooltipster-show").addClass("tooltipster-dying"), 
                                    l.__options.animationDuration[1] > 0 && l._$tooltip.delay(l.__options.animationDuration[1]), 
                                    l._$tooltip.queue(m)) : l._$tooltip.stop().fadeOut(l.__options.animationDuration[1], m);
                                }
                            } else g();
                        }
                        return l;
                    },
                    _off: function() {
                        return this.__$emitterPrivate.off.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), 
                        this;
                    },
                    _on: function() {
                        return this.__$emitterPrivate.on.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), 
                        this;
                    },
                    _one: function() {
                        return this.__$emitterPrivate.one.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)), 
                        this;
                    },
                    _open: function(o, r) {
                        var a = this;
                        if (!a.__destroying && d(a._$origin) && a.__enabled) {
                            var l = !0;
                            if ("closed" == a.__state && (a._trigger({
                                type: "before",
                                event: o,
                                stop: function() {
                                    l = !1;
                                }
                            }), l && a.__options.functionBefore && (l = a.__options.functionBefore.call(a, a, {
                                event: o,
                                origin: a._$origin[0]
                            }))), !1 !== l && null !== a.__Content) {
                                r && a.__callbacks.open.push(r), a.__callbacks.close = [], a.__timeoutsClear();
                                var h, i = function() {
                                    "stable" != a.__state && a.__stateSet("stable"), n.each(a.__callbacks.open, (function(n, o) {
                                        o.call(a, a, {
                                            origin: a._$origin[0],
                                            tooltip: a._$tooltip[0]
                                        });
                                    })), a.__callbacks.open = [];
                                };
                                if ("closed" !== a.__state) h = 0, "disappearing" === a.__state ? (a.__stateSet("appearing"), 
                                s.hasTransitions ? (a._$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-show"), 
                                a.__options.animationDuration[0] > 0 && a._$tooltip.delay(a.__options.animationDuration[0]), 
                                a._$tooltip.queue(i)) : a._$tooltip.stop().fadeIn(i)) : "stable" == a.__state && i(); else {
                                    if (a.__stateSet("appearing"), h = a.__options.animationDuration[0], a.__contentInsert(), 
                                    a.reposition(o, !0), s.hasTransitions ? (a._$tooltip.addClass("tooltipster-" + a.__options.animation).addClass("tooltipster-initial").css({
                                        "-moz-animation-duration": a.__options.animationDuration[0] + "ms",
                                        "-ms-animation-duration": a.__options.animationDuration[0] + "ms",
                                        "-o-animation-duration": a.__options.animationDuration[0] + "ms",
                                        "-webkit-animation-duration": a.__options.animationDuration[0] + "ms",
                                        "animation-duration": a.__options.animationDuration[0] + "ms",
                                        "transition-duration": a.__options.animationDuration[0] + "ms"
                                    }), setTimeout((function() {
                                        "closed" != a.__state && (a._$tooltip.addClass("tooltipster-show").removeClass("tooltipster-initial"), 
                                        a.__options.animationDuration[0] > 0 && a._$tooltip.delay(a.__options.animationDuration[0]), 
                                        a._$tooltip.queue(i));
                                    }), 0)) : a._$tooltip.css("display", "none").fadeIn(a.__options.animationDuration[0], i), 
                                    a.__trackerStart(), n(s.window).on("resize." + a.__namespace + "-triggerClose", (function(o) {
                                        var r = n(document.activeElement);
                                        (r.is("input") || r.is("textarea")) && n.contains(a._$tooltip[0], r[0]) || a.reposition(o);
                                    })).on("scroll." + a.__namespace + "-triggerClose", (function(n) {
                                        a.__scrollHandler(n);
                                    })), a.__$originParents = a._$origin.parents(), a.__$originParents.each((function(o, r) {
                                        n(r).on("scroll." + a.__namespace + "-triggerClose", (function(n) {
                                            a.__scrollHandler(n);
                                        }));
                                    })), a.__options.triggerClose.mouseleave || a.__options.triggerClose.touchleave && s.hasTouchCapability) {
                                        a._on("dismissable", (function(n) {
                                            n.dismissable ? n.delay ? (y = setTimeout((function() {
                                                a._close(n.event);
                                            }), n.delay), a.__timeouts.close.push(y)) : a._close(n) : clearTimeout(y);
                                        }));
                                        var p = a._$origin, x = "", _ = "", y = null;
                                        a.__options.interactive && (p = p.add(a._$tooltip)), a.__options.triggerClose.mouseleave && (x += "mouseenter." + a.__namespace + "-triggerClose ", 
                                        _ += "mouseleave." + a.__namespace + "-triggerClose "), a.__options.triggerClose.touchleave && s.hasTouchCapability && (x += "touchstart." + a.__namespace + "-triggerClose", 
                                        _ += "touchend." + a.__namespace + "-triggerClose touchcancel." + a.__namespace + "-triggerClose"), 
                                        p.on(_, (function(n) {
                                            if (a._touchIsTouchEvent(n) || !a._touchIsEmulatedEvent(n)) {
                                                var o = "mouseleave" == n.type ? a.__options.delay : a.__options.delayTouch;
                                                a._trigger({
                                                    delay: o[1],
                                                    dismissable: !0,
                                                    event: n,
                                                    type: "dismissable"
                                                });
                                            }
                                        })).on(x, (function(n) {
                                            !a._touchIsTouchEvent(n) && a._touchIsEmulatedEvent(n) || a._trigger({
                                                dismissable: !1,
                                                event: n,
                                                type: "dismissable"
                                            });
                                        }));
                                    }
                                    a.__options.triggerClose.originClick && a._$origin.on("click." + a.__namespace + "-triggerClose", (function(n) {
                                        a._touchIsTouchEvent(n) || a._touchIsEmulatedEvent(n) || a._close(n);
                                    })), (a.__options.triggerClose.click || a.__options.triggerClose.tap && s.hasTouchCapability) && setTimeout((function() {
                                        if ("closed" != a.__state) {
                                            var o = "", r = n(s.window.document.body);
                                            a.__options.triggerClose.click && (o += "click." + a.__namespace + "-triggerClose "), 
                                            a.__options.triggerClose.tap && s.hasTouchCapability && (o += "touchend." + a.__namespace + "-triggerClose"), 
                                            r.on(o, (function(o) {
                                                a._touchIsMeaningfulEvent(o) && (a._touchRecordEvent(o), a.__options.interactive && n.contains(a._$tooltip[0], o.target) || a._close(o));
                                            })), a.__options.triggerClose.tap && s.hasTouchCapability && r.on("touchstart." + a.__namespace + "-triggerClose", (function(n) {
                                                a._touchRecordEvent(n);
                                            }));
                                        }
                                    }), 0), a._trigger("ready"), a.__options.functionReady && a.__options.functionReady.call(a, a, {
                                        origin: a._$origin[0],
                                        tooltip: a._$tooltip[0]
                                    });
                                }
                                a.__options.timer > 0 && (y = setTimeout((function() {
                                    a._close();
                                }), a.__options.timer + h), a.__timeouts.close.push(y));
                            }
                        }
                        return a;
                    },
                    _openShortly: function(n) {
                        var o = this, r = !0;
                        if ("stable" != o.__state && "appearing" != o.__state && !o.__timeouts.open && (o._trigger({
                            type: "start",
                            event: n,
                            stop: function() {
                                r = !1;
                            }
                        }), r)) {
                            var s = 0 == n.type.indexOf("touch") ? o.__options.delayTouch : o.__options.delay;
                            s[0] ? o.__timeouts.open = setTimeout((function() {
                                o.__timeouts.open = null, o.__pointerIsOverOrigin && o._touchIsMeaningfulEvent(n) ? (o._trigger("startend"), 
                                o._open(n)) : o._trigger("startcancel");
                            }), s[0]) : (o._trigger("startend"), o._open(n));
                        }
                        return o;
                    },
                    _optionsExtract: function(o, r) {
                        var s = this, a = n.extend(!0, {}, r), l = s.__options[o];
                        return l || (l = {}, n.each(r, (function(n, o) {
                            var r = s.__options[n];
                            void 0 !== r && (l[n] = r);
                        }))), n.each(a, (function(o, r) {
                            void 0 !== l[o] && ("object" != typeof r || r instanceof Array || null == r || "object" != typeof l[o] || l[o] instanceof Array || null == l[o] ? a[o] = l[o] : n.extend(a[o], l[o]));
                        })), a;
                    },
                    _plug: function(o) {
                        var r = n.tooltipster._plugin(o);
                        if (!r) throw new Error('The "' + o + '" plugin is not defined');
                        return r.instance && n.tooltipster.__bridge(r.instance, this, r.name), this;
                    },
                    _touchIsEmulatedEvent: function(n) {
                        for (var o = !1, r = (new Date).getTime(), s = this.__touchEvents.length - 1; s >= 0; s--) {
                            var a = this.__touchEvents[s];
                            if (!(r - a.time < 500)) break;
                            a.target === n.target && (o = !0);
                        }
                        return o;
                    },
                    _touchIsMeaningfulEvent: function(n) {
                        return this._touchIsTouchEvent(n) && !this._touchSwiped(n.target) || !this._touchIsTouchEvent(n) && !this._touchIsEmulatedEvent(n);
                    },
                    _touchIsTouchEvent: function(n) {
                        return 0 == n.type.indexOf("touch");
                    },
                    _touchRecordEvent: function(n) {
                        return this._touchIsTouchEvent(n) && (n.time = (new Date).getTime(), this.__touchEvents.push(n)), 
                        this;
                    },
                    _touchSwiped: function(n) {
                        for (var o = !1, r = this.__touchEvents.length - 1; r >= 0; r--) {
                            var s = this.__touchEvents[r];
                            if ("touchmove" == s.type) {
                                o = !0;
                                break;
                            }
                            if ("touchstart" == s.type && n === s.target) break;
                        }
                        return o;
                    },
                    _trigger: function() {
                        var o = Array.prototype.slice.apply(arguments);
                        return "string" == typeof o[0] && (o[0] = {
                            type: o[0]
                        }), o[0].instance = this, o[0].origin = this._$origin ? this._$origin[0] : null, 
                        o[0].tooltip = this._$tooltip ? this._$tooltip[0] : null, this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate, o), 
                        n.tooltipster._trigger.apply(n.tooltipster, o), this.__$emitterPublic.trigger.apply(this.__$emitterPublic, o), 
                        this;
                    },
                    _unplug: function(o) {
                        var r = this;
                        if (r[o]) {
                            var s = n.tooltipster._plugin(o);
                            s.instance && n.each(s.instance, (function(n, s) {
                                r[n] && r[n].bridged === r[o] && delete r[n];
                            })), r[o].__destroy && r[o].__destroy(), delete r[o];
                        }
                        return r;
                    },
                    close: function(n) {
                        return this.__destroyed ? this.__destroyError() : this._close(null, n), this;
                    },
                    content: function(n) {
                        var o = this;
                        if (void 0 === n) return o.__Content;
                        if (o.__destroyed) o.__destroyError(); else if (o.__contentSet(n), null !== o.__Content) {
                            if ("closed" !== o.__state && (o.__contentInsert(), o.reposition(), o.__options.updateAnimation)) if (s.hasTransitions) {
                                var r = o.__options.updateAnimation;
                                o._$tooltip.addClass("tooltipster-update-" + r), setTimeout((function() {
                                    "closed" != o.__state && o._$tooltip.removeClass("tooltipster-update-" + r);
                                }), 1e3);
                            } else o._$tooltip.fadeTo(200, .5, (function() {
                                "closed" != o.__state && o._$tooltip.fadeTo(200, 1);
                            }));
                        } else o._close();
                        return o;
                    },
                    destroy: function() {
                        var o = this;
                        if (o.__destroyed) o.__destroyError(); else {
                            "closed" != o.__state ? o.option("animationDuration", 0)._close(null, null, !0) : o.__timeoutsClear(), 
                            o._trigger("destroy"), o.__destroyed = !0, o._$origin.removeData(o.__namespace).off("." + o.__namespace + "-triggerOpen"), 
                            n(s.window.document.body).off("." + o.__namespace + "-triggerOpen");
                            var r = o._$origin.data("tooltipster-ns");
                            if (r) if (1 === r.length) {
                                var a = null;
                                "previous" == o.__options.restoration ? a = o._$origin.data("tooltipster-initialTitle") : "current" == o.__options.restoration && (a = "string" == typeof o.__Content ? o.__Content : n("<div></div>").append(o.__Content).html()), 
                                a && o._$origin.attr("title", a), o._$origin.removeClass("tooltipstered"), o._$origin.removeData("tooltipster-ns").removeData("tooltipster-initialTitle");
                            } else r = n.grep(r, (function(n, r) {
                                return n !== o.__namespace;
                            })), o._$origin.data("tooltipster-ns", r);
                            o._trigger("destroyed"), o._off(), o.off(), o.__Content = null, o.__$emitterPrivate = null, 
                            o.__$emitterPublic = null, o.__options.parent = null, o._$origin = null, o._$tooltip = null, 
                            n.tooltipster.__instancesLatestArr = n.grep(n.tooltipster.__instancesLatestArr, (function(n, r) {
                                return o !== n;
                            })), clearInterval(o.__garbageCollector);
                        }
                        return o;
                    },
                    disable: function() {
                        return this.__destroyed ? (this.__destroyError(), this) : (this._close(), this.__enabled = !1, 
                        this);
                    },
                    elementOrigin: function() {
                        return this.__destroyed ? void this.__destroyError() : this._$origin[0];
                    },
                    elementTooltip: function() {
                        return this._$tooltip ? this._$tooltip[0] : null;
                    },
                    enable: function() {
                        return this.__enabled = !0, this;
                    },
                    hide: function(n) {
                        return this.close(n);
                    },
                    instance: function() {
                        return this;
                    },
                    off: function() {
                        return this.__destroyed || this.__$emitterPublic.off.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), 
                        this;
                    },
                    on: function() {
                        return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.on.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), 
                        this;
                    },
                    one: function() {
                        return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.one.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), 
                        this;
                    },
                    open: function(n) {
                        return this.__destroyed ? this.__destroyError() : this._open(null, n), this;
                    },
                    option: function(o, r) {
                        return void 0 === r ? this.__options[o] : (this.__destroyed ? this.__destroyError() : (this.__options[o] = r, 
                        this.__optionsFormat(), n.inArray(o, [ "trigger", "triggerClose", "triggerOpen" ]) >= 0 && this.__prepareOrigin(), 
                        "selfDestruction" === o && this.__prepareGC()), this);
                    },
                    reposition: function(n, o) {
                        var r = this;
                        return r.__destroyed ? r.__destroyError() : "closed" != r.__state && d(r._$origin) && (o || d(r._$tooltip)) && (o || r._$tooltip.detach(), 
                        r.__Geometry = r.__geometry(), r._trigger({
                            type: "reposition",
                            event: n,
                            helper: {
                                geo: r.__Geometry
                            }
                        })), r;
                    },
                    show: function(n) {
                        return this.open(n);
                    },
                    status: function() {
                        return {
                            destroyed: this.__destroyed,
                            enabled: this.__enabled,
                            open: "closed" !== this.__state,
                            state: this.__state
                        };
                    },
                    triggerHandler: function() {
                        return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)), 
                        this;
                    }
                }, n.fn.tooltipster = function() {
                    var r = Array.prototype.slice.apply(arguments);
                    if (0 === this.length) return this;
                    if ("string" == typeof r[0]) {
                        var s = "#*$~&";
                        return this.each((function() {
                            var o = n(this).data("tooltipster-ns"), a = o ? n(this).data(o[0]) : null;
                            if (!a) throw new Error("You called Tooltipster's \"" + r[0] + '" method on an uninitialized element');
                            if ("function" != typeof a[r[0]]) throw new Error('Unknown method "' + r[0] + '"');
                            this.length > 1 && "content" == r[0] && (r[1] instanceof n || "object" == typeof r[1] && null != r[1] && r[1].tagName) && !a.__options.contentCloning && a.__options.debug;
                            var l = a[r[0]](r[1], r[2]);
                            return l !== a || "instance" === r[0] ? (s = l, !1) : void 0;
                        })), "#*$~&" !== s ? s : this;
                    }
                    n.tooltipster.__instancesLatestArr = [];
                    var a = r[0] && void 0 !== r[0].multiple, l = a && r[0].multiple || !a && o.multiple, h = r[0] && void 0 !== r[0].content, p = h && r[0].content || !h && o.content, x = r[0] && void 0 !== r[0].contentCloning, _ = (x && r[0].contentCloning || !x && o.contentCloning, 
                    r[0] && void 0 !== r[0].debug);
                    return _ && r[0].debug || !_ && o.debug, this.length > 1 && (p instanceof n || "object" == typeof p && null != p && p.tagName), 
                    this.each((function() {
                        var o = !1, s = n(this), a = s.data("tooltipster-ns"), h = null;
                        a ? l && (o = !0) : o = !0, o && (h = new n.Tooltipster(this, r[0]), a || (a = []), 
                        a.push(h.__namespace), s.data("tooltipster-ns", a), s.data(h.__namespace, h), h.__options.functionInit && h.__options.functionInit.call(h, h, {
                            origin: this
                        }), h._trigger("init")), n.tooltipster.__instancesLatestArr.push(h);
                    })), this;
                }, b.prototype = {
                    __init: function(o) {
                        this.__$tooltip = o, this.__$tooltip.css({
                            left: 0,
                            overflow: "hidden",
                            position: "absolute",
                            top: 0
                        }).find(".tooltipster-content").css("overflow", "auto"), this.$container = n('<div class="tooltipster-ruler"></div>').append(this.__$tooltip).appendTo(s.window.document.body);
                    },
                    __forceRedraw: function() {
                        var n = this.__$tooltip.parent();
                        this.__$tooltip.detach(), this.__$tooltip.appendTo(n);
                    },
                    constrain: function(n, o) {
                        return this.constraints = {
                            width: n,
                            height: o
                        }, this.__$tooltip.css({
                            display: "block",
                            height: "",
                            overflow: "auto",
                            width: n
                        }), this;
                    },
                    destroy: function() {
                        this.__$tooltip.detach().find(".tooltipster-content").css({
                            display: "",
                            overflow: ""
                        }), this.$container.remove();
                    },
                    free: function() {
                        return this.constraints = null, this.__$tooltip.css({
                            display: "",
                            height: "",
                            overflow: "visible",
                            width: ""
                        }), this;
                    },
                    measure: function() {
                        this.__forceRedraw();
                        var n = this.__$tooltip[0].getBoundingClientRect(), o = {
                            size: {
                                height: n.height || n.bottom - n.top,
                                width: n.width || n.right - n.left
                            }
                        };
                        if (this.constraints) {
                            var r = this.__$tooltip.find(".tooltipster-content"), a = this.__$tooltip.outerHeight(), l = r[0].getBoundingClientRect(), h = {
                                height: a <= this.constraints.height,
                                width: n.width <= this.constraints.width && l.width >= r[0].scrollWidth - 1
                            };
                            o.fits = h.height && h.width;
                        }
                        return s.IE && s.IE <= 11 && o.size.width !== s.window.document.documentElement.clientWidth && (o.size.width = Math.ceil(o.size.width) + 1), 
                        o;
                    }
                };
                var a = navigator.userAgent.toLowerCase();
                -1 != a.indexOf("msie") ? s.IE = parseInt(a.split("msie")[1]) : -1 !== a.toLowerCase().indexOf("trident") && -1 !== a.indexOf(" rv:11") ? s.IE = 11 : -1 != a.toLowerCase().indexOf("edge/") && (s.IE = parseInt(a.toLowerCase().split("edge/")[1]));
                var l = "tooltipster.sideTip";
                return n.tooltipster._plugin({
                    name: l,
                    instance: {
                        __defaults: function() {
                            return {
                                arrow: !0,
                                distance: 6,
                                functionPosition: null,
                                maxWidth: null,
                                minIntersection: 16,
                                minWidth: 0,
                                position: null,
                                side: "top",
                                viewportAware: !0
                            };
                        },
                        __init: function(n) {
                            var o = this;
                            o.__instance = n, o.__namespace = "tooltipster-sideTip-" + Math.round(1e6 * Math.random()), 
                            o.__previousState = "closed", o.__options, o.__optionsFormat(), o.__instance._on("state." + o.__namespace, (function(n) {
                                "closed" == n.state ? o.__close() : "appearing" == n.state && "closed" == o.__previousState && o.__create(), 
                                o.__previousState = n.state;
                            })), o.__instance._on("options." + o.__namespace, (function() {
                                o.__optionsFormat();
                            })), o.__instance._on("reposition." + o.__namespace, (function(n) {
                                o.__reposition(n.event, n.helper);
                            }));
                        },
                        __close: function() {
                            this.__instance.content() instanceof n && this.__instance.content().detach(), this.__instance._$tooltip.remove(), 
                            this.__instance._$tooltip = null;
                        },
                        __create: function() {
                            var o = n('<div class="tooltipster-base tooltipster-sidetip"><div class="tooltipster-box"><div class="tooltipster-content"></div></div><div class="tooltipster-arrow"><div class="tooltipster-arrow-uncropped"><div class="tooltipster-arrow-border"></div><div class="tooltipster-arrow-background"></div></div></div></div>');
                            this.__options.arrow || o.find(".tooltipster-box").css("margin", 0).end().find(".tooltipster-arrow").hide(), 
                            this.__options.minWidth && o.css("min-width", this.__options.minWidth + "px"), this.__options.maxWidth && o.css("max-width", this.__options.maxWidth + "px"), 
                            this.__instance._$tooltip = o, this.__instance._trigger("created");
                        },
                        __destroy: function() {
                            this.__instance._off("." + self.__namespace);
                        },
                        __optionsFormat: function() {
                            var o = this;
                            if (o.__options = o.__instance._optionsExtract(l, o.__defaults()), o.__options.position && (o.__options.side = o.__options.position), 
                            "object" != typeof o.__options.distance && (o.__options.distance = [ o.__options.distance ]), 
                            o.__options.distance.length < 4 && (void 0 === o.__options.distance[1] && (o.__options.distance[1] = o.__options.distance[0]), 
                            void 0 === o.__options.distance[2] && (o.__options.distance[2] = o.__options.distance[0]), 
                            void 0 === o.__options.distance[3] && (o.__options.distance[3] = o.__options.distance[1])), 
                            o.__options.distance = {
                                top: o.__options.distance[0],
                                right: o.__options.distance[1],
                                bottom: o.__options.distance[2],
                                left: o.__options.distance[3]
                            }, "string" == typeof o.__options.side) {
                                var r = {
                                    top: "bottom",
                                    right: "left",
                                    bottom: "top",
                                    left: "right"
                                };
                                o.__options.side = [ o.__options.side, r[o.__options.side] ], "left" == o.__options.side[0] || "right" == o.__options.side[0] ? o.__options.side.push("top", "bottom") : o.__options.side.push("right", "left");
                            }
                            6 === n.tooltipster._env.IE && !0 !== o.__options.arrow && (o.__options.arrow = !1);
                        },
                        __reposition: function(o, r) {
                            var s, a = this, l = a.__targetFind(r), h = [];
                            a.__instance._$tooltip.detach();
                            var p = a.__instance._$tooltip.clone(), x = n.tooltipster._getRuler(p), _ = !1, y = a.__instance.option("animation");
                            switch (y && p.removeClass("tooltipster-" + y), n.each([ "window", "document" ], (function(s, y) {
                                var v = null;
                                if (a.__instance._trigger({
                                    container: y,
                                    helper: r,
                                    satisfied: _,
                                    takeTest: function(n) {
                                        v = n;
                                    },
                                    results: h,
                                    type: "positionTest"
                                }), 1 == v || 0 != v && 0 == _ && ("window" != y || a.__options.viewportAware)) for (s = 0; s < a.__options.side.length; s++) {
                                    var w = {
                                        horizontal: 0,
                                        vertical: 0
                                    }, k = a.__options.side[s];
                                    "top" == k || "bottom" == k ? w.vertical = a.__options.distance[k] : w.horizontal = a.__options.distance[k], 
                                    a.__sideChange(p, k), n.each([ "natural", "constrained" ], (function(n, s) {
                                        if (v = null, a.__instance._trigger({
                                            container: y,
                                            event: o,
                                            helper: r,
                                            mode: s,
                                            results: h,
                                            satisfied: _,
                                            side: k,
                                            takeTest: function(n) {
                                                v = n;
                                            },
                                            type: "positionTest"
                                        }), 1 == v || 0 != v && 0 == _) {
                                            var p = {
                                                container: y,
                                                distance: w,
                                                fits: null,
                                                mode: s,
                                                outerSize: null,
                                                side: k,
                                                size: null,
                                                target: l[k],
                                                whole: null
                                            }, S = ("natural" == s ? x.free() : x.constrain(r.geo.available[y][k].width - w.horizontal, r.geo.available[y][k].height - w.vertical)).measure();
                                            if (p.size = S.size, p.outerSize = {
                                                height: S.size.height + w.vertical,
                                                width: S.size.width + w.horizontal
                                            }, "natural" == s ? r.geo.available[y][k].width >= p.outerSize.width && r.geo.available[y][k].height >= p.outerSize.height ? p.fits = !0 : p.fits = !1 : p.fits = S.fits, 
                                            "window" == y && (p.fits ? p.whole = "top" == k || "bottom" == k ? r.geo.origin.windowOffset.right >= a.__options.minIntersection && r.geo.window.size.width - r.geo.origin.windowOffset.left >= a.__options.minIntersection : r.geo.origin.windowOffset.bottom >= a.__options.minIntersection && r.geo.window.size.height - r.geo.origin.windowOffset.top >= a.__options.minIntersection : p.whole = !1), 
                                            h.push(p), p.whole) _ = !0; else if ("natural" == p.mode && (p.fits || p.size.width <= r.geo.available[y][k].width)) return !1;
                                        }
                                    }));
                                }
                            })), a.__instance._trigger({
                                edit: function(n) {
                                    h = n;
                                },
                                event: o,
                                helper: r,
                                results: h,
                                type: "positionTested"
                            }), h.sort((function(n, o) {
                                if (n.whole && !o.whole) return -1;
                                if (!n.whole && o.whole) return 1;
                                if (n.whole && o.whole) {
                                    var r = a.__options.side.indexOf(n.side);
                                    return (s = a.__options.side.indexOf(o.side)) > r ? -1 : r > s ? 1 : "natural" == n.mode ? -1 : 1;
                                }
                                return n.fits && !o.fits ? -1 : !n.fits && o.fits ? 1 : n.fits && o.fits ? (r = a.__options.side.indexOf(n.side), 
                                (s = a.__options.side.indexOf(o.side)) > r ? -1 : r > s ? 1 : "natural" == n.mode ? -1 : 1) : "document" == n.container && "bottom" == n.side && "natural" == n.mode ? -1 : 1;
                                var s;
                            })), (s = h[0]).coord = {}, s.side) {
                              case "left":
                              case "right":
                                s.coord.top = Math.floor(s.target - s.size.height / 2);
                                break;

                              case "bottom":
                              case "top":
                                s.coord.left = Math.floor(s.target - s.size.width / 2);
                            }
                            switch (s.side) {
                              case "left":
                                s.coord.left = r.geo.origin.windowOffset.left - s.outerSize.width;
                                break;

                              case "right":
                                s.coord.left = r.geo.origin.windowOffset.right + s.distance.horizontal;
                                break;

                              case "top":
                                s.coord.top = r.geo.origin.windowOffset.top - s.outerSize.height;
                                break;

                              case "bottom":
                                s.coord.top = r.geo.origin.windowOffset.bottom + s.distance.vertical;
                            }
                            "window" == s.container ? "top" == s.side || "bottom" == s.side ? s.coord.left < 0 ? r.geo.origin.windowOffset.right - this.__options.minIntersection >= 0 ? s.coord.left = 0 : s.coord.left = r.geo.origin.windowOffset.right - this.__options.minIntersection - 1 : s.coord.left > r.geo.window.size.width - s.size.width && (r.geo.origin.windowOffset.left + this.__options.minIntersection <= r.geo.window.size.width ? s.coord.left = r.geo.window.size.width - s.size.width : s.coord.left = r.geo.origin.windowOffset.left + this.__options.minIntersection + 1 - s.size.width) : s.coord.top < 0 ? r.geo.origin.windowOffset.bottom - this.__options.minIntersection >= 0 ? s.coord.top = 0 : s.coord.top = r.geo.origin.windowOffset.bottom - this.__options.minIntersection - 1 : s.coord.top > r.geo.window.size.height - s.size.height && (r.geo.origin.windowOffset.top + this.__options.minIntersection <= r.geo.window.size.height ? s.coord.top = r.geo.window.size.height - s.size.height : s.coord.top = r.geo.origin.windowOffset.top + this.__options.minIntersection + 1 - s.size.height) : (s.coord.left > r.geo.window.size.width - s.size.width && (s.coord.left = r.geo.window.size.width - s.size.width), 
                            s.coord.left < 0 && (s.coord.left = 0)), a.__sideChange(p, s.side), r.tooltipClone = p[0], 
                            r.tooltipParent = a.__instance.option("parent").parent[0], r.mode = s.mode, r.whole = s.whole, 
                            r.origin = a.__instance._$origin[0], r.tooltip = a.__instance._$tooltip[0], delete s.container, 
                            delete s.fits, delete s.mode, delete s.outerSize, delete s.whole, s.distance = s.distance.horizontal || s.distance.vertical;
                            var v, w, k, S = n.extend(!0, {}, s);
                            if (a.__instance._trigger({
                                edit: function(n) {
                                    s = n;
                                },
                                event: o,
                                helper: r,
                                position: S,
                                type: "position"
                            }), a.__options.functionPosition) {
                                var P = a.__options.functionPosition.call(a, a.__instance, r, S);
                                P && (s = P);
                            }
                            x.destroy(), "top" == s.side || "bottom" == s.side ? (v = {
                                prop: "left",
                                val: s.target - s.coord.left
                            }, w = s.size.width - this.__options.minIntersection) : (v = {
                                prop: "top",
                                val: s.target - s.coord.top
                            }, w = s.size.height - this.__options.minIntersection), v.val < this.__options.minIntersection ? v.val = this.__options.minIntersection : v.val > w && (v.val = w), 
                            k = r.geo.origin.fixedLineage ? r.geo.origin.windowOffset : {
                                left: r.geo.origin.windowOffset.left + r.geo.window.scroll.left,
                                top: r.geo.origin.windowOffset.top + r.geo.window.scroll.top
                            }, s.coord = {
                                left: k.left + (s.coord.left - r.geo.origin.windowOffset.left),
                                top: k.top + (s.coord.top - r.geo.origin.windowOffset.top)
                            }, a.__sideChange(a.__instance._$tooltip, s.side), r.geo.origin.fixedLineage ? a.__instance._$tooltip.css("position", "fixed") : a.__instance._$tooltip.css("position", ""), 
                            a.__instance._$tooltip.css({
                                left: s.coord.left,
                                top: s.coord.top,
                                height: s.size.height,
                                width: s.size.width
                            }).find(".tooltipster-arrow").css({
                                left: "",
                                top: ""
                            }).css(v.prop, v.val), a.__instance._$tooltip.appendTo(a.__instance.option("parent")), 
                            a.__instance._trigger({
                                type: "repositioned",
                                event: o,
                                position: s
                            });
                        },
                        __sideChange: function(n, o) {
                            n.removeClass("tooltipster-bottom").removeClass("tooltipster-left").removeClass("tooltipster-right").removeClass("tooltipster-top").addClass("tooltipster-" + o);
                        },
                        __targetFind: function(n) {
                            var o = {}, r = this.__instance._$origin[0].getClientRects();
                            if (r.length > 1 && 1 == this.__instance._$origin.css("opacity") && (this.__instance._$origin.css("opacity", .99), 
                            r = this.__instance._$origin[0].getClientRects(), this.__instance._$origin.css("opacity", 1)), 
                            r.length < 2) o.top = Math.floor(n.geo.origin.windowOffset.left + n.geo.origin.size.width / 2), 
                            o.bottom = o.top, o.left = Math.floor(n.geo.origin.windowOffset.top + n.geo.origin.size.height / 2), 
                            o.right = o.left; else {
                                var s = r[0];
                                o.top = Math.floor(s.left + (s.right - s.left) / 2), s = r.length > 2 ? r[Math.ceil(r.length / 2) - 1] : r[0], 
                                o.right = Math.floor(s.top + (s.bottom - s.top) / 2), s = r[r.length - 1], o.bottom = Math.floor(s.left + (s.right - s.left) / 2), 
                                s = r.length > 2 ? r[Math.ceil((r.length + 1) / 2) - 1] : r[r.length - 1], o.left = Math.floor(s.top + (s.bottom - s.top) / 2);
                            }
                            return o;
                        }
                    }
                }), n;
            }(n);
        }.apply(o, s), void 0 === a || (n.exports = a);
    },
    150: function(n, o) {
        var r, s, a;
        "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self && self, 
        s = [ n ], r = function(n) {
            "use strict";
            if ("object" != typeof globalThis || "object" != typeof chrome || !chrome || !chrome.runtime || !chrome.runtime.id) throw new Error("This script should only be loaded in a browser extension.");
            if (void 0 === globalThis.browser || Object.getPrototypeOf(globalThis.browser) !== Object.prototype) {
                const o = "The message port closed before a response was received.", wrapAPIs = n => {
                    const r = {
                        alarms: {
                            clear: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            clearAll: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            get: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            getAll: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        },
                        bookmarks: {
                            create: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            get: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getChildren: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getRecent: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getSubTree: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getTree: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            move: {
                                minArgs: 2,
                                maxArgs: 2
                            },
                            remove: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeTree: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            search: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            update: {
                                minArgs: 2,
                                maxArgs: 2
                            }
                        },
                        browserAction: {
                            disable: {
                                minArgs: 0,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            },
                            enable: {
                                minArgs: 0,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            },
                            getBadgeBackgroundColor: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getBadgeText: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getPopup: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getTitle: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            openPopup: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            setBadgeBackgroundColor: {
                                minArgs: 1,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            },
                            setBadgeText: {
                                minArgs: 1,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            },
                            setIcon: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            setPopup: {
                                minArgs: 1,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            },
                            setTitle: {
                                minArgs: 1,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            }
                        },
                        browsingData: {
                            remove: {
                                minArgs: 2,
                                maxArgs: 2
                            },
                            removeCache: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeCookies: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeDownloads: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeFormData: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeHistory: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeLocalStorage: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removePasswords: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removePluginData: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            settings: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        },
                        commands: {
                            getAll: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        },
                        contextMenus: {
                            remove: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeAll: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            update: {
                                minArgs: 2,
                                maxArgs: 2
                            }
                        },
                        cookies: {
                            get: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getAll: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getAllCookieStores: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            remove: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            set: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        devtools: {
                            inspectedWindow: {
                                eval: {
                                    minArgs: 1,
                                    maxArgs: 2,
                                    singleCallbackArg: !1
                                }
                            },
                            panels: {
                                create: {
                                    minArgs: 3,
                                    maxArgs: 3,
                                    singleCallbackArg: !0
                                },
                                elements: {
                                    createSidebarPane: {
                                        minArgs: 1,
                                        maxArgs: 1
                                    }
                                }
                            }
                        },
                        downloads: {
                            cancel: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            download: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            erase: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getFileIcon: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            open: {
                                minArgs: 1,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            },
                            pause: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeFile: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            resume: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            search: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            show: {
                                minArgs: 1,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            }
                        },
                        extension: {
                            isAllowedFileSchemeAccess: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            isAllowedIncognitoAccess: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        },
                        history: {
                            addUrl: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            deleteAll: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            deleteRange: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            deleteUrl: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getVisits: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            search: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        i18n: {
                            detectLanguage: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getAcceptLanguages: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        },
                        identity: {
                            launchWebAuthFlow: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        idle: {
                            queryState: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        management: {
                            get: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getAll: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            getSelf: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            setEnabled: {
                                minArgs: 2,
                                maxArgs: 2
                            },
                            uninstallSelf: {
                                minArgs: 0,
                                maxArgs: 1
                            }
                        },
                        notifications: {
                            clear: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            create: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            getAll: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            getPermissionLevel: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            update: {
                                minArgs: 2,
                                maxArgs: 2
                            }
                        },
                        pageAction: {
                            getPopup: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getTitle: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            hide: {
                                minArgs: 1,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            },
                            setIcon: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            setPopup: {
                                minArgs: 1,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            },
                            setTitle: {
                                minArgs: 1,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            },
                            show: {
                                minArgs: 1,
                                maxArgs: 1,
                                fallbackToNoCallback: !0
                            }
                        },
                        permissions: {
                            contains: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getAll: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            remove: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            request: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        runtime: {
                            getBackgroundPage: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            getPlatformInfo: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            openOptionsPage: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            requestUpdateCheck: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            sendMessage: {
                                minArgs: 1,
                                maxArgs: 3
                            },
                            sendNativeMessage: {
                                minArgs: 2,
                                maxArgs: 2
                            },
                            setUninstallURL: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        sessions: {
                            getDevices: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            getRecentlyClosed: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            restore: {
                                minArgs: 0,
                                maxArgs: 1
                            }
                        },
                        storage: {
                            local: {
                                clear: {
                                    minArgs: 0,
                                    maxArgs: 0
                                },
                                get: {
                                    minArgs: 0,
                                    maxArgs: 1
                                },
                                getBytesInUse: {
                                    minArgs: 0,
                                    maxArgs: 1
                                },
                                remove: {
                                    minArgs: 1,
                                    maxArgs: 1
                                },
                                set: {
                                    minArgs: 1,
                                    maxArgs: 1
                                }
                            },
                            managed: {
                                get: {
                                    minArgs: 0,
                                    maxArgs: 1
                                },
                                getBytesInUse: {
                                    minArgs: 0,
                                    maxArgs: 1
                                }
                            },
                            sync: {
                                clear: {
                                    minArgs: 0,
                                    maxArgs: 0
                                },
                                get: {
                                    minArgs: 0,
                                    maxArgs: 1
                                },
                                getBytesInUse: {
                                    minArgs: 0,
                                    maxArgs: 1
                                },
                                remove: {
                                    minArgs: 1,
                                    maxArgs: 1
                                },
                                set: {
                                    minArgs: 1,
                                    maxArgs: 1
                                }
                            }
                        },
                        tabs: {
                            captureVisibleTab: {
                                minArgs: 0,
                                maxArgs: 2
                            },
                            create: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            detectLanguage: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            discard: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            duplicate: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            executeScript: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            get: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getCurrent: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            getZoom: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            getZoomSettings: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            goBack: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            goForward: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            highlight: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            insertCSS: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            move: {
                                minArgs: 2,
                                maxArgs: 2
                            },
                            query: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            reload: {
                                minArgs: 0,
                                maxArgs: 2
                            },
                            remove: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeCSS: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            sendMessage: {
                                minArgs: 2,
                                maxArgs: 3
                            },
                            setZoom: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            setZoomSettings: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            update: {
                                minArgs: 1,
                                maxArgs: 2
                            }
                        },
                        topSites: {
                            get: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        },
                        webNavigation: {
                            getAllFrames: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getFrame: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        webRequest: {
                            handlerBehaviorChanged: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        },
                        windows: {
                            create: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            get: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            getAll: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            getCurrent: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            getLastFocused: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            remove: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            update: {
                                minArgs: 2,
                                maxArgs: 2
                            }
                        }
                    };
                    if (0 === Object.keys(r).length) throw new Error("api-metadata.json has not been included in browser-polyfill");
                    class DefaultWeakMap extends WeakMap {
                        constructor(n, o) {
                            super(o), this.createItem = n;
                        }
                        get(n) {
                            return this.has(n) || this.set(n, this.createItem(n)), super.get(n);
                        }
                    }
                    const isThenable = n => n && "object" == typeof n && "function" == typeof n.then, makeCallback = (o, r) => (...s) => {
                        n.runtime.lastError ? o.reject(new Error(n.runtime.lastError.message)) : r.singleCallbackArg || s.length <= 1 && !1 !== r.singleCallbackArg ? o.resolve(s[0]) : o.resolve(s);
                    }, pluralizeArguments = n => 1 == n ? "argument" : "arguments", wrapAsyncFunction = (n, o) => function(r, ...s) {
                        if (s.length < o.minArgs) throw new Error(`Expected at least ${o.minArgs} ${pluralizeArguments(o.minArgs)} for ${n}(), got ${s.length}`);
                        if (s.length > o.maxArgs) throw new Error(`Expected at most ${o.maxArgs} ${pluralizeArguments(o.maxArgs)} for ${n}(), got ${s.length}`);
                        return new Promise(((a, l) => {
                            if (o.fallbackToNoCallback) try {
                                r[n](...s, makeCallback({
                                    resolve: a,
                                    reject: l
                                }, o));
                            } catch (l) {
                                r[n](...s), o.fallbackToNoCallback = !1, o.noCallback = !0, a();
                            } else o.noCallback ? (r[n](...s), a()) : r[n](...s, makeCallback({
                                resolve: a,
                                reject: l
                            }, o));
                        }));
                    }, wrapMethod = (n, o, r) => new Proxy(o, {
                        apply: (o, s, a) => r.call(s, n, ...a)
                    });
                    let s = Function.call.bind(Object.prototype.hasOwnProperty);
                    const wrapObject = (n, o = {}, r = {}) => {
                        let a = Object.create(null), l = {
                            has: (o, r) => r in n || r in a,
                            get(l, h, p) {
                                if (h in a) return a[h];
                                if (!(h in n)) return;
                                let x = n[h];
                                if ("function" == typeof x) if ("function" == typeof o[h]) x = wrapMethod(n, n[h], o[h]); else if (s(r, h)) {
                                    let o = wrapAsyncFunction(h, r[h]);
                                    x = wrapMethod(n, n[h], o);
                                } else x = x.bind(n); else if ("object" == typeof x && null !== x && (s(o, h) || s(r, h))) x = wrapObject(x, o[h], r[h]); else {
                                    if (!s(r, "*")) return Object.defineProperty(a, h, {
                                        configurable: !0,
                                        enumerable: !0,
                                        get: () => n[h],
                                        set(o) {
                                            n[h] = o;
                                        }
                                    }), x;
                                    x = wrapObject(x, o[h], r["*"]);
                                }
                                return a[h] = x, x;
                            },
                            set: (o, r, s, l) => (r in a ? a[r] = s : n[r] = s, !0),
                            defineProperty: (n, o, r) => Reflect.defineProperty(a, o, r),
                            deleteProperty: (n, o) => Reflect.deleteProperty(a, o)
                        }, h = Object.create(n);
                        return new Proxy(h, l);
                    }, wrapEvent = n => ({
                        addListener(o, r, ...s) {
                            o.addListener(n.get(r), ...s);
                        },
                        hasListener: (o, r) => o.hasListener(n.get(r)),
                        removeListener(o, r) {
                            o.removeListener(n.get(r));
                        }
                    }), a = new DefaultWeakMap((n => "function" != typeof n ? n : function(o) {
                        const r = wrapObject(o, {}, {
                            getContent: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        });
                        n(r);
                    }));
                    let l = !1;
                    const h = new DefaultWeakMap((n => "function" != typeof n ? n : function(o, r, s) {
                        let a, h, p = !1, x = new Promise((n => {
                            a = function(o) {
                                l || (l = !0), p = !0, n(o);
                            };
                        }));
                        try {
                            h = n(o, r, a);
                        } catch (n) {
                            h = Promise.reject(n);
                        }
                        const _ = !0 !== h && isThenable(h);
                        if (!0 !== h && !_ && !p) return !1;
                        const sendPromisedResult = n => {
                            n.then((n => {
                                s(n);
                            }), (n => {
                                let o;
                                o = n && (n instanceof Error || "string" == typeof n.message) ? n.message : "An unexpected error occurred", 
                                s({
                                    __mozWebExtensionPolyfillReject__: !0,
                                    message: o
                                });
                            })).catch((n => {}));
                        };
                        return sendPromisedResult(_ ? h : x), !0;
                    })), wrappedSendMessageCallback = ({reject: r, resolve: s}, a) => {
                        n.runtime.lastError ? n.runtime.lastError.message === o ? s() : r(new Error(n.runtime.lastError.message)) : a && a.__mozWebExtensionPolyfillReject__ ? r(new Error(a.message)) : s(a);
                    }, wrappedSendMessage = (n, o, r, ...s) => {
                        if (s.length < o.minArgs) throw new Error(`Expected at least ${o.minArgs} ${pluralizeArguments(o.minArgs)} for ${n}(), got ${s.length}`);
                        if (s.length > o.maxArgs) throw new Error(`Expected at most ${o.maxArgs} ${pluralizeArguments(o.maxArgs)} for ${n}(), got ${s.length}`);
                        return new Promise(((n, o) => {
                            const a = wrappedSendMessageCallback.bind(null, {
                                resolve: n,
                                reject: o
                            });
                            s.push(a), r.sendMessage(...s);
                        }));
                    }, p = {
                        devtools: {
                            network: {
                                onRequestFinished: wrapEvent(a)
                            }
                        },
                        runtime: {
                            onMessage: wrapEvent(h),
                            onMessageExternal: wrapEvent(h),
                            sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                                minArgs: 1,
                                maxArgs: 3
                            })
                        },
                        tabs: {
                            sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                                minArgs: 2,
                                maxArgs: 3
                            })
                        }
                    }, x = {
                        clear: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        get: {
                            minArgs: 1,
                            maxArgs: 1
                        },
                        set: {
                            minArgs: 1,
                            maxArgs: 1
                        }
                    };
                    return r.privacy = {
                        network: {
                            "*": x
                        },
                        services: {
                            "*": x
                        },
                        websites: {
                            "*": x
                        }
                    }, wrapObject(n, p, r);
                };
                n.exports = wrapAPIs(chrome);
            } else n.exports = globalThis.browser;
        }, void 0 === (a = "function" == typeof r ? r.apply(o, s) : r) || (n.exports = a);
    },
    512: (n, o, r) => {
        "use strict";
        /*!
 * Chart.js v3.9.1
 * https://www.chartjs.org
 * (c) 2022 Chart.js Contributors
 * Released under the MIT License
 */
        function noop() {}
        r.d(o, {
            qi: () => ArcElement,
            vn: () => BarController,
            ZL: () => BarElement,
            N0: () => BubbleController,
            uw: () => CategoryScale,
            kL: () => Chart,
            WY: () => gt,
            jI: () => DoughnutController,
            Gu: () => mt,
            De: () => bt,
            ST: () => LineController,
            jn: () => LineElement,
            f$: () => LinearScale,
            WV: () => LogarithmicScale,
            tt: () => PieController,
            od: () => PointElement,
            CV: () => PolarAreaController,
            Xi: () => RadarController,
            l7: () => RadialLinearScale,
            ho: () => ScatterController,
            DK: () => yt,
            FB: () => TimeScale,
            RM: () => TimeSeriesScale,
            Dx: () => xt,
            u: () => wt
        });
        const s = function() {
            let n = 0;
            return function() {
                return n++;
            };
        }();
        function isNullOrUndef(n) {
            return null == n;
        }
        function isArray(n) {
            if (Array.isArray && Array.isArray(n)) return !0;
            const o = Object.prototype.toString.call(n);
            return "[object" === o.slice(0, 7) && "Array]" === o.slice(-6);
        }
        function isObject(n) {
            return null !== n && "[object Object]" === Object.prototype.toString.call(n);
        }
        const isNumberFinite = n => ("number" == typeof n || n instanceof Number) && isFinite(+n);
        function finiteOrDefault(n, o) {
            return isNumberFinite(n) ? n : o;
        }
        function valueOrDefault(n, o) {
            return void 0 === n ? o : n;
        }
        const toDimension = (n, o) => "string" == typeof n && n.endsWith("%") ? parseFloat(n) / 100 * o : +n;
        function callback(n, o, r) {
            if (n && "function" == typeof n.call) return n.apply(r, o);
        }
        function each(n, o, r, s) {
            let a, l, h;
            if (isArray(n)) if (l = n.length, s) for (a = l - 1; a >= 0; a--) o.call(r, n[a], a); else for (a = 0; a < l; a++) o.call(r, n[a], a); else if (isObject(n)) for (h = Object.keys(n), 
            l = h.length, a = 0; a < l; a++) o.call(r, n[h[a]], h[a]);
        }
        function _elementsEqual(n, o) {
            let r, s, a, l;
            if (!n || !o || n.length !== o.length) return !1;
            for (r = 0, s = n.length; r < s; ++r) if (a = n[r], l = o[r], a.datasetIndex !== l.datasetIndex || a.index !== l.index) return !1;
            return !0;
        }
        function clone$1(n) {
            if (isArray(n)) return n.map(clone$1);
            if (isObject(n)) {
                const o = Object.create(null), r = Object.keys(n), s = r.length;
                let a = 0;
                for (;a < s; ++a) o[r[a]] = clone$1(n[r[a]]);
                return o;
            }
            return n;
        }
        function isValidKey(n) {
            return -1 === [ "__proto__", "prototype", "constructor" ].indexOf(n);
        }
        function _merger(n, o, r, s) {
            if (!isValidKey(n)) return;
            const a = o[n], l = r[n];
            isObject(a) && isObject(l) ? merge(a, l, s) : o[n] = clone$1(l);
        }
        function merge(n, o, r) {
            const s = isArray(o) ? o : [ o ], a = s.length;
            if (!isObject(n)) return n;
            const l = (r = r || {}).merger || _merger;
            for (let h = 0; h < a; ++h) {
                if (!isObject(o = s[h])) continue;
                const a = Object.keys(o);
                for (let s = 0, h = a.length; s < h; ++s) l(a[s], n, o, r);
            }
            return n;
        }
        function mergeIf(n, o) {
            return merge(n, o, {
                merger: _mergerIf
            });
        }
        function _mergerIf(n, o, r) {
            if (!isValidKey(n)) return;
            const s = o[n], a = r[n];
            isObject(s) && isObject(a) ? mergeIf(s, a) : Object.prototype.hasOwnProperty.call(o, n) || (o[n] = clone$1(a));
        }
        const a = {
            "": n => n,
            x: n => n.x,
            y: n => n.y
        };
        function resolveObjectKey(n, o) {
            const r = a[o] || (a[o] = function(n) {
                const o = function(n) {
                    const o = n.split("."), r = [];
                    let s = "";
                    for (const n of o) s += n, s.endsWith("\\") ? s = s.slice(0, -1) + "." : (r.push(s), 
                    s = "");
                    return r;
                }(n);
                return n => {
                    for (const r of o) {
                        if ("" === r) break;
                        n = n && n[r];
                    }
                    return n;
                };
            }(o));
            return r(n);
        }
        function _capitalize(n) {
            return n.charAt(0).toUpperCase() + n.slice(1);
        }
        const defined = n => void 0 !== n, isFunction = n => "function" == typeof n, setsEqual = (n, o) => {
            if (n.size !== o.size) return !1;
            for (const r of n) if (!o.has(r)) return !1;
            return !0;
        };
        const l = Math.PI, h = 2 * l, p = h + l, x = Number.POSITIVE_INFINITY, _ = l / 180, y = l / 2, v = l / 4, w = 2 * l / 3, k = Math.log10, S = Math.sign;
        function niceNum(n) {
            const o = Math.round(n);
            n = almostEquals(n, o, n / 1e3) ? o : n;
            const r = Math.pow(10, Math.floor(k(n))), s = n / r;
            return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * r;
        }
        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
        function almostEquals(n, o, r) {
            return Math.abs(n - o) < r;
        }
        function _setMinAndMaxByKey(n, o, r) {
            let s, a, l;
            for (s = 0, a = n.length; s < a; s++) l = n[s][r], isNaN(l) || (o.min = Math.min(o.min, l), 
            o.max = Math.max(o.max, l));
        }
        function toRadians(n) {
            return n * (l / 180);
        }
        function toDegrees(n) {
            return n * (180 / l);
        }
        function _decimalPlaces(n) {
            if (!isNumberFinite(n)) return;
            let o = 1, r = 0;
            for (;Math.round(n * o) / o !== n; ) o *= 10, r++;
            return r;
        }
        function getAngleFromPoint(n, o) {
            const r = o.x - n.x, s = o.y - n.y, a = Math.sqrt(r * r + s * s);
            let p = Math.atan2(s, r);
            return p < -.5 * l && (p += h), {
                angle: p,
                distance: a
            };
        }
        function distanceBetweenPoints(n, o) {
            return Math.sqrt(Math.pow(o.x - n.x, 2) + Math.pow(o.y - n.y, 2));
        }
        function _angleDiff(n, o) {
            return (n - o + p) % h - l;
        }
        function _normalizeAngle(n) {
            return (n % h + h) % h;
        }
        function _angleBetween(n, o, r, s) {
            const a = _normalizeAngle(n), l = _normalizeAngle(o), h = _normalizeAngle(r), p = _normalizeAngle(l - a), x = _normalizeAngle(h - a), _ = _normalizeAngle(a - l), y = _normalizeAngle(a - h);
            return a === l || a === h || s && l === h || p > x && _ < y;
        }
        function _limitValue(n, o, r) {
            return Math.max(o, Math.min(r, n));
        }
        function _isBetween(n, o, r, s = 1e-6) {
            return n >= Math.min(o, r) - s && n <= Math.max(o, r) + s;
        }
        function _lookup(n, o, r) {
            r = r || (r => n[r] < o);
            let s, a = n.length - 1, l = 0;
            for (;a - l > 1; ) s = l + a >> 1, r(s) ? l = s : a = s;
            return {
                lo: l,
                hi: a
            };
        }
        const _lookupByKey = (n, o, r, s) => _lookup(n, r, s ? s => n[s][o] <= r : s => n[s][o] < r), _rlookupByKey = (n, o, r) => _lookup(n, r, (s => n[s][o] >= r));
        const P = [ "push", "pop", "shift", "splice", "unshift" ];
        function unlistenArrayEvents(n, o) {
            const r = n._chartjs;
            if (!r) return;
            const s = r.listeners, a = s.indexOf(o);
            -1 !== a && s.splice(a, 1), s.length > 0 || (P.forEach((o => {
                delete n[o];
            })), delete n._chartjs);
        }
        function _arrayUnique(n) {
            const o = new Set;
            let r, s;
            for (r = 0, s = n.length; r < s; ++r) o.add(n[r]);
            return o.size === s ? n : Array.from(o);
        }
        const A = "undefined" == typeof window ? function(n) {
            return n();
        } : window.requestAnimationFrame;
        function throttled(n, o, r) {
            const s = r || (n => Array.prototype.slice.call(n));
            let a = !1, l = [];
            return function(...r) {
                l = s(r), a || (a = !0, A.call(window, (() => {
                    a = !1, n.apply(o, l);
                })));
            };
        }
        const _toLeftRightCenter = n => "start" === n ? "left" : "end" === n ? "right" : "center", _alignStartEnd = (n, o, r) => "start" === n ? o : "end" === n ? r : (o + r) / 2;
        function _getStartAndCountOfVisiblePoints(n, o, r) {
            const s = o.length;
            let a = 0, l = s;
            if (n._sorted) {
                const {iScale: h, _parsed: p} = n, x = h.axis, {min: _, max: y, minDefined: v, maxDefined: w} = h.getUserBounds();
                v && (a = _limitValue(Math.min(_lookupByKey(p, h.axis, _).lo, r ? s : _lookupByKey(o, x, h.getPixelForValue(_)).lo), 0, s - 1)), 
                l = w ? _limitValue(Math.max(_lookupByKey(p, h.axis, y, !0).hi + 1, r ? 0 : _lookupByKey(o, x, h.getPixelForValue(y), !0).hi + 1), a, s) - a : s - a;
            }
            return {
                start: a,
                count: l
            };
        }
        function _scaleRangesChanged(n) {
            const {xScale: o, yScale: r, _scaleRanges: s} = n, a = {
                xmin: o.min,
                xmax: o.max,
                ymin: r.min,
                ymax: r.max
            };
            if (!s) return n._scaleRanges = a, !0;
            const l = s.xmin !== o.min || s.xmax !== o.max || s.ymin !== r.min || s.ymax !== r.max;
            return Object.assign(s, a), l;
        }
        const atEdge = n => 0 === n || 1 === n, elasticIn = (n, o, r) => -Math.pow(2, 10 * (n -= 1)) * Math.sin((n - o) * h / r), elasticOut = (n, o, r) => Math.pow(2, -10 * n) * Math.sin((n - o) * h / r) + 1, T = {
            linear: n => n,
            easeInQuad: n => n * n,
            easeOutQuad: n => -n * (n - 2),
            easeInOutQuad: n => (n /= .5) < 1 ? .5 * n * n : -.5 * (--n * (n - 2) - 1),
            easeInCubic: n => n * n * n,
            easeOutCubic: n => (n -= 1) * n * n + 1,
            easeInOutCubic: n => (n /= .5) < 1 ? .5 * n * n * n : .5 * ((n -= 2) * n * n + 2),
            easeInQuart: n => n * n * n * n,
            easeOutQuart: n => -((n -= 1) * n * n * n - 1),
            easeInOutQuart: n => (n /= .5) < 1 ? .5 * n * n * n * n : -.5 * ((n -= 2) * n * n * n - 2),
            easeInQuint: n => n * n * n * n * n,
            easeOutQuint: n => (n -= 1) * n * n * n * n + 1,
            easeInOutQuint: n => (n /= .5) < 1 ? .5 * n * n * n * n * n : .5 * ((n -= 2) * n * n * n * n + 2),
            easeInSine: n => 1 - Math.cos(n * y),
            easeOutSine: n => Math.sin(n * y),
            easeInOutSine: n => -.5 * (Math.cos(l * n) - 1),
            easeInExpo: n => 0 === n ? 0 : Math.pow(2, 10 * (n - 1)),
            easeOutExpo: n => 1 === n ? 1 : 1 - Math.pow(2, -10 * n),
            easeInOutExpo: n => atEdge(n) ? n : n < .5 ? .5 * Math.pow(2, 10 * (2 * n - 1)) : .5 * (2 - Math.pow(2, -10 * (2 * n - 1))),
            easeInCirc: n => n >= 1 ? n : -(Math.sqrt(1 - n * n) - 1),
            easeOutCirc: n => Math.sqrt(1 - (n -= 1) * n),
            easeInOutCirc: n => (n /= .5) < 1 ? -.5 * (Math.sqrt(1 - n * n) - 1) : .5 * (Math.sqrt(1 - (n -= 2) * n) + 1),
            easeInElastic: n => atEdge(n) ? n : elasticIn(n, .075, .3),
            easeOutElastic: n => atEdge(n) ? n : elasticOut(n, .075, .3),
            easeInOutElastic(n) {
                const o = .1125;
                return atEdge(n) ? n : n < .5 ? .5 * elasticIn(2 * n, o, .45) : .5 + .5 * elasticOut(2 * n - 1, o, .45);
            },
            easeInBack(n) {
                const o = 1.70158;
                return n * n * ((o + 1) * n - o);
            },
            easeOutBack(n) {
                const o = 1.70158;
                return (n -= 1) * n * ((o + 1) * n + o) + 1;
            },
            easeInOutBack(n) {
                let o = 1.70158;
                return (n /= .5) < 1 ? n * n * ((1 + (o *= 1.525)) * n - o) * .5 : .5 * ((n -= 2) * n * ((1 + (o *= 1.525)) * n + o) + 2);
            },
            easeInBounce: n => 1 - T.easeOutBounce(1 - n),
            easeOutBounce(n) {
                const o = 7.5625, r = 2.75;
                return n < 1 / r ? o * n * n : n < 2 / r ? o * (n -= 1.5 / r) * n + .75 : n < 2.5 / r ? o * (n -= 2.25 / r) * n + .9375 : o * (n -= 2.625 / r) * n + .984375;
            },
            easeInOutBounce: n => n < .5 ? .5 * T.easeInBounce(2 * n) : .5 * T.easeOutBounce(2 * n - 1) + .5
        };
        /*!
 * @kurkle/color v0.2.1
 * https://github.com/kurkle/color#readme
 * (c) 2022 Jukka Kurkela
 * Released under the MIT License
 */
        function round(n) {
            return n + .5 | 0;
        }
        const lim = (n, o, r) => Math.max(Math.min(n, r), o);
        function p2b(n) {
            return lim(round(2.55 * n), 0, 255);
        }
        function n2b(n) {
            return lim(round(255 * n), 0, 255);
        }
        function b2n(n) {
            return lim(round(n / 2.55) / 100, 0, 1);
        }
        function n2p(n) {
            return lim(round(100 * n), 0, 100);
        }
        const R = {
            0: 0,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            A: 10,
            B: 11,
            C: 12,
            D: 13,
            E: 14,
            F: 15,
            a: 10,
            b: 11,
            c: 12,
            d: 13,
            e: 14,
            f: 15
        }, O = [ ..."0123456789ABCDEF" ], h1 = n => O[15 & n], h2 = n => O[(240 & n) >> 4] + O[15 & n], eq = n => (240 & n) >> 4 == (15 & n);
        function hexString(n) {
            var o = (n => eq(n.r) && eq(n.g) && eq(n.b) && eq(n.a))(n) ? h1 : h2;
            return n ? "#" + o(n.r) + o(n.g) + o(n.b) + ((n, o) => n < 255 ? o(n) : "")(n.a, o) : void 0;
        }
        const C = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
        function hsl2rgbn(n, o, r) {
            const s = o * Math.min(r, 1 - r), f = (o, a = (o + n / 30) % 12) => r - s * Math.max(Math.min(a - 3, 9 - a, 1), -1);
            return [ f(0), f(8), f(4) ];
        }
        function hsv2rgbn(n, o, r) {
            const f = (s, a = (s + n / 60) % 6) => r - r * o * Math.max(Math.min(a, 4 - a, 1), 0);
            return [ f(5), f(3), f(1) ];
        }
        function hwb2rgbn(n, o, r) {
            const s = hsl2rgbn(n, 1, .5);
            let a;
            for (o + r > 1 && (a = 1 / (o + r), o *= a, r *= a), a = 0; a < 3; a++) s[a] *= 1 - o - r, 
            s[a] += o;
            return s;
        }
        function rgb2hsl(n) {
            const o = n.r / 255, r = n.g / 255, s = n.b / 255, a = Math.max(o, r, s), l = Math.min(o, r, s), h = (a + l) / 2;
            let p, x, _;
            return a !== l && (_ = a - l, x = h > .5 ? _ / (2 - a - l) : _ / (a + l), p = function(n, o, r, s, a) {
                return n === a ? (o - r) / s + (o < r ? 6 : 0) : o === a ? (r - n) / s + 2 : (n - o) / s + 4;
            }(o, r, s, _, a), p = 60 * p + .5), [ 0 | p, x || 0, h ];
        }
        function calln(n, o, r, s) {
            return (Array.isArray(o) ? n(o[0], o[1], o[2]) : n(o, r, s)).map(n2b);
        }
        function hsl2rgb(n, o, r) {
            return calln(hsl2rgbn, n, o, r);
        }
        function hue(n) {
            return (n % 360 + 360) % 360;
        }
        function hueParse(n) {
            const o = C.exec(n);
            let r, s = 255;
            if (!o) return;
            o[5] !== r && (s = o[6] ? p2b(+o[5]) : n2b(+o[5]));
            const a = hue(+o[2]), l = +o[3] / 100, h = +o[4] / 100;
            return r = "hwb" === o[1] ? function(n, o, r) {
                return calln(hwb2rgbn, n, o, r);
            }(a, l, h) : "hsv" === o[1] ? function(n, o, r) {
                return calln(hsv2rgbn, n, o, r);
            }(a, l, h) : hsl2rgb(a, l, h), {
                r: r[0],
                g: r[1],
                b: r[2],
                a: s
            };
        }
        const z = {
            x: "dark",
            Z: "light",
            Y: "re",
            X: "blu",
            W: "gr",
            V: "medium",
            U: "slate",
            A: "ee",
            T: "ol",
            S: "or",
            B: "ra",
            C: "lateg",
            D: "ights",
            R: "in",
            Q: "turquois",
            E: "hi",
            P: "ro",
            O: "al",
            N: "le",
            M: "de",
            L: "yello",
            F: "en",
            K: "ch",
            G: "arks",
            H: "ea",
            I: "ightg",
            J: "wh"
        }, M = {
            OiceXe: "f0f8ff",
            antiquewEte: "faebd7",
            aqua: "ffff",
            aquamarRe: "7fffd4",
            azuY: "f0ffff",
            beige: "f5f5dc",
            bisque: "ffe4c4",
            black: "0",
            blanKedOmond: "ffebcd",
            Xe: "ff",
            XeviTet: "8a2be2",
            bPwn: "a52a2a",
            burlywood: "deb887",
            caMtXe: "5f9ea0",
            KartYuse: "7fff00",
            KocTate: "d2691e",
            cSO: "ff7f50",
            cSnflowerXe: "6495ed",
            cSnsilk: "fff8dc",
            crimson: "dc143c",
            cyan: "ffff",
            xXe: "8b",
            xcyan: "8b8b",
            xgTMnPd: "b8860b",
            xWay: "a9a9a9",
            xgYF: "6400",
            xgYy: "a9a9a9",
            xkhaki: "bdb76b",
            xmagFta: "8b008b",
            xTivegYF: "556b2f",
            xSange: "ff8c00",
            xScEd: "9932cc",
            xYd: "8b0000",
            xsOmon: "e9967a",
            xsHgYF: "8fbc8f",
            xUXe: "483d8b",
            xUWay: "2f4f4f",
            xUgYy: "2f4f4f",
            xQe: "ced1",
            xviTet: "9400d3",
            dAppRk: "ff1493",
            dApskyXe: "bfff",
            dimWay: "696969",
            dimgYy: "696969",
            dodgerXe: "1e90ff",
            fiYbrick: "b22222",
            flSOwEte: "fffaf0",
            foYstWAn: "228b22",
            fuKsia: "ff00ff",
            gaRsbSo: "dcdcdc",
            ghostwEte: "f8f8ff",
            gTd: "ffd700",
            gTMnPd: "daa520",
            Way: "808080",
            gYF: "8000",
            gYFLw: "adff2f",
            gYy: "808080",
            honeyMw: "f0fff0",
            hotpRk: "ff69b4",
            RdianYd: "cd5c5c",
            Rdigo: "4b0082",
            ivSy: "fffff0",
            khaki: "f0e68c",
            lavFMr: "e6e6fa",
            lavFMrXsh: "fff0f5",
            lawngYF: "7cfc00",
            NmoncEffon: "fffacd",
            ZXe: "add8e6",
            ZcSO: "f08080",
            Zcyan: "e0ffff",
            ZgTMnPdLw: "fafad2",
            ZWay: "d3d3d3",
            ZgYF: "90ee90",
            ZgYy: "d3d3d3",
            ZpRk: "ffb6c1",
            ZsOmon: "ffa07a",
            ZsHgYF: "20b2aa",
            ZskyXe: "87cefa",
            ZUWay: "778899",
            ZUgYy: "778899",
            ZstAlXe: "b0c4de",
            ZLw: "ffffe0",
            lime: "ff00",
            limegYF: "32cd32",
            lRF: "faf0e6",
            magFta: "ff00ff",
            maPon: "800000",
            VaquamarRe: "66cdaa",
            VXe: "cd",
            VScEd: "ba55d3",
            VpurpN: "9370db",
            VsHgYF: "3cb371",
            VUXe: "7b68ee",
            VsprRggYF: "fa9a",
            VQe: "48d1cc",
            VviTetYd: "c71585",
            midnightXe: "191970",
            mRtcYam: "f5fffa",
            mistyPse: "ffe4e1",
            moccasR: "ffe4b5",
            navajowEte: "ffdead",
            navy: "80",
            Tdlace: "fdf5e6",
            Tive: "808000",
            TivedBb: "6b8e23",
            Sange: "ffa500",
            SangeYd: "ff4500",
            ScEd: "da70d6",
            pOegTMnPd: "eee8aa",
            pOegYF: "98fb98",
            pOeQe: "afeeee",
            pOeviTetYd: "db7093",
            papayawEp: "ffefd5",
            pHKpuff: "ffdab9",
            peru: "cd853f",
            pRk: "ffc0cb",
            plum: "dda0dd",
            powMrXe: "b0e0e6",
            purpN: "800080",
            YbeccapurpN: "663399",
            Yd: "ff0000",
            Psybrown: "bc8f8f",
            PyOXe: "4169e1",
            saddNbPwn: "8b4513",
            sOmon: "fa8072",
            sandybPwn: "f4a460",
            sHgYF: "2e8b57",
            sHshell: "fff5ee",
            siFna: "a0522d",
            silver: "c0c0c0",
            skyXe: "87ceeb",
            UXe: "6a5acd",
            UWay: "708090",
            UgYy: "708090",
            snow: "fffafa",
            sprRggYF: "ff7f",
            stAlXe: "4682b4",
            tan: "d2b48c",
            teO: "8080",
            tEstN: "d8bfd8",
            tomato: "ff6347",
            Qe: "40e0d0",
            viTet: "ee82ee",
            JHt: "f5deb3",
            wEte: "ffffff",
            wEtesmoke: "f5f5f5",
            Lw: "ffff00",
            LwgYF: "9acd32"
        };
        let I;
        function nameParse(n) {
            I || (I = function() {
                const n = {}, o = Object.keys(M), r = Object.keys(z);
                let s, a, l, h, p;
                for (s = 0; s < o.length; s++) {
                    for (h = p = o[s], a = 0; a < r.length; a++) l = r[a], p = p.replace(l, z[l]);
                    l = parseInt(M[h], 16), n[p] = [ l >> 16 & 255, l >> 8 & 255, 255 & l ];
                }
                return n;
            }(), I.transparent = [ 0, 0, 0, 0 ]);
            const o = I[n.toLowerCase()];
            return o && {
                r: o[0],
                g: o[1],
                b: o[2],
                a: 4 === o.length ? o[3] : 255
            };
        }
        const E = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
        const to = n => n <= .0031308 ? 12.92 * n : 1.055 * Math.pow(n, 1 / 2.4) - .055, from = n => n <= .04045 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4);
        function modHSL(n, o, r) {
            if (n) {
                let s = rgb2hsl(n);
                s[o] = Math.max(0, Math.min(s[o] + s[o] * r, 0 === o ? 360 : 1)), s = hsl2rgb(s), 
                n.r = s[0], n.g = s[1], n.b = s[2];
            }
        }
        function clone(n, o) {
            return n ? Object.assign(o || {}, n) : n;
        }
        function fromObject(n) {
            var o = {
                r: 0,
                g: 0,
                b: 0,
                a: 255
            };
            return Array.isArray(n) ? n.length >= 3 && (o = {
                r: n[0],
                g: n[1],
                b: n[2],
                a: 255
            }, n.length > 3 && (o.a = n2b(n[3]))) : (o = clone(n, {
                r: 0,
                g: 0,
                b: 0,
                a: 1
            })).a = n2b(o.a), o;
        }
        function functionParse(n) {
            return "r" === n.charAt(0) ? function(n) {
                const o = E.exec(n);
                let r, s, a, l = 255;
                if (o) {
                    if (o[7] !== r) {
                        const n = +o[7];
                        l = o[8] ? p2b(n) : lim(255 * n, 0, 255);
                    }
                    return r = +o[1], s = +o[3], a = +o[5], r = 255 & (o[2] ? p2b(r) : lim(r, 0, 255)), 
                    s = 255 & (o[4] ? p2b(s) : lim(s, 0, 255)), a = 255 & (o[6] ? p2b(a) : lim(a, 0, 255)), 
                    {
                        r,
                        g: s,
                        b: a,
                        a: l
                    };
                }
            }(n) : hueParse(n);
        }
        class Color {
            constructor(n) {
                if (n instanceof Color) return n;
                const o = typeof n;
                let r;
                var s, a, l;
                "object" === o ? r = fromObject(n) : "string" === o && (l = (s = n).length, "#" === s[0] && (4 === l || 5 === l ? a = {
                    r: 255 & 17 * R[s[1]],
                    g: 255 & 17 * R[s[2]],
                    b: 255 & 17 * R[s[3]],
                    a: 5 === l ? 17 * R[s[4]] : 255
                } : 7 !== l && 9 !== l || (a = {
                    r: R[s[1]] << 4 | R[s[2]],
                    g: R[s[3]] << 4 | R[s[4]],
                    b: R[s[5]] << 4 | R[s[6]],
                    a: 9 === l ? R[s[7]] << 4 | R[s[8]] : 255
                })), r = a || nameParse(n) || functionParse(n)), this._rgb = r, this._valid = !!r;
            }
            get valid() {
                return this._valid;
            }
            get rgb() {
                var n = clone(this._rgb);
                return n && (n.a = b2n(n.a)), n;
            }
            set rgb(n) {
                this._rgb = fromObject(n);
            }
            rgbString() {
                return this._valid ? (n = this._rgb) && (n.a < 255 ? `rgba(${n.r}, ${n.g}, ${n.b}, ${b2n(n.a)})` : `rgb(${n.r}, ${n.g}, ${n.b})`) : void 0;
                var n;
            }
            hexString() {
                return this._valid ? hexString(this._rgb) : void 0;
            }
            hslString() {
                return this._valid ? function(n) {
                    if (!n) return;
                    const o = rgb2hsl(n), r = o[0], s = n2p(o[1]), a = n2p(o[2]);
                    return n.a < 255 ? `hsla(${r}, ${s}%, ${a}%, ${b2n(n.a)})` : `hsl(${r}, ${s}%, ${a}%)`;
                }(this._rgb) : void 0;
            }
            mix(n, o) {
                if (n) {
                    const r = this.rgb, s = n.rgb;
                    let a;
                    const l = o === a ? .5 : o, h = 2 * l - 1, p = r.a - s.a, x = ((h * p == -1 ? h : (h + p) / (1 + h * p)) + 1) / 2;
                    a = 1 - x, r.r = 255 & x * r.r + a * s.r + .5, r.g = 255 & x * r.g + a * s.g + .5, 
                    r.b = 255 & x * r.b + a * s.b + .5, r.a = l * r.a + (1 - l) * s.a, this.rgb = r;
                }
                return this;
            }
            interpolate(n, o) {
                return n && (this._rgb = function(n, o, r) {
                    const s = from(b2n(n.r)), a = from(b2n(n.g)), l = from(b2n(n.b));
                    return {
                        r: n2b(to(s + r * (from(b2n(o.r)) - s))),
                        g: n2b(to(a + r * (from(b2n(o.g)) - a))),
                        b: n2b(to(l + r * (from(b2n(o.b)) - l))),
                        a: n.a + r * (o.a - n.a)
                    };
                }(this._rgb, n._rgb, o)), this;
            }
            clone() {
                return new Color(this.rgb);
            }
            alpha(n) {
                return this._rgb.a = n2b(n), this;
            }
            clearer(n) {
                return this._rgb.a *= 1 - n, this;
            }
            greyscale() {
                const n = this._rgb, o = round(.3 * n.r + .59 * n.g + .11 * n.b);
                return n.r = n.g = n.b = o, this;
            }
            opaquer(n) {
                return this._rgb.a *= 1 + n, this;
            }
            negate() {
                const n = this._rgb;
                return n.r = 255 - n.r, n.g = 255 - n.g, n.b = 255 - n.b, this;
            }
            lighten(n) {
                return modHSL(this._rgb, 2, n), this;
            }
            darken(n) {
                return modHSL(this._rgb, 2, -n), this;
            }
            saturate(n) {
                return modHSL(this._rgb, 1, n), this;
            }
            desaturate(n) {
                return modHSL(this._rgb, 1, -n), this;
            }
            rotate(n) {
                return function(n, o) {
                    var r = rgb2hsl(n);
                    r[0] = hue(r[0] + o), r = hsl2rgb(r), n.r = r[0], n.g = r[1], n.b = r[2];
                }(this._rgb, n), this;
            }
        }
        function index_esm(n) {
            return new Color(n);
        }
        function isPatternOrGradient(n) {
            if (n && "object" == typeof n) {
                const o = n.toString();
                return "[object CanvasPattern]" === o || "[object CanvasGradient]" === o;
            }
            return !1;
        }
        function color(n) {
            return isPatternOrGradient(n) ? n : index_esm(n);
        }
        function getHoverColor(n) {
            return isPatternOrGradient(n) ? n : index_esm(n).saturate(.5).darken(.1).hexString();
        }
        const $ = Object.create(null), N = Object.create(null);
        function getScope$1(n, o) {
            if (!o) return n;
            const r = o.split(".");
            for (let o = 0, s = r.length; o < s; ++o) {
                const s = r[o];
                n = n[s] || (n[s] = Object.create(null));
            }
            return n;
        }
        function set(n, o, r) {
            return "string" == typeof o ? merge(getScope$1(n, o), r) : merge(getScope$1(n, ""), o);
        }
        var F = new class {
            constructor(n) {
                this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", 
                this.color = "#666", this.datasets = {}, this.devicePixelRatio = n => n.chart.platform.getDevicePixelRatio(), 
                this.elements = {}, this.events = [ "mousemove", "mouseout", "click", "touchstart", "touchmove" ], 
                this.font = {
                    family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    size: 12,
                    style: "normal",
                    lineHeight: 1.2,
                    weight: null
                }, this.hover = {}, this.hoverBackgroundColor = (n, o) => getHoverColor(o.backgroundColor), 
                this.hoverBorderColor = (n, o) => getHoverColor(o.borderColor), this.hoverColor = (n, o) => getHoverColor(o.color), 
                this.indexAxis = "x", this.interaction = {
                    mode: "nearest",
                    intersect: !0,
                    includeInvisible: !1
                }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, 
                this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, 
                this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(n);
            }
            set(n, o) {
                return set(this, n, o);
            }
            get(n) {
                return getScope$1(this, n);
            }
            describe(n, o) {
                return set(N, n, o);
            }
            override(n, o) {
                return set($, n, o);
            }
            route(n, o, r, s) {
                const a = getScope$1(this, n), l = getScope$1(this, r), h = "_" + o;
                Object.defineProperties(a, {
                    [h]: {
                        value: a[o],
                        writable: !0
                    },
                    [o]: {
                        enumerable: !0,
                        get() {
                            const n = this[h], o = l[s];
                            return isObject(n) ? Object.assign({}, o, n) : valueOrDefault(n, o);
                        },
                        set(n) {
                            this[h] = n;
                        }
                    }
                });
            }
        }({
            _scriptable: n => !n.startsWith("on"),
            _indexable: n => "events" !== n,
            hover: {
                _fallback: "interaction"
            },
            interaction: {
                _scriptable: !1,
                _indexable: !1
            }
        });
        function _measureText(n, o, r, s, a) {
            let l = o[a];
            return l || (l = o[a] = n.measureText(a).width, r.push(a)), l > s && (s = l), s;
        }
        function _longestText(n, o, r, s) {
            let a = (s = s || {}).data = s.data || {}, l = s.garbageCollect = s.garbageCollect || [];
            s.font !== o && (a = s.data = {}, l = s.garbageCollect = [], s.font = o), n.save(), 
            n.font = o;
            let h = 0;
            const p = r.length;
            let x, _, y, v, w;
            for (x = 0; x < p; x++) if (v = r[x], null != v && !0 !== isArray(v)) h = _measureText(n, a, l, h, v); else if (isArray(v)) for (_ = 0, 
            y = v.length; _ < y; _++) w = v[_], null == w || isArray(w) || (h = _measureText(n, a, l, h, w));
            n.restore();
            const k = l.length / 2;
            if (k > r.length) {
                for (x = 0; x < k; x++) delete a[l[x]];
                l.splice(0, k);
            }
            return h;
        }
        function _alignPixel(n, o, r) {
            const s = n.currentDevicePixelRatio, a = 0 !== r ? Math.max(r / 2, .5) : 0;
            return Math.round((o - a) * s) / s + a;
        }
        function clearCanvas(n, o) {
            (o = o || n.getContext("2d")).save(), o.resetTransform(), o.clearRect(0, 0, n.width, n.height), 
            o.restore();
        }
        function drawPoint(n, o, r, s) {
            drawPointLegend(n, o, r, s, null);
        }
        function drawPointLegend(n, o, r, s, a) {
            let p, x, k, S, P, A;
            const T = o.pointStyle, R = o.rotation, O = o.radius;
            let C = (R || 0) * _;
            if (T && "object" == typeof T && (p = T.toString(), "[object HTMLImageElement]" === p || "[object HTMLCanvasElement]" === p)) return n.save(), 
            n.translate(r, s), n.rotate(C), n.drawImage(T, -T.width / 2, -T.height / 2, T.width, T.height), 
            void n.restore();
            if (!(isNaN(O) || O <= 0)) {
                switch (n.beginPath(), T) {
                  default:
                    a ? n.ellipse(r, s, a / 2, O, 0, 0, h) : n.arc(r, s, O, 0, h), n.closePath();
                    break;

                  case "triangle":
                    n.moveTo(r + Math.sin(C) * O, s - Math.cos(C) * O), C += w, n.lineTo(r + Math.sin(C) * O, s - Math.cos(C) * O), 
                    C += w, n.lineTo(r + Math.sin(C) * O, s - Math.cos(C) * O), n.closePath();
                    break;

                  case "rectRounded":
                    P = .516 * O, S = O - P, x = Math.cos(C + v) * S, k = Math.sin(C + v) * S, n.arc(r - x, s - k, P, C - l, C - y), 
                    n.arc(r + k, s - x, P, C - y, C), n.arc(r + x, s + k, P, C, C + y), n.arc(r - k, s + x, P, C + y, C + l), 
                    n.closePath();
                    break;

                  case "rect":
                    if (!R) {
                        S = Math.SQRT1_2 * O, A = a ? a / 2 : S, n.rect(r - A, s - S, 2 * A, 2 * S);
                        break;
                    }
                    C += v;

                  case "rectRot":
                    x = Math.cos(C) * O, k = Math.sin(C) * O, n.moveTo(r - x, s - k), n.lineTo(r + k, s - x), 
                    n.lineTo(r + x, s + k), n.lineTo(r - k, s + x), n.closePath();
                    break;

                  case "crossRot":
                    C += v;

                  case "cross":
                    x = Math.cos(C) * O, k = Math.sin(C) * O, n.moveTo(r - x, s - k), n.lineTo(r + x, s + k), 
                    n.moveTo(r + k, s - x), n.lineTo(r - k, s + x);
                    break;

                  case "star":
                    x = Math.cos(C) * O, k = Math.sin(C) * O, n.moveTo(r - x, s - k), n.lineTo(r + x, s + k), 
                    n.moveTo(r + k, s - x), n.lineTo(r - k, s + x), C += v, x = Math.cos(C) * O, k = Math.sin(C) * O, 
                    n.moveTo(r - x, s - k), n.lineTo(r + x, s + k), n.moveTo(r + k, s - x), n.lineTo(r - k, s + x);
                    break;

                  case "line":
                    x = a ? a / 2 : Math.cos(C) * O, k = Math.sin(C) * O, n.moveTo(r - x, s - k), n.lineTo(r + x, s + k);
                    break;

                  case "dash":
                    n.moveTo(r, s), n.lineTo(r + Math.cos(C) * O, s + Math.sin(C) * O);
                }
                n.fill(), o.borderWidth > 0 && n.stroke();
            }
        }
        function _isPointInArea(n, o, r) {
            return r = r || .5, !o || n && n.x > o.left - r && n.x < o.right + r && n.y > o.top - r && n.y < o.bottom + r;
        }
        function clipArea(n, o) {
            n.save(), n.beginPath(), n.rect(o.left, o.top, o.right - o.left, o.bottom - o.top), 
            n.clip();
        }
        function unclipArea(n) {
            n.restore();
        }
        function _steppedLineTo(n, o, r, s, a) {
            if (!o) return n.lineTo(r.x, r.y);
            if ("middle" === a) {
                const s = (o.x + r.x) / 2;
                n.lineTo(s, o.y), n.lineTo(s, r.y);
            } else "after" === a != !!s ? n.lineTo(o.x, r.y) : n.lineTo(r.x, o.y);
            n.lineTo(r.x, r.y);
        }
        function _bezierCurveTo(n, o, r, s) {
            if (!o) return n.lineTo(r.x, r.y);
            n.bezierCurveTo(s ? o.cp1x : o.cp2x, s ? o.cp1y : o.cp2y, s ? r.cp2x : r.cp1x, s ? r.cp2y : r.cp1y, r.x, r.y);
        }
        function renderText(n, o, r, s, a, l = {}) {
            const h = isArray(o) ? o : [ o ], p = l.strokeWidth > 0 && "" !== l.strokeColor;
            let x, _;
            for (n.save(), n.font = a.string, function(n, o) {
                o.translation && n.translate(o.translation[0], o.translation[1]);
                isNullOrUndef(o.rotation) || n.rotate(o.rotation);
                o.color && (n.fillStyle = o.color);
                o.textAlign && (n.textAlign = o.textAlign);
                o.textBaseline && (n.textBaseline = o.textBaseline);
            }(n, l), x = 0; x < h.length; ++x) _ = h[x], p && (l.strokeColor && (n.strokeStyle = l.strokeColor), 
            isNullOrUndef(l.strokeWidth) || (n.lineWidth = l.strokeWidth), n.strokeText(_, r, s, l.maxWidth)), 
            n.fillText(_, r, s, l.maxWidth), decorateText(n, r, s, _, l), s += a.lineHeight;
            n.restore();
        }
        function decorateText(n, o, r, s, a) {
            if (a.strikethrough || a.underline) {
                const l = n.measureText(s), h = o - l.actualBoundingBoxLeft, p = o + l.actualBoundingBoxRight, x = r - l.actualBoundingBoxAscent, _ = r + l.actualBoundingBoxDescent, y = a.strikethrough ? (x + _) / 2 : _;
                n.strokeStyle = n.fillStyle, n.beginPath(), n.lineWidth = a.decorationWidth || 2, 
                n.moveTo(h, y), n.lineTo(p, y), n.stroke();
            }
        }
        function addRoundedRectPath(n, o) {
            const {x: r, y: s, w: a, h, radius: p} = o;
            n.arc(r + p.topLeft, s + p.topLeft, p.topLeft, -y, l, !0), n.lineTo(r, s + h - p.bottomLeft), 
            n.arc(r + p.bottomLeft, s + h - p.bottomLeft, p.bottomLeft, l, y, !0), n.lineTo(r + a - p.bottomRight, s + h), 
            n.arc(r + a - p.bottomRight, s + h - p.bottomRight, p.bottomRight, y, 0, !0), n.lineTo(r + a, s + p.topRight), 
            n.arc(r + a - p.topRight, s + p.topRight, p.topRight, 0, -y, !0), n.lineTo(r + p.topLeft, s);
        }
        const U = new RegExp(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/), W = new RegExp(/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/);
        function toLineHeight(n, o) {
            const r = ("" + n).match(U);
            if (!r || "normal" === r[1]) return 1.2 * o;
            switch (n = +r[2], r[3]) {
              case "px":
                return n;

              case "%":
                n /= 100;
            }
            return o * n;
        }
        function _readValueToProps(n, o) {
            const r = {}, s = isObject(o), a = s ? Object.keys(o) : o, l = isObject(n) ? s ? r => valueOrDefault(n[r], n[o[r]]) : o => n[o] : () => n;
            for (const n of a) r[n] = +l(n) || 0;
            return r;
        }
        function toTRBL(n) {
            return _readValueToProps(n, {
                top: "y",
                right: "x",
                bottom: "y",
                left: "x"
            });
        }
        function toTRBLCorners(n) {
            return _readValueToProps(n, [ "topLeft", "topRight", "bottomLeft", "bottomRight" ]);
        }
        function toPadding(n) {
            const o = toTRBL(n);
            return o.width = o.left + o.right, o.height = o.top + o.bottom, o;
        }
        function toFont(n, o) {
            n = n || {}, o = o || F.font;
            let r = valueOrDefault(n.size, o.size);
            "string" == typeof r && (r = parseInt(r, 10));
            let s = valueOrDefault(n.style, o.style);
            s && !("" + s).match(W) && (s = "");
            const a = {
                family: valueOrDefault(n.family, o.family),
                lineHeight: toLineHeight(valueOrDefault(n.lineHeight, o.lineHeight), r),
                size: r,
                style: s,
                weight: valueOrDefault(n.weight, o.weight),
                string: ""
            };
            return a.string = function(n) {
                return !n || isNullOrUndef(n.size) || isNullOrUndef(n.family) ? null : (n.style ? n.style + " " : "") + (n.weight ? n.weight + " " : "") + n.size + "px " + n.family;
            }(a), a;
        }
        function resolve(n, o, r, s) {
            let a, l, h, p = !0;
            for (a = 0, l = n.length; a < l; ++a) if (h = n[a], void 0 !== h && (void 0 !== o && "function" == typeof h && (h = h(o), 
            p = !1), void 0 !== r && isArray(h) && (h = h[r % h.length], p = !1), void 0 !== h)) return s && !p && (s.cacheable = !1), 
            h;
        }
        function createContext(n, o) {
            return Object.assign(Object.create(n), o);
        }
        function _createResolver(n, o = [ "" ], r = n, s, a = (() => n[0])) {
            defined(s) || (s = _resolve("_fallback", n));
            const l = {
                [Symbol.toStringTag]: "Object",
                _cacheable: !0,
                _scopes: n,
                _rootScopes: r,
                _fallback: s,
                _getTarget: a,
                override: a => _createResolver([ a, ...n ], o, r, s)
            };
            return new Proxy(l, {
                deleteProperty: (o, r) => (delete o[r], delete o._keys, delete n[0][r], !0),
                get: (r, s) => _cached(r, s, (() => function(n, o, r, s) {
                    let a;
                    for (const l of o) if (a = _resolve(readKey(l, n), r), defined(a)) return needsSubResolver(n, a) ? createSubResolver(r, s, n, a) : a;
                }(s, o, n, r))),
                getOwnPropertyDescriptor: (n, o) => Reflect.getOwnPropertyDescriptor(n._scopes[0], o),
                getPrototypeOf: () => Reflect.getPrototypeOf(n[0]),
                has: (n, o) => getKeysFromAllScopes(n).includes(o),
                ownKeys: n => getKeysFromAllScopes(n),
                set(n, o, r) {
                    const s = n._storage || (n._storage = a());
                    return n[o] = s[o] = r, delete n._keys, !0;
                }
            });
        }
        function _attachContext(n, o, r, s) {
            const a = {
                _cacheable: !1,
                _proxy: n,
                _context: o,
                _subProxy: r,
                _stack: new Set,
                _descriptors: _descriptors(n, s),
                setContext: o => _attachContext(n, o, r, s),
                override: a => _attachContext(n.override(a), o, r, s)
            };
            return new Proxy(a, {
                deleteProperty: (o, r) => (delete o[r], delete n[r], !0),
                get: (n, o, r) => _cached(n, o, (() => function(n, o, r) {
                    const {_proxy: s, _context: a, _subProxy: l, _descriptors: h} = n;
                    let p = s[o];
                    isFunction(p) && h.isScriptable(o) && (p = function(n, o, r, s) {
                        const {_proxy: a, _context: l, _subProxy: h, _stack: p} = r;
                        if (p.has(n)) throw new Error("Recursion detected: " + Array.from(p).join("->") + "->" + n);
                        p.add(n), o = o(l, h || s), p.delete(n), needsSubResolver(n, o) && (o = createSubResolver(a._scopes, a, n, o));
                        return o;
                    }(o, p, n, r));
                    isArray(p) && p.length && (p = function(n, o, r, s) {
                        const {_proxy: a, _context: l, _subProxy: h, _descriptors: p} = r;
                        if (defined(l.index) && s(n)) o = o[l.index % o.length]; else if (isObject(o[0])) {
                            const r = o, s = a._scopes.filter((n => n !== r));
                            o = [];
                            for (const x of r) {
                                const r = createSubResolver(s, a, n, x);
                                o.push(_attachContext(r, l, h && h[n], p));
                            }
                        }
                        return o;
                    }(o, p, n, h.isIndexable));
                    needsSubResolver(o, p) && (p = _attachContext(p, a, l && l[o], h));
                    return p;
                }(n, o, r))),
                getOwnPropertyDescriptor: (o, r) => o._descriptors.allKeys ? Reflect.has(n, r) ? {
                    enumerable: !0,
                    configurable: !0
                } : void 0 : Reflect.getOwnPropertyDescriptor(n, r),
                getPrototypeOf: () => Reflect.getPrototypeOf(n),
                has: (o, r) => Reflect.has(n, r),
                ownKeys: () => Reflect.ownKeys(n),
                set: (o, r, s) => (n[r] = s, delete o[r], !0)
            });
        }
        function _descriptors(n, o = {
            scriptable: !0,
            indexable: !0
        }) {
            const {_scriptable: r = o.scriptable, _indexable: s = o.indexable, _allKeys: a = o.allKeys} = n;
            return {
                allKeys: a,
                scriptable: r,
                indexable: s,
                isScriptable: isFunction(r) ? r : () => r,
                isIndexable: isFunction(s) ? s : () => s
            };
        }
        const readKey = (n, o) => n ? n + _capitalize(o) : o, needsSubResolver = (n, o) => isObject(o) && "adapters" !== n && (null === Object.getPrototypeOf(o) || o.constructor === Object);
        function _cached(n, o, r) {
            if (Object.prototype.hasOwnProperty.call(n, o)) return n[o];
            const s = r();
            return n[o] = s, s;
        }
        function resolveFallback(n, o, r) {
            return isFunction(n) ? n(o, r) : n;
        }
        const getScope = (n, o) => !0 === n ? o : "string" == typeof n ? resolveObjectKey(o, n) : void 0;
        function addScopes(n, o, r, s, a) {
            for (const l of o) {
                const o = getScope(r, l);
                if (o) {
                    n.add(o);
                    const l = resolveFallback(o._fallback, r, a);
                    if (defined(l) && l !== r && l !== s) return l;
                } else if (!1 === o && defined(s) && r !== s) return null;
            }
            return !1;
        }
        function createSubResolver(n, o, r, s) {
            const a = o._rootScopes, l = resolveFallback(o._fallback, r, s), h = [ ...n, ...a ], p = new Set;
            p.add(s);
            let x = addScopesFromKey(p, h, r, l || r, s);
            return null !== x && ((!defined(l) || l === r || (x = addScopesFromKey(p, h, l, x, s), 
            null !== x)) && _createResolver(Array.from(p), [ "" ], a, l, (() => function(n, o, r) {
                const s = n._getTarget();
                o in s || (s[o] = {});
                const a = s[o];
                if (isArray(a) && isObject(r)) return r;
                return a;
            }(o, r, s))));
        }
        function addScopesFromKey(n, o, r, s, a) {
            for (;r; ) r = addScopes(n, o, r, s, a);
            return r;
        }
        function _resolve(n, o) {
            for (const r of o) {
                if (!r) continue;
                const o = r[n];
                if (defined(o)) return o;
            }
        }
        function getKeysFromAllScopes(n) {
            let o = n._keys;
            return o || (o = n._keys = function(n) {
                const o = new Set;
                for (const r of n) for (const n of Object.keys(r).filter((n => !n.startsWith("_")))) o.add(n);
                return Array.from(o);
            }(n._scopes)), o;
        }
        function _parseObjectDataRadialScale(n, o, r, s) {
            const {iScale: a} = n, {key: l = "r"} = this._parsing, h = new Array(s);
            let p, x, _, y;
            for (p = 0, x = s; p < x; ++p) _ = p + r, y = o[_], h[p] = {
                r: a.parse(resolveObjectKey(y, l), _)
            };
            return h;
        }
        const V = Number.EPSILON || 1e-14, getPoint = (n, o) => o < n.length && !n[o].skip && n[o], getValueAxis = n => "x" === n ? "y" : "x";
        function splineCurve(n, o, r, s) {
            const a = n.skip ? o : n, l = o, h = r.skip ? o : r, p = distanceBetweenPoints(l, a), x = distanceBetweenPoints(h, l);
            let _ = p / (p + x), y = x / (p + x);
            _ = isNaN(_) ? 0 : _, y = isNaN(y) ? 0 : y;
            const v = s * _, w = s * y;
            return {
                previous: {
                    x: l.x - v * (h.x - a.x),
                    y: l.y - v * (h.y - a.y)
                },
                next: {
                    x: l.x + w * (h.x - a.x),
                    y: l.y + w * (h.y - a.y)
                }
            };
        }
        function splineCurveMonotone(n, o = "x") {
            const r = getValueAxis(o), s = n.length, a = Array(s).fill(0), l = Array(s);
            let h, p, x, _ = getPoint(n, 0);
            for (h = 0; h < s; ++h) if (p = x, x = _, _ = getPoint(n, h + 1), x) {
                if (_) {
                    const n = _[o] - x[o];
                    a[h] = 0 !== n ? (_[r] - x[r]) / n : 0;
                }
                l[h] = p ? _ ? S(a[h - 1]) !== S(a[h]) ? 0 : (a[h - 1] + a[h]) / 2 : a[h - 1] : a[h];
            }
            !function(n, o, r) {
                const s = n.length;
                let a, l, h, p, x, _ = getPoint(n, 0);
                for (let y = 0; y < s - 1; ++y) x = _, _ = getPoint(n, y + 1), x && _ && (almostEquals(o[y], 0, V) ? r[y] = r[y + 1] = 0 : (a = r[y] / o[y], 
                l = r[y + 1] / o[y], p = Math.pow(a, 2) + Math.pow(l, 2), p <= 9 || (h = 3 / Math.sqrt(p), 
                r[y] = a * h * o[y], r[y + 1] = l * h * o[y])));
            }(n, a, l), function(n, o, r = "x") {
                const s = getValueAxis(r), a = n.length;
                let l, h, p, x = getPoint(n, 0);
                for (let _ = 0; _ < a; ++_) {
                    if (h = p, p = x, x = getPoint(n, _ + 1), !p) continue;
                    const a = p[r], y = p[s];
                    h && (l = (a - h[r]) / 3, p[`cp1${r}`] = a - l, p[`cp1${s}`] = y - l * o[_]), x && (l = (x[r] - a) / 3, 
                    p[`cp2${r}`] = a + l, p[`cp2${s}`] = y + l * o[_]);
                }
            }(n, l, o);
        }
        function capControlPoint(n, o, r) {
            return Math.max(Math.min(n, r), o);
        }
        function _updateBezierControlPoints(n, o, r, s, a) {
            let l, h, p, x;
            if (o.spanGaps && (n = n.filter((n => !n.skip))), "monotone" === o.cubicInterpolationMode) splineCurveMonotone(n, a); else {
                let r = s ? n[n.length - 1] : n[0];
                for (l = 0, h = n.length; l < h; ++l) p = n[l], x = splineCurve(r, p, n[Math.min(l + 1, h - (s ? 0 : 1)) % h], o.tension), 
                p.cp1x = x.previous.x, p.cp1y = x.previous.y, p.cp2x = x.next.x, p.cp2y = x.next.y, 
                r = p;
            }
            o.capBezierPoints && function(n, o) {
                let r, s, a, l, h, p = _isPointInArea(n[0], o);
                for (r = 0, s = n.length; r < s; ++r) h = l, l = p, p = r < s - 1 && _isPointInArea(n[r + 1], o), 
                l && (a = n[r], h && (a.cp1x = capControlPoint(a.cp1x, o.left, o.right), a.cp1y = capControlPoint(a.cp1y, o.top, o.bottom)), 
                p && (a.cp2x = capControlPoint(a.cp2x, o.left, o.right), a.cp2y = capControlPoint(a.cp2y, o.top, o.bottom)));
            }(n, r);
        }
        function _isDomSupported() {
            return "undefined" != typeof window && "undefined" != typeof document;
        }
        function _getParentNode(n) {
            let o = n.parentNode;
            return o && "[object ShadowRoot]" === o.toString() && (o = o.host), o;
        }
        function parseMaxStyle(n, o, r) {
            let s;
            return "string" == typeof n ? (s = parseInt(n, 10), -1 !== n.indexOf("%") && (s = s / 100 * o.parentNode[r])) : s = n, 
            s;
        }
        const getComputedStyle = n => window.getComputedStyle(n, null);
        const j = [ "top", "right", "bottom", "left" ];
        function getPositionedStyle(n, o, r) {
            const s = {};
            r = r ? "-" + r : "";
            for (let a = 0; a < 4; a++) {
                const l = j[a];
                s[l] = parseFloat(n[o + "-" + l + r]) || 0;
            }
            return s.width = s.left + s.right, s.height = s.top + s.bottom, s;
        }
        function getRelativePosition(n, o) {
            if ("native" in n) return n;
            const {canvas: r, currentDevicePixelRatio: s} = o, a = getComputedStyle(r), l = "border-box" === a.boxSizing, h = getPositionedStyle(a, "padding"), p = getPositionedStyle(a, "border", "width"), {x, y: _, box: y} = function(n, o) {
                const r = n.touches, s = r && r.length ? r[0] : n, {offsetX: a, offsetY: l} = s;
                let h, p, x = !1;
                if (((n, o, r) => (n > 0 || o > 0) && (!r || !r.shadowRoot))(a, l, n.target)) h = a, 
                p = l; else {
                    const n = o.getBoundingClientRect();
                    h = s.clientX - n.left, p = s.clientY - n.top, x = !0;
                }
                return {
                    x: h,
                    y: p,
                    box: x
                };
            }(n, r), v = h.left + (y && p.left), w = h.top + (y && p.top);
            let {width: k, height: S} = o;
            return l && (k -= h.width + p.width, S -= h.height + p.height), {
                x: Math.round((x - v) / k * r.width / s),
                y: Math.round((_ - w) / S * r.height / s)
            };
        }
        const round1 = n => Math.round(10 * n) / 10;
        function getMaximumSize(n, o, r, s) {
            const a = getComputedStyle(n), l = getPositionedStyle(a, "margin"), h = parseMaxStyle(a.maxWidth, n, "clientWidth") || x, p = parseMaxStyle(a.maxHeight, n, "clientHeight") || x, _ = function(n, o, r) {
                let s, a;
                if (void 0 === o || void 0 === r) {
                    const l = _getParentNode(n);
                    if (l) {
                        const n = l.getBoundingClientRect(), h = getComputedStyle(l), p = getPositionedStyle(h, "border", "width"), x = getPositionedStyle(h, "padding");
                        o = n.width - x.width - p.width, r = n.height - x.height - p.height, s = parseMaxStyle(h.maxWidth, l, "clientWidth"), 
                        a = parseMaxStyle(h.maxHeight, l, "clientHeight");
                    } else o = n.clientWidth, r = n.clientHeight;
                }
                return {
                    width: o,
                    height: r,
                    maxWidth: s || x,
                    maxHeight: a || x
                };
            }(n, o, r);
            let {width: y, height: v} = _;
            if ("content-box" === a.boxSizing) {
                const n = getPositionedStyle(a, "border", "width"), o = getPositionedStyle(a, "padding");
                y -= o.width + n.width, v -= o.height + n.height;
            }
            return y = Math.max(0, y - l.width), v = Math.max(0, s ? Math.floor(y / s) : v - l.height), 
            y = round1(Math.min(y, h, _.maxWidth)), v = round1(Math.min(v, p, _.maxHeight)), 
            y && !v && (v = round1(y / 2)), {
                width: y,
                height: v
            };
        }
        function retinaScale(n, o, r) {
            const s = o || 1, a = Math.floor(n.height * s), l = Math.floor(n.width * s);
            n.height = a / s, n.width = l / s;
            const h = n.canvas;
            return h.style && (r || !h.style.height && !h.style.width) && (h.style.height = `${n.height}px`, 
            h.style.width = `${n.width}px`), (n.currentDevicePixelRatio !== s || h.height !== a || h.width !== l) && (n.currentDevicePixelRatio = s, 
            h.height = a, h.width = l, n.ctx.setTransform(s, 0, 0, s, 0, 0), !0);
        }
        const H = function() {
            let n = !1;
            try {
                const o = {
                    get passive() {
                        return n = !0, !1;
                    }
                };
                window.addEventListener("test", null, o), window.removeEventListener("test", null, o);
            } catch (n) {}
            return n;
        }();
        function readUsedSize(n, o) {
            const r = function(n, o) {
                return getComputedStyle(n).getPropertyValue(o);
            }(n, o), s = r && r.match(/^(\d+)(\.\d+)?px$/);
            return s ? +s[1] : void 0;
        }
        function _pointInLine(n, o, r, s) {
            return {
                x: n.x + r * (o.x - n.x),
                y: n.y + r * (o.y - n.y)
            };
        }
        function _steppedInterpolation(n, o, r, s) {
            return {
                x: n.x + r * (o.x - n.x),
                y: "middle" === s ? r < .5 ? n.y : o.y : "after" === s ? r < 1 ? n.y : o.y : r > 0 ? o.y : n.y
            };
        }
        function _bezierInterpolation(n, o, r, s) {
            const a = {
                x: n.cp2x,
                y: n.cp2y
            }, l = {
                x: o.cp1x,
                y: o.cp1y
            }, h = _pointInLine(n, a, r), p = _pointInLine(a, l, r), x = _pointInLine(l, o, r), _ = _pointInLine(h, p, r), y = _pointInLine(p, x, r);
            return _pointInLine(_, y, r);
        }
        const q = new Map;
        function formatNumber(n, o, r) {
            return function(n, o) {
                o = o || {};
                const r = n + JSON.stringify(o);
                let s = q.get(r);
                return s || (s = new Intl.NumberFormat(n, o), q.set(r, s)), s;
            }(o, r).format(n);
        }
        function getRtlAdapter(n, o, r) {
            return n ? function(n, o) {
                return {
                    x: r => n + n + o - r,
                    setWidth(n) {
                        o = n;
                    },
                    textAlign: n => "center" === n ? n : "right" === n ? "left" : "right",
                    xPlus: (n, o) => n - o,
                    leftForLtr: (n, o) => n - o
                };
            }(o, r) : {
                x: n => n,
                setWidth(n) {},
                textAlign: n => n,
                xPlus: (n, o) => n + o,
                leftForLtr: (n, o) => n
            };
        }
        function overrideTextDirection(n, o) {
            let r, s;
            "ltr" !== o && "rtl" !== o || (r = n.canvas.style, s = [ r.getPropertyValue("direction"), r.getPropertyPriority("direction") ], 
            r.setProperty("direction", o, "important"), n.prevTextDirection = s);
        }
        function restoreTextDirection(n, o) {
            void 0 !== o && (delete n.prevTextDirection, n.canvas.style.setProperty("direction", o[0], o[1]));
        }
        function propertyFn(n) {
            return "angle" === n ? {
                between: _angleBetween,
                compare: _angleDiff,
                normalize: _normalizeAngle
            } : {
                between: _isBetween,
                compare: (n, o) => n - o,
                normalize: n => n
            };
        }
        function normalizeSegment({start: n, end: o, count: r, loop: s, style: a}) {
            return {
                start: n % r,
                end: o % r,
                loop: s && (o - n + 1) % r == 0,
                style: a
            };
        }
        function _boundSegment(n, o, r) {
            if (!r) return [ n ];
            const {property: s, start: a, end: l} = r, h = o.length, {compare: p, between: x, normalize: _} = propertyFn(s), {start: y, end: v, loop: w, style: k} = function(n, o, r) {
                const {property: s, start: a, end: l} = r, {between: h, normalize: p} = propertyFn(s), x = o.length;
                let _, y, {start: v, end: w, loop: k} = n;
                if (k) {
                    for (v += x, w += x, _ = 0, y = x; _ < y && h(p(o[v % x][s]), a, l); ++_) v--, w--;
                    v %= x, w %= x;
                }
                return w < v && (w += x), {
                    start: v,
                    end: w,
                    loop: k,
                    style: n.style
                };
            }(n, o, r), S = [];
            let P, A, T, R = !1, O = null;
            const shouldStart = () => R || x(a, T, P) && 0 !== p(a, T), shouldStop = () => !R || 0 === p(l, P) || x(l, T, P);
            for (let n = y, r = y; n <= v; ++n) A = o[n % h], A.skip || (P = _(A[s]), P !== T && (R = x(P, a, l), 
            null === O && shouldStart() && (O = 0 === p(P, a) ? n : r), null !== O && shouldStop() && (S.push(normalizeSegment({
                start: O,
                end: n,
                loop: w,
                count: h,
                style: k
            })), O = null), r = n, T = P));
            return null !== O && S.push(normalizeSegment({
                start: O,
                end: v,
                loop: w,
                count: h,
                style: k
            })), S;
        }
        function _boundSegments(n, o) {
            const r = [], s = n.segments;
            for (let a = 0; a < s.length; a++) {
                const l = _boundSegment(s[a], n.points, o);
                l.length && r.push(...l);
            }
            return r;
        }
        function splitByStyles(n, o, r, s) {
            return s && s.setContext && r ? function(n, o, r, s) {
                const a = n._chart.getContext(), l = readStyle(n.options), {_datasetIndex: h, options: {spanGaps: p}} = n, x = r.length, _ = [];
                let y = l, v = o[0].start, w = v;
                function addStyle(n, o, s, a) {
                    const l = p ? -1 : 1;
                    if (n !== o) {
                        for (n += x; r[n % x].skip; ) n -= l;
                        for (;r[o % x].skip; ) o += l;
                        n % x != o % x && (_.push({
                            start: n % x,
                            end: o % x,
                            loop: s,
                            style: a
                        }), y = a, v = o % x);
                    }
                }
                for (const n of o) {
                    v = p ? v : n.start;
                    let o, l = r[v % x];
                    for (w = v + 1; w <= n.end; w++) {
                        const p = r[w % x];
                        o = readStyle(s.setContext(createContext(a, {
                            type: "segment",
                            p0: l,
                            p1: p,
                            p0DataIndex: (w - 1) % x,
                            p1DataIndex: w % x,
                            datasetIndex: h
                        }))), styleChanged(o, y) && addStyle(v, w - 1, n.loop, y), l = p, y = o;
                    }
                    v < w - 1 && addStyle(v, w - 1, n.loop, y);
                }
                return _;
            }(n, o, r, s) : o;
        }
        function readStyle(n) {
            return {
                backgroundColor: n.backgroundColor,
                borderCapStyle: n.borderCapStyle,
                borderDash: n.borderDash,
                borderDashOffset: n.borderDashOffset,
                borderJoinStyle: n.borderJoinStyle,
                borderWidth: n.borderWidth,
                borderColor: n.borderColor
            };
        }
        function styleChanged(n, o) {
            return o && JSON.stringify(n) !== JSON.stringify(o);
        }
        var Y = new 
        /*!
 * Chart.js v3.9.1
 * https://www.chartjs.org
 * (c) 2022 Chart.js Contributors
 * Released under the MIT License
 */
        class {
            constructor() {
                this._request = null, this._charts = new Map, this._running = !1, this._lastDate = void 0;
            }
            _notify(n, o, r, s) {
                const a = o.listeners[s], l = o.duration;
                a.forEach((s => s({
                    chart: n,
                    initial: o.initial,
                    numSteps: l,
                    currentStep: Math.min(r - o.start, l)
                })));
            }
            _refresh() {
                this._request || (this._running = !0, this._request = A.call(window, (() => {
                    this._update(), this._request = null, this._running && this._refresh();
                })));
            }
            _update(n = Date.now()) {
                let o = 0;
                this._charts.forEach(((r, s) => {
                    if (!r.running || !r.items.length) return;
                    const a = r.items;
                    let l, h = a.length - 1, p = !1;
                    for (;h >= 0; --h) l = a[h], l._active ? (l._total > r.duration && (r.duration = l._total), 
                    l.tick(n), p = !0) : (a[h] = a[a.length - 1], a.pop());
                    p && (s.draw(), this._notify(s, r, n, "progress")), a.length || (r.running = !1, 
                    this._notify(s, r, n, "complete"), r.initial = !1), o += a.length;
                })), this._lastDate = n, 0 === o && (this._running = !1);
            }
            _getAnims(n) {
                const o = this._charts;
                let r = o.get(n);
                return r || (r = {
                    running: !1,
                    initial: !0,
                    items: [],
                    listeners: {
                        complete: [],
                        progress: []
                    }
                }, o.set(n, r)), r;
            }
            listen(n, o, r) {
                this._getAnims(n).listeners[o].push(r);
            }
            add(n, o) {
                o && o.length && this._getAnims(n).items.push(...o);
            }
            has(n) {
                return this._getAnims(n).items.length > 0;
            }
            start(n) {
                const o = this._charts.get(n);
                o && (o.running = !0, o.start = Date.now(), o.duration = o.items.reduce(((n, o) => Math.max(n, o._duration)), 0), 
                this._refresh());
            }
            running(n) {
                if (!this._running) return !1;
                const o = this._charts.get(n);
                return !!(o && o.running && o.items.length);
            }
            stop(n) {
                const o = this._charts.get(n);
                if (!o || !o.items.length) return;
                const r = o.items;
                let s = r.length - 1;
                for (;s >= 0; --s) r[s].cancel();
                o.items = [], this._notify(n, o, Date.now(), "complete");
            }
            remove(n) {
                return this._charts.delete(n);
            }
        };
        const G = "transparent", X = {
            boolean: (n, o, r) => r > .5 ? o : n,
            color(n, o, r) {
                const s = color(n || G), a = s.valid && color(o || G);
                return a && a.valid ? a.mix(s, r).hexString() : o;
            },
            number: (n, o, r) => n + (o - n) * r
        };
        class Animation {
            constructor(n, o, r, s) {
                const a = o[r];
                s = resolve([ n.to, s, a, n.from ]);
                const l = resolve([ n.from, a, s ]);
                this._active = !0, this._fn = n.fn || X[n.type || typeof l], this._easing = T[n.easing] || T.linear, 
                this._start = Math.floor(Date.now() + (n.delay || 0)), this._duration = this._total = Math.floor(n.duration), 
                this._loop = !!n.loop, this._target = o, this._prop = r, this._from = l, this._to = s, 
                this._promises = void 0;
            }
            active() {
                return this._active;
            }
            update(n, o, r) {
                if (this._active) {
                    this._notify(!1);
                    const s = this._target[this._prop], a = r - this._start, l = this._duration - a;
                    this._start = r, this._duration = Math.floor(Math.max(l, n.duration)), this._total += a, 
                    this._loop = !!n.loop, this._to = resolve([ n.to, o, s, n.from ]), this._from = resolve([ n.from, s, o ]);
                }
            }
            cancel() {
                this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
            }
            tick(n) {
                const o = n - this._start, r = this._duration, s = this._prop, a = this._from, l = this._loop, h = this._to;
                let p;
                if (this._active = a !== h && (l || o < r), !this._active) return this._target[s] = h, 
                void this._notify(!0);
                o < 0 ? this._target[s] = a : (p = o / r % 2, p = l && p > 1 ? 2 - p : p, p = this._easing(Math.min(1, Math.max(0, p))), 
                this._target[s] = this._fn(a, h, p));
            }
            wait() {
                const n = this._promises || (this._promises = []);
                return new Promise(((o, r) => {
                    n.push({
                        res: o,
                        rej: r
                    });
                }));
            }
            _notify(n) {
                const o = n ? "res" : "rej", r = this._promises || [];
                for (let n = 0; n < r.length; n++) r[n][o]();
            }
        }
        F.set("animation", {
            delay: void 0,
            duration: 1e3,
            easing: "easeOutQuart",
            fn: void 0,
            from: void 0,
            loop: void 0,
            to: void 0,
            type: void 0
        });
        const J = Object.keys(F.animation);
        F.describe("animation", {
            _fallback: !1,
            _indexable: !1,
            _scriptable: n => "onProgress" !== n && "onComplete" !== n && "fn" !== n
        }), F.set("animations", {
            colors: {
                type: "color",
                properties: [ "color", "borderColor", "backgroundColor" ]
            },
            numbers: {
                type: "number",
                properties: [ "x", "y", "borderWidth", "radius", "tension" ]
            }
        }), F.describe("animations", {
            _fallback: "animation"
        }), F.set("transitions", {
            active: {
                animation: {
                    duration: 400
                }
            },
            resize: {
                animation: {
                    duration: 0
                }
            },
            show: {
                animations: {
                    colors: {
                        from: "transparent"
                    },
                    visible: {
                        type: "boolean",
                        duration: 0
                    }
                }
            },
            hide: {
                animations: {
                    colors: {
                        to: "transparent"
                    },
                    visible: {
                        type: "boolean",
                        easing: "linear",
                        fn: n => 0 | n
                    }
                }
            }
        });
        class Animations {
            constructor(n, o) {
                this._chart = n, this._properties = new Map, this.configure(o);
            }
            configure(n) {
                if (!isObject(n)) return;
                const o = this._properties;
                Object.getOwnPropertyNames(n).forEach((r => {
                    const s = n[r];
                    if (!isObject(s)) return;
                    const a = {};
                    for (const n of J) a[n] = s[n];
                    (isArray(s.properties) && s.properties || [ r ]).forEach((n => {
                        n !== r && o.has(n) || o.set(n, a);
                    }));
                }));
            }
            _animateOptions(n, o) {
                const r = o.options, s = function(n, o) {
                    if (!o) return;
                    let r = n.options;
                    if (!r) return void (n.options = o);
                    r.$shared && (n.options = r = Object.assign({}, r, {
                        $shared: !1,
                        $animations: {}
                    }));
                    return r;
                }(n, r);
                if (!s) return [];
                const a = this._createAnimations(s, r);
                return r.$shared && function(n, o) {
                    const r = [], s = Object.keys(o);
                    for (let o = 0; o < s.length; o++) {
                        const a = n[s[o]];
                        a && a.active() && r.push(a.wait());
                    }
                    return Promise.all(r);
                }(n.options.$animations, r).then((() => {
                    n.options = r;
                }), (() => {})), a;
            }
            _createAnimations(n, o) {
                const r = this._properties, s = [], a = n.$animations || (n.$animations = {}), l = Object.keys(o), h = Date.now();
                let p;
                for (p = l.length - 1; p >= 0; --p) {
                    const x = l[p];
                    if ("$" === x.charAt(0)) continue;
                    if ("options" === x) {
                        s.push(...this._animateOptions(n, o));
                        continue;
                    }
                    const _ = o[x];
                    let y = a[x];
                    const v = r.get(x);
                    if (y) {
                        if (v && y.active()) {
                            y.update(v, _, h);
                            continue;
                        }
                        y.cancel();
                    }
                    v && v.duration ? (a[x] = y = new Animation(v, n, x, _), s.push(y)) : n[x] = _;
                }
                return s;
            }
            update(n, o) {
                if (0 === this._properties.size) return void Object.assign(n, o);
                const r = this._createAnimations(n, o);
                return r.length ? (Y.add(this._chart, r), !0) : void 0;
            }
        }
        function scaleClip(n, o) {
            const r = n && n.options || {}, s = r.reverse, a = void 0 === r.min ? o : 0, l = void 0 === r.max ? o : 0;
            return {
                start: s ? l : a,
                end: s ? a : l
            };
        }
        function getSortedDatasetIndices(n, o) {
            const r = [], s = n._getSortedDatasetMetas(o);
            let a, l;
            for (a = 0, l = s.length; a < l; ++a) r.push(s[a].index);
            return r;
        }
        function applyStack(n, o, r, s = {}) {
            const a = n.keys, l = "single" === s.mode;
            let h, p, x, _;
            if (null !== o) {
                for (h = 0, p = a.length; h < p; ++h) {
                    if (x = +a[h], x === r) {
                        if (s.all) continue;
                        break;
                    }
                    _ = n.values[x], isNumberFinite(_) && (l || 0 === o || S(o) === S(_)) && (o += _);
                }
                return o;
            }
        }
        function isStacked(n, o) {
            const r = n && n.options.stacked;
            return r || void 0 === r && void 0 !== o.stack;
        }
        function getOrCreateStack(n, o, r) {
            const s = n[o] || (n[o] = {});
            return s[r] || (s[r] = {});
        }
        function getLastIndexInStack(n, o, r, s) {
            for (const a of o.getMatchingVisibleMetas(s).reverse()) {
                const o = n[a.index];
                if (r && o > 0 || !r && o < 0) return a.index;
            }
            return null;
        }
        function updateStacks(n, o) {
            const {chart: r, _cachedMeta: s} = n, a = r._stacks || (r._stacks = {}), {iScale: l, vScale: h, index: p} = s, x = l.axis, _ = h.axis, y = function(n, o, r) {
                return `${n.id}.${o.id}.${r.stack || r.type}`;
            }(l, h, s), v = o.length;
            let w;
            for (let n = 0; n < v; ++n) {
                const r = o[n], {[x]: l, [_]: v} = r;
                w = (r._stacks || (r._stacks = {}))[_] = getOrCreateStack(a, y, l), w[p] = v, w._top = getLastIndexInStack(w, h, !0, s.type), 
                w._bottom = getLastIndexInStack(w, h, !1, s.type);
            }
        }
        function getFirstScaleId(n, o) {
            const r = n.scales;
            return Object.keys(r).filter((n => r[n].axis === o)).shift();
        }
        function clearStacks(n, o) {
            const r = n.controller.index, s = n.vScale && n.vScale.axis;
            if (s) {
                o = o || n._parsed;
                for (const n of o) {
                    const o = n._stacks;
                    if (!o || void 0 === o[s] || void 0 === o[s][r]) return;
                    delete o[s][r];
                }
            }
        }
        const isDirectUpdateMode = n => "reset" === n || "none" === n, cloneIfNotShared = (n, o) => o ? n : Object.assign({}, n);
        class DatasetController {
            constructor(n, o) {
                this.chart = n, this._ctx = n.ctx, this.index = o, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), 
                this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, 
                this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, 
                this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, 
                this.$context = void 0, this._syncList = [], this.initialize();
            }
            initialize() {
                const n = this._cachedMeta;
                this.configure(), this.linkScales(), n._stacked = isStacked(n.vScale, n), this.addElements();
            }
            updateIndex(n) {
                this.index !== n && clearStacks(this._cachedMeta), this.index = n;
            }
            linkScales() {
                const n = this.chart, o = this._cachedMeta, r = this.getDataset(), chooseId = (n, o, r, s) => "x" === n ? o : "r" === n ? s : r, s = o.xAxisID = valueOrDefault(r.xAxisID, getFirstScaleId(n, "x")), a = o.yAxisID = valueOrDefault(r.yAxisID, getFirstScaleId(n, "y")), l = o.rAxisID = valueOrDefault(r.rAxisID, getFirstScaleId(n, "r")), h = o.indexAxis, p = o.iAxisID = chooseId(h, s, a, l), x = o.vAxisID = chooseId(h, a, s, l);
                o.xScale = this.getScaleForId(s), o.yScale = this.getScaleForId(a), o.rScale = this.getScaleForId(l), 
                o.iScale = this.getScaleForId(p), o.vScale = this.getScaleForId(x);
            }
            getDataset() {
                return this.chart.data.datasets[this.index];
            }
            getMeta() {
                return this.chart.getDatasetMeta(this.index);
            }
            getScaleForId(n) {
                return this.chart.scales[n];
            }
            _getOtherScale(n) {
                const o = this._cachedMeta;
                return n === o.iScale ? o.vScale : o.iScale;
            }
            reset() {
                this._update("reset");
            }
            _destroy() {
                const n = this._cachedMeta;
                this._data && unlistenArrayEvents(this._data, this), n._stacked && clearStacks(n);
            }
            _dataCheck() {
                const n = this.getDataset(), o = n.data || (n.data = []), r = this._data;
                if (isObject(o)) this._data = function(n) {
                    const o = Object.keys(n), r = new Array(o.length);
                    let s, a, l;
                    for (s = 0, a = o.length; s < a; ++s) l = o[s], r[s] = {
                        x: l,
                        y: n[l]
                    };
                    return r;
                }(o); else if (r !== o) {
                    if (r) {
                        unlistenArrayEvents(r, this);
                        const n = this._cachedMeta;
                        clearStacks(n), n._parsed = [];
                    }
                    o && Object.isExtensible(o) && (a = this, (s = o)._chartjs ? s._chartjs.listeners.push(a) : (Object.defineProperty(s, "_chartjs", {
                        configurable: !0,
                        enumerable: !1,
                        value: {
                            listeners: [ a ]
                        }
                    }), P.forEach((n => {
                        const o = "_onData" + _capitalize(n), r = s[n];
                        Object.defineProperty(s, n, {
                            configurable: !0,
                            enumerable: !1,
                            value(...n) {
                                const a = r.apply(this, n);
                                return s._chartjs.listeners.forEach((r => {
                                    "function" == typeof r[o] && r[o](...n);
                                })), a;
                            }
                        });
                    })))), this._syncList = [], this._data = o;
                }
                var s, a;
            }
            addElements() {
                const n = this._cachedMeta;
                this._dataCheck(), this.datasetElementType && (n.dataset = new this.datasetElementType);
            }
            buildOrUpdateElements(n) {
                const o = this._cachedMeta, r = this.getDataset();
                let s = !1;
                this._dataCheck();
                const a = o._stacked;
                o._stacked = isStacked(o.vScale, o), o.stack !== r.stack && (s = !0, clearStacks(o), 
                o.stack = r.stack), this._resyncElements(n), (s || a !== o._stacked) && updateStacks(this, o._parsed);
            }
            configure() {
                const n = this.chart.config, o = n.datasetScopeKeys(this._type), r = n.getOptionScopes(this.getDataset(), o, !0);
                this.options = n.createResolver(r, this.getContext()), this._parsing = this.options.parsing, 
                this._cachedDataOpts = {};
            }
            parse(n, o) {
                const {_cachedMeta: r, _data: s} = this, {iScale: a, _stacked: l} = r, h = a.axis;
                let p, x, _, y = 0 === n && o === s.length || r._sorted, v = n > 0 && r._parsed[n - 1];
                if (!1 === this._parsing) r._parsed = s, r._sorted = !0, _ = s; else {
                    _ = isArray(s[n]) ? this.parseArrayData(r, s, n, o) : isObject(s[n]) ? this.parseObjectData(r, s, n, o) : this.parsePrimitiveData(r, s, n, o);
                    const isNotInOrderComparedToPrev = () => null === x[h] || v && x[h] < v[h];
                    for (p = 0; p < o; ++p) r._parsed[p + n] = x = _[p], y && (isNotInOrderComparedToPrev() && (y = !1), 
                    v = x);
                    r._sorted = y;
                }
                l && updateStacks(this, _);
            }
            parsePrimitiveData(n, o, r, s) {
                const {iScale: a, vScale: l} = n, h = a.axis, p = l.axis, x = a.getLabels(), _ = a === l, y = new Array(s);
                let v, w, k;
                for (v = 0, w = s; v < w; ++v) k = v + r, y[v] = {
                    [h]: _ || a.parse(x[k], k),
                    [p]: l.parse(o[k], k)
                };
                return y;
            }
            parseArrayData(n, o, r, s) {
                const {xScale: a, yScale: l} = n, h = new Array(s);
                let p, x, _, y;
                for (p = 0, x = s; p < x; ++p) _ = p + r, y = o[_], h[p] = {
                    x: a.parse(y[0], _),
                    y: l.parse(y[1], _)
                };
                return h;
            }
            parseObjectData(n, o, r, s) {
                const {xScale: a, yScale: l} = n, {xAxisKey: h = "x", yAxisKey: p = "y"} = this._parsing, x = new Array(s);
                let _, y, v, w;
                for (_ = 0, y = s; _ < y; ++_) v = _ + r, w = o[v], x[_] = {
                    x: a.parse(resolveObjectKey(w, h), v),
                    y: l.parse(resolveObjectKey(w, p), v)
                };
                return x;
            }
            getParsed(n) {
                return this._cachedMeta._parsed[n];
            }
            getDataElement(n) {
                return this._cachedMeta.data[n];
            }
            applyStack(n, o, r) {
                const s = this.chart, a = this._cachedMeta, l = o[n.axis];
                return applyStack({
                    keys: getSortedDatasetIndices(s, !0),
                    values: o._stacks[n.axis]
                }, l, a.index, {
                    mode: r
                });
            }
            updateRangeFromParsed(n, o, r, s) {
                const a = r[o.axis];
                let l = null === a ? NaN : a;
                const h = s && r._stacks[o.axis];
                s && h && (s.values = h, l = applyStack(s, a, this._cachedMeta.index)), n.min = Math.min(n.min, l), 
                n.max = Math.max(n.max, l);
            }
            getMinMax(n, o) {
                const r = this._cachedMeta, s = r._parsed, a = r._sorted && n === r.iScale, l = s.length, h = this._getOtherScale(n), p = ((n, o, r) => n && !o.hidden && o._stacked && {
                    keys: getSortedDatasetIndices(r, !0),
                    values: null
                })(o, r, this.chart), x = {
                    min: Number.POSITIVE_INFINITY,
                    max: Number.NEGATIVE_INFINITY
                }, {min: _, max: y} = function(n) {
                    const {min: o, max: r, minDefined: s, maxDefined: a} = n.getUserBounds();
                    return {
                        min: s ? o : Number.NEGATIVE_INFINITY,
                        max: a ? r : Number.POSITIVE_INFINITY
                    };
                }(h);
                let v, w;
                function _skip() {
                    w = s[v];
                    const o = w[h.axis];
                    return !isNumberFinite(w[n.axis]) || _ > o || y < o;
                }
                for (v = 0; v < l && (_skip() || (this.updateRangeFromParsed(x, n, w, p), !a)); ++v) ;
                if (a) for (v = l - 1; v >= 0; --v) if (!_skip()) {
                    this.updateRangeFromParsed(x, n, w, p);
                    break;
                }
                return x;
            }
            getAllParsedValues(n) {
                const o = this._cachedMeta._parsed, r = [];
                let s, a, l;
                for (s = 0, a = o.length; s < a; ++s) l = o[s][n.axis], isNumberFinite(l) && r.push(l);
                return r;
            }
            getMaxOverflow() {
                return !1;
            }
            getLabelAndValue(n) {
                const o = this._cachedMeta, r = o.iScale, s = o.vScale, a = this.getParsed(n);
                return {
                    label: r ? "" + r.getLabelForValue(a[r.axis]) : "",
                    value: s ? "" + s.getLabelForValue(a[s.axis]) : ""
                };
            }
            _update(n) {
                const o = this._cachedMeta;
                this.update(n || "default"), o._clip = function(n) {
                    let o, r, s, a;
                    return isObject(n) ? (o = n.top, r = n.right, s = n.bottom, a = n.left) : o = r = s = a = n, 
                    {
                        top: o,
                        right: r,
                        bottom: s,
                        left: a,
                        disabled: !1 === n
                    };
                }(valueOrDefault(this.options.clip, function(n, o, r) {
                    if (!1 === r) return !1;
                    const s = scaleClip(n, r), a = scaleClip(o, r);
                    return {
                        top: a.end,
                        right: s.end,
                        bottom: a.start,
                        left: s.start
                    };
                }(o.xScale, o.yScale, this.getMaxOverflow())));
            }
            update(n) {}
            draw() {
                const n = this._ctx, o = this.chart, r = this._cachedMeta, s = r.data || [], a = o.chartArea, l = [], h = this._drawStart || 0, p = this._drawCount || s.length - h, x = this.options.drawActiveElementsOnTop;
                let _;
                for (r.dataset && r.dataset.draw(n, a, h, p), _ = h; _ < h + p; ++_) {
                    const o = s[_];
                    o.hidden || (o.active && x ? l.push(o) : o.draw(n, a));
                }
                for (_ = 0; _ < l.length; ++_) l[_].draw(n, a);
            }
            getStyle(n, o) {
                const r = o ? "active" : "default";
                return void 0 === n && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(r) : this.resolveDataElementOptions(n || 0, r);
            }
            getContext(n, o, r) {
                const s = this.getDataset();
                let a;
                if (n >= 0 && n < this._cachedMeta.data.length) {
                    const o = this._cachedMeta.data[n];
                    a = o.$context || (o.$context = function(n, o, r) {
                        return createContext(n, {
                            active: !1,
                            dataIndex: o,
                            parsed: void 0,
                            raw: void 0,
                            element: r,
                            index: o,
                            mode: "default",
                            type: "data"
                        });
                    }(this.getContext(), n, o)), a.parsed = this.getParsed(n), a.raw = s.data[n], a.index = a.dataIndex = n;
                } else a = this.$context || (this.$context = function(n, o) {
                    return createContext(n, {
                        active: !1,
                        dataset: void 0,
                        datasetIndex: o,
                        index: o,
                        mode: "default",
                        type: "dataset"
                    });
                }(this.chart.getContext(), this.index)), a.dataset = s, a.index = a.datasetIndex = this.index;
                return a.active = !!o, a.mode = r, a;
            }
            resolveDatasetElementOptions(n) {
                return this._resolveElementOptions(this.datasetElementType.id, n);
            }
            resolveDataElementOptions(n, o) {
                return this._resolveElementOptions(this.dataElementType.id, o, n);
            }
            _resolveElementOptions(n, o = "default", r) {
                const s = "active" === o, a = this._cachedDataOpts, l = n + "-" + o, h = a[l], p = this.enableOptionSharing && defined(r);
                if (h) return cloneIfNotShared(h, p);
                const x = this.chart.config, _ = x.datasetElementScopeKeys(this._type, n), y = s ? [ `${n}Hover`, "hover", n, "" ] : [ n, "" ], v = x.getOptionScopes(this.getDataset(), _), w = Object.keys(F.elements[n]), k = x.resolveNamedOptions(v, w, (() => this.getContext(r, s)), y);
                return k.$shared && (k.$shared = p, a[l] = Object.freeze(cloneIfNotShared(k, p))), 
                k;
            }
            _resolveAnimations(n, o, r) {
                const s = this.chart, a = this._cachedDataOpts, l = `animation-${o}`, h = a[l];
                if (h) return h;
                let p;
                if (!1 !== s.options.animation) {
                    const s = this.chart.config, a = s.datasetAnimationScopeKeys(this._type, o), l = s.getOptionScopes(this.getDataset(), a);
                    p = s.createResolver(l, this.getContext(n, r, o));
                }
                const x = new Animations(s, p && p.animations);
                return p && p._cacheable && (a[l] = Object.freeze(x)), x;
            }
            getSharedOptions(n) {
                if (n.$shared) return this._sharedOptions || (this._sharedOptions = Object.assign({}, n));
            }
            includeOptions(n, o) {
                return !o || isDirectUpdateMode(n) || this.chart._animationsDisabled;
            }
            _getSharedOptions(n, o) {
                const r = this.resolveDataElementOptions(n, o), s = this._sharedOptions, a = this.getSharedOptions(r), l = this.includeOptions(o, a) || a !== s;
                return this.updateSharedOptions(a, o, r), {
                    sharedOptions: a,
                    includeOptions: l
                };
            }
            updateElement(n, o, r, s) {
                isDirectUpdateMode(s) ? Object.assign(n, r) : this._resolveAnimations(o, s).update(n, r);
            }
            updateSharedOptions(n, o, r) {
                n && !isDirectUpdateMode(o) && this._resolveAnimations(void 0, o).update(n, r);
            }
            _setStyle(n, o, r, s) {
                n.active = s;
                const a = this.getStyle(o, s);
                this._resolveAnimations(o, r, s).update(n, {
                    options: !s && this.getSharedOptions(a) || a
                });
            }
            removeHoverStyle(n, o, r) {
                this._setStyle(n, r, "active", !1);
            }
            setHoverStyle(n, o, r) {
                this._setStyle(n, r, "active", !0);
            }
            _removeDatasetHoverStyle() {
                const n = this._cachedMeta.dataset;
                n && this._setStyle(n, void 0, "active", !1);
            }
            _setDatasetHoverStyle() {
                const n = this._cachedMeta.dataset;
                n && this._setStyle(n, void 0, "active", !0);
            }
            _resyncElements(n) {
                const o = this._data, r = this._cachedMeta.data;
                for (const [n, o, r] of this._syncList) this[n](o, r);
                this._syncList = [];
                const s = r.length, a = o.length, l = Math.min(a, s);
                l && this.parse(0, l), a > s ? this._insertElements(s, a - s, n) : a < s && this._removeElements(a, s - a);
            }
            _insertElements(n, o, r = !0) {
                const s = this._cachedMeta, a = s.data, l = n + o;
                let h;
                const move = n => {
                    for (n.length += o, h = n.length - 1; h >= l; h--) n[h] = n[h - o];
                };
                for (move(a), h = n; h < l; ++h) a[h] = new this.dataElementType;
                this._parsing && move(s._parsed), this.parse(n, o), r && this.updateElements(a, n, o, "reset");
            }
            updateElements(n, o, r, s) {}
            _removeElements(n, o) {
                const r = this._cachedMeta;
                if (this._parsing) {
                    const s = r._parsed.splice(n, o);
                    r._stacked && clearStacks(r, s);
                }
                r.data.splice(n, o);
            }
            _sync(n) {
                if (this._parsing) this._syncList.push(n); else {
                    const [o, r, s] = n;
                    this[o](r, s);
                }
                this.chart._dataChanges.push([ this.index, ...n ]);
            }
            _onDataPush() {
                const n = arguments.length;
                this._sync([ "_insertElements", this.getDataset().data.length - n, n ]);
            }
            _onDataPop() {
                this._sync([ "_removeElements", this._cachedMeta.data.length - 1, 1 ]);
            }
            _onDataShift() {
                this._sync([ "_removeElements", 0, 1 ]);
            }
            _onDataSplice(n, o) {
                o && this._sync([ "_removeElements", n, o ]);
                const r = arguments.length - 2;
                r && this._sync([ "_insertElements", n, r ]);
            }
            _onDataUnshift() {
                this._sync([ "_insertElements", 0, arguments.length ]);
            }
        }
        function computeMinSampleSize(n) {
            const o = n.iScale, r = function(n, o) {
                if (!n._cache.$bar) {
                    const r = n.getMatchingVisibleMetas(o);
                    let s = [];
                    for (let o = 0, a = r.length; o < a; o++) s = s.concat(r[o].controller.getAllParsedValues(n));
                    n._cache.$bar = _arrayUnique(s.sort(((n, o) => n - o)));
                }
                return n._cache.$bar;
            }(o, n.type);
            let s, a, l, h, p = o._length;
            const updateMinAndPrev = () => {
                32767 !== l && -32768 !== l && (defined(h) && (p = Math.min(p, Math.abs(l - h) || p)), 
                h = l);
            };
            for (s = 0, a = r.length; s < a; ++s) l = o.getPixelForValue(r[s]), updateMinAndPrev();
            for (h = void 0, s = 0, a = o.ticks.length; s < a; ++s) l = o.getPixelForTick(s), 
            updateMinAndPrev();
            return p;
        }
        function parseValue(n, o, r, s) {
            return isArray(n) ? function(n, o, r, s) {
                const a = r.parse(n[0], s), l = r.parse(n[1], s), h = Math.min(a, l), p = Math.max(a, l);
                let x = h, _ = p;
                Math.abs(h) > Math.abs(p) && (x = p, _ = h), o[r.axis] = _, o._custom = {
                    barStart: x,
                    barEnd: _,
                    start: a,
                    end: l,
                    min: h,
                    max: p
                };
            }(n, o, r, s) : o[r.axis] = r.parse(n, s), o;
        }
        function parseArrayOrPrimitive(n, o, r, s) {
            const a = n.iScale, l = n.vScale, h = a.getLabels(), p = a === l, x = [];
            let _, y, v, w;
            for (_ = r, y = r + s; _ < y; ++_) w = o[_], v = {}, v[a.axis] = p || a.parse(h[_], _), 
            x.push(parseValue(w, v, l, _));
            return x;
        }
        function isFloatBar(n) {
            return n && void 0 !== n.barStart && void 0 !== n.barEnd;
        }
        function setBorderSkipped(n, o, r, s) {
            let a = o.borderSkipped;
            const l = {};
            if (!a) return void (n.borderSkipped = l);
            if (!0 === a) return void (n.borderSkipped = {
                top: !0,
                right: !0,
                bottom: !0,
                left: !0
            });
            const {start: h, end: p, reverse: x, top: _, bottom: y} = function(n) {
                let o, r, s, a, l;
                return n.horizontal ? (o = n.base > n.x, r = "left", s = "right") : (o = n.base < n.y, 
                r = "bottom", s = "top"), o ? (a = "end", l = "start") : (a = "start", l = "end"), 
                {
                    start: r,
                    end: s,
                    reverse: o,
                    top: a,
                    bottom: l
                };
            }(n);
            "middle" === a && r && (n.enableBorderRadius = !0, (r._top || 0) === s ? a = _ : (r._bottom || 0) === s ? a = y : (l[parseEdge(y, h, p, x)] = !0, 
            a = _)), l[parseEdge(a, h, p, x)] = !0, n.borderSkipped = l;
        }
        function parseEdge(n, o, r, s) {
            var a, l, h;
            return s ? (h = r, n = startEnd(n = (a = n) === (l = o) ? h : a === h ? l : a, r, o)) : n = startEnd(n, o, r), 
            n;
        }
        function startEnd(n, o, r) {
            return "start" === n ? o : "end" === n ? r : n;
        }
        function setInflateAmount(n, {inflateAmount: o}, r) {
            n.inflateAmount = "auto" === o ? 1 === r ? .33 : 0 : o;
        }
        DatasetController.defaults = {}, DatasetController.prototype.datasetElementType = null, 
        DatasetController.prototype.dataElementType = null;
        class BarController extends DatasetController {
            parsePrimitiveData(n, o, r, s) {
                return parseArrayOrPrimitive(n, o, r, s);
            }
            parseArrayData(n, o, r, s) {
                return parseArrayOrPrimitive(n, o, r, s);
            }
            parseObjectData(n, o, r, s) {
                const {iScale: a, vScale: l} = n, {xAxisKey: h = "x", yAxisKey: p = "y"} = this._parsing, x = "x" === a.axis ? h : p, _ = "x" === l.axis ? h : p, y = [];
                let v, w, k, S;
                for (v = r, w = r + s; v < w; ++v) S = o[v], k = {}, k[a.axis] = a.parse(resolveObjectKey(S, x), v), 
                y.push(parseValue(resolveObjectKey(S, _), k, l, v));
                return y;
            }
            updateRangeFromParsed(n, o, r, s) {
                super.updateRangeFromParsed(n, o, r, s);
                const a = r._custom;
                a && o === this._cachedMeta.vScale && (n.min = Math.min(n.min, a.min), n.max = Math.max(n.max, a.max));
            }
            getMaxOverflow() {
                return 0;
            }
            getLabelAndValue(n) {
                const o = this._cachedMeta, {iScale: r, vScale: s} = o, a = this.getParsed(n), l = a._custom, h = isFloatBar(l) ? "[" + l.start + ", " + l.end + "]" : "" + s.getLabelForValue(a[s.axis]);
                return {
                    label: "" + r.getLabelForValue(a[r.axis]),
                    value: h
                };
            }
            initialize() {
                this.enableOptionSharing = !0, super.initialize();
                this._cachedMeta.stack = this.getDataset().stack;
            }
            update(n) {
                const o = this._cachedMeta;
                this.updateElements(o.data, 0, o.data.length, n);
            }
            updateElements(n, o, r, s) {
                const a = "reset" === s, {index: l, _cachedMeta: {vScale: h}} = this, p = h.getBasePixel(), x = h.isHorizontal(), _ = this._getRuler(), {sharedOptions: y, includeOptions: v} = this._getSharedOptions(o, s);
                for (let w = o; w < o + r; w++) {
                    const o = this.getParsed(w), r = a || isNullOrUndef(o[h.axis]) ? {
                        base: p,
                        head: p
                    } : this._calculateBarValuePixels(w), k = this._calculateBarIndexPixels(w, _), S = (o._stacks || {})[h.axis], P = {
                        horizontal: x,
                        base: r.base,
                        enableBorderRadius: !S || isFloatBar(o._custom) || l === S._top || l === S._bottom,
                        x: x ? r.head : k.center,
                        y: x ? k.center : r.head,
                        height: x ? k.size : Math.abs(r.size),
                        width: x ? Math.abs(r.size) : k.size
                    };
                    v && (P.options = y || this.resolveDataElementOptions(w, n[w].active ? "active" : s));
                    const A = P.options || n[w].options;
                    setBorderSkipped(P, A, S, l), setInflateAmount(P, A, _.ratio), this.updateElement(n[w], w, P, s);
                }
            }
            _getStacks(n, o) {
                const {iScale: r} = this._cachedMeta, s = r.getMatchingVisibleMetas(this._type).filter((n => n.controller.options.grouped)), a = r.options.stacked, l = [], skipNull = n => {
                    const r = n.controller.getParsed(o), s = r && r[n.vScale.axis];
                    if (isNullOrUndef(s) || isNaN(s)) return !0;
                };
                for (const r of s) if ((void 0 === o || !skipNull(r)) && ((!1 === a || -1 === l.indexOf(r.stack) || void 0 === a && void 0 === r.stack) && l.push(r.stack), 
                r.index === n)) break;
                return l.length || l.push(void 0), l;
            }
            _getStackCount(n) {
                return this._getStacks(void 0, n).length;
            }
            _getStackIndex(n, o, r) {
                const s = this._getStacks(n, r), a = void 0 !== o ? s.indexOf(o) : -1;
                return -1 === a ? s.length - 1 : a;
            }
            _getRuler() {
                const n = this.options, o = this._cachedMeta, r = o.iScale, s = [];
                let a, l;
                for (a = 0, l = o.data.length; a < l; ++a) s.push(r.getPixelForValue(this.getParsed(a)[r.axis], a));
                const h = n.barThickness;
                return {
                    min: h || computeMinSampleSize(o),
                    pixels: s,
                    start: r._startPixel,
                    end: r._endPixel,
                    stackCount: this._getStackCount(),
                    scale: r,
                    grouped: n.grouped,
                    ratio: h ? 1 : n.categoryPercentage * n.barPercentage
                };
            }
            _calculateBarValuePixels(n) {
                const {_cachedMeta: {vScale: o, _stacked: r}, options: {base: s, minBarLength: a}} = this, l = s || 0, h = this.getParsed(n), p = h._custom, x = isFloatBar(p);
                let _, y, v = h[o.axis], w = 0, k = r ? this.applyStack(o, h, r) : v;
                k !== v && (w = k - v, k = v), x && (v = p.barStart, k = p.barEnd - p.barStart, 
                0 !== v && S(v) !== S(p.barEnd) && (w = 0), w += v);
                const P = isNullOrUndef(s) || x ? w : s;
                let A = o.getPixelForValue(P);
                if (_ = this.chart.getDataVisibility(n) ? o.getPixelForValue(w + k) : A, y = _ - A, 
                Math.abs(y) < a) {
                    y = function(n, o, r) {
                        return 0 !== n ? S(n) : (o.isHorizontal() ? 1 : -1) * (o.min >= r ? 1 : -1);
                    }(y, o, l) * a, v === l && (A -= y / 2);
                    const n = o.getPixelForDecimal(0), r = o.getPixelForDecimal(1), s = Math.min(n, r), h = Math.max(n, r);
                    A = Math.max(Math.min(A, h), s), _ = A + y;
                }
                if (A === o.getPixelForValue(l)) {
                    const n = S(y) * o.getLineWidthForValue(l) / 2;
                    A += n, y -= n;
                }
                return {
                    size: y,
                    base: A,
                    head: _,
                    center: _ + y / 2
                };
            }
            _calculateBarIndexPixels(n, o) {
                const r = o.scale, s = this.options, a = s.skipNull, l = valueOrDefault(s.maxBarThickness, 1 / 0);
                let h, p;
                if (o.grouped) {
                    const r = a ? this._getStackCount(n) : o.stackCount, x = "flex" === s.barThickness ? function(n, o, r, s) {
                        const a = o.pixels, l = a[n];
                        let h = n > 0 ? a[n - 1] : null, p = n < a.length - 1 ? a[n + 1] : null;
                        const x = r.categoryPercentage;
                        null === h && (h = l - (null === p ? o.end - o.start : p - l)), null === p && (p = l + l - h);
                        const _ = l - (l - Math.min(h, p)) / 2 * x;
                        return {
                            chunk: Math.abs(p - h) / 2 * x / s,
                            ratio: r.barPercentage,
                            start: _
                        };
                    }(n, o, s, r) : function(n, o, r, s) {
                        const a = r.barThickness;
                        let l, h;
                        return isNullOrUndef(a) ? (l = o.min * r.categoryPercentage, h = r.barPercentage) : (l = a * s, 
                        h = 1), {
                            chunk: l / s,
                            ratio: h,
                            start: o.pixels[n] - l / 2
                        };
                    }(n, o, s, r), _ = this._getStackIndex(this.index, this._cachedMeta.stack, a ? n : void 0);
                    h = x.start + x.chunk * _ + x.chunk / 2, p = Math.min(l, x.chunk * x.ratio);
                } else h = r.getPixelForValue(this.getParsed(n)[r.axis], n), p = Math.min(l, o.min * o.ratio);
                return {
                    base: h - p / 2,
                    head: h + p / 2,
                    center: h,
                    size: p
                };
            }
            draw() {
                const n = this._cachedMeta, o = n.vScale, r = n.data, s = r.length;
                let a = 0;
                for (;a < s; ++a) null !== this.getParsed(a)[o.axis] && r[a].draw(this._ctx);
            }
        }
        BarController.id = "bar", BarController.defaults = {
            datasetElementType: !1,
            dataElementType: "bar",
            categoryPercentage: .8,
            barPercentage: .9,
            grouped: !0,
            animations: {
                numbers: {
                    type: "number",
                    properties: [ "x", "y", "base", "width", "height" ]
                }
            }
        }, BarController.overrides = {
            scales: {
                _index_: {
                    type: "category",
                    offset: !0,
                    grid: {
                        offset: !0
                    }
                },
                _value_: {
                    type: "linear",
                    beginAtZero: !0
                }
            }
        };
        class BubbleController extends DatasetController {
            initialize() {
                this.enableOptionSharing = !0, super.initialize();
            }
            parsePrimitiveData(n, o, r, s) {
                const a = super.parsePrimitiveData(n, o, r, s);
                for (let n = 0; n < a.length; n++) a[n]._custom = this.resolveDataElementOptions(n + r).radius;
                return a;
            }
            parseArrayData(n, o, r, s) {
                const a = super.parseArrayData(n, o, r, s);
                for (let n = 0; n < a.length; n++) {
                    const s = o[r + n];
                    a[n]._custom = valueOrDefault(s[2], this.resolveDataElementOptions(n + r).radius);
                }
                return a;
            }
            parseObjectData(n, o, r, s) {
                const a = super.parseObjectData(n, o, r, s);
                for (let n = 0; n < a.length; n++) {
                    const s = o[r + n];
                    a[n]._custom = valueOrDefault(s && s.r && +s.r, this.resolveDataElementOptions(n + r).radius);
                }
                return a;
            }
            getMaxOverflow() {
                const n = this._cachedMeta.data;
                let o = 0;
                for (let r = n.length - 1; r >= 0; --r) o = Math.max(o, n[r].size(this.resolveDataElementOptions(r)) / 2);
                return o > 0 && o;
            }
            getLabelAndValue(n) {
                const o = this._cachedMeta, {xScale: r, yScale: s} = o, a = this.getParsed(n), l = r.getLabelForValue(a.x), h = s.getLabelForValue(a.y), p = a._custom;
                return {
                    label: o.label,
                    value: "(" + l + ", " + h + (p ? ", " + p : "") + ")"
                };
            }
            update(n) {
                const o = this._cachedMeta.data;
                this.updateElements(o, 0, o.length, n);
            }
            updateElements(n, o, r, s) {
                const a = "reset" === s, {iScale: l, vScale: h} = this._cachedMeta, {sharedOptions: p, includeOptions: x} = this._getSharedOptions(o, s), _ = l.axis, y = h.axis;
                for (let v = o; v < o + r; v++) {
                    const o = n[v], r = !a && this.getParsed(v), w = {}, k = w[_] = a ? l.getPixelForDecimal(.5) : l.getPixelForValue(r[_]), S = w[y] = a ? h.getBasePixel() : h.getPixelForValue(r[y]);
                    w.skip = isNaN(k) || isNaN(S), x && (w.options = p || this.resolveDataElementOptions(v, o.active ? "active" : s), 
                    a && (w.options.radius = 0)), this.updateElement(o, v, w, s);
                }
            }
            resolveDataElementOptions(n, o) {
                const r = this.getParsed(n);
                let s = super.resolveDataElementOptions(n, o);
                s.$shared && (s = Object.assign({}, s, {
                    $shared: !1
                }));
                const a = s.radius;
                return "active" !== o && (s.radius = 0), s.radius += valueOrDefault(r && r._custom, a), 
                s;
            }
        }
        BubbleController.id = "bubble", BubbleController.defaults = {
            datasetElementType: !1,
            dataElementType: "point",
            animations: {
                numbers: {
                    type: "number",
                    properties: [ "x", "y", "borderWidth", "radius" ]
                }
            }
        }, BubbleController.overrides = {
            scales: {
                x: {
                    type: "linear"
                },
                y: {
                    type: "linear"
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        title: () => ""
                    }
                }
            }
        };
        class DoughnutController extends DatasetController {
            constructor(n, o) {
                super(n, o), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, 
                this.offsetX = void 0, this.offsetY = void 0;
            }
            linkScales() {}
            parse(n, o) {
                const r = this.getDataset().data, s = this._cachedMeta;
                if (!1 === this._parsing) s._parsed = r; else {
                    let a, l, getter = n => +r[n];
                    if (isObject(r[n])) {
                        const {key: n = "value"} = this._parsing;
                        getter = o => +resolveObjectKey(r[o], n);
                    }
                    for (a = n, l = n + o; a < l; ++a) s._parsed[a] = getter(a);
                }
            }
            _getRotation() {
                return toRadians(this.options.rotation - 90);
            }
            _getCircumference() {
                return toRadians(this.options.circumference);
            }
            _getRotationExtents() {
                let n = h, o = -h;
                for (let r = 0; r < this.chart.data.datasets.length; ++r) if (this.chart.isDatasetVisible(r)) {
                    const s = this.chart.getDatasetMeta(r).controller, a = s._getRotation(), l = s._getCircumference();
                    n = Math.min(n, a), o = Math.max(o, a + l);
                }
                return {
                    rotation: n,
                    circumference: o - n
                };
            }
            update(n) {
                const o = this.chart, {chartArea: r} = o, s = this._cachedMeta, a = s.data, p = this.getMaxBorderWidth() + this.getMaxOffset(a) + this.options.spacing, x = Math.max((Math.min(r.width, r.height) - p) / 2, 0), _ = Math.min((v = this.options.cutout, 
                w = x, "string" == typeof v && v.endsWith("%") ? parseFloat(v) / 100 : v / w), 1);
                var v, w;
                const k = this._getRingWeight(this.index), {circumference: S, rotation: P} = this._getRotationExtents(), {ratioX: A, ratioY: T, offsetX: R, offsetY: O} = function(n, o, r) {
                    let s = 1, a = 1, p = 0, x = 0;
                    if (o < h) {
                        const h = n, _ = h + o, v = Math.cos(h), w = Math.sin(h), k = Math.cos(_), S = Math.sin(_), calcMax = (n, o, s) => _angleBetween(n, h, _, !0) ? 1 : Math.max(o, o * r, s, s * r), calcMin = (n, o, s) => _angleBetween(n, h, _, !0) ? -1 : Math.min(o, o * r, s, s * r), P = calcMax(0, v, k), A = calcMax(y, w, S), T = calcMin(l, v, k), R = calcMin(l + y, w, S);
                        s = (P - T) / 2, a = (A - R) / 2, p = -(P + T) / 2, x = -(A + R) / 2;
                    }
                    return {
                        ratioX: s,
                        ratioY: a,
                        offsetX: p,
                        offsetY: x
                    };
                }(P, S, _), C = (r.width - p) / A, z = (r.height - p) / T, M = Math.max(Math.min(C, z) / 2, 0), I = toDimension(this.options.radius, M), E = (I - Math.max(I * _, 0)) / this._getVisibleDatasetWeightTotal();
                this.offsetX = R * I, this.offsetY = O * I, s.total = this.calculateTotal(), this.outerRadius = I - E * this._getRingWeightOffset(this.index), 
                this.innerRadius = Math.max(this.outerRadius - E * k, 0), this.updateElements(a, 0, a.length, n);
            }
            _circumference(n, o) {
                const r = this.options, s = this._cachedMeta, a = this._getCircumference();
                return o && r.animation.animateRotate || !this.chart.getDataVisibility(n) || null === s._parsed[n] || s.data[n].hidden ? 0 : this.calculateCircumference(s._parsed[n] * a / h);
            }
            updateElements(n, o, r, s) {
                const a = "reset" === s, l = this.chart, h = l.chartArea, p = l.options.animation, x = (h.left + h.right) / 2, _ = (h.top + h.bottom) / 2, y = a && p.animateScale, v = y ? 0 : this.innerRadius, w = y ? 0 : this.outerRadius, {sharedOptions: k, includeOptions: S} = this._getSharedOptions(o, s);
                let P, A = this._getRotation();
                for (P = 0; P < o; ++P) A += this._circumference(P, a);
                for (P = o; P < o + r; ++P) {
                    const o = this._circumference(P, a), r = n[P], l = {
                        x: x + this.offsetX,
                        y: _ + this.offsetY,
                        startAngle: A,
                        endAngle: A + o,
                        circumference: o,
                        outerRadius: w,
                        innerRadius: v
                    };
                    S && (l.options = k || this.resolveDataElementOptions(P, r.active ? "active" : s)), 
                    A += o, this.updateElement(r, P, l, s);
                }
            }
            calculateTotal() {
                const n = this._cachedMeta, o = n.data;
                let r, s = 0;
                for (r = 0; r < o.length; r++) {
                    const a = n._parsed[r];
                    null === a || isNaN(a) || !this.chart.getDataVisibility(r) || o[r].hidden || (s += Math.abs(a));
                }
                return s;
            }
            calculateCircumference(n) {
                const o = this._cachedMeta.total;
                return o > 0 && !isNaN(n) ? h * (Math.abs(n) / o) : 0;
            }
            getLabelAndValue(n) {
                const o = this._cachedMeta, r = this.chart, s = r.data.labels || [], a = formatNumber(o._parsed[n], r.options.locale);
                return {
                    label: s[n] || "",
                    value: a
                };
            }
            getMaxBorderWidth(n) {
                let o = 0;
                const r = this.chart;
                let s, a, l, h, p;
                if (!n) for (s = 0, a = r.data.datasets.length; s < a; ++s) if (r.isDatasetVisible(s)) {
                    l = r.getDatasetMeta(s), n = l.data, h = l.controller;
                    break;
                }
                if (!n) return 0;
                for (s = 0, a = n.length; s < a; ++s) p = h.resolveDataElementOptions(s), "inner" !== p.borderAlign && (o = Math.max(o, p.borderWidth || 0, p.hoverBorderWidth || 0));
                return o;
            }
            getMaxOffset(n) {
                let o = 0;
                for (let r = 0, s = n.length; r < s; ++r) {
                    const n = this.resolveDataElementOptions(r);
                    o = Math.max(o, n.offset || 0, n.hoverOffset || 0);
                }
                return o;
            }
            _getRingWeightOffset(n) {
                let o = 0;
                for (let r = 0; r < n; ++r) this.chart.isDatasetVisible(r) && (o += this._getRingWeight(r));
                return o;
            }
            _getRingWeight(n) {
                return Math.max(valueOrDefault(this.chart.data.datasets[n].weight, 1), 0);
            }
            _getVisibleDatasetWeightTotal() {
                return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
            }
        }
        DoughnutController.id = "doughnut", DoughnutController.defaults = {
            datasetElementType: !1,
            dataElementType: "arc",
            animation: {
                animateRotate: !0,
                animateScale: !1
            },
            animations: {
                numbers: {
                    type: "number",
                    properties: [ "circumference", "endAngle", "innerRadius", "outerRadius", "startAngle", "x", "y", "offset", "borderWidth", "spacing" ]
                }
            },
            cutout: "50%",
            rotation: 0,
            circumference: 360,
            radius: "100%",
            spacing: 0,
            indexAxis: "r"
        }, DoughnutController.descriptors = {
            _scriptable: n => "spacing" !== n,
            _indexable: n => "spacing" !== n
        }, DoughnutController.overrides = {
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {
                        generateLabels(n) {
                            const o = n.data;
                            if (o.labels.length && o.datasets.length) {
                                const {labels: {pointStyle: r}} = n.legend.options;
                                return o.labels.map(((o, s) => {
                                    const a = n.getDatasetMeta(0).controller.getStyle(s);
                                    return {
                                        text: o,
                                        fillStyle: a.backgroundColor,
                                        strokeStyle: a.borderColor,
                                        lineWidth: a.borderWidth,
                                        pointStyle: r,
                                        hidden: !n.getDataVisibility(s),
                                        index: s
                                    };
                                }));
                            }
                            return [];
                        }
                    },
                    onClick(n, o, r) {
                        r.chart.toggleDataVisibility(o.index), r.chart.update();
                    }
                },
                tooltip: {
                    callbacks: {
                        title: () => "",
                        label(n) {
                            let o = n.label;
                            const r = ": " + n.formattedValue;
                            return isArray(o) ? (o = o.slice(), o[0] += r) : o += r, o;
                        }
                    }
                }
            }
        };
        class LineController extends DatasetController {
            initialize() {
                this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
            }
            update(n) {
                const o = this._cachedMeta, {dataset: r, data: s = [], _dataset: a} = o, l = this.chart._animationsDisabled;
                let {start: h, count: p} = _getStartAndCountOfVisiblePoints(o, s, l);
                this._drawStart = h, this._drawCount = p, _scaleRangesChanged(o) && (h = 0, p = s.length), 
                r._chart = this.chart, r._datasetIndex = this.index, r._decimated = !!a._decimated, 
                r.points = s;
                const x = this.resolveDatasetElementOptions(n);
                this.options.showLine || (x.borderWidth = 0), x.segment = this.options.segment, 
                this.updateElement(r, void 0, {
                    animated: !l,
                    options: x
                }, n), this.updateElements(s, h, p, n);
            }
            updateElements(n, o, r, s) {
                const a = "reset" === s, {iScale: l, vScale: h, _stacked: p, _dataset: x} = this._cachedMeta, {sharedOptions: _, includeOptions: y} = this._getSharedOptions(o, s), v = l.axis, w = h.axis, {spanGaps: k, segment: S} = this.options, P = isNumber(k) ? k : Number.POSITIVE_INFINITY, A = this.chart._animationsDisabled || a || "none" === s;
                let T = o > 0 && this.getParsed(o - 1);
                for (let k = o; k < o + r; ++k) {
                    const o = n[k], r = this.getParsed(k), R = A ? o : {}, O = isNullOrUndef(r[w]), C = R[v] = l.getPixelForValue(r[v], k), z = R[w] = a || O ? h.getBasePixel() : h.getPixelForValue(p ? this.applyStack(h, r, p) : r[w], k);
                    R.skip = isNaN(C) || isNaN(z) || O, R.stop = k > 0 && Math.abs(r[v] - T[v]) > P, 
                    S && (R.parsed = r, R.raw = x.data[k]), y && (R.options = _ || this.resolveDataElementOptions(k, o.active ? "active" : s)), 
                    A || this.updateElement(o, k, R, s), T = r;
                }
            }
            getMaxOverflow() {
                const n = this._cachedMeta, o = n.dataset, r = o.options && o.options.borderWidth || 0, s = n.data || [];
                if (!s.length) return r;
                const a = s[0].size(this.resolveDataElementOptions(0)), l = s[s.length - 1].size(this.resolveDataElementOptions(s.length - 1));
                return Math.max(r, a, l) / 2;
            }
            draw() {
                const n = this._cachedMeta;
                n.dataset.updateControlPoints(this.chart.chartArea, n.iScale.axis), super.draw();
            }
        }
        LineController.id = "line", LineController.defaults = {
            datasetElementType: "line",
            dataElementType: "point",
            showLine: !0,
            spanGaps: !1
        }, LineController.overrides = {
            scales: {
                _index_: {
                    type: "category"
                },
                _value_: {
                    type: "linear"
                }
            }
        };
        class PolarAreaController extends DatasetController {
            constructor(n, o) {
                super(n, o), this.innerRadius = void 0, this.outerRadius = void 0;
            }
            getLabelAndValue(n) {
                const o = this._cachedMeta, r = this.chart, s = r.data.labels || [], a = formatNumber(o._parsed[n].r, r.options.locale);
                return {
                    label: s[n] || "",
                    value: a
                };
            }
            parseObjectData(n, o, r, s) {
                return _parseObjectDataRadialScale.bind(this)(n, o, r, s);
            }
            update(n) {
                const o = this._cachedMeta.data;
                this._updateRadius(), this.updateElements(o, 0, o.length, n);
            }
            getMinMax() {
                const n = this._cachedMeta, o = {
                    min: Number.POSITIVE_INFINITY,
                    max: Number.NEGATIVE_INFINITY
                };
                return n.data.forEach(((n, r) => {
                    const s = this.getParsed(r).r;
                    !isNaN(s) && this.chart.getDataVisibility(r) && (s < o.min && (o.min = s), s > o.max && (o.max = s));
                })), o;
            }
            _updateRadius() {
                const n = this.chart, o = n.chartArea, r = n.options, s = Math.min(o.right - o.left, o.bottom - o.top), a = Math.max(s / 2, 0), l = (a - Math.max(r.cutoutPercentage ? a / 100 * r.cutoutPercentage : 1, 0)) / n.getVisibleDatasetCount();
                this.outerRadius = a - l * this.index, this.innerRadius = this.outerRadius - l;
            }
            updateElements(n, o, r, s) {
                const a = "reset" === s, h = this.chart, p = h.options.animation, x = this._cachedMeta.rScale, _ = x.xCenter, y = x.yCenter, v = x.getIndexAngle(0) - .5 * l;
                let w, k = v;
                const S = 360 / this.countVisibleElements();
                for (w = 0; w < o; ++w) k += this._computeAngle(w, s, S);
                for (w = o; w < o + r; w++) {
                    const o = n[w];
                    let r = k, l = k + this._computeAngle(w, s, S), P = h.getDataVisibility(w) ? x.getDistanceFromCenterForValue(this.getParsed(w).r) : 0;
                    k = l, a && (p.animateScale && (P = 0), p.animateRotate && (r = l = v));
                    const A = {
                        x: _,
                        y,
                        innerRadius: 0,
                        outerRadius: P,
                        startAngle: r,
                        endAngle: l,
                        options: this.resolveDataElementOptions(w, o.active ? "active" : s)
                    };
                    this.updateElement(o, w, A, s);
                }
            }
            countVisibleElements() {
                const n = this._cachedMeta;
                let o = 0;
                return n.data.forEach(((n, r) => {
                    !isNaN(this.getParsed(r).r) && this.chart.getDataVisibility(r) && o++;
                })), o;
            }
            _computeAngle(n, o, r) {
                return this.chart.getDataVisibility(n) ? toRadians(this.resolveDataElementOptions(n, o).angle || r) : 0;
            }
        }
        PolarAreaController.id = "polarArea", PolarAreaController.defaults = {
            dataElementType: "arc",
            animation: {
                animateRotate: !0,
                animateScale: !0
            },
            animations: {
                numbers: {
                    type: "number",
                    properties: [ "x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius" ]
                }
            },
            indexAxis: "r",
            startAngle: 0
        }, PolarAreaController.overrides = {
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {
                        generateLabels(n) {
                            const o = n.data;
                            if (o.labels.length && o.datasets.length) {
                                const {labels: {pointStyle: r}} = n.legend.options;
                                return o.labels.map(((o, s) => {
                                    const a = n.getDatasetMeta(0).controller.getStyle(s);
                                    return {
                                        text: o,
                                        fillStyle: a.backgroundColor,
                                        strokeStyle: a.borderColor,
                                        lineWidth: a.borderWidth,
                                        pointStyle: r,
                                        hidden: !n.getDataVisibility(s),
                                        index: s
                                    };
                                }));
                            }
                            return [];
                        }
                    },
                    onClick(n, o, r) {
                        r.chart.toggleDataVisibility(o.index), r.chart.update();
                    }
                },
                tooltip: {
                    callbacks: {
                        title: () => "",
                        label: n => n.chart.data.labels[n.dataIndex] + ": " + n.formattedValue
                    }
                }
            },
            scales: {
                r: {
                    type: "radialLinear",
                    angleLines: {
                        display: !1
                    },
                    beginAtZero: !0,
                    grid: {
                        circular: !0
                    },
                    pointLabels: {
                        display: !1
                    },
                    startAngle: 0
                }
            }
        };
        class PieController extends DoughnutController {}
        PieController.id = "pie", PieController.defaults = {
            cutout: 0,
            rotation: 0,
            circumference: 360,
            radius: "100%"
        };
        class RadarController extends DatasetController {
            getLabelAndValue(n) {
                const o = this._cachedMeta.vScale, r = this.getParsed(n);
                return {
                    label: o.getLabels()[n],
                    value: "" + o.getLabelForValue(r[o.axis])
                };
            }
            parseObjectData(n, o, r, s) {
                return _parseObjectDataRadialScale.bind(this)(n, o, r, s);
            }
            update(n) {
                const o = this._cachedMeta, r = o.dataset, s = o.data || [], a = o.iScale.getLabels();
                if (r.points = s, "resize" !== n) {
                    const o = this.resolveDatasetElementOptions(n);
                    this.options.showLine || (o.borderWidth = 0);
                    const l = {
                        _loop: !0,
                        _fullLoop: a.length === s.length,
                        options: o
                    };
                    this.updateElement(r, void 0, l, n);
                }
                this.updateElements(s, 0, s.length, n);
            }
            updateElements(n, o, r, s) {
                const a = this._cachedMeta.rScale, l = "reset" === s;
                for (let h = o; h < o + r; h++) {
                    const o = n[h], r = this.resolveDataElementOptions(h, o.active ? "active" : s), p = a.getPointPositionForValue(h, this.getParsed(h).r), x = l ? a.xCenter : p.x, _ = l ? a.yCenter : p.y, y = {
                        x,
                        y: _,
                        angle: p.angle,
                        skip: isNaN(x) || isNaN(_),
                        options: r
                    };
                    this.updateElement(o, h, y, s);
                }
            }
        }
        RadarController.id = "radar", RadarController.defaults = {
            datasetElementType: "line",
            dataElementType: "point",
            indexAxis: "r",
            showLine: !0,
            elements: {
                line: {
                    fill: "start"
                }
            }
        }, RadarController.overrides = {
            aspectRatio: 1,
            scales: {
                r: {
                    type: "radialLinear"
                }
            }
        };
        class Element {
            constructor() {
                this.x = void 0, this.y = void 0, this.active = !1, this.options = void 0, this.$animations = void 0;
            }
            tooltipPosition(n) {
                const {x: o, y: r} = this.getProps([ "x", "y" ], n);
                return {
                    x: o,
                    y: r
                };
            }
            hasValue() {
                return isNumber(this.x) && isNumber(this.y);
            }
            getProps(n, o) {
                const r = this.$animations;
                if (!o || !r) return this;
                const s = {};
                return n.forEach((n => {
                    s[n] = r[n] && r[n].active() ? r[n]._to : this[n];
                })), s;
            }
        }
        Element.defaults = {}, Element.defaultRoutes = void 0;
        const Z = {
            values: n => isArray(n) ? n : "" + n,
            numeric(n, o, r) {
                if (0 === n) return "0";
                const s = this.chart.options.locale;
                let a, l = n;
                if (r.length > 1) {
                    const o = Math.max(Math.abs(r[0].value), Math.abs(r[r.length - 1].value));
                    (o < 1e-4 || o > 1e15) && (a = "scientific"), l = function(n, o) {
                        let r = o.length > 3 ? o[2].value - o[1].value : o[1].value - o[0].value;
                        Math.abs(r) >= 1 && n !== Math.floor(n) && (r = n - Math.floor(n));
                        return r;
                    }(n, r);
                }
                const h = k(Math.abs(l)), p = Math.max(Math.min(-1 * Math.floor(h), 20), 0), x = {
                    notation: a,
                    minimumFractionDigits: p,
                    maximumFractionDigits: p
                };
                return Object.assign(x, this.options.ticks.format), formatNumber(n, s, x);
            },
            logarithmic(n, o, r) {
                if (0 === n) return "0";
                const s = n / Math.pow(10, Math.floor(k(n)));
                return 1 === s || 2 === s || 5 === s ? Z.numeric.call(this, n, o, r) : "";
            }
        };
        var Q = {
            formatters: Z
        };
        function autoSkip(n, o) {
            const r = n.options.ticks, s = r.maxTicksLimit || function(n) {
                const o = n.options.offset, r = n._tickSize(), s = n._length / r + (o ? 0 : 1), a = n._maxLength / r;
                return Math.floor(Math.min(s, a));
            }(n), a = r.major.enabled ? function(n) {
                const o = [];
                let r, s;
                for (r = 0, s = n.length; r < s; r++) n[r].major && o.push(r);
                return o;
            }(o) : [], l = a.length, h = a[0], p = a[l - 1], x = [];
            if (l > s) return function(n, o, r, s) {
                let a, l = 0, h = r[0];
                for (s = Math.ceil(s), a = 0; a < n.length; a++) a === h && (o.push(n[a]), l++, 
                h = r[l * s]);
            }(o, x, a, l / s), x;
            const _ = function(n, o, r) {
                const s = function(n) {
                    const o = n.length;
                    let r, s;
                    if (o < 2) return !1;
                    for (s = n[0], r = 1; r < o; ++r) if (n[r] - n[r - 1] !== s) return !1;
                    return s;
                }(n), a = o.length / r;
                if (!s) return Math.max(a, 1);
                const l = function(n) {
                    const o = [], r = Math.sqrt(n);
                    let s;
                    for (s = 1; s < r; s++) n % s == 0 && (o.push(s), o.push(n / s));
                    return r === (0 | r) && o.push(r), o.sort(((n, o) => n - o)).pop(), o;
                }(s);
                for (let n = 0, o = l.length - 1; n < o; n++) {
                    const o = l[n];
                    if (o > a) return o;
                }
                return Math.max(a, 1);
            }(a, o, s);
            if (l > 0) {
                let n, r;
                const s = l > 1 ? Math.round((p - h) / (l - 1)) : null;
                for (skip(o, x, _, isNullOrUndef(s) ? 0 : h - s, h), n = 0, r = l - 1; n < r; n++) skip(o, x, _, a[n], a[n + 1]);
                return skip(o, x, _, p, isNullOrUndef(s) ? o.length : p + s), x;
            }
            return skip(o, x, _), x;
        }
        function skip(n, o, r, s, a) {
            const l = valueOrDefault(s, 0), h = Math.min(valueOrDefault(a, n.length), n.length);
            let p, x, _, y = 0;
            for (r = Math.ceil(r), a && (p = a - s, r = p / Math.floor(p / r)), _ = l; _ < 0; ) y++, 
            _ = Math.round(l + y * r);
            for (x = Math.max(l, 0); x < h; x++) x === _ && (o.push(n[x]), y++, _ = Math.round(l + y * r));
        }
        F.set("scale", {
            display: !0,
            offset: !1,
            reverse: !1,
            beginAtZero: !1,
            bounds: "ticks",
            grace: 0,
            grid: {
                display: !0,
                lineWidth: 1,
                drawBorder: !0,
                drawOnChartArea: !0,
                drawTicks: !0,
                tickLength: 8,
                tickWidth: (n, o) => o.lineWidth,
                tickColor: (n, o) => o.color,
                offset: !1,
                borderDash: [],
                borderDashOffset: 0,
                borderWidth: 1
            },
            title: {
                display: !1,
                text: "",
                padding: {
                    top: 4,
                    bottom: 4
                }
            },
            ticks: {
                minRotation: 0,
                maxRotation: 50,
                mirror: !1,
                textStrokeWidth: 0,
                textStrokeColor: "",
                padding: 3,
                display: !0,
                autoSkip: !0,
                autoSkipPadding: 3,
                labelOffset: 0,
                callback: Q.formatters.values,
                minor: {},
                major: {},
                align: "center",
                crossAlign: "near",
                showLabelBackdrop: !1,
                backdropColor: "rgba(255, 255, 255, 0.75)",
                backdropPadding: 2
            }
        }), F.route("scale.ticks", "color", "", "color"), F.route("scale.grid", "color", "", "borderColor"), 
        F.route("scale.grid", "borderColor", "", "borderColor"), F.route("scale.title", "color", "", "color"), 
        F.describe("scale", {
            _fallback: !1,
            _scriptable: n => !n.startsWith("before") && !n.startsWith("after") && "callback" !== n && "parser" !== n,
            _indexable: n => "borderDash" !== n && "tickBorderDash" !== n
        }), F.describe("scales", {
            _fallback: "scale"
        }), F.describe("scale.ticks", {
            _scriptable: n => "backdropPadding" !== n && "callback" !== n,
            _indexable: n => "backdropPadding" !== n
        });
        const offsetFromEdge = (n, o, r) => "top" === o || "left" === o ? n[o] + r : n[o] - r;
        function sample(n, o) {
            const r = [], s = n.length / o, a = n.length;
            let l = 0;
            for (;l < a; l += s) r.push(n[Math.floor(l)]);
            return r;
        }
        function getPixelForGridLine(n, o, r) {
            const s = n.ticks.length, a = Math.min(o, s - 1), l = n._startPixel, h = n._endPixel, p = 1e-6;
            let x, _ = n.getPixelForTick(a);
            if (!(r && (x = 1 === s ? Math.max(_ - l, h - _) : 0 === o ? (n.getPixelForTick(1) - _) / 2 : (_ - n.getPixelForTick(a - 1)) / 2, 
            _ += a < o ? x : -x, _ < l - p || _ > h + p))) return _;
        }
        function getTickMarkLength(n) {
            return n.drawTicks ? n.tickLength : 0;
        }
        function getTitleHeight(n, o) {
            if (!n.display) return 0;
            const r = toFont(n.font, o), s = toPadding(n.padding);
            return (isArray(n.text) ? n.text.length : 1) * r.lineHeight + s.height;
        }
        function titleAlign(n, o, r) {
            let s = _toLeftRightCenter(n);
            return (r && "right" !== o || !r && "right" === o) && (s = (n => "left" === n ? "right" : "right" === n ? "left" : n)(s)), 
            s;
        }
        class Scale extends Element {
            constructor(n) {
                super(), this.id = n.id, this.type = n.type, this.options = void 0, this.ctx = n.ctx, 
                this.chart = n.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, 
                this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, 
                this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, 
                this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, 
                this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, 
                this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, 
                this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, 
                this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, 
                this._dataLimitsCached = !1, this.$context = void 0;
            }
            init(n) {
                this.options = n.setContext(this.getContext()), this.axis = n.axis, this._userMin = this.parse(n.min), 
                this._userMax = this.parse(n.max), this._suggestedMin = this.parse(n.suggestedMin), 
                this._suggestedMax = this.parse(n.suggestedMax);
            }
            parse(n, o) {
                return n;
            }
            getUserBounds() {
                let {_userMin: n, _userMax: o, _suggestedMin: r, _suggestedMax: s} = this;
                return n = finiteOrDefault(n, Number.POSITIVE_INFINITY), o = finiteOrDefault(o, Number.NEGATIVE_INFINITY), 
                r = finiteOrDefault(r, Number.POSITIVE_INFINITY), s = finiteOrDefault(s, Number.NEGATIVE_INFINITY), 
                {
                    min: finiteOrDefault(n, r),
                    max: finiteOrDefault(o, s),
                    minDefined: isNumberFinite(n),
                    maxDefined: isNumberFinite(o)
                };
            }
            getMinMax(n) {
                let o, {min: r, max: s, minDefined: a, maxDefined: l} = this.getUserBounds();
                if (a && l) return {
                    min: r,
                    max: s
                };
                const h = this.getMatchingVisibleMetas();
                for (let p = 0, x = h.length; p < x; ++p) o = h[p].controller.getMinMax(this, n), 
                a || (r = Math.min(r, o.min)), l || (s = Math.max(s, o.max));
                return r = l && r > s ? s : r, s = a && r > s ? r : s, {
                    min: finiteOrDefault(r, finiteOrDefault(s, r)),
                    max: finiteOrDefault(s, finiteOrDefault(r, s))
                };
            }
            getPadding() {
                return {
                    left: this.paddingLeft || 0,
                    top: this.paddingTop || 0,
                    right: this.paddingRight || 0,
                    bottom: this.paddingBottom || 0
                };
            }
            getTicks() {
                return this.ticks;
            }
            getLabels() {
                const n = this.chart.data;
                return this.options.labels || (this.isHorizontal() ? n.xLabels : n.yLabels) || n.labels || [];
            }
            beforeLayout() {
                this._cache = {}, this._dataLimitsCached = !1;
            }
            beforeUpdate() {
                callback(this.options.beforeUpdate, [ this ]);
            }
            update(n, o, r) {
                const {beginAtZero: s, grace: a, ticks: l} = this.options, h = l.sampleSize;
                this.beforeUpdate(), this.maxWidth = n, this.maxHeight = o, this._margins = r = Object.assign({
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }, r), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, 
                this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + r.left + r.right : this.height + r.top + r.bottom, 
                this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), 
                this.afterDataLimits(), this._range = function(n, o, r) {
                    const {min: s, max: a} = n, l = toDimension(o, (a - s) / 2), keepZero = (n, o) => r && 0 === n ? 0 : n + o;
                    return {
                        min: keepZero(s, -Math.abs(l)),
                        max: keepZero(a, l)
                    };
                }(this, a, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], 
                this.afterBuildTicks();
                const p = h < this.ticks.length;
                this._convertTicksToLabels(p ? sample(this.ticks, h) : this.ticks), this.configure(), 
                this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), 
                l.display && (l.autoSkip || "auto" === l.source) && (this.ticks = autoSkip(this, this.ticks), 
                this._labelSizes = null, this.afterAutoSkip()), p && this._convertTicksToLabels(this.ticks), 
                this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
            }
            configure() {
                let n, o, r = this.options.reverse;
                this.isHorizontal() ? (n = this.left, o = this.right) : (n = this.top, o = this.bottom, 
                r = !r), this._startPixel = n, this._endPixel = o, this._reversePixels = r, this._length = o - n, 
                this._alignToPixels = this.options.alignToPixels;
            }
            afterUpdate() {
                callback(this.options.afterUpdate, [ this ]);
            }
            beforeSetDimensions() {
                callback(this.options.beforeSetDimensions, [ this ]);
            }
            setDimensions() {
                this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, 
                this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, 
                this.paddingRight = 0, this.paddingBottom = 0;
            }
            afterSetDimensions() {
                callback(this.options.afterSetDimensions, [ this ]);
            }
            _callHooks(n) {
                this.chart.notifyPlugins(n, this.getContext()), callback(this.options[n], [ this ]);
            }
            beforeDataLimits() {
                this._callHooks("beforeDataLimits");
            }
            determineDataLimits() {}
            afterDataLimits() {
                this._callHooks("afterDataLimits");
            }
            beforeBuildTicks() {
                this._callHooks("beforeBuildTicks");
            }
            buildTicks() {
                return [];
            }
            afterBuildTicks() {
                this._callHooks("afterBuildTicks");
            }
            beforeTickToLabelConversion() {
                callback(this.options.beforeTickToLabelConversion, [ this ]);
            }
            generateTickLabels(n) {
                const o = this.options.ticks;
                let r, s, a;
                for (r = 0, s = n.length; r < s; r++) a = n[r], a.label = callback(o.callback, [ a.value, r, n ], this);
            }
            afterTickToLabelConversion() {
                callback(this.options.afterTickToLabelConversion, [ this ]);
            }
            beforeCalculateLabelRotation() {
                callback(this.options.beforeCalculateLabelRotation, [ this ]);
            }
            calculateLabelRotation() {
                const n = this.options, o = n.ticks, r = this.ticks.length, s = o.minRotation || 0, a = o.maxRotation;
                let l, h, p, x = s;
                if (!this._isVisible() || !o.display || s >= a || r <= 1 || !this.isHorizontal()) return void (this.labelRotation = s);
                const _ = this._getLabelSizes(), y = _.widest.width, v = _.highest.height, w = _limitValue(this.chart.width - y, 0, this.maxWidth);
                l = n.offset ? this.maxWidth / r : w / (r - 1), y + 6 > l && (l = w / (r - (n.offset ? .5 : 1)), 
                h = this.maxHeight - getTickMarkLength(n.grid) - o.padding - getTitleHeight(n.title, this.chart.options.font), 
                p = Math.sqrt(y * y + v * v), x = toDegrees(Math.min(Math.asin(_limitValue((_.highest.height + 6) / l, -1, 1)), Math.asin(_limitValue(h / p, -1, 1)) - Math.asin(_limitValue(v / p, -1, 1)))), 
                x = Math.max(s, Math.min(a, x))), this.labelRotation = x;
            }
            afterCalculateLabelRotation() {
                callback(this.options.afterCalculateLabelRotation, [ this ]);
            }
            afterAutoSkip() {}
            beforeFit() {
                callback(this.options.beforeFit, [ this ]);
            }
            fit() {
                const n = {
                    width: 0,
                    height: 0
                }, {chart: o, options: {ticks: r, title: s, grid: a}} = this, l = this._isVisible(), h = this.isHorizontal();
                if (l) {
                    const l = getTitleHeight(s, o.options.font);
                    if (h ? (n.width = this.maxWidth, n.height = getTickMarkLength(a) + l) : (n.height = this.maxHeight, 
                    n.width = getTickMarkLength(a) + l), r.display && this.ticks.length) {
                        const {first: o, last: s, widest: a, highest: l} = this._getLabelSizes(), p = 2 * r.padding, x = toRadians(this.labelRotation), _ = Math.cos(x), y = Math.sin(x);
                        if (h) {
                            const o = r.mirror ? 0 : y * a.width + _ * l.height;
                            n.height = Math.min(this.maxHeight, n.height + o + p);
                        } else {
                            const o = r.mirror ? 0 : _ * a.width + y * l.height;
                            n.width = Math.min(this.maxWidth, n.width + o + p);
                        }
                        this._calculatePadding(o, s, y, _);
                    }
                }
                this._handleMargins(), h ? (this.width = this._length = o.width - this._margins.left - this._margins.right, 
                this.height = n.height) : (this.width = n.width, this.height = this._length = o.height - this._margins.top - this._margins.bottom);
            }
            _calculatePadding(n, o, r, s) {
                const {ticks: {align: a, padding: l}, position: h} = this.options, p = 0 !== this.labelRotation, x = "top" !== h && "x" === this.axis;
                if (this.isHorizontal()) {
                    const h = this.getPixelForTick(0) - this.left, _ = this.right - this.getPixelForTick(this.ticks.length - 1);
                    let y = 0, v = 0;
                    p ? x ? (y = s * n.width, v = r * o.height) : (y = r * n.height, v = s * o.width) : "start" === a ? v = o.width : "end" === a ? y = n.width : "inner" !== a && (y = n.width / 2, 
                    v = o.width / 2), this.paddingLeft = Math.max((y - h + l) * this.width / (this.width - h), 0), 
                    this.paddingRight = Math.max((v - _ + l) * this.width / (this.width - _), 0);
                } else {
                    let r = o.height / 2, s = n.height / 2;
                    "start" === a ? (r = 0, s = n.height) : "end" === a && (r = o.height, s = 0), this.paddingTop = r + l, 
                    this.paddingBottom = s + l;
                }
            }
            _handleMargins() {
                this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), 
                this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), 
                this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
            }
            afterFit() {
                callback(this.options.afterFit, [ this ]);
            }
            isHorizontal() {
                const {axis: n, position: o} = this.options;
                return "top" === o || "bottom" === o || "x" === n;
            }
            isFullSize() {
                return this.options.fullSize;
            }
            _convertTicksToLabels(n) {
                let o, r;
                for (this.beforeTickToLabelConversion(), this.generateTickLabels(n), o = 0, r = n.length; o < r; o++) isNullOrUndef(n[o].label) && (n.splice(o, 1), 
                r--, o--);
                this.afterTickToLabelConversion();
            }
            _getLabelSizes() {
                let n = this._labelSizes;
                if (!n) {
                    const o = this.options.ticks.sampleSize;
                    let r = this.ticks;
                    o < r.length && (r = sample(r, o)), this._labelSizes = n = this._computeLabelSizes(r, r.length);
                }
                return n;
            }
            _computeLabelSizes(n, o) {
                const {ctx: r, _longestTextCache: s} = this, a = [], l = [];
                let h, p, x, _, y, v, w, k, S, P, A, T = 0, R = 0;
                for (h = 0; h < o; ++h) {
                    if (_ = n[h].label, y = this._resolveTickFontOptions(h), r.font = v = y.string, 
                    w = s[v] = s[v] || {
                        data: {},
                        gc: []
                    }, k = y.lineHeight, S = P = 0, isNullOrUndef(_) || isArray(_)) {
                        if (isArray(_)) for (p = 0, x = _.length; p < x; ++p) A = _[p], isNullOrUndef(A) || isArray(A) || (S = _measureText(r, w.data, w.gc, S, A), 
                        P += k);
                    } else S = _measureText(r, w.data, w.gc, S, _), P = k;
                    a.push(S), l.push(P), T = Math.max(S, T), R = Math.max(P, R);
                }
                !function(n, o) {
                    each(n, (n => {
                        const r = n.gc, s = r.length / 2;
                        let a;
                        if (s > o) {
                            for (a = 0; a < s; ++a) delete n.data[r[a]];
                            r.splice(0, s);
                        }
                    }));
                }(s, o);
                const O = a.indexOf(T), C = l.indexOf(R), valueAt = n => ({
                    width: a[n] || 0,
                    height: l[n] || 0
                });
                return {
                    first: valueAt(0),
                    last: valueAt(o - 1),
                    widest: valueAt(O),
                    highest: valueAt(C),
                    widths: a,
                    heights: l
                };
            }
            getLabelForValue(n) {
                return n;
            }
            getPixelForValue(n, o) {
                return NaN;
            }
            getValueForPixel(n) {}
            getPixelForTick(n) {
                const o = this.ticks;
                return n < 0 || n > o.length - 1 ? null : this.getPixelForValue(o[n].value);
            }
            getPixelForDecimal(n) {
                this._reversePixels && (n = 1 - n);
                const o = this._startPixel + n * this._length;
                return _limitValue(this._alignToPixels ? _alignPixel(this.chart, o, 0) : o, -32768, 32767);
            }
            getDecimalForPixel(n) {
                const o = (n - this._startPixel) / this._length;
                return this._reversePixels ? 1 - o : o;
            }
            getBasePixel() {
                return this.getPixelForValue(this.getBaseValue());
            }
            getBaseValue() {
                const {min: n, max: o} = this;
                return n < 0 && o < 0 ? o : n > 0 && o > 0 ? n : 0;
            }
            getContext(n) {
                const o = this.ticks || [];
                if (n >= 0 && n < o.length) {
                    const r = o[n];
                    return r.$context || (r.$context = function(n, o, r) {
                        return createContext(n, {
                            tick: r,
                            index: o,
                            type: "tick"
                        });
                    }(this.getContext(), n, r));
                }
                return this.$context || (this.$context = createContext(this.chart.getContext(), {
                    scale: this,
                    type: "scale"
                }));
            }
            _tickSize() {
                const n = this.options.ticks, o = toRadians(this.labelRotation), r = Math.abs(Math.cos(o)), s = Math.abs(Math.sin(o)), a = this._getLabelSizes(), l = n.autoSkipPadding || 0, h = a ? a.widest.width + l : 0, p = a ? a.highest.height + l : 0;
                return this.isHorizontal() ? p * r > h * s ? h / r : p / s : p * s < h * r ? p / r : h / s;
            }
            _isVisible() {
                const n = this.options.display;
                return "auto" !== n ? !!n : this.getMatchingVisibleMetas().length > 0;
            }
            _computeGridLineItems(n) {
                const o = this.axis, r = this.chart, s = this.options, {grid: a, position: l} = s, h = a.offset, p = this.isHorizontal(), x = this.ticks.length + (h ? 1 : 0), _ = getTickMarkLength(a), y = [], v = a.setContext(this.getContext()), w = v.drawBorder ? v.borderWidth : 0, k = w / 2, alignBorderValue = function(n) {
                    return _alignPixel(r, n, w);
                };
                let S, P, A, T, R, O, C, z, M, I, E, $;
                if ("top" === l) S = alignBorderValue(this.bottom), O = this.bottom - _, z = S - k, 
                I = alignBorderValue(n.top) + k, $ = n.bottom; else if ("bottom" === l) S = alignBorderValue(this.top), 
                I = n.top, $ = alignBorderValue(n.bottom) - k, O = S + k, z = this.top + _; else if ("left" === l) S = alignBorderValue(this.right), 
                R = this.right - _, C = S - k, M = alignBorderValue(n.left) + k, E = n.right; else if ("right" === l) S = alignBorderValue(this.left), 
                M = n.left, E = alignBorderValue(n.right) - k, R = S + k, C = this.left + _; else if ("x" === o) {
                    if ("center" === l) S = alignBorderValue((n.top + n.bottom) / 2 + .5); else if (isObject(l)) {
                        const n = Object.keys(l)[0], o = l[n];
                        S = alignBorderValue(this.chart.scales[n].getPixelForValue(o));
                    }
                    I = n.top, $ = n.bottom, O = S + k, z = O + _;
                } else if ("y" === o) {
                    if ("center" === l) S = alignBorderValue((n.left + n.right) / 2); else if (isObject(l)) {
                        const n = Object.keys(l)[0], o = l[n];
                        S = alignBorderValue(this.chart.scales[n].getPixelForValue(o));
                    }
                    R = S - k, C = R - _, M = n.left, E = n.right;
                }
                const N = valueOrDefault(s.ticks.maxTicksLimit, x), F = Math.max(1, Math.ceil(x / N));
                for (P = 0; P < x; P += F) {
                    const n = a.setContext(this.getContext(P)), o = n.lineWidth, s = n.color, l = n.borderDash || [], x = n.borderDashOffset, _ = n.tickWidth, v = n.tickColor, w = n.tickBorderDash || [], k = n.tickBorderDashOffset;
                    A = getPixelForGridLine(this, P, h), void 0 !== A && (T = _alignPixel(r, A, o), 
                    p ? R = C = M = E = T : O = z = I = $ = T, y.push({
                        tx1: R,
                        ty1: O,
                        tx2: C,
                        ty2: z,
                        x1: M,
                        y1: I,
                        x2: E,
                        y2: $,
                        width: o,
                        color: s,
                        borderDash: l,
                        borderDashOffset: x,
                        tickWidth: _,
                        tickColor: v,
                        tickBorderDash: w,
                        tickBorderDashOffset: k
                    }));
                }
                return this._ticksLength = x, this._borderValue = S, y;
            }
            _computeLabelItems(n) {
                const o = this.axis, r = this.options, {position: s, ticks: a} = r, l = this.isHorizontal(), h = this.ticks, {align: p, crossAlign: x, padding: _, mirror: y} = a, v = getTickMarkLength(r.grid), w = v + _, k = y ? -_ : w, S = -toRadians(this.labelRotation), P = [];
                let A, T, R, O, C, z, M, I, E, $, N, F, U = "middle";
                if ("top" === s) z = this.bottom - k, M = this._getXAxisLabelAlignment(); else if ("bottom" === s) z = this.top + k, 
                M = this._getXAxisLabelAlignment(); else if ("left" === s) {
                    const n = this._getYAxisLabelAlignment(v);
                    M = n.textAlign, C = n.x;
                } else if ("right" === s) {
                    const n = this._getYAxisLabelAlignment(v);
                    M = n.textAlign, C = n.x;
                } else if ("x" === o) {
                    if ("center" === s) z = (n.top + n.bottom) / 2 + w; else if (isObject(s)) {
                        const n = Object.keys(s)[0], o = s[n];
                        z = this.chart.scales[n].getPixelForValue(o) + w;
                    }
                    M = this._getXAxisLabelAlignment();
                } else if ("y" === o) {
                    if ("center" === s) C = (n.left + n.right) / 2 - w; else if (isObject(s)) {
                        const n = Object.keys(s)[0], o = s[n];
                        C = this.chart.scales[n].getPixelForValue(o);
                    }
                    M = this._getYAxisLabelAlignment(v).textAlign;
                }
                "y" === o && ("start" === p ? U = "top" : "end" === p && (U = "bottom"));
                const W = this._getLabelSizes();
                for (A = 0, T = h.length; A < T; ++A) {
                    R = h[A], O = R.label;
                    const n = a.setContext(this.getContext(A));
                    I = this.getPixelForTick(A) + a.labelOffset, E = this._resolveTickFontOptions(A), 
                    $ = E.lineHeight, N = isArray(O) ? O.length : 1;
                    const o = N / 2, r = n.color, p = n.textStrokeColor, _ = n.textStrokeWidth;
                    let v, w = M;
                    if (l ? (C = I, "inner" === M && (w = A === T - 1 ? this.options.reverse ? "left" : "right" : 0 === A ? this.options.reverse ? "right" : "left" : "center"), 
                    F = "top" === s ? "near" === x || 0 !== S ? -N * $ + $ / 2 : "center" === x ? -W.highest.height / 2 - o * $ + $ : -W.highest.height + $ / 2 : "near" === x || 0 !== S ? $ / 2 : "center" === x ? W.highest.height / 2 - o * $ : W.highest.height - N * $, 
                    y && (F *= -1)) : (z = I, F = (1 - N) * $ / 2), n.showLabelBackdrop) {
                        const o = toPadding(n.backdropPadding), r = W.heights[A], s = W.widths[A];
                        let a = z + F - o.top, l = C - o.left;
                        switch (U) {
                          case "middle":
                            a -= r / 2;
                            break;

                          case "bottom":
                            a -= r;
                        }
                        switch (M) {
                          case "center":
                            l -= s / 2;
                            break;

                          case "right":
                            l -= s;
                        }
                        v = {
                            left: l,
                            top: a,
                            width: s + o.width,
                            height: r + o.height,
                            color: n.backdropColor
                        };
                    }
                    P.push({
                        rotation: S,
                        label: O,
                        font: E,
                        color: r,
                        strokeColor: p,
                        strokeWidth: _,
                        textOffset: F,
                        textAlign: w,
                        textBaseline: U,
                        translation: [ C, z ],
                        backdrop: v
                    });
                }
                return P;
            }
            _getXAxisLabelAlignment() {
                const {position: n, ticks: o} = this.options;
                if (-toRadians(this.labelRotation)) return "top" === n ? "left" : "right";
                let r = "center";
                return "start" === o.align ? r = "left" : "end" === o.align ? r = "right" : "inner" === o.align && (r = "inner"), 
                r;
            }
            _getYAxisLabelAlignment(n) {
                const {position: o, ticks: {crossAlign: r, mirror: s, padding: a}} = this.options, l = n + a, h = this._getLabelSizes().widest.width;
                let p, x;
                return "left" === o ? s ? (x = this.right + a, "near" === r ? p = "left" : "center" === r ? (p = "center", 
                x += h / 2) : (p = "right", x += h)) : (x = this.right - l, "near" === r ? p = "right" : "center" === r ? (p = "center", 
                x -= h / 2) : (p = "left", x = this.left)) : "right" === o ? s ? (x = this.left + a, 
                "near" === r ? p = "right" : "center" === r ? (p = "center", x -= h / 2) : (p = "left", 
                x -= h)) : (x = this.left + l, "near" === r ? p = "left" : "center" === r ? (p = "center", 
                x += h / 2) : (p = "right", x = this.right)) : p = "right", {
                    textAlign: p,
                    x
                };
            }
            _computeLabelArea() {
                if (this.options.ticks.mirror) return;
                const n = this.chart, o = this.options.position;
                return "left" === o || "right" === o ? {
                    top: 0,
                    left: this.left,
                    bottom: n.height,
                    right: this.right
                } : "top" === o || "bottom" === o ? {
                    top: this.top,
                    left: 0,
                    bottom: this.bottom,
                    right: n.width
                } : void 0;
            }
            drawBackground() {
                const {ctx: n, options: {backgroundColor: o}, left: r, top: s, width: a, height: l} = this;
                o && (n.save(), n.fillStyle = o, n.fillRect(r, s, a, l), n.restore());
            }
            getLineWidthForValue(n) {
                const o = this.options.grid;
                if (!this._isVisible() || !o.display) return 0;
                const r = this.ticks.findIndex((o => o.value === n));
                if (r >= 0) {
                    return o.setContext(this.getContext(r)).lineWidth;
                }
                return 0;
            }
            drawGrid(n) {
                const o = this.options.grid, r = this.ctx, s = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(n));
                let a, l;
                const drawLine = (n, o, s) => {
                    s.width && s.color && (r.save(), r.lineWidth = s.width, r.strokeStyle = s.color, 
                    r.setLineDash(s.borderDash || []), r.lineDashOffset = s.borderDashOffset, r.beginPath(), 
                    r.moveTo(n.x, n.y), r.lineTo(o.x, o.y), r.stroke(), r.restore());
                };
                if (o.display) for (a = 0, l = s.length; a < l; ++a) {
                    const n = s[a];
                    o.drawOnChartArea && drawLine({
                        x: n.x1,
                        y: n.y1
                    }, {
                        x: n.x2,
                        y: n.y2
                    }, n), o.drawTicks && drawLine({
                        x: n.tx1,
                        y: n.ty1
                    }, {
                        x: n.tx2,
                        y: n.ty2
                    }, {
                        color: n.tickColor,
                        width: n.tickWidth,
                        borderDash: n.tickBorderDash,
                        borderDashOffset: n.tickBorderDashOffset
                    });
                }
            }
            drawBorder() {
                const {chart: n, ctx: o, options: {grid: r}} = this, s = r.setContext(this.getContext()), a = r.drawBorder ? s.borderWidth : 0;
                if (!a) return;
                const l = r.setContext(this.getContext(0)).lineWidth, h = this._borderValue;
                let p, x, _, y;
                this.isHorizontal() ? (p = _alignPixel(n, this.left, a) - a / 2, x = _alignPixel(n, this.right, l) + l / 2, 
                _ = y = h) : (_ = _alignPixel(n, this.top, a) - a / 2, y = _alignPixel(n, this.bottom, l) + l / 2, 
                p = x = h), o.save(), o.lineWidth = s.borderWidth, o.strokeStyle = s.borderColor, 
                o.beginPath(), o.moveTo(p, _), o.lineTo(x, y), o.stroke(), o.restore();
            }
            drawLabels(n) {
                if (!this.options.ticks.display) return;
                const o = this.ctx, r = this._computeLabelArea();
                r && clipArea(o, r);
                const s = this._labelItems || (this._labelItems = this._computeLabelItems(n));
                let a, l;
                for (a = 0, l = s.length; a < l; ++a) {
                    const n = s[a], r = n.font, l = n.label;
                    n.backdrop && (o.fillStyle = n.backdrop.color, o.fillRect(n.backdrop.left, n.backdrop.top, n.backdrop.width, n.backdrop.height)), 
                    renderText(o, l, 0, n.textOffset, r, n);
                }
                r && unclipArea(o);
            }
            drawTitle() {
                const {ctx: n, options: {position: o, title: r, reverse: s}} = this;
                if (!r.display) return;
                const a = toFont(r.font), l = toPadding(r.padding), h = r.align;
                let p = a.lineHeight / 2;
                "bottom" === o || "center" === o || isObject(o) ? (p += l.bottom, isArray(r.text) && (p += a.lineHeight * (r.text.length - 1))) : p += l.top;
                const {titleX: x, titleY: _, maxWidth: v, rotation: w} = function(n, o, r, s) {
                    const {top: a, left: l, bottom: h, right: p, chart: x} = n, {chartArea: _, scales: v} = x;
                    let w, k, S, P = 0;
                    const A = h - a, T = p - l;
                    if (n.isHorizontal()) {
                        if (k = _alignStartEnd(s, l, p), isObject(r)) {
                            const n = Object.keys(r)[0], s = r[n];
                            S = v[n].getPixelForValue(s) + A - o;
                        } else S = "center" === r ? (_.bottom + _.top) / 2 + A - o : offsetFromEdge(n, r, o);
                        w = p - l;
                    } else {
                        if (isObject(r)) {
                            const n = Object.keys(r)[0], s = r[n];
                            k = v[n].getPixelForValue(s) - T + o;
                        } else k = "center" === r ? (_.left + _.right) / 2 - T + o : offsetFromEdge(n, r, o);
                        S = _alignStartEnd(s, h, a), P = "left" === r ? -y : y;
                    }
                    return {
                        titleX: k,
                        titleY: S,
                        maxWidth: w,
                        rotation: P
                    };
                }(this, p, o, h);
                renderText(n, r.text, 0, 0, a, {
                    color: r.color,
                    maxWidth: v,
                    rotation: w,
                    textAlign: titleAlign(h, o, s),
                    textBaseline: "middle",
                    translation: [ x, _ ]
                });
            }
            draw(n) {
                this._isVisible() && (this.drawBackground(), this.drawGrid(n), this.drawBorder(), 
                this.drawTitle(), this.drawLabels(n));
            }
            _layers() {
                const n = this.options, o = n.ticks && n.ticks.z || 0, r = valueOrDefault(n.grid && n.grid.z, -1);
                return this._isVisible() && this.draw === Scale.prototype.draw ? [ {
                    z: r,
                    draw: n => {
                        this.drawBackground(), this.drawGrid(n), this.drawTitle();
                    }
                }, {
                    z: r + 1,
                    draw: () => {
                        this.drawBorder();
                    }
                }, {
                    z: o,
                    draw: n => {
                        this.drawLabels(n);
                    }
                } ] : [ {
                    z: o,
                    draw: n => {
                        this.draw(n);
                    }
                } ];
            }
            getMatchingVisibleMetas(n) {
                const o = this.chart.getSortedVisibleDatasetMetas(), r = this.axis + "AxisID", s = [];
                let a, l;
                for (a = 0, l = o.length; a < l; ++a) {
                    const l = o[a];
                    l[r] !== this.id || n && l.type !== n || s.push(l);
                }
                return s;
            }
            _resolveTickFontOptions(n) {
                return toFont(this.options.ticks.setContext(this.getContext(n)).font);
            }
            _maxDigits() {
                const n = this._resolveTickFontOptions(0).lineHeight;
                return (this.isHorizontal() ? this.width : this.height) / n;
            }
        }
        class TypedRegistry {
            constructor(n, o, r) {
                this.type = n, this.scope = o, this.override = r, this.items = Object.create(null);
            }
            isForType(n) {
                return Object.prototype.isPrototypeOf.call(this.type.prototype, n.prototype);
            }
            register(n) {
                const o = Object.getPrototypeOf(n);
                let r;
                (function(n) {
                    return "id" in n && "defaults" in n;
                })(o) && (r = this.register(o));
                const s = this.items, a = n.id, l = this.scope + "." + a;
                if (!a) throw new Error("class does not have id: " + n);
                return a in s || (s[a] = n, function(n, o, r) {
                    const s = merge(Object.create(null), [ r ? F.get(r) : {}, F.get(o), n.defaults ]);
                    F.set(o, s), n.defaultRoutes && function(n, o) {
                        Object.keys(o).forEach((r => {
                            const s = r.split("."), a = s.pop(), l = [ n ].concat(s).join("."), h = o[r].split("."), p = h.pop(), x = h.join(".");
                            F.route(l, a, x, p);
                        }));
                    }(o, n.defaultRoutes);
                    n.descriptors && F.describe(o, n.descriptors);
                }(n, l, r), this.override && F.override(n.id, n.overrides)), l;
            }
            get(n) {
                return this.items[n];
            }
            unregister(n) {
                const o = this.items, r = n.id, s = this.scope;
                r in o && delete o[r], s && r in F[s] && (delete F[s][r], this.override && delete $[r]);
            }
        }
        var tt = new class {
            constructor() {
                this.controllers = new TypedRegistry(DatasetController, "datasets", !0), this.elements = new TypedRegistry(Element, "elements"), 
                this.plugins = new TypedRegistry(Object, "plugins"), this.scales = new TypedRegistry(Scale, "scales"), 
                this._typedRegistries = [ this.controllers, this.scales, this.elements ];
            }
            add(...n) {
                this._each("register", n);
            }
            remove(...n) {
                this._each("unregister", n);
            }
            addControllers(...n) {
                this._each("register", n, this.controllers);
            }
            addElements(...n) {
                this._each("register", n, this.elements);
            }
            addPlugins(...n) {
                this._each("register", n, this.plugins);
            }
            addScales(...n) {
                this._each("register", n, this.scales);
            }
            getController(n) {
                return this._get(n, this.controllers, "controller");
            }
            getElement(n) {
                return this._get(n, this.elements, "element");
            }
            getPlugin(n) {
                return this._get(n, this.plugins, "plugin");
            }
            getScale(n) {
                return this._get(n, this.scales, "scale");
            }
            removeControllers(...n) {
                this._each("unregister", n, this.controllers);
            }
            removeElements(...n) {
                this._each("unregister", n, this.elements);
            }
            removePlugins(...n) {
                this._each("unregister", n, this.plugins);
            }
            removeScales(...n) {
                this._each("unregister", n, this.scales);
            }
            _each(n, o, r) {
                [ ...o ].forEach((o => {
                    const s = r || this._getRegistryForType(o);
                    r || s.isForType(o) || s === this.plugins && o.id ? this._exec(n, s, o) : each(o, (o => {
                        const s = r || this._getRegistryForType(o);
                        this._exec(n, s, o);
                    }));
                }));
            }
            _exec(n, o, r) {
                const s = _capitalize(n);
                callback(r["before" + s], [], r), o[n](r), callback(r["after" + s], [], r);
            }
            _getRegistryForType(n) {
                for (let o = 0; o < this._typedRegistries.length; o++) {
                    const r = this._typedRegistries[o];
                    if (r.isForType(n)) return r;
                }
                return this.plugins;
            }
            _get(n, o, r) {
                const s = o.get(n);
                if (void 0 === s) throw new Error('"' + n + '" is not a registered ' + r + ".");
                return s;
            }
        };
        class ScatterController extends DatasetController {
            update(n) {
                const o = this._cachedMeta, {data: r = []} = o, s = this.chart._animationsDisabled;
                let {start: a, count: l} = _getStartAndCountOfVisiblePoints(o, r, s);
                if (this._drawStart = a, this._drawCount = l, _scaleRangesChanged(o) && (a = 0, 
                l = r.length), this.options.showLine) {
                    const {dataset: a, _dataset: l} = o;
                    a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!l._decimated, 
                    a.points = r;
                    const h = this.resolveDatasetElementOptions(n);
                    h.segment = this.options.segment, this.updateElement(a, void 0, {
                        animated: !s,
                        options: h
                    }, n);
                }
                this.updateElements(r, a, l, n);
            }
            addElements() {
                const {showLine: n} = this.options;
                !this.datasetElementType && n && (this.datasetElementType = tt.getElement("line")), 
                super.addElements();
            }
            updateElements(n, o, r, s) {
                const a = "reset" === s, {iScale: l, vScale: h, _stacked: p, _dataset: x} = this._cachedMeta, _ = this.resolveDataElementOptions(o, s), y = this.getSharedOptions(_), v = this.includeOptions(s, y), w = l.axis, k = h.axis, {spanGaps: S, segment: P} = this.options, A = isNumber(S) ? S : Number.POSITIVE_INFINITY, T = this.chart._animationsDisabled || a || "none" === s;
                let R = o > 0 && this.getParsed(o - 1);
                for (let _ = o; _ < o + r; ++_) {
                    const o = n[_], r = this.getParsed(_), S = T ? o : {}, O = isNullOrUndef(r[k]), C = S[w] = l.getPixelForValue(r[w], _), z = S[k] = a || O ? h.getBasePixel() : h.getPixelForValue(p ? this.applyStack(h, r, p) : r[k], _);
                    S.skip = isNaN(C) || isNaN(z) || O, S.stop = _ > 0 && Math.abs(r[w] - R[w]) > A, 
                    P && (S.parsed = r, S.raw = x.data[_]), v && (S.options = y || this.resolveDataElementOptions(_, o.active ? "active" : s)), 
                    T || this.updateElement(o, _, S, s), R = r;
                }
                this.updateSharedOptions(y, s, _);
            }
            getMaxOverflow() {
                const n = this._cachedMeta, o = n.data || [];
                if (!this.options.showLine) {
                    let n = 0;
                    for (let r = o.length - 1; r >= 0; --r) n = Math.max(n, o[r].size(this.resolveDataElementOptions(r)) / 2);
                    return n > 0 && n;
                }
                const r = n.dataset, s = r.options && r.options.borderWidth || 0;
                if (!o.length) return s;
                const a = o[0].size(this.resolveDataElementOptions(0)), l = o[o.length - 1].size(this.resolveDataElementOptions(o.length - 1));
                return Math.max(s, a, l) / 2;
            }
        }
        ScatterController.id = "scatter", ScatterController.defaults = {
            datasetElementType: !1,
            dataElementType: "point",
            showLine: !1,
            fill: !1
        }, ScatterController.overrides = {
            interaction: {
                mode: "point"
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        title: () => "",
                        label: n => "(" + n.label + ", " + n.formattedValue + ")"
                    }
                }
            },
            scales: {
                x: {
                    type: "linear"
                },
                y: {
                    type: "linear"
                }
            }
        };
        function chart_abstract() {
            throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
        }
        class DateAdapter {
            constructor(n) {
                this.options = n || {};
            }
            init(n) {}
            formats() {
                return chart_abstract();
            }
            parse(n, o) {
                return chart_abstract();
            }
            format(n, o) {
                return chart_abstract();
            }
            add(n, o, r) {
                return chart_abstract();
            }
            diff(n, o, r) {
                return chart_abstract();
            }
            startOf(n, o, r) {
                return chart_abstract();
            }
            endOf(n, o) {
                return chart_abstract();
            }
        }
        DateAdapter.override = function(n) {
            Object.assign(DateAdapter.prototype, n);
        };
        var et = {
            _date: DateAdapter
        };
        function binarySearch(n, o, r, s) {
            const {controller: a, data: l, _sorted: h} = n, p = a._cachedMeta.iScale;
            if (p && o === p.axis && "r" !== o && h && l.length) {
                const n = p._reversePixels ? _rlookupByKey : _lookupByKey;
                if (!s) return n(l, o, r);
                if (a._sharedOptions) {
                    const s = l[0], a = "function" == typeof s.getRange && s.getRange(o);
                    if (a) {
                        const s = n(l, o, r - a), h = n(l, o, r + a);
                        return {
                            lo: s.lo,
                            hi: h.hi
                        };
                    }
                }
            }
            return {
                lo: 0,
                hi: l.length - 1
            };
        }
        function evaluateInteractionItems(n, o, r, s, a) {
            const l = n.getSortedVisibleDatasetMetas(), h = r[o];
            for (let n = 0, r = l.length; n < r; ++n) {
                const {index: r, data: p} = l[n], {lo: x, hi: _} = binarySearch(l[n], o, h, a);
                for (let n = x; n <= _; ++n) {
                    const o = p[n];
                    o.skip || s(o, r, n);
                }
            }
        }
        function getIntersectItems(n, o, r, s, a) {
            const l = [];
            if (!a && !n.isPointInArea(o)) return l;
            return evaluateInteractionItems(n, r, o, (function(r, h, p) {
                (a || _isPointInArea(r, n.chartArea, 0)) && r.inRange(o.x, o.y, s) && l.push({
                    element: r,
                    datasetIndex: h,
                    index: p
                });
            }), !0), l;
        }
        function getNearestCartesianItems(n, o, r, s, a, l) {
            let h = [];
            const p = function(n) {
                const o = -1 !== n.indexOf("x"), r = -1 !== n.indexOf("y");
                return function(n, s) {
                    const a = o ? Math.abs(n.x - s.x) : 0, l = r ? Math.abs(n.y - s.y) : 0;
                    return Math.sqrt(Math.pow(a, 2) + Math.pow(l, 2));
                };
            }(r);
            let x = Number.POSITIVE_INFINITY;
            return evaluateInteractionItems(n, r, o, (function(r, _, y) {
                const v = r.inRange(o.x, o.y, a);
                if (s && !v) return;
                const w = r.getCenterPoint(a);
                if (!(!!l || n.isPointInArea(w)) && !v) return;
                const k = p(o, w);
                k < x ? (h = [ {
                    element: r,
                    datasetIndex: _,
                    index: y
                } ], x = k) : k === x && h.push({
                    element: r,
                    datasetIndex: _,
                    index: y
                });
            })), h;
        }
        function getNearestItems(n, o, r, s, a, l) {
            return l || n.isPointInArea(o) ? "r" !== r || s ? getNearestCartesianItems(n, o, r, s, a, l) : function(n, o, r, s) {
                let a = [];
                return evaluateInteractionItems(n, r, o, (function(n, r, l) {
                    const {startAngle: h, endAngle: p} = n.getProps([ "startAngle", "endAngle" ], s), {angle: x} = getAngleFromPoint(n, {
                        x: o.x,
                        y: o.y
                    });
                    _angleBetween(x, h, p) && a.push({
                        element: n,
                        datasetIndex: r,
                        index: l
                    });
                })), a;
            }(n, o, r, a) : [];
        }
        function getAxisItems(n, o, r, s, a) {
            const l = [], h = "x" === r ? "inXRange" : "inYRange";
            let p = !1;
            return evaluateInteractionItems(n, r, o, ((n, s, x) => {
                n[h](o[r], a) && (l.push({
                    element: n,
                    datasetIndex: s,
                    index: x
                }), p = p || n.inRange(o.x, o.y, a));
            })), s && !p ? [] : l;
        }
        var nt = {
            evaluateInteractionItems,
            modes: {
                index(n, o, r, s) {
                    const a = getRelativePosition(o, n), l = r.axis || "x", h = r.includeInvisible || !1, p = r.intersect ? getIntersectItems(n, a, l, s, h) : getNearestItems(n, a, l, !1, s, h), x = [];
                    return p.length ? (n.getSortedVisibleDatasetMetas().forEach((n => {
                        const o = p[0].index, r = n.data[o];
                        r && !r.skip && x.push({
                            element: r,
                            datasetIndex: n.index,
                            index: o
                        });
                    })), x) : [];
                },
                dataset(n, o, r, s) {
                    const a = getRelativePosition(o, n), l = r.axis || "xy", h = r.includeInvisible || !1;
                    let p = r.intersect ? getIntersectItems(n, a, l, s, h) : getNearestItems(n, a, l, !1, s, h);
                    if (p.length > 0) {
                        const o = p[0].datasetIndex, r = n.getDatasetMeta(o).data;
                        p = [];
                        for (let n = 0; n < r.length; ++n) p.push({
                            element: r[n],
                            datasetIndex: o,
                            index: n
                        });
                    }
                    return p;
                },
                point: (n, o, r, s) => getIntersectItems(n, getRelativePosition(o, n), r.axis || "xy", s, r.includeInvisible || !1),
                nearest(n, o, r, s) {
                    const a = getRelativePosition(o, n), l = r.axis || "xy", h = r.includeInvisible || !1;
                    return getNearestItems(n, a, l, r.intersect, s, h);
                },
                x: (n, o, r, s) => getAxisItems(n, getRelativePosition(o, n), "x", r.intersect, s),
                y: (n, o, r, s) => getAxisItems(n, getRelativePosition(o, n), "y", r.intersect, s)
            }
        };
        const it = [ "left", "top", "right", "bottom" ];
        function filterByPosition(n, o) {
            return n.filter((n => n.pos === o));
        }
        function filterDynamicPositionByAxis(n, o) {
            return n.filter((n => -1 === it.indexOf(n.pos) && n.box.axis === o));
        }
        function sortByWeight(n, o) {
            return n.sort(((n, r) => {
                const s = o ? r : n, a = o ? n : r;
                return s.weight === a.weight ? s.index - a.index : s.weight - a.weight;
            }));
        }
        function setLayoutDims(n, o) {
            const r = function(n) {
                const o = {};
                for (const r of n) {
                    const {stack: n, pos: s, stackWeight: a} = r;
                    if (!n || !it.includes(s)) continue;
                    const l = o[n] || (o[n] = {
                        count: 0,
                        placed: 0,
                        weight: 0,
                        size: 0
                    });
                    l.count++, l.weight += a;
                }
                return o;
            }(n), {vBoxMaxWidth: s, hBoxMaxHeight: a} = o;
            let l, h, p;
            for (l = 0, h = n.length; l < h; ++l) {
                p = n[l];
                const {fullSize: h} = p.box, x = r[p.stack], _ = x && p.stackWeight / x.weight;
                p.horizontal ? (p.width = _ ? _ * s : h && o.availableWidth, p.height = a) : (p.width = s, 
                p.height = _ ? _ * a : h && o.availableHeight);
            }
            return r;
        }
        function getCombinedMax(n, o, r, s) {
            return Math.max(n[r], o[r]) + Math.max(n[s], o[s]);
        }
        function updateMaxPadding(n, o) {
            n.top = Math.max(n.top, o.top), n.left = Math.max(n.left, o.left), n.bottom = Math.max(n.bottom, o.bottom), 
            n.right = Math.max(n.right, o.right);
        }
        function updateDims(n, o, r, s) {
            const {pos: a, box: l} = r, h = n.maxPadding;
            if (!isObject(a)) {
                r.size && (n[a] -= r.size);
                const o = s[r.stack] || {
                    size: 0,
                    count: 1
                };
                o.size = Math.max(o.size, r.horizontal ? l.height : l.width), r.size = o.size / o.count, 
                n[a] += r.size;
            }
            l.getPadding && updateMaxPadding(h, l.getPadding());
            const p = Math.max(0, o.outerWidth - getCombinedMax(h, n, "left", "right")), x = Math.max(0, o.outerHeight - getCombinedMax(h, n, "top", "bottom")), _ = p !== n.w, y = x !== n.h;
            return n.w = p, n.h = x, r.horizontal ? {
                same: _,
                other: y
            } : {
                same: y,
                other: _
            };
        }
        function getMargins(n, o) {
            const r = o.maxPadding;
            function marginForPositions(n) {
                const s = {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                };
                return n.forEach((n => {
                    s[n] = Math.max(o[n], r[n]);
                })), s;
            }
            return marginForPositions(n ? [ "left", "right" ] : [ "top", "bottom" ]);
        }
        function fitBoxes(n, o, r, s) {
            const a = [];
            let l, h, p, x, _, y;
            for (l = 0, h = n.length, _ = 0; l < h; ++l) {
                p = n[l], x = p.box, x.update(p.width || o.w, p.height || o.h, getMargins(p.horizontal, o));
                const {same: h, other: v} = updateDims(o, r, p, s);
                _ |= h && a.length, y = y || v, x.fullSize || a.push(p);
            }
            return _ && fitBoxes(a, o, r, s) || y;
        }
        function setBoxDims(n, o, r, s, a) {
            n.top = r, n.left = o, n.right = o + s, n.bottom = r + a, n.width = s, n.height = a;
        }
        function placeBoxes(n, o, r, s) {
            const a = r.padding;
            let {x: l, y: h} = o;
            for (const p of n) {
                const n = p.box, x = s[p.stack] || {
                    count: 1,
                    placed: 0,
                    weight: 1
                }, _ = p.stackWeight / x.weight || 1;
                if (p.horizontal) {
                    const s = o.w * _, l = x.size || n.height;
                    defined(x.start) && (h = x.start), n.fullSize ? setBoxDims(n, a.left, h, r.outerWidth - a.right - a.left, l) : setBoxDims(n, o.left + x.placed, h, s, l), 
                    x.start = h, x.placed += s, h = n.bottom;
                } else {
                    const s = o.h * _, h = x.size || n.width;
                    defined(x.start) && (l = x.start), n.fullSize ? setBoxDims(n, l, a.top, h, r.outerHeight - a.bottom - a.top) : setBoxDims(n, l, o.top + x.placed, h, s), 
                    x.start = l, x.placed += s, l = n.right;
                }
            }
            o.x = l, o.y = h;
        }
        F.set("layout", {
            autoPadding: !0,
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        });
        var ot = {
            addBox(n, o) {
                n.boxes || (n.boxes = []), o.fullSize = o.fullSize || !1, o.position = o.position || "top", 
                o.weight = o.weight || 0, o._layers = o._layers || function() {
                    return [ {
                        z: 0,
                        draw(n) {
                            o.draw(n);
                        }
                    } ];
                }, n.boxes.push(o);
            },
            removeBox(n, o) {
                const r = n.boxes ? n.boxes.indexOf(o) : -1;
                -1 !== r && n.boxes.splice(r, 1);
            },
            configure(n, o, r) {
                o.fullSize = r.fullSize, o.position = r.position, o.weight = r.weight;
            },
            update(n, o, r, s) {
                if (!n) return;
                const a = toPadding(n.options.layout.padding), l = Math.max(o - a.width, 0), h = Math.max(r - a.height, 0), p = function(n) {
                    const o = function(n) {
                        const o = [];
                        let r, s, a, l, h, p;
                        for (r = 0, s = (n || []).length; r < s; ++r) a = n[r], ({position: l, options: {stack: h, stackWeight: p = 1}} = a), 
                        o.push({
                            index: r,
                            box: a,
                            pos: l,
                            horizontal: a.isHorizontal(),
                            weight: a.weight,
                            stack: h && l + h,
                            stackWeight: p
                        });
                        return o;
                    }(n), r = sortByWeight(o.filter((n => n.box.fullSize)), !0), s = sortByWeight(filterByPosition(o, "left"), !0), a = sortByWeight(filterByPosition(o, "right")), l = sortByWeight(filterByPosition(o, "top"), !0), h = sortByWeight(filterByPosition(o, "bottom")), p = filterDynamicPositionByAxis(o, "x"), x = filterDynamicPositionByAxis(o, "y");
                    return {
                        fullSize: r,
                        leftAndTop: s.concat(l),
                        rightAndBottom: a.concat(x).concat(h).concat(p),
                        chartArea: filterByPosition(o, "chartArea"),
                        vertical: s.concat(a).concat(x),
                        horizontal: l.concat(h).concat(p)
                    };
                }(n.boxes), x = p.vertical, _ = p.horizontal;
                each(n.boxes, (n => {
                    "function" == typeof n.beforeLayout && n.beforeLayout();
                }));
                const y = x.reduce(((n, o) => o.box.options && !1 === o.box.options.display ? n : n + 1), 0) || 1, v = Object.freeze({
                    outerWidth: o,
                    outerHeight: r,
                    padding: a,
                    availableWidth: l,
                    availableHeight: h,
                    vBoxMaxWidth: l / 2 / y,
                    hBoxMaxHeight: h / 2
                }), w = Object.assign({}, a);
                updateMaxPadding(w, toPadding(s));
                const k = Object.assign({
                    maxPadding: w,
                    w: l,
                    h,
                    x: a.left,
                    y: a.top
                }, a), S = setLayoutDims(x.concat(_), v);
                fitBoxes(p.fullSize, k, v, S), fitBoxes(x, k, v, S), fitBoxes(_, k, v, S) && fitBoxes(x, k, v, S), 
                function(n) {
                    const o = n.maxPadding;
                    function updatePos(r) {
                        const s = Math.max(o[r] - n[r], 0);
                        return n[r] += s, s;
                    }
                    n.y += updatePos("top"), n.x += updatePos("left"), updatePos("right"), updatePos("bottom");
                }(k), placeBoxes(p.leftAndTop, k, v, S), k.x += k.w, k.y += k.h, placeBoxes(p.rightAndBottom, k, v, S), 
                n.chartArea = {
                    left: k.left,
                    top: k.top,
                    right: k.left + k.w,
                    bottom: k.top + k.h,
                    height: k.h,
                    width: k.w
                }, each(p.chartArea, (o => {
                    const r = o.box;
                    Object.assign(r, n.chartArea), r.update(k.w, k.h, {
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0
                    });
                }));
            }
        };
        class BasePlatform {
            acquireContext(n, o) {}
            releaseContext(n) {
                return !1;
            }
            addEventListener(n, o, r) {}
            removeEventListener(n, o, r) {}
            getDevicePixelRatio() {
                return 1;
            }
            getMaximumSize(n, o, r, s) {
                return o = Math.max(0, o || n.width), r = r || n.height, {
                    width: o,
                    height: Math.max(0, s ? Math.floor(o / s) : r)
                };
            }
            isAttached(n) {
                return !0;
            }
            updateConfig(n) {}
        }
        class BasicPlatform extends BasePlatform {
            acquireContext(n) {
                return n && n.getContext && n.getContext("2d") || null;
            }
            updateConfig(n) {
                n.options.animation = !1;
            }
        }
        const rt = {
            touchstart: "mousedown",
            touchmove: "mousemove",
            touchend: "mouseup",
            pointerenter: "mouseenter",
            pointerdown: "mousedown",
            pointermove: "mousemove",
            pointerup: "mouseup",
            pointerleave: "mouseout",
            pointerout: "mouseout"
        }, isNullOrEmpty = n => null === n || "" === n;
        const st = !!H && {
            passive: !0
        };
        function removeListener(n, o, r) {
            n.canvas.removeEventListener(o, r, st);
        }
        function nodeListContains(n, o) {
            for (const r of n) if (r === o || r.contains(o)) return !0;
        }
        function createAttachObserver(n, o, r) {
            const s = n.canvas, a = new MutationObserver((n => {
                let o = !1;
                for (const r of n) o = o || nodeListContains(r.addedNodes, s), o = o && !nodeListContains(r.removedNodes, s);
                o && r();
            }));
            return a.observe(document, {
                childList: !0,
                subtree: !0
            }), a;
        }
        function createDetachObserver(n, o, r) {
            const s = n.canvas, a = new MutationObserver((n => {
                let o = !1;
                for (const r of n) o = o || nodeListContains(r.removedNodes, s), o = o && !nodeListContains(r.addedNodes, s);
                o && r();
            }));
            return a.observe(document, {
                childList: !0,
                subtree: !0
            }), a;
        }
        const at = new Map;
        let lt = 0;
        function onWindowResize() {
            const n = window.devicePixelRatio;
            n !== lt && (lt = n, at.forEach(((o, r) => {
                r.currentDevicePixelRatio !== n && o();
            })));
        }
        function createResizeObserver(n, o, r) {
            const s = n.canvas, a = s && _getParentNode(s);
            if (!a) return;
            const l = throttled(((n, o) => {
                const s = a.clientWidth;
                r(n, o), s < a.clientWidth && r();
            }), window), h = new ResizeObserver((n => {
                const o = n[0], r = o.contentRect.width, s = o.contentRect.height;
                0 === r && 0 === s || l(r, s);
            }));
            return h.observe(a), function(n, o) {
                at.size || window.addEventListener("resize", onWindowResize), at.set(n, o);
            }(n, l), h;
        }
        function releaseObserver(n, o, r) {
            r && r.disconnect(), "resize" === o && function(n) {
                at.delete(n), at.size || window.removeEventListener("resize", onWindowResize);
            }(n);
        }
        function createProxyAndListen(n, o, r) {
            const s = n.canvas, a = throttled((o => {
                null !== n.ctx && r(function(n, o) {
                    const r = rt[n.type] || n.type, {x: s, y: a} = getRelativePosition(n, o);
                    return {
                        type: r,
                        chart: o,
                        native: n,
                        x: void 0 !== s ? s : null,
                        y: void 0 !== a ? a : null
                    };
                }(o, n));
            }), n, (n => {
                const o = n[0];
                return [ o, o.offsetX, o.offsetY ];
            }));
            return function(n, o, r) {
                n.addEventListener(o, r, st);
            }(s, o, a), a;
        }
        class DomPlatform extends BasePlatform {
            acquireContext(n, o) {
                const r = n && n.getContext && n.getContext("2d");
                return r && r.canvas === n ? (function(n, o) {
                    const r = n.style, s = n.getAttribute("height"), a = n.getAttribute("width");
                    if (n.$chartjs = {
                        initial: {
                            height: s,
                            width: a,
                            style: {
                                display: r.display,
                                height: r.height,
                                width: r.width
                            }
                        }
                    }, r.display = r.display || "block", r.boxSizing = r.boxSizing || "border-box", 
                    isNullOrEmpty(a)) {
                        const o = readUsedSize(n, "width");
                        void 0 !== o && (n.width = o);
                    }
                    if (isNullOrEmpty(s)) if ("" === n.style.height) n.height = n.width / (o || 2); else {
                        const o = readUsedSize(n, "height");
                        void 0 !== o && (n.height = o);
                    }
                }(n, o), r) : null;
            }
            releaseContext(n) {
                const o = n.canvas;
                if (!o.$chartjs) return !1;
                const r = o.$chartjs.initial;
                [ "height", "width" ].forEach((n => {
                    const s = r[n];
                    isNullOrUndef(s) ? o.removeAttribute(n) : o.setAttribute(n, s);
                }));
                const s = r.style || {};
                return Object.keys(s).forEach((n => {
                    o.style[n] = s[n];
                })), o.width = o.width, delete o.$chartjs, !0;
            }
            addEventListener(n, o, r) {
                this.removeEventListener(n, o);
                const s = n.$proxies || (n.$proxies = {}), a = {
                    attach: createAttachObserver,
                    detach: createDetachObserver,
                    resize: createResizeObserver
                }[o] || createProxyAndListen;
                s[o] = a(n, o, r);
            }
            removeEventListener(n, o) {
                const r = n.$proxies || (n.$proxies = {}), s = r[o];
                if (!s) return;
                ({
                    attach: releaseObserver,
                    detach: releaseObserver,
                    resize: releaseObserver
                }[o] || removeListener)(n, o, s), r[o] = void 0;
            }
            getDevicePixelRatio() {
                return window.devicePixelRatio;
            }
            getMaximumSize(n, o, r, s) {
                return getMaximumSize(n, o, r, s);
            }
            isAttached(n) {
                const o = _getParentNode(n);
                return !(!o || !o.isConnected);
            }
        }
        class PluginService {
            constructor() {
                this._init = [];
            }
            notify(n, o, r, s) {
                "beforeInit" === o && (this._init = this._createDescriptors(n, !0), this._notify(this._init, n, "install"));
                const a = s ? this._descriptors(n).filter(s) : this._descriptors(n), l = this._notify(a, n, o, r);
                return "afterDestroy" === o && (this._notify(a, n, "stop"), this._notify(this._init, n, "uninstall")), 
                l;
            }
            _notify(n, o, r, s) {
                s = s || {};
                for (const a of n) {
                    const n = a.plugin;
                    if (!1 === callback(n[r], [ o, s, a.options ], n) && s.cancelable) return !1;
                }
                return !0;
            }
            invalidate() {
                isNullOrUndef(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
            }
            _descriptors(n) {
                if (this._cache) return this._cache;
                const o = this._cache = this._createDescriptors(n);
                return this._notifyStateChanges(n), o;
            }
            _createDescriptors(n, o) {
                const r = n && n.config, s = valueOrDefault(r.options && r.options.plugins, {}), a = function(n) {
                    const o = {}, r = [], s = Object.keys(tt.plugins.items);
                    for (let n = 0; n < s.length; n++) r.push(tt.getPlugin(s[n]));
                    const a = n.plugins || [];
                    for (let n = 0; n < a.length; n++) {
                        const s = a[n];
                        -1 === r.indexOf(s) && (r.push(s), o[s.id] = !0);
                    }
                    return {
                        plugins: r,
                        localIds: o
                    };
                }(r);
                return !1 !== s || o ? function(n, {plugins: o, localIds: r}, s, a) {
                    const l = [], h = n.getContext();
                    for (const p of o) {
                        const o = p.id, x = getOpts(s[o], a);
                        null !== x && l.push({
                            plugin: p,
                            options: pluginOpts(n.config, {
                                plugin: p,
                                local: r[o]
                            }, x, h)
                        });
                    }
                    return l;
                }(n, a, s, o) : [];
            }
            _notifyStateChanges(n) {
                const o = this._oldCache || [], r = this._cache, diff = (n, o) => n.filter((n => !o.some((o => n.plugin.id === o.plugin.id))));
                this._notify(diff(o, r), n, "stop"), this._notify(diff(r, o), n, "start");
            }
        }
        function getOpts(n, o) {
            return o || !1 !== n ? !0 === n ? {} : n : null;
        }
        function pluginOpts(n, {plugin: o, local: r}, s, a) {
            const l = n.pluginScopeKeys(o), h = n.getOptionScopes(s, l);
            return r && o.defaults && h.push(o.defaults), n.createResolver(h, a, [ "" ], {
                scriptable: !1,
                indexable: !1,
                allKeys: !0
            });
        }
        function getIndexAxis(n, o) {
            const r = F.datasets[n] || {};
            return ((o.datasets || {})[n] || {}).indexAxis || o.indexAxis || r.indexAxis || "x";
        }
        function determineAxis(n, o) {
            return "x" === n || "y" === n ? n : o.axis || ("top" === (r = o.position) || "bottom" === r ? "x" : "left" === r || "right" === r ? "y" : void 0) || n.charAt(0).toLowerCase();
            var r;
        }
        function initOptions(n) {
            const o = n.options || (n.options = {});
            o.plugins = valueOrDefault(o.plugins, {}), o.scales = function(n, o) {
                const r = $[n.type] || {
                    scales: {}
                }, s = o.scales || {}, a = getIndexAxis(n.type, o), l = Object.create(null), h = Object.create(null);
                return Object.keys(s).forEach((n => {
                    const o = s[n];
                    if (!isObject(o)) return;
                    if (o._proxy) return;
                    const p = determineAxis(n, o), x = function(n, o) {
                        return n === o ? "_index_" : "_value_";
                    }(p, a), _ = r.scales || {};
                    l[p] = l[p] || n, h[n] = mergeIf(Object.create(null), [ {
                        axis: p
                    }, o, _[p], _[x] ]);
                })), n.data.datasets.forEach((r => {
                    const a = r.type || n.type, p = r.indexAxis || getIndexAxis(a, o), x = ($[a] || {}).scales || {};
                    Object.keys(x).forEach((n => {
                        const o = function(n, o) {
                            let r = n;
                            return "_index_" === n ? r = o : "_value_" === n && (r = "x" === o ? "y" : "x"), 
                            r;
                        }(n, p), a = r[o + "AxisID"] || l[o] || o;
                        h[a] = h[a] || Object.create(null), mergeIf(h[a], [ {
                            axis: o
                        }, s[a], x[n] ]);
                    }));
                })), Object.keys(h).forEach((n => {
                    const o = h[n];
                    mergeIf(o, [ F.scales[o.type], F.scale ]);
                })), h;
            }(n, o);
        }
        function initData(n) {
            return (n = n || {}).datasets = n.datasets || [], n.labels = n.labels || [], n;
        }
        const ct = new Map, dt = new Set;
        function cachedKeys(n, o) {
            let r = ct.get(n);
            return r || (r = o(), ct.set(n, r), dt.add(r)), r;
        }
        const addIfFound = (n, o, r) => {
            const s = resolveObjectKey(o, r);
            void 0 !== s && n.add(s);
        };
        class Config {
            constructor(n) {
                this._config = function(n) {
                    return (n = n || {}).data = initData(n.data), initOptions(n), n;
                }(n), this._scopeCache = new Map, this._resolverCache = new Map;
            }
            get platform() {
                return this._config.platform;
            }
            get type() {
                return this._config.type;
            }
            set type(n) {
                this._config.type = n;
            }
            get data() {
                return this._config.data;
            }
            set data(n) {
                this._config.data = initData(n);
            }
            get options() {
                return this._config.options;
            }
            set options(n) {
                this._config.options = n;
            }
            get plugins() {
                return this._config.plugins;
            }
            update() {
                const n = this._config;
                this.clearCache(), initOptions(n);
            }
            clearCache() {
                this._scopeCache.clear(), this._resolverCache.clear();
            }
            datasetScopeKeys(n) {
                return cachedKeys(n, (() => [ [ `datasets.${n}`, "" ] ]));
            }
            datasetAnimationScopeKeys(n, o) {
                return cachedKeys(`${n}.transition.${o}`, (() => [ [ `datasets.${n}.transitions.${o}`, `transitions.${o}` ], [ `datasets.${n}`, "" ] ]));
            }
            datasetElementScopeKeys(n, o) {
                return cachedKeys(`${n}-${o}`, (() => [ [ `datasets.${n}.elements.${o}`, `datasets.${n}`, `elements.${o}`, "" ] ]));
            }
            pluginScopeKeys(n) {
                const o = n.id;
                return cachedKeys(`${this.type}-plugin-${o}`, (() => [ [ `plugins.${o}`, ...n.additionalOptionScopes || [] ] ]));
            }
            _cachedScopes(n, o) {
                const r = this._scopeCache;
                let s = r.get(n);
                return s && !o || (s = new Map, r.set(n, s)), s;
            }
            getOptionScopes(n, o, r) {
                const {options: s, type: a} = this, l = this._cachedScopes(n, r), h = l.get(o);
                if (h) return h;
                const p = new Set;
                o.forEach((o => {
                    n && (p.add(n), o.forEach((o => addIfFound(p, n, o)))), o.forEach((n => addIfFound(p, s, n))), 
                    o.forEach((n => addIfFound(p, $[a] || {}, n))), o.forEach((n => addIfFound(p, F, n))), 
                    o.forEach((n => addIfFound(p, N, n)));
                }));
                const x = Array.from(p);
                return 0 === x.length && x.push(Object.create(null)), dt.has(o) && l.set(o, x), 
                x;
            }
            chartOptionScopes() {
                const {options: n, type: o} = this;
                return [ n, $[o] || {}, F.datasets[o] || {}, {
                    type: o
                }, F, N ];
            }
            resolveNamedOptions(n, o, r, s = [ "" ]) {
                const a = {
                    $shared: !0
                }, {resolver: l, subPrefixes: h} = getResolver(this._resolverCache, n, s);
                let p = l;
                if (function(n, o) {
                    const {isScriptable: r, isIndexable: s} = _descriptors(n);
                    for (const a of o) {
                        const o = r(a), l = s(a), h = (l || o) && n[a];
                        if (o && (isFunction(h) || hasFunction(h)) || l && isArray(h)) return !0;
                    }
                    return !1;
                }(l, o)) {
                    a.$shared = !1;
                    p = _attachContext(l, r = isFunction(r) ? r() : r, this.createResolver(n, r, h));
                }
                for (const n of o) a[n] = p[n];
                return a;
            }
            createResolver(n, o, r = [ "" ], s) {
                const {resolver: a} = getResolver(this._resolverCache, n, r);
                return isObject(o) ? _attachContext(a, o, void 0, s) : a;
            }
        }
        function getResolver(n, o, r) {
            let s = n.get(o);
            s || (s = new Map, n.set(o, s));
            const a = r.join();
            let l = s.get(a);
            if (!l) {
                l = {
                    resolver: _createResolver(o, r),
                    subPrefixes: r.filter((n => !n.toLowerCase().includes("hover")))
                }, s.set(a, l);
            }
            return l;
        }
        const hasFunction = n => isObject(n) && Object.getOwnPropertyNames(n).reduce(((o, r) => o || isFunction(n[r])), !1);
        const ht = [ "top", "bottom", "left", "right", "chartArea" ];
        function positionIsHorizontal(n, o) {
            return "top" === n || "bottom" === n || -1 === ht.indexOf(n) && "x" === o;
        }
        function compare2Level(n, o) {
            return function(r, s) {
                return r[n] === s[n] ? r[o] - s[o] : r[n] - s[n];
            };
        }
        function onAnimationsComplete(n) {
            const o = n.chart, r = o.options.animation;
            o.notifyPlugins("afterRender"), callback(r && r.onComplete, [ n ], o);
        }
        function onAnimationProgress(n) {
            const o = n.chart, r = o.options.animation;
            callback(r && r.onProgress, [ n ], o);
        }
        function getCanvas(n) {
            return _isDomSupported() && "string" == typeof n ? n = document.getElementById(n) : n && n.length && (n = n[0]), 
            n && n.canvas && (n = n.canvas), n;
        }
        const ft = {}, getChart = n => {
            const o = getCanvas(n);
            return Object.values(ft).filter((n => n.canvas === o)).pop();
        };
        function moveNumericKeys(n, o, r) {
            const s = Object.keys(n);
            for (const a of s) {
                const s = +a;
                if (s >= o) {
                    const l = n[a];
                    delete n[a], (r > 0 || s > o) && (n[s + r] = l);
                }
            }
        }
        class Chart {
            constructor(n, o) {
                const r = this.config = new Config(o), a = getCanvas(n), l = getChart(a);
                if (l) throw new Error("Canvas is already in use. Chart with ID '" + l.id + "' must be destroyed before the canvas with ID '" + l.canvas.id + "' can be reused.");
                const h = r.createResolver(r.chartOptionScopes(), this.getContext());
                this.platform = new (r.platform || function(n) {
                    return !_isDomSupported() || "undefined" != typeof OffscreenCanvas && n instanceof OffscreenCanvas ? BasicPlatform : DomPlatform;
                }(a)), this.platform.updateConfig(r);
                const p = this.platform.acquireContext(a, h.aspectRatio), x = p && p.canvas, _ = x && x.height, y = x && x.width;
                this.id = s(), this.ctx = p, this.canvas = x, this.width = y, this.height = _, this._options = h, 
                this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, 
                this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, 
                this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, 
                this._sortedMetasets = [], this.scales = {}, this._plugins = new PluginService, 
                this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, 
                this.$context = void 0, this._doResize = function(n, o) {
                    let r;
                    return function(...s) {
                        return o ? (clearTimeout(r), r = setTimeout(n, o, s)) : n.apply(this, s), o;
                    };
                }((n => this.update(n)), h.resizeDelay || 0), this._dataChanges = [], ft[this.id] = this, 
                p && x && (Y.listen(this, "complete", onAnimationsComplete), Y.listen(this, "progress", onAnimationProgress), 
                this._initialize(), this.attached && this.update());
            }
            get aspectRatio() {
                const {options: {aspectRatio: n, maintainAspectRatio: o}, width: r, height: s, _aspectRatio: a} = this;
                return isNullOrUndef(n) ? o && a ? a : s ? r / s : null : n;
            }
            get data() {
                return this.config.data;
            }
            set data(n) {
                this.config.data = n;
            }
            get options() {
                return this._options;
            }
            set options(n) {
                this.config.options = n;
            }
            _initialize() {
                return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : retinaScale(this, this.options.devicePixelRatio), 
                this.bindEvents(), this.notifyPlugins("afterInit"), this;
            }
            clear() {
                return clearCanvas(this.canvas, this.ctx), this;
            }
            stop() {
                return Y.stop(this), this;
            }
            resize(n, o) {
                Y.running(this) ? this._resizeBeforeDraw = {
                    width: n,
                    height: o
                } : this._resize(n, o);
            }
            _resize(n, o) {
                const r = this.options, s = this.canvas, a = r.maintainAspectRatio && this.aspectRatio, l = this.platform.getMaximumSize(s, n, o, a), h = r.devicePixelRatio || this.platform.getDevicePixelRatio(), p = this.width ? "resize" : "attach";
                this.width = l.width, this.height = l.height, this._aspectRatio = this.aspectRatio, 
                retinaScale(this, h, !0) && (this.notifyPlugins("resize", {
                    size: l
                }), callback(r.onResize, [ this, l ], this), this.attached && this._doResize(p) && this.render());
            }
            ensureScalesHaveIDs() {
                each(this.options.scales || {}, ((n, o) => {
                    n.id = o;
                }));
            }
            buildOrUpdateScales() {
                const n = this.options, o = n.scales, r = this.scales, s = Object.keys(r).reduce(((n, o) => (n[o] = !1, 
                n)), {});
                let a = [];
                o && (a = a.concat(Object.keys(o).map((n => {
                    const r = o[n], s = determineAxis(n, r), a = "r" === s, l = "x" === s;
                    return {
                        options: r,
                        dposition: a ? "chartArea" : l ? "bottom" : "left",
                        dtype: a ? "radialLinear" : l ? "category" : "linear"
                    };
                })))), each(a, (o => {
                    const a = o.options, l = a.id, h = determineAxis(l, a), p = valueOrDefault(a.type, o.dtype);
                    void 0 !== a.position && positionIsHorizontal(a.position, h) === positionIsHorizontal(o.dposition) || (a.position = o.dposition), 
                    s[l] = !0;
                    let x = null;
                    if (l in r && r[l].type === p) x = r[l]; else {
                        x = new (tt.getScale(p))({
                            id: l,
                            type: p,
                            ctx: this.ctx,
                            chart: this
                        }), r[x.id] = x;
                    }
                    x.init(a, n);
                })), each(s, ((n, o) => {
                    n || delete r[o];
                })), each(r, (n => {
                    ot.configure(this, n, n.options), ot.addBox(this, n);
                }));
            }
            _updateMetasets() {
                const n = this._metasets, o = this.data.datasets.length, r = n.length;
                if (n.sort(((n, o) => n.index - o.index)), r > o) {
                    for (let n = o; n < r; ++n) this._destroyDatasetMeta(n);
                    n.splice(o, r - o);
                }
                this._sortedMetasets = n.slice(0).sort(compare2Level("order", "index"));
            }
            _removeUnreferencedMetasets() {
                const {_metasets: n, data: {datasets: o}} = this;
                n.length > o.length && delete this._stacks, n.forEach(((n, r) => {
                    0 === o.filter((o => o === n._dataset)).length && this._destroyDatasetMeta(r);
                }));
            }
            buildOrUpdateControllers() {
                const n = [], o = this.data.datasets;
                let r, s;
                for (this._removeUnreferencedMetasets(), r = 0, s = o.length; r < s; r++) {
                    const s = o[r];
                    let a = this.getDatasetMeta(r);
                    const l = s.type || this.config.type;
                    if (a.type && a.type !== l && (this._destroyDatasetMeta(r), a = this.getDatasetMeta(r)), 
                    a.type = l, a.indexAxis = s.indexAxis || getIndexAxis(l, this.options), a.order = s.order || 0, 
                    a.index = r, a.label = "" + s.label, a.visible = this.isDatasetVisible(r), a.controller) a.controller.updateIndex(r), 
                    a.controller.linkScales(); else {
                        const o = tt.getController(l), {datasetElementType: s, dataElementType: h} = F.datasets[l];
                        Object.assign(o.prototype, {
                            dataElementType: tt.getElement(h),
                            datasetElementType: s && tt.getElement(s)
                        }), a.controller = new o(this, r), n.push(a.controller);
                    }
                }
                return this._updateMetasets(), n;
            }
            _resetElements() {
                each(this.data.datasets, ((n, o) => {
                    this.getDatasetMeta(o).controller.reset();
                }), this);
            }
            reset() {
                this._resetElements(), this.notifyPlugins("reset");
            }
            update(n) {
                const o = this.config;
                o.update();
                const r = this._options = o.createResolver(o.chartOptionScopes(), this.getContext()), s = this._animationsDisabled = !r.animation;
                if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), 
                this._plugins.invalidate(), !1 === this.notifyPlugins("beforeUpdate", {
                    mode: n,
                    cancelable: !0
                })) return;
                const a = this.buildOrUpdateControllers();
                this.notifyPlugins("beforeElementsUpdate");
                let l = 0;
                for (let n = 0, o = this.data.datasets.length; n < o; n++) {
                    const {controller: o} = this.getDatasetMeta(n), r = !s && -1 === a.indexOf(o);
                    o.buildOrUpdateElements(r), l = Math.max(+o.getMaxOverflow(), l);
                }
                l = this._minPadding = r.layout.autoPadding ? l : 0, this._updateLayout(l), s || each(a, (n => {
                    n.reset();
                })), this._updateDatasets(n), this.notifyPlugins("afterUpdate", {
                    mode: n
                }), this._layers.sort(compare2Level("z", "_idx"));
                const {_active: h, _lastEvent: p} = this;
                p ? this._eventHandler(p, !0) : h.length && this._updateHoverStyles(h, h, !0), this.render();
            }
            _updateScales() {
                each(this.scales, (n => {
                    ot.removeBox(this, n);
                })), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
            }
            _checkEventBindings() {
                const n = this.options, o = new Set(Object.keys(this._listeners)), r = new Set(n.events);
                setsEqual(o, r) && !!this._responsiveListeners === n.responsive || (this.unbindEvents(), 
                this.bindEvents());
            }
            _updateHiddenIndices() {
                const {_hiddenIndices: n} = this, o = this._getUniformDataChanges() || [];
                for (const {method: r, start: s, count: a} of o) {
                    moveNumericKeys(n, s, "_removeElements" === r ? -a : a);
                }
            }
            _getUniformDataChanges() {
                const n = this._dataChanges;
                if (!n || !n.length) return;
                this._dataChanges = [];
                const o = this.data.datasets.length, makeSet = o => new Set(n.filter((n => n[0] === o)).map(((n, o) => o + "," + n.splice(1).join(",")))), r = makeSet(0);
                for (let n = 1; n < o; n++) if (!setsEqual(r, makeSet(n))) return;
                return Array.from(r).map((n => n.split(","))).map((n => ({
                    method: n[1],
                    start: +n[2],
                    count: +n[3]
                })));
            }
            _updateLayout(n) {
                if (!1 === this.notifyPlugins("beforeLayout", {
                    cancelable: !0
                })) return;
                ot.update(this, this.width, this.height, n);
                const o = this.chartArea, r = o.width <= 0 || o.height <= 0;
                this._layers = [], each(this.boxes, (n => {
                    r && "chartArea" === n.position || (n.configure && n.configure(), this._layers.push(...n._layers()));
                }), this), this._layers.forEach(((n, o) => {
                    n._idx = o;
                })), this.notifyPlugins("afterLayout");
            }
            _updateDatasets(n) {
                if (!1 !== this.notifyPlugins("beforeDatasetsUpdate", {
                    mode: n,
                    cancelable: !0
                })) {
                    for (let n = 0, o = this.data.datasets.length; n < o; ++n) this.getDatasetMeta(n).controller.configure();
                    for (let o = 0, r = this.data.datasets.length; o < r; ++o) this._updateDataset(o, isFunction(n) ? n({
                        datasetIndex: o
                    }) : n);
                    this.notifyPlugins("afterDatasetsUpdate", {
                        mode: n
                    });
                }
            }
            _updateDataset(n, o) {
                const r = this.getDatasetMeta(n), s = {
                    meta: r,
                    index: n,
                    mode: o,
                    cancelable: !0
                };
                !1 !== this.notifyPlugins("beforeDatasetUpdate", s) && (r.controller._update(o), 
                s.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", s));
            }
            render() {
                !1 !== this.notifyPlugins("beforeRender", {
                    cancelable: !0
                }) && (Y.has(this) ? this.attached && !Y.running(this) && Y.start(this) : (this.draw(), 
                onAnimationsComplete({
                    chart: this
                })));
            }
            draw() {
                let n;
                if (this._resizeBeforeDraw) {
                    const {width: n, height: o} = this._resizeBeforeDraw;
                    this._resize(n, o), this._resizeBeforeDraw = null;
                }
                if (this.clear(), this.width <= 0 || this.height <= 0) return;
                if (!1 === this.notifyPlugins("beforeDraw", {
                    cancelable: !0
                })) return;
                const o = this._layers;
                for (n = 0; n < o.length && o[n].z <= 0; ++n) o[n].draw(this.chartArea);
                for (this._drawDatasets(); n < o.length; ++n) o[n].draw(this.chartArea);
                this.notifyPlugins("afterDraw");
            }
            _getSortedDatasetMetas(n) {
                const o = this._sortedMetasets, r = [];
                let s, a;
                for (s = 0, a = o.length; s < a; ++s) {
                    const a = o[s];
                    n && !a.visible || r.push(a);
                }
                return r;
            }
            getSortedVisibleDatasetMetas() {
                return this._getSortedDatasetMetas(!0);
            }
            _drawDatasets() {
                if (!1 === this.notifyPlugins("beforeDatasetsDraw", {
                    cancelable: !0
                })) return;
                const n = this.getSortedVisibleDatasetMetas();
                for (let o = n.length - 1; o >= 0; --o) this._drawDataset(n[o]);
                this.notifyPlugins("afterDatasetsDraw");
            }
            _drawDataset(n) {
                const o = this.ctx, r = n._clip, s = !r.disabled, a = this.chartArea, l = {
                    meta: n,
                    index: n.index,
                    cancelable: !0
                };
                !1 !== this.notifyPlugins("beforeDatasetDraw", l) && (s && clipArea(o, {
                    left: !1 === r.left ? 0 : a.left - r.left,
                    right: !1 === r.right ? this.width : a.right + r.right,
                    top: !1 === r.top ? 0 : a.top - r.top,
                    bottom: !1 === r.bottom ? this.height : a.bottom + r.bottom
                }), n.controller.draw(), s && unclipArea(o), l.cancelable = !1, this.notifyPlugins("afterDatasetDraw", l));
            }
            isPointInArea(n) {
                return _isPointInArea(n, this.chartArea, this._minPadding);
            }
            getElementsAtEventForMode(n, o, r, s) {
                const a = nt.modes[o];
                return "function" == typeof a ? a(this, n, r, s) : [];
            }
            getDatasetMeta(n) {
                const o = this.data.datasets[n], r = this._metasets;
                let s = r.filter((n => n && n._dataset === o)).pop();
                return s || (s = {
                    type: null,
                    data: [],
                    dataset: null,
                    controller: null,
                    hidden: null,
                    xAxisID: null,
                    yAxisID: null,
                    order: o && o.order || 0,
                    index: n,
                    _dataset: o,
                    _parsed: [],
                    _sorted: !1
                }, r.push(s)), s;
            }
            getContext() {
                return this.$context || (this.$context = createContext(null, {
                    chart: this,
                    type: "chart"
                }));
            }
            getVisibleDatasetCount() {
                return this.getSortedVisibleDatasetMetas().length;
            }
            isDatasetVisible(n) {
                const o = this.data.datasets[n];
                if (!o) return !1;
                const r = this.getDatasetMeta(n);
                return "boolean" == typeof r.hidden ? !r.hidden : !o.hidden;
            }
            setDatasetVisibility(n, o) {
                this.getDatasetMeta(n).hidden = !o;
            }
            toggleDataVisibility(n) {
                this._hiddenIndices[n] = !this._hiddenIndices[n];
            }
            getDataVisibility(n) {
                return !this._hiddenIndices[n];
            }
            _updateVisibility(n, o, r) {
                const s = r ? "show" : "hide", a = this.getDatasetMeta(n), l = a.controller._resolveAnimations(void 0, s);
                defined(o) ? (a.data[o].hidden = !r, this.update()) : (this.setDatasetVisibility(n, r), 
                l.update(a, {
                    visible: r
                }), this.update((o => o.datasetIndex === n ? s : void 0)));
            }
            hide(n, o) {
                this._updateVisibility(n, o, !1);
            }
            show(n, o) {
                this._updateVisibility(n, o, !0);
            }
            _destroyDatasetMeta(n) {
                const o = this._metasets[n];
                o && o.controller && o.controller._destroy(), delete this._metasets[n];
            }
            _stop() {
                let n, o;
                for (this.stop(), Y.remove(this), n = 0, o = this.data.datasets.length; n < o; ++n) this._destroyDatasetMeta(n);
            }
            destroy() {
                this.notifyPlugins("beforeDestroy");
                const {canvas: n, ctx: o} = this;
                this._stop(), this.config.clearCache(), n && (this.unbindEvents(), clearCanvas(n, o), 
                this.platform.releaseContext(o), this.canvas = null, this.ctx = null), this.notifyPlugins("destroy"), 
                delete ft[this.id], this.notifyPlugins("afterDestroy");
            }
            toBase64Image(...n) {
                return this.canvas.toDataURL(...n);
            }
            bindEvents() {
                this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
            }
            bindUserEvents() {
                const n = this._listeners, o = this.platform, _add = (r, s) => {
                    o.addEventListener(this, r, s), n[r] = s;
                }, listener = (n, o, r) => {
                    n.offsetX = o, n.offsetY = r, this._eventHandler(n);
                };
                each(this.options.events, (n => _add(n, listener)));
            }
            bindResponsiveEvents() {
                this._responsiveListeners || (this._responsiveListeners = {});
                const n = this._responsiveListeners, o = this.platform, _add = (r, s) => {
                    o.addEventListener(this, r, s), n[r] = s;
                }, _remove = (r, s) => {
                    n[r] && (o.removeEventListener(this, r, s), delete n[r]);
                }, listener = (n, o) => {
                    this.canvas && this.resize(n, o);
                };
                let r;
                const attached = () => {
                    _remove("attach", attached), this.attached = !0, this.resize(), _add("resize", listener), 
                    _add("detach", r);
                };
                r = () => {
                    this.attached = !1, _remove("resize", listener), this._stop(), this._resize(0, 0), 
                    _add("attach", attached);
                }, o.isAttached(this.canvas) ? attached() : r();
            }
            unbindEvents() {
                each(this._listeners, ((n, o) => {
                    this.platform.removeEventListener(this, o, n);
                })), this._listeners = {}, each(this._responsiveListeners, ((n, o) => {
                    this.platform.removeEventListener(this, o, n);
                })), this._responsiveListeners = void 0;
            }
            updateHoverStyle(n, o, r) {
                const s = r ? "set" : "remove";
                let a, l, h, p;
                for ("dataset" === o && (a = this.getDatasetMeta(n[0].datasetIndex), a.controller["_" + s + "DatasetHoverStyle"]()), 
                h = 0, p = n.length; h < p; ++h) {
                    l = n[h];
                    const o = l && this.getDatasetMeta(l.datasetIndex).controller;
                    o && o[s + "HoverStyle"](l.element, l.datasetIndex, l.index);
                }
            }
            getActiveElements() {
                return this._active || [];
            }
            setActiveElements(n) {
                const o = this._active || [], r = n.map((({datasetIndex: n, index: o}) => {
                    const r = this.getDatasetMeta(n);
                    if (!r) throw new Error("No dataset found at index " + n);
                    return {
                        datasetIndex: n,
                        element: r.data[o],
                        index: o
                    };
                }));
                !_elementsEqual(r, o) && (this._active = r, this._lastEvent = null, this._updateHoverStyles(r, o));
            }
            notifyPlugins(n, o, r) {
                return this._plugins.notify(this, n, o, r);
            }
            _updateHoverStyles(n, o, r) {
                const s = this.options.hover, diff = (n, o) => n.filter((n => !o.some((o => n.datasetIndex === o.datasetIndex && n.index === o.index)))), a = diff(o, n), l = r ? n : diff(n, o);
                a.length && this.updateHoverStyle(a, s.mode, !1), l.length && s.mode && this.updateHoverStyle(l, s.mode, !0);
            }
            _eventHandler(n, o) {
                const r = {
                    event: n,
                    replay: o,
                    cancelable: !0,
                    inChartArea: this.isPointInArea(n)
                }, eventFilter = o => (o.options.events || this.options.events).includes(n.native.type);
                if (!1 === this.notifyPlugins("beforeEvent", r, eventFilter)) return;
                const s = this._handleEvent(n, o, r.inChartArea);
                return r.cancelable = !1, this.notifyPlugins("afterEvent", r, eventFilter), (s || r.changed) && this.render(), 
                this;
            }
            _handleEvent(n, o, r) {
                const {_active: s = [], options: a} = this, l = o, h = this._getActiveElements(n, s, r, l), p = function(n) {
                    return "mouseup" === n.type || "click" === n.type || "contextmenu" === n.type;
                }(n), x = function(n, o, r, s) {
                    return r && "mouseout" !== n.type ? s ? o : n : null;
                }(n, this._lastEvent, r, p);
                r && (this._lastEvent = null, callback(a.onHover, [ n, h, this ], this), p && callback(a.onClick, [ n, h, this ], this));
                const _ = !_elementsEqual(h, s);
                return (_ || o) && (this._active = h, this._updateHoverStyles(h, s, o)), this._lastEvent = x, 
                _;
            }
            _getActiveElements(n, o, r, s) {
                if ("mouseout" === n.type) return [];
                if (!r) return o;
                const a = this.options.hover;
                return this.getElementsAtEventForMode(n, a.mode, a, s);
            }
        }
        const invalidatePlugins = () => each(Chart.instances, (n => n._plugins.invalidate())), ut = !0;
        function clipArc(n, o, r) {
            const {startAngle: s, pixelMargin: a, x: l, y: h, outerRadius: p, innerRadius: x} = o;
            let _ = a / p;
            n.beginPath(), n.arc(l, h, p, s - _, r + _), x > a ? (_ = a / x, n.arc(l, h, x, r + _, s - _, !0)) : n.arc(l, h, a, r + y, s - y), 
            n.closePath(), n.clip();
        }
        function parseBorderRadius$1(n, o, r, s) {
            const a = _readValueToProps(n.options.borderRadius, [ "outerStart", "outerEnd", "innerStart", "innerEnd" ]);
            const l = (r - o) / 2, h = Math.min(l, s * o / 2), computeOuterLimit = n => {
                const o = (r - Math.min(l, n)) * s / 2;
                return _limitValue(n, 0, Math.min(l, o));
            };
            return {
                outerStart: computeOuterLimit(a.outerStart),
                outerEnd: computeOuterLimit(a.outerEnd),
                innerStart: _limitValue(a.innerStart, 0, h),
                innerEnd: _limitValue(a.innerEnd, 0, h)
            };
        }
        function rThetaToXY(n, o, r, s) {
            return {
                x: r + n * Math.cos(o),
                y: s + n * Math.sin(o)
            };
        }
        function pathArc(n, o, r, s, a, h) {
            const {x: p, y: x, startAngle: _, pixelMargin: v, innerRadius: w} = o, k = Math.max(o.outerRadius + s + r - v, 0), S = w > 0 ? w + s + r + v : 0;
            let P = 0;
            const A = a - _;
            if (s) {
                const n = ((w > 0 ? w - s : 0) + (k > 0 ? k - s : 0)) / 2;
                P = (A - (0 !== n ? A * n / (n + s) : A)) / 2;
            }
            const T = (A - Math.max(.001, A * k - r / l) / k) / 2, R = _ + T + P, O = a - T - P, {outerStart: C, outerEnd: z, innerStart: M, innerEnd: I} = parseBorderRadius$1(o, S, k, O - R), E = k - C, $ = k - z, N = R + C / E, F = O - z / $, U = S + M, W = S + I, V = R + M / U, j = O - I / W;
            if (n.beginPath(), h) {
                if (n.arc(p, x, k, N, F), z > 0) {
                    const o = rThetaToXY($, F, p, x);
                    n.arc(o.x, o.y, z, F, O + y);
                }
                const o = rThetaToXY(W, O, p, x);
                if (n.lineTo(o.x, o.y), I > 0) {
                    const o = rThetaToXY(W, j, p, x);
                    n.arc(o.x, o.y, I, O + y, j + Math.PI);
                }
                if (n.arc(p, x, S, O - I / S, R + M / S, !0), M > 0) {
                    const o = rThetaToXY(U, V, p, x);
                    n.arc(o.x, o.y, M, V + Math.PI, R - y);
                }
                const r = rThetaToXY(E, R, p, x);
                if (n.lineTo(r.x, r.y), C > 0) {
                    const o = rThetaToXY(E, N, p, x);
                    n.arc(o.x, o.y, C, R - y, N);
                }
            } else {
                n.moveTo(p, x);
                const o = Math.cos(N) * k + p, r = Math.sin(N) * k + x;
                n.lineTo(o, r);
                const s = Math.cos(F) * k + p, a = Math.sin(F) * k + x;
                n.lineTo(s, a);
            }
            n.closePath();
        }
        function drawBorder(n, o, r, s, a, l) {
            const {options: p} = o, {borderWidth: x, borderJoinStyle: _} = p, y = "inner" === p.borderAlign;
            x && (y ? (n.lineWidth = 2 * x, n.lineJoin = _ || "round") : (n.lineWidth = x, n.lineJoin = _ || "bevel"), 
            o.fullCircles && function(n, o, r) {
                const {x: s, y: a, startAngle: l, pixelMargin: p, fullCircles: x} = o, _ = Math.max(o.outerRadius - p, 0), y = o.innerRadius + p;
                let v;
                for (r && clipArc(n, o, l + h), n.beginPath(), n.arc(s, a, y, l + h, l, !0), v = 0; v < x; ++v) n.stroke();
                for (n.beginPath(), n.arc(s, a, _, l, l + h), v = 0; v < x; ++v) n.stroke();
            }(n, o, y), y && clipArc(n, o, a), pathArc(n, o, r, s, a, l), n.stroke());
        }
        Object.defineProperties(Chart, {
            defaults: {
                enumerable: ut,
                value: F
            },
            instances: {
                enumerable: ut,
                value: ft
            },
            overrides: {
                enumerable: ut,
                value: $
            },
            registry: {
                enumerable: ut,
                value: tt
            },
            version: {
                enumerable: ut,
                value: "3.9.1"
            },
            getChart: {
                enumerable: ut,
                value: getChart
            },
            register: {
                enumerable: ut,
                value: (...n) => {
                    tt.add(...n), invalidatePlugins();
                }
            },
            unregister: {
                enumerable: ut,
                value: (...n) => {
                    tt.remove(...n), invalidatePlugins();
                }
            }
        });
        class ArcElement extends Element {
            constructor(n) {
                super(), this.options = void 0, this.circumference = void 0, this.startAngle = void 0, 
                this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, 
                this.fullCircles = 0, n && Object.assign(this, n);
            }
            inRange(n, o, r) {
                const s = this.getProps([ "x", "y" ], r), {angle: a, distance: l} = getAngleFromPoint(s, {
                    x: n,
                    y: o
                }), {startAngle: p, endAngle: x, innerRadius: _, outerRadius: y, circumference: v} = this.getProps([ "startAngle", "endAngle", "innerRadius", "outerRadius", "circumference" ], r), w = this.options.spacing / 2, k = valueOrDefault(v, x - p) >= h || _angleBetween(a, p, x), S = _isBetween(l, _ + w, y + w);
                return k && S;
            }
            getCenterPoint(n) {
                const {x: o, y: r, startAngle: s, endAngle: a, innerRadius: l, outerRadius: h} = this.getProps([ "x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius", "circumference" ], n), {offset: p, spacing: x} = this.options, _ = (s + a) / 2, y = (l + h + x + p) / 2;
                return {
                    x: o + Math.cos(_) * y,
                    y: r + Math.sin(_) * y
                };
            }
            tooltipPosition(n) {
                return this.getCenterPoint(n);
            }
            draw(n) {
                const {options: o, circumference: r} = this, s = (o.offset || 0) / 2, a = (o.spacing || 0) / 2, p = o.circular;
                if (this.pixelMargin = "inner" === o.borderAlign ? .33 : 0, this.fullCircles = r > h ? Math.floor(r / h) : 0, 
                0 === r || this.innerRadius < 0 || this.outerRadius < 0) return;
                n.save();
                let x = 0;
                if (s) {
                    x = s / 2;
                    const o = (this.startAngle + this.endAngle) / 2;
                    n.translate(Math.cos(o) * x, Math.sin(o) * x), this.circumference >= l && (x = s);
                }
                n.fillStyle = o.backgroundColor, n.strokeStyle = o.borderColor;
                const _ = function(n, o, r, s, a) {
                    const {fullCircles: l, startAngle: p, circumference: x} = o;
                    let _ = o.endAngle;
                    if (l) {
                        pathArc(n, o, r, s, p + h, a);
                        for (let o = 0; o < l; ++o) n.fill();
                        isNaN(x) || (_ = p + x % h, x % h == 0 && (_ += h));
                    }
                    return pathArc(n, o, r, s, _, a), n.fill(), _;
                }(n, this, x, a, p);
                drawBorder(n, this, x, a, _, p), n.restore();
            }
        }
        function setStyle(n, o, r = o) {
            n.lineCap = valueOrDefault(r.borderCapStyle, o.borderCapStyle), n.setLineDash(valueOrDefault(r.borderDash, o.borderDash)), 
            n.lineDashOffset = valueOrDefault(r.borderDashOffset, o.borderDashOffset), n.lineJoin = valueOrDefault(r.borderJoinStyle, o.borderJoinStyle), 
            n.lineWidth = valueOrDefault(r.borderWidth, o.borderWidth), n.strokeStyle = valueOrDefault(r.borderColor, o.borderColor);
        }
        function lineTo(n, o, r) {
            n.lineTo(r.x, r.y);
        }
        function pathVars(n, o, r = {}) {
            const s = n.length, {start: a = 0, end: l = s - 1} = r, {start: h, end: p} = o, x = Math.max(a, h), _ = Math.min(l, p), y = a < h && l < h || a > p && l > p;
            return {
                count: s,
                start: x,
                loop: o.loop,
                ilen: _ < x && !y ? s + _ - x : _ - x
            };
        }
        function pathSegment(n, o, r, s) {
            const {points: a, options: l} = o, {count: h, start: p, loop: x, ilen: _} = pathVars(a, r, s), y = function(n) {
                return n.stepped ? _steppedLineTo : n.tension || "monotone" === n.cubicInterpolationMode ? _bezierCurveTo : lineTo;
            }(l);
            let v, w, k, {move: S = !0, reverse: P} = s || {};
            for (v = 0; v <= _; ++v) w = a[(p + (P ? _ - v : v)) % h], w.skip || (S ? (n.moveTo(w.x, w.y), 
            S = !1) : y(n, k, w, P, l.stepped), k = w);
            return x && (w = a[(p + (P ? _ : 0)) % h], y(n, k, w, P, l.stepped)), !!x;
        }
        function fastPathSegment(n, o, r, s) {
            const a = o.points, {count: l, start: h, ilen: p} = pathVars(a, r, s), {move: x = !0, reverse: _} = s || {};
            let y, v, w, k, S, P, A = 0, T = 0;
            const pointIndex = n => (h + (_ ? p - n : n)) % l, drawX = () => {
                k !== S && (n.lineTo(A, S), n.lineTo(A, k), n.lineTo(A, P));
            };
            for (x && (v = a[pointIndex(0)], n.moveTo(v.x, v.y)), y = 0; y <= p; ++y) {
                if (v = a[pointIndex(y)], v.skip) continue;
                const o = v.x, r = v.y, s = 0 | o;
                s === w ? (r < k ? k = r : r > S && (S = r), A = (T * A + o) / ++T) : (drawX(), 
                n.lineTo(o, r), w = s, T = 0, k = S = r), P = r;
            }
            drawX();
        }
        function _getSegmentMethod(n) {
            const o = n.options, r = o.borderDash && o.borderDash.length;
            return !(n._decimated || n._loop || o.tension || "monotone" === o.cubicInterpolationMode || o.stepped || r) ? fastPathSegment : pathSegment;
        }
        ArcElement.id = "arc", ArcElement.defaults = {
            borderAlign: "center",
            borderColor: "#fff",
            borderJoinStyle: void 0,
            borderRadius: 0,
            borderWidth: 2,
            offset: 0,
            spacing: 0,
            angle: void 0,
            circular: !0
        }, ArcElement.defaultRoutes = {
            backgroundColor: "backgroundColor"
        };
        const pt = "function" == typeof Path2D;
        function draw(n, o, r, s) {
            pt && !o.options.segment ? function(n, o, r, s) {
                let a = o._path;
                a || (a = o._path = new Path2D, o.path(a, r, s) && a.closePath()), setStyle(n, o.options), 
                n.stroke(a);
            }(n, o, r, s) : function(n, o, r, s) {
                const {segments: a, options: l} = o, h = _getSegmentMethod(o);
                for (const p of a) setStyle(n, l, p.style), n.beginPath(), h(n, o, p, {
                    start: r,
                    end: r + s - 1
                }) && n.closePath(), n.stroke();
            }(n, o, r, s);
        }
        class LineElement extends Element {
            constructor(n) {
                super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, 
                this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, 
                this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, n && Object.assign(this, n);
            }
            updateControlPoints(n, o) {
                const r = this.options;
                if ((r.tension || "monotone" === r.cubicInterpolationMode) && !r.stepped && !this._pointsUpdated) {
                    const s = r.spanGaps ? this._loop : this._fullLoop;
                    _updateBezierControlPoints(this._points, r, n, s, o), this._pointsUpdated = !0;
                }
            }
            set points(n) {
                this._points = n, delete this._segments, delete this._path, this._pointsUpdated = !1;
            }
            get points() {
                return this._points;
            }
            get segments() {
                return this._segments || (this._segments = function(n, o) {
                    const r = n.points, s = n.options.spanGaps, a = r.length;
                    if (!a) return [];
                    const l = !!n._loop, {start: h, end: p} = function(n, o, r, s) {
                        let a = 0, l = o - 1;
                        if (r && !s) for (;a < o && !n[a].skip; ) a++;
                        for (;a < o && n[a].skip; ) a++;
                        for (a %= o, r && (l += a); l > a && n[l % o].skip; ) l--;
                        return l %= o, {
                            start: a,
                            end: l
                        };
                    }(r, a, l, s);
                    return splitByStyles(n, !0 === s ? [ {
                        start: h,
                        end: p,
                        loop: l
                    } ] : function(n, o, r, s) {
                        const a = n.length, l = [];
                        let h, p = o, x = n[o];
                        for (h = o + 1; h <= r; ++h) {
                            const r = n[h % a];
                            r.skip || r.stop ? x.skip || (s = !1, l.push({
                                start: o % a,
                                end: (h - 1) % a,
                                loop: s
                            }), o = p = r.stop ? h : null) : (p = h, x.skip && (o = h)), x = r;
                        }
                        return null !== p && l.push({
                            start: o % a,
                            end: p % a,
                            loop: s
                        }), l;
                    }(r, h, p < h ? p + a : p, !!n._fullLoop && 0 === h && p === a - 1), r, o);
                }(this, this.options.segment));
            }
            first() {
                const n = this.segments, o = this.points;
                return n.length && o[n[0].start];
            }
            last() {
                const n = this.segments, o = this.points, r = n.length;
                return r && o[n[r - 1].end];
            }
            interpolate(n, o) {
                const r = this.options, s = n[o], a = this.points, l = _boundSegments(this, {
                    property: o,
                    start: s,
                    end: s
                });
                if (!l.length) return;
                const h = [], p = function(n) {
                    return n.stepped ? _steppedInterpolation : n.tension || "monotone" === n.cubicInterpolationMode ? _bezierInterpolation : _pointInLine;
                }(r);
                let x, _;
                for (x = 0, _ = l.length; x < _; ++x) {
                    const {start: _, end: y} = l[x], v = a[_], w = a[y];
                    if (v === w) {
                        h.push(v);
                        continue;
                    }
                    const k = p(v, w, Math.abs((s - v[o]) / (w[o] - v[o])), r.stepped);
                    k[o] = n[o], h.push(k);
                }
                return 1 === h.length ? h[0] : h;
            }
            pathSegment(n, o, r) {
                return _getSegmentMethod(this)(n, this, o, r);
            }
            path(n, o, r) {
                const s = this.segments, a = _getSegmentMethod(this);
                let l = this._loop;
                o = o || 0, r = r || this.points.length - o;
                for (const h of s) l &= a(n, this, h, {
                    start: o,
                    end: o + r - 1
                });
                return !!l;
            }
            draw(n, o, r, s) {
                const a = this.options || {};
                (this.points || []).length && a.borderWidth && (n.save(), draw(n, this, r, s), n.restore()), 
                this.animated && (this._pointsUpdated = !1, this._path = void 0);
            }
        }
        function inRange$1(n, o, r, s) {
            const a = n.options, {[r]: l} = n.getProps([ r ], s);
            return Math.abs(o - l) < a.radius + a.hitRadius;
        }
        LineElement.id = "line", LineElement.defaults = {
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            borderWidth: 3,
            capBezierPoints: !0,
            cubicInterpolationMode: "default",
            fill: !1,
            spanGaps: !1,
            stepped: !1,
            tension: 0
        }, LineElement.defaultRoutes = {
            backgroundColor: "backgroundColor",
            borderColor: "borderColor"
        }, LineElement.descriptors = {
            _scriptable: !0,
            _indexable: n => "borderDash" !== n && "fill" !== n
        };
        class PointElement extends Element {
            constructor(n) {
                super(), this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, 
                n && Object.assign(this, n);
            }
            inRange(n, o, r) {
                const s = this.options, {x: a, y: l} = this.getProps([ "x", "y" ], r);
                return Math.pow(n - a, 2) + Math.pow(o - l, 2) < Math.pow(s.hitRadius + s.radius, 2);
            }
            inXRange(n, o) {
                return inRange$1(this, n, "x", o);
            }
            inYRange(n, o) {
                return inRange$1(this, n, "y", o);
            }
            getCenterPoint(n) {
                const {x: o, y: r} = this.getProps([ "x", "y" ], n);
                return {
                    x: o,
                    y: r
                };
            }
            size(n) {
                let o = (n = n || this.options || {}).radius || 0;
                o = Math.max(o, o && n.hoverRadius || 0);
                return 2 * (o + (o && n.borderWidth || 0));
            }
            draw(n, o) {
                const r = this.options;
                this.skip || r.radius < .1 || !_isPointInArea(this, o, this.size(r) / 2) || (n.strokeStyle = r.borderColor, 
                n.lineWidth = r.borderWidth, n.fillStyle = r.backgroundColor, drawPoint(n, r, this.x, this.y));
            }
            getRange() {
                const n = this.options || {};
                return n.radius + n.hitRadius;
            }
        }
        function getBarBounds(n, o) {
            const {x: r, y: s, base: a, width: l, height: h} = n.getProps([ "x", "y", "base", "width", "height" ], o);
            let p, x, _, y, v;
            return n.horizontal ? (v = h / 2, p = Math.min(r, a), x = Math.max(r, a), _ = s - v, 
            y = s + v) : (v = l / 2, p = r - v, x = r + v, _ = Math.min(s, a), y = Math.max(s, a)), 
            {
                left: p,
                top: _,
                right: x,
                bottom: y
            };
        }
        function skipOrLimit(n, o, r, s) {
            return n ? 0 : _limitValue(o, r, s);
        }
        function boundingRects(n) {
            const o = getBarBounds(n), r = o.right - o.left, s = o.bottom - o.top, a = function(n, o, r) {
                const s = n.options.borderWidth, a = n.borderSkipped, l = toTRBL(s);
                return {
                    t: skipOrLimit(a.top, l.top, 0, r),
                    r: skipOrLimit(a.right, l.right, 0, o),
                    b: skipOrLimit(a.bottom, l.bottom, 0, r),
                    l: skipOrLimit(a.left, l.left, 0, o)
                };
            }(n, r / 2, s / 2), l = function(n, o, r) {
                const {enableBorderRadius: s} = n.getProps([ "enableBorderRadius" ]), a = n.options.borderRadius, l = toTRBLCorners(a), h = Math.min(o, r), p = n.borderSkipped, x = s || isObject(a);
                return {
                    topLeft: skipOrLimit(!x || p.top || p.left, l.topLeft, 0, h),
                    topRight: skipOrLimit(!x || p.top || p.right, l.topRight, 0, h),
                    bottomLeft: skipOrLimit(!x || p.bottom || p.left, l.bottomLeft, 0, h),
                    bottomRight: skipOrLimit(!x || p.bottom || p.right, l.bottomRight, 0, h)
                };
            }(n, r / 2, s / 2);
            return {
                outer: {
                    x: o.left,
                    y: o.top,
                    w: r,
                    h: s,
                    radius: l
                },
                inner: {
                    x: o.left + a.l,
                    y: o.top + a.t,
                    w: r - a.l - a.r,
                    h: s - a.t - a.b,
                    radius: {
                        topLeft: Math.max(0, l.topLeft - Math.max(a.t, a.l)),
                        topRight: Math.max(0, l.topRight - Math.max(a.t, a.r)),
                        bottomLeft: Math.max(0, l.bottomLeft - Math.max(a.b, a.l)),
                        bottomRight: Math.max(0, l.bottomRight - Math.max(a.b, a.r))
                    }
                }
            };
        }
        function inRange(n, o, r, s) {
            const a = null === o, l = null === r, h = n && !(a && l) && getBarBounds(n, s);
            return h && (a || _isBetween(o, h.left, h.right)) && (l || _isBetween(r, h.top, h.bottom));
        }
        function addNormalRectPath(n, o) {
            n.rect(o.x, o.y, o.w, o.h);
        }
        function inflateRect(n, o, r = {}) {
            const s = n.x !== r.x ? -o : 0, a = n.y !== r.y ? -o : 0, l = (n.x + n.w !== r.x + r.w ? o : 0) - s, h = (n.y + n.h !== r.y + r.h ? o : 0) - a;
            return {
                x: n.x + s,
                y: n.y + a,
                w: n.w + l,
                h: n.h + h,
                radius: n.radius
            };
        }
        PointElement.id = "point", PointElement.defaults = {
            borderWidth: 1,
            hitRadius: 1,
            hoverBorderWidth: 1,
            hoverRadius: 4,
            pointStyle: "circle",
            radius: 3,
            rotation: 0
        }, PointElement.defaultRoutes = {
            backgroundColor: "backgroundColor",
            borderColor: "borderColor"
        };
        class BarElement extends Element {
            constructor(n) {
                super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, 
                this.height = void 0, this.inflateAmount = void 0, n && Object.assign(this, n);
            }
            draw(n) {
                const {inflateAmount: o, options: {borderColor: r, backgroundColor: s}} = this, {inner: a, outer: l} = boundingRects(this), h = (p = l.radius).topLeft || p.topRight || p.bottomLeft || p.bottomRight ? addRoundedRectPath : addNormalRectPath;
                var p;
                n.save(), l.w === a.w && l.h === a.h || (n.beginPath(), h(n, inflateRect(l, o, a)), 
                n.clip(), h(n, inflateRect(a, -o, l)), n.fillStyle = r, n.fill("evenodd")), n.beginPath(), 
                h(n, inflateRect(a, o)), n.fillStyle = s, n.fill(), n.restore();
            }
            inRange(n, o, r) {
                return inRange(this, n, o, r);
            }
            inXRange(n, o) {
                return inRange(this, n, null, o);
            }
            inYRange(n, o) {
                return inRange(this, null, n, o);
            }
            getCenterPoint(n) {
                const {x: o, y: r, base: s, horizontal: a} = this.getProps([ "x", "y", "base", "horizontal" ], n);
                return {
                    x: a ? (o + s) / 2 : o,
                    y: a ? r : (r + s) / 2
                };
            }
            getRange(n) {
                return "x" === n ? this.width / 2 : this.height / 2;
            }
        }
        BarElement.id = "bar", BarElement.defaults = {
            borderSkipped: "start",
            borderWidth: 0,
            borderRadius: 0,
            inflateAmount: "auto",
            pointStyle: void 0
        }, BarElement.defaultRoutes = {
            backgroundColor: "backgroundColor",
            borderColor: "borderColor"
        };
        function cleanDecimatedDataset(n) {
            if (n._decimated) {
                const o = n._data;
                delete n._decimated, delete n._data, Object.defineProperty(n, "data", {
                    value: o
                });
            }
        }
        function cleanDecimatedData(n) {
            n.data.datasets.forEach((n => {
                cleanDecimatedDataset(n);
            }));
        }
        var gt = {
            id: "decimation",
            defaults: {
                algorithm: "min-max",
                enabled: !1
            },
            beforeElementsUpdate: (n, o, r) => {
                if (!r.enabled) return void cleanDecimatedData(n);
                const s = n.width;
                n.data.datasets.forEach(((o, a) => {
                    const {_data: l, indexAxis: h} = o, p = n.getDatasetMeta(a), x = l || o.data;
                    if ("y" === resolve([ h, n.options.indexAxis ])) return;
                    if (!p.controller.supportsDecimation) return;
                    const _ = n.scales[p.xAxisID];
                    if ("linear" !== _.type && "time" !== _.type) return;
                    if (n.options.parsing) return;
                    let {start: y, count: v} = function(n, o) {
                        const r = o.length;
                        let s, a = 0;
                        const {iScale: l} = n, {min: h, max: p, minDefined: x, maxDefined: _} = l.getUserBounds();
                        return x && (a = _limitValue(_lookupByKey(o, l.axis, h).lo, 0, r - 1)), s = _ ? _limitValue(_lookupByKey(o, l.axis, p).hi + 1, a, r) - a : r - a, 
                        {
                            start: a,
                            count: s
                        };
                    }(p, x);
                    if (v <= (r.threshold || 4 * s)) return void cleanDecimatedDataset(o);
                    let w;
                    switch (isNullOrUndef(l) && (o._data = x, delete o.data, Object.defineProperty(o, "data", {
                        configurable: !0,
                        enumerable: !0,
                        get: function() {
                            return this._decimated;
                        },
                        set: function(n) {
                            this._data = n;
                        }
                    })), r.algorithm) {
                      case "lttb":
                        w = function(n, o, r, s, a) {
                            const l = a.samples || s;
                            if (l >= r) return n.slice(o, o + r);
                            const h = [], p = (r - 2) / (l - 2);
                            let x = 0;
                            const _ = o + r - 1;
                            let y, v, w, k, S, P = o;
                            for (h[x++] = n[P], y = 0; y < l - 2; y++) {
                                let s, a = 0, l = 0;
                                const _ = Math.floor((y + 1) * p) + 1 + o, A = Math.min(Math.floor((y + 2) * p) + 1, r) + o, T = A - _;
                                for (s = _; s < A; s++) a += n[s].x, l += n[s].y;
                                a /= T, l /= T;
                                const R = Math.floor(y * p) + 1 + o, O = Math.min(Math.floor((y + 1) * p) + 1, r) + o, {x: C, y: z} = n[P];
                                for (w = k = -1, s = R; s < O; s++) k = .5 * Math.abs((C - a) * (n[s].y - z) - (C - n[s].x) * (l - z)), 
                                k > w && (w = k, v = n[s], S = s);
                                h[x++] = v, P = S;
                            }
                            return h[x++] = n[_], h;
                        }(x, y, v, s, r);
                        break;

                      case "min-max":
                        w = function(n, o, r, s) {
                            let a, l, h, p, x, _, y, v, w, k, S = 0, P = 0;
                            const A = [], T = o + r - 1, R = n[o].x, O = n[T].x - R;
                            for (a = o; a < o + r; ++a) {
                                l = n[a], h = (l.x - R) / O * s, p = l.y;
                                const o = 0 | h;
                                if (o === x) p < w ? (w = p, _ = a) : p > k && (k = p, y = a), S = (P * S + l.x) / ++P; else {
                                    const r = a - 1;
                                    if (!isNullOrUndef(_) && !isNullOrUndef(y)) {
                                        const o = Math.min(_, y), s = Math.max(_, y);
                                        o !== v && o !== r && A.push({
                                            ...n[o],
                                            x: S
                                        }), s !== v && s !== r && A.push({
                                            ...n[s],
                                            x: S
                                        });
                                    }
                                    a > 0 && r !== v && A.push(n[r]), A.push(l), x = o, P = 0, w = k = p, _ = y = v = a;
                                }
                            }
                            return A;
                        }(x, y, v, s);
                        break;

                      default:
                        throw new Error(`Unsupported decimation algorithm '${r.algorithm}'`);
                    }
                    o._decimated = w;
                }));
            },
            destroy(n) {
                cleanDecimatedData(n);
            }
        };
        function _getBounds(n, o, r, s) {
            if (s) return;
            let a = o[n], l = r[n];
            return "angle" === n && (a = _normalizeAngle(a), l = _normalizeAngle(l)), {
                property: n,
                start: a,
                end: l
            };
        }
        function _findSegmentEnd(n, o, r) {
            for (;o > n; o--) {
                const n = r[o];
                if (!isNaN(n.x) && !isNaN(n.y)) break;
            }
            return o;
        }
        function _getEdge(n, o, r, s) {
            return n && o ? s(n[r], o[r]) : n ? n[r] : o ? o[r] : 0;
        }
        function _createBoundaryLine(n, o) {
            let r = [], s = !1;
            return isArray(n) ? (s = !0, r = n) : r = function(n, o) {
                const {x: r = null, y: s = null} = n || {}, a = o.points, l = [];
                return o.segments.forEach((({start: n, end: o}) => {
                    o = _findSegmentEnd(n, o, a);
                    const h = a[n], p = a[o];
                    null !== s ? (l.push({
                        x: h.x,
                        y: s
                    }), l.push({
                        x: p.x,
                        y: s
                    })) : null !== r && (l.push({
                        x: r,
                        y: h.y
                    }), l.push({
                        x: r,
                        y: p.y
                    }));
                })), l;
            }(n, o), r.length ? new LineElement({
                points: r,
                options: {
                    tension: 0
                },
                _loop: s,
                _fullLoop: s
            }) : null;
        }
        function _shouldApplyFill(n) {
            return n && !1 !== n.fill;
        }
        function _resolveTarget(n, o, r) {
            let s = n[o].fill;
            const a = [ o ];
            let l;
            if (!r) return s;
            for (;!1 !== s && -1 === a.indexOf(s); ) {
                if (!isNumberFinite(s)) return s;
                if (l = n[s], !l) return !1;
                if (l.visible) return s;
                a.push(s), s = l.fill;
            }
            return !1;
        }
        function _decodeFill(n, o, r) {
            const s = function(n) {
                const o = n.options, r = o.fill;
                let s = valueOrDefault(r && r.target, r);
                void 0 === s && (s = !!o.backgroundColor);
                if (!1 === s || null === s) return !1;
                if (!0 === s) return "origin";
                return s;
            }(n);
            if (isObject(s)) return !isNaN(s.value) && s;
            let a = parseFloat(s);
            return isNumberFinite(a) && Math.floor(a) === a ? function(n, o, r, s) {
                "-" !== n && "+" !== n || (r = o + r);
                if (r === o || r < 0 || r >= s) return !1;
                return r;
            }(s[0], o, a, r) : [ "origin", "start", "end", "stack", "shape" ].indexOf(s) >= 0 && s;
        }
        function addPointsBelow(n, o, r) {
            const s = [];
            for (let a = 0; a < r.length; a++) {
                const l = r[a], {first: h, last: p, point: x} = findPoint(l, o, "x");
                if (!(!x || h && p)) if (h) s.unshift(x); else if (n.push(x), !p) break;
            }
            n.push(...s);
        }
        function findPoint(n, o, r) {
            const s = n.interpolate(o, r);
            if (!s) return {};
            const a = s[r], l = n.segments, h = n.points;
            let p = !1, x = !1;
            for (let n = 0; n < l.length; n++) {
                const o = l[n], s = h[o.start][r], _ = h[o.end][r];
                if (_isBetween(a, s, _)) {
                    p = a === s, x = a === _;
                    break;
                }
            }
            return {
                first: p,
                last: x,
                point: s
            };
        }
        class simpleArc {
            constructor(n) {
                this.x = n.x, this.y = n.y, this.radius = n.radius;
            }
            pathSegment(n, o, r) {
                const {x: s, y: a, radius: l} = this;
                return o = o || {
                    start: 0,
                    end: h
                }, n.arc(s, a, l, o.end, o.start, !0), !r.bounds;
            }
            interpolate(n) {
                const {x: o, y: r, radius: s} = this, a = n.angle;
                return {
                    x: o + Math.cos(a) * s,
                    y: r + Math.sin(a) * s,
                    angle: a
                };
            }
        }
        function _getTarget(n) {
            const {chart: o, fill: r, line: s} = n;
            if (isNumberFinite(r)) return function(n, o) {
                const r = n.getDatasetMeta(o);
                return r && n.isDatasetVisible(o) ? r.dataset : null;
            }(o, r);
            if ("stack" === r) return function(n) {
                const {scale: o, index: r, line: s} = n, a = [], l = s.segments, h = s.points, p = function(n, o) {
                    const r = [], s = n.getMatchingVisibleMetas("line");
                    for (let n = 0; n < s.length; n++) {
                        const a = s[n];
                        if (a.index === o) break;
                        a.hidden || r.unshift(a.dataset);
                    }
                    return r;
                }(o, r);
                p.push(_createBoundaryLine({
                    x: null,
                    y: o.bottom
                }, s));
                for (let n = 0; n < l.length; n++) {
                    const o = l[n];
                    for (let n = o.start; n <= o.end; n++) addPointsBelow(a, h[n], p);
                }
                return new LineElement({
                    points: a,
                    options: {}
                });
            }(n);
            if ("shape" === r) return !0;
            const a = function(n) {
                if ((n.scale || {}).getPointPositionForValue) return function(n) {
                    const {scale: o, fill: r} = n, s = o.options, a = o.getLabels().length, l = s.reverse ? o.max : o.min, h = function(n, o, r) {
                        let s;
                        return s = "start" === n ? r : "end" === n ? o.options.reverse ? o.min : o.max : isObject(n) ? n.value : o.getBaseValue(), 
                        s;
                    }(r, o, l), p = [];
                    if (s.grid.circular) {
                        const n = o.getPointPositionForValue(0, l);
                        return new simpleArc({
                            x: n.x,
                            y: n.y,
                            radius: o.getDistanceFromCenterForValue(h)
                        });
                    }
                    for (let n = 0; n < a; ++n) p.push(o.getPointPositionForValue(n, h));
                    return p;
                }(n);
                return function(n) {
                    const {scale: o = {}, fill: r} = n, s = function(n, o) {
                        let r = null;
                        return "start" === n ? r = o.bottom : "end" === n ? r = o.top : isObject(n) ? r = o.getPixelForValue(n.value) : o.getBasePixel && (r = o.getBasePixel()), 
                        r;
                    }(r, o);
                    if (isNumberFinite(s)) {
                        const n = o.isHorizontal();
                        return {
                            x: n ? s : null,
                            y: n ? null : s
                        };
                    }
                    return null;
                }(n);
            }(n);
            return a instanceof simpleArc ? a : _createBoundaryLine(a, s);
        }
        function _drawfill(n, o, r) {
            const s = _getTarget(o), {line: a, scale: l, axis: h} = o, p = a.options, x = p.fill, _ = p.backgroundColor, {above: y = _, below: v = _} = x || {};
            s && a.points.length && (clipArea(n, r), function(n, o) {
                const {line: r, target: s, above: a, below: l, area: h, scale: p} = o, x = r._loop ? "angle" : o.axis;
                n.save(), "x" === x && l !== a && (clipVertical(n, s, h.top), fill(n, {
                    line: r,
                    target: s,
                    color: a,
                    scale: p,
                    property: x
                }), n.restore(), n.save(), clipVertical(n, s, h.bottom));
                fill(n, {
                    line: r,
                    target: s,
                    color: l,
                    scale: p,
                    property: x
                }), n.restore();
            }(n, {
                line: a,
                target: s,
                above: y,
                below: v,
                area: r,
                scale: l,
                axis: h
            }), unclipArea(n));
        }
        function clipVertical(n, o, r) {
            const {segments: s, points: a} = o;
            let l = !0, h = !1;
            n.beginPath();
            for (const p of s) {
                const {start: s, end: x} = p, _ = a[s], y = a[_findSegmentEnd(s, x, a)];
                l ? (n.moveTo(_.x, _.y), l = !1) : (n.lineTo(_.x, r), n.lineTo(_.x, _.y)), h = !!o.pathSegment(n, p, {
                    move: h
                }), h ? n.closePath() : n.lineTo(y.x, r);
            }
            n.lineTo(o.first().x, r), n.closePath(), n.clip();
        }
        function fill(n, o) {
            const {line: r, target: s, property: a, color: l, scale: h} = o, p = function(n, o, r) {
                const s = n.segments, a = n.points, l = o.points, h = [];
                for (const n of s) {
                    let {start: s, end: p} = n;
                    p = _findSegmentEnd(s, p, a);
                    const x = _getBounds(r, a[s], a[p], n.loop);
                    if (!o.segments) {
                        h.push({
                            source: n,
                            target: x,
                            start: a[s],
                            end: a[p]
                        });
                        continue;
                    }
                    const _ = _boundSegments(o, x);
                    for (const o of _) {
                        const s = _getBounds(r, l[o.start], l[o.end], o.loop), p = _boundSegment(n, a, s);
                        for (const n of p) h.push({
                            source: n,
                            target: o,
                            start: {
                                [r]: _getEdge(x, s, "start", Math.max)
                            },
                            end: {
                                [r]: _getEdge(x, s, "end", Math.min)
                            }
                        });
                    }
                }
                return h;
            }(r, s, a);
            for (const {source: o, target: x, start: _, end: y} of p) {
                const {style: {backgroundColor: p = l} = {}} = o, v = !0 !== s;
                n.save(), n.fillStyle = p, clipBounds(n, h, v && _getBounds(a, _, y)), n.beginPath();
                const w = !!r.pathSegment(n, o);
                let k;
                if (v) {
                    w ? n.closePath() : interpolatedLineTo(n, s, y, a);
                    const o = !!s.pathSegment(n, x, {
                        move: w,
                        reverse: !0
                    });
                    k = w && o, k || interpolatedLineTo(n, s, _, a);
                }
                n.closePath(), n.fill(k ? "evenodd" : "nonzero"), n.restore();
            }
        }
        function clipBounds(n, o, r) {
            const {top: s, bottom: a} = o.chart.chartArea, {property: l, start: h, end: p} = r || {};
            "x" === l && (n.beginPath(), n.rect(h, s, p - h, a - s), n.clip());
        }
        function interpolatedLineTo(n, o, r, s) {
            const a = o.interpolate(r, s);
            a && n.lineTo(a.x, a.y);
        }
        var mt = {
            id: "filler",
            afterDatasetsUpdate(n, o, r) {
                const s = (n.data.datasets || []).length, a = [];
                let l, h, p, x;
                for (h = 0; h < s; ++h) l = n.getDatasetMeta(h), p = l.dataset, x = null, p && p.options && p instanceof LineElement && (x = {
                    visible: n.isDatasetVisible(h),
                    index: h,
                    fill: _decodeFill(p, h, s),
                    chart: n,
                    axis: l.controller.options.indexAxis,
                    scale: l.vScale,
                    line: p
                }), l.$filler = x, a.push(x);
                for (h = 0; h < s; ++h) x = a[h], x && !1 !== x.fill && (x.fill = _resolveTarget(a, h, r.propagate));
            },
            beforeDraw(n, o, r) {
                const s = "beforeDraw" === r.drawTime, a = n.getSortedVisibleDatasetMetas(), l = n.chartArea;
                for (let o = a.length - 1; o >= 0; --o) {
                    const r = a[o].$filler;
                    r && (r.line.updateControlPoints(l, r.axis), s && r.fill && _drawfill(n.ctx, r, l));
                }
            },
            beforeDatasetsDraw(n, o, r) {
                if ("beforeDatasetsDraw" !== r.drawTime) return;
                const s = n.getSortedVisibleDatasetMetas();
                for (let o = s.length - 1; o >= 0; --o) {
                    const r = s[o].$filler;
                    _shouldApplyFill(r) && _drawfill(n.ctx, r, n.chartArea);
                }
            },
            beforeDatasetDraw(n, o, r) {
                const s = o.meta.$filler;
                _shouldApplyFill(s) && "beforeDatasetDraw" === r.drawTime && _drawfill(n.ctx, s, n.chartArea);
            },
            defaults: {
                propagate: !0,
                drawTime: "beforeDatasetDraw"
            }
        };
        const getBoxSize = (n, o) => {
            let {boxHeight: r = o, boxWidth: s = o} = n;
            return n.usePointStyle && (r = Math.min(r, o), s = n.pointStyleWidth || Math.min(s, o)), 
            {
                boxWidth: s,
                boxHeight: r,
                itemHeight: Math.max(o, r)
            };
        };
        class Legend extends Element {
            constructor(n) {
                super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, 
                this.chart = n.chart, this.options = n.options, this.ctx = n.ctx, this.legendItems = void 0, 
                this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, 
                this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, 
                this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, 
                this.weight = void 0, this.fullSize = void 0;
            }
            update(n, o, r) {
                this.maxWidth = n, this.maxHeight = o, this._margins = r, this.setDimensions(), 
                this.buildLabels(), this.fit();
            }
            setDimensions() {
                this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, 
                this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, 
                this.bottom = this.height);
            }
            buildLabels() {
                const n = this.options.labels || {};
                let o = callback(n.generateLabels, [ this.chart ], this) || [];
                n.filter && (o = o.filter((o => n.filter(o, this.chart.data)))), n.sort && (o = o.sort(((o, r) => n.sort(o, r, this.chart.data)))), 
                this.options.reverse && o.reverse(), this.legendItems = o;
            }
            fit() {
                const {options: n, ctx: o} = this;
                if (!n.display) return void (this.width = this.height = 0);
                const r = n.labels, s = toFont(r.font), a = s.size, l = this._computeTitleHeight(), {boxWidth: h, itemHeight: p} = getBoxSize(r, a);
                let x, _;
                o.font = s.string, this.isHorizontal() ? (x = this.maxWidth, _ = this._fitRows(l, a, h, p) + 10) : (_ = this.maxHeight, 
                x = this._fitCols(l, a, h, p) + 10), this.width = Math.min(x, n.maxWidth || this.maxWidth), 
                this.height = Math.min(_, n.maxHeight || this.maxHeight);
            }
            _fitRows(n, o, r, s) {
                const {ctx: a, maxWidth: l, options: {labels: {padding: h}}} = this, p = this.legendHitBoxes = [], x = this.lineWidths = [ 0 ], _ = s + h;
                let y = n;
                a.textAlign = "left", a.textBaseline = "middle";
                let v = -1, w = -_;
                return this.legendItems.forEach(((n, k) => {
                    const S = r + o / 2 + a.measureText(n.text).width;
                    (0 === k || x[x.length - 1] + S + 2 * h > l) && (y += _, x[x.length - (k > 0 ? 0 : 1)] = 0, 
                    w += _, v++), p[k] = {
                        left: 0,
                        top: w,
                        row: v,
                        width: S,
                        height: s
                    }, x[x.length - 1] += S + h;
                })), y;
            }
            _fitCols(n, o, r, s) {
                const {ctx: a, maxHeight: l, options: {labels: {padding: h}}} = this, p = this.legendHitBoxes = [], x = this.columnSizes = [], _ = l - n;
                let y = h, v = 0, w = 0, k = 0, S = 0;
                return this.legendItems.forEach(((n, l) => {
                    const P = r + o / 2 + a.measureText(n.text).width;
                    l > 0 && w + s + 2 * h > _ && (y += v + h, x.push({
                        width: v,
                        height: w
                    }), k += v + h, S++, v = w = 0), p[l] = {
                        left: k,
                        top: w,
                        col: S,
                        width: P,
                        height: s
                    }, v = Math.max(v, P), w += s + h;
                })), y += v, x.push({
                    width: v,
                    height: w
                }), y;
            }
            adjustHitBoxes() {
                if (!this.options.display) return;
                const n = this._computeTitleHeight(), {legendHitBoxes: o, options: {align: r, labels: {padding: s}, rtl: a}} = this, l = getRtlAdapter(a, this.left, this.width);
                if (this.isHorizontal()) {
                    let a = 0, h = _alignStartEnd(r, this.left + s, this.right - this.lineWidths[a]);
                    for (const p of o) a !== p.row && (a = p.row, h = _alignStartEnd(r, this.left + s, this.right - this.lineWidths[a])), 
                    p.top += this.top + n + s, p.left = l.leftForLtr(l.x(h), p.width), h += p.width + s;
                } else {
                    let a = 0, h = _alignStartEnd(r, this.top + n + s, this.bottom - this.columnSizes[a].height);
                    for (const p of o) p.col !== a && (a = p.col, h = _alignStartEnd(r, this.top + n + s, this.bottom - this.columnSizes[a].height)), 
                    p.top = h, p.left += this.left + s, p.left = l.leftForLtr(l.x(p.left), p.width), 
                    h += p.height + s;
                }
            }
            isHorizontal() {
                return "top" === this.options.position || "bottom" === this.options.position;
            }
            draw() {
                if (this.options.display) {
                    const n = this.ctx;
                    clipArea(n, this), this._draw(), unclipArea(n);
                }
            }
            _draw() {
                const {options: n, columnSizes: o, lineWidths: r, ctx: s} = this, {align: a, labels: l} = n, h = F.color, p = getRtlAdapter(n.rtl, this.left, this.width), x = toFont(l.font), {color: _, padding: y} = l, v = x.size, w = v / 2;
                let k;
                this.drawTitle(), s.textAlign = p.textAlign("left"), s.textBaseline = "middle", 
                s.lineWidth = .5, s.font = x.string;
                const {boxWidth: S, boxHeight: P, itemHeight: A} = getBoxSize(l, v), T = this.isHorizontal(), R = this._computeTitleHeight();
                k = T ? {
                    x: _alignStartEnd(a, this.left + y, this.right - r[0]),
                    y: this.top + y + R,
                    line: 0
                } : {
                    x: this.left + y,
                    y: _alignStartEnd(a, this.top + R + y, this.bottom - o[0].height),
                    line: 0
                }, overrideTextDirection(this.ctx, n.textDirection);
                const O = A + y;
                this.legendItems.forEach(((C, z) => {
                    s.strokeStyle = C.fontColor || _, s.fillStyle = C.fontColor || _;
                    const M = s.measureText(C.text).width, I = p.textAlign(C.textAlign || (C.textAlign = l.textAlign)), E = S + w + M;
                    let $ = k.x, N = k.y;
                    p.setWidth(this.width), T ? z > 0 && $ + E + y > this.right && (N = k.y += O, k.line++, 
                    $ = k.x = _alignStartEnd(a, this.left + y, this.right - r[k.line])) : z > 0 && N + O > this.bottom && ($ = k.x = $ + o[k.line].width + y, 
                    k.line++, N = k.y = _alignStartEnd(a, this.top + R + y, this.bottom - o[k.line].height));
                    !function(n, o, r) {
                        if (isNaN(S) || S <= 0 || isNaN(P) || P < 0) return;
                        s.save();
                        const a = valueOrDefault(r.lineWidth, 1);
                        if (s.fillStyle = valueOrDefault(r.fillStyle, h), s.lineCap = valueOrDefault(r.lineCap, "butt"), 
                        s.lineDashOffset = valueOrDefault(r.lineDashOffset, 0), s.lineJoin = valueOrDefault(r.lineJoin, "miter"), 
                        s.lineWidth = a, s.strokeStyle = valueOrDefault(r.strokeStyle, h), s.setLineDash(valueOrDefault(r.lineDash, [])), 
                        l.usePointStyle) {
                            const h = {
                                radius: P * Math.SQRT2 / 2,
                                pointStyle: r.pointStyle,
                                rotation: r.rotation,
                                borderWidth: a
                            }, x = p.xPlus(n, S / 2);
                            drawPointLegend(s, h, x, o + w, l.pointStyleWidth && S);
                        } else {
                            const l = o + Math.max((v - P) / 2, 0), h = p.leftForLtr(n, S), x = toTRBLCorners(r.borderRadius);
                            s.beginPath(), Object.values(x).some((n => 0 !== n)) ? addRoundedRectPath(s, {
                                x: h,
                                y: l,
                                w: S,
                                h: P,
                                radius: x
                            }) : s.rect(h, l, S, P), s.fill(), 0 !== a && s.stroke();
                        }
                        s.restore();
                    }(p.x($), N, C), $ = ((n, o, r, s) => n === (s ? "left" : "right") ? r : "center" === n ? (o + r) / 2 : o)(I, $ + S + w, T ? $ + E : this.right, n.rtl), 
                    function(n, o, r) {
                        renderText(s, r.text, n, o + A / 2, x, {
                            strikethrough: r.hidden,
                            textAlign: p.textAlign(r.textAlign)
                        });
                    }(p.x($), N, C), T ? k.x += E + y : k.y += O;
                })), restoreTextDirection(this.ctx, n.textDirection);
            }
            drawTitle() {
                const n = this.options, o = n.title, r = toFont(o.font), s = toPadding(o.padding);
                if (!o.display) return;
                const a = getRtlAdapter(n.rtl, this.left, this.width), l = this.ctx, h = o.position, p = r.size / 2, x = s.top + p;
                let _, y = this.left, v = this.width;
                if (this.isHorizontal()) v = Math.max(...this.lineWidths), _ = this.top + x, y = _alignStartEnd(n.align, y, this.right - v); else {
                    const o = this.columnSizes.reduce(((n, o) => Math.max(n, o.height)), 0);
                    _ = x + _alignStartEnd(n.align, this.top, this.bottom - o - n.labels.padding - this._computeTitleHeight());
                }
                const w = _alignStartEnd(h, y, y + v);
                l.textAlign = a.textAlign(_toLeftRightCenter(h)), l.textBaseline = "middle", l.strokeStyle = o.color, 
                l.fillStyle = o.color, l.font = r.string, renderText(l, o.text, w, _, r);
            }
            _computeTitleHeight() {
                const n = this.options.title, o = toFont(n.font), r = toPadding(n.padding);
                return n.display ? o.lineHeight + r.height : 0;
            }
            _getLegendItemAt(n, o) {
                let r, s, a;
                if (_isBetween(n, this.left, this.right) && _isBetween(o, this.top, this.bottom)) for (a = this.legendHitBoxes, 
                r = 0; r < a.length; ++r) if (s = a[r], _isBetween(n, s.left, s.left + s.width) && _isBetween(o, s.top, s.top + s.height)) return this.legendItems[r];
                return null;
            }
            handleEvent(n) {
                const o = this.options;
                if (!function(n, o) {
                    if (("mousemove" === n || "mouseout" === n) && (o.onHover || o.onLeave)) return !0;
                    if (o.onClick && ("click" === n || "mouseup" === n)) return !0;
                    return !1;
                }(n.type, o)) return;
                const r = this._getLegendItemAt(n.x, n.y);
                if ("mousemove" === n.type || "mouseout" === n.type) {
                    const l = this._hoveredItem, h = (a = r, null !== (s = l) && null !== a && s.datasetIndex === a.datasetIndex && s.index === a.index);
                    l && !h && callback(o.onLeave, [ n, l, this ], this), this._hoveredItem = r, r && !h && callback(o.onHover, [ n, r, this ], this);
                } else r && callback(o.onClick, [ n, r, this ], this);
                var s, a;
            }
        }
        var bt = {
            id: "legend",
            _element: Legend,
            start(n, o, r) {
                const s = n.legend = new Legend({
                    ctx: n.ctx,
                    options: r,
                    chart: n
                });
                ot.configure(n, s, r), ot.addBox(n, s);
            },
            stop(n) {
                ot.removeBox(n, n.legend), delete n.legend;
            },
            beforeUpdate(n, o, r) {
                const s = n.legend;
                ot.configure(n, s, r), s.options = r;
            },
            afterUpdate(n) {
                const o = n.legend;
                o.buildLabels(), o.adjustHitBoxes();
            },
            afterEvent(n, o) {
                o.replay || n.legend.handleEvent(o.event);
            },
            defaults: {
                display: !0,
                position: "top",
                align: "center",
                fullSize: !0,
                reverse: !1,
                weight: 1e3,
                onClick(n, o, r) {
                    const s = o.datasetIndex, a = r.chart;
                    a.isDatasetVisible(s) ? (a.hide(s), o.hidden = !0) : (a.show(s), o.hidden = !1);
                },
                onHover: null,
                onLeave: null,
                labels: {
                    color: n => n.chart.options.color,
                    boxWidth: 40,
                    padding: 10,
                    generateLabels(n) {
                        const o = n.data.datasets, {labels: {usePointStyle: r, pointStyle: s, textAlign: a, color: l}} = n.legend.options;
                        return n._getSortedDatasetMetas().map((n => {
                            const h = n.controller.getStyle(r ? 0 : void 0), p = toPadding(h.borderWidth);
                            return {
                                text: o[n.index].label,
                                fillStyle: h.backgroundColor,
                                fontColor: l,
                                hidden: !n.visible,
                                lineCap: h.borderCapStyle,
                                lineDash: h.borderDash,
                                lineDashOffset: h.borderDashOffset,
                                lineJoin: h.borderJoinStyle,
                                lineWidth: (p.width + p.height) / 4,
                                strokeStyle: h.borderColor,
                                pointStyle: s || h.pointStyle,
                                rotation: h.rotation,
                                textAlign: a || h.textAlign,
                                borderRadius: 0,
                                datasetIndex: n.index
                            };
                        }), this);
                    }
                },
                title: {
                    color: n => n.chart.options.color,
                    display: !1,
                    position: "center",
                    text: ""
                }
            },
            descriptors: {
                _scriptable: n => !n.startsWith("on"),
                labels: {
                    _scriptable: n => ![ "generateLabels", "filter", "sort" ].includes(n)
                }
            }
        };
        class Title extends Element {
            constructor(n) {
                super(), this.chart = n.chart, this.options = n.options, this.ctx = n.ctx, this._padding = void 0, 
                this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, 
                this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, 
                this.fullSize = void 0;
            }
            update(n, o) {
                const r = this.options;
                if (this.left = 0, this.top = 0, !r.display) return void (this.width = this.height = this.right = this.bottom = 0);
                this.width = this.right = n, this.height = this.bottom = o;
                const s = isArray(r.text) ? r.text.length : 1;
                this._padding = toPadding(r.padding);
                const a = s * toFont(r.font).lineHeight + this._padding.height;
                this.isHorizontal() ? this.height = a : this.width = a;
            }
            isHorizontal() {
                const n = this.options.position;
                return "top" === n || "bottom" === n;
            }
            _drawArgs(n) {
                const {top: o, left: r, bottom: s, right: a, options: h} = this, p = h.align;
                let x, _, y, v = 0;
                return this.isHorizontal() ? (_ = _alignStartEnd(p, r, a), y = o + n, x = a - r) : ("left" === h.position ? (_ = r + n, 
                y = _alignStartEnd(p, s, o), v = -.5 * l) : (_ = a - n, y = _alignStartEnd(p, o, s), 
                v = .5 * l), x = s - o), {
                    titleX: _,
                    titleY: y,
                    maxWidth: x,
                    rotation: v
                };
            }
            draw() {
                const n = this.ctx, o = this.options;
                if (!o.display) return;
                const r = toFont(o.font), s = r.lineHeight / 2 + this._padding.top, {titleX: a, titleY: l, maxWidth: h, rotation: p} = this._drawArgs(s);
                renderText(n, o.text, 0, 0, r, {
                    color: o.color,
                    maxWidth: h,
                    rotation: p,
                    textAlign: _toLeftRightCenter(o.align),
                    textBaseline: "middle",
                    translation: [ a, l ]
                });
            }
        }
        var xt = {
            id: "title",
            _element: Title,
            start(n, o, r) {
                !function(n, o) {
                    const r = new Title({
                        ctx: n.ctx,
                        options: o,
                        chart: n
                    });
                    ot.configure(n, r, o), ot.addBox(n, r), n.titleBlock = r;
                }(n, r);
            },
            stop(n) {
                const o = n.titleBlock;
                ot.removeBox(n, o), delete n.titleBlock;
            },
            beforeUpdate(n, o, r) {
                const s = n.titleBlock;
                ot.configure(n, s, r), s.options = r;
            },
            defaults: {
                align: "center",
                display: !1,
                font: {
                    weight: "bold"
                },
                fullSize: !0,
                padding: 10,
                position: "top",
                text: "",
                weight: 2e3
            },
            defaultRoutes: {
                color: "color"
            },
            descriptors: {
                _scriptable: !0,
                _indexable: !1
            }
        };
        const _t = new WeakMap;
        var yt = {
            id: "subtitle",
            start(n, o, r) {
                const s = new Title({
                    ctx: n.ctx,
                    options: r,
                    chart: n
                });
                ot.configure(n, s, r), ot.addBox(n, s), _t.set(n, s);
            },
            stop(n) {
                ot.removeBox(n, _t.get(n)), _t.delete(n);
            },
            beforeUpdate(n, o, r) {
                const s = _t.get(n);
                ot.configure(n, s, r), s.options = r;
            },
            defaults: {
                align: "center",
                display: !1,
                font: {
                    weight: "normal"
                },
                fullSize: !0,
                padding: 0,
                position: "top",
                text: "",
                weight: 1500
            },
            defaultRoutes: {
                color: "color"
            },
            descriptors: {
                _scriptable: !0,
                _indexable: !1
            }
        };
        const vt = {
            average(n) {
                if (!n.length) return !1;
                let o, r, s = 0, a = 0, l = 0;
                for (o = 0, r = n.length; o < r; ++o) {
                    const r = n[o].element;
                    if (r && r.hasValue()) {
                        const n = r.tooltipPosition();
                        s += n.x, a += n.y, ++l;
                    }
                }
                return {
                    x: s / l,
                    y: a / l
                };
            },
            nearest(n, o) {
                if (!n.length) return !1;
                let r, s, a, l = o.x, h = o.y, p = Number.POSITIVE_INFINITY;
                for (r = 0, s = n.length; r < s; ++r) {
                    const s = n[r].element;
                    if (s && s.hasValue()) {
                        const n = distanceBetweenPoints(o, s.getCenterPoint());
                        n < p && (p = n, a = s);
                    }
                }
                if (a) {
                    const n = a.tooltipPosition();
                    l = n.x, h = n.y;
                }
                return {
                    x: l,
                    y: h
                };
            }
        };
        function pushOrConcat(n, o) {
            return o && (isArray(o) ? Array.prototype.push.apply(n, o) : n.push(o)), n;
        }
        function splitNewlines(n) {
            return ("string" == typeof n || n instanceof String) && n.indexOf("\n") > -1 ? n.split("\n") : n;
        }
        function createTooltipItem(n, o) {
            const {element: r, datasetIndex: s, index: a} = o, l = n.getDatasetMeta(s).controller, {label: h, value: p} = l.getLabelAndValue(a);
            return {
                chart: n,
                label: h,
                parsed: l.getParsed(a),
                raw: n.data.datasets[s].data[a],
                formattedValue: p,
                dataset: l.getDataset(),
                dataIndex: a,
                datasetIndex: s,
                element: r
            };
        }
        function getTooltipSize(n, o) {
            const r = n.chart.ctx, {body: s, footer: a, title: l} = n, {boxWidth: h, boxHeight: p} = o, x = toFont(o.bodyFont), _ = toFont(o.titleFont), y = toFont(o.footerFont), v = l.length, w = a.length, k = s.length, S = toPadding(o.padding);
            let P = S.height, A = 0, T = s.reduce(((n, o) => n + o.before.length + o.lines.length + o.after.length), 0);
            if (T += n.beforeBody.length + n.afterBody.length, v && (P += v * _.lineHeight + (v - 1) * o.titleSpacing + o.titleMarginBottom), 
            T) {
                P += k * (o.displayColors ? Math.max(p, x.lineHeight) : x.lineHeight) + (T - k) * x.lineHeight + (T - 1) * o.bodySpacing;
            }
            w && (P += o.footerMarginTop + w * y.lineHeight + (w - 1) * o.footerSpacing);
            let R = 0;
            const maxLineWidth = function(n) {
                A = Math.max(A, r.measureText(n).width + R);
            };
            return r.save(), r.font = _.string, each(n.title, maxLineWidth), r.font = x.string, 
            each(n.beforeBody.concat(n.afterBody), maxLineWidth), R = o.displayColors ? h + 2 + o.boxPadding : 0, 
            each(s, (n => {
                each(n.before, maxLineWidth), each(n.lines, maxLineWidth), each(n.after, maxLineWidth);
            })), R = 0, r.font = y.string, each(n.footer, maxLineWidth), r.restore(), A += S.width, 
            {
                width: A,
                height: P
            };
        }
        function determineXAlign(n, o, r, s) {
            const {x: a, width: l} = r, {width: h, chartArea: {left: p, right: x}} = n;
            let _ = "center";
            return "center" === s ? _ = a <= (p + x) / 2 ? "left" : "right" : a <= l / 2 ? _ = "left" : a >= h - l / 2 && (_ = "right"), 
            function(n, o, r, s) {
                const {x: a, width: l} = s, h = r.caretSize + r.caretPadding;
                return "left" === n && a + l + h > o.width || "right" === n && a - l - h < 0 || void 0;
            }(_, n, o, r) && (_ = "center"), _;
        }
        function determineAlignment(n, o, r) {
            const s = r.yAlign || o.yAlign || function(n, o) {
                const {y: r, height: s} = o;
                return r < s / 2 ? "top" : r > n.height - s / 2 ? "bottom" : "center";
            }(n, r);
            return {
                xAlign: r.xAlign || o.xAlign || determineXAlign(n, o, r, s),
                yAlign: s
            };
        }
        function getBackgroundPoint(n, o, r, s) {
            const {caretSize: a, caretPadding: l, cornerRadius: h} = n, {xAlign: p, yAlign: x} = r, _ = a + l, {topLeft: y, topRight: v, bottomLeft: w, bottomRight: k} = toTRBLCorners(h);
            let S = function(n, o) {
                let {x: r, width: s} = n;
                return "right" === o ? r -= s : "center" === o && (r -= s / 2), r;
            }(o, p);
            const P = function(n, o, r) {
                let {y: s, height: a} = n;
                return "top" === o ? s += r : s -= "bottom" === o ? a + r : a / 2, s;
            }(o, x, _);
            return "center" === x ? "left" === p ? S += _ : "right" === p && (S -= _) : "left" === p ? S -= Math.max(y, w) + a : "right" === p && (S += Math.max(v, k) + a), 
            {
                x: _limitValue(S, 0, s.width - o.width),
                y: _limitValue(P, 0, s.height - o.height)
            };
        }
        function getAlignedX(n, o, r) {
            const s = toPadding(r.padding);
            return "center" === o ? n.x + n.width / 2 : "right" === o ? n.x + n.width - s.right : n.x + s.left;
        }
        function getBeforeAfterBodyLines(n) {
            return pushOrConcat([], splitNewlines(n));
        }
        function overrideCallbacks(n, o) {
            const r = o && o.dataset && o.dataset.tooltip && o.dataset.tooltip.callbacks;
            return r ? n.override(r) : n;
        }
        class Tooltip extends Element {
            constructor(n) {
                super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, 
                this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, 
                this.$context = void 0, this.chart = n.chart || n._chart, this._chart = this.chart, 
                this.options = n.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, 
                this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, 
                this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, 
                this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, 
                this.labelTextColors = void 0;
            }
            initialize(n) {
                this.options = n, this._cachedAnimations = void 0, this.$context = void 0;
            }
            _resolveAnimations() {
                const n = this._cachedAnimations;
                if (n) return n;
                const o = this.chart, r = this.options.setContext(this.getContext()), s = r.enabled && o.options.animation && r.animations, a = new Animations(this.chart, s);
                return s._cacheable && (this._cachedAnimations = Object.freeze(a)), a;
            }
            getContext() {
                return this.$context || (this.$context = (n = this.chart.getContext(), o = this, 
                r = this._tooltipItems, createContext(n, {
                    tooltip: o,
                    tooltipItems: r,
                    type: "tooltip"
                })));
                var n, o, r;
            }
            getTitle(n, o) {
                const {callbacks: r} = o, s = r.beforeTitle.apply(this, [ n ]), a = r.title.apply(this, [ n ]), l = r.afterTitle.apply(this, [ n ]);
                let h = [];
                return h = pushOrConcat(h, splitNewlines(s)), h = pushOrConcat(h, splitNewlines(a)), 
                h = pushOrConcat(h, splitNewlines(l)), h;
            }
            getBeforeBody(n, o) {
                return getBeforeAfterBodyLines(o.callbacks.beforeBody.apply(this, [ n ]));
            }
            getBody(n, o) {
                const {callbacks: r} = o, s = [];
                return each(n, (n => {
                    const o = {
                        before: [],
                        lines: [],
                        after: []
                    }, a = overrideCallbacks(r, n);
                    pushOrConcat(o.before, splitNewlines(a.beforeLabel.call(this, n))), pushOrConcat(o.lines, a.label.call(this, n)), 
                    pushOrConcat(o.after, splitNewlines(a.afterLabel.call(this, n))), s.push(o);
                })), s;
            }
            getAfterBody(n, o) {
                return getBeforeAfterBodyLines(o.callbacks.afterBody.apply(this, [ n ]));
            }
            getFooter(n, o) {
                const {callbacks: r} = o, s = r.beforeFooter.apply(this, [ n ]), a = r.footer.apply(this, [ n ]), l = r.afterFooter.apply(this, [ n ]);
                let h = [];
                return h = pushOrConcat(h, splitNewlines(s)), h = pushOrConcat(h, splitNewlines(a)), 
                h = pushOrConcat(h, splitNewlines(l)), h;
            }
            _createItems(n) {
                const o = this._active, r = this.chart.data, s = [], a = [], l = [];
                let h, p, x = [];
                for (h = 0, p = o.length; h < p; ++h) x.push(createTooltipItem(this.chart, o[h]));
                return n.filter && (x = x.filter(((o, s, a) => n.filter(o, s, a, r)))), n.itemSort && (x = x.sort(((o, s) => n.itemSort(o, s, r)))), 
                each(x, (o => {
                    const r = overrideCallbacks(n.callbacks, o);
                    s.push(r.labelColor.call(this, o)), a.push(r.labelPointStyle.call(this, o)), l.push(r.labelTextColor.call(this, o));
                })), this.labelColors = s, this.labelPointStyles = a, this.labelTextColors = l, 
                this.dataPoints = x, x;
            }
            update(n, o) {
                const r = this.options.setContext(this.getContext()), s = this._active;
                let a, l = [];
                if (s.length) {
                    const n = vt[r.position].call(this, s, this._eventPosition);
                    l = this._createItems(r), this.title = this.getTitle(l, r), this.beforeBody = this.getBeforeBody(l, r), 
                    this.body = this.getBody(l, r), this.afterBody = this.getAfterBody(l, r), this.footer = this.getFooter(l, r);
                    const o = this._size = getTooltipSize(this, r), h = Object.assign({}, n, o), p = determineAlignment(this.chart, r, h), x = getBackgroundPoint(r, h, p, this.chart);
                    this.xAlign = p.xAlign, this.yAlign = p.yAlign, a = {
                        opacity: 1,
                        x: x.x,
                        y: x.y,
                        width: o.width,
                        height: o.height,
                        caretX: n.x,
                        caretY: n.y
                    };
                } else 0 !== this.opacity && (a = {
                    opacity: 0
                });
                this._tooltipItems = l, this.$context = void 0, a && this._resolveAnimations().update(this, a), 
                n && r.external && r.external.call(this, {
                    chart: this.chart,
                    tooltip: this,
                    replay: o
                });
            }
            drawCaret(n, o, r, s) {
                const a = this.getCaretPosition(n, r, s);
                o.lineTo(a.x1, a.y1), o.lineTo(a.x2, a.y2), o.lineTo(a.x3, a.y3);
            }
            getCaretPosition(n, o, r) {
                const {xAlign: s, yAlign: a} = this, {caretSize: l, cornerRadius: h} = r, {topLeft: p, topRight: x, bottomLeft: _, bottomRight: y} = toTRBLCorners(h), {x: v, y: w} = n, {width: k, height: S} = o;
                let P, A, T, R, O, C;
                return "center" === a ? (O = w + S / 2, "left" === s ? (P = v, A = P - l, R = O + l, 
                C = O - l) : (P = v + k, A = P + l, R = O - l, C = O + l), T = P) : (A = "left" === s ? v + Math.max(p, _) + l : "right" === s ? v + k - Math.max(x, y) - l : this.caretX, 
                "top" === a ? (R = w, O = R - l, P = A - l, T = A + l) : (R = w + S, O = R + l, 
                P = A + l, T = A - l), C = R), {
                    x1: P,
                    x2: A,
                    x3: T,
                    y1: R,
                    y2: O,
                    y3: C
                };
            }
            drawTitle(n, o, r) {
                const s = this.title, a = s.length;
                let l, h, p;
                if (a) {
                    const x = getRtlAdapter(r.rtl, this.x, this.width);
                    for (n.x = getAlignedX(this, r.titleAlign, r), o.textAlign = x.textAlign(r.titleAlign), 
                    o.textBaseline = "middle", l = toFont(r.titleFont), h = r.titleSpacing, o.fillStyle = r.titleColor, 
                    o.font = l.string, p = 0; p < a; ++p) o.fillText(s[p], x.x(n.x), n.y + l.lineHeight / 2), 
                    n.y += l.lineHeight + h, p + 1 === a && (n.y += r.titleMarginBottom - h);
                }
            }
            _drawColorBox(n, o, r, s, a) {
                const l = this.labelColors[r], h = this.labelPointStyles[r], {boxHeight: p, boxWidth: x, boxPadding: _} = a, y = toFont(a.bodyFont), v = getAlignedX(this, "left", a), w = s.x(v), k = p < y.lineHeight ? (y.lineHeight - p) / 2 : 0, S = o.y + k;
                if (a.usePointStyle) {
                    const o = {
                        radius: Math.min(x, p) / 2,
                        pointStyle: h.pointStyle,
                        rotation: h.rotation,
                        borderWidth: 1
                    }, r = s.leftForLtr(w, x) + x / 2, _ = S + p / 2;
                    n.strokeStyle = a.multiKeyBackground, n.fillStyle = a.multiKeyBackground, drawPoint(n, o, r, _), 
                    n.strokeStyle = l.borderColor, n.fillStyle = l.backgroundColor, drawPoint(n, o, r, _);
                } else {
                    n.lineWidth = isObject(l.borderWidth) ? Math.max(...Object.values(l.borderWidth)) : l.borderWidth || 1, 
                    n.strokeStyle = l.borderColor, n.setLineDash(l.borderDash || []), n.lineDashOffset = l.borderDashOffset || 0;
                    const o = s.leftForLtr(w, x - _), r = s.leftForLtr(s.xPlus(w, 1), x - _ - 2), h = toTRBLCorners(l.borderRadius);
                    Object.values(h).some((n => 0 !== n)) ? (n.beginPath(), n.fillStyle = a.multiKeyBackground, 
                    addRoundedRectPath(n, {
                        x: o,
                        y: S,
                        w: x,
                        h: p,
                        radius: h
                    }), n.fill(), n.stroke(), n.fillStyle = l.backgroundColor, n.beginPath(), addRoundedRectPath(n, {
                        x: r,
                        y: S + 1,
                        w: x - 2,
                        h: p - 2,
                        radius: h
                    }), n.fill()) : (n.fillStyle = a.multiKeyBackground, n.fillRect(o, S, x, p), n.strokeRect(o, S, x, p), 
                    n.fillStyle = l.backgroundColor, n.fillRect(r, S + 1, x - 2, p - 2));
                }
                n.fillStyle = this.labelTextColors[r];
            }
            drawBody(n, o, r) {
                const {body: s} = this, {bodySpacing: a, bodyAlign: l, displayColors: h, boxHeight: p, boxWidth: x, boxPadding: _} = r, y = toFont(r.bodyFont);
                let v = y.lineHeight, w = 0;
                const k = getRtlAdapter(r.rtl, this.x, this.width), fillLineOfText = function(r) {
                    o.fillText(r, k.x(n.x + w), n.y + v / 2), n.y += v + a;
                }, S = k.textAlign(l);
                let P, A, T, R, O, C, z;
                for (o.textAlign = l, o.textBaseline = "middle", o.font = y.string, n.x = getAlignedX(this, S, r), 
                o.fillStyle = r.bodyColor, each(this.beforeBody, fillLineOfText), w = h && "right" !== S ? "center" === l ? x / 2 + _ : x + 2 + _ : 0, 
                R = 0, C = s.length; R < C; ++R) {
                    for (P = s[R], A = this.labelTextColors[R], o.fillStyle = A, each(P.before, fillLineOfText), 
                    T = P.lines, h && T.length && (this._drawColorBox(o, n, R, k, r), v = Math.max(y.lineHeight, p)), 
                    O = 0, z = T.length; O < z; ++O) fillLineOfText(T[O]), v = y.lineHeight;
                    each(P.after, fillLineOfText);
                }
                w = 0, v = y.lineHeight, each(this.afterBody, fillLineOfText), n.y -= a;
            }
            drawFooter(n, o, r) {
                const s = this.footer, a = s.length;
                let l, h;
                if (a) {
                    const p = getRtlAdapter(r.rtl, this.x, this.width);
                    for (n.x = getAlignedX(this, r.footerAlign, r), n.y += r.footerMarginTop, o.textAlign = p.textAlign(r.footerAlign), 
                    o.textBaseline = "middle", l = toFont(r.footerFont), o.fillStyle = r.footerColor, 
                    o.font = l.string, h = 0; h < a; ++h) o.fillText(s[h], p.x(n.x), n.y + l.lineHeight / 2), 
                    n.y += l.lineHeight + r.footerSpacing;
                }
            }
            drawBackground(n, o, r, s) {
                const {xAlign: a, yAlign: l} = this, {x: h, y: p} = n, {width: x, height: _} = r, {topLeft: y, topRight: v, bottomLeft: w, bottomRight: k} = toTRBLCorners(s.cornerRadius);
                o.fillStyle = s.backgroundColor, o.strokeStyle = s.borderColor, o.lineWidth = s.borderWidth, 
                o.beginPath(), o.moveTo(h + y, p), "top" === l && this.drawCaret(n, o, r, s), o.lineTo(h + x - v, p), 
                o.quadraticCurveTo(h + x, p, h + x, p + v), "center" === l && "right" === a && this.drawCaret(n, o, r, s), 
                o.lineTo(h + x, p + _ - k), o.quadraticCurveTo(h + x, p + _, h + x - k, p + _), 
                "bottom" === l && this.drawCaret(n, o, r, s), o.lineTo(h + w, p + _), o.quadraticCurveTo(h, p + _, h, p + _ - w), 
                "center" === l && "left" === a && this.drawCaret(n, o, r, s), o.lineTo(h, p + y), 
                o.quadraticCurveTo(h, p, h + y, p), o.closePath(), o.fill(), s.borderWidth > 0 && o.stroke();
            }
            _updateAnimationTarget(n) {
                const o = this.chart, r = this.$animations, s = r && r.x, a = r && r.y;
                if (s || a) {
                    const r = vt[n.position].call(this, this._active, this._eventPosition);
                    if (!r) return;
                    const l = this._size = getTooltipSize(this, n), h = Object.assign({}, r, this._size), p = determineAlignment(o, n, h), x = getBackgroundPoint(n, h, p, o);
                    s._to === x.x && a._to === x.y || (this.xAlign = p.xAlign, this.yAlign = p.yAlign, 
                    this.width = l.width, this.height = l.height, this.caretX = r.x, this.caretY = r.y, 
                    this._resolveAnimations().update(this, x));
                }
            }
            _willRender() {
                return !!this.opacity;
            }
            draw(n) {
                const o = this.options.setContext(this.getContext());
                let r = this.opacity;
                if (!r) return;
                this._updateAnimationTarget(o);
                const s = {
                    width: this.width,
                    height: this.height
                }, a = {
                    x: this.x,
                    y: this.y
                };
                r = Math.abs(r) < .001 ? 0 : r;
                const l = toPadding(o.padding), h = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
                o.enabled && h && (n.save(), n.globalAlpha = r, this.drawBackground(a, n, s, o), 
                overrideTextDirection(n, o.textDirection), a.y += l.top, this.drawTitle(a, n, o), 
                this.drawBody(a, n, o), this.drawFooter(a, n, o), restoreTextDirection(n, o.textDirection), 
                n.restore());
            }
            getActiveElements() {
                return this._active || [];
            }
            setActiveElements(n, o) {
                const r = this._active, s = n.map((({datasetIndex: n, index: o}) => {
                    const r = this.chart.getDatasetMeta(n);
                    if (!r) throw new Error("Cannot find a dataset at index " + n);
                    return {
                        datasetIndex: n,
                        element: r.data[o],
                        index: o
                    };
                })), a = !_elementsEqual(r, s), l = this._positionChanged(s, o);
                (a || l) && (this._active = s, this._eventPosition = o, this._ignoreReplayEvents = !0, 
                this.update(!0));
            }
            handleEvent(n, o, r = !0) {
                if (o && this._ignoreReplayEvents) return !1;
                this._ignoreReplayEvents = !1;
                const s = this.options, a = this._active || [], l = this._getActiveElements(n, a, o, r), h = this._positionChanged(l, n), p = o || !_elementsEqual(l, a) || h;
                return p && (this._active = l, (s.enabled || s.external) && (this._eventPosition = {
                    x: n.x,
                    y: n.y
                }, this.update(!0, o))), p;
            }
            _getActiveElements(n, o, r, s) {
                const a = this.options;
                if ("mouseout" === n.type) return [];
                if (!s) return o;
                const l = this.chart.getElementsAtEventForMode(n, a.mode, a, r);
                return a.reverse && l.reverse(), l;
            }
            _positionChanged(n, o) {
                const {caretX: r, caretY: s, options: a} = this, l = vt[a.position].call(this, n, o);
                return !1 !== l && (r !== l.x || s !== l.y);
            }
        }
        Tooltip.positioners = vt;
        var wt = {
            id: "tooltip",
            _element: Tooltip,
            positioners: vt,
            afterInit(n, o, r) {
                r && (n.tooltip = new Tooltip({
                    chart: n,
                    options: r
                }));
            },
            beforeUpdate(n, o, r) {
                n.tooltip && n.tooltip.initialize(r);
            },
            reset(n, o, r) {
                n.tooltip && n.tooltip.initialize(r);
            },
            afterDraw(n) {
                const o = n.tooltip;
                if (o && o._willRender()) {
                    const r = {
                        tooltip: o
                    };
                    if (!1 === n.notifyPlugins("beforeTooltipDraw", r)) return;
                    o.draw(n.ctx), n.notifyPlugins("afterTooltipDraw", r);
                }
            },
            afterEvent(n, o) {
                if (n.tooltip) {
                    const r = o.replay;
                    n.tooltip.handleEvent(o.event, r, o.inChartArea) && (o.changed = !0);
                }
            },
            defaults: {
                enabled: !0,
                external: null,
                position: "average",
                backgroundColor: "rgba(0,0,0,0.8)",
                titleColor: "#fff",
                titleFont: {
                    weight: "bold"
                },
                titleSpacing: 2,
                titleMarginBottom: 6,
                titleAlign: "left",
                bodyColor: "#fff",
                bodySpacing: 2,
                bodyFont: {},
                bodyAlign: "left",
                footerColor: "#fff",
                footerSpacing: 2,
                footerMarginTop: 6,
                footerFont: {
                    weight: "bold"
                },
                footerAlign: "left",
                padding: 6,
                caretPadding: 2,
                caretSize: 5,
                cornerRadius: 6,
                boxHeight: (n, o) => o.bodyFont.size,
                boxWidth: (n, o) => o.bodyFont.size,
                multiKeyBackground: "#fff",
                displayColors: !0,
                boxPadding: 0,
                borderColor: "rgba(0,0,0,0)",
                borderWidth: 0,
                animation: {
                    duration: 400,
                    easing: "easeOutQuart"
                },
                animations: {
                    numbers: {
                        type: "number",
                        properties: [ "x", "y", "width", "height", "caretX", "caretY" ]
                    },
                    opacity: {
                        easing: "linear",
                        duration: 200
                    }
                },
                callbacks: {
                    beforeTitle: noop,
                    title(n) {
                        if (n.length > 0) {
                            const o = n[0], r = o.chart.data.labels, s = r ? r.length : 0;
                            if (this && this.options && "dataset" === this.options.mode) return o.dataset.label || "";
                            if (o.label) return o.label;
                            if (s > 0 && o.dataIndex < s) return r[o.dataIndex];
                        }
                        return "";
                    },
                    afterTitle: noop,
                    beforeBody: noop,
                    beforeLabel: noop,
                    label(n) {
                        if (this && this.options && "dataset" === this.options.mode) return n.label + ": " + n.formattedValue || n.formattedValue;
                        let o = n.dataset.label || "";
                        o && (o += ": ");
                        const r = n.formattedValue;
                        return isNullOrUndef(r) || (o += r), o;
                    },
                    labelColor(n) {
                        const o = n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);
                        return {
                            borderColor: o.borderColor,
                            backgroundColor: o.backgroundColor,
                            borderWidth: o.borderWidth,
                            borderDash: o.borderDash,
                            borderDashOffset: o.borderDashOffset,
                            borderRadius: 0
                        };
                    },
                    labelTextColor() {
                        return this.options.bodyColor;
                    },
                    labelPointStyle(n) {
                        const o = n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);
                        return {
                            pointStyle: o.pointStyle,
                            rotation: o.rotation
                        };
                    },
                    afterLabel: noop,
                    afterBody: noop,
                    beforeFooter: noop,
                    footer: noop,
                    afterFooter: noop
                }
            },
            defaultRoutes: {
                bodyFont: "font",
                footerFont: "font",
                titleFont: "font"
            },
            descriptors: {
                _scriptable: n => "filter" !== n && "itemSort" !== n && "external" !== n,
                _indexable: !1,
                callbacks: {
                    _scriptable: !1,
                    _indexable: !1
                },
                animation: {
                    _fallback: !1
                },
                animations: {
                    _fallback: "animation"
                }
            },
            additionalOptionScopes: [ "interaction" ]
        };
        function findOrAddLabel(n, o, r, s) {
            const a = n.indexOf(o);
            if (-1 === a) return ((n, o, r, s) => ("string" == typeof o ? (r = n.push(o) - 1, 
            s.unshift({
                index: r,
                label: o
            })) : isNaN(o) && (r = null), r))(n, o, r, s);
            return a !== n.lastIndexOf(o) ? r : a;
        }
        class CategoryScale extends Scale {
            constructor(n) {
                super(n), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
            }
            init(n) {
                const o = this._addedLabels;
                if (o.length) {
                    const n = this.getLabels();
                    for (const {index: r, label: s} of o) n[r] === s && n.splice(r, 1);
                    this._addedLabels = [];
                }
                super.init(n);
            }
            parse(n, o) {
                if (isNullOrUndef(n)) return null;
                const r = this.getLabels();
                return ((n, o) => null === n ? null : _limitValue(Math.round(n), 0, o))(o = isFinite(o) && r[o] === n ? o : findOrAddLabel(r, n, valueOrDefault(o, n), this._addedLabels), r.length - 1);
            }
            determineDataLimits() {
                const {minDefined: n, maxDefined: o} = this.getUserBounds();
                let {min: r, max: s} = this.getMinMax(!0);
                "ticks" === this.options.bounds && (n || (r = 0), o || (s = this.getLabels().length - 1)), 
                this.min = r, this.max = s;
            }
            buildTicks() {
                const n = this.min, o = this.max, r = this.options.offset, s = [];
                let a = this.getLabels();
                a = 0 === n && o === a.length - 1 ? a : a.slice(n, o + 1), this._valueRange = Math.max(a.length - (r ? 0 : 1), 1), 
                this._startValue = this.min - (r ? .5 : 0);
                for (let r = n; r <= o; r++) s.push({
                    value: r
                });
                return s;
            }
            getLabelForValue(n) {
                const o = this.getLabels();
                return n >= 0 && n < o.length ? o[n] : n;
            }
            configure() {
                super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
            }
            getPixelForValue(n) {
                return "number" != typeof n && (n = this.parse(n)), null === n ? NaN : this.getPixelForDecimal((n - this._startValue) / this._valueRange);
            }
            getPixelForTick(n) {
                const o = this.ticks;
                return n < 0 || n > o.length - 1 ? null : this.getPixelForValue(o[n].value);
            }
            getValueForPixel(n) {
                return Math.round(this._startValue + this.getDecimalForPixel(n) * this._valueRange);
            }
            getBasePixel() {
                return this.bottom;
            }
        }
        function generateTicks$1(n, o) {
            const r = [], {bounds: s, step: a, min: l, max: h, precision: p, count: x, maxTicks: _, maxDigits: y, includeBounds: v} = n, w = a || 1, k = _ - 1, {min: S, max: P} = o, A = !isNullOrUndef(l), T = !isNullOrUndef(h), R = !isNullOrUndef(x), O = (P - S) / (y + 1);
            let C, z, M, I, E = niceNum((P - S) / k / w) * w;
            if (E < 1e-14 && !A && !T) return [ {
                value: S
            }, {
                value: P
            } ];
            I = Math.ceil(P / E) - Math.floor(S / E), I > k && (E = niceNum(I * E / k / w) * w), 
            isNullOrUndef(p) || (C = Math.pow(10, p), E = Math.ceil(E * C) / C), "ticks" === s ? (z = Math.floor(S / E) * E, 
            M = Math.ceil(P / E) * E) : (z = S, M = P), A && T && a && function(n, o) {
                const r = Math.round(n);
                return r - o <= n && r + o >= n;
            }((h - l) / a, E / 1e3) ? (I = Math.round(Math.min((h - l) / E, _)), E = (h - l) / I, 
            z = l, M = h) : R ? (z = A ? l : z, M = T ? h : M, I = x - 1, E = (M - z) / I) : (I = (M - z) / E, 
            I = almostEquals(I, Math.round(I), E / 1e3) ? Math.round(I) : Math.ceil(I));
            const $ = Math.max(_decimalPlaces(E), _decimalPlaces(z));
            C = Math.pow(10, isNullOrUndef(p) ? $ : p), z = Math.round(z * C) / C, M = Math.round(M * C) / C;
            let N = 0;
            for (A && (v && z !== l ? (r.push({
                value: l
            }), z < l && N++, almostEquals(Math.round((z + N * E) * C) / C, l, relativeLabelSize(l, O, n)) && N++) : z < l && N++); N < I; ++N) r.push({
                value: Math.round((z + N * E) * C) / C
            });
            return T && v && M !== h ? r.length && almostEquals(r[r.length - 1].value, h, relativeLabelSize(h, O, n)) ? r[r.length - 1].value = h : r.push({
                value: h
            }) : T && M !== h || r.push({
                value: M
            }), r;
        }
        function relativeLabelSize(n, o, {horizontal: r, minRotation: s}) {
            const a = toRadians(s), l = (r ? Math.sin(a) : Math.cos(a)) || .001, h = .75 * o * ("" + n).length;
            return Math.min(o / l, h);
        }
        CategoryScale.id = "category", CategoryScale.defaults = {
            ticks: {
                callback: CategoryScale.prototype.getLabelForValue
            }
        };
        class LinearScaleBase extends Scale {
            constructor(n) {
                super(n), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, 
                this._valueRange = 0;
            }
            parse(n, o) {
                return isNullOrUndef(n) || ("number" == typeof n || n instanceof Number) && !isFinite(+n) ? null : +n;
            }
            handleTickRangeOptions() {
                const {beginAtZero: n} = this.options, {minDefined: o, maxDefined: r} = this.getUserBounds();
                let {min: s, max: a} = this;
                const setMin = n => s = o ? s : n, setMax = n => a = r ? a : n;
                if (n) {
                    const n = S(s), o = S(a);
                    n < 0 && o < 0 ? setMax(0) : n > 0 && o > 0 && setMin(0);
                }
                if (s === a) {
                    let o = 1;
                    (a >= Number.MAX_SAFE_INTEGER || s <= Number.MIN_SAFE_INTEGER) && (o = Math.abs(.05 * a)), 
                    setMax(a + o), n || setMin(s - o);
                }
                this.min = s, this.max = a;
            }
            getTickLimit() {
                const n = this.options.ticks;
                let o, {maxTicksLimit: r, stepSize: s} = n;
                return s ? (o = Math.ceil(this.max / s) - Math.floor(this.min / s) + 1, o > 1e3 && (o = 1e3)) : (o = this.computeTickLimit(), 
                r = r || 11), r && (o = Math.min(r, o)), o;
            }
            computeTickLimit() {
                return Number.POSITIVE_INFINITY;
            }
            buildTicks() {
                const n = this.options, o = n.ticks;
                let r = this.getTickLimit();
                r = Math.max(2, r);
                const s = generateTicks$1({
                    maxTicks: r,
                    bounds: n.bounds,
                    min: n.min,
                    max: n.max,
                    precision: o.precision,
                    step: o.stepSize,
                    count: o.count,
                    maxDigits: this._maxDigits(),
                    horizontal: this.isHorizontal(),
                    minRotation: o.minRotation || 0,
                    includeBounds: !1 !== o.includeBounds
                }, this._range || this);
                return "ticks" === n.bounds && _setMinAndMaxByKey(s, this, "value"), n.reverse ? (s.reverse(), 
                this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), 
                s;
            }
            configure() {
                const n = this.ticks;
                let o = this.min, r = this.max;
                if (super.configure(), this.options.offset && n.length) {
                    const s = (r - o) / Math.max(n.length - 1, 1) / 2;
                    o -= s, r += s;
                }
                this._startValue = o, this._endValue = r, this._valueRange = r - o;
            }
            getLabelForValue(n) {
                return formatNumber(n, this.chart.options.locale, this.options.ticks.format);
            }
        }
        class LinearScale extends LinearScaleBase {
            determineDataLimits() {
                const {min: n, max: o} = this.getMinMax(!0);
                this.min = isNumberFinite(n) ? n : 0, this.max = isNumberFinite(o) ? o : 1, this.handleTickRangeOptions();
            }
            computeTickLimit() {
                const n = this.isHorizontal(), o = n ? this.width : this.height, r = toRadians(this.options.ticks.minRotation), s = (n ? Math.sin(r) : Math.cos(r)) || .001, a = this._resolveTickFontOptions(0);
                return Math.ceil(o / Math.min(40, a.lineHeight / s));
            }
            getPixelForValue(n) {
                return null === n ? NaN : this.getPixelForDecimal((n - this._startValue) / this._valueRange);
            }
            getValueForPixel(n) {
                return this._startValue + this.getDecimalForPixel(n) * this._valueRange;
            }
        }
        function isMajor(n) {
            return 1 === n / Math.pow(10, Math.floor(k(n)));
        }
        LinearScale.id = "linear", LinearScale.defaults = {
            ticks: {
                callback: Q.formatters.numeric
            }
        };
        class LogarithmicScale extends Scale {
            constructor(n) {
                super(n), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
            }
            parse(n, o) {
                const r = LinearScaleBase.prototype.parse.apply(this, [ n, o ]);
                if (0 !== r) return isNumberFinite(r) && r > 0 ? r : null;
                this._zero = !0;
            }
            determineDataLimits() {
                const {min: n, max: o} = this.getMinMax(!0);
                this.min = isNumberFinite(n) ? Math.max(0, n) : null, this.max = isNumberFinite(o) ? Math.max(0, o) : null, 
                this.options.beginAtZero && (this._zero = !0), this.handleTickRangeOptions();
            }
            handleTickRangeOptions() {
                const {minDefined: n, maxDefined: o} = this.getUserBounds();
                let r = this.min, s = this.max;
                const setMin = o => r = n ? r : o, setMax = n => s = o ? s : n, exp = (n, o) => Math.pow(10, Math.floor(k(n)) + o);
                r === s && (r <= 0 ? (setMin(1), setMax(10)) : (setMin(exp(r, -1)), setMax(exp(s, 1)))), 
                r <= 0 && setMin(exp(s, -1)), s <= 0 && setMax(exp(r, 1)), this._zero && this.min !== this._suggestedMin && r === exp(this.min, 0) && setMin(exp(r, -1)), 
                this.min = r, this.max = s;
            }
            buildTicks() {
                const n = this.options, o = function(n, o) {
                    const r = Math.floor(k(o.max)), s = Math.ceil(o.max / Math.pow(10, r)), a = [];
                    let l = finiteOrDefault(n.min, Math.pow(10, Math.floor(k(o.min)))), h = Math.floor(k(l)), p = Math.floor(l / Math.pow(10, h)), x = h < 0 ? Math.pow(10, Math.abs(h)) : 1;
                    do {
                        a.push({
                            value: l,
                            major: isMajor(l)
                        }), ++p, 10 === p && (p = 1, ++h, x = h >= 0 ? 1 : x), l = Math.round(p * Math.pow(10, h) * x) / x;
                    } while (h < r || h === r && p < s);
                    const _ = finiteOrDefault(n.max, l);
                    return a.push({
                        value: _,
                        major: isMajor(l)
                    }), a;
                }({
                    min: this._userMin,
                    max: this._userMax
                }, this);
                return "ticks" === n.bounds && _setMinAndMaxByKey(o, this, "value"), n.reverse ? (o.reverse(), 
                this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), 
                o;
            }
            getLabelForValue(n) {
                return void 0 === n ? "0" : formatNumber(n, this.chart.options.locale, this.options.ticks.format);
            }
            configure() {
                const n = this.min;
                super.configure(), this._startValue = k(n), this._valueRange = k(this.max) - k(n);
            }
            getPixelForValue(n) {
                return void 0 !== n && 0 !== n || (n = this.min), null === n || isNaN(n) ? NaN : this.getPixelForDecimal(n === this.min ? 0 : (k(n) - this._startValue) / this._valueRange);
            }
            getValueForPixel(n) {
                const o = this.getDecimalForPixel(n);
                return Math.pow(10, this._startValue + o * this._valueRange);
            }
        }
        function getTickBackdropHeight(n) {
            const o = n.ticks;
            if (o.display && n.display) {
                const n = toPadding(o.backdropPadding);
                return valueOrDefault(o.font && o.font.size, F.font.size) + n.height;
            }
            return 0;
        }
        function determineLimits(n, o, r, s, a) {
            return n === s || n === a ? {
                start: o - r / 2,
                end: o + r / 2
            } : n < s || n > a ? {
                start: o - r,
                end: o
            } : {
                start: o,
                end: o + r
            };
        }
        function fitWithPointLabels(n) {
            const o = {
                l: n.left + n._padding.left,
                r: n.right - n._padding.right,
                t: n.top + n._padding.top,
                b: n.bottom - n._padding.bottom
            }, r = Object.assign({}, o), s = [], a = [], h = n._pointLabels.length, p = n.options.pointLabels, x = p.centerPointLabels ? l / h : 0;
            for (let l = 0; l < h; l++) {
                const h = p.setContext(n.getPointLabelContext(l));
                a[l] = h.padding;
                const y = n.getPointPosition(l, n.drawingArea + a[l], x), k = toFont(h.font), S = (_ = n.ctx, 
                v = k, w = isArray(w = n._pointLabels[l]) ? w : [ w ], {
                    w: _longestText(_, v.string, w),
                    h: w.length * v.lineHeight
                });
                s[l] = S;
                const P = _normalizeAngle(n.getIndexAngle(l) + x), A = Math.round(toDegrees(P));
                updateLimits(r, o, P, determineLimits(A, y.x, S.w, 0, 180), determineLimits(A, y.y, S.h, 90, 270));
            }
            var _, v, w;
            n.setCenterPoint(o.l - r.l, r.r - o.r, o.t - r.t, r.b - o.b), n._pointLabelItems = function(n, o, r) {
                const s = [], a = n._pointLabels.length, h = n.options, p = getTickBackdropHeight(h) / 2, x = n.drawingArea, _ = h.pointLabels.centerPointLabels ? l / a : 0;
                for (let l = 0; l < a; l++) {
                    const a = n.getPointPosition(l, x + p + r[l], _), h = Math.round(toDegrees(_normalizeAngle(a.angle + y))), v = o[l], w = yForAngle(a.y, v.h, h), k = getTextAlignForAngle(h), S = leftForTextAlign(a.x, v.w, k);
                    s.push({
                        x: a.x,
                        y: w,
                        textAlign: k,
                        left: S,
                        top: w,
                        right: S + v.w,
                        bottom: w + v.h
                    });
                }
                return s;
            }(n, s, a);
        }
        function updateLimits(n, o, r, s, a) {
            const l = Math.abs(Math.sin(r)), h = Math.abs(Math.cos(r));
            let p = 0, x = 0;
            s.start < o.l ? (p = (o.l - s.start) / l, n.l = Math.min(n.l, o.l - p)) : s.end > o.r && (p = (s.end - o.r) / l, 
            n.r = Math.max(n.r, o.r + p)), a.start < o.t ? (x = (o.t - a.start) / h, n.t = Math.min(n.t, o.t - x)) : a.end > o.b && (x = (a.end - o.b) / h, 
            n.b = Math.max(n.b, o.b + x));
        }
        function getTextAlignForAngle(n) {
            return 0 === n || 180 === n ? "center" : n < 180 ? "left" : "right";
        }
        function leftForTextAlign(n, o, r) {
            return "right" === r ? n -= o : "center" === r && (n -= o / 2), n;
        }
        function yForAngle(n, o, r) {
            return 90 === r || 270 === r ? n -= o / 2 : (r > 270 || r < 90) && (n -= o), n;
        }
        function pathRadiusLine(n, o, r, s) {
            const {ctx: a} = n;
            if (r) a.arc(n.xCenter, n.yCenter, o, 0, h); else {
                let r = n.getPointPosition(0, o);
                a.moveTo(r.x, r.y);
                for (let l = 1; l < s; l++) r = n.getPointPosition(l, o), a.lineTo(r.x, r.y);
            }
        }
        LogarithmicScale.id = "logarithmic", LogarithmicScale.defaults = {
            ticks: {
                callback: Q.formatters.logarithmic,
                major: {
                    enabled: !0
                }
            }
        };
        class RadialLinearScale extends LinearScaleBase {
            constructor(n) {
                super(n), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, 
                this._pointLabels = [], this._pointLabelItems = [];
            }
            setDimensions() {
                const n = this._padding = toPadding(getTickBackdropHeight(this.options) / 2), o = this.width = this.maxWidth - n.width, r = this.height = this.maxHeight - n.height;
                this.xCenter = Math.floor(this.left + o / 2 + n.left), this.yCenter = Math.floor(this.top + r / 2 + n.top), 
                this.drawingArea = Math.floor(Math.min(o, r) / 2);
            }
            determineDataLimits() {
                const {min: n, max: o} = this.getMinMax(!1);
                this.min = isNumberFinite(n) && !isNaN(n) ? n : 0, this.max = isNumberFinite(o) && !isNaN(o) ? o : 0, 
                this.handleTickRangeOptions();
            }
            computeTickLimit() {
                return Math.ceil(this.drawingArea / getTickBackdropHeight(this.options));
            }
            generateTickLabels(n) {
                LinearScaleBase.prototype.generateTickLabels.call(this, n), this._pointLabels = this.getLabels().map(((n, o) => {
                    const r = callback(this.options.pointLabels.callback, [ n, o ], this);
                    return r || 0 === r ? r : "";
                })).filter(((n, o) => this.chart.getDataVisibility(o)));
            }
            fit() {
                const n = this.options;
                n.display && n.pointLabels.display ? fitWithPointLabels(this) : this.setCenterPoint(0, 0, 0, 0);
            }
            setCenterPoint(n, o, r, s) {
                this.xCenter += Math.floor((n - o) / 2), this.yCenter += Math.floor((r - s) / 2), 
                this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(n, o, r, s));
            }
            getIndexAngle(n) {
                return _normalizeAngle(n * (h / (this._pointLabels.length || 1)) + toRadians(this.options.startAngle || 0));
            }
            getDistanceFromCenterForValue(n) {
                if (isNullOrUndef(n)) return NaN;
                const o = this.drawingArea / (this.max - this.min);
                return this.options.reverse ? (this.max - n) * o : (n - this.min) * o;
            }
            getValueForDistanceFromCenter(n) {
                if (isNullOrUndef(n)) return NaN;
                const o = n / (this.drawingArea / (this.max - this.min));
                return this.options.reverse ? this.max - o : this.min + o;
            }
            getPointLabelContext(n) {
                const o = this._pointLabels || [];
                if (n >= 0 && n < o.length) {
                    const r = o[n];
                    return function(n, o, r) {
                        return createContext(n, {
                            label: r,
                            index: o,
                            type: "pointLabel"
                        });
                    }(this.getContext(), n, r);
                }
            }
            getPointPosition(n, o, r = 0) {
                const s = this.getIndexAngle(n) - y + r;
                return {
                    x: Math.cos(s) * o + this.xCenter,
                    y: Math.sin(s) * o + this.yCenter,
                    angle: s
                };
            }
            getPointPositionForValue(n, o) {
                return this.getPointPosition(n, this.getDistanceFromCenterForValue(o));
            }
            getBasePosition(n) {
                return this.getPointPositionForValue(n || 0, this.getBaseValue());
            }
            getPointLabelPosition(n) {
                const {left: o, top: r, right: s, bottom: a} = this._pointLabelItems[n];
                return {
                    left: o,
                    top: r,
                    right: s,
                    bottom: a
                };
            }
            drawBackground() {
                const {backgroundColor: n, grid: {circular: o}} = this.options;
                if (n) {
                    const r = this.ctx;
                    r.save(), r.beginPath(), pathRadiusLine(this, this.getDistanceFromCenterForValue(this._endValue), o, this._pointLabels.length), 
                    r.closePath(), r.fillStyle = n, r.fill(), r.restore();
                }
            }
            drawGrid() {
                const n = this.ctx, o = this.options, {angleLines: r, grid: s} = o, a = this._pointLabels.length;
                let l, h, p;
                if (o.pointLabels.display && function(n, o) {
                    const {ctx: r, options: {pointLabels: s}} = n;
                    for (let a = o - 1; a >= 0; a--) {
                        const o = s.setContext(n.getPointLabelContext(a)), l = toFont(o.font), {x: h, y: p, textAlign: x, left: _, top: y, right: v, bottom: w} = n._pointLabelItems[a], {backdropColor: k} = o;
                        if (!isNullOrUndef(k)) {
                            const n = toTRBLCorners(o.borderRadius), s = toPadding(o.backdropPadding);
                            r.fillStyle = k;
                            const a = _ - s.left, l = y - s.top, h = v - _ + s.width, p = w - y + s.height;
                            Object.values(n).some((n => 0 !== n)) ? (r.beginPath(), addRoundedRectPath(r, {
                                x: a,
                                y: l,
                                w: h,
                                h: p,
                                radius: n
                            }), r.fill()) : r.fillRect(a, l, h, p);
                        }
                        renderText(r, n._pointLabels[a], h, p + l.lineHeight / 2, l, {
                            color: o.color,
                            textAlign: x,
                            textBaseline: "middle"
                        });
                    }
                }(this, a), s.display && this.ticks.forEach(((n, o) => {
                    if (0 !== o) {
                        h = this.getDistanceFromCenterForValue(n.value);
                        !function(n, o, r, s) {
                            const a = n.ctx, l = o.circular, {color: h, lineWidth: p} = o;
                            !l && !s || !h || !p || r < 0 || (a.save(), a.strokeStyle = h, a.lineWidth = p, 
                            a.setLineDash(o.borderDash), a.lineDashOffset = o.borderDashOffset, a.beginPath(), 
                            pathRadiusLine(n, r, l, s), a.closePath(), a.stroke(), a.restore());
                        }(this, s.setContext(this.getContext(o - 1)), h, a);
                    }
                })), r.display) {
                    for (n.save(), l = a - 1; l >= 0; l--) {
                        const s = r.setContext(this.getPointLabelContext(l)), {color: a, lineWidth: x} = s;
                        x && a && (n.lineWidth = x, n.strokeStyle = a, n.setLineDash(s.borderDash), n.lineDashOffset = s.borderDashOffset, 
                        h = this.getDistanceFromCenterForValue(o.ticks.reverse ? this.min : this.max), p = this.getPointPosition(l, h), 
                        n.beginPath(), n.moveTo(this.xCenter, this.yCenter), n.lineTo(p.x, p.y), n.stroke());
                    }
                    n.restore();
                }
            }
            drawBorder() {}
            drawLabels() {
                const n = this.ctx, o = this.options, r = o.ticks;
                if (!r.display) return;
                const s = this.getIndexAngle(0);
                let a, l;
                n.save(), n.translate(this.xCenter, this.yCenter), n.rotate(s), n.textAlign = "center", 
                n.textBaseline = "middle", this.ticks.forEach(((s, h) => {
                    if (0 === h && !o.reverse) return;
                    const p = r.setContext(this.getContext(h)), x = toFont(p.font);
                    if (a = this.getDistanceFromCenterForValue(this.ticks[h].value), p.showLabelBackdrop) {
                        n.font = x.string, l = n.measureText(s.label).width, n.fillStyle = p.backdropColor;
                        const o = toPadding(p.backdropPadding);
                        n.fillRect(-l / 2 - o.left, -a - x.size / 2 - o.top, l + o.width, x.size + o.height);
                    }
                    renderText(n, s.label, 0, -a, x, {
                        color: p.color
                    });
                })), n.restore();
            }
            drawTitle() {}
        }
        RadialLinearScale.id = "radialLinear", RadialLinearScale.defaults = {
            display: !0,
            animate: !0,
            position: "chartArea",
            angleLines: {
                display: !0,
                lineWidth: 1,
                borderDash: [],
                borderDashOffset: 0
            },
            grid: {
                circular: !1
            },
            startAngle: 0,
            ticks: {
                showLabelBackdrop: !0,
                callback: Q.formatters.numeric
            },
            pointLabels: {
                backdropColor: void 0,
                backdropPadding: 2,
                display: !0,
                font: {
                    size: 10
                },
                callback: n => n,
                padding: 5,
                centerPointLabels: !1
            }
        }, RadialLinearScale.defaultRoutes = {
            "angleLines.color": "borderColor",
            "pointLabels.color": "color",
            "ticks.color": "color"
        }, RadialLinearScale.descriptors = {
            angleLines: {
                _fallback: "grid"
            }
        };
        const kt = {
            millisecond: {
                common: !0,
                size: 1,
                steps: 1e3
            },
            second: {
                common: !0,
                size: 1e3,
                steps: 60
            },
            minute: {
                common: !0,
                size: 6e4,
                steps: 60
            },
            hour: {
                common: !0,
                size: 36e5,
                steps: 24
            },
            day: {
                common: !0,
                size: 864e5,
                steps: 30
            },
            week: {
                common: !1,
                size: 6048e5,
                steps: 4
            },
            month: {
                common: !0,
                size: 2628e6,
                steps: 12
            },
            quarter: {
                common: !1,
                size: 7884e6,
                steps: 4
            },
            year: {
                common: !0,
                size: 3154e7
            }
        }, St = Object.keys(kt);
        function sorter(n, o) {
            return n - o;
        }
        function parse(n, o) {
            if (isNullOrUndef(o)) return null;
            const r = n._adapter, {parser: s, round: a, isoWeekday: l} = n._parseOpts;
            let h = o;
            return "function" == typeof s && (h = s(h)), isNumberFinite(h) || (h = "string" == typeof s ? r.parse(h, s) : r.parse(h)), 
            null === h ? null : (a && (h = "week" !== a || !isNumber(l) && !0 !== l ? r.startOf(h, a) : r.startOf(h, "isoWeek", l)), 
            +h);
        }
        function determineUnitForAutoTicks(n, o, r, s) {
            const a = St.length;
            for (let l = St.indexOf(n); l < a - 1; ++l) {
                const n = kt[St[l]], a = n.steps ? n.steps : Number.MAX_SAFE_INTEGER;
                if (n.common && Math.ceil((r - o) / (a * n.size)) <= s) return St[l];
            }
            return St[a - 1];
        }
        function addTick(n, o, r) {
            if (r) {
                if (r.length) {
                    const {lo: s, hi: a} = _lookup(r, o);
                    n[r[s] >= o ? r[s] : r[a]] = !0;
                }
            } else n[o] = !0;
        }
        function ticksFromTimestamps(n, o, r) {
            const s = [], a = {}, l = o.length;
            let h, p;
            for (h = 0; h < l; ++h) p = o[h], a[p] = h, s.push({
                value: p,
                major: !1
            });
            return 0 !== l && r ? function(n, o, r, s) {
                const a = n._adapter, l = +a.startOf(o[0].value, s), h = o[o.length - 1].value;
                let p, x;
                for (p = l; p <= h; p = +a.add(p, 1, s)) x = r[p], x >= 0 && (o[x].major = !0);
                return o;
            }(n, s, a, r) : s;
        }
        class TimeScale extends Scale {
            constructor(n) {
                super(n), this._cache = {
                    data: [],
                    labels: [],
                    all: []
                }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, 
                this._parseOpts = void 0;
            }
            init(n, o) {
                const r = n.time || (n.time = {}), s = this._adapter = new et._date(n.adapters.date);
                s.init(o), mergeIf(r.displayFormats, s.formats()), this._parseOpts = {
                    parser: r.parser,
                    round: r.round,
                    isoWeekday: r.isoWeekday
                }, super.init(n), this._normalized = o.normalized;
            }
            parse(n, o) {
                return void 0 === n ? null : parse(this, n);
            }
            beforeLayout() {
                super.beforeLayout(), this._cache = {
                    data: [],
                    labels: [],
                    all: []
                };
            }
            determineDataLimits() {
                const n = this.options, o = this._adapter, r = n.time.unit || "day";
                let {min: s, max: a, minDefined: l, maxDefined: h} = this.getUserBounds();
                function _applyBounds(n) {
                    l || isNaN(n.min) || (s = Math.min(s, n.min)), h || isNaN(n.max) || (a = Math.max(a, n.max));
                }
                l && h || (_applyBounds(this._getLabelBounds()), "ticks" === n.bounds && "labels" === n.ticks.source || _applyBounds(this.getMinMax(!1))), 
                s = isNumberFinite(s) && !isNaN(s) ? s : +o.startOf(Date.now(), r), a = isNumberFinite(a) && !isNaN(a) ? a : +o.endOf(Date.now(), r) + 1, 
                this.min = Math.min(s, a - 1), this.max = Math.max(s + 1, a);
            }
            _getLabelBounds() {
                const n = this.getLabelTimestamps();
                let o = Number.POSITIVE_INFINITY, r = Number.NEGATIVE_INFINITY;
                return n.length && (o = n[0], r = n[n.length - 1]), {
                    min: o,
                    max: r
                };
            }
            buildTicks() {
                const n = this.options, o = n.time, r = n.ticks, s = "labels" === r.source ? this.getLabelTimestamps() : this._generate();
                "ticks" === n.bounds && s.length && (this.min = this._userMin || s[0], this.max = this._userMax || s[s.length - 1]);
                const a = this.min, l = function(n, o, r) {
                    let s = 0, a = n.length;
                    for (;s < a && n[s] < o; ) s++;
                    for (;a > s && n[a - 1] > r; ) a--;
                    return s > 0 || a < n.length ? n.slice(s, a) : n;
                }(s, a, this.max);
                return this._unit = o.unit || (r.autoSkip ? determineUnitForAutoTicks(o.minUnit, this.min, this.max, this._getLabelCapacity(a)) : function(n, o, r, s, a) {
                    for (let l = St.length - 1; l >= St.indexOf(r); l--) {
                        const r = St[l];
                        if (kt[r].common && n._adapter.diff(a, s, r) >= o - 1) return r;
                    }
                    return St[r ? St.indexOf(r) : 0];
                }(this, l.length, o.minUnit, this.min, this.max)), this._majorUnit = r.major.enabled && "year" !== this._unit ? function(n) {
                    for (let o = St.indexOf(n) + 1, r = St.length; o < r; ++o) if (kt[St[o]].common) return St[o];
                }(this._unit) : void 0, this.initOffsets(s), n.reverse && l.reverse(), ticksFromTimestamps(this, l, this._majorUnit);
            }
            afterAutoSkip() {
                this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((n => +n.value)));
            }
            initOffsets(n) {
                let o, r, s = 0, a = 0;
                this.options.offset && n.length && (o = this.getDecimalForValue(n[0]), s = 1 === n.length ? 1 - o : (this.getDecimalForValue(n[1]) - o) / 2, 
                r = this.getDecimalForValue(n[n.length - 1]), a = 1 === n.length ? r : (r - this.getDecimalForValue(n[n.length - 2])) / 2);
                const l = n.length < 3 ? .5 : .25;
                s = _limitValue(s, 0, l), a = _limitValue(a, 0, l), this._offsets = {
                    start: s,
                    end: a,
                    factor: 1 / (s + 1 + a)
                };
            }
            _generate() {
                const n = this._adapter, o = this.min, r = this.max, s = this.options, a = s.time, l = a.unit || determineUnitForAutoTicks(a.minUnit, o, r, this._getLabelCapacity(o)), h = valueOrDefault(a.stepSize, 1), p = "week" === l && a.isoWeekday, x = isNumber(p) || !0 === p, _ = {};
                let y, v, w = o;
                if (x && (w = +n.startOf(w, "isoWeek", p)), w = +n.startOf(w, x ? "day" : l), n.diff(r, o, l) > 1e5 * h) throw new Error(o + " and " + r + " are too far apart with stepSize of " + h + " " + l);
                const k = "data" === s.ticks.source && this.getDataTimestamps();
                for (y = w, v = 0; y < r; y = +n.add(y, h, l), v++) addTick(_, y, k);
                return y !== r && "ticks" !== s.bounds && 1 !== v || addTick(_, y, k), Object.keys(_).sort(((n, o) => n - o)).map((n => +n));
            }
            getLabelForValue(n) {
                const o = this._adapter, r = this.options.time;
                return r.tooltipFormat ? o.format(n, r.tooltipFormat) : o.format(n, r.displayFormats.datetime);
            }
            _tickFormatFunction(n, o, r, s) {
                const a = this.options, l = a.time.displayFormats, h = this._unit, p = this._majorUnit, x = h && l[h], _ = p && l[p], y = r[o], v = p && _ && y && y.major, w = this._adapter.format(n, s || (v ? _ : x)), k = a.ticks.callback;
                return k ? callback(k, [ w, o, r ], this) : w;
            }
            generateTickLabels(n) {
                let o, r, s;
                for (o = 0, r = n.length; o < r; ++o) s = n[o], s.label = this._tickFormatFunction(s.value, o, n);
            }
            getDecimalForValue(n) {
                return null === n ? NaN : (n - this.min) / (this.max - this.min);
            }
            getPixelForValue(n) {
                const o = this._offsets, r = this.getDecimalForValue(n);
                return this.getPixelForDecimal((o.start + r) * o.factor);
            }
            getValueForPixel(n) {
                const o = this._offsets, r = this.getDecimalForPixel(n) / o.factor - o.end;
                return this.min + r * (this.max - this.min);
            }
            _getLabelSize(n) {
                const o = this.options.ticks, r = this.ctx.measureText(n).width, s = toRadians(this.isHorizontal() ? o.maxRotation : o.minRotation), a = Math.cos(s), l = Math.sin(s), h = this._resolveTickFontOptions(0).size;
                return {
                    w: r * a + h * l,
                    h: r * l + h * a
                };
            }
            _getLabelCapacity(n) {
                const o = this.options.time, r = o.displayFormats, s = r[o.unit] || r.millisecond, a = this._tickFormatFunction(n, 0, ticksFromTimestamps(this, [ n ], this._majorUnit), s), l = this._getLabelSize(a), h = Math.floor(this.isHorizontal() ? this.width / l.w : this.height / l.h) - 1;
                return h > 0 ? h : 1;
            }
            getDataTimestamps() {
                let n, o, r = this._cache.data || [];
                if (r.length) return r;
                const s = this.getMatchingVisibleMetas();
                if (this._normalized && s.length) return this._cache.data = s[0].controller.getAllParsedValues(this);
                for (n = 0, o = s.length; n < o; ++n) r = r.concat(s[n].controller.getAllParsedValues(this));
                return this._cache.data = this.normalize(r);
            }
            getLabelTimestamps() {
                const n = this._cache.labels || [];
                let o, r;
                if (n.length) return n;
                const s = this.getLabels();
                for (o = 0, r = s.length; o < r; ++o) n.push(parse(this, s[o]));
                return this._cache.labels = this._normalized ? n : this.normalize(n);
            }
            normalize(n) {
                return _arrayUnique(n.sort(sorter));
            }
        }
        function chart_interpolate(n, o, r) {
            let s, a, l, h, p = 0, x = n.length - 1;
            r ? (o >= n[p].pos && o <= n[x].pos && ({lo: p, hi: x} = _lookupByKey(n, "pos", o)), 
            ({pos: s, time: l} = n[p]), ({pos: a, time: h} = n[x])) : (o >= n[p].time && o <= n[x].time && ({lo: p, hi: x} = _lookupByKey(n, "time", o)), 
            ({time: s, pos: l} = n[p]), ({time: a, pos: h} = n[x]));
            const _ = a - s;
            return _ ? l + (h - l) * (o - s) / _ : l;
        }
        TimeScale.id = "time", TimeScale.defaults = {
            bounds: "data",
            adapters: {},
            time: {
                parser: !1,
                unit: !1,
                round: !1,
                isoWeekday: !1,
                minUnit: "millisecond",
                displayFormats: {}
            },
            ticks: {
                source: "auto",
                major: {
                    enabled: !1
                }
            }
        };
        class TimeSeriesScale extends TimeScale {
            constructor(n) {
                super(n), this._table = [], this._minPos = void 0, this._tableRange = void 0;
            }
            initOffsets() {
                const n = this._getTimestampsForTable(), o = this._table = this.buildLookupTable(n);
                this._minPos = chart_interpolate(o, this.min), this._tableRange = chart_interpolate(o, this.max) - this._minPos, 
                super.initOffsets(n);
            }
            buildLookupTable(n) {
                const {min: o, max: r} = this, s = [], a = [];
                let l, h, p, x, _;
                for (l = 0, h = n.length; l < h; ++l) x = n[l], x >= o && x <= r && s.push(x);
                if (s.length < 2) return [ {
                    time: o,
                    pos: 0
                }, {
                    time: r,
                    pos: 1
                } ];
                for (l = 0, h = s.length; l < h; ++l) _ = s[l + 1], p = s[l - 1], x = s[l], Math.round((_ + p) / 2) !== x && a.push({
                    time: x,
                    pos: l / (h - 1)
                });
                return a;
            }
            _getTimestampsForTable() {
                let n = this._cache.all || [];
                if (n.length) return n;
                const o = this.getDataTimestamps(), r = this.getLabelTimestamps();
                return n = o.length && r.length ? this.normalize(o.concat(r)) : o.length ? o : r, 
                n = this._cache.all = n, n;
            }
            getDecimalForValue(n) {
                return (chart_interpolate(this._table, n) - this._minPos) / this._tableRange;
            }
            getValueForPixel(n) {
                const o = this._offsets, r = this.getDecimalForPixel(n) / o.factor - o.end;
                return chart_interpolate(this._table, r * this._tableRange + this._minPos, !0);
            }
        }
        TimeSeriesScale.id = "timeseries", TimeSeriesScale.defaults = TimeScale.defaults;
    }
} ]);