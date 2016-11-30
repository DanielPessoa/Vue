"use strict";

window.billPayListComponent = Vue.extend({
    template: "\n        <style>\n        .pago{\n            color: green;\n        }\n        .nao-pago{\n            color: red;\n        }\n        </style>\n        <table class=\"table table-condensed table-hover\">\n            <thead>\n            <tr>\n                <th>Vencimento</th>\n                <th>Nome</th>\n                <th>Valor</th>\n                <th>Paga?</th>\n                <th>A\xE7\xF5es</th>\n                <th>Pagar Conta</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr v-for=\"(index,o) in bills\">\n                <td>{{ o.date_due }}</td>\n                <td>{{ o.name }}</td>\n                <td>{{ o.value | numberFormat }}</td>\n                <td class=\"minha-classe\" :class=\"{'pago' : o.done, 'nao-pago': !o.done}\">\n                    {{ o.done | doneLabel }}\n                </td>\n                <td>\n                    <a v-link=\"{ name: 'bill-pay.update', params: { id: o.id } }\">Editar</a> |\n                    <a href=\"#\" @click.prevent=\"deleteBill(o)\">Apagar</a>\n                </td>\n                <td>\n                    <button class=\"btn btn-success\"> <a  @click.prevent=\"pagarConta(o)\">Conta Paga</a></button>\n                    <button class=\"btn btn-danger\"><a @click.prevent=\"contaNaoPaga(o)\">Conta N\xE3o Paga</a></button>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n",
    data: function data() {
        return { bills: []
        };
    },
    created: function created() {
        var _this = this;

        Bill.query().then(function (response) {
            _this.bills = response.data;
        });
    },

    methods: {
        deleteBill: function deleteBill(bill) {
            var _this2 = this;

            var confirma = confirm("Deseja deletar essa conta?");
            if (confirma) {
                (function () {
                    var self = _this2;
                    Bills.delete({ id: bill.id }).then(function (response) {
                        self.bills.$remove(bill);
                        self.$dispatch('change-info');
                    });
                    // var index = this.bills.indexOf(bill);
                    // this.bills.splice(index, 1);
                })();
            }
        },
        pagarConta: function pagarConta(bill) {
            this.$parent.bill = bill;
            this.$parent.bill.done = 1;
        },
        contaNaoPaga: function contaNaoPaga(bill) {
            this.$parent.bill = bill;
            this.$parent.bill.done = 0;
        }
    }

});