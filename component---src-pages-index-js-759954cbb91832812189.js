"use strict";(self.webpackChunkjigsaw=self.webpackChunkjigsaw||[]).push([[678],{480:function(e,t,a){a.r(t),a.d(t,{default:function(){return I}});var n=a(7),r=a(785),i=a.p+"static/puzzle1-a46839a5d4bea7074b7bba225c562ee5.jpg",s=a.p+"static/puzzle2-da26a02516d5c8ee76958278a27123ef.jpg",o=a.p+"static/puzzle3-f96c9606474d8a4e404622cfb062b745.jpg",c=a.p+"static/puzzle4-a371a587f8dae460bb311ff439cf5402.jpg",l=a.p+"static/puzzle5-dc9d9cb5cdcd46bef07a89140c10d806.jpg",d=a.p+"static/puzzle6-a399fa941819e3e9124e240cc585f42d.jpg",u=[60,80],f=["up","down","left","right"],m=[i,s,o,c,l,d][h(0,5)];function h(e,t){return e+Math.floor(Math.random()*(t-e+1))}var g=function(){function e(){this.startNewGame()}e.getNewBoard=function(){return Array(9).fill(0).map((function(e,t){return[Math.floor(t/3),t%3]}))},e.getInstance=function(){return e.instance||(e.instance=new e),e.instance};var t=e.prototype;return t.isSolved=function(){for(var t=0;t<9;t++)if(this.board[t][0]!==e.solvedBoard[t][0]||this.board[t][1]!==e.solvedBoard[t][1])return!1;return!0},t.startNewGame=function(){this.moves=0,this.board=e.getNewBoard(),this.stack=[],this.shuffle()},t.shuffle=function(){this.shuffling=!0;for(var e=h.apply(void 0,u);e-- >0;)this.moveInDirection(f[h(0,3)]);this.shuffling=!1},t.canMoveTile=function(e){if(e<0||e>=9)return!1;var t=this.board[e],a=this.board[8];return t[0]===a[0]?1===Math.abs(t[1]-a[1]):t[1]===a[1]&&1===Math.abs(t[0]-a[0])},t.moveTile=function(e){if(!this.shuffling&&this.isSolved())return!1;if(!this.canMoveTile(e))return!1;var t=(0,r.Z)(this.board[8]),a=(0,r.Z)(this.board[e]),n=(0,r.Z)(this.board);return n[8]=a,n[e]=t,this.shuffling||this.stack.push(this.board),this.board=n,this.shuffling||(this.moves+=1),!0},t.undo=function(){if(0===this.stack.length)return!1;this.board=this.stack.pop()},t.moveInDirection=function(e){for(var t=this.board[8],a="up"===e?[t[0]+1,t[1]]:"down"===e?[t[0]-1,t[1]]:"left"===e?[t[0],t[1]+1]:"right"===e?[t[0],t[1]-1]:t,n=8,r=0;r<9;r++)if(this.board[r][0]===a[0]&&this.board[r][1]===a[1]){n=r;break}this.moveTile(n)},t.getState=function(){var e=this;return{board:e.board,moves:e.moves,solved:e.isSolved()}},e}();function v(e){var t=e.index,a=e.pos,r=e.onClick,i=100*a[0]+5,s=100*a[1]+5,o=t%3*100+5,c=100*Math.floor(t/3)+5;return n.createElement("button",{"aria-label":"move-tile",className:"tile",onClick:r,style:{top:i,left:s,background:"url("+m+")",backgroundPosition:"-"+o+"px -"+c+"px"}})}function p(){var e,t,a,r,i=(e=g.getInstance(),t=n.useState(e.getState()),a=t[0],r=t[1],[a.board,a.moves,a.solved,function(){e.startNewGame(),r(e.getState())},function(){e.undo(),r(e.getState())},function(t){return function(){e.moveTile(t),r(e.getState())}}]),s=i[0],o=i[1],c=i[2],l=i[3],d=i[4],u=i[5];return n.createElement("div",{className:"grid grid-cols-1 md:grid-cols-2"},n.createElement("div",{className:"grid grid-cols-1"},n.createElement("div",{className:"grid grid-cols-2"},n.createElement("p",{className:"text-xl self-center"},"Move count: ",o),n.createElement("button",{className:"game-mode",onClick:d},"UNDO")),n.createElement("div",{className:"grid grid-cols-1 justify-items-center"},n.createElement("div",{className:"relative board3x3"},s.slice(0,-1).map((function(e,t){return n.createElement(v,{index:t,pos:e,onClick:u(t)})}))),c&&n.createElement("button",{className:"game-mode",onClick:l},"Play Again?"))),n.createElement("div",{className:"grid grid-cols-1"},n.createElement("p",{className:"text-xl text-center self-center"},"Solution"),n.createElement("img",{className:"justify-self-center",src:m,alt:"",width:300,height:300})))}g.solvedBoard=g.getNewBoard(),g.instance=null;var b=a.p+"static/puzzle1-d41fe2cfa93f23b994258d2a75ec94c7.jpg",N=a.p+"static/puzzle2-00f2dc1b3d549921e7c4180d272b1f0c.jpg",E=a.p+"static/puzzle3-5d52972662b1e046429bc0356d594f94.jpg",k=a.p+"static/puzzle4-2144ffcdcc9cc330ac43fcd00d175788.jpg",x=a.p+"static/puzzle5-de781484c147fa7e465949620138f6d1.jpg",w=a.p+"static/puzzle6-9b4d017690f7aae08ed8565ce41f88c1.jpg",z=[60,80],S=["up","down","left","right"],j=[b,N,E,k,x,w][M(0,5)];function M(e,t){return e+Math.floor(Math.random()*(t-e+1))}var y=function(){function e(){this.startNewGame()}e.getNewBoard=function(){return Array(16).fill(0).map((function(e,t){return[Math.floor(t/4),t%4]}))},e.getInstance=function(){return e.instance||(e.instance=new e),e.instance};var t=e.prototype;return t.isSolved=function(){for(var t=0;t<16;t++)if(this.board[t][0]!==e.solvedBoard[t][0]||this.board[t][1]!==e.solvedBoard[t][1])return!1;return!0},t.startNewGame=function(){this.moves=0,this.board=e.getNewBoard(),this.stack=[],this.shuffle()},t.shuffle=function(){this.shuffling=!0;for(var e=M.apply(void 0,z);e-- >0;)this.moveInDirection(S[M(0,3)]);this.shuffling=!1},t.canMoveTile=function(e){if(e<0||e>=16)return!1;var t=this.board[e],a=this.board[15];return t[0]===a[0]?1===Math.abs(t[1]-a[1]):t[1]===a[1]&&1===Math.abs(t[0]-a[0])},t.moveTile=function(e){if(!this.shuffling&&this.isSolved())return!1;if(!this.canMoveTile(e))return!1;var t=(0,r.Z)(this.board[15]),a=(0,r.Z)(this.board[e]),n=(0,r.Z)(this.board);return n[15]=a,n[e]=t,this.shuffling||this.stack.push(this.board),this.board=n,this.shuffling||(this.moves+=1),!0},t.undo=function(){if(0===this.stack.length)return!1;this.board=this.stack.pop()},t.moveInDirection=function(e){for(var t=this.board[15],a="up"===e?[t[0]+1,t[1]]:"down"===e?[t[0]-1,t[1]]:"left"===e?[t[0],t[1]+1]:"right"===e?[t[0],t[1]-1]:t,n=15,r=0;r<16;r++)if(this.board[r][0]===a[0]&&this.board[r][1]===a[1]){n=r;break}this.moveTile(n)},t.getState=function(){var e=this;return{board:e.board,moves:e.moves,solved:e.isSolved()}},e}();function C(e){var t=e.index,a=e.pos,r=e.onClick,i=100*a[0]+5,s=100*a[1]+5,o=t%4*100+5,c=100*Math.floor(t/4)+5;return n.createElement("button",{"aria-label":"move-tile",className:"tile",onClick:r,style:{top:i,left:s,background:"url("+j+")",backgroundPosition:"-"+o+"px -"+c+"px"}})}function B(){var e,t,a,r,i=(e=y.getInstance(),t=n.useState(e.getState()),a=t[0],r=t[1],[a.board,a.moves,a.solved,function(){e.startNewGame(),r(e.getState())},function(){e.undo(),r(e.getState())},function(t){return function(){e.moveTile(t),r(e.getState())}}]),s=i[0],o=i[1],c=i[2],l=i[3],d=i[4],u=i[5];return n.createElement("div",{className:"grid grid-cols-1 md:grid-cols-2"},n.createElement("div",{className:"grid grid-cols-1"},n.createElement("div",{className:"grid grid-cols-2"},n.createElement("p",{className:"text-xl self-center"},"Move count: ",o),n.createElement("button",{className:"game-mode",onClick:d},"UNDO")),n.createElement("div",{className:"grid grid-cols-1 justify-items-center"},n.createElement("div",{className:"relative board4x4"},s.slice(0,-1).map((function(e,t){return n.createElement(C,{index:t,pos:e,onClick:u(t)})}))),c&&n.createElement("button",{className:"game-mode",onClick:l},"Play Again?"))),n.createElement("div",{className:"grid grid-cols-1"},n.createElement("p",{className:"text-xl text-center self-center"},"Solution"),n.createElement("img",{className:"justify-self-center",src:j,alt:"",width:400,height:400})))}y.solvedBoard=y.getNewBoard(),y.instance=null;var T=a(705);function I(){var e=n.useState(""),t=e[0],a=e[1];return n.createElement(n.Fragment,null,n.createElement(T.Z,{title:"Home"}),n.createElement("main",{className:"grid grid-cols-1"},t?n.createElement(n.Fragment,null,"3x3"===t?n.createElement(p,null):n.createElement(B,null)):n.createElement(n.Fragment,null,n.createElement("p",{className:"text-xl text-center"},"Choose a difficulty level..."),n.createElement("div",{className:"grid grid-cols-2"},n.createElement("button",{className:"game-mode",onClick:function(){return a("3x3")}},"3x3"),n.createElement("button",{className:"game-mode",onClick:function(){return a("4x4")}},"4x4")))))}}}]);
//# sourceMappingURL=component---src-pages-index-js-759954cbb91832812189.js.map