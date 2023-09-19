(() => {
    "use strict";
    var e, t = {
        183: (e, t, a) => {
            a(150);
            var o = a(534), i = (a(594), a(248)), s = a(357), n = a(889), r = a(988), l = a(964), c = a(90), h = a(604), d = a(672), u = a(580), g = a(877), b = a(148), p = a(127), k = a(551), w = a(387), $ = a.n(w), v = a(637), T = a.n(v), m = a(106), f = a.n(m), _ = a(915);
            class Popup {
                constructor() {
                    if (null === Popup.instance) {
                        Popup.instance = this, this.booksData = [], this.excludedBooksWithoutSalesRank = [], 
                        this.books20 = [], this.activeTab = new d.L(this), this.isErrorWindow = !1, this.siteParser = void 0, 
                        this.includeBooksWithoutSalesRank = !1, this.storage = new n.N, this.isPulling = !0, 
                        this.totalResults = 0, this.lastListChange = 0, this.columnGetterFunctions = [];
                        var e = this;
                        this.columnGetterFunctions.no = function(e, t) {
                            return parseInt(e.No);
                        }, this.columnGetterFunctions.pageno = function(t, a) {
                            "book" === a && (a = s.W.getBookFirstPaperMachineType(Object.keys(t.CurrentSalesRanks), e.siteParser)), 
                            "all" === a && (a = t.Type);
                            let o = t.PrintLength;
                            return a && t.AllPages[a] && (o = t.AllPages[a]), o = o.includes(":") ? s.W.audioLengthToMinutes(o) : s.W.parseInt(o, e.siteParser.decimalSeparator), 
                            isNaN(o) ? 0 : o;
                        }, this.columnGetterFunctions["title-book"] = function(e, t) {
                            return e.Title;
                        }, this.columnGetterFunctions["publication-date"] = function(e, t) {
                            return "Publication Date: " + (e.DateOfPublication || "unknown");
                        }, this.columnGetterFunctions.price = function(t, a) {
                            "book" === a && (a = s.W.getBookFirstPaperMachineType(Object.keys(t.CurrentSalesRanks), e.siteParser)), 
                            "all" === a && (a = t.Type);
                            let o = t.Price;
                            return a && t.Prices[a] && (o = t.Prices[a]), s.W.parseFloat(o, e.siteParser.decimalSeparator);
                        }, this.columnGetterFunctions["est-sales"] = function(t, a) {
                            "book" === a && (a = s.W.getBookFirstPaperMachineType(Object.keys(t.CurrentSalesRanks), e.siteParser)), 
                            "all" === a && (a = t.Type);
                            let o = t.EstSales;
                            return a && t.EstSalesAll[a] && (o = t.EstSalesAll[a]), o;
                        }, this.columnGetterFunctions["sales-rev"] = function(t, a) {
                            "book" === a && (a = s.W.getBookFirstPaperMachineType(Object.keys(t.CurrentSalesRanks), e.siteParser)), 
                            "all" === a && (a = t.Type);
                            let o = t.SalesRecv;
                            return a && t.EstSalesRecvAll[a] && (o = t.EstSalesRecvAll[a]), o;
                        }, this.columnGetterFunctions.reviews = function(t, a) {
                            return s.W.parseInt(t.Reviews, e.siteParser.decimalSeparator);
                        }, this.columnGetterFunctions["sales-rank"] = function(t, a) {
                            "book" === a && (a = s.W.getBookFirstPaperMachineType(Object.keys(t.CurrentSalesRanks), e.siteParser)), 
                            "all" === a && (a = t.Type);
                            let o = t.SalesRank;
                            return a && t.CurrentSalesRanks[a] && (o = t.CurrentSalesRanks[a]), s.W.parseInt(o, e.siteParser.decimalSeparator);
                        }, this.currentSortColumn = "no", this.currentSortDirection = 1, this.isRefreshStarted = !1, 
                        this.isStaticLinkInitialized = !1, this.loginTab = new h.o(this), this.logoutButton = (0, 
                        o.$)("#logout-button"), this.optionsButton = (0, o.$)("#options-button"), this.url = "";
                    }
                }
                static instance=null;
                resetCss() {
                    (0, o.$)("#main-header").hide(), (0, o.$)("#tracking-header").hide(), (0, o.$)(".info.single_book").hide(), 
                    (0, o.$)(".info.list_books").hide(), (0, o.$)(".info.single_book .info-item").css("width", ""), 
                    (0, o.$)("#infoPages").hide(), (0, o.$)(".table-head").hide(), (0, o.$)(".img-load").hide(), 
                    (0, o.$)(".table-head-keyword-search").hide(), (0, o.$)("#word-cloud-content").hide(), 
                    (0, o.$)("#no-data-found-content").hide(), (0, o.$)("#no-supported-area").hide(), 
                    (0, o.$)("#no-supported-language").hide(), (0, o.$)("#no-supported-type").hide(), 
                    (0, o.$)("#no-supported-logged-in").hide(), (0, o.$)("#no-tracked-books").hide(), 
                    (0, o.$)("#main-content").hide(), (0, o.$)("#login-content").hide(), (0, o.$)("#trial-expired-content").hide(), 
                    (0, o.$)("#insights-content").hide(), (0, o.$)("#cancelled-text").hide(), (0, o.$)("#unlock-cancelled-account-button").hide(), 
                    (0, o.$)("#loading-content").hide(), (0, o.$)("#content-keyword-search").hide(), 
                    (0, o.$)("#tracking-content").hide(), (0, o.$)(".right-panel").hide(), (0, o.$)(".left-panel").css("width", ""), 
                    (0, o.$)("#WordCloudFooter").hide(), (0, o.$)("#InsightsFooter").hide(), (0, o.$)("#BestSellersRankingFooter").hide(), 
                    (0, o.$)("#NoDataFooter").hide(), (0, o.$)("#no-compatible-aria-footer").hide(), 
                    (0, o.$)("#ExportBtn").hide(), (0, o.$)("#TrackedPanelFooter").hide(), (0, o.$)("#SearchPanelFooter").hide(), 
                    (0, o.$)("#TrackingExportImport").hide(), (0, o.$)("#BookTracked").hide(), (0, o.$)("#totalReSalesRecvBlock").hide(), 
                    (0, o.$)("#Conclusion").hide(), (0, o.$)("#ExportBtnWordCloud").hide(), (0, o.$)("#BackToTrackingList").hide(), 
                    (0, o.$)("#SingleAiInsights").hide(), (0, o.$)("#GlobalHelpButton").hide(), (0, 
                    o.$)("#AdPanel").hide(), (0, o.$)("#login-footer").hide(), this.activeTab && this.activeTab.resetCss && this.activeTab.resetCss(), 
                    l.m.reset();
                }
                compare(e, t) {
                    var a = this.columnGetterFunctions[this.currentSortColumn];
                    return a(e, this.activeTab.selectedBookType) < a(t, this.activeTab.selectedBookType) ? -this.currentSortDirection : a(e, this.activeTab.selectedBookType) > a(t, this.activeTab.selectedBookType) ? this.currentSortDirection : 0;
                }
                generateCompareFunc(e, t, a) {
                    return (o, i) => {
                        var s = this.columnGetterFunctions[e];
                        return s(o, a) < s(i, a) ? -t : s(o, a) > s(i, a) ? t : 0;
                    };
                }
                getData(e) {
                    var t = this;
                    e = s.W.valueOrDefault(e, (function() {})), i.V.sendMessageToActiveTab({
                        type: "get-data"
                    }, (function(a) {
                        if (void 0 !== a) {
                            var o = a.books.slice(0, Math.min(20, a.books.length));
                            a.books.sort(t.generateCompareFunc("no", 1));
                            var i = a.books.slice(0, Math.min(20 * t.activeTab.pageNum, a.books.length));
                            return i.sort((function(e, a) {
                                return t.compare(e, a);
                            })), e({
                                books: i,
                                isWaitingForPulling: a.isWaitingForPulling,
                                isPulling: a.isPulling,
                                books20: o,
                                totalResults: a.totalResults || 0
                            });
                        }
                    }));
                }
                refreshData(e) {
                    var t = this;
                    t.getData((function(e) {
                        t.booksData.length !== e.books.length && (t.lastListChange = Date.now()), t.booksData = e.books, 
                        t.books20 = e.books20, t.isPulling = e.isPulling, t.totalResults = e.totalResults, 
                        t.activeTab.stats && (t.activeTab.stats.totalResults = e.totalResults), Date.now() - t.lastListChange > 4e3 && (t.isPulling = !1), 
                        t.isPulling ? (0, o.$)("#InsightsLink").addClass("disabled") : (0, o.$)("#InsightsLink").removeClass("disabled"), 
                        t.booksData.length <= 0 || (t.booksData.forEach(((e, a) => {
                            e.SalesRank || t.includeBooksWithoutSalesRank || (t.excludedBooksWithoutSalesRank.includes(a) || t.excludedBooksWithoutSalesRank.push(a), 
                            e.excluded = !0);
                        })), s.W.setupHeader(t.booksData[0].Category || t.booksData[0].Author, t.booksData[0].CategoryKind), 
                        t.isErrorWindow ? t.startKdspy() : t.activeTab.isPaged && (t.activeTab.insertData(t.activeTab.pageNum - 1, t.booksData, t.siteParser, t.books20, t.isPulling), 
                        e.isWaitingForPulling ? (0, o.$)(".img-load").show() : (0, o.$)(".img-load").hide(), 
                        !t.isPulling || [ "NewReleasesPage", "BestSellersPage" ].includes(t.activeTab.pageType) && t.booksData.length >= 20 ? ((0, 
                        o.$)(".status-img div").show(), (0, o.$)(".bullet-progress").hide()) : ((0, o.$)(".status-img div").hide(), 
                        (0, o.$)(".bullet-progress").show())));
                    })), e || setTimeout((function() {
                        t.refreshData();
                    }), 1e3);
                }
                initRankTrackingTab(e, t) {
                    (0, o.$)("#LinkBackTo").hide(), this.showContentLoading(), this.activeTab = new u.Z(this.siteParser, this), 
                    this.activeTab.selectedBookType = this.activeTab.selectedTableType, this.activeTab.loadDetails(e, ((a, i) => {
                        if (t || (0, o.$)("#LinkBackTo").show(), (0, o.$)("#loading-content").hide(), this.resetCss(), 
                        !a.bookTypes.length) return (0, o.$)("#no-supported-area").show(), (0, o.$)("#no-compatible-aria-footer").show(), 
                        void this.loadAdvertisementBanner();
                        u.Z.resetTrackingBookPage(e), (0, o.$)("#tracking-header").show(), (0, o.$)("#tracking-content").show(), 
                        (0, o.$)("#TrackedPanelFooter").show(), (0, o.$)(".info.single_book").show(), (0, 
                        o.$)(".right-panel").show(), (0, o.$)(".table-head").show(), (0, o.$)(".table-head").html("<label>Bestseller rank tracking (30 days)<label>"), 
                        this.loadAdvertisementBanner(), (0, o.$)(".left-panel").css("width", "525px"), (0, 
                        o.$)("#main-header").html(""), (0, o.$)("#tracking-content").html(""), i(a);
                    }), !0);
                }
                showRankTrackingTab() {
                    this.activeTab = new u.Z(this.siteParser, this);
                    var e = this.activeTab.load();
                    (0, o.$)("#main-header").html(""), (0, o.$)("#data-body").html(""), (0, o.$)(".info.list_books").html(e.info), 
                    this.resetCss(), (0, o.$)("#main-header").show(), (0, o.$)("#main-content").show(), 
                    (0, o.$)("#TrackedPanelFooter").show(), (0, o.$)("#TrackingExportImport").show(), 
                    (0, o.$)("#GlobalHelpButton").show(), (0, o.$)(".info.list_books").show(), (0, o.$)(".table-head").show(), 
                    (0, o.$)("#AdPanel").show(), this.loadAdvertisementBanner(), (0, o.$)("#data-body").css("overflow-y", "auto"), 
                    (0, o.$)(".table-head").html(e.header), this.activeTab.updateRateTrackingTable();
                }
                showWordCloudTab() {
                    this.infoBox && this.infoBox.hide(), this.activeTab = new b.P(this.activeTab.pageNum);
                    var e = this.activeTab.load(this.booksData);
                    this.resetCss(), (0, o.$)(".table-head").html(""), (0, o.$)(".info.list_books").html(e.info), 
                    (0, o.$)("#word-cloud-content").html(e.content), (0, o.$)("#Words").html(e.words), 
                    (0, o.$)("#main-header").show(), (0, o.$)("#word-cloud-content").show(), (0, o.$)(".info.list_books").show(), 
                    (0, o.$)("#WordCloudFooter").show(), (0, o.$)("#ExportBtnWordCloud").show(), (0, 
                    o.$)("#GlobalHelpButton").show(), (0, o.$)("#AdPanel").show(), this.loadAdvertisementBanner();
                }
                showInsightsTab(e, t) {
                    this.activeTab.constructor !== _.u && (this.infoBox && this.infoBox.hide(), this.activeTab = new _.u(this.activeTab.pageNum), 
                    this.activeTab.load(e, t), this.resetCss(), (0, o.$)(".table-head").html(""), (0, 
                    o.$)("#main-header").show(), (0, o.$)("#GlobalHelpButton").show(), (0, o.$)("#InsightsFooter").show(), 
                    (0, o.$)("#AdPanel").show(), (0, o.$)("#insights-content").show(), this.loadAdvertisementBanner());
                }
                showBestSellerTab() {
                    (0, o.$)("#data-body").css("overflow-y", "auto"), this.activeTab = new d.L(this), 
                    this.startKdspy(), this.infoBox && this.infoBox.show();
                }
                showKeywordAnalysisTab() {
                    this.activeTab = new c.$(this);
                    var e = this.activeTab.kwdAnalysisListShow();
                    this.resetCss(), (0, o.$)("#data-body").html(""), (0, o.$)(".info.list_books").html(e.info), 
                    (0, o.$)("#main-content").show(), (0, o.$)("#main-header").show(), (0, o.$)("#BestSellersRankingFooter").show(), 
                    (0, o.$)("#ExportBtn").show(), (0, o.$)(".info.list_books").show(), (0, o.$)(".table-head").show(), 
                    (0, o.$)("#totalReSalesRecvBlock").show(), (0, o.$)("#Conclusion").show(), this.loadAdvertisementBanner(), 
                    (0, o.$)(".info-item").css("width", "16.6%"), (0, o.$)("#data-body").css("overflow-y", "hidden"), 
                    (0, o.$)(".table-head").html(e.header), this.activeTab.insertData(this.activeTab.pageNum - 1, this.booksData, this.siteParser, this.books20, this.isPulling);
                }
                setupClickListeners() {
                    var e = this;
                    (0, o.$)("#TitleWordCloud").click((function() {
                        e.showWordCloudTab();
                    })), (0, o.$)("#InsightsLink").click((() => {
                        this.isPulling || this.showInsightsTab("topic", this.booksData);
                    })), (0, o.$)("#BestSellerLink").click((function() {
                        e.showBestSellerTab();
                    })), (0, o.$)("#RankTrackingResultList").click((function() {
                        e.showRankTrackingTab();
                    })), (0, o.$)("#KeywordAnalysis").click((function() {
                        e.showKeywordAnalysisTab();
                    }));
                }
                setupStaticClickListeners() {
                    if (this.isStaticLinkInitialized) return;
                    var e = this;
                    let t = (0, o.$)("body");
                    t.on("click", "#LinkBackTo, #no-tracked-books-button", (function() {
                        (0, o.$)("#data-body").css("overflow-y", "auto"), e.activeTab = new d.L(e), e.resetCss(), 
                        e.startKdspy();
                    })), t.on("click", ".data-enable-tracking", (function() {
                        (0, o.$)("#LinkBackTo").hide();
                        let t = (0, o.$)(this);
                        t.hide(), e.storage.enableTracking(t.data().url, (function() {
                            e.activeTab.loadDetails(t.data().url, u.Z.prototype.updateBookView.bind(e.activeTab), !0);
                        }));
                    })), t.on("click", "#learn-whats-new-link", (e => {
                        e.preventDefault(), chrome.storage.local.set({
                            recentlyUpdated: !1
                        }), i.V.openNewTab("https://www.kdspy.com/whats-new/");
                    })), t.on("click", "#close-recently-updated", (e => {
                        e.preventDefault(), chrome.storage.local.set({
                            recentlyUpdated: !1
                        }), (0, o.$)(".recently-updated").hide();
                    })), (0, o.$)("#disableTracking").click((function() {
                        var t = this;
                        e.storage.disableTracking((0, o.$)(t).data().url, (function(a) {
                            (0, o.$)("#LinkBackTo").hide(), e.activeTab.loadDetails((0, o.$)(t).data().url, (function() {
                                (0, o.$)("#LinkBackTo").show();
                            }), !0);
                        }));
                    })), (0, o.$)("#ExportTrackingBtn").click((function() {
                        new u.Z(this.siteParser, e).export();
                    })), (0, o.$)("#ImportTrackingBtn").click((function() {
                        new u.Z(this.siteParser, e).import();
                    })), t.on("click", 'table[name="data"] tbody .RankTrackingResultSingle', (function() {
                        e.initRankTrackingTab((0, o.$)(this).attr("bookUrl"));
                    })), t.on("click", ".sr_checkbox", (e => {
                        let t = (0, o.$)(e.currentTarget);
                        if (!t.attr("data-asin")) return;
                        let a = "true" === t.attr("data-excluded"), s = t.attr("data-asin"), n = t.attr("data-title");
                        i.V.sendMessageToActiveTab({
                            type: "save-excluded",
                            ASIN: s,
                            Title: n,
                            excluded: !a
                        }), t.attr("src", chrome.runtime.getURL(a ? "/assets/images/checkbox_yes.png" : "/assets/images/checkbox_no.png"));
                    })), (0, o.$)("#PullResult").click((function() {
                        e.setActivePage(e.activeTab.pageNum + 1), (0, o.$)("#PullResultLoading").show(), 
                        (0, o.$)("#PullResult").hide(), e.isPulling = !0, e.lastListChange = Date.now(), 
                        i.V.sendMessageToActiveTab({
                            type: "pull-data",
                            page: e.activeTab.pageNum
                        });
                    }));
                    (0, o.$)("#ExportBtn, #ExportSearchBtn, #ExportBtnWordCloud").click((function(t) {
                        let a = (0, o.$)(t.currentTarget);
                        a.find("img").hide().after('<div class="loader"></div>'), e.activeTab.exportToCsv(e.booksData, e.siteParser, (() => {
                            a.find("img").show(), a.find(".loader").remove();
                        }));
                    })), (0, o.$)("#BackToTrackingList").click((function() {
                        e.showRankTrackingTab();
                    })), (0, o.$)(".help").click((function() {
                        i.V.openNewTab("http://www.kdspy.com/c/help/");
                    })), (0, o.$)(".support").click((function() {
                        i.V.openNewTab("https://www.publishingaltitude.com/contact-us/");
                    })), (0, o.$)(".recommended").click((function() {
                        i.V.openNewTab("https://www.publishingaltitude.com/c/resources/");
                    })), (0, o.$)("#go-categories").click(s.W.openDefaultCategoryUrl), (0, o.$)("#PullAZResult").on("click", (function(t) {
                        t.preventDefault(), e.activeTab instanceof g.f && e.activeTab.showAZ();
                    })), (0, o.$)(".search").click((function() {
                        e.activeTab = new g.f(e.siteParser, e.searchKeywordBooksType);
                        var t = e.activeTab.load();
                        (0, o.$)("#main-header").html(""), (0, o.$)(".info.list_books").html(t), (0, o.$)("#search-text").keypress((function(t) {
                            "13" == (t.keyCode ? t.keyCode : t.which) && e.activeTab.search();
                        })), (0, o.$)("#go-search").click((function() {
                            e.activeTab.search();
                        })), e.resetCss(), (0, o.$)("#main-header").show(), (0, o.$)("#content-keyword-search").show(), 
                        (0, o.$)("#SearchPanelFooter").show(), (0, o.$)(".info.list_books").show(), (0, 
                        o.$)("#search-text").focus(), (0, o.$)("#AdPanel").show(), (0, o.$)("#GlobalHelpButton").show(), 
                        (0, o.$)("#keyword-search-tabs").css({
                            display: "flex"
                        }), (0, o.$)('table[name="data-keyword-search"] tr').length > 0 && (0, o.$)(".table-head-keyword-search").show(), 
                        e.loadAdvertisementBanner(), (0, o.$)("#data-body-keyword-search").css("overflow-y", "auto");
                    })), (0, o.$)('table[name="data-keyword-search"] tbody').on("click", ".keyword-analyze", (function() {
                        let t = e.activeTab.currentType;
                        e.searchKeywordBooksType = t, e.activeTab = new d.L(e), e.activeTab.currentType = t;
                        var a = (0, o.$)(this).attr("keyword");
                        i.V.sendMessageToActiveTab({
                            type: "start-analyze-search-keywords",
                            keyword: a,
                            booksType: t
                        }), e.startKdspy();
                    })), (0, o.$)('table[name="data-keyword-search"] tbody').on("click", ".keyword-get-avg", (function(t) {
                        t.preventDefault();
                        var a = (0, o.$)(this), n = a.data("keyword"), r = s.W.getSearchUrl(n, e.siteParser, e.activeTab.currentType), l = a.parent();
                        return l.html('<div>$ <img style="max-height: 10px" src="/assets/images/3-dot-load.gif"/></div>'), 
                        i.V.sendMessageToActiveTab({
                            type: "get-avg-sales",
                            uri: r,
                            keyword: n
                        }, (function(t) {
                            var a = (0, o.$)('<div class="avg-sales"><span>$</span> ' + t.avgSales.replace("$", "") + "</div>");
                            l.html(a), e.activeTab.items[e.activeTab.currentType].find((e => e.keyword === n)).avgSales = t.avgSales;
                        })), !1;
                    })), this.logoutButton.click((function() {
                        e.loginTab.onLogoutClick().then((function() {
                            window.close();
                        }));
                    })), this.optionsButton.click((function() {
                        window.location = chrome.runtime.getURL("/pages/options/options.html?in_popup=1");
                    })), e.isStaticLinkInitialized = !0;
                }
                loadData(e, t) {
                    if (this.setupStaticClickListeners(), void 0 === e || e.length < 1) {
                        this.isErrorWindow = !0, this.showContentLoading();
                        var a = this;
                        setTimeout((function() {
                            a.checkIsDataLoaded();
                        }), 15e3);
                    } else this.updateTable(e, t);
                }
                showContentLoading() {
                    this.resetCss(), (0, o.$)("#main-header").html(""), (0, o.$)(".info.list_books").html(""), 
                    (0, o.$)(".info.list_books").show(), (0, o.$)("#NoDataFooter").show(), (0, o.$)("#AdPanel").show(), 
                    (0, o.$)("#GlobalHelpButton").show(), (0, o.$)(".table-head").html(""), (0, o.$)("#main-content").hide(), 
                    (0, o.$)("#loading-content").show(), (0, o.$)("#main-header").show();
                }
                checkIsDataLoaded() {
                    var e = this;
                    i.V.sendMessageToActiveTab({
                        type: "get-data"
                    }, (function(t) {
                        0 == t.books.length && (e.isErrorWindow = !0, e.resetCss(), (0, o.$)("#main-header").html(""), 
                        (0, o.$)(".table-head").html(""), i.V.sendMessageToActiveTab({
                            type: "get-type-page"
                        }, (function(t) {
                            void 0 === t || "" === t ? ((0, o.$)("#no-supported-area").show(), (0, o.$)("#no-compatible-aria-footer").show()) : ((0, 
                            o.$)("body").attr("data-screen", t), (0, o.$)("#no-data-found-content").show(), 
                            (0, o.$)("#NoDataFooter").show()), (0, o.$)("#ExportBtn").show(), (0, o.$)("#AdPanel").show(), 
                            (0, o.$)("#GlobalHelpButton").show(), e.loadAdvertisementBanner();
                        })));
                    }));
                }
                updateTable(e, t) {
                    var a = this;
                    a.isErrorWindow = !1, a.excludedBooksWithoutSalesRank = [], a.storage.getNumberOfBooks((function(t) {
                        t = void 0 === t ? 0 : t, (0, o.$)("#RankTrackingResultList").html("Book Tracking (" + t + ")"), 
                        (0, o.$)("#main-header").html(s.W.buildHeaderHtml(t, 20 * a.activeTab.pageNum)), 
                        [ "AuthorPage", "SeriesPage" ].includes(a.activeTab.pageType) && (0, o.$)("#InsightsLinkWrapper").hide(), 
                        a.infoBox = new r.v(".infoBox", d.L.prototype.getSelectedBooks.bind(a.activeTab), d.L.prototype.getStats.bind(a.activeTab)), 
                        e && e[0] && (s.W.setupHeader(e[0].Category || e[0].Author, e[0].CategoryKind), 
                        s.W.setupFooter(e[0].CategoryKind)), a.setupClickListeners();
                    }));
                    var i = a.activeTab.load();
                    a.resetCss(), (0, o.$)("#data-body").html(""), (0, o.$)(".info.list_books").html(i.info), 
                    (0, o.$)("#main-content").show(), (0, o.$)("#main-header").show(), (0, o.$)("#BestSellersRankingFooter").show(), 
                    (0, o.$)("#ExportBtn").show(), (0, o.$)(".info.list_books").show(), (0, o.$)(".table-head").show(), 
                    (0, o.$)("#totalReSalesRecvBlock").show(), (0, o.$)("#Conclusion").show(), a.loadAdvertisementBanner(), 
                    (0, o.$)("#data-body").css("overflow-y", "hidden"), (0, o.$)(".table-head").html(i.header), 
                    (0, o.$)(".sort-column").each((function(e) {
                        (0, o.$)(this).click((function() {
                            var e = (0, o.$)(this).attr("id");
                            a.currentSortDirection *= -1, a.currentSortColumn != e && (a.currentSortDirection = 1), 
                            a.currentSortColumn = e;
                        }));
                    })), a.activeTab.insertData(a.activeTab.pageNum - 1, e, a.siteParser, t, a.isPulling);
                }
                setActivePage(e) {
                    (0, o.$)("#TitleWordCloud").text("Word Cloud (" + 20 * e + ")"), this.activeTab.pageNum = e, 
                    this.activeTab.savePageNum(), this.activeTab.insertData(e - 1, this.booksData, this.siteParser, this.books20, this.isPulling);
                }
                checkAndStartKdspy() {
                    var e = this;
                    e.logoutButton.show(), e.optionsButton.show(), e.loginTab.isCredentialsIncorrect((function(t) {
                        if (t) return e.logoutButton.hide(), e.optionsButton.hide(), e.loginTab.load(), 
                        void e.loginTab.loginFailedMessage.show();
                        e.loginTab.isAccountInactive((function(t) {
                            if (t) return e.resetCss(), void e.loginTab.showAccountInactive();
                            e.loginTab.isTrialExpired((function(t) {
                                if (t) return e.resetCss(), void e.loginTab.showTrialExpired();
                                e.startKdspy();
                            }));
                        }));
                    }));
                }
                startKdspy() {
                    var e = this, t = this.url;
                    this.siteParser = s.W.getSiteParser(t), (0, o.$)("#regionSelector").val(this.siteParser.region), 
                    i.V.isFirefox() && (0, o.$)("body").addClass("firefox");
                    let a, n = !1;
                    i.V.sendMessageToActiveTabAsync({
                        type: "check-logged-in"
                    }).then((e => (a = e, new Promise((e => {
                        chrome.storage.local.get({
                            ignoreLoggedIn: !1
                        }, (t => e(t.ignoreLoggedIn)));
                    }))))).then((r => {
                        const next = () => (setTimeout((() => {
                            n || (0, o.$)("#loading-content").show().css("margin-top", "60px");
                        }), 300), (0, o.$)("#no-supported-logged-in").hide(), s.W.timeoutDecorator(i.V.sendMessageToActiveTabAsync({
                            type: "check-language"
                        }), 4e3, !0).catch((() => !0)).then((a => {
                            if (n = !0, !a) return (0, o.$)("#loading-content").hide(), void (0, o.$)("#no-supported-language").show();
                            i.V.sendMessageToActiveTab({
                                type: "get-type-page-and-url"
                            }, (function([a, i, n]) {
                                if ((0, o.$)("#loading-content").hide().css("margin-top", ""), "SingleBookPage" == a) return e.activeTab = new u.Z(e.siteParser, e), 
                                void e.initRankTrackingTab(t, !0);
                                (0, o.$)("body").attr("data-screen", a), e.activeTab.pageType = a, e.activeTab.pageUrl = i, 
                                e.activeTab.currentType = n, e.activeTab.isKindlePage = s.W.isKindlePage(i), new d.L(e).loadPageNum((function() {
                                    new c.$(e).loadPageNum((function() {
                                        e.getData((function(t) {
                                            e.booksData = t.books, e.books20 = t.books20, e.isPulling = t.isPulling, e.loadData(e.booksData, e.books20), 
                                            e.loadAdvertisementBanner();
                                        }));
                                    }));
                                })), e.isRefreshStarted || (e.refreshData(), e.isRefreshStarted = !0);
                            }));
                        })));
                        return a && !r ? ((0, o.$)("#loading-content").hide(), e.resetCss(), (0, o.$)("#no-supported-logged-in").show(), 
                        new Promise((e => {
                            (0, o.$)("#no-logged-in-button").on("click", (t => {
                                e();
                            })), (0, o.$)("#rememberLogoutChoice").change((function() {
                                chrome.storage.local.set({
                                    ignoreLoggedIn: !0
                                }, (() => e()));
                            }));
                        })).then(next)) : next();
                    }));
                }
                checkUrlAndLogin() {
                    var e = this;
                    i.V.sendMessageToActiveTab({
                        type: "get-current-url"
                    }, (function(t) {
                        e.url = t, void 0 === t || t.indexOf("www.amazon.") < 0 ? s.W.openDefaultCategoryUrl().then((() => {
                            window.close();
                        })) : e.loginTab.isLoggedIn((function(t) {
                            t ? e.checkAndStartKdspy() : (e.logoutButton.hide(), e.optionsButton.hide(), e.loginTab.load());
                        }));
                    }));
                }
                initRegionSelector() {
                    (0, o.$)("#regionSelector").on("change", (function() {
                        var e;
                        switch ((0, o.$)(this).val()) {
                          case p.O$.region:
                            e = "http://www.amazon.com/Best-Sellers-Kindle-Store-eBooks/zgbs/digital-text/154606011/ref=zg_bs_nav_kstore_1_kstore";
                            break;

                          case p.kA.region:
                            e = "http://www.amazon.co.uk/Best-Sellers-Kindle-Store-eBooks/zgbs/digital-text/341689031/ref=zg_bs_nav_kinc_1_kinc";
                            break;

                          case p.vE.region:
                            e = "http://www.amazon.de/gp/bestsellers/digital-text/530886031/ref=zg_bs_nav_kinc_1_kinc";
                            break;

                          case p.y_.region:
                            e = "http://www.amazon.fr/gp/bestsellers/digital-text/695398031/";
                            break;

                          case p.ir.region:
                            e = "http://www.amazon.ca/gp/bestsellers/digital-text/2980423011/";
                            break;

                          case p.gu.region:
                            e = "http://www.amazon.it/gp/bestsellers/digital-text/827182031/";
                            break;

                          case p._H.region:
                            e = "http://www.amazon.es/gp/bestsellers/digital-text/827231031";
                            break;

                          case p.Wu.region:
                            e = "http://www.amazon.in/gp/bestsellers/digital-text/1634753031";
                            break;

                          case p.GB.region:
                            e = "https://www.amazon.co.jp/gp/bestsellers/digital-text/2275256051";
                            break;

                          case p.$_.region:
                            e = "https://www.amazon.com.au/gp/bestsellers/digital-text/2496751051";
                            break;

                          case p.GW.region:
                            e = "https://www.amazon.com.br/gp/bestsellers/digital-text/5475882011";
                            break;

                          case p.wJ.region:
                            e = "https://www.amazon.com.mx/gp/bestsellers/digital-text/6507977011/";
                        }
                        i.V.openNewTab(e);
                    }));
                }
                loadAdvertisementBanner() {
                    i.V.sendMessageToBackground({
                        type: "http-get-bg",
                        data: {
                            url: "https://publishingaltitude.com/splash.html"
                        }
                    }, (function(e) {
                        void 0 !== e && (0, o.$)("#ad").html(e);
                    }));
                }
            }
            function onShow() {
                Popup.instance.resetCss(), Popup.instance.activeTab = new d.L(Popup.instance), g.f.clearTable(), 
                g.f.searchedKeyword = "", Popup.instance.checkUrlAndLogin();
            }
            (0, o.$)(window).ready((function() {
                (0, o.$)("#bullet-1, #bullet-2, #bullet-3").tooltipster({
                    animation: "fade",
                    theme: "tooltip-theme",
                    maxWidth: 200,
                    updateAnimation: !1,
                    position: "top"
                }), chrome.storage.local.get({
                    recentlyUpdated: !1
                }, (e => {
                    if (e.recentlyUpdated) {
                        let e = chrome.runtime.getManifest().version;
                        (0, o.$)(".extension-version").text(e);
                    } else (0, o.$)(".recently-updated").hide();
                }));
                var e = new Popup;
                window.popup = e, e.setupStaticClickListeners(), e.initRegionSelector(), i.V.registerOnShowEvent(onShow);
            })), (0, k.f)([ f(), T(), $() ]);
        }
    }, a = {};
    function __webpack_require__(e) {
        var o = a[e];
        if (void 0 !== o) return o.exports;
        var i = a[e] = {
            id: e,
            exports: {}
        };
        return t[e].call(i.exports, i, i.exports, __webpack_require__), i.exports;
    }
    __webpack_require__.m = t, e = [], __webpack_require__.O = (t, a, o, i) => {
        if (!a) {
            var s = 1 / 0;
            for (c = 0; c < e.length; c++) {
                for (var [a, o, i] = e[c], n = !0, r = 0; r < a.length; r++) (!1 & i || s >= i) && Object.keys(__webpack_require__.O).every((e => __webpack_require__.O[e](a[r]))) ? a.splice(r--, 1) : (n = !1, 
                i < s && (s = i));
                if (n) {
                    e.splice(c--, 1);
                    var l = o();
                    void 0 !== l && (t = l);
                }
            }
            return t;
        }
        i = i || 0;
        for (var c = e.length; c > 0 && e[c - 1][2] > i; c--) e[c] = e[c - 1];
        e[c] = [ a, o, i ];
    }, __webpack_require__.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return __webpack_require__.d(t, {
            a: t
        }), t;
    }, __webpack_require__.d = (e, t) => {
        for (var a in t) __webpack_require__.o(t, a) && !__webpack_require__.o(e, a) && Object.defineProperty(e, a, {
            enumerable: !0,
            get: t[a]
        });
    }, __webpack_require__.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), 
    __webpack_require__.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, __webpack_require__.j = 532, (() => {
        var e = {
            532: 0
        };
        __webpack_require__.O.j = t => 0 === e[t];
        var webpackJsonpCallback = (t, a) => {
            var o, i, [s, n, r] = a, l = 0;
            if (s.some((t => 0 !== e[t]))) {
                for (o in n) __webpack_require__.o(n, o) && (__webpack_require__.m[o] = n[o]);
                if (r) var c = r(__webpack_require__);
            }
            for (t && t(a); l < s.length; l++) i = s[l], __webpack_require__.o(e, i) && e[i] && e[i][0](), 
            e[i] = 0;
            return __webpack_require__.O(c);
        }, t = globalThis.webpackChunkkindlespy = globalThis.webpackChunkkindlespy || [];
        t.forEach(webpackJsonpCallback.bind(null, 0)), t.push = webpackJsonpCallback.bind(null, t.push.bind(t));
    })();
    var o = __webpack_require__.O(void 0, [ 576, 522 ], (() => __webpack_require__(183)));
    o = __webpack_require__.O(o);
})();