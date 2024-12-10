document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('resumeForm');
    const previewContent = document.getElementById('previewContent');
    const printBtn = document.getElementById('printBtn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const objective = document.getElementById('objective').value;
        const experience = document.getElementById('experience').value.split('|').map(exp => exp.trim());
        const education = document.getElementById('education').value.split('|').map(edu => edu.trim());
        const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());

        const resumeHTML = `
            <h2>${name}</h2>
            <p>${address} | ${phone} | ${email}</p>
            
            <h3>Career Objective</h3>
            <p>${objective}</p>
            
            <h3>Work Experience</h3>
            <ul>
                ${experience.map(exp => `<li>${exp}</li>`).join('')}
            </ul>
            
            <h3>Education</h3>
            <ul>
                ${education.map(edu => `<li>${edu}</li>`).join('')}
            </ul>
            
            <h3>Skills</h3>
            <p>${skills.join(', ')}</p>
        `;

        previewContent.innerHTML = resumeHTML;
        printBtn.style.display = 'block';
    });

    printBtn.addEventListener('click', function() {
        window.print();
    });

    // Add real-time preview update
    const formInputs = form.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    function updatePreview() {
        const name = document.getElementById('name').value || 'Your Name';
        const email = document.getElementById('email').value || 'email@example.com';
        const phone = document.getElementById('phone').value || '(123) 456-7890';
        const address = document.getElementById('address').value || 'City, State';
        const objective = document.getElementById('objective').value || 'Your career objective...';
        const experience = document.getElementById('experience').value.split('|').map(exp => exp.trim());
        const education = document.getElementById('education').value.split('|').map(edu => edu.trim());
        const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());

        const resumeHTML = `
            <h2>${name}</h2>
            <p>${address} | ${phone} | ${email}</p>
            
            <h3>Career Objective</h3>
            <p>${objective}</p>
            
            <h3>Work Experience</h3>
            <ul>
                ${experience.map(exp => `<li>${exp || 'Work experience...'}</li>`).join('')}
            </ul>
            
            <h3>Education</h3>
            <ul>
                ${education.map(edu => `<li>${edu || 'Education...'}</li>`).join('')}
            </ul>
            
            <h3>Skills</h3>
            <p>${skills.join(', ') || 'Your skills...'}</p>
        `;

        previewContent.innerHTML = resumeHTML;
        printBtn.style.display = 'block';
    }

    // Initial preview
    updatePreview();
});

