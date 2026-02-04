// ====================================
// SPeCtrum Survey - Complete Implementation
// ====================================

// Configuration
const JSONBIN_API_KEY = '$2a$10$awYpM0XtkqmGtzsmzoLBVePYLjVDUkziVThPKwyD3FJHHhPRcKCjy';
const JSONBIN_BIN_ID = 'YOUR_BIN_ID_HERE'; // Will be created automatically on first submission

// Page navigation
let currentPage = 0;
const totalPages = 6; // Welcome, S, P-BFI, P-PVQ, C, Complete

// Survey data storage
const surveyData = {
    timestamp: null,
    social_identity: {},
    personal_identity: {
        bfi: {},
        pvq: {}
    },
    life_context: {
        loves: [],
        hates: [],
        routines: {}
    }
};

// Questionnaire data (will be loaded from JSON files)
let socialIdentityData = null;
let personalIdentityData = null;
let lifeContextData = null;

// ====================================
// Initialization
// ====================================

document.addEventListener('DOMContentLoaded', async function() {
    console.log('SPeCtrum Survey initialized');

    // Load questionnaire data
    await loadQuestionnaireData();

    // Setup UI
    setupConsentCheckbox();
    setupCharacterCounters();
    updateProgress();

    // Restore draft if exists
    restoreDraft();
});

// ====================================
// Load Questionnaire Data from JSON
// ====================================

async function loadQuestionnaireData() {
    try {
        // Load Social Identity questions
        const socialResponse = await fetch('questionnaires/social_identity_en.json');
        socialIdentityData = await socialResponse.json();

        // Load Personal Identity questions (BFI + PVQ)
        const personalResponse = await fetch('questionnaires/personal_identity_en.json');
        personalIdentityData = await personalResponse.json();

        // Load Life Context questions
        const lifeResponse = await fetch('questionnaires/life_context_en.json');
        lifeContextData = await lifeResponse.json();

        // Generate question HTML
        generateSocialIdentityQuestions();
        generateBFIQuestions();
        generatePVQQuestions();

        console.log('Questionnaire data loaded successfully');
    } catch (error) {
        console.error('Error loading questionnaire data:', error);
        alert('Error loading survey questions. Please refresh the page.');
    }
}

// ====================================
// Generate Questions Dynamically
// ====================================

function generateSocialIdentityQuestions() {
    const container = document.getElementById('social-identity-questions');
    if (!container || !socialIdentityData) return;

    let html = '';

    socialIdentityData.questions.forEach((q, index) => {
        html += `<div class="question-block" data-question-id="${q.id}">`;
        html += `<label class="question-label">`;
        html += `<span class="question-number">${index + 1}.</span> ${q.question}`;
        if (q.hint) {
            html += `<span class="hint-text">${q.hint}</span>`;
        }
        html += `</label>`;

        // Generate input based on type
        if (q.type === 'text') {
            html += `<input type="text" id="${q.id}" name="${q.id}" class="text-input" placeholder="${q.hint || ''}">`;
        } else if (q.type === 'select') {
            html += `<select id="${q.id}" name="${q.id}" class="select-input">`;
            html += `<option value="">-- Select an option --</option>`;
            q.options.forEach(option => {
                html += `<option value="${option}">${option}</option>`;
            });
            html += `</select>`;
        } else if (q.type === 'multiselect') {
            html += `<div class="checkbox-group" id="${q.id}-group">`;
            q.options.forEach((option, i) => {
                html += `<label class="checkbox-label">`;
                html += `<input type="checkbox" name="${q.id}" value="${option}">`;
                html += `<span>${option}</span>`;
                html += `</label>`;
            });
            html += `</div>`;
        }

        html += `</div>`;
    });

    container.innerHTML = html;
}

function generateBFIQuestions() {
    const container = document.getElementById('bfi-questions');
    if (!container || !personalIdentityData) return;

    const bfiSection = personalIdentityData.sections.find(s => s.id === 'bfi_2_s');
    if (!bfiSection) return;

    let html = '';

    bfiSection.questions.forEach((q, index) => {
        html += `<div class="question-block likert-question">`;
        html += `<div class="question-text">`;
        html += `<span class="question-number">${index + 1}.</span> ${q.text}`;
        html += `</div>`;
        html += `<div class="likert-scale">`;

        for (let i = 1; i <= 7; i++) {
            html += `<label class="likert-option">`;
            html += `<input type="radio" name="${q.id}" value="${i}" required>`;
            html += `<span class="likert-number">${i}</span>`;
            html += `</label>`;
        }

        html += `</div>`;
        html += `</div>`;
    });

    container.innerHTML = html;
}

function generatePVQQuestions() {
    const container = document.getElementById('pvq-questions');
    if (!container || !personalIdentityData) return;

    const pvqSection = personalIdentityData.sections.find(s => s.id === 'pvq');
    if (!pvqSection) return;

    let html = '';

    pvqSection.questions.forEach((q, index) => {
        html += `<div class="question-block likert-question">`;
        html += `<div class="question-text">`;
        html += `<span class="question-number">${index + 1}.</span> ${q.text}`;
        html += `</div>`;
        html += `<div class="likert-scale">`;

        for (let i = 1; i <= 7; i++) {
            html += `<label class="likert-option">`;
            html += `<input type="radio" name="${q.id}" value="${i}" required>`;
            html += `<span class="likert-number">${i}</span>`;
            html += `</label>`;
        }

        html += `</div>`;
        html += `</div>`;
    });

    container.innerHTML = html;
}

// ====================================
// Consent Handling
// ====================================

function setupConsentCheckbox() {
    const consentCheckbox = document.getElementById('consent');
    const startBtn = document.getElementById('startBtn');

    if (consentCheckbox && startBtn) {
        consentCheckbox.addEventListener('change', function() {
            startBtn.disabled = !this.checked;
        });
    }
}

function startSurvey() {
    nextPage();
}

// ====================================
// Character Counters
// ====================================

function setupCharacterCounters() {
    const weekdayTextarea = document.getElementById('weekday_routine');
    const weekendTextarea = document.getElementById('weekend_routine');

    if (weekdayTextarea) {
        weekdayTextarea.addEventListener('input', function() {
            updateCharCount(this, 'weekdayCount');
        });
    }

    if (weekendTextarea) {
        weekendTextarea.addEventListener('input', function() {
            updateCharCount(this, 'weekendCount');
        });
    }
}

function updateCharCount(textarea, counterId) {
    const count = textarea.value.length;
    const counter = document.getElementById(counterId);

    if (counter) {
        counter.textContent = `${count} / 450 characters`;

        if (count < 450) {
            counter.classList.add('warning');
        } else {
            counter.classList.remove('warning');
        }
    }
}

// ====================================
// Page Navigation
// ====================================

function nextPage() {
    if (currentPage < totalPages - 1) {
        // Save current page data
        savePageData(currentPage);

        // Hide current page
        document.getElementById(`page-${currentPage}`).classList.remove('active');

        // Show next page
        currentPage++;
        const nextPageEl = document.getElementById(`page-${currentPage}`) || document.getElementById('page-complete');
        nextPageEl.classList.add('active');

        // Update progress
        updateProgress();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function prevPage() {
    if (currentPage > 0) {
        // Save current page data
        savePageData(currentPage);

        // Hide current page
        const currentPageEl = document.getElementById(`page-${currentPage}`) || document.getElementById('page-complete');
        currentPageEl.classList.remove('active');

        // Show previous page
        currentPage--;
        document.getElementById(`page-${currentPage}`).classList.add('active');

        // Update progress
        updateProgress();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updateProgress() {
    const progress = (currentPage / (totalPages - 1)) * 100;
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    if (progressFill) {
        progressFill.style.width = progress + '%';
    }

    if (progressText) {
        progressText.textContent = Math.round(progress) + '%';
    }
}

// ====================================
// Data Collection
// ====================================

function savePageData(pageNum) {
    switch(pageNum) {
        case 1: // Social Identity
            saveSocialIdentityData();
            break;
        case 2: // BFI
            saveBFIData();
            break;
        case 3: // PVQ
            savePVQData();
            break;
        case 4: // Life Context
            saveLifeContextData();
            break;
    }
}

function saveSocialIdentityData() {
    if (!socialIdentityData) return;

    socialIdentityData.questions.forEach(q => {
        if (q.type === 'multiselect') {
            // Collect all checked values
            const checkboxes = document.querySelectorAll(`input[name="${q.id}"]:checked`);
            surveyData.social_identity[q.id] = Array.from(checkboxes).map(cb => cb.value);
        } else {
            const element = document.getElementById(q.id) || document.querySelector(`input[name="${q.id}"]:checked`) || document.querySelector(`select[name="${q.id}"]`);
            if (element) {
                surveyData.social_identity[q.id] = element.value || '';
            }
        }
    });
}

function saveBFIData() {
    if (!personalIdentityData) return;

    const bfiSection = personalIdentityData.sections.find(s => s.id === 'bfi_2_s');
    if (!bfiSection) return;

    bfiSection.questions.forEach(q => {
        const selected = document.querySelector(`input[name="${q.id}"]:checked`);
        if (selected) {
            surveyData.personal_identity.bfi[q.code || q.id] = parseInt(selected.value);
        }
    });
}

function savePVQData() {
    if (!personalIdentityData) return;

    const pvqSection = personalIdentityData.sections.find(s => s.id === 'pvq');
    if (!pvqSection) return;

    pvqSection.questions.forEach(q => {
        const selected = document.querySelector(`input[name="${q.id}"]:checked`);
        if (selected) {
            surveyData.personal_identity.pvq[q.code || q.id] = parseInt(selected.value);
        }
    });
}

function saveLifeContextData() {
    surveyData.life_context = {
        loves: [
            document.getElementById('love_1')?.value || '',
            document.getElementById('love_2')?.value || '',
            document.getElementById('love_3')?.value || '',
            document.getElementById('love_4')?.value || '',
            document.getElementById('love_5')?.value || ''
        ],
        hates: [
            document.getElementById('hate_1')?.value || '',
            document.getElementById('hate_2')?.value || '',
            document.getElementById('hate_3')?.value || '',
            document.getElementById('hate_4')?.value || '',
            document.getElementById('hate_5')?.value || ''
        ],
        routines: {
            weekday: document.getElementById('weekday_routine')?.value || '',
            weekend: document.getElementById('weekend_routine')?.value || ''
        }
    };
}

// ====================================
// Survey Submission
// ====================================

async function submitSurvey() {
    // Save final page data
    savePageData(currentPage);

    // Add timestamp
    surveyData.timestamp = new Date().toISOString();

    // Validate data
    if (!validateSurveyData()) {
        alert('Please complete all required fields.');
        return;
    }

    // Store in localStorage as backup
    localStorage.setItem('spectrum_survey_data', JSON.stringify(surveyData));

    // Submit to JSONBin.io
    const submitted = await submitToJSONBin(surveyData);

    if (submitted) {
        console.log('Survey submitted successfully to JSONBin.io');
        // Clear draft
        localStorage.removeItem('spectrum_survey_draft');
    } else {
        console.warn('Failed to submit to JSONBin.io, data saved locally');
    }

    // Go to completion page
    document.getElementById(`page-${currentPage}`).classList.remove('active');
    document.getElementById('page-complete').classList.add('active');
    currentPage = totalPages - 1;
    updateProgress();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function submitToJSONBin(data) {
    // Check if API key is configured
    if (JSONBIN_API_KEY === 'YOUR_API_KEY_HERE') {
        console.warn('JSONBin API key not configured');
        return false;
    }

    try {
        const response = await fetch('https://api.jsonbin.io/v3/b', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_API_KEY,
                'X-Bin-Private': 'true'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Data submitted to JSONBin.io:', result);
            return true;
        } else {
            console.error('JSONBin.io submission failed:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error submitting to JSONBin.io:', error);
        return false;
    }
}

function validateSurveyData() {
    // Basic validation
    // In production, add more comprehensive validation
    return true;
}

// ====================================
// Data Download
// ====================================

function downloadData() {
    const dataStr = JSON.stringify(surveyData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `spectrum_survey_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

// ====================================
// Auto-save & Draft Recovery
// ====================================

// Auto-save to localStorage every 30 seconds
setInterval(function() {
    if (currentPage > 0 && currentPage < totalPages - 1) {
        savePageData(currentPage);
        localStorage.setItem('spectrum_survey_draft', JSON.stringify(surveyData));
        console.log('Draft auto-saved');
    }
}, 30000);

function restoreDraft() {
    const savedDraft = localStorage.getItem('spectrum_survey_draft');
    if (savedDraft) {
        const shouldRestore = confirm(
            'We found a saved draft. Would you like to continue where you left off?'
        );

        if (shouldRestore) {
            const draft = JSON.parse(savedDraft);
            Object.assign(surveyData, draft);
            restoreFormData(draft);
        }
    }
}

function restoreFormData(data) {
    // This will be called after questions are generated
    setTimeout(() => {
        // Restore Social Identity
        if (data.social_identity) {
            Object.keys(data.social_identity).forEach(key => {
                const element = document.getElementById(key) || document.querySelector(`select[name="${key}"]`);
                if (element) {
                    if (Array.isArray(data.social_identity[key])) {
                        // Multiselect checkboxes
                        data.social_identity[key].forEach(value => {
                            const checkbox = document.querySelector(`input[name="${key}"][value="${value}"]`);
                            if (checkbox) checkbox.checked = true;
                        });
                    } else {
                        element.value = data.social_identity[key];
                    }
                }
            });
        }

        // Restore BFI
        if (data.personal_identity?.bfi) {
            Object.keys(data.personal_identity.bfi).forEach(key => {
                const value = data.personal_identity.bfi[key];
                const radio = document.querySelector(`input[name="${key}"][value="${value}"]`);
                if (radio) radio.checked = true;
            });
        }

        // Restore PVQ
        if (data.personal_identity?.pvq) {
            Object.keys(data.personal_identity.pvq).forEach(key => {
                const value = data.personal_identity.pvq[key];
                const radio = document.querySelector(`input[name="${key}"][value="${value}"]`);
                if (radio) radio.checked = true;
            });
        }

        // Restore Life Context
        if (data.life_context) {
            data.life_context.loves?.forEach((value, index) => {
                const element = document.getElementById(`love_${index + 1}`);
                if (element) element.value = value;
            });

            data.life_context.hates?.forEach((value, index) => {
                const element = document.getElementById(`hate_${index + 1}`);
                if (element) element.value = value;
            });

            if (data.life_context.routines) {
                const weekdayEl = document.getElementById('weekday_routine');
                const weekendEl = document.getElementById('weekend_routine');

                if (weekdayEl) weekdayEl.value = data.life_context.routines.weekday || '';
                if (weekendEl) weekendEl.value = data.life_context.routines.weekend || '';

                // Update char counters
                if (weekdayEl) updateCharCount(weekdayEl, 'weekdayCount');
                if (weekendEl) updateCharCount(weekendEl, 'weekendCount');
            }
        }
    }, 1000); // Wait for questions to be generated
}

// ====================================
// Keyboard Navigation
// ====================================

document.addEventListener('keydown', function(e) {
    // Don't trigger if user is typing
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        return;
    }

    if (e.key === 'ArrowRight' && currentPage < totalPages - 2 && currentPage > 0) {
        nextPage();
    } else if (e.key === 'ArrowLeft' && currentPage > 0 && currentPage < totalPages - 1) {
        prevPage();
    }
});
