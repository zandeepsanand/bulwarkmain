! function(t) {
    var e = {};

    function n(a) {
        if (e[a]) return e[a].exports;
        var o = e[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return t[a].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = t, n.c = e, n.d = function(t, e, a) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: a
        })
    }, n.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, n.t = function(t, e) {
        if (1 & e && (t = n(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var a = Object.create(null);
        if (n.r(a), Object.defineProperty(a, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var o in t) n.d(a, o, function(e) {
                return t[e]
            }.bind(null, o));
        return a
    }, n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 0)
}([function(t, e) {
    class n extends elementorModules.frontend.handlers.Base {
        getDefaultSettings() {
            return {
                selectors: {
                    wrapper: ".jeg-elementor-kit.post-element",
                    pagination: ".jkit-block-pagination"
                }
            }
        }
        getDefaultElements() {
            const t = this.getSettings("selectors");
            return {
                $wrapper: this.$element.find(t.wrapper),
                $pagination: this.$element.find(t.pagination)
            }
        }
        bindEvents() {
            this.onInitPagination()
        }
        onInitPagination() {
            const t = this.elements.$wrapper,
                e = this.elements.$pagination,
                n = t.data("settings"),
                a = n.pagination_scroll_limit,
                o = n.pagination_mode,
                i = n.sg_content_sorting,
                r = t.find(".product-order select"),
                l = {
                    action: jkit_element_pagination_option.element_prefix + n.class,
                    data: {
                        current_page: 1,
                        attr: n,
                        default_sortby: n.sort_by
                    }
                };
            let d = !1,
                s = [];
            const u = function() {
                    d || e.hasClass("disabled") || window.self != window.top || (a >= l.data.current_page || "0" == a) && e.find(".jkit-block-loadmore").elementorWaypoint((function() {
                        l.data.current_page = l.data.current_page + 1, j(), this.destroy()
                    }), {
                        offset: "100%",
                        context: window
                    })
                },
                c = function(t) {
                    t.preventDefault(), d || e.find(this).hasClass("disabled") || ("prev" === t.data ? l.data.current_page = l.data.current_page - 1 : l.data.current_page = l.data.current_page + 1, j())
                },
                f = function(t) {
                    t.content = "<div>" + t.content + "</div>";
                    const e = jQuery(t.content);
                    return t.content = e.html(), t
                },
                p = function(n) {
                    ["loadmore", "scrollload"].includes(o) ? function(n) {
                        const a = jQuery(n.content);
                        let i = 0;
                        a.each((function() {
                            (jQuery(this).hasClass("jkit-post") || jQuery(this).hasClass("jkit-product-block")) && jQuery(this).addClass("jkit-ajax-loaded anim-" + i), i++
                        })), t.removeClass("loading"), t.addClass("loaded"), t.find(".jkit-ajax-flag").append(a), n.next || (e.addClass("disabled"), e.hide()), k(), jQuery(window).trigger("resize"), "scrollload" === o && setTimeout((function() {
                            u()
                        }), 500)
                    }(n) : "nextprev" === o ? function(n) {
                        const a = jQuery(n.content);
                        let o = 0;
                        a.each((function() {
                            (jQuery(this).hasClass("jkit-post") || jQuery(this).hasClass("jkit-product-block")) && jQuery(this).addClass("jkit-ajax-loaded anim-" + o), o++
                        })), t.removeClass("loading"), t.addClass("loaded"), t.find(".jkit-ajax-flag").html(a), n.next ? e.find(".jkit-pagination-button.jkit-block-nextprev .next").removeClass("disabled") : e.find(".jkit-pagination-button.jkit-block-nextprev .next").addClass("disabled"), n.prev ? e.find(".jkit-pagination-button.jkit-block-nextprev .prev").removeClass("disabled") : e.find(".jkit-pagination-button.jkit-block-nextprev .prev").addClass("disabled"), k(), jQuery(window).trigger("resize"), jQuery("html, body").animate({
                            scrollTop: t.offset().top - 100
                        }, 1e3)
                    }(n) : function(e) {
                        const n = jQuery(e.content);
                        t.removeClass("loading"), t.addClass("loaded"), t.find(".jkit-ajax-flag").html(n), k(), jQuery(window).trigger("resize")
                    }(n)
                },
                j = function() {
                    g();
                    const t = function(t) {
                        const e = JSON.stringify(t);
                        for (let t = 0; t < s.length; t++)
                            if (e === s[t].param) return f(s[t].result)
                    }(l);
                    t ? p(t) : jQuery.ajax({
                        url: jkit_ajax_url,
                        type: "post",
                        dataType: "json",
                        data: l,
                        success: function(t) {
                            p(t),
                                function(t, e) {
                                    s.push({
                                        param: JSON.stringify(t),
                                        result: e
                                    })
                                }(l, t)
                        }
                    })
                },
                g = function() {
                    d = !0, e.addClass("loading"), t.addClass("loading"), "nextprev" === o ? t.find(".jkit-preloader-overlay").show() : ["loadmore", "scrollload"].includes(o) ? e.find("a").text(e.find("a").data("loading")) : t.find(".jkit-preloader-overlay").show()
                },
                k = function() {
                    d = !1, e.removeClass("loading"), "nextprev" === o ? t.find(".jkit-preloader-overlay").hide() : ["loadmore", "scrollload"].includes(o) ? e.find("a").text(e.find("a").data("load")) : t.find(".jkit-preloader-overlay").hide()
                };
            ["loadmore", "scrollload"].includes(o) && ("scrollload" === o && u(), e.find(".jkit-pagination-button.jkit-block-loadmore").on("click", (function(t) {
                t.preventDefault(), l.data.current_page = l.data.current_page + 1, d || e.hasClass("disabled") || j()
            }))), "nextprev" === o && (e.find(".jkit-pagination-button.jkit-block-nextprev .next").on("click", null, "next", c), e.find(".jkit-pagination-button.jkit-block-nextprev .prev").on("click", null, "prev", c)), "yes" === i && r.length && r.on("change", (function() {
                const t = "default" !== this.value ? this.value : l.data.default_sortby;
                l.data.attr.sort_by = t, j()
            }))
        }
    }
    jQuery(window).on("elementor/frontend/init", (() => {
        const t = t => {
            elementorFrontend.elementsHandler.addHandler(n, {
                $element: t
            })
        };
        elementorFrontend.hooks.addAction("frontend/element_ready/jkit_post_block.default", t), elementorFrontend.hooks.addAction("frontend/element_ready/jkit_post_list.default", t), elementorFrontend.hooks.addAction("frontend/element_ready/jkit_product_grid.default", t)
    }))
}]);