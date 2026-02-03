# SPeCtrum Framework

> A Grounded Framework for Multidimensional Identity Representation in LLM-Based Agents

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://alcyonesha-hash.github.io/persona/)
[![Paper](https://img.shields.io/badge/paper-NAACL%202025-blue)](https://github.com/keyeun/spectrum-framework-llm)

## 🎯 Overview

SPeCtrum is a research framework that creates authentic, multidimensional personas for Large Language Model (LLM) agents by integrating three core identity components:

- **S (Social Identity)**: Demographic and socioeconomic characteristics
- **P (Personal Identity)**: Personality traits and value systems
- **C (Personal Life Context)**: Daily routines and personal preferences

## 🌐 Web Survey

Access the interactive survey at: **[seungho.space](https://www.seungho.space/)** (coming soon)

The survey collects comprehensive identity data through:
1. Demographics questionnaire (21 items)
2. BFI-2-S personality inventory (30 items)
3. PVQ values questionnaire (21 items)
4. Daily routine and preference essays

**Estimated completion time**: 60-90 minutes

## 📋 Features

- ✅ Bilingual support (English/Korean)
- ✅ Auto-save functionality
- ✅ Progress tracking
- ✅ Data download (JSON format)
- ✅ Responsive design
- ✅ Privacy-focused (anonymous data collection)

## 🏗️ Project Structure

```
persona/
├── index.html              # Main survey interface
├── styles.css              # Styling
├── script.js               # Survey logic
├── questionnaires/         # JSON questionnaire definitions
│   ├── social_identity_ko.json
│   ├── social_identity_en.json
│   ├── personal_identity_ko.json
│   ├── personal_identity_en.json
│   ├── life_context_ko.json
│   └── life_context_en.json
├── data/                   # Response data storage
├── src/                    # Processing scripts
│   ├── collectors/         # Data collection modules
│   ├── generators/         # Profile generators
│   ├── agents/            # LLM agent implementations
│   └── evaluators/        # Evaluation tools
└── 2025.naacl-long.356.pdf # Original research paper
```

## 🚀 Quick Start

### For Survey Participants

1. Visit the survey website
2. Read and agree to informed consent
3. Complete all three sections
4. Download your response data (optional)

### For Researchers

```bash
# Clone the repository
git clone https://github.com/alcyonesha-hash/persona.git
cd persona

# Open the survey locally
open index.html
# or
python -m http.server 8000
```

## 📊 Data Collection

The survey collects three types of data:

### Social Identity (S)
- Age, gender, nationality
- Education, occupation
- Socioeconomic status
- Political and religious affiliation

### Personal Identity (P)
**Personality** (BFI-2-S):
- Extraversion
- Agreeableness
- Conscientiousness
- Negative Emotionality
- Open-Mindedness

**Values** (PVQ):
- Self-Direction, Stimulation, Hedonism
- Achievement, Power, Security
- Conformity, Tradition, Benevolence, Universalism

### Life Context (C)
- 5 things you love
- 5 things you hate
- Weekday routine (450+ characters)
- Weekend routine (450+ characters)

## 🔒 Privacy & Ethics

- All responses are **anonymous**
- No personally identifiable information is collected
- Data is stored locally and encrypted
- Participants can withdraw at any time
- Complies with IRB ethical standards

## 📈 Data Format

Response data is saved in JSON format:

```json
{
  "timestamp": "2025-02-04T00:00:00.000Z",
  "social_identity": {
    "age": "30s",
    "sex": "Male",
    "education": "Master's degree"
  },
  "personal_identity": {
    "bfi": { "bfi_1": "5", "bfi_2": "6" },
    "pvq": { "pvq_1": "4", "pvq_2": "3" }
  },
  "life_context": {
    "loves": ["Reading", "Hiking", ...],
    "hates": ["Crowds", "Spicy food", ...],
    "routines": {
      "weekday": "I wake up at 6:30...",
      "weekend": "On weekends I..."
    }
  }
}
```

## 🛠️ Technologies

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom CSS with responsive design
- **Storage**: localStorage (client-side)
- **Hosting**: GitHub Pages

## 📚 Citation

If you use this framework in your research, please cite:

```bibtex
@inproceedings{lee2025spectrum,
  title={SPeCtrum: A Grounded Framework for Multidimensional Identity Representation in LLM-Based Agent},
  author={Lee, Keyeun and Kim, Seo Hyeong and Lee, Seolhee and Eun, Jinsu and Ko, Yena and Jeon, Hayeon and Kim, Esther Hehsun and Cho, Seonghye and Yang, Soeun and Kim, Eun-mee and Lim, Hajin},
  booktitle={Proceedings of NAACL 2025},
  year={2025}
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

- **Author**: Seungho
- **Website**: [seungho.space](https://www.seungho.space/)
- **GitHub**: [@alcyonesha-hash](https://github.com/alcyonesha-hash)

## 🙏 Acknowledgments

Based on the original SPeCtrum framework by Lee et al. (NAACL 2025)
- Original repository: [github.com/keyeun/spectrum-framework-llm](https://github.com/keyeun/spectrum-framework-llm)
- Affiliated with Seoul National University hci+d Lab

---

**Note**: This is a demo implementation. For the full research implementation with all 72 questionnaire items and complete analysis pipeline, please refer to the original repository.
