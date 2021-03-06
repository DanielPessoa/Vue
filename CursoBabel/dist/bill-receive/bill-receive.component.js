'use strict';

window.billReceiveComponent = {
    components: {
        'menu-component': billPayMenuComponent
    },
    template: '\n    <style type="text/css">\n       \n        .green{\n            color:green;\n        }\n        .red{\n            color: red;\n        }\n        .gray{\n            color: gray;\n        }\n        .minha-classe{\n            background-color: burlywood;\n        }\n    </style>\n    <h1>{{ title }} </h1>\n    <h3 :class="{\'gray\': status === false, \'green\': status === 0, \'red\': status > 0}">{{ status | statusGeneral }}</h3>\n    <h3>{{ total | currency \' R$\' }}</h3>\n    <menu-component></menu-component>\n    <router-view></router-view>\n    \n    ',
    created: function created() {
        this.updateStatus();
        this.updateTotal();
    },
    data: function data() {
        return {
            title: 'Contas a Receber',
            status: false,
            total: 0
        };
    },
    methods: {
        calculateStatus: function calculateStatus(bills) {
            if (!bills.length > 0) {
                this.status = false;
            }
            var count = 0;
            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus: function updateStatus() {
            var self = this;
            Bill.query().then(function (response) {
                self.calculateStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var self = this;
            Bill.total().then(function (response) {
                self.total = response.data.total;
            });
        }
    },
    events: {
        'change-info': function changeInfo() {
            this.updateStatus();
            this.updateTotal();
        }
    }

};