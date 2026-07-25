// Script específico para a área dos pais

// Navegação entre seções
function showSection(sectionId) {
    // Esconde todas as seções
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active de todos os botões
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostra a seção selecionada
    document.getElementById(sectionId).classList.add('active');
    
    // Ativa o botão correspondente
    event.target.classList.add('active');

    if (detectarMobile()) {
        setTimeout(() => {
            document.getElementById(sectionId).scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    }
}

// Modal functions
function openModal(content) {
    document.getElementById('modalBody').innerHTML = content;
    document.getElementById('actionModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('actionModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fechar modal com ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Fechar modal clicando fora
window.onclick = function(event) {
    const modal = document.getElementById('actionModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 1001;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        animation: slideInRight 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Funções específicas para cada ação
function viewChildProfile(childId) {
    const childName = childId === 'P001' ? 'Maria Silva' : 'João Santos';
    const content = `
        <div class="modal-header">
            <h2>Perfil de ${childName}</h2>
        </div>
        <div style="padding: 20px 30px 30px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                <div style="background: #f8fafc; padding: 15px; border-radius: 10px;">
                    <strong>Idade:</strong><br>${childId === 'P001' ? '8 anos' : '6 anos'}
                </div>
                <div style="background: #f8fafc; padding: 15px; border-radius: 10px;">
                    <strong>Sessões realizadas:</strong><br>${childId === 'P001' ? '12' : '8'}
                </div>
            </div>
            
            <div style="background: #f0fff4; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <p style="margin: 0; color: #38a169; font-weight: 600;">
                    <i class="fas fa-check-circle"></i> Próxima sessão: ${childId === 'P001' ? '25/10/2025 - 10:00' : 'Não agendada'}
                </p>
            </div>
            
            <div style="background: #fffaf0; padding: 15px; border-radius: 10px; margin-bottom: 25px;">
                <h4 style="margin: 0 0 10px 0; color: #dd6b20;">
                    <i class="fas fa-chart-line"></i> Progresso Recente
                </h4>
                <p style="margin: 0; font-size: 14px; color: #475569;">
                    ${childId === 'P001' ? 
                      'Maria está respondendo bem às técnicas de relaxamento e demonstrando maior confiança nas sessões.' : 
                      'João está desenvolvando melhor suas habilidades de comunicação e expressão emocional.'}
                </p>
            </div>
            
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button class="btn-primary" style="flex: 1;" onclick="scheduleSession('${childId}')">
                    <i class="fas fa-calendar-plus"></i> Agendar Sessão
                </button>
                <button class="btn-secondary" style="flex: 1;" onclick="openProgress()">
                    <i class="fas fa-chart-bar"></i> Ver Progresso
                </button>
            </div>
        </div>
    `;
    openModal(content);
}

function scheduleSession(childId = null) {
    const childText = childId ? ` para ${childId === 'P001' ? 'Maria' : 'João'}` : '';
    const content = `
        <div class="modal-header">
            <h2>Agendar Nova Sessão${childText}</h2>
        </div>
        <div style="padding: 20px 30px 30px;">
            <div style="display: grid; gap: 20px;">
                <label>
                    <strong>Tipo de Sessão:</strong>
                    <select id="sessionType" style="width: 100%; padding: 12px; margin-top: 8px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;" onchange="updateSessionPrice()">
                        <option value="avaliacao" data-price="120">🔍 Avaliação Inicial (60 min) - R$ 120,00</option>
                        <option value="terapia_individual" data-price="150">💬 Terapia Individual (50 min) - R$ 150,00</option>
                        <option value="terapia_familiar" data-price="200">👨‍👩‍👧‍👦 Terapia Familiar (75 min) - R$ 200,00</option>
                        <option value="orientacao_pais" data-price="100">👥 Orientação para Pais (45 min) - R$ 100,00</option>
                        <option value="emergencia" data-price="180">🚨 Sessão de Emergência (60 min) - R$ 180,00</option>
                        <option value="acompanhamento" data-price="130">📊 Acompanhamento Contínuo (50 min) - R$ 130,00</option>
                    </select>
                </label>

                <label>
                    <strong>Psicólogo(a):</strong>
                    <select style="width: 100%; padding: 12px; margin-top: 8px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                        <option>Dra. Ana Silva - Especialista em Infância</option>
                        <option>Dr. Carlos Santos - Terapia Familiar</option>
                        <option>Dra. Mariana Oliveira - Ansiedade Infantil</option>
                        <option>Dr. Pedro Almeida - Desenvolvimento</option>
                    </select>
                </label>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <label>
                        <strong>Modalidade:</strong>
                        <select style="width: 100%; padding: 12px; margin-top: 8px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                            <option>👥 Presencial</option>
                            <option>💻 Online (Videochamada)</option>
                        </select>
                    </label>

                    <label>
                        <strong>Data:</strong>
                        <input type="date" style="width: 100%; padding: 12px; margin-top: 8px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                    </label>
                </div>

                <label>
                    <strong>Horário:</strong>
                    <select style="width: 100%; padding: 12px; margin-top: 8px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                        <option>09:00 - 10:00</option>
                        <option>10:30 - 11:30</option>
                        <option>14:00 - 15:00</option>
                        <option>15:30 - 16:30</option>
                        <option>17:00 - 18:00</option>
                    </select>
                </label>

                <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin: 10px 0;">
                    <h4 style="margin: 0 0 15px 0; color: #2d3748; text-align: center;">💰 Resumo Financeiro</h4>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px; padding: 5px 0;">
                        <span>Valor da Sessão:</span>
                        <span id="sessionPrice" style="font-weight: 600;">R$ 120,00</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px; padding: 5px 0;">
                        <span>Taxa administrativa:</span>
                        <span style="font-weight: 600;">R$ 15,00</span>
                    </div>
                    <hr style="margin: 15px 0; border: none; border-top: 2px solid #e2e8f0;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px; padding: 5px 0;">
                        <span>Total:</span>
                        <span id="totalPrice" style="color: #3b82f6;">R$ 135,00</span>
                    </div>
                </div>

                <label>
                    <strong>Forma de Pagamento:</strong>
                    <select style="width: 100%; padding: 12px; margin-top: 8px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                        <option>💳 Cartão de Crédito</option>
                        <option>📱 PIX</option>
                        <option>💰 Débito Online</option>
                        <option>📄 Boleto Bancário</option>
                    </select>
                </label>

                <label>
                    <strong>Observações (opcional):</strong>
                    <textarea style="width: 100%; padding: 12px; margin-top: 8px; border: 2px solid #e2e8f0; border-radius: 8px; height: 80px; resize: vertical; font-size: 14px;" placeholder="Alguma informação adicional que considere importante..."></textarea>
                </label>

                <div style="background: #fffaf0; padding: 15px; border-radius: 10px; margin: 10px 0;">
                    <p style="margin: 0; color: #dd6b20; font-size: 13px; text-align: center;">
                        <strong>📝 Política de Cancelamento:</strong> Cancelamentos com até 24h de antecedência têm reembolso total. Após este prazo, será cobrada taxa de 50%.
                    </p>
                </div>
            </div>
            
            <button class="btn-primary" style="width: 100%; margin-top: 20px; padding: 15px;" onclick="confirmSchedule()">
                <i class="fas fa-calendar-check"></i> Confirmar Agendamento
            </button>
        </div>
    `;
    openModal(content);
}

// Função para atualizar preços dinamicamente
function updateSessionPrice() {
    const sessionType = document.getElementById('sessionType');
    if (!sessionType) return;
    
    const selectedOption = sessionType.options[sessionType.selectedIndex];
    const sessionPrice = parseFloat(selectedOption.getAttribute('data-price'));
    const totalPrice = sessionPrice + 15;
    
    document.getElementById('sessionPrice').textContent = `R$ ${sessionPrice.toFixed(2)}`;
    document.getElementById('totalPrice').textContent = `R$ ${totalPrice.toFixed(2)}`;
}

function confirmSchedule() {
    closeModal();
    showNotification('Sessão agendada com sucesso! Você receberá um e-mail de confirmação.', 'success');
}

function addChild() {
    const content = `
        <div class="modal-header">
            <h2>Adicionar Nova Criança</h2>
        </div>
        <div style="padding: 20px 30px 30px;">
            <div style="display: grid; gap: 20px;">
                <label>
                    <strong>Nome completo:</strong>
                    <input type="text" style="width: 100%; padding: 12px; margin-top: 8px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;" placeholder="Digite o nome completo">
                </label>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <label>
                        <strong>Data de nascimento:</strong>
                        <input type="date" style="width: 100%; padding: 12px; margin-top: 8px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                    </label>
                    
                    <label>
                        <strong>Gênero:</strong>
                        <select style="width: 100%; padding: 12px; margin-top: 8px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                            <option>Feminino</option>
                            <option>Masculino</option>
                            <option>Prefiro não informar</option>
                        </select>
                    </label>
                </div>
                
                <label>
                    <strong>Informações adicionais (opcional):</strong>
                    <textarea style="width: 100%; padding: 12px; margin-top: 8px; border: 2px solid #e2e8f0; border-radius: 8px; height: 80px; resize: vertical; font-size: 14px;" placeholder="Alergias, condições médicas, observações importantes..."></textarea>
                </label>
                
                <div style="background: #f0f9ff; padding: 15px; border-radius: 10px;">
                    <p style="margin: 0; color: #0369a1; font-size: 13px;">
                        <strong>🔒 Segurança:</strong> Todas as informações são protegidas por sigilo profissional e criptografia.
                    </p>
                </div>
            </div>
            
            <button class="btn-primary" style="width: 100%; margin-top: 20px; padding: 15px;" onclick="confirmAddChild()">
                <i class="fas fa-user-plus"></i> Cadastrar Criança
            </button>
        </div>
    `;
    openModal(content);
}

function confirmAddChild() {
    closeModal();
    showNotification('Criança cadastrada com sucesso!', 'success');
}

function contactPsychologist() {
    const content = `
        <div class="modal-header">
            <h2>Falar com Psicólogo</h2>
        </div>
        <div style="padding: 20px 30px 30px;">
            <div style="display: grid; gap: 20px;">
                <label>
                    <strong>Psicólogo(a):</strong>
                    <select style="width: 100%; padding: 12px; margin-top: 8px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                        <option>Dra. Maria Silva</option>
                        <option>Dr. João Santos</option>
                        <option>Dra. Ana Oliveira</option>
                        <option>Equipe de Plantão</option>
                    </select>
                </label>
                
                <label>
                    <strong>Assunto:</strong>
                    <select style="width: 100%; padding: 12px; margin-top: 8px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                        <option>Dúvida sobre sessão</option>
                        <option>Relatar preocupação</option>
                        <option>Questão sobre comportamento</option>
                        <option>Feedback sobre tratamento</option>
                        <option>Outro</option>
                    </select>
                </label>
                
                <label>
                    <strong>Mensagem:</strong>
                    <textarea style="width: 100%; padding: 12px; margin-top: 8px; border: 2px solid #e2e8f0; border-radius: 8px; height: 150px; resize: vertical; font-size: 14px;" placeholder="Descreva sua dúvida ou preocupação de forma clara e detalhada..."></textarea>
                </label>
                
                <label>
                    <strong>Urgência:</strong>
                    <div style="display: flex; gap: 15px; margin-top: 8px;">
                        <label style="display: flex; align-items: center; gap: 5px;">
                            <input type="radio" name="urgency" value="baixa" checked>
                            <span>Baixa</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 5px;">
                            <input type="radio" name="urgency" value="media">
                            <span>Média</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 5px;">
                            <input type="radio" name="urgency" value="alta">
                            <span>Alta</span>
                        </label>
                    </div>
                </label>
                
                <div style="background: #fef3cd; padding: 15px; border-radius: 10px;">
                    <p style="margin: 0; color: #92400e; font-size: 13px;">
                        <strong>⏰ Tempo de Resposta:</strong> Mensagens com urgência alta são respondidas em até 2 horas. Demais mensagens em até 24 horas.
                    </p>
                </div>
            </div>
            
            <button class="btn-primary" style="width: 100%; margin-top: 20px; padding: 15px;" onclick="sendMessage()">
                <i class="fas fa-paper-plane"></i> Enviar Mensagem
            </button>
        </div>
    `;
    openModal(content);
}

function sendMessage() {
    closeModal();
    showNotification('Mensagem enviada ao psicólogo! Você receberá uma resposta em breve.', 'success');
}

function openProgress() {
    const content = `
        <div class="modal-header">
            <h2>Acompanhamento do Progresso</h2>
        </div>
        <div style="padding: 20px 30px 30px;">
            <div style="text-align: center; margin-bottom: 25px;">
                <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #3b82f6, #60a5fa); display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
                    <i class="fas fa-chart-line" style="color: white; font-size: 32px;"></i>
                </div>
                <h3 style="color: #1e293b; margin-bottom: 5px;">Maria Silva</h3>
                <p style="color: #6b7280; margin: 0;">8 anos | 12 sessões realizadas</p>
            </div>
            
            <div style="display: grid; gap: 15px;">
                <div style="background: #f0fff4; padding: 15px; border-radius: 10px;">
                    <h4 style="margin: 0 0 10px 0; color: #38a169;">
                        <i class="fas fa-check-circle"></i> Progresso Positivo
                    </h4>
                    <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.5;">
                        A criança está respondendo bem às técnicas de relaxamento e demonstrando maior confiança durante as sessões. Houve melhora significativa na expressão de sentimentos.
                    </p>
                </div>
                
                <div style="background: #fffaf0; padding: 15px; border-radius: 10px;">
                    <h4 style="margin: 0 0 10px 0; color: #dd6b20;">
                        <i class="fas fa-bullseye"></i> Metas Alcançadas
                    </h4>
                    <ul style="margin: 0; color: #475569; font-size: 14px; padding-left: 20px;">
                        <li>Melhora na comunicação de sentimentos</li>
                        <li>Redução de episódios de ansiedade</li>
                        <li>Maior engajamento nas atividades</li>
                    </ul>
                </div>
                
                <div style="background: #f8fafc; padding: 15px; border-radius: 10px;">
                    <h4 style="margin: 0 0 10px 0; color: #3b82f6;">
                        <i class="fas fa-calendar-check"></i> Próximos Passos
                    </h4>
                    <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.5;">
                        Continuar com exercícios de respiração em casa. Próxima avaliação formal em 2 semanas. Manter comunicação regular sobre o progresso.
                    </p>
                </div>
            </div>
            
            <div style="margin-top: 25px; text-align: center;">
                <button class="btn-secondary" onclick="closeModal()">
                    <i class="fas fa-times"></i> Fechar
                </button>
            </div>
        </div>
    `;
    openModal(content);
}

// Artigos educativos completos
function openArticle(articleId) {
    const articles = {
        'comunicacao': {
            title: 'Comunicação Não-Violenta com Crianças',
            content: `
                <h3 style="color: #1e293b; margin-bottom: 20px;">💬 Como Estabelecer Diálogo Eficaz</h3>
                
                <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="color: #0369a1; margin-bottom: 15px;">🎯 Princípios Básicos</h4>
                    <ul style="color: #475569; line-height: 1.6;">
                        <li><strong>Escuta ativa:</strong> Dê total atenção quando a criança fala</li>
                        <li><strong>Validação emocional:</strong> Reconheça e valide os sentimentos</li>
                        <li><strong>Linguagem apropriada:</strong> Use palavras que a criança entenda</li>
                        <li><strong>Paciência:</strong> Dê tempo para a criança se expressar</li>
                    </ul>
                </div>

                <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="color: #15803d; margin-bottom: 15px;">✅ O Que Fazer</h4>
                    <ul style="color: #475569; line-height: 1.6;">
                        <li>Faça perguntas abertas que incentivem a conversa</li>
                        <li>Use exemplos concretos e situações do dia a dia</li>
                        <li>Mantenha contato visual no nível da criança</li>
                        <li>Repita o que entendeu para confirmar</li>
                    </ul>
                </div>

                <div style="background: #fef2f2; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="color: #dc2626; margin-bottom: 15px;">❌ O Que Evitar</h4>
                    <ul style="color: #475569; line-height: 1.6;">
                        <li>Interromper quando a criança está falando</li>
                        <li>Minimizar sentimentos ("não foi nada")</li>
                        <li>Fazer muitas perguntas de uma vez</li>
                        <li>Usar linguagem técnica ou complexa</li>
                    </ul>
                </div>

                <div style="background: #fffbeb; padding: 20px; border-radius: 10px;">
                    <h4 style="color: #d97706; margin-bottom: 15px;">💡 Dicas Práticas</h4>
                    <p style="color: #475569; line-height: 1.6; margin: 0;">
                        Estabeleça um "momento do diálogo" todos os dias. Use histórias e brincadeiras para abordar temas difíceis. 
                        Lembre-se: a comunicação é uma via de mão dupla - tão importante quanto falar é saber ouvir.
                    </p>
                </div>
            `
        },
        'sinais': {
            title: 'Identificando Sinais de Alerta',
            content: `
                <h3 style="color: #1e293b; margin-bottom: 20px;">🔍 Comportamentos que Exigem Atenção</h3>
                
                <div style="background: #fef2f2; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="color: #dc2626; margin-bottom: 15px;">🚨 Sinais Comportamentais</h4>
                    <ul style="color: #475569; line-height: 1.6;">
                        <li>Mudanças bruscas no comportamento</li>
                        <li>Regressão a comportamentos infantis</li>
                        <li>Medo excessivo de pessoas ou lugares</li>
                        <li>Comportamento sexualizado inadequado</li>
                        <li>Isolamento social repentino</li>
                    </ul>
                </div>

                <div style="background: #fff7ed; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="color: #ea580c; margin-bottom: 15px;">😔 Sinais Emocionais</h4>
                    <ul style="color: #475569; line-height: 1.6;">
                        <li>Tristeza ou irritabilidade persistente</li>
                        <li>Pesadelos frequentes ou problemas de sono</li>
                        <li>Baixa autoestima ou autodepreciação</li>
                        <li>Ansiedade de separação excessiva</li>
                        <li>Perda de interesse em atividades antes prazerosas</li>
                    </ul>
                </div>

                <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="color: #0369a1; margin-bottom: 15px;">📚 Sinais Escolares</h4>
                    <ul style="color: #475569; line-height: 1.6;">
                        <li>Queda repentina no rendimento escolar</li>
                        <li>Dificuldade de concentração</li>
                        <li>Faltas frequentes ou resistência em ir à escola</li>
                        <li>Problemas de relacionamento com colegas</li>
                        <li>Comportamento agressivo ou de oposição</li>
                    </ul>
                </div>

                <div style="background: #f0fdf4; padding: 20px; border-radius: 10px;">
                    <h4 style="color: #15803d; margin-bottom: 15px;">💡 Quando Buscar Ajuda</h4>
                    <p style="color: #475569; line-height: 1.6; margin: 0;">
                        Se observar vários desses sinais persistindo por mais de duas semanas, ou se algum comportamento 
                        for particularmente preocupante, busque orientação profissional. Lembre-se: é melhor prevenir do que remediar.
                    </p>
                </div>
            `
        },
        'prevencao': {
            title: 'Prevenção e Proteção Infantil',
            content: `
                <h3 style="color: #1e293b; margin-bottom: 20px;">🛡️ Estratégias para Proteger sua Criança</h3>
                
                <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="color: #0369a1; margin-bottom: 15px;">🏠 Em Casa</h4>
                    <ul style="color: #475569; line-height: 1.6;">
                        <li>Estabeleça regras claras sobre privacidade corporal</li>
                        <li>Ensine os nomes corretos das partes do corpo</li>
                        <li>Crie um ambiente onde a criança se sinta segura para falar</li>
                        <li>Supervisione o uso da internet e redes sociais</li>
                        <li>Conheça os amigos e suas famílias</li>
                    </ul>
                </div>

                <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="color: #15803d; margin-bottom: 15px;">🎒 Fora de Casa</h4>
                    <ul style="color: #475569; line-height: 1.6;">
                        <li>Conheça os profissionais que trabalham com sua criança</li>
                        <li>Visite escolas, clubes e locais que a criança frequenta</li>
                        <li>Ensine sobre situações de risco e como pedir ajuda</li>
                        <li>Estabeleça uma palavra-código para emergências</li>
                        <li>Oriente sobre como identificar adultos confiáveis</li>
                    </ul>
                </div>

                <div style="background: #fff7ed; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="color: #ea580c; margin-bottom: 15px;">💬 Educação Sexual Adequada</h4>
                    <ul style="color: #475569; line-height: 1.6;">
                        <li>Ensine sobre consentimento desde cedo</li>
                        <li>Explique a diferença entre toques bons e ruins</li>
                        <li>Fale sobre privacidade e limites corporais</li>
                        <li>Use materiais educativos apropriados para a idade</li>
                        <li>Responda perguntas de forma honesta e simples</li>
                    </ul>
                </div>

                <div style="background: #fefce8; padding: 20px; border-radius: 10px;">
                    <h4 style="color: #ca8a04; margin-bottom: 15px;">📞 Plano de Ação</h4>
                    <p style="color: #475569; line-height: 1.6; margin: 0;">
                        Tenha um plano claro do que fazer em caso de suspeita. Mantenha os contatos de emergência 
                        acessíveis. Lembre-se: a prevenção é um processo contínuo que requer atenção constante e 
                        comunicação aberta com a criança.
                    </p>
                </div>
            `
        },
        'acolhimento': {
            title: 'Técnicas de Acolhimento Emocional',
            content: `
                <h3 style="color: #1e293b; margin-bottom: 20px;">🤗 Como Oferecer Suporte Adequado</h3>
                
                <div style="background: #faf5ff; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="color: #7c3aed; margin-bottom: 15px;">💝 Validação Emocional</h4>
                    <ul style="color: #475569; line-height: 1.6;">
                        <li>Reconheça e nomeie os sentimentos da criança</li>
                        <li>Evite frases como "não foi nada" ou "para de chorar"</li>
                        <li>Use expressões como "entendo que você está se sentindo..."</li>
                        <li>Mostre que todos os sentimentos são aceitáveis</li>
                        <li>Ensine que sentimentos são diferentes de ações</li>
                    </ul>
                </div>

                <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="color: #0369a1; margin-bottom: 15px;">🎨 Estratégias Práticas</h4>
                    <ul style="color: #475569; line-height: 1.6;">
                        <li>Crie um "cantinho da calma" em casa</li>
                        <li>Use livros e histórias para trabalhar emoções</li>
                        <li>Pratique exercícios de respiração juntos</li>
                        <li>Estabeleça rotinas que tragam segurança</li>
                        <li>Use brincadeiras para expressar sentimentos</li>
                    </ul>
                </div>

                <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="color: #15803d; margin-bottom: 15px;">🗣️ Comunicação Acolhedora</h4>
                    <ul style="color: #475569; line-height: 1.6;">
                        <li>Mantenha a calma mesmo em situações difíceis</li>
                        <li>Use tom de voz suave e corporal aberta</li>
                        <li>Ofereça abraços e contato físico (se a criança quiser)</li>
                        <li>Seja paciente - algumas coisas levam tempo</li>
                        <li>Celebre pequenas conquistas e progressos</li>
                    </ul>
                </div>

                <div style="background: #fffbeb; padding: 20px; border-radius: 10px;">
                    <h4 style="color: #d97706; margin-bottom: 15px;">🌟 Lembretes Importantes</h4>
                    <p style="color: #475569; line-height: 1.6; margin: 0;">
                        O acolhimento não significa permitir tudo, mas sim entender as emoções por trás dos comportamentos. 
                        Crianças que se sentem acolhidas desenvolvem resiliência emocional e confiança para enfrentar desafios.
                    </p>
                </div>
            `
        },
        'trauma': {
            title: 'Entendendo o Trauma Infantil',
            content: `
                <h3 style="color: #1e293b; margin-bottom: 20px;">🩺 Como a Psicoterapia Pode Ajudar</h3>
                
                <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="color: #0369a1; margin-bottom: 15px;">🧠 O Que é Trauma?</h4>
                    <p style="color: #475569; line-height: 1.6; margin-bottom: 15px;">
                        Trauma é a resposta emocional a um evento profundamente angustiante ou perturbador que 
                        supera a capacidade da criança de lidar com a situação.
                    </p>
                    <ul style="color: #475569; line-height: 1.6;">
                        <li>Pode resultar de uma única experiência ou de eventos repetidos</li>
                        <li>Afeta o desenvolvimento cerebral e emocional</li>
                        <li>Manifesta-se de diferentes formas em cada criança</li>
                        <li>Pode ter efeitos de longo prazo se não tratado</li>
                    </ul>
                </div>

                <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="color: #15803d; margin-bottom: 15px;">💊 Abordagens Terapêuticas</h4>
                    <ul style="color: #475569; line-height: 1.6;">
                        <li><strong>Terapia Cognitivo-Comportamental:</strong> Trabalha pensamentos e comportamentos</li>
                        <li><strong>Terapia do Jogo:</strong> Usa brincadeiras para processar emoções</li>
                        <li><strong>EMDR:</strong> Dessensibilização e reprocessamento por movimentos oculares</li>
                        <li><strong>Terapia Familiar:</strong> Envolve toda a família no processo de cura</li>
                        <li><strong>Abordagem Sistêmica:</strong> Considera o contexto social da criança</li>
                    </ul>
                </div>

                <div style="background: #fff7ed; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="color: #ea580c; margin-bottom: 15px;">⏱️ Processo de Cura</h4>
                    <ul style="color: #475569; line-height: 1.6;">
                        <li>Estabelecimento de segurança e confiança</li>
                        <li>Processamento das memórias traumáticas</li>
                        <li>Desenvolvimento de habilidades de regulação emocional</li>
                        <li>Reconexão com atividades prazerosas</li>
                        <li>Fortalecimento de vínculos saudáveis</li>
                    </ul>
                </div>

                <div style="background: #fefce8; padding: 20px; border-radius: 10px;">
                    <h4 style="color: #ca8a04; margin-bottom: 15px;">🤝 Papel da Família</h4>
                    <p style="color: #475569; line-height: 1.6; margin: 0;">
                        A família é parte essencial do processo terapêutico. O apoio consistente, a paciência e 
                        a compreensão são fundamentais para a recuperação. Lembre-se: cura não é esquecer, mas 
                        aprender a viver com as experiências de forma saudável.
                    </p>
                </div>
            `
        },
        'regulacao': {
            title: 'Regulação Emocional em Casa',
            content: `
                <h3 style="color: #1e293b; margin-bottom: 20px;">🏠 Criando um Ambiente Seguro e Acolhedor</h3>
                
                <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="color: #15803d; margin-bottom: 15px;">🎯 Estrutura e Rotina</h4>
                    <ul style="color: #475569; line-height: 1.6;">
                        <li>Estabeleça horários consistentes para refeições e sono</li>
                        <li>Crie rituais familiares (hora da história, jantar em família)</li>
                        <li>Mantenha o ambiente organizado e previsível</li>
                        <li>Comunique mudanças na rotina com antecedência</li>
                        <li>Use calendários visuais para crianças menores</li>
                    </ul>
                </div>

                <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="color: #0369a1; margin-bottom: 15px;">😊 Gestão de Emoções</h4>
                    <ul style="color: #475569; line-height: 1.6;">
                        <li>Ensine a identificar e nomear diferentes emoções</li>
                        <li>Crie um "termômetro das emoções" visual</li>
                        <li>Pratique técnicas de respiração e relaxamento</li>
                        <li>Use histórias para falar sobre sentimentos difíceis</li>
                        <li>Valide todas as emoções, mesmo as desagradáveis</li>
                    </ul>
                </div>

                <div style="background: #faf5ff; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h4 style="color: #7c3aed; margin-bottom: 15px;">🛋️ Espaços de Conforto</h4>
                    <ul style="color: #475569; line-height: 1.6;">
                        <li>Crie um "cantinho da calma" com objetos tranquilizadores</li>
                        <li>Tenha disponíveis materiais para expressão criativa</li>
                        <li>Mantenha livros sobre emoções acessíveis</li>
                        <li>Ofereça opções de atividades relaxantes</li>
                        <li>Respeite a necessidade de espaço pessoal</li>
                    </ul>
                </div>

                <div style="background: #fffbeb; padding: 20px; border-radius: 10px;">
                    <h4 style="color: #d97706; margin-bottom: 15px;">💝 Comunicação Familiar</h4>
                    <p style="color: #475569; line-height: 1.6; margin: 0;">
                        Estabeleça momentos regulares de conversa em família. Pratique a escuta ativa e 
                        a validação emocional. Lembre-se: um ambiente emocionalmente seguro é aquele onde 
                        todos os sentimentos são permitidos e todas as vozes são ouvidas.
                    </p>
                </div>
            `
        }
    };

    const article = articles[articleId];
    const content = `
        <div class="modal-header">
            <h2>${article.title}</h2>
        </div>
        <div style="padding: 20px 30px 30px; max-height: 70vh; overflow-y: auto;">
            ${article.content}
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0;">
                <p style="margin: 0; color: #6b7280; font-style: italic; text-align: center;">
                    Este conteúdo foi preparado por nossa equipe de psicólogos especializados. 
                    Para dúvidas específicas, entre em contato com um profissional.
                </p>
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <button class="btn-primary" onclick="closeModal()">
                    <i class="fas fa-times"></i> Fechar
                </button>
            </div>
        </div>
    `;
    openModal(content);
}

function openEmergency(type) {
    const emergencies = {
        'disque100': {
            title: 'Disque Denúncia - 100',
            content: 'Serviço gratuito de proteção de crianças e adolescentes. Funciona 24h, incluindo finais de semana e feriados.'
        },
        'conselho': {
            title: 'Conselho Tutelar',
            content: 'Encontre o Conselho Tutelar mais próximo da sua região através do site do Ministério da Mulher, Família e Direitos Humanos.'
        },
        'policia': {
            title: 'Polícia Especializada',
            content: 'Delegacias especializadas no atendimento a crianças e adolescentes. Disque 190 para emergências.'
        },
        'cvv': {
            title: 'CVV - Centro de Valorização da Vida',
            content: 'Atendimento 24h para apoio emocional e prevenção do suicídio. Ligue 188 ou acesse o chat online.'
        }
    };

    const emergency = emergencies[type];
    const content = `
        <div class="modal-header">
            <h2>${emergency.title}</h2>
        </div>
        <div style="padding: 30px; text-align: center;">
            <div style="font-size: 48px; color: #ef4444; margin-bottom: 20px;">
                <i class="fas fa-phone-alt"></i>
            </div>
            <h3 style="color: #1e293b; margin-bottom: 15px;">${emergency.title}</h3>
            <p style="color: #475569; line-height: 1.6; margin-bottom: 25px;">
                ${emergency.content}
            </p>
            <div style="background: #fef3cd; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <p style="margin: 0; color: #92400e; font-size: 14px;">
                    <strong>⚠️ Importante:</strong> Em caso de emergência, não hesite em buscar ajuda imediatamente.
                </p>
            </div>
            <button class="btn-primary" onclick="closeModal()">
                <i class="fas fa-check"></i> Entendi
            </button>
        </div>
    `;
    openModal(content);
}

function openResource(type) {
    const resources = {
        'grupos': {
            title: 'Grupos de Apoio',
            content: 'Conecte-se com outros pais e responsáveis que passam por experiências similares.'
        },
        'materiais': {
            title: 'Materiais Educativos',
            content: 'Acesse nossa biblioteca de cartilhas, guias e recursos para proteção infantil.'
        },
        'cuidador': {
            title: 'Cuidado com o Cuidador',
            content: 'Recursos e orientações para o autocuidado dos responsáveis durante o processo terapêutico.'
        }
    };

    const resource = resources[type];
    const content = `
        <div class="modal-header">
            <h2>${resource.title}</h2>
        </div>
        <div style="padding: 30px; text-align: center;">
            <div style="font-size: 48px; color: #3b82f6; margin-bottom: 20px;">
                <i class="fas fa-hands-helping"></i>
            </div>
            <p style="color: #475569; line-height: 1.6; margin-bottom: 25px;">
                ${resource.content}
            </p>
            <div style="background: #f0f9ff; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <p style="margin: 0; color: #0369a1; font-size: 14px;">
                    <strong>💡 Dica:</strong> Estes recursos são complementares ao acompanhamento profissional.
                </p>
            </div>
            <button class="btn-primary" onclick="closeModal()">
                <i class="fas fa-check"></i> Entendi
            </button>
        </div>
    `;
    openModal(content);
}

function detectarMobile() {
    return window.innerWidth <= 768;
}

// Modal de Login (reutilizado da página inicial)
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal-login');
    const btn = document.getElementById('btn-entrar');
    const span = document.getElementsByClassName('close')[0];

    if (btn && modal && span) {
        btn.onclick = function(e) {
            e.preventDefault();
            modal.style.display = 'block';
        }

        span.onclick = function() {
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }

    // Inicialização
    console.log('Área da Família NINHO carregada com sucesso!');
    
    // Mostrar primeira seção por padrão
    showSection('educacao');
});