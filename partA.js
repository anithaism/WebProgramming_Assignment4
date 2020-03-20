
var hoursArray = [];
var payArray = [];

function report() {

var temp=1;
var x=0;

while(temp>0){
temp=prompt('Enter hours worked for employee' + (x+1));
if(temp<0 && x==0)
{
 alert('Enter atleast one value');
 temp=prompt('Enter hours worked for employee' + (x+1));
}

if(temp<=40)
{
 if(temp>0)
{
 payArray[x]=temp*15;
}
}
else
{
 if(temp>0)
 {
 payArray[x]=(40*15)+((temp-40)*22.50);
 }
}
if(temp>0)
{
hoursArray[x]=temp;
x++;
}
}
}

function addTable() {

    var myTableDiv = document.getElementById("metric_results")
    var table = document.createElement('TABLE')
    var tableBody = document.createElement('TBODY')

    table.border = '1'
    table.appendChild(tableBody);

    var heading = new Array();
    heading[0] = "ID"
    heading[1] = "Hours Worked"
    heading[2] = "Weekly Pay"

    //TABLE COLUMNS
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
    for (i = 0; i < heading.length; i++) {
        var th = document.createElement('TH')
        th.width = '75';
        th.appendChild(document.createTextNode(heading[i]));
        tr.appendChild(th);
    }

    //TABLE ROWS
    for (i = 0; i < hoursArray.length; i++) {
        var tr = document.createElement('TR');
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(i+1));
            tr.appendChild(td);
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(hoursArray[i]));
            tr.appendChild(td);
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(payArray[i]));
            tr.appendChild(td);

        tableBody.appendChild(tr);
       
    }  
    myTableDiv.appendChild(table);
  
  var total=0;
  for(j=0;j<payArray.length;j++)
  {
    total=total+payArray[j];
  }

  var text="TOTAL PAY OF ALL THE EMPLOYEES: " +total+ "$";
  document.getElementById("totalpay").innerHTML=text;
}