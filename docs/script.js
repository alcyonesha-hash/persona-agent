// Page navigation
let currentPage = 0;
const totalPages = 5; // Welcome, S, P, C, Complete

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

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    setupConsentCheckbox();
    setupCharacterCounters();
});

// Consent checkbox handling
function setupConsentCheckbox() {
    const consentCheckbox = document.getElementById('consent');
    const startBtn = document.getElementById('startBtn');

    if (consentCheckbox && startBtn) {
        consentCheckbox.addEventListener('change', function() {
            startBtn.disabled = !this.checked;
        });
    }
}

// Character counters for textareas
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

// Page navigation
function nextPage() {
    if (currentPage < totalPages - 1) {
        // Save current page data
        savePageData(currentPage);

        // Hide current page
        document.getElementById(`page-${currentPage}`).classList.remove('active');

        // Show next page
        currentPage++;
        document.getElementById(`page-${currentPage}`).classList.add('active');

        // Update progress
        updateProgress();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function prevPage() {
    if (currentPage > 0) {
        // Hide current page
        document.getElementById(`page-${currentPage}`).classList.remove('active');

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
    document.getElementById('progressFill').style.width = progress + '%';
}

// Save data from current page
function savePageData(pageNum) {
    switch(pageNum) {
        case 1: // Social Identity
            surveyData.social_identity = {
                age: document.getElementById('age')?.value || '',
                sex: document.getElementById('sex')?.value || '',
                gender: document.getElementById('gender')?.value || '',
                nationality: document.getElementById('nationality')?.value || '',
                education: document.getElementById('education')?.value || '',
                occupation: document.getElementById('occupation')?.value || ''
            };
            break;

        case 2: // Personal Identity
            surveyData.personal_identity.bfi = {
                bfi_1: getRadioValue('bfi_1'),
                bfi_2: getRadioValue('bfi_2')
            };
            break;

        case 3: // Life Context
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
            break;
    }
}

function getRadioValue(name) {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : '';
}

// Submit survey
function submitSurvey() {
    // Save final page data
    savePageData(currentPage);

    // Add timestamp
    surveyData.timestamp = new Date().toISOString();

    // Validate data (basic check)
    if (!validateSurveyData()) {
        alert('Please complete all required fields.\n필수 항목을 모두 작성해주세요.');
        return;
    }

    // Store in localStorage
    localStorage.setItem('spectrum_survey_data', JSON.stringify(surveyData));

    // Go to completion page
    document.getElementById(`page-${currentPage}`).classList.remove('active');
    document.getElementById('page-complete').classList.add('active');
    currentPage = totalPages - 1;
    updateProgress();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateSurveyData() {
    // Basic validation - check if key fields are filled
    // In production, you would have more comprehensive validation
    return true;
}

// Download data
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

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Don't trigger if user is typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        return;
    }

    if (e.key === 'ArrowRight' && currentPage < totalPages - 1 && currentPage > 0) {
        nextPage();
    } else if (e.key === 'ArrowLeft' && currentPage > 0 && currentPage < totalPages - 1) {
        prevPage();
    }
});

// Auto-save to localStorage periodically
setInterval(function() {
    if (currentPage > 0 && currentPage < totalPages - 1) {
        savePageData(currentPage);
        localStorage.setItem('spectrum_survey_draft', JSON.stringify(surveyData));
    }
}, 30000); // Save every 30 seconds

// Restore from localStorage on page load
window.addEventListener('load', function() {
    const savedDraft = localStorage.getItem('spectrum_survey_draft');
    if (savedDraft) {
        const shouldRestore = confirm(
            'We found a saved draft. Would you like to continue where you left off?\n저장된 임시 데이터를 발견했습니다. 이어서 작성하시겠습니까?'
        );

        if (shouldRestore) {
            const draft = JSON.parse(savedDraft);
            // Restore data to form fields
            restoreFormData(draft);
        }
    }
});

function restoreFormData(data) {
    // Social Identity
    if (data.social_identity) {
        Object.keys(data.social_identity).forEach(key => {
            const element = document.getElementById(key);
            if (element) element.value = data.social_identity[key];
        });
    }

    // Personal Identity
    if (data.personal_identity?.bfi) {
        Object.keys(data.personal_identity.bfi).forEach(key => {
            const value = data.personal_identity.bfi[key];
            if (value) {
                const radio = document.querySelector(`input[name="${key}"][value="${value}"]`);
                if (radio) radio.checked = true;
            }
        });
    }

    // Life Context
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
        }
    }
}
