<?php
<!DOCTYPE html>
<html>
<head>
    <title>Multiplication Table</title>
</head>
<body>

<h2>Enter a Number to Print its Multiplication Table</h2>

<form method="post">
    <label for="number">Number: </label>
    <input type="number" name="number" id="number" required>
    <input type="submit" value="Show Table">
</form>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $num = intval($_POST["number"]);

    echo "<h3>Multiplication Table of $num</h3>";
    echo "<ul>";
    for ($i = 1; $i <= 10; $i++) {
        $result = $num * $i;
        echo "<li>$num x $i = $result</li>";
    }
    echo "</ul>";
}
?>

</body>
</html>