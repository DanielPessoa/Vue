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
            <h2>Nova Conta</h2>
                <form class="col s12" name="form" @submit.prevent="submit">
                <div class="row">
                    <div class="input-field col s6">
                      <input id="pay_day" type="text" class="validate" placeholder="Informe a data">
                      <label for="pay_day" class="active">Vencimento</label>
                    </div> 
                  <div class="input-field col s6">
                      <input class="validate" type="text" v-model="bill.value | numberFormat" >
                      <label class="active">Valor</label>                   
                  </div>
                </div>
            </div>
                <div class="row">
                <div class="input-field col s6">
                <label class="active">Nome:</label>
                   <select id="name" v-model="bill.name" class="browser-default">
                      <option value="" disabled selected>Escolha um nome</option>
                      <option v-for="o in names" :value="o">{{ o }}</option>
                   </select>
                   </div>
                   <div class="input-field col s6">
                       <input class="filled-in" id="pago" type="checkbox" v-model="bill.done"/>  
                       <label for="pago" >Pago?</label>
                   </div>
                </div>
               <div class="row">
               <div class="input-field col s12">
                 <input type="submit" class="btn btn-large waves-effect waves-light right" value="Enviar"/>
               </div>
              </div>      
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
            $('#name').material_select();
            $('#indeterminate').prop('indeterminate', true);
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
