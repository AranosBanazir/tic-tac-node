import inquirer from 'inquirer';
import color from 'colors';
import { checkPrimeSync } from 'crypto';

const players = {
    player1: {turn: true,  symbol: '', score: 0},
    player2: {turn: false, symbol: '', score: 0},
}

let availableChoices = [
    'Top Left',
    'Top Center',
    'Top Right',
    'Middle Left',
    'Middle Center',
    'Middle Right',
    'Bottom Left',
    'Bottom Center',
    'Bottom Right',

]

function init(){

    console.log('WELCOME TO TIC-TAC-NODE\n'.brightGreen)

    inquirer.prompt([
        {
            name: 'player1Symbol',
            prefix: '',
            type: 'input',
            validate: i => i.length !== 1 ? false : true,
            message: 'Player #1'.brightYellow +'\nPlease enter any single character \nyou would like to use for a symbol: '
        },
        {
            name: 'player2Symbol',
            prefix: '',
            type: 'input',
            validate: i => i.length !== 1 ? false : true,
            message: '\nPlayer #2'.brightRed + '\nPlease enter any single character \nyou would like to use for a symbol: '
        }
]).then(a=>{
    players.player1.symbol = a.player1Symbol
    players.player2.symbol = a.player2Symbol
    console.log('Let the game begin!!'.brightGreen)
    setTimeout(()=>{
        takeTurn()
    }, 2000)
})

}




let spaceValues = {
    
    ['Top Left'] : '',    
    ['Top Center'] : '',  
    ['Top Right'] : '',
    ['Middle Left'] : '', 
    ['Middle Center'] : '',    
    ['Middle Right'] : '',    
    ['Bottom Left'] : '',
    ['Bottom Center'] : '',   
    ['Bottom Right'] : '',    
}

let spaces = {


    ['Top Left']    : '   ',
    ['Top Center']  : '|   |',
    ['Top Right']   : '   ',

    ['Spacer'] : '---+---+---',

    ['Middle Left'] : '   ',
    ['Middle Center']    : '|   |',
    ['Middle Right']    : '   ',

    ['Bottom Left']: '   ',
    ['Bottom Center']   : '|   |',
    ['Bottom Right']    : '   ',


}

    function scoreBoard(){
        //both scores are double digits
        if (players.player1.score >= 10 && players.player2.score >= 10){
            return console.log(`+==============+\n|`.cyan +` Player 1`.brightYellow + `: ${players.player1.score.toString().brightGreen} `+`|\n|`.cyan +` Player 2`.brightRed+ `: ${players.player2.score.toString().brightGreen} `+`|\n+==============+`.cyan)
        //both P1 score is double digits
        }else if (players.player1.score >= 10 && players.player2.score < 10){
            return console.log(`+==============+\n|`.cyan +` Player 1`.brightYellow + `: ${players.player1.score.toString().brightGreen} `+`|\n|`.cyan +` Player 2`.brightRed+ `: `+ `0`.brightGreen + `${players.player2.score.toString().brightGreen}  `+`|\n+==============+`.cyan)
        }else if (players.player2.score >= 10 && players.player1.score < 10){
            return console.log(`+==============+\n|`.cyan +` Player 1`.brightYellow + `: `+ `0`.brightGreen + `${players.player1.score.toString().brightGreen} `+`|\n|`.cyan +` Player 2`.brightRed+`: ${players.player2.score.toString().brightGreen} `+`|\n+==============+`.cyan)
        }else{
            return console.log(`+==============+\n|`.cyan +` Player 1`.brightYellow + `: `+ `0`.brightGreen + `${players.player1.score.toString().brightGreen} `+`|\n|`.cyan +` Player 2`.brightRed+ `: `+ `0`.brightGreen + `${players.player2.score.toString().brightGreen} `+`|\n+==============+`.cyan)
        }
    }



function drawBoard(){
    console.clear()
    scoreBoard()

    console.log('\n')
    console.log(spaces['Top Left'] + spaces['Top Center'] + spaces['Top Right'])
    console.log(spaces['Spacer'])
    console.log(spaces['Middle Left'] + spaces['Middle Center'] + spaces['Middle Right'])
    console.log(spaces['Spacer'])
    console.log(spaces['Bottom Left'] + spaces['Bottom Center'] + spaces['Bottom Right'])
    

}

    function resetGame(){
    
         spaceValues = {
    
            ['Top Left'] : '',    
            ['Top Center'] : '',  
            ['Top Right'] : '',
            ['Middle Left'] : '', 
            ['Middle Center'] : '',    
            ['Middle Right'] : '',    
            ['Bottom Left'] : '',
            ['Bottom Center'] : '',   
            ['Bottom Right'] : '',    
        }

         spaces = {


            ['Top Left']    : '   ',
            ['Top Center']  : '|   |',
            ['Top Right']   : '   ',
        
            ['Spacer'] : '---+---+---',
        
            ['Middle Left'] : '   ',
            ['Middle Center']    : '|   |',
            ['Middle Right']    : '   ',
        
            ['Bottom Left']: '   ',
            ['Bottom Center']   : '|   |',
            ['Bottom Right']    : '   ',
        
        
        }
        
         availableChoices = [
            'Top Left',
            'Top Center',
            'Top Right',
            'Middle Left',
            'Middle Center',
            'Middle Right',
            'Bottom Left',
            'Bottom Center',
            'Bottom Right',
        
        ]
        console.log('wtf')

        players.player1.turn = true
        players.player2.turn = false
        takeTurn()
    }


 function resolveWin(player, winningspaces){
    drawBoard()
    const winningPlayer = player.split('player')
    
   const blink1 = setInterval(()=>{
       winningspaces.forEach(space =>{
            if (space.includes('Center')){
                if (player === 'player1'){
                    spaces[space] = `| ${players[player].symbol.bgBlack.brightYellow} |`
                }else{
                    spaces[space] = `| ${players[player].symbol.bgBlack.brightRed} |`  
                }
            }else{
                if (player === 'player1'){
                    spaces[space] = ` ${players[player].symbol.bgBlack.brightYellow} `
                }else{
                    spaces[space] = ` ${players[player].symbol.bgBlack.brightRed} `
                }
            }
       })
       
       drawBoard()
       console.log('Congratulations Player #'.brightGreen + winningPlayer[1].brightGreen)
    },700)

    const blink2 = setInterval(()=>{
        winningspaces.forEach(space =>{
            if (space.includes('Center')){
                if (player === 'player1'){
                    spaces[space] = `| ${players[player].symbol.bgCyan.brightYellow} |`
                }else{
                    spaces[space] = `| ${players[player].symbol.bgCyan.brightRed} |`  
                }
            }else{
                if (player === 'player1'){
                    spaces[space] = ` ${players[player].symbol.bgCyan.brightYellow} `
                }else{
                    spaces[space] = ` ${players[player].symbol.bgCyan.brightRed} `
                }
            }
       })
       drawBoard()
       console.log('Congratulations Player #'.brightGreen + winningPlayer[1].brightGreen)
     },1600)

    setTimeout(()=>{
        clearInterval(blink1)
        clearInterval(blink2)
        console.clear()
        
        if (player === 'player1'){
            
            players.player1.score++
        }else{
         
            players.player2.score++
        }
        scoreBoard()
        inquirer.prompt({
            name: 'playAgain',
            type: 'confirm',
            prefix: '',
            message: 'Play another game?'
        }).then((a)=>{
            if (a.playAgain){
                resetGame()
            }else{
                process.exit(0)
            }
        })
    }, 5000)
 }

 function resolveDraw(){
    console.clear()
    console.log('The Game Was a Draw!!!'.brightGreen)
    inquirer.prompt({
        name: 'playAgain',
        type: 'confirm',
        prefix: '',
        message: 'Play another game?'
    }).then((a)=>{
        if (a.playAgain){
            resetGame()
        }else{
            process.exit(0)
        }
    })
 }

 function resolveTurn(player){


    if (players.player1.turn){
        players.player2.turn = true
        players.player1.turn = false
    }else{
        players.player1.turn = true
        players.player2.turn = false
    }

    const v = spaceValues 
    //ways to win
    //All Center
    if (v['Bottom Center'] === players[player].symbol && v['Middle Center'] === players[player].symbol && v['Top Center'] === players[player].symbol){
        resolveWin(player, ['Bottom Center','Middle Center','Top Center'])
        return
    //All Bottom
    }else if (v['Bottom Center'] === players[player].symbol && v['Bottom Left'] === players[player].symbol && v['Bottom Right'] === players[player].symbol){
        resolveWin(player, ['Bottom Center','Bottom Left','Bottom Right'])
        return
    //Diag BL/TR
    }else if (v['Bottom Left'] === players[player].symbol && v['Middle Center'] === players[player].symbol && v['Top Right'] === players[player].symbol){
        resolveWin(player, ['Bottom Left','Middle Center','Top Right'])
        return
    //All Middle
    }else if (v['Middle Center'] === players[player].symbol && v['Middle Left'] === players[player].symbol && v['Middle Right'] === players[player].symbol){
        resolveWin(player, ['Middle Left','Middle Center','Middle Right'])
        return
    //All Top
    }else if (v['Top Center'] === players[player].symbol && v['Top Left'] === players[player].symbol && v['Top Right'] === players[player].symbol){
        resolveWin(player, ['Top Right','Top Left','Top Center'])
        return
    //All Left
    }else if (v['Bottom Left'] === players[player].symbol && v['Middle Left'] === players[player].symbol && v['Top Left']=== players[player].symbol){
        resolveWin(player, ['Bottom Left','Middle Left','Top Left'])
        return
    //All Right
    }else if (v['Middle Right'] === players[player].symbol && v['Bottom Right'] === players[player].symbol && v['Top Right'] === players[player].symbol){
        resolveWin(player, ['Bottom Right','Middle Right','Top Right'])
        return
    //Diag TL/BR
    }else if (v['Top Left'] === players[player].symbol && v['Middle Center'] === players[player].symbol && v['Bottom Right'] === players[player].symbol){
        resolveWin(player, ['Bottom Right','Middle Center','Top Left'])
        return
    }

    if (availableChoices.length == 0){
        resolveDraw()
        return
    }
   
    takeTurn()
 }

function takeTurn(){
    drawBoard()
    if (players.player1.turn){
        console.log(`\nPlayer #1 it\'s your turn!  "${players.player1.symbol}"`.brightYellow)
        inquirer.prompt({
            name: 'chosenSpace',
            type: 'list',
            message: 'Choose where you want to place your mark!',

            prefix: '',
            choices: availableChoices,
        }).then((a) =>{
            if (a.chosenSpace.includes('Center')){
                spaces[a.chosenSpace] = `| ${players.player1.symbol.brightYellow} |`
            }else{
                spaces[a.chosenSpace] = ` ${players.player1.symbol.brightYellow} `
            }
            spaceValues[a.chosenSpace] = `${players.player1.symbol}`
            availableChoices.splice(availableChoices.indexOf(a.chosenSpace), 1)
            resolveTurn('player1')
        })
    }else if (players.player2.turn){
        console.log(`\nPlayer #2 it\'s your turn!  "${players.player2.symbol}"`.brightRed)
        inquirer.prompt({
            name: 'chosenSpace',
            type: 'list',
            prefix: '',
            message: 'Choose where you want to place your mark!',
            choices: availableChoices,
        }).then((a) =>{
            if (a.chosenSpace.includes('Center')){
                spaces[a.chosenSpace] = `| ${players.player2.symbol.brightRed} |`
            }else{
                
                spaces[a.chosenSpace] = ` ${players.player2.symbol.brightRed} `
            }
            spaceValues[a.chosenSpace] = `${players.player2.symbol}`
            availableChoices.splice(availableChoices.indexOf(a.chosenSpace), 1)
            resolveTurn('player2')
        })
    }

    
}

init()