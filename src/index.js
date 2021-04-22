const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');
let data= [
    {
        "name": "xyz",
        "status": "progress",
        "id": "d63b8fd1-d721-462c-9223-dac04acec039"
    }
];

app.use(express.json());
app.use(express.urlencoded());

app.use("/static", express.static(path.resolve(__dirname, "./asset")));

app.get('/api/task',(req,res)=>{
    const user = {};
    res.json({
        data,
    })
})
app.post('/api/task',(req,res)=>{
    req.body.id = uuidv4();
    data.push(req.body);
    res.json({
        message:"Post thành công",
    })
})

app.put("/api/task/:taskId", (req,res) =>{
    console.log('body',req.body);
    let index = data.findIndex((item) =>{
        return item.id === req.params.taskId;
    });
    data[index] = {...data[index], ...req.body}
    res.json({
        message:"ok", index
    })
})

app.delete("/api/task/:taskId", (req,res) =>{
    console.log('body',req.body);
    let index = data.findIndex((item) =>{
        return item.id === req.params.taskId;
    });
    data.splice(index,1);
    res.json({
        message:"ok", index
    })
})

app.listen(3000,()=>{
    console.log('server abc chay cong 3000');
})







// /*
// HTTP request

// get: lấy data từ sever
// post: tạo data vào sever
// put: chỉnh sửa data đã có trên sever
// delete: xoá data trên sever
// */
// app.use("/static", express.static(path.resolve(__dirname, "./asset")));


// app.get('/', (request, response) =>{
//  response.sendFile(path.resolve("./src/asset/index.html"));
// });

// app.post("/", (req,res) =>{
//     res.json({
//         post: "post",
//     });
// });

// app.put("/", (req,res) =>{
//     res.json({
//         put: "put",
//     });
// });

// app.delete("/", (req,res) =>{
//     res.json({
//         delete: "delete",
//     });
// });

// app.listen(3000,() =>{
//     console.log('server chay o port 3000');
// })



// fs.readFile('./index.txt',"utf-8", (error, info) =>{
//     if(error) {
//         console.log("doc file bi loi");
//         return;
//     }

//     console.log(info);
// });

// const content = fs.readFileSync('./index.txt', 'utf-8');
// console.log(content);