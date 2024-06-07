import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import youaremylife from "./youaremylife.mp3";
import './App.css';

Modal.setAppElement('#root');

const App = () => {
  const audioRef = useRef(null);
  // eslint-disable-next-line
  const [playing, setPlaying] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showButterflies, setShowButterflies] = useState(false);
  

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  

  const handleShowButterflies = () => {
    setShowButterflies(true);
    setTimeout(() => {
      setShowButterflies(false);
    }, 10000); // La animación de las mariposas dura 5 segundos
  };
  const handleAudioPlay = () => {
    console.log("audio playing...");
    if (audioRef.current) {
      audioRef.current.play();
      setPlaying(true);
    }
  };
  
  useEffect(() => {
    
    window.addEventListener('click', handleAudioPlay); // Espera a que el usuario haga clic en cualquier parte de la ventana
    return () => {
      window.removeEventListener("click", handleAudioPlay); // Limpia el event listener cuando el componente se desmonte
    };
  }, []);

  return (
    <div className="App">
      <audio ref={audioRef} preload="auto">
        <source src={youaremylife} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <motion.div
        className="animated-background"
        animate={{ backgroundColor: ["rgba(255, 105, 180, 0.5)", "rgba(152, 251, 152, 0.5)", "rgba(255, 105, 180, 0.5)"] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <motion.h1
          className="title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          ¿Cómo se siente estar enamorado de ti?
        </motion.h1>
        <motion.p
          className="description"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
        >
          Esta página fue hecha por Andrés Fábregas para hacerte feliz.
        </motion.p>
        <button className="open-modal-button" onClick={openModal}>Se siente como...</button>
        <button
          className={`show-butterflies-button ${showButterflies ? 'active' : ''}`}
          onClick={handleShowButterflies}
        >
          {showButterflies ? 'esas son las mariposas de mi corazonsjdkas' : '¡Haz aparecer las mariposas!'}
        </button>
      </motion.div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Amarte se siente como dar flores por primera vez</h2>
          <p>
          Esta es una de las formas en la que puedo expresar cómo se siente amarte. 
          El amor contigo se siente como una primera vez en la vida, un momento único 
          y especial que será por siempre en mi vida porque jamás dejaré de amarte. Me 
          aferro fuertemente a nuestro amor. Amo lo que somos, y lo que nos queda por ser.
          Amo tu ser y tu manera de ser. Estoy enamorado de ti, y todo de ti. Enamorado de tus ojos
          y de tu delineado, de tu obsesión con el rosa y el de dormir a mi lado. Compartimos sueños, que juntos
          Sofía vamos a cumplir. Gracias por existir conmigo y ser mi mujer, te amo para siempre y por siempre, pookie.
          A tu lado quiero quedarme, porque tu eres mi vida. Contigo brillo más, siempre me vas a tener. Tendrás a 
          este hombre que fuertemente te ama, de una forma incodicional. Quiero hacerte sentir segura en mis brazos, mientras
          escuchamos alguna playlist de Jazz. Justo como ahora que escribo esto, me inspiro mientras escucho una playlist de Jazz
          por lo que no dejo de pensar en ti.
          </p>
          <button onClick={closeModal}>Cerrar</button>
        </motion.div>
      </Modal>

      {/* Nuevo componente HeartsRain */}
      {showButterflies && <Butterflies />}
      <HeartsRain />
    </div>
  );
};

const Butterflies = () => {
  return (
    <div className="butterflies-container">
      {[...Array(40)].map((_, index) => (
        <motion.div
          key={index}
          className="butterfly"
          initial={{
            opacity: 0,
            y: `${Math.random() * 40 + 25}vh`, // Coordenada vertical en la mitad de la pantalla
            x: `${Math.random() * -100}vw`, // Coordenada horizontal aleatoria fuera de la pantalla
            rotate: 0
          }}
          animate={{ opacity: 1, y: 0, rotate: 360 }}
          transition={{ duration: 5, delay: index * 0.010 }}
        >
          🦋
        </motion.div>
      ))}
    </div>
  );
};

const HeartsRain = () => {
  return (
    <div className="hearts-rain-container">
      {[...Array(30)].map((_, index) => (
        <motion.span
          key={index}
          className="heart"
          style={{
            top: `${Math.random() * 100}vh`, // Posición vertical aleatoria
            left: `${Math.random() * 100}vw`, // Posición horizontal aleatoria
            fontSize: `${Math.random() * 2 + 1}rem`, // Tamaño de corazón aleatorio
            animationDelay: `${Math.random()}s` // Retraso de animación aleatorio
          }}
          animate={{ y: '100vh' }} // Animación hacia abajo
          transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
        >
          💖
        </motion.span>
      ))}
    </div>
  );
};

export default App;
