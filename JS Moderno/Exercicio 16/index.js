const dayjs = require('dayjs');

// Pegar a data de nascimento do usuário
// Mostrar a idade
// Proximo aniversário
// Dias até o próximo aniversário

function birthDay (date) {
    const birthDay = dayjs(date);
    const today = dayjs();

    const age = today.diff(birthDay, 'year');
    const nextBirthday = (birthDay.add(age + 1 , 'year'));

    const daysUntil = nextBirthday.diff(today, 'day') + 1;

    
    console.log(`Você tem ${age} anos.`);
    console.log(`Seu proximo aniversario será ${nextBirthday.format('DD/MM/YYYY')}`);
    console.log(`Faltam ${daysUntil} dias até o seu proximo aniversario.`)
}

birthDay('2001-07-23');

