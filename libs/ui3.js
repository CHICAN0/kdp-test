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