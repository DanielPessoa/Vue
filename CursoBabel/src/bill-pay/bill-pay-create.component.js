const names = [
    'Conta de Luz',
    'Conta de água',
    'Conta de Telefone',
    'Supermercado',
    'Cartão de Crédito',
    'Empréstimo',
    'Gasolina'
];

window.billPayCreateComponent = Vue.extend({
    template: `
        <form v-on:submit.prevent="submit">
            <div class="form-group">
                <label>Vencimento</label>
                <input v-model="bill.date_due | dateFormat" class="form-control">
            </div>
            <div class="form-group">
                <label>Nome:</label>
                <select v-model="bill.name">
                    <option v-for="o in names" :value="o">{{ o }}</option>
                </select>
            </div>
            <div class="form-group">
                <label>Valor</label>
                <input v-model="bill.value | numberFormat" class="form-control">
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
`,
   props: ['bill'],
    data(){
        return {
            formType: 'insert',
            names: names ,
            bill: new BillPay(),
        };
    },
    created() {
        if (this.$route.name == 'bill-pay.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.index);
        }

    },
    methods: {
        submit() {
            let data = this.bill.toJSON();
            if (this.formType == 'insert') {
                Bill.save({}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({ name: 'bill-pay.list' });
                });
            }else{
                Bill.update({id: this.bill.id, data}).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                });
                }
            },
        getDateDue(date_due){
            let dateDueObject = date_due;
            if((date_due instanceof Date)){
                dateDueObject = new date(dateString.split('/').reverse().join('-')+"T03:00:00");
            }
            return dateDueObject.toISOString().split('T')[0]
        },
        getBill(id) {
            Bill.get({id: id}).then((response) => {
                this.bill = new BillPay(response.data);
            });

       }
    }
});
