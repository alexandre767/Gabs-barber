const form = document.getElementById("agendamentoForm");
const lista = document.getElementById("lista");

let agendamentos =
JSON.parse(localStorage.getItem("agendamentos")) || [];

function salvar() {
    localStorage.setItem(
        "agendamentos",
        JSON.stringify(agendamentos)
    );
}

function renderizar() {
    lista.innerHTML = "";

    agendamentos.forEach((item, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>
                <strong>${item.nome}</strong><br>
                📅 ${item.data} ⏰ ${item.horario}
            </span>

            <button class="excluir"
            onclick="remover(${index})">
            Excluir
            </button>
        `;

        lista.appendChild(li);
    });
}

function remover(index){
    agendamentos.splice(index,1);
    salvar();
    renderizar();
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const nome =
    document.getElementById("nome").value;

    const data =
    document.getElementById("data").value;

    const horario =
    document.getElementById("horario").value;

    const conflito = agendamentos.find(
        a => a.data === data &&
        a.horario === horario
    );

    if(conflito){
        alert("Horário já ocupado!");
        return;
    }

    agendamentos.push({
        nome,
        data,
        horario
    });

    salvar();
    renderizar();

    form.reset();
});

renderizar();
