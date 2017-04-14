define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dojo/_base/lang",

    "MobileFeatures/widget/plugins/spinner",
    "MobileFeatures/widget/plugins/dialog",
    "MobileFeatures/widget/plugins/transitions",
    "MobileFeatures/widget/plugins/classes",
    "MobileFeatures/widget/plugins/statusbar",
    "MobileFeatures/widget/plugins/customconnectionerror"

], function(declare, _WidgetBase, lang, spinner, dialog, transitions, classes, statusbar, customconnectionerror) {
    "use strict";

    return declare("MobileFeatures.widget.MobileFeatures", [
        _WidgetBase,
        spinner, dialog, transitions, classes, statusbar, customconnectionerror
    ], {

        _debuggingKey: "MobileFeatures_debugging",

        enableDebugging: false,

        _getDebugging: function () {
            logger.debug(this.id + "._getDebugging");
            var storage = window.localStorage;
            var val = storage.getItem(this._debuggingKey);
            if (val) {
                this.enableDebugging = true;
            } else {
                this.setDebugging(false);
            }
        },

        setDebugging: function (val) {
            var storage = window.localStorage;
            storage.setItem(this._debuggingKey, val);
            this.enableDebugging = val;
        },

        postCreate: function() {
            this.debug(this.id + ".postCreate");

            window.__MobileFeaturesWidget = this;
            this._getDebugging();

            this.spinnerEnabled && this._enableSpinner();
            this.dialogEnabled && this._enableDialog();
            this.transitionsEnabled && this._enableTransitions();
            this._enableClasses();
            this.statusbarEnabled && this._enableStatusbar();
            this.customConnectionErrorEnabled && this._enableCustomConnectionError();
        },

        uninitialize: function() {
            this.debug(this.id + ".uninitialize");

            this._disableClasses();
            this.spinnerEnabled && this._disableSpinner();
            this.transitionsEnabled && this._cleanupTransitions();
            this.customConnectionErrorEnabled && this._disableCustomConnectionError();
        },

        debug: function() {
            if (this.enableDebugging) {
                console.log.apply(console, arguments);
            } else {
                logger.debug.apply(this, arguments);
            }
        }
    });
});

require(["MobileFeatures/widget/MobileFeatures"]);
