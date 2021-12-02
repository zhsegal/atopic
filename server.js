const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const app = express()
const port = process.env.PORT || 3000;


const mongoURI = "mongodb+srv://admin-zvika:5293612@cluster0.krwkt.mongodb.net/atopic";


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

const patientSchema = new mongoose.Schema({
    PatientID: String,    
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
        { id: '?בשבוע האחרון, במשך כמה ימים הרגשת גרד בעור בשל האקזמה',
         a1: "0", a2:'1-2',a3: '3-4',a4:'5-6', a5:'בכל יום',name:'POEM1' },
        { id: '?בשבוע האחרון, במשך כמה לילות התקשת לישון בשל האקזמה',
        a1: "0", a2:'1-2',a3: '3-4',a4:'5-6', a5:'בכל יום',name:'POEM2' },
        { id: '?בשבוע האחרון, במשך כמה ימים סבלת מדימום בשל האקזמה',
        a1: "0", a2:'1-2',a3: '3-4',a4:'5-6', a5:'בכל יום',name:'POEM3' },
        { id: '?בשבוע האחרון, במשך כמה ימים סבלת מהפרשות של נוזל צלול בשל האקזמה', 
        a1: "0", a2:'1-2',a3: '3-4',a4:'5-6', a5:'בכל יום',name:'POEM4' },
        { id: '?בשבוע האחרון, במשך כמה ימים סבלת מעור מחורץ בשל האקזמה',
        a1: "0", a2:'1-2',a3: '3-4',a4:'5-6', a5:'בכל יום',name:'POEM5' },
        { id: '?בשבוע האחרון, במשך כמה ימים סבלת מעור מתקלף בשל האקזמה',
        a1: "0", a2:'1-2',a3: '3-4',a4:'5-6', a5:'בכל יום',name:'POEM6' },
        { id: '?בשבוע האחרון, במשך כמה ימים סבלת מעור יבש בשל האקזמה',
        a1: "0", a2:'1-2',a3: '3-4',a4:'5-6', a5:'בכל יום',name:'POEM7' },
    ];

    var adct = [
        { id: 'במהלך השבוע האחרון, כיצד היית מדרג את התסמינים הקשורים לאקזמה שלך - לדוגמה גרד, עור יבש, פריחה בעור',
         a1: "אין כלל", a2:'קלים',a3: 'מתונים',a4:'חמורים', a5:'חמורים מאוד',name:'ACDT1' },
        { id: 'במהלך השבוע האחרון, בכמה מן הימים היו לך אירועים אינטנסיביים של גרד בשל האקזמה שלך',
         a1: "כלל לא", a2:'1-2',a3: '3-4',a4:'5-6', a5:'כל יום',name:'ACDT2' },
        { id: '?במהלך השבוע האחרון, עד כמה היית מוטרד בשל האקזמה שלך', 
        a1: "כלל לא", a2:'במידה מועטה',a3: 'במידה בינונית',a4:'במידה רבה', a5:'במידה רבה מאוד',name:'ACDT3' },
        { id: 'במהלך השבוע האחרון, בכמה מן הלילות התקשית להירדם או להישאר ישן בשל האקזמה שלך',
        a1: "אף לילה", a2:'1-2',a3: '3-4',a4:'5-6', a5:'כל לילה',name:'ACDT4' },
        { id: 'במהלך השבוע האחרון, עד כמה השפיעה האקזמה שלך על פעילויותיך היומיומיות',
        a1: "כלל לא", a2:'במידה מועטה',a3: 'במידה בינונית',a4:'במידה רבה', a5:'במידה רבה מאוד',name:'ACDT5' },
        { id: 'במהלך השבוע האחרון, עד כמה השפיעה האקזמה שלך על מצב הרוח שלך או רגשותיך',
        a1: "כלל לא", a2:'במידה מועטה',a3: 'במידה בינונית',a4:'במידה רבה', a5:'במידה רבה מאוד',name:'ACDT6' },       
    ];
    res.render('home',{poem,adct})
});


app.post('/', (req, res) => {
    console.log(req.body)
    var patient=new Patient({
        PatientID:req.body.ID,        
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
    res.send(patient)

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