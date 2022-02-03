require('./config/config')
require('./db')
import express from 'express';
import { mongoose } from './db';
// import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import _ from 'lodash';
import { CustomerModel } from './models';

const app = express();
const port = process.env.PORT || 3000;
const ObjectId = mongoose.Types.ObjectId;

// mongoose.connect(process.env.MONGODB_URI)
//     .then(result => console.log('Database connected', result))
//     .catch(error => console.log(error));

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World hey!');
});

app.get('/api/customers/:id', (req, res) => {
    var id = req.params.id;
    console.log(id)
    if (!ObjectId.isValid(id)) {
        return res.status(400).send();
    }

    CustomerModel.findById(id).then((customer) => {
        if (!customer) {
            return res.status(404).send();
        }

        res.send(customer);
    }).catch((err) => {
        res.status(400).send();
    });
});

app.get('/api/customers', async (req, res) => {
    CustomerModel.find({ FirstName: 'Emmanuel' }, (err, customers) => {
        if (err) {
            res.status(500).send(err);
            return;
        } else if (customers.length == 0) {
            res.status(404).send();
            return;
        }
        res.send(customers);
    });
});

app.post('/api/customers', (req, res) => {
    console.log(req.body)
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

    body['CustomerID'] = new mongoose.Types.ObjectId();
    var customer = new CustomerModel(body);
    // console.log(customer)

    customer.save().then((doc) => {
        console.log(doc)
        res.send(doc);
    }, (err) => {
        res.status(500).send(err);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.put('/api/customers/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectId.isValid(id)) {
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

    // CustomerModel.findOneAndUpdate({ CustomerID: id }, { $set: body }, { new: true }).then((customer) => {
    CustomerModel.findByIdAndUpdate(id, { $set: body }, { new: true }).then((customer) => {
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
    if (!ObjectId.isValid(id)) {
        return res.status(400).send();
    }

    // CustomerModel.findOneAndRemove({ CustomerID: id }).then((customer) => {
    CustomerModel.findByIdAndRemove(id).then((customer) => {
        if (!customer) {
            return res.status(404).send();
        }

        res.send(customer);
    }).catch((err) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
