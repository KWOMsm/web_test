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

    document.getElementById('content').innerHTML = `
        <h2>퀴즈 완료</h2>
        <p>당신의 점수: ${score} / ${totalQuestions}</p>
        <p>${feedbackMessage}</p>
        <p>조현병에 대한 올바른 이해는 사회적 편견을 줄이고 환자들의 삶의 질을 향상시키는 데 중요합니다.</p>
        <button onclick="location.reload()">다시 시작</button>
    `;
}

function generateFeedbackMessage(score, totalQuestions) {
    if (score === totalQuestions) {
        return "놀랍습니다! 모든 질문을 정확하게 맞추셨습니다! 조현병에 대한 통찰력이 대단하네요!";
    } else if (score >= totalQuestions * 0.75) {
        return "아주 잘하셨습니다! 조현병에 대한 인식이 상당히 좋습니다! 계속해서 주변에 긍정적인 영향을 주세요!";
    } else if (score >= totalQuestions * 0.5) {
        return "잘하고 계십니다! 여기서 더 나아갈 수 있습니다. 조현병에 대해 더 배우고 공유해봐요!";
    } else if (score >= 1) {
        return "좋은 시작이에요! 모르는 부분을 더 배우고 이해를 넓혀보세요!";
    } else {
        return "퀴즈에 참여해주셔서 감사합니다! 다음에는 더 많은 질문을 맞춰보세요!";
    }
}