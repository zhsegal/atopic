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
    ACDT6: Number
   
    

})

const Patient = mongoose.model("Patient", patientSchema)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    
    res.sendFile('public/index.html', { root: __dirname })
});

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
            
            console.log(docs.length)
            console.log(docs[0].PatientID)
            res.render('results',
            {ID: docs[0].PatientID,
            AGE:docs[0].AGE,
            GENDER:docs[0].GENDER,
            CONDITIONS:docs[0].Chornic_conditions,
            POEM: poem_score

            
            })
        }



    });

   

})
app.post('/', (req, res) => {
   
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
        ACDT6: req.body.ACDT6
       

    })
    

    patient.save()
    console.log(patient)
    res.send('ok thats amayzing')

})

app.listen(port, () => console.log(`Listening on port ${port}...`));