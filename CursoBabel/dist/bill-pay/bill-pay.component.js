'use strict';

window.billPayComponent = {
    components: {
        'menu-component': billPayMenuComponent
    },
    template: '\n    <style type="text/css">\n       \n        .green{\n            color:green;\n        }\n        .red{\n            color: red;\n        }\n        .gray{\n            color: gray;\n        }\n        .minha-classe{\n            background-color: burlywood;\n        }\n    </style>\n    <div class="section">\n        <div class="container">\n            <h1>{{ title }} </h1>\n            <h3 :class="{\'gray\': status === false, \'green\': status === 0, \'red\': status > 0}">{{ status | statusGeneral }}</h3>\n            <div class="row">\n                <div class="col s5 offset-s7 z-depth-1">\n                    <h3>{{ total | numberFormat }}</h3><i class="material-icons medium blue-text ">add_box</i>\n                </div>\n                <button class="btn-flat blue waves-effect waves-dark purple-text"> \n                    <i class="material-icons left">add_circle</i> Meu Botao\n                </button>\n                <a class="btn">\n                  <i class="material-icons right">add_circle</i>  Minha Ancora\n                </a>\n                <button class="btn-floating btn-large "><i class="material-icons left">add</i> </button>\n            </div>\n            <div class="row">\n                <div class="col s4">\n                    <div class="card green darken-3">\n                        <div class="card-content white-text">\n                            <p class="card-title">Meu Titulo</p>\n                            <p>Daniel Pessoa</p>\n                        </div>\n                        <div class="card-action">\n                            <a href="#">Minha Ancora</a>\n                        </div>        \n                    </div>\n                </div>\n               <div class="col s4">\n                 <div class="card-panel red darken-2">\n                   <p class="white-text">Daniel PEssoa asfdasfdasfdasfdasfd sfd sfd sfd sfd sfd sfd \n                   sfd sfd sfd sfd sfd sfd sfd sfd sfd </p>\n              </div>\n            </div>\n            <div class="col s4">\n                    <div class="card">\n                    <div class="card-image">\n                        <img src="http://www.oceanotecnologia.com.br/content/themes/Counterpart/images/slide/1.jpg" />\n                        <p class="card-title">Meu Titulo</p>\n                    </div>\n                        <div class="card-content">\n                            <p class="card-title">Meu Titulo</p>\n                            <p>Daniel Pessoa</p>\n                        </div>\n                        <div class="card-action">\n                            <a href="#">Minha Ancora</a>\n                        </div>        \n                    </div>\n                </div>\n       </div>\n    </div>\n    <router-view></router-view>\n    \n    ',
    created: function created() {
        this.updateStatus();
        this.updateTotal();
    },
    data: function data() {
        return {
            title: 'Contas a pagar',
            status: false,
            total: 0
        };
    },

    methods: {
        calculateStatus: function calculateStatus(bills) {
            if (!bills.length > 0) {
                this.status = false;
            }
            var count = 0;
            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus: function updateStatus() {
            var _this = this;

            Bill.query().then(function (response) {
                _this.calculateStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var _this2 = this;

            Bill.total().then(function (response) {
                _this2.total = response.data.total;
            });
        }
    },
    events: {
        'change-info': function changeInfo() {
            this.updateStatus();
            this.updateTotal();
        }
    }
};