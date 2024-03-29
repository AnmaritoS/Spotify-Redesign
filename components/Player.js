import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../atoms/playerAtom";
// import PlayerWrapper from "./PlayerWrapper";
import dynamic from "next/dynamic";

const SpotifyPlayer = dynamic(() => import("react-spotify-web-playback"), {
  ssr: false,
});

function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  useEffect(() => {
    console.log(trackUri);
    if (trackUri) {
      setPlay(true);
    }
  }, [trackUri]);

  if (!accessToken) return null;

  return (
    <>
      {/* Premium Users */}
      <SpotifyPlayer
        styles={{
          activeColor: "#fff",
          bgColor: "#181818",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
          height: "70px",
          sliderTrackColor: "#535353",
          sliderTrackBorderRadius: "4px",
          sliderHandleColor: "#fff",
          errorColor: "#fff",
        }}
        token={accessToken}
        showSaveIcon
        callback={(state) => {
          setPlay(state.isPlaying);
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
        magnifySliderOnHover={true}
        autoPlay={true}
      />
    </>
  );
}

export default Player;
