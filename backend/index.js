const express = require('express')
const cors = require("cors");
const { Client } = require('pg')
const axios = require("axios")
const bodyParser = require('body-parser')
const path = require("path")
const app = express()

app.use(cors())
app.use(bodyParser.json())
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Sample',
    password: 'root',
    port: 5432,
})

let basePath = __dirname.split("\\").slice(0, -1).join("\\")
console.log(`backend serving frontend build located at dir : ${path.join(basePath, 'frontend', 'build')}`)

app.use(express.static(path.join(basePath, 'frontend', 'build')))
// app.use('*', (req, res) => res.sendFile(path.join(basePath, 'frontend', 'build', 'index.html')));

client.connect(function (err) {
    if (err) throw err;

    console.log("Database Connected!")

    app.listen(3001, () => {
        console.log('server started at 3001');
    })


    app.get("/company/search/:name", async (req, res) => {

        axios.post('https://www.zaubacorp.com/custom-search', {
            "search": req.params.name,
            "filter": "company"
        }).then((response) => {
            console.log("/company/search/ : error in fetched result from external API");

            let data = response.data
            let sendResp = []

            let regexExp = /<div.*id="company\/(.*)">/gmi
            let regex = new RegExp(regexExp);

            match = regex.exec(data);

            while (match != null) {
                let companyDetail = match[1].split("/")
                sendResp.push({
                    company_name: companyDetail[0],
                    cin: companyDetail[1]
                })
                match = regex.exec(data);
            }
            res.setHeader("status", 200)
            res.send(sendResp)

        }).catch((err) => {
            console.log("/company/search/ : error in fetching result from API");
            console.log(err);
            res.setHeader("status", 500)
            res.send("Error in fetching & parsing data")
        })
    })

    app.get("/company/fetch-all", async (req, res) => {

        client.query(`Select * from Company`).then((result) => {

            console.log("/company/fetch-all : fetched result from database");
            res.send(result.rows)

        }).catch((err) => {
            console.log("/company/fetch-all : error in fetching result from database");
            console.log(err);
            res.setHeader("status", 500)
            res.send("Error in fetching all COmpany data")
        })
    })

    app.post("/company/add", async (req, res) => {
        let { cin, company_name } = req.body

        client.query(`Insert into Company (cin,company_name) values ('${cin}','${company_name}')`).then((result) => {
            console.log("/company/add : added new Company in DB");
            res.setHeader("status", 200)
            res.send("Data added")
        }).catch((err) => {
            console.log("/company/add : error in adding new Company in DB");
            console.log(err);
            res.setHeader("status", 500)
            res.send("Data already present !")
        })
    })
})
