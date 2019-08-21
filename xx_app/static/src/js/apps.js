odoo.define('xx_app.Apps', function (require) {
"use strict";

var core = require('web.core');
var framework = require('web.framework');
var session = require('web.session');
var Apps = require('web.Apps');

var XaoXaoApps = Apps.extend({
    remote_action_tag: 'loempia.embed.xaoxao',

    start: function() {
        var self = this;
        var def = $.Deferred();
        var u = $.param.querystring("https://apps.odoo.com/apps/browse?repo_maintainer_id=208617", {});
            var height = $('.o_main .o_content').height();
            var css = {width: '100%', height: '750px'};
            self.$ifr = $('<iframe>').attr('src', u);

            self.uniq = _.uniqueId('apps');
            $(window).on("message." + self.uniq, self.proxy('_on_message'));

            self.on('message:ready', self, function(m) {
                var w = this.$ifr[0].contentWindow;
                var act = {
                    type: 'ir.actions.client',
                    tag: this.remote_action_tag,
                    params: _.extend({}, this.params, {
                        db: this.session.db,
                        origin: this.session.origin,
                    })
                };
                w.postMessage({type:'action', action: act}, client.origin);
            });

            self.on('message:set_height', self, function(m) {
                this.$ifr.height(m.height);
            });

            self.on('message:update_count', self, self._on_update_count);

            self.on('message:blockUI', self, function() { framework.blockUI(); });
            self.on('message:unblockUI', self, function() { framework.unblockUI(); });
            self.on('message:warn', self, function(m) {self.do_warn(m.title, m.message, m.sticky); });

            self.$ifr.appendTo(self.$el).css(css).addClass('apps-client');

            def.resolve();
        return def;
    },
});

core.action_registry.add("apps.xaoxao", XaoXaoApps);

return XaoXaoApps;

});
