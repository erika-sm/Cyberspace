import MenuTheme from "./MenuTheme.mp3";
import styled from "styled-components";

const AudioButton = () => {
  const audio = new Audio(MenuTheme);
  const playAudio = () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };
  return (
    <div>
      {" "}
      <PlayAudio
        onClick={() => {
          playAudio();
        }}
      >
        Play Audio
      </PlayAudio>
    </div>
  );
};

const PlayAudio = styled.button`
  top: 10px;
  background-color: rgb(243, 230, 0);
  width: 100px;
  height: 30px;
  font-weight: bold;
  font-size: 13px;
  font-family: "Syne Mono";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  &:hover {
    background-color: rgb(4, 218, 246);
    color: white;
  }
`;

export default AudioButton;
