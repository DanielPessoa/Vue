"use strict";

window.billReceiveMenuComponent = {
    template: "\n    <nav>\n        <ul v-for=\"o in menus\">\n            <li><a v-link=\"{name: o.routeName}\">{{ o.name }}</a></li>\n        </ul>\n    </nav>\n",
    data: function data() {
        return {
            menus: [
            // {id: 0, name: "Listar contas", url: '/bills'},
            // {id: 1, name: "Criar Contas", url: '/bill/create'}
            { id: 0, name: "Listar contas", routeName: 'bill-receive.list' }, { id: 1, name: "Criar Contas", routeName: 'bill-receive.create' }]
        };
    }

};