import React from 'react';

// Assuming you have a folder `images` in your public directory with an example image `nfl-match.jpg`
const Dashboard = () => {
  return (
    <div>
      {/* Navbar */}
      <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', backgroundColor: '#333', color: '#fff'}}>
        <div style={{display: 'flex', gap: '20px'}}>
          <a href="/nfl-season-stats" style={{color: '#fff', textDecoration: 'none'}}>NFL Season Stats</a>
          <a href="/nfl-player-stats" style={{color: '#fff', textDecoration: 'none'}}>NFL Player Stats</a>
        </div>
        <div>
          <input type="search" placeholder="Search..." style={{padding: '5px'}} />
        </div>
        <div>
          <a href="/account" style={{color: '#fff', textDecoration: 'none'}}>Account</a>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{padding: '20px'}}>
        <h1>Current Season</h1>
        <div style={{textAlign: 'center'}}>
          <img src="/images/nfl-match.jpg" alt="NFL Team 1 vs Team 2" style={{width: '100%', maxWidth: '600px', height: 'auto'}} />
          <p>NFL Team 1 vs NFL Team 2</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 


// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>NFL Dashboard</title>
//     <link rel="stylesheet" href="style.css">
// </head>
// <body>

//     <nav>
//         <ul>
//             <li><a href="#nfl-season-stats">NFL Season Stats</a></li>
//             <li><a href="#nfl-player-stats">NFL Player Stats</a></li>
//             <li>
//                 <input type="search" placeholder="Search...">
//             </li>
//             <li><a href="#account">Account</a></li>
//         </ul>
//     </nav>

//     <main>
//         <section id="current-season">
//             <h1>Current Season</h1>
//             <!-- Placeholder for NFL Team 1 vs Team 2 image -->
//             <img src="nfl-team1-vs-team2-placeholder.jpg" alt="NFL Team 1 vs Team 2">
//         </section>
//     </main>

// </body>
// </html>

