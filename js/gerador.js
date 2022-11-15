window.onload = function () 
{
  function Graph(config) 
  {
    //X, -X, Y e -Y, definidos pelo usuario
    this.canvas = document.getElementById(config.canvasId);
    this.minX = config.minX;
    this.minY = config.minY;
    this.maxX = config.maxX;
    this.maxY = config.maxY;
    this.unitsPerTick = config.unitsPerTick;

    //Cor e tamanho da fonte dos números
    this.axisColor = '#aaa';
    this.font = '8pt Calibri';
    this.tickSize = 15;
    

    //Determinando o centro do plano
    this.context = this.canvas.getContext('2d');
    this.rangeX = this.maxX - this.minX;
    this.rangeY = this.maxY - this.minY;
    this.unitX = this.canvas.width / this.rangeX;
    this.unitY = this.canvas.height / this.rangeY;
    this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * this.canvas.height);
    this.centerX = Math.round(Math.abs(this.minX / this.rangeX) * this.canvas.width);
    this.iteration = (this.maxX - this.minX) / 1000;
    this.scaleX = this.canvas.width / this.rangeX;
    this.scaleY = this.canvas.height / this.rangeY;

    //Desenhar o eixo X e Y
    this.drawXAxis();
    this.drawYAxis();
  }

  Graph.prototype.drawXAxis = function() 
  {
    var context = this.context;
    context.save();
    context.beginPath();
    context.moveTo(0, this.centerY);
    context.lineTo(this.canvas.width, this.centerY);
    context.strokeStyle = this.axisColor;
    context.lineWidth = 2;
    context.stroke();
    

    //Desenha as marcas de cada numero do eixo X
    var xPosIncrement = this.unitsPerTick * this.unitX;
    var xPos, unit;
    context.font = this.font;
    context.textAlign = 'center';
    context.textBaseline = 'top';

    //Desenha as marcas da esquerda
    xPos = this.centerX - xPosIncrement;
    unit = -1 * this.unitsPerTick;
    while (xPos > 0) 
    {
      context.moveTo(xPos, this.centerY - this.tickSize / 2);
      context.lineTo(xPos, this.centerY + this.tickSize / 2);
      context.stroke();
      context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
      unit -= this.unitsPerTick;
      xPos = Math.round(xPos - xPosIncrement);
    }

    //Desenha as marcas da direita
    xPos = this.centerX + xPosIncrement;
    unit = this.unitsPerTick;
    while (xPos < this.canvas.width) 
    {
      context.moveTo(xPos, this.centerY - this.tickSize / 2);
      context.lineTo(xPos, this.centerY + this.tickSize / 2);
      context.stroke();
      context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
      unit += this.unitsPerTick;
      xPos = Math.round(xPos + xPosIncrement);
    }

    context.restore();
  };
  
  Graph.prototype.drawYAxis = function() 
  {
    var context = this.context;
    context.save();
    context.beginPath();
    context.moveTo(this.centerX, 0);
    context.lineTo(this.centerX, this.canvas.height);
    context.strokeStyle = this.axisColor;
    context.lineWidth = 2;
    context.stroke();

    //Desenha as marcas dos numeros do eixo Y
    var yPosIncrement = this.unitsPerTick * this.unitY;
    var yPos, unit;
    context.font = this.font;
    context.textAlign = 'right';
    context.textBaseline = 'middle';

    //Desenha as marcas do topo
    yPos = this.centerY - yPosIncrement;
    unit = this.unitsPerTick;
    while (yPos > 0) 
    {
      context.moveTo(this.centerX - this.tickSize / 2, yPos);
      context.lineTo(this.centerX + this.tickSize / 2, yPos);
      context.stroke();
      context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
      unit += this.unitsPerTick;
      yPos = Math.round(yPos - yPosIncrement);
    }

    //Desenha as marcas de baixo
    yPos = this.centerY + yPosIncrement;
    unit = -1 * this.unitsPerTick;
    while (yPos < this.canvas.height) 
    {
      context.moveTo(this.centerX - this.tickSize / 2, yPos);
      context.lineTo(this.centerX + this.tickSize / 2, yPos);
      context.stroke();
      context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
      unit -= this.unitsPerTick;
      yPos = Math.round(yPos + yPosIncrement);
    }

    context.restore();
  };

  Graph.prototype.drawEquation = function(equation, color, thickness) 
  {
    var context = this.context;
    context.save();
    context.save();
    this.transformContext();

    //Desenha a linha resultante da função
    context.beginPath();
    context.moveTo(this.minX, equation(this.minX));

    for (var x = this.minX + this.iteration; x <= this.maxX; x += this.iteration) 
    {
      context.lineTo(x, equation(x));
    }

    context.restore();
    context.lineJoin = 'round';
    context.lineWidth = thickness;
    context.strokeStyle = color;
    context.stroke();
    context.restore();
  };

  Graph.prototype.transformContext = function() 
  {
    var context = this.context;

    //Move o context para o centro do grafico
    this.context.translate(this.centerX, this.centerY);

    context.scale(this.scaleX, -this.scaleY);
  };


  var myGraph1 = new Graph
  ({
    canvasId: 'myCanvas',
    minX: -10,
    minY: -10,
    maxX: 10,
    maxY: 10,
    unitsPerTick: 1 
  });


  //Gera o grafico
  document.getElementById("gerar").onclick = function ()
  {  

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
      
    var myGraph = new Graph
    ({
      canvasId: 'myCanvas',
      minX: -10,
      minY: -10,
      maxX: 10,
      maxY: 10,
      unitsPerTick: 1 
    });

    myGraph1.drawEquation(function(x) 
    {
      var a = document.getElementById("resp1").value;
      var b = document.getElementById("resp2").value;
  
      return a*x+1*b;
    }, 'green', 3);
  
  };
  
  //Limpa os campos de A e B
  document.getElementById('clear').addEventListener('click', function() 
  {
    document.getElementById("resp1").value = "";
    document.getElementById("resp2").value = "";
  
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
  
    context.clearRect(0, 0, canvas.width, canvas.height);

    var myGraph = new Graph
    ({
      canvasId: 'myCanvas',
      minX: -10,
      minY: -10,
      maxX: 10,
      maxY: 10,
      unitsPerTick: 1 
    });
  }, false);
} 