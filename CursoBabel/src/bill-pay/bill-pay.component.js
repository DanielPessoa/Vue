window.billPayComponent = {
    components: {
        'menu-component': billPayMenuComponent,
    },
    template: `
    <style type="text/css">
       
        .green{
            color:green;
        }
        .red{
            color: red;
        }
        .gray{
            color: gray;
        }
        .minha-classe{
            background-color: burlywood;
        }
    </style>
    <div class="section">
        <div class="container">
            <h1>{{ title }} </h1>
            <h3 :class="{'gray': status === false, 'green': status === 0, 'red': status > 0}">{{ status | statusGeneral }}</h3>
            <div class="row">
                <div class="col s5 offset-s7 z-depth-1">
                    <h3>{{ total | numberFormat }}</h3><i class="material-icons medium blue-text ">add_box</i>
                </div>
                <button class="btn-flat blue waves-effect waves-dark purple-text"> 
                    <i class="material-icons left">add_circle</i> Meu Botao
                </button>
                <a class="btn">
                  <i class="material-icons right">add_circle</i>  Minha Ancora
                </a>
                <button class="btn-floating btn-large "><i class="material-icons left">add</i> </button>
            </div>
            <div class="row">
                <div class="col s4">
                    <div class="card green darken-3">
                        <div class="card-content white-text">
                            <p class="card-title">Meu Titulo</p>
                            <p>Daniel Pessoa</p>
                        </div>
                        <div class="card-action">
                            <a href="#">Minha Ancora</a>
                        </div>        
                    </div>
                </div>
               <div class="col s4">
                 <div class="card-panel red darken-2">
                   <p class="white-text">Daniel PEssoa asfdasfdasfdasfdasfd sfd sfd sfd sfd sfd sfd 
                   sfd sfd sfd sfd sfd sfd sfd sfd sfd </p>
              </div>
            </div>
            <div class="col s4">
                    <div class="card">
                    <div class="card-image">
                        <img src="http://www.oceanotecnologia.com.br/content/themes/Counterpart/images/slide/1.jpg" />
                        <p class="card-title">Meu Titulo</p>
                    </div>
                        <div class="card-content">
                            <p class="card-title">Meu Titulo</p>
                            <p>Daniel Pessoa</p>
                        </div>
                        <div class="card-action">
                            <a href="#">Minha Ancora</a>
                        </div>        
                    </div>
                </div>
       </div>
    </div>
    <router-view></router-view>
    
    `,
    created() {
      this.updateStatus();
      this.updateTotal();
    },
    data(){
        return {
            title: 'Contas a pagar',
            status: false,
            total: 0
        };
    },
    methods: {
        calculateStatus (bills) {
            if (!bills.length > 0) {
                this.status = false;
            }
            let count = 0;
            for (let i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            this.status = count;
    },
        updateStatus() {
            Bill.query().then((response) => {
                this.calculateStatus(response.data);
        });
      },
      updateTotal() {
          Bill.total().then((response) => {
              this.total = response.data.total;
          });
      }
    },
    events:{
        'change-info'() {
            this.updateStatus();
            this.updateTotal();
        }
    }
};