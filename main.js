// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};



function pAequorFactory(num, dnaArray) {
  const objectToReturn = {
    specimenNum: num,
    dna: dnaArray,

    mutate() {
      const randomChoice = Math.floor(Math.random() * 15) - 1;
      let newDna = this.dna[randomChoice];
      while (newDna===this.dna[randomChoice]) {
        newDna = returnRandBase();
      }
      this.dna[randomChoice] = newDna
      return this.dna;
    },

    compareDNA(pAequor) {
      let common = 0;
      for (let i=0; i<this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          common++;
        };
      };
      console.log(`Speciment ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${100*common/this.dna.length}% Dna in common.`);
    },

    willLikelySurvive() {
      let timesC = 0;
      let timesG = 0;
      for (let i=0; i<this.dna.length; i++) {
        switch (this.dna[i]) {
          case 'C':
            timesC++;
            break;
          case 'G':
            timesG++;
            break;
        };
      };
      if (100*timesC/this.dna.length > 60 || 100*timesG/this.dna.length > 60) {
        return true;
      } else {
        return false;
      };
    }
  };
  return objectToReturn;
}


const pAequorS = []
for (let i=0; i<30; i++) {
  let pAequor = pAequorFactory(i, mockUpStrand());
  while (!pAequor.willLikelySurvive()) {
    pAequor = pAequorFactory(i, mockUpStrand());
  };
  pAequorS.push(pAequor);
};

console.log(pAequorS);