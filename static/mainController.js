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
    item.style.backgroundColor = '#F56F29';
}

function lastOnClick(){
    counter -= 1;
    if(counter == 1)
        document.querySelector("#previous").style = "display:none";
    getData(counter);
}

function nextOnClick(){
    counter += 1;
    if(counter != 1)
        document.querySelector("#previous").style = "";
    if(counter == 10)
        document.querySelector("#next").innerText = "送出";
    getData(counter);
}

function getData(num) { 
    let x = "/json?num=" + num; 
    return new Promise((resolve) => { 
        fetch(x).then(function (response) { 
            return response.json(); 
        }).then(function (data) { 
                document.querySelector(".topicType").innerText = data.Q;
                document.querySelector(".topicNum").innerText = data.num + " / 10";
                document.querySelector(".content").innerText = data.description;
                document.querySelector("#select1").innerText = data.option1; 
                document.querySelector("#select2").innerText = data.option2; 
                document.querySelector("#select3").innerText = data.option3; 
                resolve(); 
            }) 
        }) 
    }

