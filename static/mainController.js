function selectOnClick(i){
    setBackground(i);
    ans = i;
}

function lastOnClick(){
    counter -= 1;
    if(counter == 1)
        document.querySelector("#previous").style = "display:none";
    if(counter != 10)
        document.querySelector("#next").innerText = "下一題";

    setBackground(ansList[counter]);
    ans = ansList[counter];
    getData(counter);
}

function nextOnClick(){
    if(ans==0) return;
    ansList[counter] = ans;
    counter += 1;
    if(counter != 1)
        document.querySelector("#previous").style = "";
    if(counter == 10)
        document.querySelector("#next").innerText = "送出";
    if(counter == 11)
        console.log(ansList);

    setBackground(ansList[counter]);
    ans = ansList[counter];
    getData(counter);
}

function getData(num) { 
    let x = "/json?num=" + num; 
    return new Promise((resolve) => { 
        fetch(x).then(function (response) { 
            return response.json(); 
        }).then(function (data) { 
                document.querySelector(".topicType").innerText = data.Q;
                document.querySelector(".content").innerText = data.description;
                document.querySelector(".progress-text").innerText = num + " / 10";
                document.querySelector(".progress").style.width =  num*10 + "%";
                document.querySelector("#select1").innerText = data.option1; 
                document.querySelector("#select2").innerText = data.option2; 
                document.querySelector("#select3").innerText = data.option3; 
                resolve(); 
            }) 
        }) 
    }

function setBackground(i) {
    let itemAll = document.querySelectorAll(".select");
    itemAll.forEach(function(tempItem) {
        tempItem.style.backgroundColor = 'rgb(113, 94, 55)';
    })
    let item = null;
    if(i==1){
        item = document.querySelector("#select1");
    }
    else if(i==2){
        item = document.querySelector("#select2");
    }
    else if(i==3){
        item = document.querySelector("#select3");
    }
    else{
        return;
    }
    item.style.backgroundColor = '#F56F29';
}

