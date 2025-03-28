document.addEventListener('DOMContentLoaded', () => {
    // Navigation between sections
    const navLinks = document.querySelectorAll('.admin-nav a');
    const sections = document.querySelectorAll('.admin-content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.add('hidden');
            });
            
            // Show the selected section
            const sectionId = link.getAttribute('data-section') + '-section';
            document.getElementById(sectionId).classList.remove('hidden');
            
            // Update header title
            document.getElementById('admin-section-title').textContent = link.textContent.trim();
        });
    });
    
    // Logout functionality
    document.getElementById('logout').addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = 'index.html';
        }
    });
    
    // Preview functionality
    document.getElementById('preview-changes').addEventListener('click', () => {
        const modal = document.getElementById('previewModal');
        const oldContent = document.getElementById('old-content');
        const newContent = document.getElementById('new-content');
        
        // In a real implementation, this would compare current content with edited content
        oldContent.innerHTML = '<p>Current content would be displayed here...</p>';
        newContent.innerHTML = '<p>New edited content would be displayed here...</p>';
        
        modal.style.display = 'block';
    });
    
    // Save changes
    document.getElementById('confirm-save').addEventListener('click', () => {
        // In a real implementation, this would save to a database or GitHub
        alert('Changes saved successfully!');
        document.getElementById('previewModal').style.display = 'none';
    });
    
    // Cancel changes
    document.getElementById('cancel-changes').addEventListener('click', () => {
        document.getElementById('previewModal').style.display = 'none';
    });
    
    // Close modal with X button
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('previewModal').style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('previewModal')) {
            document.getElementById('previewModal').style.display = 'none';
        }
    });
    
    // File upload functionality
    document.getElementById('upload-images').addEventListener('click', () => {
        const fileInput = document.getElementById('image-upload');
        if (fileInput.files.length > 0) {
            // In a real implementation, this would upload to GitHub or a server
            alert(`${fileInput.files.length} image(s) selected for upload. In a real implementation, these would be uploaded to the GitHub repository.`);
        } else {
            alert('Please select at least one image to upload.');
        }
    });
    
    document.getElementById('upload-videos').addEventListener('click', () => {
        const fileInput = document.getElementById('video-upload');
        if (fileInput.files.length > 0) {
            // In a real implementation, this would upload to GitHub or a server
            alert(`${fileInput.files.length} video(s) selected for upload. In a real implementation, these would be uploaded to the GitHub repository.`);
        } else {
            alert('Please select at least one video to upload.');
        }
    });
    
    // Add new patriot
    document.getElementById('add-patriot').addEventListener('click', () => {
        const editor = document.getElementById('patriots-editor');
        const newPatriot = document.createElement('div');
        newPatriot.className = 'patriot-form';
        newPatriot.innerHTML = `
            <div class="form-group">
                <label>Name</label>
                <input type="text" placeholder="Patriot name">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea placeholder="Patriot description"></textarea>
            </div>
            <div class="form-group">
                <label>Image</label>
                <input type="file" accept="image/*">
            </div>
            <button class="btn remove-patriot"><i class="fas fa-trash"></i> Remove</button>
        `;
        editor.appendChild(newPatriot);
        
        // Add event listener to remove button
        newPatriot.querySelector('.remove-patriot').addEventListener('click', () => {
            editor.removeChild(newPatriot);
        });
    });
});
