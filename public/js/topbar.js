$(function(){

    $("#login").click(function(){
        var data = {};
        data.username = $("#username").val();
        data.password = $("#password").val(); 
        $.ajax({
            method: "POST", 
            data: data,
            url: "/login",
            success : function(data) {
                location.reload(); 
            }
        })
    }); 
    $("#logout").click(function(){
        $.ajax({
            method: "POST",
            data: data,
            url: "/logout", 
            success : function(data) {
                location.reload(); 
            }
        })
    });
});