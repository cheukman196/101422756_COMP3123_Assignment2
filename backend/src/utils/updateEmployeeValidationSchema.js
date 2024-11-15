const updateEmployeeValidationSchema = {
    first_name: {
        optional: true,
        isString: {
            errorMessage: 'First name should be a string.'
        },
        notEmpty: {
            errorMessage: 'First name should not be empty.'
        }
    },

    last_name: {
        optional: true,
        isString: {
            errorMessage: 'Last name should be a string.'
        },
        notEmpty: {
            errorMessage: 'Last name should not be empty.'
        }
    },

    email: {
        optional: true,
        isString: {
            errorMessage: 'Email should be a string.'
        },
        isEmail: {
            errorMessage: 'Email not in proper format.'
        },
        notEmpty: {
            errorMessage: 'Email should not be empty.'
        }
    },

    position: {
        optional: true,
        isString: {
            errorMessage: 'Position should be a string.'
        },
        notEmpty: {
            errorMessage: 'Position should not be empty.'
        }
    },

    salary: {
        optional: true,
        isNumeric: {
            errorMessage: 'Salary should be a number.'
        }
    },

    date_of_joining: {
        optional: true,
        isDate: {
            errorMessage: 'Date of Joining should be a valid date format.'
        }
    },

    department: {
        optional: true,
        isString: {
            errorMessage: 'Department should be a string.'
        },
        notEmpty: {
            errorMessage: 'Department should not be empty.'
        }
    }


};

module.exports = updateEmployeeValidationSchema;