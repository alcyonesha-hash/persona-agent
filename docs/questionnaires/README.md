# SPeCtrum 설문지 가이드

이 디렉토리에는 SPeCtrum 프레임워크에서 사용하는 세 가지 설문지가 포함되어 있습니다.

## 📋 설문지 구성

### 1. Social Identity (S) - 사회적 정체성
**파일**: `social_identity_ko.json` / `social_identity_en.json`

- **문항 수**: 21개
- **소요 시간**: 약 5-10분
- **내용**: 인구통계학적 정보
  - 연령, 성별, 성 정체성, 성적 지향
  - 민족, 인종, 장애 여부, 국적
  - 거주지, 학력, 직업
  - 소득 수준, 사회 계층
  - 정치 성향, 종교

### 2. Personal Identity (P) - 개인적 정체성
**파일**: `personal_identity_ko.json` / `personal_identity_en.json`

#### BFI-2-S (Big Five Inventory-2-Short Form)
- **문항 수**: 30개
- **소요 시간**: 약 10-15분
- **척도**: 7점 리커트 척도 (1=전혀 동의하지 않음 ~ 7=매우 동의함)
- **측정 요인**: 5개 성격 특성
  - Extraversion (외향성)
  - Agreeableness (우호성)
  - Conscientiousness (성실성)
  - Negative Emotionality (부정적 정서성)
  - Open-Mindedness (개방성)

#### PVQ (Portrait Values Questionnaire)
- **문항 수**: 21개
- **소요 시간**: 약 10분
- **척도**: 6점 리커트 척도 (1=나와 전혀 비슷하지 않음 ~ 6=나와 매우 비슷함)
- **측정 가치**: 10개 가치 차원
  - Self-Direction (자기주도)
  - Stimulation (자극)
  - Hedonism (쾌락주의)
  - Achievement (성취)
  - Power (권력)
  - Security (안전)
  - Conformity (순응)
  - Tradition (전통)
  - Benevolence (자비)
  - Universalism (보편주의)

### 3. Life Context (C) - 개인 생활 맥락
**파일**: `life_context_ko.json` / `life_context_en.json`

- **소요 시간**: 약 20-30분
- **내용**:
  - **선호도**: 좋아하는 것 5가지, 싫어하는 것 5가지
  - **일상 루틴**:
    - 평일 일과 (450자 이상 권장)
    - 주말 일과 (450자 이상 권장)
  - **추가 맥락** (선택사항):
    - 인생 모토
    - 스트레스 해소 방법
    - 편안함을 느끼는 순간

## 📊 전체 소요 시간

- **최소**: 약 45-65분
- **권장**: 여유있게 1-1.5시간

## 💡 설문 작성 가이드

### 응답 원칙
1. **솔직하게**: 사회적으로 바람직한 답변보다는 진실된 답변을 해주세요
2. **구체적으로**: 특히 Life Context에서는 구체적인 디테일이 중요합니다
3. **일관성**: 서두르지 말고 각 문항을 신중히 읽고 답변해주세요

### Life Context 작성 팁
- **평일/주말 루틴**: 시간대별로 구체적으로 작성
  - ✅ 좋은 예: "오전 6시 30분에 일어나서 15분간 스트레칭을 하고..."
  - ❌ 나쁜 예: "아침에 일어나서 준비하고 출근한다"

- **선호도**: 추상적인 것보다 구체적인 것
  - ✅ 좋은 예: "비 오는 날 창가에서 소설책 읽기"
  - ❌ 나쁜 예: "책 읽기"

## 📁 데이터 형식

모든 설문지는 JSON 형식으로 구조화되어 있으며, 다음 정보를 포함합니다:
- `id`: 질문 고유 식별자
- `question`: 질문 내용
- `type`: 응답 유형 (choice, text, list, essay 등)
- `options`: 선택지 (해당되는 경우)
- `scale`: 척도 설명 (리커트 척도인 경우)

## 🔒 개인정보 보호

- 모든 응답은 익명으로 처리됩니다
- 구체적인 주소, 전화번호 등 개인 식별 정보는 수집하지 않습니다
- 데이터는 연구 목적으로만 사용됩니다

## 📝 응답 데이터 저장

응답 완료 후, 데이터는 다음 경로에 저장됩니다:
```
data/profiles/[participant_id]/
  ├── social_identity.json
  ├── personal_identity.json
  └── life_context.json
```

## 🌐 언어 버전

- **한국어 (Korean)**: `*_ko.json`
- **영어 (English)**: `*_en.json`

## 📚 참고 문헌

이 설문지는 다음 논문을 기반으로 제작되었습니다:

> Lee, K., Kim, S. H., Lee, S., Eun, J., Ko, Y., Jeon, H., ... & Lim, H. (2025).
> SPeCtrum: A Grounded Framework for Multidimensional Identity Representation in LLM-Based Agent.
> In Proceedings of NAACL 2025.

### 사용된 표준화 척도
- **BFI-2-S**: Soto, C. J., & John, O. P. (2017). Short and extra-short forms of the Big Five Inventory–2
- **PVQ**: Schwartz, S. H. (2009). Basic human values

## ❓ 문의사항

설문지 관련 문의사항이 있으시면 이슈를 등록해주세요.
