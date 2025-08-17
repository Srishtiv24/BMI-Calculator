//s1 

function openTab(event, tabId)
{
// s2 Hide all tab contents
const tabContents=document.getElementsByClassName('tabContent'); //return an array with 2 elems
for(let i=0;i<tabContents.length;i++)
{
  tabContents[i].style.display="none"; //hides the content of tab 
}

//s3- Remove active class from all tab buttons
//if none of the tabs have "active" to begin with, the first time you click a tab, the removal part is essentially a no-op. But it’s still necessary for future clicks to keep the UI consistent.
const tabLinks=document.getElementsByClassName('tablinks');
for(let i=0;i<tabLinks.length;i++)
{
  tabLinks[i].classList.remove("active");
}

//s4 Show the selected tab and mark the button as active
document.getElementById(tabId).style.display="block";
event.currentTarget.classList.add("active"); //current target means The element the event listener is attached to
console.log(event.currentTarget.classList);
}

//Automatically open Metric tab on page load - 
//window obj on load event gets triggered - the elem that has default open id will be clicked automatiicay
window.onload = function() {
  document.getElementById("defaultOpen").click();
};

//.click(): Simulates a user click on that element, which typically triggers a tab switch or some other event handler.



//calcualtions of input
//metric 

function calculateMetr()
{
let heightInCm = parseFloat(document.getElementById("heightMetr").value); //inp.val
let weightInKg = parseFloat(document.getElementById("weightMetr").value);

if ( isNaN(heightInCm) || isNaN(weightInKg) || heightInCm <= 0 || weightInKg<=0 ) {
  alert("Please enter valid height and weight values");
  return;
}

let heightInM=heightInCm/100;
const BMI=(weightInKg/(heightInM*heightInM)).toFixed(2); //round off to 2 decimal place

let result1= document.getElementById("resultMetr");
result1.innerHTML="";// Clear previous results

let h2=document.createElement('h2');
h2.innerText=`${BMI}`;
h2.classList.add("blueColor");
result1.appendChild(h2);

let conclusion=document.createElement('p');
conclusion.innerHTML=conclude(BMI);
result1.appendChild(conclusion);

}


function conclude(BMI)
{
  if(BMI<18.5)
  {
    return "You are<br><span style='color: #1d8eff'><b>Underweight!</span></b>";
  }
  else if(BMI<24.9)
  {
    return "You are <br><span style='color: rgba(0, 128, 0, 0.8)'><b> Healthy!</span></b>";
  }
  else if(BMI<29.9)
  {
    return "You are<br><span style='color: rgba(255, 255, 0, 0.83)'><b>Overweight!</span></b>";
  }
  else
  {
    return "You are<br><span style='color:rgba(255, 0, 0, 0.842)'><b>Obese!</span></b>";
  }
}

function clearData()
{
    document.getElementById("heightMetr").value = "";
    document.getElementById("weightMetr").value = "";
    document.getElementById("resultMetr").innerHTML = "";
    document.getElementById("heightStd2").value="";
    document.getElementById("heightStd1").value=""; 
    document.getElementById("weightStd").value="";
    document.getElementById("resultStd").innerHTML = "";

}
  

function calculateStd()
{ 
  let heightInInch = parseFloat(document.getElementById("heightStd2").value); //inp.val
  let heightInFeet = parseFloat(document.getElementById("heightStd1").value); //inp.val
  let weightInPound = parseFloat(document.getElementById("weightStd").value);

  
if ( isNaN(heightInInch)|| isNaN(heightInFeet) || isNaN(weightInPound) || heightInInch <= 0 || weightInPound<=0 || heightInFeet<=0 ) {
  alert("Please enter valid height and weight values");
  return;
}

  let totalHeightInInches=heightInFeet*12+heightInInch;
  const BMI=(weightInPound*703/(totalHeightInInches*totalHeightInInches)).toFixed(2); //round off to 2 decimal place

let result2= document.getElementById("resultStd");
result2.innerHTML="";// Clear previous results

let h2=document.createElement('h2');
h2.innerText=`${BMI}`;
h2.classList.add("blueColor");
result2.appendChild(h2);

let conclusion=document.createElement('p');
conclusion.innerHTML=conclude(BMI);
result2.appendChild(conclusion);



}





