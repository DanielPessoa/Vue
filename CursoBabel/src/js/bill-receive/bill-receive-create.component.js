window.billReceiveCreateComponent = Vue.extend({
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
        if (this.$route.name == 'bill-pay.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.index);
        }

    },
    methods: {
        submit: function () {
            if (this.formType == 'insert') {
                var self = this;
                Bill.save({}, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-pay.list' });
                });
            }else{
                Bill.update({id: this.bill.id}).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-pay.list'});
                });
            }
        },
        getBill: function (id) {
            var self = this;
            Bill.get({id: id}).then(function (response) {
                self.bill = response.data;
            });

        }
    }


});
