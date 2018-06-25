

$(document).ready(function () {
    
    $('.cpf').mask('000.000.000-00', { reverse: true , onComplete: (cpf) => {
        let field  = $('#register').val().length === 0 ? 'query' : 'register';
        let ajaxObject = makeAjaxObject(cleanCpf(cpf),field);
        
        $.ajax(ajaxObject).done(response => {
            if(field === 'query') {
                $('.cpf-title').text(cpf);
                if(response.status === "FREE") {
                    let text = "O CPF consultado não se encontra em nossa blacklist."; 
                    $('.query-result-explain').text(text);
                    $('.change-status').text('Inserir');
                    $('.change-status').removeClass('btn-success');
                    $('.change-status').addClass('btn-danger');
                    $('.date-added').text('');
                }
                else {
                    let dateAdded = new Date(response.dateAdded).toLocaleDateString('pt-BR')
                    let text = "O CPF consultado se encontra em nossa blacklist.";
                    $('.query-result-explain').text(text);
                    $('.change-status').text('Remover');
                    $('.change-status').removeClass('btn-danger');
                    $('.change-status').addClass('btn-success');
                    $('.date-added').text(`Desde ${dateAdded} na blacklist.`);
                }
                $('.query-result').removeClass('hidden');
            }
            else {
                toastr.success('CPF incluído com sucesso.');
            }
        }).fail(error => {
            $('#cpfHelp').text(error.responseJSON.message);
        })
        
    }})

    $('.change-status').click(() => {
        let cpf = cleanCpf($('.cpf-title').text());
        let status = $('.change-status').text() === 'Remover' ? 'BLOCK' : 'FREE';
        let putData = {cpf: cpf, status: status}
        $.ajax({url : '/cadastro', method: 'PUT', data: putData}).done(response => {
            toastr.success('CPF atualizado com sucesso.')
        }).fail(error => {
            toastr.error('Algum erro aconteceu, recarregue a página e tente novamente.')
        })
    })
    
    $('#register').focus(() => {
        $('#query').val('');
        $('#queryResult span').text('');
    })
    
    $('#query').focus(() => {
        $('#register').val('');
        $('#registerResult span').text('');
    })



});

function makeAjaxObject (cpf, field) {
    return field === 'query' ? 
    {
        url: `/consulta?cpf=${cpf}`
    } :
    {
        url: `cadastro`,
        method: 'POST',
        data: { cpf: cpf, status: 'BLOCK' }  
    } 
}

function cleanCpf (cpf) {
    return cpf.replace(/\./g, '').replace('-', '');
}