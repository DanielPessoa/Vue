'use strict';

window.billReceiveCreateComponent = Vue.extend({
    template: '\n        <form v-on:submit.prevent="submit">\n            <div class="form-group">\n                <label>Vencimento</label>\n                <input v-model="bill.date_due" class="form-control">\n            </div>\n            <div class="form-group">\n                <label>Nome:</label>\n                <select v-model="bill.name">\n                    <option v-for="o in names" :value="o">{{ o }}</option>\n                </select>\n            </div>\n            <div class="form-group">\n                <label>Valor</label>\n                <input v-model="bill.value" class="form-control">\n            </div>\n\n            <button type="submit" class="btn btn-primary">Submit</button>\n        </form>\n',
    props: ['bill'],
    data: function data() {
        return {
            formType: 'insert',
            names: ['Conta de Luz', 'Conta de água', 'Conta de Telefone', 'Supermercado', 'Cartão de Crédito', 'Empréstimo', 'Gasolina'],
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            }
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.index);
        }
    },
    methods: {
        submit: function submit() {
            if (this.formType == 'insert') {
                var self = this;
                Bill.save({}, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-pay.list' });
                });
            } else {
                Bill.update({ id: this.bill.id }).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-pay.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var self = this;
            Bill.get({ id: id }).then(function (response) {
                self.bill = response.data;
            });
        }
    }

});