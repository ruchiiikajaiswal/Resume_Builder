document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('resumeForm');
    const printBtn = document.getElementById('printBtn');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        updateResume();
    });

    printBtn.addEventListener('click', function() {
        window.print();
    });

    function updateResume() {
        // Update name and title
        document.getElementById('resumeName').textContent = document.getElementById('name').value;
        document.getElementById('resumeTitle').textContent = document.getElementById('title').value;

        // Update profile photo
        const photoUrl = document.getElementById('photoUrl').value;
        document.getElementById('profilePhoto').src = photoUrl || '/placeholder.svg?height=200&width=200';

        // Update contact info
        document.getElementById('contactEmail').textContent = document.getElementById('email').value;
        document.getElementById('contactPhone').textContent = document.getElementById('phone').value;
        document.getElementById('contactLocation').textContent = document.getElementById('location').value;
        document.getElementById('contactLinkedin').textContent = document.getElementById('linkedin').value;

        // Update summary
        document.getElementById('resumeSummary').textContent = document.getElementById('summary').value;

        // Update skills
        const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
        const skillTags = document.getElementById('skillTags');
        skillTags.innerHTML = '';
        skills.forEach(skill => {
            const span = document.createElement('span');
            span.textContent = skill;
            skillTags.appendChild(span);
        });

        // Update education
        const educationContent = document.getElementById('educationContent');
        educationContent.innerHTML = `<h4>${document.getElementById('education').value}</h4>`;

        // Update languages
        const languages = document.getElementById('languages').value.split(',').map(lang => lang.trim());
        const languagesContent = document.getElementById('languagesContent');
        languagesContent.innerHTML = '';
        languages.forEach(lang => {
            const div = document.createElement('div');
            div.className = 'language-item';
            div.textContent = lang;
            languagesContent.appendChild(div);
        });

        // Update interests
        const interests = document.getElementById('interests').value.split(',').map(interest => interest.trim());
        const interestsContent = document.getElementById('interestsContent');
        interestsContent.innerHTML = '';
        interests.forEach(interest => {
            const div = document.createElement('div');
            div.className = 'interest-item';
            div.innerHTML = `<i class="fas fa-star"></i><span>${interest}</span>`;
            interestsContent.appendChild(div);
        });
    }
});

