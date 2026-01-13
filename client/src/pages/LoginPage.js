import React from 'react';
import LogIn from '../components/LogIn';  
function LoginPage() {   // Renamed the page component
  return (
    <>
      <div className='nav-spacer'></div>
      <LogIn />   {/* Component rendering */}
    </>
  );
}

export default LoginPage;  // Also rename export