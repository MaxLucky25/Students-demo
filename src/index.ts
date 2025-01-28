import express from "express"
import bodyParser from "body-parser"
const app = express()
const port = process.env.PORT || 3000


const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
}

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

const db = {
    courses: [
        {id:1, title: "front-end"},
        {id:2, title: "back-end"},
        {id:3, title: "automation qa"},
        {id:4, title: "devops"}
    ]
}


// урок(11)

app.get("/", (req, res) => {
  let helloMessage = "Hello incubator. I could make it"
    res.send(helloMessage)

})
app.get("/courses",(req, res)=>{
    let foundCourses = db.courses;
    if(req.query.title){
        foundCourses=foundCourses
            .filter(c => c.title.indexOf(req.query.title as string) > -1)
    }

    if(!foundCourses.length){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
        
    
    res.json(foundCourses)
})
app.get("/courses/:id",(req, res)=>{
    const foundCourses = db.courses.find(c => c.id === +req.params.id)

    if (!foundCourses){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    res.json(foundCourses);

})
app.post("/courses", (req,res) =>{
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    const createdCourse ={
        id: +(new Date()),
        title: req.body.title
    }
    db.courses.push(createdCourse)
    res
        .status(HTTP_STATUSES.CREATED_201)
        .json(createdCourse)
})
app.delete("/courses/:id",(req, res)=>{
    db.courses = db.courses.filter(c => c.id !== +req.params.id)

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);

})
app.put("/courses/:id",(req, res)=>{
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    const foundCourses = db.courses.find(c => c.id === +req.params.id)

    if (!foundCourses){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }

    foundCourses.title = req.body.title;

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);

})

// новый урок(12), новые endpoints
const products =[{id:1, title:"tomato"},{id:2, title:"orange"}];
const adresses= [{id:1, title:"Nezalejnasti 12"},{id:2, title:"Selickogo 11"}];

const parserMiddleWear = bodyParser({});
app.use(parserMiddleWear)

app.get("/products",(req,res)=>{
    if(req.query.title){
        let searchString = req.query.title.toString();
        res.send(products.filter(c => c.title.indexOf(searchString) > -1));
    }else {
        res.send(products);
    }
})
app.post("/products",(req,res)=>{
    const newProduct ={
        id: +(new Date()),
        title: req.body.title
    }
    products.push(newProduct)

    res.status(201).send(newProduct)

})
app.get("/products/:id",(req, res)=>{
    let product = products.find(p=>p.id === +req.params.id)
    if(product){
        res.send(product);
    }else{
        res.send(404);
    }
})
app.delete("/products/:id",(req, res)=>{
    for(let i =0; i<products.length; i++){
        if(products[i].id === +req.params.id){
            products.splice(i,1);
            res.send(204);
            return;
        }
    }
    res.send(404);
})
app.get("/addresses",(req, res)=>{
    res.send(adresses);
})
app.get("/addresses/:id",(req, res)=>{
    let address =adresses.find(p => p.id === +req.params.id)
    if(address){
        res.send(address);
    }else{
        res.send(404); 
    }
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})