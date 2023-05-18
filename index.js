const fs = require('fs').promises;

const func = async () => {
  try {
    const text = await fs.readFile('./scenario.txt', 'utf-8');
    const res = {};
    const matches = [...text.matchAll(/^(Max|Geralt|Triss|Yennefer):/gmi)];
    
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      const [_1, characterName] = match;
      const { index } = match;

      if (res[characterName]) {
        res[characterName].push({
          start: index,
          end: matches[i + 1] ? matches[i + 1].index : -1,
        });
      } else {
        res[characterName] = [{
          start: index,
          end: matches[i + 1] ? matches[i + 1].index : -1,
        }];
      }
    }
    
    console.log(res);
    
    const characters = {
      Max: "Max",
      Geralt: "Geralt",
      Yennefer: "Yennefer",
      Triss: "Triss",
    };
    
    for (const character in characters) {
      if (res[character]) {
        let content = '';
        for (let i = 0; i < res[character].length; i++) {
          const ab = text.slice(res[character][i].start, res[character][i].end);
          content += ab + '\n';
        }
        
        await fs.writeFile(`./${character}.txt`, content, { encoding: 'utf-8' });
      }
    }
  } catch (err) {
    console.error(err);
  }
};

func();