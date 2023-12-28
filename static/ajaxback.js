function saveData(){
    fetch('/saveData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ array: anslist })
    })
    .then(response => response.json())
    .then(data => console.log('成功:', data))
    .catch((error) => console.error('錯誤:', error));}