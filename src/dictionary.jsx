import Play from "./assets/play-circle.svg";

export default function Dictionary({ meanings, error }) {
  if (error) {
    return (
      <div className="form-container">
        <p className="no-result">{error}</p>
      </div>
    );
  }

  if (!meanings || meanings.length === 0) {
    return null;
  }

  return (
    <div className="form-container">
      {meanings.map((meaning, index) => {
        const audioUrl = meaning.phonetics?.find(
          (phonetic) => phonetic.audio
        )?.audio;

        return (
          <div key={index} className="content-box">
            <div className="result-container">
              <div className="word">
                <div className="phonetics">
                  <h1 className="word">
                    {meaning.word?.toLowerCase()}
                  </h1>

                  {audioUrl && (
                    <div className="play-icon">
                      <img
                        onClick={() => {
                          const voice = new Audio(audioUrl);
                          voice.play();
                        }}
                        src={Play}
                        alt="Play pronunciation"
                      />
                    </div>
                  )}
                </div>

                <h2 className="POS">
                  {meaning.meanings?.[0]?.partOfSpeech}
                </h2>

                <p className="meaning">Meaning:</p>
              </div>

              <div className="defination">
                {meaning.meanings?.[0]?.definitions?.map(
                  (def, idx) => (
                    <ul key={idx}>
                      <li>{def.definition}</li>

                      {def.example && (
                        <p className="eg">
                          eg: {def.example}
                        </p>
                      )}
                    </ul>
                  )
                )}

                {meaning.sourceUrls?.length > 0 && (
                  <a
                    className="link"
                    target="_blank"
                    rel="noreferrer"
                    href={meaning.sourceUrls[0]}
                  >
                    {meaning.sourceUrls[0]}
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
