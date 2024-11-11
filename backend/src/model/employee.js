const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    "first_name": {type: String, required: true },
    "last_name": {type: String, required: true },
    "email": {type: String, required: true },
    "position": {type: String, default: "N/A"},
    "salary": {type: Number, default: 0},
    "date_of_joining": {type: Date, default: Date.now},
    "department": {type: String, default: "N/A"},
    "created_at": {type: Date, default: Date.now},
    "updated_at": {type: Date, default: Date.now}
})

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;

