const router = require('express').Router();
let Payment = require('../models/payment.model');

router.route('/').get((req,res) => {
    Payment.find()
        .then(payment => res.json(payment))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/add').post((req,res) => {
    const year = Number(req.body.year);
    const month = Number(req.body.month);
    const day = Number(req.body.day);
    const reason = req.body.reason;
    const amount = Number(req.body.amount);
    const issuedPerson = req.body.issuedPerson;
    

    const newPayment = new Payment({
        year,
        month,
        day,
        reason,
        amount,
        issuedPerson,
       
    });
    newPayment.save()
        .then(() => res.json('New Payment added!'))
        .catch(err => res.status(400).json('Error : ' +err));
});
router.route('/:id').get((req,res) => {
    Payment.findById(req.params.id)
        .then(payment => res.json(payment))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/:id').delete((req,res) => {
    Payment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Payment deleted'))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/update/:id').post((req,res) => {
    Payment.findById(req.params.id)
        .then(payment => {
            payment.year = Number(req.body.year);
            payment.month = Number(req.body.month);
            payment.day = Number(req.body.day);
            payment.reason = req.body.reason;
            payment.amount = Number(req.body.amount);
            payment.issuedPerson = req.body.issuedPerson;

            payment.save()
                .then(() => res.json('Payment updated'))
                .catch(err => res.status(400).json('Error : ' +err));
        })

        .catch(err => res.status(400).json('Error : ' +err));
});
module.exports = router;

