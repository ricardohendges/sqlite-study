const awardService = require('../services/award');

async function getAward (req, res) {
  try {
    let result = await awardService.getAward();
    let producers = [];
    result.map(movie => {
      const splitedProducers = movie.MOV_PRODUCERS.split(',').map(prod => prod.split(' and '));
      splitedProducers.map(prod => {
        prod.map(item => {
          if (item.trim()) {
            const exists = producers.find(p => item.trim() == p.producer);
            if (exists) {
              exists.qtde++;
              exists.year.push(movie.MOV_YEAR);
            }
            else {
              newProd = { producer: item.trim(), qtde: 1, year: [movie.MOV_YEAR] };
              producers.push(newProd);
            } 
          }
        })
      })
    });
    producers = producers.filter(p => p.qtde > 1);
    intervalos = [];
    producers.map(p => {
      p.intervals = []
      p.year.sort((a,b) => a-b);
      for (let i = 0; i < p.year.length-1; i++) {
        const newInterval = {
          inicio: p.year[i],
          fim: p.year[i+1],
          intervalo: p.year[i+1] - p.year[i]
        }
        intervalos.push(newInterval.intervalo);
        p.intervals.push(newInterval);
      }
    })
    const menorIntervalo = Math.min(...intervalos);
    const maiorIntervalo = Math.max(...intervalos);
    let menorProducer = [];
    producers.filter(p => p.intervals.some(i => i.intervalo === menorIntervalo))
      .map(el => {
        el.intervals.filter(i => i.intervalo == menorIntervalo)
          .map(i => {
            const formatedEl = {}
            formatedEl.producer = el.producer;
            formatedEl.interval = menorIntervalo;
            formatedEl.previousWin = i.inicio;
            formatedEl.followingWin = i.fim;
            menorProducer.push(formatedEl);
        })
      });
    let maiorProducer = [];
    producers.filter(p => p.intervals.some(i => i.intervalo === maiorIntervalo))
      .map(el => {
        el.intervals.filter(i => i.intervalo == maiorIntervalo)
          .map(i => {
            const formatedEl = {};
            formatedEl.producer = el.producer;
            formatedEl.interval = maiorIntervalo;
            formatedEl.previousWin = i.inicio;
            formatedEl.followingWin = i.fim;
            maiorProducer.push(formatedEl);
          })
      });
    res.status(200).json({min: menorProducer, max: maiorProducer});
  } catch (err) {
    res.status(500).json(err.message);
  }
}

module.exports.getAward = getAward;