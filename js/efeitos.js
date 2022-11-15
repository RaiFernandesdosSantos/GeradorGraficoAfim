$(document).ready(function() 
{

    $("#btnGerador, #btnGerador2, #btnGerador3").click(function()
    {
        window.open("gerador.html","popupWindow","width=980, height=600");
    });
    
    
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

    $("#resposta").click(function()
    {
        $("#respid1").val("2");
        $("#conferir, #resposta, #tente, #mb").hide();
        $("#proxima").show();
    });
    
     $("#conferir").click(function()
     {
     
        if($("#respid1").val() == "2")
        {
            $('#mb').show();
            $('#tente').hide();
            play('mb');
            $("#conferir, #resposta").hide();
            $("#proxima").show();
        } 
        else
        {
            $('#tente').show();
            $('#mb').hide();
            play('pi');
        }
        
     });
        
    $("#proxima").click(function()
    {
    
        $("#atividade1").hide();
        $("#atividade2").show();
    
    });
     
     
    $("#resposta2").click(function()
    {
    
        $("#respid2").val("7");
        $("#conferir2, #resposta2, #tente2, #mb2").hide();
    
    });
    
     $("#conferir2").click(function()
     {
     
        if($("#respid2").val() == "7")
        {
            $('#mb2').show();
            $('#tente2').hide();
            play('mb');
            $("#conferir2, #resposta2").hide();
        
        } 
        else
        {
            $('#tente2').show();
            $('#mb2').hide();
            play('pi');
        }
        
     });

        $(".btl1, #menu1").click(function()
        {
            
            if(stage1)
              stage1.destroy();
                      
            stage1 = new swiffy.Stage(document.getElementById('swiffycontainer1'), swiffyobject1);
            stage1.start();	
        
        });
        
        $(".btr2, .btl2").click(function()
        {
            
            if(stage2)
              stage2.destroy();
                      
            stage2 = new swiffy.Stage(document.getElementById('swiffycontainer2'), swiffyobject2);
            stage2.start();	
        
        });
    
        
            $(".btr3").click(function()
            {
    
            
            if(stage3)
              stage3.destroy();
                      
            stage3 = new swiffy.Stage(document.getElementById('swiffycontainer3'), swiffyobject3);
            stage3.start();	
            stage3.setBackground(null);
        });
    });