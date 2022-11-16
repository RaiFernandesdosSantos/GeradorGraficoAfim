$(document).ready(function() 
{
    $("#clear").click(function()
    {
        //Limpa as caixas de A e B
        $("#a").empty();
        $("#b").empty();
        $("#y1").empty();
        $("#x1").empty();
        
        $(".esconde").hide();  
    });
    
    $("#gerar").click(function()
    {
        //Retorna as intersecções, e monta a função completa
        $("#a").empty();
        $("#b").empty();
        $("#y1").empty();
        $("#x1").empty();
        
        $(".esconde").show();
    
        var dadoA = $("#resp1").val();
        var dadoB = $("#resp2").val();
        var x1 = ((-1)*(dadoB))/(dadoA);
        
        $("#a").append("("+dadoA+")");
        $("#b").append("("+dadoB+")");
        $("#y1").append("(0,"+dadoB+")");
        $("#x1").append("("+x1+",0)");
    });
});