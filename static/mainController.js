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
    if(counter == 11){
        console.log(ansList);
        setAns();
        saveData();}

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


function setProgress(num){
    document.querySelector(".progress").style.width =  num*10 + "%";
}


function saveData(){
    fetch('/saveData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(finAns)
    })
    .then(response => response.json())
    .then(data => console.log('成功:', data))
    .catch((error) => console.error('錯誤:', error));}

 
function setAns(){    
    Object.keys(finAns).forEach((key, index) => {
        finAns[key] = ansList[index] ?? finAns[key];});
    }

window.onload = function() {
    var ctx = document.getElementById('myPieChart').getContext('2d');
    var myPieChart = new Chart(ctx, {
        type: 'pie', // 指定圖表類型為圓餅圖
        data: {
            labels: ['紅色', '藍色', '黃色'], // 標籤
            datasets: [{
                data: [300, 50, 100], // 數據
                backgroundColor: [ // 每個部分的顏色
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)'
                ],
                borderColor: [ // 每個部分邊框的顏色
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1 // 邊框寬度
            }]
        },
        options: {
            responsive: true, // 圖表是否應該響應式調整
            plugins: {
                legend: {
                    position: 'top', // 圖例位置
                },
                title: {
                    display: true,
                    text: '圓餅圖示例' // 圖表標題
                }
            }
        }
    });}
