 /*-------------------Loading-More---------------------------------------*/

 let containerA = document.querySelector(".container-A");
 let containerB = document.querySelector(".container-B");
 let loadMoreBtn1 = document.querySelector('#load-more');
 let loadMoreBtn2 = document.querySelector('#load-more-2');

 
     loadMoreBtn1.onclick = () =>{
         containerA.style.display = "none";
         containerB.style.display = "flex";
     }

     loadMoreBtn2.onclick = () =>{
         containerB.style.display = "none";
         containerA.style.display = "flex";
     }
