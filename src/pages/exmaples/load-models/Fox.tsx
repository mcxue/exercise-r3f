import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import { useControls, button } from 'leva';

const Fox = () => {
  const fox = useGLTF('/models/fox/fox.glb');
  const animations = useAnimations(fox.animations, fox.scene);
  const { animationName } = useControls( {
    animationName: { options: animations.names },
  });
  useEffect(() => {
    const action = animations.actions[animationName];
    action?.reset().fadeIn(0.5).play();
    // window.setTimeout(() => {
    //   animations.actions.Walk?.play();
    //   animations.actions.Walk?.crossFadeFrom(animations.actions.Run!, 1, false);
    // }, 2000);
    return () => {
      action?.fadeOut(0.5);
    };
  }, [animationName]);
  return (
    <primitive
      object={fox.scene}
      scale={0.02}
      position={[-2.5, 0, 2.5]}
      rotation-y={0.3}
    />
  );
};

export default Fox;
