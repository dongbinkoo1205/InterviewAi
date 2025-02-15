async function fetchResult(answers, questions) {
    try {
        const response = await fetch('/api/evaluate-answers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers, questions }),
            credentials: true, // 인증 정보(쿠키, 헤더) 포함 허용
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('AI 평가 결과:', data);

        return data.scores; // 점수 데이터를 반환
    } catch (error) {
        console.error('Error fetching AI evaluation:', error);
        alert('AI 평가 요청 중 오류가 발생했습니다.');
        return null;
    }
}

export default fetchResult;
