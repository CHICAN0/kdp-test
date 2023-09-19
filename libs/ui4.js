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