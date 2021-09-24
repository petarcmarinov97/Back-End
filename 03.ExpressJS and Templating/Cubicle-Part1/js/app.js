document.querySelector('.cube-list').addEventListener('click',(ev)=>{
    const target=ev.target
    if(target.className=="btn-more" && target.textContent=="See More"){
        let nextEl=target.nextElementSibling;
        nextEl.style.display="block";
        target.textContent="Hide"
    }else{
        let nextEl=target.nextElementSibling;
        nextEl.style.display="";
        target.textContent="See More"
    }
})