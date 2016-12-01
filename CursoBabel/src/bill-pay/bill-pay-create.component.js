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
        <div class="container">
            <div class="row">
                <form class="col s12" name="form" @submit.prevent="submit">
                <div class="row">
                <div class="input-field col s4">
                  <input class="validate" type="text" v-model="bill.value | numberFormat" >
                  <label>Valor</label>                   
                </div>
                    <div class="input-field col s8">
                      <input id="pay_day" type="text" class="validate">
                      <label for="pay_day">Vencimento</label>
                    </div>  
                </div>
                </div>
                <div class="row">
                   <div class="input-field col s6">
                      <select v-model="bill.name">
                        <option v-for="o in names" :value="o">{{ o }}</option>
                      </select>
                      <label>Nome:</label>
                    </div>
                </div>
               <div class="row">
                 <input id="test5" type="checkbox" v-model="bill.done"/>  
                 <label for="test5" >Pago?</label>
                </div>
                    <button class="btn waves-effect waves-light" type="submit" >Enviar</button>    
                </form>
            </div>
        </div>
        
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

        $(document).ready(function() {
            $('select').material_select();
        });

        if (this.$route.name == 'bill-pay.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.index);
        }

    },
    methods: {
        submit() {
            var data = this.bill.toJSON();
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
