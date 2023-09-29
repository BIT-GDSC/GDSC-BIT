import { useEffect } from 'react';

export const Redirect = ({ route }) => {
  useEffect(() => {
    if (route === 'game')
      window.location.replace('https://bit-gdsc.github.io/PokePrompt/')
    else if (route === 'latest')
      window.location.replace(
        'https://gdsc.community.dev/events/details/developer-student-clubs-bengal-institute-of-technology-kolkata-presents-pokeprompt-introduction-to-ai-and-ml/'
      )
  })

  return <div></div>
}