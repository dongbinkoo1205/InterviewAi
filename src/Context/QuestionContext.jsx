// src/Context/QuestionContext.jsx
import React, { createContext, useContext, useState } from 'react';
const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false); //로딩관련
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //현재질문의 index
    const [answers, setAnswers] = useState([]); // 답변 모음
    const [questions, setQuestions] = useState([]); // 질문모음
    const [job, setJob] = useState(''); // 직무입력
    const [isLogin, setIsLogin] = useState(false); // 로그인 유무
    const [user, setUser] = useState(null); // 사용자 정보 추가

    // 회원가입 함수
    const handleRegister = async (fetchRegister, name, email, password) => {
        try {
            const data = await fetchRegister(name, email, password);

            if (!data || data.error) {
                alert(data?.error || '회원가입 실패! 다시 시도해주세요.');
                return;
            }

            setUser({ name: data.name, email: data.email });

            alert('✅ 회원가입 성공! 로그인 해주세요.');
        } catch (error) {
            console.error('회원가입 오류:', error);
            alert('❌ 회원가입 중 오류가 발생했습니다.');
        }
    };

    // 로그인 함수
    const handleLogin = (data) => {
        if (!data || !data.user) {
            console.error('❌ 로그인 데이터가 올바르지 않습니다.');
            return;
        }

        setUser(data.user); // ✅ user 정보 저장
        setIsLogin(true); // ✅ 로그인 상태 변경
    };

    const handleJobSubmit = async (fetchQuestions, job) => {
        try {
            // ※ 순서 중요! 직무선택 버튼 누르자마자 IsLoading 체크 후에 질문을 gpt에게 받아야함
            setIsLoading(true);
            const generatedQuestions = await fetchQuestions(job);
            setQuestions(generatedQuestions);
            setCurrentQuestionIndex(0); // 질문 인덱스 초기화
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnswerSubmit = (answer) => {
        setAnswers((prevAnswers) => [...prevAnswers, answer]);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            console.log('모든 질문에 답변을 완료했습니다.');
        }
    };

    const handleReadQuestion = () => {
        if (questions.length > 0 && currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            const speech = new SpeechSynthesisUtterance(question);
            speech.lang = 'ko-KR';
            window.speechSynthesis.speak(speech);
        }
    };

    const handleRecordAnswer = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert('이 브라우저는 음성 인식을 지원하지 않습니다.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'ko-KR';
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript; // 사용자가 말한 텍스트
            // 사용자가 음성으로 답변한 내용을 제출
            handleAnswerSubmit(transcript);
        };

        recognition.start();
    };
    const validateJobInput = (input) => {
        // 1) 숫자 또는 특수문자만 입력된 경우
        if (/^[0-9!@#$%^&*()_+={}\[\]:;'",.<>/?|`~\\-]+$/.test(input)) {
            return false;
        }

        // 2) 자음 또는 모음만 입력된 경우 (한글 자음/모음만 입력 제한)
        if (/^[ㄱ-ㅎㅏ-ㅣ]+$/.test(input)) {
            return false;
        }

        return true; // 유효한 입력
    };

    return (
        <QuestionContext.Provider
            value={{
                questions,
                currentQuestionIndex,
                answers,
                handleJobSubmit,
                handleAnswerSubmit,
                handleReadQuestion,
                handleRecordAnswer,
                isLoading,
                job,
                setJob,
                validateJobInput,
                handleRegister,
                handleLogin,
                isLogin,
                setIsLogin,
                user,
            }}
        >
            {children}
        </QuestionContext.Provider>
    );
};

export const useQuestionContext = () => {
    const context = useContext(QuestionContext);
    if (!context) {
        throw new Error('useQuestionContext must be used within a QuestionProvider');
    }
    return context;
};
