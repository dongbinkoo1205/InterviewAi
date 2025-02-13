import React from 'react';
import './MainVideo.css';
import MainVd2 from '/public/mainVd2.mp4';
import MainVd3 from '/public/mainVd3.mp4';

function MainVideo({ id }) {
    // 비디오 파일을 객체로 저장
    const videos = {
        2: MainVd2,
        3: MainVd3,
    };

    return (
        <div className={`MainVideo video-${id}`}>
            {/* id 값이 올바른 경우 비디오 출력 */}
            {videos[id] ? <video src={videos[id]} autoPlay muted playsInline loop></video> : <p>Invalid video ID</p>}
        </div>
    );
}

export default MainVideo;
