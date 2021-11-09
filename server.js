const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const app = express()
const port = process.env.PORT || 3000;


const mongoURI = "mongodb+srv://admin-zvika:5293612@cluster0.krwkt.mongodb.net/atopic";


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

const patientSchema = new mongoose.Schema({
    PatientID: String,
    q2: String,
    q3: String,
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
            console.log(docs.length)
            console.log(docs[0].PatientID)
            res.render('results',{ID: docs[0].PatientID})
        }



    });

   

})
app.post('/', (req, res) => {
    
    console.log(req.body)
    var patient=new Patient({
        PatientID:req.body.question1,
            q2: req.body.question2,
            q3: req.body.question3,

    })
    
    patient.save()
    console.log(patient)
    res.send('ok thats amayzing')

})

app.listen(port, () => console.log(`Listening on port ${port}...`));