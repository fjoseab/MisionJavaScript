const pokedex = document.getElementById('pokedex');
const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 888; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            hp: result.stats[0].base_stat,
            atq: result.stats[1].base_stat,
            def: result.stats[2].base_stat,
            esp: result.stats[3].base_stat,
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

const fetchPokemonSpecific = () => {
    const pokeNameInput = document.getElementById('pokeName');
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            alert('No se encontro nada en la busqueda')
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            let name = data.name;
            let image = data.sprites['front_default'];
            let type = data.types.map((type) => type.type.name).join(', ');
            let hp = data.stats[0].base_stat;
            let atq = data.stats[1].base_stat;
            let def = data.stats[2].base_stat;
            let esp = data.stats[3].base_stat;
            let id = data.id;

            const pokemonHTMLString = `
            <div class="gameboy" id="GameBoy">
  
  <div class="screen-area">
    
    <div class="power">
      <div class="indicator">
        <div class="led"></div>
        <span class="arc" style="z-index:2"></span>
        <span class="arc" style="z-index:1"></span>
        <span class="arc" style="z-index:0"></span>
      </div>
      POWER
    </div>
    
    <div class="display">
    
    <img class="img" src="${image}"/>
    <h5 >${id}. ${name}</h2>
    <p class="p">Type: ${type}</p>
    <p class="p">Hp: ${hp} Atq: ${atq}</p>
    <p class="p">Def: ${def} Esp: ${esp}</p>
   
    </div>
    
    <div class="label">
      <div class="title">GAME BOY</div>
      <div class="subtitle">
        <span class="c">C</span><!--
     --><span class="o1">O</span><!--
     --><span class="l">L</span><!--
     --><span class="o2">O</span><!--
     --><span class="r">R</span>
      </div>
    </div>
    
  </div>
  
  <div class="nintendo">Nintendo</div>
  
  <div class="controls">
    <div class="dpad">
      <div class="up"><i class="fa fa-caret-up"></i></div>
      <div class="right"><i class="fa fa-caret-right"></i></div>
      <div class="down"><i class="fa fa-caret-down"></i></div>
      <div class="left"><i class="fa fa-caret-left"></i></div>
      <div class="middle"></div>
    </div>
    <div class="a-b">
      <div class="b">B</div>
      <div class="a">A</div>
    </div>
  </div>
  
  <div class="start-select">
    <div class="select">SELECT</div>
    <div class="start">START</div>
  </div>
  
  <div class="speaker">
    <div class="dot placeholder"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot placeholder"></div>
    
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>
    
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>

    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>

    <div class="dot placeholder"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot closed"></div>
    <div class="dot open"></div>
    <div class="dot placeholder"></div>
  </div>
  
</div>

            `;
            pokedex.innerHTML = pokemonHTMLString;
        }
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
            <p class="card-subtitle">Hp: ${pokeman.hp}</p>
            <p class="card-subtitle">Atq: ${pokeman.atq}</p>
            <p class="card-subtitle">Def: ${pokeman.def}</p>
            <p class="card-subtitle">Esp: ${pokeman.esp}</p>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
