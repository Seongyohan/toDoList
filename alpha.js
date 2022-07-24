if(!(localStorage.first)){
   localStorage.first = "true"
   localStorage.data = "[]"
}


let log = console.log,
    data = JSON.parse(localStorage.data),
    date = new Date().toLocaleDateString(),
    button_add = $('.add-box button'),
    list_box = $('.list-box'),
    list_value = '',
    input = $('.add-box input');
        
window.addEventListener('load',function(){
	let count = 2;
  data.forEach(function(data){
     list_value += `<li class="list" data_id =${data.id} style="animation: appear ${count}s ease forwards 1;" >
         <input type="checkbox" class="first"data_status = ${data.status}>
         <input type="text" value="${data.value}" class="input_typer">
         <input type="checkbox" class="second">
       </li>`;
     count = count + 0.5;
    
	})
  list_box.html(list_value)
  document.querySelectorAll('.first').forEach(function(data){
     if(data.getAttribute('data_status') == 'true') {
      data.checked = true 
     }
  })
  document.querySelectorAll('.first').forEach(function(data){
  	if(data.checked){data.parentElement.style.filter='brightness(0.5)'}
  })
})

button_add.on('click',function(){
  if(!this.previousElementSibling.value == '') {
    data.push({
      id : Date.now(),
      value:this.previousElementSibling.value,
      status : false,
      date : date
    })
    list_box.append(`<li class="list" data_id =${data[data.length - 1].id} style="animation: appear 2s ease forwards 1;"  >
        <input type="checkbox" class="first" data_status =${data[data.length - 1].status}>
        <input type="text" value="${data[data.length - 1].value}" class="input_typer">
        <input type="checkbox" class="second">
      </li>`)
    this.previousElementSibling.value=''
   localStorage.data = JSON.stringify(data) 
  }
})
list_box.on('click','.second',function(clicker){
  this.parentElement.style.animation = ' dissappear 2s ease forwards 1';
  setTimeout(()=>{
    this.parentElement.style.display = 'none'
  },1000)
  localStorage.data = JSON.stringify(data.filter((data)=>{
   if(data.id == this.parentElement.getAttribute('data_id')) {
    return false 
   }
   else { return true}
 }))
  data = JSON.parse(localStorage.data)
})
list_box.on('click','.first',function(){
  
  if(this.checked){this.parentElement.style.filter='brightness(0.5)'}
  else{this.parentElement.style.filter='brightness(1)'}
  data.forEach((data)=>{
    if(data.id == this.parentElement.getAttribute('data_id')) {
      data.status = this.checked
    }
  })
  localStorage.data = JSON.stringify(data)
})

list_box.on('keyup','.input_typer',function(){
  data.forEach((data)=>{
    if(data.id == this.parentElement.getAttribute('data_id')) {data.value = this.value}
  })
  localStorage.data = JSON.stringify(data)
})
input.on('keyup',function(key){
  if(key.keyCode === 13){
     if(!this.value == '') {
    data.push({
      id : Date.now(),
      value:this.value,
      status : false,
      date : date
    })
    list_box.append(`<li class="list" data_id =${data[data.length - 1].id} style="animation: appear 2s ease forwards 1;"  >
        <input type="checkbox" class="first" data_status =${data[data.length - 1].status}>
        <input type="text" value="${data[data.length - 1].value}" class="input_typer">
        <input type="checkbox" class="second">
      </li>`)
   this.value = "";
   localStorage.data = JSON.stringify(data);
  }
  }
})

