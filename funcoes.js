		// Aplica função dx/dt
		function funcao(t,x)
		{
			return eval(document.getElementById("dxdt").value);
		}
		
		// Realiza os calculos
		function implementa()
		{
			// Inicializa variaveis
			var h = eval(document.getElementById("h").value);
			var ti = eval(document.getElementById("ti").value);
			var tf = eval(document.getElementById("tf").value);
			var xi = eval(document.getElementById("xi").value);
			var xEuler = xi;
			var xHeun = xi;
			var x0 = xi;
			var ts = [];
			var Euler = [];
			var Heun = [];
			var tabela = "<p><table><tr>\n\
							<td style= text-align:center;'>t</td>\
							<td style='text-align:center;color:#000099'>xEuler</td>\
							<td style='text-align:center;color:#990000'>xHeun</td></tr>";

			for (var t=ti; t<=tf+h; t=t+h) 											//vericar ciclo não concluia sem tf+h...........
						{
				// Escreve tabela (aplicação tema 3 de SSW)
			
				tabela += "<tr><td>"+t.toFixed(3)+"</td>\
							   <td>"+xEuler.toFixed(8)+"</td>\
							   <td>"+xHeun.toFixed(8)+"</td></tr>";
			
				// pega pontos para exibir depois
				ts.push(t);
				Euler.push(xEuler);
				Heun.push(xHeun);
				
				// Calcula proximo pronto
				xEuler = xEuler + funcao(t,xEuler)*h;
				x0 = xHeun + funcao(t,xHeun)*h;
				xHeun = xHeun + (funcao(t,xHeun)+funcao(t+h,x0))/2*h;
			}
			tabela +="</table></p>";
			document.getElementById("tabela").innerHTML = tabela;

			// canvas (www.w3schools.com)
			var canvas = document.getElementById("canvas");
			var tela = canvas.getContext("2d");
			var sEuler = [];
			var sHeun = [];
			for (var i=0; i<Euler.length; i++) sEuler.push(Euler[i]); 
			for (var i=0; i<Heun.length; i++) sHeun.push(Heun[i]); 
			sEuler.sort(function(a,b){return a-b}); 
			sHeun.sort(function(a,b){return a-b});
			var min = Math.min(sEuler[0],sHeun[0]);
			var max = Math.max(sEuler[sEuler.length-1],sHeun[sHeun.length-1]);
			
			//corrige bug evitando ir a infinito
			if (max > 30*(tf-ti)) max = 30*(tf-ti); 
			if (min < -30*(tf-ti)) min = -30*(tf-ti);
			
			var escalaT = (canvas.width-20)/(tf-ti);
			var escalaX = (canvas.height-20)/(max-min);
			
			//limpa tela
			tela.clearRect(0,0,canvas.width,canvas.height);
			tela.lineCap="round";
			tela.lineJoin="round";
			
			// Desenha grid
			tela.font="10px Arial";
			tela.strokeStyle = "rgb(0,0,0)";
			tela.beginPath();
			tela.moveTo(20,20);
			tela.lineTo(20,canvas.height-20);
			tela.lineTo(canvas.width-20,canvas.height-20);
			tela.lineTo(canvas.width-20,20);
			tela.closePath();
			var gridT = (canvas.width-20)/8;
			for (var i=-ti*escalaT; i<=canvas.width; i+=gridT)
			{
				tela.moveTo(i+20,20);
				tela.lineTo(i+20,canvas.width-20);
				tela.fillText((i/escalaT+ti).toFixed(1),i+8,canvas.height-1);
			}
			var gridX = (canvas.height-20)/8;
			for (var i=-ti*escalaT; i<=canvas.height; i+=gridX)
			{
				tela.moveTo(20,canvas.height-i-20);
				tela.lineTo(canvas.width-20,canvas.height-i-20);
				tela.fillText((i/escalaX+min).toFixed(1),0,canvas.height-i-7);
			}
			tela.stroke();
			

			
			// grafico de Euler
			tela.strokeStyle = "rgb(0,0,255)";
			tela.fillText("Euler",20,10);
			tela.beginPath();
			tela.moveTo(110,5);
			tela.lineTo(60,5);
			tela.stroke();
			tela.beginPath();
			tela.moveTo(20,canvas.width-(xi-min)*escalaX-20);
			for (var i=0; i<ts.length; i++)
				tela.lineTo((ts[i]-ti)*escalaT+20,canvas.width-(Euler[i]-min)*escalaX-20);
			tela.stroke();
			
			// grafico de Heun
			tela.strokeStyle = "rgb(255,0,0)";
			tela.fillText("Heun",255,10);
			tela.beginPath();
			tela.moveTo(200,5);
			tela.lineTo(250,5);
			tela.stroke();
			tela.beginPath();
			tela.moveTo(20,canvas.width-(xi-min)*escalaX-20);
			for (var i=0; i<ts.length; i++)
				tela.lineTo((ts[i]-ti)*escalaT+20,canvas.width-(Heun[i]-min)*escalaX-20);
			tela.stroke();
		}

