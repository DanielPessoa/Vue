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
        <div class="container">
        <div class="row">
            <div class="col s6">
                Laravel com vue
            </div>
            <div class="col s6">
            Na Code Education
            </div>
        </div>
        <div class="row">
            <table>
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
                        <td>{{ o.date_due | dateFormat }}</td>
                        <td>{{ o.name }}</td>
                        <td>{{ o.value | numberFormat }}</td>
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
            </div>
       </div>
`,
    data() {
        return { bills: []
        };
    },
    created() {
        Bill.query().then((response) => {
            this.bills = response.data;
        });
    },
    methods: {

        deleteBill(bill) {
            let confirma = confirm("Deseja deletar essa conta?");
            if (confirma) {
                let self = this;
                Bills.delete({id: bill.id}).then((response) => {
                    self.bills.$remove(bill);
                    self.$dispatch('change-info');
                });
                // var index = this.bills.indexOf(bill);
                // this.bills.splice(index, 1);
            }
        },
        pagarConta(bill) {
            this.$parent.bill = bill;
            this.$parent.bill.done = 1;

        },
        contaNaoPaga(bill) {
            this.$parent.bill = bill;
            this.$parent.bill.done = 0;

        },

    },



});
