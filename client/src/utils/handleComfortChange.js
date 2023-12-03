export const handleComfortChange = (event, selectedComforts, setSelectedComforts) => {
    const comfort = event.target.value;
    setSelectedComforts((prevComforts) => {
      if (prevComforts.includes(comfort)) {
        return prevComforts.filter((c) => c !== comfort);
      } else {
        return [...prevComforts, comfort];
      }
    });
  };