var router = require('express').Router();
var TYPES = require('tedious').TYPES;

/* GET task listing. */
router.get('/admin', function (req, res) {

    req.sql("Select Top 1000 * From [Admin.Log] order by Zeit DESC for json path")
        .into(res.type('json'), '[]');

});

/* GET single task. */
router.get('/mitglied/:id', function (req, res) {
    
    req.sql("Select * From [Mitglieder.Mitglieder] where ID = @id for json path, without_array_wrapper")
        .param('id', req.params.id, TYPES.Int)
        .into(res.type('json'), '{}');

});
/* GET single task. */
router.get('/gutscheine/:id', function (req, res) {

    req.sql("Select * From Web_View_Dienste Where MitgliederID = @id for json path, without_array_wrapper")
        .param('id', req.params.id, TYPES.Int)
        .into(res.type('json'), '{}');

});
/* POST create task. *//*
router.post('/', function (req, res) {
    
    req.sql("exec createTodo @dd")
        .param('dd', req.body, TYPES.NVarChar)
        .exec(res);

});
*/
/* PUT update task. *//*
router.put('/:id', function (req, res) {
    
    req.sql("exec updateTodo @id, @dd")
        .param('id', req.params.id, TYPES.Int)
        .param('dd', req.body, TYPES.NVarChar)
        .exec(res);

});*/

/* DELETE single task. *//*
router.delete('/:id', function (req, res) {
    
    req.sql("delete from table where id = @id")
        .param('id', req.params.id, TYPES.Int)
        .exec(res);

});
*/
module.exports = router;