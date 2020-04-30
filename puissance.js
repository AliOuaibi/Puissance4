class P4 {
    constructor(selector){
        this.COL = $('#nb_y').val();
        this.LGN = $('#nb_x').val();
        this.selector = selector;
        this.player = 'red';
        this.scoreRed = 0;
        this.scoreYellow = 0;

        this.drawGame();
        this.ecoute();
        this.checkWin();
    }

    //affichage du jeu
    drawGame(){
        const $jeu = $(this.selector);
        // console.log(this.COL);
        // console.log(this.LGN);
        
        for(let lgn = 0; lgn < this.LGN; lgn++) {
            const $lgn = $('<div>').addClass('lgn');
            for(let col = 0; col < this.COL; col++){
                const $col = $('<div>').addClass('col empty').attr("data-col",col).attr("data-lgn", lgn);
                $lgn.append($col);
            }
            $jeu.append($lgn);
        }
    }

    ecoute(){
        const $jeu = $(this.selector);
        const that = this;
        //on cherche la derniere case libre
        function lastCase(col){
            const $cells = $(`.col[data-col='${col}']`);
            for(let i = $cells.length-1; i>=0; i--){
                const $cell = $($cells[i]);
                if($cell.hasClass('empty')){
                    return $cell;
                }
            }
            //console.log($cells);
            return null;
        }
        
        $jeu.on('mouseenter','.col.empty', function(){ 
            const $col = $(this).data('col');
            const $last = lastCase($col);
            
            //console.log($col);
            // console.log($last);
            if($last != null){
                $last.addClass(`p${that.player}`);
            }
        });

        $jeu.on('mouseleave','.col', function(){ 
            $('.col').removeClass(`p${that.player}`);
        });

        $jeu.on('click','.col.empty', function(){
            const col = $(this).data('col');
            
            const $last = lastCase(col);
            let son = new Audio('2781.mp3');
            son.play();
            $last.addClass(`${that.player}`).removeClass(`empty p${that.player}`).data('player', `${that.player}`);

            const winner = that.checkWin($last.data('lgn'), $last.data('col'));
            that.player = (that.player === 'red') ? 'yellow' : 'red';
            $('#enCours').text(`Au tour de ${that.player} de jouer !`);
            //console.log(that.player);
            let sonVictoire = new Audio('themask.mp3');
            let countRed = 0;
            let nbr = 0;
            if(winner){
                sonVictoire.play();
                alert(`les ${winner} ont gagner la partie`);
                $('#restart').css('visibility', 'visible');
                
                return;
            } 
            
            
        });     
    }

    checkWin(lgn, col){
        const that = this;

        function $getCell(i, j) {
            return $(`.col[data-lgn='${i}'][data-col='${j}']`);
        }

        function checkDirection(direction){
            let total = 0;
            let i = lgn + direction.i;
            let j = col + direction.j;
            let $next = $getCell(i, j);
            while( i >= 0 && i < that.LGN && j >= 0 && j < that.COL && $next.data('player') === that.player) {
                total++;
                i += direction.i;
                j += direction.j;
                $next = $getCell(i, j);
            }
            return total;
        }
        
        function checkWin(directionA, directionB){
            const total = 1 + checkDirection(directionA) + checkDirection(directionB);
            let nbr = 0;
            // let countRed = 0;
            // let countYellow = 0;
            // console.log("a",directionA);
            // console.log("b",directionB);
            
            let nul = that.COL*that.LGN;
            console.log(nul);
            if(total==nul){
                alert('Match nul');
            }
            
            if(total>=4){
                console.log(that.player);
                if(that.player == 'red') {
                    while(nbr<=7){
                        that.scoreRed++;
                        $('#scoreRed').text(`${that.scoreRed}`);
                        console.log(that.scoreRed);
                        break;
                    }
                }

                if(that.player == 'yellow') {
                    while(nbr<=7){
                        that.scoreYellow++;
                        $('#scoreYellow').text(`${that.scoreYellow}`);
                        console.log(that.scoreYellow);
                        break;
                    }
                    
                }
                return that.player;                
            }else{
                return null;
            }

        }
                function checkHori(){
                    return checkWin({i:0, j: -1}, {i:0, j: 1});
                }
        
                function checkVerti(){
                    return checkWin({i: -1, j:0}, {i: 1, j:0});
                }
        
                function checkDiag1(){
                    return checkWin({i: 1, j:1}, {i: -1, j:-1});
                }
        
                function checkDiag2(){
                    return checkWin({i: 1, j:-1}, {i: -1, j:1});
                }
                // function checkNul(){
                //     return checkWin({i: 0, j:0}, {i: 0, j:0});
                // }
        
                return checkHori() || checkVerti() || checkDiag1() || checkDiag2() ;
            }
            
}

    