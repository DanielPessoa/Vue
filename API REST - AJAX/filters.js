
Vue.filter('doneLabel', function (value) {
    if(value == 0){
        return "Não paga"
    }else{
        return "Paga"
    }

});

Vue.filter('statusGeneral', function (value) {
    if(value === false){
        return "Nenhuma Conta Cadastrada"
    }
    if (!value){
        return "Nenhuma conta a Pagar";
    }else{
        return "Existem: "+ value + " contas a serem pagas";
    }

});