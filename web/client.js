const ws = new WebSocket("ws://localhost:8080/ws");
const pc = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
});

const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
.then(stream => {
    localVideo.srcObject = stream;
    stream.getTracks().forEach(track => pc.addTrack(track, stream));
});

pc.ontrack = event => {
    remoteVideo.srcObject = event.streams[0];
};

pc.onicecandidate = event => {
    if (event.candidate) {
        ws.send(JSON.stringify({ ice: event.candidate }));
    }
};

ws.onmessage = async event => {
    const data = JSON.parse(event.data);

    if (data.offer) {
        await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        ws.send(JSON.stringify({ answer }));
    }

    if (data.answer) {
        await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
    }

    if (data.ice) {
        await pc.addIceCandidate(data.ice);
    }
};

async function startCall() {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    ws.send(JSON.stringify({ offer }));
}
