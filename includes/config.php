
<?php
// Database Configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'username');
define('DB_PASS', 'password');
define('DB_NAME', 'matrubhumi_vandana');

// Site Configuration
define('SITE_NAME', 'Matru Bhumi Vandana Trust');
define('SITE_URL', 'https://www.matrubhumivandana.org');

// Admin Configuration
define('ADMIN_USER', 'admin');
define('ADMIN_PASS', 'securepassword');

// Create database connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset
$conn->set_charset("utf8");
?>
