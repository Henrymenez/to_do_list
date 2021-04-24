<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Class Exercise</title>
    <link type="text/css" rel="stylesheet" href="datetimepicker-master/build/jquery.datetimepicker.min.css" />

</head>
<style>
    *{
        box-sizing: border-box;
    }
</style>
<body>

<h1 align="center">Dom Excercise</h1>

<div style="width: 60%; margin-left: 20%; margin-right: 20%; float: left;margin-bottom: 10px;">

    <input id="main_input" style="height: 40px; width: 30%; float: left; border: 1px solid #3333;" placeholder="Title" />
    <input id="start_date" style="height: 40px; width: 20%; float: left; border: 1px solid #3333;" placeholder="Start Date" />
    <input id="end_date" style="height: 40px; width: 20%; float: left; border: 1px solid #3333;" placeholder="End Date" />
    <button id="main_button" onclick="submitData()" style="height: 40px; width: 30%; float: left; " type="button" >Submit</button>

</div>

<div style="width: 60%; margin-left: 20%; margin-right: 20%; padding: 20px 5%; float: left; background-color: #dddddd;">

    <table  style=" #333333; width: 100%;border:1px">
        <thead>
        <tr>
            <th>S/N</th>
            <th>Text</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Delete</th>
            <th>Edit</th>
            <th>Update Status</th>
        </tr>
        </thead>
        <tbody id="main_tb_body" style="align:center">

        </tbody>
    </table>

</div>

</body>
<script src="javascript/jquery.js" type="text/javascript"></script>
<script src="javascript/main_js.js" type="text/javascript"></script>
<script src="datetimepicker-master/js/jquery.datetimepicker.full.js"></script>
<script>
    $('#start_date').datetimepicker({
        format:'Y-m-d H:i:s',
        step:05,
        theme:'dark',
        timepicker:true,
        datepicker:true
    });
    $('#end_date').datetimepicker({
        format:'Y-m-d H:i:s',
        step:05,
        theme:'dark',
        timepicker:true
    });
</script>
</html>
