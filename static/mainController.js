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
        setAns();
        saveData();
        setChart();
        document.querySelectorAll(".end").forEach(function(el) {
            el.style.display = "";
        });
        return;
    }

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
    .catch((error) => console.error('錯誤:', error));
}

 
function setAns(){    
    Object.keys(finAns).forEach((key, index) => {
        finAns[key] = ansList[index] ?? finAns[key];
    });
}

function setChart() {
    var chart = document.getElementById('myPieChart');
    var ctx = chart.getContext('2d');
    chart.style = "";
    var topic = document.getElementsByClassName('topic');
    topic[0].style = "display:none";
    let a=0 ,b=0 ,c=0;
    for(let i=0;i<10;i++){
        if(ansList[i]==1) a++ ;
        else if(ansList[i]==2) b++ ;
        else c++ ;
    }
    var myPieChart = new Chart(ctx, {
        type: 'pie', // 指定圖表類型為圓餅圖
        data: {
            labels: ['柯文哲', '侯友宜', '賴清德'], // 標籤
            datasets: [{
                data: [a ,b, c], // 數據
                backgroundColor: [ // 每個部分的顏色
                    'rgb(0, 255, 255)',
                    'blue',
                    'green'
                ],
                borderColor: [ // 每個部分邊框的顏色
                    'black',
                    'black',
                    'black'
                ],
                borderWidth: 1 // 邊框寬度
            }]
        },
        options: {
            height:"300px",
            responsive: false, // 圖表是否應該響應式調整
            plugins: {
                legend: {
                    position: 'top', // 圖例位置
                },
                title: {
                    display: true,
                    text: '你對於政策傾向的是' // 圖表標題
                }
            }
        }
    });
}
