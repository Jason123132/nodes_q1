const express=require('express');
const bodyParser=require('body-parser');
const cookieParser = require('cookie-parser');

const app=express();
const port=5400;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json()); 

function findSummation(N = 1) {
    if (typeof N !== 'number' || N <= 0 || isNaN(N)) {
        return false;
    }
    let summation = 0;
    for (let i = 1; i <= N; i++) {
        summation += i;
    }
    return summation;
}

function uppercaseFirstandLast(inputString) {
    if (typeof inputString !== 'string' || inputString.trim() === '') { // Check for non-string input or empty string
        return false;
    }
    return inputString.split(' ').map(word => {
        if (word.length > 1) {
            return word[0].toUpperCase() + word.slice(1, -1) + word[word.length - 1].toUpperCase();
        } else {
            return word.toUpperCase(); // For single-character words
        }
    }).join(' ');
}

function findAverageAndMedian(numbers){
	if(!Array.isArray(numbers)||numbers.some(num=>typeof num!=='number')){
		return false;
	}
	numbers.sort((a,b)=>a-b);
	const sum=numbers.reduce((acc,val)=>acc+val,0);
	const average=sum/numbers.length;
	let median=0;
	const mid=Math.floor(numbers.length/2);
	if(numbers.length%2==0){
	median = (numbers[mid - 1] + numbers[mid]) / 2; 
	}else{
		median=numbers[mid];
	}
	return{average,median};
}

function find4Digits(inputString){
	if(typeof inputString !=='string'){
		return false;
	}
	const match = inputString.match(/\b\d{4}\b/);
	
	 return match ? match[0] : false; 
}

app.get('/', (req, res) => { // 处理根路径 GET 请求
    res.sendFile(__dirname + '/index1.html'); // 返回 index1.html 文件
});

//rounter
app.post('/findSummation', (req, res) => {
    const { number } = req.body;
    const result = findSummation(Number(number));
    res.send(`The Summation result is: ${result}`); // 使用反引号
});

app.post('/uppercaseFirstandLast', (req, res) => {
    const { text } = req.body;
    const result = uppercaseFirstandLast(text);
    res.send(`The Uppercase result is: ${result}`); // 使用反引号
});
app.post('/findAverageAndMedian',(req,res)=>{
	const {numbers}=req.body;
	const numArray=numbers.split(',').map(Number);
	const result=findAverageAndMedian(numArray);
	 res.send(`Average: ${result.average}, Median: ${result.median}`);
});
app.post('/find4Digits',(req,res)=>{
	const{text}=req.body;
	const result=find4Digits(text);
	 res.send(`First 4-digit number: ${result}`);
});

app.listen(port, () => { // 启动服务器并监听指定端口
    console.log(`Server running at http://localhost:${port}`); // 在控制台输出服务器运行信息
});