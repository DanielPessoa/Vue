'use strict';

window.billDashboardComponent = {
    component: billComponent,
    template: '\n    <style type="text/css">\n       \n        .green{\n            color:green;\n        }\n        .red{\n            color: red;\n        }\n        .gray{\n            color: gray;\n        }\n        .minha-classe{\n            background-color: burlywood;\n        }\n    </style>\n    <h1>{{ title }} </h1>\n    <h3 style="color: red" >Total de Contas a pagar: {{ pagamento | currency \'R$ \'| 2 }}</h3>\n    <h3 style="color: green">Total de Contas a Receber: {{ recebimento | currency \'R$ \'| 2 }}</h3>\n    <h3 style="color: blue">Total do caixa: {{  total | currency \' R$ \'| 2 }}</h3>\n    \n    <router-view></router-view>\n    \n    ',
    data: function data() {
        return {
            title: 'DashBoard',
            activedView: 0,
            totalPay: 0,
            totalReceive: 0
        };
    },
    computed: {
        pagamento: function pagamento() {

            var bills = this.$root.$children[0].billsPay;

            var pag = 0;

            for (var i in bills) {
                pag += bills[i].value;
            }
            return pag;
        },
        recebimento: function recebimento() {

            var bills = this.$root.$children[0].billsReceive;

            var receb = 0;

            for (var i in bills) {
                receb += bills[i].value;
            }
            return receb;
        },

        total: function total(pag, receb) {

            var bills = this.$root.$children[0].billsPay;

            var pag = 0;

            for (var i in bills) {
                pag += bills[i].value;
            }

            var bills = this.$root.$children[0].billsReceive;

            var receb = 0;

            for (var i in bills) {
                receb += bills[i].value;
            }

            return receb - pag;
        }

    }

};