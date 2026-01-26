(function() {
    const CORRECT_PASSWORD = 'Bobble';
    
    // Check if user has authenticated in this session
    if (!sessionStorage.getItem('authenticated')) {
        let attempts = 0;
        let password = '';
        
        // Allow up to 3 attempts
        while (attempts < 3) {
            password = prompt('Enter password to access this website:');
            
            // If user cancels, deny access
            if (password === null) {
                document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-size:24px;color:#666;">Access Denied</div>';
                throw new Error('Unauthorized access');
            }
            
            if (password === CORRECT_PASSWORD) {
                sessionStorage.setItem('authenticated', 'true');
                break;
            } else {
                attempts++;
                if (attempts < 3) {
                    alert(`Incorrect password. You have ${3 - attempts} attempts remaining.`);
                }
            }
        }
        
        // If all attempts exhausted
        if (password !== CORRECT_PASSWORD) {
            document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-size:24px;color:#666;">Access Denied - Too many incorrect attempts</div>';
            throw new Error('Unauthorized access - max attempts exceeded');
        }
    }
})();
