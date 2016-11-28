window.billPayListComponent = Vue.extend({
    template: `
        <style>
        .pago{
            color: green;
        }
        .nao-pago{
            color: red;
        }
        </style>
        <table class="table table-condensed table-hover">
            <thead>
            <tr>
                <th>Vencimento</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Paga?</th>
                <th>Ações</th>
                <th>Pagar Conta</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(index,o) in bills">
                <td>{{ o.date_due }}</td>
                <td>{{ o.name }}</td>
                <td>{{ o.value | currency 'R$ ' 2}}</td>
                <td class="minha-classe" :class="{'pago' : o.done, 'nao-pago': !o.done}">
                    {{ o.done | doneLabel }}
                </td>
                <td>
                    <a v-link="{ name: 'bill-pay.update', params: { id: o.id } }">Editar</a> |
                    <a href="#" @click.prevent="deleteBill(o)">Apagar</a>
                </td>
                <td>
                    <button class="btn btn-success"> <a  @click.prevent="pagarConta(o)">Conta Paga</a></button>
                    <button class="btn btn-danger"><a @click.prevent="contaNaoPaga(o)">Conta Não Paga</a></button>
                </td>
            </tr>
            </tbody>
        </table>
`,
    data: function () {
        return { bills: []
        };
    },
    created: function () {
        var self = this;
        Bill.query().then(function (response) {
            self.bills = response.data;
        });
    },
    methods: {

        deleteBill: function (bill) {
            var confirma = confirm("Deseja deletar essa conta?");
            if (confirma) {
                var self = this;
                Bills.delete({id: bill.id}).then(function (response) {
                    self.bills.$remove(bill);
                    self.$dispatch('change-info');
                });
                // var index = this.bills.indexOf(bill);
                // this.bills.splice(index, 1);
            }
        },
        pagarConta: function (bill) {
            this.$parent.bill = bill;
            this.$parent.bill.done = 1;

        },
        contaNaoPaga: function (bill) {
            this.$parent.bill = bill;
            this.$parent.bill.done = 0;

        },

    },



});
