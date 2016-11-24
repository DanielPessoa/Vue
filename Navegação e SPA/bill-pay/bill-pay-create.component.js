window.billPayCreateComponent = Vue.extend({
    template: `
        <form v-on:submit.prevent="submit">
            <div class="form-group">
                <label>Vencimento</label>
                <input v-model="bill.date_due" class="form-control">
            </div>
            <div class="form-group">
                <label>Nome:</label>
                <select v-model="bill.name">
                    <option v-for="o in names" :value="o">{{ o }}</option>
                </select>
            </div>
            <div class="form-group">
                <label>Valor</label>
                <input v-model="bill.value" class="form-control">
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
`,
    props: ['bill'],
    data: function () {
        return {
            formType: 'insert',
            names: [
                'Conta de Luz',
                'Conta de água',
                'Conta de Telefone',
                'Supermercado',
                'Cartão de Crédito',
                'Empréstimo',
                'Gasolina'
            ],
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: 0,
            },
        };
    },
    created: function () {
        if (this.$route.name == 'bill.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.index);
        }

    },
    methods: {
        submit: function () {
            if (this.formType == 'insert') {
                this.$root.$children[0].billsPay.push(this.bill);
            }
            // bill da listagem do bill do formulário
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false,
            };
            this.$router.go({
                name: 'bill-pay.list'
            });
        },
        getBill: function (index) {
            var bills = this.$root.$children[0].billsPay;
            this.bill = bills[index];
        }
    },
    events:{

        'change-bill': function (bill) {
            this.bill = bill;
        },
    }


});
