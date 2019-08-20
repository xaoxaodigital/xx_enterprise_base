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
        self.get_client().then(function(client) {
            self.client = client;

            var qs = {db: client.dbname};
            if (session.debug) {
                qs.debug = session.debug;
            }
            var u = $.param.querystring("https://apps.odoo.com/apps/modules/browse?author=Xao%20Xao%20Digital%20CO.", {});
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
                        db: session.db,
                        origin: session.origin,
                    })
                };
                w.postMessage({type:'action', action: act}, client.origin);
            });

            self.on('message:set_height', self, function(m) {
                this.$ifr.height(m.height);
            });

            self.on('message:blockUI', self, function() { framework.blockUI(); });
            self.on('message:unblockUI', self, function() { framework.unblockUI(); });
            self.on('message:warn', self, function(m) {self.do_warn(m.title, m.message, m.sticky); });

            self.$ifr.appendTo(self.$el).css(css).addClass('apps-client');

            def.resolve();
        }, function() {
            self.do_warn(_t('Odoo Apps will be available soon'), _t('Showing locally available modules'), true);
            return self._rpc({
                route: '/web/action/load',
                params: {action_id: self.failback_action_id},
            }).then(function(action) {
                return self.do_action(action);
            }).always(function () {
                def.reject();
            });
        });
        return def;
    }
});

core.action_registry.add("apps.xaoxao", XaoXaoApps);

return XaoXaoApps;

});
