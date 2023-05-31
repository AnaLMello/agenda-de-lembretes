const form = document.getElementById('lembrete-form');
const tituloInput = document.getElementById('titulo');
const descricaoInput = document.getElementById('descricao');
const dataInput = document.getElementById('data');
const lembretesLista = document.getElementById('lembretes-lista');
let lembretes = {};

// Obtenha o elemento do calendário
const calendarDays = document.querySelector(".days");

// Adicione um ouvinte de eventos para clicar em um dia no calendário
calendarDays.addEventListener("click", exibirLembretesPorData);

// verificar a existencia de um lembre, se não tiver mostrar um 

form.addEventListener('submit', adicionarLembrete);
function renderizarLembretesPorData(lembretesData) {
  const lembretesContainer = document.getElementById("lembretes-lista");
  lembretesContainer.innerHTML = "";

  if (lembretesData.length === 0) {
    const mensagem = document.createElement("p");
    mensagem.innerText = "Nenhum lembrete encontrado para esta data.";
    lembretesContainer.appendChild(mensagem);
  } 
  
  else {
    lembretesData.forEach((lembrete) => {
      const lembreteItem = document.createElement("div");
      lembreteItem.classList.add("lembrete-item");
      lembreteItem.innerHTML = `<h3>Título:&nbsp${lembrete.titulo}</h3>
        <p>Descrição:&nbsp${lembrete.descricao}</p>`;

	  lembretesContainer.appendChild(lembreteItem);
    });
  }
}

// formatar e adicionar a data certa 
function exibirLembretesPorData(event) {
  const diaSelecionado = event.target.innerText;
  const mesAtual = currMonth;
  const anoAtual = currYear;

  const dataSelecionada = new Date(anoAtual, mesAtual, diaSelecionado).toISOString().split('T')[0];

  if (lembretes[dataSelecionada]) {
    renderizarLembretesPorData(lembretes[dataSelecionada]);
  } else {
    renderizarLembretesPorData([]);
  }
}


// adiconar valores aos lembretes 
function adicionarLembrete(event) {
  event.preventDefault();

  const titulo = tituloInput.value;
  const descricao = descricaoInput.value;
  const data = dataInput.value;

  const lembrete = { titulo, descricao, data };

  if (lembretes[data]) {
    lembretes[data].push(lembrete);
  } else {
    lembretes[data] = [lembrete];
  }

  renderizarLembretes();

  // Limpar os campos do formulário depois de adicionado
  tituloInput.value = '';
  descricaoInput.value = '';
  dataInput.value = '';
}


// mostrar a lista de lembretes em cada dia do evento 
function renderizarLembretes() {
  lembretesLista.innerHTML = '';

  for (const data in lembretes) {
    const lembreteGroup = document.createElement('div');
    lembreteGroup.innerHTML = `<br><h2>${formatarData(data)}</h2> `;

    const lembretesData = lembretes[data];
    lembretesData.forEach((lembrete) => {
      const lembreteItem = document.createElement('div');
      lembreteItem.classList.add('lembrete-item');
      lembreteItem.innerHTML = `
      <br>
      <p>Lembrete:&nbsp${lembrete.titulo} </p>
	
      `;
      lembreteGroup.appendChild(lembreteItem);
    });

    lembretesLista.appendChild(lembreteGroup);
  }
}


// formatar a data padrão 
function formatarData(data) {
  const partesData = data.split('-');
  const dia = partesData[2];
  const mes = partesData[1];
  const ano = partesData[0];
  return `${dia}/${mes}/${ano}`;
}
