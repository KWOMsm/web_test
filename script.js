let currentQuestion = 0;
let score = 0;
const questions = [
   {
        question: '조현병을 가진 사람은 범죄를 일으킬 확률이 높다.',
        feedback_yes: '아쉽습니다. 이것은 잘못된 인식입니다. 2021년 기준 정신장애 범죄자는 전체 범죄자의 0.7%에 불과하였습니다.',
        feedback_no: '맞습니다! 2021년 기준 정신장애 범죄자는 전체 범죄자의 0.7%에 불과하였습니다.',
        video: 'https://www.youtube.com/embed/6eB1-0oiwxY'
    },
    {
        question: '조현병은 치료되지 않는 병이다.',
        feedback_yes: '아쉽습니다. 조현병은 치료를 통해 증상을 조절할 수 있는 정신 질환입니다. 치료를 위해서는 약물 치료와 사회재활 치료를 함께 받는 것이 큰 도움이 됩니다.',
        feedback_no: '맞습니다! 조현병은 치료를 통해 증상을 조절할 수 있는 정신 질환입니다. 치료를 위해서는 약물 치료와 사회재활 치료를 함께 받는 것이 큰 도움이 됩니다.',
        video: 'https://www.youtube.com/embed/aXnIoZVGcp4'
    },
    {
        question: '조현병은 정신적으로 마음이 약한 사람에게만 발생한다.',
        feedback_yes: '아쉽습니다. 이는 잘못된 인식입니다. 조현병은 뇌의 기능에 문제가 생겨 유발되는 질환입니다. 마음을 강하게 먹는다고 해서 완치되지 않습니다.',
        feedback_no: '맞습니다! 조현병은 뇌의 기능에 문제가 생겨 유발되는 질환입니다. 누구에게나 발생할 수 있는 질병입니다.',
        video: 'https://www.youtube.com/embed/aXnIoZVGcp4'
    },
    {
        question: '조현병 환자와 대화를 하는 것은 위험하다.',
        feedback_yes: '아쉽습니다. 이는 잘못된 인식입니다. 대부분의 조현병 환자들은 안전하게 대화할 수 있습니다.',
        feedback_no: '맞습니다! 대화를 통해 이해와 공감을 쌓는 것이 중요합니다. 대부분의 조현병 환자들은 안전하게 대화할 수 있습니다.',
        video: 'https://www.youtube.com/embed/htv1uLvc4Hk'
    },
    // 새로운 문제들 추가
    {
        question: '조현병은 드문 병이다.',
        feedback_yes: '아쉽습니다. 이는 잘못된 인식입니다. 조현병은 100명 중에 1명 꼴로 누구라도 걸릴 수 있는 비교적 흔한 병입니다.',
        feedback_no: '맞습니다! 조현병은 100명 중에 1명 꼴로 누구라도 걸릴 수 있는 비교적 흔한 병입니다.',
        video: 'https://www.youtube.com/embed/Vyf48SbUJTg'
    },
    {
        question: '조현병 환자는 일상생활이 불가능하다.',
        feedback_yes: '아쉽습니다. 조현병 환자들은 치료를 시작하고 치료계획을 충실히 따르면 일상생활, 사회관계 등의 활동이 모두 가능합니다.',
        feedback_no: '맞습니다! 조현병 환자들은 치료를 시작하고 치료계획을 충실히 따르면 일상생활, 사회관계 등의 활동이 모두 가능합니다.',
        video: 'https://www.youtube.com/embed/0eukcaOK5ls'
    }
];

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    if (currentQuestion < questions.length) {
        document.getElementById('content').innerHTML = `
            <div id="question">${questions[currentQuestion].question}</div>
            <button onclick='answer("yes")'>예</button>
            <button onclick='answer("no")'>아니오</button>
            <div class="progress">질문 ${currentQuestion + 1} / ${questions.length}</div>
            <div id="feedback"></div>
            <div id="video-container"></div>
        `;
    } else {
        showResults();
    }
}

function answer(response) {
    const feedback = response === 'yes' ? questions[currentQuestion].feedback_yes : questions[currentQuestion].feedback_no;
    const video = questions[currentQuestion].video;
    const isCorrect = (response === 'yes' && questions[currentQuestion].feedback_yes.startsWith('맞습니다')) ||
                      (response === 'no' && questions[currentQuestion].feedback_no.startsWith('맞습니다'));
    
    if (isCorrect) {
        score++;
    }
    
    document.getElementById('feedback').innerHTML = `
        <div class="feedback ${isCorrect ? 'correct' : 'incorrect'}">
            <p><strong>피드백:</strong> ${feedback}</p>
        </div>
    `;
    document.getElementById('video-container').innerHTML = `
        <div class="video-container">
            <iframe src="${video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        ${currentQuestion < questions.length - 1 
            ? '<button onclick="nextQuestion()">다음 질문</button>'
            : '<button onclick="showResults()">결과 보기</button>'
        }
    `;
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

function showResults() {
    const totalQuestions = questions.length;
    const feedbackMessage = generateFeedbackMessage(score, totalQuestions);
    const shareText = `조현병 인식 개선 퀴즈에서 ${score}/${totalQuestions}점을 획득했습니다! 함께 인식 개선에 동참해주세요!`;

    document.getElementById('content').innerHTML = `
        <h2>퀴즈 완료</h2>
        <div class="result-container">
            <p class="score">당신의 점수: ${score} / ${totalQuestions}</p>
            <p class="feedback">${feedbackMessage}</p>
            <p class="impact-message">조현병에 대한 올바른 이해는 사회적 편견을 줄이고 환자들의 삶의 질을 향상시키는 데 중요합니다.</p>
            
            <div class="pledge-section">
                <button onclick="makePledge()" class="pledge-button">인식 개선 서약하기</button>
                <p id="pledge-count">현재까지 <span>1,234</span>명이 서약에 참여했습니다.</p>
            </div>

            <div class="share-section">
                <p>더 많은 사람들과 함께 해요!</p>
                <div class="share-buttons">
                    <button onclick="shareToInstagram('${shareText}')" class="share-button instagram">
                        <i class="fab fa-instagram"></i> Instagram에 공유하기
                    </button>
                    <button onclick="shareToX('${shareText}')" class="share-button x">
                        <i class="fab fa-x-twitter"></i> X에 공유하기
                    </button>
                </div>
            </div>

            <button onclick="location.reload()" class="restart-button">다시 시작</button>
        </div>
    `;
}

// SNS 공유 함수들
function shareToInstagram(text) {
    // 인스타그램은 웹에서 직접 공유가 제한적이므로, 복사 기능으로 대체
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    
    alert(`공유할 텍스트가 클립보드에 복사되었습니다!\n인스타그램에 붙여넣기 해주세요.`);
    window.open('https://www.instagram.com', '_blank');
}

function shareToX(text) {
    const url = encodeURIComponent(window.location.href);
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

function generateFeedbackMessage(score, totalQuestions) {
    const percentage = (score / totalQuestions) * 100;
    
    if (percentage === 100) {
        return "완벽합니다! 조현병에 대한 깊은 이해를 가지고 계시네요!";
    } else if (percentage >= 80) {
        return "훌륭합니다! 조현병에 대한 이해도가 매우 높습니다!";
    } else if (percentage >= 60) {
        return "잘하셨습니다! 조현병에 대해 좋은 이해를 가지고 계십니다.";
    } else if (percentage >= 40) {
        return "괜찮습니다! 조현병에 대해 더 배워보는 건 어떨까요?";
    } else {
        return "참여해주셔서 감사합니다. 조현병에 대해 함께 더 알아가보아요!";
    }
}

function makePledge() {
    // localStorage에서 현재 서명자 수 가져오기
    let signerCount = sessionStorage.getItem('signerCount') || 0;
    signerCount = parseInt(signerCount);

    // 이미 서명했는지 확인
    if (!sessionStorage.getItem('hasSigned')) {
        // 서명자 수 증가
        signerCount++;
        
        // 새로운 서명자 수 저장
        sessionStorage.setItem('signerCount', signerCount);
        sessionStorage.setItem('hasSigned', 'true');

        // 화면 업데이트
        document.querySelector('#pledge-count span').textContent = signerCount;

        // 서명 완료 메시지 표시
        Swal.fire({
            title: '서명이 완료되었습니다!',
            html: `
                <p>현재까지 <strong>${1234+signerCount}</strong>명이 서명했습니다.</p>
                <p>조현병 인식 개선을 위한 서약에 동참해주셔서 감사합니다.</p>
                <div class="pledge-text">
                    1. 나는 조현병에 대한 편견을 버리고 올바른 이해를 하겠습니다.<br>
                    2. 나는 조현병 환자를 차별하지 않고 존중하겠습니다.<br>
                    3. 나는 조현병에 대한 올바른 정보를 주변에 전달하겠습니다.
                </div>
            `,
            icon: 'success',
            confirmButtonText: '확인'
        });
    } else {
        // 이미 서명한 경우
        Swal.fire({
            title: '이미 서명하셨습니다',
            text: '한 사람당 한 번만 서명할 수 있습니다.',
            icon: 'info',
            confirmButtonText: '확인'
        });
    }
}
