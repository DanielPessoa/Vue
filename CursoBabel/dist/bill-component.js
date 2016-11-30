"use strict";

window.billComponent = {
    template: "\n    <nav class=\"navbar navbar-default\">\n     <div class=\"container-fluid collapse navbar-collapse\">\n        <div class=\"navbar-header\"  v-for=\"o in menus\">\n            <ul class=\"nav nav-tabs navbar-nav\">\n                <a class=\"navbar-brand\" v-link=\"{name: o.routeName}\">{{ o.name }}</a>\n            </ul>\n        </div>\n     </div>\n    </nav>\n    <router-view></router-view>\n",
    data: function data() {
        return {
            menus: [{ name: "Home", routeName: 'dashboard' }, { name: "Contas a Pagar", routeName: 'bill-pay.list' }, { name: "Contas a Receber", routeName: 'bill-receive.list' }]
        };
    }
};