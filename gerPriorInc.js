const combinacoes = {
      amb1: {
        cb1: [1, "🔴 Crítico! ⚠️ Necessário incidente, reportar à qualidade e solicitar informações complementares ao cliente."],
        cb2: [2, "🔴 Crítico! ⚠️ Necessário incidente!"],
        cb3: [8, "🟠 Alta prioridade! ⚠️ Necessário Incidente."],
        cb4: [3, "🔴 Crítico! ⚠️ Necessário incidente!"],
        cb5: [7, "🟠 Alta prioridade! ⚠️ Necessário Incidente."],
        cb6: [6, "🟠 Alta a 🟡 média prioridade. ⚠️ Necessário Incidente."],
        cb7: [4, "🔴 Crítico! ⚠️ Necessário incidente!"],
        cb8: [5, "🔴 Crítico! ⚠️ Necessário incidente! + Direcionar ao grupo da função 'Performance Issues'."],
        cb9: [9, "🟠 Alta a 🟡 média prioridade. ⚠️ Necessário incidente. + Direcionar ao grupo da função 'Performance Issues'."],
        cb10: [10, "🟡 Média prioridade. Incidente a critério da situação."],
        cb11: [11, "🟡 Média prioridade. Sem necessidade de incidente."]
      },
      amb2: {
        cb1: [12, "❓ Incompatibilidade de ambiente de Hml/Tst com dano ao paciente. ❓"],
        cb2: [13, "🟠 Alta a 🟡 média prioridade a depender da necessidade do cliente sobre o ambiente. ⚠️ Necessário incidente."],
        cb3: [18, "🟡 Média prioridade. ⚠️ Necessário incidente."],
        cb4: [14, "🟠 Alta a 🟡 média prioridade a depender da necessidade do cliente sobre o ambiente. ⚠️ Necessário incidente."],
        cb5: [16, "🟡 Média prioridade. ⚠️ Necessário incidente."],
        cb6: [17, "🟡 Média prioridade. ⚠️ Necessário incidente."],
        cb7: [15, "🟠 Alta a 🟡 média prioridade a depender da necessidade do cliente sobre o ambiente. ⚠️ Necessário incidente."],
        cb8: [16, "🟠 Alta a 🟡 média prioridade a depender da necessidade do cliente sobre o ambiente. ⚠️ Necessário incidente. + Direcionar ao grupo da função 'Performance Issues'."],
        cb9: [20, "🟡 Média prioridade. ⚠️ Necessário incidente.  + Direcionar ao grupo da função 'Performance Issues'."],
        cb10: [21, "🟡 Média prioridade. Incidente a critério da situação"],
        cb11: [22, "🟡 Média prioridade. Sem necessidade de incidente"]
      }
    };

    function showSection(id, el) {
      document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
      document.getElementById(id).style.display = 'block';

      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active-tab'));
      if (el) el.classList.add('active-tab');
    }

    document.querySelectorAll('.incidente-check, .ambiente-check').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const lista = document.getElementById('listaResumo');
        lista.innerHTML = '';

        const ambientes = Array.from(document.querySelectorAll('.ambiente-check:checked')).map(cb => cb.id);
        const incidentes = Array.from(document.querySelectorAll('.incidente-check:checked')).map(cb => cb.id);

        if (ambientes.length === 1) {
          const amb = ambientes[0];
          let maiorPrioridade = null;

          incidentes.forEach(inc => {
            const combinacao = combinacoes[amb][inc];
            if (combinacao) {
              if (!maiorPrioridade || combinacao[0] < maiorPrioridade[0]) {
                maiorPrioridade = combinacao;
              }
            }
          });

          const item = document.createElement('li');
          item.textContent = maiorPrioridade ? maiorPrioridade[1] : 'Nenhuma diretriz aplicável encontrada para os itens selecionados.';
          lista.appendChild(item);

        } else if (ambientes.length > 1) {
          const item = document.createElement('li');
          item.textContent = 'Selecione apenas um ambiente para gerar o resumo.';
          lista.appendChild(item);
        } else {
          const item = document.createElement('li');
          item.textContent = 'Selecione um ambiente para visualizar o resumo.';
          lista.appendChild(item);
        }
      });
    });

    window.onload = () => {
      showSection('incidentes', document.getElementById('tab-incidentes'));
    };
