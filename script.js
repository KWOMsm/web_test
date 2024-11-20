let currentQuestion = 0;
let score = 0;
const questions = [
   {
        question: '조현병을 가진 사람은 범죄를 일으킬 확률이 높다.',
        feedback_yes: '아쉽습니다. 이것은 잘못된 인식입니다. 실제로 조현병을 가진 사람들은 범죄의 가해자보다 피해자가 되는 경우가 더 많습니다.',
        feedback_no: '맞습니다! 실제로 조현병을 가진 사람들은 범죄의 가해자보다 피해자가 되는 경우가 더 많습니다.',
        video: 'https://www.youtube.com/embed/6eB1-0oiwxY'
    },
    {
        question: '조현병 환자는 치료를 받으면 완치될 수 있다.',
        feedback_yes: '아쉽습니다. 조현병은 완치보다는 관리가 가능한 정신 질환입니다.',
        feedback_no: '맞습니다! 조현병은 완치보다는 관리가 가능한 정신 질환입니다. 대부분의 환자들은 치료를 통해 증상을 조절할 수 있습니다.',
        video: 'https://www.youtube.com/embed/aXnIoZVGcp4'
    },
    {
        question: '조현병은 정신적으로 약한 사람에게만 발생한다.',
        feedback_yes: '아쉽습니다. 이는 잘못된 인식입니다. 조현병은 여러 요인이 복합적으로 작용하여 발생합니다.',
        feedback_no: '맞습니다! 조현병은 유전적, 환경적 요인이 복합적으로 작용하여 발생하는 질환입니다. 누구에게나 발생할 수 있습니다.',
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
        question: '조현병은 \'분열된 인격\'을 의미한다.',
        feedback_yes: '아쉽습니다. 이는 잘못된 인식입니다. 조현병은 다중 인격장애가 아니라 현실 인식의 장애를 특징으로 하는 정신 질환입니다.',
        feedback_no: '맞습니다! 조현병은 다중 인격장애가 아닙니다. 이는 현실 인식의 장애를 특징으로 하는 정신 질환입니다.',
        video: '관련 유튜브 영상 URL'
    },
    {
        question: '조현병 환자는 항상 환각이나 망상 증상을 보인다.',
        feedback_yes: '아쉽습니다. 모든 조현병 환자가 항상 환각이나 망상을 경험하는 것은 아닙니다. 증상은 개인마다, 시기마다 다를 수 있습니다.',
        feedback_no: '맞습니다! 증상의 종류와 정도는 개인마다, 시기마다 다르며, 많은 환자들이 적절한 치료를 통해 증상을 조절하며 살아갑니다.',
        video: '관련 유튜브 영상 URL'
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
                    <button onclick="shareToKakao('${shareText}')" class="share-button kakao">
                        <i class="fas fa-comment"></i> 카카오톡 공유하기
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