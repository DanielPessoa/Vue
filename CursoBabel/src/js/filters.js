Vue.filter('doneLabel',(value)=> value == 0 ? "Não Paga": "Paga");


Vue.filter('statusGeneral',(value) => {
    if(value === false){
        return "Nenhuma Conta Cadastrada"
    }
    if (!value){
        return "Nenhuma conta a Pagar";
    }else{
        return value + " contas a pagar";
    };

});

Vue.filter('numberFormat', {
    read(value){
        let number = 0;
        if(value && typeof value !== undefined){
            let numberRegex =value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
            number = numberRegex ? numberRegex[0] : numberRegex;
        }
        return new Intl.NumberFormat('pt-BR', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        } ).format(number);
    },
    write(value){
        let number = 0;
        if(value.length > 0){
            number = value.replace(/[^\d\,]/g, '')
                .replace(/\,/g, '.');
            number = isNaN(number) ? 0 : parseFloat(number);

        }
        return number;
    }
});

Vue.filter('dateFormat', {
    read(value){
       if(value && typeof  value !== undefined){
           if(!(value instanceof Date)){
               let dateRegex =  value.match(/\d{4}\-\d{2}\-\d{2}/g);
               let  dateString = dateRegex ? dateRegex[0] : dateRegex;
               if(dateString){
                   value = new Data(dateString+"T03:00:00");
               }else{
                   return value;
               }
           }
           return new Intl.DateTimeFormat('pt-BR').format(value).split(' ')[0];
       }
       return value;
    },
    write(value){
        let dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);
        if(dateRegex){
            let dateString = dateRegex[0];
            let date = new date(dateString.split('/').reverse().join('-')+"T03:00:00");
            if(!isNaN(date.getTime())){
                return date;
            }
        }
        return value;

    }
});

Vue.filter('nameFormat',{
    read(value){
        if(value && typeof value !== undefined){
            let name = value.toUpperCase()
            return name;
        }
        return value
    },
    write(value){

    }
})