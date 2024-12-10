document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('resumeForm');
    const previewContent = document.getElementById('previewContent');
    const printBtn = document.getElementById('printBtn');
    const addExperienceBtn = document.getElementById('addExperience');
    const addSkillBtn = document.getElementById('addSkill');
    let photoDataUrl = '';

    // Handle photo upload
    document.getElementById('photo').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                photoDataUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Add experience field
    function addExperienceField() {
        const experienceFields = document.getElementById('experienceFields');
        const newExperience = document.createElement('div');
        newExperience.className = 'experience-entry';
        newExperience.innerHTML = `
            <input type="text" class="company" placeholder="Company Name" required>
            <input type="text" class="position" placeholder="Position" required>
            <input type="text" class="dates" placeholder="January 2015 - Present" required>
            <textarea class="responsibilities" placeholder="• Key responsibilities and achievements" required></textarea>
        `;
        experienceFields.appendChild(newExperience);
    }

    // Add skill field
    function addSkillField() {
        const skillsFields = document.getElementById('skillsFields');
        const newSkill = document.createElement('div');
        newSkill.className = 'skill-entry';
        newSkill.innerHTML = `
            <input type="text" class="skill-name" placeholder="Skill" required>
            <input type="range" class="skill-level" min="0" max="100" value="50">
        `;
        skillsFields.appendChild(newSkill);
    }

    // Add initial experience and skill fields
    addExperienceField();
    addSkillField();

    // Event listeners for adding more fields
    addExperienceBtn.addEventListener('click', addExperienceField);
    addSkillBtn.addEventListener('click', addSkillField);

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const experienceEntries = Array.from(document.querySelectorAll('.experience-entry')).map(entry => ({
            company: entry.querySelector('.company').value,
            position: entry.querySelector('.position').value,
            dates: entry.querySelector('.dates').value,
            responsibilities: entry.querySelector('.responsibilities').value.split('\n').map(item => item.trim()).filter(Boolean)
        }));

        const skillEntries = Array.from(document.querySelectorAll('.skill-entry')).map(entry => ({
            name: entry.querySelector('.skill-name').value,
            level: entry.querySelector('.skill-level').value
        }));

        const resumeHTML = `
            <div class="preview-header">
                ${photoDataUrl ? `<img src="${photoDataUrl}" alt="Profile Photo" class="profile-photo">` : ''}
                <h1>${document.getElementById('name').value}</h1>
                <h2>${document.getElementById('title').value}</h2>
                <p>${document.getElementById('email').value} | ${document.getElementById('phone').value}</p>
                <p>${document.getElementById('address').value}</p>
            </div>
            <div class="main-content">
                <section>
                    <h3>Professional Summary</h3>
                    <p>${document.getElementById('summary').value}</p>
                </section>
                <section>
                    <h3>Professional Experience</h3>
                    ${experienceEntries.map(exp => `
                        <div class="experience-item">
                            <h4>${exp.position} at ${exp.company}</h4>
                            <p>${exp.dates}</p>
                            <ul>
                                ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </section>
                <section>
                    <h3>Education</h3>
                    <p><strong>${document.getElementById('degree').value}</strong></p>
                    <p>${document.getElementById('school').value}</p>
                    <p>${document.getElementById('eduDates').value}</p>
                </section>
                <section>
                    <h3>Skills</h3>
                    ${skillEntries.map(skill => `
                        <div class="skill-item">
                            <p>${skill.name}</p>
                            <div class="skill-bar">
                                <div class="skill-level" style="width: ${skill.level}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </section>
            </div>
        `;

        previewContent.innerHTML = resumeHTML;
        printBtn.style.display = 'block';
    });

    // Print functionality
    printBtn.addEventListener('click', function() {
        window.print();
    });
});

