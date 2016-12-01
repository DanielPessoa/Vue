'use strict';

var names = ['Conta de Luz', 'Conta de água', 'Conta de Telefone', 'Supermercado', 'Cartão de Crédito', 'Empréstimo', 'Gasolina'];

window.billPayCreateComponent = Vue.extend({
    template: '\n        <div class="container">\n            <div class="row">\n                <form class="col s12" name="form" @submit.prevent="submit">\n                <div class="row">\n                <div class="input-field col s4">\n                  <input class="validate" type="text" v-model="bill.value | numberFormat" >\n                  <label>Valor</label>                   \n                </div>\n                    <div class="input-field col s8">\n                      <input id="pay_day" type="text" class="validate">\n                      <label for="pay_day">Vencimento</label>\n                    </div>  \n                </div>\n                </div>\n                <div class="row">\n                   <div class="input-field col s6">\n                      <select v-model="bill.name">\n                        <option v-for="o in names" :value="o">{{ o }}</option>\n                      </select>\n                      <label>Nome:</label>\n                    </div>\n                </div>\n               <div class="row">\n                 <input id="test5" type="checkbox" v-model="bill.done"/>  \n                 <label for="test5" >Pago?</label>\n                </div>\n                    <button class="btn waves-effect waves-light" type="submit" >Enviar</button>    \n                </form>\n            </div>\n        </div>\n        \n',
    props: ['bill'],
    data: function data() {
        return {
            formType: 'insert',
            names: names,
            bill: new BillPay()
        };
    },
    created: function created() {

        $(document).ready(function () {
            $('select').material_select();
        });

        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.index);
        }
    },

    methods: {
        submit: function submit() {
            var _this = this;

            var data = this.bill.toJSON();
            if (this.formType == 'insert') {
                Bill.save({}, data).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            } else {
                Bill.update({ id: this.bill.id, data: data }).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            }
        },
        getDateDue: function getDateDue(date_due) {
            var dateDueObject = date_due;
            if (date_due instanceof Date) {
                dateDueObject = new date(dateString.split('/').reverse().join('-') + "T03:00:00");
            }
            return dateDueObject.toISOString().split('T')[0];
        },
        getBill: function getBill(id) {
            var _this2 = this;

            Bill.get({ id: id }).then(function (response) {
                _this2.bill = new BillPay(response.data);
            });
        }
    }
});