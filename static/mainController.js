function selectOnClick(i){
    let item = null;
    let itemAll = document.querySelectorAll(".select");
    if(i==1){
        item = document.querySelector("#select1");
    }
    else if(i==2){
        item = document.querySelector("#select2");
    }
    else if(i==3){
        item = document.querySelector("#select3");
    }
    itemAll.forEach(function(tempItem) {
        tempItem.style.backgroundColor = 'rgb(113, 94, 55)';
    })
    item.style.backgroundColor = 'red';
}

function lastOnClick(num){
    num -= 1;
}

function nextOnClick(num){
    num +=1 ;
}