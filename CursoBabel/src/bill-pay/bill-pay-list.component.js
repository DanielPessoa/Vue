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
            <table class="bordered centered highlight responsive-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Vencimento</th>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Paga?</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(index,o) in bills">
                        <td>{{ index + 1}}</td>
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
                Bill.delete({id: bill.id}).then((response) => {
                    self.bills.$remove(bill);
                    self.$dispatch('change-info');
                });
                // var index = this.bills.indexOf(bill);
                // this.bills.splice(index, 1);
            }
        },

    },



});
