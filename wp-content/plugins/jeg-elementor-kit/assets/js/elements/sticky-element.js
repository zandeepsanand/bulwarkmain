! function(e) {
    var t = {};

    function n(i) {
        if (t[i]) return t[i].exports;
        var o = t[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, i) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(i, o, function(t) {
                return e[t]
            }.bind(null, o));
        return i
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 0)
}([function(e, t) {
    class n extends elementorModules.frontend.handlers.Base {
        bindEvents() {
            this.$element.data("stickyTop", this.$element.offset().top), this.runSticky()
        }
        runSticky() {
            if (!this.$element.hasClass("jkit-sticky-element--enabled")) return;
            const e = jQuery,
                t = this.$element,
                n = t.data("settings"),
                i = t.hasClass("jkit-sticky-element-on--down") ? "down" : t.hasClass("jkit-sticky-element-on--up") ? "up" : "both",
                o = t.hasClass("jkit-sticky-position--fixed") ? "fixed" : "sticky";
            let s = t.data("stickyTop");
            "fixed" === o ? t.wrap('<div class="wrapper-sticky-fixed" style="height: ' + t.height() + 'px"></div>') : t.parent().hasClass("wrapper-sticky-fixed") && t.unwrap(), e(window).on("load resize scroll", t, (function() {
                const r = "down" === i ? e(this).scrollTop() : e(this).scrollTop() + e(this).height(),
                    l = "down" === i ? s : s + t.outerHeight(!0),
                    d = "fixed" === o ? t.parent().width() + "px" : "unset";
                t.hasClass("sticky-pinned") || (s = t.offset().top, void 0 !== n && (void 0 !== n.jkit_sticky_top_position && (s -= n.jkit_sticky_top_position.size), void 0 !== n.jkit_sticky_bottom_position && (s += n.jkit_sticky_bottom_position.size))), t.hasClass("elementor-column") || t.css("width", d), "down" === i && l < r || "up" === i && l > r || "both" === i && "sticky" === o ? (t.css("position", o), t.addClass("sticky-pinned")) : (t.css("position", "relative"), t.removeClass("sticky-pinned"))
            }))
        }
        onElementChange(e) {
            -1 !== ["jkit_sticky_section", "jkit_sticky_trigger", "jkit_sticky_position"].indexOf(e) && (jQuery(window).off("load resize scroll", this.$element), this.runSticky())
        }
    }
    jQuery(window).on("elementor/frontend/init", (() => {
        const e = e => {
            elementorFrontend.elementsHandler.addHandler(n, {
                $element: e
            })
        };
        elementorFrontend.hooks.addAction("frontend/element_ready/section", e), elementorFrontend.hooks.addAction("frontend/element_ready/column", e)
    }))
}]);