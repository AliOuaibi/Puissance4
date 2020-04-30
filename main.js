$('#game').ready(function(){
    const p4 = new P4('#game');

    $('#submit').on('click',function () {
        p4.drawGame();
    });

    $('#restart').on('click', function() {
        $('#game').empty();
        p4.drawGame();
        $('#restart').css('visibility', 'hidden');
    });
});