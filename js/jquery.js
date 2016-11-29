$(document).ready(function() {  
        $("#search_input").bind('keyup', function () {  
            var input = $(this);  
            var inputText = input.val();  
            var callback= function (data) {  
                var d = data.AS.Results[0].Suggests;  
                var html = "";  
                for (var i = 0; i < d.length; i++) {  
                    html += '<li>' + d[i].Txt + '</li>';  
                }  
                $("#suggest_result").html(html);  
                $("#suggest").css({  
                    top: $('#search_form').offset().top + $("#search_form").height() + 10,  
                    left: $('#search_form').offset().left  
                }).show();  
            };  
            $.ajax({  
                type: "get",  
                async: false,  
                url: "http://api.bing.com/qsonhs.aspx?type=cb&cb=callback&q=" + inputText,  
                dataType: "jsonp",  
                jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)  
                jsonpCallback:"callback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据  
                success: function (data) {  
                    callback(data);  
                },  
                error: function (data) {  
                    console.log(data);  
                }  
            });  
        });  
        $(document).bind('click',function(){  
           $('#suggest').hide();  
        });  
        $('#suggest').delegate('li','click', function () {  
            var keyword=$(this).text();  
           location.href='http://cn.bing.com/search?q='+keyword;  
        });  
    });  
  
