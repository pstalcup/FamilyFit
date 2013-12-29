$(function(){
    $("#login").click(function(){
        var data = {};
        data.username = $("#username").val();
        data.password = $("#password").val(); 
        $.ajax({
            method: "POST", 
            data: data,
            url: "/login",
            success : function() {
                location.reload(); 
            }
        })
    }); 
});