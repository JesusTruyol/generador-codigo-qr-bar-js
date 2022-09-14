const formControl= document.getElementById('formControl').value;
const fileData= document.getElementById('file');
const form= document.getElementById('form');

const bar= document.getElementById('bar');
const tbody= document.getElementById('list');
const containerCoder= document.getElementById('container-coder')



let resultData=[];


form.addEventListener('submit', (e)=>{
  e.preventDefault();
const formControl= document.getElementById('formControl').value;
if (formControl ==='' && file.value === ''){
  alert('debes ingresar la informacion a codificar')
}else if(formControl !== ""){
  containerCoder.innerHTML="";
  containerCoder.innerHTML=`<div id="container-coder-singel" class="container-coder-singel"></div>`;
  const containerCoderSingel= document.getElementById('container-coder-singel');
  containerCoderSingel.innerHTML= `<div id="qr" class="container-qr m-3"></div>
  <canvas id="bar" class="container-bar m-3"></canvas>`;
  const qr= document.getElementById('qr');
  const codeQr = new QRCode(qr);
  codeQr.makeCode(formControl);
   
  JsBarcode('#bar',formControl);

}else{
//  let listToCoder = dataXlsx();
  let id=0;
  let newListToCode= [];
  resultData.map( (list)=> newListToCode.push({id: id++,description:list[0], text: list[1]}))

  let templateHtml="";
  for (item of newListToCode){
    templateHtml +=
    `<div class="list-coder">
      <div class="list-coder-description">
        <h3>${item.description}</h3>
        ${item.text}
        <canvas id="bar${item.id}" class="container-bar m-2"></canvas>
      </div>
      <div id="qr${item.id}"  class="container-qr m-2"></div>
    </div>
    `;
  }

  containerCoder.innerHTML="";
  containerCoder.innerHTML=`<div id="container-coder-list" class="container-coder-list"></div>`;
  const containerCoderList= document.getElementById('container-coder-list');
  containerCoderList.innerHTML= templateHtml;
  for (item of newListToCode){
    const qr= document.getElementById(`qr${item.id}`);
    console.log(`qr${item.id}`)
    new QRCode(qr,item.text);
    // let codeTableQr = new QRCode(qr);
    // codeTableQr.makeCode(item.text);
    // let idBar=`#bar${item.id}`;
    // console.log(idBar)


    JsBarcode(`#bar${item.id}`,item.text);
  }

}})

fileData.addEventListener('change', async function(){

  const data= await readXlsxFile(fileData.files[0]);
  resultData= data;
  console.log(resultData)
  //return data

})