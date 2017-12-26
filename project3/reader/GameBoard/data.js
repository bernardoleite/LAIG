class data{
	constructor(player, mode, dif, p){
		this.player = player;
		this.p = p;
		this.jogadas = [];

		this.mode = mode;
		this.dif = dif;
		this.NewMove = 1;

		this.R = [[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]];

		this.NewCountingBoard = [[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]];

		this.NewIdentityBoard = [[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]];

		this.NewBool = 0;
		this.NEWLASTX = 0;
		this.NEWLASTY = 0;
	};

	changeData(R,NewCountingBoard,NewIdentityBoard,NewMove,NewBool,NEWLASTX,NEWLASTY) { 
	this.R = R;
	this.NewCountingBoard = NewCountingBoard;
	this.NewIdentityBoard = NewIdentityBoard;
	this.NewMove = NewMove;
	this.NewBool = NewBool;
	this.NEWLASTX = NEWLASTX;
	this.NEWLASTY = NEWLASTY;
	}

	addJogada(){
		this.jogadas.push(this);
	}

	requestToDo(x,y){

		//putPiece(LX,LY,LX2,LY2,Mode,Dif,B,C,I, X, Y, P, Jogador, Counter, Move,Bool,LASTX,LASTY)
		let response = 'putPiece(LX,LY,LX2,LY2,' + JSON.stringify(this.mode) + ',' + JSON.stringify(this.dif) + ',' + JSON.stringify(this.R) + ','
		 + JSON.stringify(this.NewCountingBoard) + ',' + JSON.stringify(this.NewIdentityBoard) + ',' + y + ',' + x + ',' + this.p + ',' + 
		 JSON.stringify(this.player) + ',0,' + JSON.stringify(this.NewMove) + ',' + JSON.stringify(this.NewBool) + ',' + JSON.stringify(this.NEWLASTX) + ',' + 
		 JSON.stringify(this.NEWLASTY) + ')';

		 response = response.replace(/"/g, '\''); 

		 console.log(response);

		 return response;
	}

	changeBool(NEWLASTX, NEWLASTY){
		this.newBool = -10;
		this.NEWLASTX = NEWLASTX;
		this.NEWLASTY = NEWLASTY;
	}
}
