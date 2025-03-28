
<?php
session_start();
include '../includes/config.php';

if (!isset($_SESSION['admin_logged_in']) {
    header('Location: login.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - <?php echo SITE_NAME; ?></title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary-color: #d43f1e;
            --secondary-color: #f8b400;
            --dark-color: #1a1a2e;
            --light-color: #f8f9fa;
            --sidebar-width: 250px;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }
        
        body {
            display: flex;
            min-height: 100vh;
            background-color: #f5f5f5;
        }
        
        .sidebar {
            width: var(--sidebar-width);
            background: var(--dark-color);
            color: #fff;
            height: 100vh;
            position: fixed;
            transition: all 0.3s ease;
        }
        
        .sidebar-header {
            padding: 20px;
            background: rgba(0, 0, 0, 0.2);
            text-align: center;
        }
        
        .sidebar-header img {
            height: 50px;
        }
        
        .sidebar-menu {
            padding: 20px 0;
        }
        
        .sidebar-menu ul {
            list-style: none;
        }
        
        .sidebar-menu li {
            margin-bottom: 5px;
        }
        
        .sidebar-menu a {
            display: block;
            padding: 12px 20px;
            color: #fff;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .sidebar-menu a:hover, .sidebar-menu a.active {
            background: var(--primary-color);
        }
        
        .sidebar-menu i {
            margin-right: 10px;
            width: 20px;
            text-align: center;
        }
        
        .main-content {
            margin-left: var(--sidebar-width);
            width: calc(100% - var(--sidebar-width));
            padding: 20px;
            transition: all 0.3s ease;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            background: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }
        
        .user-info {
            display: flex;
            align-items: center;
        }
        
        .user-info img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
        }
        
        .logout-btn {
            background: var(--primary-color);
            color: #fff;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .logout-btn:hover {
            background: var(--secondary-color);
        }
        
        .cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .card {
            background: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .card-title {
            font-size: 1.2rem;
            color: var(--dark-color);
        }
        
        .card-icon {
            width: 50px;
            height: 50px;
            background: rgba(212, 63, 30, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary-color);
            font-size: 1.5rem;
        }
        
        .card-body h3 {
            font-size: 2rem;
            color: var(--primary-color);
            margin-bottom: 10px;
        }
        
        .card-body p {
            color: #666;
        }
        
        .recent-activity {
            background: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .activity-title {
            font-size: 1.3rem;
            margin-bottom: 20px;
            color: var(--dark-color);
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
        }
        
        .activity-item {
            display: flex;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }
        
        .activity-icon {
            width: 40px;
            height: 40px;
            background: rgba(212, 63, 30, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            color: var(--primary-color);
        }
        
        .activity-content h4 {
            font-size: 1rem;
            margin-bottom: 5px;
        }
        
        .activity-content p {
            color: #666;
            font-size: 0.9rem;
        }
        
        .activity-time {
            color: #999;
            font-size: 0.8rem;
        }
        
        @media (max-width: 768px) {
            .sidebar {
                width: 0;
                overflow: hidden;
            }
            
            .main-content {
                margin-left: 0;
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <!-- Sidebar -->
    <div class="sidebar">
        <div class="sidebar-header">
            <img src="../assets/images/logo.png" alt="<?php echo SITE_NAME; ?>">
        </div>
        
        <div class="sidebar-menu">
            <ul>
                <li><a href="dashboard.php" class="active"><i class="fas fa-home"></i> Dashboard</a></li>
                <li><a href="pages/"><i class="fas fa-file-alt"></i> Pages</a></li>
                <li><a href="events/"><i class="fas fa-calendar-alt"></i> Events</a></li>
                <li><a href="gallery/"><i class="fas fa-images"></i> Gallery</a></li>
                <li><a href="donations/"><i class="fas fa-donate"></i> Donations</a></li>
                <li><a href="settings/"><i class="fas fa-cog"></i> Settings</a></li>
                <li><a href="logout.php"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
            </ul>
        </div>
    </div>
    
    <!-- Main Content -->
    <div class="main-content">
        <div class="header">
            <h2>Dashboard</h2>
            <div class="user-info">
                <img src="https://via.placeholder.com/40" alt="Admin">
                <form action="logout.php" method="POST">
                    <button type="submit" class="logout-btn">Logout</button>
                </form>
            </div>
        </div>
        
        <div class="cards">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Total Donations</h3>
                    <div class="card-icon">
                        <i class="fas fa-donate"></i>
                    </div>
                </div>
                <div class="card-body">
                    <h3>₹1,25,000</h3>
                    <p>This Month</p>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Upcoming Events</h3>
                    <div class="card-icon">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                </div>
                <div class="card-body">
                    <h3>3</h3>
                    <p>Events Scheduled</p>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Website Visitors</h3>
                    <div class="card-icon">
                        <i class="fas fa-users"></i>
                    </div>
                </div>
                <div class="card-body">
                    <h3>1,245</h3>
                    <p>This Month</p>
                </div>
            </div>
        </div>
        
        <div class="recent-activity">
            <h3 class="activity-title">Recent Activity</h3>
            
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-donate"></i>
                </div>
                <div class="activity-content">
                    <h4>New Donation Received</h4>
                    <p>₹5,000 from Rajesh Patel</p>
                    <span class="activity-time">2 hours ago</span>
                </div>
            </div>
            
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-user"></i>
                </div>
                <div class="activity-content">
                    <h4>New Volunteer Registered</h4>
                    <p>Priya Sharma wants to join as volunteer</p>
                    <span class="activity-time">5 hours ago</span>
                </div>
            </div>
            
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-envelope"></i>
                </div>
                <div class="activity-content">
                    <h4>New Contact Message</h4>
                    <p>From Amit Kumar regarding event participation</p>
                    <span class="activity-time">1 day ago</span>
                </div>
            </div>
            
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-calendar-check"></i>
                </div>
                <div class="activity-content">
                    <h4>Event Created</h4>
                    <p>Janta Raja Natak 2025 added to events</p>
                    <span class="activity-time">2 days ago</span>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
