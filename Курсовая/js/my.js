function retu(category){
	location.href = ''+category+'.html';


}
function t(){
	location.href='7.html';
}
function main(){
	location.href='3.html';
}
function nu(json){
	console.log("ok");
};
function callback(json){
	var k;
	for (key in json){
		k=json[key];
	}
	var lenght=Object.keys(k.advertisment).length;
	if(lenght!=0){
		var cat=k.advertisment[0].category;
	for(i=0;i<lenght;i++){
	$('#table_'+k.advertisment[i].category+'').append('<div class="row" class="cite" onclick="getfull('+k.advertisment[i].id+')"><div class="col-sm-2" hidden:hidden></div><div class="col-sm-4"><img src ="image/'+k.advertisment[i].id+'.png" class="round" width="150" height="120" /></div><div id="'+cat+'"class="col-sm-4"><b>'+k.advertisment[i].title+'</b><br><ins>'+k.advertisment[i].price+'</ins><h5>'+k.advertisment[i].date+'</h5><br><br><a><h6> Посмотреть</h6></a></div><div class="col-sm-2"></div></div><legend></legend>');
}
};}

var category1="";
function callback1(json){
	var k;
	for (key in json){
		k=json[key];
	}
	
	if(parseInt(k.advertisment[0].id)==0){
		$('#table_'+category1+'').html('<h3>По данному запросу ничего не найдено</h3>');


	}
	else{
	for(i=0;i<Object.keys(k.advertisment).length;i++){
		if(i==0){
			//console.log(k.advertisment[i].id);
		$('#table_'+k.advertisment[i].category+'').html('<div class="row" class="cite" onclick="getfull('+k.advertisment[i].id+')"><div class="col-sm-2"></div><div class="col-sm-4"><img src ="image/'+k.advertisment[i].id+'.png" class="round" width="150" height="120" /></div><div class="col-sm-4"><b>'+k.advertisment[i].title+'</b><br><ins>'+k.advertisment[i].price+'</ins><h5>'+k.advertisment[i].date+'</h5><br><br><a><h6> Посмотреть</h6></a></div><div class="col-sm-2"></div></div><legend></legend>')
	}
	else{
		$('#table_'+k.advertisment[i].category+'').append('<div class="row" class="cite" onclick="getfull('+k.advertisment[i].id+')"><div class="col-sm-2"></div><div class="col-sm-4"><img src ="image/'+k.advertisment[i].id+'.png" class="round" width="150" height="120" /></div><div class="col-sm-4"><b>'+k.advertisment[i].title+'</b><br><ins>'+k.advertisment[i].price+'</ins><h5>'+k.advertisment[i].date+'</h5><br><br><a><h6> Посмотреть</h6></a></div><div class="col-sm-2"></div></div><legend></legend>')

	}
}
}
	
};


function post_ajax(code,title,text,category,price,name,city,email,phone,date){
	console.log(price);
	var price1=parseInt(price,10);
	$.ajax({
		url:'http://localhost:8080/Kursov/third?nu',
		data:{code:code,title:title,text:text,category:category,price:price1,name:name,city:city,email:email,phone:phone,date:date},
		type: 'post',
		dataType: 'jsonp',
		crossDomain: true,
        success : function(resp){alert("ok")},
        error: function(data){ console.log(data)}
    });

};

function get(category){
	console.log("get");
	$.ajax({
		url:'http://localhost:8080/Kursov/first?callback',
		data:{category: category},
		type: 'get',
		dataType: 'jsonp',
		crossDomain: true,
        success : function(resp){alert("ok")},
        error: function(data){}
    });

};
function search_data(input_date,category){
	
	
	$.ajax({
		url:'http://localhost:8080/Kursov/second?callback1',
		data:{date:input_date,category:category },
		type: 'get',
		dataType: 'jsonp',
		crossDomain: true,
        success : function(resp){alert("ok")},
        error: function(data){}
	});
	$('#search2').val("");
	category1=category;

};

function search_title(input_date,category){
	$.ajax({
		url:'http://localhost:8080/Kursov/second?callback1',
		data:{title:input_date,category:category },
		type: 'get',
		dataType: 'jsonp',
		crossDomain: true,
        success : function(resp){alert("ok")},
        error: function(data){}
	});
	$('#search3').val("");
	category1=category;
};
function getfull(id){
	$.ajax({
		url:'http://localhost:8080/Kursov/fourth?full',
		data:{id:id},
		type: 'get',
		dataType: 'jsonp',
		crossDomain: true,
        success : function(resp){alert("ok")},
        error: function(data){}

	})
};

var name="";
var city="";
var title="";
var text="";
var price="";
var email="";
var phone="";
var date="";
var category="";
var code="";
var id="";
function full(json){
	code="";
	id="";
	name="";
	city="";
	title="";
	text="";
	price="";
	email="";
	phone="";
	category="";
	var k;
	for (key in json){
		k=json[key];
	}
	id=k.advertisment[0].id;
	code=k.advertisment[0].code;
	name=k.advertisment[0].name;
	city=k.advertisment[0].city;
	text=k.advertisment[0].text;
	price=k.advertisment[0].price;
	email=k.advertisment[0].email;
	phone=k.advertisment[0].phone;
	date=k.advertisment[0].date;
	category=k.advertisment[0].category

	//var t='<br><p id="1" class="text-success" ><p id="2" class="text-danger h4 bg-info"></p></p><br><h3>Оставить свое мнение:</h3></left><form id="form1"><label>Вашe имя</label><br><textarea rows="1" cols="100" id="txt4"></textarea><br><label>Ваш комментарий</label><br><textarea rows="5" cols="100" id="txt"></textarea><br><br><input value="Добавить" onclick="addcoment()" type="button"></form>';
	var kt='<h3>'+k.advertisment[0].text+'</h3><table class="table"><tbody><tr><td><b>Город</b></td><td>'+k.advertisment[0].city+'</td></tr><tr><td><b>Контактное лицо</b></td><td>'+k.advertisment[0].name+'</td></tr><tr><td><b>Контакты</b></td><td>'+k.advertisment[0].phone+'<br>'+k.advertisment[0].email+'</td></tr><tr><td><b>Цена</b></td><td>'+k.advertisment[0].price+'</td></tr><tr><td><b>Дата размещения</b></td><td>'+k.advertisment[0].date+'</td></tr></tbody></table>';
	//$('#table_'+k.advertisment[0].category+'').html('<div style="width: 100%; float: left;"><div style="float: left; width: 15%; margin: 10px; padding: 10px;"></div><div style="float: left; width: 25%; margin: 10px; padding: 10px;"><br><img src ="./1.png" width="200" height="200" /></div><div style="float: left; width: 35%; margin: 10px; padding: 10px;">'+kt+'</div></div><div style="clear: both;"><a><h4>Редактировать</h4></a></div><div>'+t+'</div>');
	$('#table_'+k.advertisment[0].category+'').html('<div style="width: 100%; float: left;"><div  style="float: left; width: 15%; margin: 10px; padding: 10px;"><a onclick=retu1()><h4>'+'&lArr;'+'Вернуться к категории</h4></a></div><div  style="float: left; width: 25%; margin: 10px; padding: 10px;"><br><img src ="image/'+k.advertisment[0].id+'.png" width="200" height="200" /></div><div id="ser" style="float: left; width: 35%; margin: 10px; padding: 10px;">'+kt+'</div></div><div id="but_red" style="clear: both;"><a onclick="redact()"><h4>Редактировать</h4></a></div><div id="redt"></div>');
};
function retu1(){
	retu(category);
}

function redact(){
	
	$('#redt').html('<br><label>Введите код:</label><input id="cos"></input><button id="sub" onclick="redact2()">Подтвердить</button><div id="acept"></div>');
};

var q1="";
	var q2="";
	var q3="";
	var q4="";
	var q5="";
	var q6="";
function redact2(){
		var code1=code;
		var co=$("#cos").val();

		
		if(co==code){
			var kt='<h3><input id="1_text" style="background-color: transparent"  type="text" class="form-control" value="'+text+'"></input></h3><table class="table"><tbody><tr><td><b>Город</b></td><td><input id="1_city" style="background-color: transparent"  type="text" class="form-control" value="'+city+'"></input></td></tr><tr><td><b>Контактное лицо</b></td><td><input id="1_name" style="background-color: transparent"  type="text" class="form-control" value="'+name+'"></input></td></tr><tr><td><b>Контакты</b></td><td><input id="1_phone" style="background-color: transparent"  type="text" class="form-control" value="'+phone+'"></input><br><input id="1_email" style="background-color: transparent"  type="text" class="form-control" value="'+email+'"></input></td></tr><tr><td><b>Цена</b></td><td><input id="1_price" style="background-color: transparent"  type="text" class="form-control" value="'+price+'"></input></td></tr><tr><td><b>Дата размещения</b></td><td>'+date+'</td></tr></tbody></table>';
			
			$('#ser').html(kt);
			$('#but_red').html('<a onclick="update()">Готово</a>');
			$('#redt').html("");
			
		}
		else{
			
			$('#acept').html("Вы ввели неправльный код, повторите попытку");
			$('#cos').val('');
			
		}

	};
function update(){
		q1=$('#1_text').val();
	q2=$('#1_name').val();
	q3=$('#1_price').val();
	q4=$('#1_phone').val();
	q5=$('#1_email').val();
 q6=$('#1_city').val();
	
	if((q1.indexOf("<>")==true)||(q1=="")||(q2=="")||(q6=="")||(isNaN(q3)))
  {
  	console.log("ffhhf");
  	alert("Вы ввели некоректные данные,проверьте правильность");
  }
  else{
	console.log(q1,q2,q3,q4,q5,q6,id)
	$.ajax({
		url:'http://localhost:8080/Kursov/fifth?again',
		data:{text:q1,name:q2,price:q3,phone:q4,email:q5,city:q6, id:id},
		type: 'get',
		dataType: 'jsonp',
		crossDomain: true,
        success : function(resp){alert("ok")},
        error: function(data){}

	});
	retu(category);
}


};
function again(){
	
}


var text="";
function addcoment(){

        var name=$('#txt4').val();
        var q=$('#txt').val();
        document.getElementById("1").innerHTML=text;
        text= text+name+":"+"                          "+q+"<br>"
        document.getElementById("2").innerHTML=name+":"+"                          "+q;
        document.getElementById("txt").value="";
        document.getElementById("txt4").value="";
      };
