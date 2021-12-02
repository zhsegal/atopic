const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const app = express()
const port = process.env.PORT || 3000;


const mongoURI = "mongodb+srv://admin-zvika:5293612@cluster0.krwkt.mongodb.net/atopic";


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

const patientSchema = new mongoose.Schema({
    PatientID: String,
    AGE: Number,
    GENDER: String,
    Chornic_conditions:[{}],
    POEM1: Number,
    POEM2: Number,
    POEM3: Number,
    POEM4: Number,
    POEM5: Number,
    POEM6: Number,
    POEM7: Number,
    ACDT1: Number,
    ACDT2: Number,
    ACDT3: Number,
    ACDT4: Number,
    ACDT5: Number,
    ACDT6: Number,
    PRURITUS:Number
   
    

})

const Patient = mongoose.model("Patient", patientSchema)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    var poem = [
        { id: 'מה קורה אחי', a1: "טוב", a2:'רע',name:'POEM1' },
        { id: 'מה קורה בלך', a1: "חי", a2:'גע',name:'POEM2' },
        { id: 'מה קורה גבר', a1: "יייי", a2:'גגג',name:'POEM3' },
        { id: 'מה קורה גבר', a1: "יייי", a2:'גגג',name:'POEM4' },
        { id: 'מה קורה גבר', a1: "יייי", a2:'גגג',name:'POEM5' },
        { id: 'מה קורה גבר', a1: "יייי", a2:'גגג',name:'POEM6' },
        { id: 'מה קורה גבר', a1: "יייי", a2:'גגג',name:'POEM7' },
    ];

    var adct = [
        { id: 'מה קורה ggי', a1: "טוב", a2:'רע',name:'ACDT1' },
        { id: 'ggg קורה בלך', a1: "חי", a2:'גע',name:'ACDT2' },
        { id: 'מהggg קורה גבר', a1: "יייי", a2:'גגג',name:'ACDT3' },
        { id: 'מה קggורה גבר', a1: "יייי", a2:'גגג',name:'ACDT4' },
        { id: 'מה קggורה גבר', a1: "יייי", a2:'גגג',name:'ACDT5' },       
    ];
    res.render('home',{poem,adct})
});


app.post('/', (req, res) => {
    console.log(req.body)
    var patient=new Patient({
        PatientID:req.body.ID,
        AGE: req.body.AGE,
        GENDER: req.body.GENDER,
        Chornic_conditions: req.body.CHRONIC_CONDITIONS,
        POEM1: req.body.POEM1,
        POEM2: req.body.POEM2,
        POEM3: req.body.POEM3,
        POEM4: req.body.POEM4,
        POEM5: req.body.POEM5,
        POEM6: req.body.POEM6,
        POEM7: req.body.POEM7,
        ACDT1: req.body.ACDT1,
        ACDT2: req.body.ACDT2,
        ACDT3: req.body.ACDT3,
        ACDT4: req.body.ACDT4,
        ACDT5: req.body.ACDT5,
        ACDT6: req.body.ACDT6,
        PRURITUS:req.body.pruritus
       

    })
    

    patient.save()
    console.log('patient:')
    console.log(patient)
    res.send(req.body)

})


app.get('/dr', (req, res) => {
    res.sendFile('public/dr.html', { root: __dirname })
});

app.post('/dr', (req, res) => {
    var patID = req.body.ID   
    Patient.find({ PatientID: patID}, function (err, docs) {
        if (err) {
            res.send('error')}
        
        else if (docs.length == 0) {
            res.send('no such patient')
        }

        else{
            var poem_score=docs[0].POEM1+docs[0].POEM2+docs[0].POEM3+docs[0].POEM4+docs[0].POEM5+docs[0].POEM6+docs[0].POEM7
            var acdt_score=docs[0].ACDT1+docs[0].ACDT2+docs[0].ACDT3+docs[0].ACDT4+docs[0].ACDT5+docs[0].ACDT6


          
            console.log(docs[0].PatientID)
            res.render('results',
            {ID: docs[0].PatientID,
            AGE:docs[0].AGE,
            GENDER:docs[0].GENDER,
            PRURITUS:docs[0].PRURITUS,
            POEM: poem_score,
            ACDT: acdt_score

            
            })
        }



    });

   

})




app.listen(port, () => console.log(`Listening on port ${port}...`));