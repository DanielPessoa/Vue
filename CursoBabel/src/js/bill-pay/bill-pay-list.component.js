window.billPayListComponent = Vue.extend({
    components:{
        'modal' : window.modalComponent
    },
    template: `
        <div class="container">
        <div class="row">
            <h4>Minhas Contas</h4>
            <table class="bordered centered highlight responsive-table z-depth-4">
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
                        <td class="white-text" :class="{'green lighten-2' : o.done, 'red lighten-2': !o.done}">
                            {{ o.done | doneLabel }}
                        </td>
                        <td>
                            <a v-link="{ name: 'bill-pay.update', params: { id: o.id } }">Editar</a> |
                            <a href="#" @click.prevent="openModalDelete(bill)">Apagar</a>
                        </td>
                     </tr>
                    </tbody>
                </table>
            </div>
       </div>
      <modal :modal="modal">
          <div slot="content">
            <h4>Mensagem de confirmação</h4>
            <p><strong>Deseja excluir esta conta?</strong></p>
          </div>
          <div slot="footer"> 
            <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="deleteBill()" >OK</button>
            <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>
          </div>
      </modal>
`,
    data() {
        return {
            bills: [],
            billToDelete: null,
            modal: {
                id: 'modal-delete'
            }
        }
    },
    created() {
        Bill.query().then((response) => {
            this.bills = response.data;
        });
    },
    methods: {
        deleteBill() {
            let confirma = confirm("Deseja deletar essa conta?");
            if (confirma) {
                let self = this;
                Bill.delete({id: this.billToDelete.id}).then((response) => {
                    self.bills.$remove(this.billToDelete.id);
                    this.billToDelete = null;
                    // Materialize.toast('Conta Excluida com sucesso!', 4000);
                    self.$dispatch('change-info');
                });

            }
        },


    },


});
