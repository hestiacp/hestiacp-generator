$( document ).ready( function (){
    $(document).find('code').each( function (){
        $(this).click(copyToClipboard);
    });
    $(document).find('input').each( function (){
        $(this).change(changeString);
    });
    $(document).find('select').each( function (){
        $(this).change(changeString);
    })
    changeString();
});

function copyToClipboard(e){
    console.log(e);
    var range = document.createRange();
    range.selectNodeContents(this);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
    alert("script line has been copied to clipboard")
}

function changeString(){
    string = '';
    string += $('#web').val()+$('#php').val();
    if($('#mysql').is(":checked")){
         string += '--mysql yes ';
    }else{
        string += '--mysql no ';
    }
    if($('#postgresql').is(":checked")){
        string += '--postgresql yes ';
    }else{
        string += '--postgresql no ';
    }
    string +=  $('#ftp').val() + $('#mail').val();
    string += $('#firewall').val() + $('#quota').val();
    
    if($('#hostname').val()){
        string += '--hostname ' + $('#hostname').val();
    }
    if($('#email').val()){
        string += '--email ' + $('#email').val();
    }
    if($('#port').val()){
        string += '--port ' + $('#port').val();
    }
    if($('#password').val()){
        string += '--port ' + $('#port').val();
    }     
    string += $('#lang').val()+ ' ';
    if($('#api').is(":checked")){
        string += '--api yes ';
    }else{
        string += '--api no ';
    }
    if($('#hostname').val() && $('#email').val() && !$('#interactive').is(":checked")){
        string += '--interactive no ';
    }else{
        string += '--interactive yes ';
    }
    if($('#force').is(":checked")){
        string += '--force';
    }
    
    console.log(string);
    $('#string').html(string);
}