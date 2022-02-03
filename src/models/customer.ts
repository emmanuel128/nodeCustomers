import validator from "validator";
import { Schema, model } from 'mongoose';

interface Customer {
    CustomerID: string;
    FirstName: string;
    LastName: string;
    Email: string;
}

const schema = new Schema<Customer>({
    CustomerID: { type: String, required: true, unique: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: {
        type: String, required: true,
        trim: true,
        minLength: 1,
        maxLength: 50,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not valid.'
        },
        Phone: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 10,
        },
        Address: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 50,
        },
        City: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 20,
        },
        State: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 2,
        },
        ZipCode: {
            type: String,
            required: true,
            minLength: 5,
            maxLength: 5,
        },
    }
});

const CustomerModel = model<Customer>('Customer', schema);

export { CustomerModel };
/*
var Customer = mongoose.model('Customer', {
    CustomerID: {
        type: String,
        required: true,
        unique: true,
    },
    FirstName: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 20,
    },
    Initial: {
        type: String,
        required: false,
        minLength: 1,
        maxLength: 1,
    },
    LastName: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 50,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not valid.'
        }
    },
    Phone: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 10,
    },
    Address: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50,
    },
    City: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 20,
    },
    State: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 2,
    },
    ZipCode: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 5,
    },
    // password: {
    //     type: String,
    //     required: true,
    //     minLength: 6
    // },
    // tokens: [{
    //     access: {
    //         type: String,
    //         required: true
    //     },
    //     token: {
    //         type: String,
    //         required: true
    //     }
    // }],
});
*/
