var Imgs,Start;
var n,nB,Wc;
var Wd,Hg;
var Mark,NmbO;
var Wins,WinC;
var Stats,End;

function Timer() {
	var i,Anmtn;
	
	Imgs = [];
	Imgs[1] = "O.gif";
	Imgs[2] = "X.gif";
	Imgs[3] = "Devil.gif";
	Imgs[4] = "Ghost.gif";
	Imgs[5] = "Bomb.gif";
	
	Anmtn = document.getElementById("Anmt");
	for (i=1; i<=5; i++)
	 Anmtn.innerHTML = Anmtn.innerHTML + "<td width=39 height=33 id=Img"+i+"> <img src="+Imgs[i]+" /> </td>";
	Start = setInterval(Timee,1500);
}

function Timee() {
	var i,temp;
	
	temp = Imgs[1];
	for (i=1; i<5; i++)
	 Imgs[i] = Imgs[i+1];
	Imgs[5] = temp;
	
	for (i=1; i<=5; i++)
	 document.getElementById("Img"+i).innerHTML = "<img src ="+Imgs[i]+" />";
}

function OO() {
	document.getElementById("Opts").style = "background-color:Red";
	document.getElementById("Optt").innerHTML = "O";
	if ( End != 1 )
	 document.getElementById("Msg").innerHTML = "";
	Stats = 1;
}

function XX() {
	document.getElementById("Opts").style = "background-color:Blue";
	document.getElementById("Optt").innerHTML = "X";
	if ( End != 1 )
	 document.getElementById("Msg").innerHTML = "";
	Stats = 2;
}

function HintA() {
	document.getElementById("Opts").style = "background-color:Green";
	document.getElementById("Optt").innerHTML = "HintA";
	if ( End != 1 )
	 document.getElementById("Msg").innerHTML = "";
	Stats = 3;
}

function Sbmt() {
	var Rslt;
    
	End = 0;
	Stats = 0;
	Wins = 0;
	WinC = 0;
	
	Wd = Number(document.getElementById("Wdth").value);
	Hg = Number(document.getElementById("Hght").value);
	Rslt = Wd+Hg;
	
	if ( Wd < 3 || Wd > 26 || Hg < 3 || Hg > 26 || isNaN(Rslt) ) {
	 document.getElementById("Opt").innerHTML = "Your input is wrong! (Min input = 3, Max input = 26)";
	 document.getElementById("Tbl").innerHTML = ""; 
	} else {
     n = Math.floor(Rslt / 6);
	 nB = 0;
	 if ( n > 4 )
	  nB = n - 4;
     Wc = n - 1;
	 
	 PrintSt();
	 PrintTab();
	}
}

function HntB() {
	var i,j,Cnt,Cell,Cntr;
	var bol = false;
	
	if ( End != 1 )
	 document.getElementById("Msg").innerHTML = "";
 
	if ( nB == 0 && End != 1 )
	 document.getElementById("Msg").innerHTML = "You cannot use HintB anymore!";
	else if ( nB != 0 ) {
	 nB = nB - 1;
	 Cnt = 0;
	 while ( bol == false ) {
	  Cell = 0;
	  Cntr = 0;
	  for (i=1; i<=Hg; i++) 
	   for (j=1; j<=Wd; j++) {
	    Cell = Cell + 1;
	    if ( Mark[i][j] == 0 ) {
	     Cntr = Cntr + 1;
	     var Rand = Math.floor(Math.random() * 2);
	     if ( Rand == 0 && Cnt < 2) {
		  Cnt = Cnt + 1;
	      Mark[i][j] = 1;
	      var Color = document.getElementById("Tds"+Cell);
		  Color.style = "background-color:Purple";
		  var Imge = document.getElementById("XorO"+Cell);
	      if ( NmbO[i][j] == 1 )
           Imge.src = "X.gif";
          else {
	       Imge.src = "O.gif";
		   WinC = WinC + 1;
		   document.getElementById("Found").innerHTML = WinC;
		   if ( WinC == Wins )
			Winn();
		  }
         }
	    }
	   }
	  
	  if ( Cnt == Cntr || Cnt == 2 )
	   bol = true; 
	 }
	}
	document.getElementById("HntB").innerHTML = nB;
}

function PrintSt() {
	var Opt;
	
	Opt = document.getElementById("Opt");
	Opt.innerHTML = "<br /><table width=150 border=1 style=background-color:Gray>"+
	"<tr style=background-color:Black><td colspan=2 align=center><b><font color=White>Status : </td></tr>"+
	"<tr><td rowspan=3 colspan=2> <table width=100% style=background-color:Black>"+
	"<tr><td><font color=Yellow><b>Wrong Chance(s)</td> <td><font color=Yellow><b id=WrgCh>"+Wc+"</td></tr>"+
	"<tr><td><font color=Green><b>HintA</td> <td><font color=Green><b id=HntA>"+n+"</td></tr>"+
	"<tr><td><font color=Purple><b>HintB</td> <td><font color=Purple><b id=HntB>"+nB+"</td></tr>"+
	"</table> </td></tr></table><br/ > "+
	
	"<img src=O.gif /> <b>: <font color=Red>O</font> <img src=X.gif /> : <font color=Blue>X<br />"+
	
	"<table width=135 border=1 style=background-color:black>" + 
	"<tr><td id=Opts align=center style=background-color:gray><b><font id=Optt color=white>NONE</td></tr></table>" +
	"<button id=OO onclick=OO()><font color=Red><b>O</button> <button id=XX onclick=XX()><font color=Blue><b>X</button>" +
	" <button id=HintA onclick=HintA()><font color=Green><b>HintA</button>";
	 
	if ( nB > 0 )
	  Opt.innerHTML = Opt.innerHTML + "<br /><button id=HintB onclick=HntB()><font color=purple><b>Use HintB</button>"; 
  
    Opt.innerHTML = Opt.innerHTML + "<div> <b id=Msg> </b> </div> <br />";
} 

function PrintTab() {
	var Tab,i,j,k,Cell,Check;
	
	Check = 0;
	Tab = document.getElementById("Tbl");
	Tab.innerHTML = "<table><tr><td valign=top><table id=Nmbr></table></td> <td><table id=Alfa></table></td></tr></table>";
	Tab = document.getElementById("Alfa");
	
	Tab.innerHTML = "<tr><td align=left> <table><tr id=Row></tr></table> </td></tr>";
	Tab = document.getElementById("Row");
	Tab.innerHTML = Tab.innerHTML + "<td align=center width=2></td>";
	
	for (i=1; i<=Wd; i++)
	 Tab.innerHTML = Tab.innerHTML + "<td align=center width=41> <b>&#"+(i+64)+"</td>";
    Tab.innerHTML = Tab.innerHTML + "<td><br /></td>";
	
	Tab = document.getElementById("Alfa");
	Tab.innerHTML = Tab.innerHTML + "<tr><td colspan="+(Wd+1)+" rowspan="+(Hg+1)+" align=left id=Tabs></td></tr>";
	
	Tab = document.getElementById("Nmbr");
	Tab.innerHTML = Tab.innerHTML + "<tr> <td height=25><br /></td> </tr>";
	for (i=1; i<=Hg; i++)
	 Tab.innerHTML = Tab.innerHTML + "<tr> <td valign=middle align=center height=38><b>"+i+"</td></tr>";
	
	Tab = document.getElementById("Tabs");
	Tab.innerHTML = "<table id=Tbls border=1 style=background-color:Brown></table>";
 
	NmbO = [];
    for (k=1; k<=Hg; k++)
     NmbO[k] = [];
	
	Mark = [];
    for (k=1; k<=Hg; k++)
     Mark[k] = [];
	
	Tab = document.getElementById("Tbls");
	
	while ( Check == 0 ) {
	 Tab.innerHTML = "";
	 Cell = 0;
	 Wins = 0;
	 for (i=1; i<=Hg; i++) {
	  Tab.innerHTML = Tab.innerHTML + "<tr id=Trs"+i+" style=background-color:Black>";
	  Tab = document.getElementById("Trs"+i);
	  for (j=1; j<=Wd+1; j++) {
	   if ( j > Wd )
		Hrzt(i,Tab);
	   else {
	    var Rand = Math.floor(Math.random() * 2);
	    if ( Rand == 0 ) {
		 Wins = Wins + 1;
	     if ( Check == 0 )
		  Check = 1;
	    } 
	   
	    NmbO[i][j] = Rand;
	    Mark[i][j] = 0;
	    Cell = Cell + 1;
	    Tab.innerHTML = Tab.innerHTML + "<td width=39 height=33 id=Tds"+Cell+" onclick=Choose("+Cell+","+
	    Rand+") align=center> <img id=XorO"+Cell+" src = Bomb.gif /> </td>";
	   }
	  }
	  Tab.innerHTML = Tab.innerHTML + "</tr>";
	  Tab = document.getElementById("Tbls");
	 }
	 Vrtc(Tab);
	}
}

function Hrzt(i,Tab) {
	var j,Cnt,Temp;

	Tab.innerHTML = Tab.innerHTML + "<td><font color=Orange><b id=HrzN"+i+"></b></td>";
	Temp = document.getElementById("HrzN"+i);
	Cnt = 0;
	for (j=1; j<=Wd; j++)
	 if ( NmbO[i][j] == 0 ) 
	  Cnt = Cnt + 1;
     else if ( Cnt > 0 ) {
	  Temp.innerHTML = Temp.innerHTML + " " + Cnt;
	  Cnt = 0;
	 }
	 
	if ( NmbO[i][Wd] == 0 )
	 Temp.innerHTML = Temp.innerHTML + " " + Cnt;
}

function Vrtc(Tab) {
	var i,j,Cnt,Temp;
	
	Tab.innerHTML = Tab.innerHTML + "<tr id=Trs style=background-color:Black>";
	Tab = document.getElementById("Trs");
	for (j=1; j<=Wd+1; j++) {
	 Cnt = 0;
	 if ( j > Wd ) {
	  Tab.innerHTML = Tab.innerHTML + "<td align=center valign=middle><b><font color=Violet id=VrtN"+j+"></font></td>";
	  Temp = document.getElementById("VrtN"+j);
	  Temp.color = "Yellow";
	  Temp.innerHTML = "<div id=Found>0</div>Over<br />"+Wins;
	 } else {
	  Tab.innerHTML = Tab.innerHTML + "<td align=center valign=top><b><font color=Violet id=VrtN"+j+"></font></td>";
	  Temp = document.getElementById("VrtN"+j);
	  
	  for (i=1; i<=Hg; i++)
	   if ( NmbO[i][j] == 0 )
	    Cnt = Cnt + 1;
       else if ( Cnt > 0 ) {
	    Temp.innerHTML = Temp.innerHTML + Cnt + "<br />";
	    Cnt = 0;
	   }
	 
	  if ( NmbO[Hg][j] == 0 )
	   Temp.innerHTML = Temp.innerHTML + Cnt; 
	 }
	}
	Tab.innerHTML = Tab.innerHTML + "</tr>";
}

function Choose(Cell,Rand) {
	var x,y;
	
	x = Math.floor(Cell / Wd);
	y = Cell - x * Wd;
	if ( y == 0 )
	 y = Wd;
    else
	 x = x + 1;
 
	var Imge = document.getElementById("XorO"+Cell);
	var Color = document.getElementById("Tds"+Cell);
	
    if ( Stats != 0 && Mark[x][y] == 0 && (Stats != 3 || n > 0) ) {
	 document.getElementById("Msg").innerHTML = "";
	 Mark[x][y] = 1;
	 if ( Stats == Rand+1 || Stats == 3 )
	  if ( Rand == 0 ) 
	   Imge.src = "O.gif";
	  else 
	   Imge.src = "X.gif";
	 else if ( Stats != 3 ) {
	  Imge.src = "Devil.gif";
	  if ( Wc > 0 )
	   Wc = Wc - 1;
      else
	   Lose();
      document.getElementById("WrgCh").innerHTML = Wc;
	 }
	 
	 if ( Stats == 3 ) {
	  Color.style = "background-color:Green";
	  n = n - 1;
	  document.getElementById("HntA").innerHTML = n;
	 } else
	  if ( Rand == 0 )
       Color.style = "background-color:Red"; 
	  else
	   Color.style = "background-color:Blue";
   
     if ( Rand == 0 ) {
	  WinC = WinC + 1;
	  document.getElementById("Found").innerHTML = WinC;
	  if ( WinC == Wins )
	   Winn(); 
	 }
	} else if ( Stats != 0 && Mark[x][y] == 0 )
	 document.getElementById("Msg").innerHTML = "You cannot use HintA anymore!";
}

function Winn() {
	var i,j,Cell;
	
	Cell = 0;
	for (i=1; i<=Hg; i++) 
	 for (j=1; j<=Wd; j++) {
	  Cell = Cell + 1;
	  if ( Mark[i][j] == 0 ) {
	   Mark[i][j] = 1;
	   var Color = document.getElementById("Tds"+Cell);
	   Color.style = "background-color:Blue";
	   var Imge = document.getElementById("XorO"+Cell);
	   Imge.src = "X.gif";
	  }
	 }
	 
	 End = 1;
	 document.getElementById("Msg").innerHTML = "<font size=5>You Win!!!";
}

function Lose() {
	var i,j,Cell;
	
	Cell = 0;
	for (i=1; i<=Hg; i++) 
	 for (j=1; j<=Wd; j++) {
	  Cell = Cell + 1;
	  if ( Mark[i][j] == 0 ) {
	   Mark[i][j] = 1;
       var Imge = document.getElementById("XorO"+Cell);
	   Imge.src = "Ghost.gif";
	   var Color = document.getElementById("Tds"+Cell);
	   if ( NmbO[i][j] == 0 )
        Color.style = "background-color:Red";
       else
	    Color.style = "background-color:Blue";
	  }
	 }
	 
	 End = 1;
	 document.getElementById("Msg").innerHTML = "<font size=5>You Lose!!!";
}