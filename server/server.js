require('./config/config');

const _ = require('lodash');
var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
var { Customer } = require('../models/customer');
var { mongoose } = require('./db/mongoose');

const PORT = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/api/customers', (req, res) => {
    Customer.find((err, customers) => {
        if (err) {
            return res.status(500).send(err);
        } else if (customers.length == 0) {
            return res.status(404).send();
        }
        res.send(customers);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/api/customers/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }

    // Customer.findById(id).then((customer) => {
    Customer.findOne({ CustomerID: id }).then((customer) => {
        if (!customer) {
            return res.status(404).send();
        }

        res.send(customer);
    }).catch((err) => {
        res.status(400).send();
    });
});

app.post('/api/customers', (req, res) => {
    var body = _.pick(req.body,
        ['FirstName',
            'Initial',
            'LastName',
            'Email',
            'Phone',
            'Address',
            'City',
            'State',
            'ZipCode',
        ]);

    body.CustomerID = new ObjectID();
    var customer = new Customer(body);
    customer.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(500).send(err);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.put('/api/customers/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }

    var body = _.pick(req.body,
        [
            'FirstName',
            'Initial',
            'LastName',
            'Email',
            'Phone',
            'Address',
            'City',
            'State',
            'ZipCode',
        ]);

    // Customer.findByIdAndUpdate(id, { $set: body }, { new: true }).then((customer) => {
    Customer.findOneAndUpdate({ CustomerID: id }, { $set: body }, { new: true }).then((customer) => {
        if (!customer) {
            return res.status(404).send();
        }
        res.send(customer);
    }, (err) => {
        res.status(500).send(err);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.delete('/api/customers/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }

    // Customer.findByIdAndRemove(id).then((customer) => {
    Customer.findOneAndRemove({ CustomerID: id }).then((customer) => {
        if (!customer) {
            return res.status(404).send();
        }

        res.send(customer);
    }).catch((err) => {
        res.status(400).send();
    });
});

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});

module.exports = { app };